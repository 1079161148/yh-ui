import { mkdir, rm } from 'node:fs/promises'
import { resolve } from 'node:path'
import { spawn } from 'node:child_process'

const rootDir = resolve(import.meta.dirname, '..')
const blobReportsDir = resolve(rootDir, '.vitest-reports')
const coverageDir = process.env.YH_COVERAGE_REPORT_DIR
  ? resolve(rootDir, process.env.YH_COVERAGE_REPORT_DIR)
  : resolve(rootDir, 'coverage')
const projects = ['components-dom', 'packages-dom', 'packages-node', 'ssr']

async function runVitest(args) {
  const exitCode = await new Promise((resolveExitCode, reject) => {
    const child = spawn(process.execPath, ['./node_modules/vitest/vitest.mjs', ...args], {
      cwd: rootDir,
      stdio: 'inherit',
      env: {
        ...process.env,
        YH_VITEST_POOL: process.env.YH_VITEST_POOL || 'forks',
        YH_COVERAGE_REPORT_DIR: coverageDir
      }
    })

    child.on('error', reject)
    child.on('exit', (code, signal) => {
      if (signal) {
        reject(new Error(`Vitest terminated with signal ${signal}`))
        return
      }

      resolveExitCode(code ?? 1)
    })
  })

  if (exitCode !== 0) {
    process.exit(exitCode)
  }
}

await rm(blobReportsDir, { recursive: true, force: true })
await rm(coverageDir, { recursive: true, force: true })
await mkdir(blobReportsDir, { recursive: true })

for (const project of projects) {
  await runVitest([
    'run',
    '--coverage',
    '--maxWorkers',
    '1',
    '--project',
    project,
    '--reporter',
    'blob',
    '--outputFile.blob',
    `.vitest-reports/${project}.json`
  ])
}

await runVitest([
  '--merge-reports',
  '.vitest-reports',
  '--coverage',
  '--reporter',
  'default'
])
