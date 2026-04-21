import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ref } from 'vue'
import * as XLSX from 'xlsx'
import { useTableImport } from '../src/use-table-import'
import type { TableColumn } from '../src/table'

vi.mock('@yh-ui/hooks', () => ({
  useLocale: () => ({ t: (key: string) => key })
}))

describe('useTableImport hook', () => {
  const mockData = ref<Record<string, unknown>[]>([])
  const mockColumns = ref<TableColumn[]>([
    { prop: 'id', label: 'ID' },
    { prop: 'name', label: 'Name' },
    { prop: 'age', label: 'Age' }
  ])

  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('parseCSV returns [] when fewer than 2 lines', () => {
    const { parseCSV } = useTableImport(mockData, mockColumns)
    expect(parseCSV('only-header')).toEqual([])
    expect(parseCSV('')).toEqual([])
  })

  it('parseCSV respects maxRows, fieldMapping and autoMapping: false', () => {
    const { parseCSV } = useTableImport(mockData, mockColumns)
    const csv = `ExtName,Val\na,1\nb,2\nc,3`
    const rows = parseCSV(csv, {
      maxRows: 2,
      fieldMapping: { ExtName: 'name', Val: 'id' },
      autoMapping: false
    })
    expect(rows).toHaveLength(2)
    expect(rows[0]).toMatchObject({ name: 'a', id: '1' })
  })

  it('mapRow keeps NaN fallback for numberFields when value is not numeric', () => {
    const { parseCSV } = useTableImport(mockData, mockColumns)
    const rows = parseCSV('ID,Name\nx,Alice', { numberFields: ['id'] })
    expect(rows[0].id).toBe('x')
  })

  it('parseCSVLine handles escaped quotes inside quoted field', () => {
    const { parseCSV } = useTableImport(mockData, mockColumns)
    const csv = `A,B\nx,"b""c"`
    const rows = parseCSV(csv)
    expect(rows[0].A).toBe('x')
    expect(rows[0].B).toBe('b"c')
  })

  it('parseCSV / parseTXT should map rows correctly', () => {
    const { parseCSV, parseTXT } = useTableImport(mockData, mockColumns)
    const csvContent = `ID,Name,Age\n1,Alice,20\n2,"Bob, Jr.",`

    const rows = parseCSV(csvContent, { numberFields: ['id', 'age'] })
    expect(rows.length).toBe(2)
    expect(rows[0].id).toBe(1)
    expect(rows[0].name).toBe('Alice')
    expect(rows[0].age).toBe(20)

    expect(rows[1].id).toBe(2)
    expect(rows[1].name).toBe('Bob, Jr.')
    expect(rows[1].age).toBe(0) // empty string evaluates to 0 in Number('')

    const txtContent = `ID\tName\tAge\n1\tAlice\t20`
    const rowsTxt = parseTXT(txtContent)
    expect(rowsTxt.length).toBe(1)
    expect(rowsTxt[0].id).toBe('1') // not number without config
  })

  it('parseJSON should handle arrays and objects', () => {
    const { parseJSON } = useTableImport(mockData, mockColumns)

    // Valid array
    let rows = parseJSON('[{"ID": 1, "Name": "Alice"}]', { autoMapping: true })
    expect(rows[0].id).toBe(1)

    // Valid object
    rows = parseJSON('{"ID": 2, "Name": "Bob"}', { fieldMapping: { ID: 'id', Name: 'name' } })
    expect(rows[0].id).toBe(2)

    // Invalid json
    rows = parseJSON('invalid-json')
    expect(rows.length).toBe(0)

    rows = parseJSON('[{"ID":1},{"ID":2},{"ID":3}]', { maxRows: 2 })
    expect(rows).toHaveLength(2)
  })

  it('parseXML should parse standard format', () => {
    const { parseXML } = useTableImport(mockData, mockColumns)
    const xml = `
      <table>
        <columns>
          <column name="ID"/>
          <column name="Name"/>
        </columns>
        <rows>
          <row><cell>1</cell><cell>Alice</cell></row>
        </rows>
      </table>
    `
    const rows = parseXML(xml)
    expect(rows.length).toBe(1)
    expect(rows[0].id).toBe('1')
    expect(rows[0].name).toBe('Alice')

    const xmlNoCol = `<table><rows><row><cell>1</cell><cell>2</cell></row></rows></table>`
    const rows2 = parseXML(xmlNoCol)
    expect(rows2[0].col0).toBe('1')
    expect(rows2[0].col1).toBe('2')

    const rows3 = parseXML(xml, { maxRows: 1 })
    expect(rows3).toHaveLength(1)

    // Invalid XML parsing catch branch
    const domParserSpy = vi
      .spyOn(DOMParser.prototype, 'parseFromString')
      .mockImplementationOnce(() => {
        throw new Error('error')
      })
    expect(parseXML('bad')).toEqual([])
    domParserSpy.mockRestore()
  })

  it('parseHTML should parse standard format', () => {
    const { parseHTML } = useTableImport(mockData, mockColumns)
    const html = `
      <table>
        <thead><tr><th>ID</th><th>Name</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>Alice</td></tr>
        </tbody>
      </table>
    `
    const rows = parseHTML(html)
    expect(rows.length).toBe(1)
    expect(rows[0].id).toBe('1')
    expect(rows[0].name).toBe('Alice')

    const htmlTheadTd = `
      <table>
        <thead><tr><td>H1</td><td>H2</td></tr></thead>
        <tbody><tr><td>a</td><td>b</td></tr></tbody>
      </table>`
    const r2 = parseHTML(htmlTheadTd)
    expect(r2[0].H1).toBe('a')

    expect(parseHTML(html, { maxRows: 1 })).toHaveLength(1)

    // Invalid HTML parsing catch branch
    const domParserSpy = vi
      .spyOn(DOMParser.prototype, 'parseFromString')
      .mockImplementationOnce(() => {
        throw new Error('error')
      })
    expect(parseHTML('bad')).toEqual([])
    domParserSpy.mockRestore()
  })

  it('parseXLSX should handle ArrayBuffer', () => {
    const { parseXLSX } = useTableImport(mockData, mockColumns)
    // To mock XLSX functionality we can test the error fallback
    // when providing a fake ArrayBuffer
    const result = parseXLSX(new ArrayBuffer(10))
    expect(result).toEqual([]) // Because fake buffer fails in real XLSX.read
  })

  it('parseXLSX reads workbook with header and sheet options', () => {
    const { parseXLSX } = useTableImport(mockData, mockColumns)
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.aoa_to_sheet([
      ['ID', 'Name'],
      [1, 'Alice'],
      [2, 'Bob']
    ])
    XLSX.utils.book_append_sheet(wb, ws, 'Data')
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([[1]]), 'Extra')
    const written = XLSX.write(wb, { type: 'array', bookType: 'xlsx' })
    const buf = written instanceof Uint8Array ? written : new Uint8Array(written as number[])
    const arrayBuffer = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)

    let rows = parseXLSX(arrayBuffer, {})
    expect(rows.length).toBe(2)
    expect(rows[0].id).toBe(1)

    rows = parseXLSX(arrayBuffer, {
      sheetName: 'Data',
      maxRows: 1
    })
    expect(rows).toHaveLength(1)

    rows = parseXLSX(arrayBuffer, {
      sheetIndex: 1,
      headerRow: false
    })
    expect(rows.length).toBeGreaterThan(0)

    const empty = parseXLSX(arrayBuffer, {
      sheetName: 'MissingSheet'
    })
    expect(empty).toEqual([])
  })


  it('parseContent falls back to CSV for unknown runtime type', () => {
    const { parseContent } = useTableImport(mockData, mockColumns)
    const rows = parseContent('A,B\n1,2', 'bogus' as never, {})
    expect(rows[0].A).toBe('1')
  })

  it('importData should apply rows', async () => {
    const dataRef = ref<Record<string, unknown>[]>([{ existing: true }])
    const { importData } = useTableImport(dataRef, mockColumns)

    // Object mode
    await importData([{ added: true }])
    expect(dataRef.value.length).toBe(2)
    expect(dataRef.value[1].added).toBe(true)

    // String mode (CSV)
    await importData('ID,Name\n1,Alice', { type: 'csv' })
    expect(dataRef.value.length).toBe(3)
    expect(dataRef.value[2].id).toBe('1')

    // Modes
    await importData([{ top: true }], { mode: 'insertTop' })
    expect(dataRef.value[0].top).toBe(true)

    await importData([{ cover: true }], { mode: 'covering' })
    expect(dataRef.value.length).toBe(1)
    expect(dataRef.value[0].cover).toBe(true)

    // beforeImport
    const beforeImport = vi.fn().mockResolvedValue([{ changed: true }])
    await importData([{ original: true }], { beforeImport })
    expect(dataRef.value[1].changed).toBe(true)

    await importData([{ skip: true }], {
      beforeImport: () => false,
      mode: 'insertBottom'
    })
    expect(dataRef.value.some((r) => (r as { skip?: boolean }).skip)).toBe(false)
  })

  it('importFile using FileReader', async () => {
    const dataRef = ref<Record<string, unknown>[]>([])
    const { importFile } = useTableImport(dataRef, mockColumns)

    // Mock FileReader
    const fakeFile = new File(['ID,Name\n1,Alice'], 'test.csv', { type: 'text/csv' })

    const prom = importFile(fakeFile)

    // The promise uses FileReader. We await its resolution.
    // In vitest with happy-dom, FileReader works natively
    const rows = await prom
    expect(rows.length).toBe(1)
    expect(rows[0].id).toBe('1')
    expect(dataRef.value.length).toBe(1)
  })

  it('importFile reads xlsx and runs afterImport', async () => {
    const dataRef = ref<Record<string, unknown>[]>([])
    const { importFile } = useTableImport(dataRef, mockColumns)
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.aoa_to_sheet([
      ['ID', 'Name'],
      [9, 'Zed']
    ])
    XLSX.utils.book_append_sheet(wb, ws, 'S1')
    const raw = XLSX.write(wb, { type: 'array', bookType: 'xlsx' })
    const out = raw instanceof Uint8Array ? raw : new Uint8Array(raw as number[])
    const file = new File([out], 'data.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })
    const afterImport = vi.fn()
    const rows = await importFile(file, { afterImport })
    expect(rows.length).toBe(1)
    expect(rows[0].id).toBe(9)
    expect(afterImport).toHaveBeenCalled()
  })

  it('importFile returns [] when beforeImport rejects rows', async () => {
    const dataRef = ref<Record<string, unknown>[]>([{ keep: true }])
    const { importFile } = useTableImport(dataRef, mockColumns)
    const file = new File(['ID\n1'], 'nope.csv', { type: 'text/csv' })
    const rows = await importFile(file, { beforeImport: () => false })
    expect(rows).toEqual([])
    expect(dataRef.value).toEqual([{ keep: true }])
  })

  it('importFile uses guessType and parseContent for txt json xml html', async () => {
    const dataRef = ref<Record<string, unknown>[]>([])
    const { importFile } = useTableImport(dataRef, mockColumns)

    await importFile(new File(['ID\tName\n1\tA'], 'sheet.txt'))
    expect(dataRef.value[0].id).toBe('1')

    dataRef.value = []
    await importFile(new File(['[{"ID":3}]'], 'data.json'))
    expect(dataRef.value[0].id).toBe(3)

    dataRef.value = []
    const xml = `<table><columns><column name="ID"/></columns><rows><row><cell>5</cell></row></rows></table>`
    await importFile(new File([xml], 'rows.xml'))
    expect(dataRef.value[0].id).toBe('5')

    dataRef.value = []
    await importFile(
      new File(
        ['<table><thead><tr><th>ID</th></tr></thead><tbody><tr><td>9</td></tr></tbody></table>'],
        't.htm'
      )
    )
    expect(dataRef.value[0].id).toBe('9')
  })

  it('importFile sync beforeImport can replace rows array', async () => {
    const dataRef = ref<Record<string, unknown>[]>([])
    const { importFile } = useTableImport(dataRef, mockColumns)
    const file = new File(['ID,Name\n1,x'], 'z.csv')
    const rows = await importFile(file, {
      beforeImport: (r) => [{ fromHook: true, n: r.length }]
    })
    expect(rows[0].fromHook).toBe(true)
    expect(dataRef.value[0].fromHook).toBe(true)
  })

  it('guessType defaults unknown extension to csv', async () => {
    const dataRef = ref<Record<string, unknown>[]>([])
    const { importFile } = useTableImport(dataRef, mockColumns)
    await importFile(new File(['H\nv'], 'weird.unknownext'))
    expect(dataRef.value[0].H).toBe('v')
  })

  it('importFile rejects when FileReader errors', async () => {
    const dataRef = ref<Record<string, unknown>[]>([])
    const { importFile } = useTableImport(dataRef, mockColumns)
    const file = new File(['x'], 'a.csv')
    const Original = window.FileReader
    class BadReader {
      result: string | null = null
      onload: ((this: FileReader, ev: ProgressEvent<FileReader>) => void) | null = null
      onerror: ((this: FileReader, ev: ProgressEvent<FileReader>) => void) | null = null
      readAsText() {
        queueMicrotask(() => this.onerror?.(new Event('error') as ProgressEvent<FileReader>))
      }
      readAsArrayBuffer() {
        queueMicrotask(() => this.onerror?.(new Event('error') as ProgressEvent<FileReader>))
      }
      addEventListener() {}
      removeEventListener() {}
    }
    window.FileReader = BadReader as unknown as typeof FileReader
    await expect(importFile(file)).rejects.toThrow('upload.error')
    window.FileReader = Original
  })

  it('openImport should open file dialog', async () => {
    const { openImport } = useTableImport(mockData, mockColumns)

    // Simple mock of file interaction
    const oldCreate = document.createElement
    document.createElement = vi.fn().mockImplementation((tag) => {
      if (tag === 'input') {
        return {
          click() {
            if (this.onchange) {
              // Simulate picking nothing
              this.onchange({ target: { files: [] } })
            }
          }
        }
      }
      return oldCreate.call(document, tag)
    })

    const res = await openImport({ type: 'csv' })
    expect(res).toEqual([])

    document.createElement = oldCreate
  })

  it('openImport resolves rows when a file is chosen', async () => {
    const dataRef = ref<Record<string, unknown>[]>([])
    const { openImport } = useTableImport(dataRef, mockColumns)
    const oldCreate = document.createElement
    const fakeFile = new File(['ID,Name\n7,Sam'], 'picked.csv', { type: 'text/csv' })
    document.createElement = vi.fn().mockImplementation((tag) => {
      if (tag === 'input') {
        const el: {
          accept?: string
          click: () => void
          onchange: ((e: { target: { files: File[] } }) => void) | null
        } = {
          click() {
            el.onchange?.({ target: { files: [fakeFile] } })
          },
          onchange: null
        }
        return el as unknown as HTMLElement
      }
      return oldCreate.call(document, tag)
    })

    const rows = await openImport({ type: 'csv' })
    expect(rows.length).toBe(1)
    expect(rows[0].id).toBe('7')
    document.createElement = oldCreate
  })

  it('openImport sets broad accept when type is omitted', async () => {
    const { openImport } = useTableImport(mockData, mockColumns)
    const oldCreate = document.createElement
    let capturedAccept = ''
    document.createElement = vi.fn().mockImplementation((tag) => {
      if (tag === 'input') {
        return {
          set accept(v: string) {
            capturedAccept = v
          },
          get accept() {
            return capturedAccept
          },
          click() {
            if (this.onchange) this.onchange({ target: { files: [] } })
          },
          onchange: null as ((e: { target: { files: File[] } }) => void) | null
        }
      }
      return oldCreate.call(document, tag)
    })
    await openImport()
    expect(capturedAccept).toContain('.csv')
    document.createElement = oldCreate
  })
})
