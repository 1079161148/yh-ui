const aiAgentCardProps = {
  /**
   * @description Agent 数据
   */
  data: {
    type: Object,
    required: true
  },
  /**
   * @description 卡片布局：vertical（竖向）/ horizontal（横向）/ compact（紧凑）
   */
  layout: {
    type: String,
    default: 'vertical'
  },
  /**
   * @description 是否显示操作按钮区域
   */
  showActions: {
    type: Boolean,
    default: true
  },
  /**
   * @description 是否显示统计信息
   */
  showStats: {
    type: Boolean,
    default: true
  },
  /**
   * @description 是否可收藏
   */
  favoritable: {
    type: Boolean,
    default: true
  },
  /**
   * @description 是否选中状态（商城/列表选择场景）
   */
  selected: {
    type: Boolean,
    default: false
  },
  /**
   * @description 加载骨架屏状态
   */
  loading: {
    type: Boolean,
    default: false
  },
  /**
   * @description 主题覆盖变量
   */
  themeOverrides: {
    type: Object,
    default: void 0
  }
}
const aiAgentCardEmits = {
  /** 点击整个卡片 */
  click: (data) => !!data,
  /** 点击使用 / 调用按钮 */
  use: (data) => !!data,
  /** 收藏/取消收藏 */
  favorite: (data, favorited) => !!data && typeof favorited === 'boolean',
  /** 分享 */
  share: (data) => !!data
}
export { aiAgentCardEmits, aiAgentCardProps }
