import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref, nextTick, h } from 'vue'
import { YhTable, YhTableColumn } from '../index'

// Mock URL and Blob for download testing
if (typeof URL.createObjectURL === 'undefined') {
  Object.defineProperty(URL, 'createObjectURL', { value: vi.fn(() => 'blob:mock-url') })
  Object.defineProperty(URL, 'revokeObjectURL', { value: vi.fn() })
}

// Mock window.open for print testing
const mockWindowOpen = vi.fn().mockReturnValue({
  document: {
    write: vi.fn(),
    close: vi.fn()
  },
  print: vi.fn(),
  close: vi.fn(),
  onload: null
})
vi.stubGlobal('open', mockWindowOpen)

// Mock ResizeObserver
class MockResizeObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
}
// @ts-ignore
global.ResizeObserver = MockResizeObserver

describe('Table Advanced Features', () => {
  const mockData = Array.from({ length: 200 }).map((_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    age: 20 + (i % 30),
    email: `user${i + 1}@example.com`,
    active: i % 2 === 0
  }))

  const mockColumns = [
    { prop: 'id', label: 'ID', width: 60 },
    { prop: 'name', label: 'Name', width: 120 },
    { prop: 'age', label: 'Age', width: 80 },
    { prop: 'email', label: 'Email' },
    { prop: 'active', label: 'Active' }
  ]

  describe('Virtual Scroll', () => {
    it('should enable virtual scroll when data length > 100 and enabled', async () => {
      const wrapper = mount(YhTable, {
        props: {
          data: mockData,
          columns: mockColumns,
          virtualConfig: { enabled: true },
          height: 400
        },
        global: {
          stubs: {
            YhPagination: true,
            YhTooltip: true
          }
        }
      })

      const vm = wrapper.vm as any
      expect(vm.isVirtual).toBe(true)

      const rows = wrapper.findAll('.yh-table__row')
      expect(rows.length).toBeLessThan(mockData.length)
    })
  })

  describe('Data Export & Import', () => {
    it('should export data as CSV, JSON, HTML', async () => {
      const wrapper = mount(YhTable, {
        props: { data: mockData.slice(0, 5), columns: mockColumns }
      })
      const vm = wrapper.vm as any

      const csv = await vm.exportData({ type: 'csv', mode: 'string' })
      expect(csv).toContain('ID,Name,Age,Email,Active')
      expect(csv).toContain('\u662F')

      const json = await vm.exportData({ type: 'json', mode: 'string' })
      expect(JSON.parse(json)[0]['Name']).toBe('User 1')

      const html = await vm.exportData({ type: 'html', mode: 'string' })
      expect(html).toContain('<table')
    })

    it('should import data from JSON and CSV', async () => {
      const wrapper = mount(YhTable, {
        props: { data: [], columns: mockColumns }
      })
      const vm = wrapper.vm as any

      // JSON
      const jsonData = JSON.stringify([{ id: 999, name: 'Imported JSON' }])
      await vm.importData(jsonData, { type: 'json' })
      expect(wrapper.emitted('update:data')).toBeTruthy()

      // CSV
      const csvData = 'ID,Name\n1000,Imported CSV'
      await vm.importData(csvData, { type: 'csv' })
      expect(wrapper.emitted('update:data')!.length).toBeGreaterThan(1)
    })
  })

  describe('Print', () => {
    it('should support print and printMultiple', async () => {
      const wrapper = mount(YhTable, {
        props: { data: mockData.slice(0, 1), columns: mockColumns }
      })
      const vm = wrapper.vm as any
      await vm.print({ title: 'Print Test' })
      expect(mockWindowOpen).toHaveBeenCalled()

      await vm.printMultiple([{ title: 'Multiple', data: [{ id: 1 }], columns: [{ prop: 'id' }] }])
      expect(mockWindowOpen).toHaveBeenCalledTimes(2)
    })
  })

  describe('TableColumn component', () => {
    it('should collect columns from slots', async () => {
      const wrapper = mount(YhTable, {
        props: { data: mockData.slice(0, 5) },
        slots: {
          default: () => [
            h(YhTableColumn, { prop: 'id', label: 'ID' }),
            h(YhTableColumn, { prop: 'name', label: 'Name' })
          ]
        }
      })

      await nextTick()
      await nextTick()

      expect(wrapper.findAll('.yh-table__header-cell').length).toBe(2)
      expect(wrapper.find('.yh-table__header-cell').text()).toBe('ID')
    })
  })
})
