/**
 * Select Types & Props
 * @description 选择器组件类型定义
 */

import type { InjectionKey, Ref } from 'vue'

export type SelectSize = 'large' | 'default' | 'small'
export type SelectTagType = 'success' | 'info' | 'warning' | 'danger' | ''

export interface SelectOption {
  value: string | number | boolean
  label: string
  disabled?: boolean
  [key: string]: any
}

export interface SelectProps {
  /** 绑定值 */
  modelValue?: string | number | boolean | (string | number | boolean)[]
  /** 选项数据 */
  options?: SelectOption[]
  /** 占位文本 */
  placeholder?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否可清空 */
  clearable?: boolean
  /** 输入框尺寸 */
  size?: SelectSize
  /** 是否多选 */
  multiple?: boolean
  /** 多选时最多可选数量 */
  multipleLimit?: number
  /** 是否可搜索 */
  filterable?: boolean
  /** 自定义过滤方法 */
  filterMethod?: (query: string) => void
  /** 是否远程搜索 */
  remote?: boolean
  /** 远程搜索方法 */
  remoteMethod?: (query: string) => void
  /** 是否正在加载 */
  loading?: boolean
  /** 加载文本 */
  loadingText?: string
  /** 无匹配数据文本 */
  noMatchText?: string
  /** 无数据文本 */
  noDataText?: string
  /** 是否允许创建新选项 */
  allowCreate?: boolean
  /** 是否折叠标签 */
  collapseTags?: boolean
  /** 折叠标签是否显示 tooltip */
  collapseTagsTooltip?: boolean
  /** 最大折叠标签数 */
  maxCollapseTags?: number
  /** 下拉框类名 */
  popperClass?: string
  /** 是否将下拉框插入到 body */
  teleported?: boolean
  /** 下拉框宽度是否与输入框一致 */
  fitInputWidth?: boolean
  /** 标签类型 */
  tagType?: SelectTagType
  /** 是否启用虚拟滚动 */
  virtualScroll?: boolean
  /** 虚拟滚动项高度 */
  itemHeight?: number
  /** 虚拟滚动容器高度 */
  height?: number
  /** 是否触发表单验证 */
  validateEvent?: boolean
  /** 值的键名 */
  valueKey?: string
  /** 标签的键名 */
  labelKey?: string
}

export interface SelectEmits {
  (e: 'update:modelValue', value: any): void
  (e: 'change', value: any): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'clear'): void
  (e: 'visible-change', visible: boolean): void
  (e: 'remove-tag', value: any): void
}

export interface SelectSlots {
  /** 自定义选项内容 */
  default?: () => any
  /** 自定义前缀 */
  prefix?: () => any
  /** 无数据时的内容 */
  empty?: () => any
  /** 标签内容 */
  tag?: (props: { value: any }) => any
}

export interface SelectExpose {
  /** 获取焦点 */
  focus: () => void
  /** 失去焦点 */
  blur: () => void
  /** 输入框引用 */
  inputRef: HTMLInputElement | undefined
}

// Select 上下文
export interface SelectContext {
  props: SelectProps
  selectValue: any
  hoveredIndex: Ref<number>
  handleOptionSelect: (option: SelectOption) => void
  isSelected: (value: any) => boolean
  // 新增：注册/注销 Option
  onOptionCreate: (option: SelectOption) => void
  onOptionDestroy: (value: any) => void
}

export interface OptionProps {
  /** 选项值 */
  value: string | number | boolean
  /** 选项标签 */
  label?: string
  /** 是否禁用 */
  disabled?: boolean
}

export const SelectContextKey: InjectionKey<SelectContext> = Symbol('SelectContextKey')
