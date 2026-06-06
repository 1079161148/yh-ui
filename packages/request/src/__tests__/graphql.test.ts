import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  GraphQLBuilder,
  GraphQLClient,
  gql,
  parseGraphQLResponse,
  createGraphQLBuilder,
  createGraphQLClient,
  createPaginatedQuery
} from '../graphql'

vi.mock('../request', () => ({
  request: {
    request: vi.fn()
  }
}))

describe('GraphQL', () => {
  beforeEach(async () => {
    const { request } = await import('../request')
    vi.mocked(request.request).mockResolvedValue({
      data: { data: { ok: true } },
      config: {},
      response: {} as Response,
      requestId: 'g1'
    } as never)
  })

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

    it('supports mutation, addFields, inlineFragment, reset', () => {
      const b = new GraphQLBuilder()
      b.operation('mutation')
        .name('M')
        .variable('x', 'Int', 1)
        .addFields(['a', 'b'])
        .inlineFragment('User', ['id'])
        .field('root')
      expect(b.build()).toContain('mutation M')
      expect(b.build()).toContain('... on User')
      b.reset()
      expect(b.build()).toMatch(/query\s*\{/)
    })

    it('builds subscription without name', () => {
      const b = new GraphQLBuilder().operation('subscription').field('listen { x }')
      expect(b.build()).toContain('subscription {')
    })
  })

  describe('GraphQLClient', () => {
    it('query and mutate delegate to request', async () => {
      const client = new GraphQLClient('http://localhost/graphql', {
        headers: { 'X-Test': '1' }
      })
      client.setHeader('X-Extra', '2')
      client.setAuthToken('tok')

      const { request } = await import('../request')
      await client.query('query { x }', { a: 1 })
      await client.mutate('mutation { y }')
      client.createQuery().field('z')
      client.createMutation().field('w')

      expect(request.request).toHaveBeenCalled()
    })

    it('query accepts GraphQLBuilder', async () => {
      const client = new GraphQLClient('http://localhost/graphql')
      const b = new GraphQLBuilder().operation('query').name('Q').field('x')
      await client.query(b)
      const { request } = await import('../request')
      const call = vi.mocked(request.request).mock.calls.at(-1)?.[0] as { data?: { query?: string } }
      expect(call?.data?.query).toContain('query Q')
    })
  })

  describe('factories', () => {
    it('createGraphQLBuilder / createGraphQLClient', () => {
      expect(createGraphQLBuilder()).toBeInstanceOf(GraphQLBuilder)
      expect(createGraphQLClient('http://x')).toBeInstanceOf(GraphQLClient)
    })

    it('createPaginatedQuery', () => {
      const { query, getVariables } = createPaginatedQuery('items', 'id name', 20)
      expect(query).toContain('items')
      expect(getVariables()).toEqual({ first: 20 })
      expect(getVariables('c1')).toEqual({ first: 20, after: 'c1' })
    })
  })

  describe('gql template tag', () => {
    it('should stringify template literals', () => {
      const id = '123'
      const query = gql`query { user(id: "${id}") { name } }`
      expect(query).toBe('query { user(id: "123") { name } }')
    })

    it('embeds non-string values as JSON', () => {
      expect(gql`x ${1} y ${{ a: 1 }} z`).toBe('x 1 y {"a":1} z')
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

    it('joins multiple error messages', () => {
      const res = { errors: [{ message: 'a' }, { message: 'b' }] }
      expect(() => parseGraphQLResponse(res)).toThrow('a, b')
    })
  })
})
