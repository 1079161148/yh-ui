import { describe, it, expect } from 'vitest'
import {
  detectPlatform,
  platform,
  type PlatformInfo,
  type RuntimeEnvironment
} from '../adapters/platform'

describe('request/adapters/platform', () => {
  describe('detectPlatform', () => {
    it('should detect current environment', () => {
      const result = detectPlatform()
      expect(result).toHaveProperty('environment')
      expect(result).toHaveProperty('supportsFetch')
      expect(result).toHaveProperty('supportsFormData')
      expect(result).toHaveProperty('supportsAbortController')
    })

    it('should return valid runtime environment', () => {
      const result = detectPlatform()
      const validEnvironments: RuntimeEnvironment[] = ['browser', 'node', 'deno', 'bun', 'edge']
      expect(validEnvironments).toContain(result.environment)
    })

    it('should report all capability flags', () => {
      const result = detectPlatform()
      expect(typeof result.supportsFetch).toBe('boolean')
      expect(typeof result.supportsFormData).toBe('boolean')
      expect(typeof result.supportsAbortController).toBe('boolean')
    })
  })

  describe('platform', () => {
    it('should be a PlatformInfo object', () => {
      expect(platform).toHaveProperty('environment')
      expect(platform).toHaveProperty('supportsFetch')
      expect(platform).toHaveProperty('supportsFormData')
      expect(platform).toHaveProperty('supportsAbortController')
    })

    it('should match detectPlatform result', () => {
      const detected = detectPlatform()
      expect(platform.environment).toBe(detected.environment)
      expect(platform.supportsFetch).toBe(detected.supportsFetch)
    })
  })

  describe('PlatformInfo type', () => {
    it('should accept valid runtime environments', () => {
      const environments: RuntimeEnvironment[] = ['browser', 'node', 'deno', 'bun', 'edge']
      environments.forEach((env) => {
        const info: PlatformInfo = {
          environment: env,
          supportsFetch: true,
          supportsFormData: true,
          supportsAbortController: true
        }
        expect(info.environment).toBe(env)
      })
    })

    it('should accept false capability flags', () => {
      const info: PlatformInfo = {
        environment: 'browser',
        supportsFetch: false,
        supportsFormData: false,
        supportsAbortController: false
      }
      expect(info.supportsFetch).toBe(false)
    })
  })
})
