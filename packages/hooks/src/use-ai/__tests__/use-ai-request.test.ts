import { describe, it, expect, vi } from 'vitest'
import { useAiRequest } from '../use-ai-request'

describe('useAiRequest', () => {
  it('should initialize with default states', () => {
    const { loading, data, error } = useAiRequest({
      request: async () => 'hello'
    })
    expect(loading.value).toBe(false)
    expect(data.value).toBe('')
    expect(error.value).toBeNull()
  })

  it('should handle successful request', async () => {
    const mockRequest = vi.fn().mockResolvedValue('success data')
    const onSuccess = vi.fn()
    const { loading, data, send } = useAiRequest({
      request: mockRequest,
      onSuccess
    })

    const p = send('query', 'arg1')
    expect(loading.value).toBe(true)

    const result = await p
    expect(loading.value).toBe(false)
    expect(data.value).toBe('success data')
    expect(result).toBe('success data')
    expect(mockRequest).toHaveBeenCalledWith('query', 'arg1')
    expect(onSuccess).toHaveBeenCalledWith('success data')
  })

  it('should handle failed request', async () => {
    const mockError = new Error('fail')
    const mockRequest = vi.fn().mockRejectedValue(mockError)
    const onError = vi.fn()
    const { loading, error, send } = useAiRequest({
      request: mockRequest,
      onError
    })

    try {
      await send('query')
    } catch (e) {
      expect(e).toBe(mockError)
    }

    expect(loading.value).toBe(false)
    expect(error.value).toBe(mockError)
    expect(onError).toHaveBeenCalledWith(mockError)
  })

  it('should wrap non-Error exceptions', async () => {
    const mockRequest = vi.fn().mockRejectedValue('string error')
    const { error, send } = useAiRequest({
      request: mockRequest
    })

    try {
      await send('query')
    } catch (e) {
      // ignore
    }

    expect(error.value).toBeInstanceOf(Error)
    expect(error.value?.message).toBe('string error')
  })
})
