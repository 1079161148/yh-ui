import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { YhPagination } from '../index'

describe('Pagination', () => {
  it('should render correctly', () => {
    const wrapper = mount(YhPagination, {
      props: {
        total: 50
      }
    })
    expect(wrapper.find('.yh-pagination').exists()).toBe(true)
    expect(wrapper.findAll('.yh-pagination__item').length).toBe(5) // 1, 2, 3, 4, 5
  })

  it('should handle page change', async () => {
    const wrapper = mount(YhPagination, {
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
      props: {
        total: 50,
        small: true
      }
    })
    expect(wrapper.classes()).toContain('is-small')
  })

  it('should support background', () => {
    const wrapper = mount(YhPagination, {
      props: {
        total: 50,
        background: true
      }
    })
    expect(wrapper.classes()).toContain('is-background')
  })
})
