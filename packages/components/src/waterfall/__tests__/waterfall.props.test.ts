import { describe, it, expect } from 'vitest'
import { waterfallProps } from '../src/waterfall'

describe('waterfall.ts props definition', () => {
  it('exposes defaults and option shapes', () => {
    expect(waterfallProps.items.default()).toEqual([])
    expect(waterfallProps.cols.default).toBe(2)
    expect(waterfallProps.gap.default).toBe(16)
    expect(waterfallProps.animation.default).toBe(true)
    expect(waterfallProps.delay.default).toBe(100)
    expect(waterfallProps.rowKey.default).toBe('id')
    expect(waterfallProps.responsive.default).toBe(true)
    expect(waterfallProps.loading.default).toBe(false)
    expect(waterfallProps.heightProperty.default).toBe('height')
    expect(waterfallProps.imgSelector.default).toBe('img')
    expect(waterfallProps.themeOverrides.default).toBeUndefined()
  })
})
