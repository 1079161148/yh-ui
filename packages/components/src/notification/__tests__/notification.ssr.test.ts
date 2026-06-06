/**
 * Notification Component SSR Tests
 */
import { describe, it, expect } from 'vitest'
import Notification from '../src/notification.vue'
import { renderSSR, expectSSRHasClass } from '../../__tests__/utils/ssr'

describe('YhNotification SSR', () => {
  it('should render correctly in SSR', async () => {
    const html = await renderSSR(Notification, {
      title: 'Title',
      message: 'This is a notification',
      type: 'success',
      showClose: true
    })

    expectSSRHasClass(html, 'yh-notification')
    expectSSRHasClass(html, 'yh-notification--success')
    expect(html).toContain('Title')
    expect(html).toContain('This is a notification')
    expect(html).toContain('yh-notification__close')
  })

  it('should render different positions in SSR', async () => {
    const positions = ['top-right', 'top-left', 'bottom-right', 'bottom-left'] as const
    for (const position of positions) {
      const html = await renderSSR(Notification, { position, title: 'test' })
      expectSSRHasClass(html, `yh-notification--${position}`)
    }
  })
})
