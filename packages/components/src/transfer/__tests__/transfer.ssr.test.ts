/**
 * Transfer Component SSR Tests
 */
import { describe, it, expect } from 'vitest'
import Transfer from '../src/transfer.vue'
import { renderSSR, expectSSRHasClass, testHydration } from '../../__tests__/utils/ssr'

describe('YhTransfer SSR', () => {
  const generateData = () => {
    const data = []
    for (let i = 1; i <= 15; i++) {
      data.push({
        key: i,
        label: `Option ${i}`,
        disabled: i % 4 === 0
      })
    }
    return data
  }

  it('should render correctly in SSR', async () => {
    const data = generateData()
    const html = await renderSSR(Transfer, {
      modelValue: [1, 4],
      data
    })

    expectSSRHasClass(html, 'yh-transfer')
    expect(html).toContain('Option 1')
  })

  it('should render filterable state in SSR', async () => {
    const data = generateData()
    const html = await renderSSR(Transfer, {
      data,
      filterable: true,
      filterPlaceholder: 'Search here'
    })
    expect(html).toContain('Search here')
  })

  it('should hydrate without mismatch', async () => {
    const data = generateData()
    const result = await testHydration(Transfer, {
      data,
      modelValue: [1],
      titles: ['Source', 'Target'],
      buttonTexts: ['To Left', 'To Right']
    })
    expect(result.isMatch).toBe(true)
  })
})
