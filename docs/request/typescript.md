# TypeScript 指南

`@yh-ui/request` 从设计之初就将 **零 any、端到端类型安全** 作为核心目标，本章节总结实际使用中的类型技巧与推荐写法。

## 基础泛型

```typescript
// GET 请求：第一个泛型为响应数据类型
const { data } = await request.get<User>('/api/users/1')
// data: User

// POST 请求：第一个泛型为响应体，第二个泛型为请求体
const { data: created } = await request.post<User, CreateUserDTO>('/api/users', {
  name: '张三',
  email: 'zhangsan@example.com'
})
// created: User
```

结合 `useRequest`：

```typescript
const { data, loading } = useRequest<User[]>(() => request.get<User[]>('/api/users'))
```

## 路径参数类型安全

```typescript
import { buildPath, type PathParams } from '@yh-ui/request'

type UserPath = '/api/users/:id/:commentId'
type UserParams = PathParams<UserPath>
// => { id: string; commentId: string }

const url = buildPath('/api/users/:id/:commentId', {
  id: '1',
  commentId: '2'
})
// url: '/api/users/1/2'
```

如果遗漏参数或类型不匹配，TS 会立即报错。

## 响应封装类型

```typescript
interface ApiResponse<T> {
  code: number
  data: T
  message: string
  success: boolean
}

// 统一包装
const { data } = await request.get<ApiResponse<User>>('/api/user/1')

if (data.success) {
  // data.data: User
}
```

结合 `useRequest` 的 `formatResult`：

```typescript
const { data } = useRequest<User>(() => request.get<ApiResponse<User>>('/api/user/1'), {
  formatResult: (res) => res.data.data
})
```

## Hook 泛型参数

### useRequest

```typescript
const { data, run } = useRequest<User, [number]>((id) => request.get<User>(`/api/users/${id}`), {
  defaultParams: [1]
})
```

这里：

- `User`：返回数据类型；
- `[number]`：`run` 的参数元组类型。

### usePagination

```typescript
interface PageResult<T> {
  list: T[]
  total: number
}

const { data, pagination } = usePagination<PageResult<User>, [number, number]>((page, size) =>
  request.get<PageResult<User>>('/api/users', {
    params: { page, pageSize: size }
  })
)
```

### useLoadMore / useQueue

```typescript
const { data } = useLoadMore<User[]>((page, size) =>
  request.get<User[]>('/api/users', { params: { page, pageSize: size } })
)

const queue = useQueue<string>() // 队列任务结果为 string
```

## 自定义错误类型

```typescript
interface BizError extends RequestError {
  bizCode?: string
}

request.interceptors.response.use((response) => {
  const data = response.data
  if (data && data.code !== 0) {
    const error: BizError = Object.assign(new Error(data.message), {
      bizCode: data.code,
      response: response.response,
      config: response.config
    })
    return Promise.reject(error)
  }
  return response
})
```

组件中精确区分业务错误：

```typescript
const { error } = useRequest(() => request.get('/api/users'))

if (error.value && (error.value as BizError).bizCode === 'NO_PERMISSION') {
  // 渲染无权限提示
}
```

## 与类型工具库配合

```typescript
type UserId = User['id']
type UserList = User[]

type ListResult<T> = {
  list: T[]
  total: number
}

type UserListResult = ListResult<User>

const { data } = await request.get<UserListResult>('/api/users')
```

## 最佳实践

- **拒绝 any**：所有请求/响应都显式指定泛型；
- **接口定义集中管理**：在 `src/types/api.ts` 等文件中集中维护后端接口类型；
- **Hook + 类型别名**：为常用接口封装 `useUserList`、`useUserDetail` 等，并配好类型，避免在业务组件中重复写泛型。
