/**
 * @vitest-environment node
 */
import { renderToString } from '@vue/server-renderer'
import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import CategoryNav from '../src/category-nav.vue'

describe('CategoryNav SSR', () => {
  const props = {
    modelValue: '1',
    categories: [
      { id: '1', name: '电子产品', children: [{ id: '1-1', name: '手机' }] },
      { id: '2', name: '服饰', children: [{ id: '2-1', name: '女装' }] }
    ]
  }

  it('renders correctly on server', async () => {
    const html = await renderToString(h(CategoryNav, props))
    expect(html).toContain('yh-category-nav')
    expect(html).toContain('电子产品')
    expect(html).toContain('手机')
    expect(html).toContain('服饰')
    expect(html).toContain('女装')
  })
})
