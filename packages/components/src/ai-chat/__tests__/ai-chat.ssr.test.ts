/**
 * @vitest-environment node
 */
import { describe, it, expect, vi } from 'vitest'
import { renderToString } from '@vue/server-renderer'
import { h } from 'vue'

vi.mock('markdown-it', async () => {
  class MockMd {
    render(content: string) {
      return `<p>${content}</p>`
    }
  }
  return { default: MockMd }
})
vi.mock('highlight.js', () => ({
  default: {
    getLanguage: () => false,
    highlight: vi.fn(),
    highlightAuto: vi.fn(() => ({ value: '' }))
  }
}))
vi.mock('highlight.js/styles/atom-one-dark.css', () => ({}))

const { default: AiChat } = await import('../src/ai-chat.vue')

describe('YhAiChat SSR', () => {
  it('should render to string on server', async () => {
    const html = await renderToString(h(AiChat))
    expect(html).toContain('yh-ai-chat')
  })

  it('should render content area on server', async () => {
    const html = await renderToString(h(AiChat))
    expect(html).toContain('yh-ai-chat__content')
  })

  it('should render footer on server', async () => {
    const html = await renderToString(h(AiChat))
    expect(html).toContain('yh-ai-chat__footer')
  })

  it('should render message content on server', async () => {
    const html = await renderToString(
      h(AiChat, {
        messages: [{ id: '1', role: 'user', content: 'SSR hello' }]
      })
    )
    expect(html).toContain('SSR hello')
  })

  it('should render suggestions on server when messages empty', async () => {
    const html = await renderToString(
      h(AiChat, {
        messages: [],
        suggestions: ['Write code', 'Translate']
      })
    )
    expect(html).toContain('Write code')
    expect(html).toContain('Translate')
  })

  it('should render header with clear button when messages exist on server', async () => {
    const html = await renderToString(
      h(AiChat, {
        messages: [{ id: '1', role: 'user', content: 'hi' }]
      })
    )
    expect(html).toContain('yh-ai-chat__header')
  })

  it('should render loading bubble on server when loading=true', async () => {
    const html = await renderToString(h(AiChat, { loading: true, messages: [] }))
    expect(html).toContain('is-loading')
  })
})
