import { spawn } from 'node:child_process'
import { mkdtemp, mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import net from 'node:net'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { gzipSync } from 'node:zlib'
import { chromium } from 'playwright'
import { rimraf } from 'rimraf'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const viteCli = path.resolve(rootDir, 'node_modules/vite/bin/vite.js')
const nuxtCli = path.resolve(rootDir, 'node_modules/nuxt/bin/nuxt.mjs')
const pnpmCli = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm'
const consumerSmokeReportPath = path.resolve(rootDir, 'test-results', 'consumer-smoke-report.json')
const shouldSkipPreview = ['1', 'true', 'yes'].includes(
  String(process.env.YH_CONSUMER_SMOKE_SKIP_PREVIEW || '').toLowerCase()
)
const nuxtWarningSuppressions = ['--disable-warning=DEP0155']

function mergeNodeOptions(...segments) {
  return segments
    .flatMap((segment) => String(segment || '').split(/\s+/))
    .map((segment) => segment.trim())
    .filter(Boolean)
    .join(' ')
}

function withNodeWarningSuppressions(envOverrides = {}) {
  const baseNodeOptions =
    envOverrides.NODE_OPTIONS ?? process.env.NODE_OPTIONS ?? ''

  return {
    ...envOverrides,
    NODE_OPTIONS: mergeNodeOptions(baseNodeOptions, ...nuxtWarningSuppressions)
  }
}

const viteConsumerSizeBudgets = {
  'index.html': {
    label: 'vite-full-install',
    bytes: 11_000_000,
    gzip: 3_100_000,
    jsBytes: 10_200_000,
    cssBytes: 700_000
  },
  'on-demand.html': {
    label: 'vite-on-demand',
    bytes: 450_000,
    gzip: 200_000,
    jsBytes: 420_000,
    cssBytes: 40_000
  }
}

const COMPRESSIBLE_ASSET_EXTENSIONS = new Set(['.js', '.mjs', '.cjs', '.css'])

function getAvailablePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer()
    server.unref()
    server.on('error', reject)
    server.listen(0, '127.0.0.1', () => {
      const address = server.address()
      if (!address || typeof address === 'string') {
        server.close(() => reject(new Error('Failed to resolve port')))
        return
      }

      const { port } = address
      server.close((error) => {
        if (error) {
          reject(error)
          return
        }
        resolve(port)
      })
    })
  })
}

function runNodeCommand(args, cwd, envOverrides = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, {
      cwd,
      env: {
        ...process.env,
        ...envOverrides
      },
      stdio: 'inherit',
      windowsHide: true
    })

    child.on('error', reject)
    child.on('close', (code) => {
      if (code === 0) {
        resolve()
        return
      }

      reject(new Error(`Command failed: node ${args.join(' ')}`))
    })
  })
}

async function removeSmokeDir(target) {
  await rimraf(target, {
    maxRetries: 15,
    retryDelay: 500
  })
}

async function writeJsonReport(reportPath, payload) {
  await writeFile(reportPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8').catch(
    async (error) => {
      if (error.code !== 'ENOENT') throw error
      await mkdir(path.dirname(reportPath), { recursive: true })
      await writeFile(reportPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
    }
  )
}

async function getFileGzipSize(filePath) {
  const contents = await readFile(filePath)
  return gzipSync(contents, { level: 9 }).length
}

function formatBytes(bytes) {
  return `${bytes} bytes`
}

function createConsumerSmokeError(message, result, cause) {
  const error = new Error(message)
  error.consumerSmokeResult = result
  if (cause) {
    error.cause = cause
  }
  return error
}

function getConsumerSmokeResult(error) {
  if (!error || typeof error !== 'object') {
    return null
  }
  return 'consumerSmokeResult' in error ? error.consumerSmokeResult : null
}

function serializeError(error) {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack
    }
  }

  return {
    name: 'Error',
    message: String(error)
  }
}

async function writeConsumerSmokePayload(payload) {
  await writeJsonReport(consumerSmokeReportPath, payload)
  console.log(JSON.stringify(payload, null, 2))
  console.log(`[consumer-smoke] report written to ${consumerSmokeReportPath}`)
}

function runCommand(command, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      env: process.env,
      shell: process.platform === 'win32',
      stdio: 'inherit',
      windowsHide: true
    })

    child.on('error', reject)
    child.on('close', (code) => {
      if (code === 0) {
        resolve()
        return
      }

      reject(new Error(`Command failed: ${command} ${args.join(' ')}`))
    })
  })
}

function waitForServer(url, timeoutMs = 120000) {
  const startedAt = Date.now()

  return new Promise((resolve, reject) => {
    const attempt = async () => {
      try {
        const response = await fetch(url)
        if (response.status < 500) {
          resolve()
          return
        }
      } catch {}

      if (Date.now() - startedAt > timeoutMs) {
        reject(new Error(`Timed out waiting for server: ${url}`))
        return
      }

      setTimeout(attempt, 1000)
    }

    void attempt()
  })
}

async function stopProcessTree(pid) {
  if (process.platform === 'win32') {
    try {
      await new Promise((resolve, reject) => {
        const child = spawn('taskkill', ['/pid', `${pid}`, '/T', '/F'], { windowsHide: true })
        child.on('error', reject)
        child.on('close', (code) =>
          code === 0 ? resolve(undefined) : reject(new Error(`taskkill exited with ${code}`))
        )
      })
      return
    } catch {}
  }

  try {
    process.kill(pid, 'SIGKILL')
  } catch {}
}

async function startPreview(cwd, args, readyUrl, envOverrides = {}) {
  const child = spawn(process.execPath, args, {
    cwd,
    env: {
      ...process.env,
      ...envOverrides
    },
    stdio: ['ignore', 'pipe', 'pipe'],
    windowsHide: true
  })

  let stdout = ''
  let stderr = ''
  child.stdout?.on('data', (chunk) => {
    stdout += chunk.toString()
  })
  child.stderr?.on('data', (chunk) => {
    stderr += chunk.toString()
  })

  try {
    await waitForServer(readyUrl)
    return { child, stdoutRef: () => stdout, stderrRef: () => stderr }
  } catch (error) {
    if (child.pid) {
      await stopProcessTree(child.pid)
    }

    throw new Error(
      `${error instanceof Error ? error.message : String(error)}\n[stdout]\n${stdout}\n[stderr]\n${stderr}`
    )
  }
}

async function createViteFixture() {
  const cwd = await mkdtemp(path.join(rootDir, '.vite-consumer-smoke-'))

  const vueEntry = JSON.stringify(
    path.resolve(rootDir, 'node_modules/vue/dist/vue.runtime.esm-bundler.js')
  )
  const componentsEntry = JSON.stringify(
    path.resolve(rootDir, 'packages/components/dist/index.mjs')
  )
  const hooksEntry = JSON.stringify(path.resolve(rootDir, 'packages/hooks/dist/index.mjs'))
  const utilsEntry = JSON.stringify(path.resolve(rootDir, 'packages/utils/dist/index.mjs'))
  const themeEntry = JSON.stringify(path.resolve(rootDir, 'packages/theme/dist/index.mjs'))
  const yhUiEntry = JSON.stringify(path.resolve(rootDir, 'packages/yh-ui/dist/index.mjs'))
  const yhUiCssEntry = JSON.stringify(path.resolve(rootDir, 'packages/yh-ui/dist/style.css'))
  const componentsCssEntry = JSON.stringify(
    path.resolve(rootDir, 'packages/components/dist/style.css')
  )
  const iconsEntry = JSON.stringify(path.resolve(rootDir, 'packages/icons/dist/index.mjs'))
  const iconsComponentsEntry = JSON.stringify(
    path.resolve(rootDir, 'packages/icons/dist/components.mjs')
  )
  const pluginVueEntry = JSON.stringify(
    path.resolve(rootDir, 'node_modules/@vitejs/plugin-vue/dist/index.mjs')
  )

  await mkdir(path.join(cwd, 'src'), { recursive: true })
  await writeFile(
    path.join(cwd, 'index.html'),
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>YH-UI Vite Smoke</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
`
  )
  await writeFile(
    path.join(cwd, 'on-demand.html'),
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>YH-UI On Demand Smoke</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/on-demand-main.ts"></script>
  </body>
</html>
`
  )
  await writeFile(
    path.join(cwd, 'vite.config.mjs'),
    `import { defineConfig } from ${JSON.stringify(path.resolve(rootDir, 'node_modules/vite/dist/node/index.js'))}
import vue from ${pluginVueEntry}

export default defineConfig({
  plugins: [vue()],
  build: {
    manifest: true,
    chunkSizeWarningLimit: 4096,
    rollupOptions: {
      input: {
        full: 'index.html',
        onDemand: 'on-demand.html'
      }
    }
  },
  resolve: {
    alias: [
      { find: '@yh-ui/yh-ui/css', replacement: ${yhUiCssEntry} },
      { find: '@yh-ui/components/style.css', replacement: ${componentsCssEntry} },
      { find: '@yh-ui/yh-ui', replacement: ${yhUiEntry} },
      { find: '@yh-ui/components', replacement: ${componentsEntry} },
      { find: '@yh-ui/hooks', replacement: ${hooksEntry} },
      { find: '@yh-ui/utils', replacement: ${utilsEntry} },
      { find: '@yh-ui/theme', replacement: ${themeEntry} },
      { find: '@yh-ui/icons/components', replacement: ${iconsComponentsEntry} },
      { find: '@yh-ui/icons', replacement: ${iconsEntry} },
      { find: 'vue', replacement: ${vueEntry} }
    ]
  }
})
`
  )
  await writeFile(
    path.join(cwd, 'src/main.ts'),
    `import { createApp, h } from 'vue'
import YhUI from '@yh-ui/yh-ui'
import '@yh-ui/yh-ui/css'
import { YhButton, YhAlert } from '@yh-ui/components'

createApp({
  render() {
    return h('main', { class: 'smoke-app' }, [
      h('h1', 'YH-UI Vite Smoke'),
      h(YhButton, { type: 'primary' }, () => 'Primary Action'),
      h(YhAlert, { title: 'Smoke Alert', type: 'success', closable: false })
    ])
  }
}).use(YhUI).mount('#app')
`
  )
  await writeFile(
    path.join(cwd, 'src/on-demand-main.ts'),
    `import { createApp, h } from 'vue'
import { YhButton, YhAlert } from '@yh-ui/components'
import '@yh-ui/components/style.css'

createApp({
  render() {
    return h('main', { class: 'smoke-app smoke-app--on-demand' }, [
      h('h1', 'YH-UI On Demand Smoke'),
      h(YhButton, { type: 'primary' }, () => 'Primary Action'),
      h(YhAlert, { title: 'Smoke Alert', type: 'success', closable: false })
    ])
  }
}).mount('#app')
`
  )

  return cwd
}

function collectManifestEntryAssets(
  manifest,
  entryKey,
  visitedEntries = new Set(),
  assets = new Set()
) {
  if (visitedEntries.has(entryKey)) {
    return assets
  }
  visitedEntries.add(entryKey)

  const entry = manifest[entryKey]
  if (!entry) {
    throw new Error(`Missing Vite manifest entry: ${entryKey}`)
  }

  if (entry.file) {
    assets.add(entry.file)
  }
  for (const cssFile of entry.css || []) {
    assets.add(cssFile)
  }
  for (const assetFile of entry.assets || []) {
    assets.add(assetFile)
  }
  for (const importedEntry of entry.imports || []) {
    collectManifestEntryAssets(manifest, importedEntry, visitedEntries, assets)
  }
  for (const dynamicImportedEntry of entry.dynamicImports || []) {
    collectManifestEntryAssets(manifest, dynamicImportedEntry, visitedEntries, assets)
  }

  return assets
}

function resolveManifestEntryKey(manifest, expectedEntry) {
  if (manifest[expectedEntry]) {
    return expectedEntry
  }

  const normalizedExpectedEntry = expectedEntry.replace(/\\/g, '/')
  const matchedEntry = Object.entries(manifest).find(([key, value]) => {
    if (key === expectedEntry) {
      return true
    }
    return value?.src?.replace(/\\/g, '/') === normalizedExpectedEntry
  })

  if (!matchedEntry) {
    throw new Error(`Missing Vite manifest entry: ${expectedEntry}`)
  }

  return matchedEntry[0]
}

async function measureViteEntryBundle(distDir, assetPaths) {
  const files = []
  let bytes = 0
  let gzip = 0
  let jsBytes = 0
  let cssBytes = 0

  for (const assetPath of [...assetPaths].sort()) {
    const absolutePath = path.join(distDir, assetPath)
    const fileStat = await stat(absolutePath)
    const ext = path.extname(assetPath)
    const assetBytes = fileStat.size
    const assetGzip = COMPRESSIBLE_ASSET_EXTENSIONS.has(ext)
      ? await getFileGzipSize(absolutePath)
      : 0

    bytes += assetBytes
    gzip += assetGzip

    if (ext === '.css') {
      cssBytes += assetBytes
    } else if (ext === '.js' || ext === '.mjs' || ext === '.cjs') {
      jsBytes += assetBytes
    }

    files.push({
      path: assetPath,
      bytes: assetBytes,
      gzip: assetGzip
    })
  }

  return {
    files,
    assetCount: files.length,
    bytes,
    gzip,
    jsBytes,
    cssBytes
  }
}

async function collectViteBundleReport(cwd) {
  const distDir = path.join(cwd, 'dist')
  const manifestPath = path.join(distDir, '.vite', 'manifest.json')
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'))

  const scenarios = [
    { entry: 'index.html', label: 'vite-full-install' },
    { entry: 'on-demand.html', label: 'vite-on-demand' }
  ]

  const reports = []
  for (const scenario of scenarios) {
    const manifestEntryKey = resolveManifestEntryKey(manifest, scenario.entry)
    const assets = collectManifestEntryAssets(manifest, manifestEntryKey)
    const metrics = await measureViteEntryBundle(distDir, assets)

    reports.push({
      entry: scenario.entry,
      manifestEntryKey,
      label: scenario.label,
      ...metrics,
      budget: viteConsumerSizeBudgets[scenario.entry]
    })
  }

  return reports
}

function assertViteBundleBudgets(reports) {
  const failures = []

  for (const report of reports) {
    const budget = report.budget
    if (!budget) continue

    if (report.bytes > budget.bytes) {
      failures.push(
        `${budget.label} total bundle is ${formatBytes(report.bytes)}, over budget ${formatBytes(budget.bytes)}`
      )
    }
    if (report.gzip > budget.gzip) {
      failures.push(
        `${budget.label} gzip bundle is ${formatBytes(report.gzip)}, over budget ${formatBytes(budget.gzip)}`
      )
    }
    if (report.jsBytes > budget.jsBytes) {
      failures.push(
        `${budget.label} js bundle is ${formatBytes(report.jsBytes)}, over budget ${formatBytes(budget.jsBytes)}`
      )
    }
    if (report.cssBytes > budget.cssBytes) {
      failures.push(
        `${budget.label} css bundle is ${formatBytes(report.cssBytes)}, over budget ${formatBytes(budget.cssBytes)}`
      )
    }
  }

  if (failures.length) {
    throw new Error(
      `Consumer smoke size budget failed:\n- ${failures.join('\n- ')}\nReport: ${consumerSmokeReportPath}`
    )
  }
}

async function extractInstallableComponentNames() {
  const componentsEntry = await readFile(
    path.resolve(rootDir, 'packages/components/src/index.ts'),
    'utf8'
  )
  const componentsMatch = componentsEntry.match(/const components = \[([\s\S]*?)\] as Plugin\[\]/)

  if (!componentsMatch) {
    throw new Error('Failed to parse installable components from packages/components/src/index.ts')
  }

  return [
    ...new Set([...componentsMatch[1].matchAll(/\b(Yh[A-Za-z0-9]+)\b/g)].map((match) => match[1]))
  ]
}

async function verifyViteConsumer() {
  const cwd = await createViteFixture()
  const port = await getAvailablePort()
  const resolutionMode = 'dist-entry-aliases-with-package-export-locale'
  let sizeReport = null

  try {
    await runNodeCommand([viteCli, 'build', '--config', 'vite.config.mjs'], cwd)
    sizeReport = await collectViteBundleReport(cwd)

    for (const report of sizeReport) {
      console.log(
        `[consumer-size] ${report.label}: ${report.bytes} bytes, gzip ${report.gzip} bytes, js ${report.jsBytes} bytes, css ${report.cssBytes} bytes`
      )
    }

    assertViteBundleBudgets(sizeReport)

    if (shouldSkipPreview) {
      return {
        label: 'Vite + Vue consumer build',
        ok: true,
        previewSkipped: true,
        resolutionMode,
        sizeReport
      }
    }

    const preview = await startPreview(
      cwd,
      [
        viteCli,
        'preview',
        '--config',
        'vite.config.mjs',
        '--host',
        '127.0.0.1',
        '--port',
        `${port}`
      ],
      `http://127.0.0.1:${port}/`
    )

    const browser = await chromium.launch({ headless: true })
    const page = await browser.newPage()

    try {
      await page.goto(`http://127.0.0.1:${port}/`, {
        waitUntil: 'domcontentloaded',
        timeout: 120000
      })
      await page.locator('h1').waitFor({ state: 'visible', timeout: 60000 })

      const buttonText = await page.locator('.yh-button--primary').textContent()
      if (!buttonText?.includes('Primary Action')) {
        throw new Error(`Unexpected Vite smoke button text: "${buttonText}"`)
      }

      const alertTitle = await page.locator('.yh-alert__title').textContent()
      if (!alertTitle?.includes('Smoke Alert')) {
        throw new Error(`Unexpected Vite smoke alert title: "${alertTitle}"`)
      }
    } finally {
      await browser.close()
      if (preview.child.pid) {
        await stopProcessTree(preview.child.pid)
      }
      if (process.platform === 'win32') {
        await new Promise((resolve) => setTimeout(resolve, 2500))
      }
    }

    return {
      label: 'Vite + Vue consumer build + preview',
      ok: true,
      resolutionMode,
      sizeReport
    }
  } catch (error) {
    if (sizeReport) {
      const message = error instanceof Error ? error.message : String(error)
      throw createConsumerSmokeError(
        message,
        {
          label: 'Vite + Vue consumer build',
          ok: false,
          failedAt: message.startsWith('Consumer smoke size budget failed:')
            ? 'size-budget'
            : shouldSkipPreview
              ? 'build'
              : 'preview',
          resolutionMode,
          sizeReport
        },
        error
      )
    }

    throw error
  } finally {
    await removeSmokeDir(cwd)
  }
}

async function verifyNuxtConsumer() {
  const cwd = path.resolve(rootDir, 'playground-nuxt')
  const port = await getAvailablePort()
  const nuxtEnv = withNodeWarningSuppressions()

  await runCommand(pnpmCli, ['-C', path.resolve(rootDir, 'packages/nuxt'), 'build'], rootDir)
  await runNodeCommand([nuxtCli, 'build'], cwd, nuxtEnv)

  const preview = await startPreview(
    cwd,
    [path.resolve(cwd, '.output/server/index.mjs')],
    `http://127.0.0.1:${port}/`,
    withNodeWarningSuppressions({
      HOST: '127.0.0.1',
      NITRO_HOST: '127.0.0.1',
      PORT: `${port}`,
      NITRO_PORT: `${port}`
    })
  )

  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()

  try {
    await page.goto(`http://127.0.0.1:${port}/`, {
      waitUntil: 'domcontentloaded',
      timeout: 120000
    })
    await page.locator('h1').waitFor({ state: 'visible', timeout: 60000 })

    const heading = await page.locator('h1').textContent()
    if (heading?.trim() !== 'Industry-style integration playground') {
      throw new Error(`Unexpected Nuxt consumer heading: "${heading}"`)
    }

    const buttonCount = await page.locator('.yh-button').count()
    if (buttonCount < 3) {
      throw new Error(
        `Expected Nuxt consumer to render multiple YH-UI buttons, received ${buttonCount}`
      )
    }
  } finally {
    await browser.close()
    if (preview.child.pid) {
      await stopProcessTree(preview.child.pid)
    }
  }

  return {
    label: 'Nuxt consumer build + preview',
    ok: true
  }
}

async function verifyAdminStarterComponentLab() {
  const cwd = path.resolve(rootDir, 'apps/admin-starter')
  const port = await getAvailablePort()
  const expectedNames = await extractInstallableComponentNames()

  const preview = await startPreview(
    cwd,
    [viteCli, '--mode', 'workspace', '--host', '127.0.0.1', '--port', `${port}`, '--force'],
    `http://127.0.0.1:${port}/component-lab`
  )

  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  const pageErrors = []
  const consoleErrors = []

  page.on('pageerror', (error) => {
    pageErrors.push(error.message)
  })
  page.on('console', (message) => {
    if (message.type() === 'error') {
      consoleErrors.push(message.text())
    }
  })

  try {
    await page.goto(`http://127.0.0.1:${port}/component-lab`, {
      waitUntil: 'domcontentloaded',
      timeout: 120000
    })
    await page
      .locator('[data-component-name]')
      .first()
      .waitFor({ state: 'visible', timeout: 120000 })

    const renderedNames = await page
      .locator('[data-component-name]')
      .evaluateAll((elements) =>
        elements
          .map((element) => element.getAttribute('data-component-name'))
          .filter((value) => typeof value === 'string')
      )

    const renderedSet = new Set(renderedNames)
    const missingNames = expectedNames.filter((name) => !renderedSet.has(name))

    if (renderedNames.length !== expectedNames.length || missingNames.length > 0) {
      throw new Error(
        `Component lab coverage mismatch. expected=${expectedNames.length}, rendered=${renderedNames.length}, missing=${missingNames.join(', ')}`
      )
    }

    if (pageErrors.length > 0 || consoleErrors.length > 0) {
      throw new Error(
        `Component lab page reported runtime errors before clicks.\n[pageErrors]\n${pageErrors.join('\n')}\n[consoleErrors]\n${consoleErrors.join('\n')}`
      )
    }

    await page.locator('[data-component-name="YhMessage"] button').first().click()
    await page.waitForTimeout(500)
    await page.locator('[data-component-name="YhNotification"] button').first().click()
    await page.waitForTimeout(500)
    await page.locator('[data-component-name="YhLoading"] button').first().click()
    await page.waitForTimeout(1000)

    if (pageErrors.length > 0 || consoleErrors.length > 0) {
      throw new Error(
        `Component lab page reported runtime errors after clicks.\n[pageErrors]\n${pageErrors.join('\n')}\n[consoleErrors]\n${consoleErrors.join('\n')}`
      )
    }
  } catch (error) {
    console.error('[SMOKE-ERROR] Current URL:', page.url())
    if (pageErrors.length > 0 || consoleErrors.length > 0) {
      console.error('[SMOKE-ERROR] Page Errors:', pageErrors)
      console.error('[SMOKE-ERROR] Console Errors:', consoleErrors)
    }
    throw error
  } finally {
    await browser.close()
    if (preview.child.pid) {
      await stopProcessTree(preview.child.pid)
    }
  }

  return {
    label: `Admin starter component lab (${expectedNames.length} installables)`,
    ok: true
  }
}

async function main() {
  const targets = new Set(
    String(process.env.YH_CONSUMER_SMOKE_TARGETS || 'vite,nuxt,admin-starter')
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
  )
  const payload = {
    generatedAt: new Date().toISOString(),
    ok: true,
    targets: [...targets],
    results: []
  }

  try {
    if (targets.has('vite')) {
      payload.results.push(await verifyViteConsumer())
    }
    if (targets.has('nuxt')) {
      payload.results.push(await verifyNuxtConsumer())
    }
    if (targets.has('admin-starter')) {
      payload.results.push(await verifyAdminStarterComponentLab())
    }
  } catch (error) {
    payload.ok = false
    payload.error = serializeError(error)

    const partialResult = getConsumerSmokeResult(error)
    if (partialResult) {
      payload.results.push(partialResult)
    }

    await writeConsumerSmokePayload(payload)
    throw error
  }

  await writeConsumerSmokePayload(payload)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
