import type { ExtractPropTypes, PropType, CSSProperties } from 'vue'

export const watermarkProps = {
  /** 宽度 */
  width: {
    type: Number,
    default: 120
  },
  /** 高度 */
  height: {
    type: Number,
    default: 64
  },
  /** 旋转角度 */
  rotate: {
    type: Number,
    default: -22
  },
  /** z-index */
  zIndex: {
    type: Number,
    default: 9
  },
  /** 图片源 */
  image: String,
  /** 文字内容 */
  content: {
    type: [String, Array] as PropType<string | string[]>,
    default: 'YH-UI'
  },
  /** 字体设置 */
  font: {
    type: Object as PropType<{
      color?: string
      fontSize?: number | string
      fontWeight?: string | number
      fontFamily?: string
      fontStyle?: 'normal' | 'italic' | 'oblique'
      textAlign?: 'start' | 'end' | 'left' | 'right' | 'center'
      lineHeight?: number
    }>,
    default: () => ({
      color: 'rgba(0,0,0,0.15)',
      fontSize: 16,
      fontWeight: 'normal',
      fontFamily: 'sans-serif',
      fontStyle: 'normal',
      textAlign: 'center',
      lineHeight: 22
    })
  },
  /** 整体旋转角度 */
  globalRotate: {
    type: Number,
    default: 0
  },
  /** 间距 */
  gap: {
    type: Array as unknown as PropType<[number, number]>,
    default: () => [100, 100]
  },
  /** 偏移 */
  offset: {
    type: Array as unknown as PropType<[number, number]>,
    default: () => [0, 0]
  },
  /** 是否全屏 */
  fullScreen: {
    type: Boolean,
    default: false
  },
  /** 防篡改 */
  antiTamper: {
    type: Boolean,
    default: true
  }
} as const

export type WatermarkProps = ExtractPropTypes<typeof watermarkProps>
