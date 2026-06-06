# GraphQL Support

`@yh-ui/request` provides complete GraphQL support, including query builders, client wrappers, and pagination helpers.

## GraphQL Client

### Create Client

```typescript
import { createGraphQLClient } from '@yh-ui/request'

const client = createGraphQLClient('https://api.example.com/graphql', {
  headers: {
    Authorization: 'Bearer token'
  },
  credentials: 'same-origin'
})
```

### Send Query

```typescript
// Simple query
const { data } = await client.query(`
  query {
    user(id: 1) {
      id
      name
      email
    }
  }
`)

// Query with variables
const { data } = await client.query(
  `
    query GetUser($id: ID!) {
      user(id: $id) {
        id
        name
      }
    }
  `,
  { id: '1' }
)
```

### Send Mutation

```typescript
const { data } = await client.mutate(
  `
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
    }
  }
`,
  { input: { name: 'John' } }
)
```

## Query Builder

Use chain API to build GraphQL queries.

### Basic Usage

```typescript
import { createGraphQLBuilder } from '@yh-ui/request'

const query = createGraphQLBuilder()
  .operation('query')
  .name('GetUser')
  .variable('id', 'ID!')
  .field('id')
  .field('name')
  .field('email')
  .build()

// Output:
// query GetUser($id: ID!) {
//   id
//   name
//   email
// }
```

### Method Chain

| Method                                 | Description                                             |
| -------------------------------------- | ------------------------------------------------------- |
| `.operation(type)`                     | Set operation type: `query`, `mutation`, `subscription` |
| `.name(name)`                          | Set operation name                                      |
| `.variable(name, type, defaultValue?)` | Add variable definition                                 |
| `.variables_(vars)`                    | Set variable values                                     |
| `.field(field)`                        | Add single field                                        |
| `.addFields(fields)`                   | Add multiple fields                                     |
| `.inlineFragment(type, fields)`        | Add inline fragment                                     |
| `.fragment(name)`                      | Add fragment reference                                  |
| `.build()`                             | Build query string                                      |

### Example: Complex Query

```typescript
const query = createGraphQLBuilder()
  .operation('query')
  .name('GetUserWithPosts')
  .variable('id', 'ID!')
  .field('user')
  .addFields(['id', 'name', 'avatar'])
  .inlineFragment('User', ['id', 'name', 'email', 'bio'])
  .build()
```

## gql Template Tag

Write GraphQL queries using template string tag function.

```typescript
import { gql } from '@yh-ui/request'

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`

// Usage
const { data } = await client.query(GET_USER, { id: '1' })
```

## Pagination Query

### Create Pagination Query

```typescript
import { createPaginatedQuery } from '@yh-ui/request'

const { query, getVariables } = createPaginatedQuery(
  'UserList', // Operation name
  'id name email', // Fields
  20 // Page size
)

// First request
const { data } = await client.query(query, getVariables())

// Next page
const nextPage = data.userList.pageInfo.endCursor
const { data: nextData } = await client.query(query, getVariables(nextPage))
```

### Response Structure

Standard structure for pagination queries:

```typescript
interface PageInfo {
  hasNextPage: boolean
  endCursor: string
}

interface Edge<T> {
  node: T
}
```

## Error Handling

### Parse Response

```typescript
import { parseGraphQLResponse } from '@yh-ui/request'

const response = await client.query(query)

try {
  const data = parseGraphQLResponse(response.data)
  console.log(data)
} catch (error) {
  // Handle GraphQL error
  if (error.code === 'GRAPHQL_ERROR') {
    console.error('GraphQL Error:', error.message)
  }
}
```

### Manual Error Handling

```typescript
const { data, errors } = await client.query(query)

if (errors && errors.length > 0) {
  errors.forEach((err) => {
    console.error(`[${err.locations?.[0]?.line}:${err.locations?.[0]?.column}] ${err.message}`)
  })
}
```

## Type Safety

### Generic Types

```typescript
interface User {
  id: string
  name: string
  email: string
}

interface CreateUserInput {
  name: string
  email: string
}

interface CreateUserPayload {
  createUser: User
}

// Query
const { data } = await client.query<{ user: User }>(`
  query {
    user(id: "1") { id name email }
  }
`)

// Mutation
const { data } = await client.mutate<CreateUserPayload>(
  `
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) { id name email }
  }
`,
  { input: { name: 'John', email: 'john@example.com' } }
)
```

## Configuration Options

### Complete Configuration Example

```typescript
import { createGraphQLClient } from '@yh-ui/request'

const client = createGraphQLClient('https://api.example.com/graphql', {
  // Custom headers
  headers: {
    Authorization: 'Bearer your-token',
    'X-Language': 'en-US'
  },

  // Credentials mode
  credentials: 'include'
})

// Set auth token
client.setAuthToken('new-token')

// Set single header
client.setHeader('X-Request-ID', 'unique-id')
```

## Combine with Other Features

### Combine with Interceptors

```typescript
const client = createGraphQLClient('/graphql')

// Add request interceptor
client.request.interceptors.request.use((config) => {
  // Add GraphQL required headers
  return {
    ...config,
    headers: {
      ...config.headers,
      'Content-Type': 'application/json'
    }
  }
})
```

### Combine with Cache

```typescript
// Use SWR mode with useRequest
const { data } = useRequestSWR(
  () => ['query', variables],
  ([query, vars]) => client.query(query, vars),
  { swr: true }
)
```
