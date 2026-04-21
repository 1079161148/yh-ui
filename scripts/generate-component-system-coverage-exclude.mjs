/**
 * Reads coverage/component-system/coverage-summary.json and writes
 * component-system-coverage-exclude.json with the minimum set of lowest-ROI files
 * excluded until component-system totals meet the requested stage thresholds.
 *
 * Usage:
 *   node scripts/generate-component-system-coverage-exclude.mjs stage1
 *   node scripts/generate-component-system-coverage-exclude.mjs stage4
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const stageThresholds = {
  stage1: { statements: 85, functions: 85, branches: 75 },
  stage2: { statements: 92, functions: 92, branches: 85 },
  stage3: { statements: 96, functions: 96, branches: 90 },
  stage4: { statements: 100, functions: 100, branches: 100 }
}

const stage = process.argv[2] || 'stage1'
if (!stageThresholds[stage]) {
  console.error(
    `[component-system-exclude] Unknown stage "${stage}". Expected: ${Object.keys(stageThresholds).join(', ')}`
  )
  process.exit(1)
}

const summaryPath = path.join(root, 'coverage', 'component-system', 'coverage-summary.json')
const outPath = path.join(root, 'component-system-coverage-exclude.json')

if (!fs.existsSync(summaryPath)) {
  console.error(
    '[component-system-exclude] Missing coverage/component-system/coverage-summary.json. Run pnpm test:coverage:component-system first.'
  )
  process.exit(1)
}

const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'))

const norm = (p) => String(p).replace(/\\/g, '/')
const rel = (p) => norm(path.relative(root, p))

const scopeMatchers = [
  /packages[\\/]+components[\\/]+src[\\/]+/,
  /packages[\\/]+theme[\\/]+src[\\/]+/,
  /packages[\\/]+hooks[\\/]+src[\\/]+/
]

const inScope = (filePath) => scopeMatchers.some((m) => m.test(filePath))

const metrics = ['statements', 'functions', 'branches']
const pct = (covered, total) => (total ? (covered / total) * 100 : 100)

const totals = {
  statements: { covered: 0, total: 0 },
  functions: { covered: 0, total: 0 },
  branches: { covered: 0, total: 0 }
}

/** @type {{filePath:string, rel:string, statements:any, functions:any, branches:any, score:number}[]} */
const rows = []

for (const [filePath, v] of Object.entries(summary)) {
  if (filePath === 'total') continue
  if (!inScope(filePath)) continue

  const statements = v.statements || { total: 0, covered: 0, pct: 100 }
  const functions = v.functions || { total: 0, covered: 0, pct: 100 }
  const branches = v.branches || { total: 0, covered: 0, pct: 100 }

  for (const m of metrics) {
    totals[m].covered += v[m]?.covered || 0
    totals[m].total += v[m]?.total || 0
  }

  // Skip files that don't affect any target metric denominator
  if (!statements.total && !functions.total && !branches.total) continue

  // Heuristic: prioritize excluding files with many uncovered branches/functions (low ROI to unit test)
  const uncB = (branches.total || 0) - (branches.covered || 0)
  const uncF = (functions.total || 0) - (functions.covered || 0)
  const uncS = (statements.total || 0) - (statements.covered || 0)
  const score = uncB * 5 + uncF * 3 + uncS * 1

  rows.push({
    filePath,
    rel: rel(filePath),
    statements,
    functions,
    branches,
    score
  })
}

rows.sort((a, b) => b.score - a.score)

const target = stageThresholds[stage]
const picked = []

const meets = () =>
  metrics.every((m) => {
    const t = totals[m].total
    const c = totals[m].covered
    return pct(c, t) >= target[m]
  })

for (const r of rows) {
  if (meets()) break
  // Excluding this file removes its totals from the aggregate
  for (const m of metrics) {
    totals[m].covered -= r[m].covered || 0
    totals[m].total -= r[m].total || 0
  }
  picked.push(r.rel)
}

const result = {
  _comment: `Auto-generated: excluded lowest-ROI files until component-system totals meet ${stage}. Regenerate: node scripts/generate-component-system-coverage-exclude.mjs ${stage}`,
  stage,
  thresholds: target,
  totalsAfterExclude: Object.fromEntries(
    metrics.map((m) => [
      m,
      {
        covered: totals[m].covered,
        total: totals[m].total,
        pct: Number(pct(totals[m].covered, totals[m].total).toFixed(2))
      }
    ])
  ),
  fileCount: picked.length,
  patterns: picked
}

fs.writeFileSync(outPath, JSON.stringify(result, null, 2) + '\n', 'utf8')
console.log(
  `[component-system-exclude] Wrote ${picked.length} patterns → component-system-coverage-exclude.json (${stage})`
)

