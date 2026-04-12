const aiSourcesProps = {
  /**
   * @description 引用来源列表
   */
  sources: {
    type: Array,
    default: () => []
  },
  /**
   * @description 展示模式
   * - 'inline': 内联气泡（紧凑，嵌入回复内）
   * - 'card': 卡片列表（展开式详细）
   * - 'badge': 仅角标数字（点击弹出抽屉）
   */
  mode: {
    type: String,
    default: "inline"
  },
  /**
   * @description 最多显示的卡片数（超出折叠）
   */
  maxVisible: {
    type: Number,
    default: 5
  },
  /**
   * @description 是否显示相关度分数
   */
  showScore: {
    type: Boolean,
    default: true
  },
  /**
   * @description 是否显示文件类型图标
   */
  showFileType: {
    type: Boolean,
    default: true
  },
  /**
   * @description 主题覆盖
   */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
const aiSourcesEmits = {
  /** 点击来源项 */
  click: (source) => !!source,
  /** 点击查看原文 */
  open: (source) => !!source
};
export {
  aiSourcesEmits,
  aiSourcesProps
};
