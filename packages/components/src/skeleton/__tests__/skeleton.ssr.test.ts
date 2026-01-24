/**
 * @vitest-environment node
 */
import { renderToString } from '@vue/server-renderer'
import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import YhSkeleton from '../src/skeleton.vue'
import YhSkeletonItem from '../src/skeleton-item.vue'

describe('YhSkeleton SSR', () => {
  it('should render basic structure on server', async () => {
    const html = await renderToString(
      h(YhSkeleton, {
        loading: true,
        rows: 3,
        animated: true
      })
    )

    expect(html).toContain('yh-skeleton')
    expect(html).toContain('is-animated')
    // Correct selector for items
    expect(html).toContain('yh-skeleton-item')
  })

  it('should render complex structure on server', async () => {
    const html = await renderToString(
      h(YhSkeleton, {
        loading: true,
        avatar: true,
        title: true,
        rows: 2
      })
    )

    // Check for the circle variant which is used for the avatar
    expect(html).toContain('yh-skeleton-item--circle')
    // Check for the h3 variant which is used for the title
    expect(html).toContain('yh-skeleton-item--h3')

    // Verify row count rendering
    const items = html.match(/yh-skeleton-item--text/g) || []
    expect(items.length).toBe(2)
  })

  it('should render content when loading is false', async () => {
    const html = await renderToString(
      h(
        YhSkeleton,
        { loading: false },
        {
          default: () => h('div', { id: 'real-content' }, 'Real Data')
        }
      )
    )

    expect(html).not.toContain('yh-skeleton-item')
    expect(html).toContain('id="real-content"')
    expect(html).toContain('Real Data')
  })

  it('should render template slot correctly on server', async () => {
    const html = await renderToString(
      h(
        YhSkeleton,
        { loading: true },
        {
          template: () => h(YhSkeletonItem, { variant: 'image', style: { width: '100px' } })
        }
      )
    )

    expect(html).toContain('yh-skeleton-item')
    expect(html).toContain('yh-skeleton-item--image')
    expect(html).toContain('width:100px')
  })
})

describe('YhSkeletonItem SSR', () => {
  it('should render different variants on server', async () => {
    const variants = ['circle', 'rect', 'button', 'image'] as const
    for (const variant of variants) {
      const html = await renderToString(h(YhSkeletonItem, { variant }))
      expect(html).toContain(`yh-skeleton-item--${variant}`)
    }
  })

  it('should support styles and rounds on server', async () => {
    const html = await renderToString(
      h(YhSkeletonItem, {
        variant: 'rect',
        width: 100,
        height: 50,
        round: true
      })
    )

    expect(html).toContain('width:100px')
    expect(html).toContain('height:50px')
    expect(html).toContain('is-round')
  })
})
