import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import { YhMenu } from '../index'

const bench = (label: string, fn: () => void, threshold: number) => {
  const start = performance.now()
  fn()
  const elapsed = performance.now() - start
  console.log(`[PERF] ${label}: ${elapsed.toFixed(2)}ms (threshold: ${threshold}ms)`)
  return elapsed
}

const options = Array.from({ length: 8 }, (_, i) => ({
  index: `group-${i}`,
  label: `Group ${i}`,
  children: Array.from({ length: 3 }, (_, j) => ({
    index: `item-${i}-${j}`,
    label: `Item ${i}-${j}`
  }))
}))

const perfMountOptions = {
  global: {
    stubs: {
      YhTooltip: {
        template:
          '<div class="yh-tooltip-stub"><slot /><slot name="content" /><slot name="title" /></div>'
      },
      YhIcon: true,
      Transition: false
    }
  }
} as const

describe('YhMenu perf baseline', () => {
  it('renders a 40-menu grid within a reasonable budget', () => {
    const GridHost = defineComponent({
      setup() {
        return () =>
          h(
            'div',
            { class: 'menu-grid' },
            Array.from({ length: 40 }, (_, index) =>
              h(YhMenu, {
                key: index,
                options,
                mode: index % 3 === 0 ? 'horizontal' : 'vertical',
                defaultActive: 'item-0-0',
                uniqueOpened: index % 2 === 0
              })
            )
          )
      }
    })

    let wrapper!: ReturnType<typeof mount>
    const elapsed = bench(
      'mount 40 menus',
      () => {
        wrapper = mount(GridHost, perfMountOptions)
      },
      5000
    )

    expect(wrapper.findAll('.yh-menu')).toHaveLength(40)
    expect(elapsed).toBeLessThan(5000)
    wrapper.unmount()
  })

  it('keeps repeated mount cost stable across rounds', () => {
    const rounds = 5
    const times: number[] = []

    for (let i = 0; i < rounds; i++) {
      const t0 = performance.now()
      const wrapper = mount(YhMenu, {
        ...perfMountOptions,
        props: {
          options,
          mode: i % 2 === 0 ? 'vertical' : 'horizontal',
          defaultActive: 'item-0-0',
          expandAll: i % 2 === 0
        }
      })
      wrapper.unmount()
      times.push(performance.now() - t0)
    }

    const max = Math.max(...times)
    const degradation = times[rounds - 1] / times[0]

    console.log(`[PERF] repeated menu mounts: ${times.map((t) => t.toFixed(2)).join(' / ')}ms`)
    console.log(`[PERF] degradation ratio: ${degradation.toFixed(2)}x`)

    expect(max).toBeLessThan(1000)
    expect(degradation).toBeLessThan(3)
  })
})
