import { describe, it, expect } from 'vitest'
import { GraphQLBuilder, gql, parseGraphQLResponse } from '../graphql'

describe('GraphQL', () => {
  describe('GraphQLBuilder', () => {
    it('should build a simple query', () => {
      const builder = new GraphQLBuilder()
      builder.operation('query').name('GetUser').field('user { id name }')

      const query = builder.build()
      expect(query).toContain('query GetUser')
      expect(query).toContain('user { id name }')
    })

    it('should handle variables', () => {
      const builder = new GraphQLBuilder()
      builder
        .operation('query')
        .variable('id', 'ID!')
        .variables_({ id: '123' })
        .field('user(id: $id) { name }')

      const query = builder.build()
      expect(query).toContain('($id: ID!)')

      const options = builder.toRequestOptions()
      expect(options.data.variables).toEqual({ id: '123' })
    })
  })

  describe('gql template tag', () => {
    it('should stringify template literals', () => {
      const id = '123'
      const query = gql`query { user(id: "${id}") { name } }`
      expect(query).toBe('query { user(id: "123") { name } }')
    })
  })

  describe('parseGraphQLResponse', () => {
    it('should return data on success', () => {
      const res = { data: { user: { name: 'Alice' } } }
      expect(parseGraphQLResponse(res)).toEqual(res.data)
    })

    it('should throw Error on GraphQL errors', () => {
      const res = { errors: [{ message: 'Not found' }] }
      expect(() => parseGraphQLResponse(res)).toThrow('Not found')
    })
  })
})
