/**
 * Input Types & Props
 * @description 输入框组件类型定义
 */

import type { Component, VNodeChild } from 'vue'

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

/**
 * 输入框视觉变体 (Feature 1: Variant)
 */
export const inputVariants = ['default', 'filled', 'borderless', 'underlined'] as const

/**
 * 输入框独立状态 (Feature 3: Status)
 */
export const inputStatuses = ['', 'success', 'warning', 'error'] as const

export type InputType = (typeof inputTypes)[number]
export type InputSize = (typeof inputSizes)[number]
export type InputVariant = (typeof inputVariants)[number]
export type InputStatus = (typeof inputStatuses)[number]

/**
 * 字数统计配置 (Feature 7: Count Config)
 */
export interface InputCountConfig {
  /**
   * 自定义字数计算函数
   * @param value 当前输入值
   * @returns 计算结果数字
   */
  calculate?: (value: string) => number
}

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
   * @description 视觉变体：default(带边框) | filled(填充色背景) | borderless(无边框) | underlined(下划线)
   * @default 'default'
   */
  variant?: InputVariant

  /**
   * @description 独立状态反馈，不依赖 FormItem 即可显示颜色
   * @default ''
   */
  status?: InputStatus

  /**
   * @description 是否展示加载中状态（异步校验、搜索等场景）
   * @default false
   */
  loading?: boolean

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
   * @description 按 Esc 键时是否清空内容
   * @default false
   */
  clearOnEscape?: boolean

  /**
   * @description 获取焦点时是否自动选中所有文字
   * @default false
   */
  selectOnFocus?: boolean

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
   * @description 自定义字数统计配置（可自定义计算函数）
   */
  countConfig?: InputCountConfig

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
   * @description 前置文本（字符串快捷方式，与 #prefix 插槽等效）
   */
  prefix?: string

  /**
   * @description 后置文本（字符串快捷方式，与 #suffix 插槽等效）
   */
  suffix?: string

  /**
   * @description 原生 list 属性，绑定 datalist 元素的 id
   */
  list?: string

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
   * @description 等价于原生 input aria-label 属性
   */
  ariaLabel?: string

  /**
   * @description (已过时) 等价于原生 input aria-label 属性，建议使用 aria-label
   */
  label?: string

  /**
   * @description 等价于原生 input inputmode 属性
   */
  inputmode?: 'text' | 'none' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search'

  /**
   * v-model 修饰符
   * @description Vue 的 v-model 修饰符值永远是布尔类型
   */
  modelModifiers?: Record<string, boolean>

  /**
   * @description 输入时是否触发表单的校验
   * @default true
   */
  validateEvent?: boolean

  /**
   * @description input 元素或 textarea 元素的 style
   */
  inputStyle?: string | Record<string, string | number>

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
  (e: 'update:modelValue', value: string | number): void
  (e: 'input', value: string | number): void
  (e: 'change', value: string | number): void
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
   * 前置内容（图标或文本）
   * 返回 VNodeChild 而非 any，以保持类型安全
   */
  prefix?: () => VNodeChild
  /** 后置内容（图标或文本） */
  suffix?: () => VNodeChild
  /** 前置元素（复合输入框） */
  prepend?: () => VNodeChild
  /** 后置元素（复合输入框） */
  append?: () => VNodeChild
  /** 自定义清除图标 */
  clearIcon?: () => VNodeChild
  /** 自定义加载图标 */
  loadingIcon?: () => VNodeChild
}

/**
 * Input Expose 定义
 */
export interface InputExpose {
  /** 输入框 DOM 元素 */
  ref: HTMLInputElement | HTMLTextAreaElement | undefined
  /** 包裹元素 DOM */
  wrapperRef: HTMLElement | undefined
  /** 获取焦点 */
  focus: () => void
  /** 失去焦点 */
  blur: () => void
  /** 选中文本 */
  select: () => void
  /** 清空内容 */
  clear: () => void
  /** 当前输入值的显示字数（应用 countConfig 后的结果） */
  textLength: number
}
