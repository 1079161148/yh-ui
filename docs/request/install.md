# 安装

## 环境要求

- Vue 3.5+
- TypeScript 5.x
- Node.js 18+

## 安装方式

### npm

```bash
npm install @yh-ui/request
```

### yarn

```bash
yarn add @yh-ui/request
```

### pnpm

```bash
pnpm add @yh-ui/request
```

## 快速配置

### 全局配置

```typescript
import { createRequest } from '@yh-ui/request'

// 创建请求实例
const request = createRequest({
  baseURL: 'https://api.example.com',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 设置拦截器
request.interceptors.request.use((config) => {
  // 添加认证 token
  config.headers.Authorization = `Bearer ${token}`
  return config
})

export { request }
```

### Vue 插件方式

```typescript
import { createApp } from 'vue'
import { RequestPlugin, request } from '@yh-ui/request'

const app = createApp(App)

// 使用插件
app.use(RequestPlugin, {
  baseURL: 'https://api.example.com'
})

app.mount('#app')
```

## TypeScript 配置

确保 `tsconfig.json` 包含以下配置：

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

## 浏览器兼容

| 浏览器  | 最低版本 |
| ------- | -------- |
| Chrome  | 80+      |
| Firefox | 78+      |
| Safari  | 14.1+    |
| Edge    | 80+      |

## 下一步

- [基础用法](./basic) - 快速入门
- [请求配置](./config) - 完整配置选项
