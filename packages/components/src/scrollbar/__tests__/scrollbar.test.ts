import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Scrollbar from '../src/scrollbar.vue'

describe('YhScrollbar', () => {
  it('should render content', () => {
    const wrapper = mount(Scrollbar, {
      slots: {
        default: '<div class="content">Content</div>'
      }
    })
    expect(wrapper.find('.content').exists()).toBe(true)
    expect(wrapper.classes()).toContain('yh-scrollbar')
  })

  it('should set height', () => {
    const wrapper = mount(Scrollbar, {
      props: {
        height: '200px'
      }
    })
    const wrap = wrapper.find('.yh-scrollbar__wrap')
    expect((wrap.element as HTMLElement).style.height).toBe('200px')
  })

  it('should set max-height', () => {
    const wrapper = mount(Scrollbar, {
      props: {
        maxHeight: '100px'
      }
    })
    const wrap = wrapper.find('.yh-scrollbar__wrap')
    expect((wrap.element as HTMLElement).style.maxHeight).toBe('100px')
  })

  it('native scrollbar', () => {
    const wrapper = mount(Scrollbar, {
      props: {
        native: true
      }
    })
    expect(wrapper.find('.yh-scrollbar__bar').exists()).toBe(false)
  })

  it('applies theme overrides as inline css vars', () => {
    const wrapper = mount(Scrollbar, {
      props: {
        themeOverrides: {
          thumbBgColor: '#909399'
        }
      }
    })

    expect(wrapper.attributes('style')).toContain('--yh-scrollbar-thumb-bg-color: #909399')
  })

  it('exposes scrollbar methods', () => {
    const wrapper = mount(Scrollbar)
    const exposed = (wrapper.vm as any).$?.exposed

    expect(typeof exposed?.update).toBe('function')
    expect(typeof exposed?.scrollTo).toBe('function')
    expect(typeof exposed?.setScrollTop).toBe('function')
    expect(typeof exposed?.setScrollLeft).toBe('function')
  })

  it('shows custom thumb and handles drag on thumb', async () => {
    const wrapper = mount(Scrollbar, {
      props: { height: '80px', native: false },
      slots: {
        default: '<div style="height: 800px">Tall</div>'
      }
    })

    await wrapper.vm.$nextTick()
    exposedUpdate(wrapper)

    const thumb = wrapper.find('.yh-scrollbar__thumb')
    expect(thumb.exists()).toBe(true)

    await thumb.trigger('mousedown', { button: 0, clientX: 10, clientY: 10 })
    document.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: 10, clientY: 40 }))
    document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))
  })

  it('handles track click for scroll position', async () => {
    const wrapper = mount(Scrollbar, {
      props: { height: '80px', native: false },
      slots: {
        default: '<div style="height: 800px">Tall</div>'
      }
    })

    await wrapper.vm.$nextTick()
    exposedUpdate(wrapper)

    const bar = wrapper.find('.yh-scrollbar__bar')
    if (bar.exists()) {
      await bar.trigger('mousedown', {
        button: 0,
        clientX: 50,
        clientY: 5
      })
    }
  })

  it('emits scroll payload and supports scroll setters', async () => {
    const wrapper = mount(Scrollbar, {
      props: { height: '80px' },
      slots: { default: '<div style="height: 800px; width: 800px">Tall</div>' }
    })
    await wrapper.vm.$nextTick()
    const exposed = (wrapper.vm as any).$?.exposed
    exposed?.setScrollTop(30)
    exposed?.setScrollLeft(20)

    const wrap = wrapper.find('.yh-scrollbar__wrap')
    await wrap.trigger('scroll')
    expect(wrapper.emitted('scroll')).toBeTruthy()
    expect(wrapper.emitted('scroll')?.[0]?.[0]).toEqual(
      expect.objectContaining({ scrollTop: 30, scrollLeft: 20 })
    )
  })

  it('supports scrollTo object and number overloads', async () => {
    const wrapper = mount(Scrollbar, {
      slots: { default: '<div style="height: 1200px; width: 1200px">Tall</div>' }
    })
    await wrapper.vm.$nextTick()
    const exposed = (wrapper.vm as any).$?.exposed

    exposed?.scrollTo({ top: 40, left: 10 })
    exposed?.scrollTo(12, 22)
    exposed?.update()
    expect(typeof exposed?.scrollTo).toBe('function')
  })

  it('handles noresize switch branch without throwing', async () => {
    const wrapper = mount(Scrollbar, {
      props: {
        noresize: true
      },
      slots: { default: '<div>xx</div>' }
    })
    await wrapper.setProps({ noresize: false })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.yh-scrollbar').exists()).toBe(true)
  })

  it('covers numeric sizing, native scroll and zero-size update branches', async () => {
    const wrapper = mount(Scrollbar, {
      props: {
        height: 120,
        maxHeight: 240,
        native: true,
        tag: 'section',
        viewClass: 'view-extra',
        viewStyle: { minHeight: '300px' }
      },
      slots: { default: '<div>Native</div>' }
    })

    const wrap = wrapper.find('.yh-scrollbar__wrap')
    expect((wrap.element as HTMLElement).style.height).toBe('120px')
    expect((wrap.element as HTMLElement).style.maxHeight).toBe('240px')
    expect(wrapper.find('section.view-extra').exists()).toBe(true)

    await wrap.trigger('scroll')
    await wrapper.trigger('mouseenter')
    exposedUpdate(wrapper)
    expect(wrapper.emitted('scroll')).toBeTruthy()
  })

  it('calculates custom thumb sizes and calls scrollbar appearance hooks', async () => {
    const wrapper = mount(Scrollbar, {
      props: { height: 100, maxHeight: 160, native: false, always: true, minSize: 20 },
      slots: { default: '<div style="height: 1000px; width: 800px">Tall</div>' }
    })
    await wrapper.vm.$nextTick()

    const wrap = wrapper.find('.yh-scrollbar__wrap').element as HTMLElement
    Object.defineProperties(wrap, {
      offsetHeight: { value: 100, configurable: true },
      offsetWidth: { value: 120, configurable: true },
      scrollHeight: { value: 1000, configurable: true },
      scrollWidth: { value: 600, configurable: true }
    })

    exposedUpdate(wrapper)
    await wrapper.vm.$nextTick()

    const thumbs = wrapper.findAll('.yh-scrollbar__thumb')
    expect(thumbs[0].attributes('style')).toContain('width: 24px')
    expect(thumbs[1].attributes('style')).toContain('height: 20px')

    wrap.scrollTop = 50
    wrap.scrollLeft = 30
    await wrapper.find('.yh-scrollbar__wrap').trigger('scroll')
    await wrapper.trigger('mouseenter')
    expect(wrapper.emitted('scroll')?.at(-1)?.[0]).toEqual(
      expect.objectContaining({ scrollTop: 50, scrollLeft: 30 })
    )
  })

  it('connects and disconnects ResizeObserver when noresize changes', async () => {
    const observe = vi.fn()
    const disconnect = vi.fn()
    const OriginalResizeObserver = globalThis.ResizeObserver

    globalThis.ResizeObserver = class {
      observe = observe
      disconnect = disconnect
      unobserve = vi.fn()
    } as unknown as typeof ResizeObserver

    const wrapper = mount(Scrollbar, {
      props: { noresize: false },
      slots: { default: '<div>Observed</div>' }
    })
    await wrapper.vm.$nextTick()
    expect(observe).toHaveBeenCalledTimes(2)

    await wrapper.setProps({ noresize: true })
    expect(disconnect).toHaveBeenCalled()

    await wrapper.setProps({ noresize: false })
    expect(observe).toHaveBeenCalledTimes(4)

    wrapper.unmount()
    expect(disconnect).toHaveBeenCalledTimes(2)
    globalThis.ResizeObserver = OriginalResizeObserver
  })

  it('handles thumb drag guard paths without changing scroll', async () => {
    const wrapper = mount(Scrollbar, {
      props: { height: 80, native: false, always: true },
      slots: { default: '<div style="height: 800px">Tall</div>' }
    })
    await wrapper.vm.$nextTick()
    const wrap = wrapper.find('.yh-scrollbar__wrap').element as HTMLElement
    Object.defineProperties(wrap, {
      offsetHeight: { value: 80, configurable: true },
      offsetWidth: { value: 80, configurable: true },
      scrollHeight: { value: 800, configurable: true },
      scrollWidth: { value: 80, configurable: true }
    })
    exposedUpdate(wrapper)
    await wrapper.vm.$nextTick()

    const thumb = wrapper.find('.yh-scrollbar__thumb')
    await thumb.trigger('mousedown', { button: 1, clientX: 0, clientY: 0 })
    document.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientY: 60 }))
    expect(wrap.scrollTop).toBe(0)
  })
})

function exposedUpdate(wrapper: ReturnType<typeof mount>) {
  const exposed = (wrapper.vm as any).$?.exposed
  exposed?.update?.()
}
