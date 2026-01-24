import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import isoWeek from 'dayjs/plugin/isoWeek'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(isBetween)
dayjs.extend(weekOfYear)
dayjs.extend(isoWeek)
dayjs.extend(quarterOfYear)
dayjs.extend(advancedFormat)
dayjs.extend(customParseFormat)

export const DEFAULT_FORMATS = {
  date: 'YYYY-MM-DD',
  datetime: 'YYYY-MM-DD HH:mm:ss',
  month: 'YYYY-MM',
  year: 'YYYY',
  week: 'gggg [第] ww [周]',
  quarter: 'YYYY-[Q]Q',
  daterange: 'YYYY-MM-DD',
  datetimerange: 'YYYY-MM-DD HH:mm:ss',
  monthrange: 'YYYY-MM',
  yearrange: 'YYYY',
  quarterrange: 'YYYY-[Q]Q'
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
export const generateCalendar = (
  date: Date,
  firstDayOfWeek: number = 7,
  disabledDate?: (date: Date) => boolean
): CalendarCell[][] => {
  const startOfMonth = dayjs(date).startOf('month')
  const endOfMonth = dayjs(date).endOf('month')

  // 计算第一天是周几 (0-6, 0 是周日)
  const startDay = startOfMonth.day()
  const offset = (startDay - (firstDayOfWeek % 7) + 7) % 7

  const startDate = startOfMonth.subtract(offset, 'day')
  const rows: CalendarCell[][] = []

  let current = startDate
  const today = dayjs().startOf('day')

  for (let i = 0; i < 6; i++) {
    const row: CalendarCell[] = []
    for (let j = 0; j < 7; j++) {
      const isPrevMonth = current.isBefore(startOfMonth, 'day')
      const isNextMonth = current.isAfter(endOfMonth, 'day')
      const dateObj = current.toDate()

      let type: CalendarCellType = 'current-month'
      if (isPrevMonth) type = 'prev-month'
      if (isNextMonth) type = 'next-month'

      row.push({
        date: dateObj,
        dayjs: current,
        type,
        text: current.date(),
        disabled: disabledDate ? disabledDate(dateObj) : false,
        isToday: current.isSame(today, 'day')
      })
      current = current.add(1, 'day')
    }
    rows.push(row)
  }

  return rows
}

/**
 * 格式化日期
 */
export const formatDate = (date: any, format: string): string => {
  if (!date) return ''
  return dayjs(date).format(format)
}

/**
 * 解析日期
 */
export const parseDate = (date: any, format?: string): Dayjs | null => {
  if (!date) return null
  const d = format ? dayjs(date, format) : dayjs(date)
  return d.isValid() ? d : null
}
