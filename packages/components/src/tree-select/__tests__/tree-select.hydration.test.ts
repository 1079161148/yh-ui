import { describe, it, expect } from 'vitest'
import TreeSelect from '../src/tree-select.vue'
import { testHydration } from '../../__tests__/utils/ssr'

const data = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      { value: 'design', label: 'Design' },
      { value: 'navigation', label: 'Navigation' }
    ]
  }
]

describe('YhTreeSelect Hydration', () => {
  it('hydrates single selection without mismatch', async () => {
    const result = await testHydration(TreeSelect, {
      data,
      modelValue: 'design',
      nodeKey: 'value',
      teleported: false
    })

    expect(result.isMatch).toBe(true)
  })

  it('hydrates multiple collapsed tags without mismatch', async () => {
    const result = await testHydration(TreeSelect, {
      data,
      multiple: true,
      collapseTags: true,
      maxCollapseTags: 1,
      modelValue: ['guide', 'design'],
      nodeKey: 'value',
      teleported: false
    })

    expect(result.isMatch).toBe(true)
  })
})
