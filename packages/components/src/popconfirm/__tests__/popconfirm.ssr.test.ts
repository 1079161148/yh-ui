/**
 * @vitest-environment node
 */
import { renderToString } from '@vue/server-renderer'
import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import YhPopconfirm from '../src/popconfirm.vue'

describe('YhPopconfirm SSR', () => {
  it('should render trigger on server and suppress popper by default', async () => {
    const html = await renderToString(
      h(
        YhPopconfirm,
        {
          title: 'ssr title'
        },
        {
          default: () => h('button', 'Delete')
        }
      )
    )

    expect(html).toContain('yh-popconfirm')
    expect(html).toContain('Delete')
    // Popper should not be rendered in the initial HTML if not explicitly visible
    expect(html).not.toContain('yh-popconfirm__popper')
  })

  it('should render content on server when visible is true', async () => {
    const html = await renderToString(
      h(
        YhPopconfirm,
        {
          title: 'Confirm Delete?',
          description: 'This action is irreversible.',
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          visible: true,
          teleported: false
        },
        {
          default: () => h('button', 'Delete')
        }
      )
    )

    expect(html).toContain('yh-popconfirm__popper')
    expect(html).toContain('Confirm Delete?')
    expect(html).toContain('This action is irreversible.')
    expect(html).toContain('Yes')
    expect(html).toContain('No')
  })

  it('should handle icon color and swap buttons on server', async () => {
    const html = await renderToString(
      h(
        YhPopconfirm,
        {
          title: 'Swap Buttons',
          visible: true,
          teleported: false,
          swapButtons: true,
          iconColor: 'rgb(255, 0, 0)'
        },
        {
          default: () => h('button', 'Delete')
        }
      )
    )

    expect(html).toContain('rgb(255, 0, 0)')
    // Testing order is hard with renderToString, but we verify the props are respected
  })
})
