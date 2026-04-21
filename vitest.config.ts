import { defineConfig, coverageConfigDefaults } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'node:path'
import crypto from 'node:crypto'

const isCI = Boolean(process.env.CI)
const defaultWorkers = isCI ? 1 : '50%'
const enforceCoverageThresholds = Boolean(
  process.env.CI || process.env.COVERAGE_THRESHOLDS === 'true'
)

// Polyfill crypto.hash for Node.js < 18.20 / 20.12 / 21.7
if (typeof (crypto as unknown as { hash: unknown }).hash !== 'function') {
  ;(
    crypto as unknown as {
      hash: (
        algorithm: string,
        data: string | Buffer,
        outputEncoding?: crypto.BinaryToTextEncoding
      ) => string | Buffer
    }
  ).hash = (
    algorithm: string,
    data: string | Buffer,
    outputEncoding: crypto.BinaryToTextEncoding = 'hex'
  ) => {
    return crypto.createHash(algorithm).update(data).digest(outputEncoding)
  }
}

export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@yh-ui/components': resolve(__dirname, 'packages/components/src'),
      '@yh-ui/hooks': resolve(__dirname, 'packages/hooks/src'),
      '@yh-ui/utils': resolve(__dirname, 'packages/utils/src'),
      '@yh-ui/theme': resolve(__dirname, 'packages/theme/src'),
      '@yh-ui/locale': resolve(__dirname, 'packages/locale/src'),
      '@yh-ui/ai-sdk': resolve(__dirname, 'packages/ai-sdk/src'),
      ai: resolve(__dirname, 'node_modules/ai')
    }
  },
  test: {
    globals: true,
    isolate: true,
    pool: 'forks',
    passWithNoTests: false,
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      'packages/nuxt/__tests__/e2e/**'
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov', 'json', 'json-summary'],
      reportsDirectory: './coverage',
      include: ['packages/*/src/**/*.{ts,tsx,vue}'],
      exclude: [
        ...coverageConfigDefaults.exclude,
        '**/*.d.ts',
        '**/__tests__/**',
        '**/dist/**',
        'packages/nuxt/**'
      ],
      excludeAfterRemap: true,
      // Coverage cleanup is handled once in the launcher script to avoid
      // multi-project runs racing on the shared coverage temp directory.
      clean: false,
      reportOnFailure: true,
      ...(enforceCoverageThresholds
        ? {
            thresholds: {
              lines: 24,
              functions: 28,
              statements: 24,
              branches: 20,
              'packages/components/src/**/*.{ts,vue}': {
                lines: 34,
                functions: 36,
                statements: 34,
                branches: 28
              },
              'packages/hooks/src/**/*.ts': {
                lines: 42,
                functions: 44,
                statements: 42,
                branches: 34
              },
              'packages/utils/src/**/*.ts': {
                lines: 50,
                functions: 52,
                statements: 50,
                branches: 42
              },
              'packages/request/src/**/*.ts': {
                lines: 36,
                functions: 38,
                statements: 36,
                branches: 28
              },
              'packages/theme/src/**/*.ts': {
                lines: 34,
                functions: 36,
                statements: 34,
                branches: 26
              },
              'packages/locale/src/**/*.ts': {
                lines: 65,
                functions: 65,
                statements: 65,
                branches: 60
              },
              'packages/ai-sdk/src/**/*.ts': {
                lines: 42,
                functions: 44,
                statements: 42,
                branches: 34
              },
              'packages/flow/src/**/*.{ts,vue}': {
                lines: 30,
                functions: 32,
                statements: 30,
                branches: 24
              }
            }
          }
        : {})
    },
    server: {
      deps: {
        inline: ['vue', '@vue']
      }
    },
    projects: [
      {
        extends: true,
        test: {
          name: 'components-dom',
          environment: 'happy-dom',
          environmentOptions: {
            happyDOM: {
              url: 'http://localhost:3000'
            }
          },
          setupFiles: ['./test/setup/vitest.dom.ts'],
          include: ['packages/components/src/**/__tests__/**/*.test.{ts,tsx}'],
          exclude: ['**/*.ssr.test.{ts,tsx}', '**/*.perf.test.{ts,tsx}'],
          maxWorkers: defaultWorkers
        }
      },
      {
        extends: true,
        test: {
          name: 'packages-node',
          environment: 'node',
          setupFiles: ['./test/setup/vitest.node.ts'],
          include: [
            'packages/ai-sdk/**/__tests__/**/*.test.{ts,tsx}',
            'packages/icons/**/__tests__/**/*.test.{ts,tsx}',
            'packages/locale/**/__tests__/**/*.test.{ts,tsx}',
            'packages/theme/**/__tests__/**/*.test.{ts,tsx}',
            'packages/nuxt/__tests__/module.test.ts',
            'packages/nuxt/__tests__/runtime/**/*.test.ts'
          ],
          exclude: [
            '**/*.ssr.test.{ts,tsx}',
            '**/*.perf.test.{ts,tsx}',
            'packages/ai-sdk/__tests__/cache-adapter.test.ts',
            'packages/icons/**/__tests__/**/*.test.{ts,tsx}',
            'packages/theme/**/__tests__/**/*.test.{ts,tsx}'
          ],
          maxWorkers: defaultWorkers
        }
      },
      {
        extends: true,
        test: {
          name: 'packages-dom',
          environment: 'happy-dom',
          environmentOptions: {
            happyDOM: {
              url: 'http://localhost:3000'
            }
          },
          setupFiles: ['./test/setup/vitest.dom.ts'],
          // These package tests mount Vue components or touch document/window directly.
          include: [
            'packages/flow/src/**/__tests__/**/*.test.{ts,tsx}',
            'packages/hooks/src/**/__tests__/**/*.test.{ts,tsx}',
            'packages/request/src/**/__tests__/**/*.test.{ts,tsx}',
            'packages/ai-sdk/__tests__/cache-adapter.test.ts',
            'packages/icons/**/__tests__/**/*.test.{ts,tsx}',
            'packages/theme/**/__tests__/**/*.test.{ts,tsx}',
            'packages/utils/**/__tests__/**/*.test.{ts,tsx}'
          ],
          exclude: ['**/*.ssr.test.{ts,tsx}', '**/*.perf.test.{ts,tsx}'],
          maxWorkers: defaultWorkers
        }
      },
      {
        extends: true,
        test: {
          name: 'ssr',
          environment: 'happy-dom',
          environmentOptions: {
            happyDOM: {
              url: 'http://localhost:3000'
            }
          },
          setupFiles: ['./test/setup/vitest.dom.ts'],
          include: ['packages/**/__tests__/**/*.ssr.test.{ts,tsx}'],
          maxWorkers: defaultWorkers
        }
      },
      {
        extends: true,
        test: {
          name: 'perf',
          environment: 'happy-dom',
          environmentOptions: {
            happyDOM: {
              url: 'http://localhost:3000'
            }
          },
          setupFiles: ['./test/setup/vitest.dom.ts'],
          include: ['packages/**/__tests__/**/*.perf.test.{ts,tsx}'],
          fileParallelism: false,
          maxWorkers: 1,
          testTimeout: 30000,
          hookTimeout: 30000
        }
      }
    ]
  }
})
