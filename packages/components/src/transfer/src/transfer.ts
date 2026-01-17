/**
 * Transfer Types & Props
 * @description 穿梭框组件类型定义
 */

import type { Component, InjectionKey, VNode } from 'vue'

/**
 * 穿梭框尺寸
 */
export const transferSizes = ['large', 'default', 'small'] as const

export type TransferSize = (typeof transferSizes)[number]

/**
 * 穿梭框数据项类型
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
  /**
   * @description 指定数据源中的 key 字段
   * @default 'key'
   */
  key?: string
  /**
   * @description 指定数据源中的 label 字段
   * @default 'label'
   */
  label?: string
  /**
   * @description 指定数据源中的 disabled 字段
   * @default 'disabled'
   */
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
  /**
   * @description 绑定值
   */
  modelValue?: TransferKey[]

  /**
   * @description Transfer 数据源
   * @default []
   */
  data?: TransferData[]

  /**
   * @description 是否可搜索
   * @default false
   */
  filterable?: boolean

  /**
   * @description 自定义过滤方法
   */
  filterMethod?: TransferFilterMethod

  /**
   * @description 搜索框占位符
   * @default '请输入关键词'
   */
  filterPlaceholder?: string

  /**
   * @description 目标列表元素的排列顺序
   * @default 'original'
   */
  targetOrder?: TargetOrder

  /**
   * @description 自定义列表标题
   * @default ['列表 1', '列表 2']
   */
  titles?: string[]

  /**
   * @description 自定义按钮文案
   * @default []
   */
  buttonTexts?: string[]

  /**
   * @description 自定义渲染函数
   */
  renderContent?: TransferRenderContent

  /**
   * @description 自定义列表列表样式
   * @default 'list'
   */
  format?: Record<string, boolean | number>

  /**
   * @description 左侧面板初始勾选的数据项
   * @default []
   */
  leftDefaultChecked?: TransferKey[]

  /**
   * @description 右侧面板初始勾选的数据项
   * @default []
   */
  rightDefaultChecked?: TransferKey[]

  /**
   * @description 数据源的字段别名
   */
  props?: TransferPropsAlias

  /**
   * @description 是否禁用
   * @default false
   */
  disabled?: boolean

  /**
   * @description 穿梭框尺寸
   * @default 'default'
   */
  size?: TransferSize

  /**
   * @description 验证事件触发
   * @default true
   */
  validateEvent?: boolean

  /**
   * @description 是否开启虚拟滚动
   * @default false
   */
  virtual?: boolean

  /**
   * @description 虚拟滚动每项高度
   * @default 40
   */
  itemHeight?: number

  /**
   * @description 列表高度
   * @default 280
   */
  height?: number

  /**
   * @description 左侧面板标题
   */
  leftTitle?: string

  /**
   * @description 右侧面板标题
   */
  rightTitle?: string

  /**
   * @description 是否显示全选按钮
   * @default true
   */
  showAllCheckbox?: boolean

  /**
   * @description 自定义空状态内容
   */
  emptyText?: string

  /**
   * @description 左侧列表为空时显示的文本
   */
  leftEmptyText?: string

  /**
   * @description 右侧列表为空时显示的文本
   */
  rightEmptyText?: string
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
 * Transfer Slots 定义
 */
export interface TransferSlots {
  /**
   * 自定义数据项内容
   */
  default?: (props: { option: TransferData }) => VNode[]
  /**
   * 左侧面板头部内容
   */
  'left-header'?: () => VNode[]
  /**
   * 右侧面板头部内容
   */
  'right-header'?: () => VNode[]
  /**
   * 左侧面板底部内容
   */
  'left-footer'?: () => VNode[]
  /**
   * 右侧面板底部内容
   */
  'right-footer'?: () => VNode[]
  /**
   * 左侧面板空状态内容
   */
  'left-empty'?: () => VNode[]
  /**
   * 右侧面板空状态内容
   */
  'right-empty'?: () => VNode[]
  /**
   * 穿梭按钮区域
   */
  buttons?: (props: {
    moveToLeft: () => void
    moveToRight: () => void
    leftChecked: TransferKey[]
    rightChecked: TransferKey[]
  }) => VNode[]
}

/**
 * Transfer Expose 定义
 */
export interface TransferExpose {
  /**
   * 清空左侧面板选中状态
   */
  clearLeftChecked: () => void
  /**
   * 清空右侧面板选中状态
   */
  clearRightChecked: () => void
  /**
   * 获取左侧面板组件实例
   */
  leftPanel: TransferPanelExpose | undefined
  /**
   * 获取右侧面板组件实例
   */
  rightPanel: TransferPanelExpose | undefined
}

/**
 * Transfer Panel Props 定义
 */
export interface TransferPanelProps {
  /**
   * @description 面板数据
   */
  data?: TransferData[]

  /**
   * @description 已选中的 keys
   */
  checked?: TransferKey[]

  /**
   * @description 面板标题
   */
  title?: string

  /**
   * @description 是否可搜索
   */
  filterable?: boolean

  /**
   * @description 搜索框占位符
   */
  filterPlaceholder?: string

  /**
   * @description 自定义过滤方法
   */
  filterMethod?: TransferFilterMethod

  /**
   * @description 是否禁用
   */
  disabled?: boolean

  /**
   * @description 面板尺寸
   */
  size?: TransferSize

  /**
   * @description 字段别名
   */
  props?: TransferPropsAlias

  /**
   * @description 自定义渲染函数
   */
  renderContent?: TransferRenderContent

  /**
   * @description 是否开启虚拟滚动
   */
  virtual?: boolean

  /**
   * @description 虚拟滚动每项高度
   */
  itemHeight?: number

  /**
   * @description 列表高度
   */
  height?: number

  /**
   * @description 是否显示全选按钮
   */
  showAllCheckbox?: boolean

  /**
   * @description 空状态文本
   */
  emptyText?: string
}

/**
 * Transfer Panel Emits 定义
 */
export interface TransferPanelEmits {
  (e: 'update:checked', value: TransferKey[]): void
  (e: 'checked-change', value: TransferKey[], movedKeys?: TransferKey[]): void
}

/**
 * Transfer Panel Expose 定义
 */
export interface TransferPanelExpose {
  /**
   * 清空选中状态
   */
  clearChecked: () => void
  /**
   * 获取搜索框值
   */
  query: string
}

/**
 * Transfer Panel 上下文
 */
export interface TransferPanelContext {
  props: TransferPanelProps
  checked: TransferKey[]
  handleCheck: (key: TransferKey, checked: boolean) => void
}

/**
 * Transfer Panel 注入 Key
 */
export const transferPanelContextKey: InjectionKey<TransferPanelContext> =
  Symbol('transferPanelContextKey')
