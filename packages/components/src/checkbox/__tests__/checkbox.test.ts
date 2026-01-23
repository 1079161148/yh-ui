/**
 * Checkbox Component Tests
 * @description 复选框组件单元测试
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import YhCheckbox from '../src/checkbox.vue'
import YhCheckboxGroup from '../src/checkbox-group.vue'

describe('YhCheckbox', () => {
  it('renders properly', () => {
    const wrapper = mount(YhCheckbox, {
      props: {
        modelValue: false
      },
      slots: {
        default: '选项'
      }
    })
    expect(wrapper.text()).toContain('选项')
  })

  it('toggles checked state on click', async () => {
    const modelValue = ref(false)
    const wrapper = mount(YhCheckbox, {
      props: {
        modelValue: modelValue.value,
        'onUpdate:modelValue': (val: unknown) => {
          modelValue.value = val as boolean
        }
      }
    })

    await wrapper.find('input').trigger('change')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })

  it('respects disabled state', async () => {
    const wrapper = mount(YhCheckbox, {
      props: {
        modelValue: false,
        disabled: true
      }
    })

    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    expect(wrapper.classes()).toContain('is-disabled')
  })

  it('shows indeterminate state', () => {
    const wrapper = mount(YhCheckbox, {
      props: {
        modelValue: false,
        indeterminate: true
      }
    })

    expect(wrapper.classes()).toContain('is-indeterminate')
  })

  it('displays border style', () => {
    const wrapper = mount(YhCheckbox, {
      props: {
        modelValue: false,
        border: true
      }
    })

    expect(wrapper.classes()).toContain('is-border')
  })

  it('applies size modifier', () => {
    const wrapper = mount(YhCheckbox, {
      props: {
        modelValue: false,
        size: 'large'
      }
    })

    expect(wrapper.classes()).toContain('yh-checkbox--large')
  })
})

describe('YhCheckboxGroup', () => {
  it('renders children checkboxes', () => {
    const wrapper = mount(YhCheckboxGroup, {
      props: {
        modelValue: []
      },
      slots: {
        default: `
          <yh-checkbox value="a">选项A</yh-checkbox>
          <yh-checkbox value="b">选项B</yh-checkbox>
        `
      },
      global: {
        components: {
          YhCheckbox
        }
      }
    })

    expect(wrapper.findAllComponents(YhCheckbox).length).toBe(2)
  })
})
