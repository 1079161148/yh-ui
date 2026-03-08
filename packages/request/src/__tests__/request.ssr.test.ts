import { describe, it, expect } from 'vitest'
import request, { Request, createRequest } from '../request'

describe('Request SSR', () => {
  it('should export request instance and factory', () => {
    expect(request).toBeDefined()
    expect(Request).toBeDefined()
    expect(createRequest).toBeDefined()
  })

  it('can be instantiated in ssr environment without error', () => {
    const instance = createRequest({ defaultOptions: { timeout: 1000 } })
    expect(instance).toBeDefined()
    expect(instance.getConfig().timeout).toBe(1000)
  })
})
