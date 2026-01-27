import type { ExtractPropTypes, PropType } from 'vue'

export const marqueeDirections = ['horizontal', 'vertical'] as const
export type MarqueeDirection = (typeof marqueeDirections)[number]

export const marqueeProps = {
  /** 滚动方向 */
  direction: {
    type: String as PropType<MarqueeDirection>,
    default: 'horizontal',
    validator: (val: string) => (marqueeDirections as readonly string[]).includes(val)
  },
  /** 动画持续时间（秒），数值越小速度越快 */
  duration: {
    type: Number,
    default: 20
  },
  /** 是否反向滚动 */
  reverse: {
    type: Boolean,
    default: false
  },
  /** 鼠标悬停时是否暂停 */
  pauseOnHover: {
    type: Boolean,
    default: true
  },
  /** 点击时是否暂停 */
  pauseOnClick: {
    type: Boolean,
    default: false
  },
  /** 内容项之间的间距 */
  gap: {
    type: [Number, String] as PropType<number | string>,
    default: 0
  },
  /** 是否开启边缘渐变遮罩 */
  gradient: {
    type: Boolean,
    default: false
  },
  /** 渐变遮罩颜色 */
  gradientColor: {
    type: String,
    default: '#ffffff'
  },
  /** 渐变遮罩宽度 */
  gradientWidth: {
    type: [Number, String] as PropType<number | string>,
    default: '40px'
  },
  /** 是否自动填充，确保内容不足时也能实现无缝滚动 */
  autoFill: {
    type: Boolean,
    default: true
  },
  /** 是否播放动画 */
  play: {
    type: Boolean,
    default: true
  },
  /** 循环次数 (0 为无限循环) */
  loop: {
    type: Number,
    default: 0
  },
  /** 滚动速度 (像素/秒)，设置后将忽略 duration */
  speed: {
    type: Number,
    default: 0
  },
  /** 首次启动动画前的延迟时间 (秒) */
  delay: {
    type: Number,
    default: 0
  },
  /** 每一轮循环结束后的停顿时间 (秒) */
  loopDelay: {
    type: Number,
    default: 0
  },
  /** 当组件离开视口时是否自动暂停动画 (性能优化) */
  pauseOnHidden: {
    type: Boolean,
    default: true
  }
} as const

export type MarqueeProps = ExtractPropTypes<typeof marqueeProps>

export const marqueeEmits = {
  /** 每次滚动循环完成时触发 */
  cycleComplete: () => true
}

export type MarqueeEmits = typeof marqueeEmits
