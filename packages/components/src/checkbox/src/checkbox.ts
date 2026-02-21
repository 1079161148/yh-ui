/**
 * Checkbox Types & Props
 * @description 复选框组件类型定义
 */

import type { Component, InjectionKey } from 'vue'

/**
 * 复选框尺寸
 */
export const checkboxSizes = ['large', 'default', 'small'] as const

export type CheckboxSize = (typeof checkboxSizes)[number]

/**
 * 复选框值类型
 */
export type CheckboxValueType = string | number | boolean

/**
 * Checkbox Props 定义
 */
export interface CheckboxProps {
  /**
   * @description 绑定值
   */
  modelValue?: CheckboxValueType

  /**
   * @description 选中时的值
   * @default true
   */
  trueValue?: CheckboxValueType

  /**
   * @description 未选中时的值
   * @default false
   */
  falseValue?: CheckboxValueType

  /**
   * @description 复选框的值（用于 checkbox-group）
   */
  value?: CheckboxValueType

  /**
   * @description 原生 name 属性
   */
  name?: string

  /**
   * @description Checkbox 的 label（显示文字，如果没有 default slot）
   */
  label?: string

  /**
   * @description 复选框尺寸
   * @default 'default'
   */
  size?: CheckboxSize

  /**
   * @description 是否禁用
   * @default false
   */
  disabled?: boolean

  /**
   * @description 设置中间状态，只负责样式控制
   * @default false
   */
  indeterminate?: boolean

  /**
   * @description 是否显示边框
   * @default false
   */
  border?: boolean

  /**
   * @description 验证事件触发
   * @default true
   */
  validateEvent?: boolean

  /**
   * @description 复选框 id
   */
  id?: string

  /**
   * @description 复选框 tabindex
   */
  tabindex?: string | number

  /**
   * @description 选中状态改变时是否触发表单验证
   * @default true
   */
  checked?: boolean

  /**
   * @description 主题覆盖变量
   */
  themeOverrides?: import('@yh-ui/theme').ComponentThemeVars
}

/**
 * Checkbox Emits 定义
 */
export interface CheckboxEmits {
  (e: 'update:modelValue', value: CheckboxValueType): void
  (e: 'change', value: CheckboxValueType): void
}

/**
 * Checkbox Slots 定义
 */
export interface CheckboxSlots {
  /**
   * 自定义内容
   */
  default?: () => void
}

/**
 * Checkbox Expose 定义
 */
export interface CheckboxExpose {
  /**
   * 复选框 DOM 元素
   */
  ref: HTMLInputElement | undefined

  /**
   * 当前选中状态
   */
  checked: boolean

  /**
   * 手动聚焦
   */
  focus: () => void

  /**
   * 手动失焦
   */
  blur: () => void
}

/**
 * CheckboxGroup Props 定义
 */
export interface CheckboxGroupProps {
  /**
   * @description 绑定值
   */
  modelValue?: CheckboxValueType[]

  /**
   * @description 复选框组尺寸
   */
  size?: CheckboxSize

  /**
   * @description 是否禁用
   * @default false
   */
  disabled?: boolean

  /**
   * @description 可被勾选的最小数量
   */
  min?: number

  /**
   * @description 可被勾选的最大数量
   */
  max?: number

  /**
   * @description 验证事件触发
   * @default true
   */
  validateEvent?: boolean

  /**
   * @description 文本颜色（按钮形式时生效）
   */
  textColor?: string

  /**
   * @description 填充色和边框色（按钮形式时生效）
   */
  fill?: string

  /**
   * @description 元素标签
   * @default 'div'
   */
  tag?: string | Component

  /**
   * @description 主题覆盖变量
   */
  themeOverrides?: import('@yh-ui/theme').ComponentThemeVars
}

/**
 * CheckboxGroup Emits 定义
 */
export interface CheckboxGroupEmits {
  (e: 'update:modelValue', value: CheckboxValueType[]): void
  (e: 'change', value: CheckboxValueType[]): void
}

/**
 * CheckboxGroup 上下文
 */
export interface CheckboxGroupContext {
  modelValue: CheckboxValueType[]
  size?: CheckboxSize
  disabled?: boolean
  min?: number
  max?: number
  changeEvent?: (value: CheckboxValueType[]) => void
  themeOverrides?: import('@yh-ui/theme').ComponentThemeVars
}

/**
 * CheckboxGroup 注入 Key
 */
export const checkboxGroupContextKey: InjectionKey<CheckboxGroupContext> =
  Symbol('checkboxGroupContextKey')
