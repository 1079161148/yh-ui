import type { ExtractPropTypes, PropType } from 'vue'

export type ImageMagnifierPosition = 'right' | 'left' | 'inside'
export type ImageMagnifierMaskShape = 'square' | 'circle'

export interface ImageMagnifierImage {
  src: string
  zoomSrc?: string
  alt?: string
}

export const imageMagnifierProps = {
  /** 图片地址 */
  src: {
    type: String,
    default: ''
  },
  /** 高清大图地址（可选，不填用 src） */
  zoomSrc: {
    type: String,
    default: ''
  },
  /** 图片库模式：传入数组时开启多图切换 */
  images: {
    type: Array as PropType<ImageMagnifierImage[]>,
    default: () => []
  },
  /** 当前激活图片索引（v-model） */
  modelValue: {
    type: Number,
    default: 0
  },
  /** 放大倍数 (初始) */
  scale: {
    type: Number,
    default: 2
  },
  /** 允许滚轮动态调整倍率 */
  wheelZoom: {
    type: Boolean,
    default: false
  },
  /** 滚轮缩放最小倍率 */
  minScale: {
    type: Number,
    default: 1.2
  },
  /** 滚轮缩放最大倍率 */
  maxScale: {
    type: Number,
    default: 5
  },
  /** 滚轮缩放步长 */
  scaleStep: {
    type: Number,
    default: 0.3
  },
  /** 整体显示宽度 */
  width: {
    type: [Number, String],
    default: '100%'
  },
  /** 整体显示高度 */
  height: {
    type: [Number, String],
    default: 'auto'
  },
  /** 放大区域显示模式（自动检测视口空间时传 'auto'） */
  position: {
    type: String as PropType<ImageMagnifierPosition | 'auto'>,
    default: 'right'
  },
  /** 放大区域与主图的间距 (px) */
  offset: {
    type: Number,
    default: 10
  },
  /** 遮罩形状 */
  maskShape: {
    type: String as PropType<ImageMagnifierMaskShape>,
    default: 'square'
  },
  /** 遮罩宽度 (px) */
  maskWidth: {
    type: Number,
    default: 150
  },
  /** 遮罩高度 (px) */
  maskHeight: {
    type: Number,
    default: 150
  },
  /** 遮罩颜色 */
  maskColor: {
    type: String,
    default: 'rgba(0, 0, 0, 0.3)'
  },
  /** 是否显示地图缩略导航 (Map Thumbnail) */
  showMinimap: {
    type: Boolean,
    default: false
  },
  /** 是否显示边框 */
  border: {
    type: Boolean,
    default: false
  },
  /** 是否显示阴影 */
  shadow: {
    type: Boolean,
    default: false
  },
  /** 底部提示说明 */
  title: {
    type: String,
    default: ''
  },
  /** 点击是否开启全屏预览 */
  clickToFullscreen: {
    type: Boolean,
    default: false
  },
  /** 图片 alt 属性 */
  alt: {
    type: String,
    default: ''
  },
  /** 加载状态颜色 */
  loadingColor: {
    type: String,
    default: ''
  },
  /** 主题覆盖 */
  themeOverrides: {
    type: Object as PropType<Record<string, string>>,
    default: () => ({})
  }
}

export type ImageMagnifierProps = ExtractPropTypes<typeof imageMagnifierProps>

export const imageMagnifierEmits = {
  enter: () => true,
  leave: () => true,
  'zoom-start': () => true,
  'zoom-end': () => true,
  'scale-change': (scale: number) => typeof scale === 'number',
  'image-change': (index: number) => typeof index === 'number',
  'update:modelValue': (index: number) => typeof index === 'number'
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
