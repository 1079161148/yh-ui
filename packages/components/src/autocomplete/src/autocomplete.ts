/**
 * Autocomplete Types & Props
 * @description 自动补全输入框组件类型定义
 */

import type { Component } from 'vue'

export type AutocompleteSize = 'large' | 'default' | 'small'
export type AutocompletePlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'

export interface AutocompleteSuggestion {
  value: string
  [key: string]: string | number | boolean | object | undefined
}

export interface AutocompleteProps {
  /** 绑定值 */
  modelValue?: string
  /** 占位文本 */
  placeholder?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否可清空 */
  clearable?: boolean
  /** 输入框尺寸 */
  size?: AutocompleteSize
  /** 获取建议的方法 */
  fetchSuggestions?: (
    query: string,
    callback: (suggestions: AutocompleteSuggestion[]) => void
  ) => void
  /** 是否在聚焦时触发建议 */
  triggerOnFocus?: boolean
  /** 防抖延迟 (ms) */
  debounce?: number
  /** 下拉框位置 */
  placement?: AutocompletePlacement
  /** 建议对象中用于显示的键名 */
  valueKey?: string
  /** 下拉框的类名 */
  popperClass?: string
  /** 是否将下拉框插入到 body */
  teleported?: boolean
  /** 下拉框宽度是否与输入框一致 */
  fitInputWidth?: boolean
  /** 是否默认高亮第一项 */
  highlightFirstItem?: boolean
  /** 前置图标 */
  prefixIcon?: string | Component
  /** 后置图标 */
  suffixIcon?: string | Component
  /** 是否触发表单验证 */
  validateEvent?: boolean
  /** 自动获取焦点 */
  autofocus?: boolean
  /** 输入框姓名 */
  name?: string
  /** 原生属性 */
  autocomplete?: string
  /** 主题覆盖变量 */
  themeOverrides?: import('@yh-ui/theme').ComponentThemeVars
}

export interface AutocompleteEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'input', value: string): void
  (e: 'change', value: string): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'clear'): void
  (e: 'select', item: AutocompleteSuggestion): void
}

export interface AutocompleteSlots {
  /** 自定义输入框前缀 */
  prefix?: () => any
  /** 自定义输入框后缀 */
  suffix?: () => any
  /** 自定义建议项 */
  default?: (props: { item: AutocompleteSuggestion }) => any
  /** 前置内容 */
  prepend?: () => any
  /** 后置内容 */
  append?: () => any
  /** 正在加载内容 */
  loading?: () => any
  /** 无数据内容 */
  empty?: () => any
}

export interface AutocompleteExpose {
  /** 获取焦点 */
  focus: () => void
  /** 失去焦点 */
  blur: () => void
  /** 关闭建议列表 */
  close: () => void
  /** 高亮指定项 */
  highlight: (index: number) => void
  /** 输入框引用 */
  inputRef: HTMLInputElement | undefined
}
