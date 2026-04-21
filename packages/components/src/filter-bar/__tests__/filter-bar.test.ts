import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import FilterBar from '../src/filter-bar.vue'
import { YhConfigProvider } from '../../config-provider'
import { en } from '@yh-ui/locale'

describe('FilterBar', () => {
  const props = {
    sorts: [{ key: 'price', label: 'Price' }],
    filters: [{ key: 'brand', label: 'Brand', options: [{ label: 'Apply', value: 'apply' }] }]
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

  it('triggers filter open and close', async () => {
    const wrapper = mount(FilterBar, { props })
    const filterTabs = wrapper.findAll('.yh-filter-bar__filter-tab')
    await filterTabs[0].trigger('click')
    // Wait for the panel to open
    const panel = wrapper.find('.yh-filter-bar__panel-title')
    expect(panel.exists()).toBe(true)
    expect(panel.text()).toBe('Brand')
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
    expect(wrapper.emitted('update:filterValue')).toBeTruthy()
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
})
