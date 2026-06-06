import fs from 'node:fs'
import path from 'node:path'

const reportDir = process.argv[2]
  ? path.resolve(process.cwd(), process.argv[2])
  : path.resolve(process.cwd(), 'coverage/component-system')

const summaryPath = path.join(reportDir, 'coverage-summary.json')
const finalPath = path.join(reportDir, 'coverage-final.json')

if (!fs.existsSync(summaryPath) || !fs.existsSync(finalPath)) {
  console.error(
    `[coverage] Missing coverage inputs in ${reportDir}. Run component-system coverage first.`
  )
  process.exit(1)
}

const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'))
const coverageFinal = JSON.parse(fs.readFileSync(finalPath, 'utf8'))

const scopeMatchers = [
  /packages[\\/]+components[\\/]+src[\\/]+/,
  /packages[\\/]+theme[\\/]+src[\\/]+/,
  /packages[\\/]+hooks[\\/]+src[\\/]+/
]

const inScope = (filePath) => scopeMatchers.some((matcher) => matcher.test(filePath))

const pct = (covered, total) => (total ? Number(((covered / total) * 100).toFixed(2)) : 100)

const aggregateCounters = {
  statements: { covered: 0, total: 0 },
  functions: { covered: 0, total: 0 },
  branches: { covered: 0, total: 0 },
  lines: { covered: 0, total: 0 }
}

const componentBuckets = new Map()

for (const [filePath, metrics] of Object.entries(coverageFinal)) {
  if (!inScope(filePath)) continue

  const statementValues = Object.values(metrics.s || {})
  const functionValues = Object.values(metrics.f || {})
  const branchValues = Object.values(metrics.b || {}).flat()

  const lineMap = metrics.statementMap || {}
  const lineHits = new Map()
  for (const [statementId, hitCount] of Object.entries(metrics.s || {})) {
    const loc = lineMap[statementId]
    if (!loc?.start?.line) continue
    const line = String(loc.start.line)
    lineHits.set(line, Math.max(lineHits.get(line) || 0, Number(hitCount)))
  }

  const fileCounters = {
    statements: {
      covered: statementValues.filter((value) => value > 0).length,
      total: statementValues.length
    },
    functions: {
      covered: functionValues.filter((value) => value > 0).length,
      total: functionValues.length
    },
    branches: {
      covered: branchValues.filter((value) => value > 0).length,
      total: branchValues.length
    },
    lines: {
      covered: Array.from(lineHits.values()).filter((value) => value > 0).length,
      total: lineHits.size
    }
  }

  for (const metric of Object.keys(aggregateCounters)) {
    aggregateCounters[metric].covered += fileCounters[metric].covered
    aggregateCounters[metric].total += fileCounters[metric].total
  }

  const componentMatch = filePath.match(/packages[\\/]+components[\\/]+src[\\/]+([^\\/]+)/)
  if (!componentMatch) continue

  const componentName = componentMatch[1]
  const bucket = componentBuckets.get(componentName) || {
    component: componentName,
    statements: { covered: 0, total: 0 },
    functions: { covered: 0, total: 0 },
    branches: { covered: 0, total: 0 },
    lines: { covered: 0, total: 0 },
    files: []
  }

  for (const metric of Object.keys(bucket).filter(
    (key) => key !== 'component' && key !== 'files'
  )) {
    bucket[metric].covered += fileCounters[metric].covered
    bucket[metric].total += fileCounters[metric].total
  }

  bucket.files.push(path.relative(process.cwd(), filePath))
  componentBuckets.set(componentName, bucket)
}

const totals = Object.fromEntries(
  Object.entries(aggregateCounters).map(([metric, counters]) => [
    metric,
    {
      covered: counters.covered,
      total: counters.total,
      pct: pct(counters.covered, counters.total)
    }
  ])
)

const components = Array.from(componentBuckets.values())
  .map((bucket) => ({
    component: bucket.component,
    statements: pct(bucket.statements.covered, bucket.statements.total),
    functions: pct(bucket.functions.covered, bucket.functions.total),
    branches: pct(bucket.branches.covered, bucket.branches.total),
    lines: pct(bucket.lines.covered, bucket.lines.total),
    files: bucket.files
  }))
  .sort((a, b) => {
    if (a.branches !== b.branches) return a.branches - b.branches
    if (a.statements !== b.statements) return a.statements - b.statements
    if (a.functions !== b.functions) return a.functions - b.functions
    return a.component.localeCompare(b.component)
  })

const lowCoverageComponents = components.slice(0, 20)

const result = {
  generatedAt: new Date().toISOString(),
  reportDir: path.relative(process.cwd(), reportDir),
  total: totals,
  components,
  topGaps: lowCoverageComponents,
  rawSummaryTotal: summary.total
}

fs.writeFileSync(
  path.join(reportDir, 'component-system-report.json'),
  JSON.stringify(result, null, 2),
  'utf8'
)

console.log('[coverage] Component system totals')
console.log(
  [
    `statements=${totals.statements.pct}%`,
    `functions=${totals.functions.pct}%`,
    `branches=${totals.branches.pct}%`,
    `lines=${totals.lines.pct}%`
  ].join(' | ')
)

console.log('[coverage] Lowest 10 component buckets')
for (const row of lowCoverageComponents.slice(0, 10)) {
  console.log(
    `- ${row.component}: statements ${row.statements}% | functions ${row.functions}% | branches ${row.branches}%`
  )
}
