/**
 * @vitest-environment node
 */
import { renderToString } from '@vue/server-renderer'
import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import YhDropdown from '../src/dropdown.vue'

describe('YhDropdown SSR', () => {
  it('should render trigger on server', async () => {
    const html = await renderToString(
      h(
        YhDropdown,
        {
          items: [{ key: 'edit', label: '编辑' }]
        },
        {
          default: () => h('span', 'Dropdown Trigger')
        }
      )
    )

    expect(html).toContain('yh-dropdown')
    expect(html).toContain('Dropdown Trigger')
  })

  it('should not render menu on server by default', async () => {
    const html = await renderToString(
      h(
        YhDropdown,
        {
          items: [{ key: 'edit', label: '编辑' }]
        },
        {
          default: () => h('button', 'Click')
        }
      )
    )

    expect(html).toContain('yh-dropdown')
    // 默认不展开，菜单不应该被渲染
    expect(html).not.toContain('yh-dropdown__menu')
  })

  it('should render with showArrow prop', async () => {
    const html = await renderToString(
      h(
        YhDropdown,
        {
          showArrow: true
        },
        {
          default: () => h('span', 'Trigger')
        }
      )
    )

    expect(html).toContain('yh-dropdown__icon')
  })

  it('should render without arrow when showArrow is false', async () => {
    const html = await renderToString(
      h(
        YhDropdown,
        {
          showArrow: false
        },
        {
          default: () => h('span', 'Trigger')
        }
      )
    )

    // 没有箭头
    expect(html).not.toContain('yh-dropdown__icon')
  })
})
