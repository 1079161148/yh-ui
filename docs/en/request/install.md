# Installation

## Environment Requirements

- Vue 3.5+
- TypeScript 5.x
- Node.js 18+

## Installation Methods

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

## Quick Configuration

### Global Configuration

```typescript
import { createRequest } from '@yh-ui/request'

// Create request instance
const request = createRequest({
  baseURL: 'https://api.example.com',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Set interceptors
request.interceptors.request.use((config) => {
  // Add auth token
  config.headers.Authorization = `Bearer ${token}`
  return config
})

export { request }
```

### Vue Plugin

```typescript
import { createApp } from 'vue'
import { RequestPlugin, request } from '@yh-ui/request'

const app = createApp(App)

// Use plugin
app.use(RequestPlugin, {
  baseURL: 'https://api.example.com'
})

app.mount('#app')
```

## TypeScript Configuration

Ensure `tsconfig.json` includes the following:

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

## Browser Compatibility

| Browser | Minimum Version |
| ------- | --------------- |
| Chrome  | 80+             |
| Firefox | 78+             |
| Safari  | 14.1+           |
| Edge    | 80+             |

## Next Steps

- [Basic Usage](./basic) - Quick start
- [Request Config](./config) - Complete configuration options
