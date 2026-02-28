import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AiCodeBlock from '../src/ai-code-block.vue'

describe('YhAiCodeBlock', () => {
  it('should render correctly', () => {
    const wrapper = mount(AiCodeBlock, {
      props: {
        code: 'console.log("test")',
        filename: 'test.ts'
      }
    })
    console.log(wrapper.html())
    expect(wrapper.classes()).toContain('yh-ai-code-block')
    expect(wrapper.html()).toContain('test.ts')
    expect(wrapper.html()).toContain('console.log("test")')
  })
})
