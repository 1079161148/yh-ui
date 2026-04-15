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
})
