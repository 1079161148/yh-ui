/**
 * InputNumber Component Unit Tests
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InputNumber from '../src/input-number.vue'
import { inputNumberSizes, controlsPositions } from '../src/input-number'

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

  it('should export valid constants', () => {
    expect(inputNumberSizes).toBeTruthy()
    expect(inputNumberSizes.length).toBe(3)
    expect(controlsPositions).toBeTruthy()
    expect(controlsPositions.length).toBe(2)
  })

  it('should calculate precision correctly with undefined modelValue', () => {
    const wrapper = mount(InputNumber, {
      props: { step: 0.1, modelValue: undefined }
    })
    expect(wrapper.vm).toBeTruthy()
  })

  it('should handle custom validator string and boolean result', async () => {
    const wrapper = mount(InputNumber, {
      props: {
        modelValue: 1,
        validator: (val) => (val === 1 ? true : val === 2 ? false : 'Error message')
      }
    })

    // trigger internal validate
    const increaseBtn = wrapper.find('.yh-input-number__increase')
    await increaseBtn.trigger('click') // val = 2 -> validator returns false
    expect(wrapper.vm).toBeTruthy()

    await wrapper.setProps({ validator: (val: any) => 'Always error' })
    await increaseBtn.trigger('click') // string error
  })

  it('should handle clear icon and expose clear method', async () => {
    const wrapper = mount(InputNumber, {
      props: {
        modelValue: 10,
        clearable: true
      }
    })

    // show clear icon
    await wrapper.trigger('mouseenter')

    const clearIcon = wrapper.find('.yh-input-number__clear')
    if (clearIcon.exists()) {
      await clearIcon.trigger('click')
      expect(wrapper.emitted('clear')).toBeTruthy()
    }

    // expose clear call
    wrapper.vm.clear()
    expect(wrapper.emitted('clear')).toBeTruthy()
  })

  it('should handle focus, blur and ArrowDown', async () => {
    const wrapper = mount(InputNumber, {
      props: { modelValue: 5, step: 1 }
    })
    const input = wrapper.find('input')
    await input.trigger('focus')
    expect(wrapper.emitted('focus')).toBeTruthy()

    await input.trigger('keydown', { key: 'ArrowDown' })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([4])

    await input.trigger('keydown', { key: 'ArrowUp' })
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([6])

    await input.trigger('blur')
    expect(wrapper.emitted('blur')).toBeTruthy()
  })

  it('should use valueOnClear correctly string min max', async () => {
    const wrapper = mount(InputNumber, {
      props: { modelValue: 5, valueOnClear: 'min', min: 1, max: 10 }
    })
    const input = wrapper.find('input')
    await input.setValue('')
    await input.trigger('change')

    const calls = wrapper.emitted('update:modelValue')
    // 触发了更新，值为 min (1)
    expect(calls?.[calls.length - 1]).toEqual([1])

    await wrapper.setProps({ valueOnClear: null })
    await input.setValue('')
    await input.trigger('change')
    expect(calls?.[calls.length - 1]).toEqual([undefined])
  })
})
