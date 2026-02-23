import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref } from 'vue'
import { useTableExport } from '../src/use-table-export'
import type { TableColumn } from '../src/table'

vi.mock('@yh-ui/hooks', () => ({
  useLocale: () => ({ t: (key: string) => key })
}))

describe('useTableExport hook', () => {
  const mockData = ref([
    { id: 1, name: 'Alice', age: 20, active: true },
    { id: 2, name: 'Bob', age: null, active: false }
  ])

  const mockColumns = ref<TableColumn[]>([
    { prop: 'id', label: 'ID' },
    { prop: 'name', label: 'Name' },
    { prop: 'age', label: 'Age', visible: false },
    { prop: 'active', label: 'Active' },
    { label: 'Action' } // no prop
  ])

  beforeEach(() => {
    // Mock Download methods
    global.URL.createObjectURL = vi.fn().mockReturnValue('blob:mock')
    global.URL.revokeObjectURL = vi.fn()
  })

  it('getExportColumns should correctly filter columns', () => {
    const { getExportColumns } = useTableExport(mockData, mockColumns)

    // Default ignores visible: false and missing prop
    let cols = getExportColumns()
    expect(cols.length).toBe(3)
    expect(cols.map((c) => c.prop)).toEqual(['id', 'name', 'active'])

    // Include invisible
    cols = getExportColumns({ visibleOnly: false })
    expect(cols.length).toBe(4) // age should be included

    // Explicit columns
    cols = getExportColumns({ columns: ['id'] })
    expect(cols.length).toBe(1)

    // Exclude columns
    cols = getExportColumns({ excludeColumns: ['active'] })
    expect(cols.length).toBe(2) // id, name
  })

  it('toCSV should format correctly', () => {
    const { toCSV } = useTableExport(mockData, mockColumns)
    const csv = toCSV({ showIndex: true, indexTitle: 'No.' })
    // \uFEFF BOM + "No.,ID,Name,Active\n1,1,Alice,table.yes\n2,2,Bob,table.no" (table.no is due to locale mock, or standard output based on true/false)
    expect(csv.includes('\uFEFF')).toBe(true)
    expect(csv.includes('No.,ID,Name,Active')).toBe(true)
    expect(csv.includes('1,1,Alice')).toBe(true)
    expect(csv.includes('2,2,Bob')).toBe(true)
  })

  it('toTXT should use tab separator', () => {
    const { toTXT } = useTableExport(mockData, mockColumns)
    const txt = toTXT({ bom: false }) // test no bom
    expect(txt.includes('\uFEFF')).toBe(false)
    expect(txt.includes('ID\tName\tActive')).toBe(true)
  })

  it('toJSON should serialize items correctly', () => {
    const { toJSON } = useTableExport(mockData, mockColumns)
    // Custom formatCell
    const jsonStr = toJSON({
      showIndex: true,
      indexTitle: 'idx',
      formatCell: (val, col) => (col.prop === 'id' ? `ID-${val}` : String(val))
    })
    const jsonObj = JSON.parse(jsonStr)
    expect(jsonObj.length).toBe(2)
    expect(jsonObj[0].idx).toBe(1)
    expect(jsonObj[0].ID).toBe('ID-1')
  })

  it('toXML should wrap with xml tags', () => {
    const { toXML } = useTableExport(mockData, mockColumns)
    const xml = toXML({ showIndex: true, includeHeader: true })
    expect(xml.includes('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true)
    expect(xml.includes('<column name="ID" />')).toBe(true)
    expect(xml.includes('<cell>1</cell>')).toBe(true)
  })

  it('toHTML should wrap with html tags', () => {
    const { toHTML } = useTableExport(mockData, mockColumns)
    const html = toHTML({ showIndex: true })
    expect(html.includes('<!DOCTYPE html>')).toBe(true)
    expect(html.includes('<th>ID</th>')).toBe(true)
    expect(html.includes('<td style="text-align:center">1</td>')).toBe(true)
    expect(html.includes('<td>Alice</td>')).toBe(true)
  })

  it('toXLSX should convert properly', () => {
    const { toXLSX } = useTableExport(mockData, mockColumns)
    // Testing column calculation and formats
    const buffer = toXLSX({
      showIndex: true,
      sheetName: 'TestSheet',
      columnWidths: { name: 20 },
      autoWidth: true,
      formatCell: (val) => `Format:${val}`
    })
    expect(buffer).toBeInstanceOf(ArrayBuffer)
  })

  it('exportData string mode', async () => {
    const { exportData } = useTableExport(mockData, mockColumns)

    // JSON
    const resValue = await exportData({ type: 'json', mode: 'string' })
    expect(typeof resValue).toBe('string')

    // Return early due to beforeExport
    const result = await exportData({ type: 'csv', beforeExport: () => false })
    expect(result).toBeUndefined()

    // Base64 XLSX
    const xlsxVal = await exportData({ type: 'xlsx', mode: 'string', afterExport: vi.fn() })
    expect(typeof xlsxVal).toBe('string')
  })

  it('exportData download mode triggers dom manipulation', async () => {
    const { exportData } = useTableExport(mockData, mockColumns)

    // HTML download
    await exportData({ type: 'html', filename: 'test' })
    expect(URL.createObjectURL).toHaveBeenCalled()
    expect(URL.revokeObjectURL).toHaveBeenCalled()

    // XLSX download
    await exportData({ type: 'xlsx', filename: 'testXlsx', afterExport: vi.fn() })
    // Will call downloadXLSX -> createObjectURL
    expect(URL.createObjectURL).toHaveBeenCalled()
  })
})
