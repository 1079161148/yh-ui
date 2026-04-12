const breadcrumbProps = {
  /** 分割符，默认为 / */
  separator: {
    type: String,
    default: '/'
  },
  /** 分割符图标，优先级高于 separator */
  separatorIcon: {
    type: [Object, String, Function],
    default: ''
  },
  /** 最大展示数量，超过则折叠中间项 */
  maxItems: {
    type: Number,
    default: 0
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
}
const breadcrumbItemProps = {
  /** 路由跳转目标样式 */
  to: {
    type: [String, Object],
    default: ''
  },
  /** 是否替换路由 */
  replace: {
    type: Boolean,
    default: false
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
}
export { breadcrumbItemProps, breadcrumbProps }
