/**
 * Calendar Component SSR Tests
 */
import { describe, it, expect } from 'vitest'
import { YhCalendar } from '../index'
import { renderSSR, expectSSRHasClass, testHydration } from '../../__tests__/utils/ssr'

describe('YhCalendar SSR', () => {
  it('should render correctly in SSR', async () => {
    const html = await renderSSR(YhCalendar, {
      modelValue: new Date(2026, 1, 15), // Feb 2026
      showHoliday: true
    })

    expectSSRHasClass(html, 'yh-calendar')
    expect(html).toContain('2026 年 02 月')
    // 应该包含表格结构
    expect(html).toContain('<table')
    expect(html).toContain('<thead')
    expect(html).toContain('<tbody')
    // 应该包含节假日标记（SSR 预渲染）
    expect(html).toContain('yh-calendar__day-badge--holiday')
  })

  it('should render different sizes in SSR', async () => {
    const sizes = ['small', 'default', 'large'] as const
    for (const size of sizes) {
      const html = await renderSSR(YhCalendar, { size })
      expectSSRHasClass(html, `yh-calendar--${size}`)
    }
  })

  it('should render fullscreen mode in SSR', async () => {
    const html = await renderSSR(YhCalendar, {
      fullscreen: true
    })
    expectSSRHasClass(html, 'is-fullscreen')
  })

  it('should render disabled state in SSR', async () => {
    const html = await renderSSR(YhCalendar, {
      disabled: true
    })
    expectSSRHasClass(html, 'is-disabled')
  })

  it('should render week numbers in SSR', async () => {
    const html = await renderSSR(YhCalendar, {
      showWeekNumber: true
    })
    expectSSRHasClass(html, 'yh-calendar__week-number-header')
    expect(html).toContain('yh-calendar__week-number')
  })

  it('should render custom header in SSR', async () => {
    const html = await renderSSR(
      YhCalendar,
      {},
      {
        header: ({ date }: { date: string }) => `<div class="custom-header">Custom ${date}</div>`
      }
    )
    expect(html).toContain('custom-header')
    expect(html).toContain('Custom')
  })

  it('should hydrate without mismatch', async () => {
    const result = await testHydration(YhCalendar, {
      modelValue: new Date(2026, 1, 15),
      showHoliday: true,
      showWeekNumber: true
    })
    expect(result.isMatch).toBe(true)
  })
})
