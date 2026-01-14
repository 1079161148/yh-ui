/**
 * Radio Component Tests
 * @description 单选框组件单元测试
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import YhRadio from '../src/radio.vue'
import YhRadioGroup from '../src/radio-group.vue'

describe('YhRadio', () => {
  it('renders properly', () => {
    const wrapper = mount(YhRadio, {
      props: {
        modelValue: '',
        value: '1'
      },
      slots: {
        default: '选项'
      }
    })
    expect(wrapper.text()).toContain('选项')
  })

  it('toggles checked state on click', async () => {
    const modelValue = ref('')
    const wrapper = mount(YhRadio, {
      props: {
        modelValue: modelValue.value,
        value: '1',
        'onUpdate:modelValue': (val: string) => {
          modelValue.value = val
        }
      }
    })

    await wrapper.find('input').trigger('change')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  it('respects disabled state', async () => {
    const wrapper = mount(YhRadio, {
      props: {
        modelValue: '',
        value: '1',
        disabled: true
      }
    })

    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    expect(wrapper.classes()).toContain('is-disabled')
  })

  it('displays border style', () => {
    const wrapper = mount(YhRadio, {
      props: {
        modelValue: '',
        value: '1',
        border: true
      }
    })

    expect(wrapper.classes()).toContain('is-border')
  })

  it('applies size modifier', () => {
    const wrapper = mount(YhRadio, {
      props: {
        modelValue: '',
        value: '1',
        size: 'large'
      }
    })

    expect(wrapper.classes()).toContain('yh-radio--large')
  })

  it('shows checked state correctly', () => {
    const wrapper = mount(YhRadio, {
      props: {
        modelValue: '1',
        value: '1'
      }
    })

    expect(wrapper.classes()).toContain('is-checked')
  })
})

describe('YhRadioGroup', () => {
  it('renders children radios', () => {
    const wrapper = mount(YhRadioGroup, {
      props: {
        modelValue: '1'
      },
      slots: {
        default: `
          <yh-radio value="1">选项一</yh-radio>
          <yh-radio value="2">选项二</yh-radio>
        `
      },
      global: {
        components: {
          YhRadio
        }
      }
    })

    expect(wrapper.findAllComponents(YhRadio).length).toBe(2)
  })
})
