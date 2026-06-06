# TypeScript Guide

`@yh-ui/request` takes **zero any, end-to-end type safety** as a core goal from the beginning of design. This chapter summarizes type techniques and recommended usage in actual usage.

## Basic Generics

```typescript
// GET request: first generic is response data type
const { data } = await request.get<User>('/api/users/1')
// data: User

// POST request: first generic is response, second is request body
const { data: created } = await request.post<User, CreateUserDTO>('/api/users', {
  name: 'John',
  email: 'john@example.com'
})
// created: User
```

Combine with `useRequest`:

```typescript
const { data, loading } = useRequest<User[]>(() => request.get<User[]>('/api/users'))
```

## Path Parameter Type Safety

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

If parameters are missing or types don't match, TS will immediately report an error.

## Response Wrapper Types

```typescript
interface ApiResponse<T> {
  code: number
  data: T
  message: string
  success: boolean
}

// Unified wrapper
const { data } = await request.get<ApiResponse<User>>('/api/user/1')

if (data.success) {
  // data.data: User
}
```

Combine with `useRequest` `formatResult`:

```typescript
const { data } = useRequest<User>(() => request.get<ApiResponse<User>>('/api/user/1'), {
  formatResult: (res) => res.data.data
})
```

## Hook Generic Parameters

### useRequest

```typescript
const { data, run } = useRequest<User, [number]>((id) => request.get<User>(`/api/users/${id}`), {
  defaultParams: [1]
})
```

Here:

- `User`: Return data type;
- `[number]`: Parameter tuple type for `run`.

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

const queue = useQueue<string>() // Queue task result is string
```

## Custom Error Types

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

Distinguish business errors precisely in components:

```typescript
const { error } = useRequest(() => request.get('/api/users'))

if (error.value && (error.value as BizError).bizCode === 'NO_PERMISSION') {
  // Render no permission prompt
}
```

## Combine with Type Utility Libraries

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

## Best Practices

- **Reject any**: Explicitly specify generics for all requests/responses;
- **Centralize interface definitions**: Maintain backend interface types in centralized files like `src/types/api.ts`;
- **Hooks + Type Aliases**: Encapsulate frequently used interfaces as `useUserList`, `useUserDetail`, etc. with types, avoid repeatedly writing generics in business components.
