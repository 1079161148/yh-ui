/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest'
import { renderToString } from '@vue/server-renderer'
import { h } from 'vue'
import AiWelcome from '../src/ai-welcome.vue'

describe('YhAiWelcome SSR', () => {
  it('should render to string on server', async () => {
    const html = await renderToString(h(AiWelcome))
    expect(html).toContain('yh-ai-welcome')
  })

  it('should render title on server', async () => {
    const html = await renderToString(h(AiWelcome, { title: 'Hello AI' }))
    expect(html).toContain('yh-ai-welcome__title')
    expect(html).toContain('Hello AI')
  })

  it('should render description on server', async () => {
    const html = await renderToString(h(AiWelcome, { description: 'Server description' }))
    expect(html).toContain('yh-ai-welcome__description')
    expect(html).toContain('Server description')
  })

  it('should render icon wrapper when showIcon=true', async () => {
    const html = await renderToString(h(AiWelcome, { showIcon: true }))
    expect(html).toContain('yh-ai-welcome__icon-wrapper')
  })

  it('should not render icon wrapper when showIcon=false', async () => {
    const html = await renderToString(h(AiWelcome, { showIcon: false }))
    expect(html).not.toContain('yh-ai-welcome__icon-wrapper')
  })

  it('should render suggestions on server', async () => {
    const suggestions = [
      { title: 'Write code', description: 'Help me write code', icon: 'edit', prompt: 'code' },
      { title: 'Translate', prompt: 'translate' }
    ]
    const html = await renderToString(h(AiWelcome, { suggestions }))
    expect(html).toContain('yh-ai-welcome__card')
    expect(html).toContain('Write code')
    expect(html).toContain('Translate')
    expect(html).toContain('Help me write code')
  })
})
