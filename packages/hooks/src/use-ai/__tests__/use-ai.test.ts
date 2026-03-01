import { describe, it, expect, vi } from 'vitest'
import { useAiChat } from '../use-ai-chat'
import { useAiStream } from '../use-ai-stream'
import { useAiConversations } from '../use-ai-conversations'

describe('useAiChat', () => {
  it('should initialize with empty messages', () => {
    const { messages, isGenerating } = useAiChat()
    expect(messages.value).toEqual([])
    expect(isGenerating.value).toBe(false)
  })

  it('should send a message and resolve promise correctly', async () => {
    const { messages, isGenerating, sendMessage } = useAiChat({
      idGenerator: () => 'fixed-id-' + Math.random(),
      request: async (msg) => {
        return 'Mock reply: ' + msg
      }
    })

    const p = sendMessage('hello')
    expect(isGenerating.value).toBe(true)
    expect(messages.value.length).toBe(2)

    await p
    expect(isGenerating.value).toBe(false)
    expect(messages.value[1].content).toBe('Mock reply: hello')
    expect(messages.value[1].status).toBe('success')
  })

  it('should clear messages', () => {
    const { messages, clear } = useAiChat({
      initialMessages: [{ id: '1', role: 'user', content: 'test', createAt: 123 }]
    })
    expect(messages.value.length).toBe(1)
    clear()
    expect(messages.value.length).toBe(0)
  })
})

describe('useAiConversations', () => {
  it('should manage conversations list', () => {
    const { conversations, createConversation, removeConversation, clear, updateConversation } =
      useAiConversations()
    expect(conversations.value.length).toBe(0)

    const conv = createConversation('New Conv', { foo: 'bar' })
    expect(conversations.value.length).toBe(1)
    expect(conv.title).toBe('New Conv')
    expect(conversations.value[0].meta?.foo).toBe('bar')

    updateConversation(conv.id, { title: 'Updated' })
    expect(conversations.value[0].title).toBe('Updated')

    removeConversation(conv.id)
    expect(conversations.value.length).toBe(0)

    createConversation('Test 2')
    clear()
    expect(conversations.value.length).toBe(0)
  })
})

describe('useAiStream', () => {
  it('should stream data chunks', async () => {
    const onUpdate = vi.fn()
    const onFinish = vi.fn()

    const { isStreaming, currentContent, fetchStream } = useAiStream({
      request: async function* () {
        yield 'A'
        yield 'B'
      },
      onUpdate,
      onFinish
    })

    await fetchStream('hello')

    expect(currentContent.value).toBe('AB')
    expect(isStreaming.value).toBe(false)
    expect(onUpdate).toHaveBeenCalledWith('A')
    expect(onUpdate).toHaveBeenCalledWith('AB')
    expect(onFinish).toHaveBeenCalledWith('AB')
  })
})
