import { createGzip } from 'node:zlib'
import { createReadStream } from 'node:fs'
import { readFile, readdir, stat, writeFile } from 'node:fs/promises'
import { basename, dirname, extname, join, relative, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const packagesDir = resolve(root, 'packages')
const reportPath = resolve(root, 'test-results', 'package-size-report.json')

const budgets = {
  components: { bytes: 11_000_000, gzip: 1_700_000, largestFile: 550_000 },
  locale: { bytes: 4_800_000, gzip: 950_000, largestFile: 1_600_000 },
  icons: { bytes: 1_450_000, gzip: 170_000, largestFile: 180_000 },
  flow: { bytes: 1_600_000, gzip: 260_000, largestFile: 260_000 },
  'ai-sdk': { bytes: 420_000, gzip: 90_000, largestFile: 140_000 },
  request: { bytes: 380_000, gzip: 90_000, largestFile: 120_000 },
  theme: { bytes: 300_000, gzip: 70_000, largestFile: 140_000 },
  hooks: { bytes: 230_000, gzip: 60_000, largestFile: 120_000 },
  'yh-ui': { bytes: 2_500_000, gzip: 360_000, largestFile: 2_200_000 },
  utils: { bytes: 60_000, gzip: 18_000, largestFile: 25_000 },
  nuxt: { bytes: 40_000, gzip: 14_000, largestFile: 24_000 }
}

const heavyRuntimePatterns = [
  /monaco-editor/i,
  /echarts/i,
  /mermaid/i,
  /xlsx/i,
  /@langchain/i,
  /cytoscape/i
]

const allowedHeavyRuntimeFiles = [
  /packages\/components\/dist\/ai-mermaid\//,
  /packages\/components\/dist\/table\/src\/use-table-(export|import)/,
  /packages\/components\/dist\/index\.(cjs|mjs)/,
  /packages\/ai-sdk\/dist\/langchain\.(cjs|mjs)/
]

function getImportSpecifiers(contents) {
  const specifiers = []
  const pattern = /(?:from\s+['"]|import\s*\(\s*['"]|require\(\s*['"])([^'"]+)/g
  let match
  while ((match = pattern.exec(contents))) {
    specifiers.push(match[1])
  }
  return specifiers
}

async function collectFiles(dir, acc = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) {
      await collectFiles(path, acc)
    } else if (entry.isFile()) {
      acc.push(path)
    }
  }
  return acc
}

function gzipFile(path) {
  return new Promise((resolveGzip, rejectGzip) => {
    let bytes = 0
    createReadStream(path)
      .pipe(createGzip({ level: 9 }))
      .on('data', (chunk) => {
        bytes += chunk.length
      })
      .on('error', rejectGzip)
      .on('end', () => resolveGzip(bytes))
  })
}

async function packageReport(packageName) {
  const distDir = resolve(packagesDir, packageName, 'dist')
  const files = await collectFiles(distDir)
  let bytes = 0
  let gzip = 0
  let largest = { path: '', bytes: 0 }
  const heavyweightMatches = []

  for (const file of files) {
    const fileStat = await stat(file)
    bytes += fileStat.size
    if (fileStat.size > largest.bytes) {
      largest = { path: relative(root, file).replace(/\\/g, '/'), bytes: fileStat.size }
    }

    if (['.js', '.mjs', '.cjs', '.css'].includes(extname(file))) {
      gzip += await gzipFile(file)
      const rel = relative(root, file).replace(/\\/g, '/')
      const contents = await readFile(file, 'utf8')
      const imports = getImportSpecifiers(contents)
      if (
        packageName !== 'yh-ui' &&
        imports.some((specifier) =>
          heavyRuntimePatterns.some((pattern) => pattern.test(specifier))
        ) &&
        !allowedHeavyRuntimeFiles.some((pattern) => pattern.test(rel))
      ) {
        heavyweightMatches.push(rel)
      }
    }
  }

  return {
    package: packageName,
    files: files.length,
    bytes,
    gzip,
    largestFile: largest,
    budget: budgets[packageName],
    heavyweightMatches
  }
}

const packageNames = Object.keys(budgets)
const reports = []
const failures = []

for (const packageName of packageNames) {
  const report = await packageReport(packageName)
  reports.push(report)
  const budget = report.budget

  if (report.bytes > budget.bytes) {
    failures.push(`${packageName} dist is ${report.bytes} bytes, over budget ${budget.bytes} bytes`)
  }
  if (report.gzip > budget.gzip) {
    failures.push(`${packageName} gzip is ${report.gzip} bytes, over budget ${budget.gzip} bytes`)
  }
  const largestRuntimeFile =
    report.largestFile.path.endsWith('.d.ts') || report.largestFile.path.endsWith('.map')
      ? null
      : report.largestFile
  if (largestRuntimeFile && largestRuntimeFile.bytes > budget.largestFile) {
    failures.push(
      `${packageName} largest file ${basename(largestRuntimeFile.path)} is ${largestRuntimeFile.bytes} bytes, over budget ${budget.largestFile} bytes`
    )
  }
  if (report.heavyweightMatches.length) {
    console.warn(
      `[package-size] ${packageName}: heavyweight imports are isolated in ${report.heavyweightMatches.length} file(s)`
    )
  }

  console.log(
    `[package-size] ${packageName}: ${report.bytes} bytes, gzip ${report.gzip} bytes, largest ${report.largestFile.bytes} bytes`
  )
}

await writeFile(
  reportPath,
  `${JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      packages: reports
    },
    null,
    2
  )}\n`,
  'utf8'
).catch(async (error) => {
  if (error.code !== 'ENOENT') throw error
  await import('node:fs/promises').then(({ mkdir }) =>
    mkdir(dirname(reportPath), { recursive: true })
  )
  await writeFile(
    reportPath,
    `${JSON.stringify({ generatedAt: new Date().toISOString(), packages: reports }, null, 2)}\n`,
    'utf8'
  )
})

if (failures.length) {
  throw new Error(`Package size budget failed:\n- ${failures.join('\n- ')}\nReport: ${reportPath}`)
}

console.log(`[package-size] all package budgets passed. Report: ${reportPath}`)
