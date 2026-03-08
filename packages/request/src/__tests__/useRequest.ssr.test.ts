import { describe, it, expect } from 'vitest'
import { useRequest, useRequestSWR, useRequestPolling } from '../useRequest'

describe('useRequest SSR', () => {
  it('should be defined', () => {
    expect(useRequest).toBeDefined()
    expect(useRequestSWR).toBeDefined()
    expect(useRequestPolling).toBeDefined()
  })

  it('can be initialized in ssr environment without error', () => {
    const mockService = async () => ({ data: 'test' })
    const { data, loading, run } = useRequest(mockService, { manual: true })

    expect(loading.value).toBe(false)
    expect(data.value).toBeUndefined()
    expect(typeof run).toBe('function')
  })

  it('can initialize useRequestSWR in ssr', () => {
    const mockService = async (key: string) => ({ data: 'test-' + key })
    const { data, loading } = useRequestSWR('test-key', mockService, { manual: true })

    expect(loading.value).toBe(false)
    expect(data.value).toBeUndefined()
  })

  it('can initialize useRequestPolling in ssr', () => {
    const mockService = async () => ({ data: 'test' })
    const { pause, resume, loading } = useRequestPolling(mockService, { polling: false })

    expect(loading.value).toBe(false)
    expect(typeof pause).toBe('function')
    expect(typeof resume).toBe('function')
  })
})
