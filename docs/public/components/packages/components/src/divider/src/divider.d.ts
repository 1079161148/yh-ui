import type { PropType, ExtractPropTypes } from 'vue'
export declare const dividerProps: {
  /** 分割线方向 */
  readonly direction: {
    readonly type: PropType<'horizontal' | 'vertical'>
    readonly default: 'horizontal'
  }
  /** 文案位置 */
  readonly contentPosition: {
    readonly type: PropType<'left' | 'center' | 'right'>
    readonly default: 'center'
  }
  /** 分割线样式 */
  readonly borderStyle: {
    readonly type: PropType<'solid' | 'dashed' | 'dotted' | 'double'>
    readonly default: 'solid'
  }
  /** 分割线宽度 */
  readonly borderWidth: {
    readonly type: PropType<string | number>
    readonly default: ''
  }
  /** 分割线颜色 */
  readonly color: {
    readonly type: StringConstructor
    readonly default: ''
  }
  /** 主题覆盖变量 */
  readonly themeOverrides: {
    readonly type: PropType<import('@yh-ui/theme').ComponentThemeVars>
    readonly default: undefined
  }
}
export type DividerProps = ExtractPropTypes<typeof dividerProps>
