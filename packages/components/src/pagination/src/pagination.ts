/**
 * Pagination Types & Props
 * @description 分页组件类型定义
 */

import type { ExtractPropTypes, PropType } from 'vue'

export const paginationLayouts = [
  'prev',
  'pager',
  'next',
  'jumper',
  'total',
  'sizes',
  'slot'
] as const
export type PaginationLayout = (typeof paginationLayouts)[number]

export const paginationProps = {
  /**
   * @description 当前页码
   * @default 1
   */
  currentPage: {
    type: Number,
    default: 1
  },
  /**
   * @description 总条数
   * @default 0
   */
  total: {
    type: Number,
    default: 0
  },
  /**
   * @description 每页条数
   * @default 10
   */
  pageSize: {
    type: Number,
    default: 10
  },
  /**
   * @description 每页显示个数选择器的选项设置
   * @default [10, 20, 30, 40, 50, 100]
   */
  pageSizes: {
    type: Array as PropType<number[]>,
    default: () => [10, 20, 30, 40, 50, 100]
  },
  /**
   * @description 组件布局，子组件名用逗号隔开
   * @default 'prev, pager, next'
   */
  layout: {
    type: String,
    default: 'prev, pager, next'
  },
  /**
   * @description 页码按钮的数量，当总页数超过该值时会折叠
   * @default 7
   */
  pagerCount: {
    type: Number,
    default: 7
  },
  /**
   * @description 是否为背景颜色模式
   * @default false
   */
  background: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否使用小型分页
   * @default false
   */
  small: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否禁用
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * @description 只有一页时是否隐藏
   * @default false
   */
  hideOnSinglePage: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否使用圆形分页
   * @default false
   */
  circle: {
    type: Boolean,
    default: false
  },
  /**
   * @description 替代图标的文字 - 上一页
   */
  prevText: String,
  /**
   * @description 替代图标的文字 - 下一页
   */
  nextText: String
} as const

export type PaginationProps = ExtractPropTypes<typeof paginationProps>

export interface PaginationEmits {
  (e: 'update:currentPage', val: number): void
  (e: 'update:pageSize', val: number): void
  (e: 'current-change', val: number): void
  (e: 'size-change', val: number): void
  (e: 'prev-click', val: number): void
  (e: 'next-click', val: number): void
}

export interface PaginationExpose {
  /**
   * 当前页码
   */
  currentPage: number
  /**
   * 每页条数
   */
  pageSize: number
  /**
   * 总页数
   */
  pageCount: number
}
