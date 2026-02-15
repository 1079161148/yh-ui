/**
 * unplugin-icons 配置文件
 *
 * 这个文件用于配置 unplugin-icons 插件
 * 使用方式：在 vite.config.ts 中引入并添加到 plugins 数组
 *
 * @example
 * // vite.config.ts
 * import Icons from 'unplugin-icons/vite'
 * import { collections } from '@iconify/json'
 * import IconsResolver from 'unplugin-icons/resolver'
 *
 * export default defineConfig({
 *   plugins: [
 *     Icons({
 *       compiler: 'vue3',
 *       autoInstall: true,
 *       collections: {
 *         // 添加自定义图标集
 *         'custom': collections.get('mdi')
 *       }
 *     })
 *   ]
 * })
 */

import type { IconifyJSON } from '@iconify/vue'

// 预定义的常用图标集前缀列表
// 用户需要在 vite.config.ts 中配合 @iconify/json 使用
export const POPULAR_COLLECTION_PREFIXES = [
  'mdi',    // Material Design Icons
  'ep',     // Element Plus
  'lucide', // Lucide
  'tabler', // Tabler Icons
  'ri',     // Remix Icon
  'bi',     // Bootstrap Icons
  'heroicons',
  'fa',     // Font Awesome
  'carbon', // Carbon Icons
  'antd'    // Ant Design Icons
] as const

export type CollectionPrefix = typeof POPULAR_COLLECTION_PREFIXES[number]

/**
 * 获取图标集前缀列表
 */
export function getCollectionPrefixes(): string[] {
  return [...POPULAR_COLLECTION_PREFIXES]
}

// 导出类型
export type { IconifyJSON }
