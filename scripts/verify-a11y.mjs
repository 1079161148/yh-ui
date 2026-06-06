import { spawn, spawnSync } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { createServer } from 'node:net'
import { resolve } from 'node:path'
import { chromium } from 'playwright'

const root = resolve(import.meta.dirname, '..')
const artifactDir = resolve(root, 'test-results', 'a11y')
const vitepressCli = resolve(root, 'node_modules/vitepress/dist/node/cli.js')

const routes = [
  '/',
  '/guide/quickstart',
  '/guide/accessibility',
  '/guide/package-size',
  '/guide/flagship-examples',
  '/components/button',
  '/components/input',
  '/table/basic',
  '/flow/basic',
  '/ai-components/ai-chat',
  '/en/guide/accessibility',
  '/en/guide/package-size',
  '/en/guide/flagship-examples'
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

  const logs = []
  child.stdout.on('data', (chunk) => logs.push(chunk.toString()))
  child.stderr.on('data', (chunk) => logs.push(chunk.toString()))

  return { child, logs }
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

async function waitForUrl(page, urls) {
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

async function auditRoute(page, baseUrl, route) {
  await waitForUrl(page, routeCandidates(baseUrl, route))

  return page.evaluate(() => {
    const issues = []
    const warnings = []
    const visible = (element) => {
      const style = window.getComputedStyle(element)
      const rect = element.getBoundingClientRect()
      return (
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        Number(style.opacity) !== 0 &&
        rect.width > 0 &&
        rect.height > 0
      )
    }
    const textOf = (element) => (element.textContent || '').replace(/\s+/g, ' ').trim()
    const summarize = (element) => {
      const clone = element.cloneNode(true)
      clone.querySelectorAll('svg, path, use').forEach((child) => child.remove())
      return clone.outerHTML.replace(/\s+/g, ' ').slice(0, 220)
    }
    const accessibleName = (element) => {
      const labelledBy = element.getAttribute('aria-labelledby')
      if (labelledBy) {
        const label = labelledBy
          .split(/\s+/)
          .map((id) => document.getElementById(id)?.textContent?.trim())
          .filter(Boolean)
          .join(' ')
        if (label) return label
      }

      return (
        element.getAttribute('aria-label') ||
        element.getAttribute('alt') ||
        element.getAttribute('title') ||
        element.getAttribute('placeholder') ||
        textOf(element)
      ).trim()
    }

    if (!document.title.trim()) {
      issues.push({ rule: 'document-title', message: 'Document title is empty' })
    }

    const h1 = Array.from(document.querySelectorAll('h1')).filter(visible)
    if (h1.length !== 1) {
      issues.push({
        rule: 'h1-count',
        message: `Expected exactly one visible h1, found ${h1.length}`
      })
    }

    const ids = new Map()
    for (const element of document.querySelectorAll('[id]')) {
      const id = element.id
      if (!id) continue
      ids.set(id, (ids.get(id) || 0) + 1)
    }
    for (const [id, count] of ids) {
      if (count > 1) {
        const duplicateIdIssue = {
          rule: 'duplicate-id',
          message: `Duplicate id "${id}" appears ${count} times`
        }
        if (id.startsWith('node-') || id.startsWith('yh-mask-')) {
          warnings.push(duplicateIdIssue)
        } else {
          issues.push(duplicateIdIssue)
        }
      }
    }

    const headings = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6')).filter(visible)
    let previous = 0
    for (const heading of headings) {
      const level = Number(heading.tagName.slice(1))
      if (previous > 0 && level > previous + 1) {
        issues.push({
          rule: 'heading-order',
          message: `${heading.tagName} skips from h${previous}: "${textOf(heading).slice(0, 80)}"`
        })
      }
      previous = level
    }

    for (const image of Array.from(document.querySelectorAll('img')).filter(visible)) {
      const decorative =
        image.getAttribute('role') === 'presentation' ||
        image.getAttribute('aria-hidden') === 'true'
      if (!decorative && !image.hasAttribute('alt')) {
        issues.push({
          rule: 'image-alt',
          message: `Visible image is missing alt text: ${image.getAttribute('src') || '<inline>'}`
        })
      }
    }

    const interactiveSelector = [
      'button',
      'a[href]',
      '[role="button"]',
      '[role="link"]',
      '[role="menuitem"]',
      '[role="tab"]'
    ].join(',')
    for (const element of Array.from(document.querySelectorAll(interactiveSelector)).filter(
      visible
    )) {
      if (!accessibleName(element)) {
        issues.push({
          rule: 'interactive-name',
          message: `${element.tagName.toLowerCase()} has no accessible name: ${summarize(element)}`
        })
      }
    }

    for (const element of Array.from(document.querySelectorAll('input, select, textarea')).filter(
      visible
    )) {
      const id = element.getAttribute('id')
      const hasLabel = Boolean(id && document.querySelector(`label[for="${CSS.escape(id)}"]`))
      const implicitLabel = Boolean(element.closest('label'))
      if (!hasLabel && !implicitLabel && !accessibleName(element)) {
        issues.push({
          rule: 'form-label',
          message: `${element.tagName.toLowerCase()} has no label, aria-label, title, or placeholder: ${summarize(element)}`
        })
      }
    }

    return {
      title: document.title,
      h1: h1[0]?.textContent?.trim() || '',
      warnings,
      issues
    }
  })
}

async function main() {
  await mkdir(artifactDir, { recursive: true })

  const port = await getFreePort()
  const baseUrl = `http://127.0.0.1:${port}/yh-ui`
  const server = startDocs(port)
  const browser = await chromium.launch({ headless: true })
  const report = []

  try {
    const page = await browser.newPage({ viewport: { width: 1365, height: 900 } })

    for (const route of routes) {
      const result = await auditRoute(page, baseUrl, route)
      report.push({ route, ...result })
      console.log(
        `[a11y] ${route}: ${result.issues.length} issue(s), ${result.warnings.length} warning(s)`
      )
    }

    await page.close()
  } finally {
    await browser.close()
    stopDocs(server)
  }

  const reportPath = resolve(artifactDir, 'a11y-report.json')
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8')

  const failures = report.flatMap((entry) =>
    entry.issues.map((issue) => `${entry.route} ${issue.rule}: ${issue.message}`)
  )

  if (failures.length > 0) {
    throw new Error(
      `Accessibility audit failed:\n- ${failures.join('\n- ')}\nReport: ${reportPath}`
    )
  }

  console.log(`[a11y] passed ${routes.length} routes. Report: ${reportPath}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
