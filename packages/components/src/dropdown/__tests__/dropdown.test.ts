import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, h } from 'vue'
import { YhDropdown, YhDropdownItem, YhDropdownMenu } from '../index'
import { YhButton } from '../../button'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

describe('Dropdown', () => {
  const globalConfig = {
    components: {
      YhButton,
      YhDropdownItem,
      YhDropdownMenu
    }
  }

  it('should render correctly', () => {
    const wrapper = mount(YhDropdown, {
      props: {
        items: [
          { key: 'edit', label: '编辑' },
          { key: 'delete', label: '删除' }
        ]
      },
      slots: {
        default: () => h('span', 'Dropdown')
      },
      global: globalConfig
    })

    expect(wrapper.find('.yh-dropdown').exists()).toBe(true)
    expect(wrapper.find('.yh-dropdown__trigger').text()).toContain('Dropdown')
  })

  it('should show dropdown menu on click', async () => {
    const wrapper = mount(YhDropdown, {
      props: {
        trigger: 'click',
        teleported: false,
        items: [{ key: 'edit', label: '编辑' }]
      },
      slots: {
        default: () => h('span', { id: 'trigger' }, 'Click me')
      },
      global: globalConfig
    })

    await wrapper.find('.yh-dropdown__trigger').trigger('click')
    await nextTick()
    await wait(50)

    expect(wrapper.find('.yh-dropdown__menu').exists()).toBe(true)
  })

  it('should emit command on menu item click', async () => {
    const wrapper = mount(YhDropdown, {
      props: {
        trigger: 'click',
        teleported: false,
        items: [
          { key: 'edit', label: '编辑' },
          { key: 'delete', label: '删除' }
        ]
      },
      slots: {
        default: () => h('span', 'Dropdown')
      },
      global: globalConfig
    })

    // 打开菜单
    await wrapper.find('.yh-dropdown__trigger').trigger('click')
    await nextTick()
    await wait(50)

    // 点击菜单项
    const menuItems = wrapper.findAll('.yh-dropdown__item')
    await menuItems[0].trigger('click')

    expect(wrapper.emitted('command')).toBeTruthy()
    expect(wrapper.emitted('command')![0]).toEqual(['edit'])
  })

  it('should support disabled items', async () => {
    const wrapper = mount(YhDropdown, {
      props: {
        trigger: 'click',
        teleported: false,
        items: [{ key: 'edit', label: '编辑', disabled: true }]
      },
      slots: {
        default: () => h('span', 'Dropdown')
      },
      global: globalConfig
    })

    await wrapper.find('.yh-dropdown__trigger').trigger('click')
    await nextTick()
    await wait(50)

    const item = wrapper.find('.yh-dropdown__item')
    expect(item.classes()).toContain('is-disabled')
  })

  it('should support divider', async () => {
    const wrapper = mount(YhDropdown, {
      props: {
        trigger: 'click',
        teleported: false,
        items: [
          { key: 'edit', label: '编辑' },
          { key: 'delete', label: '删除', divided: true }
        ]
      },
      slots: {
        default: () => h('span', 'Dropdown')
      },
      global: globalConfig
    })

    await wrapper.find('.yh-dropdown__trigger').trigger('click')
    await nextTick()
    await wait(50)

    expect(wrapper.find('.yh-dropdown__divider').exists()).toBe(true)
  })

  it('should hide menu after click when hideOnClick is true', async () => {
    const wrapper = mount(YhDropdown, {
      props: {
        trigger: 'click',
        teleported: false,
        hideOnClick: true,
        items: [{ key: 'edit', label: '编辑' }]
      },
      slots: {
        default: () => h('span', 'Dropdown')
      },
      global: globalConfig
    })

    // 打开菜单
    await wrapper.find('.yh-dropdown__trigger').trigger('click')
    await nextTick()
    await wait(50)

    // 点击菜单项
    await wrapper.find('.yh-dropdown__item').trigger('click')
    await nextTick()
  })

  it('should expose show and hide methods', () => {
    const wrapper = mount(YhDropdown, {
      slots: {
        default: () => h('span', 'Dropdown')
      },
      global: globalConfig
    })

    expect(typeof wrapper.vm.show).toBe('function')
    expect(typeof wrapper.vm.hide).toBe('function')
    expect(wrapper.vm.visible).toBeDefined()
  })

  it('should support keyboard navigation', async () => {
    const wrapper = mount(YhDropdown, {
      props: {
        teleported: false
      },
      slots: {
        default: () => h('span', 'Dropdown')
      },
      global: globalConfig
    })

    await wrapper.find('.yh-dropdown').trigger('keydown', { key: 'Enter' })
    await nextTick()
  })

  it('should support danger items', async () => {
    const wrapper = mount(YhDropdown, {
      props: {
        trigger: 'click',
        teleported: false,
        items: [{ key: 'delete', label: '删除', danger: true }]
      },
      slots: {
        default: () => h('span', 'Dropdown')
      },
      global: globalConfig
    })

    await wrapper.find('.yh-dropdown__trigger').trigger('click')
    await nextTick()
    await wait(50)

    const item = wrapper.find('.yh-dropdown__item')
    expect(item.classes()).toContain('is-danger')
  })

  it('should support loading state', async () => {
    const wrapper = mount(YhDropdown, {
      props: {
        trigger: 'click',
        teleported: false,
        loading: true
      },
      slots: {
        default: () => h('span', 'Dropdown')
      },
      global: globalConfig
    })

    await wrapper.find('.yh-dropdown__trigger').trigger('click')
    await nextTick()
    await wait(50)

    expect(wrapper.find('.yh-dropdown__loading').exists()).toBe(true)
    expect(wrapper.find('.yh-dropdown__loading').text()).toContain('加载中...')
  })

  it('should support checkable mode', async () => {
    const wrapper = mount(YhDropdown, {
      props: {
        trigger: 'click',
        teleported: false,
        checkable: true,
        items: [{ key: 'opt1', label: '选项1', checked: true }]
      },
      slots: {
        default: () => h('span', 'Dropdown')
      },
      global: globalConfig
    })

    await wrapper.find('.yh-dropdown__trigger').trigger('click')
    await nextTick()
    await wait(50)

    const item = wrapper.find('.yh-dropdown__item')
    expect(item.classes()).toContain('is-checked')
    expect(item.find('.yh-dropdown__check-icon').exists()).toBe(true)
  })

  it('should show empty state when no items and no slot', async () => {
    const wrapper = mount(YhDropdown, {
      props: {
        trigger: 'click',
        teleported: false,
        items: [],
        emptyText: 'No Data'
      },
      slots: {
        default: () => h('span', 'Dropdown')
      },
      global: globalConfig
    })

    await wrapper.find('.yh-dropdown__trigger').trigger('click')
    await nextTick()
    await wait(50)

    expect(wrapper.find('.yh-dropdown__empty').exists()).toBe(true)
    expect(wrapper.find('.yh-dropdown__empty').text()).toBe('No Data')
  })

  it('should not show empty state when dropdown slot is provided', async () => {
    const wrapper = mount(YhDropdown, {
      props: {
        trigger: 'click',
        teleported: false,
        items: [] // 虽然 items 为空
      },
      slots: {
        default: () => h('span', 'Dropdown'),
        dropdown: () =>
          h(YhDropdownMenu, null, {
            default: () => [h(YhDropdownItem, { command: 'test' }, { default: () => 'Test Item' })]
          })
      },
      global: globalConfig
    })

    await wrapper.find('.yh-dropdown__trigger').trigger('click')
    await nextTick()
    await wait(50)

    // 不应该显示空状态
    expect(wrapper.find('.yh-dropdown__empty').exists()).toBe(false)
    // 应该显示插槽内容
    expect(wrapper.find('.yh-dropdown__item').exists()).toBe(true)
    expect(wrapper.find('.yh-dropdown__item').text()).toBe('Test Item')
  })
})
