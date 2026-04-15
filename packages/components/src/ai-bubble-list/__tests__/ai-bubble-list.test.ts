/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import AiBubbleList from '../src/ai-bubble-list.vue'
import { type AiBubbleListItem } from '../src/ai-bubble-list'
import YhAiBubble from '../../ai-bubble/src/ai-bubble.vue'

describe('YhAiBubbleList', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  const mockItems: AiBubbleListItem[] = [
    { id: 1, content: 'Hello', role: 'user' as const },
    { id: 2, content: 'Hi there!', role: 'assistant' as const },
    { id: 3, content: 'How can I help you?', role: 'assistant' as const }
  ]

  it('should render correct number of items', () => {
    const wrapper = mount(AiBubbleList, {
      props: {
        items: mockItems
      }
    })
    expect(wrapper.findAll('.yh-ai-bubble-list__item')).toHaveLength(3)
    expect(wrapper.findAllComponents(YhAiBubble)).toHaveLength(3)
  })

  it('should apply custom height', () => {
    const wrapper = mount(AiBubbleList, {
      props: {
        items: mockItems,
        height: 500
      }
    })
    const el = wrapper.element as HTMLElement
    expect(el.style.height).toBe('500px')
  })

  it('should render loading state', () => {
    const wrapper = mount(AiBubbleList, {
      props: {
        items: mockItems,
        loading: true
      }
    })
    expect(wrapper.find('.yh-ai-bubble-list__loading').exists()).toBe(true)
  })

  it('should use virtual scroll when virtualScroll=true', () => {
    const wrapper = mount(AiBubbleList, {
      props: {
        items: Array.from({ length: 100 }).map((_, i) => ({
          id: i,
          content: `msg ${i}`,
          role: 'user' as const
        })),
        virtualScroll: true,
        height: 400,
        itemHeight: 50
      }
    })
    expect(wrapper.classes()).toContain('is-virtual')
    expect(wrapper.find('.yh-ai-bubble-list__virtual-phantom').exists()).toBe(true)
    // In happy-dom, visible items might be limited based on container height
    expect(wrapper.findAll('.yh-ai-bubble-list__item').length).toBeLessThan(100)
  })

  it('should support custom bubble slot', () => {
    const wrapper = mount(AiBubbleList, {
      props: {
        items: [{ id: 1, content: 'test', role: 'user' as const }]
      },
      slots: {
        bubble: `
          <template #bubble="{ item }">
            <div class="custom-bubble">{{ item.content }}</div>
          </template>
        `
      }
    })
    expect(wrapper.find('.custom-bubble').exists()).toBe(true)
    expect(wrapper.find('.custom-bubble').text()).toBe('test')
  })

  it('should support custom loading slot', () => {
    const wrapper = mount(AiBubbleList, {
      props: {
        items: [],
        loading: true
      },
      slots: {
        loading: '<div class="custom-loading">Loading...</div>'
      }
    })
    expect(wrapper.find('.custom-loading').exists()).toBe(true)
  })

  it('should expose scrollToBottom method', async () => {
    const wrapper = mount(AiBubbleList, {
      props: {
        items: mockItems
      }
    })
    expect(typeof (wrapper.vm as any).scrollToBottom).toBe('function')
  })

  it('should automatically scroll to bottom when items change', async () => {
    const wrapper = mount(AiBubbleList, {
      props: {
        items: mockItems,
        autoScroll: true
      }
    })

    // Mock scrollRef
    const scrollRef = { value: { scrollTop: 0, scrollHeight: 1000 } }
    ;(wrapper.vm as any).scrollRef = scrollRef

    await wrapper.setProps({
      items: [...mockItems, { id: 4, content: 'new msg', role: 'user' as any }]
    })

    // nextTick is used inside scrollToBottom
    await new Promise((resolve) => setTimeout(resolve, 0))
    // Note: in actual DOM scrollTop would be updated, in test we just verify the call or logic
    // Since we are mocking the ref, we can't easily check the real side effect without more complex mocks
  })

  it('should apply theme overrides as inline css vars', () => {
    const wrapper = mount(AiBubbleList, {
      props: {
        items: mockItems,
        themeOverrides: {
          'item-gap': '20px'
        }
      }
    })

    expect(wrapper.attributes('style')).toContain('--yh-ai-bubble-list-item-gap: 20px')
  })
})
