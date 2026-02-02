import { describe, it, expect } from 'vitest'
import { renderToString } from '@vue/server-renderer'
import { h } from 'vue'
import { YhTree } from '../index'

describe('Tree SSR', () => {
  const treeData = [
    { key: '1', label: 'Node 1' },
    { key: '2', label: 'Node 2' }
  ]

  it('should render correctly on server', async () => {
    const html = await renderToString(h(YhTree, { data: treeData }))
    expect(html).toContain('yh-tree')
    expect(html).toContain('Node 1')
    expect(html).toContain('Node 2')
  })

  it('should handle empty data safely', async () => {
    const html = await renderToString(h(YhTree, { data: [], emptyText: '暂无数据' }))
    expect(html).toContain('yh-tree')
    expect(html).toContain('暂无数据')
  })
})
