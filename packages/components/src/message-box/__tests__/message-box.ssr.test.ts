/**
 * MessageBox Component SSR Tests
 */
import { describe, it, expect } from 'vitest'
import MessageBox from '../src/message-box.vue'
import { renderSSR, expectSSRHasClass } from '../../__tests__/utils/ssr'

describe('YhMessageBox SSR', () => {
  it('should render basic structure in SSR', async () => {
    const html = await renderSSR(MessageBox, {
      title: 'SSR Title',
      message: 'SSR Message Content'
    })

    expectSSRHasClass(html, 'yh-message-box')
    expect(html).toContain('SSR Title')
    expect(html).toContain('SSR Message Content')
  })

  it('should render glass mode in SSR', async () => {
    const html = await renderSSR(MessageBox, {
      glass: true,
      title: 'Glass'
    })

    expectSSRHasClass(html, 'yh-message-box--glass')
    expect(html).toContain('yh-message-box__bg')
  })

  it('should render prompt mode in SSR', async () => {
    const html = await renderSSR(MessageBox, {
      type: 'prompt',
      inputPlaceholder: 'Please enter'
    })

    expectSSRHasClass(html, 'yh-message-box__input')
    expect(html).toContain('Please enter')
  })
})
