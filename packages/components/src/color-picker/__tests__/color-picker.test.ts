/**
 * @vitest-environment happy-dom
 */
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { nextTick } from 'vue'
import YhColorPicker from '../src/color-picker.vue'
import SVPanel from '../src/sv-panel.vue'
import HueSlider from '../src/hue-slider.vue'
import AlphaSlider from '../src/alpha-slider.vue'
import { parseColor, hsvToRgb, rgbToHsv } from '../src/utils'

describe('ColorPicker Utils', () => {
  it('should parse hex colors', () => {
    expect(parseColor('#FF0000')).toMatchObject({ h: 0, s: 100, v: 100 })
    expect(parseColor('#00FF00')).toMatchObject({ h: 120, s: 100, v: 100 })
    expect(parseColor('#0000FF')).toMatchObject({ h: 240, s: 100, v: 100 })
  })

  it('should parse rgb colors', () => {
    expect(parseColor('rgb(255, 0, 0)')).toMatchObject({ h: 0, s: 100, v: 100 })
  })

  it('should convert HSV to RGB and back', () => {
    const hsv = { h: 60, s: 50, v: 80 }
    const rgb = hsvToRgb(hsv.h, hsv.s, hsv.v)
    const back = rgbToHsv(rgb.r, rgb.g, rgb.b)
    expect(back).toEqual(hsv)
  })
})

describe('YhColorPicker', () => {
  const globalOptions = {
    stubs: {
      Teleport: true,
      Transition: false
    }
  }

  it('should render correctly', () => {
    const wrapper = mount(YhColorPicker, {
      props: { modelValue: '#ff0000' }
    })
    expect(wrapper.classes()).toContain('yh-color-picker')
    expect(wrapper.find('.yh-color-picker__color').attributes('style')).toContain(
      'background-color: #ff0000'
    )
  })

  it('should open panel', async () => {
    const wrapper = mount(YhColorPicker, {
      props: { modelValue: '#ff0000' },
      global: globalOptions
    })

    await wrapper.trigger('click')
    expect(wrapper.find('.yh-color-picker__panel').exists()).toBe(true)
  })

  it('should work with alpha slider', async () => {
    const wrapper = mount(YhColorPicker, {
      props: {
        modelValue: 'rgba(255, 0, 0, 0.5)',
        showAlpha: true
      },
      global: globalOptions
    })

    await wrapper.trigger('click')
    expect(wrapper.findComponent(AlphaSlider).exists()).toBe(true)
  })

  it('should support predefine colors', async () => {
    const wrapper = mount(YhColorPicker, {
      props: {
        modelValue: '#ff0000',
        predefine: ['#00ff00', '#0000ff']
      },
      global: globalOptions
    })

    await wrapper.trigger('click')
    const items = wrapper.findAll('.yh-color-picker__predefine-item')
    expect(items.length).toBe(2)

    await items[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['#00FF00'])
  })

  it('should handle confirm and clear', async () => {
    const wrapper = mount(YhColorPicker, {
      props: { modelValue: '#ff0000' },
      global: globalOptions
    })

    await wrapper.trigger('click')

    await wrapper.find('.yh-color-picker__btn-confirm').trigger('click')
    expect(wrapper.emitted('change')).toBeTruthy()

    await wrapper.find('.yh-color-picker__btn-clear').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
  })

  it('should support EyeDropper if available', async () => {
    const openSpy = vi.fn().mockResolvedValue({ sRGBHex: '#00ff00' })
    class MockEyeDropper {
      open = openSpy
      abort = vi.fn()
    }
    vi.stubGlobal('EyeDropper', MockEyeDropper)

    const wrapper = mount(YhColorPicker, {
      props: { modelValue: '#ff0000' },
      global: globalOptions
    })

    await wrapper.trigger('click')
    const eyeBtn = wrapper.find('.yh-color-picker__eye-dropper')
    expect(eyeBtn.exists()).toBe(true)

    await eyeBtn.trigger('click')
    await nextTick()
    await nextTick()

    expect(openSpy).toHaveBeenCalled()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['#00FF00'])

    vi.unstubAllGlobals()
  })
})

describe('SVPanel', () => {
  it('should emit update on mousedown and drag', async () => {
    const wrapper = mount(SVPanel, {
      props: { h: 0, s: 50, v: 50 }
    })

    const panel = wrapper.find('.yh-color-sv-panel')
    panel.element.getBoundingClientRect = vi.fn(() => ({
      left: 0,
      top: 0,
      width: 100,
      height: 100,
      bottom: 100,
      right: 100,
      x: 0,
      y: 0,
      toJSON: () => {}
    }))

    const event = new MouseEvent('mousedown', { clientX: 20, clientY: 20, bubbles: true })
    Object.defineProperty(event, 'target', { value: panel.element })
    panel.element.dispatchEvent(event)

    expect(wrapper.emitted('update')?.[0]).toEqual([20, 80])
  })
})

describe('HueSlider', () => {
  it('should emit update on mousedown', async () => {
    const wrapper = mount(HueSlider, {
      props: { h: 180 }
    })

    const slider = wrapper.find('.yh-color-hue-slider')
    slider.element.getBoundingClientRect = vi.fn(() => ({
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

    const event = new MouseEvent('mousedown', { clientX: 50, clientY: 5, bubbles: true })
    slider.element.dispatchEvent(event)

    expect(wrapper.emitted('update')?.[0]).toEqual([180])
  })
})

describe('AlphaSlider', () => {
  it('should emit update on mousedown', async () => {
    const wrapper = mount(AlphaSlider, {
      props: { a: 0.5, color: '#ff0000' }
    })

    const slider = wrapper.find('.yh-color-alpha-slider__bar')
    slider.element.getBoundingClientRect = vi.fn(() => ({
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

    const event = new MouseEvent('mousedown', { clientX: 80, clientY: 5, bubbles: true })
    slider.element.dispatchEvent(event)

    expect(wrapper.emitted('update')?.[0]).toEqual([0.8])
  })
})
