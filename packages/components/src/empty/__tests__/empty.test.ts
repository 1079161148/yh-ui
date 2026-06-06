import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import Empty from '../src/empty.vue'
import { YhConfigProvider } from '../../config-provider'
import { en } from '@yh-ui/locale'

describe('YhEmpty 组件', () => {
  it('应该正确渲染基础结构', () => {
    const wrapper = mount(Empty)
    expect(wrapper.find('.yh-empty').exists()).toBe(true)
  })

  it('应该渲染默认描述文字', () => {
    const wrapper = mount(Empty)
    expect(wrapper.find('.yh-empty__description').text()).toBe('暂无数据')
  })

  it('应该支持自定义描述文字', () => {
    const wrapper = mount(Empty, {
      props: { description: '没有找到结果' }
    })
    expect(wrapper.find('.yh-empty__description').text()).toBe('没有找到结果')
  })

  it('应该渲染默认 SVG 插图', () => {
    const wrapper = mount(Empty)
    expect(wrapper.find('.yh-empty__image').exists()).toBe(true)
    expect(wrapper.find('.yh-empty__svg').exists()).toBe(true)
  })

  it('应该支持自定义图片', () => {
    const src = 'https://example.com/empty.png'
    const wrapper = mount(Empty, {
      props: { image: src }
    })
    const img = wrapper.find('.yh-empty__image img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe(src)
  })

  it('应该支持自定义图片尺寸', () => {
    const wrapper = mount(Empty, {
      props: { imageSize: 200 }
    })
    const imageDiv = wrapper.find('.yh-empty__image')
    const style = imageDiv.attributes('style')
    expect(style).toContain('width: 200px')
    expect(style).toContain('height: 200px')
  })

  it('默认图片尺寸应为 100', () => {
    const wrapper = mount(Empty)
    const imageDiv = wrapper.find('.yh-empty__image')
    const style = imageDiv.attributes('style')
    expect(style).toContain('width: 100px')
    expect(style).toContain('height: 100px')
  })

  it('应该支持默认插槽（底部内容）', () => {
    const wrapper = mount(Empty, {
      slots: {
        default: '<button class="action-btn">立即操作</button>'
      }
    })
    const bottom = wrapper.find('.yh-empty__bottom')
    expect(bottom.exists()).toBe(true)
    expect(bottom.find('.action-btn').exists()).toBe(true)
    expect(bottom.find('.action-btn').text()).toBe('立即操作')
  })

  it('无默认插槽时不渲染底部区域', () => {
    const wrapper = mount(Empty)
    expect(wrapper.find('.yh-empty__bottom').exists()).toBe(false)
  })

  it('应该支持 #image 插槽', () => {
    const wrapper = mount(Empty, {
      slots: {
        image: '<div class="custom-image">📦</div>'
      }
    })
    expect(wrapper.find('.custom-image').exists()).toBe(true)
    expect(wrapper.find('.custom-image').text()).toBe('📦')
    // 自定义插槽时不应渲染默认 SVG
    expect(wrapper.find('.yh-empty__svg').exists()).toBe(false)
  })

  it('应该支持 #description 插槽', () => {
    const wrapper = mount(Empty, {
      slots: {
        description: '<p class="custom-desc">自定义描述</p>'
      }
    })
    expect(wrapper.find('.custom-desc').exists()).toBe(true)
    expect(wrapper.find('.custom-desc').text()).toBe('自定义描述')
  })

  it('应该有 role=status 和 aria-label', () => {
    const wrapper = mount(Empty)
    expect(wrapper.find('.yh-empty').attributes('role')).toBe('status')
    expect(wrapper.find('.yh-empty').attributes('aria-label')).toBe('empty')
  })

  it('自定义图片应设置 alt 为 description', () => {
    const wrapper = mount(Empty, {
      props: {
        image: 'https://example.com/empty.png',
        description: '暂无订单'
      }
    })
    expect(wrapper.find('.yh-empty__image img').attributes('alt')).toBe('暂无订单')
  })
  it('应该支持国际化默认描述文字', async () => {
    // 默认 zh-cn
    const wrapper = mount(Empty)
    expect(wrapper.find('.yh-empty__description').text()).toBe('暂无数据')
  })
  it('should use config-provider locale description', () => {
    const wrapper = mount(YhConfigProvider, {
      props: { locale: en },
      slots: {
        default: () => h(Empty)
      }
    })

    expect(wrapper.find('.yh-empty__description').text()).toContain('No Data')
  })

  it('should apply theme overrides as inline css vars', () => {
    const wrapper = mount(Empty, {
      props: {
        themeOverrides: {
          padding: '24px 0'
        }
      }
    })

    expect(wrapper.find('.yh-empty').attributes('style')).toContain('--yh-empty-padding: 24px 0')
  })
})
