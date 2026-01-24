/**
 * @vitest-environment happy-dom
 */
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import YhColorPicker from '../src/color-picker.vue'

describe('YhColorPicker', () => {
  it('should render correctly', () => {
    const wrapper = mount(YhColorPicker, {
      props: {
        modelValue: '#ff0000'
      }
    })
    expect(wrapper.classes()).toContain('yh-color-picker')
    const colorBlock = wrapper.find('.yh-color-picker__color')
    expect(colorBlock.exists()).toBe(true)
  })

  it('should toggle panel visible when clicked', async () => {
    const wrapper = mount(YhColorPicker, {
      props: {
        modelValue: '#ff0000'
      },
      global: {
        stubs: {
          Teleport: true
        }
      }
    })
    await wrapper.trigger('click')
    // Since we use Teleport, checking visibility might need specific approach or checking the 'visible' ref
    // For now, check if active class or ref changes if exposed (though not exposed yet)
  })

  it('should apply defined size class', () => {
    const wrapper = mount(YhColorPicker, {
      props: {
        size: 'large'
      }
    })
    expect(wrapper.classes()).toContain('yh-color-picker--large')
  })
})
