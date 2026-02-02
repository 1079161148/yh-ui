/**
 * @vitest-environment node
 */
import { renderToString } from '@vue/server-renderer'
import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import YhInfiniteScroll from '../src/infinite-scroll.vue'

describe('YhInfiniteScroll SSR', () => {
  it('should render on server without errors', async () => {
    const html = await renderToString(
      h(
        YhInfiniteScroll,
        {
          loading: false,
          finished: false
        },
        {
          default: () => h('div', { class: 'list' }, 'List Items')
        }
      )
    )

    expect(html).toContain('yh-infinite-scroll')
    expect(html).toContain('List Items')
  })

  it('should render loading state on server', async () => {
    const html = await renderToString(
      h(
        YhInfiniteScroll,
        {
          loading: true,
          loadingText: '加载中...'
        },
        {
          default: () => h('div', 'Content')
        }
      )
    )

    expect(html).toContain('yh-infinite-scroll__loading')
    expect(html).toContain('加载中...')
  })

  it('should render finished state on server', async () => {
    const html = await renderToString(
      h(
        YhInfiniteScroll,
        {
          finished: true,
          finishedText: '没有更多了'
        },
        {
          default: () => h('div', 'Content')
        }
      )
    )

    expect(html).toContain('yh-infinite-scroll__finished')
    expect(html).toContain('没有更多了')
  })

  it('should render error state on server', async () => {
    const html = await renderToString(
      h(
        YhInfiniteScroll,
        {
          error: true,
          errorText: '加载失败'
        },
        {
          default: () => h('div', 'Content')
        }
      )
    )

    expect(html).toContain('yh-infinite-scroll__error')
    expect(html).toContain('加载失败')
  })

  it('should render horizontal direction on server', async () => {
    const html = await renderToString(
      h(
        YhInfiniteScroll,
        {
          direction: 'horizontal'
        },
        {
          default: () => h('div', 'Content')
        }
      )
    )

    expect(html).toContain('is-horizontal')
  })
})
