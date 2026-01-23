/**
 * TreeSelect Component SSR Tests
 */
import { describe, it, expect } from 'vitest'
import TreeSelect from '../src/tree-select.vue'
import { renderSSR, expectSSRHasClass, testHydration } from '../../__tests__/utils/ssr'

describe('YhTreeSelect SSR', () => {
  const data = [
    {
      value: '1',
      label: 'Level one 1',
      children: [
        {
          value: '1-1',
          label: 'Level two 1-1',
          children: [
            {
              value: '1-1-1',
              label: 'Level three 1-1-1'
            }
          ]
        }
      ]
    }
  ]

  it('should render correctly in SSR', async () => {
    const html = await renderSSR(TreeSelect, {
      data,
      modelValue: '',
      placeholder: 'Select node'
    })

    expectSSRHasClass(html, 'yh-tree-select')
    expect(html).toContain('Select node')
  })

  it('should render multiple state in SSR', async () => {
    const html = await renderSSR(TreeSelect, {
      data,
      multiple: true,
      modelValue: ['1-1-1']
    })
    expectSSRHasClass(html, 'is-multiple')
  })

  it('should render disabled state in SSR', async () => {
    const html = await renderSSR(TreeSelect, {
      data,
      disabled: true
    })
    expectSSRHasClass(html, 'is-disabled')
  })

  it('should hydrate without mismatch', async () => {
    const result = await testHydration(TreeSelect, {
      data,
      modelValue: '1-1-1',
      filterable: true
    })
    expect(result.isMatch).toBe(true)
  })
})
