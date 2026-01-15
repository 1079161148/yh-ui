import { defineComponent, h, computed, inject } from 'vue'
import type { ExtractPropTypes, PropType } from 'vue'
import { rowContextKey } from '../../row/src/row'
import { useNamespace } from '@yh-ui/hooks'

export const colProps = {
  tag: {
    type: String,
    default: 'div'
  },
  span: {
    type: Number,
    default: 24
  },
  offset: {
    type: Number,
    default: 0
  },
  push: {
    type: Number,
    default: 0
  },
  pull: {
    type: Number,
    default: 0
  },
  xs: {
    type: [Number, Object] as PropType<
      number | { span?: number; offset?: number; push?: number; pull?: number }
    >,
    default: () => ({})
  },
  sm: {
    type: [Number, Object] as PropType<
      number | { span?: number; offset?: number; push?: number; pull?: number }
    >,
    default: () => ({})
  },
  md: {
    type: [Number, Object] as PropType<
      number | { span?: number; offset?: number; push?: number; pull?: number }
    >,
    default: () => ({})
  },
  lg: {
    type: [Number, Object] as PropType<
      number | { span?: number; offset?: number; push?: number; pull?: number }
    >,
    default: () => ({})
  },
  xl: {
    type: [Number, Object] as PropType<
      number | { span?: number; offset?: number; push?: number; pull?: number }
    >,
    default: () => ({})
  }
} as const

export type ColProps = ExtractPropTypes<typeof colProps>

// We will reuse this logic in the vue file
