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

    // Test share button
    await wrapper.find('.yh-ai-agent-card__share-btn').trigger('click')
    expect(wrapper.emitted('share')).toBeTruthy()

    // Test click on whole card
    await wrapper.find('.yh-ai-agent-card').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('renders statuses correctly', () => {
    // offline
    const wrapperOffline = mount(AiAgentCard, {
      props: { data: { ...mockData, status: 'offline' } }
    })
    expect(wrapperOffline.find('.yh-ai-agent-card__status-dot').classes()).toContain('is-offline')

    // busy
    const wrapperBusy = mount(AiAgentCard, {
      props: { data: { ...mockData, status: 'busy' } }
    })
    expect(wrapperBusy.find('.yh-ai-agent-card__status-dot').classes()).toContain('is-busy')
  })

  it('formats use count correctly under 1000', () => {
    const wrapper = mount(AiAgentCard, {
      props: { data: { ...mockData, stats: { uses: 500 } } }
    })
    expect(wrapper.html()).toContain('500')
  })

  it('renders extra capabilities count', () => {
    const caps = Array(6).fill({ label: 'test' })
    const wrapper = mount(AiAgentCard, {
      props: { data: { ...mockData, capabilities: caps } }
    })
    expect(wrapper.find('.yh-ai-agent-card__capability-more').exists()).toBe(true)
    expect(wrapper.find('.yh-ai-agent-card__capability-more').text()).toContain('+2')
  })

  it('renders response time', () => {
    const wrapper = mount(AiAgentCard, {
      props: { data: { ...mockData, stats: { responseTime: 120 } } }
    })
    expect(wrapper.html()).toContain('120ms')
  })

  it('covers aiAgentCardEmits validators', async () => {
    const { aiAgentCardEmits } = await import('../src/ai-agent-card')
    expect(aiAgentCardEmits.use(mockData)).toBe(true)
    expect(aiAgentCardEmits.favorite(mockData, true)).toBe(true)
    expect(aiAgentCardEmits.share(mockData)).toBe(true)
    expect(aiAgentCardEmits.click(mockData)).toBe(true)
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
  it('formats uses correctly for large numbers', async () => {
    const wrapper = mount(AiAgentCard, {
      props: { data: { ...mockData, stats: { uses: 15000 } } }
    })
    const vm = wrapper.vm as any
    expect(vm.formattedUses).toBe('1.5w')

    const wrapper2 = mount(AiAgentCard, {
      props: { data: { ...mockData, stats: { uses: 1200 } } }
    })
    expect((wrapper2.vm as any).formattedUses).toBe('1.2k')

    const wrapper3 = mount(AiAgentCard, {
      props: { data: { ...mockData, stats: { uses: 500 } } }
    })
    expect((wrapper3.vm as any).formattedUses).toBe('500')
  })

  it('handles missing stats sub-fields', () => {
    const wrapper = mount(AiAgentCard, {
      props: { data: { ...mockData, stats: {} } }
    })
    expect(wrapper.find('.yh-ai-agent-card__stats').exists()).toBe(true)
    expect(wrapper.html()).not.toContain('ms')
  })

  it('handles missing capabilities icon', () => {
    const wrapper = mount(AiAgentCard, {
      props: { data: { ...mockData, capabilities: [{ label: 'No Icon' }] } }
    })
    expect(wrapper.find('.yh-ai-agent-card__capability .yh-icon').exists()).toBe(false)
  })
})
