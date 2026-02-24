import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import YhImage from '../src/image.vue'
import { nextTick } from 'vue'

// Mock hooks
vi.mock('@yh-ui/hooks', async () => {
  const actual = await vi.importActual<any>('@yh-ui/hooks')
  return {
    ...actual,
    useNamespace: (name: string) => ({
      b: (suffix?: string) => (suffix ? `yh-${name}-${suffix}` : `yh-${name}`),
      e: (element: string) => `yh-${name}__${element}`,
      m: (modifier: string) => `yh-${name}--${modifier}`,
      is: (state: string, value?: boolean) => (value !== false ? `is-${state}` : '')
    }),
    useLocale: () => ({ t: (key: string) => key })
  }
})

// Mock IntersectionObserver
const observeSpy = vi.fn()
class IntersectionObserverMock {
  constructor() {}
  observe = observeSpy
  unobserve = vi.fn()
  disconnect = vi.fn()
  takeRecords = vi.fn()
}
vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)

// Mock global Image constructor to simulate load/error events
class MockImage extends EventTarget {
  src = ''
  crossOrigin: string | null = null
  onload: (() => void) | null = null
  onerror: (() => void) | null = null
  width = 400
  height = 300
  naturalWidth = 400
  naturalHeight = 300
  complete = false

  constructor() {
    super()
    setTimeout(() => {
      this.complete = true
      if (this.onload) this.onload()
      this.dispatchEvent(new Event('load'))
    }, 10)
  }
}

describe('YhImage', () => {
  beforeEach(() => {
    vi.stubGlobal('Image', MockImage)
    vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)
    observeSpy.mockClear()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  const src = 'https://picsum.photos/400/300'

  it('render basic', () => {
    const wrapper = mount(YhImage, {
      props: { src }
    })
    expect(wrapper.find('.yh-image').exists()).toBe(true)
  })

  it('renders fit prop correctly', async () => {
    const wrapper = mount(YhImage, {
      props: {
        src,
        fit: 'contain'
      }
    })

    // Wait for image load simulation
    await new Promise((resolve) => setTimeout(resolve, 100))
    await nextTick()

    const img = wrapper.find('.yh-image__inner')
    expect(img.exists()).toBe(true)
    expect(img.attributes('style')).toContain('object-fit: contain')
  })

  it('load success event', async () => {
    const wrapper = mount(YhImage, {
      props: { src }
    })

    await new Promise((resolve) => setTimeout(resolve, 100))
    expect(wrapper.emitted('load')).toBeTruthy()
  })

  it('load error slot', async () => {
    // Mock Image to fail by overriding with error-triggering version
    class ErrorImage extends EventTarget {
      src = ''
      crossOrigin: string | null = null
      onload: (() => void) | null = null
      onerror: (() => void) | null = null
      width = 0
      height = 0
      naturalWidth = 0
      naturalHeight = 0
      complete = false

      constructor() {
        super()
        setTimeout(() => {
          if (this.onerror) this.onerror()
          this.dispatchEvent(new Event('error'))
        }, 10)
      }
    }
    vi.stubGlobal('Image', ErrorImage)

    const wrapper = mount(YhImage, {
      props: { src },
      slots: {
        error: '<div class="custom-error">Failed</div>'
      }
    })

    await new Promise((resolve) => setTimeout(resolve, 100))
    await nextTick()
    expect(wrapper.find('.custom-error').exists()).toBe(true)
    expect(wrapper.emitted('error')).toBeTruthy()
  })

  it('lazy load', async () => {
    mount(YhImage, {
      props: {
        src: 'https://example.com/test.jpg',
        lazy: true
      }
    })
    await nextTick()
    expect(observeSpy).toHaveBeenCalled()
  })

  it('test preview click opens viewer', async () => {
    const wrapper = mount(YhImage, {
      props: {
        src,
        previewSrcList: [src]
      },
      global: {
        stubs: {
          // We stub teleport to render inline so we can find it
          Teleport: true
        }
      }
    })

    await new Promise((resolve) => setTimeout(resolve, 100))
    await nextTick()

    const img = wrapper.find('.yh-image__inner')
    await img.trigger('click')

    // Check if viewer appeared (class yh-viewer)
    expect(wrapper.find('.yh-viewer').exists()).toBe(true)
  })

  it('viewer-mode viewerjs prop', async () => {
    // Mock viewerjs
    const viewerJsMock = vi.fn()
    vi.stubGlobal('Viewer', viewerJsMock) // Assuming Viewer is globally available or we mock the module import

    // Since the component uses `import Viewer from 'viewerjs'`, we should verify the prop is passed
    // It might be hard to test the external library integration without mocking the module.

    const wrapper = mount(YhImage, {
      props: {
        src,
        previewSrcList: [src],
        viewerMode: 'viewerjs',
        viewerOptions: { custom: true }
      }
    })

    // Trigger click
    await new Promise((resolve) => setTimeout(resolve, 100))
    const img = wrapper.find('.yh-image__inner')
    // If we click it, it should call initViewerJS which uses `new Viewer()`
    // mocking `viewerjs` module is better, but here we can check if `viewer-mode` logic branch is hit.
    // In the current implementation, if viewerMode is 'viewerjs', the internal previewer won't show.

    await img.trigger('click')
    expect(wrapper.find('.yh-viewer').exists()).toBe(false) // Component's internal viewer should not show
  })
})
