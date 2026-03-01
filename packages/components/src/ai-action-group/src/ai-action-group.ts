import type { ExtractPropTypes, PropType } from 'vue'

export type ActionItem =
  | string
  | {
      key: string
      icon?: string
      label?: string
      disabled?: boolean
      tooltip?: string
      [key: string]: unknown
    }

export const aiActionGroupProps = {
  /**
   * 操作项列表
   * 可以传简单的 string 如 ['copy', 'refresh', 'thumb-up']
   */
  items: {
    type: Array as PropType<ActionItem[]>,
    default: () => []
  },
  /**
   * 尺寸: small | default | large
   */
  size: {
    type: String as PropType<'small' | 'default' | 'large'>,
    default: 'small'
  },
  /**
   * 视觉变体: text | ghost | outlined
   */
  variant: {
    type: String as PropType<'text' | 'ghost' | 'outlined'>,
    default: 'text'
  },
  /**
   * 布局: horizontal | vertical
   */
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal'
  },
  /**
   * 主题覆盖变量
   */
  themeOverrides: {
    type: Object as PropType<import('@yh-ui/theme').ComponentThemeVars>,
    default: undefined
  }
} as const

export type AiActionGroupProps = ExtractPropTypes<typeof aiActionGroupProps>

export const aiActionGroupEmits = {
  /**
   * 点击操作项时触发
   */
  click: (key: string, _item: ActionItem) => !!key
}

export type AiActionGroupEmits = typeof aiActionGroupEmits
