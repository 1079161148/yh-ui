/**
 * @vitest-environment node
 */
import { renderToString } from '@vue/server-renderer'
import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import YhTooltip from '../src/tooltip.vue'

describe('YhTooltip SSR', () => {
  it('should render trigger on server and suppress popper by default', async () => {
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

  it('should render content on server when visible is true', async () => {
    const html = await renderToString(
      h(
        YhTooltip,
        {
          content: 'SSR Visible Content',
          visible: true,
          teleported: false
        },
        {
          default: () => h('button', 'Trigger')
        }
      )
    )

    expect(html).toContain('yh-tooltip__popper')
    expect(html).toContain('SSR Visible Content')
  })

  it('should support effect and custom class on server', async () => {
    const html = await renderToString(
      h(
        YhTooltip,
        {
          content: 'theme test',
          effect: 'light',
          popperClass: 'custom-ssr-class',
          visible: true,
          teleported: false
        },
        {
          default: () => h('button', 'Trigger')
        }
      )
    )

    expect(html).toContain('yh-tooltip__popper--light')
    expect(html).toContain('custom-ssr-class')
  })

  it('should support raw HTML content on server', async () => {
    const html = await renderToString(
      h(
        YhTooltip,
        {
          content: '<span class="html-content">HTML</span>',
          rawContent: true,
          visible: true,
          teleported: false
        },
        {
          default: () => h('button', 'Trigger')
        }
      )
    )

    expect(html).toContain('class="html-content"')
    expect(html).toContain('HTML')
  })
})
