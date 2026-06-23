import { copyFile, rm } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'vite'
import vue from '@vitejs/plugin-vue'
import { computeFingerprint, shouldSkipCachedBuild, updateBuildCache } from './build-cache.mjs'

const rootDir = resolve(fileURLToPath(new URL('.', import.meta.url)), '..')
const playgroundOutDir = resolve(rootDir, 'docs/public/playground')
const runtimeOutputs = [
  resolve(playgroundOutDir, 'yh-flow-runtime.js'),
  resolve(playgroundOutDir, 'yh-flow-runtime.css'),
  resolve(playgroundOutDir, 'yh-hooks-runtime.js'),
  resolve(playgroundOutDir, 'vue-runtime.js'),
  resolve(playgroundOutDir, 'server-renderer.js'),
  resolve(playgroundOutDir, 'yh-ui-runtime.js'),
  resolve(playgroundOutDir, 'yh-ui-bundle.js'),
  resolve(playgroundOutDir, 'yh-ui-bundle.css'),
  resolve(playgroundOutDir, 'yh-ui-sandbox-bundle.js')
]

const PLAYGROUND_YH_UI_EXTERNALS = [
  'vue',
  '@yh-ui/flow',
  '@yh-ui/icons',
  '@floating-ui/dom',
  'async-validator',
  'axios',
  'dayjs',
  'echarts',
  'highlight.js',
  'html-to-image',
  'mermaid',
  'pinia',
  'viewerjs',
  'vue-router',
  'xlsx',
  'zod'
]

async function cleanOutput() {
  await rm(resolve(playgroundOutDir, 'assets'), {
    recursive: true,
    force: true,
    maxRetries: 10,
    retryDelay: 100
  })
  await Promise.all([
    rm(resolve(playgroundOutDir, 'yh-flow-runtime.js'), { force: true }),
    rm(resolve(playgroundOutDir, 'yh-flow-runtime.css'), { force: true }),
    rm(resolve(playgroundOutDir, 'yh-hooks-runtime.js'), { force: true }),
    rm(resolve(playgroundOutDir, 'vue-runtime.js'), { force: true }),
    rm(resolve(playgroundOutDir, 'server-renderer.js'), { force: true }),
    rm(resolve(playgroundOutDir, 'yh-ui-runtime.js'), { force: true }),
    rm(resolve(playgroundOutDir, 'yh-ui-bundle.js'), { force: true }),
    rm(resolve(playgroundOutDir, 'yh-ui-bundle.css'), { force: true }),
    rm(resolve(playgroundOutDir, 'yh-ui-monorepo.css'), { force: true })
  ])
}

function createSharedConfig() {
  return {
    configFile: false,
    publicDir: false,
    plugins: [vue()],
    build: {
      emptyOutDir: false,
      outDir: playgroundOutDir,
      cssCodeSplit: false
    }
  }
}

async function buildFlowRuntime() {
  await build({
    ...createSharedConfig(),
    resolve: {
      alias: [
        { find: '@yh-ui/hooks', replacement: resolve(rootDir, 'packages/hooks/src/index.ts') },
        { find: '@yh-ui/utils', replacement: resolve(rootDir, 'packages/utils/src/index.ts') },
        { find: '@yh-ui/locale', replacement: resolve(rootDir, 'packages/locale/src/index.ts') },
        {
          find: /^@yh-ui\/theme\/(.*)$/,
          replacement: `${resolve(rootDir, 'packages/theme/src')}/$1`
        },
        { find: '@yh-ui/theme', replacement: resolve(rootDir, 'packages/theme/src/index.ts') }
      ]
    },
    build: {
      ...createSharedConfig().build,
      lib: {
        entry: resolve(rootDir, 'packages/flow/src/index.ts'),
        formats: ['es'],
        fileName: () => 'yh-flow-runtime.js',
        cssFileName: 'yh-flow-runtime'
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          inlineDynamicImports: true,
          manualChunks: undefined,
          exports: 'named'
        }
      }
    }
  })
}

async function buildYhUiRuntime() {
  await build({
    ...createSharedConfig(),
    resolve: {
      alias: [
        {
          find: '@yh-ui/components',
          replacement: resolve(rootDir, 'packages/components/src/index.ts')
        },
        { find: '@yh-ui/hooks', replacement: resolve(rootDir, 'packages/hooks/src/index.ts') },
        { find: '@yh-ui/utils', replacement: resolve(rootDir, 'packages/utils/src/index.ts') },
        { find: '@yh-ui/locale', replacement: resolve(rootDir, 'packages/locale/src/runtime.ts') },
        {
          find: /^@yh-ui\/theme\/(.*)$/,
          replacement: `${resolve(rootDir, 'packages/theme/src')}/$1`
        },
        { find: '@yh-ui/theme', replacement: resolve(rootDir, 'packages/theme/src/index.ts') }
      ]
    },
    build: {
      ...createSharedConfig().build,
      lib: {
        entry: resolve(rootDir, 'packages/yh-ui/src/sandbox-entry.ts'),
        formats: ['es'],
        fileName: () => 'yh-ui-bundle.js',
        cssFileName: 'yh-ui-bundle'
      },
      rollupOptions: {
        external: PLAYGROUND_YH_UI_EXTERNALS,
        output: {
          inlineDynamicImports: true,
          manualChunks: undefined,
          exports: 'named'
        }
      }
    }
  })
}

/**
 * Self-contained sandbox bundle for the Vue SFC iframe renderer.
 * Only 'vue' is external – all other deps (@yh-ui/icons, dayjs, @floating-ui/dom, etc.)
 * are bundled inline so the iframe importmap only needs a single 'vue' entry.
 * This is the bundle referenced by the docs' yhSandboxYhUiUrl provide value.
 */
async function buildYhUiSandboxBundle() {
  await build({
    ...createSharedConfig(),
    resolve: {
      alias: [
        {
          find: '@yh-ui/components',
          replacement: resolve(rootDir, 'packages/components/src/index.ts')
        },
        { find: '@yh-ui/hooks', replacement: resolve(rootDir, 'packages/hooks/src/index.ts') },
        { find: '@yh-ui/utils', replacement: resolve(rootDir, 'packages/utils/src/index.ts') },
        { find: '@yh-ui/locale', replacement: resolve(rootDir, 'packages/locale/src/runtime.ts') },
        {
          find: /^@yh-ui\/theme\/(.*)$/,
          replacement: `${resolve(rootDir, 'packages/theme/src')}/$1`
        },
        { find: '@yh-ui/theme', replacement: resolve(rootDir, 'packages/theme/src/index.ts') }
      ]
    },
    build: {
      ...createSharedConfig().build,
      lib: {
        entry: resolve(rootDir, 'packages/yh-ui/src/sandbox-entry.ts'),
        formats: ['es'],
        // Output name is different from yh-ui-bundle.js to avoid confusion
        fileName: () => 'yh-ui-sandbox-bundle.js',
        // Re-use the same CSS – consumers can reference yh-ui-bundle.css
        cssFileName: 'yh-ui-sandbox-bundle'
      },
      rollupOptions: {
        // Only vue is external; everything else (icons, dayjs, floating-ui …) is bundled
        external: ['vue'],
        output: {
          inlineDynamicImports: true,
          manualChunks: undefined,
          // 'auto' preserves the default export from sandbox-entry.ts
          // so `(await import(...)).default` resolves to { install, createYhUI }
          exports: 'auto'
        }
      }
    }
  })
}

async function buildHooksRuntime() {
  await build({
    ...createSharedConfig(),
    resolve: {
      alias: [
        { find: '@yh-ui/hooks', replacement: resolve(rootDir, 'packages/hooks/src/index.ts') },
        { find: '@yh-ui/utils', replacement: resolve(rootDir, 'packages/utils/src/index.ts') },
        { find: '@yh-ui/locale', replacement: resolve(rootDir, 'packages/locale/src/index.ts') },
        {
          find: /^@yh-ui\/theme\/(.*)$/,
          replacement: `${resolve(rootDir, 'packages/theme/src')}/$1`
        },
        { find: '@yh-ui/theme', replacement: resolve(rootDir, 'packages/theme/src/index.ts') }
      ]
    },
    build: {
      ...createSharedConfig().build,
      lib: {
        entry: resolve(rootDir, 'packages/hooks/src/index.ts'),
        formats: ['es'],
        fileName: () => 'yh-hooks-runtime.js'
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          inlineDynamicImports: true,
          manualChunks: undefined,
          exports: 'named'
        }
      }
    }
  })
}

async function buildYhUiInstallerRuntime() {
  await build({
    ...createSharedConfig(),
    build: {
      ...createSharedConfig().build,
      lib: {
        entry: resolve(rootDir, 'docs/.vitepress/theme/playground/yh-ui-runtime.ts'),
        formats: ['es'],
        fileName: () => 'yh-ui-runtime.js'
      },
      rollupOptions: {
        external: ['vue', '@yh-ui/yh-ui', '@yh-ui/flow', '@yh-ui/icons'],
        output: {
          inlineDynamicImports: true,
          manualChunks: undefined,
          exports: 'named'
        }
      }
    }
  })
}

async function copyVueRuntimeAssets() {
  await copyFile(
    resolve(rootDir, 'node_modules/vue/dist/vue.runtime.esm-browser.js'),
    resolve(playgroundOutDir, 'vue-runtime.js')
  )
  await copyFile(
    resolve(rootDir, 'node_modules/@vue/server-renderer/dist/server-renderer.esm-browser.js'),
    resolve(playgroundOutDir, 'server-renderer.js')
  )
}

async function main() {
  const fingerprint = await computeFingerprint([
    fileURLToPath(import.meta.url),
    resolve(rootDir, 'packages/components/src'),
    resolve(rootDir, 'packages/flow/src'),
    resolve(rootDir, 'packages/hooks/src'),
    resolve(rootDir, 'packages/locale/src'),
    resolve(rootDir, 'packages/theme/src'),
    resolve(rootDir, 'packages/utils/src'),
    resolve(rootDir, 'packages/yh-ui/src')
  ])

  if (await shouldSkipCachedBuild('build-playground-runtime', fingerprint, runtimeOutputs)) {
    console.log('Playground runtime assets unchanged, skipping rebuild')
    return
  }

  await cleanOutput()
  await buildFlowRuntime()
  await buildHooksRuntime()
  await buildYhUiRuntime()
  await buildYhUiSandboxBundle()
  await buildYhUiInstallerRuntime()
  await copyVueRuntimeAssets()
  await updateBuildCache('build-playground-runtime', fingerprint, runtimeOutputs)
  console.log('Playground runtime assets built in docs/public/playground')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
