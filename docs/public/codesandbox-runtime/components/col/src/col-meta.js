const colProps = {
  tag: {
    type: String,
    default: "div"
  },
  span: {
    type: Number,
    default: 24
  },
  offset: {
    type: Number,
    default: 0
  },
  push: {
    type: Number,
    default: 0
  },
  pull: {
    type: Number,
    default: 0
  },
  xs: {
    type: [Number, Object],
    default: () => ({})
  },
  sm: {
    type: [Number, Object],
    default: () => ({})
  },
  md: {
    type: [Number, Object],
    default: () => ({})
  },
  lg: {
    type: [Number, Object],
    default: () => ({})
  },
  xl: {
    type: [Number, Object],
    default: () => ({})
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
export {
  colProps
};
