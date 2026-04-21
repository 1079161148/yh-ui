import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import Cascader from '../src/cascader.vue'

const bench = (label: string, fn: () => void, threshold: number) => {
  const start = performance.now()
  fn()
  const elapsed = performance.now() - start
  console.log(`[PERF] ${label}: ${elapsed.toFixed(2)}ms (threshold: ${threshold}ms)`)
  return elapsed
}

const options = Array.from({ length: 50 }, (_, i) => ({
  value: `group-${i}`,
  label: `Group ${i}`,
  children: Array.from({ length: 10 }, (_, j) => ({
    value: `item-${i}-${j}`,
    label: `Item ${i}-${j}`
  }))
}))

describe('YhCascader perf baseline', () => {
  it('renders a 120-cascader grid within a reasonable budget', () => {
    const GridHost = defineComponent({
      setup() {
        return () =>
          h(
            'div',
            { class: 'cascader-grid' },
            Array.from({ length: 120 }, (_, index) =>
              h(Cascader, {
                key: index,
                options,
                teleported: false,
                modelValue: ['group-0', 'item-0-0'],
                multiple: index % 4 === 0
              })
            )
          )
      }
    })

    let wrapper!: ReturnType<typeof mount>
    const elapsed = bench(
      'mount 120 cascaders',
      () => {
        wrapper = mount(GridHost)
      },
      5000
    )

    expect(wrapper.findAll('.yh-cascader')).toHaveLength(120)
    expect(elapsed).toBeLessThan(5000)
    wrapper.unmount()
  })

  it('keeps repeated mount cost stable across rounds', () => {
    const rounds = 5
    const times: number[] = []

    for (let i = 0; i < rounds; i++) {
      const t0 = performance.now()
      const wrapper = mount(Cascader, {
        props: {
          options,
          teleported: false,
          modelValue: ['group-0', 'item-0-0'],
          filterable: i % 2 === 0
        }
      })
      wrapper.unmount()
      times.push(performance.now() - t0)
    }

    const max = Math.max(...times)
    const degradation = times[rounds - 1] / times[0]

    console.log(`[PERF] repeated cascader mounts: ${times.map((t) => t.toFixed(2)).join(' / ')}ms`)
    console.log(`[PERF] degradation ratio: ${degradation.toFixed(2)}x`)

    expect(max).toBeLessThan(1000)
    expect(degradation).toBeLessThan(3)
  })
})
