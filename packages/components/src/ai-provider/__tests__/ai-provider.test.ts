import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { defineComponent, inject as vueInject } from 'vue'
import AiProvider from '../src/ai-provider.vue'
import {
  AI_PROVIDER_KEY,
  AiInterceptorManager,
  AiRequestError,
  createInterceptors
} from '../src/ai-provider'
import { useAiProvider } from '../src/use-ai-provider'

describe('AiProvider', () => {
  it('useAiProvider returns injected config', () => {
    const Child = defineComponent({
      setup() {
        const config = useAiProvider()
        return { config }
      },
      template: '<div class="provider-hook">{{ config.baseUrl }}|{{ config.assistantName }}</div>'
    })

    const wrapper = mount(AiProvider, {
      props: {
        baseUrl: '/api/ai',
        assistantName: 'Helper'
      },
      slots: {
        default: Child
      }
    })

    expect(wrapper.find('.provider-hook').text()).toBe('/api/ai|Helper')
  })

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

  it('exposes interceptor helpers and clears them correctly', () => {
    const wrapper = mount(AiProvider)

    const requestInterceptor = {
      onRequest: vi.fn((config) => config)
    }
    const responseInterceptor = {
      onResponse: vi.fn((response) => response)
    }

    const requestId = wrapper.vm.addRequestInterceptor(requestInterceptor)
    const responseId = wrapper.vm.addResponseInterceptor(responseInterceptor)

    expect(requestId).toBe(0)
    expect(responseId).toBe(0)

    const injected = wrapper.vm.$.provides[AI_PROVIDER_KEY as symbol]
    expect(injected.requestInterceptors?.getAll()).toHaveLength(1)
    expect(injected.responseInterceptors?.getAll()).toHaveLength(1)

    wrapper.vm.removeRequestInterceptor(requestId)
    wrapper.vm.removeResponseInterceptor(responseId)

    expect(injected.requestInterceptors?.getAll()[0]).toBeNull()
    expect(injected.responseInterceptors?.getAll()[0]).toBeNull()

    wrapper.vm.clearInterceptors()
    expect(injected.requestInterceptors?.getAll()).toEqual([])
    expect(injected.responseInterceptors?.getAll()).toEqual([])
  })

  it('createInterceptors creates isolated request/response managers', () => {
    const interceptors = createInterceptors()
    expect(interceptors.request).toBeInstanceOf(AiInterceptorManager)
    expect(interceptors.response).toBeInstanceOf(AiInterceptorManager)
    expect(interceptors.request).not.toBe(interceptors.response)
  })

  it('AiInterceptorManager supports use, forEach, eject and clear', () => {
    const manager = new AiInterceptorManager<{ id: string }>()
    const firstId = manager.use({ id: 'first' })
    manager.use({ id: 'second' })

    const seen: string[] = []
    manager.forEach((interceptor, index) => {
      seen.push(`${index}:${interceptor.id}`)
    })

    expect(firstId).toBe(0)
    expect(seen).toEqual(['0:first', '1:second'])

    manager.eject(0)
    expect(manager.getAll()[0]).toBeNull()

    const seenAfterEject: string[] = []
    manager.forEach((interceptor) => {
      seenAfterEject.push(interceptor.id)
    })
    expect(seenAfterEject).toEqual(['second'])

    manager.eject(99)
    expect(manager.getAll()[1]).toEqual({ id: 'second' })

    manager.clear()
    expect(manager.getAll()).toEqual([])
  })

  it('AiRequestError preserves config and code metadata', () => {
    const config = { url: '/chat', method: 'POST' as const }
    const error = new AiRequestError('Request failed', config, 'TIMEOUT')

    expect(error.name).toBe('AiRequestError')
    expect(error.message).toBe('Request failed')
    expect(error.config).toEqual(config)
    expect(error.code).toBe('TIMEOUT')
  })

  it('useAiProvider falls back to an empty config without provider', () => {
    const Child = defineComponent({
      setup() {
        const config = useAiProvider()
        return { config }
      },
      template: '<div class="provider-fallback">{{ Object.keys(config).length }}</div>'
    })

    const wrapper = mount(Child)
    expect(wrapper.find('.provider-fallback').text()).toBe('0')
  })
})
