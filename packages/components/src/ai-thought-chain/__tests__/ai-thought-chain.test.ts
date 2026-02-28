import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AiThoughtChain from '../src/ai-thought-chain.vue'

describe('YhAiThoughtChain', () => {
  it('should render correctly', () => {
    const wrapper = mount(AiThoughtChain, {
      props: {
        title: '思考',
        content: 'testing thought',
        thinking: true
      }
    })
    expect(wrapper.classes()).toContain('yh-ai-thought-chain')
    expect(wrapper.html()).toContain('思考')
  })
})
