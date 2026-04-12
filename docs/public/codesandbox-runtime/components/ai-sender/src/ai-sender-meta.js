const aiSenderProps = {
  /**
   * 绑定值
   */
  modelValue: {
    type: String,
    default: ''
  },
  /**
   * 占位符
   */
  placeholder: {
    type: String,
    default: 'Send a message...'
  },
  /**
   * 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * 是否加载中
   */
  loading: {
    type: Boolean,
    default: false
  },
  /**
   * 是否显示清空按钮
   */
  clearable: {
    type: Boolean,
    default: false
  },
  /**
   * 最大长度
   */
  maxLength: Number,
  /**
   * 是否显示字数限制
   */
  showWordLimit: {
    type: Boolean,
    default: false
  },
  /**
   * 快捷命令列表
   */
  commands: {
    type: Array,
    default: () => []
  },
  /**
   * AI 提及配置
   */
  mentionOptions: {
    type: Array,
    default: () => []
  },
  /**
   * 已选附件列表
   */
  attachments: {
    type: Array,
    default: () => []
  },
  /**
   * 主题覆盖变量
   */
  themeOverrides: {
    type: Object,
    default: void 0
  }
}
const aiSenderEmits = {
  'update:modelValue': (_val) => true,
  send: (_val) => true,
  change: (_val) => true,
  clear: () => true,
  focus: (_e) => true,
  blur: (_e) => true,
  /**
   * 快捷命令选中时触发
   */
  command: (_command) => true,
  /**
   * 附件移除时触发
   */
  'remove-attachment': (_attachment) => true,
  /**
   * 文件上传/拖入时触发
   */
  upload: (_files) => true
}
export { aiSenderEmits, aiSenderProps }
