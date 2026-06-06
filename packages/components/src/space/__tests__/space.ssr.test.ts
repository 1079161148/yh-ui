/**
 * Space Component SSR Tests
 */
import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import Space from '../src/space.vue'
import { renderSSR, expectSSRHasClass, testHydration } from '../../__tests__/utils/ssr'

describe('YhSpace SSR', () => {
  it('should render correctly in SSR', async () => {
    const html = await renderSSR(
      Space,
      {
        direction: 'horizontal',
        size: 'small'
      },
      {
        default: () => [h('div', 'A'), h('div', 'B')]
      }
    )

    expectSSRHasClass(html, 'yh-space')
    expectSSRHasClass(html, 'yh-space--horizontal')
    expect(html).toContain('A')
    expect(html).toContain('B')
  })

  it('should render vertical direction in SSR', async () => {
    const html = await renderSSR(
      Space,
      {
        direction: 'vertical'
      },
      {
        default: () => [h('div', 'A'), h('div', 'B')]
      }
    )

    expectSSRHasClass(html, 'yh-space--vertical')
    // SSR 输出 style 无空格：flex-direction:column
    expect(html).toMatch(/flex-direction:\s*column/)
  })

  it('should render wrap in SSR', async () => {
    const html = await renderSSR(
      Space,
      {
        wrap: true
      },
      {
        default: () => Array.from({ length: 5 }, (_, i) => h('span', `Item ${i}`))
      }
    )

    expectSSRHasClass(html, 'is-wrap')
    expect(html).toMatch(/flex-wrap:\s*wrap/)
  })

  it('should render fill in SSR', async () => {
    const html = await renderSSR(
      Space,
      {
        fill: true
      },
      {
        default: () => [h('div', 'A')]
      }
    )

    expectSSRHasClass(html, 'is-fill')
    expect(html).toMatch(/width:\s*100%/)
  })

  it('should render spacer prop in SSR', async () => {
    const html = await renderSSR(
      Space,
      {
        spacer: '|'
      },
      {
        default: () => [h('div', 'A'), h('div', 'B'), h('div', 'C')]
      }
    )

    expectSSRHasClass(html, 'yh-space__spacer')
    expect(html).toContain('|')
  })

  it('should render custom size in SSR', async () => {
    const html = await renderSSR(
      Space,
      {
        size: 40
      },
      {
        default: () => [h('div', 'A'), h('div', 'B')]
      }
    )

    expect(html).toMatch(/gap:\s*40px/)
  })

  it('should render array size in SSR', async () => {
    const html = await renderSSR(
      Space,
      {
        size: [10, 20]
      },
      {
        default: () => [h('div', 'A'), h('div', 'B')]
      }
    )

    expect(html).toMatch(/column-gap:\s*10px/)
    expect(html).toMatch(/row-gap:\s*20px/)
  })

  it('should render justify in SSR', async () => {
    const html = await renderSSR(
      Space,
      {
        justify: 'space-between',
        fill: true
      },
      {
        default: () => [h('div', 'A'), h('div', 'B')]
      }
    )

    expect(html).toMatch(/justify-content:\s*space-between/)
  })

  it('should hydrate without mismatch', async () => {
    const result = await testHydration(
      Space,
      {
        direction: 'horizontal',
        size: 'small'
      },
      {
        default: () => [h('div', 'A'), h('div', 'B')]
      }
    )
    expect(result.isMatch).toBe(true)
  })

  it('should hydrate with spacer without mismatch', async () => {
    const result = await testHydration(
      Space,
      {
        spacer: '|'
      },
      {
        default: () => [h('div', 'A'), h('div', 'B')]
      }
    )
    expect(result.isMatch).toBe(true)
  })

  it('should hydrate with wrap without mismatch', async () => {
    const result = await testHydration(
      Space,
      {
        wrap: true,
        size: [8, 12]
      },
      {
        default: () => Array.from({ length: 3 }, (_, i) => h('span', { key: i }, `Item ${i}`))
      }
    )
    expect(result.isMatch).toBe(true)
  })
})
