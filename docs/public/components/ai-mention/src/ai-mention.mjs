export const aiMentionTypes = ["agent", "document", "table", "knowledge", "file"];
export const aiMentionProps = {
  /**
   * 绑定值
   */
  modelValue: {
    type: String,
    default: ""
  },
  /**
   * AI 提及类型，支持多种类型过滤
   */
  types: {
    type: Array,
    default: () => ["agent", "document", "table", "knowledge", "file"]
  },
  /**
   * 选项列表
   */
  options: {
    type: Array,
    default: () => []
  },
  /**
   * 触发字符
   */
  triggers: {
    type: Array,
    default: () => ["@"]
  },
  /**
   * 是否在输入框中
   */
  type: {
    type: String,
    default: "textarea"
  },
  /**
   * 占位符
   */
  placeholder: String,
  /**
   * 是否禁用
   */
  disabled: Boolean,
  /**
   * 尺寸
   */
  size: String,
  /**
   * 最大长度
   */
  maxLength: Number,
  /**
   * 文本域行数
   */
  rows: {
    type: Number,
    default: 3
  },
  /**
   * 是否正在加载
   */
  loading: Boolean,
  /**
   * 主题覆盖
   */
  themeOverrides: {
    type: Object,
    default: () => ({})
  },
  /**
   * 选项过滤
   */
  filterOption: {
    type: [Function, Boolean],
    default: void 0
  },
  /**
   * 是否启用文件树选择器（@文档/@表格/@文件）
   */
  enableFileTree: {
    type: Boolean,
    default: true
  },
  /**
   * 文件树数据加载函数
   * 当用户触发 @文档/@表格/@文件 时调用
   */
  fileLoader: {
    type: [Function, Object],
    default: void 0
  },
  /**
   * 文件树根路径
   */
  fileRoot: {
    type: String,
    default: "/"
  },
  /**
   * 文件树展开层级
   */
  fileTreeExpandedLevel: {
    type: Number,
    default: 2
  },
  /**
   * 是否显示文件图标
   */
  showFileIcon: {
    type: Boolean,
    default: true
  },
  /**
   * 是否显示文件大小
   */
  showFileSize: {
    type: Boolean,
    default: true
  },
  /**
   * 是否显示最后修改时间
   */
  showModifiedTime: {
    type: Boolean,
    default: true
  },
  /**
   * 文件大小格式化函数
   */
  formatFileSize: {
    type: Function,
    default: (size) => {
      if (size < 1024) return size + " B";
      if (size < 1024 * 1024) return (size / 1024).toFixed(1) + " KB";
      if (size < 1024 * 1024 * 1024) return (size / 1024 / 1024).toFixed(1) + " MB";
      return (size / 1024 / 1024 / 1024).toFixed(1) + " GB";
    }
  },
  /**
   * 搜索防抖延迟（毫秒）
   */
  searchDebounce: {
    type: Number,
    default: 300
  }
};
export const aiMentionEmits = {
  "update:modelValue": (value) => typeof value === "string",
  input: (value) => typeof value === "string",
  change: (value) => typeof value === "string",
  select: (option, trigger) => !!option && !!trigger,
  search: (keyword, trigger) => typeof keyword === "string" && !!trigger,
  "file-load": (_type, _nodes) => true,
  "file-select": (node, option) => !!node && !!option,
  focus: (event) => event instanceof FocusEvent,
  blur: (event) => event instanceof FocusEvent,
  keydown: (event) => event instanceof KeyboardEvent
};
