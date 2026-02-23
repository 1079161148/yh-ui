import { describe, it, expect, vi, beforeEach } from 'vitest'
import dayjs from 'dayjs'
import {
  setDayjsLocale,
  getDayjsLocale,
  setDayjsLocaleSync,
  updateDayjsMonths
} from '../dayjs-locale'

describe('dayjs-locale', () => {
  beforeEach(() => {
    dayjs.locale('en')
  })

  it('getDayjsLocale should return correct mapping', () => {
    expect(getDayjsLocale('zh-cn')).toBe('zh-cn')
    expect(getDayjsLocale('en')).toBe('en')
    expect(getDayjsLocale('unknown')).toBe('en')
    expect(getDayjsLocale('zh-mo')).toBe('zh-tw')
  })

  it('setDayjsLocale should work with statically loaded locales', async () => {
    await setDayjsLocale('zh-cn')
    expect(dayjs.locale()).toBe('zh-cn')
  })

  it('setDayjsLocale should handle errors', async () => {
    // This will trigger the catch block in setDayjsLocale
    await setDayjsLocale('invalid-locale-at-all')
    expect(dayjs.locale()).toBe('en')
  })

  it('setDayjsLocaleSync should work', () => {
    setDayjsLocaleSync('zh-tw')
    expect(dayjs.locale()).toBe('zh-tw')

    // Try an unloaded one
    setDayjsLocaleSync('fr')
    expect(dayjs.locale()).toBe('en') // Should fallback to en synchronously
  })

  it('updateDayjsMonths should work', () => {
    const months = {
      jan: 'J',
      feb: 'F',
      mar: 'M',
      apr: 'A',
      may: 'M',
      jun: 'J',
      jul: 'J',
      aug: 'A',
      sep: 'S',
      oct: 'O',
      nov: 'N',
      dec: 'D'
    }

    // Mock updateLocale
    const mockUpdate = vi.fn()
    ;(dayjs as any).updateLocale = mockUpdate

    updateDayjsMonths('en', months)
    expect(mockUpdate).toHaveBeenCalled()

    delete (dayjs as any).updateLocale
  })

  it('updateDayjsMonths should handle errors', () => {
    const months = {
      jan: 'J',
      feb: 'F',
      mar: 'M',
      apr: 'A',
      may: 'M',
      jun: 'J',
      jul: 'J',
      aug: 'A',
      sep: 'S',
      oct: 'O',
      nov: 'N',
      dec: 'D'
    }
    ;(dayjs as any).updateLocale = () => {
      throw new Error('fail')
    }
    expect(() => updateDayjsMonths('en', months)).not.toThrow()
  })
})
