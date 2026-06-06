/**
 * @vitest-environment node
 */
import { renderToString } from '@vue/server-renderer'
import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import YhMenu from '../src/menu.vue'
import YhMenuItem from '../src/menu-item.vue'
import YhMenuItemGroup from '../src/menu-item-group.vue'
import YhSubMenu from '../src/sub-menu.vue'

describe('YhMenu SSR', () => {
  it('should render vertical menu on server', async () => {
    const html = await renderToString(
      h(
        YhMenu,
        {
          mode: 'vertical'
        },
        {
          default: () => [
            h(YhMenuItem, { index: '1' }, () => 'Menu 1'),
            h(YhMenuItem, { index: '2' }, () => 'Menu 2')
          ]
        }
      )
    )

    expect(html).toContain('yh-menu')
    expect(html).toContain('yh-menu--vertical')
    expect(html).toContain('Menu 1')
    expect(html).toContain('Menu 2')
  })

  it('should render horizontal menu on server', async () => {
    const html = await renderToString(
      h(
        YhMenu,
        {
          mode: 'horizontal'
        },
        {
          default: () => [
            h(YhMenuItem, { index: '1' }, () => 'Home'),
            h(YhMenuItem, { index: '2' }, () => 'About')
          ]
        }
      )
    )

    expect(html).toContain('yh-menu--horizontal')
    expect(html).toContain('Home')
    expect(html).toContain('About')
  })

  it('should render active menu item on server', async () => {
    const html = await renderToString(
      h(
        YhMenu,
        {
          defaultActive: '2'
        },
        {
          default: () => [
            h(YhMenuItem, { index: '1' }, () => 'Menu 1'),
            h(YhMenuItem, { index: '2' }, () => 'Menu 2')
          ]
        }
      )
    )

    expect(html).toContain('yh-menu-item')
    expect(html).toContain('is-active')
  })

  it('should render menu item group on server', async () => {
    const html = await renderToString(
      h(
        YhMenu,
        {},
        {
          default: () => [
            h(
              YhMenuItemGroup,
              { title: 'Group 1' },
              {
                default: () => h(YhMenuItem, { index: '1' }, () => 'Menu 1')
              }
            )
          ]
        }
      )
    )

    expect(html).toContain('yh-menu-item-group')
    expect(html).toContain('Group 1')
  })

  it('should render collapsed menu on server', async () => {
    const html = await renderToString(
      h(
        YhMenu,
        {
          mode: 'vertical',
          collapse: true
        },
        {
          default: () => [h(YhMenuItem, { index: '1' }, () => 'Menu 1')]
        }
      )
    )

    expect(html).toContain('yh-menu--collapse')
  })

  it('should render sub-menu on server', async () => {
    const html = await renderToString(
      h(
        YhMenu,
        {},
        {
          default: () => [
            h(
              YhSubMenu,
              { index: 'sub1' },
              {
                title: () => 'Docs',
                default: () => h(YhMenuItem, { index: '1' }, () => 'Guide')
              }
            )
          ]
        }
      )
    )

    expect(html).toContain('yh-sub-menu')
    expect(html).toContain('Docs')
  })

  it('should render options-driven menu on server', async () => {
    const html = await renderToString(
      h(YhMenu, {
        options: [
          {
            index: 'docs',
            label: 'Docs',
            children: [{ index: 'guide', label: 'Guide' }]
          }
        ]
      })
    )

    expect(html).toContain('yh-menu')
    expect(html).toContain('Docs')
  })
})
