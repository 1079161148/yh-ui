const aiMermaidProps = {
  /** Mermaid 代码内容 */
  code: {
    type: String,
    default: ""
  },
  /** 顶部内容 */
  header: {
    type: [String, Object],
    default: null
  },
  /** 样式类名 */
  className: {
    type: String,
    default: ""
  },
  /** 样式类名（语义化） */
  classNames: {
    type: Object,
    default: () => ({})
  },
  /** 样式对象 */
  styles: {
    type: Object,
    default: () => ({})
  },
  /** Mermaid 配置 */
  config: {
    type: Object,
    default: () => ({})
  },
  /** 操作栏配置 */
  actions: {
    type: Object,
    default: () => ({
      enableZoom: true,
      enableDownload: true,
      enableCopy: true
    })
  },
  /** 渲染类型切换回调 */
  onRenderTypeChange: {
    type: Function,
    default: void 0
  },
  /** 样式前缀 */
  prefixCls: {
    type: String,
    default: ""
  },
  /** 自定义样式 */
  style: {
    type: Object,
    default: () => ({})
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
const aiMermaidEmits = {
  "render-type-change": (_value) => true,
  error: (_error) => true,
  ready: () => true
};
export {
  aiMermaidEmits,
  aiMermaidProps
};
