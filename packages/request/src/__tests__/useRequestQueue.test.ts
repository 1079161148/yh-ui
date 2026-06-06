import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
vi.mock('vue', async (importOriginal) => {
  const actual = await importOriginal<any>()
  return {
    ...actual,
    onMounted: (fn: any) => fn(),
    onUnmounted: vi.fn()
  }
})
import { useRequestQueue } from '../useRequestQueue'

describe('useRequestQueue', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('can add requests with keys and metadata', () => {
    const { addRequest, pendingTasks } = useRequestQueue({ autoStart: false })

    addRequest(async () => 'res', { key: 'task1', metadata: { custom: 1 } })

    expect(pendingTasks.value.length).toBe(1)
    expect(pendingTasks.value[0].key).toBe('task1')
    expect(pendingTasks.value[0].metadata).toEqual({ type: 'request', custom: 1 })
  })

  it('can cancel request by key', () => {
    const { addRequest, cancelByKey, pendingTasks, failedTasks } = useRequestQueue({
      autoStart: false
    })

    addRequest(async () => 'res', { key: 'task1' })
    expect(pendingTasks.value.length).toBe(1)

    cancelByKey('task1')

    // Status is changed to canceled
    expect(pendingTasks.value.length).toBe(0)
    expect(failedTasks.value.length).toBe(0)
  })

  it('cancelByKey ignores non-existent keys', () => {
    const { addRequest, cancelByKey, pendingTasks } = useRequestQueue({ autoStart: false })

    addRequest(async () => 'res', { key: 'task1' })

    cancelByKey('non-existent')

    expect(pendingTasks.value.length).toBe(1)
  })
})
