import { describe, it, expect, vi } from 'vitest'
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

  it('should render vertical menu correctly', () => {
    const wrapper = mount(YhMenu, {
      props: {
        mode: 'vertical'
      },
      slots: {
        default: () => [
          h(YhMenuItem, { index: '1' }, () => '菜单项1'),
          h(YhMenuItem, { index: '2' }, () => '菜单项2')
        ]
      },
      global: globalConfig
    })

    expect(wrapper.find('.yh-menu').exists()).toBe(true)
    expect(wrapper.find('.yh-menu--vertical').exists()).toBe(true)
  })

  it('should render horizontal menu correctly', () => {
    const wrapper = mount(YhMenu, {
      props: {
        mode: 'horizontal'
      },
      slots: {
        default: () => [h(YhMenuItem, { index: '1' }, () => '菜单项1')]
      },
      global: globalConfig
    })

    expect(wrapper.find('.yh-menu--horizontal').exists()).toBe(true)
  })

  it('should set active menu item', async () => {
    const wrapper = mount(YhMenu, {
      props: {
        defaultActive: '2'
      },
      slots: {
        default: () => [
          h(YhMenuItem, { index: '1' }, () => '菜单项1'),
          h(YhMenuItem, { index: '2' }, () => '菜单项2')
        ]
      },
      global: globalConfig
    })

    await nextTick()

    const items = wrapper.findAll('.yh-menu-item')
    expect(items[1].classes()).toContain('is-active')
  })

  it('should emit select event on menu item click', async () => {
    const wrapper = mount(YhMenu, {
      slots: {
        default: () => [
          h(YhMenuItem, { index: '1' }, () => '菜单项1'),
          h(YhMenuItem, { index: '2' }, () => '菜单项2')
        ]
      },
      global: globalConfig
    })

    await wrapper.find('.yh-menu-item').trigger('click')

    expect(wrapper.emitted('select')).toBeTruthy()
    expect(wrapper.emitted('select')![0][0]).toBe('1')
  })

  it('should support disabled menu item', async () => {
    const wrapper = mount(YhMenu, {
      slots: {
        default: () => [h(YhMenuItem, { index: '1', disabled: true }, () => '禁用项')]
      },
      global: globalConfig
    })

    const item = wrapper.find('.yh-menu-item')
    expect(item.classes()).toContain('is-disabled')
  })

  it('should support menu collapse', () => {
    const wrapper = mount(YhMenu, {
      props: {
        mode: 'vertical',
        collapse: true
      },
      slots: {
        default: () => [h(YhMenuItem, { index: '1' }, () => '菜单项1')]
      },
      global: globalConfig
    })

    expect(wrapper.find('.yh-menu--collapse').exists()).toBe(true)
  })

  it('should render menu item group', () => {
    const wrapper = mount(YhMenu, {
      slots: {
        default: () => [
          h(YhMenuItemGroup, { title: '分组1' }, () => [
            h(YhMenuItem, { index: '1' }, () => '菜单项1')
          ])
        ]
      },
      global: globalConfig
    })

    expect(wrapper.find('.yh-menu-item-group').exists()).toBe(true)
    expect(wrapper.find('.yh-menu-item-group__title').text()).toBe('分组1')
  })

  it('should expose open and close methods', () => {
    const wrapper = mount(YhMenu, {
      slots: {
        default: () => [h(YhMenuItem, { index: '1' }, () => '菜单项1')]
      },
      global: globalConfig
    })

    expect(typeof wrapper.vm.open).toBe('function')
    expect(typeof wrapper.vm.close).toBe('function')
    expect(wrapper.vm.activeIndex).toBeDefined()
    expect(wrapper.vm.openedMenus).toBeDefined()
  })

  it('should support custom colors', () => {
    const wrapper = mount(YhMenu, {
      props: {
        backgroundColor: '#304156',
        textColor: '#bfcbd9',
        activeTextColor: '#409EFF'
      },
      slots: {
        default: () => [h(YhMenuItem, { index: '1' }, () => '菜单项1')]
      },
      global: globalConfig
    })

    expect(wrapper.props('backgroundColor')).toBe('#304156')
    expect(wrapper.props('textColor')).toBe('#bfcbd9')
    expect(wrapper.props('activeTextColor')).toBe('#409EFF')
  })
})
