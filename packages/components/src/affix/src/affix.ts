import type { ExtractPropTypes, PropType, CSSProperties } from 'vue'

export type AffixPosition = 'top' | 'bottom'

export const affixProps = {
  /** 距离窗口顶部/底部达到指定偏移量后触发固定 */
  offset: {
    type: Number,
    default: 0
  },
  /** 固定位置 */
  position: {
    type: String as PropType<AffixPosition>,
    default: 'top'
  },
  /** 指定容器选择器（默认为 window） */
  target: {
    type: String,
    default: ''
  },
  /** 固定时层级 */
  zIndex: {
    type: Number,
    default: 100
  },
  /** 是否将固定元素 Teleport 到 body，解决父级 transform 导致的定位失效问题 */
  teleported: {
    type: Boolean,
    default: false
  },
  /** Affix 元素将被挂载至哪个元素 */
  appendTo: {
    type: [String, Object] as PropType<string | HTMLElement>,
    default: 'body'
  },
  /** 自定义固定状态样式 */
  affixStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => ({})
  },
  /** 是否禁用固钉 */
  disabled: {
    type: Boolean,
    default: false
  }
} as const

export const affixEmits = {
  /** 固定状态改变时触发 */
  change: (fixed: boolean) => typeof fixed === 'boolean',
  /** 滚动时触发 */
  scroll: (payload: { scrollTop: number; fixed: boolean }) =>
    typeof payload.scrollTop === 'number' && typeof payload.fixed === 'boolean'
}

export type AffixProps = ExtractPropTypes<typeof affixProps>
export type AffixEmits = typeof affixEmits
