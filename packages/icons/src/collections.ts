/**
 * 图标集配置
 *
 * 提供常用图标集的元数据
 */
import type { IconCollection } from './types'

/**
 * 可用的图标集配置
 */
export const ICON_COLLECTIONS: IconCollection[] = [
  {
    name: 'Material Design Icons',
    prefix: 'mdi',
    author: 'Material Design Community',
    license: 'MIT',
    total: 7000
  },
  {
    name: 'Element Plus',
    prefix: 'ep',
    author: 'Element Plus Team',
    license: 'MIT',
    total: 200
  },
  {
    name: 'Lucide',
    prefix: 'lucide',
    author: 'Lucide Contributors',
    license: 'ISC',
    total: 1500
  },
  {
    name: 'Tabler Icons',
    prefix: 'tabler',
    author: 'Tabler Team',
    license: 'MIT',
    total: 4600
  },
  {
    name: 'Remix Icon',
    prefix: 'ri',
    author: 'Remix Icon Team',
    license: 'Apache 2.0',
    total: 2500
  },
  {
    name: 'Heroicons',
    prefix: 'heroicons',
    author: 'Tailwind Labs',
    license: 'MIT',
    total: 600
  },
  {
    name: 'Bootstrap Icons',
    prefix: 'bi',
    author: 'Bootstrap Team',
    license: 'MIT',
    total: 2600
  },
  {
    name: 'Font Awesome 6 Free',
    prefix: 'fa',
    author: 'Font Awesome',
    license: 'CC BY 4.0',
    total: 2000
  },
  {
    name: 'Carbon Icons',
    prefix: 'carbon',
    author: 'IBM',
    license: 'Apache 2.0',
    total: 1600
  },
  {
    name: 'Ant Design Icons',
    prefix: 'antd',
    author: 'Ant Financial',
    license: 'MIT',
    total: 800
  }
]

/**
 * 获取图标集配置
 */
export function getCollection(prefix: string): IconCollection | undefined {
  return ICON_COLLECTIONS.find(c => c.prefix === prefix)
}

/**
 * 获取所有图标集前缀
 */
export function getAllPrefixes(): string[] {
  return ICON_COLLECTIONS.map(c => c.prefix)
}
