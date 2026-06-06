import fs from 'node:fs'
import path from 'node:path'

const stageThresholds = {
  stage1: { statements: 85, functions: 85, branches: 75 },
  stage2: { statements: 92, functions: 92, branches: 85 },
  stage3: { statements: 96, functions: 96, branches: 90 },
  stage4: { statements: 100, functions: 100, branches: 100 }
}

const args = process.argv.slice(2)
let stage = 'stage1'
let reportDir = path.resolve(process.cwd(), 'coverage/component-system')

for (const arg of args) {
  if (arg.startsWith('--stage=')) {
    stage = arg.slice('--stage='.length)
    continue
  }

  if (arg.startsWith('--report-dir=')) {
    reportDir = path.resolve(process.cwd(), arg.slice('--report-dir='.length))
    continue
  }

  if (!arg.startsWith('--')) {
    stage = arg
  }
}

if (!stageThresholds[stage]) {
  console.error(
    `[coverage] Unknown stage "${stage}". Expected one of: ${Object.keys(stageThresholds).join(', ')}`
  )
  process.exit(1)
}

const reportPath = path.join(reportDir, 'component-system-report.json')

if (!fs.existsSync(reportPath)) {
  console.error(`[coverage] Missing report: ${reportPath}`)
  process.exit(1)
}

const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'))
const thresholds = stageThresholds[stage]
const metrics = ['statements', 'functions', 'branches']
const failures = []

console.log(`[coverage] Verifying component-system coverage against ${stage}`)

for (const metric of metrics) {
  const actual = Number(report.total?.[metric]?.pct ?? 0)
  const expected = thresholds[metric]
  const passed = actual >= expected

  console.log(
    `- ${metric}: actual ${actual}% | expected >= ${expected}% | ${passed ? 'PASS' : 'FAIL'}`
  )

  if (!passed) {
    failures.push(`${metric} ${actual}% < ${expected}%`)
  }
}

if (failures.length > 0) {
  console.error(`[coverage] Component-system coverage gate failed: ${failures.join('; ')}`)
  process.exit(1)
}

console.log('[coverage] Component-system coverage gate passed')
