import { spawn } from 'node:child_process'
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import http from 'node:http'
import net from 'node:net'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import process from 'node:process'
import { chromium } from 'playwright'
import { createCodeSandboxProjectFiles } from '../docs/.vitepress/theme/utils/demo-sandbox'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(__dirname, '..')
const tempRootDir = resolve(rootDir, '.codex-temp/codesandbox-local')
const packagesRoot = resolve(rootDir, 'packages')
const packOutputDir = resolve(tempRootDir, 'packs')
const codeSandboxRuntimeDir = resolve(rootDir, 'docs', 'public', 'codesandbox-runtime')
const isWin = process.platform === 'win32'
const npmCommand = isWin ? 'npm.cmd' : 'npm'
const pnpmCommand = isWin ? 'pnpm.cmd' : 'pnpm'
const shutdownGraceMs = 2_000
const codeSandboxManifestPromise = readFile(
  join(codeSandboxRuntimeDir, 'manifest.json'),
  'utf8'
).then((text) => JSON.parse(text))

const SANDBOX_WORKSPACE_PACKAGES = [
  '@yh-ui/components',
  '@yh-ui/flow',
  '@yh-ui/hooks',
  '@yh-ui/icons',
  '@yh-ui/locale',
  '@yh-ui/theme',
  '@yh-ui/utils',
  '@yh-ui/yh-ui'
] as const

type BrowserPage =
  Awaited<ReturnType<typeof chromium.launch>> extends { newPage(): infer T } ? Awaited<T> : never

interface WorkspaceManifest {
  name: string
  version: string
}

interface SandboxPackageJson extends Record<string, unknown> {
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  optionalDependencies?: Record<string, string>
  overrides?: Record<string, string>
}

interface TestCase {
  name: string
  title: string
  code: string
  context?: {
    docPath?: string
  }
  selector: string
  text?: string
  verifyFiles?: (files: Record<string, string>) => void
  evaluate?: (page: BrowserPage) => Promise<void>
}

function verifyAiChatVendoredFiles(files: Record<string, string>) {
  const packageJson = JSON.parse(files['package.json']) as {
    dependencies?: Record<string, string>
  }
  if (packageJson.dependencies?.['@yh-ui/yh-ui']) {
    throw new Error('Expected CodeSandbox scaffold to avoid installing @yh-ui/yh-ui from npm')
  }

  const aiChatRuntimeFile = files['src/vendor/components/ai-chat/src/ai-chat.js']
  const requiredVendoredFiles = [
    'src/vendor/components/ai-chat/index.js',
    'src/vendor/components/ai-chat/src/ai-chat.js'
  ]
  const missingVendoredFiles = requiredVendoredFiles.filter((filePath) => !files[filePath])
  if (missingVendoredFiles.length > 0) {
    throw new Error(
      `Expected CodeSandbox export to vendor ai-chat runtime files, missing: ${missingVendoredFiles.join(', ')}`
    )
  }

  const requiredHookFiles = aiChatRuntimeFile?.includes('../../../hooks/index.js')
    ? ['src/vendor/hooks/index.js']
    : [
        'src/vendor/hooks/use-locale/index.js',
        'src/vendor/hooks/use-namespace/index.js',
        'src/vendor/hooks/use-virtual-scroll/index.js'
      ]
  const missingHookFiles = requiredHookFiles.filter((filePath) => !files[filePath])
  if (missingHookFiles.length > 0) {
    throw new Error(
      `Expected CodeSandbox export to vendor ai-chat hook runtime files, missing: ${missingHookFiles.join(', ')}`
    )
  }
}

const testCases: TestCase[] = [
  {
    name: 'button',
    title: 'Basic Button',
    code: `<template>
  <yh-space>
    <yh-button>Default</yh-button>
    <yh-button type="primary">Hello Sandbox</yh-button>
  </yh-space>
</template>`,
    selector: '.yh-button--primary',
    text: 'Hello Sandbox',
    evaluate: async (page) => {
      const metrics = await page.locator('.yh-button--primary').evaluate((el) => {
        const textEl = el.querySelector('.yh-button__text')
        if (!(textEl instanceof HTMLElement)) {
          return null
        }

        const hostRect = el.getBoundingClientRect()
        const textRect = textEl.getBoundingClientRect()
        return {
          hostWidth: hostRect.width,
          textWidth: textRect.width
        }
      })

      if (!metrics) {
        throw new Error('Expected primary button text wrapper to render in local CodeSandbox smoke')
      }

      if (metrics.hostWidth <= metrics.textWidth + 8) {
        throw new Error(
          `Expected primary button width to contain its text in local CodeSandbox smoke (button=${metrics.hostWidth}, text=${metrics.textWidth})`
        )
      }
    }
  },
  {
    name: 'grid',
    title: 'Basic Grid',
    code: `<template>
  <yh-grid :cols="3" :gap="16">
    <yh-grid-item>
      <div class="grid-demo-item">1</div>
    </yh-grid-item>
    <yh-grid-item>
      <div class="grid-demo-item">2</div>
    </yh-grid-item>
    <yh-grid-item>
      <div class="grid-demo-item">3</div>
    </yh-grid-item>
  </yh-grid>
</template>`,
    context: {
      docPath: 'components/grid.md'
    },
    selector: '.yh-grid',
    evaluate: async (page) => {
      const display = await page.locator('.yh-grid').evaluate((el) => getComputedStyle(el).display)
      if (display !== 'grid') {
        throw new Error(`Expected .yh-grid display:grid, received "${display}"`)
      }

      const itemStyles = await page
        .locator('.grid-demo-item')
        .first()
        .evaluate((el) => {
          const style = getComputedStyle(el)
          return {
            backgroundColor: style.backgroundColor,
            paddingTop: style.paddingTop,
            borderTopLeftRadius: style.borderTopLeftRadius
          }
        })

      if (itemStyles.backgroundColor === 'rgba(0, 0, 0, 0)') {
        throw new Error('Expected shared grid demo styles to be applied in local CodeSandbox smoke')
      }

      if (itemStyles.paddingTop === '0px' || itemStyles.borderTopLeftRadius === '0px') {
        throw new Error(
          'Expected grid demo shared box padding/radius styles to be applied in local CodeSandbox smoke'
        )
      }
    }
  },
  {
    name: 'icon',
    title: 'Basic Icon',
    code: `<template>
  <div style="display:flex;gap:12px;font-size:20px;color:#2563eb">
    <Icon icon="mdi:home" />
    <Icon icon="ep:search" />
    <Icon icon="lucide:check" />
  </div>
</template>`,
    selector: 'svg',
    evaluate: async (page) => {
      const iconCount = await page.locator('svg').count()
      if (iconCount < 3) {
        throw new Error(`Expected at least 3 rendered svg icons, received ${iconCount}`)
      }
    }
  },
  {
    name: 'ai-chat',
    title: 'AI Chat',
    code: `<template>
  <div style="max-width: 720px; height: 520px">
    <yh-ai-chat v-model:messages="messages" :loading="loading" @send="handleSend" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const messages = ref([
  { id: 'assistant-1', role: 'assistant', content: 'Hello from YH-UI AI Chat.' },
  { id: 'user-1', role: 'user', content: 'Please verify CodeSandbox.' }
])

const loading = ref(false)

const handleSend = async (value: string) => {
  messages.value.push({
    id: 'user-' + Date.now(),
    role: 'user',
    content: value
  })
}
</script>`,
    context: {
      docPath: 'ai-components/ai-chat.md'
    },
    selector: '.yh-ai-chat',
    verifyFiles: verifyAiChatVendoredFiles,
    evaluate: async (page) => {
      await page.locator('.yh-ai-chat__content').waitFor({ state: 'visible', timeout: 30000 })
      await page.locator('.yh-ai-chat__footer').waitFor({ state: 'visible', timeout: 30000 })
      const bubbleCount = await page.locator('.yh-ai-bubble').count()
      if (bubbleCount < 2) {
        throw new Error(`Expected ai chat to render at least 2 bubbles, received ${bubbleCount}`)
      }
      const sendButtonCount = await page.locator('.yh-ai-sender__send-btn').count()
      if (sendButtonCount < 1) {
        throw new Error('Expected ai chat sender actions to render in local CodeSandbox smoke')
      }
    }
  },
  {
    name: 'ai-sender',
    title: 'AI Sender',
    code: `<template>
  <div style="max-width: 640px">
    <yh-ai-sender v-model="message" placeholder="Ask anything" clearable />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const message = ref('Draft prompt')
</script>`,
    selector: '.yh-ai-sender',
    evaluate: async (page) => {
      await page.locator('.yh-ai-sender textarea').waitFor({ state: 'visible', timeout: 30000 })
      const buttonCount = await page.locator('.yh-ai-sender__send-btn').count()
      if (buttonCount < 1) {
        throw new Error('Expected ai sender submit button to render in local CodeSandbox smoke')
      }
    }
  },
  {
    name: 'ai-code-block',
    title: 'AI Code Block',
    code: `<template>
  <div style="max-width: 640px">
    <yh-ai-code-block language="typescript" :code="code" />
  </div>
</template>

<script setup lang="ts">
const code = "const message = 'sandbox'\\nconsole.log(message)"
</script>`,
    selector: '.yh-ai-code-block',
    evaluate: async (page) => {
      await page.locator('.yh-ai-code-block__header').waitFor({ state: 'visible', timeout: 30000 })
      const lineCount = await page.locator('.yh-ai-code-block__line').count()
      if (lineCount < 2) {
        throw new Error(`Expected ai code block to render at least 2 lines, received ${lineCount}`)
      }
    }
  },
  {
    name: 'ai-mermaid',
    title: 'AI Mermaid',
    code: `<template>
  <div style="max-width: 720px">
    <yh-ai-mermaid :code="diagram" />
  </div>
</template>

<script setup lang="ts">
const diagram = "graph TD\\nA[Start] --> B[Done]"
</script>`,
    selector: '.yh-ai-mermaid',
    verifyFiles: (files) => {
      const packageJson = JSON.parse(files['package.json']) as {
        dependencies?: Record<string, string>
      }
      if (!packageJson.dependencies?.mermaid) {
        throw new Error('Expected ai mermaid CodeSandbox scaffold to include mermaid dependency')
      }
      if (!files['src/vendor/components/ai-mermaid/index.js']) {
        throw new Error('Expected ai mermaid CodeSandbox scaffold to vendor ai-mermaid runtime')
      }
    },
    evaluate: async (page) => {
      await page.locator('.yh-ai-mermaid__graph').waitFor({ state: 'visible', timeout: 30000 })
      const graphMarkup = await page.locator('.yh-ai-mermaid__graph').evaluate((el) => {
        const html = el.innerHTML || ''
        return {
          hasSvgMarkup: html.includes('<svg'),
          childElementCount: el.childElementCount
        }
      })
      if (!graphMarkup.hasSvgMarkup && graphMarkup.childElementCount < 1) {
        throw new Error('Expected ai mermaid graph container to render diagram markup')
      }
      const tabCount = await page.locator('.yh-ai-mermaid__render-tab').count()
      if (tabCount < 2) {
        throw new Error(`Expected ai mermaid render tabs to appear, received ${tabCount}`)
      }
    }
  },
  {
    name: 'flow',
    title: 'Basic Flow',
    code: `<template>
  <div style="height: 360px; border: 1px solid #dbe4f0">
    <yh-flow v-model:nodes="nodes" v-model:edges="edges" fit-view />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const nodes = ref([
  { id: '1', type: 'default', position: { x: 40, y: 80 }, data: { label: '开始' } },
  { id: '2', type: 'default', position: { x: 240, y: 80 }, data: { label: '结束' } }
])

const edges = ref([{ id: 'e1-2', source: '1', target: '2' }])
</script>`,
    selector: '.yh-flow',
    evaluate: async (page) => {
      const nodeCount = await page.locator('.yh-flow__node, .yh-flow-node').count()
      if (nodeCount < 2) {
        throw new Error(`Expected at least 2 rendered flow nodes, received ${nodeCount}`)
      }
    }
  }
]

function selectTestCases(allCases: TestCase[]): TestCase[] {
  const filter = process.env.CODESANDBOX_CASE_FILTER?.trim()
  if (!filter) return allCases

  const needles = filter
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  const selected = allCases.filter((testCase) =>
    needles.some((needle) => testCase.name.includes(needle))
  )

  if (selected.length === 0) {
    throw new Error(`No local CodeSandbox cases matched CODESANDBOX_CASE_FILTER=${filter}`)
  }

  return selected
}

function shouldIgnoreErrorText(text: string): boolean {
  return text.includes('favicon.ico')
}

function getAvailablePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const server = net.createServer()
    server.unref()
    server.on('error', reject)
    server.listen(0, '127.0.0.1', () => {
      const address = server.address()
      if (!address || typeof address === 'string') {
        server.close(() => reject(new Error('Failed to resolve available port')))
        return
      }

      server.close((error) => {
        if (error) {
          reject(error)
          return
        }

        resolve(address.port)
      })
    })
  })
}

function waitForServer(url: string, timeoutMs = 180000): Promise<void> {
  const startedAt = Date.now()

  return new Promise((resolve, reject) => {
    const attempt = () => {
      const request = http.get(url, (response) => {
        response.resume()
        if ((response.statusCode ?? 500) < 500) {
          resolve()
          return
        }

        retry()
      })

      request.on('error', retry)
    }

    const retry = () => {
      if (Date.now() - startedAt > timeoutMs) {
        reject(new Error(`Timed out waiting for local sandbox preview: ${url}`))
        return
      }

      setTimeout(attempt, 1000)
    }

    attempt()
  })
}

async function stopProcessTree(pid: number) {
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
    } catch {
      // fall through
    }
  }

  try {
    process.kill(-pid, 'SIGTERM')
  } catch {
    // ignore
  }

  await new Promise((resolve) => setTimeout(resolve, shutdownGraceMs))

  try {
    process.kill(-pid, 'SIGKILL')
  } catch {
    // ignore
  }
}

async function runCommand(
  command: string,
  cwd: string,
  args: string[],
  timeoutMs = 20 * 60 * 1000
): Promise<void> {
  await new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      env: {
        ...process.env,
        CI: 'true',
        NODE_OPTIONS: process.env.NODE_OPTIONS || '--max-old-space-size=6144'
      },
      shell: isWin,
      stdio: 'pipe',
      windowsHide: true
    })

    let stdout = ''
    let stderr = ''
    const timer = setTimeout(() => {
      child.kill('SIGKILL')
      reject(new Error(`${command} ${args.join(' ')} timed out after ${timeoutMs}ms`))
    }, timeoutMs)

    child.stdout?.on('data', (chunk) => {
      stdout += chunk.toString()
    })
    child.stderr?.on('data', (chunk) => {
      stderr += chunk.toString()
    })
    child.on('error', (error) => {
      clearTimeout(timer)
      reject(error)
    })
    child.on('close', (code) => {
      clearTimeout(timer)
      if (code === 0) {
        resolve(undefined)
        return
      }

      reject(
        new Error(
          `${command} ${args.join(' ')} failed with exit code ${code}\n[stdout]\n${stdout}\n[stderr]\n${stderr}`
        )
      )
    })
  })
}

async function writeProjectFiles(dir: string, files: Record<string, string>) {
  await rm(dir, { recursive: true, force: true })
  await mkdir(dir, { recursive: true })

  for (const [relativePath, content] of Object.entries(files)) {
    const fullPath = join(dir, ...relativePath.split('/'))
    await mkdir(dirname(fullPath), { recursive: true })
    await writeFile(fullPath, content, 'utf8')
  }
}

async function readWorkspaceManifest(packageDirName: string): Promise<WorkspaceManifest> {
  const manifestPath = join(packagesRoot, packageDirName, 'package.json')
  return JSON.parse(await readFile(manifestPath, 'utf8')) as WorkspaceManifest
}

async function createWorkspaceTarballMap() {
  await rm(packOutputDir, { recursive: true, force: true })
  await mkdir(packOutputDir, { recursive: true })

  const tarballMap = new Map<string, string>()
  const packageEntries = await readdir(packagesRoot, { withFileTypes: true })

  for (const entry of packageEntries) {
    if (!entry.isDirectory()) continue

    const manifest = await readWorkspaceManifest(entry.name)
    if (
      !SANDBOX_WORKSPACE_PACKAGES.includes(
        manifest.name as (typeof SANDBOX_WORKSPACE_PACKAGES)[number]
      )
    ) {
      continue
    }

    const packageDir = join(packagesRoot, entry.name)
    await runCommand(pnpmCommand, packageDir, ['pack', '--pack-destination', packOutputDir])

    const tarballName = `${manifest.name.slice(1).replace('/', '-')}-${manifest.version}.tgz`
    tarballMap.set(manifest.name, join(packOutputDir, tarballName))
  }

  for (const packageName of SANDBOX_WORKSPACE_PACKAGES) {
    if (!tarballMap.has(packageName)) {
      throw new Error(`Missing packed tarball for ${packageName}`)
    }
  }

  return tarballMap
}

function applyWorkspacePackageOverrides(
  caseDir: string,
  files: Record<string, string>,
  tarballMap: Map<string, string>
): Record<string, string> {
  const packageJson = JSON.parse(files['package.json']) as SandboxPackageJson
  const overrides = Object.fromEntries(
    [...tarballMap.entries()].map(([packageName, tarballPath]) => [
      packageName,
      `file:${relative(caseDir, tarballPath).replace(/\\/g, '/')}`
    ])
  )

  for (const field of ['dependencies', 'devDependencies', 'optionalDependencies'] as const) {
    const dependencies = packageJson[field]
    if (!dependencies) continue

    for (const packageName of Object.keys(dependencies)) {
      const overrideValue = overrides[packageName]
      if (overrideValue) {
        dependencies[packageName] = overrideValue
      }
    }
  }

  packageJson.overrides = {
    ...(packageJson.overrides ?? {}),
    ...overrides
  }

  return {
    ...files,
    'package.json': `${JSON.stringify(packageJson, null, 2)}\n`
  }
}

async function buildProjectFiles(testCase: TestCase): Promise<Record<string, string>> {
  return createCodeSandboxProjectFiles(testCase.title, testCase.code, testCase.context, {
    manifest: await codeSandboxManifestPromise,
    loadRuntimeAssetText: async (relativePath) =>
      readFile(join(codeSandboxRuntimeDir, ...relativePath.split('/')), 'utf8'),
    loadSiteAssetText: async (assetPath) =>
      readFile(join(rootDir, 'docs', 'public', ...assetPath.split('/')), 'utf8')
  })
}

async function verifyLocalSandbox(testCase: TestCase, tarballMap: Map<string, string>) {
  const sandboxDir = join(tempRootDir, testCase.name)
  const screenshotPath = join(tempRootDir, `${testCase.name}.png`)
  const baseFiles = await buildProjectFiles(testCase)
  testCase.verifyFiles?.(baseFiles)
  const files = applyWorkspacePackageOverrides(sandboxDir, baseFiles, tarballMap)
  await writeProjectFiles(sandboxDir, files)

  await runCommand(npmCommand, sandboxDir, ['install', '--no-package-lock'])
  await runCommand(npmCommand, sandboxDir, ['run', 'build'])

  const port = await getAvailablePort()
  const previewUrl = `http://127.0.0.1:${port}/`
  const server = spawn(
    npmCommand,
    ['run', 'dev', '--', '--host', '127.0.0.1', '--port', `${port}`],
    {
      cwd: sandboxDir,
      env: {
        ...process.env,
        NODE_OPTIONS: process.env.NODE_OPTIONS || '--max-old-space-size=6144'
      },
      detached: !isWin,
      shell: isWin,
      stdio: 'pipe',
      windowsHide: true
    }
  )

  let serverStdout = ''
  let serverStderr = ''
  server.stdout?.on('data', (chunk) => {
    serverStdout += chunk.toString()
  })
  server.stderr?.on('data', (chunk) => {
    serverStderr += chunk.toString()
  })

  try {
    await waitForServer(previewUrl)
    const browser = await chromium.launch({ headless: true })
    const page = await browser.newPage()
    const runtimeErrors: string[] = []

    page.on('console', (message) => {
      if (message.type() !== 'error') return
      const text = message.text()
      if (shouldIgnoreErrorText(text)) return
      runtimeErrors.push(`console: ${text}`)
    })

    page.on('pageerror', (error) => {
      runtimeErrors.push(`pageerror: ${error.message}`)
    })

    page.on('requestfailed', (request) => {
      const url = request.url()
      if (shouldIgnoreErrorText(url)) return
      runtimeErrors.push(`requestfailed: ${request.failure()?.errorText ?? 'unknown'} ${url}`)
    })

    await page.goto(previewUrl, {
      waitUntil: 'networkidle',
      timeout: 120000
    })

    await page.locator(testCase.selector).first().waitFor({
      state: 'visible',
      timeout: 120000
    })

    if (testCase.text) {
      const text = await page.locator(testCase.selector).first().innerText()
      if (!text.includes(testCase.text)) {
        throw new Error(
          `Expected "${testCase.text}" in ${testCase.selector}, received "${text || ''}"`
        )
      }
    }

    if (testCase.evaluate) {
      await testCase.evaluate(page)
    }

    await page.screenshot({ path: screenshotPath, fullPage: true })

    if (runtimeErrors.length > 0) {
      throw new Error(runtimeErrors.join('\n'))
    }

    await browser.close()

    return {
      ok: true,
      name: testCase.name,
      previewUrl,
      sandboxDir,
      screenshotPath
    }
  } catch (error) {
    throw new Error(
      `[${testCase.name}] ${error instanceof Error ? error.message : String(error)}\nPreview: ${previewUrl}\nProject: ${sandboxDir}\nScreenshot: ${screenshotPath}\n[server stdout]\n${serverStdout}\n[server stderr]\n${serverStderr}`
    )
  } finally {
    if (server.pid) {
      await stopProcessTree(server.pid)
    }
  }
}

async function main() {
  await mkdir(tempRootDir, { recursive: true })
  const results = []
  const selectedTestCases = selectTestCases(testCases)
  console.log('[verify:codesandbox-local] packing local workspace tarballs')
  const tarballMap = await createWorkspaceTarballMap()

  for (const testCase of selectedTestCases) {
    console.log(`[verify:codesandbox-local] starting ${testCase.name}`)
    results.push(await verifyLocalSandbox(testCase, tarballMap))
    console.log(`[verify:codesandbox-local] passed ${testCase.name}`)
  }

  console.log(JSON.stringify({ ok: true, results }, null, 2))
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
