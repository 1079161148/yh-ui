/**
 * Cascader Component SSR Tests
 */
import { describe, it, expect } from 'vitest'
import Cascader from '../src/cascader.vue'
import { renderSSR, expectSSRHasClass, testHydration } from '../../__tests__/utils/ssr'

const mockOptions = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      { value: 'disciplines', label: 'Disciplines' },
      { value: 'consistency', label: 'Consistency' }
    ]
  },
  {
    value: 'resource',
    label: 'Resource',
    children: [
      { value: 'axure', label: 'Axure' },
      { value: 'sketch', label: 'Sketch' }
    ]
  }
]

describe('YhCascader SSR', () => {
  it('should render correctly in SSR', async () => {
    const html = await renderSSR(Cascader, {
      modelValue: [],
      options: mockOptions,
      placeholder: 'Select region'
    })

    expectSSRHasClass(html, 'yh-cascader')
    expect(html).toContain('Select region')
  })

  it('should render disabled state in SSR', async () => {
    const html = await renderSSR(Cascader, {
      options: mockOptions,
      disabled: true
    })
    expectSSRHasClass(html, 'is-disabled')
  })

  it('should render multiple state in SSR', async () => {
    const html = await renderSSR(Cascader, {
      options: mockOptions,
      multiple: true,
      modelValue: [['guide', 'consistency']]
    })
    expectSSRHasClass(html, 'yh-cascader')
  })

  it('should hydrate without mismatch', async () => {
    const result = await testHydration(Cascader, {
      options: mockOptions,
      modelValue: ['guide', 'disciplines'],
      clearable: true
    })
    expect(result.isMatch).toBe(true)
  })
})
