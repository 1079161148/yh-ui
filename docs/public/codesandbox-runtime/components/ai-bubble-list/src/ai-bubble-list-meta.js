const aiBubbleListProps = {
  /**
   * 消息列表
   */
  items: {
    type: Array,
    default: () => []
  },
  /**
   * 是否开启虚拟滚动
   */
  virtualScroll: {
    type: Boolean,
    default: false
  },
  /**
   * 虚拟滚动容器高度
   */
  height: {
    type: [Number, String],
    default: 400
  },
  /**
   * 预估项高度（用于虚拟滚动）
   */
  itemHeight: {
    type: Number,
    default: 80
  },
  /**
   * 自动滚动到底部
   */
  autoScroll: {
    type: Boolean,
    default: true
  },
  /**
   * 加载状态
   */
  loading: {
    type: Boolean,
    default: false
  },
  /**
   * 主题覆盖
   */
  themeOverrides: {
    type: Object,
    default: void 0
  }
}
export { aiBubbleListProps }
