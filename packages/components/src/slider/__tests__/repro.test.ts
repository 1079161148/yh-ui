import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import YhSlider from '../src/slider.vue'
import { nextTick } from 'vue'

describe('YhSlider Range Bug Repro', () => {
  it('should initialize firstValue and secondValue correctly in range mode', async () => {
    const wrapper = mount(YhSlider, {
      props: {
        modelValue: [20, 50],
        range: true,
        vertical: true
      }
    })

    // Access internal state (vm)
    const vm = wrapper.vm as any
    expect(vm.firstValue).toBe(20)
    expect(vm.secondValue).toBe(50)

    expect(wrapper.findAll('.yh-slider__button-wrapper').length).toBe(2)

    const bar = wrapper.find('.yh-slider__bar')
    const style = bar.attributes('style')
    expect(style).toContain('height: 30%')
    expect(style).toContain('bottom: 20%')
  })
})
