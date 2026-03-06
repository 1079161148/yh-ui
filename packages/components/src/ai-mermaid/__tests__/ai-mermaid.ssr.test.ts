/**
 * @vitest-environment node
 */
import { describe, it, expect, vi } from 'vitest'
import { renderToString } from '@vue/server-renderer'
import { h } from 'vue'

vi.mock('mermaid', () => ({
  default: {
    initialize: vi.fn(),
    render: vi.fn().mockResolvedValue({ svg: '<svg></svg>' })
  }
}))

const { default: AiMermaid } = await import('../src/ai-mermaid.vue')

describe('YhAiMermaid SSR', () => {
  it('should render to string on server', async () => {
    const html = await renderToString(h(AiMermaid))
    expect(html).toContain('yh-ai-mermaid')
  })

  it('should render with code prop on server', async () => {
    const html = await renderToString(h(AiMermaid, { code: 'graph TD\nA-->B' }))
    expect(html).toContain('yh-ai-mermaid')
  })

  it('should render header on server', async () => {
    const html = await renderToString(h(AiMermaid, { header: 'SSR Diagram Title' }))
    expect(html).toContain('SSR Diagram Title')
    expect(html).toContain('yh-ai-mermaid__title')
  })

  it('should render actions bar on server', async () => {
    const html = await renderToString(h(AiMermaid))
    expect(html).toContain('yh-ai-mermaid__actions')
  })

  it('should render render tabs on server', async () => {
    const html = await renderToString(h(AiMermaid))
    expect(html).toContain('yh-ai-mermaid__view-switch')
  })
})
