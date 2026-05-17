import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { join, relative, resolve } from 'node:path'
import { spawn } from 'node:child_process'
import istanbulCoverage from 'istanbul-lib-coverage'
import istanbulReport from 'istanbul-lib-report'
import reports from 'istanbul-reports'
import picomatch from 'picomatch'

const { createCoverageMap } = istanbulCoverage
const { createContext } = istanbulReport

const rootDir = resolve(import.meta.dirname, '..')
const coverageScope = process.env.YH_COVERAGE_SCOPE || 'default'
const coverageDir = process.env.YH_COVERAGE_REPORT_DIR
  ? resolve(rootDir, process.env.YH_COVERAGE_REPORT_DIR)
  : resolve(rootDir, 'coverage')
const projectReportsDir = resolve(coverageDir, '.projects')
const projects = ['components-dom', 'packages-dom', 'packages-node', 'ssr']
const defaultThresholds = {
  total: {
    lines: 24,
    functions: 28,
    statements: 24,
    branches: 20
  },
  groups: {
    'packages/components/src/**/*.{ts,vue}': {
      lines: 34,
      functions: 36,
      statements: 34,
      branches: 28
    },
    'packages/hooks/src/**/*.ts': {
      lines: 42,
      functions: 44,
      statements: 42,
      branches: 34
    },
    'packages/utils/src/**/*.ts': {
      lines: 50,
      functions: 52,
      statements: 50,
      branches: 42
    },
    'packages/request/src/**/*.ts': {
      lines: 36,
      functions: 38,
      statements: 36,
      branches: 28
    },
    'packages/theme/src/**/*.ts': {
      lines: 34,
      functions: 36,
      statements: 34,
      branches: 26
    },
    'packages/locale/src/**/*.ts': {
      lines: 65,
      functions: 65,
      statements: 65,
      branches: 60
    },
    'packages/ai-sdk/src/**/*.ts': {
      lines: 42,
      functions: 44,
      statements: 42,
      branches: 34
    },
    'packages/flow/src/**/*.{ts,vue}': {
      lines: 30,
      functions: 32,
      statements: 30,
      branches: 24
    }
  }
}

function shouldEnforceThresholds() {
  if (coverageScope === 'component-system') {
    return false
  }

  return process.env.COVERAGE_THRESHOLDS === 'true' || process.env.CI === 'true'
}

async function runVitest(project, reportDir) {
  const exitCode = await new Promise((resolveExitCode, reject) => {
    const child = spawn(
      process.execPath,
      [
        './node_modules/vitest/vitest.mjs',
        'run',
        '--coverage',
        '--maxWorkers',
        '1',
        '--project',
        project
      ],
      {
        cwd: rootDir,
        stdio: 'inherit',
        env: {
          ...process.env,
          YH_VITEST_POOL: process.env.YH_VITEST_POOL || 'forks',
          YH_COVERAGE_REPORT_DIR: reportDir,
          COVERAGE_THRESHOLDS: 'false'
        }
      }
    )

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

await rm(coverageDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 })
await mkdir(projectReportsDir, { recursive: true })

for (const project of projects) {
  await runVitest(project, resolve(projectReportsDir, project))
}

const mergedCoverageMap = createCoverageMap({})

for (const project of projects) {
  const coverageFinalPath = join(projectReportsDir, project, 'coverage-final.json')
  const raw = JSON.parse(await readFile(coverageFinalPath, 'utf8'))
  mergedCoverageMap.merge(raw)
}

await writeFile(
  join(coverageDir, 'coverage-final.json'),
  `${JSON.stringify(mergedCoverageMap.toJSON())}\n`,
  'utf8'
)

const reportContext = createContext({
  dir: coverageDir,
  coverageMap: mergedCoverageMap
})

for (const reporter of ['text', 'json', 'html', 'clover', 'lcov', 'json-summary']) {
  reports.create(reporter).execute(reportContext)
}

if (!shouldEnforceThresholds()) {
  process.exit(0)
}

const coverageSummary = JSON.parse(
  await readFile(join(coverageDir, 'coverage-summary.json'), 'utf8')
)

const metricKeys = ['lines', 'functions', 'statements', 'branches']
const fileEntries = Object.entries(coverageSummary).filter(([key]) => key !== 'total')

function toRepoRelativePath(filePath) {
  return relative(rootDir, filePath).split('\\').join('/')
}

function getPct(covered, total) {
  if (!total) {
    return 100
  }

  return Number(((covered / total) * 100).toFixed(2))
}

const failures = []

for (const metric of metricKeys) {
  const actual = Number(coverageSummary.total[metric].pct.toFixed(2))
  const expected = defaultThresholds.total[metric]
  if (actual < expected) {
    failures.push({
      label: 'total',
      metric,
      actual,
      expected
    })
  }
}

for (const [pattern, thresholds] of Object.entries(defaultThresholds.groups)) {
  const isMatch = picomatch(pattern)
  const matchedEntries = fileEntries.filter(([filePath]) => isMatch(toRepoRelativePath(filePath)))

  if (matchedEntries.length === 0) {
    continue
  }

  for (const metric of metricKeys) {
    const totals = matchedEntries.reduce(
      (accumulator, [, summary]) => {
        accumulator.covered += summary[metric].covered
        accumulator.total += summary[metric].total
        return accumulator
      },
      { covered: 0, total: 0 }
    )

    const actual = getPct(totals.covered, totals.total)
    const expected = thresholds[metric]

    if (actual < expected) {
      failures.push({
        label: pattern,
        metric,
        actual,
        expected
      })
    }
  }
}

if (failures.length > 0) {
  console.error('\nCoverage thresholds failed:')
  for (const failure of failures) {
    console.error(`- ${failure.label} ${failure.metric}: ${failure.actual}% < ${failure.expected}%`)
  }
  process.exit(1)
}
