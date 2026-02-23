import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Result from '../src/result.vue'

describe('YhResult', () => {
  it('应该正确渲染基础结构', () => {
    const wrapper = mount(Result)
    expect(wrapper.find('.yh-result').exists()).toBe(true)
  })

  it('应该有 role=status', () => {
    const wrapper = mount(Result)
    expect(wrapper.find('.yh-result').attributes('role')).toBe('status')
  })

  it('应该渲染标题', () => {
    const wrapper = mount(Result, { props: { title: '操作成功' } })
    expect(wrapper.find('.yh-result__title').text()).toBe('操作成功')
  })

  it('应该渲染副标题', () => {
    const wrapper = mount(Result, { props: { subTitle: '请返回首页' } })
    expect(wrapper.find('.yh-result__subtitle').text()).toBe('请返回首页')
  })

  it('默认图标类型为 info', () => {
    const wrapper = mount(Result)
    expect(wrapper.find('.yh-result__icon--info').exists()).toBe(true)
  })

  it('应该支持 success 图标', () => {
    const wrapper = mount(Result, { props: { icon: 'success' } })
    expect(wrapper.find('.yh-result__icon--success').exists()).toBe(true)
  })

  it('应该支持 warning 图标', () => {
    const wrapper = mount(Result, { props: { icon: 'warning' } })
    expect(wrapper.find('.yh-result__icon--warning').exists()).toBe(true)
  })

  it('应该支持 error 图标', () => {
    const wrapper = mount(Result, { props: { icon: 'error' } })
    expect(wrapper.find('.yh-result__icon--error').exists()).toBe(true)
  })

  it('应该渲染 SVG 图标', () => {
    const wrapper = mount(Result, { props: { icon: 'success' } })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('无标题时应显示默认标题', () => {
    const wrapper = mount(Result)
    // 组件默认会显示国际化文本作为标题
    expect(wrapper.find('.yh-result__title').exists()).toBe(true)
  })

  it('无副标题时不渲染副标题区', () => {
    const wrapper = mount(Result)
    expect(wrapper.find('.yh-result__subtitle').exists()).toBe(false)
  })

  it('应该支持 #icon 插槽', () => {
    const wrapper = mount(Result, {
      slots: { icon: '<div class="custom-icon">🎉</div>' }
    })
    expect(wrapper.find('.custom-icon').exists()).toBe(true)
  })

  it('应该支持 #title 插槽', () => {
    const wrapper = mount(Result, {
      slots: { title: '<span class="custom-title">自定义标题</span>' }
    })
    expect(wrapper.find('.custom-title').text()).toBe('自定义标题')
  })

  it('应该支持 #extra 插槽', () => {
    const wrapper = mount(Result, {
      slots: { extra: '<div class="extra-content">额外内容</div>' }
    })
    expect(wrapper.find('.yh-result__extra').exists()).toBe(true)
    expect(wrapper.find('.extra-content').text()).toBe('额外内容')
  })

  it('应该支持默认插槽（操作区）', () => {
    const wrapper = mount(Result, {
      slots: { default: '<button class="action-btn">返回</button>' }
    })
    expect(wrapper.find('.yh-result__actions').exists()).toBe(true)
    expect(wrapper.find('.action-btn').text()).toBe('返回')
  })

  it('无默认插槽时不渲染操作区', () => {
    const wrapper = mount(Result, { props: { title: '标题' } })
    expect(wrapper.find('.yh-result__actions').exists()).toBe(false)
  })
  it('不同 icon 类型应显示对应国际化标题', () => {
    const icons = ['success', 'warning', 'error', 'info'] as const
    const titles: Record<string, string> = {
      success: '操作成功',
      warning: '警告',
      error: '操作失败',
      info: '提示'
    }

    icons.forEach((icon) => {
      const wrapper = mount(Result, { props: { icon } })
      expect(wrapper.find('.yh-result__title').text()).toBe(titles[icon])
    })
  })
})
