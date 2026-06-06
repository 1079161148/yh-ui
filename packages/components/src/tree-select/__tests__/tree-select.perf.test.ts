import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import TreeSelect from '../src/tree-select.vue'

const bench = (label: string, fn: () => void, threshold: number) => {
  const start = performance.now()
  fn()
  const elapsed = performance.now() - start
  console.log(`[PERF] ${label}: ${elapsed.toFixed(2)}ms (threshold: ${threshold}ms)`)
  return elapsed
}

const data = Array.from({ length: 40 }, (_, i) => ({
  value: `group-${i}`,
  label: `Group ${i}`,
  children: Array.from({ length: 5 }, (_, j) => ({
    value: `item-${i}-${j}`,
    label: `Item ${i}-${j}`
  }))
}))

describe('YhTreeSelect perf baseline', () => {
  it('renders a 120-tree-select grid within a reasonable budget', () => {
    const GridHost = defineComponent({
      setup() {
        return () =>
          h(
            'div',
            { class: 'tree-select-grid' },
            Array.from({ length: 120 }, (_, index) =>
              h(TreeSelect, {
                key: index,
                data,
                nodeKey: 'value',
                teleported: false,
                multiple: index % 3 === 0,
                virtual: index % 2 === 0,
                modelValue: index % 3 === 0 ? ['item-0-0'] : 'item-0-0'
              })
            )
          )
      }
    })

    let wrapper!: ReturnType<typeof mount>
    const elapsed = bench(
      'mount 120 tree-selects',
      () => {
        wrapper = mount(GridHost)
      },
      5000
    )

    expect(wrapper.findAll('.yh-tree-select')).toHaveLength(120)
    expect(elapsed).toBeLessThan(5000)
    wrapper.unmount()
  })

  it('keeps repeated mount cost stable across rounds', () => {
    const rounds = 5
    const times: number[] = []

    for (let i = 0; i < rounds; i++) {
      const t0 = performance.now()
      const wrapper = mount(TreeSelect, {
        props: {
          data,
          nodeKey: 'value',
          teleported: false,
          filterable: i % 2 === 0,
          modelValue: i % 2 === 0 ? 'item-0-0' : undefined
        }
      })
      wrapper.unmount()
      times.push(performance.now() - t0)
    }

    const max = Math.max(...times)
    const degradation = times[rounds - 1] / times[0]

    console.log(`[PERF] repeated tree-select mounts: ${times.map((t) => t.toFixed(2)).join(' / ')}ms`)
    console.log(`[PERF] degradation ratio: ${degradation.toFixed(2)}x`)

    expect(max).toBeLessThan(1000)
    expect(degradation).toBeLessThan(3)
  })
})
