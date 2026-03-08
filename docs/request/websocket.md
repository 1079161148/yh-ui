# WebSocket 支持

`@yh-ui/request` 提供完整的 WebSocket 支持，包括自动重连、心跳检测、消息队列等功能。

## 基本用法

### 创建连接

```typescript
import { createWebSocket } from '@yh-ui/request'

const ws = createWebSocket({
  url: 'wss://api.example.com/ws',
  reconnect: true,
  heartbeat: true
})

// 监听消息
ws.onMessage((message) => {
  console.log('收到消息:', message.data)
})

// 发送消息
ws.send({ type: 'ping' })

// 断开连接
ws.disconnect()
```

## useWebSocket Hook

推荐在 Vue 组件中使用 `useWebSocket` Hook。

```typescript
import { useWebSocket } from '@yh-ui/request'

const { state, isConnected, lastMessage, connect, disconnect, send } = useWebSocket({
  url: 'wss://api.example.com/ws',
  reconnect: true,
  heartbeat: true
})

// 连接
await connect()

// 发送消息
send({ type: 'message', content: 'Hello' })

// 断开
disconnect()
```

## 配置选项

### 基础配置

| 选项                   | 类型                 | 默认值  | 说明                 |
| ---------------------- | -------------------- | ------- | -------------------- |
| `url`                  | `string`             | -       | WebSocket 服务器地址 |
| `protocols`            | `string \| string[]` | -       | WebSocket 子协议     |
| `reconnect`            | `boolean`            | `true`  | 是否自动重连         |
| `reconnectMaxAttempts` | `number`             | `10`    | 最大重连次数         |
| `reconnectInterval`    | `number`             | `1000`  | 初始重连间隔 (ms)    |
| `reconnectMaxDelay`    | `number`             | `30000` | 最大重连延迟 (ms)    |

### 心跳配置

| 选项                | 类型      | 默认值  | 说明              |
| ------------------- | --------- | ------- | ----------------- |
| `heartbeat`         | `boolean` | `false` | 是否启用心跳      |
| `heartbeatInterval` | `number`  | `30000` | 心跳间隔 (ms)     |
| `heartbeatTimeout`  | `number`  | `10000` | 心跳超时时间 (ms) |

### 消息配置

| 选项         | 类型                                       | 默认值           | 说明           |
| ------------ | ------------------------------------------ | ---------------- | -------------- |
| `encode`     | `(data: unknown) => string \| ArrayBuffer` | `JSON.stringify` | 消息编码器     |
| `decode`     | `(data: WebSocketData) => unknown`         | JSON 解析        | 消息解码器     |
| `binaryType` | `Blob \| ArrayBuffer`                      | `blob`           | 二进制数据类型 |

## 事件监听

### 监听连接状态

````typescript
const ws = createWebSocket({
  url: 'wss://api.example.com/ws',
})

// 连接成功
ws.onOpen(() => {
  console.log('WebSocket 已连接')
})

// 连接关闭
ws.onClose((code, reason) => {
  console.log(`连接关闭: ${code} - ${reason}`)
})

// 连接错误
ws.onError((error) => {
  console.error('WebSocket 错误:', error)
})

// 状态变化
ws.onStateChange((state) => {
  console.log('状态变化:', state)
  // 'connecting' | 'connected' | 'disconnecting' | 'disconnected' | 'reconnecting' | 'error'
})
消息

```typescript```

### 监听
ws.onMessage((message) => {
  // message 类型
  // {
  //   type: 'text' | 'binary' | 'ping' | 'pong' | 'error',
  //   data: unknown,
  //   raw: WebSocketData,
  //   timestamp: number
  // }

  const { type, data, raw } = message
  console.log(`[${type}]`, data)
})
````

## 自动重连

### 指数退避重连

WebSocket 客户端使用指数退避算法进行重连：

```
第 1 次: 1000ms
第 2 次: 2000ms
第 3 次: 4000ms
...
最大: 30000ms (30秒)
```

### 配置重连

```typescript
const ws = createWebSocket({
  url: 'wss://api.example.com/ws',
  reconnect: true, // 启用重连
  reconnectMaxAttempts: 5, // 最多重连 5 次
  reconnectInterval: 2000, // 初始间隔 2 秒
  reconnectMaxDelay: 10000 // 最大延迟 10 秒
})
```

### 手动重连

```typescript
// 断开后手动重连
ws.connect()
```

## 心跳检测

### 启用心跳

```typescript
const ws = createWebSocket({
  url: 'wss://api.example.com/ws',
  heartbeat: true, // 启用心跳
  heartbeatInterval: 30000, // 每 30 秒发送一次
  heartbeatTimeout: 10000 // 10 秒内未收到响应则断开
})
```

### 自定义心跳消息

默认心跳发送 `ping`，如果服务端使用其他格式：

```typescript
const ws = createWebSocket({
  url: 'wss://api.example.com/ws',
  heartbeat: true,
  encode: (data) => JSON.stringify({ type: 'heartbeat' })
})
```

## 消息队列

### 离线消息

当 WebSocket 未连接时，消息会自动加入队列，连接后自动发送：

```typescript
const ws = createWebSocket({
  url: 'wss://api.example.com/ws'
})

// 连接前发送的消息会进入队列
ws.send({ type: 'message', content: 'Hello' })
ws.send({ type: 'message', content: 'World' })

// 连接后，队列中的消息会自动发送
await ws.connect()
```

### 发送并等待响应

```typescript
// 发送消息并等待服务端响应
const response = await ws.sendAndWait<{ success: boolean }>(
  { type: 'echo', message: 'Hello' },
  5000 // 5 秒超时
)
```

## 二进制数据

### 发送二进制

```typescript
// 发送 ArrayBuffer
const buffer = new ArrayBuffer(8)
const view = new DataView(buffer)
view.setUint8(0, 42)
ws.send(buffer)

// 发送 Blob
const blob = new Blob(['Hello'], { type: 'text/plain' })
ws.send(blob)
```

### 接收二进制

```typescript
ws.onMessage((message) => {
  if (message.type === 'binary') {
    // 处理二进制数据
    const buffer = message.raw.arrayBuffer()
  }
})
```

## Vue 组件示例

### 实时聊天

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useWebSocket } from '@yh-ui/request'

const messages = ref<Array<{ id: string; text: string; time: number }>>([])
const inputText = ref('')

const { isConnected, lastMessage, connect, disconnect, send } = useWebSocket({
  url: 'wss://api.example.com/chat',
  reconnect: true,
  heartbeat: true,
  decode: (data) => JSON.parse(data as string)
})

// 监听新消息
watch(lastMessage, (msg) => {
  if (msg && msg.type === 'text') {
    messages.value.push({
      id: Date.now().toString(),
      text: msg.data.text,
      time: msg.timestamp
    })
  }
})

const sendMessage = () => {
  if (!inputText.value.trim()) return
  send({ type: 'message', text: inputText.value })
  inputText.value = ''
}

onMounted(() => connect())
onUnmounted(() => disconnect())
</script>

<template>
  <div class="chat">
    <div class="status">
      {{ isConnected ? '🟢 已连接' : '🔴 未连接' }}
    </div>

    <div class="messages">
      <div v-for="msg in messages" :key="msg.id" class="message">
        {{ msg.text }}
      </div>
    </div>

    <input v-model="inputText" @keyup.enter="sendMessage" placeholder="输入消息..." />
  </div>
</template>
```

### 实时通知

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useWebSocket } from '@yh-ui/request'

const notifications = ref<string[]>([])

const { isConnected, lastMessage, connect, disconnect } = useWebSocket({
  url: 'wss://api.example.com/notifications',
  reconnect: true,
  onMessage: (msg) => {
    if (msg.type === 'text') {
      notifications.value.unshift(msg.data.message)
    }
  }
})

onMounted(() => connect())
onUnmounted(() => disconnect())
</script>
```

## API 参考

### WebSocketClient

| 方法                         | 说明           |
| ---------------------------- | -------------- |
| `connect()`                  | 连接到服务器   |
| `disconnect(code?, reason?)` | 断开连接       |
| `send(data)`                 | 发送消息       |
| `sendAndWait(data, timeout)` | 发送并等待响应 |
| `onOpen(callback)`           | 监听连接成功   |
| `onClose(callback)`          | 监听连接关闭   |
| `onError(callback)`          | 监听错误       |
| `onMessage(callback)`        | 监听消息       |
| `onStateChange(callback)`    | 监听状态变化   |
| `dispose()`                  | 清理资源       |

### 状态值

| 状态            | 说明     |
| --------------- | -------- |
| `connecting`    | 正在连接 |
| `connected`     | 已连接   |
| `disconnecting` | 正在断开 |
| `disconnected`  | 已断开   |
| `reconnecting`  | 正在重连 |
| `error`         | 发生错误 |
