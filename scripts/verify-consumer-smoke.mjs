import { spawn } from 'node:child_process'
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises'
import net from 'node:net'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const viteCli = path.resolve(rootDir, 'node_modules/vite/bin/vite.js')
const nuxtCli = path.resolve(rootDir, 'node_modules/nuxt/bin/nuxt.mjs')
const pnpmCli = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm'

function getAvailablePort() {
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

function runNodeCommand(args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, {
      cwd,
      env: process.env,
      stdio: 'inherit',
      windowsHide: true
    })

    child.on('error', reject)
    child.on('close', (code) => {
      if (code === 0) {
        resolve()
        return
      }

      reject(new Error(`Command failed: node ${args.join(' ')}`))
    })
  })
}

function runCommand(command, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      env: process.env,
      shell: process.platform === 'win32',
      stdio: 'inherit',
      windowsHide: true
    })

    child.on('error', reject)
    child.on('close', (code) => {
      if (code === 0) {
        resolve()
        return
      }

      reject(new Error(`Command failed: ${command} ${args.join(' ')}`))
    })
  })
}

function waitForServer(url, timeoutMs = 120000) {
  const startedAt = Date.now()

  return new Promise((resolve, reject) => {
    const attempt = async () => {
      try {
        const response = await fetch(url)
        if (response.status < 500) {
          resolve()
          return
        }
      } catch {}

      if (Date.now() - startedAt > timeoutMs) {
        reject(new Error(`Timed out waiting for server: ${url}`))
        return
      }

      setTimeout(attempt, 1000)
    }

    void attempt()
  })
}

async function stopProcessTree(pid) {
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
    } catch {}
  }

  try {
    process.kill(pid, 'SIGKILL')
  } catch {}
}

async function startPreview(cwd, args, readyUrl, envOverrides = {}) {
  const child = spawn(process.execPath, args, {
    cwd,
    env: {
      ...process.env,
      ...envOverrides
    },
    stdio: ['ignore', 'pipe', 'pipe'],
    windowsHide: true
  })

  let stdout = ''
  let stderr = ''
  child.stdout?.on('data', (chunk) => {
    stdout += chunk.toString()
  })
  child.stderr?.on('data', (chunk) => {
    stderr += chunk.toString()
  })

  try {
    await waitForServer(readyUrl)
    return { child, stdoutRef: () => stdout, stderrRef: () => stderr }
  } catch (error) {
    if (child.pid) {
      await stopProcessTree(child.pid)
    }

    throw new Error(
      `${error instanceof Error ? error.message : String(error)}\n[stdout]\n${stdout}\n[stderr]\n${stderr}`
    )
  }
}

async function createViteFixture() {
  const cwd = await mkdtemp(path.join(rootDir, '.vite-consumer-smoke-'))

  const vueEntry = JSON.stringify(
    path.resolve(rootDir, 'node_modules/vue/dist/vue.runtime.esm-bundler.js')
  )
  const componentsEntry = JSON.stringify(
    path.resolve(rootDir, 'packages/components/dist/index.mjs')
  )
  const hooksEntry = JSON.stringify(path.resolve(rootDir, 'packages/hooks/dist/index.mjs'))
  const utilsEntry = JSON.stringify(path.resolve(rootDir, 'packages/utils/dist/index.mjs'))
  const themeEntry = JSON.stringify(path.resolve(rootDir, 'packages/theme/dist/index.mjs'))
  const localeEntry = JSON.stringify(path.resolve(rootDir, 'packages/locale/dist/index.mjs'))
  const yhUiEntry = JSON.stringify(path.resolve(rootDir, 'packages/yh-ui/dist/index.mjs'))
  const yhUiCssEntry = JSON.stringify(path.resolve(rootDir, 'packages/yh-ui/dist/style.css'))
  const pluginVueEntry = JSON.stringify(
    path.resolve(rootDir, 'node_modules/@vitejs/plugin-vue/dist/index.mjs')
  )

  await mkdir(path.join(cwd, 'src'), { recursive: true })
  await writeFile(
    path.join(cwd, 'index.html'),
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>YH-UI Vite Smoke</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
`
  )
  await writeFile(
    path.join(cwd, 'vite.config.mjs'),
    `import { defineConfig } from ${JSON.stringify(path.resolve(rootDir, 'node_modules/vite/dist/node/index.js'))}
import vue from ${pluginVueEntry}

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      { find: '@yh-ui/yh-ui/css', replacement: ${yhUiCssEntry} },
      { find: '@yh-ui/yh-ui', replacement: ${yhUiEntry} },
      { find: '@yh-ui/components', replacement: ${componentsEntry} },
      { find: '@yh-ui/hooks', replacement: ${hooksEntry} },
      { find: '@yh-ui/utils', replacement: ${utilsEntry} },
      { find: '@yh-ui/theme', replacement: ${themeEntry} },
      { find: '@yh-ui/locale', replacement: ${localeEntry} },
      { find: 'vue', replacement: ${vueEntry} }
    ]
  }
})
`
  )
  await writeFile(
    path.join(cwd, 'src/main.ts'),
    `import { createApp, h } from 'vue'
import YhUI from '@yh-ui/yh-ui'
import '@yh-ui/yh-ui/css'
import { YhButton, YhAlert } from '@yh-ui/components'

createApp({
  render() {
    return h('main', { class: 'smoke-app' }, [
      h('h1', 'YH-UI Vite Smoke'),
      h(YhButton, { type: 'primary' }, () => 'Primary Action'),
      h(YhAlert, { title: 'Smoke Alert', type: 'success', closable: false })
    ])
  }
}).use(YhUI).mount('#app')
`
  )

  return cwd
}

async function verifyViteConsumer() {
  const cwd = await createViteFixture()
  const port = await getAvailablePort()

  try {
    await runNodeCommand([viteCli, 'build', '--config', 'vite.config.mjs'], cwd)

    const preview = await startPreview(
      cwd,
      [
        viteCli,
        'preview',
        '--config',
        'vite.config.mjs',
        '--host',
        '127.0.0.1',
        '--port',
        `${port}`
      ],
      `http://127.0.0.1:${port}/`
    )

    const browser = await chromium.launch({ headless: true })
    const page = await browser.newPage()

    try {
      await page.goto(`http://127.0.0.1:${port}/`, {
        waitUntil: 'domcontentloaded',
        timeout: 120000
      })
      await page.locator('h1').waitFor({ state: 'visible', timeout: 60000 })

      const buttonText = await page.locator('.yh-button--primary').textContent()
      if (!buttonText?.includes('Primary Action')) {
        throw new Error(`Unexpected Vite smoke button text: "${buttonText}"`)
      }

      const alertTitle = await page.locator('.yh-alert__title').textContent()
      if (!alertTitle?.includes('Smoke Alert')) {
        throw new Error(`Unexpected Vite smoke alert title: "${alertTitle}"`)
      }
    } finally {
      await browser.close()
      if (preview.child.pid) {
        await stopProcessTree(preview.child.pid)
      }
    }

    return 'Vite + Vue consumer build + preview'
  } finally {
    await rm(cwd, { recursive: true, force: true })
  }
}

async function verifyNuxtConsumer() {
  const cwd = path.resolve(rootDir, 'playground-nuxt')
  const port = await getAvailablePort()

  await runCommand(pnpmCli, ['-C', path.resolve(rootDir, 'packages/nuxt'), 'build'], rootDir)
  await runNodeCommand([nuxtCli, 'build'], cwd)

  const preview = await startPreview(
    cwd,
    [path.resolve(cwd, '.output/server/index.mjs')],
    `http://127.0.0.1:${port}/`,
    {
      HOST: '127.0.0.1',
      NITRO_HOST: '127.0.0.1',
      PORT: `${port}`,
      NITRO_PORT: `${port}`
    }
  )

  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()

  try {
    await page.goto(`http://127.0.0.1:${port}/`, {
      waitUntil: 'domcontentloaded',
      timeout: 120000
    })
    await page.locator('h1').waitFor({ state: 'visible', timeout: 60000 })

    const heading = await page.locator('h1').textContent()
    if (!heading?.includes('YH-UI')) {
      throw new Error(`Unexpected Nuxt consumer heading: "${heading}"`)
    }

    const buttonCount = await page.locator('.yh-button').count()
    if (buttonCount < 3) {
      throw new Error(
        `Expected Nuxt consumer to render multiple YH-UI buttons, received ${buttonCount}`
      )
    }
  } finally {
    await browser.close()
    if (preview.child.pid) {
      await stopProcessTree(preview.child.pid)
    }
  }

  return 'Nuxt consumer build + preview'
}

async function main() {
  const results = []
  results.push(await verifyViteConsumer())
  results.push(await verifyNuxtConsumer())

  console.log(JSON.stringify({ ok: true, results }, null, 2))
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
