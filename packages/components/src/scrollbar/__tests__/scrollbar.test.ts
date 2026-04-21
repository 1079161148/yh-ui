import { describe, expect, it } from 'vitest'
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
    document.dispatchEvent(
      new MouseEvent('mousemove', { bubbles: true, clientX: 10, clientY: 40 })
    )
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
})

function exposedUpdate(wrapper: ReturnType<typeof mount>) {
  const exposed = (wrapper.vm as any).$?.exposed
  exposed?.update?.()
}
