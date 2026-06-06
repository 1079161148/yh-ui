import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'

const appRoot = fileURLToPath(new URL('.', import.meta.url))
const repoRoot = resolve(appRoot, '../..')

const workspaceAliases = [
  {
    find: 'vue-demi',
    replacement: resolve(appRoot, 'src/utils/vue-demi-shim.ts')
  },
  {
    find: '@yh-ui/yh-ui/css',
    replacement: resolve(repoRoot, 'packages/theme/src/styles/index.scss')
  },
  {
    find: '@yh-ui/components/style.css',
    replacement: resolve(repoRoot, 'packages/theme/src/styles/index.scss')
  },
  {
    find: '@yh-ui/components/style',
    replacement: resolve(repoRoot, 'packages/theme/src/styles/index.scss')
  },
  {
    find: '@yh-ui/theme/styles',
    replacement: resolve(repoRoot, 'packages/theme/src/styles')
  },
  {
    find: '@yh-ui/locale/lang',
    replacement: resolve(repoRoot, 'packages/locale/src/lang')
  },
  {
    find: '@yh-ui/icons/vue',
    replacement: resolve(repoRoot, 'packages/icons/src/vue/icon.ts')
  },
  {
    find: '@yh-ui/icons/components',
    replacement: resolve(repoRoot, 'packages/icons/src/components.ts')
  },
  {
    find: '@yh-ui/yh-ui',
    replacement: resolve(repoRoot, 'packages/yh-ui/src/index.ts')
  },
  {
    find: '@yh-ui/components',
    replacement: resolve(repoRoot, 'packages/components/src/index.ts')
  },
  {
    find: '@yh-ui/hooks',
    replacement: resolve(repoRoot, 'packages/hooks/src/index.ts')
  },
  {
    find: '@yh-ui/utils',
    replacement: resolve(repoRoot, 'packages/utils/src/index.ts')
  },
  {
    find: '@yh-ui/locale',
    replacement: resolve(repoRoot, 'packages/locale/src/index.ts')
  },
  {
    find: '@yh-ui/theme',
    replacement: resolve(repoRoot, 'packages/theme/src/index.ts')
  },
  {
    find: '@yh-ui/icons',
    replacement: resolve(repoRoot, 'packages/icons/src/index.ts')
  }
]

const workspaceDependencyExcludes = [
  '@yh-ui/yh-ui',
  '@yh-ui/yh-ui/css',
  '@yh-ui/components',
  '@yh-ui/components/style',
  '@yh-ui/components/style.css',
  '@yh-ui/hooks',
  '@yh-ui/utils',
  '@yh-ui/locale',
  '@yh-ui/theme',
  '@yh-ui/icons'
]

function createYhUIResolver(importStyle = true) {
  return {
    type: 'component' as const,
    resolve: (name: string) => {
      if (!name.startsWith('Yh')) return
      return {
        name,
        from: '@yh-ui/yh-ui',
        sideEffects: importStyle ? '@yh-ui/yh-ui/css' : undefined
      }
    }
  }
}

export default defineConfig(({ mode }) => {
  const isWorkspaceMode = mode === 'workspace'

  const srcAlias = { find: '@', replacement: resolve(appRoot, 'src') }

  return {
    plugins: [
      vue(),
      Components({
        resolvers: [
          {
            type: 'component' as const,
            resolve: (name: string) => {
              if (!name.startsWith('Yh')) return
              const internalComponents = ['YhMenuRecursiveItem']
              if (internalComponents.includes(name)) return
              return createYhUIResolver().resolve(name)
            }
          }
        ],
        dts: 'src/types/components.d.ts'
      })
    ],
    cacheDir: isWorkspaceMode ? 'node_modules/.vite-workspace' : 'node_modules/.vite',
    resolve: {
      alias: isWorkspaceMode ? [srcAlias, ...workspaceAliases] : [srcAlias]
    },
    optimizeDeps: {
      include: [
        'dayjs',
        'dayjs/plugin/advancedFormat.js',
        'dayjs/plugin/customParseFormat.js',
        'dayjs/plugin/isBetween.js',
        'dayjs/plugin/isoWeek.js',
        'dayjs/plugin/quarterOfYear.js',
        'dayjs/plugin/weekOfYear.js',
        'mermaid',
        '@braintree/sanitize-url'
      ],
      exclude: isWorkspaceMode ? workspaceDependencyExcludes : []
    },
    build: {
      outDir: isWorkspaceMode ? 'dist-workspace' : 'dist',
      chunkSizeWarningLimit: 4096
    },
    server: {
      host: '127.0.0.1',
      port: isWorkspaceMode ? 3033 : 3021
    },
    preview: {
      host: '127.0.0.1',
      port: isWorkspaceMode ? 4177 : 4176
    }
  }
})
