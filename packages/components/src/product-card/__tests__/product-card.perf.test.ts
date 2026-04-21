import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import ProductCard from '../src/product-card.vue'

const bench = (label: string, fn: () => void, threshold: number) => {
  const start = performance.now()
  fn()
  const elapsed = performance.now() - start
  console.log(`[PERF] ${label}: ${elapsed.toFixed(2)}ms (threshold: ${threshold}ms)`)
  return elapsed
}

const cards = Array.from({ length: 200 }, (_, i) => ({
  title: `Product ${i}`,
  image: `https://test.com/${i}.jpg`,
  price: i + 0.99,
  marketPrice: i + 10.99,
  stockProgress: i % 101,
  stockText: `Stock ${i}`,
  badges: [
    { text: 'VIP', color: '#fa8c16' },
    { text: 'FAST', type: 'success' as const }
  ],
  tag: i % 2 === 0 ? 'HOT' : '',
  soldOut: i % 10 === 0
}))

describe('ProductCard perf baseline', () => {
  it('renders a 200-card grid within a reasonable budget', () => {
    const GridHost = defineComponent({
      setup() {
        return () =>
          h(
            'div',
            { class: 'grid-host' },
            cards.map((props, index) => h(ProductCard, { key: index, ...props }))
          )
      }
    })

    let wrapper!: ReturnType<typeof mount>
    const elapsed = bench(
      'mount 200 product cards',
      () => {
        wrapper = mount(GridHost)
      },
      5000
    )

    expect(wrapper.findAll('.yh-product-card')).toHaveLength(200)
    expect(elapsed).toBeLessThan(5000)
    wrapper.unmount()
  })

  it('keeps repeated mount cost stable across rounds', () => {
    const rounds = 5
    const times: number[] = []

    for (let i = 0; i < rounds; i++) {
      const t0 = performance.now()
      const wrapper = mount(ProductCard, {
        props: cards[i]
      })
      wrapper.unmount()
      times.push(performance.now() - t0)
    }

    const max = Math.max(...times)
    const degradation = times[rounds - 1] / times[0]

    console.log(`[PERF] repeated mount times: ${times.map((t) => t.toFixed(2)).join(' / ')}ms`)
    console.log(`[PERF] degradation ratio: ${degradation.toFixed(2)}x`)

    expect(max).toBeLessThan(1000)
    expect(degradation).toBeLessThan(3)
  })
})
