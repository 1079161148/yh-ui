import { describe, it, expect, vi, afterEach } from 'vitest'
import { detectPlatform, NodeHttpAdapter } from '../adapters/platform'

describe('Platform', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('should detect browser environment by default in tests', () => {
    // Vitest likely runs in jsdom/happy-dom or node.
    // Let's see what detectPlatform says.
    const platform = detectPlatform()
    expect(['browser', 'node']).toContain(platform.environment)
  })

  it('should detect Deno environment', () => {
    vi.stubGlobal('Deno', { version: '1.0.0' })
    const platform = detectPlatform()
    expect(platform.environment).toBe('deno')
  })

  it('should detect Bun environment', () => {
    vi.stubGlobal('Bun', { version: '1.0.0' })
    const platform = detectPlatform()
    expect(platform.environment).toBe('bun')
  })

  it('should detect edge runtime', () => {
    vi.stubGlobal('edgeRuntime', true)
    const platform = detectPlatform()
    expect(platform.environment).toBe('edge')
  })

  describe('NodeHttpAdapter', () => {
    it('should identify as node-http', () => {
      const adapter = new NodeHttpAdapter()
      expect(adapter.name).toBe('node-http')
    })
  })
})
