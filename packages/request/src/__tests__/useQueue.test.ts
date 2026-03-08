import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { nextTick } from 'vue'

// Mock lifecycle hooks
vi.mock('vue', async (importOriginal) => {
  const actual = await importOriginal<any>()
  return {
    ...actual,
    onMounted: (fn: any) => fn(),
    onUnmounted: vi.fn()
  }
})

import { useQueue } from '../useQueue'

describe('useQueue', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  it('initializes with default state', () => {
    const { tasks, pendingTasks, runningTasks, isRunning, isEmpty, isAllComplete } = useQueue()
    expect(tasks.value).toEqual([])
    expect(pendingTasks.value).toEqual([])
    expect(runningTasks.value).toEqual([])
    expect(isRunning.value).toBe(false)
    expect(isEmpty.value).toBe(true)
    expect(isAllComplete.value).toBe(false)
  })

  it('can add tasks without auto starting', () => {
    const { add, tasks, pendingTasks, isRunning } = useQueue({ autoStart: false })
    const taskId = add(async () => 'res')

    expect(tasks.value.length).toBe(1)
    expect(pendingTasks.value.length).toBe(1)
    expect(isRunning.value).toBe(false)
    expect(tasks.value[0].id).toBe(taskId)
    expect(tasks.value[0].status).toBe('pending')
  })

  it('auto starts when autoStart is true', async () => {
    const mockTask = vi
      .fn()
      .mockImplementation(() => new Promise((r) => setTimeout(() => r('ok'), 100)))
    const { add, isRunning, runningTasks } = useQueue({
      autoStart: true,
      concurrency: 1
    })

    add(mockTask)

    expect(isRunning.value).toBe(true)
    expect(runningTasks.value.length).toBe(1)

    await vi.advanceTimersByTimeAsync(100)
    await nextTick()

    expect(mockTask).toHaveBeenCalledTimes(1)
  })

  it('respects concurrency', async () => {
    const mockTask1 = vi
      .fn()
      .mockImplementation(() => new Promise((r) => setTimeout(() => r('ok'), 100)))
    const mockTask2 = vi
      .fn()
      .mockImplementation(() => new Promise((r) => setTimeout(() => r('ok'), 100)))

    const { add, runningTasks, pendingTasks } = useQueue({ autoStart: true, concurrency: 1 })

    add(mockTask1)
    add(mockTask2)

    expect(runningTasks.value.length).toBe(1)
    expect(pendingTasks.value.length).toBe(1)

    await vi.advanceTimersByTimeAsync(100)
    await nextTick()

    // Wait for the setTimeout(processQueue, 0)
    await vi.advanceTimersByTimeAsync(1)
    await nextTick()

    expect(runningTasks.value.length).toBe(1)
    expect(pendingTasks.value.length).toBe(0)

    await vi.advanceTimersByTimeAsync(100)
    await nextTick()
    expect(runningTasks.value.length).toBe(0)
  })

  it('supports priority', async () => {
    let order: number[] = []
    const mockTask1 = vi.fn().mockImplementation(async () => {
      order.push(1)
    })
    const mockTask2 = vi.fn().mockImplementation(async () => {
      order.push(2)
    })

    const { add, start } = useQueue({ concurrency: 1, autoStart: false })

    add(mockTask1, { priority: 1 })
    add(mockTask2, { priority: 10 })

    start()

    await vi.advanceTimersByTimeAsync(0)
    await nextTick()

    expect(order).toEqual([2, 1])
  })

  it('can pause and resume', async () => {
    const { add, start, pause, resume, pendingTasks, runningTasks, completedTasks } = useQueue({
      autoStart: false,
      concurrency: 1
    })

    add(() => new Promise((r) => setTimeout(() => r('1'), 100)))
    add(() => new Promise((r) => setTimeout(() => r('2'), 100)))

    start()
    expect(runningTasks.value.length).toBe(1)

    // Pause while task 1 is running
    pause()

    await vi.advanceTimersByTimeAsync(100)
    await nextTick()

    expect(completedTasks.value.length).toBe(1)
    expect(runningTasks.value.length).toBe(0)
    expect(pendingTasks.value.length).toBe(1)

    // Resume should start task 2
    resume()

    // Check if task 2 started
    expect(runningTasks.value.length).toBe(1)
    expect(pendingTasks.value.length).toBe(0)

    await vi.advanceTimersByTimeAsync(100)
    await nextTick()
    expect(completedTasks.value.length).toBe(2)
  })

  it('can be cleared', () => {
    const { add, clear, tasks } = useQueue({ autoStart: false })
    add(async () => '1')
    add(async () => '2')

    clear()
    expect(tasks.value.length).toBe(0)
  })

  it('can remove specific task', () => {
    const { add, remove, pendingTasks } = useQueue({ autoStart: false })
    const t1 = add(async () => '1')
    const t2 = add(async () => '2')

    remove(t1)

    expect(pendingTasks.value.length).toBe(1)
    expect(pendingTasks.value[0].id).toBe(t2)
  })

  it('handles task cancellation', async () => {
    const { add, cancel, start, runningTasks, completedTasks, tasks } = useQueue({
      autoStart: false,
      concurrency: 1
    })
    const id = add(() => new Promise((r) => setTimeout(r, 1000)))

    start()
    expect(runningTasks.value.length).toBe(1)

    cancel(id)
    expect(tasks.value.find((t) => t.id === id)?.status).toBe('canceled')

    await vi.advanceTimersByTimeAsync(1000)
    await nextTick()

    expect(completedTasks.value.length).toBe(0)
  })
})
