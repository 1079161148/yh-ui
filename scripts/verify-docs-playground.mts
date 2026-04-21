import { spawn } from 'node:child_process'
import { readFile } from 'node:fs/promises'
import http from 'node:http'
import net from 'node:net'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import LZString from 'lz-string'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const vitepressCli = path.resolve(rootDir, 'node_modules/vitepress/dist/node/cli.js')

const testCases = [
  {
    name: 'button',
    payload: {
      title: 'Basic Button',
      code: `<template>
  <yh-button>Default</yh-button>
  <yh-button type="primary">Primary</yh-button>
</template>`
    },
    selector: '.yh-button--primary',
    evaluate: async (
      frame: Awaited<ReturnType<typeof chromium.launch>> extends { newPage(): infer T }
        ? Awaited<T>['mainFrame']
        : never
    ) => {
      const count = await frame.locator('.yh-button').count()
      if (count < 2) {
        throw new Error(`Expected at least 2 buttons, received ${count}`)
      }
    }
  },
  {
    name: 'input-style',
    payload: {
      title: 'Basic Input',
      code: `<template>
  <div style="width: 320px">
    <yh-input placeholder="Type something" />
  </div>
</template>`
    },
    selector: '.yh-input__wrapper',
    evaluate: async (
      frame: Awaited<ReturnType<typeof chromium.launch>> extends { newPage(): infer T }
        ? Awaited<T>['mainFrame']
        : never
    ) => {
      const styles = await frame.locator('.yh-input__wrapper').evaluate((el) => {
        const style = getComputedStyle(el)
        return {
          display: style.display,
          borderTopLeftRadius: style.borderTopLeftRadius
        }
      })
      if (styles.display !== 'flex' && styles.display !== 'inline-flex') {
        throw new Error(`Expected input wrapper flex layout, received "${styles.display}"`)
      }
      if (styles.borderTopLeftRadius === '0px') {
        throw new Error('Expected input wrapper border radius style to be applied')
      }
    }
  },
  {
    name: 'grid-shared-style',
    payload: {
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
      }
    },
    selector: '.grid-demo-item',
    evaluate: async (
      frame: Awaited<ReturnType<typeof chromium.launch>> extends { newPage(): infer T }
        ? Awaited<T>['mainFrame']
        : never
    ) => {
      const styles = await frame
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
      if (styles.backgroundColor === 'rgba(0, 0, 0, 0)') {
        throw new Error('Expected grid demo shared styles to be applied in docs Playground')
      }
      if (styles.paddingTop === '0px' || styles.borderTopLeftRadius === '0px') {
        throw new Error('Expected grid demo shared spacing and radius styles in docs Playground')
      }
    }
  },
  {
    name: 'icons-package',
    payload: {
      title: 'Icons Import',
      code: `<template>
  <div style="display:flex;gap:12px;font-size:20px;color:#2563eb">
    <Icon icon="mdi:home" />
    <YhIcon icon="ep:search" />
  </div>
</template>

<script setup lang="ts">
import { Icon, YhIcon } from '@yh-ui/icons'
</script>`
    },
    selector: 'svg',
    evaluate: async (
      frame: Awaited<ReturnType<typeof chromium.launch>> extends { newPage(): infer T }
        ? Awaited<T>['mainFrame']
        : never
    ) => {
      const count = await frame.locator('svg').count()
      if (count < 2) {
        throw new Error(`Expected at least 2 rendered icons, received ${count}`)
      }
    }
  }
] as const

function compressPayload(input: object): string {
  return LZString.compressToEncodedURIComponent(JSON.stringify(input))
}

function shouldIgnoreError(entry: string): boolean {
  return (
    entry.includes('favicon.ico') ||
    entry.includes('fonts.googleapis.com') ||
    entry.includes('fonts.gstatic.com') ||
    entry.includes('An iframe which has both allow-scripts and allow-same-origin')
  )
}

function getAvailablePort(): Promise<number> {
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
        reject(new Error(`Timed out waiting for docs preview: ${url}`))
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

async function startDocsPreview() {
  const port = await getAvailablePort()
  const serverUrl = `http://127.0.0.1:${port}`
  const child = spawn(
    process.execPath,
    [vitepressCli, 'preview', '--host', '127.0.0.1', '--port', `${port}`],
    {
      cwd: path.resolve(rootDir, 'docs'),
      env: process.env,
      windowsHide: true,
      stdio: ['ignore', 'pipe', 'pipe']
    }
  )

  let stdout = ''
  let stderr = ''

  child.stdout?.on('data', (chunk) => {
    stdout += chunk.toString()
  })
  child.stderr?.on('data', (chunk) => {
    stderr += chunk.toString()
  })

  await waitForServer(`${serverUrl}/yh-ui/`)
  await waitForServer(`${serverUrl}/yh-ui/vp-icons.css`)
  return { child, serverUrl, stdoutRef: () => stdout, stderrRef: () => stderr }
}

async function verifyCase(serverUrl: string, testCase: (typeof testCases)[number]) {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  const runtimeErrors: string[] = []

  page.on('console', (message) => {
    if (message.type() !== 'error' && message.type() !== 'warning') return
    const text = message.text()
    if (shouldIgnoreError(text)) return
    runtimeErrors.push(`console: ${text}`)
  })

  page.on('pageerror', (error) => {
    runtimeErrors.push(`pageerror: ${error.message}`)
  })

  page.on('requestfailed', (request) => {
    const url = request.url()
    if (shouldIgnoreError(url)) return
    runtimeErrors.push(`requestfailed: ${request.failure()?.errorText ?? 'unknown'} ${url}`)
  })

  page.on('response', (response) => {
    const url = response.url()
    if (response.status() < 400 || shouldIgnoreError(url)) return
    runtimeErrors.push(`response: ${response.status()} ${url}`)
  })

  try {
    const demo = compressPayload(testCase.payload)
    const url = `${serverUrl}/yh-ui/playground/?demo=${demo}`
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 })

    await page.waitForFunction(() => window.frames.length > 0, { timeout: 120000 })
    await page.waitForTimeout(5000)

    const previewFrame = page.frames().find((frame) => frame.url() === 'about:srcdoc')
    if (!previewFrame) {
      throw new Error('Playground preview iframe was not created')
    }

    await previewFrame.locator(testCase.selector).first().waitFor({
      state: 'visible',
      timeout: 60000
    })

    await testCase.evaluate(previewFrame as never)

    const blockingErrors = runtimeErrors.filter((entry) => !shouldIgnoreError(entry))
    if (blockingErrors.length > 0) {
      throw new Error(blockingErrors.join('\n'))
    }

    return { ok: true, name: testCase.name }
  } finally {
    await browser.close()
  }
}

async function main() {
  const distDir = path.resolve(rootDir, 'docs/.vitepress/dist/index.html')
  await readFile(distDir, 'utf8')

  const { child, serverUrl, stdoutRef, stderrRef } = await startDocsPreview()

  try {
    const results = []
    for (const testCase of testCases) {
      results.push(await verifyCase(serverUrl, testCase))
    }
    console.log(JSON.stringify({ ok: true, results }, null, 2))
  } catch (error) {
    const details = `\n[docs-preview stdout]\n${stdoutRef()}\n[docs-preview stderr]\n${stderrRef()}`
    throw new Error(`${error instanceof Error ? error.message : String(error)}${details}`)
  } finally {
    if (child.pid) {
      await stopProcessTree(child.pid)
    }
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
