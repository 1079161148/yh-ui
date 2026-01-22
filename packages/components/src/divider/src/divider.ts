import type { PropType, ExtractPropTypes } from 'vue'

export const dividerProps = {
  /** 分割线方向 */
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal'
  },
  /** 文案位置 */
  contentPosition: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'center'
  },
  /** 分割线样式 */
  borderStyle: {
    type: String as PropType<'solid' | 'dashed' | 'dotted' | 'double'>,
    default: 'solid'
  },
  /** 分割线宽度 */
  borderWidth: {
    type: [String, Number] as PropType<string | number>,
    default: ''
  },
  /** 分割线颜色 */
  color: {
    type: String,
    default: ''
  }
} as const

export type DividerProps = ExtractPropTypes<typeof dividerProps>
