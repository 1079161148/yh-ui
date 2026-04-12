import { exec, spawn } from 'node:child_process'
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import http from 'node:http'
import net from 'node:net'
import path from 'node:path'
import { promisify } from 'node:util'
import { chromium } from 'playwright'
import {
  createSandboxProjectFiles,
  getSandboxSupport
} from '../docs/.vitepress/theme/utils/demo-sandbox'

const execAsync = promisify(exec)
const pnpmCommand = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm'
const rootDir = process.cwd()
const tempRoot = path.join(
  rootDir,
  '.codex-temp',
  `demo-sandbox-validation-${Date.now()}-${process.pid}`
)
const packagesRoot = path.join(rootDir, 'packages')
const packOutputDir = path.join(tempRoot, 'packs')

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

const cases = [
  {
    name: 'basic-button',
    title: 'Basic Button',
    code: `<template>
  <yh-button type="primary">Hello Sandbox</yh-button>
</template>`,
    smoke: {
      selector: '.yh-button',
      text: 'Hello Sandbox'
    }
  },
  {
    name: 'date-picker',
    title: 'Date Picker',
    code: `<template>
  <yh-date-picker v-model="value" type="date" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>`,
    smoke: {
      selector: '.yh-date-picker'
    }
  },
  {
    name: 'basic-input-style',
    title: 'Basic Input Style',
    code: `<template>
  <div style="width: 320px">
    <yh-input placeholder="Type something" />
  </div>
</template>`,
    smoke: {
      selector: '.yh-input__wrapper',
      evaluate: async (page) => {
        const styles = await page.locator('.yh-input__wrapper').evaluate((el) => {
          const style = getComputedStyle(el)
          return {
            display: style.display,
            borderTopLeftRadius: style.borderTopLeftRadius
          }
        })
        if (styles.display !== 'flex' && styles.display !== 'inline-flex') {
          throw new Error(
            `Expected .yh-input__wrapper flex layout styles, got "${styles.display}"`
          )
        }
        if (styles.borderTopLeftRadius === '0px') {
          throw new Error('Expected .yh-input__wrapper border radius style to be applied')
        }
      }
    }
  },
  {
    name: 'basic-grid-style',
    title: 'Basic Grid Style',
    code: `<template>
  <yh-grid :cols="3" :gap="16">
    <yh-grid-item><div class="grid-demo-item">1</div></yh-grid-item>
    <yh-grid-item><div class="grid-demo-item">2</div></yh-grid-item>
    <yh-grid-item><div class="grid-demo-item">3</div></yh-grid-item>
  </yh-grid>
</template>`,
    context: {
      docPath: 'components/grid.md'
    },
    smoke: {
      selector: '.yh-grid',
      evaluate: async (page) => {
        const display = await page.locator('.yh-grid').evaluate((el) => getComputedStyle(el).display)
        if (display !== 'grid') {
          throw new Error(`Expected .yh-grid display:grid, got "${display}"`)
        }

        const itemStyles = await page.locator('.grid-demo-item').first().evaluate((el) => {
          const style = getComputedStyle(el)
          return {
            backgroundColor: style.backgroundColor,
            paddingTop: style.paddingTop,
            borderTopLeftRadius: style.borderTopLeftRadius
          }
        })
        if (itemStyles.backgroundColor === 'rgba(0, 0, 0, 0)') {
          throw new Error('Expected page-level grid demo styles to be applied')
        }
        if (itemStyles.paddingTop === '0px' || itemStyles.borderTopLeftRadius === '0px') {
          throw new Error('Expected shared grid demo box styles to be applied')
        }
      }
    }
  }
] as const

interface SmokeExpectation {
  selector: string
  text?: string
  evaluate?: (page: Awaited<ReturnType<typeof chromium.launch>> extends { newPage(): infer T }
    ? Awaited<T>
    : never) => Promise<void>
}

interface WorkspaceManifest {
  name: string
  version: string
}

async function readWorkspaceManifest(packageDirName: string): Promise<WorkspaceManifest> {
  const manifestPath = path.join(packagesRoot, packageDirName, 'package.json')
  return JSON.parse(await readFile(manifestPath, 'utf8')) as WorkspaceManifest
}

async function runPnpm(args: string[], cwd: string) {
  const command = `${pnpmCommand} ${args.map((arg) => `"${arg.replace(/"/g, '\\"')}"`).join(' ')}`
  await execAsync(command, {
    cwd,
    env: process.env,
    windowsHide: true
  })
}

async function createWorkspaceTarballMap() {
  await rm(packOutputDir, { recursive: true, force: true })
  await mkdir(packOutputDir, { recursive: true })

  const tarballMap = new Map<string, string>()
  const packageEntries = await readdir(packagesRoot, { withFileTypes: true })

  for (const entry of packageEntries) {
    if (!entry.isDirectory()) continue

    const manifest = await readWorkspaceManifest(entry.name)
    if (!SANDBOX_WORKSPACE_PACKAGES.includes(manifest.name as (typeof SANDBOX_WORKSPACE_PACKAGES)[number])) {
      continue
    }

    const packageDir = path.join(packagesRoot, entry.name)
    await runPnpm(['pack', '--pack-destination', packOutputDir], packageDir)

    const tarballName = `${manifest.name.slice(1).replace('/', '-')}-${manifest.version}.tgz`
    tarballMap.set(manifest.name, path.join(packOutputDir, tarballName))
  }

  for (const packageName of SANDBOX_WORKSPACE_PACKAGES) {
    if (!tarballMap.has(packageName)) {
      throw new Error(`Missing packed tarball for ${packageName}`)
    }
  }

  return tarballMap
}

function applyWorkspaceOverrides(
  files: Record<string, string>,
  caseDir: string,
  tarballMap: Map<string, string>
): Record<string, string> {
  const packageJson = JSON.parse(files['package.json']) as Record<string, any>
  const overrides = Object.fromEntries(
    [...tarballMap.entries()].map(([packageName, tarballPath]) => [
      packageName,
      `file:${path.relative(caseDir, tarballPath).replace(/\\/g, '/')}`
    ])
  )

  packageJson.pnpm = {
    ...(packageJson.pnpm ?? {}),
    overrides: {
      ...(packageJson.pnpm?.overrides ?? {}),
      ...overrides
    }
  }

  return {
    ...files,
    'package.json': JSON.stringify(packageJson, null, 2) + '\n'
  }
}

async function writeProject(targetDir: string, files: Record<string, string>) {
  for (const [relativePath, content] of Object.entries(files)) {
    const absolutePath = path.join(targetDir, relativePath)
    await mkdir(path.dirname(absolutePath), { recursive: true })
    await writeFile(absolutePath, content, 'utf8')
  }
}

async function removeWithRetry(targetDir: string, attempts = 5) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      await rm(targetDir, { recursive: true, force: true })
      return
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'EBUSY' || attempt === attempts) {
        throw error
      }

      await new Promise((resolve) => setTimeout(resolve, attempt * 300))
    }
  }
}

function getAvailablePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const server = net.createServer()
    server.unref()
    server.on('error', reject)
    server.listen(0, '127.0.0.1', () => {
      const address = server.address()
      if (!address || typeof address === 'string') {
        server.close(() => reject(new Error('Failed to resolve an available port')))
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

function waitForServer(url: string, timeoutMs = 120000): Promise<void> {
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
        reject(new Error(`Timed out waiting for dev server: ${url}`))
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
      await execAsync(`taskkill /pid ${pid} /T /F`, {
        windowsHide: true
      })
      return
    } catch {
      // fall through
    }
  }

  try {
    process.kill(pid, 'SIGKILL')
  } catch {
    // ignore already-exited processes
  }
}

async function runSmokeValidation(caseDir: string, smoke: SmokeExpectation) {
  const port = await getAvailablePort()
  const serverUrl = `http://127.0.0.1:${port}`
  const viteEntry = path.join(caseDir, 'node_modules', 'vite', 'bin', 'vite.js')
  const server = spawn(process.execPath, [viteEntry, '--host', '127.0.0.1', '--port', `${port}`], {
    cwd: caseDir,
    env: process.env,
    windowsHide: true,
    stdio: ['ignore', 'pipe', 'pipe']
  })

  let stdout = ''
  let stderr = ''
  let browser: Awaited<ReturnType<typeof chromium.launch>> | null = null

  server.stdout?.on('data', (chunk) => {
    stdout += chunk.toString()
  })

  server.stderr?.on('data', (chunk) => {
    stderr += chunk.toString()
  })

  try {
    console.log(`[sandbox] smoke test on ${path.basename(caseDir)} using ${serverUrl}`)
    await waitForServer(serverUrl)

    browser = await chromium.launch({ headless: true })
    const page = await browser.newPage()
    const runtimeErrors: string[] = []

    page.on('pageerror', (error) => {
      runtimeErrors.push(`pageerror: ${error.message}`)
    })

    page.on('console', (message) => {
      if (message.type() !== 'error') return
      const text = message.text()
      if (text.includes('favicon.ico')) return
      runtimeErrors.push(`console: ${text}`)
    })

    page.on('requestfailed', (request) => {
      const url = request.url()
      if (url.endsWith('/favicon.ico')) return
      runtimeErrors.push(`requestfailed: ${request.failure()?.errorText ?? url}`)
    })

    await page.goto(serverUrl, {
      waitUntil: 'networkidle',
      timeout: 120000
    })

    await page.locator(smoke.selector).first().waitFor({
      state: 'visible',
      timeout: 30000
    })

    if (smoke.text) {
      const content = await page.locator(smoke.selector).first().textContent()
      if (!content?.includes(smoke.text)) {
        throw new Error(`Expected text "${smoke.text}" in ${smoke.selector}, got "${content ?? ''}"`)
      }
    }

    if (smoke.evaluate) {
      await smoke.evaluate(page)
    }

    await page.waitForTimeout(1000)

    if (runtimeErrors.length > 0) {
      throw new Error(
        `Runtime validation failed for ${caseDir}\n${runtimeErrors.join('\n')}\n\nstdout:\n${stdout}\n\nstderr:\n${stderr}`
      )
    }
  } finally {
    if (browser) {
      await browser.close()
    }

    if (server.pid) {
      await stopProcessTree(server.pid)
    }
  }
}

async function validateCase(
  testCase: (typeof cases)[number],
  tarballMap: Map<string, string>
) {
  console.log(`[sandbox] validating ${testCase.name}`)

  const support = getSandboxSupport(testCase.code, testCase.context)
  if (!support.supported) {
    throw new Error(`${testCase.name}: ${support.reason ?? 'unsupported'}`)
  }

  const caseDir = path.join(tempRoot, testCase.name)
  const baseFiles = await createSandboxProjectFiles(
    testCase.title,
    testCase.code,
    testCase.context,
    {
    loadSiteAssetText: async (assetPath) =>
      readFile(path.join(rootDir, 'docs', 'public', ...assetPath.split('/')), 'utf8')
    }
  )
  const files = applyWorkspaceOverrides(baseFiles, caseDir, tarballMap)

  await removeWithRetry(caseDir)
  await mkdir(caseDir, { recursive: true })
  await writeProject(caseDir, files)

  await runPnpm(['install', '--ignore-workspace'], caseDir)
  await runPnpm(['run', 'build'], caseDir)
  await runSmokeValidation(caseDir, testCase.smoke)
}

async function main() {
  await removeWithRetry(tempRoot)
  await mkdir(tempRoot, { recursive: true })

  console.log('[sandbox] building workspace packages')
  await runPnpm(['build'], rootDir)

  console.log('[sandbox] packing local workspace tarballs')
  const tarballMap = await createWorkspaceTarballMap()

  for (const testCase of cases) {
    await validateCase(testCase, tarballMap)
  }

  console.log(`Validated ${cases.length} sandbox demos in ${tempRoot}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
