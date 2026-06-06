import { describe, it, expect } from 'vitest'
import { useQueue } from '../useQueue'

describe('useQueue SSR', () => {
  it('should be defined', () => {
    expect(useQueue).toBeDefined()
  })

  it('can be initialized in ssr environment without error', () => {
    const queue = useQueue({ autoStart: false })

    expect(queue.tasks.value).toEqual([])
    expect(queue.isRunning.value).toBe(false)
    expect(queue.isEmpty.value).toBe(true)

    // add task
    const id = queue.add(async () => 'test')
    expect(typeof id).toBe('string')
    expect(queue.tasks.value.length).toBe(1)
  })
})
