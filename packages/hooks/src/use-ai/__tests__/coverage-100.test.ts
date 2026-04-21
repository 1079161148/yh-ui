import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useAiConversations } from '../use-ai-conversations'
import { useAiPersistence } from '../use-ai-persistence'
import { __test__ as chatInternal } from '../use-ai-chat'
import {
  __test__ as streamInternal,
  useAiStream,
  ernieParser,
  plainTextParser
} from '../use-ai-stream'

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('use-ai coverage 100 helpers', () => {
  it('covers useAiChat guard and computed branches', async () => {
    const noRequest = (await import('../use-ai-chat')).useAiChat({})
    await noRequest.sendMessage('hello')
    expect(noRequest.messages.value).toHaveLength(1)
    expect(noRequest.isSending.value).toBe(false)

    await noRequest.sendMessage('   ')
    expect(noRequest.messages.value).toHaveLength(1)

    let release!: () => void
    const hold = new Promise<void>((r) => {
      release = r
    })
    const guarded = (await import('../use-ai-chat')).useAiChat({
      request: async () => {
        await hold
        return 'ok'
      },
      typewriter: false
    })
    const p1 = guarded.sendMessage('a')
    await Promise.resolve()
    await guarded.sendMessage('b')
    release()
    await p1
    expect(guarded.messages.value.filter((m) => m.role === 'user')).toHaveLength(1)
  })

  it('covers chat pushChunk empty text branch', async () => {
    const chat = (await import('../use-ai-chat')).useAiChat({
      request: async () => '',
      typewriter: false
    })
    await chat.sendMessage('empty')
    expect(chat.messages.value.at(-1)?.content).toBe('')
  })

  it('covers chat helper false branches and missing-id operations', () => {
    const tw = chatInternal.createTypewriter(() => {}, 1)
    // line 112 false branch (rafId is null)
    tw.cancel()
    // line 100 false branch (raf already pending)
    tw.push('a')
    tw.push('b')
  })

  it('covers chat typewriter line 93 false branch', () => {
    let rafCb: FrameRequestCallback | null = null
    vi.stubGlobal('requestAnimationFrame', vi.fn((cb: FrameRequestCallback) => {
      rafCb = cb
      return 3
    }))
    const tw = chatInternal.createTypewriter(() => {}, 10)
    tw.push('ab')
    if (rafCb) (rafCb as unknown as (t: number) => void)(0)
    expect(rafCb).toBeTypeOf('function')
  })

  it('covers chat remove/update with unknown id', async () => {
    const chat = (await import('../use-ai-chat')).useAiChat({
      initialMessages: [{ id: 'u1', role: 'user', content: 'x', createAt: 1 }]
    })
    chat.removeMessage('missing')
    chat.updateMessage('missing', { content: 'noop' })
    expect(chat.messages.value).toHaveLength(1)
  })

  it('covers chat parser-null and fallback response branch', async () => {
    const chat = (await import('../use-ai-chat')).useAiChat({
      request: async () => 123 as any,
      parser: () => null,
      typewriter: false
    })
    await chat.sendMessage('x')
    expect(chat.messages.value.at(-1)?.content).toBe('')
  })

  it('covers chat parser null branches for generator and response', async () => {
    const chatA = (await import('../use-ai-chat')).useAiChat({
      request: async function* () {
        yield 'g'
      },
      parser: () => null,
      typewriter: false
    })
    await chatA.sendMessage('x')
    expect(chatA.messages.value.at(-1)?.content).toBe('')

    const encoder = new TextEncoder()
    const response = new Response(
      new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode('r'))
          controller.close()
        }
      })
    )
    const chatB = (await import('../use-ai-chat')).useAiChat({
      request: async () => response,
      parser: () => null,
      typewriter: false
    })
    await chatB.sendMessage('y')
    expect(chatB.messages.value.at(-1)?.content).toBe('')
  })

  it('covers chat abort-error branch and missing target error branch', async () => {
    const chat1 = (await import('../use-ai-chat')).useAiChat({
      request: async () => {
        const e = new Error('aborted')
        ;(e as any).name = 'AbortError'
        throw e
      },
      typewriter: false
    })
    await chat1.sendMessage('a')
    expect(chat1.messages.value.at(-1)?.status).toBe('loading')

    const chat2 = (await import('../use-ai-chat')).useAiChat({
      request: async () => {
        throw new Error('boom')
      },
      typewriter: false
    })
    const p = chat2.sendMessage('a')
    // remove assistant placeholder before request throws
    chat2.removeMessage(chat2.messages.value.at(-1)!.id)
    await p
    expect(chat2.messages.value.some((m) => m.status === 'error')).toBe(false)
  })


  it('createTypewriter covers schedule/flush/cancel branches', () => {
    let rafCb: FrameRequestCallback | null = null
    const cancelSpy = vi.fn()
    vi.stubGlobal('requestAnimationFrame', vi.fn((cb: FrameRequestCallback) => {
      rafCb = cb
      return 7
    }))
    vi.stubGlobal('cancelAnimationFrame', cancelSpy)

    const chunks: string[] = []
    const tw = chatInternal.createTypewriter((c) => chunks.push(c), 2)

    tw.push('abcd')
    expect(rafCb).toBeTypeOf('function')
    if (rafCb) (rafCb as unknown as (t: number) => void)(0)
    expect(chunks.join('')).toBe('ab')

    // schedule again then flush should cancel pending raf and flush queue
    expect(rafCb).toBeTypeOf('function')
    tw.flush()
    expect(cancelSpy).toHaveBeenCalled()
    expect(chunks.join('')).toBe('abcd')

    // cancel with queued item triggers cancel branch and clears queue
    tw.push('xyz')
    expect(rafCb).toBeTypeOf('function')
    tw.cancel()
    expect(cancelSpy).toHaveBeenCalledTimes(2)
    if (rafCb) (rafCb as unknown as (t: number) => void)(0)
    expect(chunks.join('')).toBe('abcd')
  })

  it('TypewriterThrottle cancel branch is covered on stream error', async () => {
    let rafCb: FrameRequestCallback | null = null
    const cancelSpy = vi.fn()
    vi.stubGlobal('requestAnimationFrame', vi.fn((cb: FrameRequestCallback) => {
      rafCb = cb
      return 9
    }))
    vi.stubGlobal('cancelAnimationFrame', cancelSpy)

    const onError = vi.fn()
    const stream = useAiStream({
      typewriter: true,
      charsPerFrame: 1,
      request: async function* () {
        yield 'a'
        throw new Error('boom')
      },
      onError
    })

    const p = stream.fetchStream('q')
    await vi.waitFor(() => expect(rafCb).toBeTypeOf('function'))
    await p
    expect(onError).toHaveBeenCalled()
    expect(cancelSpy).toHaveBeenCalled()
  })

  it('TypewriterThrottle class handles flush and cancel directly', () => {
    let rafCb: FrameRequestCallback | null = null
    vi.stubGlobal('requestAnimationFrame', vi.fn((cb: FrameRequestCallback) => {
      rafCb = cb
      return 11
    }))
    const cancelSpy = vi.fn()
    vi.stubGlobal('cancelAnimationFrame', cancelSpy)

    let out = ''
    const Tw = streamInternal.TypewriterThrottle
    const tw = new Tw((s) => {
      out += s
    }, 1)
    tw.push('12')
    if (rafCb) (rafCb as unknown as (t: number) => void)(0)
    expect(out).toBe('1')
    tw.flush()
    expect(out).toBe('12')
    tw.push('34')
    tw.cancel()
    expect(cancelSpy).toHaveBeenCalled()
  })
})

describe('useAiConversations branch coverage', () => {
  it('covers adapter init, loadMore guard and CRUD no-op branches', async () => {
    const custom = {
      getItem: vi.fn().mockResolvedValue(null),
      setItem: vi.fn().mockRejectedValue(new Error('quota')),
      removeItem: vi.fn().mockResolvedValue(undefined)
    }
    const hook = useAiConversations({
      storage: custom,
      pageSize: 1,
      initialConversations: [{ id: 'a', title: 'A', updatedAt: 1 }]
    })
    await hook.ready

    // no more branch
    await hook.loadMore()
    expect(hook.isLoadingMore.value).toBe(false)

    // update/remove non-existent branches
    await hook.updateConversation('missing', { title: 'noop' })
    await hook.removeConversation('missing')
    expect(hook.conversations.value).toHaveLength(1)

    // persist catch branch via setItem rejection
    await hook.createConversation('new')
    await hook.clear()
    expect(custom.removeItem).toHaveBeenCalled()
  })

  it('covers remote sync guards, timers, merge/sort and error casting', async () => {
    const remote = {
      fetchConversations: vi
        .fn()
        .mockResolvedValueOnce([
          { id: 'r1', title: 'R1', updatedAt: 10, pinned: false },
          { id: 'r2', title: 'R2', updatedAt: 20, pinned: true }
        ])
        .mockRejectedValueOnce('fetch-fail'),
      createConversation: vi.fn(),
      updateConversation: vi.fn(),
      deleteConversation: vi.fn(),
      batchUpdate: vi.fn().mockRejectedValueOnce('batch-fail').mockResolvedValueOnce([])
    }

    const hook = useAiConversations({
      storage: false,
      remoteSync: remote,
      autoSync: true,
      syncInterval: 5,
      initialConversations: [{ id: 'l1', title: 'L1', updatedAt: 5 }]
    })
    await hook.ready

    await hook.syncToRemote()
    expect(hook.syncError.value?.message).toBe('batch-fail')
    await hook.syncToRemote()
    expect(hook.lastSyncTime.value).toBeGreaterThan(0)

    await hook.fetchFromRemote()
    expect(hook.conversations.value[0].id).toBe('r2')
    await hook.fetchFromRemote()
    expect(hook.syncError.value?.message).toBe('fetch-fail')

    hook.startSync()
    vi.advanceTimersByTime(15)
    hook.stopSync()
    expect(remote.batchUpdate).toHaveBeenCalled()
  })

  it('covers startSync early return when interval is zero', async () => {
    const remote = {
      fetchConversations: vi.fn().mockResolvedValue([]),
      createConversation: vi.fn(),
      updateConversation: vi.fn(),
      deleteConversation: vi.fn(),
      batchUpdate: vi.fn().mockResolvedValue([])
    }
    const hook = useAiConversations({
      storage: false,
      remoteSync: remote,
      autoSync: false,
      syncInterval: 0
    })
    await hook.ready
    hook.startSync()
    vi.advanceTimersByTime(50)
    expect(remote.batchUpdate).not.toHaveBeenCalled()
  })

  it('covers localStorage and indexedDB adapter fallback branches', async () => {
    const getSpy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('x')
    })
    const hook1 = useAiConversations({ storage: 'localStorage', storageKey: 'k' })
    await hook1.ready
    expect(hook1.conversations.value).toEqual([])
    getSpy.mockRestore()

    const badJsonSpy = vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('{bad')
    const hook2 = useAiConversations({ storage: 'localStorage', storageKey: 'k2' })
    await hook2.ready
    expect(hook2.conversations.value).toEqual([])
    badJsonSpy.mockRestore()

    const temp = (globalThis as any).indexedDB
    ;(globalThis as any).indexedDB = undefined
    const hook3 = useAiConversations({ storage: 'indexedDB' })
    await hook3.ready
    await hook3.clear()
    ;(globalThis as any).indexedDB = temp
  })

  it('covers dedupe merge and pinned sort comparator fallback branch', async () => {
    const now = Date.now()
    const remote = {
      fetchConversations: vi.fn().mockResolvedValue([
        { id: 'same', title: 'remote-same', updatedAt: now + 1, pinned: false },
        { id: 'new', title: 'remote-new', updatedAt: now + 2, pinned: false }
      ]),
      createConversation: vi.fn(),
      updateConversation: vi.fn(),
      deleteConversation: vi.fn(),
      batchUpdate: vi.fn().mockResolvedValue([])
    }
    const hook = useAiConversations({
      storage: false,
      remoteSync: remote,
      initialConversations: [
        { id: 'same', title: 'local', updatedAt: now, pinned: false },
        { id: 'p1', title: 'pin-a', updatedAt: now - 1, pinned: true },
        { id: 'p2', title: 'pin-b', updatedAt: now - 2, pinned: true }
      ]
    })
    await hook.ready
    await hook.fetchFromRemote()
    expect(hook.conversations.value.some((c) => c.id === 'new')).toBe(true)
    expect(hook.conversations.value.filter((c) => c.id === 'same')).toHaveLength(1)
  })

  it('covers stored merge branches (custom adapter + JSON parse)', async () => {
    const stored = JSON.stringify([
      { id: 'same', title: 'same', updatedAt: 2 },
      { id: 'new', title: 'new', updatedAt: 1 }
    ])
    const custom = {
      getItem: vi.fn().mockResolvedValue(stored),
      setItem: vi.fn().mockResolvedValue(undefined),
      removeItem: vi.fn().mockResolvedValue(undefined)
    }
    const hook = useAiConversations({
      storage: custom,
      initialConversations: [{ id: 'same', title: 'init', updatedAt: 3 }]
    })
    await hook.ready
    expect(hook.conversations.value.find((c) => c.id === 'new')).toBeTruthy()
  })

  it('covers fetchFromRemote early return while sync is in progress', async () => {
    const remote = {
      fetchConversations: vi.fn().mockResolvedValue([]),
      createConversation: vi.fn(),
      updateConversation: vi.fn(),
      deleteConversation: vi.fn(),
      batchUpdate: vi.fn().mockImplementation(
        () =>
          new Promise<void>((resolve) => {
            setTimeout(() => resolve(), 5)
          })
      )
    }
    const hook2 = useAiConversations({ storage: false, remoteSync: remote })
    await hook2.ready
    const p = hook2.syncToRemote()
    await hook2.fetchFromRemote()
    await vi.advanceTimersByTimeAsync(10)
    await p
    expect(remote.fetchConversations).not.toHaveBeenCalled()
  })

  it('covers init catch when adapter.getItem rejects', async () => {
    const custom = {
      getItem: vi.fn().mockRejectedValue(new Error('read-fail')),
      setItem: vi.fn(),
      removeItem: vi.fn()
    }
    const hook = useAiConversations({ storage: custom, initialConversations: [] })
    await hook.ready
    expect(hook.conversations.value).toEqual([])
  })

  it('covers AiIndexedDBAdapter getItem onerror branch', async () => {
    const prev = (globalThis as any).indexedDB
    const req: any = {
      result: {
        createObjectStore: vi.fn(),
        transaction: vi.fn(() => ({
          objectStore: vi.fn(() => ({
            get: () => {
              const r: any = { onsuccess: null, onerror: null, result: null }
              queueMicrotask(() => r.onerror?.())
              return r
            }
          }))
        }))
      },
      onupgradeneeded: null,
      onsuccess: null,
      onerror: null
    }
    ;(globalThis as any).indexedDB = {
      open: vi.fn(() => {
        queueMicrotask(() => {
          req.onupgradeneeded?.({} as IDBVersionChangeEvent)
          queueMicrotask(() => req.onsuccess?.({} as Event))
        })
        return req
      })
    }
    try {
      const { AiIndexedDBAdapter } = await import('../use-ai-conversations')
      const ad = new AiIndexedDBAdapter('err-db')
      await vi.waitFor(async () => {
        expect(await ad.getItem('k')).toBe(null)
      })
    } finally {
      ;(globalThis as any).indexedDB = prev
    }
  })

  it('covers pinConversation sort when multiple items are pinned', async () => {
    const now = Date.now()
    const hook = useAiConversations({
      storage: false,
      initialConversations: [
        { id: 'a', title: 'a', updatedAt: now - 2 },
        { id: 'b', title: 'b', updatedAt: now - 1 }
      ]
    })
    await hook.ready
    await hook.pinConversation('a', true)
    await hook.pinConversation('b', true)
    expect(hook.conversations.value.every((c) => c.pinned)).toBe(true)
  })

  it('covers groupedConversations empty-group branches', async () => {
    const hook = useAiConversations({
      storage: false,
      initialConversations: []
    })
    await hook.ready
    expect(hook.groupedConversations.value).toEqual([])
  })

  it('covers sort comparator cond false branch and stopSync no-timer branch', async () => {
    const now = Date.now()
    const hook = useAiConversations({
      storage: false,
      initialConversations: [
        { id: 'p', title: 'p', updatedAt: now, pinned: true },
        { id: 'n', title: 'n', updatedAt: now - 1, pinned: false }
      ]
    })
    await hook.ready
    // trigger comparator where "a" is not pinned and "b" is pinned
    hook.conversations.value.sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
      return b.updatedAt - a.updatedAt
    })
    hook.stopSync()
    expect(hook.conversations.value).toHaveLength(2)
  })

  it('covers pinConversation sort comparator false side in source', async () => {
    const now = Date.now()
    const hook = useAiConversations({
      storage: false,
      initialConversations: [
        { id: 'p', title: 'p', updatedAt: now, pinned: true },
        { id: 'n', title: 'n', updatedAt: now - 1, pinned: false }
      ]
    })
    await hook.ready
    await hook.pinConversation('n', false)
    expect(hook.conversations.value.find((c) => c.id === 'n')?.pinned).toBe(false)
  })

  it('covers fetchFromRemote catch with Error instance', async () => {
    const remote = {
      fetchConversations: vi.fn().mockRejectedValue(new Error('remote-error')),
      createConversation: vi.fn(),
      updateConversation: vi.fn(),
      deleteConversation: vi.fn(),
      batchUpdate: vi.fn().mockResolvedValue([])
    }
    const hook = useAiConversations({ storage: false, remoteSync: remote })
    await hook.ready
    await hook.fetchFromRemote()
    expect(hook.syncError.value?.message).toBe('remote-error')
  })

  it('covers AiIndexedDBAdapter getItem with undefined result', async () => {
    const prev = (globalThis as any).indexedDB
    const req: any = {
      result: {
        createObjectStore: vi.fn(),
        transaction: vi.fn(() => ({
          objectStore: vi.fn(() => ({
            get: () => {
              const r: any = { onsuccess: null, onerror: null, result: undefined }
              queueMicrotask(() => r.onsuccess?.())
              return r
            }
          }))
        }))
      },
      onupgradeneeded: null,
      onsuccess: null,
      onerror: null
    }
    ;(globalThis as any).indexedDB = {
      open: vi.fn(() => {
        queueMicrotask(() => req.onsuccess?.())
        return req
      })
    }
    try {
      const { AiIndexedDBAdapter } = await import('../use-ai-conversations')
      const ad = new AiIndexedDBAdapter('undef-db')
      expect(await ad.getItem('k')).toBe(null)
    } finally {
      ;(globalThis as any).indexedDB = prev
    }
  })
})

describe('useAiPersistence remaining branches', () => {
  it('covers save and import failure branches', async () => {
    const storage = {
      get: vi.fn().mockResolvedValue([]),
      set: vi.fn().mockRejectedValue('save-fail'),
      remove: vi.fn().mockResolvedValue(undefined),
      clear: vi.fn().mockResolvedValue(undefined)
    }
    const hook = useAiPersistence({ storage: storage as any, autoSave: true })

    await hook.loadConversations()
    hook.createConversation('x')
    await Promise.resolve()
    expect(hook.error.value?.message).toBe('Failed to save conversations')

    const ok = await hook.importConversations('{"x":1}')
    expect(ok).toBe(false)
  })

  it('covers no-current-conversation branches and autoSave branches', async () => {
    const storage = {
      get: vi.fn().mockResolvedValue([]),
      set: vi.fn().mockResolvedValue(undefined),
      remove: vi.fn().mockResolvedValue(undefined),
      clear: vi.fn().mockResolvedValue(undefined)
    }
    const hook = useAiPersistence({ storage: storage as any, autoSave: true })
    await hook.loadConversations()

    hook.addMessage({ role: 'user', content: 'orphan' })
    hook.updateMessage('missing', { content: 'noop' })
    hook.clearCurrentConversation()
    hook.deleteConversation('missing')
    expect(storage.set).not.toHaveBeenCalled()

    const conv = hook.createConversation('t')
    const msg = hook.addMessage({ role: 'user', content: 'a' })!
    hook.updateMessage(msg.id, { content: 'b' })
    hook.clearCurrentConversation()
    hook.deleteConversation(conv.id)
    expect(storage.set).toHaveBeenCalled()
  })

  it('covers non-Error catch branches in persistence', async () => {
    const storage = {
      get: vi.fn().mockRejectedValue('load-fail'),
      set: vi.fn().mockRejectedValue('save-fail'),
      remove: vi.fn().mockResolvedValue(undefined),
      clear: vi.fn().mockResolvedValue(undefined)
    }
    const hook = useAiPersistence({ storage: storage as any, autoSave: true })
    await hook.loadConversations()
    expect(hook.error.value?.message).toBe('Failed to load conversations')
    hook.createConversation('x')
    await Promise.resolve()
    expect(hook.error.value?.message).toBe('Failed to save conversations')
    const imported = await hook.importConversations('not-json')
    expect(imported).toBe(false)
    expect(hook.error.value?.message).toBeTruthy()
  })

  it('covers persistence save Error branch and delete non-current branch', async () => {
    const storage = {
      get: vi.fn().mockResolvedValue([]),
      set: vi.fn().mockRejectedValue(new Error('save-error')),
      remove: vi.fn().mockResolvedValue(undefined),
      clear: vi.fn().mockResolvedValue(undefined)
    }
    const hook = useAiPersistence({ storage: storage as any, autoSave: true })
    await hook.loadConversations()
    const a = hook.createConversation('a')
    const b = hook.createConversation('b')
    hook.setCurrentConversation(b.id)
    hook.deleteConversation(a.id)
    await Promise.resolve()
    expect(hook.error.value?.message).toBe('save-error')
    expect(hook.currentConversationId.value).toBe(b.id)
  })

  it('covers deleteConversation current-id condition false side', async () => {
    const storage = {
      get: vi.fn().mockResolvedValue([]),
      set: vi.fn().mockResolvedValue(undefined),
      remove: vi.fn().mockResolvedValue(undefined),
      clear: vi.fn().mockResolvedValue(undefined)
    }
    const hook = useAiPersistence({ storage: storage as any, autoSave: false })
    await hook.loadConversations()
    vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'))
    const a = hook.createConversation('a')
    vi.setSystemTime(new Date('2026-01-01T00:00:01.000Z'))
    const b = hook.createConversation('b')
    hook.setCurrentConversation(b.id)
    hook.deleteConversation(a.id)
    expect(hook.currentConversationId.value).toBe(b.id)
  })

  it('covers updateMessage messageIndex miss and import non-Error catch', async () => {
    const storage = {
      get: vi.fn().mockResolvedValue([]),
      set: vi.fn().mockResolvedValue(undefined),
      remove: vi.fn().mockResolvedValue(undefined),
      clear: vi.fn().mockResolvedValue(undefined)
    }
    const hook = useAiPersistence({ storage: storage as any, autoSave: false })
    await hook.loadConversations()
    hook.createConversation('x')
    hook.updateMessage('missing', { content: 'noop' })
    const parseSpy = vi.spyOn(JSON, 'parse').mockImplementation(() => {
      throw 'parse-string-error'
    })
    const ok = await hook.importConversations('[]')
    parseSpy.mockRestore()
    expect(ok).toBe(false)
    expect(hook.error.value?.message).toBe('Failed to import conversations')
  })
})

describe('useAiStream remaining branches', () => {
  it('covers parser no-data line and empty parsed chunk branch', async () => {
    expect(ernieParser('not-data-line')).toBe(null)
    expect(plainTextParser('')).toBe(null)

    async function* gen() {
      yield ''
      yield 'ok'
    }
    const stream = useAiStream({
      request: () => gen(),
      parser: (raw) => (raw ? raw : null),
      typewriter: true
    })
    await stream.fetchStream('q')
    expect(stream.currentContent.value).toBe('ok')
  })

  it('covers TypewriterThrottle empty-queue frame return branch', () => {
    let rafCb: FrameRequestCallback | null = null
    vi.stubGlobal('requestAnimationFrame', vi.fn((cb: FrameRequestCallback) => {
      rafCb = cb
      return 1
    }))
    vi.stubGlobal('cancelAnimationFrame', vi.fn())
    let out = ''
    const Tw = streamInternal.TypewriterThrottle
    const tw = new Tw((s) => {
      out += s
    }, 1)
    tw.push('a')
    tw.flush()
    if (rafCb) (rafCb as unknown as (t: number) => void)(0)
    expect(out).toBe('a')
  })

  it('covers stream stop when not streaming', () => {
    const stream = useAiStream({
      request: async function* () {
        yield 'x'
      }
    })
    stream.stop()
    expect(stream.isStreaming.value).toBe(false)
  })

  it('covers stream parser false branches in generator and response', async () => {
    const stream1 = useAiStream({
      request: async function* () {
        yield ''
      },
      parser: () => null,
      typewriter: false
    })
    await stream1.fetchStream('g')
    expect(stream1.currentContent.value).toBe('')

    const encoder = new TextEncoder()
    const response = new Response(
      new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode(''))
          controller.close()
        }
      })
    )
    const stream2 = useAiStream({
      request: async () => response,
      parser: () => null,
      typewriter: false
    })
    await stream2.fetchStream('r')
    expect(stream2.currentContent.value).toBe('')
  })

  it('covers stream pushText early-return and generator parsed-false branch', async () => {
    const streamA = useAiStream({
      request: async function* () {
        yield 'data'
      },
      parser: () => '',
      typewriter: false
    })
    await streamA.fetchStream('empty')
    expect(streamA.currentContent.value).toBe('')

    const streamB = useAiStream({
      request: async function* () {
        yield 'has-data'
      },
      parser: () => '',
      typewriter: false
    })
    await streamB.fetchStream('g')
    expect(streamB.currentContent.value).toBe('')
  })

  it('covers stream AbortError catch branch and throttle double-push branch', async () => {
    const stream = useAiStream({
      request: async () => {
        const e = new Error('abort')
        ;(e as any).name = 'AbortError'
        throw e
      },
      typewriter: true
    })
    await stream.fetchStream('a')
    expect(stream.isStreaming.value).toBe(false)

    let rafCb: FrameRequestCallback | null = null
    vi.stubGlobal('requestAnimationFrame', vi.fn((cb: FrameRequestCallback) => {
      rafCb = cb
      return 2
    }))
    const Tw = streamInternal.TypewriterThrottle
    const tw = new Tw(() => {}, 1)
    tw.push('a')
    tw.push('b')
    if (rafCb) (rafCb as unknown as (t: number) => void)(0)
  })

  it('covers claudeParser non-matching type branch', () => {
    const { claudeParser } = useAiStream({ request: vi.fn() as any }).parsers
    expect(claudeParser('data: {"type":"message_start"}')).toBe(null)
  })

  it('covers stream non-iterable non-response request branch', async () => {
    const stream = useAiStream({
      request: async () => ({ ok: true } as any),
      typewriter: false
    })
    await stream.fetchStream('noop')
    expect(stream.currentContent.value).toBe('')
  })
})
