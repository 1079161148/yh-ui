/**
 * @vitest-environment node
 */
import { describe, it, expect } from 'vitest'
import { gql, GraphQLBuilder } from '../graphql'

describe('GraphQL SSR', () => {
  it('should build query strings in node environment', () => {
    const query = gql`
      query {
        test
      }
    `
    // 标准化空白符进行匹配
    expect(query.replace(/\s+/g, ' ').trim()).toBe('query { test }')

    const builder = new GraphQLBuilder().field('foo')
    expect(builder.build().replace(/\s+/g, ' ').trim()).toContain('query { foo }')
  })
})
