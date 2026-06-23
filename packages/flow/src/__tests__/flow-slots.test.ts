/**
 * @vitest-environment happy-dom
 */
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import Flow from '../Flow.vue'
import Minimap from '../renderer/Minimap.vue'
import Controls from '../renderer/Controls.vue'
import FlowBackground from '../renderer/FlowBackground.vue'

describe('Flow Slots Rendering', () => {
  it('should render Minimap, Controls, and FlowBackground inside Flow default slot', async () => {
    const nodes = [{ id: '1', type: 'input', position: { x: 0, y: 0 }, data: { label: 'Start' } }]
    const edges = []

    const wrapper = mount(Flow, {
      props: {
        nodes,
        edges
      },
      slots: {
        default: () => [
          h(Minimap, { key: 'minimap' }),
          h(Controls, { key: 'controls' }),
          h(FlowBackground, { type: 'grid', key: 'bg' })
        ]
      }
    })

    await nextTick()

    // Assert Minimap is rendered
    expect(wrapper.find('.yh-flow-minimap').exists()).toBe(true)

    // Assert Controls is rendered
    expect(wrapper.find('.yh-flow-controls').exists()).toBe(true)

    // Assert FlowBackground is rendered
    expect(wrapper.find('.yh-flow-background').exists()).toBe(true)
  })
})
