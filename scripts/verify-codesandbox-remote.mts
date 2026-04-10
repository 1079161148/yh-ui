import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import LZString from 'lz-string'
import { createCodeSandboxProjectFiles } from '../docs/.vitepress/theme/utils/demo-sandbox'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(__dirname, '..')
const runtimeDir = resolve(rootDir, 'docs/public/codesandbox-runtime')
const tempDir = resolve(rootDir, '.codex-temp')
const screenshotPath = resolve(tempDir, 'codesandbox-remote-button.png')
const htmlDumpPath = resolve(tempDir, 'codesandbox-remote-button.html')

const testCase = {
  title: 'Basic Button',
  code: `<template>
  <yh-button type="primary">Hello Sandbox</yh-button>
</template>`,
  selector: '.yh-button',
  text: 'Hello Sandbox'
}

function compressParameters(input: string): string {
  return LZString.compressToBase64(input)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '')
}

async function loadRuntimeManifest() {
  return JSON.parse(await readFile(join(runtimeDir, 'manifest.json'), 'utf8')) as {
    version: number
    supportFiles: string[]
    components: Record<string, { files: string[]; entry: string; style: string | null }>
  }
}

function shouldIgnoreErrorText(text: string): boolean {
  return text.includes('favicon.ico')
}

function isIgnorablePreviewNoise(entry: string, previewUrl: string): boolean {
  return (
    entry === `response: 400 ${previewUrl}` ||
    entry === 'console: Failed to load resource: the server responded with a status of 400 ()'
  )
}

async function main() {
  const manifest = await loadRuntimeManifest()
  const files = await createCodeSandboxProjectFiles(testCase.title, testCase.code, undefined, {
    manifest,
    loadRuntimeAssetText: async (relativePath) =>
      readFile(join(runtimeDir, ...relativePath.split('/')), 'utf8')
  })

  const payload = {
    files: Object.fromEntries(
      Object.entries(files).map(([filePath, content]) => [filePath, { content }])
    )
  }

  const defineResponse = await fetch('https://codesandbox.io/api/v1/sandboxes/define?json=1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      parameters: compressParameters(JSON.stringify(payload)),
      query: 'file=/src/index.js'
    }).toString()
  })

  const defineText = await defineResponse.text()
  if (!defineResponse.ok) {
    throw new Error(`CodeSandbox define failed (${defineResponse.status}): ${defineText}`)
  }

  const { sandbox_id: sandboxId } = JSON.parse(defineText) as { sandbox_id?: string }
  if (!sandboxId) {
    throw new Error(`CodeSandbox define response missing sandbox_id: ${defineText}`)
  }

  const previewUrl = `https://${sandboxId}.csb.app/`
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

  page.on('response', (response) => {
    const url = response.url()
    if (!url.includes(`${sandboxId}.csb.app`)) return
    if (response.status() < 400 || shouldIgnoreErrorText(url)) return
    runtimeErrors.push(`response: ${response.status()} ${url}`)
  })

  try {
    await page.goto(previewUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 120000
    })

    const consentButton = page.locator('#btn-answer-yes')
    if (await consentButton.count()) {
      await consentButton.click()
      await page.waitForLoadState('domcontentloaded', { timeout: 120000 })
    }

    await page.locator(testCase.selector).first().waitFor({
      state: 'visible',
      timeout: 120000
    })

    const text = await page.locator(testCase.selector).first().innerText()
    if (!text.includes(testCase.text)) {
      throw new Error(
        `Expected "${testCase.text}" in ${testCase.selector}, received "${text || ''}"`
      )
    }

    await page.waitForTimeout(3000)
    await mkdir(dirname(screenshotPath), { recursive: true })
    await page.screenshot({ path: screenshotPath, fullPage: true })

    const blockingErrors = runtimeErrors.filter(
      (entry) => !isIgnorablePreviewNoise(entry, previewUrl)
    )
    if (blockingErrors.length > 0) {
      throw new Error(blockingErrors.join('\n'))
    }

    console.log(
      JSON.stringify(
        {
          ok: true,
          sandboxId,
          previewUrl,
          selector: testCase.selector,
          text,
          screenshotPath
        },
        null,
        2
      )
    )
  } catch (error) {
    await mkdir(dirname(htmlDumpPath), { recursive: true })
    await writeFile(htmlDumpPath, await page.content(), 'utf8')
    await page.screenshot({ path: screenshotPath, fullPage: true }).catch(() => undefined)
    throw new Error(
      `${error instanceof Error ? error.message : String(error)}\nPreview: ${previewUrl}\nHTML: ${htmlDumpPath}\nScreenshot: ${screenshotPath}`
    )
  } finally {
    await browser.close()
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
