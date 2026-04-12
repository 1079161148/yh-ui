const aiChatProps = {
  /**
   * @description 消息列表
   */
  messages: {
    type: Array,
    default: () => []
  },
  /**
   * @description 是否全域加载中 (通常指整个对话框的加载态)
   */
  loading: {
    type: Boolean,
    default: false
  },
  /**
   * @description 默认建议提示词
   */
  suggestions: {
    type: Array,
    default: () => []
  },
  /**
   * @description 是否启用虚拟滚动 (大数据量时开启)
   */
  virtualScroll: {
    type: Boolean,
    default: false
  },
  /**
   * @description 虚拟滚动 - 容器高度
   */
  virtualHeight: {
    type: Number,
    default: 400
  },
  /**
   * @description 虚拟滚动 - 每一项的预估高度
   */
  estimatedItemHeight: {
    type: Number,
    default: 80
  },
  /**
   * @description 主题覆盖变量
   */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
const aiChatEmits = {
  send: (message) => typeof message === "string",
  "update:messages": (messages) => Array.isArray(messages),
  clear: () => true
};
export {
  aiChatEmits,
  aiChatProps
};
