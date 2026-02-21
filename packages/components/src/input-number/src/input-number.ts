/**
 * InputNumber Types & Props
 * @description 数字输入框组件类型定义
 */

import type { Component } from 'vue'

/**
 * 数字输入框尺寸
 */
export const inputNumberSizes = ['large', 'default', 'small'] as const

export type InputNumberSize = (typeof inputNumberSizes)[number]

/**
 * 控制按钮位置
 */
export const controlsPositions = ['', 'right'] as const

export type ControlsPosition = (typeof controlsPositions)[number]

/**
 * InputNumber Props 定义
 */
export interface InputNumberProps {
  /**
   * @description 绑定值
   */
  modelValue?: number

  /**
   * @description 最小值
   * @default -Infinity
   */
  min?: number

  /**
   * @description 最大值
   * @default Infinity
   */
  max?: number

  /**
   * @description 步长
   * @default 1
   */
  step?: number

  /**
   * @description 是否只能输入步长的倍数
   * @default false
   */
  stepStrictly?: boolean

  /**
   * @description 数值精度
   */
  precision?: number

  /**
   * @description 尺寸
   * @default 'default'
   */
  size?: InputNumberSize

  /**
   * @description 是否只读
   * @default false
   */
  readonly?: boolean

  /**
   * @description 是否禁用
   * @default false
   */
  disabled?: boolean

  /**
   * @description 控制按钮位置
   * @default ''
   */
  controlsPosition?: ControlsPosition

  /**
   * @description 是否显示控制按钮
   * @default true
   */
  controls?: boolean

  /**
   * @description 原生 name 属性
   */
  name?: string

  /**
   * @description 输入框占位符
   */
  placeholder?: string

  /**
   * @description 输入框 id
   */
  id?: string

  /**
   * @description 输入框 tabindex
   */
  tabindex?: string | number

  /**
   * @description 空值时显示的值
   */
  valueOnClear?: number | null | 'min' | 'max'

  /**
   * @description 前缀文本
   */
  prefix?: string

  /**
   * @description 后缀文本
   */
  suffix?: string

  /**
   * @description 前缀图标
   */
  prefixIcon?: string | Component

  /**
   * @description 后缀图标
   */
  suffixIcon?: string | Component

  /**
   * @description 是否可清空
   * @default false
   */
  clearable?: boolean

  /**
   * @description 自定义验证函数
   */
  validateEvent?: boolean

  /**
   * @description 自定义验证规则
   */
  validator?: (value: number | undefined) => boolean | string
  /**
   * @description 主题覆盖变量
   */
  themeOverrides?: import('@yh-ui/theme').ComponentThemeVars
}

/**
 * InputNumber Emits 定义
 */
export interface InputNumberEmits {
  (e: 'update:modelValue', value: number | undefined): void
  (e: 'change', currentValue: number | undefined, oldValue: number | undefined): void
  (e: 'input', value: number | undefined): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'clear'): void
}

/**
 * InputNumber Slots 定义
 */
export interface InputNumberSlots {
  /**
   * 前缀内容
   */
  prefix?: () => void

  /**
   * 后缀内容
   */
  suffix?: () => void

  /**
   * 自定义减少按钮图标
   */
  decreaseIcon?: () => void

  /**
   * 自定义增加按钮图标
   */
  increaseIcon?: () => void
}

/**
 * InputNumber Expose 定义
 */
export interface InputNumberExpose {
  /**
   * 获取焦点
   */
  focus: () => void

  /**
   * 失去焦点
   */
  blur: () => void

  /**
   * 清空值
   */
  clear: () => void
}
