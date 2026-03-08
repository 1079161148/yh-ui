# 基础用法

## 快速开始

```typescript
import { request } from '@yh-ui/request'

// GET 请求
const response = await request.get('/api/users')
console.log(response.data)

// POST 请求
const response = await request.post('/api/users', { name: '张三' })
console.log(response.data)
```

## RESTful 方法

```typescript
// GET - 获取数据
const users = await request.get('/api/users')

// POST - 创建数据
const newUser = await request.post('/api/users', {
  name: '张三',
  email: 'zhangsan@example.com'
})

// PUT - 完整更新
const updatedUser = await request.put('/api/users/1', {
  name: '张三（已修改）'
})

// PATCH - 部分更新
const patchedUser = await request.patch('/api/users/1', {
  name: '张三'
})

// DELETE - 删除数据
await request.delete('/api/users/1')

// HEAD - 获取头部信息
await request.head('/api/users')

// OPTIONS - 获取支持的请求方法
await request.options('/api/users')
```

## 泛型支持

```typescript
interface User {
  id: number
  name: string
  email: string
}

// 自动推断响应类型
const { data } = await request.get<User>('/api/users/1')
// data: User

// POST 请求泛型
const { data: newUser } = await request.post<User, CreateUserDTO>('/api/users', {
  name: '张三',
  email: 'zhangsan@example.com'
})
// newUser: User
```

## 请求配置

```typescript
// 完整配置
const response = await request.get('/api/users', {
  // 基础 URL
  baseURL: 'https://api.example.com',

  // URL 参数
  params: {
    page: 1,
    pageSize: 10,
    status: 'active'
  },

  // 请求头
  headers: {
    Authorization: 'Bearer token'
  },

  // 超时时间 (ms)
  timeout: 30000,

  // 响应类型
  responseType: 'json',

  // 请求凭证
  credentials: 'same-origin',

  // 是否 retry
  retry: true,
  retryTimes: 3,
  retryDelay: 1000
})
```

## 路径参数

```typescript
import { buildPath, type PathParams } from '@yh-ui/request'

// 路径参数类型
type UserParams = PathParams<'/api/users/:id'>
// => { id: string }

// 构建 URL
const url = buildPath('/api/users/:id', { id: '123' })
// => '/api/users/123'
```

## 错误处理

```typescript
try {
  const { data } = await request.get('/api/users')
} catch (error) {
  if (error.isCanceled) {
    console.log('请求已取消')
  } else if (error.isTimeout) {
    console.log('请求超时')
  } else if (error.isNetworkError) {
    console.log('网络错误')
  } else {
    console.log(error.message)
  }
}
```

## 取消请求

```typescript
// 创建 AbortController
const controller = new AbortController()

// 发送可取消的请求
request.get('/api/users', {
  signal: controller.signal
})

// 取消请求
controller.abort()

// 使用 requestKey 自动取消
request.get('/api/users', {
  requestKey: 'users-list'
})

// 取消指定 key 的请求
request.cancel('users-list')

// 取消所有请求
request.cancelAll()
```

## 下一步

- [请求配置](./config) - 完整配置选项
- [拦截器](./interceptors) - 请求/响应拦截
- [缓存策略](./cache) - 数据缓存
