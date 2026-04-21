import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import SmartAddress from '../src/smart-address.vue'

const bench = (label: string, fn: () => void, threshold: number) => {
  const start = performance.now()
  fn()
  const elapsed = performance.now() - start
  console.log(`[PERF] ${label}: ${elapsed.toFixed(2)}ms (threshold: ${threshold}ms)`)
  return elapsed
}

const sharedModel = {
  name: 'Alice',
  phone: '13800138000',
  province: '330000',
  city: '330100',
  district: '330106',
  street: 'Gudun Road',
  detail: 'No. 1'
}

describe('SmartAddress perf baseline', () => {
  it('renders a 100-form grid within a reasonable budget', () => {
    const GridHost = defineComponent({
      setup() {
        return () =>
          h(
            'div',
            { class: 'smart-address-grid' },
            Array.from({ length: 100 }, (_, index) =>
              h(SmartAddress, {
                key: index,
                modelValue: { ...sharedModel, detail: `No. ${index}` },
                showParser: index % 2 === 0,
                showStreet: true,
                labelPlacement: index % 2 === 0 ? 'left' : 'top'
              })
            )
          )
      }
    })

    let wrapper!: ReturnType<typeof mount>
    const elapsed = bench(
      'mount 100 smart-address forms',
      () => {
        wrapper = mount(GridHost)
      },
      5000
    )

    expect(wrapper.findAll('.yh-smart-address')).toHaveLength(100)
    expect(elapsed).toBeLessThan(5000)
    wrapper.unmount()
  })

  it('keeps repeated mount cost stable across rounds', () => {
    const rounds = 5
    const times: number[] = []

    for (let i = 0; i < rounds; i++) {
      const t0 = performance.now()
      const wrapper = mount(SmartAddress, {
        props: {
          modelValue: { ...sharedModel, detail: `No. ${i}` },
          showStreet: true
        }
      })
      wrapper.unmount()
      times.push(performance.now() - t0)
    }

    const max = Math.max(...times)
    const degradation = times[rounds - 1] / times[0]

    console.log(`[PERF] repeated smart-address mounts: ${times.map((t) => t.toFixed(2)).join(' / ')}ms`)
    console.log(`[PERF] degradation ratio: ${degradation.toFixed(2)}x`)

    expect(max).toBeLessThan(1000)
    expect(degradation).toBeLessThan(3)
  })
})
