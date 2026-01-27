import { describe, it, expect } from 'vitest'
import { renderToString } from '@vue/server-renderer'
import { h } from 'vue'
import { YhDialog } from '../index'

describe('Dialog SSR', () => {
  it('should render correctly on server side', async () => {
    // Note: Teleport content is usually not rendered in the main string in basic renderToString
    // but the component should not throw error during SSR setup
    const app = h(YhDialog, {
      modelValue: true,
      title: 'SSR Title',
      content: 'SSR Content'
    })

    try {
      const html = await renderToString(app)
      // Since it's a teleport, we might see the teleport start/end comments or nothing
      // depending on the SSR implementation, but the main goal is ensuring no crash.
      expect(html).toBeDefined()
    } catch (e) {
      expect(e).toBeUndefined()
    }
  })

  it('should render teleport markers in SSR', async () => {
    const app = h(YhDialog, {
      modelValue: true,
      type: 'success',
      title: 'SSR Title'
    })
    const html = await renderToString(app)
    // In Vue 3 SSR, Teleport components render as comments
    expect(html).toContain('<!--teleport start-->')
    expect(html).toContain('<!--teleport end-->')
  })
})
