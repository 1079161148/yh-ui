import { describe, expect, it } from 'vitest'
import { aiBubbleListProps } from '../ai-bubble-list/src/ai-bubble-list'
import { aiArtifactsEmits, aiArtifactsProps } from '../ai-artifacts/src/ai-artifacts'
import { calendarEmits, calendarProps } from '../calendar/src/calendar'
import { drawerEmits, drawerProps } from '../drawer/src/drawer'
import { infiniteScrollEmits, infiniteScrollProps } from '../infinite-scroll/src/infinite-scroll'
import { imageViewerEmits, imageViewerProps } from '../image/src/image-viewer'
import { luckyDrawEmits, luckyDrawProps } from '../lucky-draw/src/lucky-draw'
import { skuSelectorEmits, skuSelectorProps } from '../sku-selector/src/sku-selector'
import { tableEmits, tableProps } from '../table/src/table'
import { treeEmits, treeProps } from '../tree/src/tree'

describe('props and emits coverage', () => {
  it('covers default factories in plain ts schemas', () => {
    expect(aiBubbleListProps.items.default()).toEqual([])
    expect(aiArtifactsProps.chartLoadingText.default).toBe('加载图表中...')
    expect(calendarProps.holidays.default()).toEqual({})
    expect(drawerProps.placement.default).toBe('right')
    expect(infiniteScrollProps.direction.default).toBe('vertical')
    expect(imageViewerProps.urlList.default()).toEqual([])
    expect(imageViewerProps.viewerOptions.default()).toEqual({})
    expect(luckyDrawProps.prizes.default()).toEqual([])
    expect(skuSelectorProps.themeOverrides.default()).toEqual({})
    expect(skuSelectorProps.skus.default()).toEqual([])
    expect(skuSelectorProps.modelValue.default()).toEqual([])
    expect(treeProps.data.default()).toEqual([])
    expect(treeProps.props.default()).toEqual({
      label: 'label',
      children: 'children',
      disabled: 'disabled'
    })
  })

  it('covers validator branches in props', () => {
    expect(calendarProps.firstDayOfWeek.validator(1)).toBe(true)
    expect(calendarProps.firstDayOfWeek.validator(7)).toBe(true)
    expect(calendarProps.firstDayOfWeek.validator(0)).toBe(false)
    expect(calendarProps.firstDayOfWeek.validator(8)).toBe(false)
  })

  it('covers calendar emits validators', () => {
    expect(calendarEmits['update:modelValue'](new Date())).toBe(true)
    expect(calendarEmits['update:modelValue']('bad' as never)).toBe(false)
    expect(calendarEmits['update:mode']('month')).toBe(true)
    expect(calendarEmits['update:mode']('bad' as never)).toBe(false)
    expect(calendarEmits['update:rangeValue']([undefined, undefined])).toBe(true)
    expect(calendarEmits['update:multipleValue']([])).toBe(true)
    expect(calendarEmits.change(new Date())).toBe(true)
    expect(calendarEmits.change('bad' as never)).toBe(false)
    expect(calendarEmits['panel-change'](new Date(), 'year')).toBe(true)
    expect(calendarEmits['panel-change']('bad' as never, 'year')).toBe(false)
    expect(calendarEmits.select(new Date(), {} as never)).toBe(true)
    expect(calendarEmits.select(new Date(), undefined as never)).toBe(false)
    expect(calendarEmits['range-change']([undefined, undefined])).toBe(true)
  })

  it('covers ai artifacts emits', () => {
    expect(aiArtifactsEmits['update:visible'](true)).toBe(true)
    expect(aiArtifactsEmits['update:mode']('preview')).toBe(true)
    expect(aiArtifactsEmits['version-change']({ version: 1, content: '' })).toBe(true)
    expect(aiArtifactsEmits['chart-click']({})).toBe(true)
    expect(aiArtifactsEmits['chart-ready']({})).toBe(true)
    expect(aiArtifactsEmits['chart-error'](new Error('x'))).toBe(true)
    expect(aiArtifactsEmits.close()).toBe(true)
  })

  it('covers lucky draw emits validators', () => {
    expect(luckyDrawEmits.start()).toBe(true)
    expect(luckyDrawEmits.finish({ id: 1, name: 'A' })).toBe(true)
    expect(luckyDrawEmits.finish(null as never)).toBe(false)
    expect(luckyDrawEmits.click(new MouseEvent('click'))).toBe(true)
    expect(luckyDrawEmits.click({} as never)).toBe(false)
  })

  it('covers drawer, infinite-scroll and sku-selector emits', () => {
    expect(drawerEmits['update:modelValue'](true)).toBe(true)
    expect(drawerEmits['update:modelValue']('x' as never)).toBe(false)
    expect(drawerEmits.open()).toBe(true)
    expect(drawerEmits.opened()).toBe(true)
    expect(drawerEmits.close()).toBe(true)
    expect(drawerEmits.closed()).toBe(true)
    expect(drawerEmits.resize(1)).toBe(true)
    expect(drawerEmits.resize('x' as never)).toBe(false)

    expect(infiniteScrollEmits.load()).toBe(true)
    expect(infiniteScrollEmits['update:loading'](true)).toBe(true)
    expect(infiniteScrollEmits['update:loading']('x' as never)).toBe(false)
    expect(infiniteScrollEmits['update:error'](false)).toBe(true)
    expect(infiniteScrollEmits['update:error']('x' as never)).toBe(false)

    expect(skuSelectorEmits['update:modelValue']([])).toBe(true)
    expect(skuSelectorEmits['update:modelValue']('x' as never)).toBe(false)
    expect(skuSelectorEmits.change(null, [])).toBe(true)
    expect(skuSelectorEmits.select({ id: 1, name: 'S', values: [] }, { id: 1, name: 'V' })).toBe(true)

    expect(imageViewerEmits.close()).toBe(true)
    expect(imageViewerEmits.switch(1)).toBe(true)
    expect(imageViewerEmits.switch('x' as never)).toBe(false)
  })

  it('covers tree emits and extra defaults', () => {
    const node = {
      key: '1',
      label: 'node',
      level: 1,
      parent: null,
      expanded: false,
      checked: false,
      indeterminate: false,
      visible: true,
      loading: false,
      loaded: true,
      rawData: { key: '1', label: 'node' }
    }
    const drag = new DragEvent('drag')

    expect(treeProps.defaultExpandedKeys.default()).toEqual([])
    expect(treeProps.defaultCheckedKeys.default()).toEqual([])
    expect(treeProps.virtual.default).toBe(false)

    expect(treeEmits['node-click'](node as never, new MouseEvent('click'))).toBe(true)
    expect(treeEmits['node-expand'](node as never, true)).toBe(true)
    expect(treeEmits.check(node as never, false, [])).toBe(true)
    expect(treeEmits['current-change'](null)).toBe(true)
    expect(treeEmits['node-drag-start'](node as never, drag)).toBe(true)
    expect(treeEmits['node-drag-end'](node as never, null, 'before', drag)).toBe(true)
    expect(treeEmits['node-drag-over'](node as never, drag)).toBe(true)
    expect(treeEmits['node-drag-enter'](node as never, drag)).toBe(true)
    expect(treeEmits['node-drag-leave'](node as never, drag)).toBe(true)
    expect(treeEmits['node-drop'](node as never, node as never, 'inner', drag)).toBe(true)
    expect(treeEmits['update:currentNodeKey'](undefined)).toBe(true)
  })

  it('covers table props defaults and table emits signatures', () => {
    expect(tableProps.data.default()).toEqual([])
    expect(tableProps.columns.default()).toEqual([])
    expect(tableProps.rowKey.default).toBe('id')
    expect(tableProps.size.default).toBe('default')
    expect(tableProps.border.default).toBe(false)
    expect(tableProps.pagination.default).toBe(false)
    expect(tableProps.loading.default).toBe(false)
    expect(tableProps.showHeader.default).toBe(true)
    expect(tableProps.fit.default).toBe(true)
    expect(tableProps.emptyText.default).toBe('')

    const row = { id: 1 }
    const column = { prop: 'id' }
    const mouse = new MouseEvent('click')
    const cell = document.createElement('td')

    expect(tableEmits['sort-change']({ column, prop: 'id', order: 'asc' })).toBe(true)
    expect(tableEmits['filter-change']({ id: [1] })).toBe(true)
    expect(tableEmits['page-change']({ currentPage: 1, pageSize: 20 })).toBe(true)
    expect(tableEmits['selection-change']([row], [1])).toBe(true)
    expect(tableEmits['current-change'](row, null)).toBe(true)
    expect(tableEmits['expand-change'](row, [row])).toBe(true)
    expect(tableEmits['row-click'](row, column, mouse)).toBe(true)
    expect(tableEmits['row-dblclick'](row, column, mouse)).toBe(true)
    expect(tableEmits['row-contextmenu'](row, column, mouse)).toBe(true)
    expect(tableEmits['cell-click'](row, column, cell, mouse)).toBe(true)
    expect(tableEmits['cell-dblclick'](row, column, cell, mouse)).toBe(true)
    expect(tableEmits['header-click'](column, mouse)).toBe(true)
    expect(tableEmits['header-contextmenu'](column, mouse)).toBe(true)
    expect(tableEmits['select-all']([row])).toBe(true)
    expect(tableEmits.select([row], row)).toBe(true)
    expect(tableEmits.scroll({ scrollTop: 1, scrollLeft: 2, isEnd: false })).toBe(true)
    expect(tableEmits['drag-end']({ type: 'row', oldIndex: 0, newIndex: 1, data: [row] })).toBe(true)
    expect(tableEmits['column-resize'](column, 120)).toBe(true)
    expect(tableEmits['column-visible-change']([column])).toBe(true)
    expect(tableEmits['update:data']([row])).toBe(true)
    expect(tableEmits['update:currentRowKey'](1)).toBe(true)
  })
})
