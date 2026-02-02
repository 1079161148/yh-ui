import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, h, ref } from 'vue'
import { YhInfiniteScroll } from '../index'

describe('InfiniteScroll', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should render correctly', () => {
    const wrapper = mount(YhInfiniteScroll, {
      props: {
        loading: false,
        finished: false
      },
      slots: {
        default: () => h('div', { class: 'list-content' }, 'List Items')
      }
    })

    expect(wrapper.find('.yh-infinite-scroll').exists()).toBe(true)
    expect(wrapper.find('.list-content').text()).toBe('List Items')
  })

  it('should show loading state', () => {
    const wrapper = mount(YhInfiniteScroll, {
      props: {
        loading: true
      },
      slots: {
        default: () => h('div', 'Content')
      }
    })

    expect(wrapper.find('.yh-infinite-scroll__loading').exists()).toBe(true)
    expect(wrapper.text()).toContain('加载中...')
  })

  it('should show finished state', () => {
    const wrapper = mount(YhInfiniteScroll, {
      props: {
        finished: true
      },
      slots: {
        default: () => h('div', 'Content')
      }
    })

    expect(wrapper.find('.yh-infinite-scroll__finished').exists()).toBe(true)
    expect(wrapper.text()).toContain('没有更多了')
  })

  it('should show error state', () => {
    const wrapper = mount(YhInfiniteScroll, {
      props: {
        error: true
      },
      slots: {
        default: () => h('div', 'Content')
      }
    })

    expect(wrapper.find('.yh-infinite-scroll__error').exists()).toBe(true)
    expect(wrapper.text()).toContain('加载失败，点击重试')
  })

  it('should use custom loading text', () => {
    const wrapper = mount(YhInfiniteScroll, {
      props: {
        loading: true,
        loadingText: '正在加载数据...'
      },
      slots: {
        default: () => h('div', 'Content')
      }
    })

    expect(wrapper.text()).toContain('正在加载数据...')
  })

  it('should use custom finished text', () => {
    const wrapper = mount(YhInfiniteScroll, {
      props: {
        finished: true,
        finishedText: '已经到底啦'
      },
      slots: {
        default: () => h('div', 'Content')
      }
    })

    expect(wrapper.text()).toContain('已经到底啦')
  })

  it('should emit update:error on retry click', async () => {
    const wrapper = mount(YhInfiniteScroll, {
      props: {
        error: true
      },
      slots: {
        default: () => h('div', 'Content')
      }
    })

    await wrapper.find('.yh-infinite-scroll__error').trigger('click')

    expect(wrapper.emitted('update:error')).toBeTruthy()
    expect(wrapper.emitted('update:error')![0]).toEqual([false])
    expect(wrapper.emitted('load')).toBeTruthy()
  })

  it('should support horizontal direction', () => {
    const wrapper = mount(YhInfiniteScroll, {
      props: {
        direction: 'horizontal'
      },
      slots: {
        default: () => h('div', 'Content')
      }
    })

    expect(wrapper.find('.yh-infinite-scroll').classes()).toContain('is-horizontal')
  })

  it('should expose check and retry methods', () => {
    const wrapper = mount(YhInfiniteScroll, {
      slots: {
        default: () => h('div', 'Content')
      }
    })

    expect(typeof wrapper.vm.check).toBe('function')
    expect(typeof wrapper.vm.retry).toBe('function')
  })

  it('should support custom loading slot', () => {
    const wrapper = mount(YhInfiniteScroll, {
      props: {
        loading: true
      },
      slots: {
        default: () => h('div', 'Content'),
        loading: () => h('div', { class: 'custom-loading' }, '自定义加载')
      }
    })

    expect(wrapper.find('.custom-loading').exists()).toBe(true)
    expect(wrapper.text()).toContain('自定义加载')
  })
})
