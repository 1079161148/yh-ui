/**
 * @vitest-environment happy-dom
 */
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import YhTooltip from '../src/tooltip.vue'
import { nextTick } from 'vue'

// Mock Floating UI
vi.mock('@floating-ui/dom', () => ({
  computePosition: vi.fn(() =>
    Promise.resolve({
      x: 0,
      y: 0,
      placement: 'top',
      middlewareData: { arrow: { x: 0, y: 0 } }
    })
  ),
  offset: vi.fn(),
  flip: vi.fn(),
  shift: vi.fn(),
  arrow: vi.fn(),
  autoUpdate: vi.fn(() => vi.fn())
}))

describe('YhTooltip', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    document.body.innerHTML = ''
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should render content correctly via prop and slot', async () => {
    const wrapper = mount(YhTooltip, {
      props: {
        content: 'prop content',
        visible: true,
        showAfter: 0
      },
      slots: {
        default: '<button id="trigger">trigger</button>'
      }
    })

    await nextTick()
    await nextTick()
    const popper = document.querySelector('.yh-tooltip__popper') as HTMLElement
    expect(popper).toBeTruthy()
    expect(popper.textContent).toContain('prop content')
  })

  it('should handle show-after and hide-after delays', async () => {
    const wrapper = mount(YhTooltip, {
      props: {
        content: 'delayed',
        showAfter: 500,
        hideAfter: 500,
        persistent: false
      },
      slots: {
        default: '<button id="trigger">trigger</button>'
      }
    })

    // Trigger mouseenter on the ROOT div since mouseenter doesn't bubble
    await wrapper.find('.yh-tooltip').trigger('mouseenter')

    // Timer is set but not fired
    expect(document.querySelector('.yh-tooltip__popper')).toBeFalsy()

    // Fire timer
    vi.advanceTimersByTime(510)
    await nextTick()
    await nextTick()

    expect(document.querySelector('.yh-tooltip__popper')).toBeTruthy()

    // Mouse leave
    await wrapper.find('.yh-tooltip').trigger('mouseleave')
    expect(document.querySelector('.yh-tooltip__popper')).toBeTruthy()

    // Fire hide timer
    vi.advanceTimersByTime(510)
    await nextTick()
    await nextTick()

    expect(document.querySelector('.yh-tooltip__popper')).toBeFalsy()
  })

  it('should support manual trigger via visible prop', async () => {
    const wrapper = mount(YhTooltip, {
      props: {
        content: 'manual',
        visible: false,
        persistent: false
      },
      slots: {
        default: '<button>trigger</button>'
      }
    })

    expect(document.querySelector('.yh-tooltip__popper')).toBeFalsy()

    await wrapper.setProps({ visible: true })
    await nextTick()
    await nextTick()
    expect(document.querySelector('.yh-tooltip__popper')).toBeTruthy()
  })

  it('should support follow-cursor mode', async () => {
    const floating = await import('@floating-ui/dom')

    const wrapper = mount(YhTooltip, {
      props: {
        content: 'following',
        followCursor: true,
        showAfter: 0,
        visible: true
      },
      slots: {
        default: '<button id="trigger">trigger</button>'
      }
    })

    await nextTick()
    await nextTick()

    window.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: 100 }))

    expect(floating.computePosition).toHaveBeenCalled()
  })

  it('should not show when disabled', async () => {
    const wrapper = mount(YhTooltip, {
      props: {
        content: 'disabled',
        disabled: true,
        persistent: false
      },
      slots: {
        default: '<button id="trigger">trigger</button>'
      }
    })

    await wrapper.find('.yh-tooltip').trigger('mouseenter')
    await nextTick()
    expect(document.querySelector('.yh-tooltip__popper')).toBeFalsy()
  })
})
