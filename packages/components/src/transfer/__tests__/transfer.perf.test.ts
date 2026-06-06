import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import Transfer from '../src/transfer.vue'

const bench = (label: string, fn: () => void, threshold: number) => {
  const start = performance.now()
  fn()
  const elapsed = performance.now() - start
  console.log(`[PERF] ${label}: ${elapsed.toFixed(2)}ms (threshold: ${threshold}ms)`)
  return elapsed
}

const data = Array.from({ length: 80 }, (_, i) => ({
  key: i + 1,
  label: `Option ${i + 1}`,
  disabled: i % 9 === 0
}))

describe('YhTransfer perf baseline', () => {
  it('renders a 60-transfer grid within a reasonable budget', () => {
    const GridHost = defineComponent({
      setup() {
        return () =>
          h(
            'div',
            { class: 'transfer-grid' },
            Array.from({ length: 60 }, (_, index) =>
              h(Transfer, {
                key: index,
                data,
                modelValue: index % 2 === 0 ? [1, 2, 3] : [4, 5],
                filterable: index % 3 === 0,
                virtual: index % 2 === 0,
                height: 220
              })
            )
          )
      }
    })

    let wrapper!: ReturnType<typeof mount>
    const elapsed = bench(
      'mount 60 transfers',
      () => {
        wrapper = mount(GridHost)
      },
      5000
    )

    expect(wrapper.findAll('.yh-transfer')).toHaveLength(60)
    expect(elapsed).toBeLessThan(5000)
    wrapper.unmount()
  })

  it('keeps repeated mount cost stable across rounds', () => {
    const rounds = 5
    const times: number[] = []

    for (let i = 0; i < rounds; i++) {
      const t0 = performance.now()
      const wrapper = mount(Transfer, {
        props: {
          data,
          modelValue: [1, 2],
          filterable: i % 2 === 0,
          virtual: i % 2 === 1
        }
      })
      wrapper.unmount()
      times.push(performance.now() - t0)
    }

    const max = Math.max(...times)
    const degradation = times[rounds - 1] / times[0]

    console.log(`[PERF] repeated transfer mounts: ${times.map((t) => t.toFixed(2)).join(' / ')}ms`)
    console.log(`[PERF] degradation ratio: ${degradation.toFixed(2)}x`)

    expect(max).toBeLessThan(1000)
    expect(degradation).toBeLessThan(3)
  })
})
