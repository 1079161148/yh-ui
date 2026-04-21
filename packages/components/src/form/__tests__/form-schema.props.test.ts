import { describe, it, expect } from 'vitest'
import { formSchemaProps } from '../src/form-schema'

describe('form-schema.ts props', () => {
  it('default factories for optional props', () => {
    expect(formSchemaProps.schema.default()).toEqual([])
    expect(formSchemaProps.formProps.default()).toEqual({})
    expect(formSchemaProps.gutter.default).toBe(20)
  })
})
