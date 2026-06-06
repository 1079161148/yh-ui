/**
 * 图标库类型定义
 */

/**
 * 图标名称或图标标识符
 * 支持格式：
 * - 简写名称（如：'home', 'search'）
 * - 带前缀的图标名（如：'mdi:home', 'ep:search'）
 * - 完整图标标识符（如：'mdi/home', '@iconify-icons/mdi/home'）
 */
export type IconName = string

/**
 * 图标尺寸
 */
export type IconSize = number | string

/**
 * 图标颜色
 */
export type IconColor = string

/**
 * 图标旋转角度
 */
export type IconRotate = number

/**
 * 预设图标集
 * 每个预设代表一个常用的图标库
 */
export interface IconPreset {
  /** 预设名称 */
  name: string
  /** 图标集前缀 */
  prefix: string
  /** 图标数量 */
  count: number
  /** 图标集描述 */
  description?: string
}

/**
 * 图标配置选项
 */
export interface IconOptions {
  /** 默认图标尺寸 */
  defaultSize?: IconSize
  /** 默认图标颜色 */
  defaultColor?: IconColor
  /** 默认启用旋转动画 */
  defaultSpin?: boolean
  /** 加载失败时显示的备用图标 */
  fallbackIcon?: string
}

/**
 * 图标集配置
 */
export interface IconCollection {
  /** 图标集名称 */
  name: string
  /** 图标集前缀 */
  prefix: string
  /** 图标集作者 */
  author?: string
  /** 图标集许可证 */
  license?: string
  /** 图标数量 */
  total: number
}

/**
 * 图标搜索结果
 */
export interface IconSearchResult {
  /** 图标名称 */
  name: string
  /** 图标完整标识符 */
  icon: string
  /** 图标集 */
  collection: string
  /** 图标集前缀 */
  prefix: string
}

/**
 * Vue 组件图标属性
 */
export interface IconProps {
  /** 图标名称 */
  icon?: IconName
  /** 图标尺寸 */
  size?: IconSize
  /** 图标颜色 */
  color?: IconColor
  /** 是否旋转 */
  spin?: boolean
  /** 旋转角度 */
  rotate?: IconRotate
}

/**
 * 可用的图标集列表
 * 常用的图标集
 */
export const AVAILABLE_COLLECTIONS = [
  // Material Design Icons - 最流行的图标集
  { prefix: 'mdi', name: 'Material Design Icons', count: 7000 },
  // Element Plus 图标
  { prefix: 'ep', name: 'Element Plus', count: 200 },
  // Ant Design Icons
  { prefix: 'antd', name: 'Ant Design Icons', count: 800 },
  // Font Awesome
  { prefix: 'fa', name: 'Font Awesome 6 Free', count: 2000 },
  // Heroicons
  { prefix: 'heroicons', name: 'Heroicons', count: 600 },
  // Lucide - 现代简洁风格
  { prefix: 'lucide', name: 'Lucide', count: 1500 },
  // Carbon Icons
  { prefix: 'carbon', name: 'Carbon Icons', count: 1600 },
  // Tabler Icons
  { prefix: 'tabler', name: 'Tabler Icons', count: 4600 },
  // Remix Icon
  { prefix: 'ri', name: 'Remix Icon', count: 2500 },
  // Bootstrap Icons
  { prefix: 'bi', name: 'Bootstrap Icons', count: 2600 }
] as const

/**
 * 推荐的图标集（默认启用的图标集）
 */
export const RECOMMENDED_COLLECTIONS = ['mdi', 'ep', 'lucide', 'tabler', 'ri'] as const

export type RecommendedCollection = typeof RECOMMENDED_COLLECTIONS[number]
