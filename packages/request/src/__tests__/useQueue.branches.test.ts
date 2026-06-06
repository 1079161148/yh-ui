import { describe, it, expect, vi } from 'vitest'

describe('useQueue extra branch coverage', () => {
  it('retry while running schedules processQueue branch', async () => {
    vi.useFakeTimers()
    vi.resetModules()
    vi.doMock('vue', async (importOriginal) => {
      const actual = await importOriginal<any>()
      return {
        ...actual,
        onMounted: (fn: any) => fn(),
        onUnmounted: vi.fn()
      }
    })

    const { useQueue } = await import('../useQueue')
    const q = useQueue({ autoStart: false, concurrency: 2, continueOnError: true })

    // keep queue running
    q.add(() => new Promise(() => {}))
    const failId = q.add(async () => {
      throw new Error('x')
    })
    q.start()
    await vi.advanceTimersByTimeAsync(0)
    expect(q.getTask(failId)?.status).toBe('rejected')

    const timeoutSpy = vi.spyOn(globalThis, 'setTimeout')
    q.retry(failId)
    expect(timeoutSpy).toHaveBeenCalled()

    vi.useRealTimers()
  })

  it('onUnmounted cleanup callback executes cancelAll path', async () => {
    vi.resetModules()
    vi.doMock('vue', async (importOriginal) => {
      const actual = await importOriginal<any>()
      return {
        ...actual,
        onMounted: (fn: any) => fn(),
        onUnmounted: (fn: any) => fn()
      }
    })

    const { useQueue } = await import('../useQueue')
    const q = useQueue({ autoStart: false })
    // callback runs immediately in this mocked mode; ensure queue still usable
    expect(q.isRunning.value).toBe(false)
  })
})

