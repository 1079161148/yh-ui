import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'
import { YhTable } from '../index'

// Mock DataTransfer
if (typeof DataTransfer === 'undefined') {
  ;(global as any).DataTransfer = class {
    data: any = {}
    effectAllowed = 'none'
    dropEffect = 'none'
    setData(type: string, val: string) {
      this.data[type] = val
    }
    getData(type: string) {
      return this.data[type]
    }
    setDragImage() {}
  }
}

describe('Table Interactions', () => {
  const mockData = [
    {
      id: 1,
      name: 'User 1',
      age: 25,
      longText: 'This is a very long text that should trigger overflow tooltip'
    },
    { id: 2, name: 'User 2', age: 30, longText: 'Short' }
  ]

  const mockColumns = [
    { prop: 'id', label: 'ID', width: 50 },
    { prop: 'name', label: 'Name', width: 100 },
    { prop: 'age', label: 'Age', width: 100 },
    { prop: 'longText', label: 'Long Text', width: 80, showOverflowTooltip: true }
  ]

  it('should handle cell and row clicks', async () => {
    const wrapper = mount(YhTable, {
      props: { data: mockData, columns: mockColumns }
    })

    const cell = wrapper.find('.yh-table__row td:nth-child(2)')
    await cell.trigger('click')
    expect(wrapper.emitted('cell-click')).toBeTruthy()
    expect(wrapper.emitted('row-click')).toBeTruthy()

    await cell.trigger('dblclick')
    expect(wrapper.emitted('cell-dblclick')).toBeTruthy()
  })

  it('should handle row dragging', async () => {
    const onDragEnd = vi.fn()
    const wrapper = mount(YhTable, {
      props: {
        data: [...mockData],
        columns: mockColumns,
        dragConfig: { row: true, onDragEnd }
      }
    })

    const rows = wrapper.findAll('.yh-table__row')

    const dt = new DataTransfer()
    const dragStartEvent = new DragEvent('dragstart', { dataTransfer: dt } as any)
    await rows[0].trigger('dragstart', dragStartEvent)

    const dragOverEvent = new DragEvent('dragover', { dataTransfer: dt } as any)
    await rows[1].trigger('dragover', dragOverEvent)

    const dropEvent = new DragEvent('drop', { dataTransfer: dt } as any)
    await rows[1].trigger('drop', dropEvent)

    expect(onDragEnd).toHaveBeenCalled()
    expect(wrapper.emitted('drag-end')).toBeTruthy()
  })

  it('should handle tree row dragging', async () => {
    const treeData = [
      { id: 1, name: 'Root 1', children: [{ id: 11, name: 'Child 1.1' }] },
      { id: 2, name: 'Root 2' }
    ]
    const onDragEnd = vi.fn()
    const wrapper = mount(YhTable, {
      props: {
        data: treeData,
        columns: [{ prop: 'name', label: 'Name', treeNode: true }],
        dragConfig: { row: true, onDragEnd },
        treeConfig: { childrenKey: 'children' }
      }
    })

    await nextTick()
    const rows = wrapper.findAll('.yh-table__row')

    const dt = new DataTransfer()
    const dragStartEvent = new DragEvent('dragstart', { dataTransfer: dt } as any)
    await rows[0].trigger('dragstart', dragStartEvent)

    const dropEvent = new DragEvent('drop', { dataTransfer: dt } as any)
    await rows[1].trigger('drop', dropEvent)

    expect(onDragEnd).toHaveBeenCalled()
  })

  it('should handle row selection config', async () => {
    const wrapper = mount(YhTable, {
      props: {
        data: mockData,
        columns: mockColumns,
        selectionConfig: {
          type: 'checkbox',
          checkable: (row: any) => row.id !== 1
        }
      }
    })
    await nextTick()

    const rowCheckboxes = wrapper.findAll('.yh-table__row .yh-table__selection-cell input')
    expect(rowCheckboxes[0].element.disabled).toBe(true)
    expect(rowCheckboxes[1].element.disabled).toBe(false)
  })

  it('should handle pagination page-size change', async () => {
    const wrapper = mount(YhTable, {
      props: {
        data: mockData,
        columns: mockColumns,
        pagination: { currentPage: 1, pageSize: 10, total: 100 }
      },
      global: {
        stubs: {
          YhPagination: {
            template:
              '<div class="stub-pagination"><button id="size-btn" @click="$emit(\'update:page-size\', 20)">Change Size</button></div>',
            emits: ['update:page-size']
          }
        }
      }
    })

    await wrapper.find('#size-btn').trigger('click')
    expect(wrapper.emitted('page-change')).toBeTruthy()
  })

  describe('Resize and Drag Utilities', () => {
    it('should handle column resize events', async () => {
      const wrapper = mount(YhTable, {
        props: { data: mockData, columns: mockColumns, resizable: true }
      })
      const vm = wrapper.vm as any

      await nextTick()
      const handle = wrapper.find('.yh-table__resize-handle')

      handle.element.setPointerCapture = vi.fn()
      const startEvent = new CustomEvent('pointerdown', { bubbles: true }) as any
      startEvent.clientX = 100
      startEvent.pointerId = 1
      handle.element.dispatchEvent(startEvent)

      const moveEvent = new CustomEvent('pointermove', { bubbles: true }) as any
      moveEvent.clientX = 150
      document.dispatchEvent(moveEvent)

      const upEvent = new CustomEvent('pointerup', { bubbles: true }) as any
      document.dispatchEvent(upEvent)

      expect(vm.isResizing).toBe(false)
    })

    it('should handle tree expansion', async () => {
      const treeData = [{ id: 1, name: 'Root', children: [{ id: 2, name: 'Child' }] }]
      const wrapper = mount(YhTable, {
        props: {
          data: treeData,
          columns: [{ prop: 'name', label: 'Name', treeNode: true }],
          treeConfig: { childrenKey: 'children' }
        }
      })

      await nextTick()
      const treeIcon = wrapper.find('.yh-table__tree-icon')
      await treeIcon.trigger('click')
      await nextTick()

      expect(wrapper.findAll('.yh-table__row').length).toBe(2)
    })
  })
})
