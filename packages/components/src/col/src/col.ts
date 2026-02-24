import type { ExtractPropTypes, PropType } from 'vue'

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
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object as PropType<import('@yh-ui/theme').ComponentThemeVars>,
    default: undefined
  }
} as const

export type ColProps = ExtractPropTypes<typeof colProps>

// We will reuse this logic in the vue file
