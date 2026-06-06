import { spawn } from 'node:child_process'
import process from 'node:process'

const isWin = process.platform === 'win32'
const pnpm = isWin ? 'pnpm.cmd' : 'pnpm'

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

function run(mode) {
  return new Promise((resolve, reject) => {
    const child = spawn(
      pnpm,
      ['exec', 'vite-node', 'scripts/verify-docs-sandboxes-exhaustive.mts'],
      {
        cwd: process.cwd(),
        env: createEnv(mode),
        shell: isWin,
        stdio: 'inherit',
        windowsHide: true
      }
    )

    child.on('error', reject)
    child.on('close', (code) => {
      if (code === 0) {
        resolve()
        return
      }

      reject(new Error(`Docs sandbox validation (${mode}) failed with exit code ${code}`))
    })
  })
}

const mode = resolveMode(process.argv)

run(mode).catch((error) => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exitCode = 1
})
