/**
 * YH-UI Request - Debug Interceptor 测试
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  createDebugInterceptor,
  DebugLogger,
  debugLogger,
  type DebugInterceptorOptions,
  type DebugInfo
} from '../interceptors/debug'
import type { InternalRequestOptions, RequestResponse, RequestError } from '../types'

describe('Debug Interceptor', () => {
  describe('createDebugInterceptor', () => {
    it('should create debug interceptor with default config', () => {
      const interceptor = createDebugInterceptor()
      expect(interceptor).toBeDefined()
      expect(typeof interceptor.onRequest).toBe('function')
      expect(typeof interceptor.onResponse).toBe('function')
      expect(typeof interceptor.onError).toBe('function')
    })

    it('should not log when disabled', () => {
      const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      const interceptor = createDebugInterceptor({ enabled: false })

      const config: InternalRequestOptions = {
        method: 'GET',
        url: '/api/test',
        requestId: 'req-1'
      } as InternalRequestOptions

      interceptor.onRequest(config)

      expect(logSpy).not.toHaveBeenCalled()
      logSpy.mockRestore()
    })

    it('should log request when enabled', () => {
      const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      const interceptor = createDebugInterceptor({ enabled: true })

      const config: InternalRequestOptions = {
        method: 'GET',
        url: '/api/test',
        requestId: 'req-1'
      } as InternalRequestOptions

      interceptor.onRequest(config)

      expect(logSpy).toHaveBeenCalled()
      logSpy.mockRestore()
    })

    it('should support custom logger', () => {
      const customLogger = vi.fn()
      const interceptor = createDebugInterceptor({
        enabled: true,
        logger: customLogger
      })

      const config: InternalRequestOptions = {
        method: 'POST',
        url: '/api/test',
        requestId: 'req-2'
      } as InternalRequestOptions

      interceptor.onRequest(config)

      expect(customLogger).toHaveBeenCalled()
    })

    it('should support different log levels', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      const interceptor = createDebugInterceptor({
        enabled: true,
        level: 'warn'
      })

      const config: InternalRequestOptions = {
        method: 'GET',
        url: '/api/test',
        requestId: 'req-1'
      } as InternalRequestOptions

      interceptor.onRequest(config)

      expect(warnSpy).toHaveBeenCalled()
      warnSpy.mockRestore()
    })

    it('should log response with status', () => {
      const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      const interceptor = createDebugInterceptor({ enabled: true })

      const response: RequestResponse<any> = {
        data: { result: 'success' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          method: 'GET',
          url: '/api/test',
          requestId: 'req-1'
        } as InternalRequestOptions,
        response: {} as any,
        duration: 100
      } as RequestResponse<any>

      interceptor.onResponse(response)

      expect(logSpy).toHaveBeenCalled()
      logSpy.mockRestore()
    })

    it('should log errors', () => {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const interceptor = createDebugInterceptor({ enabled: true, level: 'error' })

      const error: RequestError = {
        message: 'Network error',
        config: {
          method: 'GET',
          url: '/api/test',
          requestId: 'req-1'
        } as InternalRequestOptions,
        response: {
          status: 500,
          data: null
        }
      } as RequestError

      interceptor.onError(error)

      expect(errorSpy).toHaveBeenCalled()
      errorSpy.mockRestore()
    })

    it('should support sanitize function', () => {
      const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      const sanitize = vi.fn().mockImplementation((info: DebugInfo) => {
        const sanitized = { ...info }
        if (sanitized.headers) {
          delete sanitized.headers['Authorization']
        }
        return sanitized
      })

      const interceptor = createDebugInterceptor({
        enabled: true,
        sanitize
      })

      const config: InternalRequestOptions = {
        method: 'GET',
        url: '/api/test',
        requestId: 'req-1',
        headers: {
          Authorization: 'Bearer secret-token'
        }
      } as InternalRequestOptions

      interceptor.onRequest(config)

      expect(sanitize).toHaveBeenCalled()
      logSpy.mockRestore()
    })

    it('should handle missing config gracefully', () => {
      const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      const interceptor = createDebugInterceptor({ enabled: true })

      const error: RequestError = {
        message: 'Error',
        config: undefined
      } as RequestError

      expect(() => interceptor.onError(error)).not.toThrow()
      logSpy.mockRestore()
    })
  })
})

describe('DebugLogger', () => {
  let logger: DebugLogger

  beforeEach(() => {
    logger = new DebugLogger()
  })

  it('should create a new logger instance', () => {
    expect(logger).toBeDefined()
  })

  it('should add logs', () => {
    const info: DebugInfo = {
      requestId: 'req-1',
      url: '/api/test',
      method: 'GET',
      timestamp: Date.now()
    }

    logger.addLog(info)

    const logs = logger.getLogs()
    expect(logs).toHaveLength(1)
    expect(logs[0].requestId).toBe('req-1')
  })

  it('should limit logs to maxLogs', () => {
    for (let i = 0; i < 105; i++) {
      logger.addLog({
        requestId: `req-${i}`,
        url: '/api/test',
        method: 'GET',
        timestamp: Date.now()
      })
    }

    const logs = logger.getLogs()
    expect(logs.length).toBeLessThanOrEqual(100)
  })

  it('should get all logs', () => {
    logger.addLog({
      requestId: 'req-1',
      url: '/api/test1',
      method: 'GET',
      timestamp: Date.now()
    })
    logger.addLog({
      requestId: 'req-2',
      url: '/api/test2',
      method: 'POST',
      timestamp: Date.now()
    })

    const logs = logger.getLogs()
    expect(logs).toHaveLength(2)
  })

  it('should clear all logs', () => {
    logger.addLog({
      requestId: 'req-1',
      url: '/api/test',
      method: 'GET',
      timestamp: Date.now()
    })

    logger.clear()

    const logs = logger.getLogs()
    expect(logs).toHaveLength(0)
  })

  it('should find logs by requestId', () => {
    logger.addLog({
      requestId: 'req-1',
      url: '/api/test1',
      method: 'GET',
      timestamp: Date.now()
    })
    logger.addLog({
      requestId: 'req-2',
      url: '/api/test2',
      method: 'POST',
      timestamp: Date.now()
    })
    logger.addLog({
      requestId: 'req-1',
      url: '/api/test1-response',
      method: 'GET',
      timestamp: Date.now()
    })

    const foundLogs = logger.findByRequestId('req-1')
    expect(foundLogs).toHaveLength(2)
  })

  it('should export logs as JSON', () => {
    logger.addLog({
      requestId: 'req-1',
      url: '/api/test',
      method: 'GET',
      timestamp: Date.now()
    })

    const exported = logger.export()
    expect(typeof exported).toBe('string')
    expect(exported).toContain('req-1')
  })

  it('should return copy of logs', () => {
    logger.addLog({
      requestId: 'req-1',
      url: '/api/test',
      method: 'GET',
      timestamp: Date.now()
    })

    const logs1 = logger.getLogs()
    const logs2 = logger.getLogs()

    expect(logs1).not.toBe(logs2)
    expect(logs1).toEqual(logs2)
  })
})

describe('debugLogger singleton', () => {
  it('should export a singleton instance', () => {
    expect(debugLogger).toBeInstanceOf(DebugLogger)
  })
})
