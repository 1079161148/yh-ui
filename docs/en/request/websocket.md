# WebSocket Support

`@yh-ui/request` provides complete WebSocket support, including auto-reconnection, heartbeat detection, message queuing, and more.

## Basic Usage

### Create Connection

```typescript
import { createWebSocket } from '@yh-ui/request'

const ws = createWebSocket({
  url: 'wss://api.example.com/ws',
  reconnect: true,
  heartbeat: true
})

// Listen for messages
ws.onMessage((message) => {
  console.log('Received:', message.data)
})

// Send message
ws.send({ type: 'ping' })

// Disconnect
ws.disconnect()
```

## useWebSocket Hook

Recommended for use in Vue components.

```typescript
import { useWebSocket } from '@yh-ui/request'

const { state, isConnected, lastMessage, connect, disconnect, send } = useWebSocket({
  url: 'wss://api.example.com/ws',
  reconnect: true,
  heartbeat: true
})

// Connect
await connect()

// Send message
send({ type: 'message', content: 'Hello' })

// Disconnect
disconnect()
```

## Configuration Options

### Basic Configuration

| Option                 | Type                 | Default | Description                     |
| ---------------------- | -------------------- | ------- | ------------------------------- |
| `url`                  | `string`             | -       | WebSocket server URL            |
| `protocols`            | `string \| string[]` | -       | WebSocket subprotocols          |
| `reconnect`            | `boolean`            | `true`  | Auto-reconnect                  |
| `reconnectMaxAttempts` | `number`             | `10`    | Max reconnect attempts          |
| `reconnectInterval`    | `number`             | `1000`  | Initial reconnect interval (ms) |
| `reconnectMaxDelay`    | `number`             | `30000` | Max reconnect delay (ms)        |

### Heartbeat Configuration

| Option              | Type      | Default | Description             |
| ------------------- | --------- | ------- | ----------------------- |
| `heartbeat`         | `boolean` | `false` | Enable heartbeat        |
| `heartbeatInterval` | `number`  | `30000` | Heartbeat interval (ms) |
| `heartbeatTimeout`  | `number`  | `10000` | Heartbeat timeout (ms)  |

### Message Configuration

| Option       | Type                                       | Default          | Description      |
| ------------ | ------------------------------------------ | ---------------- | ---------------- |
| `encode`     | `(data: unknown) => string \| ArrayBuffer` | `JSON.stringify` | Message encoder  |
| `decode`     | `(data: WebSocketData) => unknown`         | JSON parse       | Message decoder  |
| `binaryType` | `Blob \| ArrayBuffer`                      | `blob`           | Binary data type |

## Event Listeners

### Listen for Connection State

```typescript
const ws = createWebSocket({
  url: 'wss://api.example.com/ws'
})

// Connection opened
ws.onOpen(() => {
  console.log('WebSocket connected')
})

// Connection closed
ws.onClose((code, reason) => {
  console.log(`Connection closed: ${code} - ${reason}`)
})

// Connection error
ws.onError((error) => {
  console.error('WebSocket error:', error)
})

// State change
ws.onStateChange((state) => {
  console.log('State changed:', state)
  // 'connecting' | 'connected' | 'disconnecting' | 'disconnected' | 'reconnecting' | 'error'
})
```

### Listen for Messages

```typescript
ws.onMessage((message) => {
  // message type
  // {
  //   type: 'text' | 'binary' | 'ping' | 'pong' | 'error',
  //   data: unknown,
  //   raw: WebSocketData,
  //   timestamp: number
  // }

  const { type, data, raw } = message
  console.log(`[${type}]`, data)
})
```

## Auto Reconnection

### Exponential Backoff

The WebSocket client uses exponential backoff algorithm for reconnection:

```
Attempt 1: 1000ms
Attempt 2: 2000ms
Attempt 3: 4000ms
...
Max: 30000ms (30 seconds)
```

### Configure Reconnection

```typescript
const ws = createWebSocket({
  url: 'wss://api.example.com/ws',
  reconnect: true, // Enable reconnection
  reconnectMaxAttempts: 5, // Max 5 attempts
  reconnectInterval: 2000, // Initial interval 2 seconds
  reconnectMaxDelay: 10000 // Max delay 10 seconds
})
```

### Manual Reconnection

```typescript
// Manual reconnect after disconnect
ws.connect()
```

## Heartbeat Detection

### Enable Heartbeat

```typescript
const ws = createWebSocket({
  url: 'wss://api.example.com/ws',
  heartbeat: true, // Enable heartbeat
  heartbeatInterval: 30000, // Send every 30 seconds
  heartbeatTimeout: 10000 // Disconnect if no response within 10 seconds
})
```

### Custom Heartbeat Message

By default heartbeat sends `ping`. If server uses different format:

```typescript
const ws = createWebSocket({
  url: 'wss://api.example.com/ws',
  heartbeat: true,
  encode: (data) => JSON.stringify({ type: 'heartbeat' })
})
```

## Message Queue

### Offline Messages

When WebSocket is not connected, messages are automatically queued and sent after connection:

```typescript
const ws = createWebSocket({
  url: 'wss://api.example.com/ws'
})

// Messages sent before connection will be queued
ws.send({ type: 'message', content: 'Hello' })
ws.send({ type: 'message', content: 'World' })

// After connection, queued messages will be sent automatically
await ws.connect()
```

### Send and Wait for Response

```typescript
// Send message and wait for server response
const response = await ws.sendAndWait<{ success: boolean }>(
  { type: 'echo', message: 'Hello' },
  5000 // 5 second timeout
)
```

## Binary Data

### Send Binary

```typescript
// Send ArrayBuffer
const buffer = new ArrayBuffer(8)
const view = new DataView(buffer)
view.setUint8(0, 42)
ws.send(buffer)

// Send Blob
const blob = new Blob(['Hello'], { type: 'text/plain' })
ws.send(blob)
```

### Receive Binary

```typescript
ws.onMessage((message) => {
  if (message.type === 'binary') {
    // Handle binary data
    const buffer = message.raw.arrayBuffer()
  }
})
```

## Vue Component Examples

### Real-time Chat

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

// Listen for new messages
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
      {{ isConnected ? '🟢 Connected' : '🔴 Disconnected' }}
    </div>

    <div class="messages">
      <div v-for="msg in messages" :key="msg.id" class="message">
        {{ msg.text }}
      </div>
    </div>

    <input v-model="inputText" @keyup.enter="sendMessage" placeholder="Type a message..." />
  </div>
</template>
```

### Real-time Notifications

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

## API Reference

### WebSocketClient

| Method                       | Description                   |
| ---------------------------- | ----------------------------- |
| `connect()`                  | Connect to server             |
| `disconnect(code?, reason?)` | Disconnect                    |
| `send(data)`                 | Send message                  |
| `sendAndWait(data, timeout)` | Send and wait for response    |
| `onOpen(callback)`           | Listen for connection success |
| `onClose(callback)`          | Listen for connection close   |
| `onError(callback)`          | Listen for errors             |
| `onMessage(callback)`        | Listen for messages           |
| `onStateChange(callback)`    | Listen for state changes      |
| `dispose()`                  | Cleanup resources             |

### State Values

| State           | Description    |
| --------------- | -------------- |
| `connecting`    | Connecting     |
| `connected`     | Connected      |
| `disconnecting` | Disconnecting  |
| `disconnected`  | Disconnected   |
| `reconnecting`  | Reconnecting   |
| `error`         | Error occurred |
