/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest'
import { renderToString } from '@vue/server-renderer'
import { h } from 'vue'

const { default: AiFileCard } = await import('../src/ai-file-card.vue')

describe('YhAiFileCard SSR', () => {
  it('should render to string on server', async () => {
    const html = await renderToString(h(AiFileCard, { name: 'doc.pdf' }))
    expect(html).toContain('yh-ai-file-card')
    expect(html).toContain('doc.pdf')
  })

  it('should render size modifier on server', async () => {
    const html = await renderToString(h(AiFileCard, { name: 'x.pdf', size: 'small' }))
    expect(html).toContain('yh-ai-file-card--small')
  })

  it('should render file size on server', async () => {
    const html = await renderToString(h(AiFileCard, { name: 'x.pdf', byte: 1024 }))
    expect(html).toContain('yh-ai-file-card__size')
  })

  it('should render description on server', async () => {
    const html = await renderToString(
      h(AiFileCard, { name: 'x.pdf', description: 'SSR description' })
    )
    expect(html).toContain('SSR description')
  })

  it('should render loading state on server', async () => {
    const html = await renderToString(h(AiFileCard, { name: 'x.pdf', loading: true }))
    expect(html).toContain('yh-ai-file-card')
  })
})
