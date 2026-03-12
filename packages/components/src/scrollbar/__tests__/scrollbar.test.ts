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
})
