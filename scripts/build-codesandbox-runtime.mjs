import { mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse, compileScript, compileTemplate } from '@vue/compiler-sfc'
import { build, transform } from 'esbuild'

const rootDir = resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
const docsPublicDir = resolve(rootDir, 'docs/public')
const runtimeOutDir = resolve(docsPublicDir, 'codesandbox-runtime')

const SUPPORT_PACKAGES = ['hooks', 'locale', 'theme', 'utils']
const COMPONENTS_DIR = resolve(docsPublicDir, 'components')
const COMPONENT_ROOT_RUNTIME_FILES = ['dayjs.mjs', 'highlight.mjs', 'markdown-it.mjs', 'viewerjs.mjs']
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
    return source.replace(
      /const dayjsLocales = import\.meta\.glob\([\s\S]*?\);\s*/,
      'const dayjsLocales = {};\n'
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

function rewriteLocalImportSource(sourceRelFile, source, collidingModuleBases = new Set()) {
  if (!source.startsWith('.')) return source
  const normalizedSourceFile = sourceRelFile.replace(/\\/g, '/')
  const resolvedPath = new URL(source, `https://runtime.local/${normalizedSourceFile}`)
    .pathname.replace(/^\/+/, '')

  if (source.endsWith('.vue')) {
    return source.replace(/\.vue$/, '.js')
  }

  if (source.endsWith('.mjs')) {
    const targetBase = resolvedPath.replace(/\.mjs$/, '')
    return collidingModuleBases.has(targetBase)
      ? toRelativeImportPath(normalizedSourceFile, resolveMetaModulePath(targetBase))
      : source.replace(/\.mjs$/, '.js')
  }

  if (!/\.[a-z0-9]+(?:[?#].*)?$/i.test(source)) {
    return collidingModuleBases.has(resolvedPath)
      ? toRelativeImportPath(normalizedSourceFile, resolveMetaModulePath(resolvedPath))
      : `${source}.js`
  }

  return source
}

function toRelativeImportPath(fromFile, targetFile) {
  const fromDir = dirname(fromFile).replace(/\\/g, '/')
  let relPath = relative(fromDir, targetFile).replace(/\\/g, '/')
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

function rewriteImports(code, sourceRelFile, outputFile, collidingModuleBases = new Set()) {
  return code.replace(
    /(\bimport\s+(?:type\s+)?(?:[\w*\s{},]*?\s+from\s+)?["']|export\s+[\w*\s{},]*?\s+from\s+["']|import\s*\(\s*["'])([^"']+)(["'])/g,
    (full, prefix, source, suffix) => {
      let nextSource = source

      if (source.startsWith('@yh-ui/')) {
        nextSource = resolveRuntimeBareImport(outputFile, source)
      } else if (source.startsWith('.')) {
        nextSource = rewriteLocalImportSource(sourceRelFile, source, collidingModuleBases)
      }

      return `${prefix}${nextSource}${suffix}`
    }
  )
}

function rewriteSupportBarrelImports(code) {
  const supportImportMappings = {
    hooks: {
      useConfig: 'use-config/index.js',
      useNamespace: 'use-namespace/index.js'
    },
    theme: {
      useComponentTheme: 'component-theme.js'
    }
  }

  return code.replace(
    /import\s*\{\s*([^}]+)\s*\}\s*from\s*["']((?:\.\.\/)+)(hooks|theme)\/index\.js["'];?/g,
    (full, imports, relativePrefix, packageName) => {
      const mappings = supportImportMappings[packageName]
      if (!mappings) return full

      const requestedImports = imports
        .split(',')
        .map((part) => part.trim())
        .filter(Boolean)
      const directImports = []
      const remainingImports = []

      for (const importedName of requestedImports) {
        const targetPath = mappings[importedName]
        if (targetPath) {
          directImports.push(
            `import { ${importedName} } from "${relativePrefix}${packageName}/${targetPath}";`
          )
        } else {
          remainingImports.push(importedName)
        }
      }

      if (remainingImports.length > 0) {
        directImports.unshift(
          `import { ${remainingImports.join(', ')} } from "${relativePrefix}${packageName}/index.js";`
        )
      }

      return directImports.join('\n')
    }
  )
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

async function processSourceFile(sourceRoot, sourceFile, outFile, collidingModuleBases = new Set()) {
  if (!/\.(?:mjs|vue|css)$/.test(sourceFile)) {
    return null
  }

  const source = await readFile(sourceFile, 'utf8')

  if (sourceFile.endsWith('.css')) {
    await ensureDir(dirname(outFile))
    await writeFile(outFile, source, 'utf8')
    return outFile
  }

  let code = patchSourceForCodeSandbox(sourceFile, source)

  if (sourceFile.endsWith('.vue')) {
    code = compileVueToModule(sourceFile, source)
  }

  const sourceRelFile = relative(sourceRoot, sourceFile).replace(/\\/g, '/')
  code = rewriteImports(code, sourceRelFile, outFile, collidingModuleBases)
  code = rewriteSupportBarrelImports(code)
  code = await lower(code)

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
        collidingModuleBases
      )
      if (writtenFile) {
        files.add(relative(runtimeOutDir, writtenFile).replace(/\\/g, '/'))
      }
    }
  }

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
      collidingModuleBases
    )
    if (writtenFile) {
      files.add(relative(runtimeOutDir, writtenFile).replace(/\\/g, '/'))
    }
  }

  return [...files].sort()
}

async function buildComponents() {
  const componentEntries = await readdir(COMPONENTS_DIR, { withFileTypes: true })
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
        collidingModuleBases
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
  await rm(runtimeOutDir, { recursive: true, force: true })
  await ensureDir(runtimeOutDir)

  const supportFiles = [
    ...(await buildSupportPackages()),
    ...(await buildComponentRootRuntimeFiles())
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
  console.log(`CodeSandbox runtime assets built in ${runtimeOutDir}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
