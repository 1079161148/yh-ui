import { rm } from 'node:fs/promises'
import { resolve } from 'node:path'
import { build } from 'vite'
import vue from '@vitejs/plugin-vue'

const rootDir = resolve(import.meta.dirname, '..')
const playgroundOutDir = resolve(rootDir, 'docs/public/playground')

async function cleanOutput() {
  await rm(resolve(playgroundOutDir, 'assets'), { recursive: true, force: true })
  await Promise.all([
    rm(resolve(playgroundOutDir, 'yh-flow-runtime.js'), { force: true }),
    rm(resolve(playgroundOutDir, 'yh-flow-runtime.css'), { force: true }),
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
      alias: {
        '@yh-ui/hooks': resolve(rootDir, 'packages/hooks/src/index.ts')
      }
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
        entry: resolve(rootDir, 'packages/yh-ui/src/index.ts'),
        formats: ['es'],
        fileName: () => 'yh-ui-bundle.js',
        cssFileName: 'yh-ui-bundle'
      },
      rollupOptions: {
        external: ['vue', '@yh-ui/flow', '@yh-ui/icons'],
        output: {
          inlineDynamicImports: true,
          manualChunks: undefined,
          exports: 'named'
        }
      }
    }
  })
}

async function main() {
  await cleanOutput()
  await buildFlowRuntime()
  await buildYhUiRuntime()
  console.log('Playground runtime assets built in docs/public/playground')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
