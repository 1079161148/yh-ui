/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest'
import { renderToString } from '@vue/server-renderer'
import { h } from 'vue'
import AiAgentCard from '../src/ai-agent-card.vue'

describe('YhAiAgentCard SSR', () => {
  const mockData = {
    id: '1',
    name: 'SSR Agent',
    model: 'GPT-SSR',
    description: 'Server side rendering test',
    avatar: 'robot',
    status: 'online' as const
  }

  it('should render basic structure on server', async () => {
    const html = await renderToString(
      h(AiAgentCard, {
        data: mockData
      })
    )
    expect(html).toContain('yh-ai-agent-card')
    expect(html).toContain('SSR Agent')
    expect(html).toContain('GPT-SSR')
  })

  it('should render horizontal layout on server', async () => {
    const html = await renderToString(
      h(AiAgentCard, {
        data: mockData,
        layout: 'horizontal'
      })
    )
    expect(html).toContain('yh-ai-agent-card--horizontal')
  })

  it('should render compact layout on server', async () => {
    const html = await renderToString(
      h(AiAgentCard, {
        data: mockData,
        layout: 'compact'
      })
    )
    expect(html).toContain('yh-ai-agent-card--compact')
  })

  it('should render stats on server', async () => {
    const html = await renderToString(
      h(AiAgentCard, {
        data: {
          ...mockData,
          stats: { uses: 1000, rating: 4.8 }
        }
      })
    )
    expect(html).toContain('yh-ai-agent-card__stats')
    expect(html).toContain('1.0k')
    expect(html).toContain('4.8')
  })

  it('should render loading state on server', async () => {
    const html = await renderToString(
      h(AiAgentCard, {
        data: mockData,
        loading: true
      })
    )
    expect(html).toContain('is-loading')
    expect(html).toContain('yh-ai-agent-card__skeleton-avatar')
  })
})
