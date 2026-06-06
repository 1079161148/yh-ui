/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest'
import { renderToString } from '@vue/server-renderer'
import { h } from 'vue'
import AiActionGroup from '../src/ai-action-group.vue'

describe('YhAiActionGroup SSR', () => {
  it('should render to string on server', async () => {
    const html = await renderToString(h(AiActionGroup, { items: ['copy', 'regenerate'] }))
    expect(html).toContain('yh-ai-action-group')
    expect(html).toContain('yh-ai-action-group--horizontal')
  })

  it('should render vertical direction on server', async () => {
    const html = await renderToString(h(AiActionGroup, { items: [], direction: 'vertical' }))
    expect(html).toContain('yh-ai-action-group--vertical')
  })

  it('should render item count correctly on server', async () => {
    const html = await renderToString(
      h(AiActionGroup, {
        items: [
          { key: 'share', icon: 'share', label: '分享' },
          { key: 'edit', icon: 'edit', label: '编辑' }
        ]
      })
    )
    // Should contain both labels
    expect(html).toContain('分享')
    expect(html).toContain('编辑')
  })

  it('should render disabled state on server', async () => {
    const html = await renderToString(
      h(AiActionGroup, {
        items: [{ key: 'delete', icon: 'delete', disabled: true }]
      })
    )
    expect(html).toContain('is-disabled')
  })

  it('should render size class on server', async () => {
    const html = await renderToString(h(AiActionGroup, { items: [], size: 'large' }))
    expect(html).toContain('yh-ai-action-group--large')
  })
})
