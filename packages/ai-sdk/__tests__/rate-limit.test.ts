/**
 * YH-UI AI SDK - 限流中间件测试
 */

import { describe, it, expect } from 'vitest'
import { createRateLimiter, createRateLimitMiddleware } from '../src/rate-limit'

describe('RateLimiter', () => {
  describe('createRateLimiter', () => {
    it('should allow requests within limit', () => {
      const limiter = createRateLimiter({ windowMs: 1000, max: 3 })

      const r1 = limiter.check('user1')
      expect(r1.allowed).toBe(true)
      expect(r1.remaining).toBe(2)

      const r2 = limiter.check('user1')
      expect(r2.allowed).toBe(true)
    })

    it('should block when limit exceeded', () => {
      const limiter = createRateLimiter({ windowMs: 1000, max: 2 })

      limiter.check('user1')
      limiter.check('user1')
      const r3 = limiter.check('user1')

      expect(r3.allowed).toBe(false)
      expect(r3.remaining).toBe(0)
    })

    it('should track separate keys independently', () => {
      const limiter = createRateLimiter({ windowMs: 1000, max: 1 })

      expect(limiter.check('user1').allowed).toBe(true)
      expect(limiter.check('user2').allowed).toBe(true)
      expect(limiter.check('user1').allowed).toBe(false)
    })

    it('should reset after window expires', async () => {
      const limiter = createRateLimiter({ windowMs: 50, max: 1 })

      expect(limiter.check('user1').allowed).toBe(true)
      expect(limiter.check('user1').allowed).toBe(false)

      await new Promise((r) => setTimeout(r, 60))

      expect(limiter.check('user1').allowed).toBe(true)
    })

    it('should extract key via keyBy function', () => {
      const limiter = createRateLimiter({
        windowMs: 1000,
        max: 1,
        keyBy: (config) => (config as { userId?: string }).userId || 'default'
      })

      const cfg1 = { userId: 'alice' }
      const cfg2 = { userId: 'bob' }

      expect(limiter.check(limiter.getKey(cfg1)).allowed).toBe(true)
      expect(limiter.check(limiter.getKey(cfg1)).allowed).toBe(false)
      expect(limiter.check(limiter.getKey(cfg2)).allowed).toBe(true)
    })
  })

  describe('createRateLimitMiddleware', () => {
    it('should create middleware that blocks over limit', async () => {
      const middleware = createRateLimitMiddleware({
        windowMs: 1000,
        max: 1,
        message: 'Rate limited'
      })

      const config1 = { url: '/api/test', headers: {} }
      const config2 = { url: '/api/test', headers: {} }

      await middleware.onRequest?.(config1)
      await expect(middleware.onRequest?.(config2)).rejects.toThrow('Rate limited')
    })
  })
})
