/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest'
import { renderToString } from '@vue/server-renderer'
import { h } from 'vue'
import AiSender from '../src/ai-sender.vue'

describe('YhAiSender SSR', () => {
  it('should render to string on server', async () => {
    const html = await renderToString(h(AiSender))
    expect(html).toContain('yh-ai-sender')
  })

  it('should render textarea on server', async () => {
    const html = await renderToString(h(AiSender))
    expect(html).toContain('textarea')
  })

  it('should render send button on server', async () => {
    const html = await renderToString(h(AiSender))
    expect(html).toContain('yh-ai-sender__send-btn')
  })

  it('should render disabled state on server', async () => {
    const html = await renderToString(h(AiSender, { disabled: true }))
    expect(html).toContain('is-disabled')
  })

  it('should render loading state on server', async () => {
    const html = await renderToString(h(AiSender, { loading: true }))
    expect(html).toContain('is-loading')
  })

  it('should render word limit on server', async () => {
    const html = await renderToString(
      h(AiSender, { modelValue: 'hi', showWordLimit: true, maxLength: 200 })
    )
    expect(html).toContain('yh-ai-sender__word-limit')
    expect(html).toContain('200')
  })

  it('should render input wrapper on server', async () => {
    const html = await renderToString(h(AiSender))
    expect(html).toContain('yh-ai-sender__input-wrapper')
  })
})
