import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { defineComponent, inject as vueInject } from 'vue'
import AiProvider from '../src/ai-provider.vue'
import { AI_PROVIDER_KEY } from '../src/ai-provider'

describe('AiProvider', () => {
  it('provides config to child components', () => {
    const Child = defineComponent({
      setup() {
        const config = vueInject(AI_PROVIDER_KEY)
        return { config }
      },
      template: '<div>{{ config?.userName }}</div>'
    })

    const wrapper = mount(AiProvider, {
      props: {
        userName: 'Test User'
      },
      slots: {
        default: Child
      }
    })

    expect(wrapper.text()).toBe('Test User')
  })

  it('renders slot content', () => {
    const wrapper = mount(AiProvider, {
      slots: {
        default: '<div class="slotted">Content</div>'
      }
    })
    expect(wrapper.find('.slotted').text()).toBe('Content')
  })
})
