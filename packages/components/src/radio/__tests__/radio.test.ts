/**
 * Radio Component Tests
 * @description 单选框组件单元测试
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref, h } from 'vue'
import YhRadio from '../src/radio.vue'
import YhRadioGroup from '../src/radio-group.vue'
import type { RadioValueType } from '../src/radio'

describe('YhRadio', () => {
  it('renders properly', () => {
    const wrapper = mount(YhRadio, {
      props: {
        value: '1',
        label: 'Option 1'
      }
    })
    expect(wrapper.text()).toContain('Option 1')
    expect(wrapper.find('input').element.value).toBe('1')
  })

  it('v-model works directly on Radio', async () => {
    const modelValue = ref('1')
    const wrapper = mount(YhRadio, {
      props: {
        modelValue: modelValue.value,
        value: '2',
        label: 'Option 2',
        'onUpdate:modelValue': async (val: RadioValueType) => {
          modelValue.value = val as string
          await wrapper.setProps({ modelValue: val })
        }
      }
    })

    await wrapper.find('input').trigger('change')
    expect(modelValue.value).toBe('2')
  })

  it('respects disabled state', () => {
    const wrapper = mount(YhRadio, {
      props: {
        value: '1',
        disabled: true
      }
    })
    expect(wrapper.classes()).toContain('is-disabled')
    expect(wrapper.find('input').element.disabled).toBe(true)
  })

  it('displays border', () => {
    const wrapper = mount(YhRadio, {
      props: {
        value: '1',
        border: true
      }
    })
    expect(wrapper.classes()).toContain('is-bordered')
  })

  it('applies size', () => {
    const wrapper = mount(YhRadio, {
      props: {
        value: '1',
        size: 'large'
      }
    })
    expect(wrapper.classes()).toContain('yh-radio--large')
  })
})

describe('YhRadioGroup', () => {
  it('renders children radios', () => {
    const wrapper = mount(YhRadioGroup, {
      props: { modelValue: '1' },
      slots: {
        default: () => [
          h(YhRadio, { value: '1', label: 'Option 1' }),
          h(YhRadio, { value: '2', label: 'Option 2' })
        ]
      }
    })
    expect(wrapper.findAllComponents(YhRadio).length).toBe(2)
  })

  it('data binding works with v-model', async () => {
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
          h(YhRadio, { value: '1', label: 'Option 1' }),
          h(YhRadio, { value: '2', label: 'Option 2' })
        ]
      }
    })

    const radios = wrapper.findAllComponents(YhRadio)
    expect(radios[0].classes()).toContain('is-checked')
    expect(radios[1].classes()).not.toContain('is-checked')

    // Click second radio
    await radios[1].find('input').trigger('change')
    expect(modelValue.value).toBe('2')
    expect(radios[0].classes()).not.toContain('is-checked')
    expect(radios[1].classes()).toContain('is-checked')
  })

  it('group disabled prop affects children', () => {
    const wrapper = mount(YhRadioGroup, {
      props: {
        modelValue: '1',
        disabled: true
      },
      slots: {
        default: () => [h(YhRadio, { value: '1' }), h(YhRadio, { value: '2' })]
      }
    })
    const radios = wrapper.findAllComponents(YhRadio)
    expect(radios[0].classes()).toContain('is-disabled')
    expect(radios[1].classes()).toContain('is-disabled')
    expect(radios[0].find('input').element.disabled).toBe(true)
  })

  it('group size prop affects children', () => {
    const wrapper = mount(YhRadioGroup, {
      props: {
        modelValue: '1',
        size: 'small'
      },
      slots: {
        default: () => [
          h(YhRadio, { value: '1', border: true }) // size only applies if border is often used or specific CSS, checking class
        ]
      }
    })
    const radio = wrapper.findComponent(YhRadio)
    expect(radio.classes()).toContain('yh-radio--small')
  })

  it('change event is emitted', async () => {
    const wrapper = mount(YhRadioGroup, {
      props: { modelValue: '1' },
      slots: {
        default: () => [h(YhRadio, { value: '1' }), h(YhRadio, { value: '2' })]
      }
    })

    const radios = wrapper.findAllComponents(YhRadio)
    await radios[1].find('input').trigger('change')
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')![0]).toEqual(['2'])
  })
})
