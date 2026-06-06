/**
 * AiConversations Component SSR Tests
 */
import { describe, it, expect } from 'vitest'
import AiConversations from '../src/ai-conversations.vue'
import { renderSSR, expectSSRHasClass, testHydration } from '../../__tests__/utils/ssr'

describe('YhAiConversations SSR', () => {
  const mockData = [
    { id: '1', title: 'Conversation 1', updatedAt: Date.now() },
    { id: '2', title: 'Conversation 2', updatedAt: Date.now() }
  ]

  it('should render correctly in SSR', async () => {
    const html = await renderSSR(AiConversations, {
      data: mockData,
      activeId: '1'
    })

    expectSSRHasClass(html, 'yh-ai-conversations')
    expect(html).toContain('Conversation 1')
    expect(html).toContain('Conversation 2')
    // Check for active class
    expect(html).toContain('is-active')
  })

  it('should render loading state in SSR', async () => {
    const html = await renderSSR(AiConversations, {
      data: [],
      loading: true
    })
    expectSSRHasClass(html, 'is-loading')
    expectSSRHasClass(html, 'yh-ai-conversations__loading-placer')
  })

  it('should render empty state in SSR', async () => {
    const html = await renderSSR(AiConversations, {
      data: [],
      loading: false
    })
    expect(html).toContain('yh-ai-conversations__empty')
    expect(html).toContain('暂无对话记录')
  })

  it('should hydrate without mismatch', async () => {
    const result = await testHydration(AiConversations, {
      data: mockData,
      activeId: '2'
    })
    expect(result.isMatch).toBe(true)
  })
})
