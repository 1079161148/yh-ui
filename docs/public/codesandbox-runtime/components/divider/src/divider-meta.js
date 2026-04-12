const dividerProps = {
  /** 分割线方向 */
  direction: {
    type: String,
    default: "horizontal"
  },
  /** 文案位置 */
  contentPosition: {
    type: String,
    default: "center"
  },
  /** 分割线样式 */
  borderStyle: {
    type: String,
    default: "solid"
  },
  /** 分割线宽度 */
  borderWidth: {
    type: [String, Number],
    default: ""
  },
  /** 分割线颜色 */
  color: {
    type: String,
    default: ""
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
export {
  dividerProps
};
