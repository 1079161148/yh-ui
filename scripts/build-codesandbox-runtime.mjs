import { mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises'
import { dirname, extname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse, compileScript, compileTemplate } from '@vue/compiler-sfc'
import { build, transform } from 'esbuild'
import { computeFingerprint, shouldSkipCachedBuild, updateBuildCache } from './build-cache.mjs'

const rootDir = resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
const docsPublicDir = resolve(rootDir, 'docs/public')
const runtimeOutDir = resolve(docsPublicDir, 'codesandbox-runtime')
const localePackageDistDir = resolve(rootDir, 'packages/locale/dist')
const dayjsEsmLocaleDir = resolve(rootDir, 'node_modules/dayjs/esm/locale')
const manifestFile = resolve(runtimeOutDir, 'manifest.json')

const SUPPORT_PACKAGES = ['hooks', 'locale', 'theme', 'utils']
const COMPONENTS_DIR = resolve(docsPublicDir, 'components')
const COMPONENT_ROOT_RUNTIME_FILES = [
  'dayjs-plugins.mjs',
  'dayjs.mjs',
  'highlight.mjs',
  'markdown-it.mjs',
  'sanitize.mjs',
  'viewerjs.mjs'
]
const BUNDLE_EXTERNALS = [
  'vue',
  'dayjs',
  '@floating-ui/dom',
  '@iconify/vue',
  '@langchain/core',
  'async-validator',
  'axios',
  'd3-force',
  'dagre',
  'echarts',
  'elkjs',
  'highlight.js',
  'html-to-image',
  'mermaid',
  'monaco-editor',
  'pinia',
  'viewerjs',
  'vue-router',
  'xlsx',
  'zod'
]
const SUPPORT_BARREL_SOURCE_FILES = {
  hooks: resolve(docsPublicDir, 'hooks/index.mjs'),
  locale: resolve(localePackageDistDir, 'index.mjs'),
  theme: resolve(docsPublicDir, 'theme/index.mjs')
}
const supportBarrelImportMaps = {
  hooks: {},
  locale: {},
  theme: {}
}

async function ensureDir(path) {
  await mkdir(path, { recursive: true })
}

async function lower(code, loader = 'js') {
  const result = await transform(code, {
    loader,
    format: 'esm',
    target: 'es2017'
  })
  return result.code
}

function compileVueToModule(filename, source) {
  const { descriptor } = parse(source, { filename })
  const script = compileScript(descriptor, {
    id: filename,
    inlineTemplate: false
  })
  const template = compileTemplate({
    id: filename,
    filename,
    source: descriptor.template?.content ?? '',
    compilerOptions: {
      bindingMetadata: script.bindings
    }
  })

  return [
    template.code.replace('export function render', 'function render'),
    script.content.replace('export default', 'const __sfc__ ='),
    '__sfc__.render = render',
    'export default __sfc__'
  ].join('\n\n')
}

function patchSourceForCodeSandbox(sourceFile, source) {
  const normalizedSourceFile = sourceFile.replace(/\\/g, '/')

  if (normalizedSourceFile.endsWith('hooks/use-locale/dayjs-locale.mjs')) {
    return source
      .replace(/import\s+["']dayjs\/locale\/en["'];?\s*/, 'import "../../dayjs-locale/all.js";\n')
      .replace(/const dayjsLocales = import\.meta\.glob\([\s\S]*?\);\s*/, '')
      .replace(
        /const loadDayjsLocale = async \(dayjsLocale\) => \{[\s\S]*?\n\};/,
        `const loadDayjsLocale = async (dayjsLocale) => {
  try {
    await import(\`../../dayjs-locale/\${dayjsLocale}.js\`);
    return true;
  } catch {
    return false;
  }
};`
      )
  }

  return source
}

function collectCollidingModuleBases(sourceFiles, sourceRoot) {
  const fileSet = new Set(
    sourceFiles.map((sourceFile) => relative(sourceRoot, sourceFile).replace(/\\/g, '/'))
  )
  const collidingBases = new Set()

  for (const relPath of fileSet) {
    if (!relPath.endsWith('.vue')) continue
    const base = relPath.replace(/\.vue$/, '')
    if (fileSet.has(`${base}.mjs`)) {
      collidingBases.add(base)
    }
  }

  return collidingBases
}

function resolveMetaModulePath(resolvedPath) {
  return `${resolvedPath}-meta.js`
}

function toRelativeImportPath(fromFile, targetFile) {
  const fromDir = dirname(fromFile).replace(/\\/g, '/')
  let relPath = relative(fromDir, targetFile).replace(/\\/g, '/')
  if (!relPath.startsWith('.')) relPath = `./${relPath}`
  return relPath
}

async function findExistingSourceFile(basePath) {
  const extension = extname(basePath)
  const candidates = extension
    ? [
        basePath,
        ...(extension === '.scss' ? [basePath.replace(/\.scss$/, '.css')] : []),
        ...(extension === '.sass' ? [basePath.replace(/\.sass$/, '.css')] : [])
      ]
    : [
        `${basePath}.mjs`,
        `${basePath}.vue`,
        `${basePath}.css`,
        join(basePath, 'index.mjs'),
        join(basePath, 'index.vue'),
        join(basePath, 'index.css')
      ]

  for (const candidate of candidates) {
    try {
      await stat(candidate)
      return candidate
    } catch {
      // continue
    }
  }

  return null
}

async function rewriteLocalImportSource(
  sourceFile,
  outputFile,
  source,
  sourceBaseRoot,
  outputBaseRoot,
  collidingModuleBases = new Set()
) {
  if (!source.startsWith('.')) return source

  const resolvedSourceFile = await findExistingSourceFile(resolve(dirname(sourceFile), source))
  if (!resolvedSourceFile) {
    return source
  }

  const targetOutputRelPath = toOutputRelativePath(
    sourceBaseRoot,
    resolvedSourceFile,
    collidingModuleBases
  )
  const targetOutputFile = join(outputBaseRoot, targetOutputRelPath)
  let relPath = relative(dirname(outputFile), targetOutputFile).replace(/\\/g, '/')
  if (!relPath.startsWith('.')) relPath = `./${relPath}`
  return relPath
}

function resolveRuntimeBareImport(outputFile, source) {
  const pkgPath = source.replace(/^@yh-ui\//, '')
  const [pkgName, ...restParts] = pkgPath.split('/')
  const packageRoot = join(runtimeOutDir, pkgName)
  const targetPath =
    restParts.length === 0
      ? join(packageRoot, 'index.js')
      : join(packageRoot, ...restParts).replace(/\.mjs$/, '.js')
  const fromDir = dirname(outputFile)
  let relPath = relative(fromDir, targetPath).replace(/\\/g, '/')
  if (!relPath.startsWith('.')) relPath = `./${relPath}`
  return relPath
}

async function rewriteImports(
  code,
  sourceFile,
  outputFile,
  sourceBaseRoot,
  outputBaseRoot,
  collidingModuleBases = new Set()
) {
  const matches = [
    ...code.matchAll(
      /(\bimport\s+(?:type\s+)?(?:[\w*\s{},]*?\s+from\s+)?["']|export\s+[\w*\s{},]*?\s+from\s+["']|import\s*\(\s*["'])([^"']+)(["'])/g
    )
  ]
  let rewritten = code

  for (const match of matches.reverse()) {
    const [full, prefix, source, suffix] = match
    let nextSource = source

    if (source.startsWith('@yh-ui/')) {
      nextSource = resolveRuntimeBareImport(outputFile, source)
    } else if (source.startsWith('.')) {
      nextSource = await rewriteLocalImportSource(
        sourceFile,
        outputFile,
        source,
        sourceBaseRoot,
        outputBaseRoot,
        collidingModuleBases
      )
    }

    const replacement = `${prefix}${nextSource}${suffix}`
    rewritten =
      rewritten.slice(0, match.index) + replacement + rewritten.slice(match.index + full.length)
  }

  return rewritten
}

function rewriteSupportBarrelImports(code) {
  return code.replace(
    /import\s*\{\s*([^}]+)\s*\}\s*from\s*["']((?:\.\.\/)+)(hooks|locale|theme)\/index\.js["'];?/g,
    (full, imports, relativePrefix, packageName) => {
      const mappings = supportBarrelImportMaps[packageName]
      if (!mappings) return full

      const groupedImports = new Map()
      const remainingImports = []

      for (const entry of imports.split(',')) {
        const trimmedEntry = entry.trim()
        if (!trimmedEntry) continue

        const aliasMatch = trimmedEntry.match(/^([A-Za-z_$][\w$]*)(?:\s+as\s+([A-Za-z_$][\w$]*))?$/)
        if (!aliasMatch) {
          remainingImports.push(trimmedEntry)
          continue
        }

        const [, importedName, localName] = aliasMatch
        const targetPath = mappings[importedName]
        if (targetPath) {
          if (!groupedImports.has(targetPath)) {
            groupedImports.set(targetPath, [])
          }
          groupedImports
            .get(targetPath)
            .push(localName && localName !== importedName ? `${importedName} as ${localName}` : importedName)
        } else {
          remainingImports.push(trimmedEntry)
        }
      }

      const directImports = [...groupedImports.entries()].map(
        ([targetPath, specifiers]) =>
          `import { ${specifiers.join(', ')} } from "${relativePrefix}${packageName}/${targetPath}";`
      )

      if (remainingImports.length > 0) {
        directImports.unshift(
          `import { ${remainingImports.join(', ')} } from "${relativePrefix}${packageName}/index.js";`
        )
      }

      return directImports.join('\n')
    }
  )
}

async function collectNamedExports(filePath) {
  const source = await readFile(filePath, 'utf8')
  const exportedNames = new Set()

  for (const match of source.matchAll(
    /export\s+(?:async\s+)?(?:const|function|class|let|var)\s+([A-Za-z_$][\w$]*)/g
  )) {
    exportedNames.add(match[1])
  }

  for (const match of source.matchAll(/export\s*\{\s*([^}]+)\s*\}(?:\s*from\s*["'][^"']+["'])?/g)) {
    const specifiers = match[1]
      .split(',')
      .map((part) => part.trim())
      .filter(Boolean)

    for (const specifier of specifiers) {
      const [, localName, aliasName] =
        specifier.match(/^([A-Za-z_$][\w$]*)(?:\s+as\s+([A-Za-z_$][\w$]*))?$/) ?? []
      const exportedName = aliasName ?? localName
      if (exportedName) {
        exportedNames.add(exportedName)
      } else if (specifier) {
        exportedNames.add(specifier)
      }
    }
  }

  return [...exportedNames]
}

async function buildSupportBarrelImportMaps() {
  for (const [packageName, barrelFile] of Object.entries(SUPPORT_BARREL_SOURCE_FILES)) {
    const barrelSource = await readFile(barrelFile, 'utf8')

    for (const match of barrelSource.matchAll(/export\s+\*\s+from\s+["'](.+?)["'];?/g)) {
      const targetRelativePath = match[1]
      const targetFile = resolve(dirname(barrelFile), targetRelativePath)
      const outputRelativePath = targetRelativePath.replace(/\.mjs$/, '.js')
      const exportedNames = await collectNamedExports(targetFile)

      for (const exportedName of exportedNames) {
        supportBarrelImportMaps[packageName][exportedName] = outputRelativePath
      }
    }
  }
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const absolute = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walk(absolute)))
    } else {
      files.push(absolute)
    }
  }

  return files
}

function toOutputRelativePath(sourceRoot, sourceFile, collidingModuleBases = new Set()) {
  const relPath = relative(sourceRoot, sourceFile).replace(/\\/g, '/')
  if (sourceFile.endsWith('.mjs')) {
    const moduleBase = relPath.replace(/\.mjs$/, '')
    if (collidingModuleBases.has(moduleBase)) {
      return `${moduleBase}-meta.js`
    }
  }

  return relPath.replace(/\.mjs$/, '.js').replace(/\.vue$/, '.js')
}

async function processSourceFile(
  sourceRoot,
  sourceFile,
  outFile,
  collidingModuleBases = new Set(),
  sourceBaseRoot = sourceRoot,
  outputBaseRoot = dirname(outFile)
) {
  if (!/\.(?:mjs|vue|css|scss)$/.test(sourceFile)) {
    return null
  }

  const source = await readFile(sourceFile, 'utf8')

  if (sourceFile.endsWith('.css') || sourceFile.endsWith('.scss')) {
    await ensureDir(dirname(outFile))
    await writeFile(outFile, source, 'utf8')
    return outFile
  }

  let code = patchSourceForCodeSandbox(sourceFile, source)

  if (sourceFile.endsWith('.vue')) {
    code = compileVueToModule(sourceFile, source)
  }

  code = await rewriteImports(
    code,
    sourceFile,
    outFile,
    sourceBaseRoot,
    outputBaseRoot,
    collidingModuleBases
  )
  code = rewriteSupportBarrelImports(code)
  code = await lower(code)
  if (!code.trim()) {
    code = 'export {};\n'
  }

  await ensureDir(dirname(outFile))
  await writeFile(outFile, code, 'utf8')
  return outFile
}

async function buildSupportPackages() {
  const files = new Set()

  for (const pkg of SUPPORT_PACKAGES) {
    const sourceDir = join(docsPublicDir, pkg)
    const sourceFiles = await walk(sourceDir)
    const collidingModuleBases = collectCollidingModuleBases(sourceFiles, sourceDir)

    for (const sourceFile of sourceFiles) {
      const outRelPath = toOutputRelativePath(sourceDir, sourceFile, collidingModuleBases)
      const outFile = join(runtimeOutDir, pkg, outRelPath)
      const writtenFile = await processSourceFile(
        sourceDir,
        sourceFile,
        outFile,
        collidingModuleBases,
        sourceDir,
        join(runtimeOutDir, pkg)
      )
      if (writtenFile) {
        files.add(relative(runtimeOutDir, writtenFile).replace(/\\/g, '/'))
      }
    }
  }

  const localeIndexFile = await processSourceFile(
    localePackageDistDir,
    join(localePackageDistDir, 'index.mjs'),
    join(runtimeOutDir, 'locale', 'index.js'),
    new Set(),
    localePackageDistDir,
    join(runtimeOutDir, 'locale')
  )

  if (localeIndexFile) {
    files.add(relative(runtimeOutDir, localeIndexFile).replace(/\\/g, '/'))
  }

  return [...files].sort()
}

function transformDayjsLocaleSource(source) {
  let transformed = source.replace(/^\s*import dayjs from ['"]\.\.\/index['"];?\s*/m, '').trim()

  if (/export default locale;?\s*$/m.test(transformed)) {
    transformed = transformed.replace(/^\s*export default locale;?\s*$/m, '').trim()
  } else if (/export default\s*\{/.test(transformed)) {
    transformed = `${transformed.replace(/export default\s*\{/, 'var locale = {').trim()}
dayjs.locale(locale, null, true);`
  } else {
    transformed = transformed.replace(/^\s*export default\s+/m, 'var locale = ').trim()
  }

  return transformed.replace(/^export\s+/gm, '').trim()
}

async function buildDayjsLocaleRuntime() {
  const files = new Set()
  const localeFiles = await readdir(dayjsEsmLocaleDir, { withFileTypes: true })
  const localeNames = []
  const bundledLocaleChunks = ['import dayjs from "../hooks/dayjs.js";', '']

  for (const entry of localeFiles) {
    if (!entry.isFile() || !entry.name.endsWith('.js')) continue

    localeNames.push(entry.name.replace(/\.js$/, ''))
    const sourceFile = join(dayjsEsmLocaleDir, entry.name)
    const source = await readFile(sourceFile, 'utf8')
    bundledLocaleChunks.push(`// ${entry.name}`)
    bundledLocaleChunks.push('{')
    bundledLocaleChunks.push(transformDayjsLocaleSource(source))
    bundledLocaleChunks.push('}')
    bundledLocaleChunks.push('')
  }

  const bundledLocaleFile = join(runtimeOutDir, 'dayjs-locale', 'all.js')
  await ensureDir(dirname(bundledLocaleFile))
  await writeFile(bundledLocaleFile, bundledLocaleChunks.join('\n'), 'utf8')
  files.add(relative(runtimeOutDir, bundledLocaleFile).replace(/\\/g, '/'))

  const runtimeHookFile = join(runtimeOutDir, 'hooks', 'use-locale', 'dayjs-locale.js')
  const hookSource = await readFile(runtimeHookFile, 'utf8')
  const hookSourceWithBundleImport = hookSource.includes('import "../../dayjs-locale/all.js";')
    ? hookSource
    : hookSource.replace(
        /^import dayjs from "\.\.\/dayjs\.js";\s*/m,
        'import dayjs from "../dayjs.js";\nimport "../../dayjs-locale/all.js";\n'
      )
  const patchedHookSource = hookSourceWithBundleImport.replace(
    /const loadDayjsLocale = async \(dayjsLocale\) => \{[\s\S]*?\n\};/,
    `const availableDayjsLocales = new Set(${JSON.stringify(localeNames.sort((left, right) => left.localeCompare(right)))});
const loadDayjsLocale = async (dayjsLocale) => {
  return availableDayjsLocales.has(dayjsLocale);
};`
  )
  await writeFile(runtimeHookFile, patchedHookSource, 'utf8')

  return [...files].sort()
}

async function buildComponentRootRuntimeFiles() {
  const files = new Set()
  const sourceFiles = COMPONENT_ROOT_RUNTIME_FILES.map((filename) => join(COMPONENTS_DIR, filename))
  const collidingModuleBases = collectCollidingModuleBases(sourceFiles, COMPONENTS_DIR)

  for (const filename of COMPONENT_ROOT_RUNTIME_FILES) {
    const sourceFile = join(COMPONENTS_DIR, filename)
    const outRelPath = toOutputRelativePath(COMPONENTS_DIR, sourceFile, collidingModuleBases)
    const outFile = join(runtimeOutDir, 'components', outRelPath)
    const writtenFile = await processSourceFile(
      COMPONENTS_DIR,
      sourceFile,
      outFile,
      collidingModuleBases,
      COMPONENTS_DIR,
      join(runtimeOutDir, 'components')
    )
    if (writtenFile) {
      files.add(relative(runtimeOutDir, writtenFile).replace(/\\/g, '/'))
    }
  }

  return [...files].sort()
}

async function buildComponents() {
  const componentEntries = await readdir(COMPONENTS_DIR, { withFileTypes: true })
  const allComponentSourceFiles = await walk(COMPONENTS_DIR)
  const allComponentCollidingModuleBases = collectCollidingModuleBases(
    allComponentSourceFiles,
    COMPONENTS_DIR
  )
  const manifest = {}

  for (const entry of componentEntries) {
    if (!entry.isDirectory()) continue

    const componentDir = join(COMPONENTS_DIR, entry.name)
    const indexFile = join(componentDir, 'index.mjs')
    try {
      await stat(indexFile)
    } catch {
      continue
    }

    const sourceFiles = await walk(componentDir)
    const collidingModuleBases = collectCollidingModuleBases(sourceFiles, componentDir)
    const files = new Set()

    for (const sourceFile of sourceFiles) {
      const outRelPath = toOutputRelativePath(componentDir, sourceFile, collidingModuleBases)
      const outFile = join(runtimeOutDir, 'components', entry.name, outRelPath)
      const writtenFile = await processSourceFile(
        componentDir,
        sourceFile,
        outFile,
        allComponentCollidingModuleBases,
        COMPONENTS_DIR,
        join(runtimeOutDir, 'components')
      )
      if (writtenFile) {
        files.add(relative(runtimeOutDir, writtenFile).replace(/\\/g, '/'))
      }
    }

    const sortedFiles = [...files].sort()

    manifest[entry.name] = {
      files: sortedFiles,
      entry: `components/${entry.name}/index.js`,
      module:
        sortedFiles.find((file) => file.endsWith(`/src/${entry.name}.js`)) ??
        `components/${entry.name}/index.js`,
      style: sortedFiles.find((file) => file.endsWith(`/src/${entry.name}.css`)) ?? null
    }
  }

  return manifest
}

async function bundleComponentRuntime(componentName, componentEntry) {
  const sourceModule = join(runtimeOutDir, componentEntry.module)
  const bundlePath = join(runtimeOutDir, 'components', componentName, 'bundle.js')

  try {
    await build({
      entryPoints: [sourceModule],
      outfile: bundlePath,
      bundle: true,
      format: 'esm',
      target: 'es2017',
      external: BUNDLE_EXTERNALS,
      logLevel: 'silent'
    })

    componentEntry.module = relative(runtimeOutDir, bundlePath).replace(/\\/g, '/')
    if (!componentEntry.files.includes(componentEntry.module)) {
      componentEntry.files.push(componentEntry.module)
      componentEntry.files.sort()
    }
  } catch (error) {
    console.warn(`Skipped bundling CodeSandbox runtime for ${componentName}: ${error.message}`)
  }
}

async function main() {
  const fingerprint = await computeFingerprint([
    fileURLToPath(import.meta.url),
    resolve(docsPublicDir, 'components'),
    resolve(docsPublicDir, 'hooks'),
    resolve(docsPublicDir, 'locale'),
    resolve(docsPublicDir, 'theme'),
    resolve(docsPublicDir, 'utils'),
    localePackageDistDir,
    dayjsEsmLocaleDir
  ])

  if (await shouldSkipCachedBuild('build-codesandbox-runtime', fingerprint, [manifestFile])) {
    console.log('CodeSandbox runtime assets unchanged, skipping rebuild')
    return
  }

  await rm(runtimeOutDir, { recursive: true, force: true })
  await ensureDir(runtimeOutDir)
  await buildSupportBarrelImportMaps()

  const supportFiles = [
    ...(await buildSupportPackages()),
    ...(await buildComponentRootRuntimeFiles()),
    ...(await buildDayjsLocaleRuntime())
  ].sort()
  const components = await buildComponents()

  for (const [componentName, componentEntry] of Object.entries(components)) {
    await bundleComponentRuntime(componentName, componentEntry)
  }

  const manifest = {
    version: 1,
    supportFiles,
    components
  }

  await writeFile(
    join(runtimeOutDir, 'manifest.json'),
    JSON.stringify(manifest, null, 2) + '\n',
    'utf8'
  )
  await updateBuildCache('build-codesandbox-runtime', fingerprint, [manifestFile])
  console.log(`CodeSandbox runtime assets built in ${runtimeOutDir}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
