import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const componentsDir = path.join(root, 'packages', 'components', 'src')
const reportDir = path.join(root, 'coverage', 'component-quality')
const reportPath = path.join(reportDir, 'component-quality-report.json')
const matrixPath = path.join(root, 'COMPONENT_QUALITY_MATRIX.md')

const args = new Set(process.argv.slice(2))
const write = args.has('--write')
const jsonOnly = args.has('--json-only')

const docAliases = {
  'ai-bubble-list': 'ai-bubble',
  col: 'layout',
  row: 'layout'
}

const docGroups = {
  table: {
    zh: ['docs/table'],
    en: ['docs/en/table']
  }
}

const stylelessComponents = new Set(['ai-provider', 'config-provider'])

const displayOnlyComponents = new Set([
  'ai-artifacts',
  'ai-code-block',
  'ai-mermaid',
  'ai-provider',
  'ai-prompts',
  'ai-thinking',
  'ai-thought-chain',
  'ai-welcome',
  'avatar',
  'badge',
  'card',
  'col',
  'config-provider',
  'container',
  'countdown',
  'descriptions',
  'divider',
  'empty',
  'gantt-chart',
  'grid',
  'icon',
  'loading',
  'lucky-draw',
  'price',
  'progress',
  'result',
  'row',
  'scrollbar',
  'skeleton',
  'space',
  'spin',
  'typography',
  'waterfall',
  'watermark'
])

const requiredChecks = [
  'source',
  'styleTokens',
  'docsZh',
  'docsEn',
  'apiDocs',
  'examples',
  'unitTests',
  'ssrTests',
  'a11y',
  'types'
]

function readText(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : ''
}

function listFiles(dir, predicate = () => true) {
  if (!fs.existsSync(dir)) return []

  const result = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const entryPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      result.push(...listFiles(entryPath, predicate))
    } else if (predicate(entryPath)) {
      result.push(entryPath)
    }
  }
  return result
}

function relative(filePath) {
  return path.relative(root, filePath).replaceAll(path.sep, '/')
}

function getComponents() {
  return fs
    .readdirSync(componentsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('__'))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b))
}

function getDocFiles(component, locale) {
  const grouped = docGroups[component]?.[locale]
  if (grouped) {
    return grouped.flatMap((dir) =>
      listFiles(path.join(root, dir), (filePath) => filePath.endsWith('.md'))
    )
  }

  const docName = docAliases[component] ?? component
  const isAi = component.startsWith('ai-')
  const baseDir =
    locale === 'en'
      ? path.join(root, 'docs', 'en', isAi ? 'ai-components' : 'components')
      : path.join(root, 'docs', isAi ? 'ai-components' : 'components')
  const filePath = path.join(baseDir, `${docName}.md`)

  return fs.existsSync(filePath) ? [filePath] : []
}

function hasApiDocs(text) {
  return /\b(API|Props|Events|Emits|Slots|Methods|Expose)\b/.test(text)
}

function hasExamples(text) {
  return /<DemoBlock\b|```(?:vue|html|ts|tsx|js)|<Yh[A-Z]/.test(text)
}

function hasA11yEvidence(component, sourceText) {
  if (displayOnlyComponents.has(component)) return true

  return /aria-|aria[A-Z]|role=|tabindex|tabIndex|keydown|keyup|focus|blur|disabled|alt=/.test(
    sourceText
  )
}

function hasTypeEvidence(typeText) {
  return /\b(?:interface|type)\s+\w*(?:Props|Emits|Slots|Expose|Instance|Options|Config|Item|Data|Column)\b/.test(
    typeText
  )
}

function analyzeComponent(component) {
  const componentDir = path.join(componentsDir, component)
  const sourceDir = path.join(componentDir, 'src')
  const testsDir = path.join(componentDir, '__tests__')

  const sourceFiles = listFiles(sourceDir, (filePath) => /\.(vue|ts|tsx)$/.test(filePath))
  const styleFiles = listFiles(sourceDir, (filePath) => /\.(scss|css)$/.test(filePath))
  const testFiles = listFiles(testsDir, (filePath) => /\.test\.(ts|tsx|js|jsx)$/.test(filePath))
  const typeFiles = listFiles(sourceDir, (filePath) => /\.(ts|tsx)$/.test(filePath))
  const indexFile = path.join(componentDir, 'index.ts')

  const sourceText = sourceFiles.map(readText).join('\n')
  const styleText = [...sourceFiles, ...styleFiles].map(readText).join('\n')
  const typeText = typeFiles.map(readText).join('\n')

  const zhDocs = getDocFiles(component, 'zh')
  const enDocs = getDocFiles(component, 'en')
  const docsText = [...zhDocs, ...enDocs].map(readText).join('\n')

  const checks = {
    source: fs.existsSync(indexFile) && sourceFiles.length > 0,
    styleTokens:
      stylelessComponents.has(component) ||
      /var\(--yh-|useComponentTheme|themeOverrides|@use|@include/.test(styleText),
    docsZh: zhDocs.length > 0,
    docsEn: enDocs.length > 0,
    apiDocs: hasApiDocs(docsText),
    examples: hasExamples(docsText),
    unitTests: testFiles.some((filePath) => !/\.ssr\.test\./.test(filePath)),
    ssrTests: testFiles.some((filePath) => /\.ssr\.test\./.test(filePath)),
    a11y: hasA11yEvidence(component, sourceText),
    types: hasTypeEvidence(typeText)
  }

  const missing = requiredChecks.filter((check) => !checks[check])
  const score = requiredChecks.length - missing.length

  return {
    component,
    status: missing.length === 0 ? 'pass' : 'fail',
    score,
    total: requiredChecks.length,
    missing,
    checks,
    evidence: {
      sourceFiles: sourceFiles.map(relative),
      styleFiles: styleFiles.map(relative),
      testFiles: testFiles.map(relative),
      docsZh: zhDocs.map(relative),
      docsEn: enDocs.map(relative)
    }
  }
}

function statusIcon(passed) {
  return passed ? 'PASS' : 'FAIL'
}

function renderMarkdownTable(headers, values) {
  const rows = [headers, ...values]
  const widths = headers.map((_, index) =>
    Math.max(...rows.map((row) => String(row[index] ?? '').length))
  )
  const renderRow = (row) =>
    `| ${row.map((cell, index) => String(cell ?? '').padEnd(widths[index])).join(' | ')} |`
  const separator = `| ${widths.map((width) => '-'.repeat(width)).join(' | ')} |`

  return [renderRow(headers), separator, ...values.map(renderRow)].join('\n')
}

function renderMatrix(report) {
  const table = renderMarkdownTable(
    [
      'Component',
      'Status',
      'Score',
      'Docs',
      'API',
      'Examples',
      'Tests',
      'A11y',
      'Tokens',
      'Types',
      'Missing'
    ],
    report.components.map((row) => [
      row.component,
      row.status.toUpperCase(),
      `${row.score}/${row.total}`,
      statusIcon(row.checks.docsZh && row.checks.docsEn),
      statusIcon(row.checks.apiDocs),
      statusIcon(row.checks.examples),
      statusIcon(row.checks.unitTests && row.checks.ssrTests),
      statusIcon(row.checks.a11y),
      statusIcon(row.checks.styleTokens),
      statusIcon(row.checks.types),
      row.missing.join(', ') || '-'
    ])
  )

  return `# Component Quality Matrix

Generated by \`pnpm verify:component-quality -- --write\`.

## Release Standard

Every component must ship with:

- Source entry and implementation files.
- Theme-token-aware styling, or an explicit styleless provider exemption.
- Chinese and English documentation.
- API documentation for props, events, slots, methods, or public types.
- At least one runnable docs example.
- Unit tests plus SSR tests.
- Accessibility evidence in source for interactive components, or display-only classification.
- Public TypeScript type evidence for props, emits, slots, expose, config, item, data, or column contracts.

New components are expected to pass the same matrix before release.

## Summary

- Components: ${report.summary.components}
- Passing: ${report.summary.passing}
- Failing: ${report.summary.failing}

## Matrix

${table}
`
}

fs.mkdirSync(reportDir, { recursive: true })

const components = getComponents().map(analyzeComponent)
const report = {
  generatedAt: new Date().toISOString(),
  standardVersion: 1,
  requiredChecks,
  summary: {
    components: components.length,
    passing: components.filter((component) => component.status === 'pass').length,
    failing: components.filter((component) => component.status === 'fail').length
  },
  components
}

fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8')

const matrix = renderMatrix(report)

if (write && !jsonOnly) {
  fs.writeFileSync(matrixPath, matrix, 'utf8')
} else if (!jsonOnly) {
  if (!fs.existsSync(matrixPath)) {
    console.error(
      `[component-quality] Missing matrix: ${relative(matrixPath)}. Run pnpm verify:component-quality -- --write`
    )
    process.exit(1)
  }

  const currentMatrix = fs.readFileSync(matrixPath, 'utf8')
  if (currentMatrix !== matrix) {
    console.error(
      `[component-quality] Matrix is stale: ${relative(matrixPath)}. Run pnpm verify:component-quality -- --write`
    )
    process.exit(1)
  }
}

console.log(
  `[component-quality] ${report.summary.passing}/${report.summary.components} components pass`
)
console.log(`[component-quality] report: ${relative(reportPath)}`)

if (write && !jsonOnly) {
  console.log(`[component-quality] matrix: ${relative(matrixPath)}`)
}

const failures = components.filter((component) => component.status === 'fail')
if (failures.length > 0) {
  for (const failure of failures) {
    console.error(`[component-quality] ${failure.component}: missing ${failure.missing.join(', ')}`)
  }
  process.exit(1)
}
