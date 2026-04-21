/**
 * One-off: aggregate packages/components base (non ai-*) metrics from coverage-summary.json
 * and rank files by uncovered branch count (ROI hint).
 */
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const summaryPath = resolve(process.cwd(), 'coverage/coverage-summary.json')
const j = JSON.parse(readFileSync(summaryPath, 'utf8'))

const norm = (p) => String(p).replace(/\\/g, '/')

function isBaseComponentPath(p) {
  const n = norm(p)
  if (!n.includes('packages/components/src/')) return false
  const rest = n.split('packages/components/src/')[1]
  return Boolean(rest && !rest.startsWith('ai-'))
}

const totals = {
  lines: { c: 0, tot: 0 },
  statements: { c: 0, tot: 0 },
  functions: { c: 0, tot: 0 },
  branches: { c: 0, tot: 0 }
}

const rows = []
for (const [k, v] of Object.entries(j)) {
  if (k === 'total') continue
  if (!isBaseComponentPath(k)) continue
  const unc = (v.branches?.total || 0) - (v.branches?.covered || 0)
  rows.push({
    rel: norm(k).split('packages/components/src/')[1],
    pct: v.branches?.pct ?? 0,
    unc,
    bt: v.branches?.total || 0,
    lines: v.lines?.pct,
    stm: v.statements?.pct,
    fn: v.functions?.pct
  })
  for (const m of ['lines', 'statements', 'functions', 'branches']) {
    totals[m].c += v[m]?.covered || 0
    totals[m].tot += v[m]?.total || 0
  }
}

console.log('BASE components (non ai-*) aggregate:')
for (const m of ['lines', 'statements', 'functions', 'branches']) {
  const x = totals[m]
  const pct = x.tot ? ((100 * x.c) / x.tot).toFixed(2) : '0'
  console.log(`  ${m}: ${pct}% (${x.c}/${x.tot})`)
}

rows.sort((a, b) => b.unc - a.unc)
console.log('\nTop 30 by uncovered branches:')
for (const r of rows.slice(0, 30)) {
  console.log(
    String(r.unc).padStart(4),
    'br%',
    String(r.pct).padStart(5),
    'lines%',
    String(r.lines ?? '').padStart(5),
    r.rel
  )
}
