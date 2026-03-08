# GraphQL 支持

`@yh-ui/request` 提供完整的 GraphQL 支持，包括查询构建器、客户端封装和分页辅助函数。

## GraphQL 客户端

### 创建客户端

```typescript
import { createGraphQLClient } from '@yh-ui/request'

const client = createGraphQLClient('https://api.example.com/graphql', {
  headers: {
    Authorization: 'Bearer token'
  },
  credentials: 'same-origin'
})
```

### 发送查询

```typescript
// 简单查询
const { data } = await client.query(`
  query {
    user(id: 1) {
      id
      name
      email
    }
  }
`)

// 带变量查询
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

### 发送 Mutation

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
  { input: { name: '张三' } }
)
```

## 查询构建器

使用链式 API 构建 GraphQL 查询。

### 基本用法

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

// 输出:
// query GetUser($id: ID!) {
//   id
//   name
//   email
// }
```

### 方法链

| 方法                                   | 说明                                              |
| -------------------------------------- | ------------------------------------------------- |
| `.operation(type)`                     | 设置操作类型：`query`、`mutation`、`subscription` |
| `.name(name)`                          | 设置操作名称                                      |
| `.variable(name, type, defaultValue?)` | 添加变量定义                                      |
| `.variables_(vars)`                    | 设置变量值                                        |
| `.field(field)`                        | 添加单个字段                                      |
| `.addFields(fields)`                   | 批量添加字段                                      |
| `.inlineFragment(type, fields)`        | 添加内联片段                                      |
| `.fragment(name)`                      | 添加片段引用                                      |
| `.build()`                             | 构建查询字符串                                    |

### 示例：复杂查询

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

## gql 模板标签

使用模板字符串标签函数编写 GraphQL 查询。

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

// 使用
const { data } = await client.query(GET_USER, { id: '1' })
```

## 分页查询

### 创建分页查询

```typescript
import { createPaginatedQuery } from '@yh-ui/request'

const { query, getVariables } = createPaginatedQuery(
  'UserList', // 操作名
  'id name email', // 字段
  20 // 每页数量
)

// 首次请求
const { data } = await client.query(query, getVariables())

// 翻页
const nextPage = data.userList.pageInfo.endCursor
const { data: nextData } = await client.query(query, getVariables(nextPage))
```

### 响应结构

分页查询返回的标准结构：

```typescript
interface PageInfo {
  hasNextPage: boolean
  endCursor: string
}

interface Edge<T> {
  node: T
}
```

## 错误处理

### 解析响应

```typescript
import { parseGraphQLResponse } from '@yh-ui/request'

const response = await client.query(query)

try {
  const data = parseGraphQLResponse(response.data)
  console.log(data)
} catch (error) {
  // 处理 GraphQL 错误
  if (error.code === 'GRAPHQL_ERROR') {
    console.error('GraphQL 错误:', error.message)
  }
}
```

### 手动处理错误

```typescript
const { data, errors } = await client.query(query)

if (errors && errors.length > 0) {
  errors.forEach((err) => {
    console.error(`[${err.locations?.[0]?.line}:${err.locations?.[0]?.column}] ${err.message}`)
  })
}
```

## 类型安全

### 泛型类型

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

// 查询
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
  { input: { name: '张三', email: 'zhangsan@example.com' } }
)
```

## 配置选项

### 完整配置示例

```typescript
import { createGraphQLClient } from '@yh-ui/request'

const client = createGraphQLClient('https://api.example.com/graphql', {
  // 自定义请求头
  headers: {
    Authorization: 'Bearer your-token',
    'X-Language': 'zh-CN'
  },

  // 凭证模式
  credentials: 'include'
})

// 设置认证
client.setAuthToken('new-token')

// 设置单个请求头
client.setHeader('X-Request-ID', 'unique-id')
```

## 与其他特性结合

### 与拦截器结合

```typescript
const client = createGraphQLClient('/graphql')

// 添加请求拦截器
client.request.interceptors.request.use((config) => {
  // 添加 GraphQL 所需的请求头
  return {
    ...config,
    headers: {
      ...config.headers,
      'Content-Type': 'application/json'
    }
  }
})
```

### 与缓存结合

```typescript
// 使用 useRequest 的 SWR 模式
const { data } = useRequestSWR(
  () => ['query', variables],
  ([query, vars]) => client.query(query, vars),
  { swr: true }
)
```
