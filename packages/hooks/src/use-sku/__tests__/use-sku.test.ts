import { describe, it, expect } from 'vitest'
import { useSKU } from '../index'

const specs = [
  {
    id: 'color',
    name: '颜色',
    values: [
      { id: 'red', name: '红色' },
      { id: 'blue', name: '蓝色' }
    ]
  },
  {
    id: 'size',
    name: '尺寸',
    values: [
      { id: 's', name: 'S' },
      { id: 'm', name: 'M' }
    ]
  }
]

const skus = [
  { id: 1, specValueIds: ['red', 's'], price: 100, stock: 10 },
  { id: 2, specValueIds: ['red', 'm'], price: 110, stock: 5 },
  { id: 3, specValueIds: ['blue', 's'], price: 100, stock: 0 }, // 无库存
  { id: 4, specValueIds: ['blue', 'm'], price: 120, stock: 8 }
]

describe('useSKU', () => {
  it('should initialize with empty selection', () => {
    const { selectedValueIds } = useSKU(specs, skus)
    expect(selectedValueIds.value).toEqual([])
  })

  it('should handle value selection', () => {
    const { selectedValueIds, toggleValue } = useSKU(specs, skus)
    toggleValue(0, 'red')
    expect(selectedValueIds.value[0]).toBe('red')

    toggleValue(0, 'red') // 取消选中
    expect(selectedValueIds.value[0]).toBe('')
  })

  it('should calculate selectable values based on stock', () => {
    const { isValueSelectable, toggleValue } = useSKU(specs, skus)

    // 初始状态下全部可选
    expect(isValueSelectable(0, 'red')).toBe(true)
    expect(isValueSelectable(0, 'blue')).toBe(true)

    // 选中蓝之后，S 应该不可选（因为 blue-s 库存为 0）
    toggleValue(0, 'blue')
    expect(isValueSelectable(1, 's')).toBe(false)
    expect(isValueSelectable(1, 'm')).toBe(true)
  })

  it('should identify selected SKU when fully selected', () => {
    const { selectedSku, toggleValue } = useSKU(specs, skus)

    toggleValue(0, 'red')
    expect(selectedSku.value).toBeNull()

    toggleValue(1, 's')
    expect(selectedSku.value).toEqual(skus[0])

    toggleValue(1, 'm')
    expect(selectedSku.value).toEqual(skus[1])
  })
})
