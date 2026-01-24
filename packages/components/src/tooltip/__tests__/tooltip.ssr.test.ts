/**
 * @vitest-environment node
 */
import { renderToString } from '@vue/server-renderer'
import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import YhTooltip from '../src/tooltip.vue'

describe('YhTooltip SSR', () => {
  it('should render trigger on server and suppress popper', async () => {
    const html = await renderToString(
      h(
        YhTooltip,
        {
          content: 'ssr content'
        },
        {
          default: () => h('button', 'Trigger')
        }
      )
    )

    expect(html).toContain('yh-tooltip')
    expect(html).toContain('Trigger')
    // Popper should not be rendered in the initial HTML if not visible
    expect(html).not.toContain('yh-tooltip__popper')
  })

  it('should handle light effect on server', async () => {
    const html = await renderToString(
      h(
        YhTooltip,
        {
          content: 'light content',
          effect: 'light',
          visible: true,
          teleported: false // Disable teleport so it stays in HTML for verification
        },
        {
          default: () => h('button', 'Trigger')
        }
      )
    )

    expect(html).toContain('yh-tooltip__popper--light')
    expect(html).toContain('light content')
  })
})
