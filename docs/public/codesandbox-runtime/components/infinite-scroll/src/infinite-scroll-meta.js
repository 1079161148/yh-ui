const infiniteScrollProps = {
  /** 是否正在加载 */
  loading: {
    type: Boolean,
    default: false
  },
  /** 是否已加载完全部数据 */
  finished: {
    type: Boolean,
    default: false
  },
  /** 是否加载失败 */
  error: {
    type: Boolean,
    default: false
  },
  /** 触发加载的距离阈值 (px) */
  threshold: {
    type: Number,
    default: 100
  },
  /** 滚动方向 */
  direction: {
    type: String,
    default: 'vertical'
  },
  /** 加载中的提示文字 */
  loadingText: {
    type: String,
    default: ''
  },
  /** 加载完成的提示文字 */
  finishedText: {
    type: String,
    default: ''
  },
  /** 加载失败的提示文字 */
  errorText: {
    type: String,
    default: ''
  },
  /** 是否在初始化时立即检查是否需要加载 */
  immediateCheck: {
    type: Boolean,
    default: true
  },
  /** 是否禁用滚动加载 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 指定滚动容器选择器 */
  target: {
    type: String,
    default: ''
  },
  /** 是否使用 IntersectionObserver (推荐) */
  useObserver: {
    type: Boolean,
    default: true
  },
  /** IntersectionObserver 的 root margin */
  rootMargin: {
    type: String,
    default: '0px'
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
}
const infiniteScrollEmits = {
  /** 触发加载更多 */
  load: () => true,
  /** 更新 loading 状态 */
  'update:loading': (val) => typeof val === 'boolean',
  /** 更新 error 状态 */
  'update:error': (val) => typeof val === 'boolean'
}
export { infiniteScrollEmits, infiniteScrollProps }
