/**
 * Rate Component Unit Tests
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import Rate from '../src/rate.vue'
import { YhConfigProvider } from '../../config-provider'
import { en } from '@yh-ui/locale'

describe('YhRate', () => {
  it('should render correctly', () => {
    const wrapper = mount(Rate, {
      props: {
        max: 5,
        modelValue: 3
      }
    })
    expect(wrapper.get('.yh-rate').classes()).toContain('yh-rate')
    const items = wrapper.findAll('.yh-rate__item')
    expect(items.length).toBe(5)

    // Check active items by counting contents with style width: 100%
    const activeItems = items.filter((item) => {
      const content = item.find('.yh-rate__star-content')
      return content.attributes('style')?.includes('width: 100%')
    })
    expect(activeItems.length).toBe(3)
  })

  it('should change value on click', async () => {
    const wrapper = mount(Rate, {
      props: {
        max: 5,
        modelValue: 0
      }
    })
    const items = wrapper.findAll('.yh-rate__item')
    await items[3].trigger('click') // Click 4th star
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([4])
  })

  it('should handle allowHalf correctly', async () => {
    const wrapper = mount(Rate, {
      props: {
        max: 5,
        modelValue: 3.5,
        allowHalf: true
      }
    })
    const items = wrapper.findAll('.yh-rate__item')
    // 4th item should have 50% width
    const fourthContent = items[3].find('.yh-rate__star-content')
    expect(fourthContent.attributes('style')).toContain('width: 50%')
  })

  it('should update hover value on mousemove (allowHalf=false) and restore on mouseleave', async () => {
    const wrapper = mount(Rate, {
      props: {
        max: 5,
        modelValue: 2
      }
    })

    const items = wrapper.findAll<HTMLElement>('.yh-rate__item')
    await items[4].trigger('mousemove')
    expect(items[4].find('.yh-rate__star-content').attributes('style')).toContain('width: 100%')

    await wrapper.get('.yh-rate').trigger('mouseleave')
    expect(items[4].find('.yh-rate__star-content').attributes('style')).toContain('width: 0%')
  })

  it('should update hover value on mousemove (allowHalf=true) for both halves', async () => {
    const wrapper = mount(Rate, {
      props: {
        max: 5,
        modelValue: 0,
        allowHalf: true
      }
    })

    const items = wrapper.findAll<HTMLElement>('.yh-rate__item')
    const target = items[2].element
    // Happy-DOM bounding rect is 0 by default; stub to cover the left/right-half branches.
    target.getBoundingClientRect = () => ({ left: 0, width: 10 } as any)

    await items[2].trigger('mousemove', { clientX: 1 })
    expect(items[2].find('.yh-rate__star-content').attributes('style')).toContain('width: 50%')

    await items[2].trigger('mousemove', { clientX: 9 })
    expect(items[2].find('.yh-rate__star-content').attributes('style')).toContain('width: 100%')
  })

  it('should show text/score correctly', () => {
    const wrapper = mount(Rate, {
      props: {
        modelValue: 4,
        showText: true,
        texts: ['1', '2', '3', '4', '5']
      }
    })
    expect(wrapper.find('.yh-rate__text').text()).toBe('4')

    const wrapperScore = mount(Rate, {
      props: {
        modelValue: 3.5,
        showScore: true,
        scoreTemplate: '{value} points'
      }
    })
    expect(wrapperScore.find('.yh-rate__text').text()).toBe('3.5 points')
  })

  it('should resolve activeColor from colors array and fallback for record object', async () => {
    const wrapper = mount(Rate, {
      props: {
        modelValue: 1,
        colors: ['#111111', '#222222', '#333333']
      }
    })
    // activeColor is applied to star-content via inline style
    expect(wrapper.find('.yh-rate__star-content').attributes('style')).toContain('color:')

    const wrapperObj = mount(Rate, {
      props: {
        modelValue: 1,
        colors: { 2: '#ff0000' } as any
      }
    })
    // record branch falls back to default '#F7BA2A' (not to throw)
    expect(wrapperObj.get('.yh-rate').exists()).toBe(true)
  })

  it('should respect disabled prop', async () => {
    const wrapper = mount(Rate, {
      props: {
        disabled: true,
        modelValue: 3
      }
    })
    expect(wrapper.get('.yh-rate').classes()).toContain('is-disabled')
    const items = wrapper.findAll('.yh-rate__item')
    await items[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeFalsy()
  })

  it('should handle clearable correctly', async () => {
    const wrapper = mount(Rate, {
      props: {
        modelValue: 3,
        clearable: true
      }
    })
    const items = wrapper.findAll('.yh-rate__item')
    // Click the active star to clear (3rd star, index 2)
    await items[2].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([0])
  })

  it('should apply component theme overrides', () => {
    const wrapper = mount(Rate, {
      props: {
        themeOverrides: {
          fillColor: '#ff0000',
          voidColor: '#cccccc',
          textColor: '#123456'
        }
      }
    })

    expect(wrapper.attributes('style')).toContain('--yh-rate-fill-color: #ff0000')
    expect(wrapper.attributes('style')).toContain('--yh-rate-void-color: #cccccc')
    expect(wrapper.attributes('style')).toContain('--yh-rate-text-color: #123456')
  })

  it('should read localized fallback texts from config provider', () => {
    const Demo = defineComponent({
      components: {
        YhConfigProvider,
        Rate
      },
      setup() {
        return { en }
      },
      template: `
        <yh-config-provider :locale="en" :global="false">
          <rate :model-value="4" show-text />
        </yh-config-provider>
      `
    })

    const wrapper = mount(Demo)
    expect(wrapper.find('.yh-rate__text').text()).toBe('Satisfied')
  })
})
