import { describe, it, expect } from 'vitest'
import { defineComponent, h, provide, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { useId, idInjectionKey } from '../index'

describe('useId CSR', () => {
  it('should generate unique IDs', () => {
    const Child = defineComponent({
      setup() {
        const id = useId()
        return () => h('span', { id: id.value }, id.value)
      }
    })
    const TestComp = defineComponent({
      render() {
        return h('div', [h(Child), h(Child)])
      }
    })

    const wrapper = mount(TestComp)
    const spans = wrapper.findAll('span')
    const id1 = spans[0].attributes('id')
    const id2 = spans[1].attributes('id')

    expect(id1).toBeTruthy()
    expect(id2).toBeTruthy()
    expect(id1).not.toBe(id2)
  })

  it('should respect custom ID prefix', () => {
    const TestComp = defineComponent({
      setup() {
        const customPrefix = ref('custom-prefix-')
        const id = useId(customPrefix)
        return () => h('div', { id: id.value })
      }
    })

    const wrapper = mount(TestComp)
    expect(wrapper.attributes('id')).toBe('custom-prefix-')
  })

  it('should use injected ID if provided', () => {
    const Child = defineComponent({
      setup() {
        const id = useId()
        return () => h('div', { id: id.value })
      }
    })
    const Parent = defineComponent({
      setup() {
        provide(idInjectionKey, ref('injected-id'))
        return () => h(Child)
      }
    })

    const wrapper = mount(Parent)
    const child = wrapper.find('div')
    expect(child.attributes('id')).toBe('injected-id')
  })
})
