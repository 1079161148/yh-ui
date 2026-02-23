/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import YhSlider from '../src/slider.vue'
import SliderButton from '../src/slider-button.vue'
import { nextTick } from 'vue'

describe('YhSlider', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    vi.useFakeTimers()

    // Global mock for offsets to avoid NaN or 0 results in logic
    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(100)
    vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(100)
  })

  it('should render correctly', () => {
    const wrapper = mount(YhSlider, {
      props: { modelValue: 50 }
    })
    expect(wrapper.classes()).toContain('yh-slider')
  })

  it('should update value via click on runway', async () => {
    const wrapper = mount(YhSlider, {
      props: { modelValue: 0 }
    })
    const runway = wrapper.find('.yh-slider__runway')
    runway.element.getBoundingClientRect = vi.fn(() => ({
      left: 0,
      top: 0,
      width: 100,
      height: 10,
      bottom: 10,
      right: 100,
      x: 0,
      y: 0,
      toJSON: () => {}
    }))

    await runway.trigger('mousedown', { clientX: 30 })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([30])
  })

  it('should handle dragging', async () => {
    const wrapper = mount(YhSlider, {
      props: { modelValue: 0 }
    })

    // Ensure sliderRef is set
    const runway = wrapper.find('.yh-slider__runway')
    ;(wrapper.vm as any).sliderRef = runway.element

    const button = wrapper.findComponent(SliderButton)
    const buttonEl = button.find('.yh-slider__button-wrapper')

    // We trigger the internal event handlers to be sure coordination works
    const buttonVm = button.vm as any

    const downEvent = new MouseEvent('mousedown')
    Object.defineProperty(downEvent, 'clientX', { value: 0 })
    buttonVm.onDragStart(downEvent)

    const moveEvent = new MouseEvent('mousemove')
    Object.defineProperty(moveEvent, 'clientX', { value: 40 })
    buttonVm.onDragging(moveEvent)

    await nextTick()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([40])

    buttonVm.onDragEnd()
    vi.runAllTimers()
    await nextTick()
    expect(wrapper.emitted('change')).toBeTruthy()
  })

  it('should support vertical dragging', async () => {
    const wrapper = mount(YhSlider, {
      props: { modelValue: 0, vertical: true }
    })
    const runway = wrapper.find('.yh-slider__runway')
    ;(wrapper.vm as any).sliderRef = runway.element

    const button = wrapper.findComponent(SliderButton)
    const buttonVm = button.vm as any

    const downEvent = new MouseEvent('mousedown')
    Object.defineProperty(downEvent, 'clientY', { value: 100 })
    const moveEvent = new MouseEvent('mousemove')
    Object.defineProperty(moveEvent, 'clientY', { value: 60 })

    buttonVm.onDragStart(downEvent)
    buttonVm.onDragging(moveEvent)

    await nextTick()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([40])
  })

  it('should support range selection', async () => {
    const wrapper = mount(YhSlider, {
      props: { modelValue: [20, 80], range: true }
    })
    const runway = wrapper.find('.yh-slider__runway')
    runway.element.getBoundingClientRect = vi.fn(() => ({
      left: 0,
      top: 0,
      width: 100,
      height: 10,
      bottom: 10,
      right: 100,
      x: 0,
      y: 0,
      toJSON: () => {}
    }))

    await runway.trigger('mousedown', { clientX: 25 })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([[25, 80]])

    await runway.trigger('mousedown', { clientX: 75 })
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([[25, 75]])
  })

  it('should show marks and stops', () => {
    const wrapper = mount(YhSlider, {
      props: {
        modelValue: 0,
        showStops: true,
        marks: { 0: 'A', 50: 'B' }
      }
    })
    expect(wrapper.findAll('.yh-slider__stop').length).toBeGreaterThan(0)
    expect(wrapper.find('.yh-slider__mark-text').text()).toBe('A')
  })

  it('should handle InputNumber validation', async () => {
    const wrapper = mount(YhSlider, {
      props: { modelValue: 0, showInput: true }
    })
    const input = wrapper.findComponent({ name: 'YhInputNumber' })
    await input.vm.$emit('change', 150) // and clamp logic should be handled by input or slider watch
    // The Slider watch handles modelValue changes
    await nextTick()
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  })
})
