import { describe, it, expect, vi } from 'vitest'

describe('useRequestQueue branch coverage', () => {
  it('cancelByKey handles nullish pending/running lists (?? [])', async () => {
    const cancel = vi.fn()
    vi.doMock('../useQueue', () => {
      return {
        useQueue: () => ({
          tasks: { value: [] },
          pendingTasks: { value: undefined },
          runningTasks: { value: undefined },
          completedTasks: { value: [] },
          failedTasks: { value: [] },
          isRunning: { value: false },
          isEmpty: { value: true },
          isAllComplete: { value: true },
          completedCount: { value: 0 },
          totalCount: { value: 0 },
          add: vi.fn(() => 'id-x'),
          cancel,
          remove: vi.fn(),
          clear: vi.fn(),
          start: vi.fn(),
          pause: vi.fn(),
          resume: vi.fn(),
          cancelAll: vi.fn(),
          retry: vi.fn(),
          retryAll: vi.fn(),
          getTask: vi.fn()
        })
      }
    })

    const { useRequestQueue } = await import('../useRequestQueue')
    const q = useRequestQueue()
    expect(() => q.cancelByKey('missing')).not.toThrow()
    expect(cancel).not.toHaveBeenCalled()

    vi.resetModules()
    vi.doUnmock('../useQueue')
  })
})

