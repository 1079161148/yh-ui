import type { Dayjs } from '../../dayjs'
export declare const DEFAULT_FORMATS: {
  date: string
  datetime: string
  month: string
  year: string
  week: string
  quarter: string
  daterange: string
  datetimerange: string
  monthrange: string
  yearrange: string
  quarterrange: string
}
export type CalendarCellType =
  | 'prev-month'
  | 'current-month'
  | 'next-month'
  | 'today'
  | 'selected'
  | 'range'
  | 'range-start'
  | 'range-end'
  | 'week'
export interface CalendarCell {
  date: Date
  dayjs: Dayjs
  type: CalendarCellType
  text: number | string
  disabled: boolean
  isToday: boolean
}
/**
 * 生成日历矩阵
 */
export declare const generateCalendar: (
  date: Date,
  firstDayOfWeek?: number,
  disabledDate?: (date: Date) => boolean
) => CalendarCell[][]
/**
 * 日期配置类型，兼容 Dayjs 的所有合法输入
 */
export type DateInput = string | number | Date | Dayjs | null | undefined
/**
 * 格式化日期
 */
export declare const formatDate: (date: DateInput, format: string) => string
/**
 * 解析日期
 */
export declare const parseDate: (date: DateInput, format?: string) => Dayjs | null
