/**
 * Radio Types & Props
 * @description 单选框组件类型定义
 */

import type { Component, InjectionKey } from 'vue'

/**
 * 单选框尺寸
 */
export const radioSizes = ['large', 'default', 'small'] as const

export type RadioSize = (typeof radioSizes)[number]

/**
 * 单选框值类型
 */
export type RadioValueType = string | number | boolean

/**
 * Radio Props 定义
 */
export interface RadioProps {
  /**
   * @description 绑定值
   */
  modelValue?: RadioValueType

  /**
   * @description 单选框的值
   */
  value?: RadioValueType

  /**
   * @description 原生 name 属性
   */
  name?: string

  /**
   * @description Radio 的 label（显示文字，如果没有 default slot）
   */
  label?: string

  /**
   * @description 单选框尺寸
   * @default 'default'
   */
  size?: RadioSize

  /**
   * @description 是否禁用
   * @default false
   */
  disabled?: boolean

  /**
   * @description 是否显示边框
   * @default false
   */
  border?: boolean

  /**
   * @description 单选框 id
   */
  id?: string

  /**
   * @description 单选框 tabindex
   */
  tabindex?: string | number

  /**
   * @description 主题覆盖变量
   */
  themeOverrides?: import('@yh-ui/theme').ComponentThemeVars
}

/**
 * Radio Emits 定义
 */
export interface RadioEmits {
  (e: 'update:modelValue', value: RadioValueType): void
  (e: 'change', value: RadioValueType): void
}

/**
 * Radio Slots 定义
 */
export interface RadioSlots {
  /**
   * 自定义内容
   */
  default?: () => void
}

/**
 * Radio Expose 定义
 */
export interface RadioExpose {
  /**
   * 单选框 DOM 元素
   */
  ref: HTMLInputElement | undefined

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
 * RadioGroup 选项定义
 */
export interface RadioGroupOption {
  value: RadioValueType
  label?: string
  disabled?: boolean
}

/**
 * RadioGroup Props 定义
 */
export interface RadioGroupProps {
  /**
   * @description 绑定值
   */
  modelValue?: RadioValueType

  /**
   * @description 单选配置项
   */
  options?: RadioGroupOption[]

  /**
   * @description 单选框组尺寸
   */
  size?: RadioSize

  /**
   * @description 是否禁用
   * @default false
   */
  disabled?: boolean

  /**
   * @description 原生 name 属性
   */
  name?: string

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
 * RadioGroup Emits 定义
 */
export interface RadioGroupEmits {
  (e: 'update:modelValue', value: RadioValueType): void
  (e: 'change', value: RadioValueType): void
}

/**
 * RadioGroup 上下文
 */
export interface RadioGroupContext {
  modelValue: RadioValueType | undefined
  size?: RadioSize
  disabled?: boolean
  name?: string
  fill?: string
  textColor?: string
  changeEvent?: (value: RadioValueType) => void
  themeOverrides?: import('@yh-ui/theme').ComponentThemeVars
}

/**
 * RadioGroup 注入 Key
 */
export const radioGroupContextKey: InjectionKey<RadioGroupContext> = Symbol('radioGroupContextKey')

/**
 * RadioButton Props 定义
 */
export interface RadioButtonProps {
  /**
   * @description 绑定值
   */
  modelValue?: RadioValueType

  /**
   * @description 单选框的值
   */
  value?: RadioValueType

  /**
   * @description 原生 name 属性
   */
  name?: string

  /**
   * @description RadioButton 的 label（显示文字，如果没有 default slot）
   */
  label?: string

  /**
   * @description 单选按钮尺寸
   * @default 'default'
   */
  size?: RadioSize

  /**
   * @description 是否禁用
   * @default false
   */
  disabled?: boolean

  /**
   * @description 单选按钮 id
   */
  id?: string

  /**
   * @description 单选按钮 tabindex
   */
  tabindex?: string | number

  /**
   * @description 主题覆盖变量
   */
  themeOverrides?: import('@yh-ui/theme').ComponentThemeVars
}

/**
 * RadioButton Emits 定义
 */
export interface RadioButtonEmits {
  (e: 'update:modelValue', value: RadioValueType): void
  (e: 'change', value: RadioValueType): void
}

/**
 * RadioButton Expose 定义
 */
export interface RadioButtonExpose {
  /**
   * 单选按钮 DOM 元素
   */
  ref: HTMLInputElement | undefined

  /**
   * 手动聚焦
   */
  focus: () => void

  /**
   * 手动失焦
   */
  blur: () => void
}
