import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import TimePicker from '../src/time-picker.vue'

const bench = (label: string, fn: () => void, threshold: number) => {
  const start = performance.now()
  fn()
  const elapsed = performance.now() - start
  console.log(`[PERF] ${label}: ${elapsed.toFixed(2)}ms (threshold: ${threshold}ms)`)
  return elapsed
}

describe('YhTimePicker perf baseline', () => {
  it('renders a 120-picker grid within a reasonable budget', () => {
    const GridHost = defineComponent({
      setup() {
        return () =>
          h(
            'div',
            { class: 'time-picker-grid' },
            Array.from({ length: 120 }, (_, index) =>
              h(TimePicker, {
                key: index,
                modelValue: index % 2 === 0 ? '09:00:00' : '18:30:00',
                isRange: index % 3 === 0,
                teleported: false,
                showFooter: index % 2 === 0
              })
            )
          )
      }
    })

    let wrapper!: ReturnType<typeof mount>
    const elapsed = bench(
      'mount 120 time pickers',
      () => {
        wrapper = mount(GridHost)
      },
      5000
    )

    expect(wrapper.findAll('.yh-time-picker')).toHaveLength(120)
    expect(elapsed).toBeLessThan(5000)
    wrapper.unmount()
  })

  it('keeps repeated mount cost stable across rounds', () => {
    const rounds = 5
    const times: number[] = []

    for (let i = 0; i < rounds; i++) {
      const t0 = performance.now()
      const wrapper = mount(TimePicker, {
        props: {
          modelValue: '12:30:00',
          teleported: false,
          isRange: i % 2 === 0
        }
      })
      wrapper.unmount()
      times.push(performance.now() - t0)
    }

    const max = Math.max(...times)
    const degradation = times[rounds - 1] / times[0]

    console.log(`[PERF] repeated time-picker mounts: ${times.map((t) => t.toFixed(2)).join(' / ')}ms`)
    console.log(`[PERF] degradation ratio: ${degradation.toFixed(2)}x`)

    expect(max).toBeLessThan(1000)
    expect(degradation).toBeLessThan(3)
  })
})
