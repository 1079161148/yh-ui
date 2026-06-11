import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import FilterBar from '../src/filter-bar.vue'
import { YhConfigProvider } from '../../config-provider'
import { en } from '@yh-ui/locale'

describe('FilterBar', () => {
  const props = {
    sorts: [{ key: 'price', label: 'Price' }],
    filters: [{ key: 'brand', label: 'Brand', options: [{ label: 'Apply', value: 'apply' }] }],
    teleported: false
  }

  it('renders correctly', () => {
    const wrapper = mount(FilterBar, { props })
    expect(wrapper.text()).toContain('Price')
    expect(wrapper.text()).toContain('Brand')
  })

  it('triggers sort change', async () => {
    const wrapper = mount(FilterBar, { props })
    const sortTabs = wrapper.findAll('.yh-filter-bar__sort-tab')
    // Click on "Price" tab
    await sortTabs[0].trigger('click')
    expect(wrapper.emitted()).toHaveProperty('update:sort')
    expect(wrapper.emitted('update:sort')![0]).toEqual([{ key: 'price', order: 'desc' }])
  })

  it('cycles sort order from desc to asc to cleared', async () => {
    const wrapper = mount(FilterBar, { props })
    const sortTab = wrapper.find('.yh-filter-bar__sort-tab')

    await sortTab.trigger('click')
    await sortTab.trigger('click')
    await sortTab.trigger('click')

    expect(wrapper.emitted('update:sort')).toEqual([
      [{ key: 'price', order: 'desc' }],
      [{ key: 'price', order: 'asc' }],
      [{ key: null, order: null }]
    ])
  })

  it('triggers filter open and close', async () => {
    const wrapper = mount(FilterBar, { props })
    const filterTabs = wrapper.findAll('.yh-filter-bar__filter-tab')
    await filterTabs[0].trigger('click')
    // Wait for the panel to open
    const panel = wrapper.find('.yh-filter-bar__panel-title')
    expect(panel.exists()).toBe(true)
    expect(panel.text()).toBe('Brand')
  })

  it('confirms and resets panel checkbox filters', async () => {
    const wrapper = mount(FilterBar, {
      props: {
        ...props,
        filters: [
          {
            key: 'brand',
            label: 'Brand',
            type: 'checkbox',
            options: [
              { label: 'Apple', value: 'apple' },
              { label: 'Pear', value: 'pear' }
            ]
          }
        ]
      }
    })

    await wrapper.find('.yh-filter-bar__filter-tab').trigger('click')
    const options = wrapper.findAll('.yh-filter-bar__panel-opt')
    await options[0].trigger('click')
    await options[1].trigger('click')
    await options[0].trigger('click')
    await wrapper.find('.yh-filter-bar__btn-confirm').trigger('click')

    expect(wrapper.emitted('update:filterValue')?.[0]).toEqual([{ brand: ['pear'] }])
    expect(wrapper.emitted('filterChange')?.[0]).toEqual([{ brand: ['pear'] }])
    expect(wrapper.emitted('confirm')?.[0]).toEqual([{ brand: ['pear'] }])

    await wrapper.find('.yh-filter-bar__filter-tab').trigger('click')
    await wrapper.find('.yh-filter-bar__btn-reset').trigger('click')

    expect(wrapper.emitted('resetPanel')?.[0]?.[0]).toMatchObject({ key: 'brand' })
    expect(wrapper.emitted('update:filterValue')?.at(-1)).toEqual([{ brand: null }])
  })

  it('renders empty panel content and closes from overlay / close button', async () => {
    const wrapper = mount(FilterBar, {
      props: {
        ...props,
        sorts: [],
        filters: [{ key: 'stock', label: 'Stock' }]
      }
    })

    await wrapper.find('.yh-filter-bar__filter-tab').trigger('click')
    expect(wrapper.find('.yh-filter-bar__no-options').exists()).toBe(true)

    await wrapper.find('.yh-filter-bar__overlay').trigger('click')
    expect(wrapper.find('.yh-filter-bar__panel').exists()).toBe(false)

    await wrapper.find('.yh-filter-bar__filter-tab').trigger('click')
    await wrapper.find('.yh-filter-bar__panel-close').trigger('click')
    expect(wrapper.find('.yh-filter-bar__panel').exists()).toBe(false)
  })

  it('uses config-provider locale text', async () => {
    const wrapper = mount(YhConfigProvider, {
      props: { locale: en },
      slots: {
        default: () => h(FilterBar, { ...props, showAll: true })
      }
    })

    await nextTick()
    expect(wrapper.text()).toContain('All')
  })

  it('applies theme overrides as inline css vars', () => {
    const wrapper = mount(FilterBar, {
      props: {
        ...props,
        themeOverrides: {
          'tab-active-color': '#1677ff'
        }
      }
    })

    expect(wrapper.attributes('style')).toContain('--yh-filter-bar-tab-active-color: #1677ff')
  })

  it('toggles list/grid view', async () => {
    const wrapper = mount(FilterBar, {
      props: {
        ...props,
        showViewToggle: true,
        viewType: 'list'
      }
    })
    const btn = wrapper.find('.yh-filter-bar__view-btn')
    await btn.trigger('click')
    expect(wrapper.emitted('update:viewType')?.[0]).toEqual(['grid'])
    expect(wrapper.emitted('viewChange')?.[0]).toEqual(['grid'])
  })

  it('emits openFilter from global filter button', async () => {
    const wrapper = mount(FilterBar, { props })
    const globalBtn = wrapper.find('.yh-filter-bar__filter-btn')
    await globalBtn.trigger('click')
    expect(wrapper.emitted('openFilter')).toBeTruthy()
  })

  it('supports inline filters when filterInPanel is false', async () => {
    const wrapper = mount(FilterBar, {
      props: {
        ...props,
        filterInPanel: false
      }
    })
    const opt = wrapper.find('.yh-filter-bar__inline-opt')
    await opt.trigger('click')
    await opt.trigger('click')
    expect(wrapper.emitted('update:filterValue')).toEqual([[{ brand: 'apply' }], [{ brand: null }]])
  })

  it('tracks sticky state with IntersectionObserver', async () => {
    const callbacks: IntersectionObserverCallback[] = []
    const disconnect = vi.fn()
    const Original = global.IntersectionObserver

    // @ts-ignore
    global.IntersectionObserver = class {
      constructor(cb: IntersectionObserverCallback) {
        callbacks.push(cb)
      }
      observe = vi.fn()
      disconnect = disconnect
      unobserve = vi.fn()
      takeRecords = vi.fn(() => [])
      root = null
      rootMargin = ''
      thresholds = []
    }

    const wrapper = mount(FilterBar, {
      props: {
        ...props,
        sticky: true,
        stickyOffset: 12
      }
    })

    await nextTick()
    expect(callbacks.length).toBe(1)

    callbacks[0](
      [{ isIntersecting: false } as IntersectionObserverEntry],
      {} as IntersectionObserver
    )
    await nextTick()
    expect(wrapper.classes()).toContain('is-stuck')

    wrapper.unmount()
    expect(disconnect).toHaveBeenCalled()

    global.IntersectionObserver = Original
  })

  it('resets sort and filters via All tab', async () => {
    const wrapper = mount(FilterBar, {
      props: {
        sorts: props.sorts,
        filters: props.filters,
        sort: { key: 'price', order: 'asc' },
        filterValue: { brand: 'apply' },
        showAll: true
      }
    })
    const tabs = wrapper.findAll('.yh-filter-bar__tab')
    expect(tabs.length).toBeGreaterThan(0)
    await tabs[0].trigger('click')
    expect(wrapper.emitted('reset')).toBeTruthy()
  })

  it('teleports panel to body when teleported is true', async () => {
    const wrapper = mount(FilterBar, {
      props: {
        ...props,
        teleported: true
      }
    })
    await wrapper.find('.yh-filter-bar__filter-tab').trigger('click')
    expect(wrapper.find('.yh-filter-bar__panel').exists()).toBe(false)
    expect(document.body.querySelector('.yh-filter-bar__panel')).toBeTruthy()
  })
})
