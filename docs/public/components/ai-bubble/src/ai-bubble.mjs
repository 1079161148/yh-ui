export const aiBubbleProps = {
  /**
   * 气泡内容，支持 Markdown
   */
  content: {
    type: String,
    default: ""
  },
  /**
   * 是否开启 Markdown 解析
   */
  markdown: {
    type: Boolean,
    default: true
  },
  /**
   * 角色：用户、助手或系统
   */
  role: {
    type: String,
    default: "assistant"
  },
  /**
   * 气泡位置
   */
  placement: {
    type: String
  },
  /**
   * 气泡形状
   */
  shape: {
    type: String,
    default: "round"
  },
  /**
   * 视觉变体
   */
  variant: {
    type: String,
    default: "filled"
  },
  /**
   * 显示时间
   */
  time: String,
  /**
   * 头像地址
   */
  avatar: String,
  /**
   * 是否在加载中
   */
  loading: Boolean,
  /**
   * 打字机特效
   */
  typing: Boolean,
  /**
   * 启用流式增量渲染（逐字/逐句/逐段显示）
   */
  streaming: {
    type: Boolean,
    default: false
  },
  /**
   * 流式渲染模式：逐词 | 逐句 | 逐段
   */
  streamMode: {
    type: String,
    default: "word"
  },
  /**
   * 流式渲染速度（每次渲染的字符数，仅 word 模式有效）
   */
  streamSpeed: {
    type: Number,
    default: 1
  },
  /**
   * 流式渲染间隔（毫秒）
   */
  streamInterval: {
    type: Number,
    default: 20
  },
  /**
   * 流式渲染完成回调
   */
  onStreamComplete: {
    type: Function
  },
  /**
   * 引用来源列表 (Citations)
   */
  citations: {
    type: Array,
    default: () => []
  },
  /**
   * 多模态内容 (图片、音频、文件等)
   */
  multimodal: {
    type: Array,
    default: () => []
  },
  /**
   * Markdown 配置选项
   */
  markdownOptions: {
    type: Object,
    default: () => ({})
  },
  /**
   * 结构化数据（JSON/表格/图表）
   */
  structuredData: {
    type: Object
  },
  /**
   * 代码解释回调（用于 AI 解释功能）
   */
  onExplainCode: {
    type: Function
  },
  /**
   * 代码运行回调
   */
  onRunCode: {
    type: Function
  },
  /**
   * 引用点击回调
   */
  onCitationClick: {
    type: Function
  },
  /**
   * 主题覆盖变量
   */
  themeOverrides: {
    type: Object,
    default: void 0
  },
  // ========== Python 沙盒相关属性 ==========
  /**
   * 是否启用 Python 代码运行支持
   */
  enablePythonRuntime: {
    type: Boolean,
    default: false
  },
  /**
   * Python 运行时类型：'browser' (Pyodide) | 'remote' (远程 API)
   */
  pythonRuntime: {
    type: String,
    default: "browser"
  },
  /**
   * 远程 Python API 地址（当 pythonRuntime 为 remote 时使用）
   */
  pythonApiUrl: {
    type: String,
    default: ""
  },
  /**
   * Pyodide CDN 地址
   */
  pyodideUrl: {
    type: String,
    default: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js"
  },
  // ========== XSS 防护相关属性 ==========
  /**
   * 是否启用内置 XSS 防护
   */
  enableSanitizer: {
    type: Boolean,
    default: true
  },
  /**
   * 自定义 HTML 清理函数
   */
  sanitizer: {
    type: Function,
    default: void 0
  },
  /**
   * 允许的标签白名单
   */
  allowedTags: {
    type: Array,
    default: () => [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "br",
      "hr",
      "ul",
      "ol",
      "li",
      "blockquote",
      "pre",
      "code",
      "em",
      "strong",
      "a",
      "img",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "span",
      "div",
      "figure",
      "figcaption"
    ]
  },
  /**
   * 允许的属性白名单
   */
  allowedAttributes: {
    type: Array,
    default: () => [
      "href",
      "src",
      "alt",
      "title",
      "class",
      "id",
      "target",
      "rel",
      "width",
      "height",
      "style"
    ]
  },
  /**
   * 允许的协议白名单
   */
  allowedSchemes: {
    type: Array,
    default: () => ["http", "https", "mailto", "tel"]
  }
};
