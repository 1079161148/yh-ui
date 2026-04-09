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
  vue: `^${VUE_VERSION}`,
  '@yh-ui/yh-ui': YH_UI_VERSION
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
  echarts: '^6.0.0',
  'highlight.js': '^11.11.1',
  mermaid: '^11.12.3',
  'monaco-editor': '^0.55.1',
  pinia: '^3.0.4',
  viewerjs: '^1.11.7',
  'vue-router': '^4.6.4',
  xlsx: '^0.18.5',
  zod: '^3.25.76'
}

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

function prepareSandboxCode(code: string, _context?: SandboxContext): string {
  let preparedCode = rewriteWorkspaceImports(code)
  preparedCode = inlineCustomEdgeComponent(preparedCode)
  preparedCode = inlineCustomNodeComponents(preparedCode)
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

function buildDependencies(code: string, context?: SandboxContext): Record<string, string> {
  const preparedCode = prepareSandboxCode(code, context)
  const dependencies = { ...BASE_DEPENDENCIES }

  for (const source of extractBareImports(preparedCode)) {
    const pkg = getPackageName(source)
    if (pkg === 'vue' || pkg.startsWith('node:') || NODE_BUILTINS.has(pkg)) {
      continue
    }
    dependencies[pkg] = KNOWN_DEPENDENCIES[pkg] || 'latest'
  }

  // 特殊逻辑：如果使用了 @yh-ui/yh-ui，确保所有必要的子包也被添加 (因为它们在发布时是依赖关系)
  // 在非 workspace 环境下，我们需要它们显式存在于 package.json 中以确保解析正确
  if (dependencies['@yh-ui/yh-ui']) {
    const v = dependencies['@yh-ui/yh-ui']
    dependencies['@yh-ui/components'] = dependencies['@yh-ui/components'] || v
    dependencies['@yh-ui/hooks'] = dependencies['@yh-ui/hooks'] || v
    dependencies['@yh-ui/theme'] = dependencies['@yh-ui/theme'] || v
    dependencies['@yh-ui/utils'] = dependencies['@yh-ui/utils'] || v
    dependencies['@yh-ui/locale'] = dependencies['@yh-ui/locale'] || v
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
  importMap.imports['@yh-ui/icons'] = resolveJsdelivrPackageEntry('@yh-ui/icons', YH_UI_VERSION)
  importMap.imports['@iconify/vue'] =
    `${ESM_CDN}/@iconify/vue@4.1.2?bundle&external=vue&target=esnext`

  return {
    title: title || 'YH-UI Playground',
    code: preparedCode,
    importMap,
    headHTML: [
      `<link rel="stylesheet" href="${cssUrl}" crossorigin="anonymous" data-runtime-env="${runtimeEnv.isGitHubPages ? 'github-pages' : runtimeEnv.isLocalDev ? 'local-dev' : 'site'}">`,
      `<link rel="stylesheet" href="${resolveSiteAssetUrl(base, 'playground/yh-ui-monorepo.css')}" crossorigin="anonymous">`
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

export function createSandboxProjectFiles(
  title: string,
  code: string,
  context?: SandboxContext
): Record<string, string> {
  const normalizedCode = normalizeSfc(prepareSandboxCode(code, context))
  const dependencies = buildDependencies(code, context)

  const indexHtml = [
    '<!doctype html>',
    '<html lang="en">',
    '  <head>',
    '    <meta charset="UTF-8" />',
    '    <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
    `    <title>${escapeHtml(title || 'YH-UI Demo')}</title>`,
    `    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@yh-ui/yh-ui@${YH_UI_VERSION}/dist/style.css" crossorigin="anonymous" />`,
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
    "import YhUI from '@yh-ui/yh-ui'",
    "import App from './App.vue'",
    "import './style.css'",
    '',
    'const app = createApp(App)',
    'app.use(YhUI)',
    "app.mount('#app')",
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
    '/// <reference types="vite/client" />',
    '',
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
    "  server: { host: '0.0.0.0', port: 5173 },",
    "  preview: { host: '0.0.0.0', port: 4173 },",
    '  optimizeDeps: {',
    "    exclude: ['@yh-ui/yh-ui', '@yh-ui/components', '@yh-ui/hooks', '@yh-ui/utils', '@yh-ui/theme', '@yh-ui/locale'],",
    '    include: [',
    "      'dayjs',",
    "      'dayjs/plugin/isBetween.js',",
    "      'dayjs/plugin/weekOfYear.js',",
    "      'dayjs/plugin/isoWeek.js',",
    "      'dayjs/plugin/quarterOfYear.js',",
    "      'dayjs/plugin/advancedFormat.js',",
    "      'dayjs/plugin/customParseFormat.js'",
    '    ]',
    '  }',
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
        dependencies,
        devDependencies: DEV_DEPENDENCIES
      },
      null,
      2
    ) + '\n'

  return {
    'index.html': indexHtml,
    '.npmrc': npmrc,
    'package.json': packageJson,
    'tsconfig.json': tsconfigJson,
    'vite.config.ts': viteConfigTs,
    'src/App.vue': normalizedCode + '\n',
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
}

// ============================================================
// StackBlitz
// ============================================================

function buildStackBlitzProject(title: string, code: string, context?: SandboxContext): Project {
  return {
    title: title || 'YH-UI Demo',
    description: 'YH-UI component demo generated from the documentation.',
    template: 'node',
    files: createSandboxProjectFiles(title, code, context)
  }
}

export function openDemoInStackBlitz(
  title: string,
  code: string,
  context?: SandboxContext
): SandboxSupport {
  const support = getSandboxSupport(code, context)
  if (!support.supported) return support

  const project = buildStackBlitzProject(title, code, context)
  sdk.openProject(project, {
    newWindow: true,
    openFile: 'src/App.vue',
    startScript: 'dev',
    view: 'preview'
  })

  return support
}

// ============================================================
// CodeSandbox
// ============================================================

function buildCodeSandboxPayload(title: string, code: string, context?: SandboxContext) {
  const files = createSandboxProjectFiles(title, code, context)
  return {
    files: Object.fromEntries(
      Object.entries(files).map(([filePath, content]) => [filePath, { content }])
    )
  }
}

export function openDemoInCodeSandbox(
  title: string,
  code: string,
  context?: SandboxContext
): SandboxSupport {
  const support = getSandboxSupport(code, context)
  if (!support.supported) return support

  const payload = buildCodeSandboxPayload(title, code, context)
  const parameters = compressToBase64(JSON.stringify(payload))

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
  queryInput.value = 'file=/src/App.vue'
  form.appendChild(queryInput)

  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)

  return support
}
