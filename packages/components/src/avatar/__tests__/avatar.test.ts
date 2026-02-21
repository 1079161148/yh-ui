import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Avatar from '../src/avatar.vue'

describe('YhAvatar 组件', () => {
  it('应该正确渲染基础结构', () => {
    const wrapper = mount(Avatar)
    expect(wrapper.find('.yh-avatar').exists()).toBe(true)
  })

  it('应该默认为圆形', () => {
    const wrapper = mount(Avatar)
    expect(wrapper.find('.yh-avatar').classes()).toContain('yh-avatar--circle')
  })

  it('应该支持方形', () => {
    const wrapper = mount(Avatar, {
      props: { shape: 'square' }
    })
    expect(wrapper.find('.yh-avatar').classes()).toContain('yh-avatar--square')
  })

  it('应该支持预设尺寸 small', () => {
    const wrapper = mount(Avatar, {
      props: { size: 'small' }
    })
    expect(wrapper.find('.yh-avatar').classes()).toContain('yh-avatar--small')
  })

  it('应该支持预设尺寸 large', () => {
    const wrapper = mount(Avatar, {
      props: { size: 'large' }
    })
    expect(wrapper.find('.yh-avatar').classes()).toContain('yh-avatar--large')
  })

  it('应该支持自定义数字尺寸', () => {
    const wrapper = mount(Avatar, {
      props: { size: 80 }
    })
    const style = wrapper.find('.yh-avatar').attributes('style')
    expect(style).toContain('width: 80px')
    expect(style).toContain('height: 80px')
  })

  it('应该正确渲染图片', () => {
    const src = 'https://example.com/avatar.png'
    const wrapper = mount(Avatar, {
      props: { src }
    })
    const img = wrapper.find('.yh-avatar__img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe(src)
  })

  it('应该支持 alt 属性', () => {
    const wrapper = mount(Avatar, {
      props: {
        src: 'https://example.com/avatar.png',
        alt: '用户头像'
      }
    })
    expect(wrapper.find('.yh-avatar__img').attributes('alt')).toBe('用户头像')
    expect(wrapper.find('.yh-avatar').attributes('aria-label')).toBe('用户头像')
  })

  it('应该支持 srcSet 属性', () => {
    const srcSet = 'https://example.com/avatar-2x.png 2x'
    const wrapper = mount(Avatar, {
      props: {
        src: 'https://example.com/avatar.png',
        srcSet
      }
    })
    expect(wrapper.find('.yh-avatar__img').attributes('srcset')).toBe(srcSet)
  })

  it('应该支持 fit 属性', () => {
    const wrapper = mount(Avatar, {
      props: {
        src: 'https://example.com/avatar.png',
        fit: 'contain'
      }
    })
    const imgStyle = wrapper.find('.yh-avatar__img').attributes('style')
    expect(imgStyle).toContain('object-fit: contain')
  })

  it('应该正确处理图片加载失败', async () => {
    const wrapper = mount(Avatar, {
      props: { src: 'https://invalid-url.com/avatar.png' }
    })
    // 触发 img error 事件
    await wrapper.find('.yh-avatar__img').trigger('error')
    // error 后图片应该隐藏
    expect(wrapper.find('.yh-avatar__img').exists()).toBe(false)
    expect(wrapper.emitted('error')).toBeTruthy()
    expect(wrapper.emitted('error')!.length).toBe(1)
  })

  it('应该在图片加载失败后显示默认插槽', async () => {
    const wrapper = mount(Avatar, {
      props: { src: 'https://invalid-url.com/avatar.png' },
      slots: {
        default: '<span class="fallback">FB</span>'
      }
    })
    await wrapper.find('.yh-avatar__img').trigger('error')
    expect(wrapper.find('.fallback').exists()).toBe(true)
    expect(wrapper.find('.fallback').text()).toBe('FB')
  })

  it('应该支持默认插槽显示文字', () => {
    const wrapper = mount(Avatar, {
      slots: {
        default: 'YH'
      }
    })
    expect(wrapper.text()).toContain('YH')
    expect(wrapper.find('.yh-avatar__img').exists()).toBe(false)
  })

  it('应该支持自定义背景色 backgroundColor', () => {
    const wrapper = mount(Avatar, {
      props: { backgroundColor: '#F56C6C' }
    })
    const style = wrapper.find('.yh-avatar').attributes('style')
    expect(style).toContain('background-color')
  })

  it('应该支持旧 API color 属性作为背景色', () => {
    const wrapper = mount(Avatar, {
      props: { color: '#67C23A' }
    })
    const style = wrapper.find('.yh-avatar').attributes('style')
    expect(style).toContain('background-color')
  })

  it('应该有 role=img', () => {
    const wrapper = mount(Avatar)
    expect(wrapper.find('.yh-avatar').attributes('role')).toBe('img')
  })
})
