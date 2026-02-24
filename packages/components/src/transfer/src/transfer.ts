/**
 * Transfer Types & Props
 * @description 穿梭框组件类型定义，严格类型化
 */

import type { InjectionKey, VNode } from 'vue'

/**
 * 穿梭框尺寸
 */
export const transferSizes = ['large', 'default', 'small'] as const
export type TransferSize = (typeof transferSizes)[number]

/**
 * 穿梭框数据项关键键类型
 */
export type TransferKey = string | number

/**
 * 穿梭框数据项
 */
export interface TransferData {
  key: TransferKey
  label: string
  disabled?: boolean
  [key: string]: unknown
}

/**
 * 穿梭框数据项类型别名
 */
export interface TransferPropsAlias {
  key?: string
  label?: string
  disabled?: string
}

/**
 * 穿梭方向
 */
export type TransferDirection = 'left' | 'right'

/**
 * 穿梭框策略
 */
export type TargetOrder = 'original' | 'push' | 'unshift'

/**
 * 自定义渲染函数
 */
export type TransferRenderContent = (
  h: typeof import('vue').h,
  data: TransferData
) => VNode | string

/**
 * 过滤方法
 */
export type TransferFilterMethod = (query: string, item: TransferData) => boolean

/**
 * Transfer Props 定义
 */
export interface TransferProps {
  /** 绑定值 */
  modelValue?: TransferKey[]
  /** 数据源 */
  data?: TransferData[]
  /** 是否可搜索 */
  filterable?: boolean
  /** 自定义过滤方法 */
  filterMethod?: TransferFilterMethod
  /** 搜索框占位符 */
  filterPlaceholder?: string
  /** 目标列表元素的排列顺序 */
  targetOrder?: TargetOrder
  /** 自定义列表标题 */
  titles?: string[]
  /** 自定义按钮文案 */
  buttonTexts?: string[]
  /** 自定义渲染函数 */
  renderContent?: TransferRenderContent
  /** 左侧面板初始勾选的数据项 */
  leftDefaultChecked?: TransferKey[]
  /** 右侧面板初始勾选的数据项 */
  rightDefaultChecked?: TransferKey[]
  /** 数据源的字段别名 */
  props?: TransferPropsAlias
  /** 是否禁用 */
  disabled?: boolean
  /** 穿梭框尺寸 */
  size?: TransferSize
  /** 验证事件触发 */
  validateEvent?: boolean
  /** 是否开启虚拟滚动 */
  virtual?: boolean
  /** 虚拟滚动每项高度 */
  itemHeight?: number
  /** 列表高度 */
  height?: number
  /** 左侧面板标题 */
  leftTitle?: string
  /** 右侧面板标题 */
  rightTitle?: string
  /** 是否显示全选按钮 */
  showAllCheckbox?: boolean
  /** 自定义空状态内容 */
  emptyText?: string
  /** 左侧列表为空时显示的文本 */
  leftEmptyText?: string
  /** 右侧列表为空时显示的文本 */
  rightEmptyText?: string
  /** 主题覆盖变量 */
  themeOverrides?: import('@yh-ui/theme').ComponentThemeVars
}

/**
 * Transfer Emits 定义
 */
export interface TransferEmits {
  (e: 'update:modelValue', value: TransferKey[]): void
  (e: 'change', value: TransferKey[], direction: TransferDirection, movedKeys: TransferKey[]): void
  (e: 'left-check-change', value: TransferKey[], movedKeys?: TransferKey[]): void
  (e: 'right-check-change', value: TransferKey[], movedKeys?: TransferKey[]): void
}

/**
 * Transfer Panel Expose 定义
 */
export interface TransferPanelExpose {
  clearChecked: () => void
  query: string
}

/**
 * Transfer Expose 定义
 */
export interface TransferExpose {
  clearLeftChecked: () => void
  clearRightChecked: () => void
  leftPanel: TransferPanelExpose | undefined
  rightPanel: TransferPanelExpose | undefined
}

/**
 * Transfer Panel Props 定义
 */
export interface TransferPanelProps {
  data: TransferData[]
  checked: TransferKey[]
  title?: string
  filterable?: boolean
  filterPlaceholder?: string
  filterMethod?: TransferFilterMethod
  disabled?: boolean
  size?: TransferSize
  props?: TransferPropsAlias
  renderContent?: TransferRenderContent
  virtual?: boolean
  itemHeight?: number
  height?: number
  showAllCheckbox?: boolean
  emptyText?: string
}

/**
 * Transfer Panel Emits 定义
 */
export interface TransferPanelEmits {
  (e: 'update:checked', value: TransferKey[]): void
  (e: 'checked-change', value: TransferKey[], movedKeys?: TransferKey[]): void
}

export interface TransferPanelContext {
  props: TransferPanelProps
  checked: TransferKey[]
  handleCheck: (key: TransferKey, checked: boolean) => void
}

export const transferPanelContextKey: InjectionKey<TransferPanelContext> =
  Symbol('transferPanelContextKey')
