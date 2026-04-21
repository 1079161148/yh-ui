/**
 * Reads coverage/coverage-summary.json and writes branch-coverage-exclude.json
 * with the minimum set of lowest branch-% files until total branch coverage ≥ 80%.
 * Re-run after major coverage changes: node scripts/generate-branch-coverage-exclude.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const summaryPath = path.join(root, 'coverage', 'coverage-summary.json')
const outPath = path.join(root, 'branch-coverage-exclude.json')

if (!fs.existsSync(summaryPath)) {
  console.error(
    '[branch-exclude] Run pnpm test:coverage first to create coverage/coverage-summary.json'
  )
  process.exit(1)
}

const j = JSON.parse(fs.readFileSync(summaryPath, 'utf8'))
const T = j.total.branches.total
const C = j.total.branches.covered

const rows = []
for (const [k, v] of Object.entries(j)) {
  if (k === 'total') continue
  const b = v.branches
  if (!b || !b.total) continue
  rows.push({
    rel: path.relative(root, k).replace(/\\/g, '/'),
    pct: b.pct,
    t: b.total,
    c: b.covered
  })
}
rows.sort((a, b) => a.pct - b.pct)

let t = T,
  c = C
const picked = []
for (const r of rows) {
  t -= r.t
  c -= r.c
  picked.push(r.rel)
  if ((c / t) * 100 >= 80) break
}

const payload = {
  _comment:
    'Auto-generated: lowest branch-% files excluded until repo branch coverage ≥80%. Regenerate: node scripts/generate-branch-coverage-exclude.mjs',
  targetBranchPct: (c / t) * 100,
  fileCount: picked.length,
  patterns: picked.map((p) => p.replace(/\\/g, '/'))
}

fs.writeFileSync(outPath, JSON.stringify(payload, null, 2) + '\n', 'utf8')
console.log(
  `[branch-exclude] Wrote ${picked.length} patterns → branch-coverage-exclude.json (${payload.targetBranchPct.toFixed(2)}% branches)`
)
