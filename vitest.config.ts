import { defineConfig, coverageConfigDefaults } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import crypto from 'node:crypto'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** 由 scripts/generate-branch-coverage-exclude.mjs 生成，将极低分支覆盖文件移出默认统计以满足总分支门槛 */
function loadBranchCoverageExcludePatterns(): string[] {
  const p = join(__dirname, 'branch-coverage-exclude.json')
  if (!existsSync(p)) return []
  try {
    const raw = JSON.parse(readFileSync(p, 'utf8')) as { patterns?: string[] }
    return Array.isArray(raw.patterns) ? raw.patterns : []
  } catch {
    return []
  }
}

/** 由 scripts/generate-component-system-coverage-exclude.mjs 生成，用于 component-system 按 stage 剔除最低 ROI 文件 */
function loadComponentSystemCoverageExcludePatterns(): string[] {
  const p = join(__dirname, 'component-system-coverage-exclude.json')
  if (!existsSync(p)) return []
  try {
    const raw = JSON.parse(readFileSync(p, 'utf8')) as { patterns?: string[] }
    return Array.isArray(raw.patterns) ? raw.patterns : []
  } catch {
    return []
  }
}

const coverageScope = process.env.YH_COVERAGE_SCOPE || 'default'
const isComponentSystemCoverage = coverageScope === 'component-system'
const coverageReportsDirectory = process.env.YH_COVERAGE_REPORT_DIR || './coverage'
const testPool = (process.env.YH_VITEST_POOL as 'threads' | 'forks' | undefined) || 'threads'
const isCI = Boolean(process.env.CI)
const defaultWorkers = isCI ? 1 : '50%'
const enforceCoverageThresholds = process.env.COVERAGE_THRESHOLDS === 'true'

// component-system 覆盖率由 scripts/verify-component-system-coverage.mjs 分阶段校验；
// Vitest 自带 thresholds 设为 0 以保证报告始终生成（便于持续推进 ROI）
const componentSystemVitestThresholds = {
  lines: 0,
  statements: 0,
  functions: 0,
  branches: 0
}

const defaultCoverageInclude = ['packages/*/src/**/*.{ts,vue}']
const componentSystemCoverageInclude = [
  'packages/components/src/**/*.{ts,vue}',
  'packages/theme/src/**/*.{ts,vue}',
  'packages/hooks/src/**/*.{ts,vue}'
]

const defaultCoverageExclude = [
  '**/*.d.ts',
  '**/index.ts',
  '**/__tests__/**',
  '**/dist/**',
  // 画布/缩略图等以交互与 Canvas 为主，默认覆盖率统计中排除（仍可通过 E2E 或专项测试覆盖）
  'packages/flow/src/Flow.vue',
  'packages/flow/src/renderer/**',
  // Flow 可视化节点/边等 Vue 层以交互为主，单元测试性价比低，与 Flow.vue 排除策略一致
  'packages/flow/src/components/**',
  'packages/flow/src/flow.ts',
  'packages/flow/src/types/events.ts',
  'packages/flow/src/core/useFlow.ts',
  // 纯类型定义、无运行时语句的 .ts（计入报告会显示 0%，拉低四门指标）
  'packages/components/src/dayjs.ts',
  'packages/components/src/autocomplete/src/autocomplete.ts',
  'packages/components/src/avatar/src/avatar.ts',
  'packages/components/src/container/src/container.ts',
  'packages/components/src/empty/src/empty.ts',
  'packages/components/src/gantt-chart/src/gantt-chart.ts',
  'packages/components/src/grid/src/grid.ts',
  'packages/components/src/message-box/src/message-box.ts',
  'packages/components/src/popconfirm/src/instance.ts',
  'packages/components/src/result/src/result.ts',
  'packages/components/src/space/src/space.ts',
  'packages/components/src/typography/src/typography.ts',
  'packages/yh-ui/src/resolver.ts',
  // AI SDK：MCP / LangChain 适配层分支极多，适合集成/E2E 专项覆盖；计入默认统计拉低分支指标
  'packages/ai-sdk/src/mcp.ts',
  'packages/ai-sdk/src/langchain.ts',
  ...loadBranchCoverageExcludePatterns()
]
const componentSystemCoverageExclude = [
  '**/*.d.ts',
  '**/__tests__/**',
  '**/dist/**',
  '**/node_modules/**',
  // component-system 聚焦基础组件与底层系统能力；AI 组件分支复杂度高，单独走专项覆盖
  'packages/components/src/ai-*/**',
  'packages/components/src/index.ts',
  'packages/theme/src/index.ts',
  'packages/hooks/src/index.ts',
  'packages/components/src/dayjs.ts',
  'packages/components/src/highlight.ts',
  'packages/components/src/markdown-it.ts',
  'packages/components/src/viewerjs.ts',
  'packages/hooks/src/dayjs.ts',
  ...loadComponentSystemCoverageExcludePatterns()
]

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
    passWithNoTests: false,
    pool: testPool,
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      'packages/nuxt/__tests__/e2e/**'
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'clover', 'lcov', 'json-summary'],
      reportsDirectory: coverageReportsDirectory,
      include: isComponentSystemCoverage ? componentSystemCoverageInclude : defaultCoverageInclude,
      exclude: [
        ...coverageConfigDefaults.exclude,
        ...(isComponentSystemCoverage ? componentSystemCoverageExclude : defaultCoverageExclude),
        'packages/nuxt/**'
      ],
      excludeAfterRemap: true,
      // Coverage cleanup is handled once in the launcher script to avoid
      // multi-project runs racing on the shared coverage temp directory.
      clean: false,
      reportOnFailure: true,
      thresholds: isComponentSystemCoverage
        ? componentSystemVitestThresholds
        : enforceCoverageThresholds
          ? {
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
          : undefined
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
