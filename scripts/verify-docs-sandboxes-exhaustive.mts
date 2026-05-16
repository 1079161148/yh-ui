import { spawn } from 'node:child_process'
import { readdir, readFile, stat } from 'node:fs/promises'
import http from 'node:http'
import net from 'node:net'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import { compileScript, parse } from '@vue/compiler-sfc'
import ts from 'typescript'
import {
  createCodeSandboxProjectFiles,
  createPlaygroundProject,
  decodePlaygroundPayload,
  extractUsedYhComponentNames,
  getUnresolvedRuntimeComponentNames
} from '../docs/.vitepress/theme/utils/demo-sandbox'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const docsDir = path.resolve(rootDir, 'docs')
const vitepressCli = path.resolve(rootDir, 'node_modules/vitepress/dist/node/cli.js')
const runtimeDir = path.resolve(rootDir, 'docs/public/codesandbox-runtime')

interface CapturedDemoCase {
  route: string
  pageTitle: string
  demoIndex: number
  payload: {
    title: string
    code: string
    context?: {
      docPath?: string
    }
  }
}

interface SandboxCapture {
  opens: string[]
}

interface CodeSandboxManifest {
  version: number
  supportFiles: string[]
  components: Record<
    string,
    { files: string[]; entry: string; module: string; style: string | null }
  >
}

const REQUIRED_CODE_SANDBOX_FILES = [
  '.npmrc',
  '.codesandbox/tasks.json',
  'index.html',
  'package.json',
  'sandbox.config.json',
  'tsconfig.json',
  'vite.config.ts',
  'src/App.vue',
  'src/Demo.vue',
  'src/env.d.ts',
  'src/main.ts',
  'src/style.css'
]

const PLAYGROUND_REQUIRED_ASSETS = [
  'docs/public/playground/yh-ui-runtime.js',
  'docs/public/playground/yh-ui-bundle.js',
  'docs/public/playground/yh-ui-bundle.css',
  'docs/public/playground/yh-flow-runtime.js',
  'docs/public/playground/yh-flow-runtime.css',
  'docs/public/playground/yh-hooks-runtime.js',
  'docs/public/playground/vue-runtime.js',
  'docs/public/playground/server-renderer.js'
]

const TARGET_CODE_SANDBOX_SOURCE_FILES = [
  'src/App.vue',
  'src/Demo.vue',
  'src/main.ts',
  'vite.config.ts'
]

const assetTextCache = new Map<string, Promise<string>>()
const runtimeTextCache = new Map<string, Promise<string>>()

;(globalThis as typeof globalThis & { window?: Window }).window = {
  location: {
    origin: 'https://1079161148.github.io'
  }
} as Window

function compressPayloadId(payload: CapturedDemoCase['payload']) {
  return JSON.stringify(payload)
}

function decodeRouteFromMarkdown(relativeMarkdownPath: string): string {
  const normalized = relativeMarkdownPath.replace(/\\/g, '/')
  if (normalized === 'index.md') {
    return '/yh-ui/'
  }

  if (normalized.endsWith('/index.md')) {
    return `/yh-ui/${normalized.slice(0, -'/index.md'.length)}/`
  }

  return `/yh-ui/${normalized.replace(/\.md$/, '.html')}`
}

async function walkMarkdownFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const results: string[] = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory() && entry.name === '.vitepress') {
      continue
    }
    if (entry.isDirectory()) {
      results.push(...(await walkMarkdownFiles(fullPath)))
      continue
    }

    if (entry.isFile() && entry.name.endsWith('.md')) {
      results.push(fullPath)
    }
  }

  return results
}

async function getDemoRoutes(): Promise<string[]> {
  const markdownFiles = await walkMarkdownFiles(docsDir)
  const routes: string[] = []

  for (const fullPath of markdownFiles) {
    const markdown = await readFile(fullPath, 'utf8')
    if (!markdown.includes('<DemoBlock')) {
      continue
    }

    const relativePath = path.relative(docsDir, fullPath)
    routes.push(decodeRouteFromMarkdown(relativePath))
  }

  return routes.sort()
}

function getAvailablePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const server = net.createServer()
    server.unref()
    server.on('error', reject)
    server.listen(0, '127.0.0.1', () => {
      const address = server.address()
      if (!address || typeof address === 'string') {
        server.close(() => reject(new Error('Failed to resolve port')))
        return
      }

      server.close((error) => {
        if (error) {
          reject(error)
          return
        }

        resolve(address.port)
      })
    })
  })
}

function waitForServer(url: string, timeoutMs = 120000): Promise<void> {
  const startedAt = Date.now()

  return new Promise((resolve, reject) => {
    const attempt = () => {
      const request = http.get(url, (response) => {
        response.resume()
        if ((response.statusCode ?? 500) < 500) {
          resolve()
          return
        }

        retry()
      })

      request.on('error', retry)
    }

    const retry = () => {
      if (Date.now() - startedAt > timeoutMs) {
        reject(new Error(`Timed out waiting for docs preview: ${url}`))
        return
      }

      setTimeout(attempt, 1000)
    }

    attempt()
  })
}

async function stopProcessTree(pid: number) {
  if (process.platform === 'win32') {
    try {
      await new Promise((resolve, reject) => {
        const child = spawn('taskkill', ['/pid', `${pid}`, '/T', '/F'], { windowsHide: true })
        child.on('error', reject)
        child.on('close', (code) =>
          code === 0 ? resolve(undefined) : reject(new Error(`taskkill exited with ${code}`))
        )
      })
      return
    } catch {
      // fall through
    }
  }

  try {
    process.kill(pid, 'SIGKILL')
  } catch {
    // ignore
  }
}

async function startDocsPreview() {
  const port = await getAvailablePort()
  const serverUrl = `http://127.0.0.1:${port}`
  const child = spawn(
    process.execPath,
    [vitepressCli, 'dev', '--host', '127.0.0.1', '--port', `${port}`],
    {
      cwd: docsDir,
      env: process.env,
      windowsHide: true,
      stdio: ['ignore', 'pipe', 'pipe']
    }
  )

  let stdout = ''
  let stderr = ''

  child.stdout?.on('data', (chunk) => {
    stdout += chunk.toString()
  })
  child.stderr?.on('data', (chunk) => {
    stderr += chunk.toString()
  })

  await waitForServer(`${serverUrl}/yh-ui/`)

  return { child, serverUrl, stdoutRef: () => stdout, stderrRef: () => stderr }
}

async function captureSupportedDemos(
  routes: string[],
  serverUrl: string
): Promise<CapturedDemoCase[]> {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  const capturedCases: CapturedDemoCase[] = []

  await page.addInitScript(() => {
    ;(window as typeof window & { __sandboxCapture?: SandboxCapture }).__sandboxCapture = {
      opens: []
    }

    window.open = function (url?: string | URL | undefined) {
      const state = (window as typeof window & { __sandboxCapture: SandboxCapture })
        .__sandboxCapture
      state.opens.push(String(url ?? ''))
      return null
    }
  })

  for (const route of routes) {
    const url = `${serverUrl}${route}`
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 })
    await page.waitForTimeout(300)

    const demoBoxes = page.locator('.demo-box')
    const demoCount = await demoBoxes.count()
    if (demoCount === 0) {
      continue
    }

    const pageTitle =
      (await page
        .locator('.vp-doc h1')
        .first()
        .textContent()
        .catch(() => null)) || route

    const pageCaptures = await page.evaluate(() => {
      const boxes = Array.from(document.querySelectorAll('.demo-box'))
      const results: Array<{ demoIndex: number; openedUrl: string }> = []

      for (const [demoIndex, box] of boxes.entries()) {
        const buttons = box.querySelectorAll<HTMLButtonElement>(
          '.demo-box__actions-right .demo-box__action-btn'
        )
        const playgroundButton = buttons[0]
        if (!playgroundButton || playgroundButton.disabled) {
          continue
        }

        ;(window as typeof window & { __sandboxCapture: SandboxCapture }).__sandboxCapture.opens =
          []
        playgroundButton.click()
        const openedUrl =
          (
            window as typeof window & { __sandboxCapture: SandboxCapture }
          ).__sandboxCapture.opens.at(-1) || ''

        if (openedUrl) {
          results.push({ demoIndex, openedUrl })
        }
      }

      return results
    })

    for (const { demoIndex, openedUrl } of pageCaptures) {
      const demoParam = new URL(openedUrl).searchParams.get('demo') || ''
      const payload = decodePlaygroundPayload(demoParam)
      if (!payload) {
        throw new Error(`Failed to decode Playground payload for ${route} demo #${demoIndex + 1}`)
      }

      capturedCases.push({
        route,
        pageTitle: pageTitle.trim(),
        demoIndex,
        payload
      })
    }

    if (capturedCases.length > 0 && capturedCases.length % 50 === 0) {
      console.log(`[verify:docs-sandboxes] captured ${capturedCases.length} demos so far`)
    }
  }

  await browser.close()
  return capturedCases
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message)
  }
}

function collectScriptModuleImports(
  code: string,
  id: string
): Array<{ source: string; typeOnly: boolean }> {
  const sourceFile = ts.createSourceFile(id, code, ts.ScriptTarget.ES2020, true, ts.ScriptKind.TS)
  const imports: Array<{ source: string; typeOnly: boolean }> = []

  const visit = (node: ts.Node) => {
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
      imports.push({
        source: node.moduleSpecifier.text,
        typeOnly: Boolean(node.importClause?.isTypeOnly)
      })
    } else if (
      ts.isCallExpression(node) &&
      node.expression.kind === ts.SyntaxKind.ImportKeyword &&
      node.arguments.length === 1 &&
      ts.isStringLiteral(node.arguments[0])
    ) {
      imports.push({
        source: node.arguments[0].text,
        typeOnly: false
      })
    }

    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  return imports
}

function collectModuleImports(
  filePath: string,
  content: string
): Array<{ source: string; typeOnly: boolean }> {
  if (filePath.endsWith('.vue')) {
    const { descriptor } = parse(content, { filename: filePath })
    const imports: Array<{ source: string; typeOnly: boolean }> = []
    if (descriptor.script?.content) {
      imports.push(...collectScriptModuleImports(descriptor.script.content, `${filePath}?script`))
    }
    if (descriptor.scriptSetup?.content) {
      imports.push(
        ...collectScriptModuleImports(descriptor.scriptSetup.content, `${filePath}?script-setup`)
      )
    }
    return imports
  }

  return collectScriptModuleImports(content, filePath)
}

function normalizeFilePath(filePath: string): string {
  return filePath.replace(/\\/g, '/')
}

function dirnamePosix(filePath: string): string {
  const normalized = normalizeFilePath(filePath)
  const lastSlash = normalized.lastIndexOf('/')
  return lastSlash === -1 ? '' : normalized.slice(0, lastSlash)
}

function resolveRelativeImport(
  fromFile: string,
  source: string,
  files: Set<string>
): string | null {
  const baseDir = dirnamePosix(fromFile)
  const baseUrl = new URL(`file:///${baseDir ? `${baseDir}/` : ''}`)
  const resolvedPath = new URL(source, baseUrl).pathname
    .replace(/^\/([A-Za-z]:)/, '$1')
    .replace(/^\//, '')
  const candidates = [
    resolvedPath,
    `${resolvedPath}.ts`,
    `${resolvedPath}.js`,
    `${resolvedPath}.vue`,
    `${resolvedPath}.json`,
    `${resolvedPath}/index.ts`,
    `${resolvedPath}/index.js`,
    `${resolvedPath}/index.vue`
  ].map(normalizeFilePath)

  for (const candidate of candidates) {
    if (files.has(candidate)) {
      return candidate
    }
  }

  return null
}

function validateVueSfc(code: string, id: string) {
  const { descriptor, errors } = parse(code, { filename: id })
  assert(errors.length === 0, `SFC parse failed for ${id}: ${errors.join(', ')}`)

  if (descriptor.scriptSetup || descriptor.script) {
    compileScript(descriptor, { id })
  }
}

function validateTypeScriptModule(code: string, id: string) {
  try {
    const result = ts.transpileModule(code, {
      compilerOptions: {
        target: ts.ScriptTarget.ES2020,
        module: ts.ModuleKind.ESNext,
        allowJs: true
      },
      fileName: id,
      reportDiagnostics: true
    })

    const errors =
      result.diagnostics?.filter(
        (diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error
      ) || []
    if (errors.length > 0) {
      const message = ts.flattenDiagnosticMessageText(errors[0].messageText, '\n')
      throw new Error(message)
    }
  } catch (error) {
    throw new Error(
      `TypeScript transpile failed for ${id}: ${error instanceof Error ? error.message : String(error)}`
    )
  }
}

async function fileExists(fullPath: string) {
  try {
    const result = await stat(fullPath)
    return result.isFile()
  } catch {
    return false
  }
}

async function loadRuntimeAssetText(relativePath: string): Promise<string> {
  const cacheKey = normalizeFilePath(relativePath)
  if (!runtimeTextCache.has(cacheKey)) {
    runtimeTextCache.set(cacheKey, readFile(path.join(runtimeDir, ...cacheKey.split('/')), 'utf8'))
  }

  return runtimeTextCache.get(cacheKey)!
}

async function loadSiteAssetText(assetPath: string): Promise<string> {
  const cacheKey = normalizeFilePath(assetPath)
  if (!assetTextCache.has(cacheKey)) {
    assetTextCache.set(
      cacheKey,
      readFile(path.join(rootDir, 'docs', 'public', ...cacheKey.split('/')), 'utf8')
    )
  }

  return assetTextCache.get(cacheKey)!
}

async function validatePlaygroundCase(demoCase: CapturedDemoCase) {
  const project = createPlaygroundProject(
    demoCase.payload.title,
    demoCase.payload.code,
    demoCase.payload.context,
    '/yh-ui/'
  )

  validateVueSfc(project.code, `${demoCase.route}#playground-${demoCase.demoIndex + 1}.vue`)
  assert(
    project.importCode.includes('/yh-ui/playground/yh-ui-runtime.js'),
    `Playground importCode missing yh-ui-runtime.js for ${demoCase.route} demo #${demoCase.demoIndex + 1}`
  )
  assert(
    project.useCode.includes('app.use(YhUI)'),
    `Playground useCode missing app.use(YhUI) for ${demoCase.route} demo #${demoCase.demoIndex + 1}`
  )
  assert(
    project.headHTML.includes('/yh-ui/yh-ui/style.css'),
    `Playground headHTML missing yh-ui/style.css for ${demoCase.route} demo #${demoCase.demoIndex + 1}`
  )
  assert(
    project.headHTML.includes('/yh-ui/playground/yh-ui-bundle.css'),
    `Playground headHTML missing bundle css for ${demoCase.route} demo #${demoCase.demoIndex + 1}`
  )

  for (const asset of PLAYGROUND_REQUIRED_ASSETS) {
    assert(await fileExists(path.join(rootDir, asset)), `Missing Playground asset: ${asset}`)
  }
}

async function validateCodeSandboxCase(
  demoCase: CapturedDemoCase,
  manifest: CodeSandboxManifest
): Promise<string> {
  const unresolvedRuntimeComponentNames = getUnresolvedRuntimeComponentNames(
    extractUsedYhComponentNames(demoCase.payload.code),
    manifest,
    demoCase.payload.context
  )
  assert(
    unresolvedRuntimeComponentNames.length === 0,
    `CodeSandbox runtime mapping missing for YH component tag(s): ${unresolvedRuntimeComponentNames
      .map((name) => `<yh-${name}>`)
      .join(', ')}`
  )

  const files = await createCodeSandboxProjectFiles(
    demoCase.payload.title,
    demoCase.payload.code,
    demoCase.payload.context,
    {
      base: '/yh-ui/',
      manifest,
      loadRuntimeAssetText,
      loadSiteAssetText
    }
  )

  const fileSet = new Set(Object.keys(files).map(normalizeFilePath))
  for (const requiredFile of REQUIRED_CODE_SANDBOX_FILES) {
    assert(
      fileSet.has(requiredFile),
      `CodeSandbox files missing ${requiredFile} for ${demoCase.route} demo #${demoCase.demoIndex + 1}`
    )
  }

  const packageJson = JSON.parse(files['package.json']) as {
    dependencies?: Record<string, string>
    devDependencies?: Record<string, string>
    main?: string
    type?: string
    scripts?: Record<string, string>
  }
  assert(
    packageJson.type === 'module',
    `CodeSandbox package.json type is not module for ${demoCase.route}`
  )
  assert(
    packageJson.scripts?.dev?.includes('vite'),
    `CodeSandbox package.json is missing a Vite dev script for ${demoCase.route}`
  )
  assert(
    files['sandbox.config.json'],
    `CodeSandbox should emit sandbox.config.json for ${demoCase.route}`
  )
  assert(files['vite.config.ts'], `CodeSandbox should emit vite.config.ts for ${demoCase.route}`)
  assert(files['tsconfig.json'], `CodeSandbox should emit tsconfig.json for ${demoCase.route}`)
  assert(files['src/env.d.ts'], `CodeSandbox should emit src/env.d.ts for ${demoCase.route}`)
  assert(
    !files['.codesandbox/template.json'],
    `CodeSandbox should not emit the legacy .codesandbox/template.json scaffold for ${demoCase.route}`
  )

  validateVueSfc(
    files['src/App.vue'],
    `${demoCase.route}#codesandbox-app-${demoCase.demoIndex + 1}.vue`
  )
  validateVueSfc(
    files['src/Demo.vue'],
    `${demoCase.route}#codesandbox-demo-${demoCase.demoIndex + 1}.vue`
  )
  validateTypeScriptModule(
    files['src/main.ts'],
    `${demoCase.route}#codesandbox-main-${demoCase.demoIndex + 1}.ts`
  )

  const packageImports = new Set([
    ...Object.keys(packageJson.dependencies || {}),
    ...Object.keys(packageJson.devDependencies || {})
  ])

  for (const normalizedFilePath of TARGET_CODE_SANDBOX_SOURCE_FILES) {
    const content = files[normalizedFilePath]
    assert(content, `Missing expected source file ${normalizedFilePath} for ${demoCase.route}`)

    if (
      (normalizedFilePath.endsWith('.ts') && !normalizedFilePath.endsWith('.d.ts')) ||
      normalizedFilePath.endsWith('.js')
    ) {
      validateTypeScriptModule(content, `${demoCase.route}#${normalizedFilePath}`)
    }

    for (const { source, typeOnly } of collectModuleImports(normalizedFilePath, content)) {
      if (source.startsWith('.')) {
        const resolved = resolveRelativeImport(normalizedFilePath, source, fileSet)
        assert(
          resolved,
          `Unresolved relative import "${source}" from ${normalizedFilePath} for ${demoCase.route}`
        )
        continue
      }

      if (typeOnly) {
        continue
      }

      assert(
        packageImports.has(source) || packageImports.has(source.split('/').slice(0, 2).join('/')),
        `Missing dependency "${source}" in package.json for ${demoCase.route} demo #${demoCase.demoIndex + 1}`
      )
    }
  }

  const scaffoldSignature = JSON.stringify(
    {
      npmrc: files['.npmrc'],
      packageScripts: packageJson.scripts,
      sandboxConfig: files['sandbox.config.json'],
      tasksConfig: files['.codesandbox/tasks.json'],
      viteConfig: files['vite.config.ts'],
      tsconfig: files['tsconfig.json'],
      envDts: files['src/env.d.ts'],
      legacyTemplate: files['.codesandbox/template.json']
    },
    null,
    2
  )

  return scaffoldSignature
}

async function main() {
  const routeFilter = process.env.DOCS_SANDBOX_ROUTE_FILTER?.trim()
  const routeLimit = Number(process.env.DOCS_SANDBOX_ROUTE_LIMIT || '0')
  const skipPlayground = process.env.DOCS_SANDBOX_SKIP_PLAYGROUND === 'true'
  const skipCodeSandbox = process.env.DOCS_SANDBOX_SKIP_CODESANDBOX === 'true'
  let routes = await getDemoRoutes()
  if (routeFilter) {
    routes = routes.filter((route) => route.includes(routeFilter))
  }
  if (routeLimit > 0) {
    routes = routes.slice(0, routeLimit)
  }
  const manifest = JSON.parse(
    await readFile(path.join(runtimeDir, 'manifest.json'), 'utf8')
  ) as CodeSandboxManifest
  const { child, serverUrl, stdoutRef, stderrRef } = await startDocsPreview()

  try {
    const capturedCases = await captureSupportedDemos(routes, serverUrl)
    const uniqueCases = new Map<string, CapturedDemoCase>()
    for (const demoCase of capturedCases) {
      uniqueCases.set(compressPayloadId(demoCase.payload), demoCase)
    }

    const scaffoldSignatures = new Set<string>()
    let validatedCases = 0

    for (const demoCase of uniqueCases.values()) {
      try {
        if (!skipPlayground) {
          await validatePlaygroundCase(demoCase)
        }
        if (!skipCodeSandbox) {
          scaffoldSignatures.add(await validateCodeSandboxCase(demoCase, manifest))
        }
        validatedCases += 1
        if (validatedCases % 25 === 0) {
          console.log(
            `[verify:docs-sandboxes] validated ${validatedCases}/${uniqueCases.size} unique demos`
          )
        }
      } catch (error) {
        throw new Error(
          `[${demoCase.route} demo #${demoCase.demoIndex + 1} "${demoCase.payload.title}"] ${
            error instanceof Error ? error.message : String(error)
          }`
        )
      }
    }

    console.log(
      JSON.stringify(
        {
          ok: true,
          routesScanned: routes.length,
          supportedDemos: capturedCases.length,
          uniqueSupportedDemos: uniqueCases.size,
          unifiedCodeSandboxScaffoldVariants: skipCodeSandbox ? 0 : scaffoldSignatures.size
        },
        null,
        2
      )
    )
  } catch (error) {
    const details = `\n[docs-preview stdout]\n${stdoutRef()}\n[docs-preview stderr]\n${stderrRef()}`
    throw new Error(`${error instanceof Error ? error.message : String(error)}${details}`)
  } finally {
    if (child.pid) {
      await stopProcessTree(child.pid)
    }
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
