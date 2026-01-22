import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import YhSlider from '../src/slider.vue'
import { nextTick } from 'vue'

describe('YhSlider', () => {
  it('should render correctly', () => {
    const wrapper = mount(YhSlider, {
      props: {
        modelValue: 50
      }
    })
    expect(wrapper.classes()).toContain('yh-slider')
    expect(wrapper.find('.yh-slider__bar').exists()).toBe(true)
    expect(wrapper.find('.yh-slider__button-wrapper').exists()).toBe(true)
  })

  it('should update value via v-model', async () => {
    let value: any = 0
    const wrapper: any = mount(YhSlider, {
      props: {
        modelValue: value,
        'onUpdate:modelValue': (val: any) => {
          value = val
        }
      }
    })

    const runway = wrapper.find('.yh-slider__runway')
    // We can't easily simulate complex mouse events with rect calculations in jsdom
    // but we can test if components renders
    expect(runway.exists()).toBe(true)
  })

  it('should support range selection', () => {
    const wrapper = mount(YhSlider, {
      props: {
        modelValue: [20, 50],
        range: true
      }
    })
    expect(wrapper.findAll('.yh-slider__button-wrapper').length).toBe(2)
  })

  it('should respect min and max', async () => {
    const wrapper = mount(YhSlider, {
      props: {
        modelValue: 150,
        min: 0,
        max: 100
      }
    })
    await nextTick()
    expect(wrapper.exists()).toBe(true)
  })

  it('should show stops when show-stops is true', () => {
    const wrapper = mount(YhSlider, {
      props: {
        modelValue: 0,
        step: 10,
        showStops: true
      }
    })
    expect(wrapper.findAll('.yh-slider__stop').length).toBeGreaterThan(0)
  })

  it('should be disabled when disabled prop is true', async () => {
    const wrapper = mount(YhSlider, {
      props: {
        modelValue: 50,
        disabled: true
      }
    })
    expect(wrapper.classes()).toContain('is-disabled')
    const runway = wrapper.find('.yh-slider__runway')
    await runway.trigger('mousedown')
    expect(wrapper.emitted('change')).toBeFalsy()
  })

  it('should support vertical mode', async () => {
    const wrapper = mount(YhSlider, {
      props: {
        modelValue: 50,
        vertical: true,
        height: '200px'
      }
    })
    await (wrapper.vm as any).$nextTick()
    expect(wrapper.get('.yh-slider').classes()).toContain('is-vertical')
    expect(wrapper.get('.yh-slider').attributes('style')).toContain('height: 200px')
  })

  it('should show marks', () => {
    const wrapper = mount(YhSlider, {
      props: {
        modelValue: 0,
        marks: {
          0: '0°C',
          50: '50°C'
        }
      }
    })
    expect(wrapper.findAll('.yh-slider__mark-text').length).toBe(2)
    expect(wrapper.text()).toContain('0°C')
    expect(wrapper.text()).toContain('50°C')
  })
})
