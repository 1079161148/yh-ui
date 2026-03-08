/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest'
import { detectPlatform } from '../adapters/platform'

describe('Platform Detection SSR', () => {
  it('should detect node environment accurately', () => {
    const info = detectPlatform()
    expect(info.environment).toBe('node')
    // Node 18+ has fetch, but we check based on what vitest provides
    expect(typeof info.supportsFetch).toBe('boolean')
  })
})
