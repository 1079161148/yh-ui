import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AiPrompts from '../src/ai-prompts.vue'

describe('AiPrompts', () => {
  const items = [
    { content: 'Write a poem', icon: 'poem-icon' },
    { content: 'Fix a bug', description: 'Help me fix a bug' }
  ]

  it('should render items correctly', () => {
    const wrapper = mount(AiPrompts, {
      props: { items, title: 'Suggestions' }
    })
    expect(wrapper.findAll('.yh-ai-prompts__item').length).toBe(2)
    expect(wrapper.find('.yh-ai-prompts__title').text()).toBe('Suggestions')
    expect(wrapper.find('.yh-ai-prompts__description').text()).toBe('Help me fix a bug')
  })

  it('should render string items correctly', () => {
    const wrapper = mount(AiPrompts, {
      props: { items: ['Prompt 1', 'Prompt 2'] }
    })
    expect(wrapper.findAll('.yh-ai-prompts__item').length).toBe(2)
    expect(wrapper.find('.yh-ai-prompts__text').text()).toBe('Prompt 1')
  })

  it('should emit click event on item click', async () => {
    const wrapper = mount(AiPrompts, {
      props: { items }
    })
    await wrapper.find('.yh-ai-prompts__item').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')![0]).toEqual([items[0]])
  })

  it('should apply layout classes', () => {
    const wrapper = mount(AiPrompts, {
      props: { items, layout: 'vertical' }
    })
    expect(wrapper.classes()).toContain('yh-ai-prompts--vertical')
  })
})
