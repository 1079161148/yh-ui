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

    // Click again to hide
    await trigger.trigger('click')
    // Hide delay is 200ms by default
    // We should mock timers if we want to check disappearance immediately or just check the internal state
    expect((wrapper.vm as any).visible).toBe(false)
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
    expect((wrapper.vm as any).visible).toBe(false)
  })
})
