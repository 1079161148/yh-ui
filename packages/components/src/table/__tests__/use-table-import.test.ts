import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ref } from 'vue'
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
})
