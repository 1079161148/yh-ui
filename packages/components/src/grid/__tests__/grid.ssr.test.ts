import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import Grid from '../src/grid.vue'
import GridItem from '../src/grid-item.vue'
import { renderSSR, expectSSRHasClass, testHydration } from '../../__tests__/utils/ssr'

describe('YhGrid SSR', () => {
  it('should render grid in SSR', async () => {
    const html = await renderSSR(
      Grid,
      { cols: 3, gap: 16 },
      {
        default: () => [
          h(GridItem, null, { default: () => 'A' }),
          h(GridItem, null, { default: () => 'B' }),
          h(GridItem, null, { default: () => 'C' })
        ]
      }
    )
    expectSSRHasClass(html, 'yh-grid')
    expect(html).toContain('repeat(3, 1fr)')
    expect(html).toMatch(/gap:\s*16px/)
    expect(html).toContain('A')
    expect(html).toContain('B')
  })

  it('should render grid item with span in SSR', async () => {
    const html = await renderSSR(
      Grid,
      { cols: 4 },
      {
        default: () => h(GridItem, { span: 2 }, { default: () => 'Wide' })
      }
    )
    expect(html).toContain('grid-column')
    expect(html).toContain('span 2')
  })

  it('should hydrate without mismatch', async () => {
    const result = await testHydration(
      Grid,
      { cols: 3, gap: 12 },
      {
        default: () => [
          h(GridItem, { key: 1 }, { default: () => '1' }),
          h(GridItem, { key: 2 }, { default: () => '2' }),
          h(GridItem, { key: 3 }, { default: () => '3' })
        ]
      }
    )
    expect(result.isMatch).toBe(true)
  })

  it('should hydrate with span without mismatch', async () => {
    const result = await testHydration(
      Grid,
      { cols: 6 },
      {
        default: () => [
          h(GridItem, { span: 3, key: 1 }, { default: () => 'A' }),
          h(GridItem, { span: 3, key: 2 }, { default: () => 'B' })
        ]
      }
    )
    expect(result.isMatch).toBe(true)
  })
})
