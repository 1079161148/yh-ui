import type { Plugin } from 'vite'

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

      return {
        optimizeDeps: {
          // 强制 Vite 将 dayjs CJS 插件预构建为 ESM，解决 pnpm 严格模式下的 404 和
          // "does not provide an export named 'default'" 报错
          include: [...DAYJS_PLUGINS]
        },
        ssr: {
          // SSR 模式下同样需要处理这些 CJS 模块
          noExternal: ['dayjs']
        }
      }
    }
  }
}

export default YhUIVitePlugin
