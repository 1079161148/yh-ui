/**
 * AiPrompts Component SSR Tests
 */
import { describe, it, expect } from 'vitest'
import AiPrompts from '../src/ai-prompts.vue'
import { renderSSR, expectSSRHasClass, testHydration } from '../../__tests__/utils/ssr'

describe('YhAiPrompts SSR', () => {
  const mockItems = [
    { id: '1', content: 'Prompt 1', description: 'Desc 1', icon: 'sparkles' },
    { id: '2', content: 'Prompt 2' }
  ]

  it('should render correctly in SSR', async () => {
    const html = await renderSSR(AiPrompts, {
      items: mockItems,
      title: 'Suggested Prompts'
    })

    expectSSRHasClass(html, 'yh-ai-prompts')
    expect(html).toContain('Suggested Prompts')
    expect(html).toContain('Prompt 1')
    expect(html).toContain('Desc 1')
    expect(html).toContain('Prompt 2')
  })

  it('should render horizontal layout in SSR', async () => {
    const html = await renderSSR(AiPrompts, {
      items: mockItems,
      layout: 'horizontal'
    })
    expectSSRHasClass(html, 'yh-ai-prompts--horizontal')
  })

  it('should render vertical layout in SSR', async () => {
    const html = await renderSSR(AiPrompts, {
      items: mockItems,
      layout: 'vertical'
    })
    expectSSRHasClass(html, 'yh-ai-prompts--vertical')
  })

  it('should hydrate without mismatch', async () => {
    const result = await testHydration(AiPrompts, {
      items: mockItems,
      title: 'Prompts'
    })
    expect(result.isMatch).toBe(true)
  })
})
