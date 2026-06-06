import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import Spin from '../src/spin.vue'

const bench = (label: string, fn: () => void, threshold: number) => {
  const start = performance.now()
  fn()
  const elapsed = performance.now() - start
  console.log(`[PERF] ${label}: ${elapsed.toFixed(2)}ms (threshold: ${threshold}ms)`)
  return elapsed
}

describe('YhSpin perf baseline', () => {
  it('renders a 200-spinner grid within a reasonable budget', () => {
    const GridHost = defineComponent({
      setup() {
        return () =>
          h(
            'div',
            { class: 'spin-grid' },
            Array.from({ length: 200 }, (_, index) =>
              h(Spin, {
                key: index,
                show: true,
                tip: `Loading ${index}`,
                type: index % 2 === 0 ? 'gear' : 'dual-ring',
                color: index % 3 === 0 ? 'linear-gradient(to right, red, blue)' : '#1677ff'
              })
            )
          )
      }
    })

    let wrapper!: ReturnType<typeof mount>
    const elapsed = bench(
      'mount 200 spin components',
      () => {
        wrapper = mount(GridHost)
      },
      5000
    )

    expect(wrapper.findAll('.yh-spin')).toHaveLength(200)
    expect(elapsed).toBeLessThan(5000)
    wrapper.unmount()
  })

  it('keeps repeated mount cost stable across rounds', () => {
    const rounds = 5
    const times: number[] = []

    for (let i = 0; i < rounds; i++) {
      const t0 = performance.now()
      const wrapper = mount(Spin, {
        props: {
          show: true,
          type: i % 2 === 0 ? 'gear' : 'circle',
          tip: `Round ${i}`
        }
      })
      wrapper.unmount()
      times.push(performance.now() - t0)
    }

    const max = Math.max(...times)
    const degradation = times[rounds - 1] / times[0]

    console.log(`[PERF] repeated spin mounts: ${times.map((t) => t.toFixed(2)).join(' / ')}ms`)
    console.log(`[PERF] degradation ratio: ${degradation.toFixed(2)}x`)

    expect(max).toBeLessThan(1000)
    expect(degradation).toBeLessThan(3)
  })
})
