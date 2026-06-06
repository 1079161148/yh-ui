/**
 * unplugin-vue-components resolver for YH-UI.
 */

export interface YhUIResolverOptions {
  /**
   * Whether to inject the published CSS entry for resolved components.
   * When enabled, the resolver adds `@yh-ui/components/style` as a side effect.
   * @default true
   */
  importStyle?: boolean
}

/**
 * YH-UI component auto-import resolver.
 *
 * @example
 * ```ts
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
 * ```
 */
export function YhUIResolver(options: YhUIResolverOptions = {}) {
  const { importStyle = true } = options

  return {
    type: 'component' as const,
    resolve: (name: string) => {
      // Match Yh-prefixed components and optionally attach the public CSS entry.
      if (name.startsWith('Yh')) {
        return {
          name,
          from: '@yh-ui/components',
          sideEffects: importStyle ? '@yh-ui/components/style' : undefined
        }
      }
    }
  }
}

export default YhUIResolver
