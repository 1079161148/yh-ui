const datePickerProps = {
  /** 绑定值 */
  modelValue: {
    type: [String, Number, Date, Array],
    default: null
  },
  /** 类型 */
  type: {
    type: String,
    default: 'date'
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 是否只读 */
  readonly: {
    type: Boolean,
    default: false
  },
  /** 是否可清空 */
  clearable: {
    type: Boolean,
    default: true
  },
  /** 尺寸 */
  size: {
    type: String,
    default: 'default'
  },
  /** 占位符 */
  placeholder: {
    type: String,
    default: void 0
  },
  /** 范围选择时的开始占位符 */
  startPlaceholder: {
    type: String,
    default: void 0
  },
  /** 范围选择时的结束占位符 */
  endPlaceholder: {
    type: String,
    default: void 0
  },
  /** 格式化显示 */
  format: {
    type: String,
    default: ''
  },
  /** 绑定值的格式 */
  valueFormat: {
    type: String,
    default: ''
  },
  /** 面板显示的日期格式 */
  dateFormat: {
    type: String,
    default: 'YYYY-MM-DD'
  },
  /** 面板显示的时间格式 */
  timeFormat: {
    type: String,
    default: 'HH:mm:ss'
  },
  /** 范围分隔符 */
  rangeSeparator: {
    type: String,
    default: '-'
  },
  /** 第一天是星期几 */
  firstDayOfWeek: {
    type: Number,
    default: 7
    // 1-7, 7 代表周日
  },
  /** 禁用日期函数 */
  disabledDate: {
    type: Function,
    default: void 0
  },
  /** 预设快捷选项 */
  presets: {
    type: Array,
    default: () => []
  },
  /** 预设选项的位置 */
  presetPosition: {
    type: String,
    default: 'bottom'
  },
  /** 是否显示底部操作栏 */
  showFooter: {
    type: Boolean,
    default: true
  },
  /** 状态 */
  status: {
    type: String,
    default: void 0
  },
  /** 是否自动排序范围（当结束日期早于开始日期时） */
  orderOnConfirm: {
    type: Boolean,
    default: false
  },
  /** 自定义前缀图标 */
  prefixIcon: {
    type: [String, Object],
    default: ''
  },
  /** 自定义清除图标 */
  clearIcon: {
    type: [String, Object],
    default: ''
  },
  /** 选择器打开时默认显示的日期 */
  defaultValue: {
    type: [Date, Array],
    default: void 0
  },
  /** 是否内联显示（只显示面板） */
  panelOnly: {
    type: Boolean,
    default: false
  },
  /** 默认时间（datetime 模式下） */
  defaultTime: {
    type: [Date, Array],
    default: void 0
  },
  /** 下拉框类名 */
  popperClass: {
    type: String,
    default: ''
  },
  /** 是否将面板插入到 body */
  teleported: {
    type: Boolean,
    default: true
  },
  /** 是否触发表单验证 */
  validateEvent: {
    type: Boolean,
    default: true
  },
  /** 小名/标识 */
  name: {
    type: String,
    default: ''
  },
  /** ID */
  id: {
    type: String,
    default: ''
  },
  /** 单元格形状 */
  cellShape: {
    type: String,
    default: 'round'
  },
  /** 自定义单元格渲染函数 */
  cellRender: {
    type: Function,
    default: void 0
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
}
export { datePickerProps }
