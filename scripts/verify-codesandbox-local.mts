import { spawn } from 'node:child_process'
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import http from 'node:http'
import net from 'node:net'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import process from 'node:process'
import { chromium } from 'playwright'
import { createCodeSandboxProjectFiles } from '../docs/.vitepress/theme/utils/demo-sandbox'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(__dirname, '..')
const runtimeDir = resolve(rootDir, 'docs/public/codesandbox-runtime')
const tempRootDir = resolve(rootDir, '.codex-temp/codesandbox-local')
const isWin = process.platform === 'win32'
const pnpmCommand = isWin ? 'pnpm.cmd' : 'pnpm'

type BrowserPage =
  Awaited<ReturnType<typeof chromium.launch>> extends { newPage(): infer T } ? Awaited<T> : never

interface TestCase {
  name: string
  title: string
  code: string
  context?: {
    docPath?: string
  }
  selector: string
  text?: string
  evaluate?: (page: BrowserPage) => Promise<void>
}

interface CodeSandboxManifest {
  version: number
  supportFiles: string[]
  components: Record<
    string,
    { files: string[]; entry: string; module: string; style: string | null }
  >
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
    text: 'Hello Sandbox'
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
    process.kill(pid, 'SIGKILL')
  } catch {
    // ignore
  }
}

async function runCommand(cwd: string, args: string[], timeoutMs = 20 * 60 * 1000): Promise<void> {
  await new Promise((resolve, reject) => {
    const child = spawn(pnpmCommand, args, {
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
      reject(new Error(`pnpm ${args.join(' ')} timed out after ${timeoutMs}ms`))
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
          `pnpm ${args.join(' ')} failed with exit code ${code}\n[stdout]\n${stdout}\n[stderr]\n${stderr}`
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

async function buildProjectFiles(testCase: TestCase): Promise<Record<string, string>> {
  const manifest = JSON.parse(
    await readFile(join(runtimeDir, 'manifest.json'), 'utf8')
  ) as CodeSandboxManifest

  return createCodeSandboxProjectFiles(testCase.title, testCase.code, testCase.context, {
    manifest,
    loadRuntimeAssetText: async (relativePath) =>
      readFile(join(runtimeDir, ...relativePath.split('/')), 'utf8'),
    loadSiteAssetText: async (assetPath) =>
      readFile(join(rootDir, 'docs', 'public', ...assetPath.split('/')), 'utf8')
  })
}

async function verifyLocalSandbox(testCase: TestCase) {
  const sandboxDir = join(tempRootDir, testCase.name)
  const screenshotPath = join(tempRootDir, `${testCase.name}.png`)
  const files = await buildProjectFiles(testCase)
  await writeProjectFiles(sandboxDir, files)

  await runCommand(sandboxDir, ['install', '--lockfile=false', '--reporter=append-only'])
  await runCommand(sandboxDir, ['build'])

  const port = await getAvailablePort()
  const previewUrl = `http://127.0.0.1:${port}/`
  const server = spawn(pnpmCommand, ['exec', 'vite', '--host', '127.0.0.1', '--port', `${port}`], {
    cwd: sandboxDir,
    env: {
      ...process.env,
      NODE_OPTIONS: process.env.NODE_OPTIONS || '--max-old-space-size=6144'
    },
    shell: isWin,
    stdio: 'pipe',
    windowsHide: true
  })

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

  for (const testCase of testCases) {
    results.push(await verifyLocalSandbox(testCase))
  }

  console.log(JSON.stringify({ ok: true, results }, null, 2))
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
