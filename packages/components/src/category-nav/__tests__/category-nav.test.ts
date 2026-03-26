import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CategoryNav from '../src/category-nav.vue'

describe('CategoryNav', () => {
  const props = {
    modelValue: '1',
    categories: [
      { id: '1', name: '电子产品', children: [{ id: '1-1', name: '手机' }] },
      { id: '2', name: '服饰', children: [{ id: '2-1', name: '女装' }] }
    ]
  }

  it('renders correctly', () => {
    const wrapper = mount(CategoryNav, { props })
    expect(wrapper.text()).toContain('电子产品')
    expect(wrapper.text()).toContain('服饰')
    expect(wrapper.text()).toContain('手机')
    expect(wrapper.text()).toContain('女装')
  })

  it('triggers category click', async () => {
    const wrapper = mount(CategoryNav, { props })
    const items = wrapper.findAll('.yh-category-nav__side-item')
    // Click on item 2 (index 2 because index 0 is "All")
    await items[2].trigger('click')
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['2'])
    expect(wrapper.emitted('categoryClick')![0][0].id).toBe('2')
  })

  it('triggers sub category click', async () => {
    const wrapper = mount(CategoryNav, { props })
    const subItems = wrapper.findAll('.yh-category-nav__sub-item')
    await subItems[0].trigger('click')
    expect(wrapper.emitted('update:subValue')![0]).toEqual(['1-1'])
    expect(wrapper.emitted('subCategoryClick')![0][0].id).toBe('1-1')
  })
})
