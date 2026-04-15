export const spinProps = {
  /** 是否开启加载状态 */
  show: {
    type: Boolean,
    default: true
  },
  /** 描述文字 */
  tip: String,
  /** 尺寸: small, default, large 或自定义数字 px */
  size: {
    type: [String, Number],
    default: "default"
  },
  /** 是否垂直排列 */
  vertical: {
    type: Boolean,
    default: false
  },
  /** 延迟显示时间 (ms)，防闪烁 */
  delay: {
    type: Number,
    default: 0
  },
  /** 是否开启全屏 glass 遮罩模式 */
  glass: {
    type: Boolean,
    default: false
  },
  /** 是否使用点状动画逻辑 (灵感来自 Antd) */
  dot: {
    type: Boolean,
    default: false
  },
  /**
   * 加载样式类型
   * circle: 默认环形
   * chaser: 追逐点 (Image 0)
   * gear: 齿轮线 (Image 1)
   * dual-ring: 双环 (Image 2)
   * rect: 矩阵块 (Image 3)
   */
  type: {
    type: String,
    default: "circle"
  },
  /** 自定义颜色 (支持十六进制、RGB、CSS 渐变字符串或渐变配置对象) */
  color: {
    type: [String, Object, Array]
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
export const spinEmits = {
  show: () => true,
  hide: () => true
};
