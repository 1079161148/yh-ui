import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import { YhTable, YhTableColumn } from '../index'

// 测试数据
const mockData = [
  { id: 1, name: '张三', age: 28, address: '北京市朝阳区' },
  { id: 2, name: '李四', age: 32, address: '上海市浦东新区' },
  { id: 3, name: '王五', age: 25, address: '广州市天河区' },
  { id: 4, name: '赵六', age: 30, address: '深圳市南山区' }
]

const mockColumns = [
  { prop: 'name', label: '姓名', width: 100 },
  { prop: 'age', label: '年龄', width: 80, sortable: true },
  { prop: 'address', label: '地址' }
]

describe('Table', () => {
  it('should render basic table', () => {
    const wrapper = mount(YhTable, {
      props: {
        data: mockData,
        columns: mockColumns
      }
    })

    expect(wrapper.find('.yh-table').exists()).toBe(true)
    expect(wrapper.findAll('.yh-table__header-cell').length).toBe(3)
    expect(wrapper.findAll('.yh-table__row').length).toBe(4)
  })

  it('should render with border', () => {
    const wrapper = mount(YhTable, {
      props: {
        data: mockData,
        columns: mockColumns,
        border: true
      }
    })

    expect(wrapper.classes()).toContain('is-border')
  })

  it('should render with stripe', () => {
    const wrapper = mount(YhTable, {
      props: {
        data: mockData,
        columns: mockColumns,
        stripe: true
      }
    })

    expect(wrapper.classes()).toContain('is-stripe')
  })

  it('should support different sizes', () => {
    const sizes = ['large', 'default', 'small', 'mini'] as const

    sizes.forEach((size) => {
      const wrapper = mount(YhTable, {
        props: {
          data: mockData,
          columns: mockColumns,
          size
        }
      })

      expect(wrapper.classes()).toContain(`yh-table--${size}`)
    })
  })

  it('should show empty text when no data', () => {
    const wrapper = mount(YhTable, {
      props: {
        data: [],
        columns: mockColumns,
        emptyText: '暂无数据'
      }
    })

    expect(wrapper.find('.yh-table__empty').exists()).toBe(true)
    expect(wrapper.find('.yh-table__empty-text').text()).toBe('暂无数据')
  })

  it('should hide header when showHeader is false', () => {
    const wrapper = mount(YhTable, {
      props: {
        data: mockData,
        columns: mockColumns,
        showHeader: false
      }
    })

    expect(wrapper.find('.yh-table__header-wrapper').exists()).toBe(false)
  })

  it('should emit row-click event', async () => {
    const wrapper = mount(YhTable, {
      props: {
        data: mockData,
        columns: mockColumns
      }
    })

    const row = wrapper.find('.yh-table__row')
    await row.trigger('click')

    expect(wrapper.emitted('row-click')).toBeTruthy()
    expect(wrapper.emitted('row-click')![0][0]).toEqual(mockData[0])
  })

  it('should emit row-dblclick event', async () => {
    const wrapper = mount(YhTable, {
      props: {
        data: mockData,
        columns: mockColumns
      }
    })

    const row = wrapper.find('.yh-table__row')
    await row.trigger('dblclick')

    expect(wrapper.emitted('row-dblclick')).toBeTruthy()
  })

  it('should highlight current row', async () => {
    const wrapper = mount(YhTable, {
      props: {
        data: mockData,
        columns: mockColumns,
        highlightCurrentRow: true
      }
    })

    expect(wrapper.classes()).toContain('is-highlight-current-row')

    const row = wrapper.find('.yh-table__row')
    await row.trigger('click')

    expect(row.classes()).toContain('is-current')
  })

  it('should render selection column', () => {
    const wrapper = mount(YhTable, {
      props: {
        data: mockData,
        columns: mockColumns,
        selectionConfig: {
          type: 'checkbox'
        }
      }
    })

    expect(wrapper.findAll('.yh-table__selection-cell').length).toBeGreaterThan(0)
  })

  it('should render index column', () => {
    const wrapper = mount(YhTable, {
      props: {
        data: mockData,
        columns: mockColumns,
        showIndex: true
      }
    })

    expect(wrapper.findAll('.yh-table__index-cell').length).toBeGreaterThan(0)
  })

  it('should render sortable column', () => {
    const wrapper = mount(YhTable, {
      props: {
        data: mockData,
        columns: mockColumns
      }
    })

    const sortableHeader = wrapper.find('.yh-table__header-cell.is-sortable')
    expect(sortableHeader.exists()).toBe(true)
  })

  it('should emit sort-change event', async () => {
    const wrapper = mount(YhTable, {
      props: {
        data: mockData,
        columns: mockColumns
      }
    })

    const sortableHeader = wrapper.find('.yh-table__header-cell.is-sortable')
    await sortableHeader.trigger('click')

    expect(wrapper.emitted('sort-change')).toBeTruthy()
  })

  it('should render with fixed height', () => {
    const wrapper = mount(YhTable, {
      props: {
        data: mockData,
        columns: mockColumns,
        height: 300
      }
    })

    expect(wrapper.attributes('style')).toContain('height: 300px')
  })

  it('should render with max height', () => {
    const wrapper = mount(YhTable, {
      props: {
        data: mockData,
        columns: mockColumns,
        maxHeight: 400
      }
    })

    expect(wrapper.attributes('style')).toContain('max-height: 400px')
  })

  it('should expose getSelectionRows method', () => {
    const wrapper = mount(YhTable, {
      props: {
        data: mockData,
        columns: mockColumns,
        selectionConfig: {
          type: 'checkbox'
        }
      }
    })

    const tableInstance = wrapper.vm as InstanceType<typeof YhTable>
    expect(typeof tableInstance.getSelectionRows).toBe('function')
    expect(tableInstance.getSelectionRows()).toEqual([])
  })

  it('should expose toggleRowSelection method', async () => {
    const wrapper = mount(YhTable, {
      props: {
        data: mockData,
        columns: mockColumns,
        selectionConfig: {
          type: 'checkbox'
        }
      }
    })

    const tableInstance = wrapper.vm as InstanceType<typeof YhTable>
    tableInstance.toggleRowSelection(mockData[0], true)

    await nextTick()
    expect(tableInstance.getSelectionRows()).toContainEqual(mockData[0])
  })

  it('should expose clearSelection method', async () => {
    const wrapper = mount(YhTable, {
      props: {
        data: mockData,
        columns: mockColumns,
        selectionConfig: {
          type: 'checkbox'
        }
      }
    })

    const tableInstance = wrapper.vm as InstanceType<typeof YhTable>
    tableInstance.toggleRowSelection(mockData[0], true)
    await nextTick()

    tableInstance.clearSelection()
    await nextTick()

    expect(tableInstance.getSelectionRows()).toEqual([])
  })

  it('should expose sort method', async () => {
    const wrapper = mount(YhTable, {
      props: {
        data: mockData,
        columns: mockColumns
      }
    })

    const tableInstance = wrapper.vm as InstanceType<typeof YhTable>
    tableInstance.sort('age', 'asc')

    await nextTick()
    // 验证排序已应用
    expect(wrapper.emitted('sort-change')).toBeFalsy() // sort方法不触发事件
  })

  it('should expose clearSort method', async () => {
    const wrapper = mount(YhTable, {
      props: {
        data: mockData,
        columns: mockColumns
      }
    })

    const tableInstance = wrapper.vm as InstanceType<typeof YhTable>
    tableInstance.sort('age', 'asc')
    await nextTick()

    tableInstance.clearSort()
    await nextTick()
    // 排序已清除
  })

  it('should render loading state', () => {
    const wrapper = mount(YhTable, {
      props: {
        data: mockData,
        columns: mockColumns,
        loading: true
      }
    })

    expect(wrapper.find('.yh-table__loading').exists()).toBe(true)
  })

  it('should render loading with text', () => {
    const wrapper = mount(YhTable, {
      props: {
        data: mockData,
        columns: mockColumns,
        loading: {
          visible: true,
          text: '加载中...'
        }
      }
    })

    expect(wrapper.find('.yh-table__loading').exists()).toBe(true)
  })

  it('should format cell content with formatter', () => {
    const columns = [
      {
        prop: 'age',
        label: '年龄',
        formatter: (row: Record<string, unknown>) => `${row.age}岁`
      }
    ]

    const wrapper = mount(YhTable, {
      props: {
        data: mockData,
        columns
      }
    })

    const cells = wrapper.findAll('.yh-table__cell')
    expect(cells[0].text()).toBe('28岁')
  })

  it('should render with custom row class', () => {
    const wrapper = mount(YhTable, {
      props: {
        data: mockData,
        columns: mockColumns,
        rowClassName: 'custom-row-class'
      }
    })

    const rows = wrapper.findAll('.yh-table__row')
    expect(rows[0].classes()).toContain('custom-row-class')
  })

  it('should render with row class function', () => {
    const wrapper = mount(YhTable, {
      props: {
        data: mockData,
        columns: mockColumns,
        rowClassName: ({ rowIndex }: { rowIndex: number }) => (rowIndex === 0 ? 'first-row' : '')
      }
    })

    const rows = wrapper.findAll('.yh-table__row')
    expect(rows[0].classes()).toContain('first-row')
    expect(rows[1].classes()).not.toContain('first-row')
  })

  it('should support column align', () => {
    const columns = [{ prop: 'name', label: '姓名', align: 'center' as const }]

    const wrapper = mount(YhTable, {
      props: {
        data: mockData,
        columns
      }
    })

    const cell = wrapper.find('.yh-table__cell')
    expect(cell.classes()).toContain('is-center')
  })

  it('should expose getTableData method', () => {
    const wrapper = mount(YhTable, {
      props: {
        data: mockData,
        columns: mockColumns
      }
    })

    const tableInstance = wrapper.vm as InstanceType<typeof YhTable>
    const result = tableInstance.getTableData()

    expect(result.fullData).toEqual(mockData)
    expect(result.tableData).toEqual(mockData)
  })
})

describe('Table with Selection', () => {
  it('should toggle row selection', async () => {
    const onChange = vi.fn()

    const wrapper = mount(YhTable, {
      props: {
        data: mockData,
        columns: mockColumns,
        selectionConfig: {
          type: 'checkbox',
          onChange
        }
      }
    })

    const checkbox = wrapper.find('.yh-table__selection-cell input[type="checkbox"]')
    await checkbox.trigger('change')

    expect(wrapper.emitted('selection-change')).toBeTruthy()
  })

  it('should toggle all selection', async () => {
    const wrapper = mount(YhTable, {
      props: {
        data: mockData,
        columns: mockColumns,
        selectionConfig: {
          type: 'checkbox'
        }
      }
    })

    const headerCheckbox = wrapper.find('.yh-table__header-cell .yh-table__selection-cell input')
    await headerCheckbox.trigger('change')

    const tableInstance = wrapper.vm as InstanceType<typeof YhTable>
    expect(tableInstance.getSelectionRows().length).toBe(4)
  })

  it('should support radio selection', async () => {
    const wrapper = mount(YhTable, {
      props: {
        data: mockData,
        columns: mockColumns,
        selectionConfig: {
          type: 'radio'
        }
      }
    })

    const radios = wrapper.findAll('.yh-table__selection-cell input[type="radio"]')
    expect(radios.length).toBe(4)
  })
})

describe('Table with Tree', () => {
  const treeData = [
    {
      id: 1,
      name: '一级 1',
      children: [
        { id: 11, name: '二级 1-1' },
        { id: 12, name: '二级 1-2' }
      ]
    },
    {
      id: 2,
      name: '一级 2',
      children: [{ id: 21, name: '二级 2-1' }]
    }
  ]

  it('should render tree data', () => {
    const wrapper = mount(YhTable, {
      props: {
        data: treeData,
        columns: [{ prop: 'name', label: '名称', treeNode: true }],
        treeConfig: {
          childrenKey: 'children'
        }
      }
    })

    expect(wrapper.find('.yh-table__tree-icon').exists()).toBe(true)
  })

  it('should expand tree node', async () => {
    const wrapper = mount(YhTable, {
      props: {
        data: treeData,
        columns: [{ prop: 'name', label: '名称', treeNode: true }],
        treeConfig: {
          childrenKey: 'children'
        }
      }
    })

    const treeIcon = wrapper.find('.yh-table__tree-icon')
    await treeIcon.trigger('click')

    // 验证子节点被渲染
    await nextTick()
    const rows = wrapper.findAll('.yh-table__row')
    expect(rows.length).toBeGreaterThan(2)
  })
})

describe('Table with Expand', () => {
  it('should render expand column', () => {
    const wrapper = mount(YhTable, {
      props: {
        data: mockData,
        columns: mockColumns,
        expandConfig: {}
      }
    })

    expect(wrapper.find('.yh-table__expand-cell').exists()).toBe(true)
  })

  it('should toggle expand row', async () => {
    const wrapper = mount(YhTable, {
      props: {
        data: mockData,
        columns: mockColumns,
        expandConfig: {}
      }
    })

    const expandIcon = wrapper.find('.yh-table__expand-icon')
    await expandIcon.trigger('click')

    expect(wrapper.find('.yh-table__expanded-row').exists()).toBe(true)
    expect(wrapper.emitted('expand-change')).toBeTruthy()
  })
})

describe('TableColumn', () => {
  it('should render slot content', () => {
    const wrapper = mount(YhTable, {
      props: {
        data: mockData,
        columns: mockColumns
      },
      slots: {
        name: ({ row }: { row: Record<string, unknown> }) =>
          h('span', { class: 'custom-name' }, String(row.name))
      }
    })

    expect(wrapper.find('.custom-name').exists()).toBe(true)
  })

  it('should render header slot', () => {
    const wrapper = mount(YhTable, {
      props: {
        data: mockData,
        columns: mockColumns
      },
      slots: {
        'header-name': () => h('span', { class: 'custom-header' }, '自定义表头')
      }
    })

    expect(wrapper.find('.custom-header').exists()).toBe(true)
    expect(wrapper.find('.custom-header').text()).toBe('自定义表头')
  })
})
