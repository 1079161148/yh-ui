import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import DatePicker from '../src/date-picker.vue'

const bench = (label: string, fn: () => void, threshold: number) => {
  const start = performance.now()
  fn()
  const elapsed = performance.now() - start
  console.log(`[PERF] ${label}: ${elapsed.toFixed(2)}ms (threshold: ${threshold}ms)`)
  return elapsed
}

describe('YhDatePicker perf baseline', () => {
  it('renders a 120-picker grid within a reasonable budget', () => {
    const GridHost = defineComponent({
      setup() {
        return () =>
          h(
            'div',
            { class: 'date-picker-grid' },
            Array.from({ length: 120 }, (_, index) =>
              h(DatePicker, {
                key: index,
                type: index % 3 === 0 ? 'daterange' : 'date',
                modelValue:
                  index % 3 === 0 ? ['2024-01-01', '2024-01-10'] : '2024-01-01',
                teleported: false
              })
            )
          )
      }
    })

    let wrapper!: ReturnType<typeof mount>
    const elapsed = bench(
      'mount 120 date pickers',
      () => {
        wrapper = mount(GridHost)
      },
      5000
    )

    expect(wrapper.findAll('.yh-date-picker')).toHaveLength(120)
    expect(elapsed).toBeLessThan(5000)
    wrapper.unmount()
  })

  it('keeps repeated mount cost stable across rounds', () => {
    const rounds = 5
    const times: number[] = []

    for (let i = 0; i < rounds; i++) {
      const t0 = performance.now()
      const wrapper = mount(DatePicker, {
        props: {
          modelValue: '2024-01-01',
          teleported: false,
          type: i % 2 === 0 ? 'date' : 'month'
        }
      })
      wrapper.unmount()
      times.push(performance.now() - t0)
    }

    const max = Math.max(...times)
    const degradation = times[rounds - 1] / times[0]

    console.log(`[PERF] repeated date-picker mounts: ${times.map((t) => t.toFixed(2)).join(' / ')}ms`)
    console.log(`[PERF] degradation ratio: ${degradation.toFixed(2)}x`)

    expect(max).toBeLessThan(1000)
    expect(degradation).toBeLessThan(3)
  })
})
