/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest'
import { renderToString } from '@vue/server-renderer'
import { h } from 'vue'
import ColorPicker from '../src/color-picker.vue'

describe('YhColorPicker SSR', () => {
  it('should render to string without crashing', async () => {
    const html = await renderToString(
      h(ColorPicker, {
        modelValue: '#6366f1'
      })
    )

    // Check if the root element contains the base class
    expect(html).toContain('yh-color-picker')
    // Check if the trigger contains the color set via modelValue
    expect(html).toContain('background-color:#6366f1')
  })

  it('should render with different sizes on server', async () => {
    const html = await renderToString(
      h(ColorPicker, {
        size: 'large'
      })
    )
    expect(html).toContain('yh-color-picker--large')
  })

  it('should render disabled state on server', async () => {
    const html = await renderToString(
      h(ColorPicker, {
        disabled: true
      })
    )
    expect(html).toContain('is-disabled')
  })

  it('should not contain teleported content in initial SSR string', async () => {
    // Popper is Teleported to body and usually visible=false by default.
    // Even if visible=true, SSR renderToString usually handled Teleport by emitting it or skipping depending on config.
    // In our case, visible is false, so panel shouldn't be there.
    const html = await renderToString(
      h(ColorPicker, {
        modelValue: '#ff0000'
      })
    )
    expect(html).not.toContain('yh-color-picker__panel')
  })
})
