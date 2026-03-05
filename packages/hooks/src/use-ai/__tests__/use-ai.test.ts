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

  it('should remove and update message', () => {
    const { messages, removeMessage, updateMessage } = useAiChat({
      initialMessages: [
        { id: '1', role: 'user', content: 'hello', createAt: 123 },
        { id: '2', role: 'assistant', content: 'world', createAt: 124 }
      ]
    })

    updateMessage('1', { content: 'hello updated' })
    expect(messages.value[0].content).toBe('hello updated')

    removeMessage('2')
    expect(messages.value.length).toBe(1)
  })

  it('should support stream generator request', async () => {
    const onFinish = vi.fn()
    const { messages, sendMessage } = useAiChat({
      systemPrompt: 'System prompt here',
      request: async function* () {
        yield 'Chunks'
      },
      typewriter: false,
      onFinish
    })
    await sendMessage('hello')
    expect(messages.value[messages.value.length - 1].content).toBe('Chunks')
    expect(onFinish).toHaveBeenCalled()
  })

  it('should support fetch response stream request', async () => {
    const encoder = new TextEncoder()
    let calls = 0
    const mockResponse = new Response(new ReadableStream())
    Object.defineProperty(mockResponse, 'body', {
      value: {
        getReader: () => ({
          read: vi.fn().mockImplementation(() => {
            if (calls === 0) {
              calls++
              return Promise.resolve({ done: false, value: encoder.encode('Rsp') })
            }
            return Promise.resolve({ done: true })
          }),
          cancel: vi.fn()
        })
      }
    })

    const { messages, sendMessage } = useAiChat({
      request: async () => mockResponse,
      typewriter: false
    })
    await sendMessage('trigger stream')
    expect(messages.value[messages.value.length - 1].content).toBe('Rsp')
  })

  it('should handle errors in request', async () => {
    const onError = vi.fn()
    const { messages, sendMessage } = useAiChat({
      request: async () => {
        throw new Error('fail request')
      },
      onError
    })
    await sendMessage('fail msg')
    expect(onError).toHaveBeenCalled()
    expect(messages.value[messages.value.length - 1].status).toBe('error')
  })

  it('should support stopping', async () => {
    const { messages, sendMessage, stop } = useAiChat({
      request: async function* () {
        yield 'A'
        await new Promise((r) => setTimeout(r, 100))
        yield 'B'
      },
      typewriter: false
    })
    const p = sendMessage('hello stop')
    await new Promise((r) => setTimeout(r, 20))
    stop()
    await p
    expect(messages.value[messages.value.length - 1].status).toBe('stopped')
  })

  it('should support typewriter cancel and flush in chat', async () => {
    let rAFCb: any
    vi.stubGlobal('requestAnimationFrame', (cb: any) => {
      rAFCb = cb
      return 1
    })
    vi.stubGlobal('cancelAnimationFrame', vi.fn())

    const { messages, sendMessage, stop } = useAiChat({
      request: async function* () {
        yield 'long text '
        yield 'more text '
      },
      typewriter: true,
      charsPerFrame: 1
    })

    const p = sendMessage('test')
    // Call the manually captured rAF callback to advance queue
    if (rAFCb) rAFCb()

    stop() // trigger cancel/flush
    await p

    vi.unstubAllGlobals()
  })

  it('should handle fetch response stop in chat', async () => {
    const encoder = new TextEncoder()
    const mockReader = {
      read: vi.fn(
        () =>
          new Promise((r) => setTimeout(() => r({ done: false, value: encoder.encode('R1') }), 50))
      ),
      cancel: vi.fn()
    }
    const mockResponse = new Response(new ReadableStream())
    Object.defineProperty(mockResponse, 'body', { value: { getReader: () => mockReader } })

    const { sendMessage, stop } = useAiChat({
      request: async () => mockResponse as any,
      typewriter: false
    })

    const p = sendMessage('stop this')
    await new Promise((r) => setTimeout(r, 10))
    stop()
    await p
    expect(mockReader.cancel).toHaveBeenCalled()
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
        { id: '4', title: 'Pinned', updatedAt: now - 2 * DAY, pinned: true },
        { id: '5', title: 'Earlier', updatedAt: now - 32 * DAY }
      ]
    })

    const groups = groupedConversations.value
    // Expected groups: pinned, today, last7Days, earlier
    expect(groups.find((g) => g.label === 'pinned')).toBeTruthy()
    expect(groups.find((g) => g.label === 'today')).toBeTruthy()
    expect(groups.find((g) => g.label === 'last7Days')).toBeTruthy()
    expect(groups.find((g) => g.label === 'earlier')).toBeTruthy()
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

  it('should handle storage edge cases', async () => {
    // 1. Storage API throws
    const { localStorageAdapter } = await import('../use-ai-conversations')
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('fail')
    })
    expect(localStorageAdapter.getItem('k')).toBe(null)

    vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
      throw new Error('fail')
    })
    expect(() => localStorageAdapter.removeItem('k')).not.toThrow()

    vi.restoreAllMocks()

    // 2. JSON.parse error in initial load
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('{ invalid json')
    const { conversations } = useAiConversations()
    expect(conversations.value.length).toBe(0)
    vi.restoreAllMocks()

    // 3. custom storage adapter
    const custom = { getItem: vi.fn(), setItem: vi.fn(), removeItem: vi.fn() }
    const wrapper = useAiConversations({ storage: custom })
    expect(wrapper).toBeTruthy()
  })

  it('should support pagination', async () => {
    const { pagedConversations, hasMore, loadMore } = useAiConversations({
      storage: false,
      pageSize: 2,
      initialConversations: [
        { id: '1', title: '1', updatedAt: 1 },
        { id: '2', title: '2', updatedAt: 2 },
        { id: '3', title: '3', updatedAt: 3 }
      ]
    })

    // Sorts by time descending initially
    expect(pagedConversations.value.length).toBe(2)
    expect(hasMore.value).toBe(true)

    const p = loadMore()
    await p

    expect(pagedConversations.value.length).toBe(3)
    expect(hasMore.value).toBe(false)
  })

  it('should support pin and clear', async () => {
    const { conversations, pinConversation, clear } = useAiConversations({
      storage: false,
      initialConversations: [
        { id: '1', title: '1', updatedAt: 100 },
        { id: '2', title: '2', updatedAt: 200 }
      ]
    })

    // initially 200 is first
    expect(conversations.value[0].id).toBe('2')

    await pinConversation('1')
    // now 1 is pinned so it comes first
    expect(conversations.value[0].id).toBe('1')
    expect(conversations.value[0].pinned).toBe(true)

    await clear()
    expect(conversations.value.length).toBe(0)
  })

  it('should support remoteSync', async () => {
    const mockSync = {
      fetchConversations: vi
        .fn()
        .mockResolvedValue([{ id: '99', title: 'Remote', updatedAt: Date.now() }]),
      createConversation: vi.fn(),
      updateConversation: vi.fn(),
      deleteConversation: vi.fn(),
      batchUpdate: vi.fn().mockResolvedValue([])
    }

    const { syncToRemote, fetchFromRemote, startSync, stopSync, isSyncing, syncError } =
      useAiConversations({
        storage: false,
        remoteSync: mockSync,
        autoSync: true,
        syncInterval: 1000
      })

    // It automatically starts sync
    // Let's test fetchFromRemote
    await fetchFromRemote()
    expect(mockSync.fetchConversations).toHaveBeenCalled()

    await syncToRemote()
    expect(mockSync.batchUpdate).toHaveBeenCalled()

    // Stop sync
    stopSync()
  })

  it('should handle remote sync errors', async () => {
    const mockSync = {
      batchUpdate: vi.fn(() => Promise.reject(new Error('batch err'))),
      fetchConversations: vi.fn(() => Promise.reject('string err')),
      createConversation: vi.fn(),
      updateConversation: vi.fn(),
      deleteConversation: vi.fn()
    }
    const hook = useAiConversations({ remoteSync: mockSync })

    await hook.syncToRemote()
    expect((hook.syncError.value as Error).message).toBe('batch err')

    await hook.fetchFromRemote()
    expect((hook.syncError.value as Error).message).toBe('string err')
  })

  it('should cover IndexedDBAdapter', async () => {
    const { IndexedDBAdapter } = await import('../use-ai-conversations')
    // Mock indexedDB
    const mockTx = {
      objectStore: vi.fn(() => ({
        put: vi.fn(),
        get: vi.fn(() => {
          const req = { onsuccess: null as any, result: 'val' }
          setTimeout(() => {
            if (req.onsuccess) req.onsuccess()
          }, 0)
          return req
        }),
        delete: vi.fn()
      })),
      oncomplete: null as any
    }
    const dummyReq = {
      result: {
        createObjectStore: vi.fn(),
        transaction: vi.fn(() => {
          setTimeout(() => {
            if (mockTx.oncomplete) mockTx.oncomplete()
          }, 0)
          return mockTx
        })
      },
      onupgradeneeded: null as any,
      onsuccess: null as any,
      onerror: null as any
    }
    global.indexedDB = {
      open: vi.fn(() => {
        setTimeout(() => dummyReq.onsuccess(), 0)
        return dummyReq
      })
    } as any

    const adapter = new IndexedDBAdapter('test-db')
    await new Promise((r) => setTimeout(r, 10))

    await adapter.setItem('key', 'val')
    const val = await adapter.getItem('key')
    expect(val).toBe('val')
    await adapter.removeItem('key')

    expect(global.indexedDB.open).toHaveBeenCalled()
  })

  it('should cover IndexedDBAdapter error and upgrade paths', async () => {
    const { IndexedDBAdapter } = await import('../use-ai-conversations')

    // 1. typeof indexedDB === 'undefined'
    const tempDb = global.indexedDB
    ;(global as any).indexedDB = undefined
    const ad1 = new IndexedDBAdapter('test1')
    await ad1.setItem('k', 'v')
    ;(global as any).indexedDB = tempDb

    // 2. onupgradeneeded & onerror
    const req = {
      result: {
        createObjectStore: vi.fn(),
        transaction: vi.fn(() => ({
          objectStore: vi.fn(() => ({
            get: vi.fn(() => {
              const r = { onsuccess: null as any, result: 'val' }
              setTimeout(() => {
                if (r.onsuccess) r.onsuccess()
              }, 0)
              return r
            })
          }))
        }))
      },
      onupgradeneeded: null as any,
      onsuccess: null as any,
      onerror: null as any
    }
    const openMock = vi.fn(() => req)
    ;(global as any).indexedDB = { open: openMock }

    const ad2 = new IndexedDBAdapter('test2')
    setTimeout(() => {
      if (req.onupgradeneeded) req.onupgradeneeded()
      req.onsuccess()
    }, 0)
    await ad2.getItem('k') // will await correctly since it's ready now

    const reqErr = { error: new Error('db'), onerror: null as any }
    ;(global as any).indexedDB = { open: () => reqErr }
    const ad3 = new IndexedDBAdapter('test3')
    setTimeout(() => {
      if (reqErr.onerror) reqErr.onerror()
    }, 0)
    await (ad3 as any).ready.catch(() => {})
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

  it('should support typewriter cancel and flush in stream', async () => {
    let rAFCb: any
    vi.stubGlobal('requestAnimationFrame', (cb: any) => {
      rAFCb = cb
      return 1
    })
    vi.stubGlobal('cancelAnimationFrame', vi.fn())

    const { isStreaming, fetchStream, stop } = useAiStream({
      request: async function* () {
        yield 'long text '
      },
      typewriter: true,
      charsPerFrame: 1
    })

    const p = fetchStream('test')
    if (rAFCb) rAFCb()
    stop() // trigger cancel/flush
    await p

    vi.unstubAllGlobals()
  })

  it('should handle fetch response stop in stream', async () => {
    const encoder = new TextEncoder()
    const mockReader = {
      read: vi.fn(
        () =>
          new Promise((r) => setTimeout(() => r({ done: false, value: encoder.encode('R1') }), 50))
      ),
      cancel: vi.fn()
    }
    const mockResponse = new Response(new ReadableStream())
    Object.defineProperty(mockResponse, 'body', { value: { getReader: () => mockReader } })

    const { fetchStream, stop } = useAiStream({
      request: async () => mockResponse as any,
      typewriter: false
    })

    const p = fetchStream('stop')
    await new Promise((r) => setTimeout(r, 10))
    stop()
    await p
    expect(mockReader.cancel).toHaveBeenCalled()
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

  // 鈹€鈹€鈹€ Parsers tests 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
  it('should parse openai format correctly', () => {
    const {
      parsers: { openaiParser }
    } = useAiStream({ request: vi.fn() as any })
    expect(openaiParser('data: {"choices":[{"delta":{"content":"O"}}]}\ndata: [DONE]')).toBe('O')
    expect(openaiParser('invalid data')).toBe(null)
  })

  it('should parse ernie format correctly', () => {
    const {
      parsers: { ernieParser }
    } = useAiStream({ request: vi.fn() as any })
    expect(ernieParser('data: {"result":"E","is_end":false}')).toBe('E')
    expect(ernieParser('data: invalid json')).toBe(null)
  })

  it('should parse qwen format correctly', () => {
    const {
      parsers: { qwenParser }
    } = useAiStream({ request: vi.fn() as any })
    expect(qwenParser('data: {"output":{"text":"Q"},"finish_reason":null}')).toBe('Q')
    expect(qwenParser('invalid')).toBe(null)
  })

  it('should parse claude format correctly', () => {
    const {
      parsers: { claudeParser }
    } = useAiStream({ request: vi.fn() as any })
    expect(
      claudeParser('data: {"type":"content_block_delta","delta":{"type":"text_delta","text":"C"}}')
    ).toBe('C')
    expect(claudeParser('invalid')).toBe(null)
  })

  it('should parse gemini format correctly', () => {
    const {
      parsers: { geminiParser }
    } = useAiStream({ request: vi.fn() as any })
    // with data: prefix
    expect(geminiParser('data: {"candidates":[{"content":{"parts":[{"text":"G1"}]}}]}')).toBe('G1')
    // without data: prefix
    expect(geminiParser('{"candidates":[{"content":{"parts":[{"text":"G2"}]}}]}')).toBe('G2')
    expect(geminiParser('')).toBe(null)
  })

  // 鈹€鈹€鈹€ fetch Response test 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
  it('should handle native fetch Response stream', async () => {
    const encoder = new TextEncoder()
    let readerCalledCount = 0
    const mockReader = {
      read: vi.fn().mockImplementation(() => {
        if (readerCalledCount === 0) {
          readerCalledCount++
          return Promise.resolve({ done: false, value: encoder.encode('R1') })
        } else if (readerCalledCount === 1) {
          readerCalledCount++
          return Promise.resolve({ done: false, value: encoder.encode('R2') })
        }
        return Promise.resolve({ done: true, value: undefined })
      }),
      cancel: vi.fn()
    }

    const mockResponse = new Response(new ReadableStream()) // Just standard shape
    // Override body with our mock reader
    Object.defineProperty(mockResponse, 'body', {
      value: {
        getReader: () => mockReader
      }
    })

    const onFinish = vi.fn()
    const { currentContent, fetchStream } = useAiStream({
      request: async () => mockResponse,
      typewriter: false,
      onFinish
    })

    await fetchStream('test')

    expect(currentContent.value).toBe('R1R2')
    expect(onFinish).toHaveBeenCalledWith('R1R2')
  })
})
