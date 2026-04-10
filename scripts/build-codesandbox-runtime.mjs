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

function rewriteLocalImportSource(source) {
  if (source.endsWith('.vue')) return source.replace(/\.vue$/, '.js')
  if (source.endsWith('.mjs')) return source.replace(/\.mjs$/, '.js')
  return source
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

function rewriteImports(code, outputFile) {
  return code.replace(
    /(\bimport\s+(?:type\s+)?(?:[\w*\s{},]*?\s+from\s+)?["']|export\s+[\w*\s{},]*?\s+from\s+["']|import\s*\(\s*["'])([^"']+)(["'])/g,
    (full, prefix, source, suffix) => {
      let nextSource = source

      if (source.startsWith('@yh-ui/')) {
        nextSource = resolveRuntimeBareImport(outputFile, source)
      } else if (source.startsWith('.')) {
        nextSource = rewriteLocalImportSource(source)
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

async function processSourceFile(sourceFile, outFile) {
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

  code = rewriteImports(code, outFile)
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

    for (const sourceFile of sourceFiles) {
      const relPath = relative(sourceDir, sourceFile).replace(/\\/g, '/')
      const outRelPath = relPath.replace(/\.mjs$/, '.js').replace(/\.vue$/, '.js')
      const outFile = join(runtimeOutDir, pkg, outRelPath)
      const writtenFile = await processSourceFile(sourceFile, outFile)
      if (writtenFile) {
        files.add(relative(runtimeOutDir, writtenFile).replace(/\\/g, '/'))
      }
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
    const files = new Set()

    for (const sourceFile of sourceFiles) {
      const relPath = relative(componentDir, sourceFile).replace(/\\/g, '/')
      const outRelPath = relPath.replace(/\.mjs$/, '.js').replace(/\.vue$/, '.js')
      const outFile = join(runtimeOutDir, 'components', entry.name, outRelPath)
      const writtenFile = await processSourceFile(sourceFile, outFile)
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

  const supportFiles = await buildSupportPackages()
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
