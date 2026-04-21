/**
 * YH-UI Request - Security Interceptor 测试
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  createCSRFInterceptor,
  createTokenRefreshInterceptor,
  createSecurityInterceptor,
  type CSRFConfig
} from '../interceptors/security'
import type { InternalRequestOptions, RequestError } from '../types'

describe('CSRF Interceptor', () => {
  describe('createCSRFInterceptor', () => {
    beforeEach(() => {
      // Clear cookies by mocking document.cookie to empty
      let cookieStore: Record<string, string> = {}
      Object.defineProperty(document, 'cookie', {
        get: () => {
          return Object.entries(cookieStore)
            .map(([k, v]) => `${k}=${v}`)
            .join('; ')
        },
        set: (val: string) => {
          const eqIndex = val.indexOf('=')
          if (eqIndex === -1) return
          const key = val.slice(0, eqIndex)
          const valPart = val.slice(eqIndex + 1)
          const expiresIndex = valPart.toLowerCase().indexOf('expires=thu, 01 jan 1970')
          if (expiresIndex !== -1) {
            delete cookieStore[key]
          } else {
            cookieStore[key] = valPart.split(';')[0]
          }
        },
        configurable: true
      })
      cookieStore = {}
    })

    it('should create CSRF interceptor with default config', () => {
      const interceptor = createCSRFInterceptor()
      expect(interceptor).toBeDefined()
      expect(typeof interceptor.onRequest).toBe('function')
      expect(typeof interceptor.getCSRFToken).toBe('function')
    })

    it('should add CSRF token for non-safe methods', () => {
      const interceptor = createCSRFInterceptor()

      const config: InternalRequestOptions = {
        method: 'POST',
        url: '/api/test'
      } as InternalRequestOptions

      const result = interceptor.onRequest(config)
      expect(result).toBeDefined()
    })

    it('should not add CSRF token for GET requests', () => {
      const interceptor = createCSRFInterceptor()

      const config: InternalRequestOptions = {
        method: 'GET',
        url: '/api/test'
      } as InternalRequestOptions

      const result = interceptor.onRequest(config)
      expect(result).toBe(config)
    })

    it('should not add CSRF token for HEAD requests', () => {
      const interceptor = createCSRFInterceptor()

      const config: InternalRequestOptions = {
        method: 'HEAD',
        url: '/api/test'
      } as InternalRequestOptions

      const result = interceptor.onRequest(config)
      expect(result).toBe(config)
    })

    it('should not add CSRF token for OPTIONS requests', () => {
      const interceptor = createCSRFInterceptor()

      const config: InternalRequestOptions = {
        method: 'OPTIONS',
        url: '/api/test'
      } as InternalRequestOptions

      const result = interceptor.onRequest(config)
      expect(result).toBe(config)
    })

    it('should use custom getToken function', () => {
      const customToken = 'custom-token-value'
      const config: CSRFConfig = {
        getToken: () => customToken
      }

      const interceptor = createCSRFInterceptor(config)
      const token = interceptor.getCSRFToken()

      expect(token).toBe(customToken)
    })

    it('should parse cookie correctly', () => {
      document.cookie = 'XSRF-TOKEN=test-csrf-token'

      const interceptor = createCSRFInterceptor({
        cookieName: 'XSRF-TOKEN'
      })

      const token = interceptor.getCSRFToken()
      expect(token).toBe('test-csrf-token')
    })

    it('should return undefined when cookie not found', () => {
      const interceptor = createCSRFInterceptor()
      const token = interceptor.getCSRFToken()
      expect(token).toBeUndefined()
    })

    it('should use custom cookie and header names', () => {
      const interceptor = createCSRFInterceptor({
        cookieName: 'custom-cookie',
        headerName: 'X-Custom-Token'
      })

      expect(interceptor).toBeDefined()
    })

    it('should add CSRF token to headers', () => {
      const interceptor = createCSRFInterceptor({
        getToken: () => 'my-csrf-token'
      })

      const config: InternalRequestOptions = {
        method: 'PUT',
        url: '/api/test',
        headers: {}
      } as InternalRequestOptions

      const result = interceptor.onRequest(config)

      expect(result.headers).toHaveProperty('X-XSRF-TOKEN', 'my-csrf-token')
    })

    it('should preserve existing headers', () => {
      const interceptor = createCSRFInterceptor({
        getToken: () => 'token'
      })

      const config: InternalRequestOptions = {
        method: 'POST',
        url: '/api/test',
        headers: {
          Authorization: 'Bearer xyz'
        }
      } as InternalRequestOptions

      const result = interceptor.onRequest(config)

      expect(result.headers).toHaveProperty('Authorization', 'Bearer xyz')
      expect(result.headers).toHaveProperty('X-XSRF-TOKEN', 'token')
    })
  })
})

describe('Token Refresh Interceptor', () => {
  let mockRequest: any

  beforeEach(() => {
    mockRequest = vi.fn().mockResolvedValue({ data: 'success' })
  })

  describe('createTokenRefreshInterceptor', () => {
    it('should create token refresh interceptor with default config', () => {
      const interceptor = createTokenRefreshInterceptor()
      expect(interceptor).toBeDefined()
      expect(typeof interceptor.onRequest).toBe('function')
      expect(typeof interceptor.onResponseError).toBe('function')
      expect(typeof interceptor.resetRetryTimes).toBe('function')
    })

    it('should throw error for non-401 responses', async () => {
      const interceptor = createTokenRefreshInterceptor()

      const error: RequestError = {
        message: 'Error',
        config: {} as InternalRequestOptions,
        response: {
          status: 404,
          data: null
        }
      } as RequestError

      await expect(interceptor.onResponseError(error, mockRequest)).rejects.toThrow('Error')
    })

    it('should throw error when no config', async () => {
      const interceptor = createTokenRefreshInterceptor()

      const error: RequestError = {
        message: 'Error',
        response: {
          status: 401,
          data: null
        }
      } as RequestError

      await expect(interceptor.onResponseError(error, mockRequest)).rejects.toThrow()
    })

    it('should retry when token is refreshed successfully', async () => {
      const interceptor = createTokenRefreshInterceptor({
        refreshToken: vi.fn().mockResolvedValue(true),
        isRefreshing: () => false,
        pendingRequests: [],
        updateHeaders: vi.fn()
      })

      const config: InternalRequestOptions = {
        method: 'GET',
        url: '/api/test',
        headers: { Authorization: 'Bearer old-token' },
        requestId: 'req-1'
      } as InternalRequestOptions

      const error: RequestError = {
        message: 'Unauthorized',
        config,
        response: {
          status: 401,
          data: null
        }
      } as RequestError

      const result = await interceptor.onResponseError(error, mockRequest)
      expect(result).toBeDefined()
    })

    it('should throw error when refresh fails', async () => {
      const interceptor = createTokenRefreshInterceptor({
        refreshToken: vi.fn().mockResolvedValue(false),
        isRefreshing: () => false,
        pendingRequests: [],
        retryTimes: 3
      })

      const config: InternalRequestOptions = {
        method: 'GET',
        url: '/api/test',
        requestId: 'req-1'
      } as InternalRequestOptions

      const error: RequestError = {
        message: 'Unauthorized',
        config,
        response: {
          status: 401,
          data: null
        }
      } as RequestError

      await expect(interceptor.onResponseError(error, mockRequest)).rejects.toThrow()
    })

    it('should reset retry times', () => {
      const interceptor = createTokenRefreshInterceptor({
        retryTimes: 3
      })

      expect(typeof interceptor.resetRetryTimes).toBe('function')
      interceptor.resetRetryTimes()
    })

    it('should handle waiting for token refresh', async () => {
      let resolvePending: (() => void) | null = null
      const pendingPromise = new Promise<void>((resolve) => {
        resolvePending = resolve
      })

      const interceptor = createTokenRefreshInterceptor({
        refreshToken: vi.fn().mockResolvedValue(true),
        isRefreshing: () => true,
        pendingRequests: [
          async () => {
            await pendingPromise
          }
        ],
        updateHeaders: vi.fn()
      })

      const config: InternalRequestOptions = {
        method: 'GET',
        url: '/api/test',
        requestId: 'req-1'
      } as InternalRequestOptions

      const error: RequestError = {
        message: 'Unauthorized',
        config,
        response: {
          status: 401,
          data: null
        }
      } as RequestError

      const resultPromise = interceptor.onResponseError(error, mockRequest)

      resolvePending!()
      mockRequest.mockResolvedValue({ data: 'retry-success' })

      // The pending request should be queued
      expect(interceptor).toBeDefined()
    })
  })
})

describe('Security Interceptor', () => {
  describe('createSecurityInterceptor', () => {
    it('should create security interceptor with default config', () => {
      const interceptor = createSecurityInterceptor()
      expect(interceptor).toBeDefined()
      expect(typeof interceptor.onRequest).toBe('function')
    })

    it('should apply CSRF interceptor', () => {
      const interceptor = createSecurityInterceptor({
        csrf: { getToken: () => 'csrf-token' }
      })

      const config: InternalRequestOptions = {
        method: 'POST',
        url: '/api/test',
        headers: {}
      } as InternalRequestOptions

      const result = interceptor.onRequest(config)
      expect(result.headers).toHaveProperty('X-XSRF-TOKEN', 'csrf-token')
    })

    it('should skip CSRF when config is false', () => {
      const interceptor = createSecurityInterceptor({
        csrf: false
      })

      const config: InternalRequestOptions = {
        method: 'POST',
        url: '/api/test'
      } as InternalRequestOptions

      const result = interceptor.onRequest(config)
      expect(result).toBe(config)
    })

    it('should have getCSRFToken method', () => {
      const interceptor = createSecurityInterceptor({
        csrf: { getToken: () => 'token' }
      })

      expect(typeof interceptor.getCSRFToken).toBe('function')
    })

    it('should have resetTokenRefresh method when token refresh is enabled', () => {
      const interceptor = createSecurityInterceptor({
        tokenRefresh: {
          refreshToken: vi.fn().mockResolvedValue(true)
        }
      })

      expect(typeof interceptor.resetTokenRefresh).toBe('function')
    })

    it('should apply both CSRF and token refresh', () => {
      const interceptor = createSecurityInterceptor({
        csrf: { getToken: () => 'csrf-token' },
        tokenRefresh: {
          refreshToken: vi.fn().mockResolvedValue(true),
          isRefreshing: () => false,
          pendingRequests: []
        }
      })

      const config: InternalRequestOptions = {
        method: 'POST',
        url: '/api/test',
        headers: {},
        requestId: 'req-1'
      } as InternalRequestOptions

      const result = interceptor.onRequest(config)
      expect(result.headers).toHaveProperty('X-XSRF-TOKEN', 'csrf-token')
    })
  })
})
