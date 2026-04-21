/**
 * @vitest-environment node
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'

const boot = vi.fn()

vi.mock('@webcontainer/api', () => ({
  WebContainer: {
    boot
  }
}))

describe('ai-code-runner webcontainer helper', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
    delete (globalThis as { __webcontainer_promise__?: Promise<unknown> }).__webcontainer_promise__
  })

  it('should boot a webcontainer once and cache the promise globally', async () => {
    const bootPromise = Promise.resolve({ id: 'wc-1' })
    boot.mockReturnValueOnce(bootPromise)

    const { getWebContainerInstance } = await import('../src/webcontainer')

    const first = getWebContainerInstance()
    await expect(first).resolves.toEqual({ id: 'wc-1' })
    expect(
      (globalThis as { __webcontainer_promise__?: Promise<unknown> }).__webcontainer_promise__
    ).toBe(bootPromise)

    const second = getWebContainerInstance()
    await expect(second).resolves.toEqual({ id: 'wc-1' })
    expect(boot).toHaveBeenCalledTimes(1)
  })

  it('should reuse an existing global webcontainer promise', async () => {
    const existing = Promise.resolve({ id: 'existing' })
    ;(globalThis as { __webcontainer_promise__?: Promise<unknown> }).__webcontainer_promise__ =
      existing

    const { getWebContainerInstance } = await import('../src/webcontainer')

    await expect(getWebContainerInstance()).resolves.toEqual({ id: 'existing' })
    expect(boot).not.toHaveBeenCalled()
  })
})
