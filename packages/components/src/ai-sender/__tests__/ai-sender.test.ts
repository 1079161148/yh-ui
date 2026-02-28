import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AiSender from '../src/ai-sender.vue'

describe('YhAiSender', () => {
  it('should render correctly', () => {
    const wrapper = mount(AiSender, {
      props: {
        modelValue: 'hello'
      }
    })
    expect(wrapper.classes()).toContain('yh-ai-sender')
    expect(wrapper.find('textarea').element.value).toBe('hello')
  })
})
