import { afterEach, beforeAll, vi } from 'vitest'

class MockResizeObserver implements ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null
  readonly rootMargin = '0px'
  readonly thresholds = [0]

  disconnect() {}
  observe() {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
  unobserve() {}
}

beforeAll(() => {
  if (typeof globalThis.ResizeObserver === 'undefined') {
    vi.stubGlobal('ResizeObserver', MockResizeObserver)
  }

  if (typeof globalThis.IntersectionObserver === 'undefined') {
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
  }

  if (typeof globalThis.matchMedia === 'undefined') {
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn()
      }))
    )
  }

  if (typeof globalThis.requestAnimationFrame === 'undefined') {
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => setTimeout(() => cb(Date.now()), 16))
  }

  if (typeof globalThis.cancelAnimationFrame === 'undefined') {
    vi.stubGlobal('cancelAnimationFrame', (id: number) => clearTimeout(id))
  }

  if (typeof globalThis.DOMRect === 'undefined') {
    vi.stubGlobal(
      'DOMRect',
      class DOMRectMock {
        x = 0
        y = 0
        width = 0
        height = 0
        top = 0
        right = 0
        bottom = 0
        left = 0
        toJSON() {
          return this
        }
      }
    )
  }

  if (typeof window !== 'undefined') {
    Object.defineProperty(window, 'scrollTo', {
      value: vi.fn(),
      writable: true
    })
  }

  if (typeof HTMLElement !== 'undefined') {
    Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
      value: vi.fn(),
      writable: true
    })

    Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
      value: vi.fn(),
      writable: true
    })
  }
})

afterEach(() => {
  vi.clearAllMocks()
  vi.useRealTimers()
})
