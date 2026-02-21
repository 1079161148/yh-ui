/**
 * Table Utils 单元测试
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  getRowKey,
  getColumnKey,
  flattenColumns,
  getColumnDepth,
  buildHeaderRows,
  calculateColumnWidth,
  defaultSortMethod,
  multiColumnSort,
  defaultFilterMethod,
  multiValueFilter,
  flattenTreeData,
  getAllTreeKeys,
  formatSize,
  calculateSpan,
  throttle,
  debounce,
  deepClone,
  isEmpty,
  generateId,
  formatCellValue,
  getFixedStyle,
  exportToCSV
} from '../src/utils'
import type { TableColumn } from '../src/table'

describe('table/utils', () => {
  // ======================== getRowKey ========================
  describe('getRowKey', () => {
    it('should return key via string rowKey', () => {
      expect(getRowKey({ id: 1, name: 'a' }, 'id')).toBe(1)
    })
    it('should return key via function rowKey', () => {
      expect(getRowKey({ id: 2 }, (row) => row.id as number)).toBe(2)
    })
  })

  // ======================== getColumnKey ========================
  describe('getColumnKey', () => {
    it('should prefer key over prop', () => {
      expect(getColumnKey({ key: 'myKey', prop: 'myProp', label: 'Label' })).toBe('myKey')
    })
    it('should fall back to prop when key is missing', () => {
      expect(getColumnKey({ prop: 'name', label: 'Name' })).toBe('name')
    })
    it('should return empty string when both missing', () => {
      expect(getColumnKey({ label: 'Test' })).toBe('')
    })
  })

  // ======================== flattenColumns ========================
  describe('flattenColumns', () => {
    it('should flatten nested columns', () => {
      const cols: TableColumn[] = [
        {
          label: 'Group',
          children: [
            { prop: 'a', label: 'A' },
            { prop: 'b', label: 'B' }
          ]
        },
        { prop: 'c', label: 'C' }
      ]
      const flat = flattenColumns(cols)
      expect(flat).toHaveLength(3)
      expect(flat.map((c) => c.prop)).toEqual(['a', 'b', 'c'])
    })
    it('should return leaf columns as-is', () => {
      const cols: TableColumn[] = [{ prop: 'x', label: 'X' }]
      expect(flattenColumns(cols)).toHaveLength(1)
    })
  })

  // ======================== getColumnDepth ========================
  describe('getColumnDepth', () => {
    it('should return 1 for flat columns', () => {
      const cols: TableColumn[] = [{ prop: 'a', label: 'A' }]
      expect(getColumnDepth(cols)).toBe(1)
    })
    it('should return correct depth for nested columns', () => {
      const cols: TableColumn[] = [
        {
          label: 'Level1',
          children: [
            {
              label: 'Level2',
              children: [{ prop: 'leaf', label: 'Leaf' }]
            }
          ]
        }
      ]
      expect(getColumnDepth(cols)).toBe(3)
    })
  })

  // ======================== buildHeaderRows ========================
  describe('buildHeaderRows', () => {
    it('should return empty array for single-level columns', () => {
      const cols: TableColumn[] = [{ prop: 'a', label: 'A' }]
      expect(buildHeaderRows(cols)).toHaveLength(0)
    })
    it('should build correct header rows for grouped columns', () => {
      const cols: TableColumn[] = [
        {
          label: 'Group',
          children: [
            { prop: 'a', label: 'A' },
            { prop: 'b', label: 'B' }
          ]
        },
        { prop: 'c', label: 'C' }
      ]
      const rows = buildHeaderRows(cols)
      expect(rows).toHaveLength(2)
      // First row: 'Group' (colspan=2) + 'C' (rowspan=2)
      expect(rows[0][0].colspan).toBe(2)
      expect(rows[0][1].rowspan).toBe(2)
    })
  })

  // ======================== calculateColumnWidth ========================
  describe('calculateColumnWidth', () => {
    it('should return numeric width directly', () => {
      const col: TableColumn = { prop: 'a', label: 'A', width: 100 }
      expect(calculateColumnWidth(col, 800, [col])).toBe(100)
    })
    it('should compute percentage width', () => {
      const col: TableColumn = { prop: 'a', label: 'A', width: '50%' }
      expect(calculateColumnWidth(col, 800, [col])).toBe(400)
    })
    it('should parse string pixel width', () => {
      const col: TableColumn = { prop: 'a', label: 'A', width: '120px' }
      expect(calculateColumnWidth(col, 800, [col])).toBe(120)
    })
    it('should distribute remaining width evenly for flex columns', () => {
      const fixedCol: TableColumn = { prop: 'a', label: 'A', width: 200 }
      const flexCol: TableColumn = { prop: 'b', label: 'B' }
      const all = [fixedCol, flexCol]
      const width = calculateColumnWidth(flexCol, 800, all)
      expect(width).toBe(600) // 800 - 200 = 600, 1 flex column
    })
    it('should respect minWidth', () => {
      const col: TableColumn = { prop: 'a', label: 'A', minWidth: 150 }
      const width = calculateColumnWidth(col, 100, [col]) // remaining=100 < minWidth
      expect(width).toBe(150)
    })
  })

  // ======================== defaultSortMethod ========================
  describe('defaultSortMethod', () => {
    it('should return 0 when no order', () => {
      expect(defaultSortMethod({ age: 1 }, { age: 2 }, 'age', null as unknown as 'asc')).toBe(0)
    })
    it('should sort numbers ascending', () => {
      expect(defaultSortMethod({ age: 1 }, { age: 2 }, 'age', 'asc')).toBeLessThan(0)
      expect(defaultSortMethod({ age: 2 }, { age: 1 }, 'age', 'asc')).toBeGreaterThan(0)
    })
    it('should sort numbers descending', () => {
      expect(defaultSortMethod({ age: 1 }, { age: 2 }, 'age', 'desc')).toBeGreaterThan(0)
    })
    it('should sort strings', () => {
      expect(defaultSortMethod({ name: 'b' }, { name: 'a' }, 'name', 'asc')).toBeGreaterThan(0)
    })
    it('should handle null/undefined values', () => {
      expect(defaultSortMethod({ v: null }, { v: 1 }, 'v', 'asc')).toBeGreaterThan(0)
      expect(defaultSortMethod({ v: 1 }, { v: null }, 'v', 'asc')).toBeLessThan(0)
      expect(defaultSortMethod({ v: null }, { v: null }, 'v', 'asc')).toBe(0)
    })
  })

  // ======================== multiColumnSort ========================
  describe('multiColumnSort', () => {
    it('should return original data when no sort states', () => {
      const data = [{ a: 2 }, { a: 1 }]
      expect(multiColumnSort(data, [])).toEqual(data)
    })
    it('should sort by single column', () => {
      const data = [{ age: 3 }, { age: 1 }, { age: 2 }]
      const sorted = multiColumnSort(data, [{ prop: 'age', order: 'asc' }])
      expect(sorted.map((r) => r.age)).toEqual([1, 2, 3])
    })
    it('should respect custom sortMethod', () => {
      const data = [{ v: 'b' }, { v: 'a' }]
      const sortMethod = vi.fn((a: (typeof data)[0], b: (typeof data)[0]) => a.v.localeCompare(b.v))
      multiColumnSort(data, [{ prop: 'v', order: 'asc', sortMethod: sortMethod as any }])
      expect(sortMethod).toHaveBeenCalled()
    })
    it('should skip columns with no order', () => {
      const data = [{ a: 2 }, { a: 1 }]
      const sorted = multiColumnSort(data, [{ prop: 'a', order: null as unknown as 'asc' }])
      expect(sorted).toHaveLength(2)
    })
  })

  // ======================== defaultFilterMethod ========================
  describe('defaultFilterMethod', () => {
    it('should match exact value', () => {
      const col: TableColumn = { prop: 'status', label: 'Status' }
      expect(defaultFilterMethod('active', { status: 'active' }, col)).toBe(true)
      expect(defaultFilterMethod('inactive', { status: 'active' }, col)).toBe(false)
    })
    it('should return true when no prop', () => {
      expect(defaultFilterMethod('x', { a: 'x' }, { label: 'Test' })).toBe(true)
    })
  })

  // ======================== multiValueFilter ========================
  describe('multiValueFilter', () => {
    const data = [
      { name: 'Alice', status: 'active', age: 25 },
      { name: 'Bob', status: 'inactive', age: 30 },
      { name: 'Charlie', status: 'active', age: 35 }
    ]
    const columns: TableColumn[] = [
      { prop: 'status', label: 'Status' },
      { prop: 'age', label: 'Age' }
    ]

    it('should return all data when no active filters', () => {
      expect(multiValueFilter(data, {}, columns)).toHaveLength(3)
    })
    it('should filter by single value', () => {
      const result = multiValueFilter(data, { status: ['active'] }, columns)
      expect(result).toHaveLength(2)
      expect(result.every((r) => r.status === 'active')).toBe(true)
    })
    it('should filter by multiple columns', () => {
      const result = multiValueFilter(data, { status: ['active'], age: [25] }, columns)
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('Alice')
    })
    it('should handle missing column gracefully', () => {
      const result = multiValueFilter(data, { missing: ['x'] }, columns)
      expect(result).toHaveLength(3) // column not found → true
    })
  })

  // ======================== flattenTreeData ========================
  describe('flattenTreeData', () => {
    const treeData = [
      {
        id: 1,
        name: 'Parent',
        children: [
          { id: 11, name: 'Child1' },
          { id: 12, name: 'Child2' }
        ]
      },
      { id: 2, name: 'Leaf' }
    ]

    it('should flatten visible expanded nodes', () => {
      const expanded = new Set<string | number>([1])
      const flat = flattenTreeData(treeData as any, 'children', expanded, 'id')
      expect(flat).toHaveLength(4) // Parent + 2 children + Leaf
      expect(flat[0]._level).toBe(0)
      expect(flat[1]._level).toBe(1)
    })
    it('should not show children when not expanded', () => {
      const expanded = new Set<string | number>()
      const flat = flattenTreeData(treeData as any, 'children', expanded, 'id')
      expect(flat).toHaveLength(2)
    })
    it('should mark leaf nodes correctly', () => {
      const expanded = new Set<string | number>([1])
      const flat = flattenTreeData(treeData as any, 'children', expanded, 'id')
      expect(flat[0]._hasChildren).toBe(true)
      expect(flat[0]._isLeaf).toBe(false)
      expect(flat[1]._isLeaf).toBe(true)
    })
    it('should support function rowKey', () => {
      const expanded = new Set<string | number>([1])
      const flat = flattenTreeData(treeData as any, 'children', expanded, (row) => row.id as number)
      expect(flat).toHaveLength(4)
    })
  })

  // ======================== getAllTreeKeys ========================
  describe('getAllTreeKeys', () => {
    it('should get all tree node keys recursively', () => {
      const data = [{ id: 1, children: [{ id: 11 }, { id: 12 }] }, { id: 2 }]
      const keys = getAllTreeKeys(data as any, 'children', 'id')
      expect(keys).toEqual([1, 11, 12, 2])
    })
  })

  // ======================== formatSize ========================
  describe('formatSize', () => {
    it('should return empty string for undefined', () => {
      expect(formatSize(undefined)).toBe('')
    })
    it('should append px for numbers', () => {
      expect(formatSize(100)).toBe('100px')
    })
    it('should append px for pure numeric strings', () => {
      expect(formatSize('200')).toBe('200px')
    })
    it('should return string as-is when has unit', () => {
      expect(formatSize('50%')).toBe('50%')
      expect(formatSize('100px')).toBe('100px')
    })
  })

  // ======================== calculateSpan ========================
  describe('calculateSpan', () => {
    const col: TableColumn = { prop: 'a', label: 'A' }
    const row = { a: 1 }

    it('should return default span when no spanMethod', () => {
      expect(calculateSpan(row, col, 0, 0)).toEqual({ rowspan: 1, colspan: 1 })
    })
    it('should handle array return from spanMethod', () => {
      const result = calculateSpan(row, col, 0, 0, () => [2, 3] as [number, number])
      expect(result).toEqual({ rowspan: 2, colspan: 3 })
    })
    it('should handle object return from spanMethod', () => {
      const result = calculateSpan(row, col, 0, 0, () => ({ rowspan: 3, colspan: 1 }))
      expect(result).toEqual({ rowspan: 3, colspan: 1 })
    })
    it('should use default when spanMethod returns void', () => {
      const result = calculateSpan(row, col, 0, 0, () => undefined)
      expect(result).toEqual({ rowspan: 1, colspan: 1 })
    })
  })

  // ======================== throttle ========================
  describe('throttle', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })
    afterEach(() => {
      vi.useRealTimers()
    })

    it('should call function immediately on first invocation', () => {
      const fn = vi.fn()
      const throttled = throttle(fn, 100)
      throttled()
      expect(fn).toHaveBeenCalledTimes(1)
    })
    it('should not call again within delay', () => {
      const fn = vi.fn()
      const throttled = throttle(fn, 100)
      throttled()
      throttled()
      throttled()
      expect(fn).toHaveBeenCalledTimes(1)
    })
    it('should call again after delay', () => {
      const fn = vi.fn()
      const throttled = throttle(fn, 100)
      throttled()
      vi.advanceTimersByTime(150)
      throttled()
      expect(fn).toHaveBeenCalledTimes(2)
    })
  })

  // ======================== debounce ========================
  describe('debounce', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })
    afterEach(() => {
      vi.useRealTimers()
    })

    it('should delay function invocation', () => {
      const fn = vi.fn()
      const debounced = debounce(fn, 100)
      debounced()
      debounced()
      debounced()
      expect(fn).not.toHaveBeenCalled()
      vi.advanceTimersByTime(100)
      expect(fn).toHaveBeenCalledTimes(1)
    })
    it('should reset delay on repeated calls', () => {
      const fn = vi.fn()
      const debounced = debounce(fn, 100)
      debounced()
      vi.advanceTimersByTime(50)
      debounced()
      vi.advanceTimersByTime(50)
      expect(fn).not.toHaveBeenCalled()
      vi.advanceTimersByTime(50)
      expect(fn).toHaveBeenCalledTimes(1)
    })
  })

  // ======================== deepClone ========================
  describe('deepClone', () => {
    it('should clone primitives', () => {
      expect(deepClone(42)).toBe(42)
      expect(deepClone('hello')).toBe('hello')
      expect(deepClone(null)).toBeNull()
    })
    it('should deep clone arrays', () => {
      const arr: (number | number[])[] = [1, [2, 3]]
      const cloned = deepClone(arr)
      expect(cloned).toEqual(arr)
      ;(cloned[1] as number[])[0] = 999
      expect((arr[1] as number[])[0]).toBe(2)
    })
    it('should deep clone objects', () => {
      const obj = { a: 1, b: { c: 2 } }
      const cloned = deepClone(obj)
      cloned.b.c = 999
      expect(obj.b.c).toBe(2)
    })
  })

  // ======================== isEmpty ========================
  describe('isEmpty', () => {
    it('should identify empty values', () => {
      expect(isEmpty(null)).toBe(true)
      expect(isEmpty(undefined)).toBe(true)
      expect(isEmpty('')).toBe(true)
      expect(isEmpty('  ')).toBe(true)
      expect(isEmpty([])).toBe(true)
      expect(isEmpty({})).toBe(true)
    })
    it('should identify non-empty values', () => {
      expect(isEmpty('a')).toBe(false)
      expect(isEmpty([1])).toBe(false)
      expect(isEmpty({ a: 1 })).toBe(false)
      expect(isEmpty(0)).toBe(false)
    })
  })

  // ======================== generateId ========================
  describe('generateId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateId()
      const id2 = generateId()
      expect(id1).toMatch(/^yh-table-/)
      expect(id1).not.toBe(id2)
    })
  })

  // ======================== formatCellValue ========================
  describe('formatCellValue', () => {
    it('should return empty string for missing prop', () => {
      expect(formatCellValue({ a: 1 }, { label: 'Test' }, 0)).toBe('')
    })
    it('should format with formatter function', () => {
      const col: TableColumn = {
        prop: 'age',
        label: 'Age',
        formatter: (row, col, val) => `${val}岁`
      }
      expect(formatCellValue({ age: 25 }, col, 0)).toBe('25岁')
    })
    it('should return empty string for null/undefined value', () => {
      expect(formatCellValue({ age: null }, { prop: 'age', label: 'Age' }, 0)).toBe('')
      expect(formatCellValue({ age: undefined }, { prop: 'age', label: 'Age' }, 0)).toBe('')
    })
    it('should stringify value as default', () => {
      expect(formatCellValue({ count: 42 }, { prop: 'count', label: 'Count' }, 0)).toBe('42')
    })
  })

  // ======================== getFixedStyle ========================
  describe('getFixedStyle', () => {
    const columns: TableColumn[] = [
      { prop: 'a', label: 'A', fixed: 'left', width: 100 },
      { prop: 'b', label: 'B', fixed: 'left', width: 80 },
      { prop: 'c', label: 'C' },
      { prop: 'd', label: 'D', fixed: 'right', width: 90 }
    ]

    it('should compute left offset for left-fixed column', () => {
      const style = getFixedStyle(columns[1], columns, 'left')
      expect(style.left).toBe('100px') // a=100px precedes b
    })
    it('should compute right offset for right-fixed column', () => {
      const style = getFixedStyle(columns[3], columns, 'right')
      expect(style.right).toBe('0px')
    })
    it('should return empty when column not found', () => {
      const notFound: TableColumn = { prop: 'z', label: 'Z' }
      expect(getFixedStyle(notFound, columns, 'left')).toEqual({})
    })
  })

  // ======================== exportToCSV ========================
  describe('exportToCSV', () => {
    it('should trigger download', () => {
      const createElementSpy = vi.spyOn(document, 'createElement')
      const clickMock = vi.fn()
      const linkMock = {
        href: '',
        download: '',
        click: clickMock
      } as unknown as HTMLAnchorElement
      createElementSpy.mockReturnValue(linkMock)
      vi.stubGlobal('URL', {
        createObjectURL: vi.fn().mockReturnValue('blob:url'),
        revokeObjectURL: vi.fn()
      })

      exportToCSV(
        [
          { name: 'Alice', age: 25 },
          { name: 'Bob, Jr.', age: 30 }
        ],
        [
          { prop: 'name', label: '姓名' },
          { prop: 'age', label: '年龄' }
        ],
        'test-export'
      )

      expect(clickMock).toHaveBeenCalled()
      expect(linkMock.download).toBe('test-export.csv')
      vi.restoreAllMocks()
    })

    it('should skip hidden columns (visible=false)', () => {
      const createElementSpy = vi.spyOn(document, 'createElement')
      const clickMock = vi.fn()
      const linkMock = { href: '', download: '', click: clickMock } as unknown as HTMLAnchorElement
      createElementSpy.mockReturnValue(linkMock)
      vi.stubGlobal('URL', {
        createObjectURL: vi.fn().mockReturnValue('blob:url'),
        revokeObjectURL: vi.fn()
      })

      exportToCSV(
        [{ name: 'Alice', age: 25 }],
        [
          { prop: 'name', label: '姓名' },
          { prop: 'age', label: '年龄', visible: false }
        ]
      )
      expect(clickMock).toHaveBeenCalled()
      vi.restoreAllMocks()
    })
  })
})
