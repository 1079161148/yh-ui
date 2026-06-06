/**
 * RadioButton Component Tests
 * @description 单选按钮组件单元测试
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref, nextTick } from 'vue'
import YhRadioGroup from '../src/radio-group.vue'
import YhRadioButton from '../src/radio-button.vue'
import type { RadioValueType } from '../src/radio'

describe('YhRadioButton', () => {
  it('renders properly', () => {
    const wrapper = mount(YhRadioButton, {
      props: {
        label: 'Option 1',
        value: '1'
      }
    })
    expect(wrapper.text()).toContain('Option 1')
  })

  it('works with RadioGroup', async () => {
    const modelValue = ref('1')
    const wrapper = mount(YhRadioGroup, {
      props: {
        modelValue: modelValue.value,
        'onUpdate:modelValue': async (val: RadioValueType) => {
          modelValue.value = val as string
          await wrapper.setProps({ modelValue: val })
        }
      },
      slots: {
        default: () => [
          // @ts-ignore
          h(YhRadioButton, { value: '1', label: 'Option 1' }),
          // @ts-ignore
          h(YhRadioButton, { value: '2', label: 'Option 2' })
        ]
      }
    })

    // Initial state
    const radios = wrapper.findAll('.yh-radio-button')
    expect(radios.length).toBe(2)
    expect(radios[0].classes()).toContain('is-checked')
    expect(radios[1].classes()).not.toContain('is-checked')

    // Change selection
    await radios[1].find('input').trigger('change')
    expect(modelValue.value).toBe('2')
    expect(radios[0].classes()).not.toContain('is-checked')
    expect(radios[1].classes()).toContain('is-checked')
  })

  it('disabled state', async () => {
    const wrapper = mount(YhRadioGroup, {
      props: {
        modelValue: '1',
        disabled: true
      },
      slots: {
        default: () => [
          // @ts-ignore
          h(YhRadioButton, { value: '1', label: 'Option 1' }),
          // @ts-ignore
          h(YhRadioButton, { value: '2', label: 'Option 2' })
        ]
      }
    })

    const radios = wrapper.findAll('.yh-radio-button')
    expect(radios[0].classes()).toContain('is-disabled')
    expect(radios[0].find('input').element.disabled).toBe(true)
  })

  it('custom colors', async () => {
    const wrapper = mount(YhRadioGroup, {
      props: {
        modelValue: '1',
        fill: '#ff0000',
        textColor: '#00ff00'
      },
      slots: {
        default: () => [
          // @ts-ignore
          h(YhRadioButton, { value: '1', label: 'Option 1' })
        ]
      }
    })
    await nextTick()
    const label = wrapper.find('label')
    // Check if style contains the custom colors (checking computed style or attribute depending on implementation)
    // The implementation binds :style="activeStyle" on label
    expect(label.attributes('style')).toContain('--yh-radio-button-checked-bg-color: #ff0000')
    expect(label.attributes('style')).toContain('--yh-radio-button-checked-text-color: #00ff00')
  })
})

// Helper to use h in tests if needed, or we can use template string slots if preferred,
// using h is safer for component references.
import { h } from 'vue'
