# 响应处理

## 响应结构

`@yh-ui/request` 会返回标准化的响应对象，包含完整的信息。

```typescript
interface RequestResponse<T = unknown> {
  /** 响应数据 */
  data: T
  /** 原始响应 */
  response: Response
  /** 请求配置 */
  config: InternalRequestOptions
  /** 请求 ID */
  requestId: string
  /** 请求耗时 (ms) */
  duration?: number
}
```

## 基础用法

```typescript
import { request } from '@yh-ui/request'

// GET 请求
const { data, response, requestId, duration } = await request.get('/api/users')
console.log(data)
console.log(`请求耗时: ${duration}ms`)

// POST 请求
const { data: newUser } = await request.post('/api/users', {
  name: '张三',
  email: 'zhangsan@example.com'
})
```

## 类型推断

利用泛型自动推断响应类型，获得完整的 TypeScript 类型支持。

```typescript
interface User {
  id: number
  name: string
  email: string
}

// 自动推断 data 类型为 User
const { data } = await request.get<User>('/api/users/1')
// data: User

// POST 请求泛型
interface CreateUserDTO {
  name: string
  email: string
}

const { data: createdUser } = await request.post<User, CreateUserDTO>('/api/users', {
  name: '张三',
  email: 'zhangsan@example.com'
})
// createdUser: User (包含服务器返回的完整数据，包括 id)
```

## 响应类型

支持多种响应格式，通过 `responseType` 指定。

```typescript
// JSON (默认)
const { data } = await request.get('/api/data')

// 文本
const text = await request.get('/api/text', {
  responseType: 'text'
})
// text.data: string

// Blob (文件下载)
const blob = await request.get('/api/file', {
  responseType: 'blob'
})
// blob.data: Blob

// ArrayBuffer (二进制数据)
const buffer = await request.get('/api/binary', {
  responseType: 'arraybuffer'
})
// buffer.data: ArrayBuffer

// FormData
const formData = await request.get('/api/form', {
  responseType: 'formdata'
})
// formData.data: FormData
```

## 原始响应

如果需要访问原始 Response 对象，可以设置 `rawResponse: true`。

```typescript
const { response, data } = await request.get('/api/users', {
  rawResponse: true
})

// 访问原始响应头
console.log(response.headers.get('Content-Type'))

// 访问原始响应状态
console.log(response.status)
console.log(response.ok)
```

## 错误处理

请求失败时会抛出 `RequestError`，包含丰富的错误信息。

```typescript
import { request } from '@yh-ui/request'

try {
  const { data } = await request.get('/api/users')
} catch (error) {
  // 判断错误类型
  if (error.isCanceled) {
    console.log('请求已取消')
  } else if (error.isTimeout) {
    console.log('请求超时')
  } else if (error.isNetworkError) {
    console.log('网络错误')
  } else {
    // HTTP 错误
    console.log(error.message) // 错误消息
    console.log(error.response?.status) // HTTP 状态码
    console.log(error.code) // 错误代码
    console.log(error.requestId) // 请求 ID，便于排查
  }
}
```

## 回退数据

可以通过 `fallbackData` 设置请求失败时的回退数据。

```typescript
const { data } = await request.get('/api/user', {
  fallbackData: { name: '默认用户', id: 0 } // 类型须与泛型一致
})

// 即使请求失败，data 也有值
console.log(data.name) // '默认用户'
```

## 请求耗时

每个响应都包含请求耗时信息，可用于性能监控。

```typescript
const start = Date.now()
const { duration } = await request.get('/api/users')
console.log(`本次请求耗时: ${duration}ms`)

// 可以结合拦截器记录所有请求耗时
request.interceptors.response.use((response) => {
  console.log(`请求 ${response.requestId} 耗时: ${response.duration}ms`)
  return response
})
```

## 下一步

- [请求配置](./config) - 完整配置选项
- [拦截器](./interceptors) - 请求/响应拦截
- [缓存策略](./cache) - 数据缓存
