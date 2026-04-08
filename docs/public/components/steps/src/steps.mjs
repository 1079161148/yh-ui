export const stepsDirections = ["horizontal", "vertical"];
export const stepsStatus = ["wait", "process", "finish", "error", "success"];
export const stepsProgressDot = ["default", "dot", "navigation"];
export const stepsSizes = ["default", "small"];
export const stepsLabelPlacements = ["horizontal", "vertical"];
export const stepsProps = {
  /** 当前激活步骤 */
  active: {
    type: Number,
    default: 0
  },
  /** 布局方向 */
  direction: {
    type: String,
    default: "horizontal"
  },
  /** 居中显示 */
  alignCenter: {
    type: Boolean,
    default: false
  },
  /** 简洁风格 */
  simple: {
    type: Boolean,
    default: false
  },
  /** 点状进度 */
  progressDot: {
    type: [Boolean, String],
    default: false
  },
  /** 设置结束步骤的状态 */
  finishStatus: {
    type: String,
    default: "finish"
  },
  /** 设置当前步骤的状态 */
  processStatus: {
    type: String,
    default: "process"
  },
  /** 每个 step 的间距 */
  space: {
    type: [Number, String],
    default: ""
  },
  /** 可点击切换步骤 */
  clickable: {
    type: Boolean,
    default: false
  },
  // ========== 新增功能 ==========
  /** 尺寸 */
  size: {
    type: String,
    default: "default"
  },
  /** 响应式布局 - 小屏幕自动切换为垂直 */
  responsive: {
    type: Boolean,
    default: false
  },
  /** 响应式断点（px） */
  responsiveBreakpoint: {
    type: Number,
    default: 768
  },
  /** 描述标签位置 */
  labelPlacement: {
    type: String,
    default: "horizontal"
  },
  /** 显示进度条连接线 */
  showProgress: {
    type: Boolean,
    default: false
  },
  /** 显示时间线 */
  showTimeline: {
    type: Boolean,
    default: false
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
export const stepsEmits = {
  change: (index) => typeof index === "number"
};
export const STEPS_INJECTION_KEY = Symbol("yhSteps");
