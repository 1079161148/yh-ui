/**
 * InputNumber Component Unit Tests
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InputNumber from '../src/input-number.vue'

describe('YhInputNumber', () => {
  it('should render correctly', () => {
    const wrapper = mount(InputNumber, {
      props: {
        modelValue: 1
      }
    })
    expect(wrapper.find('input').element.value).toBe('1')
    expect(wrapper.get('.yh-input-number').classes()).toContain('yh-input-number')
  })

  it('should increment value on increase button click', async () => {
    const wrapper = mount(InputNumber, {
      props: {
        modelValue: 1,
        step: 1
      }
    })
    const increaseBtn = wrapper.find('.yh-input-number__increase')
    await increaseBtn.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([2])
  })

  it('should decrement value on decrease button click', async () => {
    const wrapper = mount(InputNumber, {
      props: {
        modelValue: 1,
        step: 1
      }
    })
    const decreaseBtn = wrapper.find('.yh-input-number__decrease')
    await decreaseBtn.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([0])
  })

  it('should respect min/max constraints', async () => {
    const wrapper = mount(InputNumber, {
      props: {
        modelValue: 1,
        min: 1,
        max: 2,
        step: 1
      }
    })
    const decreaseBtn = wrapper.find('.yh-input-number__decrease')
    const increaseBtn = wrapper.find('.yh-input-number__increase')

    // Test min
    await decreaseBtn.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()

    // Test max
    await increaseBtn.trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([2])

    await wrapper.setProps({ modelValue: 2 })
    await increaseBtn.trigger('click')
    // No new emission for value 2
    expect(wrapper.emitted('update:modelValue')?.length).toBe(1)
  })

  it('should handle precision correctly', async () => {
    const wrapper = mount(InputNumber, {
      props: {
        modelValue: 1,
        precision: 2,
        step: 0.1
      }
    })
    const increaseBtn = wrapper.find('.yh-input-number__increase')
    await increaseBtn.trigger('click')

    // Value emitted is a number
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([1.1])

    // Display value uses toFixed when precision is specified, showing trailing zeros
    await wrapper.setProps({ modelValue: 1.1 })
    expect(wrapper.find('input').element.value).toBe('1.10')
  })

  it('should be disabled when disabled prop is true', async () => {
    const wrapper = mount(InputNumber, {
      props: {
        disabled: true,
        modelValue: 1
      }
    })
    expect(wrapper.find('.yh-input-number').classes()).toContain('is-disabled')
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()

    const increaseBtn = wrapper.find('.yh-input-number__increase')
    await increaseBtn.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('should handle step-strictly correctly', async () => {
    const wrapper = mount(InputNumber, {
      props: {
        modelValue: 1,
        step: 2,
        stepStrictly: true
      }
    })
    const input = wrapper.find('input')
    await input.setValue('2.5')
    await input.trigger('blur')
    // Math.round(2.5 / 2) * 2 = 1 * 2 = 2 or 2 * 2 = 4? 2.5 / 2 = 1.25. Round is 1. result 2.
    // Wait, 2.5 / 2 is 1.25. Math.round(1.25) is 1. 1 * 2 = 2.
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([2])
  })

  it('should handle controls-position correctly', () => {
    const wrapper = mount(InputNumber, {
      props: {
        controlsPosition: 'right'
      }
    })
    expect(wrapper.find('.yh-input-number').classes()).toContain('is-controls-right')
  })
})
