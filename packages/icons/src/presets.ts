/**
 * 预设图标集配置
 *
 * 预配置常用的图标集，简化使用
 * 可以按需启用/禁用图标集
 */
import type { IconPreset } from './types'

/**
 * 预设图标集列表
 */
export const PRESETS: IconPreset[] = [
  {
    name: 'Material Design Icons',
    prefix: 'mdi',
    count: 7000,
    description: '最流行的开源图标库，Material Design 风格'
  },
  {
    name: 'Element Plus',
    prefix: 'ep',
    count: 200,
    description: 'Element Plus 官方图标库'
  },
  {
    name: 'Lucide',
    prefix: 'lucide',
    count: 1500,
    description: '现代、简洁风格的图标库'
  },
  {
    name: 'Tabler Icons',
    prefix: 'tabler',
    count: 4600,
    description: '高质量的 SVG 图标库'
  },
  {
    name: 'Remix Icon',
    prefix: 'ri',
    count: 2500,
    description: '精心设计的图标库'
  },
  {
    name: 'Heroicons',
    prefix: 'heroicons',
    count: 600,
    description: 'Tailwind CSS 官方图标库'
  },
  {
    name: 'Bootstrap Icons',
    prefix: 'bi',
    count: 2600,
    description: 'Bootstrap 官方图标库'
  },
  {
    name: 'Font Awesome 6',
    prefix: 'fa',
    count: 2000,
    description: '最流行的图标字体库'
  },
  {
    name: 'Carbon Icons',
    prefix: 'carbon',
    count: 1600,
    description: 'IBM Carbon 设计系统图标'
  },
  {
    name: 'Ant Design Icons',
    prefix: 'antd',
    count: 800,
    description: 'Ant Design 官方图标库'
  }
]

/**
 * 获取预设配置
 * @param prefix - 图标集前缀
 * @returns 预设配置
 */
export function getPreset(prefix: string): IconPreset | undefined {
  return PRESETS.find(p => p.prefix === prefix)
}

/**
 * 默认启用的图标集
 * 这些图标集会被默认加载
 */
export const DEFAULT_ENABLED_PRESETS = ['mdi', 'ep', 'lucide', 'tabler', 'ri']

/**
 * 图标集前缀映射
 * 用于简写转换
 */
export const PREFIX_ALIAS: Record<string, string> = {
  // Material Design Icons
  'mdi': 'mdi',
  // Element Plus
  'ep': 'ep',
  'element-plus': 'ep',
  // Lucide
  'lucide': 'lucide',
  // Tabler
  'tabler': 'tabler',
  // Remix Icon
  'ri': 'ri',
  'remix': 'ri',
  // Heroicons
  'heroicons': 'heroicons',
  'hero': 'heroicons',
  // Bootstrap
  'bi': 'bi',
  'bootstrap': 'bi',
  // Font Awesome
  'fa': 'fa',
  'font-awesome': 'fa',
  // Carbon
  'carbon': 'carbon',
  // Ant Design
  'antd': 'antd',
  'ant-design': 'antd'
}

/**
 * 常用图标快捷方式
 * 用于快速访问常用图标
 */
export const COMMON_ICONS = {
  // 箭头
  'arrow-up': 'mdi:arrow-up',
  'arrow-down': 'mdi:arrow-down',
  'arrow-left': 'mdi:arrow-left',
  'arrow-right': 'mdi:arrow-right',
  // 操作
  'close': 'mdi:close',
  'check': 'mdi:check',
  'plus': 'mdi:plus',
  'minus': 'mdi:minus',
  'delete': 'mdi:delete',
  'edit': 'mdi:pencil',
  'search': 'mdi:magnify',
  'upload': 'mdi:upload',
  'download': 'mdi:download',
  'refresh': 'mdi:refresh',
  'settings': 'mdi:cog',
  'menu': 'mdi:menu',
  // 状态
  'loading': 'mdi:loading',
  'success': 'mdi:check-circle',
  'warning': 'mdi:alert',
  'error': 'mdi:alert-circle',
  'info': 'mdi:information',
  // 用户
  'user': 'mdi:user',
  'users': 'mdi:account-group',
  // 文件
  'file': 'mdi:file',
  'folder': 'mdi:folder',
  'image': 'mdi:image'
} as const
