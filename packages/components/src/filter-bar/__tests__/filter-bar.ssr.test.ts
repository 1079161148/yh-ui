/**
 * @vitest-environment node
 */
import { renderToString } from '@vue/server-renderer'
import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import FilterBar from '../src/filter-bar.vue'

describe('FilterBar SSR', () => {
  const props = {
    sorts: [{ key: 'price', label: '价格' }],
    filters: [{ key: 'brand', label: '品牌', options: [{ label: 'A', value: 'a' }] }]
  }

  it('renders correctly on server', async () => {
    const html = await renderToString(h(FilterBar, props))
    expect(html).toContain('yh-filter-bar')
    expect(html).toContain('价格')
    expect(html).toContain('品牌')
  })
})
