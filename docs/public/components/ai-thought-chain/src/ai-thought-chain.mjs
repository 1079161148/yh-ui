export const aiThoughtChainProps = {
  /**
   * @description 思考标题 (单节点模式)
   */
  title: String,
  /**
   * @description 是否正在思考 (兼容旧版，新版推荐 status)
   */
  thinking: {
    type: Boolean,
    default: false
  },
  /**
   * @description 显示内容 (单节点模式)
   */
  content: String,
  /**
   * @description 当前总状态
   */
  status: {
    type: String,
    default: "none"
  },
  /**
   * @description 推理链节点列表，如果提供了 items，将启用多节点时间轴模式
   */
  items: {
    type: Array,
    default: () => []
  },
  /**
   * @description 当状态变为已完成时是否自动收起
   */
  autoCollapse: {
    type: Boolean,
    default: true
  },
  /**
   * @description 节点圆点大小
   */
  dotSize: {
    type: String,
    default: "default"
  },
  /**
   * @description 节点连接线是否显示渐变
   */
  lineGradient: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否显示进度百分比
   */
  showProgress: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否启用拖拽排序
   */
  draggable: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否启用节点操作（添加/删除）
   */
  editable: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否支持 Markdown 渲染节点内容
   */
  markdown: {
    type: Boolean,
    default: true
  },
  /**
   * @description 样式类名
   */
  className: {
    type: String,
    default: ""
  },
  /**
   * @description 样式类名（语义化）
   */
  classNames: {
    type: Object,
    default: () => ({})
  },
  /**
   * @description 样式对象
   */
  styles: {
    type: Object,
    default: () => ({})
  },
  /**
   * @description 自定义样式
   */
  style: {
    type: Object,
    default: () => ({})
  },
  /**
   * @description 主题覆盖变量
   */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
export const aiThoughtChainEmits = {
  "update:items": (items) => Array.isArray(items),
  "node-click": (item, index) => typeof index === "number",
  "node-delete": (item, index) => typeof index === "number",
  "node-add": (index) => typeof index === "number",
  reorder: (items) => Array.isArray(items)
};
