/**
 * unplugin-vue-components Resolver
 * @description 自动导入解析器
 */

export interface YhUIResolverOptions {
  /**
   * 是否导入样式
   * @default true
   */
  importStyle?: boolean
}

/**
 * YH-UI 组件自动导入解析器
 * @example
 * // vite.config.ts
 * import Components from 'unplugin-vue-components/vite'
 * import { YhUIResolver } from '@yh-ui/components/resolver'
 *
 * export default {
 *   plugins: [
 *     Components({
 *       resolvers: [YhUIResolver()]
 *     })
 *   ]
 * }
 */
export function YhUIResolver(options: YhUIResolverOptions = {}) {
  const { importStyle = true } = options

  return {
    type: 'component' as const,
    resolve: (name: string) => {
      // 匹配 Yh 开头的组件
      if (name.startsWith('Yh')) {
        return {
          name,
          from: '@yh-ui/components',
          sideEffects: importStyle ? '@yh-ui/theme/styles/index.scss' : undefined
        }
      }
    }
  }
}

export default YhUIResolver
