import { describe, it, expect } from 'vitest'
import YhUIResolver, { YhUIResolver as Named, type YhUIResolverOptions } from '../src/resolver'

describe('@yh-ui/yh-ui resolver re-exports', () => {
  it('default export is a function (unplugin resolver)', () => {
    expect(typeof YhUIResolver).toBe('function')
  })

  it('named export matches default', () => {
    expect(Named).toBe(YhUIResolver)
  })

  it('accepts YhUIResolverOptions shape', () => {
    const opts: YhUIResolverOptions = {
      importStyle: true
    }
    expect(opts.importStyle).toBe(true)
  })

  it('default export builds a component resolver', () => {
    const r = YhUIResolver({ importStyle: false })
    expect(r.type).toBe('component')
    expect(r.resolve('YhButton')).toMatchObject({
      name: 'YhButton',
      from: '@yh-ui/components'
    })
    expect(r.resolve('Other')).toBeUndefined()
  })
})
