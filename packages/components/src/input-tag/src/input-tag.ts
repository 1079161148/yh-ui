/**
 * InputTag Types & Props
 * @description 标签输入框组件类型定义
 */

import type { Component } from 'vue'

/**
 * 标签输入框尺寸
 */
export const inputTagSizes = ['large', 'default', 'small'] as const

export type InputTagSize = (typeof inputTagSizes)[number]

/**
 * 标签类型
 */
export const inputTagTypes = ['primary', 'success', 'warning', 'danger', 'info'] as const

export type InputTagType = (typeof inputTagTypes)[number]

/**
 * InputTag Props 定义
 */
export interface InputTagProps {
  /**
   * @description 绑定值（标签数组）
   */
  modelValue?: string[]

  /**
   * @description 标签类型
   * @default 'info'
   */
  type?: InputTagType

  /**
   * @description 尺寸
   * @default 'default'
   */
  size?: InputTagSize

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
   * @description 最大标签数量
   */
  max?: number

  /**
   * @description 分隔符（输入时按下分隔符会创建标签）
   * @default [',', 'Enter']
   */
  separator?: string | string[]

  /**
   * @description 输入框占位符
   */
  placeholder?: string

  /**
   * @description 是否可清空
   * @default false
   */
  clearable?: boolean

  /**
   * @description 是否在输入时添加
   * @default true
   */
  addOnBlur?: boolean

  /**
   * @description 输入框前缀文本
   */
  prefix?: string

  /**
   * @description 输入框后缀文本
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
   * @description 标签是否可关闭
   * @default true
   */
  closable?: boolean

  /**
   * @description 验证函数
   */
  validateTag?: (value: string) => boolean

  /**
   * @description 是否去除首尾空格
   * @default true
   */
  trim?: boolean

  /**
   * @description 是否允许重复标签
   * @default false
   */
  allowDuplicate?: boolean

  /**
   * @description 是否折叠标签
   * @default false
   */
  collapseTags?: boolean

  /**
   * @description 折叠标签时是否显示 tooltip
   * @default false
   */
  collapseTagsTooltip?: boolean

  /**
   * @description 最大折叠标签数量（超过此数量才折叠）
   * @default 1
   */
  maxCollapseTags?: number

  /**
   * @description 是否可拖拽排序
   * @default false
   */
  draggable?: boolean

  /**
   * @description 标签效果
   * @default 'light'
   */
  tagEffect?: 'dark' | 'light' | 'plain'

  /**
   * @description 是否在值改变或失去焦点时触发表单校验
   * @default true
   */
  validateEvent?: boolean
}

/**
 * InputTag Emits 定义
 */
export interface InputTagEmits {
  (e: 'update:modelValue', value: string[]): void
  (e: 'change', value: string[]): void
  (e: 'input', value: string): void
  (e: 'add', tag: string): void
  (e: 'remove', tag: string, index: number): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'clear'): void
  (e: 'drag-end', tags: string[]): void
}

/**
 * InputTag Slots 定义
 */
export interface InputTagSlots {
  /**
   * 自定义前缀内容
   */
  prefix?: () => void

  /**
   * 自定义后缀内容
   */
  suffix?: () => void

  /**
   * 自定义标签内容
   */
  tag?: (props: { tag: string; index: number; close: () => void }) => void

  /**
   * 自定义清除图标
   */
  clearIcon?: () => void

  /**
   * 自定义折叠标签内容
   */
  collapseTag?: (props: { count: number; tags: string[] }) => void
}

/**
 * InputTag Expose 定义
 */
export interface InputTagExpose {
  /**
   * 获取焦点
   */
  focus: () => void

  /**
   * 失去焦点
   */
  blur: () => void

  /**
   * 清空标签
   */
  clear: () => void
}
