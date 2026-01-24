/**
 * @vitest-environment node
 */
import { renderToString } from '@vue/server-renderer'
import { describe, it, expect } from 'vitest'
import { defineComponent, h } from 'vue'
import YhProgress from '../src/progress.vue'

describe('YhProgress SSR', () => {
  it('should render correctly on server', async () => {
    const html = await renderToString(
      h(YhProgress, {
        percentage: 50,
        type: 'circle',
        color: { '0%': '#f00', '100%': '#00f' }
      })
    )

    expect(html).toContain('yh-progress')
    expect(html).toContain('svg')
    expect(html).toContain('linearGradient')
    // Ensure unique ID exists in SSR
    expect(html).toContain('id="')
  })

  it('should render multiple rings on server', async () => {
    const html = await renderToString(
      h(YhProgress, {
        percentage: [10, 20, 30],
        type: 'circle'
      })
    )
    // Should contain 3 progress paths
    const pathCount = (html.match(/yh-progress__circle-path/g) || []).length
    expect(pathCount).toBe(3)
  })
})
