/**
 * YhUIResolver 单元测试
 */
import { describe, it, expect } from 'vitest'
import { YhUIResolver } from '../resolver'

describe('YhUIResolver', () => {
  it('should return a resolver object with type and resolve', () => {
    const resolver = YhUIResolver()
    expect(resolver).toHaveProperty('type', 'component')
    expect(resolver).toHaveProperty('resolve')
    expect(typeof resolver.resolve).toBe('function')
  })

  it('should resolve Yh-prefixed component with importStyle=true (default)', () => {
    const resolver = YhUIResolver()
    const result = resolver.resolve('YhButton')
    expect(result).toBeTruthy()
    expect(result?.name).toBe('YhButton')
    expect(result?.from).toBe('@yh-ui/components')
    expect(result?.sideEffects).toBe('@yh-ui/theme/styles/index.scss')
  })

  it('should resolve Yh-prefixed component with importStyle=false', () => {
    const resolver = YhUIResolver({ importStyle: false })
    const result = resolver.resolve('YhDialog')
    expect(result).toBeTruthy()
    expect(result?.name).toBe('YhDialog')
    expect(result?.from).toBe('@yh-ui/components')
    expect(result?.sideEffects).toBeUndefined()
  })

  it('should return undefined for non-Yh-prefixed components', () => {
    const resolver = YhUIResolver()
    expect(resolver.resolve('ElButton')).toBeUndefined()
    expect(resolver.resolve('Button')).toBeUndefined()
    expect(resolver.resolve('AntButton')).toBeUndefined()
  })

  it('should handle various Yh components', () => {
    const resolver = YhUIResolver()
    const components = ['YhInput', 'YhTable', 'YhTree', 'YhSelect', 'YhDatePicker', 'YhForm']
    components.forEach((name) => {
      const result = resolver.resolve(name)
      expect(result?.name).toBe(name)
      expect(result?.from).toBe('@yh-ui/components')
    })
  })

  it('should default importStyle to true', () => {
    const resolver = YhUIResolver({})
    const result = resolver.resolve('YhInput')
    expect(result?.sideEffects).toBe('@yh-ui/theme/styles/index.scss')
  })

  it('should export default YhUIResolver', async () => {
    const mod = await import('../resolver')
    expect(typeof mod.default).toBe('function')
    const resolver = mod.default()
    expect(resolver.type).toBe('component')
  })
})
