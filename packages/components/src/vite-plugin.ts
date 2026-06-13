import type { Plugin } from 'vite'
import { createRequire } from 'node:module'

/**
 * 检查可选依赖是否已在消费端安装
 */
function isDependencyInstalled(name: string): boolean {
  try {
    if (typeof require !== 'undefined' && typeof require.resolve === 'function') {
      require.resolve(name)
      return true
    }
  } catch {}

  try {
    const req = createRequire(import.meta.url)
    req.resolve(name)
    return true
  } catch {}

  return false
}

/**
 * dayjs CJS 插件列表，需要被 Vite 预构建以解决 pnpm 严格链接 + Vite ESM 模式下的互操作问题。
 * 根因：dayjs 插件以 CJS 格式发布，在 ESM-only 环境下没有 default export，
 * 需要通过 optimizeDeps 让 Vite 将其转换为 ESM 格式。
 */
const DAYJS_PLUGINS = [
  'dayjs',
  'dayjs/plugin/advancedFormat',
  'dayjs/plugin/customParseFormat',
  'dayjs/plugin/isBetween',
  'dayjs/plugin/isoWeek',
  'dayjs/plugin/quarterOfYear',
  'dayjs/plugin/weekOfYear'
] as const

export interface YhUIVitePluginOptions {
  /**
   * 是否自动预构建 dayjs 及其插件（推荐保持开启）。
   * 解决 pnpm + Vite 6 下 dayjs CJS 插件无 default export 的问题。
   * @default true
   */
  optimizeDayjs?: boolean
}

/**
 * YH-UI Vite 插件。
 *
 * 自动处理 pnpm + Vite 6 环境下的 CJS/ESM 互操作问题，
 * 无需手动配置 `optimizeDeps`。
 *
 * @example
 * ```ts
 * // vite.config.ts
 * import { defineConfig } from 'vite'
 * import vue from '@vitejs/plugin-vue'
 * import { YhUIVitePlugin } from '@yh-ui/components/vite-plugin'
 *
 * export default defineConfig({
 *   plugins: [vue(), YhUIVitePlugin()]
 * })
 * ```
 */
export function YhUIVitePlugin(options: YhUIVitePluginOptions = {}): Plugin {
  const { optimizeDayjs = true } = options

  return {
    name: 'yh-ui:vite-plugin',
    config() {
      if (!optimizeDayjs) return {}

      const includeDeps = [
        ...DAYJS_PLUGINS,
        // 当消费方使用我们发布的 dist（而非 source alias）时，
        // 我们的 dist/dayjs.mjs 现已内联 dayjs，无需此项；
        // 但保留以兼容旧版本 / 直接安装 @yh-ui/hooks 的场景。
        '@yh-ui/components > dayjs',
        '@yh-ui/hooks > dayjs'
      ]

      // 自动检测并注入可选对等依赖的预构建配置，免去消费端手动配置的繁琐
      const optionalPeerDeps = [
        'monaco-editor',
        'xlsx',
        'viewerjs',
        'markdown-it',
        'echarts',
        'highlight.js'
      ]

      for (const dep of optionalPeerDeps) {
        if (isDependencyInstalled(dep)) {
          includeDeps.push(dep)
        }
      }

      // 针对 YhAiMermaid 组件动态加载的特殊适配
      if (isDependencyInstalled('mermaid')) {
        includeDeps.push('mermaid')
        includeDeps.push('mermaid > dayjs')
      }

      return {
        resolve: {
          alias: [
            { find: /^dayjs$/, replacement: 'dayjs/esm/index.js' },
            { find: /^dayjs\/dayjs\.min\.js$/, replacement: 'dayjs/esm/index.js' }
          ]
        },
        optimizeDeps: {
          // 强制 Vite 将 dayjs 及其 CJS 插件预构建为 ESM，解决 pnpm 严格模式下的 404 和
          // "does not provide an export named 'default'" 报错。
          // 嵌套依赖格式（'pkg > dep'）确保 dayjs 从我们的 dist 文件导入时也走预构建版本。
          include: includeDeps,
          // dayjs 是 CJS/UMD 模块，明确告知 Vite 需要 ESM 互操作包装，
          // 避免冷启动时出现 "does not provide an export named 'default'" 竞态问题。
          needsInterop: ['dayjs']
        },
        ssr: {
          // SSR 模式下同样需要处理 these CJS 模块
          noExternal: ['dayjs']
        }
      }
    }
  }
}

export default YhUIVitePlugin
