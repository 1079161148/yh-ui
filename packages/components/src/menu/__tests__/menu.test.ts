import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, h } from 'vue'
import { YhMenu, YhMenuItem, YhMenuItemGroup, YhSubMenu } from '../index'

describe('Menu', () => {
  const globalConfig = {
    components: {
      YhMenuItem,
      YhMenuItemGroup,
      YhSubMenu
    }
  }

  beforeEach(() => {
    vi.useFakeTimers()
  })

  it('should render vertical menu correctly', () => {
    const wrapper = mount(YhMenu, {
      props: { mode: 'vertical' },
      slots: {
        default: () => [
          h(YhMenuItem, { index: '1' }, () => '菜单项1'),
          h(YhMenuItem, { index: '2' }, () => '菜单项2')
        ]
      },
      global: globalConfig
    })
    expect(wrapper.classes()).toContain('yh-menu--vertical')
  })

  it('should support sub-menu interaction', async () => {
    const wrapper = mount(YhMenu, {
      props: { mode: 'vertical' },
      slots: {
        default: () => [
          h(
            YhSubMenu,
            { index: 'sub1', label: '子菜单1' },
            {
              default: () => [h(YhMenuItem, { index: 'sub1-1' }, () => '项1-1')]
            }
          )
        ]
      },
      global: globalConfig
    })

    const subMenuTitle = wrapper.find('.yh-sub-menu__title')
    expect(subMenuTitle.exists()).toBe(true)

    // Click to open
    await subMenuTitle.trigger('click')
    expect(wrapper.vm.openedMenus).toContain('sub1')

    // Check if sub-menu items are visible
    expect(wrapper.find('.yh-menu-item').isVisible()).toBe(true)

    // Click to close
    await subMenuTitle.trigger('click')
    expect(wrapper.vm.openedMenus).not.toContain('sub1')
  })

  it('should support hover trigger in horizontal mode', async () => {
    const wrapper = mount(YhMenu, {
      props: {
        mode: 'horizontal',
        menuTrigger: 'hover'
      },
      slots: {
        default: () => [
          h(
            YhSubMenu,
            { index: 'sub1', label: '子菜单1' },
            {
              default: () => [h(YhMenuItem, { index: 'sub1-1' }, () => '项1-1')]
            }
          )
        ]
      },
      global: globalConfig
    })

    const subMenu = wrapper.find('.yh-sub-menu')

    // Mouseenter
    await subMenu.trigger('mouseenter')
    vi.advanceTimersByTime(400) // Default showTimeout is 300
    await nextTick()
    expect(wrapper.vm.openedMenus).toContain('sub1')

    // Mouseleave
    await subMenu.trigger('mouseleave')
    vi.advanceTimersByTime(400) // Default hideTimeout is 300
    await nextTick()
    expect(wrapper.vm.openedMenus).not.toContain('sub1')
  })

  it('should calculate nested indentation', async () => {
    const wrapper = mount(YhMenu, {
      props: { mode: 'vertical', indent: 20 },
      slots: {
        default: () => [
          h(
            YhSubMenu,
            { index: 'sub1', label: 'Level 0' },
            {
              default: () => [
                h(
                  YhSubMenu,
                  { index: 'sub2', label: 'Level 1' },
                  {
                    default: () => [h(YhMenuItem, { index: 'item1' }, () => 'Level 2')]
                  }
                )
              ]
            }
          )
        ]
      },
      global: globalConfig
    })

    await wrapper.find('.yh-sub-menu__title').trigger('click')
    await nextTick()

    const sub2Title = wrapper.findAll('.yh-sub-menu__title')[1]
    const style = (sub2Title.element as HTMLElement).style
    // Level 1: 20 + 1 * 20 = 40px
    expect(style.paddingLeft).toBe('40px')

    const item1 = wrapper.find('.yh-menu-item')
    const itemStyle = (item1.element as HTMLElement).style
    // Item Level 2: 20 + 2 * 20 = 60px
    expect(itemStyle.paddingLeft).toBe('60px')
  })

  it('should support unique-opened', async () => {
    const wrapper = mount(YhMenu, {
      props: { uniqueOpened: true },
      slots: {
        default: () => [
          h(YhSubMenu, { index: 'sub1', label: 'Sub 1' }, () => []),
          h(YhSubMenu, { index: 'sub2', label: 'Sub 2' }, () => [])
        ]
      },
      global: globalConfig
    })

    const titles = wrapper.findAll('.yh-sub-menu__title')
    await titles[0].trigger('click')
    expect(wrapper.vm.openedMenus).toEqual(['sub1'])

    await titles[1].trigger('click')
    expect(wrapper.vm.openedMenus).toEqual(['sub2']) // sub1 should be closed
  })

  it('should support custom label rendering', () => {
    const renderLabel = vi.fn(({ label }) => `Custom ${label}`)
    const wrapper = mount(YhMenu, {
      props: { renderLabel },
      slots: {
        default: () => [h(YhMenuItem, { index: '1', label: 'Item' })]
      },
      global: globalConfig
    })
    expect(wrapper.find('.yh-menu-item').text()).toBe('Custom Item')
  })

  it('should handle router mode (event only)', async () => {
    const wrapper = mount(YhMenu, {
      props: { router: true },
      slots: {
        default: () => [h(YhMenuItem, { index: '/home' }, () => 'Home')]
      },
      global: globalConfig
    })

    await wrapper.find('.yh-menu-item').trigger('click')
    // Router logic usually just emits select or navigates.
    // We check if it still emits select.
    expect(wrapper.emitted('select')![0][0]).toBe('/home')
  })

  it('should support recursive rendering via options prop', () => {
    const options = [
      {
        index: 'sub1',
        label: 'Sub 1',
        children: [
          { index: 'sub1-1', label: 'Item 1-1' },
          {
            index: 'sub1-2',
            label: 'Sub 1-2',
            children: [{ index: 'sub1-2-1', label: 'Item 1-2-1' }]
          }
        ]
      },
      {
        group: true,
        label: 'Group 1',
        children: [{ index: 'g1-1', label: 'G Item 1' }]
      }
    ]

    const wrapper = mount(YhMenu, {
      props: { options },
      global: globalConfig
    })

    expect(wrapper.find('.yh-sub-menu').exists()).toBe(true)
    expect(wrapper.find('.yh-menu-item-group').exists()).toBe(true)
    // Check deep nested item
    // It might not be rendered yet if not opened, but let's check the recursive item components exist
    expect(wrapper.findAllComponents({ name: 'YhMenuRecursiveItem' }).length).toBeGreaterThan(0)
  })
})
