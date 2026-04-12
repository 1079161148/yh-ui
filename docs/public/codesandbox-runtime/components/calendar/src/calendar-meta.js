const calendarProps = {
  /** 绑定值（单选模式） */
  modelValue: {
    type: Date,
    default: void 0
  },
  /** 默认选中的日期 */
  defaultValue: {
    type: Date,
    default: void 0
  },
  /** 日历模式 */
  mode: {
    type: String,
    default: 'month'
  },
  /** 每周的第一天是星期几 (1-7，1为周一，7为周日) */
  firstDayOfWeek: {
    type: Number,
    default: 7,
    validator: (val) => val >= 1 && val <= 7
  },
  /** 日期范围限制 - 最小值 */
  minDate: {
    type: Date
  },
  /** 日期范围限制 - 最大值 */
  maxDate: {
    type: Date
  },
  /** 是否只读 */
  readonly: {
    type: Boolean,
    default: false
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 标题格式化（月份视图），默认使用国际化配置 */
  monthHeaderFormat: {
    type: String,
    default: void 0
  },
  /** 是否显示假期标记 */
  showHoliday: {
    type: Boolean,
    default: false
  },
  /** 自定义假期数据（格式：{ 'YYYY-MM-DD': { name: '假期名', isOffDay: true } }） */
  holidays: {
    type: Object,
    default: () => ({})
  },
  /** 是否显示周数 */
  showWeekNumber: {
    type: Boolean,
    default: false
  },
  /** 是否占满容器高度 */
  fullscreen: {
    type: Boolean,
    default: false
  },
  /** 选择模式: single（单选）, range（范围选择）, multiple（多选） */
  selectionMode: {
    type: String,
    default: 'single'
  },
  /** 范围选择值（当 selectionMode 为 range 时使用） */
  rangeValue: {
    type: Array,
    default: void 0
  },
  /** 多选值（当 selectionMode 为 multiple 时使用） */
  multipleValue: {
    type: Array,
    default: () => []
  },
  /** 自定义禁用日期函数 */
  disabledDate: {
    type: Function,
    default: void 0
  },
  /** 单元格额外类名 */
  cellClassName: {
    type: Function,
    default: void 0
  },
  /** 是否显示非当月日期 */
  showOtherMonths: {
    type: Boolean,
    default: true
  },
  /** 是否高亮周末 */
  highlightWeekends: {
    type: Boolean,
    default: true
  },
  /** 日历尺寸 */
  size: {
    type: String,
    default: 'default'
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
}
const calendarEmits = {
  'update:modelValue': (value) => value instanceof Date,
  'update:mode': (mode) => ['month', 'year'].includes(mode),
  'update:rangeValue': (value) => Array.isArray(value),
  'update:multipleValue': (value) => Array.isArray(value),
  change: (value) => value instanceof Date,
  'panel-change': (date, mode) => date instanceof Date && ['month', 'year'].includes(mode),
  select: (date, cell) => date instanceof Date && cell !== void 0,
  'range-change': (value) => Array.isArray(value)
}
const CALENDAR_INJECTION_KEY = Symbol('calendar')
const DEFAULT_CHINA_HOLIDAYS_2026 = {
  // 元旦
  '2026-01-01': { name: '\u5143\u65E6', isOffDay: true },
  '2026-01-02': { name: '\u5143\u65E6', isOffDay: true },
  '2026-01-03': { name: '\u5143\u65E6', isOffDay: true },
  // 春节 (2026年2月17日)
  '2026-02-14': { name: '\u6625\u8282', isOffDay: false },
  // 补班
  '2026-02-17': { name: '\u6625\u8282', isOffDay: true },
  // 除夕
  '2026-02-18': { name: '\u6625\u8282', isOffDay: true },
  '2026-02-19': { name: '\u6625\u8282', isOffDay: true },
  '2026-02-20': { name: '\u6625\u8282', isOffDay: true },
  '2026-02-21': { name: '\u6625\u8282', isOffDay: true },
  '2026-02-22': { name: '\u6625\u8282', isOffDay: true },
  '2026-02-23': { name: '\u6625\u8282', isOffDay: true },
  '2026-02-28': { name: '\u6625\u8282', isOffDay: false },
  // 补班
  // 清明节
  '2026-04-04': { name: '\u6E05\u660E', isOffDay: true },
  '2026-04-05': { name: '\u6E05\u660E', isOffDay: true },
  '2026-04-06': { name: '\u6E05\u660E', isOffDay: true },
  // 劳动节
  '2026-04-26': { name: '\u52B3\u52A8\u8282', isOffDay: false },
  // 补班
  '2026-05-01': { name: '\u52B3\u52A8\u8282', isOffDay: true },
  '2026-05-02': { name: '\u52B3\u52A8\u8282', isOffDay: true },
  '2026-05-03': { name: '\u52B3\u52A8\u8282', isOffDay: true },
  '2026-05-04': { name: '\u52B3\u52A8\u8282', isOffDay: true },
  '2026-05-05': { name: '\u52B3\u52A8\u8282', isOffDay: true },
  '2026-05-09': { name: '\u52B3\u52A8\u8282', isOffDay: false },
  // 补班
  // 端午节
  '2026-05-31': { name: '\u7AEF\u5348', isOffDay: true },
  '2026-06-01': { name: '\u7AEF\u5348', isOffDay: true },
  // 中秋节
  '2026-09-25': { name: '\u4E2D\u79CB', isOffDay: true },
  '2026-09-26': { name: '\u4E2D\u79CB', isOffDay: true },
  '2026-09-27': { name: '\u4E2D\u79CB', isOffDay: true },
  // 国庆节
  '2026-10-01': { name: '\u56FD\u5E86', isOffDay: true },
  '2026-10-02': { name: '\u56FD\u5E86', isOffDay: true },
  '2026-10-03': { name: '\u56FD\u5E86', isOffDay: true },
  '2026-10-04': { name: '\u56FD\u5E86', isOffDay: true },
  '2026-10-05': { name: '\u56FD\u5E86', isOffDay: true },
  '2026-10-06': { name: '\u56FD\u5E86', isOffDay: true },
  '2026-10-07': { name: '\u56FD\u5E86', isOffDay: true },
  '2026-10-10': { name: '\u56FD\u5E86', isOffDay: false }
  // 补班
}
export { CALENDAR_INJECTION_KEY, DEFAULT_CHINA_HOLIDAYS_2026, calendarEmits, calendarProps }
