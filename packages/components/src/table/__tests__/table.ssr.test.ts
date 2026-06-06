/**
 * Table SSR Tests
 * @description 表格组件 SSR 测试
 */

import { describe, it, expect } from 'vitest'
import { renderToString } from 'vue/server-renderer'
import { createSSRApp, h } from 'vue'
import { YhTable } from '../index'

// 测试数据
const mockData = [
  { id: 1, name: '张三', age: 28, address: '北京市朝阳区' },
  { id: 2, name: '李四', age: 32, address: '上海市浦东新区' },
  { id: 3, name: '王五', age: 25, address: '广州市天河区' }
]

const mockColumns = [
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'address', label: '地址' }
]

describe('Table SSR', () => {
  it('should render on server side', async () => {
    const app = createSSRApp({
      render() {
        return h(YhTable, {
          data: mockData,
          columns: mockColumns
        })
      }
    })

    const html = await renderToString(app)

    expect(html).toContain('yh-table')
    expect(html).toContain('yh-table__header')
    expect(html).toContain('yh-table__body')
  })

  it('should render with border', async () => {
    const app = createSSRApp({
      render() {
        return h(YhTable, {
          data: mockData,
          columns: mockColumns,
          border: true
        })
      }
    })

    const html = await renderToString(app)

    expect(html).toContain('is-border')
  })

  it('should render with stripe', async () => {
    const app = createSSRApp({
      render() {
        return h(YhTable, {
          data: mockData,
          columns: mockColumns,
          stripe: true
        })
      }
    })

    const html = await renderToString(app)

    expect(html).toContain('is-stripe')
  })

  it('should render data rows', async () => {
    const app = createSSRApp({
      render() {
        return h(YhTable, {
          data: mockData,
          columns: mockColumns
        })
      }
    })

    const html = await renderToString(app)

    expect(html).toContain('张三')
    expect(html).toContain('李四')
    expect(html).toContain('王五')
  })

  it('should render column headers', async () => {
    const app = createSSRApp({
      render() {
        return h(YhTable, {
          data: mockData,
          columns: mockColumns
        })
      }
    })

    const html = await renderToString(app)

    expect(html).toContain('姓名')
    expect(html).toContain('年龄')
    expect(html).toContain('地址')
  })

  it('should render empty state', async () => {
    const app = createSSRApp({
      render() {
        return h(YhTable, {
          data: [],
          columns: mockColumns,
          emptyText: '暂无数据'
        })
      }
    })

    const html = await renderToString(app)

    expect(html).toContain('yh-table__empty')
    expect(html).toContain('暂无数据')
  })

  it('should render with size', async () => {
    const app = createSSRApp({
      render() {
        return h(YhTable, {
          data: mockData,
          columns: mockColumns,
          size: 'small'
        })
      }
    })

    const html = await renderToString(app)

    expect(html).toContain('yh-table--small')
  })

  it('should render selection column', async () => {
    const app = createSSRApp({
      render() {
        return h(YhTable, {
          data: mockData,
          columns: mockColumns,
          selectionConfig: {
            type: 'checkbox'
          }
        })
      }
    })

    const html = await renderToString(app)

    expect(html).toContain('yh-table__selection-cell')
    expect(html).toContain('type="checkbox"')
  })

  it('should render index column', async () => {
    const app = createSSRApp({
      render() {
        return h(YhTable, {
          data: mockData,
          columns: mockColumns,
          showIndex: true
        })
      }
    })

    const html = await renderToString(app)

    expect(html).toContain('yh-table__index-cell')
  })

  it('should hide header when showHeader is false', async () => {
    const app = createSSRApp({
      render() {
        return h(YhTable, {
          data: mockData,
          columns: mockColumns,
          showHeader: false
        })
      }
    })

    const html = await renderToString(app)

    expect(html).not.toContain('yh-table__header-wrapper')
  })

  it('should render loading state', async () => {
    const app = createSSRApp({
      render() {
        return h(YhTable, {
          data: mockData,
          columns: mockColumns,
          loading: true
        })
      }
    })

    const html = await renderToString(app)

    expect(html).toContain('yh-table__loading')
  })

  it('should render with fixed height style', async () => {
    const app = createSSRApp({
      render() {
        return h(YhTable, {
          data: mockData,
          columns: mockColumns,
          height: 300
        })
      }
    })

    const html = await renderToString(app)

    expect(html).toContain('height')
    expect(html).toContain('300px')
  })

  it('should render tree structure', async () => {
    const treeData = [
      {
        id: 1,
        name: '一级 1',
        children: [{ id: 11, name: '二级 1-1' }]
      }
    ]

    const app = createSSRApp({
      render() {
        return h(YhTable, {
          data: treeData,
          columns: [{ prop: 'name', label: '名称', treeNode: true }],
          treeConfig: {
            childrenKey: 'children',
            expandAll: true
          }
        })
      }
    })

    const html = await renderToString(app)

    expect(html).toContain('一级 1')
    expect(html).toContain('yh-table__tree-icon')
  })

  it('should render expand column', async () => {
    const app = createSSRApp({
      render() {
        return h(YhTable, {
          data: mockData,
          columns: mockColumns,
          expandConfig: {}
        })
      }
    })

    const html = await renderToString(app)

    expect(html).toContain('yh-table__expand-cell')
    expect(html).toContain('yh-table__expand-icon')
  })

  it('should render formatted cell content', async () => {
    const columns = [
      {
        prop: 'age',
        label: '年龄',
        formatter: (row: Record<string, unknown>) => `${row.age}岁`
      }
    ]

    const app = createSSRApp({
      render() {
        return h(YhTable, {
          data: mockData,
          columns
        })
      }
    })

    const html = await renderToString(app)

    expect(html).toContain('28岁')
    expect(html).toContain('32岁')
  })

  it('should apply column alignment', async () => {
    const columns = [{ prop: 'name', label: '姓名', align: 'center' as const }]

    const app = createSSRApp({
      render() {
        return h(YhTable, {
          data: mockData,
          columns
        })
      }
    })

    const html = await renderToString(app)

    expect(html).toContain('is-center')
  })

  it('should render sortable indicator', async () => {
    const columns = [{ prop: 'age', label: '年龄', sortable: true }]

    const app = createSSRApp({
      render() {
        return h(YhTable, {
          data: mockData,
          columns
        })
      }
    })

    const html = await renderToString(app)

    expect(html).toContain('is-sortable')
    expect(html).toContain('yh-table__sort-icon')
  })
})
