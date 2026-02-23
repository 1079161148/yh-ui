/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { YhProgress } from '../index'

describe('Progress', () => {
  it('should render correctly', () => {
    const wrapper = mount(YhProgress, {
      props: { percentage: 50 }
    })
    expect(wrapper.classes()).toContain('yh-progress')
    expect((wrapper.find('.yh-progress__inner').element as HTMLElement).style.width).toBe('50%')
  })

  it('should support different types', () => {
    const line = mount(YhProgress, { props: { type: 'line', percentage: 50 } })
    expect(line.find('.yh-progress__bar').exists()).toBe(true)

    const circle = mount(YhProgress, { props: { type: 'circle', percentage: 50 } })
    expect(circle.find('.yh-progress__circle').exists()).toBe(true)

    const dashboard = mount(YhProgress, { props: { type: 'dashboard', percentage: 50 } })
    expect(dashboard.classes()).toContain('yh-progress--dashboard')
  })

  it('should support linear gradients', () => {
    const wrapper = mount(YhProgress, {
      props: {
        percentage: 50,
        color: { '0%': '#f56c6c', '100%': '#67c23a' }
      }
    })
    const inner = wrapper.find('.yh-progress__inner')
    expect((inner.element as HTMLElement).style.backgroundImage).toContain('linear-gradient')
  })

  it('should support multi-ring progress', () => {
    const wrapper = mount(YhProgress, {
      props: {
        type: 'circle',
        percentage: [30, 60, 90],
        color: ['red', 'green', 'blue']
      }
    })
    // 3 pairs of paths (track + path)
    expect(wrapper.findAll('.yh-progress__circle-path').length).toBe(3)
    expect(wrapper.findAll('.yh-progress__circle-path')[0].attributes('stroke')).toBe('red')
  })

  it('should show status icons', () => {
    const success = mount(YhProgress, { props: { percentage: 100, status: 'success' } })
    expect(success.find('svg').exists()).toBe(true)
    expect(success.classes()).toContain('is-success')

    const exception = mount(YhProgress, { props: { percentage: 50, status: 'exception' } })
    expect(exception.classes()).toContain('is-exception')
  })

  it('should support secondary percentage', () => {
    const wrapper = mount(YhProgress, {
      props: { percentage: 50, secondaryPercentage: 80 }
    })
    const secondary = wrapper.find('.yh-progress__secondary-inner')
    expect((secondary.element as HTMLElement).style.width).toBe('80%')
  })

  it('should support steps', () => {
    const wrapper = mount(YhProgress, {
      props: { percentage: 50, steps: 5 }
    })
    expect(wrapper.findAll('.yh-progress__step-item').length).toBe(5)
  })

  it('should respect text-inside', () => {
    const wrapper = mount(YhProgress, {
      props: { percentage: 50, textInside: true, strokeWidth: 20 }
    })
    expect(wrapper.classes()).toContain('is-text-inside')
    expect(wrapper.find('.yh-progress__innerText').exists()).toBe(true)
  })

  it('should handle custom format', () => {
    const wrapper = mount(YhProgress, {
      props: {
        percentage: 50,
        format: (p: number) => `Value is ${p}`
      }
    })
    expect(wrapper.find('.yh-progress__text').text()).toBe('Value is 50')
  })
})
