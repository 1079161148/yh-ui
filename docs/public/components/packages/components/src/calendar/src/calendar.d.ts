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
export declare const calendarProps: {
  /** 绑定值（单选模式） */
  readonly modelValue: {
    readonly type: PropType<Date>
    readonly default: undefined
  }
  /** 默认选中的日期 */
  readonly defaultValue: {
    readonly type: PropType<Date>
    readonly default: undefined
  }
  /** 日历模式 */
  readonly mode: {
    readonly type: PropType<CalendarMode>
    readonly default: 'month'
  }
  /** 每周的第一天是星期几 (1-7，1为周一，7为周日) */
  readonly firstDayOfWeek: {
    readonly type: NumberConstructor
    readonly default: 7
    readonly validator: (val: number) => boolean
  }
  /** 日期范围限制 - 最小值 */
  readonly minDate: {
    readonly type: PropType<Date>
  }
  /** 日期范围限制 - 最大值 */
  readonly maxDate: {
    readonly type: PropType<Date>
  }
  /** 是否只读 */
  readonly readonly: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 是否禁用 */
  readonly disabled: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 标题格式化（月份视图），默认使用国际化配置 */
  readonly monthHeaderFormat: {
    readonly type: StringConstructor
    readonly default: undefined
  }
  /** 是否显示假期标记 */
  readonly showHoliday: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 自定义假期数据（格式：{ 'YYYY-MM-DD': { name: '假期名', isOffDay: true } }） */
  readonly holidays: {
    readonly type: PropType<HolidayMap>
    readonly default: () => {}
  }
  /** 是否显示周数 */
  readonly showWeekNumber: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 是否占满容器高度 */
  readonly fullscreen: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /** 选择模式: single（单选）, range（范围选择）, multiple（多选） */
  readonly selectionMode: {
    readonly type: PropType<'single' | 'range' | 'multiple'>
    readonly default: 'single'
  }
  /** 范围选择值（当 selectionMode 为 range 时使用） */
  readonly rangeValue: {
    readonly type: PropType<CalendarRangeValue>
    readonly default: undefined
  }
  /** 多选值（当 selectionMode 为 multiple 时使用） */
  readonly multipleValue: {
    readonly type: PropType<Date[]>
    readonly default: () => never[]
  }
  /** 自定义禁用日期函数 */
  readonly disabledDate: {
    readonly type: PropType<(date: Date) => boolean>
    readonly default: undefined
  }
  /** 单元格额外类名 */
  readonly cellClassName: {
    readonly type: PropType<(date: Date) => string | string[] | Record<string, boolean>>
    readonly default: undefined
  }
  /** 是否显示非当月日期 */
  readonly showOtherMonths: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /** 是否高亮周末 */
  readonly highlightWeekends: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /** 日历尺寸 */
  readonly size: {
    readonly type: PropType<'small' | 'default' | 'large'>
    readonly default: 'default'
  }
  /** 主题覆盖变量 */
  readonly themeOverrides: {
    readonly type: PropType<import('@yh-ui/theme').CalendarThemeVars>
    readonly default: undefined
  }
}
export declare const calendarEmits: {
  'update:modelValue': (value: Date) => boolean
  'update:mode': (mode: CalendarMode) => boolean
  'update:rangeValue': (value: CalendarRangeValue) => boolean
  'update:multipleValue': (value: Date[]) => boolean
  change: (value: Date) => boolean
  'panel-change': (date: Date, mode: CalendarMode) => boolean
  select: (date: Date, cell: CalendarDateCell) => boolean
  'range-change': (value: CalendarRangeValue) => boolean
}
export type CalendarProps = ExtractPropTypes<typeof calendarProps>
export type CalendarEmits = typeof calendarEmits
export interface CalendarSlots {
  header?: (props: { date: string }) => unknown
  'date-cell'?: (props: { data: CalendarDateCell }) => unknown
  footer?: () => unknown
}
export interface CalendarExpose {
  displayDate: Ref<Dayjs>
  selectedDate: Ref<Dayjs | undefined>
  moveMonth: (delta: number) => void
  goToday: () => void
  selectDate: (cell: CalendarDateCell) => void
}
export interface CalendarContext {
  selectedDay: Ref<Dayjs | undefined>
  displayedDate: Ref<Dayjs>
  mode: Ref<CalendarMode>
  firstDayOfWeek: Ref<number>
  handleSelect: (date: Dayjs) => void
}
export declare const CALENDAR_INJECTION_KEY: InjectionKey<CalendarContext>
export declare const DEFAULT_CHINA_HOLIDAYS_2026: HolidayMap
