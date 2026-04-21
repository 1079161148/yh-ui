# useAiPersistence 对话持久化 Hook

<script setup lang="ts">
import { useAiPersistence } from '@yh-ui/hooks'

const {
  conversations,
  currentConversationId,
  isLoading,
  isSaving,
  error,
  createConversation,
  deleteConversation,
  getCurrentConversation,
  addMessage,
  updateMessage,
  clearCurrentConversation,
  exportConversations,
  importConversations,
  setCurrentConversation
} = useAiPersistence()
</script>

<Demos>

</Demos>

## 基础用法

`useAiPersistence` Hook 提供了对话历史持久化功能，基于 IndexedDB 实现。

```ts
import { useAiPersistence } from '@yh-ui/hooks'

const {
  conversations,
  currentConversationId,
  createConversation,
  addMessage
  // ...
} = useAiPersistence()
```

## API

### Options

| 参数              | 说明               | 类型             | 默认值                   |
| ----------------- | ------------------ | ---------------- | ------------------------ |
| `storage`         | 自定义存储适配器   | `StorageAdapter` | `new IndexedDBAdapter()` |
| `conversationKey` | 持久化存储 key     | `string`         | `'ai-conversations'`     |
| `autoSave`        | 数据变更后自动保存 | `boolean`        | `true`                   |

### 返回值

| 属性                  | 说明         | 类型                  |
| --------------------- | ------------ | --------------------- |
| conversations         | 所有对话列表 | `Ref<Conversation[]>` |
| currentConversationId | 当前对话 ID  | `Ref<string \| null>` |
| isLoading             | 是否正在加载 | `Ref<boolean>`        |
| isSaving              | 是否正在保存 | `Ref<boolean>`        |
| error                 | 错误信息     | `Ref<Error \| null>`  |

### 方法

| 方法名                   | 说明         | 参数                                                                               |
| ------------------------ | ------------ | ---------------------------------------------------------------------------------- |
| loadConversations        | 加载对话     | `() => Promise<void>`                                                              |
| saveConversations        | 保存对话     | `() => Promise<void>`                                                              |
| createConversation       | 创建对话     | `(title?: string) => Conversation`                                                 |
| deleteConversation       | 删除对话     | `(id: string) => void`                                                             |
| getCurrentConversation   | 获取当前对话 | `() => Conversation \| undefined`                                                  |
| addMessage               | 添加消息     | `(message: Omit<ConversationMessage, 'id' \| 'timestamp'>) => ConversationMessage \| undefined` |
| updateMessage            | 更新消息     | `(messageId: string, updates: Partial<ConversationMessage>) => void`               |
| clearCurrentConversation | 清空当前对话 | `() => void`                                                                       |
| exportConversations      | 导出对话     | `() => string`                                                                     |
| importConversations      | 导入对话     | `(json: string) => Promise<boolean>`                                               |
| setCurrentConversation   | 设置当前对话 | `(id: string) => void`                                                             |

## 类型定义

### Conversation

```ts
interface Conversation {
  id: string
  title: string
  messages: ConversationMessage[]
  createdAt: number
  updatedAt: number
}
```

### ConversationMessage

```ts
interface ConversationMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: number
  metadata?: Record<string, any>
}
```

## 存储适配器

### 使用自定义存储

```ts
import { useAiPersistence } from '@yh-ui/hooks'
import { APIClient } from '@yh-ui/hooks'

const apiClient = new APIClient('https://api.example.com', {
  Authorization: 'Bearer token'
})

const { conversations } = useAiPersistence({
  storage: apiClient,
  conversationKey: 'my-conversations'
})
```

### IndexedDBAdapter

默认使用 IndexedDB 存储，适合浏览器环境。

### APIClient

可配置的后端 API 客户端，预留接口用于对接企业后端服务。
