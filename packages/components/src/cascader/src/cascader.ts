/**
 * Cascader Types & Props
 * @description 级联选择器组件类型定义
 */

import type { InjectionKey, ComputedRef } from 'vue'

export type CascaderSize = 'large' | 'default' | 'small'
export type CascaderExpandTrigger = 'click' | 'hover'
export type CascaderTagType = 'success' | 'info' | 'warning' | 'danger' | ''

export interface CascaderOption {
  value: string | number
  label: string
  children?: CascaderOption[]
  disabled?: boolean
  leaf?: boolean
  [key: string]: any
}

export type CascaderValue = string | number | (string | number)[] | (string | number)[][]

export interface CascaderProps {
  /** 绑定值 */
  modelValue?: CascaderValue
  /** 选项数据 */
  options?: CascaderOption[]
  /** 占位文本 */
  placeholder?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 是否可清空 */
  clearable?: boolean
  /** 输入框尺寸 */
  size?: CascaderSize
  /** 是否可搜索 */
  filterable?: boolean
  /** 自定义过滤方法 */
  filterMethod?: (node: CascaderOption, keyword: string) => boolean
  /** 分隔符 */
  separator?: string
  /** 是否显示完整路径 */
  showAllLevels?: boolean
  /** 是否折叠标签 */
  collapseTags?: boolean
  /** 折叠标签是否显示 tooltip */
  collapseTagsTooltip?: boolean
  /** 最大折叠标签数 */
  maxCollapseTags?: number
  /** 是否多选 */
  multiple?: boolean
  /** 是否严格遵守父子节点不互相关联（可选择任意一级） */
  checkStrictly?: boolean
  /** 展开触发方式 */
  expandTrigger?: CascaderExpandTrigger
  /** 是否返回完整路径 */
  emitPath?: boolean
  /** 是否启用虚拟滚动 */
  virtual?: boolean
  /** 虚拟滚动每项高度 */
  virtualItemHeight?: number
  /** 配置选项（向后兼容） */
  props?: {
    /** 展开触发方式 */
    expandTrigger?: CascaderExpandTrigger
    /** 是否多选 */
    multiple?: boolean
    /** 是否严格遵守父子节点不互相关联 */
    checkStrictly?: boolean
    /** 是否返回完整路径 */
    emitPath?: boolean
    /** 是否懒加载 */
    lazy?: boolean
    /** 懒加载方法 */
    lazyLoad?: (node: CascaderOption, resolve: (children: CascaderOption[]) => void) => void
    /** value 键名 */
    value?: string
    /** label 键名 */
    label?: string
    /** children 键名 */
    children?: string
    /** disabled 键名 */
    disabled?: string
    /** leaf 键名 */
    leaf?: string
  }
  /** 下拉框类名 */
  popperClass?: string
  /** 是否将下拉框插入到 body */
  teleported?: boolean
  /** 标签类型 */
  tagType?: CascaderTagType
  /** 是否触发表单验证 */
  validateEvent?: boolean
}

export interface CascaderEmits {
  (e: 'update:modelValue', value: any): void
  (e: 'change', value: any): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'clear'): void
  (e: 'expand-change', value: any[]): void
  (e: 'visible-change', visible: boolean): void
}

export interface CascaderSlots {
  /** 自定义选项内容 */
  default?: (props: { node: CascaderOption; data: CascaderOption }) => any
  /** 无数据时的内容 */
  empty?: () => any
}

export interface CascaderExpose {
  /** 获取焦点 */
  focus: () => void
  /** 失去焦点 */
  blur: () => void
  /** 获取选中节点 */
  getCheckedNodes: (leafOnly?: boolean) => CascaderOption[]
  /** 输入框引用 */
  inputRef: HTMLInputElement | undefined
}

// Cascader 上下文
export interface CascaderContext {
  props: CascaderProps
  config: ComputedRef<CascaderConfig>
  expandedPath: ComputedRef<(string | number)[]>
  checkedValue: ComputedRef<
    string | number | (string | number)[] | (string | number)[][] | undefined
  >
  handleExpand: (option: CascaderOption, level: number) => void
  handleCheck: (option: CascaderOption, path: (string | number)[]) => void
  isChecked: (path: (string | number)[]) => boolean
}

export const CascaderContextKey: InjectionKey<CascaderContext> = Symbol('CascaderContextKey')

// 默认配置类型
export interface CascaderConfig {
  expandTrigger: CascaderExpandTrigger
  multiple: boolean
  checkStrictly: boolean
  emitPath: boolean
  lazy: boolean
  lazyLoad?: (node: CascaderOption, resolve: (children: CascaderOption[]) => void) => void
  value: string
  label: string
  children: string
  disabled: string
  leaf: string
}

// 默认配置
export const defaultCascaderConfig: CascaderConfig = {
  expandTrigger: 'click',
  multiple: false,
  checkStrictly: false,
  emitPath: true,
  lazy: false,
  lazyLoad: undefined,
  value: 'value',
  label: 'label',
  children: 'children',
  disabled: 'disabled',
  leaf: 'leaf'
}
