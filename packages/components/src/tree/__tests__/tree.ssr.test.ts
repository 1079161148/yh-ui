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

  it('should render with various props in SSR', async () => {
    const html = await renderToString(
      h(YhTree, {
        data: treeData,
        showCheckbox: true,
        accordion: true,
        draggable: true,
        showLine: true
      })
    )
    expect(html).toContain('yh-checkbox')
    expect(html).toContain('yh-tree--show-line')
  })

  it('should handle custom props mapping in SSR', async () => {
    const customData = [{ id: '101', name: 'Custom Node' }]
    const html = await renderToString(
      h(YhTree, {
        data: customData as any,
        nodeKey: 'id',
        props: { label: 'name' }
      })
    )
    expect(html).toContain('Custom Node')
  })
})
