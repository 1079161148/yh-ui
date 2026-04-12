const aiWelcomeProps = {
  /**
   * 标题文本
   */
  title: {
    type: String,
    default: ""
  },
  /**
   * 描述文本
   */
  description: {
    type: String,
    default: ""
  },
  /**
   * 建议项列表
   */
  suggestions: {
    type: Array,
    default: () => []
  },
  /**
   * 是否展示图标/Logo
   */
  showIcon: {
    type: Boolean,
    default: true
  },
  /**
   * 自定义图标名称
   */
  icon: {
    type: String,
    default: "sparkles"
  },
  /**
   * 主题覆盖变量
   */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
const aiWelcomeEmits = {
  /**
   * 点击建议项时触发
   */
  select: (suggestion) => !!suggestion
};
export {
  aiWelcomeEmits,
  aiWelcomeProps
};
