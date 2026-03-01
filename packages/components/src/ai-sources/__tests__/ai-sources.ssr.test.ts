/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest'
import { renderToString } from '@vue/server-renderer'
import { h } from 'vue'
import AiSources from '../src/ai-sources.vue'

describe('YhAiSources SSR', () => {
  const mockSources = [
    {
      id: 1,
      title: 'SSR Source 1',
      source: 'vuejs.org',
      fileType: 'web',
      score: 0.95,
      excerpt: 'Excerpt 1'
    },
    {
      id: 2,
      title: 'SSR Source 2',
      source: 'github.com',
      fileType: 'code',
      score: 0.85,
      excerpt: 'Excerpt 2'
    }
  ]

  it('should render basic structure in inline mode on server', async () => {
    const html = await renderToString(
      h(AiSources, {
        sources: mockSources,
        mode: 'inline'
      })
    )
    expect(html).toContain('yh-ai-sources')
    expect(html).toContain('yh-ai-sources--inline')
    expect(html).toContain('SSR Source 1')
    expect(html).toContain('SSR Source 2')
    expect(html).toContain('2')
    expect(html).toContain('参考来源')
  })

  it('should render in card mode on server', async () => {
    const html = await renderToString(
      h(AiSources, {
        sources: mockSources,
        mode: 'card'
      })
    )
    expect(html).toContain('yh-ai-sources--card')
    expect(html).toContain('yh-ai-sources__source-card')
    expect(html).toContain('引用来源')
  })

  it('should render in badge mode on server', async () => {
    const html = await renderToString(
      h(AiSources, {
        sources: mockSources,
        mode: 'badge'
      })
    )
    expect(html).toContain('yh-ai-sources--badge')
    expect(html).toContain('yh-ai-sources__badge')
  })

  it('should render relevance score, file types and excerpt on server', async () => {
    const html = await renderToString(
      h(AiSources, {
        sources: mockSources,
        mode: 'card',
        showScore: true
      })
    )
    expect(html).toContain('95%')
    expect(html).toContain('相关度')
    expect(html).toContain('Excerpt 1')
  })

  it('should handle expansion text on server', async () => {
    const html = await renderToString(
      h(AiSources, {
        sources: mockSources,
        mode: 'card',
        maxVisible: 1
      })
    )
    expect(html).toContain('显示全部')
    expect(html).toContain('(2)')
  })
})
