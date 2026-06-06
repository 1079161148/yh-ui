/**
 * @vitest-environment node
 */
import { renderToString } from '@vue/server-renderer'
import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import YhPopover from '../src/popover.vue'

describe('YhPopover SSR', () => {
  it('should render trigger on server and suppress popper by default', async () => {
    const html = await renderToString(
      h(
        YhPopover,
        {
          title: 'ssr title',
          content: 'ssr content'
        },
        {
          default: () => h('button', 'Trigger')
        }
      )
    )

    expect(html).toContain('yh-popover')
    expect(html).toContain('Trigger')
    // Popper should not be rendered in the initial HTML if not visible
    expect(html).not.toContain('yh-popover__popper')
  })

  it('should render content on server when visible is true', async () => {
    const html = await renderToString(
      h(
        YhPopover,
        {
          title: 'SSR Visible Title',
          content: 'SSR Visible Content',
          visible: true,
          teleported: false // Disable teleport for SSR verification
        },
        {
          default: () => h('button', 'Trigger')
        }
      )
    )

    expect(html).toContain('yh-popover__popper')
    expect(html).toContain('SSR Visible Title')
    expect(html).toContain('SSR Visible Content')
  })

  it('should handle icon and description style on server', async () => {
    const html = await renderToString(
      h(
        YhPopover,
        {
          title: 'Icon Popover',
          description: 'Description Text',
          icon: 'info',
          visible: true,
          teleported: false
        },
        {
          default: () => h('button', 'Trigger')
        }
      )
    )

    expect(html).toContain('is-has-icon')
    expect(html).toContain('yh-popover__icon')
    expect(html).toContain('Description Text')
  })
})
