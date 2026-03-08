import { describe, it, expect } from 'vitest'
import { useRequestQueue } from '../useRequestQueue'

describe('useRequestQueue SSR', () => {
  it('should be defined', () => {
    expect(useRequestQueue).toBeDefined()
  })

  it('can be initialized in ssr environment without error', () => {
    const queue = useRequestQueue({ autoStart: false })

    expect(queue.tasks.value).toEqual([])
    expect(queue.isRunning.value).toBe(false)

    // add task
    const id = queue.addRequest(async () => 'test')
    expect(typeof id).toBe('string')
    expect(queue.tasks.value.length).toBe(1)
  })
})
