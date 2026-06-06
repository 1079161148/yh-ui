/**
 * @vitest-environment node
 */
import { renderToString } from '@vue/server-renderer'
import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import YhAffix from '../src/affix.vue'

describe('YhAffix SSR', () => {
  it('should render on server without errors', async () => {
    const html = await renderToString(
      h(
        YhAffix,
        {
          offset: 20,
          position: 'top'
        },
        {
          default: () => h('div', { class: 'affix-content' }, 'Affix Content')
        }
      )
    )

    expect(html).toContain('yh-affix')
    expect(html).toContain('affix-content')
    expect(html).toContain('Affix Content')
  })

  it('should render with bottom position on server', async () => {
    const html = await renderToString(
      h(
        YhAffix,
        {
          position: 'bottom',
          offset: 10
        },
        {
          default: () => h('button', 'Back to top')
        }
      )
    )

    expect(html).toContain('yh-affix')
    expect(html).toContain('Back to top')
  })

  it('should not have fixed state on server render', async () => {
    const html = await renderToString(
      h(
        YhAffix,
        {},
        {
          default: () => h('div', 'Content')
        }
      )
    )

    // 服务端不应该有固定状态的类
    expect(html).not.toContain('is-fixed')
  })
})
