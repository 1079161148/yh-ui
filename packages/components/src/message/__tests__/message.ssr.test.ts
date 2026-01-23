/**
 * Message Component SSR Tests
 */
import { describe, it, expect } from 'vitest'
import Message from '../src/message.vue'
import { renderSSR, expectSSRHasClass } from '../../__tests__/utils/ssr'

describe('YhMessage SSR', () => {
  it('should render correctly in SSR', async () => {
    const html = await renderSSR(Message, {
      message: 'Self-destruct message',
      type: 'warning',
      showClose: true
    })

    expectSSRHasClass(html, 'yh-message')
    expectSSRHasClass(html, 'yh-message--warning')
    expect(html).toContain('Self-destruct message')
    expect(html).toContain('yh-message__close')
  })

  // Message is usually invoked on client, but SSR can verify its structure
  it('should render different types in SSR', async () => {
    const types = ['success', 'info', 'warning', 'error'] as const
    for (const type of types) {
      const html = await renderSSR(Message, { type, message: 'test' })
      expectSSRHasClass(html, `yh-message--${type}`)
    }
  })
})
