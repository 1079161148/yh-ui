/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest'
import { renderToString } from '@vue/server-renderer'
import { h } from 'vue'
import AiEditorSender from '../src/ai-editor-sender.vue'

describe('YhAiEditorSender SSR', () => {
  it('should render to string on server', async () => {
    const html = await renderToString(h(AiEditorSender))
    expect(html).toContain('yh-ai-editor-sender')
  })

  it('should render textarea on server', async () => {
    const html = await renderToString(h(AiEditorSender))
    expect(html).toContain('textarea')
  })

  it('should render placeholder on server', async () => {
    const html = await renderToString(h(AiEditorSender, { placeholder: 'Type here...' }))
    expect(html).toContain('Type here...')
  })

  it('should render disabled state on server', async () => {
    const html = await renderToString(h(AiEditorSender, { disabled: true }))
    expect(html).toContain('is-disabled')
  })

  it('should render loading state on server', async () => {
    const html = await renderToString(h(AiEditorSender, { loading: true }))
    expect(html).toContain('is-loading')
  })

  it('should render word limit section on server', async () => {
    const html = await renderToString(
      h(AiEditorSender, { modelValue: 'hello', showWordLimit: true, maxLength: 200 })
    )
    expect(html).toContain('yh-ai-editor-sender__word-limit')
    expect(html).toContain('200')
  })

  it('should render attachment on server', async () => {
    const html = await renderToString(
      h(AiEditorSender, {
        attachments: [{ name: 'report.pdf', type: 'document' }]
      })
    )
    expect(html).toContain('yh-ai-editor-sender__header')
    expect(html).toContain('report.pdf')
  })

  it('should render send button on server', async () => {
    const html = await renderToString(h(AiEditorSender))
    expect(html).toContain('yh-ai-editor-sender__send-btn')
  })

  it('should render footer section on server', async () => {
    const html = await renderToString(h(AiEditorSender))
    expect(html).toContain('yh-ai-editor-sender__footer')
  })
})
