/**
 * Carousel Types & Props
 */
import type { ExtractPropTypes, PropType, InjectionKey, Ref } from 'vue'
import type { ComponentThemeVars } from '@yh-ui/theme'

export type CarouselEffect =
  | 'slide'
  | 'fade'
  | 'card'
  | 'coverflow'
  | 'zoom'
  | 'perspective'
  | 'dissolve'
  | 'cloud'
  | 'wave'
  | 'radial'
  | 'fiber'
  | 'custom'
  // 3D 立体旋转 / 空间感 / 凸出效果
  | 'cube'
  | 'flip'
  | 'cylinder'
  | 'stack'
  | 'parallax'
  | 'popout'
  | 'rotate3d'
  // Swiper 特效/卡片、3D 折页立体焦点
  | 'cards'
  | 'fold'
export type CarouselDirection = 'horizontal' | 'vertical'
export type CarouselArrow = 'always' | 'hover' | 'never'
export type CarouselTrigger = 'click' | 'hover'
export type CarouselDotPlacement =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'inner-top'
  | 'inner-bottom'
  | 'inner-left'
  | 'inner-right'

export const carouselProps = {
  /** 当前展示索引 */
  currentIndex: {
    type: Number,
    default: 0
  },
  /** 默认展示索引 */
  defaultIndex: {
    type: Number,
    default: 0
  },
  /** 是否自动播放 */
  autoplay: {
    type: Boolean,
    default: false
  },
  /** 自动播放间隔（ms） */
  interval: {
    type: Number,
    default: 3000
  },
  /** 是否循环播放 */
  loop: {
    type: Boolean,
    default: true
  },
  /** 过渡效果 */
  effect: {
    type: String as PropType<CarouselEffect>,
    default: 'slide'
  },
  /** 轮播方向 */
  direction: {
    type: String as PropType<CarouselDirection>,
    default: 'horizontal'
  },
  /** 箭头的显示时机 */
  showArrow: {
    type: String as PropType<CarouselArrow>,
    default: 'hover'
  },
  /** 是否显示指示点 */
  showDots: {
    type: Boolean,
    default: true
  },
  /** 指示点触发方式 */
  dotTrigger: {
    type: String as PropType<CarouselTrigger>,
    default: 'click'
  },
  /** 指示点位置 */
  dotPlacement: {
    type: String as PropType<CarouselDotPlacement>,
    default: 'bottom'
  },
  /** 指示标的类型 */
  dotType: {
    type: String as PropType<'dot' | 'line'>,
    default: 'dot'
  },
  /** 是否开启键盘控制 */
  keyboard: {
    type: Boolean,
    default: false
  },
  /** 是否在鼠标悬浮时暂停自动播放 */
  pauseOnHover: {
    type: Boolean,
    default: true
  },
  /** 是否可以拖拽切换 */
  draggable: {
    type: Boolean,
    default: false
  },
  /** 是否允许通过鼠标滚轮切换 */
  mousewheel: {
    type: Boolean,
    default: false
  },
  /** 轮播项之间的间距 (slide 模式) */
  spaceBetween: {
    type: Number,
    default: 0
  },
  /** 相邻卡片之间的间距 (card 模式) */
  cardGutter: {
    type: Number,
    default: 20
  },
  /** 每屏显示数量 */
  slidesPreView: {
    type: [Number, String] as PropType<number | 'auto'>,
    default: 1
  },
  /** 切换动画的时长 */
  duration: {
    type: Number,
    default: 500
  },
  /** 主题覆盖 */
  themeOverrides: {
    type: Object as PropType<ComponentThemeVars>,
    default: undefined
  }
} as const

export type CarouselProps = ExtractPropTypes<typeof carouselProps>

export const carouselEmits = {
  'update:currentIndex': (index: number) => typeof index === 'number',
  change: (index: number, prevIndex: number) =>
    typeof index === 'number' && typeof prevIndex === 'number'
}

export type CarouselEmits = typeof carouselEmits

export interface CarouselSlots {
  default?: () => unknown
  dots?: (props: {
    total: number
    currentIndex: number
    to: (index: number) => void
  }) => unknown
  arrow?: (props: {
    total: number
    currentIndex: number
    to: (index: number) => void
    prev: () => void
    next: () => void
  }) => unknown
  'prev-arrow'?: () => unknown
  'next-arrow'?: () => unknown
}

export interface CarouselExpose {
  prev: () => void
  next: () => void
  jump: (index: number) => void
  to: (index: number) => void
  getCurrentIndex: () => number
  currentIndex: number
}

// 注入上下文定义
export interface CarouselContext {
  props: CarouselProps
  itemCount: Ref<number>
  currentIndex: Ref<number>
  prevIndex: Ref<number>
  direction: Ref<CarouselDirection>
  effect: Ref<CarouselEffect>
  shouldRenderItem?: (index: number) => boolean // 新增：懒渲染判断
  addItem: (id: string) => void
  removeItem: (id: string) => void
  getItemIndex: (id: string) => number
  jump: (index: number) => void
}

export const CAROUSEL_INJECTION_KEY: InjectionKey<CarouselContext> = Symbol('YhCarousel')
