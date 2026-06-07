import { access } from 'node:fs/promises'
import { resolve } from 'node:path'
import { spawn } from 'node:child_process'
import process from 'node:process'

const isWin = process.platform === 'win32'
const pnpm = isWin ? 'pnpm.cmd' : 'pnpm'
const rootDir = process.cwd()
const codeSandboxManifestPath = resolve(rootDir, 'docs/public/codesandbox-runtime/manifest.json')

const DEFAULT_SMOKE_ROUTES = [
  '/yh-ui/components/button.html',
  '/yh-ui/components/grid.html',
  '/yh-ui/icons/getting-started.html',
  '/yh-ui/flow/basic.html',
  '/yh-ui/ai-components/ai-sender.html',
  '/yh-ui/ai-components/ai-code-block.html',
  '/yh-ui/ai-components/ai-mermaid.html',
  '/yh-ui/en/components/button.html'
]

function resolveMode(argv) {
  const mode = argv[2]?.trim()
  if (!mode || mode === 'smoke' || mode === 'exhaustive') {
    return mode || 'smoke'
  }

  throw new Error(`Unsupported docs sandbox validation mode "${mode}"`)
}

function createEnv(mode) {
  const env = {
    ...process.env,
    DOCS_SANDBOX_CONCURRENCY: process.env.DOCS_SANDBOX_CONCURRENCY || '4',
    DOCS_SANDBOX_VALIDATE_CONCURRENCY: process.env.DOCS_SANDBOX_VALIDATE_CONCURRENCY || '4',
    DOCS_SANDBOX_SETTLE_MS: process.env.DOCS_SANDBOX_SETTLE_MS || '100'
  }

  if (mode === 'smoke' && !env.DOCS_SANDBOX_ROUTE_FILTER && !env.DOCS_SANDBOX_ROUTE_FILTERS) {
    env.DOCS_SANDBOX_ROUTE_FILTERS = DEFAULT_SMOKE_ROUTES.join(',')
  }

  return env
}

function runCommand(args, env = process.env, label = args.join(' ')) {
  return new Promise((resolve, reject) => {
    const child = spawn(pnpm, args, {
      cwd: rootDir,
      env,
      shell: isWin,
      stdio: 'inherit',
      windowsHide: true
    })

    child.on('error', reject)
    child.on('close', (code) => {
      if (code === 0) {
        resolve()
        return
      }

      reject(new Error(`Command "${label}" failed with exit code ${code}`))
    })
  })
}

async function ensureCodeSandboxRuntime() {
  try {
    await access(codeSandboxManifestPath)
    return
  } catch {}

  console.log('[docs-sandbox] codesandbox runtime missing, rebuilding required assets')
  await runCommand(['run', 'sync:docs-public'], process.env, 'pnpm run sync:docs-public')
  await runCommand(
    ['run', 'build:codesandbox-runtime'],
    process.env,
    'pnpm run build:codesandbox-runtime'
  )
}

async function run(mode) {
  await ensureCodeSandboxRuntime()
  await runCommand(
    ['exec', 'vite-node', 'scripts/verify-docs-sandboxes-exhaustive.mts'],
    createEnv(mode),
    `docs sandbox validation (${mode})`
  )
}

const mode = resolveMode(process.argv)

run(mode).catch((error) => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exitCode = 1
})
