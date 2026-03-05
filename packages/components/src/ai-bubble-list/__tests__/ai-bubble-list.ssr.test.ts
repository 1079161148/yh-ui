/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest'
import { renderToString } from '@vue/server-renderer'
import { h } from 'vue'
import AiBubbleList from '../src/ai-bubble-list.vue'

describe('YhAiBubbleList SSR', () => {
  const mockItems = [
    { id: 1, content: 'Hello', role: 'user' as const },
    { id: 2, content: 'Hi there!', role: 'assistant' as const }
  ]

  it('should render to string on server', async () => {
    const html = await renderToString(
      h(AiBubbleList, {
        items: mockItems
      })
    )
    expect(html).toContain('yh-ai-bubble-list')
    expect(html).toContain('yh-ai-bubble')
    expect(html).toContain('Hello')
    expect(html).toContain('Hi there!')
  })

  it('should render custom height on server', async () => {
    const html = await renderToString(
      h(AiBubbleList, {
        items: mockItems,
        height: '600px'
      })
    )
    expect(html).toContain('style="height:600px;"')
  })

  it('should render loading state on server', async () => {
    const html = await renderToString(
      h(AiBubbleList, {
        items: [],
        loading: true
      })
    )
    expect(html).toContain('yh-ai-bubble-list__loading')
  })

  it('should render virtual scroll skeleton on server', async () => {
    const html = await renderToString(
      h(AiBubbleList, {
        items: mockItems,
        virtualScroll: true,
        height: 400
      })
    )
    expect(html).toContain('is-virtual')
    expect(html).toContain('yh-ai-bubble-list__virtual-phantom')
    expect(html).toContain('yh-ai-bubble-list__virtual-content')
  })
})
