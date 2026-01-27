import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, h } from 'vue'
import { YhPopconfirm } from '../index'
import { YhButton } from '../../button'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

describe('Popconfirm', () => {
  const globalConfig = {
    components: {
      YhButton
    }
  }

  it('should render correct content', async () => {
    const wrapper = mount(YhPopconfirm, {
      props: {
        title: '确定吗？',
        description: '这是一个描述',
        teleported: false // 关键：不传送，方便测试
      },
      slots: {
        default: () => h('button', { id: 'trigger' }, '点击我')
      },
      global: globalConfig
    })

    const trigger = wrapper.find('#trigger')
    await trigger.trigger('click')

    await nextTick()
    await wait(50)

    // 现在应该在 wrapper 内部能找到
    const popper = wrapper.find('.yh-popconfirm__popper')
    expect(popper.exists()).toBe(true)
    expect(popper.text()).toContain('确定吗？')
    expect(popper.text()).toContain('这是一个描述')
  })

  it('should trigger confirm event', async () => {
    const onConfirm = vi.fn()
    const wrapper = mount(YhPopconfirm, {
      props: {
        title: '确定吗？',
        onConfirm,
        teleported: false
      },
      slots: {
        default: () => h('button', { id: 'trigger' }, '点击我')
      },
      global: globalConfig
    })

    await wrapper.find('#trigger').trigger('click')
    await nextTick()
    await wait(50)

    const confirmBtn = wrapper.find('.yh-button--primary')
    await confirmBtn.trigger('click')

    await nextTick()
    expect(onConfirm).toHaveBeenCalled()
  })
})
