import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useAiChat, type AiChatMessage } from '../use-ai-chat'

describe('useAiChat', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('should initialize with provided messages', () => {
    const initialMessages: AiChatMessage[] = [
      {
        id: '1',
        role: 'user',
        content: 'hi',
        createAt: Date.now(),
        status: 'success'
      }
    ]
    const { messages } = useAiChat({ initialMessages })
    expect(messages.value.length).toBe(1)
    expect(messages.value[0].content).toBe('hi')
  })

  it('should clear all messages and stop generation', async () => {
    const initialMessages: AiChatMessage[] = [
      {
        id: '1',
        role: 'user',
        content: 'hi',
        createAt: Date.now(),
        status: 'success'
      }
    ]
    const { messages, clear, isGenerating } = useAiChat({ initialMessages })

    clear()
    expect(messages.value.length).toBe(0)
  })

  it('should handle sendMessage with successful string response', async () => {
    const mockRequest = vi.fn().mockResolvedValue('Hello back!')
    const { messages, sendMessage, isGenerating } = useAiChat({
      request: mockRequest,
      typewriter: false
    })

    const p = sendMessage('hi chatbot')
    expect(messages.value[0].role).toBe('user')
    expect(messages.value[0].content).toBe('hi chatbot')
    expect(messages.value[1].role).toBe('assistant')
    expect(messages.value[1].status).toBe('loading')
    expect(isGenerating.value).toBe(true)

    await p
    expect(isGenerating.value).toBe(false)
    expect(messages.value[1].content).toBe('Hello back!')
    expect(messages.value[1].status).toBe('success')
  })

  it('should inject system prompt if provided', async () => {
    const mockRequest = vi.fn().mockResolvedValue('ok')
    const { sendMessage } = useAiChat({
      request: mockRequest,
      systemPrompt: 'You are helpful',
      typewriter: false
    })

    await sendMessage('hi')
    const history = mockRequest.mock.calls[0][1]
    expect(history[0].role).toBe('system')
    expect(history[0].content).toBe('You are helpful')
  })

  it('should handle stop/abort in chat', async () => {
    const mockRequest = async function* () {
      yield 'a'
      await new Promise((r) => setTimeout(r, 100))
      yield 'b'
    }
    const { sendMessage, stop, messages, isGenerating } = useAiChat({
      request: mockRequest as any,
      typewriter: false
    })

    const p = sendMessage('wait')
    await Promise.resolve() // let loading start

    stop()
    await p
    expect(isGenerating.value).toBe(false)
    const assMsg = messages.value[messages.value.length - 1]
    expect(assMsg.status).toBe('stopped')
  })

  it('should handle message CRUD', () => {
    const { messages, removeMessage, updateMessage } = useAiChat({
      initialMessages: [
        {
          id: 'm1',
          role: 'user',
          content: 'test',
          createAt: Date.now()
        }
      ]
    })

    updateMessage('m1', { content: 'updated' })
    expect(messages.value[0].content).toBe('updated')

    removeMessage('m1')
    expect(messages.value.length).toBe(0)
  })
})
