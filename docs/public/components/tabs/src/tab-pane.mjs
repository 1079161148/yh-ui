export const tabPaneProps = {
  /** 唯一标识 */
  name: {
    type: [String, Number],
    required: true
  },
  /** 标签标题 */
  label: {
    type: String,
    default: ""
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 是否可关闭 */
  closable: {
    type: Boolean,
    default: void 0
  },
  /** 是否延迟渲染(首次激活后渲染) */
  lazy: {
    type: Boolean,
    default: false
  },
  /** 图标类名 */
  icon: {
    type: String,
    default: ""
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
