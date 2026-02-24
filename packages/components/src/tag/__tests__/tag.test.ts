/**
 * Tag Component Unit Tests
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Tag from '../src/tag.vue'

describe('YhTag', () => {
  // 基础渲染测试
  it('should render correctly', () => {
    const wrapper = mount(Tag, {
      slots: {
        default: 'Tag Content'
      }
    })
    expect(wrapper.text()).toContain('Tag Content')
    expect(wrapper.get('span').classes()).toContain('yh-tag')
  })

  // 类型测试
  it('should apply type class', () => {
    const types = ['primary', 'success', 'warning', 'danger', 'info'] as const
    types.forEach((type) => {
      const wrapper = mount(Tag, {
        props: { type }
      })
      expect(wrapper.get('span').classes()).toContain(`yh-tag--${type}`)
    })
  })

  // 尺寸测试
  it('should apply size class', () => {
    const sizes = ['large', 'default', 'small'] as const
    sizes.forEach((size) => {
      const wrapper = mount(Tag, {
        props: { size }
      })
      expect(wrapper.get('span').classes()).toContain(`yh-tag--${size}`)
    })
  })

  // 主题效果测试
  it('should apply effect class', () => {
    const effects = ['dark', 'light', 'plain'] as const
    effects.forEach((effect) => {
      const wrapper = mount(Tag, {
        props: { effect }
      })
      expect(wrapper.get('span').classes()).toContain(`yh-tag--${effect}`)
    })
  })

  // 圆角测试
  it('should apply round class', () => {
    const wrapper = mount(Tag, {
      props: { round: true }
    })
    expect(wrapper.get('span').classes()).toContain('is-round')
  })

  // 描边测试
  it('should apply hit class', () => {
    const wrapper = mount(Tag, {
      props: { hit: true }
    })
    expect(wrapper.get('span').classes()).toContain('is-hit')
  })

  // 可关闭测试
  it('should render close icon and handle close event', async () => {
    const wrapper = mount(Tag, {
      props: { closable: true }
    })
    const closeBtn = wrapper.find('.yh-tag__close')
    expect(closeBtn.exists()).toBe(true)

    await closeBtn.trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  // 可选中测试
  it('should handle checkable state', async () => {
    const wrapper = mount(Tag, {
      props: {
        checkable: true,
        checked: false
      }
    })
    const span = wrapper.get('span')
    expect(span.classes()).toContain('is-checkable')
    expect(span.classes()).not.toContain('is-checked')

    await span.trigger('click')
    expect(wrapper.emitted('update:checked')?.[0]).toEqual([true])
    expect(wrapper.emitted('change')?.[0]).toEqual([true])

    // 模拟父组件更新 checked
    await wrapper.setProps({ checked: true })
    expect(span.classes()).toContain('is-checked')
  })

  // 可编辑测试
  it('should handle editable mode', async () => {
    const wrapper = mount(Tag, {
      props: {
        editable: true
      },
      slots: {
        default: 'Editable Tag'
      }
    })
    const span = wrapper.get('span')
    expect(span.classes()).toContain('is-editable')

    // 双击进入编辑模式
    await span.trigger('dblclick')
    const input = wrapper.find('.yh-tag__input')
    expect(input.exists()).toBe(true)

    // 输入内容并失去焦点确认
    await input.setValue('New Tag Value')
    await input.trigger('blur')

    expect(wrapper.emitted('edit')?.[0]).toEqual(['New Tag Value'])
    expect(wrapper.find('.yh-tag__input').exists()).toBe(false)
  })

  // 编辑模式键盘事件测试
  it('should handle keyboard events in edit mode', async () => {
    const wrapper = mount(Tag, {
      props: { editable: true }
    })

    // 进入编辑
    await wrapper.get('span').trigger('dblclick')
    const input = wrapper.find('.yh-tag__input')

    // Esc 取消
    await input.trigger('keydown', { key: 'Escape' })
    expect(wrapper.find('.yh-tag__input').exists()).toBe(false)
    expect(wrapper.emitted('edit')).toBeFalsy()

    // 重新进入并回车确认
    await wrapper.get('span').trigger('dblclick')
    const input2 = wrapper.find('.yh-tag__input')
    await input2.setValue('Tag with Enter')
    await input2.trigger('keydown', { key: 'Enter' })

    expect(wrapper.emitted('edit')?.[0]).toEqual(['Tag with Enter'])
    expect(wrapper.find('.yh-tag__input').exists()).toBe(false)
  })

  // 图标测试
  it('should render icons correctly', () => {
    const wrapper = mount(Tag, {
      props: {
        icon: 'i-ep-plus',
        suffixIcon: 'i-ep-check'
      }
    })
    const span = wrapper.get('span')
    expect(span.classes()).toContain('is-has-icon')
    expect(span.classes()).toContain('is-has-suffix-icon')
    expect(wrapper.find('.yh-tag__icon').exists()).toBe(true)
    expect(wrapper.find('.yh-tag__suffix-icon').exists()).toBe(true)
  })

  // 自定义颜色测试
  it('should apply custom color style', () => {
    const wrapper = mount(Tag, {
      props: {
        color: '#ff0000',
        effect: 'dark'
      }
    })
    const style = wrapper.get('span').attributes('style')
    expect(style).toContain('--yh-tag-bg-color: #ff0000')
    expect(style).toContain('--yh-tag-border-color: #ff0000')
    expect(style).toContain('--yh-tag-text-color: #fff')

    const wrapperLight = mount(Tag, {
      props: {
        color: '#ff0000',
        effect: 'light'
      }
    })
    const styleLight = wrapperLight.get('span').attributes('style')
    expect(styleLight).toContain('--yh-tag-bg-color: #ff000020')
    expect(styleLight).toContain('--yh-tag-text-color: #ff0000')
  })

  // 点击事件测试
  it('should emit click event', async () => {
    const wrapper = mount(Tag)
    await wrapper.get('span').trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  // 插槽测试
  it('should render icon via slot', () => {
    const wrapper = mount(Tag, {
      slots: {
        icon: '<div class="custom-icon"></div>'
      }
    })
    expect(wrapper.find('.custom-icon').exists()).toBe(true)
    expect(wrapper.get('span').classes()).toContain('is-has-icon')
  })

  // 导出常量测试
  it('should export constants', async () => {
    const { tagTypes, tagSizes, tagEffects } = await import('../src/tag')
    expect(tagTypes).toBeTruthy()
    expect(tagSizes).toBeTruthy()
    expect(tagEffects).toBeTruthy()
  })
})
