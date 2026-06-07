import { spawn, spawnSync } from 'node:child_process'
import { mkdir } from 'node:fs/promises'
import { createServer } from 'node:net'
import { resolve } from 'node:path'
import { chromium } from 'playwright'

const root = resolve(import.meta.dirname, '..')
const artifactDir = resolve(root, 'test-results', 'playgrounds')
const nuxtNodeOptions = '--disable-warning=DEP0155'

const targets = [
  {
    name: 'vue',
    cwd: resolve(root, 'playground'),
    command: [
      'pnpm',
      ['exec', 'vite', '--host', '127.0.0.1', '--port', '__PORT__', '--strictPort']
    ],
    heading: 'YH-UI component library workbench',
    sections: [
      'Overview',
      'Basic',
      'Form',
      'Data',
      'Feedback',
      'Navigation',
      'Layout',
      'Flow',
      'Quality'
    ]
  },
  {
    name: 'nuxt',
    cwd: resolve(root, 'playground-nuxt'),
    command: ['pnpm', ['exec', 'nuxi', 'dev', '--host', '127.0.0.1', '--port', '__PORT__']],
    heading: 'Industry-style integration playground',
    sections: ['Health', 'Basic', 'Form', 'Data', 'Feedback', 'Layout', 'Quality']
  }
]

const timeoutMs = 120_000
const shutdownGraceMs = 2_000

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
          rejectPort(new Error('Unable to allocate a playground verification port'))
        }
      })
    })
  })
}

async function prepareTargets() {
  for (const target of targets) {
    target.port = await getFreePort()
    target.url = `http://127.0.0.1:${target.port}`
  }
}

function startTarget(target) {
  const [cmd, args] = target.command
  const resolvedArgs = args.map((arg) => (arg === '__PORT__' ? String(target.port) : arg))
  const child = spawn(cmd, resolvedArgs, {
    cwd: target.cwd,
    env:
      target.name === 'nuxt'
        ? {
            ...process.env,
            NODE_OPTIONS: [process.env.NODE_OPTIONS || '', nuxtNodeOptions].join(' ').trim()
          }
        : process.env,
    detached: process.platform !== 'win32',
    shell: process.platform === 'win32',
    stdio: ['ignore', 'pipe', 'pipe']
  })

  const logs = []
  child.stdout.on('data', (chunk) => logs.push(chunk.toString()))
  child.stderr.on('data', (chunk) => logs.push(chunk.toString()))
  child.on('exit', (code) => {
    if (code && code !== 0) {
      logs.push(`[verify-playgrounds] ${target.name} exited with code ${code}`)
    }
  })

  return { child, logs }
}

async function stopTarget(server) {
  if (server.child.killed) return

  if (process.platform === 'win32') {
    spawnSync('taskkill', ['/pid', String(server.child.pid), '/T', '/F'], { stdio: 'ignore' })
    return
  }

  try {
    process.kill(-server.child.pid, 'SIGTERM')
  } catch {}

  await new Promise((resolve) => setTimeout(resolve, shutdownGraceMs))

  try {
    process.kill(-server.child.pid, 'SIGKILL')
  } catch {}
}

function withServerLogs(error, target, server) {
  const logs = server.logs.join('').trim()
  if (!logs) return error

  error.message = `${error.message}\n\n[${target.name} server logs]\n${logs}`
  return error
}

async function waitForUrl(page, url) {
  const deadline = Date.now() + timeoutMs
  let lastError

  while (Date.now() < deadline) {
    try {
      const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 10_000 })
      if (response?.ok()) return
      lastError = new Error(`HTTP ${response?.status()} at ${url}`)
    } catch (error) {
      lastError = error
      await new Promise((resolveWait) => setTimeout(resolveWait, 1_000))
    }
  }

  throw lastError ?? new Error(`Timed out waiting for ${url}`)
}

async function verifyTarget(browser, target, server) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
  const consoleMessages = []
  const failedRequests = []

  page.on('console', (message) => {
    if (['error', 'warning'].includes(message.type())) {
      consoleMessages.push(`${message.type()}: ${message.text()}`)
    }
  })
  page.on('pageerror', (error) => {
    consoleMessages.push(`pageerror: ${error.message}`)
  })
  page.on('response', (response) => {
    if (response.status() >= 400) {
      failedRequests.push(`${response.status()} ${response.url()}`)
    }
  })

  await waitForUrl(page, target.url)

  const heading = await page.locator('h1').first().innerText()
  if (heading !== target.heading) {
    throw new Error(
      `${target.name} heading mismatch: expected "${target.heading}", got "${heading}"`
    )
  }

  const bodyText = await page.locator('body').innerText()
  for (const section of target.sections) {
    if (!bodyText.includes(section)) {
      throw new Error(`${target.name} missing section text: ${section}`)
    }
  }

  if (target.name === 'vue') {
    await page.locator('[data-section="form"]').click()
    await page.locator('[data-section="data"]').click()
    await page.locator('[data-section="flow"]').click()
    await page.getByRole('button', { name: 'Add node' }).click()
    await page.locator('[data-section="feedback"]').click()
    await page.getByRole('button', { name: 'Success message' }).click()
    await page.locator('[data-section="quality"]').click()
    await page.getByText('Release confidence').waitFor()
  } else {
    await page.locator('a[href="#form"]').click()
    await page.locator('a[href="#data"]').click()
    await page.locator('#feedback').getByRole('button', { name: 'Success' }).click()
    await page.locator('a[href="#quality"]').click()
    await page.getByText('Nuxt consumer contract').waitFor()
  }

  await page.screenshot({
    path: resolve(artifactDir, `${target.name}-desktop.png`),
    fullPage: true
  })

  await page.setViewportSize({ width: 390, height: 844 })
  await page.screenshot({
    path: resolve(artifactDir, `${target.name}-mobile.png`),
    fullPage: true
  })

  if (consoleMessages.length > 0 || failedRequests.length > 0) {
    throw new Error(
      [
        `${target.name} browser verification failed.`,
        consoleMessages.length ? `Console:\n${consoleMessages.join('\n')}` : '',
        failedRequests.length ? `Requests:\n${failedRequests.join('\n')}` : '',
        `Server logs:\n${server.logs.join('')}`
      ]
        .filter(Boolean)
        .join('\n\n')
    )
  }

  await page.close()
}

async function main() {
  await mkdir(artifactDir, { recursive: true })
  await prepareTargets()

  const servers = targets.map((target) => ({ target, server: startTarget(target) }))
  const browser = await chromium.launch({ headless: true })

  try {
    for (const { target, server } of servers) {
      try {
        await verifyTarget(browser, target, server)
        console.log(`[verify-playgrounds] ${target.name} passed`)
      } catch (error) {
        throw withServerLogs(error, target, server)
      }
    }
  } finally {
    await browser.close()
    for (const { server } of servers) {
      await stopTarget(server)
    }
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
