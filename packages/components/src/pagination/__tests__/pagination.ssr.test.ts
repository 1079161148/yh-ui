import { describe, it, expect } from 'vitest'
import { renderToString } from '@vue/server-renderer'
import { createApp, h } from 'vue'
import { YhPagination } from '../index'
import { YhSelect, YhOption } from '../../select'
import { YhInput } from '../../input'

describe('Pagination SSR', () => {
  const createTestApp = (props: any) => {
    const app = createApp({
      render: () => h(YhPagination, props)
    })
    app.component('YhSelect', YhSelect)
    app.component('YhOption', YhOption)
    app.component('YhInput', YhInput)
    return app
  }

  it('should render correctly on server', async () => {
    const app = createTestApp({
      total: 100,
      currentPage: 1,
      layout: 'prev, pager, next, jumper, sizes, total'
    })
    const html = await renderToString(app)

    expect(html).toContain('yh-pagination')
    expect(html).toContain('yh-pagination__pager')
    expect(html).toContain('yh-pagination__jumper')
    expect(html).toContain('yh-pagination__total')
    expect(html).toContain('yh-pagination__sizes')
    expect(html).toContain('1')
  })

  it('should render circle style on server', async () => {
    const app = createTestApp({
      total: 50,
      circle: true
    })
    const html = await renderToString(app)
    expect(html).toContain('is-circle')
  })

  it('should render small and background styles on server', async () => {
    const app = createTestApp({
      total: 50,
      small: true,
      background: true
    })
    const html = await renderToString(app)
    expect(html).toContain('is-small')
    expect(html).toContain('is-background')
  })

  it('should render custom text on server', async () => {
    const app = createTestApp({
      total: 50,
      prevText: 'Previous',
      nextText: 'Next'
    })
    const html = await renderToString(app)
    expect(html).toContain('Previous')
    expect(html).toContain('Next')
  })
})
