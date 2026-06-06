import { spawn, spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { createServer } from 'node:net'
import { resolve } from 'node:path'
import { chromium } from 'playwright'

const root = resolve(import.meta.dirname, '..')
const artifactDir = resolve(root, 'test-results', 'visual-regression')
const baselinePath = resolve(root, 'test', 'visual-baseline.json')
const vitepressCli = resolve(root, 'node_modules/vitepress/dist/node/cli.js')

const pages = [
  { name: 'home', route: '/' },
  { name: 'button', route: '/components/button' },
  { name: 'input', route: '/components/input' },
  { name: 'select', route: '/components/select' },
  { name: 'form', route: '/components/form' },
  { name: 'date-picker', route: '/components/date-picker' },
  { name: 'dropdown', route: '/components/dropdown' },
  { name: 'dialog', route: '/components/dialog' },
  { name: 'drawer', route: '/components/drawer' },
  { name: 'tabs', route: '/components/tabs' },
  { name: 'menu', route: '/components/menu' },
  { name: 'upload', route: '/components/upload' },
  { name: 'table-basic', route: '/table/basic' },
  { name: 'table-selection', route: '/table/selection' },
  { name: 'table-sort-filter', route: '/table/sort-filter' },
  { name: 'flow-basic', route: '/flow/basic' },
  { name: 'flow-custom-node', route: '/flow/custom-node' },
  { name: 'flow-ai-workflow', route: '/flow/ai-workflow' },
  { name: 'ai-chat', route: '/ai-components/ai-chat' },
  { name: 'ai-sender', route: '/ai-components/ai-sender' },
  { name: 'ai-bubble', route: '/ai-components/ai-bubble' },
  { name: 'icons', route: '/icons/' }
]

const viewports = [
  { name: 'desktop', width: 1365, height: 900 },
  { name: 'mobile', width: 390, height: 844 }
]

const timeoutMs = 120_000

async function getFreePort() {
  return new Promise((resolvePort, rejectPort) => {
    const server = createServer()
    server.unref()
    server.on('error', rejectPort)
    server.listen(0, '127.0.0.1', () => {
      const address = server.address()
      server.close(() => {
        if (typeof address === 'object' && address?.port) {
          resolvePort(address.port)
        } else {
          rejectPort(new Error('Unable to allocate a docs verification port'))
        }
      })
    })
  })
}

function startDocs(port) {
  const child = spawn(
    process.execPath,
    [vitepressCli, 'dev', 'docs', '--host', '127.0.0.1', '--port', String(port)],
    {
      cwd: root,
      stdio: ['ignore', 'pipe', 'pipe'],
      windowsHide: true
    }
  )

  return { child }
}

function stopDocs(server) {
  if (server.child.killed) return

  if (process.platform === 'win32') {
    spawnSync('taskkill', ['/pid', String(server.child.pid), '/T', '/F'], { stdio: 'ignore' })
    return
  }

  server.child.kill('SIGTERM')
}

function routeCandidates(baseUrl, route) {
  if (route === '/') return [`${baseUrl}/`]
  const normalized = route.startsWith('/') ? route : `/${route}`
  const withoutSlash = normalized.endsWith('/') ? normalized.slice(0, -1) : normalized
  return [
    `${baseUrl}${withoutSlash}`,
    `${baseUrl}${withoutSlash}.html`,
    `${baseUrl}${withoutSlash}/`
  ]
}

async function waitForPage(page, urls) {
  const deadline = Date.now() + timeoutMs
  let lastError

  while (Date.now() < deadline) {
    for (const url of urls) {
      try {
        const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 15_000 })
        if (response?.ok()) return url
        lastError = new Error(`HTTP ${response?.status()} at ${url}`)
      } catch (error) {
        lastError = error
      }
    }

    await new Promise((resolveWait) => setTimeout(resolveWait, 1_000))
  }

  throw lastError ?? new Error(`Timed out waiting for ${urls.join(', ')}`)
}

function hashBuffer(buffer) {
  return createHash('sha256').update(buffer).digest('hex')
}

async function readBaseline() {
  try {
    return JSON.parse(await readFile(baselinePath, 'utf8'))
  } catch {
    return null
  }
}

async function main() {
  await mkdir(artifactDir, { recursive: true })

  const port = await getFreePort()
  const baseUrl = `http://127.0.0.1:${port}/yh-ui`
  const server = startDocs(port)
  const browser = await chromium.launch({ headless: true })
  const baseline = await readBaseline()
  const manifest = {
    generatedAt: new Date().toISOString(),
    pages: []
  }

  try {
    const page = await browser.newPage()

    for (const target of pages) {
      for (const viewport of viewports) {
        await page.setViewportSize({ width: viewport.width, height: viewport.height })
        await waitForPage(page, routeCandidates(baseUrl, target.route))
        await page.locator('body').waitFor({ state: 'visible' })

        const screenshot = await page.screenshot({
          fullPage: true,
          path: resolve(artifactDir, `${target.name}-${viewport.name}.png`)
        })
        const bodyBox = await page.locator('body').boundingBox()
        const hash = hashBuffer(screenshot)

        if (!bodyBox || bodyBox.width < 100 || bodyBox.height < 100) {
          throw new Error(`${target.route} rendered an unexpectedly small body`)
        }

        manifest.pages.push({
          name: target.name,
          route: target.route,
          viewport: viewport.name,
          width: viewport.width,
          height: viewport.height,
          bytes: screenshot.length,
          sha256: hash
        })

        console.log(`[visual] ${target.route} ${viewport.name}: ${screenshot.length} bytes`)
      }
    }

    await page.close()
  } finally {
    await browser.close()
    stopDocs(server)
  }

  const manifestPath = resolve(artifactDir, 'manifest.json')
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')

  if (baseline?.pages?.length) {
    const baselineMap = new Map(
      baseline.pages.map((entry) => [`${entry.name}:${entry.viewport}`, entry.sha256])
    )
    const changed = manifest.pages.filter((entry) => {
      const key = `${entry.name}:${entry.viewport}`
      return baselineMap.has(key) && baselineMap.get(key) !== entry.sha256
    })

    if (changed.length > 0 && process.env.UPDATE_VISUAL_BASELINE !== '1') {
      throw new Error(
        `Visual baseline changed:\n- ${changed
          .map((entry) => `${entry.name} ${entry.viewport}`)
          .join('\n- ')}\nSet UPDATE_VISUAL_BASELINE=1 after reviewing screenshots.`
      )
    }
  }

  if (process.env.UPDATE_VISUAL_BASELINE === '1') {
    await writeFile(baselinePath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')
    console.log(`[visual] baseline updated: ${baselinePath}`)
  }

  console.log(`[visual] manifest written: ${manifestPath}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
