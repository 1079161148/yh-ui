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
  it('should manage conversations list', async () => {
    const { conversations, createConversation, removeConversation, updateConversation } =
      useAiConversations({ storage: false })
    expect(conversations.value.length).toBe(0)

    const conv = await createConversation('New Conv', { foo: 'bar' })
    expect(conversations.value.length).toBe(1)
    expect(conv.title).toBe('New Conv')
    expect(conversations.value[0].meta?.foo).toBe('bar')

    await updateConversation(conv.id, { title: 'Updated' })
    expect(conversations.value[0].title).toBe('Updated')

    await removeConversation(conv.id)
    expect(conversations.value.length).toBe(0)
  })

  it('should group conversations by time correctly', async () => {
    const DAY = 86400000
    const now = Date.now()
    const { groupedConversations } = useAiConversations({
      storage: false,
      initialConversations: [
        { id: '1', title: 'Today', updatedAt: now - 1000 },
        { id: '2', title: 'Yesterday', updatedAt: now - DAY - 1000 },
        { id: '3', title: 'Last Week', updatedAt: now - 8 * DAY },
        { id: '4', title: 'Pinned', updatedAt: now - 2 * DAY, pinned: true }
      ]
    })

    const groups = groupedConversations.value
    // Expected groups: pinned, today, last7Days, earlier
    expect(groups.find((g) => g.label === 'pinned')).toBeTruthy()
    expect(groups.find((g) => g.label === 'today')).toBeTruthy()
    expect(groups.find((g) => g.label === 'last7Days')).toBeTruthy()
  })

  it('should handle persistence with localStorage', async () => {
    const storageSpy = vi.spyOn(Storage.prototype, 'setItem')
    const { createConversation } = useAiConversations({
      storage: 'localStorage',
      storageKey: 'test-key'
    })

    await createConversation('Persisted')
    expect(storageSpy).toHaveBeenCalled()
    storageSpy.mockRestore()
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
      typewriter: false,
      onUpdate,
      onFinish
    })

    await fetchStream('hello')

    expect(currentContent.value).toBe('AB')
    expect(isStreaming.value).toBe(false)
    expect(onUpdate).toHaveBeenCalledWith('A', 'A')
    expect(onUpdate).toHaveBeenCalledWith('B', 'AB')
    expect(onFinish).toHaveBeenCalledWith('AB')
  })

  it('should support stopping the stream', async () => {
    const { isStreaming, currentContent, fetchStream, stop } = useAiStream({
      request: async function* () {
        yield 'A'
        await new Promise((r) => setTimeout(r, 100))
        yield 'B'
      }
    })

    const p = fetchStream('test')
    await new Promise((r) => setTimeout(r, 20))
    stop()
    await p

    expect(currentContent.value).toBe('A')
    expect(isStreaming.value).toBe(false)
  })

  it('should handle errors in stream', async () => {
    const onError = vi.fn()
    const { fetchStream } = useAiStream({
      request: async function* () {
        throw new Error('fail')
      },
      onError
    })

    await fetchStream('test')
    expect(onError).toHaveBeenCalled()
  })
})
