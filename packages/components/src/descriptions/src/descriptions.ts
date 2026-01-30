/**
 * Descriptions Types & Props
 * @description 描述列表组件类型定义，对标 市面组件库
 */

import type { ExtractPropTypes, PropType, InjectionKey, CSSProperties } from 'vue'

export const descriptionsProps = {
  title: String,
  extra: String,
  column: {
    type: Number,
    default: 3
  },
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal'
  },
  size: {
    type: String as PropType<'large' | 'default' | 'small'>,
    default: 'default'
  },
  border: {
    type: Boolean,
    default: false
  },
  colon: {
    type: Boolean,
    default: true
  },
  labelStyle: {
    type: Object as PropType<CSSProperties>
  },
  contentStyle: {
    type: Object as PropType<CSSProperties>
  },
  labelClassName: {
    type: String,
    default: ''
  },
  contentClassName: {
    type: String,
    default: ''
  }
} as const

export type DescriptionsProps = ExtractPropTypes<typeof descriptionsProps>

export const descriptionsItemProps = {
  label: {
    type: String,
    default: ''
  },
  span: {
    type: Number,
    default: 1
  },
  width: {
    type: [String, Number] as PropType<string | number>,
    default: ''
  },
  minWidth: {
    type: [String, Number] as PropType<string | number>,
    default: ''
  },
  align: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'left'
  },
  labelAlign: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'left'
  },
  className: {
    type: String,
    default: ''
  },
  labelClassName: {
    type: String,
    default: ''
  },
  labelStyle: {
    type: Object as PropType<CSSProperties>
  },
  contentStyle: {
    type: Object as PropType<CSSProperties>
  }
} as const

export type DescriptionsItemProps = ExtractPropTypes<typeof descriptionsItemProps>

export interface DescriptionsContext {
  props: DescriptionsProps
}

export const descriptionsKey: InjectionKey<DescriptionsContext> = Symbol('descriptionsKey')
