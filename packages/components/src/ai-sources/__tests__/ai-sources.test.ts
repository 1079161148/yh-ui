import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import AiSources from '../src/ai-sources.vue'

describe('AiSources', () => {
  const mockSources = [
    {
      id: 1,
      title: 'Source 1',
      source: 'vuejs.org',
      fileType: 'web',
      score: 0.95,
      excerpt: 'Excerpt 1'
    },
    {
      id: 2,
      title: 'Source 2',
      source: 'github.com',
      fileType: 'code',
      score: 0.85,
      excerpt: 'Excerpt 2'
    },
    { id: 3, title: 'Source 3', fileType: 'pdf', score: 0.75 }
  ]

  it('renders inline mode by default', () => {
    const wrapper = mount(AiSources, {
      props: {
        sources: mockSources
      }
    })
    expect(wrapper.classes()).toContain('yh-ai-sources--inline')
    expect(wrapper.find('.yh-ai-sources__inline-item').exists()).toBe(true)
    expect(wrapper.findAll('.yh-ai-sources__inline-item')).toHaveLength(3)
  })

  it('renders card mode correctly', () => {
    const wrapper = mount(AiSources, {
      props: {
        sources: mockSources,
        mode: 'card'
      }
    })
    expect(wrapper.classes()).toContain('yh-ai-sources--card')
    expect(wrapper.find('.yh-ai-sources__source-card').exists()).toBe(true)
  })

  it('renders badge mode correctly', () => {
    const wrapper = mount(AiSources, {
      props: {
        sources: mockSources,
        mode: 'badge'
      }
    })
    expect(wrapper.classes()).toContain('yh-ai-sources--badge')
    expect(wrapper.findAll('.yh-ai-sources__badge')).toHaveLength(3)
  })

  it('handles expansion correctly', async () => {
    const wrapper = mount(AiSources, {
      props: {
        sources: mockSources,
        maxVisible: 1,
        mode: 'card'
      }
    })
    expect(wrapper.findAll('.yh-ai-sources__source-card')).toHaveLength(1)
    const expandBtn = wrapper.find('.yh-ai-sources__expand-btn')
    expect(expandBtn.exists()).toBe(true)

    await expandBtn.trigger('click')
    expect(wrapper.findAll('.yh-ai-sources__source-card')).toHaveLength(3)
  })

  it('emits events on interaction', async () => {
    const wrapper = mount(AiSources, {
      props: {
        sources: mockSources,
        mode: 'card'
      }
    })
    await wrapper.find('.yh-ai-sources__source-card').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')![0][0]).toEqual(mockSources[0])
  })

  it('shows relevance score when enabled', () => {
    const wrapper = mount(AiSources, {
      props: {
        sources: mockSources,
        showScore: true,
        mode: 'card'
      }
    })
    expect(wrapper.find('.yh-ai-sources__score-badge').text()).toContain('95%')
  })
})
