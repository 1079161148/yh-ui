import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AiChat from '../src/ai-chat.vue'

describe('YhAiChat', () => {
  it('should render correctly', () => {
    const wrapper = mount(AiChat, {
      props: {
        messages: [{ id: '1', role: 'user', content: 'hello' }]
      }
    })
    expect(wrapper.classes()).toContain('yh-ai-chat')
    expect(wrapper.html()).toContain('hello')
  })
})
