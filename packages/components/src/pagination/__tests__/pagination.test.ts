import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { YhPagination } from '../index'

describe('Pagination', () => {
  const globalOptions = {
    stubs: {
      'yh-input': true,
      'yh-select': true,
      'yh-option': true
    }
  }

  it('should render correctly', () => {
    const wrapper = mount(YhPagination, {
      global: globalOptions,
      props: {
        total: 50
      }
    })
    expect(wrapper.find('.yh-pagination').exists()).toBe(true)
    expect(wrapper.findAll('.yh-pagination__item').length).toBe(5) // 1, 2, 3, 4, 5
  })

  it('should handle page change', async () => {
    const wrapper = mount(YhPagination, {
      global: globalOptions,
      props: {
        total: 100,
        currentPage: 1
      }
    })
    const items = wrapper.findAll('.yh-pagination__item')
    await items[2].trigger('click') // Click page 3
    expect(wrapper.emitted('current-change')?.[0]).toEqual([3])
    expect(wrapper.emitted('update:currentPage')?.[0]).toEqual([3])
  })

  it('should handle prev and next clicks', async () => {
    const wrapper = mount(YhPagination, {
      global: globalOptions,
      props: {
        total: 50,
        currentPage: 2
      }
    })
    await wrapper.find('.yh-pagination__prev').trigger('click')
    expect(wrapper.emitted('current-change')?.[0]).toEqual([1])

    await wrapper.find('.yh-pagination__next').trigger('click')
    expect(wrapper.emitted('current-change')?.[1]).toEqual([2])
  })

  it('should be disabled', async () => {
    const wrapper = mount(YhPagination, {
      global: globalOptions,
      props: {
        total: 50,
        disabled: true
      }
    })
    expect(wrapper.classes()).toContain('is-disabled')
    const item = wrapper.find('.yh-pagination__item:not(.is-active)')
    await item.trigger('click')
    expect(wrapper.emitted('current-change')).toBeUndefined()
  })

  it('should support small size', () => {
    const wrapper = mount(YhPagination, {
      global: globalOptions,
      props: {
        total: 50,
        small: true
      }
    })
    expect(wrapper.classes()).toContain('is-small')
  })

  it('should support background', () => {
    const wrapper = mount(YhPagination, {
      global: globalOptions,
      props: {
        total: 50,
        background: true
      }
    })
    expect(wrapper.classes()).toContain('is-background')
  })

  it('should support custom layout', async () => {
    const wrapper = mount(YhPagination, {
      global: globalOptions,
      props: {
        total: 100,
        layout: 'total, sizes, prev, pager, next, jumper'
      }
    })
    expect(wrapper.find('.yh-pagination__total').exists()).toBe(true)
    expect(wrapper.find('.yh-pagination__sizes').exists()).toBe(true)
    expect(wrapper.find('.yh-pagination__jumper').exists()).toBe(true)
    expect(wrapper.find('.yh-pagination__total').text()).toContain('100')
  })

  it('should handle size change', async () => {
    const wrapper = mount(YhPagination, {
      global: globalOptions,
      props: {
        total: 100,
        layout: 'sizes',
        pageSizes: [10, 20, 50]
      }
    })
    const select = wrapper.getComponent('yh-select-stub') as any
    await select.vm.$emit('update:modelValue', 20)
    expect(wrapper.emitted('size-change')?.[0]).toEqual([20])
    expect(wrapper.emitted('update:pageSize')?.[0]).toEqual([20])
  })

  it('should handle jump', async () => {
    const wrapper = mount(YhPagination, {
      global: globalOptions,
      props: {
        total: 100,
        layout: 'jumper'
      }
    })
    const input = wrapper.getComponent('yh-input-stub') as any
    await input.vm.$emit('update:modelValue', 5)
    await input.trigger('keyup', { key: 'Enter' })
    expect(wrapper.emitted('current-change')?.[0]).toEqual([5])
  })

  it('should hide when total is 0 and hideOnSinglePage is true', () => {
    const wrapper = mount(YhPagination, {
      global: globalOptions,
      props: {
        total: 0,
        hideOnSinglePage: true
      }
    })
    expect(wrapper.find('.yh-pagination').exists()).toBe(false)
  })
})
