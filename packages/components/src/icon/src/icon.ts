import type { Component, PropType, ExtractPropTypes } from 'vue'

/**
 * Icon 组件 Props 类型定义
 * @description 轻量级、高性能的图标组件
 */
export const iconProps = {
  /**
   * 图标名称（使用内置图标时）
   */
  name: {
    type: String,
    default: ''
  },

  /**
   * SVG 字符串（直接渲染 SVG）
   */
  svg: {
    type: String,
    default: ''
  },

  /**
   * 图标组件（传入 Vue 组件）
   */
  icon: {
    type: Object as PropType<Component>,
    default: undefined
  },

  /**
   * 图标尺寸
   * - number: 像素值
   * - string: CSS 尺寸值（如 '1em', '24px'）
   */
  size: {
    type: [Number, String] as PropType<number | string>,
    default: undefined
  },

  /**
   * 图标颜色
   * - 默认继承父元素的 color
   */
  color: {
    type: String,
    default: undefined
  },

  /**
   * 是否启用旋转动画
   */
  spin: {
    type: Boolean,
    default: false
  },

  /**
   * 旋转角度（度数）
   */
  rotate: {
    type: Number,
    default: 0
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object as PropType<import('@yh-ui/theme').ComponentThemeVars>,
    default: undefined
  }
} as const

export type IconProps = ExtractPropTypes<typeof iconProps>

/**
 * Icon 组件插槽类型
 */
export interface IconSlots {
  /**
   * 自定义 SVG 内容
   */
  default?: () => unknown
}

/**
 * 图标数据接口
 * 用于注册自定义图标
 */
export interface IconData {
  /**
   * 图标名称
   */
  name: string
  /**
   * SVG 内容（不含 <svg> 标签）
   */
  svg: string
  /**
   * viewBox 属性
   */
  viewBox?: string
}

/**
 * 图标集接口
 */
export interface IconSet {
  /**
   * 图标集名称前缀
   */
  prefix: string
  /**
   * 图标集合
   */
  icons: Record<string, IconData>
}

/**
 * 全局图标注册表
 */
export const iconRegistry = new Map<string, IconData>()

/**
 * 注册单个图标
 */
export function registerIcon(icon: IconData): void {
  iconRegistry.set(icon.name, icon)
}

/**
 * 批量注册图标
 */
export function registerIcons(icons: IconData[]): void {
  icons.forEach((icon) => registerIcon(icon))
}

/**
 * 注册图标集
 */
export function registerIconSet(iconSet: IconSet): void {
  Object.entries(iconSet.icons).forEach(([name, icon]) => {
    iconRegistry.set(`${iconSet.prefix}:${name}`, icon)
  })
}

/**
 * 获取已注册的图标
 */
export function getIcon(name: string): IconData | undefined {
  return iconRegistry.get(name)
}

/**
 * 创建图标组件（用于生成独立图标组件）
 */
export function createIconComponent(svg: string, viewBox = '0 0 24 24') {
  return {
    name: 'YhIconComponent',
    render() {
      return null // 将在 icon.vue 中实现
    },
    __svg: svg,
    __viewBox: viewBox
  }
}
