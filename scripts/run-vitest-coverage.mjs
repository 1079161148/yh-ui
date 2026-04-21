import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

const reportDir = process.env.YH_COVERAGE_REPORT_DIR
  ? path.resolve(process.cwd(), process.env.YH_COVERAGE_REPORT_DIR)
  : path.resolve(process.cwd(), 'coverage')

fs.mkdirSync(reportDir, { recursive: true })
fs.mkdirSync(path.join(reportDir, '.tmp'), { recursive: true })

const runVitest = spawnSync(
  process.execPath,
  ['./node_modules/vitest/vitest.mjs', 'run', '--coverage'],
  {
    stdio: 'inherit',
    cwd: process.cwd(),
    env: {
      ...process.env,
      YH_VITEST_POOL: process.env.YH_VITEST_POOL || 'forks',
      YH_COVERAGE_REPORT_DIR: reportDir
    }
  }
)

process.exit(runVitest.status ?? 1)
