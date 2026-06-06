/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest'
import { renderToString } from '@vue/server-renderer'
import { h } from 'vue'

const { default: AiAttachments } = await import('../src/ai-attachments.vue')

describe('YhAiAttachments SSR', () => {
  it('should render to string on server', async () => {
    const html = await renderToString(h(AiAttachments))
    expect(html).toContain('yh-ai-attachments')
  })

  it('should render with items on server', async () => {
    const items = [
      { uid: 1, name: 'test1.pdf', type: 'file' },
      { uid: 2, name: 'test2.png', type: 'image' }
    ]
    const html = await renderToString(h(AiAttachments, { items }))
    expect(html).toContain('yh-ai-attachments')
    expect(html).toContain('yh-ai-attachments__item')
    expect(html).toContain('test1.pdf')
    expect(html).toContain('test2.png')
  })

  it('should render overflow mode class on server', async () => {
    const html = await renderToString(h(AiAttachments, { overflow: 'scrollY' }))
    expect(html).toContain('yh-ai-attachments--overflow-scrollY')
  })

  it('should render without upload when hideUpload on server', async () => {
    const html = await renderToString(h(AiAttachments, { hideUpload: true }))
    expect(html).toContain('yh-ai-attachments')
  })

  it('should render disabled state on server', async () => {
    const html = await renderToString(h(AiAttachments, { disabled: true }))
    expect(html).toContain('yh-ai-attachments')
  })
})
