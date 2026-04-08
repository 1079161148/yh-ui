import sdk, { type Project } from '@stackblitz/sdk'
import { compressToBase64 } from 'lz-string'

// Online sandboxes should always resolve the latest published package,
// otherwise docs on main can point to a version that npm has not released yet.
const YH_UI_VERSION = 'latest'

const BASE_DEPENDENCIES: Record<string, string> = {
  vue: '^3.5.27',
  '@yh-ui/yh-ui': YH_UI_VERSION
}

const DEV_DEPENDENCIES: Record<string, string> = {
  vite: '^6.0.7',
  '@vitejs/plugin-vue': '^6.0.0',
  typescript: '^5.7.3',
  sass: '^1.83.1'
}

const KNOWN_DEPENDENCIES: Record<string, string> = {
  '@floating-ui/dom': '^1.7.4',
  '@langchain/core': '^0.3.0',
  '@webcontainer/api': '^1.6.1',
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

export interface SandboxSupport {
  supported: boolean
  reason?: string
}

export interface SandboxContext {
  docPath?: string
}

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

function ensureVueImports(code: string, importsToAdd: string[]): string {
  const vueImportRe = /import\s+\{([^}]*)\}\s+from\s+['"]vue['"]/
  const match = code.match(vueImportRe)

  if (!match) {
    return `import { ${importsToAdd.join(', ')} } from 'vue'\n${code}`
  }

  const currentImports = match[1]
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)

  const mergedImports = [...new Set([...currentImports, ...importsToAdd])].sort()

  return code.replace(vueImportRe, `import { ${mergedImports.join(', ')} } from 'vue'`)
}

function rewriteWorkspaceImports(code: string): string {
  return code
    .replace(
      /from\s+['"]\.\.\/\.\.\/packages\/components\/src\/loading['"]/g,
      "from '@yh-ui/yh-ui'"
    )
    .replace(
      /from\s+['"]\.\.\/\.\.\/packages\/components\/src\/message['"]/g,
      "from '@yh-ui/yh-ui'"
    )
    .replace(
      /import\s+type\s+\{([^}]*)\}\s+from\s+['"]\.\.\/\.\.\/packages\/components\/src\/table\/src\/table['"]\s*;?\s*/g,
      "import type {$1} from '@yh-ui/yh-ui'\n"
    )
    .replace(/^\s*import\s+type\s+\{[^}]+\}\s+from\s+['"]\.\.\/src\/ai-mention['"]\s*;?\s*\n/gm, '')
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
    '  props: {',
    '    data: {',
    '      type: Object,',
    '      default: () => ({})',
    '    }',
    '  },',
    '  setup(props) {',
    "    return () => h('div', { class: 'template-card template-card--approval' }, [",
    "      h('div', { class: 'template-card__title' }, props.data?.label ?? props.data?.title ?? 'Approval'),",
    '      h(',
    "        'div',",
    "        { class: 'template-card__meta' },",
    "        props.data?.description ?? props.data?.approver ?? 'Process Review'",
    '      )',
    '    ])',
    '  }',
    '})',
    '',
    'const NotificationNode = defineComponent({',
    '  props: {',
    '    data: {',
    '      type: Object,',
    '      default: () => ({})',
    '    }',
    '  },',
    '  setup(props) {',
    "    return () => h('div', { class: 'template-card template-card--notification' }, [",
    "      h('div', { class: 'template-card__title' }, props.data?.label ?? props.data?.title ?? 'Notification'),",
    '      h(',
    "        'div',",
    "        { class: 'template-card__meta' },",
    "        props.data?.description ?? props.data?.channel ?? 'Channel'",
    '      )',
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
      return {
        supported: false,
        reason
      }
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

  return dependencies
}

function buildPackageJson(title: string, code: string, context?: SandboxContext): string {
  const pkg = {
    name: slugifyTitle(title) || 'yh-ui-demo',
    private: true,
    type: 'module',
    scripts: {
      dev: 'vite --host 0.0.0.0 --port 5173',
      build: 'vite build',
      preview: 'vite preview --host 0.0.0.0 --port 4173'
    },
    dependencies: buildDependencies(code, context),
    devDependencies: DEV_DEPENDENCIES
  }

  return JSON.stringify(pkg, null, 2) + '\n'
}

function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * 构建沙箱文件集合
 * vite.config.ts 不再依赖 node:fs / node:path，使用最简配置，
 * 确保在 CodeSandbox / StackBlitz 的浏览器沙箱中都能正常运行。
 */
export function createSandboxProjectFiles(
  title: string,
  code: string,
  context?: SandboxContext
): Record<string, string> {
  const normalizedCode = normalizeSfc(prepareSandboxCode(code, context))

  const indexHtml = [
    '<!doctype html>',
    '<html lang="en">',
    '  <head>',
    '    <meta charset="UTF-8" />',
    '    <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
    '    <title>' + escapeHtml(title || 'YH-UI Demo') + '</title>',
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
    "import '@yh-ui/yh-ui/css'",
    "import App from './App.vue'",
    "import './style.css'",
    '',
    'const app = createApp(App)',
    '',
    'app.use(YhUI)',
    "app.mount('#app')",
    ''
  ].join('\n')

  const styleCss = [
    'html,',
    'body,',
    '#app {',
    '  margin: 0;',
    '  min-height: 100%;',
    '}',
    '',
    'body {',
    '  padding: 24px;',
    '  box-sizing: border-box;',
    '  font-family:',
    '    Inter,',
    "    'PingFang SC',",
    "    'Microsoft YaHei',",
    '    system-ui,',
    '    sans-serif;',
    '  background: #ffffff;',
    '  color: #1f2329;',
    '}',
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
          lib: ['ES2020', 'DOM', 'DOM.Iterable'],
          types: ['vite/client']
        },
        include: ['src/**/*.ts', 'src/**/*.d.ts', 'src/**/*.tsx', 'src/**/*.vue', 'src/env.d.ts']
      },
      null,
      2
    ) + '\n'

  // .vue 文件类型声明 shim，解决 TS "Cannot find module './App.vue'" 问题
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

  // 极简 vite.config.ts：不依赖任何 Node 内置模块
  // CodeSandbox / StackBlitz 浏览器沙箱不支持 node:fs / node:path / createLogger 等 API
  const viteConfigTs = [
    "import vue from '@vitejs/plugin-vue'",
    "import { defineConfig } from 'vite'",
    '',
    'export default defineConfig({',
    '  plugins: [vue()],',
    '  server: {',
    "    host: '0.0.0.0',",
    '    port: 5173',
    '  },',
    '  preview: {',
    "    host: '0.0.0.0',",
    '    port: 4173',
    '  },',
    '  optimizeDeps: {',
    '    // 强制预构建 dayjs 插件，解决 Vite Native ESM 下的 SyntaxError 白屏问题',
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

  return {
    '.codesandbox/tasks.json': JSON.stringify(
      {
        setupTasks: ['npm install'],
        tasks: {
          dev: {
            name: 'dev',
            command: 'npm run dev',
            runAtStart: true,
            preview: {
              port: 5173
            }
          }
        }
      },
      null,
      2
    ),
    'index.html': indexHtml,
    'package.json': buildPackageJson(title, code, context),
    'sandbox.config.json': JSON.stringify(
      {
        template: 'node',
        container: {
          node: '20'
        }
      },
      null,
      2
    ),
    'src/App.vue': normalizedCode + '\n',
    'src/main.ts': mainTs,
    'src/style.css': styleCss,
    'src/env.d.ts': envDts,
    'tsconfig.json': tsconfigJson,
    'vite.config.ts': viteConfigTs
  }
}

function buildStackBlitzProject(title: string, code: string, context?: SandboxContext): Project {
  return {
    title: title || 'YH-UI Demo',
    description: 'Interactive YH-UI demo generated from the documentation example.',
    template: 'node',
    files: createSandboxProjectFiles(title, code, context)
  }
}

function buildCodeSandboxPayload(title: string, code: string, context?: SandboxContext) {
  const files = createSandboxProjectFiles(title, code, context)

  return {
    files: Object.fromEntries(
      Object.entries(files).map(([filePath, content]) => [filePath, { content }])
    ),
    title: title || 'YH-UI Demo'
  }
}

export function openDemoInStackBlitz(
  title: string,
  code: string,
  context?: SandboxContext
): SandboxSupport {
  const support = getSandboxSupport(code, context)
  if (!support.supported) {
    return support
  }

  sdk.openProject(buildStackBlitzProject(title, code, context), {
    newWindow: true,
    startScript: 'dev',
    showSidebar: true,
    sidebarView: 'ports',
    terminalHeight: 45,
    view: 'preview'
  })

  return support
}

export function openDemoInCodeSandbox(
  title: string,
  code: string,
  context?: SandboxContext
): SandboxSupport {
  const support = getSandboxSupport(code, context)
  if (!support.supported) {
    return support
  }

  const payload = buildCodeSandboxPayload(title, code, context)
  const parameters = compressToBase64(JSON.stringify(payload))

  const form = document.createElement('form')
  form.method = 'POST'
  form.action = 'https://codesandbox.io/api/v1/sandboxes/define'
  form.target = '_blank'
  form.style.display = 'none'

  // parameters 字段：lz-string 压缩的 JSON payload
  const paramsInput = document.createElement('input')
  paramsInput.type = 'hidden'
  paramsInput.name = 'parameters'
  paramsInput.value = parameters
  form.appendChild(paramsInput)

  // query 字段：打开后默认定位到 App.vue
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
