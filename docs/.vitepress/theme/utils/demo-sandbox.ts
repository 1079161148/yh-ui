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

function normalizeSfc(code: string): string {
  const trimmed = code.trim()

  if (!trimmed) {
    return `<template>\n  <div />\n</template>\n`
  }

  if (/<(?:template|script|style)\b/i.test(trimmed)) {
    return trimmed
  }

  return `<template>\n${trimmed}\n</template>\n`
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

export function getSandboxSupport(code: string): SandboxSupport {
  const imports = extractBareImports(code)

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
    if (pattern.test(code)) {
      return {
        supported: false,
        reason
      }
    }
  }

  return { supported: true }
}

function buildDependencies(code: string): Record<string, string> {
  const dependencies = { ...BASE_DEPENDENCIES }

  for (const source of extractBareImports(code)) {
    const pkg = getPackageName(source)

    if (pkg === 'vue' || pkg.startsWith('node:') || NODE_BUILTINS.has(pkg)) {
      continue
    }

    dependencies[pkg] = KNOWN_DEPENDENCIES[pkg] || 'latest'
  }

  return dependencies
}

function buildPackageJson(title: string, code: string): string {
  const pkg = {
    name: slugifyTitle(title) || 'yh-ui-demo',
    private: true,
    type: 'module',
    scripts: {
      dev: 'vite --host 0.0.0.0 --port 5173',
      build: 'vite build',
      preview: 'vite preview --host 0.0.0.0 --port 4173'
    },
    dependencies: buildDependencies(code),
    devDependencies: DEV_DEPENDENCIES
  }

  return `${JSON.stringify(pkg, null, 2)}\n`
}

function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function buildFiles(title: string, code: string): Record<string, string> {
  const normalizedCode = normalizeSfc(code)

  return {
    'index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title || 'YH-UI Demo')}</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
`,
    'package.json': buildPackageJson(title, code),
    'src/App.vue': `${normalizedCode}\n`,
    'src/main.ts': `import { createApp } from 'vue'
import YhUI from '@yh-ui/yh-ui'
import '@yh-ui/yh-ui/css'
import App from './App.vue'
import './style.css'

const app = createApp(App)

app.use(YhUI)
app.mount('#app')
`,
    'src/style.css': `html,
body,
#app {
  margin: 0;
  min-height: 100%;
}

body {
  padding: 24px;
  box-sizing: border-box;
  font-family:
    Inter,
    'PingFang SC',
    'Microsoft YaHei',
    system-ui,
    sans-serif;
  background: #ffffff;
  color: #1f2329;
}
`,
    'tsconfig.json': `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "strict": true,
    "jsx": "preserve",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "types": ["vite/client"]
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
}
`,
    'vite.config.ts': `import fs from 'node:fs'
import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

function yhUiScssFallback() {
  return {
    name: 'yh-ui-scss-fallback',
    enforce: 'pre',
    resolveId(source, importer) {
      if (!source.endsWith('.scss') || !importer) {
        return null
      }

      const resolved = path.resolve(path.dirname(importer), source)
      const cssFile = resolved.replace(/\\.scss$/, '.css')

      if (fs.existsSync(cssFile)) {
        return cssFile
      }

      return null
    }
  }
}

export default defineConfig({
  plugins: [yhUiScssFallback(), vue()],
  server: {
    host: '0.0.0.0',
    port: 5173
  },
  preview: {
    host: '0.0.0.0',
    port: 4173
  },
  optimizeDeps: {
    esbuildOptions: {
      sourcemap: false
    }
  }
})
`
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function buildStackBlitzProject(title: string, code: string): Project {
  return {
    title: title || 'YH-UI Demo',
    description: 'Interactive YH-UI demo generated from the documentation example.',
    template: 'node',
    files: buildFiles(title, code)
  }
}

function buildCodeSandboxPayload(title: string, code: string) {
  const files = buildFiles(title, code)

  return {
    files: Object.fromEntries(
      Object.entries(files).map(([path, content]) => [
        path,
        {
          content
        }
      ])
    ),
    title: title || 'YH-UI Demo'
  }
}

export function openDemoInStackBlitz(title: string, code: string): SandboxSupport {
  const support = getSandboxSupport(code)
  if (!support.supported) {
    return support
  }

  sdk.openProject(buildStackBlitzProject(title, code), {
    newWindow: true,
    startScript: 'dev',
    showSidebar: true,
    sidebarView: 'ports',
    terminalHeight: 45,
    view: 'preview'
  })

  return support
}

export function openDemoInCodeSandbox(title: string, code: string): SandboxSupport {
  const support = getSandboxSupport(code)
  if (!support.supported) {
    return support
  }

  const payload = buildCodeSandboxPayload(title, code)
  const parameters = compressToBase64(JSON.stringify(payload))
  const form = document.createElement('form')

  form.method = 'POST'
  form.action = 'https://codesandbox.io/api/v1/sandboxes/define'
  form.target = '_blank'
  form.style.display = 'none'

  const input = document.createElement('input')
  input.type = 'hidden'
  input.name = 'parameters'
  input.value = parameters
  form.appendChild(input)

  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)

  return support
}
