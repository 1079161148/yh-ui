import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AiBubble from '../src/ai-bubble.vue'

describe('YhAiBubble', () => {
  it('should render correctly', () => {
    const wrapper = mount(AiBubble, {
      props: {
        content: 'hello test bubble',
        role: 'user'
      }
    })
    expect(wrapper.classes()).toContain('yh-ai-bubble')
    expect(wrapper.classes()).toContain('yh-ai-bubble--user')
    expect(wrapper.html()).toContain('hello test bubble')
  })
})
