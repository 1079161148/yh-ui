import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import AiAgentCard from '../src/ai-agent-card.vue'

describe('AiAgentCard', () => {
  const mockData = {
    id: '1',
    name: 'Test Agent',
    model: 'GPT-4',
    description: 'This is a test description',
    avatar: 'robot',
    verified: true,
    status: 'online' as const,
    stats: {
      uses: 1000,
      rating: 4.5
    },
    capabilities: [{ label: 'Chat', type: 'primary' as const }]
  }

  it('renders basic information correctly', () => {
    const wrapper = mount(AiAgentCard, {
      props: {
        data: mockData
      }
    })
    expect(wrapper.find('.yh-ai-agent-card__name').text()).toBe('Test Agent')
    expect(wrapper.find('.yh-ai-agent-card__model').text()).toBe('GPT-4')
    expect(wrapper.find('.yh-ai-agent-card__description').text()).toBe('This is a test description')
  })

  it('handles compact layout correctly', () => {
    const wrapper = mount(AiAgentCard, {
      props: {
        data: mockData,
        layout: 'compact'
      }
    })
    // 检查是否包含紧凑布局类名
    const cardNode = wrapper.find('.yh-ai-agent-card')
    expect(cardNode.exists()).toBe(true)
    expect(cardNode.classes()).toContain('yh-ai-agent-card--compact')

    // Stats 应该存在且可见 (依据我们的修复)
    expect(wrapper.find('.yh-ai-agent-card__stats').exists()).toBe(true)
  })

  it('emits events on interaction', async () => {
    const wrapper = mount(AiAgentCard, {
      props: {
        data: mockData
      }
    })

    await wrapper.find('.yh-ai-agent-card__use-btn').trigger('click')
    expect(wrapper.emitted('use')).toBeTruthy()
    expect(wrapper.emitted('use')![0][0]).toEqual(mockData)

    await wrapper.find('.yh-ai-agent-card__fav-btn').trigger('click')
    expect(wrapper.emitted('favorite')).toBeTruthy()
  })

  it('renders loading state', () => {
    const wrapper = mount(AiAgentCard, {
      props: {
        data: mockData,
        loading: true
      }
    })
    const cardNode = wrapper.find('.yh-ai-agent-card')
    expect(cardNode.classes()).toContain('is-loading')
    expect(wrapper.find('.yh-ai-agent-card__skeleton-avatar').exists()).toBe(true)
  })
})
