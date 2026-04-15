import type { ExtractPropTypes, PropType } from 'vue'

export interface ColResponsiveValue {
  span?: number
  offset?: number
  push?: number
  pull?: number
}

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
    type: [Number, Object] as PropType<number | ColResponsiveValue>,
    default: () => ({})
  },
  sm: {
    type: [Number, Object] as PropType<number | ColResponsiveValue>,
    default: () => ({})
  },
  md: {
    type: [Number, Object] as PropType<number | ColResponsiveValue>,
    default: () => ({})
  },
  lg: {
    type: [Number, Object] as PropType<number | ColResponsiveValue>,
    default: () => ({})
  },
  xl: {
    type: [Number, Object] as PropType<number | ColResponsiveValue>,
    default: () => ({})
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object as PropType<import('@yh-ui/theme').ComponentThemeVars>,
    default: undefined
  }
} as const

export type ColProps = ExtractPropTypes<typeof colProps>

export interface ColSlots {
  default?: () => unknown
}

// We will reuse this logic in the vue file
