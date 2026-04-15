import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import CategoryNav from '../src/category-nav.vue'
import { YhConfigProvider } from '../../config-provider'
import { en } from '@yh-ui/locale'

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

  it('uses config-provider locale text', async () => {
    const wrapper = mount(YhConfigProvider, {
      props: { locale: en },
      slots: {
        default: () => h(CategoryNav, { categories: props.categories, modelValue: '1' })
      }
    })

    await nextTick()
    expect(wrapper.text()).toContain('All')
  })

  it('applies theme overrides as inline css vars', () => {
    const wrapper = mount(CategoryNav, {
      props: {
        ...props,
        themeOverrides: {
          'side-active-color': '#13c2c2'
        }
      }
    })

    expect(wrapper.attributes('style')).toContain('--yh-category-nav-side-active-color: #13c2c2')
  })
})
