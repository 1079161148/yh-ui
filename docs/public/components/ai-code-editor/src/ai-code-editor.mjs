export const aiCodeEditorProps = {
  /**
   * @description 代码语言
   */
  language: {
    type: String,
    default: "javascript"
  },
  /**
   * @description 代码内容
   */
  modelValue: {
    type: String,
    default: ""
  },
  /**
   * @description 打开时显示的初始代码（优先于 modelValue 用于首屏，避免 v-if 下首帧未到位导致空白）
   */
  initialValue: {
    type: String,
    default: void 0
  },
  /**
   * @description 是否只读
   */
  readonly: {
    type: Boolean,
    default: false
  },
  /**
   * @description 编辑器主题
   */
  theme: {
    type: String,
    default: "vs-dark",
    validator: (value) => ["vs", "vs-dark", "hc-black"].includes(value)
  },
  /**
   * @description 编辑器高度
   */
  height: {
    type: [String, Number],
    default: 300
  },
  /**
   * @description 是否显示 Minimap
   */
  minimap: {
    type: Boolean,
    default: false
  },
  /**
   * @description 自动换行
   */
  wordWrap: {
    type: String,
    default: "on",
    validator: (value) => ["on", "off", "wordWrapColumn", "bounded"].includes(value)
  },
  /**
   * @description 字体大小
   */
  fontSize: {
    type: Number,
    default: 14
  },
  /**
   * @description 制表符宽度
   */
  tabSize: {
    type: Number,
    default: 2
  },
  /**
   * @description 是否自动聚焦
   */
  autofocus: {
    type: Boolean,
    default: true
  },
  /**
   * @description 主题覆盖变量
   */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
export const aiCodeEditorEmits = {
  "update:modelValue": (value) => typeof value === "string",
  change: (value) => typeof value === "string",
  mount: () => true,
  dispose: () => true
};
