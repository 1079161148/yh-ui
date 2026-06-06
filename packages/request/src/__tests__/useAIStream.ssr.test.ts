/**
 * @vitest-environment node
 */
import { describe, it, expect, vi } from 'vitest'
import { useAIStream } from '../useAIStream'

vi.mock('vue', async (importOriginal) => {
  const actual = await importOriginal<any>()
  return {
    ...actual,
    onMounted: vi.fn(),
    onUnmounted: vi.fn()
  }
})

describe('useAIStream SSR', () => {
  it('should be initialized in ssr environment without error', () => {
    const { text, loading, done } = useAIStream({
      url: '/api/ai'
    })

    expect(text.value).toBe('')
    expect(loading.value).toBe(false)
    expect(done.value).toBe(false)
  })

  it('should not throw if start is called in ssr (though it may fail)', () => {
    const { start } = useAIStream()
    // 在 SSR 环境下调用 start 不应导致进程崩溃
    expect(() => start()).not.toThrow()
  })
})
