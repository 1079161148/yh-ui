const carouselProps = {
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
    default: 3e3
  },
  /** 是否循环播放 */
  loop: {
    type: Boolean,
    default: true
  },
  /** 过渡效果 */
  effect: {
    type: String,
    default: "slide"
  },
  /** 轮播方向 */
  direction: {
    type: String,
    default: "horizontal"
  },
  /** 箭头的显示时机 */
  showArrow: {
    type: String,
    default: "hover"
  },
  /** 是否显示指示点 */
  showDots: {
    type: Boolean,
    default: true
  },
  /** 指示点触发方式 */
  dotTrigger: {
    type: String,
    default: "click"
  },
  /** 指示点位置 */
  dotPlacement: {
    type: String,
    default: "bottom"
  },
  /** 指示标的类型 */
  dotType: {
    type: String,
    default: "dot"
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
    type: [Number, String],
    default: 1
  },
  /** 切换动画的时长 */
  duration: {
    type: Number,
    default: 500
  },
  /** 主题覆盖 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
const carouselEmits = {
  "update:currentIndex": (index) => typeof index === "number",
  change: (index, prevIndex) => typeof index === "number" && typeof prevIndex === "number"
};
const CAROUSEL_INJECTION_KEY = Symbol("YhCarousel");
export {
  CAROUSEL_INJECTION_KEY,
  carouselEmits,
  carouselProps
};
