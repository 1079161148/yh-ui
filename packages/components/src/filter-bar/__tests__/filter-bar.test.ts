import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FilterBar from '../src/filter-bar.vue'

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
})
