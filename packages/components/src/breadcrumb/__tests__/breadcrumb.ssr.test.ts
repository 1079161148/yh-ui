/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest'
import { renderToString } from '@vue/server-renderer'
import { h } from 'vue'
import Breadcrumb from '../src/breadcrumb.vue'
import BreadcrumbItem from '../src/breadcrumb-item.vue'

describe('YhBreadcrumb SSR', () => {
  it('should render to string on server', async () => {
    const html = await renderToString(
      h(Breadcrumb, null, {
        default: () => [
          h(BreadcrumbItem, null, { default: () => 'Home' }),
          h(BreadcrumbItem, null, { default: () => 'Components' })
        ]
      })
    )
    expect(html).toContain('yh-breadcrumb')
    expect(html).toContain('Home')
    expect(html).toContain('yh-breadcrumb-item__separator')
  })
})
