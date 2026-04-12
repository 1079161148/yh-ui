const descriptionsProps = {
  title: String,
  extra: String,
  column: {
    type: Number,
    default: 3
  },
  direction: {
    type: String,
    default: 'horizontal'
  },
  size: {
    type: String,
    default: 'default'
  },
  border: {
    type: Boolean,
    default: false
  },
  colon: {
    type: Boolean,
    default: true
  },
  labelStyle: {
    type: Object
  },
  contentStyle: {
    type: Object
  },
  labelClassName: {
    type: String,
    default: ''
  },
  contentClassName: {
    type: String,
    default: ''
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
}
const descriptionsItemProps = {
  label: {
    type: String,
    default: ''
  },
  span: {
    type: Number,
    default: 1
  },
  width: {
    type: [String, Number],
    default: ''
  },
  minWidth: {
    type: [String, Number],
    default: ''
  },
  align: {
    type: String,
    default: 'left'
  },
  labelAlign: {
    type: String,
    default: 'left'
  },
  className: {
    type: String,
    default: ''
  },
  labelClassName: {
    type: String,
    default: ''
  },
  labelStyle: {
    type: Object
  },
  contentStyle: {
    type: Object
  }
}
const descriptionsKey = Symbol('descriptionsKey')
export { descriptionsItemProps, descriptionsKey, descriptionsProps }
