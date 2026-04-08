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
    type: [String, Array],
    default: "YH-UI"
  },
  /** 字体设置 */
  font: {
    type: Object,
    default: () => ({
      color: "rgba(0,0,0,0.15)",
      fontSize: 16,
      fontWeight: "normal",
      fontFamily: "sans-serif",
      fontStyle: "normal",
      textAlign: "center",
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
    type: Array,
    default: () => [100, 100]
  },
  /** 偏移 */
  offset: {
    type: Array,
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
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
