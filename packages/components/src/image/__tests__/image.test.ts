import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import YhImage from '../src/image.vue'
import { nextTick } from 'vue'

// Mock IntersectionObserver
const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn()
}))
vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)

// Mock internal Image loading
const originalImage = window.Image

describe('YhImage', () => {
  let imageConstructorSpy: any

  beforeEach(() => {
    imageConstructorSpy = vi.spyOn(window, 'Image').mockImplementation(() => {
      const img = new originalImage()
      setTimeout(() => {
        img.dispatchEvent(new Event('load'))
      }, 50)
      return img
    })
  })

  afterEach(() => {
    imageConstructorSpy.mockRestore()
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
    // Mock Image to fail
    imageConstructorSpy.mockImplementation(() => {
      const img = new originalImage()
      setTimeout(() => {
        img.dispatchEvent(new Event('error'))
      }, 50)
      return img
    })

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
    const wrapper = mount(YhImage, {
      props: {
        src,
        lazy: true
      }
    })
    expect(IntersectionObserverMock).toHaveBeenCalled()
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
