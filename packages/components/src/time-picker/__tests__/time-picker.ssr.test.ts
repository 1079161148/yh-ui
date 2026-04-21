/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest'
import { renderSSR, expectSSRHasClass } from '../../__tests__/utils/ssr'
import TimePicker from '../src/time-picker.vue'

describe('YhTimePicker SSR', () => {
  it('renders the basic input on server', async () => {
    const html = await renderSSR(TimePicker, {
      placeholder: 'Select time'
    })

    expect(html).toContain('yh-time-picker')
    expect(html).toContain('Select time')
  })

  it('renders size and disabled classes on server', async () => {
    const html = await renderSSR(TimePicker, {
      size: 'large',
      disabled: true
    })

    expectSSRHasClass(html, 'yh-time-picker--large')
    expectSSRHasClass(html, 'is-disabled')
  })

  it('renders range placeholders on server', async () => {
    const html = await renderSSR(TimePicker, {
      isRange: true,
      startPlaceholder: 'Start time',
      endPlaceholder: 'End time'
    })

    expectSSRHasClass(html, 'is-range')
    expect(html).toContain('Start time')
    expect(html).toContain('End time')
  })

  it('renders selected values on server', async () => {
    const html = await renderSSR(TimePicker, {
      modelValue: '14:30:00',
      format: 'HH:mm:ss'
    })

    expect(html).toContain('14:30:00')
  })

  it('does not render the panel markup by default on server', async () => {
    const html = await renderSSR(TimePicker, {
      teleported: false
    })

    expect(html).not.toContain('yh-time-picker__panel')
  })
})
