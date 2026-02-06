/**
 * @vitest-environment node
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { createSSRApp, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { YhCountdown } from '../index'

describe('SSR for YhCountdown', () => {
  const BASE_TIME = 1700000000000

  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(BASE_TIME)
  })

  afterEach(() => {
    vi.useRealTimers()
  })
  it('should render correct markup in SSR', async () => {
    const app = createSSRApp(YhCountdown, {
      value: 3600000,
      title: 'Remaining:',
      suffix: 'Seconds'
    })

    const html = await renderToString(app)
    expect(html).toContain('yh-countdown')
    expect(html).toContain('yh-countdown__title')
    expect(html).toContain('yh-countdown__suffix')
    expect(html).toContain('Remaining:')
    expect(html).toContain('Seconds')
  })

  it('should format time correctly in SSR', async () => {
    // 3661000ms = 01:01:01
    const app = createSSRApp(YhCountdown, {
      value: 3661000,
      format: 'HH:mm:ss'
    })

    const html = await renderToString(app)
    expect(html).toContain('01:01:01')
  })

  it('should handle serverTimeOffset in SSR', async () => {
    // BASE_TIME + 2 hours, but server thinks it's 1 hour ahead
    const target = BASE_TIME + 7200000 // + 2h
    const offset = 3600000 // server is 1h ahead (serverTime - clientTime)

    // remain should be (target - (BASE_TIME + offset)) = (BASE_TIME + 7200000 - BASE_TIME - 3600000) = 3600000 (1h)
    const app = createSSRApp(YhCountdown, {
      value: target,
      serverTimeOffset: offset,
      format: 'HH:mm:ss'
    })

    const html = await renderToString(app)
    expect(html).toContain('01:00:00')
  })

  it('should render flip animation markup in SSR', async () => {
    const app = createSSRApp(YhCountdown, {
      value: 3600000,
      flipAnimation: true,
      labels: { hours: 'H', minutes: 'M', seconds: 'S' }
    })

    const html = await renderToString(app)
    expect(html).toContain('is-flip')
    expect(html).toContain('yh-countdown__block')
    expect(html).toContain('yh-countdown__label')
    expect(html).toContain('H')
    expect(html).toContain('01')
  })

  it('should handle custom slots in SSR', async () => {
    const app = createSSRApp({
      render() {
        return h(
          YhCountdown,
          { value: 3600000 },
          {
            prefix: () => h('span', { class: 'custom-prefix' }, 'SSR Prefix'),
            suffix: () => h('span', { class: 'custom-suffix' }, 'SSR Suffix')
          }
        )
      }
    })

    const html = await renderToString(app)
    expect(html).toContain('custom-prefix')
    expect(html).toContain('SSR Prefix')
    expect(html).toContain('custom-suffix')
    expect(html).toContain('SSR Suffix')
  })
})
