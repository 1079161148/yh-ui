import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Container from '../src/container.vue'
import Header from '../src/header.vue'
import Aside from '../src/aside.vue'
import Main from '../src/main.vue'
import Footer from '../src/footer.vue'

describe('YhContainer', () => {
  it('应该渲染 section 标签', () => {
    const wrapper = mount(Container)
    expect(wrapper.find('section').exists()).toBe(true)
    expect(wrapper.find('.yh-container').exists()).toBe(true)
  })

  it('应该支持手动设置 vertical 方向', () => {
    const wrapper = mount(Container, { props: { direction: 'vertical' } })
    expect(wrapper.find('.yh-container').classes()).toContain('is-vertical')
  })

  it('应该支持手动设置 horizontal 方向', () => {
    const wrapper = mount(Container, { props: { direction: 'horizontal' } })
    expect(wrapper.find('.yh-container').classes()).not.toContain('is-vertical')
  })
})

describe('YhHeader', () => {
  it('应该渲染 header 标签', () => {
    const wrapper = mount(Header)
    expect(wrapper.find('header').exists()).toBe(true)
    expect(wrapper.find('.yh-header').exists()).toBe(true)
  })

  it('默认高度为 60px', () => {
    const wrapper = mount(Header)
    const style = wrapper.find('.yh-header').attributes('style')
    expect(style).toContain('height: 60px')
  })

  it('应该支持自定义高度', () => {
    const wrapper = mount(Header, { props: { height: '80px' } })
    const style = wrapper.find('.yh-header').attributes('style')
    expect(style).toContain('height: 80px')
  })
})

describe('YhAside', () => {
  it('应该渲染 aside 标签', () => {
    const wrapper = mount(Aside)
    expect(wrapper.find('aside').exists()).toBe(true)
    expect(wrapper.find('.yh-aside').exists()).toBe(true)
  })

  it('默认宽度为 200px', () => {
    const wrapper = mount(Aside)
    const style = wrapper.find('.yh-aside').attributes('style')
    expect(style).toContain('width: 200px')
  })

  it('应该支持自定义宽度', () => {
    const wrapper = mount(Aside, { props: { width: '300px' } })
    const style = wrapper.find('.yh-aside').attributes('style')
    expect(style).toContain('width: 300px')
  })
})

describe('YhMain', () => {
  it('应该渲染 main 标签', () => {
    const wrapper = mount(Main)
    expect(wrapper.find('main').exists()).toBe(true)
    expect(wrapper.find('.yh-main').exists()).toBe(true)
  })

  it('应该渲染插槽内容', () => {
    const wrapper = mount(Main, { slots: { default: '内容区域' } })
    expect(wrapper.text()).toBe('内容区域')
  })
})

describe('YhFooter', () => {
  it('应该渲染 footer 标签', () => {
    const wrapper = mount(Footer)
    expect(wrapper.find('footer').exists()).toBe(true)
    expect(wrapper.find('.yh-footer').exists()).toBe(true)
  })

  it('默认高度为 60px', () => {
    const wrapper = mount(Footer)
    const style = wrapper.find('.yh-footer').attributes('style')
    expect(style).toContain('height: 60px')
  })

  it('应该支持自定义高度', () => {
    const wrapper = mount(Footer, { props: { height: '100px' } })
    const style = wrapper.find('.yh-footer').attributes('style')
    expect(style).toContain('height: 100px')
  })
})
