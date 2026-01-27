import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, h } from 'vue'
import { YhPopover } from '../index'
import { YhButton } from '../../button'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

describe('Popover', () => {
  const globalConfig = {
    components: {
      YhButton
    }
  }

  it('should render basic content correctly', async () => {
    const wrapper = mount(YhPopover, {
      props: {
        title: 'Popover Title',
        content: 'Popover Content',
        teleported: false
      },
      slots: {
        default: () => h('button', { id: 'trigger' }, 'Click me')
      },
      global: globalConfig
    })

    const trigger = wrapper.find('#trigger')
    await trigger.trigger('click')
    await nextTick()
    await wait(50)

    const popper = wrapper.find('.yh-popover__popper')
    expect(popper.exists()).toBe(true)
    expect(popper.text()).toContain('Popover Title')
    expect(popper.text()).toContain('Popover Content')
  })

  it('should support slots for header and footer', async () => {
    const wrapper = mount(YhPopover, {
      props: {
        teleported: false
      },
      slots: {
        default: () => h('button', { id: 'trigger' }, 'Click me'),
        header: () => h('div', { class: 'custom-header' }, 'Header Slot'),
        footer: () => h('div', { class: 'custom-footer' }, 'Footer Slot')
      },
      global: globalConfig
    })

    await wrapper.find('#trigger').trigger('click')
    await nextTick()
    await wait(50)

    expect(wrapper.find('.custom-header').exists()).toBe(true)
    expect(wrapper.find('.custom-footer').exists()).toBe(true)
  })

  it('should handle different triggers', async () => {
    const wrapper = mount(YhPopover, {
      props: {
        trigger: 'hover',
        teleported: false,
        showAfter: 0
      },
      slots: {
        default: () => h('button', { id: 'trigger' }, 'Hover me'),
        content: () => 'Hover Content'
      },
      global: globalConfig
    })

    const trigger = wrapper.find('.yh-popover') // Popover root with integrated namespace
    await trigger.trigger('mouseenter')
    await nextTick()
    await wait(50)

    expect(wrapper.find('.yh-popover__popper').exists()).toBe(true)
  })

  it('should support width and scrollable content', async () => {
    const wrapper = mount(YhPopover, {
      props: {
        width: 300,
        maxHeight: 150,
        scrollable: true,
        teleported: false
      },
      slots: {
        default: () => h('button', { id: 'trigger' }, 'Click me')
      },
      global: globalConfig
    })

    await wrapper.find('#trigger').trigger('click')
    await nextTick()
    await wait(50)

    const contentDiv = wrapper.find('.yh-popover__content')
    const styles = contentDiv.attributes('style')
    expect(styles).toContain('width: 300px')
    expect(styles).toContain('max-height: 150px')
    expect(styles).toContain('overflow-y: auto')
  })
})
