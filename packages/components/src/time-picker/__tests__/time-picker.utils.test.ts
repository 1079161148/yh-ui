import { describe, expect, it, vi } from 'vitest'
import {
  formatTimeState,
  generateNumberList,
  getCurrentTimeState,
  isTimeStateEqual,
  parseTimeValue,
  timeStateToDate
} from '../src/time-picker'

describe('time-picker runtime utilities', () => {
  it('parses empty, string, date and timestamp values', () => {
    expect(parseTimeValue(null)).toBeNull()
    expect(parseTimeValue(undefined)).toBeNull()
    expect(parseTimeValue('')).toBeNull()

    expect(parseTimeValue('09:08')).toEqual({ hours: 9, minutes: 8, seconds: 0 })
    expect(parseTimeValue('23:59:58')).toEqual({ hours: 23, minutes: 59, seconds: 58 })
    expect(parseTimeValue('99:99:99')).toEqual({ hours: 23, minutes: 59, seconds: 59 })
    expect(parseTimeValue('not a time')).toEqual({ hours: 0, minutes: 0, seconds: 0 })

    const date = new Date(2024, 0, 1, 6, 7, 8)
    expect(parseTimeValue(date)).toEqual({ hours: 6, minutes: 7, seconds: 8 })
    expect(parseTimeValue(date.getTime())).toEqual({ hours: 6, minutes: 7, seconds: 8 })
  })

  it('formats states with padded, unpadded and 12-hour tokens', () => {
    const state = { hours: 0, minutes: 5, seconds: 9 }

    expect(formatTimeState(null)).toBe('')
    expect(formatTimeState(state)).toBe('00:05:09')
    expect(formatTimeState(state, 'H:m:s')).toBe('0:5:9')
    expect(formatTimeState({ hours: 13, minutes: 4, seconds: 2 }, 'HH:mm A', true)).toBe('01:04 PM')
    expect(formatTimeState({ hours: 0, minutes: 4, seconds: 2 }, 'H:m a', true)).toBe('12:4 am')
  })

  it('converts a state to a date without leaking milliseconds', () => {
    const date = timeStateToDate({ hours: 4, minutes: 3, seconds: 2 })

    expect(date.getHours()).toBe(4)
    expect(date.getMinutes()).toBe(3)
    expect(date.getSeconds()).toBe(2)
    expect(date.getMilliseconds()).toBe(0)
  })

  it('generates stepped and custom option lists with disabled markers', () => {
    expect(generateNumberList(6, 2, [2])).toEqual([
      { value: 0, disabled: false },
      { value: 2, disabled: true },
      { value: 4, disabled: false },
      { value: 6, disabled: false }
    ])

    expect(generateNumberList(10, 1, [3], [7, 3, 7, -1, 11])).toEqual([
      { value: 3, disabled: true },
      { value: 7, disabled: false }
    ])
  })

  it('compares nullable time states', () => {
    expect(isTimeStateEqual(null, null)).toBe(true)
    expect(isTimeStateEqual(null, { hours: 1, minutes: 2, seconds: 3 })).toBe(false)
    expect(isTimeStateEqual({ hours: 1, minutes: 2, seconds: 3 }, null)).toBe(false)
    expect(
      isTimeStateEqual({ hours: 1, minutes: 2, seconds: 3 }, { hours: 1, minutes: 2, seconds: 3 })
    ).toBe(true)
    expect(
      isTimeStateEqual({ hours: 1, minutes: 2, seconds: 3 }, { hours: 1, minutes: 2, seconds: 4 })
    ).toBe(false)
  })

  it('reads the current time from Date', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2024, 0, 1, 14, 15, 16))

    expect(getCurrentTimeState()).toEqual({ hours: 14, minutes: 15, seconds: 16 })

    vi.useRealTimers()
  })
})
