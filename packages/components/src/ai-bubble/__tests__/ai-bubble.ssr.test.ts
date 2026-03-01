/**
 * @vitest-environment node
 */
import { describe, it, expect, vi } from 'vitest'
import { renderToString } from '@vue/server-renderer'
import { h } from 'vue'

vi.mock('markdown-it', async () => {
  class MockMd {
    inline = {
      ruler: {
        after: vi.fn()
      }
    }
    render(content: string) {
      return `<p>${content}</p>`
    }
  }
  return { default: MockMd }
})
vi.mock('highlight.js', () => ({
  default: { getLanguage: () => false, highlight: vi.fn() }
}))
vi.mock('highlight.js/styles/atom-one-dark.css', () => ({}))

const { default: AiBubble } = await import('../src/ai-bubble.vue')

describe('YhAiBubble SSR', () => {
  it('should render to string on server', async () => {
    const html = await renderToString(h(AiBubble, { content: 'SSR hello', role: 'assistant' }))
    expect(html).toContain('yh-ai-bubble')
    expect(html).toContain('yh-ai-bubble--assistant')
  })

  it('should render user role on server', async () => {
    const html = await renderToString(h(AiBubble, { content: 'User msg', role: 'user' }))
    expect(html).toContain('yh-ai-bubble--user')
    expect(html).toContain('yh-ai-bubble--placement-end')
  })

  it('should render time on server', async () => {
    const html = await renderToString(
      h(AiBubble, { content: 'hi', time: '09:30', role: 'assistant' })
    )
    expect(html).toContain('09:30')
    expect(html).toContain('yh-ai-bubble__time')
  })

  it('should render loading state on server', async () => {
    const html = await renderToString(h(AiBubble, { content: '', loading: true }))
    expect(html).toContain('is-loading')
    expect(html).toContain('yh-ai-bubble__typing-indicator')
  })

  it('should not render avatar for system role on server', async () => {
    const html = await renderToString(h(AiBubble, { content: 'sys', role: 'system' }))
    expect(html).not.toContain('yh-ai-bubble__avatar')
  })

  it('should render markdown class when markdown=true', async () => {
    const html = await renderToString(h(AiBubble, { content: 'hello', markdown: true }))
    expect(html).toContain('yh-ai-bubble__markdown')
  })

  it('should render plain text class when markdown=false', async () => {
    const html = await renderToString(h(AiBubble, { content: 'plain', markdown: false }))
    expect(html).toContain('yh-ai-bubble__text')
    expect(html).toContain('plain')
  })
})
