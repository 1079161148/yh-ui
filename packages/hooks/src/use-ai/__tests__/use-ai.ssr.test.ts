import { describe, it, expect } from 'vitest'
import { defineComponent, h } from 'vue'
import { renderSSR } from '../../../../components/src/__tests__/utils/ssr'
import { useAiChat, useAiStream, useAiPersistence, useAiRequest } from '../index'

describe('useAi Hooks SSR', () => {
  it('useAiChat should be safe in SSR', async () => {
    const TestComponent = defineComponent({
      setup() {
        const { messages, isGenerating } = useAiChat()
        return () => h('div', `Messages: ${messages.value.length}, Status: ${isGenerating.value}`)
      }
    })

    const html = await renderSSR(TestComponent)
    expect(html).toContain('Messages: 0, Status: false')
  })

  it('useAiStream should be safe in SSR', async () => {
    const TestComponent = defineComponent({
      setup() {
        const { isStreaming } = useAiStream({
          request: async () => 'chunk'
        })
        return () => h('div', `Streaming: ${isStreaming.value}`)
      }
    })

    const html = await renderSSR(TestComponent)
    expect(html).toContain('Streaming: false')
  })

  it('useAiPersistence should be safe in SSR', async () => {
    const TestComponent = defineComponent({
      setup() {
        const { conversations, isLoading } = useAiPersistence()
        return () =>
          h('div', `Conversations: ${conversations.value.length}, Loading: ${isLoading.value}`)
      }
    })

    const html = await renderSSR(TestComponent)
    // Note: useAiPersistence has an onMounted loadConversations, which won't run in SSR
    expect(html).toContain('Conversations: 0')
  })

  it('useAiRequest should be safe in SSR', async () => {
    const TestComponent = defineComponent({
      setup() {
        const { loading } = useAiRequest({
          request: async () => 'data'
        })
        return () => h('div', `Loading: ${loading.value}`)
      }
    })

    const html = await renderSSR(TestComponent)
    expect(html).toContain('Loading: false')
  })
})
