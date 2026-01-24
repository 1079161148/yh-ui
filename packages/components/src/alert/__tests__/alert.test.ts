/**
 * @vitest-environment happy-dom
 */
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import YhAlert from '../src/alert.vue'

describe('YhAlert', () => {
  it('should render correctly with title', async () => {
    const wrapper = mount(YhAlert, {
      props: {
        title: 'Test Title'
      }
    })
    // 检查是否存在 alert 节点
    const alert = wrapper.find('.yh-alert')
    expect(alert.exists()).toBe(true)
    expect(alert.find('.yh-alert__title').text()).toBe('Test Title')
  })

  it('should show correct type and effect class', () => {
    const wrapper = mount(YhAlert, {
      props: {
        type: 'success',
        effect: 'dark'
      }
    })
    const alert = wrapper.find('.yh-alert')
    expect(alert.classes()).toContain('yh-alert--success')
    expect(alert.classes()).toContain('yh-alert--dark')
  })

  it('should emit close event when clicked', async () => {
    const wrapper = mount(YhAlert, {
      props: { closable: true }
    })
    const closeBtn = wrapper.find('.yh-alert__close')
    expect(closeBtn.exists()).toBe(true)
    await closeBtn.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('close')
  })

  it('should handle auto-close duration', async () => {
    vi.useFakeTimers()
    const wrapper = mount(YhAlert, {
      props: { duration: 1000 }
    })

    expect(wrapper.find('.yh-alert').exists()).toBe(true)

    vi.advanceTimersByTime(1100)
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.yh-alert').exists()).toBe(false)

    vi.useRealTimers()
  })
})
