# useAiPersistence Conversation Persistence Hook

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

## Basic Usage

The `useAiPersistence` hook provides conversation history persistence based on IndexedDB.

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

| Property          | Description                  | Type             | Default                  |
| ----------------- | ---------------------------- | ---------------- | ------------------------ |
| `storage`         | Custom storage adapter       | `StorageAdapter` | `new IndexedDBAdapter()` |
| `conversationKey` | Persistent storage key       | `string`         | `'ai-conversations'`     |
| `autoSave`        | Save automatically on change | `boolean`        | `true`                   |

### Return Value

| Property              | Description               | Type                  |
| --------------------- | ------------------------- | --------------------- |
| conversations         | List of all conversations | `Ref<Conversation[]>` |
| currentConversationId | Current conversation ID   | `Ref<string \| null>` |
| isLoading             | Whether loading           | `Ref<boolean>`        |
| isSaving              | Whether saving            | `Ref<boolean>`        |
| error                 | Error message             | `Ref<Error \| null>`  |

### Methods

| Method Name              | Description                | Parameters                                                                         |
| ------------------------ | -------------------------- | ---------------------------------------------------------------------------------- |
| loadConversations        | Load conversations         | `() => Promise<void>`                                                              |
| saveConversations        | Save conversations         | `() => Promise<void>`                                                              |
| createConversation       | Create new conversation    | `(title?: string) => Conversation`                                                 |
| deleteConversation       | Delete conversation        | `(id: string) => void`                                                             |
| getCurrentConversation   | Get current conversation   | `() => Conversation \| undefined`                                                  |
| addMessage               | Add message                | `(message: Omit<ConversationMessage, 'id' \| 'timestamp'>) => ConversationMessage \| undefined` |
| updateMessage            | Update message             | `(messageId: string, updates: Partial<ConversationMessage>) => void`               |
| clearCurrentConversation | Clear current conversation | `() => void`                                                                       |
| exportConversations      | Export conversations       | `() => string`                                                                     |
| importConversations      | Import conversations       | `(json: string) => Promise<boolean>`                                               |
| setCurrentConversation   | Set current conversation   | `(id: string) => void`                                                             |

## Type Definitions

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

## Storage Adapters

### Using Custom Storage

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

Uses IndexedDB storage by default, suitable for browser environments.

### APIClient

Configurable backend API client with reserved interfaces for enterprise backend services.
