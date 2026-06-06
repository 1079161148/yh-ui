import { describe, it, expect } from 'vitest'
import Cascader from '../src/cascader.vue'
import { testHydration } from '../../__tests__/utils/ssr'

const options = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      { value: 'design', label: 'Design' },
      { value: 'navigation', label: 'Navigation' }
    ]
  },
  {
    value: 'resource',
    label: 'Resource',
    children: [{ value: 'axure', label: 'Axure' }]
  }
]

describe('YhCascader Hydration', () => {
  it('hydrates single selection without mismatch', async () => {
    const result = await testHydration(Cascader, {
      options,
      modelValue: ['guide', 'design'],
      clearable: true,
      teleported: false
    })

    expect(result.isMatch).toBe(true)
  })

  it('hydrates multiple collapsed tags without mismatch', async () => {
    const result = await testHydration(Cascader, {
      options,
      multiple: true,
      modelValue: [['guide', 'design'], ['resource', 'axure']],
      collapseTags: true,
      maxCollapseTags: 1,
      teleported: false
    })

    expect(result.isMatch).toBe(true)
  })
})
