import type { ExtractPropTypes, PropType } from 'vue'
export type ImageMagnifierPosition = 'right' | 'left' | 'inside'
export type ImageMagnifierMaskShape = 'square' | 'circle'
export interface ImageMagnifierImage {
  src: string
  zoomSrc?: string
  alt?: string
}
export declare const imageMagnifierProps: {
  /** 图片地址 */
  src: {
    type: StringConstructor
    default: string
  }
  /** 高清大图地址（可选，不填用 src） */
  zoomSrc: {
    type: StringConstructor
    default: string
  }
  /** 图片库模式：传入数组时开启多图切换 */
  images: {
    type: PropType<ImageMagnifierImage[]>
    default: () => never[]
  }
  /** 当前激活图片索引（v-model） */
  modelValue: {
    type: NumberConstructor
    default: number
  }
  /** 放大倍数 (初始) */
  scale: {
    type: NumberConstructor
    default: number
  }
  /** 允许滚轮动态调整倍率 */
  wheelZoom: {
    type: BooleanConstructor
    default: boolean
  }
  /** 滚轮缩放最小倍率 */
  minScale: {
    type: NumberConstructor
    default: number
  }
  /** 滚轮缩放最大倍率 */
  maxScale: {
    type: NumberConstructor
    default: number
  }
  /** 滚轮缩放步长 */
  scaleStep: {
    type: NumberConstructor
    default: number
  }
  /** 整体显示宽度 */
  width: {
    type: (StringConstructor | NumberConstructor)[]
    default: string
  }
  /** 整体显示高度 */
  height: {
    type: (StringConstructor | NumberConstructor)[]
    default: string
  }
  /** 放大区域显示模式（自动检测视口空间时传 'auto'） */
  position: {
    type: PropType<ImageMagnifierPosition | 'auto'>
    default: string
  }
  /** 放大区域与主图的间距 (px) */
  offset: {
    type: NumberConstructor
    default: number
  }
  /** 遮罩形状 */
  maskShape: {
    type: PropType<ImageMagnifierMaskShape>
    default: string
  }
  /** 遮罩宽度 (px) */
  maskWidth: {
    type: NumberConstructor
    default: number
  }
  /** 遮罩高度 (px) */
  maskHeight: {
    type: NumberConstructor
    default: number
  }
  /** 遮罩颜色 */
  maskColor: {
    type: StringConstructor
    default: string
  }
  /** 是否显示地图缩略导航 (Map Thumbnail) */
  showMinimap: {
    type: BooleanConstructor
    default: boolean
  }
  /** 是否显示边框 */
  border: {
    type: BooleanConstructor
    default: boolean
  }
  /** 是否显示阴影 */
  shadow: {
    type: BooleanConstructor
    default: boolean
  }
  /** 底部提示说明 */
  title: {
    type: StringConstructor
    default: string
  }
  /** 点击是否开启全屏预览 */
  clickToFullscreen: {
    type: BooleanConstructor
    default: boolean
  }
  /** 图片 alt 属性 */
  alt: {
    type: StringConstructor
    default: string
  }
  /** 加载状态颜色 */
  loadingColor: {
    type: StringConstructor
    default: string
  }
  /** 主题覆盖 */
  themeOverrides: {
    type: PropType<Record<string, string>>
    default: () => {}
  }
}
export type ImageMagnifierProps = ExtractPropTypes<typeof imageMagnifierProps>
export declare const imageMagnifierEmits: {
  enter: () => boolean
  leave: () => boolean
  'zoom-start': () => boolean
  'zoom-end': () => boolean
  'scale-change': (scale: number) => boolean
  'image-change': (index: number) => boolean
  'update:modelValue': (index: number) => boolean
}
export type ImageMagnifierEmits = typeof imageMagnifierEmits
export interface ImageMagnifierSlots {
  default?: () => unknown
  title?: () => unknown
  'close-icon'?: () => unknown
  fullscreen?: (props: { src: string; alt: string }) => unknown
}
export interface ImageMagnifierExpose {
  visible: boolean
  currentScale: number
  currentIndex: number
  switchImage: (index: number) => void
}
