/**
 * @vitest-environment happy-dom
 */
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import YhProgress from '../src/progress.vue'

describe('YhProgress Premium Features', () => {
  it('should render multiple rings when percentage is an array', () => {
    const percentages = [80, 60, 40]
    const wrapper = mount(YhProgress, {
      props: { type: 'circle', percentage: percentages }
    })
    const paths = wrapper.findAll('.yh-progress__circle-path')
    expect(paths.length).toBe(3)
    // Check if first path reflects first percentage
    expect((paths[0].element as SVGPathElement).style.strokeDasharray).toContain('px')
  })

  it('should render status icons automatically', () => {
    const wrapper = mount(YhProgress, {
      props: { status: 'success' }
    })
    // In our implementation, we use inline SVG for status icons
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('should support custom icons', () => {
    const wrapper = mount(YhProgress, {
      props: { icon: 'my-custom-icon' }
    })
    expect(wrapper.find('.my-custom-icon').exists()).toBe(true)
  })

  it('should generate SVG gradients with unique IDs', () => {
    const wrapper = mount(YhProgress, {
      props: {
        type: 'circle',
        color: { '0%': '#000', '100%': '#fff' }
      }
    })
    expect(wrapper.find('linearGradient').exists()).toBe(true)
    const gradientId = wrapper.find('linearGradient').attributes('id')
    expect(wrapper.find('.yh-progress__circle-path').attributes('stroke')).toBe(
      `url(#${gradientId})`
    )
  })

  it('should apply animated class', () => {
    const wrapper = mount(YhProgress, {
      props: { type: 'circle', animated: true }
    })
    expect(wrapper.classes()).toContain('is-animated')
  })
})
