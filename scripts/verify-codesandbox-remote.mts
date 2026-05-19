import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import process from 'node:process'
import { chromium } from 'playwright'
import LZString from 'lz-string'
import { createCodeSandboxProjectFiles } from '../docs/.vitepress/theme/utils/demo-sandbox'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(__dirname, '..')
const tempDir = resolve(rootDir, '.codex-temp')
const codeSandboxRuntimeDir = resolve(rootDir, 'docs', 'public', 'codesandbox-runtime')
const codeSandboxManifestPromise = readFile(
  join(codeSandboxRuntimeDir, 'manifest.json'),
  'utf8'
).then((text) => JSON.parse(text))

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
        throw new Error(
          'Expected primary button text wrapper to render in remote CodeSandbox smoke'
        )
      }

      if (metrics.hostWidth <= metrics.textWidth + 8) {
        throw new Error(
          `Expected primary button width to contain its text in remote CodeSandbox smoke (button=${metrics.hostWidth}, text=${metrics.textWidth})`
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
    text: '',
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
        throw new Error('Expected ai chat sender actions to render in remote CodeSandbox smoke')
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
    text: '',
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
    text: '',
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

function selectTestCases(allCases: typeof testCases): typeof testCases {
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
    throw new Error(`No remote CodeSandbox cases matched CODESANDBOX_CASE_FILTER=${filter}`)
  }

  return selected
}

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

class ExternalServiceInterferenceError extends Error {
  readonly status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.name = 'ExternalServiceInterferenceError'
    this.status = status
  }
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

function looksLikeCloudflareChallenge(text: string): boolean {
  const normalized = text.toLowerCase()
  return (
    normalized.includes('challenges.cloudflare.com') ||
    normalized.includes('cf-chl') ||
    normalized.includes('just a moment') ||
    normalized.includes('attention required') ||
    normalized.includes('security policy')
  )
}

function shouldSoftFailForExternalService(error: unknown): boolean {
  if (!(error instanceof ExternalServiceInterferenceError)) {
    return false
  }

  if (process.env.CODESANDBOX_REMOTE_STRICT === 'true') {
    return false
  }

  return true
}

async function createRemoteSandbox(testCase: TestCase) {
  const files = await createCodeSandboxProjectFiles(
    testCase.title,
    testCase.code,
    testCase.context,
    {
      manifest: await codeSandboxManifestPromise,
      loadRuntimeAssetText: async (relativePath) =>
        readFile(join(codeSandboxRuntimeDir, ...relativePath.split('/')), 'utf8'),
      loadSiteAssetText: async (assetPath) =>
        readFile(join(rootDir, 'docs', 'public', ...assetPath.split('/')), 'utf8')
    }
  )
  testCase.verifyFiles?.(files)
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
      query: 'file=/src/Demo.vue&view=split'
    }).toString()
  })

  const defineText = await defineResponse.text()
  if (!defineResponse.ok) {
    if (defineResponse.status === 403 && looksLikeCloudflareChallenge(defineText)) {
      throw new ExternalServiceInterferenceError(
        `CodeSandbox define blocked by Cloudflare challenge (${defineResponse.status})`,
        defineResponse.status
      )
    }

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
  const { sandboxId, previewUrl } = await createRemoteSandbox(testCase)
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
    const contentType = response.headers()['content-type'] || ''
    if (
      response.request().resourceType() === 'script' &&
      /\.m?[jt]sx?(?:[?#].*)?$/i.test(url) &&
      contentType.includes('text/html')
    ) {
      runtimeErrors.push(`script-served-as-html: ${url} (${contentType})`)
      return
    }
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
  const selectedTestCases = selectTestCases(testCases)

  for (const testCase of selectedTestCases) {
    results.push(await verifyTestCase(testCase))
  }

  console.log(JSON.stringify({ ok: true, results }, null, 2))
}

main().catch((error) => {
  if (shouldSoftFailForExternalService(error)) {
    console.warn(
      `[verify:codesandbox-remote] skipped due to external service interference: ${error.message}`
    )
    console.warn(
      '[verify:codesandbox-remote] Set CODESANDBOX_REMOTE_STRICT=true to fail CI on this condition.'
    )
    process.exitCode = 0
    return
  }

  console.error(error)
  process.exitCode = 1
})
