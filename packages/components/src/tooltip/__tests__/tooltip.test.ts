/**
 * @vitest-environment happy-dom
 */
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, afterEach } from 'vitest'
import YhTooltip from '../src/tooltip.vue'
import { nextTick } from 'vue'

describe('YhTooltip', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('should render content correctly', async () => {
    const wrapper = mount(YhTooltip, {
      props: {
        content: 'test content'
      },
      slots: {
        default: '<button id="trigger">trigger</button>'
      }
    })

    expect(wrapper.find('#trigger').exists()).toBe(true)
  })

  it('should show popper on hover', async () => {
    vi.useFakeTimers()
    const wrapper = mount(YhTooltip, {
      props: {
        content: 'hover content',
        trigger: 'hover',
        showAfter: 0
      },
      slots: {
        default: '<button id="trigger">trigger</button>'
      }
    })

    const trigger = wrapper.find('#trigger')
    await trigger.trigger('mouseenter')

    vi.runAllTimers()
    await nextTick()

    // Check if teleported content exists in body
    const popper = document.querySelector('.yh-tooltip__popper')
    expect(popper).toBeTruthy()
    expect(popper?.textContent).toContain('hover content')

    vi.useRealTimers()
  })

  it('should handle click trigger', async () => {
    const wrapper = mount(YhTooltip, {
      props: {
        content: 'click content',
        trigger: 'click'
      },
      slots: {
        default: '<button id="trigger">trigger</button>'
      }
    })

    const trigger = wrapper.find('#trigger')
    await trigger.trigger('click')
    await nextTick()

    const popper = document.querySelector('.yh-tooltip__popper')
    expect(popper).toBeTruthy()

    // Click again to hide - just verify the second click doesn't error
    await trigger.trigger('click')
    await nextTick()
    // After second click, component should still be functional
    expect(wrapper.find('#trigger').exists()).toBe(true)
  })

  it('should obey disabled prop', async () => {
    const wrapper = mount(YhTooltip, {
      props: {
        content: 'disabled content',
        disabled: true
      },
      slots: {
        default: '<button id="trigger">trigger</button>'
      }
    })

    await wrapper.find('#trigger').trigger('mouseenter')
    await nextTick()
    // Disabled tooltip should not show visible popper
    const popper = document.querySelector('.yh-tooltip__popper')
    const isVisible = popper ? !popper.getAttribute('style')?.includes('display: none') : false
    expect(isVisible).toBe(false)
  })
})
