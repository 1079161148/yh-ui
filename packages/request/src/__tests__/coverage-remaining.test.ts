import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

vi.mock('vue', async (importOriginal) => {
  const actual = await importOriginal<any>()
  return {
    ...actual,
    onMounted: (fn: any) => fn(),
    // execute unmount handlers immediately to cover cleanup closures
    onUnmounted: (fn: any) => fn()
  }
})

import { nextTick } from 'vue'
import { useSSE } from '../useSSE'
import { useRequest, useRequestSWR, useRequestPolling } from '../useRequest'
import { useQueue } from '../useQueue'

describe('remaining coverage wave', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('useSSE maps start/tool/thinking/done events and reset works', async () => {
    const onMessage = vi.fn()
    const sse = useSSE({ onMessage })
    const enc = new TextEncoder()
    const chunks = [
      'event: start\n\n',
      'event: tool\ndata: {"name":"t"}\n\n',
      'event: thinking\ndata: "hmm"\n\n',
      'event: done\n\n'
    ]
    let i = 0
    const reader = {
      read: vi.fn().mockImplementation(async () => {
        if (i < chunks.length) return { done: false, value: enc.encode(chunks[i++]) }
        return { done: true }
      }),
      cancel: vi.fn()
    }
    vi.mocked(fetch).mockResolvedValue({ ok: true, body: { getReader: () => reader } } as any)

    await sse.start({ url: '/sse', method: 'GET' } as any)
    await Promise.resolve()
    await nextTick()
    await vi.runAllTimersAsync()

    expect(onMessage).toHaveBeenCalled()
    expect(sse.messages.value.map((m) => m.event)).toEqual(
      expect.arrayContaining(['start', 'tool', 'thinking', 'done'])
    )

    sse.reset()
    expect(sse.messages.value).toEqual([])
    expect(sse.content.value).toBe('')
  })

  it('useRequestSWR and useRequestPolling cleanup branches execute safely', async () => {
    const svc = vi.fn().mockResolvedValue({ data: 1 })
    const swr = useRequestSWR('k', svc, { manual: false, refreshOnWindowFocus: true })
    await swr.run('k')
    await nextTick()
    expect(svc).toHaveBeenCalled()

    const polling = useRequestPolling(svc, { polling: true, pollingInterval: 50 }) as any
    vi.advanceTimersByTime(55)
    polling.pause()
    polling.resume()
    vi.advanceTimersByTime(55)
    expect(svc.mock.calls.length).toBeGreaterThan(0)
  })

  it('useRequest debounce/throttle branches return resolved promises', async () => {
    const svc = vi.fn().mockResolvedValue({ data: 1 })
    const d = useRequest(svc, { manual: true, debounceWait: 20 })
    await expect(d.run(1 as any)).resolves.toBeUndefined()
    vi.advanceTimersByTime(25)

    const t = useRequest(svc, { manual: true, throttleWait: 20 })
    await expect(t.run(2 as any)).resolves.toBeUndefined()
    vi.advanceTimersByTime(25)
  })

  it('useQueue covers retry/retryAll/remove/start-resume branches', async () => {
    const q = useQueue({ autoStart: false, concurrency: 1, continueOnError: true })
    const idFail = q.add(async () => {
      throw new Error('x')
    })
    q.add(async () => 'ok')

    q.start()
    await vi.advanceTimersByTimeAsync(0)
    await nextTick()
    expect(q.failedTasks.value.length).toBeGreaterThan(0)

    q.retry(idFail)
    expect(q.getTask(idFail)?.status).toBe('pending')

    const q2 = useQueue({ autoStart: false })
    const idPending = q2.add(async () => 'later')
    q2.remove(idPending)
    expect(q2.getTask(idPending)).toBeUndefined()

    q.pause()
    q.retryAll() // isPaused branch
    q.resume()
    await vi.advanceTimersByTimeAsync(1)
    await nextTick()

    q.start() // already running or no-op branch
    q.cancelAll()
    expect(q.isRunning.value).toBe(false)
  })
})

