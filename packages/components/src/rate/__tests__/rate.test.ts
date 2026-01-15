/**
 * Rate Component Unit Tests
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Rate from '../src/rate.vue'

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
      const content = item.find('.yh-rate-star-content')
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
    const fourthContent = items[3].find('.yh-rate-star-content')
    expect(fourthContent.attributes('style')).toContain('width: 50%')
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
})
