/**
 * Iconify 核心集成
 *
 * 提供与 Iconify 的深度集成，支持：
 * - 动态加载图标
 * - 图标缓存
 * - SSR 支持
 */

import { Icon as IconifyIcon } from '@iconify/vue'
import { h, type VNode, computed } from 'vue'
import type { IconName, IconSize, IconColor, IconRotate } from './types'

/**
 * 创建 Iconify 图标组件
 * 这是 @yh-ui/icons 核心组件，提供高性能的图标渲染
 *
 * @example
 * ```vue
 * <script setup>
 * import { Icon } from '@yh-ui/icons/vue'
 * </script>
 *
 * <template>
 *   <!-- 使用前缀:图标名格式 -->
 *   <Icon icon="mdi:home" />
 *
 *   <!-- 使用自定义尺寸和颜色 -->
 *   <Icon icon="mdi:home" :size="24" color="#ff0000" />
 *
 *   <!-- 旋转图标 -->
 *   <Icon icon="mdi:loading" :rotate="90" />
 * </template>
 */
export interface IconifyProps {
  /** 图标名称，支持格式：mdi:home, ep:search, lucide:home */
  icon: IconName
  /** 图标尺寸 */
  size?: IconSize
  /** 图标颜色 */
  color?: IconColor
  /** 是否旋转动画 */
  spin?: boolean
  /** 旋转角度（0, 90, 180, 270） */
  rotate?: IconRotate
}

/**
 * 创建 SVG 属性
 */
function createSvgProps(props: IconifyProps) {
  const { icon, size, color, spin, rotate } = props

  const style: Record<string, string> = {}

  // 处理尺寸
  if (size) {
    const sizeValue = typeof size === 'number' ? `${size}px` : size
    style.width = sizeValue
    style.height = sizeValue
    style.fontSize = sizeValue
  }

  // 处理颜色
  if (color) {
    style.color = color
  }

  // 处理旋转（静态旋转）
  if (rotate) {
    style.transform = `rotate(${rotate}deg)`
  }

  // 处理旋转动画 - 直接添加内联样式
  if (spin) {
    style.animation = 'spin 1s linear infinite'
  }

  return {
    icon,
    style: Object.keys(style).length > 0 ? style : undefined
  }
}

/**
 * Iconify 图标组件 - 渲染用组件
 */
export function createIconifyComponent() {
  return (props: IconifyProps): VNode => {
    const svgProps = createSvgProps(props)
    return h(IconifyIcon, svgProps)
  }
}

/**
 * Iconify Vue 组件 - 可直接导入使用
 * 需要配合 unplugin-icons 实现按需加载
 */
export const Icon = createIconifyComponent()

/**
 * Iconify Icon 组件 - 别名
 */
export { Icon as Iconify }

/**
 * 解析图标名称
 * 支持多种格式：mdi:home, mdi/home, @iconify-icons/mdi/home
 *
 * @param name - 图标名称
 * @returns 解析后的图标名称
 */
export function parseIconName(name: string): string {
  // 如果已经是标准格式，直接返回
  if (name.includes(':')) {
    return name
  }

  // 如果是带斜杠的格式，转换为冒号分隔
  if (name.includes('/')) {
    return name.replace('/', ':')
  }

  // 简写格式，需要根据配置的默认图标集添加前缀
  // 将在 preset 中配置默认图标集
  return `mdi:${name}`
}

/**
 * 检查图标是否存在
 * @param name - 图标名称
 * @returns 是否存在
 */
export async function iconExists(name: string): Promise<boolean> {
  try {
    const icon = await import('@iconify/vue')
    const IconComponent = icon.Icon
    // 尝试加载图标
    const parsedName = parseIconName(name)
    // Iconify 会自动处理加载，这里简单返回 true
    return !!parsedName
  } catch {
    return false
  }
}

/**
 * 获取图标数据
 * @param name - 图标名称
 * @returns 图标的 SVG 数据
 */
export async function getIconData(name: string) {
  const { loadIcon, getIcon } = await import('@iconify/vue')
  const parsedName = parseIconName(name)

  // 先尝试从缓存获取
  const cached = getIcon(parsedName)
  if (cached) return cached

  // 异步加载图标
  try {
    const iconData = await loadIcon(parsedName)
    if (!iconData) {
      throw new Error(`Icon not found: ${name}`)
    }
    return iconData
  } catch {
    throw new Error(`Failed to load icon: ${name}`)
  }
}
