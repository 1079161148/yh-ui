import { describe, it, expect } from 'vitest'
import { renderToString } from '@vue/server-renderer'
import { h } from 'vue'
import { YhWaterfall } from '../index'

describe('Waterfall SSR', () => {
  it('should render correctly on server', async () => {
    const items = [
      { id: 1, title: 'Item 1' },
      { id: 2, title: 'Item 2' }
    ]
    const html = await renderToString(
      h(
        YhWaterfall,
        {
          items,
          cols: 2
        },
        {
          default: ({ item }: any) => h('div', item.title)
        }
      )
    )

    expect(html).toContain('yh-waterfall')
    expect(html).toContain('yh-waterfall__column')
    expect(html).toContain('Item 1')
    expect(html).toContain('Item 2')
  })

  it('should handle zero items safely', async () => {
    const html = await renderToString(
      h(YhWaterfall, {
        items: [],
        cols: 3
      })
    )
    expect(html).toContain('yh-waterfall')
    expect(html).toContain('yh-waterfall__empty')
    expect(html).toContain('暂无数据')
  })
})
