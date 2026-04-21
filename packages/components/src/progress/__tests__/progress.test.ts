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

  it('should map array colors to circle rings instead of gradient mode', () => {
    const wrapper = mount(YhProgress, {
      props: {
        type: 'circle',
        percentage: [20, 40],
        color: ['#111111', '#222222']
      }
    })

    expect(wrapper.find('defs').exists()).toBe(false)
    const paths = wrapper.findAll('.yh-progress__circle-path')
    expect(paths[0].attributes('stroke')).toBe('#111111')
    expect(paths[1].attributes('stroke')).toBe('#222222')
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

  it('should render warning and info status icons', () => {
    const warning = mount(YhProgress, { props: { percentage: 50, status: 'warning' } })
    const info = mount(YhProgress, { props: { percentage: 50, status: 'info' } })

    expect(warning.find('svg').exists()).toBe(true)
    expect(info.find('svg').exists()).toBe(true)
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

  it('should hide text for indeterminate mode and omit width style', () => {
    const wrapper = mount(YhProgress, {
      props: { percentage: 50, indeterminate: true }
    })

    expect(wrapper.classes()).toContain('is-without-text')
    expect(wrapper.find('.yh-progress__text').exists()).toBe(false)
    expect((wrapper.find('.yh-progress__inner').element as HTMLElement).style.width).toBe('')
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

  it('should support custom icon, function colors and default slot rendering', () => {
    const wrapper = mount(YhProgress, {
      props: {
        percentage: 66,
        icon: 'custom-icon',
        color: (percentage: number) => (percentage > 50 ? 'purple' : 'gray')
      },
      slots: {
        default: ({ percentage }: { percentage: number }) => `slot:${percentage}`
      }
    })

    expect(wrapper.find('.yh-progress__text').text()).toBe('slot:66')

    const iconWrapper = mount(YhProgress, {
      props: {
        percentage: 66,
        icon: 'custom-icon',
        color: (percentage: number) => (percentage > 50 ? 'purple' : 'gray')
      }
    })

    const icon = iconWrapper.find('.custom-icon')
    expect(icon.exists()).toBe(true)
    expect((icon.element as HTMLElement).style.color).toBe('purple')
  })

  it('should support dashboard track rendering and empty string colors', () => {
    const wrapper = mount(YhProgress, {
      props: {
        type: 'dashboard',
        percentage: 0,
        color: '',
        defineBackgroundColor: '#abcabc'
      }
    })

    expect(wrapper.classes()).toContain('yh-progress--dashboard')
    expect(wrapper.find('.yh-progress__circle-track').attributes('stroke')).toBe('#abcabc')
    expect(wrapper.find('.yh-progress__circle-path').attributes('stroke')).toBe('')
    expect(wrapper.find('.yh-progress__circle-path').attributes('stroke-width')).toBe('0')
  })
  it('should apply theme overrides as inline css vars', () => {
    const wrapper = mount(YhProgress, {
      props: {
        percentage: 50,
        themeOverrides: {
          'bar-bg': '#123456'
        }
      }
    })

    expect(wrapper.attributes('style')).toContain('--yh-progress-bar-bg: #123456')
  })
})
