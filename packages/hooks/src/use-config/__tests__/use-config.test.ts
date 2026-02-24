/**
 * useConfig Hook Tests
 * @description 测试 useConfig hook 在不同场景下的行为
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h, provide, computed, nextTick } from 'vue'
import { useConfig, configProviderContextKey, type ConfigProviderContext } from '../index'

describe('useConfig', () => {
  it('should return default values when no config provided', async () => {
    const TestComponent = defineComponent({
      setup() {
        const { globalSize, globalZIndex, globalLocale, config } = useConfig()
        return { globalSize, globalZIndex, globalLocale, config }
      },
      render() {
        return h('div')
      }
    })

    const wrapper = mount(TestComponent)
    const vm = wrapper.vm as any

    await nextTick()

    expect(vm.globalSize).toBe('default')
    expect(vm.globalZIndex).toBe(2000)
    expect(vm.globalLocale).toBeUndefined()
    expect(vm.config).toBeNull()
  })

  it('should inject and compute size from config', async () => {
    const mockConfig = computed<ConfigProviderContext>(() => ({
      size: 'large',
      zIndex: 3000,
      locale: 'zh-cn' as any
    }))

    const Child = defineComponent({
      setup() {
        return useConfig()
      },
      render() {
        return h('div')
      }
    })

    const Parent = defineComponent({
      setup() {
        provide(configProviderContextKey, mockConfig)
      },
      render() {
        return h(Child)
      }
    })

    const wrapper = mount(Parent)
    const childVm = wrapper.getComponent(Child).vm as any

    await nextTick()

    expect(childVm.globalSize).toBe('large')
    expect(childVm.globalZIndex).toBe(3000)
    expect(childVm.globalLocale).toBe('zh-cn')
  })

  it('should handle small size', async () => {
    const mockConfig = computed<ConfigProviderContext>(() => ({
      size: 'small'
    }))

    const Child = defineComponent({
      setup() {
        return useConfig()
      },
      render() {
        return h('div')
      }
    })

    const Parent = defineComponent({
      setup() {
        provide(configProviderContextKey, mockConfig)
      },
      render() {
        return h(Child)
      }
    })

    const wrapper = mount(Parent)
    const childVm = wrapper.getComponent(Child).vm as any

    await nextTick()

    expect(childVm.globalSize).toBe('small')
  })

  it('should use default values when config size is undefined', async () => {
    const mockConfig = computed<ConfigProviderContext>(() => ({
      size: undefined,
      zIndex: undefined
    }))

    const Child = defineComponent({
      setup() {
        return useConfig()
      },
      render() {
        return h('div')
      }
    })

    const Parent = defineComponent({
      setup() {
        provide(configProviderContextKey, mockConfig)
      },
      render() {
        return h(Child)
      }
    })

    const wrapper = mount(Parent)
    const childVm = wrapper.getComponent(Child).vm as any

    await nextTick()

    expect(childVm.globalSize).toBe('default')
    expect(childVm.globalZIndex).toBe(2000)
  })

  it('should handle message config', async () => {
    const mockConfig = computed<ConfigProviderContext>(() => ({
      size: 'default',
      message: {
        max: 10,
        duration: 3000,
        offset: 20
      }
    }))

    const Child = defineComponent({
      setup() {
        return useConfig()
      },
      render() {
        return h('div')
      }
    })

    const Parent = defineComponent({
      setup() {
        provide(configProviderContextKey, mockConfig)
      },
      render() {
        return h(Child)
      }
    })

    const wrapper = mount(Parent)
    const childVm = wrapper.getComponent(Child).vm as any

    await nextTick()

    expect(childVm.config.message?.max).toBe(10)
    expect(childVm.config.message?.duration).toBe(3000)
    expect(childVm.config.message?.offset).toBe(20)
  })
})
