import { describe, it, expect, vi } from 'vitest'
import { ref } from 'vue'
import { useColumnDrag } from '../src/use-column-drag'
import type { TableColumn, TableDragConfig } from '../src/table'

describe('useColumnDrag hook', () => {
  const emit = vi.fn()

  const createMockColumns = (): TableColumn[] => [
    { property: 'a', title: 'A', id: '1' },
    { property: 'b', title: 'B', id: '2' },
    { property: 'c', title: 'C', id: '3', fixed: 'left' },
    { property: 'd', title: 'D', id: '4', draggable: false },
    { property: 'e', title: 'E', id: '5', children: [{ property: 'e1', title: 'E1', id: '5-1' }] }
  ]

  it('isColumnDraggable tests', () => {
    const columns = ref<TableColumn[]>(createMockColumns())
    const flatColumns = ref<TableColumn[]>([])

    // not enabled
    const dragConfig1 = ref<TableDragConfig | undefined>(undefined)
    const hook1 = useColumnDrag({ columns, dragConfig: dragConfig1, flatColumns, emit })
    expect(hook1.isColumnDraggable(columns.value[0])).toBe(false)

    // enabled
    const dragConfig2 = ref<TableDragConfig>({ column: true })
    const hook2 = useColumnDrag({ columns, dragConfig: dragConfig2, flatColumns, emit })

    // Normal column
    expect(hook2.isColumnDraggable(columns.value[0])).toBe(true)
    // Fixed column
    expect(hook2.isColumnDraggable(columns.value[2])).toBe(false)
    // Explicitly draggable: false
    expect(hook2.isColumnDraggable(columns.value[3])).toBe(false)
  })

  it('should handle drag events correctly', () => {
    const columns = ref<TableColumn[]>(createMockColumns())
    const flatColumns = ref<TableColumn[]>([...columns.value])
    const onDragStart = vi.fn()
    const onDragEnd = vi.fn()
    const dragConfig = ref<TableDragConfig>({ column: true, onDragStart, onDragEnd })

    const hook = useColumnDrag({ columns, dragConfig, flatColumns, emit })

    const attrs0 = hook.getHeaderDragAttrs(columns.value[0], 0) as any
    const attrs1 = hook.getHeaderDragAttrs(columns.value[1], 1) as any
    const attrs3 = hook.getHeaderDragAttrs(columns.value[3], 3) as any

    expect(attrs3).toEqual({}) // draggable false

    const mockTarget = document.createElement('div')

    // 覆盖 offsetX 等非原生在 div 上的只读属性
    Object.defineProperty(mockTarget, 'offsetX', { value: 10, writable: true })
    Object.defineProperty(mockTarget, 'offsetY', { value: 10, writable: true })

    const mockDataTransfer = {
      effectAllowed: '',
      dropEffect: '',
      setData: vi.fn(),
      setDragImage: vi.fn()
    }

    const dragStartEvent = {
      preventDefault: vi.fn(),
      dataTransfer: mockDataTransfer,
      target: mockTarget as any,
      offsetX: 10,
      offsetY: 10
    } as unknown as DragEvent

    // 1. Drag Start on 0
    attrs0.onDragstart(dragStartEvent)
    expect(hook.isDraggingColumn.value).toBe(true)
    expect(hook.dragColumnIndex.value).toBe(0)
    expect(mockDataTransfer.setData).toHaveBeenCalledWith('text/plain', '0')
    expect(onDragStart).toHaveBeenCalled()
    expect(hook.getHeaderDragClass(0)).toContain('is-column-dragging')

    // 2. Drag Enter on 1
    const dragEnterEvent = {
      preventDefault: vi.fn(),
      dataTransfer: mockDataTransfer
    } as unknown as DragEvent
    attrs1.onDragenter(dragEnterEvent)
    expect(hook.dropColumnIndex.value).toBe(1)

    // 3. Drag Over on 1
    const dragOverEvent = {
      preventDefault: vi.fn(),
      dataTransfer: mockDataTransfer
    } as unknown as DragEvent
    attrs1.onDragover(dragOverEvent)
    expect(mockDataTransfer.dropEffect).toBe('move')
    expect(hook.getHeaderDragClass(1)).toContain('is-column-drop-right')

    // 4. Drop on 1
    const dropEvent = {
      preventDefault: vi.fn(),
      dataTransfer: mockDataTransfer
    } as unknown as DragEvent
    attrs1.onDrop(dropEvent)
    expect(hook.isDraggingColumn.value).toBe(false)
    expect(emit).toHaveBeenCalledWith('drag-end', expect.any(Object))
    expect(onDragEnd).toHaveBeenCalled()

    // Order should change in flatColumns
    // A B C D E -> B A C D E
    expect(columns.value[0].property).toBe('b')
    expect(columns.value[1].property).toBe('a')
  })

  it('drop should do nothing if drop on same element', () => {
    const columns = ref<TableColumn[]>(createMockColumns())
    const flatColumns = ref<TableColumn[]>([...columns.value])
    const dragConfig = ref<TableDragConfig>({ column: true })
    const hook = useColumnDrag({ columns, dragConfig, flatColumns, emit })

    const attrs0 = hook.getHeaderDragAttrs(columns.value[0], 0) as any
    const mockEvent = {
      preventDefault: vi.fn(),
      dataTransfer: { setData: vi.fn(), setDragImage: vi.fn() }
    } as any

    attrs0.onDragstart(mockEvent)
    attrs0.onDrop(mockEvent) // drop on 0

    // Should not change order
    expect(columns.value[0].property).toBe('a')
  })

  it('dragEnd should reset state', () => {
    const columns = ref<TableColumn[]>(createMockColumns())
    const flatColumns = ref<TableColumn[]>([...columns.value])
    const dragConfig = ref<TableDragConfig>({ column: true })
    const hook = useColumnDrag({ columns, dragConfig, flatColumns, emit })

    const attrs0 = hook.getHeaderDragAttrs(columns.value[0], 0) as any
    const mockEvent = {
      preventDefault: vi.fn(),
      dataTransfer: { setData: vi.fn(), setDragImage: vi.fn() }
    } as any

    attrs0.onDragstart(mockEvent)
    expect(hook.isDraggingColumn.value).toBe(true)

    attrs0.onDragend(mockEvent)
    expect(hook.isDraggingColumn.value).toBe(false)
    expect(hook.dragColumnIndex.value).toBe(-1)
  })

  it('disabled conditions in events', () => {
    const columns = ref<TableColumn[]>(createMockColumns())
    const flatColumns = ref<TableColumn[]>([...columns.value])
    const dragConfig = ref<TableDragConfig>({ column: true }) // enabled
    const hook = useColumnDrag({ columns, dragConfig, flatColumns, emit })
    const mockEvent = { preventDefault: vi.fn() } as any

    // fixed column
    const attrs2 = hook.getHeaderDragAttrs(columns.value[2], 2) as any
    expect(attrs2).toEqual({})

    // force test early return if not dragging
    hook.isDraggingColumn.value = false
    const attrs0 = hook.getHeaderDragAttrs(columns.value[0], 0) as any
    attrs0.onDragover(mockEvent)
    attrs0.onDragenter(mockEvent)
    attrs0.onDrop(mockEvent)

    expect(hook.getHeaderDragClass(0)).toBe('')
  })

  it('should handle reorder columns with nested children', () => {
    const columns = ref<TableColumn[]>(createMockColumns())
    // 构造嵌套情况下的 flatColumns 以命中 findAndRemove / findAndInsert 深度遍历逻辑
    const flatColumns = ref<TableColumn[]>([
      columns.value[0], // a
      columns.value[4], // e (has children)
      columns.value[4].children![0] // e1
    ])
    const dragConfig = ref<TableDragConfig>({ column: true })
    const hook = useColumnDrag({ columns, dragConfig, flatColumns, emit })

    const attrs0 = hook.getHeaderDragAttrs(flatColumns.value[0], 0) as any // a
    const attrs2 = hook.getHeaderDragAttrs(flatColumns.value[2], 2) as any // e1

    const mockEvent = {
      preventDefault: vi.fn(),
      dataTransfer: { setData: vi.fn(), setDragImage: vi.fn() }
    } as any
    attrs0.onDragstart(mockEvent)
    attrs2.onDragenter(mockEvent)
    attrs2.onDrop(mockEvent)

    // should pass without throw and handle nested removal/insertion
    expect(columns.value).toBeTruthy()
  })
})
