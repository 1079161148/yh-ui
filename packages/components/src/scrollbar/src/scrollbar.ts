import type { ExtractPropTypes, PropType, InjectionKey, Ref, StyleValue } from 'vue'

export interface ScrollbarContext {
  wrapElement: Ref<HTMLDivElement | undefined>
}

export const SCROLLBAR_INJECTION_KEY: InjectionKey<ScrollbarContext> = Symbol('scrollbarContext')

export const scrollbarProps = {
  /**
   * @description 滚动条高度
   */
  height: {
    type: [String, Number] as PropType<string | number>,
    default: ''
  },
  /**
   * @description 滚动条最大高度
   */
  maxHeight: {
    type: [String, Number] as PropType<string | number>,
    default: ''
  },
  /**
   * @description 是否使用原生滚动条
   */
  native: {
    type: Boolean,
    default: false
  },
  /**
   * @description 滚动条是否总是显示
   */
  always: {
    type: Boolean,
    default: false
  },
  /**
   * @description 滚动块的最小尺寸
   */
  minSize: {
    type: Number,
    default: 20
  },
  /**
   * @description 视图的自定义类名
   */
  viewClass: {
    type: String,
    default: ''
  },
  /**
   * @description 视图的自定义样式
   */
  viewStyle: {
    type: [String, Array, Object] as PropType<StyleValue>,
    default: ''
  },
  /**
   * @description 是否不检查容器尺寸变化
   */
  noresize: Boolean,
  /**
   * @description 标签定义
   */
  tag: {
    type: String,
    default: 'div'
  },
  /**
   * @description 主题覆盖变量
   */
  themeOverrides: {
    type: Object as PropType<import('@yh-ui/theme').ComponentThemeVars>,
    default: undefined
  }
} as const

export type ScrollbarProps = ExtractPropTypes<typeof scrollbarProps>

export const scrollbarEmits = {
  scroll: ({ scrollLeft, scrollTop }: { scrollLeft: number; scrollTop: number }) =>
    typeof scrollLeft === 'number' && typeof scrollTop === 'number'
}

export type ScrollbarEmits = typeof scrollbarEmits
