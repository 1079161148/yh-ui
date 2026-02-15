/**
 * Input Types & Props
 * @description 输入框组件类型定义
 */

import type { Component, ExtractPropTypes } from 'vue'

/**
 * 输入框类型
 */
export const inputTypes = [
  'text',
  'password',
  'textarea',
  'number',
  'email',
  'url',
  'tel',
  'search'
] as const

/**
 * 输入框尺寸
 */
export const inputSizes = ['large', 'default', 'small'] as const

export type InputType = (typeof inputTypes)[number]
export type InputSize = (typeof inputSizes)[number]

/**
 * Input Props 定义
 */
export interface InputProps {
  /**
   * @description 绑定值
   */
  modelValue?: string | number

  /**
   * @description 输入框类型
   * @default 'text'
   */
  type?: InputType

  /**
   * @description 输入框尺寸
   * @default 'default'
   */
  size?: InputSize

  /**
   * @description 占位文本
   */
  placeholder?: string

  /**
   * @description 是否禁用
   * @default false
   */
  disabled?: boolean

  /**
   * @description 是否只读
   * @default false
   */
  readonly?: boolean

  /**
   * @description 是否可清空
   * @default false
   */
  clearable?: boolean

  /**
   * @description 是否显示密码切换按钮
   * @default false
   */
  showPassword?: boolean

  /**
   * @description 是否显示字数统计
   * @default false
   */
  showWordLimit?: boolean

  /**
   * @description 最大输入长度
   */
  maxlength?: number | string

  /**
   * @description 最小输入长度
   */
  minlength?: number | string

  /**
   * @description 前置图标
   */
  prefixIcon?: string | Component

  /**
   * @description 后置图标
   */
  suffixIcon?: string | Component

  /**
   * @description 清除图标
   */
  clearIcon?: string | Component

  /**
   * @description 自动获取焦点
   * @default false
   */
  autofocus?: boolean

  /**
   * @description 原生 autocomplete 属性
   * @default 'off'
   */
  autocomplete?: string

  /**
   * @description 原生 name 属性
   */
  name?: string

  /**
   * @description 原生 form 属性
   */
  form?: string

  /**
   * @description 输入框 id
   */
  id?: string

  /**
   * @description 输入框 tabindex
   */
  tabindex?: string | number

  /**
   * @description 验证事件
   * @default 'change'
   */
  validateEvent?: boolean

  /**
   * @description 输入框行内样式
   */
  inputStyle?: Record<string, string | number>

  /**
   * @description 格式化函数（用于显示）
   */
  formatter?: (value: string | number) => string

  /**
   * @description 解析函数（用于更新值）
   */
  parser?: (value: string) => string

  // Textarea 特有属性
  /**
   * @description 文本域行数 (type="textarea" 时有效)
   * @default 2
   */
  rows?: number

  /**
   * @description 自适应文本高度 (type="textarea" 时有效)
   */
  autosize?: boolean | { minRows?: number; maxRows?: number }

  /**
   * @description 是否允许调整大小 (type="textarea" 时有效)
   */
  resize?: 'none' | 'both' | 'horizontal' | 'vertical'
}

/**
 * Input Emits 定义
 */
export interface InputEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'input', value: string): void
  (e: 'change', value: string): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'clear'): void
  (e: 'keydown', event: KeyboardEvent): void
  (e: 'keyup', event: KeyboardEvent): void
  (e: 'compositionstart', event: CompositionEvent): void
  (e: 'compositionupdate', event: CompositionEvent): void
  (e: 'compositionend', event: CompositionEvent): void
}

/**
 * Input Slots 定义
 */
export interface InputSlots {
  /**
   * 前置内容
   */
  prefix?: () => any

  /**
   * 后置内容
   */
  suffix?: () => any

  /**
   * 前置元素
   */
  prepend?: () => any

  /**
   * 后置元素
   */
  append?: () => any

  /**
   * 清除图标
   */
  clearIcon?: () => any
}

/**
 * Input Expose 定义
 */
export interface InputExpose {
  /**
   * 输入框 DOM 元素
   */
  ref: HTMLInputElement | HTMLTextAreaElement | undefined

  /**
   * 包裹元素
   */
  wrapperRef: HTMLElement | undefined

  /**
   * 获取焦点
   */
  focus: () => void

  /**
   * 失去焦点
   */
  blur: () => void

  /**
   * 选中文本
   */
  select: () => void

  /**
   * 清空内容
   */
  clear: () => void
}
