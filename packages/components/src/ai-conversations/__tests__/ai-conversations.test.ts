import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import AiConversations from '../src/ai-conversations.vue'

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

    await wrapper.find('.yh-ai-conversations__action-btn:first-child').trigger('click')
    expect(wrapper.find('input').exists()).toBe(true)

    const inputEl = wrapper.find('input')
    await inputEl.setValue('New Title')
    await inputEl.trigger('keydown.enter')

    expect(wrapper.emitted('edit')).toBeTruthy()
    expect(wrapper.emitted('edit')![0]).toEqual([data[0], 'New Title'])
  })
})
