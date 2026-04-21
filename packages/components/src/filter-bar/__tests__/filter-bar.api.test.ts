import { describe, it, expect } from 'vitest'
import { filterBarProps, filterBarEmits } from '../src/filter-bar'

describe('filter-bar.ts runtime API', () => {
  it('filterBarProps defaults are callable / serializable', () => {
    expect(filterBarProps.sorts.default()).toEqual([])
    expect(filterBarProps.filters.default()).toEqual([])
    expect(filterBarProps.sort.default()).toEqual({ key: null, order: null })
    expect(filterBarProps.filterValue.default()).toEqual({})
    expect(filterBarProps.themeOverrides.default()).toEqual({})
    expect(filterBarProps.viewType.default).toBe('list')
  })

  it('filterBarEmits validators accept valid payloads', () => {
    const e = filterBarEmits
    expect(e['update:sort']({ key: 'k', order: 'asc' })).toBe(true)
    expect(e['update:filterValue']({ a: 1 })).toBe(true)
    expect(e['update:viewType']('grid')).toBe(true)
    expect(e.sortChange({ key: null, order: null })).toBe(true)
    expect(e.filterChange({})).toBe(true)
    expect(e.viewChange('list')).toBe(true)
    expect(e.reset()).toBe(true)
    expect(e.confirm({ x: 1 })).toBe(true)
    expect(e.resetPanel({ key: 'k', label: 'L' }, {})).toBe(true)
    expect(e.openFilter()).toBe(true)
  })

  it('filterBarEmits rejects invalid update:viewType', () => {
    expect(filterBarEmits['update:viewType']('invalid' as 'list')).toBe(false)
  })
})
