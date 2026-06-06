import { describe, it, expect } from 'vitest'
import { defineComponent, h, provide } from 'vue'
import { mount } from '@vue/test-utils'
import {
  useZIndex,
  createZIndexCounter,
  zIndexCounterKey,
  getNextZIndex,
  resetZIndex
} from '../index'

describe('useZIndex CSR', () => {
  it('should initialize with default value', () => {
    const TestComp = defineComponent({
      setup() {
        const { currentZIndex } = useZIndex()
        return () => h('div', { 'data-z': currentZIndex.value })
      }
    })
    const wrapper = mount(TestComp)
    expect(wrapper.find('div').attributes('data-z')).toBe('2000')
  })

  it('should increment z-index', () => {
    const TestComp = defineComponent({
      setup() {
        const { nextZIndex } = useZIndex()
        return { z1: nextZIndex(), z2: nextZIndex() }
      },
      render() {
        return h('div')
      }
    })
    const wrapper = mount(TestComp)
    const vm = wrapper.vm as any
    expect(vm.z1).toBe(2001)
    expect(vm.z2).toBe(2002)
  })

  it('should use provider injected counter', () => {
    const Child = defineComponent({
      setup() {
        const { nextZIndex } = useZIndex()
        return () => h('div', { 'data-z': nextZIndex() })
      }
    })
    const Parent = defineComponent({
      setup() {
        provide(zIndexCounterKey, createZIndexCounter(3000))
        return () => h(Child)
      }
    })
    const wrapper = mount(Parent)
    expect(wrapper.find('div').attributes('data-z')).toBe('3001')
  })

  it('should be globally persistent in window', () => {
    if (typeof window !== 'undefined') {
      resetZIndex()
      const z1 = getNextZIndex()
      const z2 = getNextZIndex()
      expect(z2).toBe(z1 + 1)
    }
  })
})
