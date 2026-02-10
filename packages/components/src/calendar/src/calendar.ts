import type { ExtractPropTypes, PropType, InjectionKey, Ref } from 'vue'
import type { Dayjs } from 'dayjs'

export type CalendarMode = 'month' | 'year'

/** 日期单元格信息 */
export interface CalendarDateCell {
  /** 日期对象 */
  date: Dayjs
  /** 日（天） */
  day: number
  /** 日期类型: prev-month（上月）, current-month（当月）, next-month（下月） */
  type: 'prev-month' | 'current-month' | 'next-month'
  /** 是否当月 */
  isCurrent: boolean
  /** 是否今天 */
  isToday: boolean
  /** 是否选中 */
  isSelected: boolean
  /** 是否禁用 */
  isDisabled: boolean
  /** 是否周末（周六或周日） */
  isWeekend: boolean
  /** 是否假期（中国节假日） */
  isHoliday: boolean
  /** 假期名称 */
  holidayName?: string
  /** 是否补班日 */
  isWorkday: boolean
  /** 是否范围内（用于范围选择） */
  isInRange?: boolean
  /** 是否范围起始 */
  isRangeStart?: boolean
  /** 是否范围结束 */
  isRangeEnd?: boolean
  /** 格式化的日期字符串 YYYY-MM-DD */
  dateStr: string
}

/** 假期数据类型 */
export interface HolidayInfo {
  /** 假期名称 */
  name: string
  /** 是否放假 (true=放假, false=补班) */
  isOffDay: boolean
}

export type HolidayMap = Record<string, HolidayInfo>

/** 范围选择值类型 */
export type CalendarRangeValue = [Date | undefined, Date | undefined]

export const calendarProps = {
  /** 绑定值（单选模式） */
  modelValue: {
    type: Date as PropType<Date>,
    default: undefined
  },
  /** 默认选中的日期 */
  defaultValue: {
    type: Date as PropType<Date>,
    default: undefined
  },
  /** 日历模式 */
  mode: {
    type: String as PropType<CalendarMode>,
    default: 'month'
  },
  /** 每周的第一天是星期几 (1-7，1为周一，7为周日) */
  firstDayOfWeek: {
    type: Number,
    default: 7,
    validator: (val: number) => val >= 1 && val <= 7
  },
  /** 日期范围限制 - 最小值 */
  minDate: {
    type: Date as PropType<Date>
  },
  /** 日期范围限制 - 最大值 */
  maxDate: {
    type: Date as PropType<Date>
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
    default: undefined
  },
  /** 是否显示假期标记 */
  showHoliday: {
    type: Boolean,
    default: false
  },
  /** 自定义假期数据（格式：{ 'YYYY-MM-DD': { name: '假期名', isOffDay: true } }） */
  holidays: {
    type: Object as PropType<HolidayMap>,
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
    type: String as PropType<'single' | 'range' | 'multiple'>,
    default: 'single'
  },
  /** 范围选择值（当 selectionMode 为 range 时使用） */
  rangeValue: {
    type: Array as unknown as PropType<CalendarRangeValue>,
    default: undefined
  },
  /** 多选值（当 selectionMode 为 multiple 时使用） */
  multipleValue: {
    type: Array as PropType<Date[]>,
    default: () => []
  },
  /** 自定义禁用日期函数 */
  disabledDate: {
    type: Function as PropType<(date: Date) => boolean>,
    default: undefined
  },
  /** 单元格额外类名 */
  cellClassName: {
    type: Function as PropType<(date: Date) => string | string[] | Record<string, boolean>>,
    default: undefined
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
    type: String as PropType<'small' | 'default' | 'large'>,
    default: 'default'
  }
} as const

export const calendarEmits = {
  'update:modelValue': (value: Date) => value instanceof Date,
  'update:mode': (mode: CalendarMode) => ['month', 'year'].includes(mode),
  'update:rangeValue': (value: CalendarRangeValue) => Array.isArray(value),
  'update:multipleValue': (value: Date[]) => Array.isArray(value),
  change: (value: Date) => value instanceof Date,
  'panel-change': (date: Date, mode: CalendarMode) =>
    date instanceof Date && ['month', 'year'].includes(mode),
  select: (date: Date, cell: CalendarDateCell) => date instanceof Date && cell !== undefined,
  'range-change': (value: CalendarRangeValue) => Array.isArray(value)
}

export type CalendarProps = ExtractPropTypes<typeof calendarProps>
export type CalendarEmits = typeof calendarEmits

// 定义内部注入上下文
export interface CalendarContext {
  selectedDay: Ref<Dayjs | undefined>
  displayedDate: Ref<Dayjs>
  mode: Ref<CalendarMode>
  firstDayOfWeek: Ref<number>
  handleSelect: (date: Dayjs) => void
}

export const CALENDAR_INJECTION_KEY: InjectionKey<CalendarContext> = Symbol('calendar')

// 2026年中国法定节假日数据（可扩展）
export const DEFAULT_CHINA_HOLIDAYS_2026: HolidayMap = {
  // 元旦
  '2026-01-01': { name: '元旦', isOffDay: true },
  '2026-01-02': { name: '元旦', isOffDay: true },
  '2026-01-03': { name: '元旦', isOffDay: true },
  // 春节 (2026年2月17日)
  '2026-02-14': { name: '春节', isOffDay: false }, // 补班
  '2026-02-17': { name: '春节', isOffDay: true }, // 除夕
  '2026-02-18': { name: '春节', isOffDay: true },
  '2026-02-19': { name: '春节', isOffDay: true },
  '2026-02-20': { name: '春节', isOffDay: true },
  '2026-02-21': { name: '春节', isOffDay: true },
  '2026-02-22': { name: '春节', isOffDay: true },
  '2026-02-23': { name: '春节', isOffDay: true },
  '2026-02-28': { name: '春节', isOffDay: false }, // 补班
  // 清明节
  '2026-04-04': { name: '清明', isOffDay: true },
  '2026-04-05': { name: '清明', isOffDay: true },
  '2026-04-06': { name: '清明', isOffDay: true },
  // 劳动节
  '2026-04-26': { name: '劳动节', isOffDay: false }, // 补班
  '2026-05-01': { name: '劳动节', isOffDay: true },
  '2026-05-02': { name: '劳动节', isOffDay: true },
  '2026-05-03': { name: '劳动节', isOffDay: true },
  '2026-05-04': { name: '劳动节', isOffDay: true },
  '2026-05-05': { name: '劳动节', isOffDay: true },
  '2026-05-09': { name: '劳动节', isOffDay: false }, // 补班
  // 端午节
  '2026-05-31': { name: '端午', isOffDay: true },
  '2026-06-01': { name: '端午', isOffDay: true },
  // 中秋节
  '2026-09-25': { name: '中秋', isOffDay: true },
  '2026-09-26': { name: '中秋', isOffDay: true },
  '2026-09-27': { name: '中秋', isOffDay: true },
  // 国庆节
  '2026-10-01': { name: '国庆', isOffDay: true },
  '2026-10-02': { name: '国庆', isOffDay: true },
  '2026-10-03': { name: '国庆', isOffDay: true },
  '2026-10-04': { name: '国庆', isOffDay: true },
  '2026-10-05': { name: '国庆', isOffDay: true },
  '2026-10-06': { name: '国庆', isOffDay: true },
  '2026-10-07': { name: '国庆', isOffDay: true },
  '2026-10-10': { name: '国庆', isOffDay: false } // 补班
}
