import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Card from '../src/card.vue'

describe('Card 组件', () => {
  it('应该正确渲染', () => {
    const wrapper = mount(Card, {
      slots: {
        default: '卡片内容'
      }
    })
    expect(wrapper.find('.yh-card').exists()).toBe(true)
    expect(wrapper.find('.yh-card__body').text()).toBe('卡片内容')
  })

  it('应该支持 header 属性', () => {
    const wrapper = mount(Card, {
      props: {
        header: '卡片标题'
      }
    })
    expect(wrapper.find('.yh-card__header').exists()).toBe(true)
    expect(wrapper.find('.yh-card__header-title').text()).toBe('卡片标题')
  })

  it('应该支持 header 插槽', () => {
    const wrapper = mount(Card, {
      slots: {
        header: '<div class="custom-header">自定义标题</div>'
      }
    })
    expect(wrapper.find('.custom-header').exists()).toBe(true)
    expect(wrapper.find('.custom-header').text()).toBe('自定义标题')
  })

  it('应该支持 extra 插槽', () => {
    const wrapper = mount(Card, {
      props: {
        header: '标题'
      },
      slots: {
        extra: '<button>更多</button>'
      }
    })
    expect(wrapper.find('.yh-card__header-extra').exists()).toBe(true)
    expect(wrapper.find('.yh-card__header-extra').text()).toBe('更多')
  })

  it('应该支持 footer 插槽', () => {
    const wrapper = mount(Card, {
      slots: {
        footer: '<div class="card-footer">底部内容</div>'
      }
    })
    expect(wrapper.find('.yh-card__footer').exists()).toBe(true)
    expect(wrapper.find('.card-footer').text()).toBe('底部内容')
  })

  it('应该支持不同阴影模式', () => {
    const wrapper = mount(Card, {
      props: {
        shadow: 'hover'
      }
    })
    expect(wrapper.find('.yh-card').classes()).toContain('yh-card--hover')
  })

  it('应该支持边框控制', () => {
    const wrapper = mount(Card, {
      props: {
        bordered: false
      }
    })
    expect(wrapper.find('.yh-card').classes()).not.toContain('is-bordered')
  })

  it('应该支持悬浮效果', () => {
    const wrapper = mount(Card, {
      props: {
        hoverable: true
      }
    })
    expect(wrapper.find('.yh-card').classes()).toContain('is-hoverable')
  })

  it('应该支持不同尺寸', () => {
    const wrapper = mount(Card, {
      props: {
        size: 'small'
      }
    })
    expect(wrapper.find('.yh-card').classes()).toContain('yh-card--small')
  })

  it('应该支持加载状态', () => {
    const wrapper = mount(Card, {
      props: {
        loading: true
      }
    })
    expect(wrapper.find('.yh-card__loading').exists()).toBe(true)
    expect(wrapper.find('.yh-card__skeleton-header').exists()).toBe(true)
  })

  it('应该支持自定义 body 样式', () => {
    const wrapper = mount(Card, {
      props: {
        bodyStyle: { padding: '10px' }
      }
    })
    expect(wrapper.find('.yh-card__body').attributes('style')).toContain('padding: 10px')
  })

  it('应该支持自定义 header 样式', () => {
    const wrapper = mount(Card, {
      props: {
        header: '标题',
        headerStyle: { background: '#f0f0f0' }
      }
    })
    expect(wrapper.find('.yh-card__header').attributes('style')).toContain('background')
  })

  it('应该支持移除 body 内边距', () => {
    const wrapper = mount(Card, {
      props: {
        bodyPadding: false
      }
    })
    expect(wrapper.find('.yh-card__body').classes()).toContain('yh-card__body--no-padding')
  })
})
