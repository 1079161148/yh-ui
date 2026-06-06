import { describe, it, expect } from 'vitest'
import { useSSE } from '../useSSE'

describe('useSSE SSR', () => {
  it('should be defined', () => {
    expect(useSSE).toBeDefined()
  })

  it('can be initialized in ssr environment without error', () => {
    const { loading, content, messages, error, start, stop, reset } = useSSE()

    expect(loading.value).toBe(false)
    expect(content.value).toBe('')
    expect(messages.value).toEqual([])
    expect(error.value).toBeUndefined()
    expect(typeof start).toBe('function')
    expect(typeof stop).toBe('function')
    expect(typeof reset).toBe('function')
  })
})
