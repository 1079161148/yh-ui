import sdk, { type Project } from '@stackblitz/sdk'
import LZString from 'lz-string'
import yhUiPackage from '../../../../packages/yh-ui/package.json'

const { compressToBase64, compressToEncodedURIComponent, decompressFromEncodedURIComponent } =
  LZString

// ============================================================
// 版本与依赖常量
// ============================================================

const YH_UI_VERSION = yhUiPackage.version
const VUE_VERSION = '3.5.27'

const SANDBOX_BUNDLED_PACKAGES = new Set([
  '@yh-ui/yh-ui',
  '@yh-ui/components',
  '@yh-ui/hooks',
  '@yh-ui/icons',
  '@yh-ui/utils',
  '@yh-ui/theme',
  '@yh-ui/locale',
  '@yh-ui/flow'
])

// 主 CDN：esm.sh
const ESM_CDN = 'https://esm.sh'

// 在 esm.sh 上工作正常的包（已验证 200）
const ESM_SH_OK = new Set([
  '@yh-ui/yh-ui',
  '@yh-ui/utils',
  '@yh-ui/hooks',
  '@yh-ui/locale',
  '@yh-ui/theme'
])

// 这些包在 esm.sh 的 bundle 模式下失败（dist 含 .vue 导出），需要跳过
// 在 Playground 中通过 full.mjs 的全局注册统一处理
const ESM_SH_BROKEN = new Set(['@yh-ui/components', '@yh-ui/ai-sdk'])

const BASE_DEPENDENCIES: Record<string, string> = {
  vue: `^${VUE_VERSION}`
}

const DEV_DEPENDENCIES: Record<string, string> = {
  vite: '^6.0.7',
  '@vitejs/plugin-vue': '^6.0.0',
  typescript: '^5.7.3',
  sass: '^1.83.1',
  'vue-tsc': '^2.2.0'
}

const KNOWN_DEPENDENCIES: Record<string, string> = {
  '@floating-ui/dom': '^1.7.4',
  '@iconify/vue': '^4.1.2',
  '@langchain/core': '^0.3.0',
  '@yh-ui/ai-sdk': YH_UI_VERSION,
  '@yh-ui/components': YH_UI_VERSION,
  '@yh-ui/flow': YH_UI_VERSION,
  '@yh-ui/hooks': YH_UI_VERSION,
  '@yh-ui/icons': YH_UI_VERSION,
  '@yh-ui/locale': YH_UI_VERSION,
  '@yh-ui/nuxt': YH_UI_VERSION,
  '@yh-ui/request': YH_UI_VERSION,
  '@yh-ui/theme': YH_UI_VERSION,
  '@yh-ui/utils': YH_UI_VERSION,
  axios: '^1.8.4',
  'async-validator': '^4.2.5',
  dayjs: '^1.11.19',
  'd3-force': '^3.0.0',
  dagre: '^0.8.5',
  echarts: '^6.0.0',
  elkjs: '^0.10.0',
  'html-to-image': '^1.11.13',
  'highlight.js': '^11.11.1',
  mermaid: '^11.12.3',
  'monaco-editor': '^0.55.1',
  pinia: '^3.0.4',
  viewerjs: '^1.11.7',
  'vue-router': '^4.6.4',
  xlsx: '^0.18.5',
  zod: '^3.25.76'
}
const CODE_SANDBOX_RUNTIME_BASE = 'codesandbox-runtime/'

const NODE_BUILTINS = new Set([
  'assert',
  'buffer',
  'child_process',
  'crypto',
  'events',
  'fs',
  'http',
  'https',
  'net',
  'os',
  'path',
  'process',
  'stream',
  'timers',
  'tls',
  'tty',
  'url',
  'util',
  'vm',
  'zlib'
])

const UNSUPPORTED_IMPORT_PREFIXES = ['.', '/', '@/', '~/', 'vitepress']
const UNSUPPORTED_CODE_PATTERNS: Array<{ pattern: RegExp; reason: string }> = [
  {
    pattern: /\bimport\.meta\.glob(?:Eager)?\s*\(/,
    reason: 'This demo uses local file glob imports that cannot be recreated in an online sandbox.'
  },
  {
    pattern: /\bfrom\s+['"]node:/,
    reason: 'This demo depends on Node built-in modules.'
  },
  {
    pattern: /\b(?:process\.|Buffer\b|require\(\s*['"](?:fs|path|os|node:))/,
    reason: 'This demo depends on server-side or Node-specific APIs.'
  }
]

const IMPORT_RE =
  /\bimport\s+(?:type\s+)?(?:[\w*\s{},]*?\s+from\s+)?["']([^"']+)["']|\bexport\s+[\w*\s{},]*?\s+from\s+["']([^"']+)["']|\bimport\s*\(\s*["']([^"']+)["']\s*\)/g

const NPM_CDN = 'https://cdn.jsdelivr.net/npm'

// ============================================================
// 类型定义
// ============================================================

export interface SandboxSupport {
  supported: boolean
  reason?: string
}

export interface SandboxContext {
  docPath?: string
}

export interface PlaygroundPayload {
  title: string
  code: string
  context?: SandboxContext
}

export interface PlaygroundProject {
  title: string
  code: string
  importMap: ImportMap
  headHTML: string
  importCode: string
  useCode: string
}

interface ImportMap {
  imports: Record<string, string>
  scopes?: Record<string, Record<string, string>>
}

interface StaticPackageEntry {
  entry: string
  dir: string
}

interface PlaygroundRuntimeEnv {
  isLocalDev: boolean
  isGitHubPages: boolean
}

interface CodeSandboxRuntimeManifest {
  version: number
  supportFiles: string[]
  components: Record<
    string,
    {
      files: string[]
      entry: string
      module: string
      style: string | null
    }
  >
}

interface CodeSandboxProjectFilesOptions {
  base?: string
  manifest?: CodeSandboxRuntimeManifest
  loadRuntimeAssetText?: (relativePath: string) => Promise<string>
  loadSiteAssetText?: (assetPath: string) => Promise<string>
}

interface SandboxProjectFilesOptions {
  base?: string
  loadSiteAssetText?: (assetPath: string) => Promise<string>
}

const DOC_SOURCE_MODULES = import.meta.glob('../../../../**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
}) as Record<string, string>

// ============================================================
// 工具函数
// ============================================================

function normalizeSfc(code: string): string {
  const trimmed = code.trim()
  if (!trimmed) {
    return '<template>\n  <div />\n</template>\n'
  }
  if (/<(?:template|script|style)\b/i.test(trimmed)) {
    return trimmed
  }
  return '<template>\n' + trimmed + '\n</template>\n'
}

function normalizeDocPath(docPath?: string): string | null {
  if (!docPath) return null
  return docPath.replace(/^\.?\/*/, '').replace(/\\/g, '/')
}

function normalizeDocModulePath(modulePath: string): string {
  const normalized = modulePath.replace(/\\/g, '/')
  if (normalized.includes('/docs/')) {
    return normalized.replace(/^.*?\/docs\//, '')
  }
  return normalized.replace(/^(?:\.\.\/)+/, '')
}

function extractDocLevelStyleBlocks(docPath?: string): string[] {
  const normalizedDocPath = normalizeDocPath(docPath)
  if (!normalizedDocPath) return []

  const sourceEntry = Object.entries(DOC_SOURCE_MODULES).find(([modulePath]) => {
    return normalizeDocModulePath(modulePath) === normalizedDocPath
  })
  const rawSource = sourceEntry?.[1]
  if (!rawSource) return []

  const sourceWithoutScripts = rawSource.replace(/<script\s+setup\b[\s\S]*?<\/script>/g, '')
  return [...sourceWithoutScripts.matchAll(/<style\b[^>]*>[\s\S]*?<\/style>/g)].map((match) =>
    match[0].trim()
  )
}

function appendDocSharedStyles(code: string, context?: SandboxContext): string {
  const docStyleBlocks = extractDocLevelStyleBlocks(context?.docPath)
  if (docStyleBlocks.length === 0) {
    return code
  }

  let output = code.trim()
  for (const styleBlock of docStyleBlocks) {
    if (output.includes(styleBlock)) continue
    output += `\n\n${styleBlock}`
  }

  return output
}

function extractBareImports(code: string): string[] {
  const imports = new Set<string>()
  for (const match of code.matchAll(IMPORT_RE)) {
    const source = match[1] || match[2] || match[3]
    if (!source) continue
    imports.add(source)
  }
  return [...imports]
}

function getPackageName(source: string): string {
  if (source.startsWith('@')) {
    const [scope, name] = source.split('/')
    return `${scope}/${name || ''}`
  }
  return source.split('/')[0]
}

function isUnsupportedImport(source: string): boolean {
  return UNSUPPORTED_IMPORT_PREFIXES.some((prefix) => source.startsWith(prefix))
}

function normalizeDependencyVersion(version: string): string {
  return version.replace(/^[~^]/, '')
}

function extractUsedYhComponentNames(code: string): string[] {
  const matches = [...code.matchAll(/<\s*yh-([a-z0-9-]+)\b/gi)]
  return [...new Set(matches.map((match) => match[1]).filter(Boolean))].sort()
}

function kebabToPascalCase(value: string): string {
  return value
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

async function fetchTextAsset(url: string): Promise<string> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch sandbox asset: ${url} (${response.status})`)
  }

  return response.text()
}

async function loadCodeSandboxRuntimeManifest(base: string): Promise<CodeSandboxRuntimeManifest> {
  const manifestUrl = resolveSiteAssetUrl(base, `${CODE_SANDBOX_RUNTIME_BASE}manifest.json`)
  return JSON.parse(await fetchTextAsset(manifestUrl)) as CodeSandboxRuntimeManifest
}

function collectThirdPartyDependenciesFromCode(code: string): Record<string, string> {
  const dependencies: Record<string, string> = {}

  for (const source of extractBareImports(code)) {
    if (source.startsWith('.') || source.startsWith('/')) {
      continue
    }

    const pkg = getPackageName(source)
    if (
      pkg === 'vue' ||
      pkg.startsWith('node:') ||
      NODE_BUILTINS.has(pkg) ||
      pkg.startsWith('@yh-ui/')
    ) {
      continue
    }

    dependencies[pkg] = KNOWN_DEPENDENCIES[pkg] || 'latest'
  }

  return dependencies
}

function normalizeRuntimeImportSource(source: string): string {
  if (!source.startsWith('.')) {
    return source
  }

  if (/\.[a-z0-9]+(?:[?#].*)?$/i.test(source)) {
    return source
  }

  return `${source}.js`
}

function resolveRuntimeRelativePath(
  fromFile: string,
  importSource: string,
  availableFiles: Set<string>
): string {
  const resolvedPath = new URL(importSource, `https://runtime.local/${fromFile}`).pathname.replace(
    /^\/+/,
    ''
  )
  const extensionMatch = resolvedPath.match(/(\.[a-z0-9]+)$/i)
  const hasExtension = Boolean(extensionMatch)
  const extension = extensionMatch?.[1] ?? ''
  const resolvedPathWithoutExtension = hasExtension
    ? resolvedPath.slice(0, -extension.length)
    : resolvedPath
  const candidates = hasExtension
    ? [resolvedPath, `${resolvedPathWithoutExtension}/index${extension}`]
    : [
        resolvedPath,
        `${resolvedPath}.js`,
        `${resolvedPath}.css`,
        `${resolvedPath}/index.js`,
        `${resolvedPath}/index.css`
      ]

  return (
    candidates.find((candidate) => availableFiles.has(candidate)) ??
    normalizeRuntimeImportSource(importSource)
  )
}

function toRelativeRuntimeImport(fromFile: string, targetFile: string): string {
  const fromSegments = fromFile.split('/')
  fromSegments.pop()

  const targetSegments = targetFile.split('/')
  let commonIndex = 0

  while (
    commonIndex < fromSegments.length &&
    commonIndex < targetSegments.length &&
    fromSegments[commonIndex] === targetSegments[commonIndex]
  ) {
    commonIndex += 1
  }

  const upwardSegments = new Array(fromSegments.length - commonIndex).fill('..')
  const downwardSegments = targetSegments.slice(commonIndex)
  const relativePath = [...upwardSegments, ...downwardSegments].join('/')

  if (!relativePath) {
    return './'
  }

  return relativePath.startsWith('.') ? relativePath : `./${relativePath}`
}

function rewriteRuntimeRelativeImports(
  code: string,
  fromFile: string,
  availableFiles: Set<string>
): string {
  return code.replace(
    /(\bimport\s+(?:type\s+)?(?:[\w*\s{},]*?\s+from\s+)?["']|\bexport\s+[\w*\s{},]*?\s+from\s+["']|\bimport\s*\(\s*["'])([^"']+)(["'])/g,
    (full, prefix, source, suffix) => {
      if (!source.startsWith('.')) {
        return `${prefix}${source}${suffix}`
      }

      const resolvedTarget = resolveRuntimeRelativePath(fromFile, source, availableFiles)
      const rewrittenSource = resolvedTarget.startsWith('.')
        ? normalizeRuntimeImportSource(resolvedTarget)
        : toRelativeRuntimeImport(fromFile, resolvedTarget)

      return `${prefix}${rewrittenSource}${suffix}`
    }
  )
}

function compressCodeSandboxParameters(input: string): string {
  return compressToBase64(input).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function normalizeBasePath(base = '/'): string {
  const normalized = base.startsWith('/') ? base : `/${base}`
  return normalized.endsWith('/') ? normalized : `${normalized}/`
}

function resolveSiteAssetUrl(base: string, assetPath: string): string {
  const normalizedBase = normalizeBasePath(base)
  const normalizedAssetPath = assetPath.replace(/^\/+/, '')
  return new URL(normalizedAssetPath, `${window.location.origin}${normalizedBase}`).toString()
}

function resolvePlaygroundRuntimeEnv(base: string): PlaygroundRuntimeEnv {
  const hostname = typeof window === 'undefined' ? '' : window.location.hostname
  const normalizedBase = normalizeBasePath(base)
  const isLocalHost = hostname === 'localhost' || hostname === '127.0.0.1'

  return {
    isLocalDev: import.meta.env.DEV || isLocalHost,
    isGitHubPages: normalizedBase !== '/'
  }
}

function _getPlaygroundStaticPackageEntries(base: string): Record<string, StaticPackageEntry> {
  return {
    '@yh-ui/yh-ui': { entry: resolveSiteAssetUrl(base, 'yh-ui/full.mjs'), dir: 'yh-ui/' },
    '@yh-ui/components': {
      entry: resolveSiteAssetUrl(base, 'components/index.mjs'),
      dir: 'components/'
    },
    '@yh-ui/hooks': { entry: resolveSiteAssetUrl(base, 'hooks/index.mjs'), dir: 'hooks/' },
    '@yh-ui/icons': { entry: resolveSiteAssetUrl(base, 'icons/index.mjs'), dir: 'icons/' },
    '@yh-ui/utils': { entry: resolveSiteAssetUrl(base, 'utils/index.mjs'), dir: 'utils/' },
    '@yh-ui/theme': { entry: resolveSiteAssetUrl(base, 'theme/index.mjs'), dir: 'theme/' },
    '@yh-ui/locale': { entry: resolveSiteAssetUrl(base, 'locale/index.mjs'), dir: 'locale/' }
  }
}

function resolveJsdelivrPackageEntry(
  pkg: string,
  version: string,
  file = 'dist/index.mjs'
): string {
  return `${NPM_CDN}/${pkg}@${version}/${file}`
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function ensureVueImports(code: string, importsToAdd: string[]): string {
  const vueImportRe = /import\s+\{([^}]*)\}\s+from\s+['"]vue['"]/
  const match = code.match(vueImportRe)
  if (!match) {
    return `import { ${importsToAdd.join(', ')} } from 'vue'\n${code}`
  }
  const currentImports = match[1]
    .split(',')
    .map((e) => e.trim())
    .filter(Boolean)
  const mergedImports = [...new Set([...currentImports, ...importsToAdd])].sort()
  return code.replace(vueImportRe, `import { ${mergedImports.join(', ')} } from 'vue'`)
}

// ============================================================
// 代码转换函数
// ============================================================

function rewriteWorkspaceImports(code: string): string {
  return code
    .replace(/from\s+['"]\.\.\/.\.\/packages\/components\/src\/loading['"]/g, "from '@yh-ui/yh-ui'")
    .replace(/from\s+['"]\.\.\/.\.\/packages\/components\/src\/message['"]/g, "from '@yh-ui/yh-ui'")
    .replace(
      /import\s+type\s+\{([^}]*)\}\s+from\s+['"]\.\.\/.\.\/packages\/components\/src\/table\/src\/table['"]\s*;?\s*/g,
      "import type {$1} from '@yh-ui/yh-ui'\n"
    )
    .replace(/^\s*import\s+type\s+\{[^}]+\}\s+from\s+['"]\.\.\/src\/ai-mention['"]\s*;?\s*\n/gm, '')
}

function rewriteFlowSandboxImports(code: string): string {
  return code
}

function stripPlaygroundOnlyImports(code: string): string {
  return code.replace(/^\s*import\s+['"]@yh-ui\/yh-ui\/css['"]\s*;?\s*\n/gm, '')
}

function inlineCustomEdgeComponent(code: string): string {
  if (!code.includes('StepEdgeComponent.vue')) {
    return code
  }

  const componentDefinition = [
    'const StepEdgeComponent = defineComponent({',
    '  props: {',
    '    path: String,',
    '    stroke: String,',
    '    labelX: Number,',
    '    labelY: Number,',
    '    edge: Object,',
    '    strokeWidth: Number',
    '  },',
    '  setup(props) {',
    "    return () => h('g', [",
    "      h('path', {",
    '        d: props.path,',
    '        stroke: props.stroke,',
    "        'stroke-width': props.strokeWidth,",
    "        fill: 'none',",
    "        'stroke-dasharray': '8,4',",
    "        class: 'custom-step-path'",
    '      }),',
    "      h('circle', {",
    '        cx: props.labelX,',
    '        cy: props.labelY,',
    '        r: 6,',
    '        fill: props.stroke,',
    "        class: 'pulse-dot'",
    '      }),',
    "      props.edge?.label ? h('g', [",
    "        props.edge.labelShowBg ? h('rect', {",
    '          x: (props.labelX || 0) - 40,',
    '          y: (props.labelY || 0) - 24,',
    '          width: 80,',
    '          height: 20,',
    '          rx: 4,',
    "          fill: props.edge.labelBgColor || '#ffffff',",
    '          stroke: props.stroke,',
    "          'stroke-width': 1",
    '        }) : null,',
    "        h('text', {",
    '          x: props.labelX,',
    '          y: (props.labelY || 0) - 10,',
    "          'text-anchor': 'middle',",
    "          fill: '#334155',",
    "          style: { fontSize: '11px', fontWeight: '600' }",
    '        }, props.edge.label)',
    '      ]) : null',
    '    ])',
    '  }',
    '})',
    ''
  ].join('\n')

  return ensureVueImports(
    code.replace(
      /^\s*import\s+StepEdgeComponent\s+from\s+['"]\.\/StepEdgeComponent\.vue['"]\s*;?\s*\n/gm,
      `${componentDefinition}\n`
    ),
    ['defineComponent', 'h']
  )
}

function inlineCustomNodeComponents(code: string): string {
  if (!code.includes('ApprovalNode.vue') && !code.includes('NotificationNode.vue')) {
    return code
  }

  const componentDefinitions = [
    'const ApprovalNode = defineComponent({',
    '  props: { data: { type: Object, default: () => ({}) } },',
    '  setup(props) {',
    "    return () => h('div', { class: 'template-card template-card--approval' }, [",
    "      h('div', { class: 'template-card__title' }, props.data?.label ?? 'Approval'),",
    "      h('div', { class: 'template-card__meta' }, props.data?.approver ?? 'Process Review')",
    '    ])',
    '  }',
    '})',
    '',
    'const NotificationNode = defineComponent({',
    '  props: { data: { type: Object, default: () => ({}) } },',
    '  setup(props) {',
    "    return () => h('div', { class: 'template-card template-card--notification' }, [",
    "      h('div', { class: 'template-card__title' }, props.data?.label ?? 'Notification'),",
    "      h('div', { class: 'template-card__meta' }, props.data?.channel ?? 'Channel')",
    '    ])',
    '  }',
    '})',
    ''
  ].join('\n')

  return ensureVueImports(
    code
      .replace(
        /^\s*import\s+ApprovalNode\s+from\s+['"]\.\/nodes\/ApprovalNode\.vue['"]\s*;?\s*\n/gm,
        ''
      )
      .replace(
        /^\s*import\s+NotificationNode\s+from\s+['"]\.\/nodes\/NotificationNode\.vue['"]\s*;?\s*\n/gm,
        `${componentDefinitions}\n`
      ),
    ['defineComponent', 'h']
  )
}

function prepareSandboxCode(code: string, context?: SandboxContext): string {
  let preparedCode = rewriteWorkspaceImports(code)
  preparedCode = inlineCustomEdgeComponent(preparedCode)
  preparedCode = inlineCustomNodeComponents(preparedCode)
  preparedCode = rewriteFlowSandboxImports(preparedCode)
  preparedCode = appendDocSharedStyles(preparedCode, context)
  return preparedCode
}

function preparePlaygroundCode(code: string, context?: SandboxContext): string {
  return stripPlaygroundOnlyImports(prepareSandboxCode(code, context))
}

// ============================================================
// CDN URL 解析策略
// ============================================================

/**
 * 返回给指定 npm 包的 ESM CDN URL。
 * 策略：
 *  - vue: 由 @vue/repl 自行注入，跳过
 *  - @yh-ui/yh-ui 等已验证可用的包：使用 esm.sh
 *  - @yh-ui/flow 等构建含 .vue 文件的破损包：跳过（由 customCode 全局注册处理）
 *  - 第三方包：使用 esm.sh no-bundle 模式
 */
function resolveImportUrl(source: string, dependencies: Record<string, string>): string | null {
  if (source === '@yh-ui/yh-ui/css') {
    return null
  }

  const pkg = getPackageName(source)
  const version = normalizeDependencyVersion(
    dependencies[pkg] || KNOWN_DEPENDENCIES[pkg] || 'latest'
  )

  // Vue 自身由 @vue/repl 内置处理
  if (pkg === 'vue' || pkg.startsWith('node:') || NODE_BUILTINS.has(pkg)) {
    return null
  }

  if (pkg === '@yh-ui/icons') {
    return resolveJsdelivrPackageEntry(pkg, version)
  }

  // 这些 @yh-ui/* 子包在 esm.sh 上无法正常 bundle（含 .vue 导出文件）
  // 通过 customCode 全局注册解决，不需要单独 import map 条目
  if (ESM_SH_BROKEN.has(pkg)) {
    return null
  }

  const suffix = source === pkg ? '' : source.slice(pkg.length)

  if (ESM_SH_OK.has(pkg)) {
    // 已验证在 esm.sh 上正常工作的包
    return `${ESM_CDN}/${pkg}@${version}${suffix}?external=vue&target=esnext`
  }

  // 第三方包：使用 no-bundle 模式
  return `${ESM_CDN}/${pkg}@${version}${suffix}?external=vue`
}

// ============================================================
// 公开 API
// ============================================================

export function getSandboxSupport(code: string, context?: SandboxContext): SandboxSupport {
  const preparedCode = prepareSandboxCode(code, context)
  const imports = extractBareImports(preparedCode)

  for (const source of imports) {
    if (isUnsupportedImport(source)) {
      return {
        supported: false,
        reason: `This demo imports "${source}", which depends on local docs files that are not available in StackBlitz or CodeSandbox.`
      }
    }

    const pkg = getPackageName(source)
    if (pkg.startsWith('node:') || NODE_BUILTINS.has(pkg)) {
      return {
        supported: false,
        reason: `This demo imports "${source}", which requires Node-only modules.`
      }
    }
  }

  for (const { pattern, reason } of UNSUPPORTED_CODE_PATTERNS) {
    if (pattern.test(preparedCode)) {
      return { supported: false, reason }
    }
  }

  return { supported: true }
}

function usesFlowSandboxRuntime(code: string, context?: SandboxContext): boolean {
  const preparedCode = prepareSandboxCode(code, context)
  return (
    preparedCode.includes('@yh-ui/flow') ||
    /<\s*yh-flow\b/i.test(preparedCode) ||
    Boolean(context?.docPath?.includes('/flow/'))
  )
}

function usesIconSandboxRuntime(code: string, context?: SandboxContext): boolean {
  const preparedCode = prepareSandboxCode(code, context)
  return (
    preparedCode.includes('@yh-ui/icons') ||
    preparedCode.includes('@iconify/vue') ||
    /<\s*(?:icon|yh-iconify-icon)\b/i.test(preparedCode) ||
    Boolean(context?.docPath?.includes('/icon/'))
  )
}

function buildDependencies(code: string, context?: SandboxContext): Record<string, string> {
  const preparedCode = prepareSandboxCode(code, context)
  const dependencies = { ...BASE_DEPENDENCIES }

  for (const source of extractBareImports(preparedCode)) {
    const pkg = getPackageName(source)
    if (
      pkg === 'vue' ||
      pkg.startsWith('node:') ||
      NODE_BUILTINS.has(pkg) ||
      SANDBOX_BUNDLED_PACKAGES.has(pkg)
    ) {
      continue
    }
    dependencies[pkg] = KNOWN_DEPENDENCIES[pkg] || 'latest'
  }

  // 特殊逻辑：如果使用了 @yh-ui/yh-ui，确保所有必要的子包也被添加 (因为它们在发布时是依赖关系)
  // 在非 workspace 环境下，我们需要它们显式存在于 package.json 中以确保解析正确
  if (usesFlowSandboxRuntime(preparedCode, context)) {
    dependencies['dagre'] = KNOWN_DEPENDENCIES['dagre']
    dependencies['d3-force'] = KNOWN_DEPENDENCIES['d3-force']
    dependencies['elkjs'] = KNOWN_DEPENDENCIES['elkjs']
    dependencies['html-to-image'] = KNOWN_DEPENDENCIES['html-to-image']
  }

  return dependencies
}

function buildSandboxDependencies(code: string, context?: SandboxContext): Record<string, string> {
  const preparedCode = prepareSandboxCode(code, context)
  const dependencies = {
    ...buildDependencies(preparedCode, context),
    '@yh-ui/yh-ui': YH_UI_VERSION
  }

  if (usesIconSandboxRuntime(preparedCode, context)) {
    dependencies['@iconify/vue'] = KNOWN_DEPENDENCIES['@iconify/vue']
  }

  if (usesFlowSandboxRuntime(preparedCode, context)) {
    dependencies['@yh-ui/flow'] = YH_UI_VERSION
  }

  for (const source of extractBareImports(preparedCode)) {
    const pkg = getPackageName(source)
    if (pkg === 'vue' || pkg.startsWith('node:') || NODE_BUILTINS.has(pkg)) {
      continue
    }

    if (pkg.startsWith('@yh-ui/')) {
      dependencies[pkg] = KNOWN_DEPENDENCIES[pkg] || YH_UI_VERSION
    }
  }

  return dependencies
}

// ============================================================
// Playground（@vue/repl 驱动）
// ============================================================

export function createPlaygroundProject(
  title: string,
  code: string,
  context?: SandboxContext,
  base = '/'
): PlaygroundProject {
  const preparedCode = normalizeSfc(preparePlaygroundCode(code, context))
  const dependencies = buildDependencies(preparedCode, context)
  const imports = extractBareImports(preparedCode)
  const importMap: ImportMap = { imports: {} }
  const runtimeEnv = resolvePlaygroundRuntimeEnv(base)

  for (const source of imports) {
    const resolvedUrl = resolveImportUrl(source, dependencies)
    if (resolvedUrl) {
      importMap.imports[source] = resolvedUrl
    }
  }

  const cssUrl = resolveSiteAssetUrl(base, 'yh-ui/style.css')
  const staticPackages = _getPlaygroundStaticPackageEntries(base)

  for (const [pkg, entry] of Object.entries(staticPackages)) {
    importMap.imports[pkg] = entry.entry
    importMap.imports[`${pkg}/`] = resolveSiteAssetUrl(base, entry.dir)
  }

  const yhUiBundleUrl = resolveSiteAssetUrl(base, 'playground/yh-ui-bundle.js')
  importMap.imports['@yh-ui/yh-ui'] = yhUiBundleUrl
  importMap.imports['@yh-ui/yh-ui/full'] = yhUiBundleUrl
  importMap.imports['@yh-ui/flow'] = resolveSiteAssetUrl(base, 'playground/yh-flow-runtime.js')
  importMap.imports['@iconify/vue'] =
    `${ESM_CDN}/@iconify/vue@4.1.2?bundle&external=vue&target=esnext`

  return {
    title: title || 'YH-UI Playground',
    code: preparedCode,
    importMap,
    headHTML: [
      `<link rel="stylesheet" href="${cssUrl}" crossorigin="anonymous" data-runtime-env="${runtimeEnv.isGitHubPages ? 'github-pages' : runtimeEnv.isLocalDev ? 'local-dev' : 'site'}">`,
      `<link rel="stylesheet" href="${resolveSiteAssetUrl(base, 'playground/yh-ui-bundle.css')}" crossorigin="anonymous">`,
      `<link rel="stylesheet" href="${resolveSiteAssetUrl(base, 'playground/yh-flow-runtime.css')}" crossorigin="anonymous">`
    ].join(''),
    importCode: `import YhUI from '${resolveSiteAssetUrl(base, 'playground/yh-ui-runtime.js')}'`,
    useCode: `app.use(YhUI)`
  }
}
export function encodePlaygroundPayload(
  title: string,
  code: string,
  context?: SandboxContext
): string {
  return compressToEncodedURIComponent(
    JSON.stringify({ title, code, context } satisfies PlaygroundPayload)
  )
}

export function decodePlaygroundPayload(value: string): PlaygroundPayload | null {
  const decoded = decompressFromEncodedURIComponent(value)
  if (!decoded) return null
  try {
    return JSON.parse(decoded) as PlaygroundPayload
  } catch {
    return null
  }
}

export function openDemoInPlayground(
  title: string,
  code: string,
  base: string,
  context?: SandboxContext
): SandboxSupport {
  const support = getSandboxSupport(code, context)
  if (!support.supported) return support

  const payload = encodePlaygroundPayload(title, code, context)
  const baseUrl = base.endsWith('/') ? base : `${base}/`
  const url = new URL(`${baseUrl}playground/?demo=${payload}`, window.location.origin)
  window.open(url.toString(), '_blank', 'noopener')
  return support
}

// ============================================================
// StackBlitz / CodeSandbox 公共文件集合
// ============================================================

export async function createSandboxProjectFiles(
  title: string,
  code: string,
  context?: SandboxContext,
  options: SandboxProjectFilesOptions = {}
): Promise<Record<string, string>> {
  const normalizedCode = normalizeSfc(prepareSandboxCode(code, context))
  const dependencies = buildSandboxDependencies(code, context)
  const usesFlowRuntime = usesFlowSandboxRuntime(code, context)
  const usesIconRuntime = usesIconSandboxRuntime(code, context)
  const base = (options.base ?? import.meta.env.BASE_URL) || '/'
  const loadSiteAssetText =
    options.loadSiteAssetText ??
    ((assetPath: string) => fetchTextAsset(resolveSiteAssetUrl(base, assetPath)))
  const interopDeps = [
    'dayjs',
    'dayjs/plugin/isBetween.js',
    'dayjs/plugin/weekOfYear.js',
    'dayjs/plugin/isoWeek.js',
    'dayjs/plugin/quarterOfYear.js',
    'dayjs/plugin/advancedFormat.js',
    'dayjs/plugin/customParseFormat.js'
  ]
  const sandboxConfigJson =
    JSON.stringify(
      {
        template: 'node',
        infiniteLoopProtection: true
      },
      null,
      2
    ) + '\n'

  const indexHtml = [
    '<!doctype html>',
    '<html lang="en">',
    '  <head>',
    '    <meta charset="UTF-8" />',
    '    <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
    `    <title>${escapeHtml(title || 'YH-UI Demo')}</title>`,
    '  </head>',
    '  <body>',
    '    <div id="app"></div>',
    '    <script type="module" src="/src/main.ts"></script>',
    '  </body>',
    '</html>',
    ''
  ].join('\n')

  const mainTs = [
    "import { createApp } from 'vue'",
    "import { install as installYhUI } from '@yh-ui/yh-ui'",
    "import '@yh-ui/yh-ui/css'",
    "import './vendor/yh-ui-bundle.css'",
    ...(usesIconRuntime ? ["import { Icon as YhIconify } from '@iconify/vue'"] : []),
    ...(usesFlowRuntime
      ? [
          "import { Flow as YhFlow, NodeResizer as YhNodeResizer, NodeToolbar as YhNodeToolbar } from '@yh-ui/flow'"
        ]
      : []),
    "import App from './App.vue'",
    "import './style.css'",
    '',
    'const app = createApp(App)',
    'installYhUI(app)',
    ...(usesIconRuntime
      ? [
          '// eslint-disable-next-line vue/multi-word-component-names',
          "app.component('Icon', YhIconify)",
          "app.component('YhIconifyIcon', YhIconify)"
        ]
      : []),
    ...(usesFlowRuntime
      ? [
          "app.component('YhFlow', YhFlow)",
          "app.component('YhNodeResizer', YhNodeResizer)",
          "app.component('YhNodeToolbar', YhNodeToolbar)"
        ]
      : []),
    "app.mount('#app')",
    ''
  ].join('\n')

  const appVue = [
    '<template>',
    '  <Demo />',
    '</template>',
    '',
    '<script setup lang="ts">',
    "import Demo from './Demo.vue'",
    '</script>',
    ''
  ].join('\n')

  const styleCss = [
    'html, body, #app {',
    '  margin: 0;',
    '  min-height: 100%;',
    '}',
    '',
    'body {',
    '  padding: 24px;',
    '  box-sizing: border-box;',
    "  font-family: Inter, 'PingFang SC', 'Microsoft YaHei', system-ui, sans-serif;",
    '  background: #ffffff;',
    '  color: #1f2329;',
    '}',
    ''
  ].join('\n')

  const envDts = [
    'declare module "*.vue" {',
    '  import type { DefineComponent } from "vue"',
    '  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>',
    '  export default component',
    '}',
    ''
  ].join('\n')

  const viteConfigTs = [
    "import vue from '@vitejs/plugin-vue'",
    "import { defineConfig } from 'vite'",
    '',
    'export default defineConfig({',
    '  plugins: [vue()],',
    '  optimizeDeps: {',
    `    include: ${JSON.stringify(interopDeps)},`,
    `    needsInterop: ${JSON.stringify(interopDeps)}`,
    '  },',
    '  server: {',
    "    host: '0.0.0.0',",
    '    port: 5173,',
    '    allowedHosts: true',
    '  },',
    "  preview: { host: '0.0.0.0', port: 4173 }",
    '})',
    ''
  ].join('\n')

  const tsconfigJson =
    JSON.stringify(
      {
        compilerOptions: {
          target: 'ES2020',
          useDefineForClassFields: true,
          module: 'ESNext',
          moduleResolution: 'Bundler',
          strict: true,
          skipLibCheck: true,
          jsx: 'preserve',
          resolveJsonModule: true,
          isolatedModules: true,
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
          lib: ['ES2020', 'DOM', 'DOM.Iterable'],
          types: ['vite/client']
        },
        include: ['src/**/*.ts', 'src/**/*.d.ts', 'src/**/*.tsx', 'src/**/*.vue', 'src/env.d.ts']
      },
      null,
      2
    ) + '\n'

  const npmrc = ['auto-install-peers=true', 'strict-peer-dependencies=false', ''].join('\n')

  const packageJson =
    JSON.stringify(
      {
        name: slugifyTitle(title) || 'yh-ui-demo',
        private: true,
        type: 'module',
        scripts: {
          dev: 'vite --host 0.0.0.0 --port 5173',
          start: 'vite --host 0.0.0.0 --port 5173',
          build: 'vue-tsc --noEmit && vite build',
          preview: 'vite preview --host 0.0.0.0 --port 4173'
        },
        stackblitz: {
          startCommand: 'npm run dev'
        },
        dependencies,
        devDependencies: DEV_DEPENDENCIES
      },
      null,
      2
    ) + '\n'

  const files: Record<string, string> = {
    'index.html': indexHtml,
    '.npmrc': npmrc,
    'sandbox.config.json': sandboxConfigJson,
    'package.json': packageJson,
    'tsconfig.json': tsconfigJson,
    'vite.config.ts': viteConfigTs,
    'src/App.vue': appVue,
    'src/Demo.vue': normalizedCode + '\n',
    'src/main.ts': mainTs,
    'src/style.css': styleCss,
    'src/env.d.ts': envDts,
    // CodeSandbox Cloud 配置
    '.codesandbox/tasks.json': JSON.stringify(
      {
        setupTasks: [{ name: 'Install Dependencies', command: 'npm install' }],
        tasks: {
          dev: {
            name: 'Start Dev Server',
            command: 'npm run dev',
            runAtStart: true,
            preview: { port: 5173 }
          }
        }
      },
      null,
      2
    ),
    // StackBlitz 配置
    '.stackblitzrc': JSON.stringify(
      { installDependencies: true, startCommand: 'npm run dev' },
      null,
      2
    )
  }

  files['src/vendor/yh-ui-bundle.css'] = await loadSiteAssetText('playground/yh-ui-bundle.css')

  return files
}

export async function createCodeSandboxProjectFiles(
  title: string,
  code: string,
  context?: SandboxContext,
  options: CodeSandboxProjectFilesOptions = {}
): Promise<Record<string, string>> {
  const preparedCode = prepareSandboxCode(code, context)
  const normalizedCode = normalizeSfc(preparedCode)
  const componentNames = extractUsedYhComponentNames(preparedCode)
  const base = (options.base ?? import.meta.env.BASE_URL) || '/'
  const manifest = options.manifest ?? (await loadCodeSandboxRuntimeManifest(base))
  const loadRuntimeAssetText =
    options.loadRuntimeAssetText ??
    ((relativePath: string) =>
      fetchTextAsset(resolveSiteAssetUrl(base, `${CODE_SANDBOX_RUNTIME_BASE}${relativePath}`)))
  const loadSiteAssetText =
    options.loadSiteAssetText ??
    ((assetPath: string) => fetchTextAsset(resolveSiteAssetUrl(base, assetPath)))
  const runtimeComponentNames = componentNames.filter((name) => manifest.components[name])
  const supportStyleFiles = [
    'theme/styles/mixins/mixins.css',
    'theme/styles/variables.css',
    'theme/styles/reset.css',
    'theme/styles/index.css',
    'theme/styles/components.css'
  ]
  const availableRuntimeFiles = new Set<string>([
    ...manifest.supportFiles,
    ...Object.values(manifest.components).flatMap((component) => component.files)
  ])

  const runtimeFiles: Record<string, string> = {}
  const collectedStyleContents = new Map<string, string>()
  const packageDependencies: Record<string, string> = {
    vue: `^${VUE_VERSION}`,
    ...buildDependencies(preparedCode, context)
  }

  if (usesIconSandboxRuntime(preparedCode, context)) {
    packageDependencies['@iconify/vue'] = KNOWN_DEPENDENCIES['@iconify/vue']
  }

  const loadedRuntimeFiles = new Set<string>()

  const collectRuntimeFile = async (relativePath: string): Promise<void> => {
    if (loadedRuntimeFiles.has(relativePath)) {
      return
    }

    loadedRuntimeFiles.add(relativePath)
    const originalAssetText = await loadRuntimeAssetText(relativePath)
    let assetText = relativePath.endsWith('.js')
      ? rewriteRuntimeRelativeImports(originalAssetText, relativePath, availableRuntimeFiles)
      : originalAssetText

    if (relativePath === 'hooks/index.js') {
      assetText = assetText.replace(
        /^\s*export\s+\*\s+from\s+['"]\.\/use-ai\/index\.js['"]\s*;?\s*$/gm,
        ''
      )
    }

    runtimeFiles[`src/vendor/${relativePath}`] = assetText
    Object.assign(packageDependencies, collectThirdPartyDependenciesFromCode(assetText))

    if (relativePath.endsWith('.css')) {
      collectedStyleContents.set(relativePath, assetText)
      return
    }

    if (!relativePath.endsWith('.js')) {
      return
    }

    for (const source of extractBareImports(assetText)) {
      if (!source.startsWith('.')) {
        continue
      }

      await collectRuntimeFile(
        resolveRuntimeRelativePath(relativePath, source, availableRuntimeFiles)
      )
    }
  }

  for (const componentName of runtimeComponentNames) {
    const componentEntry = manifest.components[componentName]
    await collectRuntimeFile(componentEntry.entry)
    if (componentEntry.style) {
      await collectRuntimeFile(componentEntry.style)
    }
  }

  for (const styleFile of supportStyleFiles) {
    await collectRuntimeFile(styleFile)
  }

  const styleCss = [...collectedStyleContents.values()].filter(Boolean).join('\n')

  const componentImports = runtimeComponentNames
    .map(
      (name, index) =>
        `import Component${index + 1} from './vendor/${manifest.components[name].entry}'`
    )
    .join('\n')
  const componentRegistrations = runtimeComponentNames
    .map(
      (name, index) =>
        `if (Component${index + 1} && typeof Component${index + 1}.install === 'function') { app.use(Component${index + 1}) } else { app.component('Yh${kebabToPascalCase(name)}', Component${index + 1}) }`
    )
    .join('\n')

  const indexHtml =
    '<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <meta name="description" content="' +
    escapeHtml(title || 'YH-UI Demo') +
    '" />\n    <title>' +
    escapeHtml(title || 'YH-UI Demo') +
    '</title>\n  </head>\n  <body>\n    <div id="app"></div>\n  </body>\n</html>\n'

  const appVue = [
    '<template>',
    '  <Demo />',
    '</template>',
    '',
    '<script>',
    "import Demo from './Demo.vue'",
    '',
    'export default {',
    "  name: 'App',",
    '  components: {',
    '    Demo',
    '  }',
    '}',
    '</script>',
    ''
  ].join('\n')

  const mainJs = [
    "import { createApp } from 'vue'",
    "import App from './App.vue'",
    componentImports,
    "import './style.css'",
    ...(usesIconSandboxRuntime(preparedCode, context)
      ? ["import { Icon as YhIconify } from '@iconify/vue'"]
      : []),
    ...(usesFlowSandboxRuntime(preparedCode, context)
      ? [
          "import { Flow as YhFlow, NodeResizer as YhNodeResizer, NodeToolbar as YhNodeToolbar } from './vendor/flow/runtime.js'",
          "import './vendor/flow/runtime.css'"
        ]
      : []),
    '',
    'const app = createApp(App)',
    ...(componentRegistrations ? [componentRegistrations] : []),
    ...(usesIconSandboxRuntime(preparedCode, context)
      ? ["app.component('Icon', YhIconify)", "app.component('YhIconifyIcon', YhIconify)"]
      : []),
    ...(usesFlowSandboxRuntime(preparedCode, context)
      ? [
          "app.component('YhFlow', YhFlow)",
          "app.component('YhNodeResizer', YhNodeResizer)",
          "app.component('YhNodeToolbar', YhNodeToolbar)"
        ]
      : []),
    "app.mount('#app')",
    ''
  ].join('\n')

  const packageJson =
    JSON.stringify(
      {
        name: slugifyTitle(title) || 'yh-ui-demo',
        private: true,
        main: 'src/main.js',
        dependencies: packageDependencies,
        devDependencies: {
          '@vue/cli-plugin-babel': '~4.5.0',
          typescript: '~4.6.3'
        }
      },
      null,
      2
    ) + '\n'

  const codeSandboxTemplateJson =
    JSON.stringify(
      {
        title: title || 'YH-UI Demo',
        description: 'YH-UI component demo generated from the documentation.',
        iconUrl:
          'https://raw.githubusercontent.com/codesandbox/sandbox-templates/main/vue-vite/.codesandbox/icon.png',
        tags: ['frontend', 'vue', 'vue3', 'codesandbox', 'yh-ui'],
        published: true
      },
      null,
      2
    ) + '\n'

  const files: Record<string, string> = {
    '.codesandbox/template.json': codeSandboxTemplateJson,
    '.npmrc': ['registry=https://registry.npmjs.org/', ''].join('\n'),
    'index.html': indexHtml,
    'package.json': packageJson,
    'src/App.vue': appVue,
    'src/Demo.vue': normalizedCode + '\n',
    'src/main.js': mainJs,
    'src/style.css': `${styleCss}\n`,
    ...runtimeFiles
  }

  if (usesFlowSandboxRuntime(preparedCode, context)) {
    files['src/vendor/flow/runtime.js'] = await loadSiteAssetText('playground/yh-flow-runtime.js')
    files['src/vendor/flow/runtime.css'] = await loadSiteAssetText('playground/yh-flow-runtime.css')
  }

  return files
}

// ============================================================
// StackBlitz
// ============================================================

async function buildStackBlitzProject(
  title: string,
  code: string,
  context?: SandboxContext
): Promise<Project> {
  return {
    title: title || 'YH-UI Demo',
    description: 'YH-UI component demo generated from the documentation.',
    template: 'node',
    files: await createSandboxProjectFiles(title, code, context)
  }
}

export async function openDemoInStackBlitz(
  title: string,
  code: string,
  context?: SandboxContext
): Promise<SandboxSupport> {
  const support = getSandboxSupport(code, context)
  if (!support.supported) return support

  const project = await buildStackBlitzProject(title, code, context)
  sdk.openProject(project, {
    newWindow: true,
    openFile: 'src/Demo.vue',
    view: 'preview'
  })

  return support
}

// ============================================================
// CodeSandbox
// ============================================================

function buildCodeSandboxPayload(title: string, code: string, context?: SandboxContext) {
  return createCodeSandboxProjectFiles(title, code, context).then((files) => ({
    files: Object.fromEntries(
      Object.entries(files).map(([filePath, content]) => [filePath, { content }])
    )
  }))
}

export async function openDemoInCodeSandbox(
  title: string,
  code: string,
  context?: SandboxContext
): Promise<SandboxSupport> {
  const support = getSandboxSupport(code, context)
  if (!support.supported) return support

  const payload = await buildCodeSandboxPayload(title, code, context)
  const parameters = compressCodeSandboxParameters(JSON.stringify(payload))

  const form = document.createElement('form')
  form.method = 'POST'
  form.action = 'https://codesandbox.io/api/v1/sandboxes/define'
  form.target = '_blank'
  form.style.display = 'none'

  const paramsInput = document.createElement('input')
  paramsInput.type = 'hidden'
  paramsInput.name = 'parameters'
  paramsInput.value = parameters
  form.appendChild(paramsInput)

  const queryInput = document.createElement('input')
  queryInput.type = 'hidden'
  queryInput.name = 'query'
  queryInput.value = 'file=/src/Demo.vue'
  form.appendChild(queryInput)

  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)

  return support
}
