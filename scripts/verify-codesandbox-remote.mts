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

const testCases = [
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
    text: '',
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
        throw new Error('Expected shared grid demo styles to be applied in CodeSandbox')
      }
      if (itemStyles.paddingTop === '0px' || itemStyles.borderTopLeftRadius === '0px') {
        throw new Error('Expected grid demo shared box styles to be applied in CodeSandbox')
      }
    }
  },
  {
    name: 'input',
    title: 'Basic Input',
    code: `<template>
  <div style="width: 320px">
    <yh-input placeholder="Type something" />
  </div>
</template>`,
    selector: '.yh-input',
    text: '',
    evaluate: async (page) => {
      const wrapperStyles = await page.locator('.yh-input__wrapper').evaluate((el) => {
        const style = getComputedStyle(el)
        return {
          display: style.display,
          borderTopLeftRadius: style.borderTopLeftRadius,
          backgroundColor: style.backgroundColor
        }
      })
      if (wrapperStyles.display !== 'flex') {
        throw new Error(
          `Expected .yh-input__wrapper display:flex, received "${wrapperStyles.display}"`
        )
      }
      if (wrapperStyles.borderTopLeftRadius === '0px') {
        throw new Error('Expected .yh-input__wrapper border radius styles to be applied')
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
    text: '',
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
    text: '',
    evaluate: async (page) => {
      await page.locator('.yh-ai-sender textarea').waitFor({ state: 'visible', timeout: 30000 })
      const buttonCount = await page.locator('.yh-ai-sender__send-btn').count()
      if (buttonCount < 1) {
        throw new Error('Expected ai sender submit button to render')
      }
    }
  },
  {
    name: 'table-click',
    title: 'Table Click',
    code: `<template>
  <div>
    <yh-table :data="tableData" @row-click="handleRowClick">
      <yh-table-column prop="date" label="日期" />
      <yh-table-column prop="name" label="姓名" />
      <yh-table-column prop="address" label="地址" />
    </yh-table>
    <p class="table-click-result">{{ currentName }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentName = ref('未点击')

const tableData = [
  { date: '2024-01-01', name: '张三', address: '北京市朝阳区建国路88号' },
  { date: '2024-01-02', name: '李四', address: '上海市浦东新区陆家嘴金融中心' }
]

const handleRowClick = (row: { name: string }) => {
  currentName.value = row.name
}
</script>`,
    selector: '.yh-table',
    text: '',
    evaluate: async (page) => {
      await page.locator('.yh-table__body tbody tr').first().click()
      await page.locator('.table-click-result').waitFor({ state: 'visible', timeout: 30000 })
      const result = await page.locator('.table-click-result').innerText()
      if (!result.includes('张三')) {
        throw new Error(`Expected row click result to include "张三", received "${result}"`)
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
    text: '',
    evaluate: async (page) => {
      const nodeCount = await page.locator('.yh-flow__node, .yh-flow-node').count()
      if (nodeCount < 2) {
        throw new Error(`Expected at least 2 rendered flow nodes, received ${nodeCount}`)
      }
    }
  }
]

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
  text: string
  evaluate?: (page: BrowserPage) => Promise<void>
}

function compressParameters(input: string): string {
  return LZString.compressToBase64(input)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '')
}

function shouldIgnoreErrorText(text: string): boolean {
  return (
    text.includes('[BABEL] Note: The code generator has deoptimised the styling') ||
    text.includes('favicon.ico') ||
    text.includes('fonts.googleapis.com') ||
    text.includes('fonts.gstatic.com')
  )
}

function isIgnorablePreviewNoise(entry: string, previewUrl: string): boolean {
  return (
    entry === `response: 400 ${previewUrl}` ||
    entry === 'console: Failed to load resource: the server responded with a status of 400 ()'
  )
}

async function createRemoteSandbox(title: string, code: string, context?: TestCase['context']) {
  const manifest = JSON.parse(await readFile(join(runtimeDir, 'manifest.json'), 'utf8')) as {
    version: number
    supportFiles: string[]
    components: Record<
      string,
      { files: string[]; entry: string; module: string; style: string | null }
    >
  }
  const files = await createCodeSandboxProjectFiles(title, code, context, {
    manifest,
    loadRuntimeAssetText: async (relativePath) =>
      readFile(join(runtimeDir, ...relativePath.split('/')), 'utf8'),
    loadSiteAssetText: async (assetPath) =>
      readFile(join(rootDir, 'docs', 'public', ...assetPath.split('/')), 'utf8')
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
      query: 'file=/src/Demo.vue'
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

  return {
    sandboxId,
    previewUrl: `https://${sandboxId}.csb.app/`
  }
}

async function verifyTestCase(testCase: TestCase) {
  const { sandboxId, previewUrl } = await createRemoteSandbox(
    testCase.title,
    testCase.code,
    testCase.context
  )
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  const runtimeErrors: string[] = []
  const screenshotPath = resolve(tempDir, `codesandbox-remote-${testCase.name}.png`)
  const htmlDumpPath = resolve(tempDir, `codesandbox-remote-${testCase.name}.html`)

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

    await page.waitForTimeout(3000)
    await mkdir(dirname(screenshotPath), { recursive: true })
    await page.screenshot({ path: screenshotPath, fullPage: true })

    const blockingErrors = runtimeErrors.filter(
      (entry) => !isIgnorablePreviewNoise(entry, previewUrl)
    )
    if (blockingErrors.length > 0) {
      throw new Error(blockingErrors.join('\n'))
    }

    return {
      ok: true,
      name: testCase.name,
      sandboxId,
      previewUrl,
      screenshotPath
    }
  } catch (error) {
    await mkdir(dirname(htmlDumpPath), { recursive: true })
    await writeFile(htmlDumpPath, await page.content(), 'utf8')
    await page.screenshot({ path: screenshotPath, fullPage: true }).catch(() => undefined)
    throw new Error(
      `[${testCase.name}] ${error instanceof Error ? error.message : String(error)}\nPreview: ${previewUrl}\nHTML: ${htmlDumpPath}\nScreenshot: ${screenshotPath}`
    )
  } finally {
    await browser.close()
  }
}

async function main() {
  const results = []

  for (const testCase of testCases) {
    results.push(await verifyTestCase(testCase))
  }

  console.log(JSON.stringify({ ok: true, results }, null, 2))
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
