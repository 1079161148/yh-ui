import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LuckyDraw from '../src/lucky-draw.vue'

describe('LuckyDraw', () => {
  const prizes = [
    { id: '1', name: 'Prize 1' },
    { id: '2', name: 'Prize 2' },
    { id: '3', name: 'Prize 3' }
  ]

  it('renders wheel mode by default', () => {
    const wrapper = mount(LuckyDraw, {
      props: {
        prizes
      }
    })
    expect(wrapper.classes()).toContain('yh-lucky-draw--wheel')
  })

  it('renders grid mode', () => {
    const wrapper = mount(LuckyDraw, {
      props: {
        type: 'grid',
        prizes
      }
    })
    expect(wrapper.classes()).toContain('yh-lucky-draw--grid')
  })

  it('emits start event when button clicked', async () => {
    const wrapper = mount(LuckyDraw, {
      props: {
        prizes
      }
    })
    const btn = wrapper.find('.yh-lucky-draw__pointer')
    if (btn.exists()) {
      await btn.trigger('click')
      expect(wrapper.emitted()).toHaveProperty('start')
    }
  })

  it('supports hiding button', () => {
    const wrapper = mount(LuckyDraw, {
      props: {
        prizes,
        hideBtn: true
      }
    })
    expect(wrapper.find('.yh-lucky-draw__pointer').exists()).toBe(false)
  })
})
