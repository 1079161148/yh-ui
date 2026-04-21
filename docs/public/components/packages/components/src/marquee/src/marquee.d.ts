import type { ExtractPropTypes, PropType } from 'vue'
export declare const marqueeDirections: readonly ['horizontal', 'vertical']
export type MarqueeDirection = (typeof marqueeDirections)[number]
export declare const marqueeProps: {
  /** 滚动方向 */
  readonly direction: {
    readonly type: PropType<MarqueeDirection>
    readonly default: 'horizontal'
    readonly validator: (val: string) => boolean
  }
  /** 动画持续时间（秒），数值越小速度越快 */
  readonly duration: {
    readonly type: NumberConstructor
    readonly default: 20
  }
  /** 是否反向滚动 */
  readonly reverse: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 鼠标悬停时是否暂停 */
  readonly pauseOnHover: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /** 点击时是否暂停 */
  readonly pauseOnClick: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 内容项之间的间距 */
  readonly gap: {
    readonly type: PropType<number | string>
    readonly default: 0
  }
  /** 是否开启边缘渐变遮罩 */
  readonly gradient: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 渐变遮罩颜色 */
  readonly gradientColor: {
    readonly type: StringConstructor
    readonly default: '#ffffff'
  }
  /** 渐变遮罩宽度 */
  readonly gradientWidth: {
    readonly type: PropType<number | string>
    readonly default: '40px'
  }
  /** 是否自动填充，确保内容不足时也能实现无缝滚动 */
  readonly autoFill: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /** 是否播放动画 */
  readonly play: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /** 循环次数 (0 为无限循环) */
  readonly loop: {
    readonly type: NumberConstructor
    readonly default: 0
  }
  /** 滚动速度 (像素/秒)，设置后将忽略 duration */
  readonly speed: {
    readonly type: NumberConstructor
    readonly default: 0
  }
  /** 首次启动动画前的延迟时间 (秒) */
  readonly delay: {
    readonly type: NumberConstructor
    readonly default: 0
  }
  /** 每一轮循环结束后的停顿时间 (秒) */
  readonly loopDelay: {
    readonly type: NumberConstructor
    readonly default: 0
  }
  /** 当组件离开视口时是否自动暂停动画 (性能优化) */
  readonly pauseOnHidden: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /** 主题覆盖变量 */
  readonly themeOverrides: {
    readonly type: PropType<import('@yh-ui/theme').ComponentThemeVars>
    readonly default: undefined
  }
}
export type MarqueeProps = ExtractPropTypes<typeof marqueeProps>
export declare const marqueeEmits: {
  /** 每次滚动循环完成时触发 */
  cycleComplete: () => boolean
}
export type MarqueeEmits = typeof marqueeEmits
export interface MarqueeSlots {
  default?: () => unknown
}
export interface MarqueeExpose {
  calculateClones: () => Promise<void>
  containerRef: import('vue').Ref<HTMLElement | null>
  contentRef: import('vue').Ref<HTMLElement | null>
}
