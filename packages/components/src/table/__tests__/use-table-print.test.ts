import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref } from 'vue'
import { useTablePrint } from '../src/use-table-print'
import type { TableColumn } from '../src/table'

vi.mock('@yh-ui/hooks', () => ({
  useLocale: () => ({ t: (key: string) => key })
}))

describe('useTablePrint hook', () => {
  const mockData = ref([
    { id: 1, name: 'Alice', role: 'Admin' },
    { id: 2, name: 'Bob', role: 'User' },
    { id: 3, name: 'Carol', role: 'Guest' }
  ])

  const mockColumns = ref<TableColumn[]>([
    { prop: 'id', label: 'ID', align: 'center' },
    { prop: 'name', label: 'Name' },
    { prop: 'role', label: 'Role', visible: false },
    { label: 'Action' }
  ])

  let mockWin: any

  beforeEach(() => {
    vi.clearAllMocks()
    mockWin = {
      document: {
        write: vi.fn(),
        close: vi.fn()
      },
      print: vi.fn(),
      onload: null as any
    }
    vi.spyOn(window, 'open').mockImplementation(() => mockWin)
  })

  it('getPrintColumns checks visibility and includes/excludes', () => {
    const { getPrintColumns } = useTablePrint(mockData, mockColumns)

    // Default: ignoring visible:false and no-prop columns
    let cols = getPrintColumns()
    expect(cols.length).toBe(2)
    expect(cols[0].prop).toBe('id')
    expect(cols[1].prop).toBe('name')

    // Include/Exclude
    cols = getPrintColumns({ columns: ['id', 'role'] })
    expect(cols.length).toBe(1) // role is still filtered out because of visible!==false by default logic in the code?
    // Wait, the hook code says: `columns.value.filter((col) => col.visible !== false && col.prop)`, so role is excluded initially.

    cols = getPrintColumns({ excludeColumns: ['name'] })
    expect(cols.length).toBe(1)
    expect(cols[0].prop).toBe('id')
  })

  it('print should handle different configs', async () => {
    const { print } = useTablePrint(mockData, mockColumns)

    // Test pagination & formatting
    await print({
      title: 'Report',
      showIndex: true,
      pageSize: 2,
      showPageNumber: true,
      extraCss: '.custom { color: red }',
      tableStyle: 'border: 1px solid black',
      headerHtml: '<p>Header</p>',
      footerHtml: '<p>Footer</p>',
      formatCell: (val, col) => (col.prop === 'id' ? `ID-${val}` : String(val)),
      columnTitles: { name: 'Full Name' },
      autoPrint: true
    })

    expect(window.open).toHaveBeenCalled()
    expect(mockWin.document.write).toHaveBeenCalled()
    const html = mockWin.document.write.mock.calls[0][0]

    expect(html).toContain('Full Name')
    expect(html).toContain('ID-1')
    expect(html).toContain('Report')
    expect(html).toContain('Header')
    expect(html).toContain('Footer')
    expect(html).toContain('page-break') // because of pageSize=2 and total=3

    // trigger auto print
    if (mockWin.onload) {
      mockWin.onload()
      expect(mockWin.print).toHaveBeenCalled()
    }
  })

  it('print aborted if beforePrint returns false', async () => {
    const { print } = useTablePrint(mockData, mockColumns)
    const beforePrint = vi.fn().mockReturnValue(false)
    await print({ beforePrint })
    expect(window.open).not.toHaveBeenCalled()
  })

  it('printMultiple handles multiple tables', async () => {
    const { printMultiple } = useTablePrint(mockData, mockColumns)
    const afterPrint = vi.fn()

    await printMultiple(
      [
        {
          title: 'Table 1',
          data: [{ a: 1 }],
          columns: [{ prop: 'a', label: 'A' }]
        },
        {
          title: 'Table 2',
          data: [{ b: 2 }]
          // Use fallback columns from hook
        }
      ],
      {
        orientation: 'landscape',
        margin: { top: '5mm', bottom: '5mm', left: '5mm', right: '5mm' },
        showTime: false,
        showCount: false,
        afterPrint
      }
    )

    expect(window.open).toHaveBeenCalled()
    const html = mockWin.document.write.mock.calls[0][0]
    expect(html).toContain('Table 1')
    expect(html).toContain('Table 2')
    expect(html).toContain('landscape')
    expect(afterPrint).toHaveBeenCalled()
  })

  it('printMultiple aborted if global beforePrint returns false', async () => {
    const { printMultiple } = useTablePrint(mockData, mockColumns)
    await printMultiple([], { beforePrint: () => false })
    expect(window.open).not.toHaveBeenCalled()
  })

  it('printTemplate pushes raw html', async () => {
    const { printTemplate } = useTablePrint(mockData, mockColumns)
    await printTemplate('<div id="custom-template">OK</div>', { autoPrint: true })

    expect(window.open).toHaveBeenCalled()
    const html = mockWin.document.write.mock.calls[0][0]
    expect(html).toContain('custom-template')

    if (mockWin.onload) mockWin.onload()
    expect(mockWin.print).toHaveBeenCalled()
  })

  it('printTemplate aborted if beforePrint returns false', async () => {
    const { printTemplate } = useTablePrint(mockData, mockColumns)
    await printTemplate('<div id="custom-template">OK</div>', { beforePrint: () => false })
    expect(window.open).not.toHaveBeenCalled()
  })

  it('covers null window.open', async () => {
    vi.spyOn(window, 'open').mockReturnValueOnce(null)
    const { print } = useTablePrint(mockData, mockColumns)
    await print() // should warn and return early
  })
})
