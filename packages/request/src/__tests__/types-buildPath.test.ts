import { describe, it, expect } from 'vitest'
import { buildPath } from '../types'

describe('types buildPath', () => {
  it('replaces single path param', () => {
    expect(buildPath('/api/users/:id', { id: '123' })).toBe('/api/users/123')
  })

  it('encodes param values', () => {
    expect(buildPath('/q/:term', { term: 'a b' })).toBe('/q/a%20b')
  })

  it('replaces multiple segments', () => {
    expect(
      buildPath('/users/:userId/posts/:postId', { userId: '1', postId: '2' })
    ).toBe('/users/1/posts/2')
  })
})
