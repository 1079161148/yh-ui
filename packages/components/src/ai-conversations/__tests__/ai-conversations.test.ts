import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import AiConversations from '../src/ai-conversations.vue'
import { YhConfigProvider } from '../../config-provider'
import { en } from '@yh-ui/locale'

describe('AiConversations', () => {
  const data = [
    { id: '1', title: 'Conversation 1', updatedAt: Date.now() },
    { id: '2', title: 'Conversation 2', updatedAt: Date.now() }
  ]

  it('should render items correctly', () => {
    const wrapper = mount(AiConversations, {
      props: { data }
    })
    expect(wrapper.findAll('.yh-ai-conversations__item').length).toBe(2)
    expect(wrapper.find('.yh-ai-conversations__title').text()).toBe('Conversation 1')
  })

  it('should emit click event on item click', async () => {
    const wrapper = mount(AiConversations, {
      props: { data }
    })
    await wrapper.find('.yh-ai-conversations__item').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('update:activeId')![0]).toEqual(['1'])
  })

  it('should emit create event when add button is clicked', async () => {
    const wrapper = mount(AiConversations)
    await wrapper.find('.yh-ai-conversations__add-btn').trigger('click')
    expect(wrapper.emitted('create')).toBeTruthy()
  })

  it('should emit delete event when delete button is clicked', async () => {
    const wrapper = mount(AiConversations, {
      props: { data }
    })
    await wrapper.find('.yh-ai-conversations__action-btn:last-child').trigger('click')
    expect(wrapper.emitted('delete')).toBeTruthy()
    expect(wrapper.emitted('delete')![0]).toEqual([data[0]]) // it's first child's last action btn or something
  })

  it('should enter edit mode and emit edit event', async () => {
    const wrapper = mount(AiConversations, {
      props: { data }
    })

    // Mocking input focus for nextTick
    const input = document.createElement('input')
    vi.spyOn(document, 'querySelector').mockReturnValue(input)

    await wrapper.find('.yh-ai-conversations__action-btn:nth-child(2)').trigger('click')
    expect(wrapper.find('input').exists()).toBe(true)

    const inputEl = wrapper.find('input')
    await inputEl.setValue('New Title')
    await inputEl.trigger('keydown.enter')

    expect(wrapper.emitted('edit')).toBeTruthy()
    expect(wrapper.emitted('edit')![0]).toEqual([data[0], 'New Title'])
  })

  it('should use config-provider locale text', async () => {
    const wrapper = mount(YhConfigProvider, {
      props: { locale: en },
      slots: {
        default: () => h(AiConversations)
      }
    })

    await nextTick()
    expect(wrapper.text()).toContain('New Conversation')
    expect(wrapper.text()).toContain('No conversations yet')
  })

  it('should expose scroll helpers', () => {
    const wrapper = mount(AiConversations, {
      props: { data }
    })

    expect(typeof wrapper.vm.scrollToItem).toBe('function')
    expect(typeof wrapper.vm.scrollToIndex).toBe('function')
  })

  it('should apply theme overrides as inline css vars', () => {
    const wrapper = mount(AiConversations, {
      props: {
        data,
        themeOverrides: {
          'active-bg-color': '#111111'
        }
      }
    })

    expect(wrapper.attributes('style')).toContain('--yh-ai-conversations-active-bg-color: #111111')
  })
})
