import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

const reportDir = process.argv[2]
  ? path.resolve(process.cwd(), process.argv[2])
  : path.resolve(process.cwd(), 'coverage/component-system')

fs.mkdirSync(reportDir, { recursive: true })
fs.mkdirSync(path.join(reportDir, '.tmp'), { recursive: true })

const runVitest = spawnSync(
  process.execPath,
  ['./scripts/run-vitest-coverage.mjs'],
  {
    stdio: 'inherit',
    cwd: process.cwd(),
    env: {
      ...process.env,
      YH_COVERAGE_SCOPE: 'component-system',
      YH_COVERAGE_REPORT_DIR: reportDir,
      YH_VITEST_POOL: process.env.YH_VITEST_POOL || 'forks'
    }
  }
)

if (runVitest.status !== 0) {
  process.exit(runVitest.status ?? 1)
}

const buildReport = spawnSync(
  process.execPath,
  ['./scripts/report-component-system-coverage.mjs', reportDir],
  {
    stdio: 'inherit',
    cwd: process.cwd(),
    env: process.env
  }
)

process.exit(buildReport.status ?? 0)
