# useAiChat Data Responsive Stream

<script setup lang="ts">
import { ref } from 'vue'
import type { AiChatMessage } from '@yh-ui/hooks'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'


const tsBasic = `<${_T}>
  <div style="height: 480px; border: 1px solid var(--yh-border-color); border-radius: 8px;">
    <!-- Pure UI view component, driven by Headless Hook -->
    <yh-ai-chat 
      :messages="messages" 
      :loading="isGenerating" 
      @send="sendMessage" 
      @clear="clear" 
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { useAiChat } from '@yh-ui/hooks'
import type { AiChatMessage } from '@yh-ui/hooks'


// Mocking the backend AI stream / async response adapter
const mockRequest = async (message: string, history: AiChatMessage[], abortSignal: AbortSignal) => {
  return new Promise<string>((resolve, reject) => {
    let timeout: ReturnType<typeof setTimeout> | undefined
    // Listen to abort event
    abortSignal.addEventListener('abort', () => {
      clearTimeout(timeout)
      reject(new DOMException('Aborted', 'AbortError'))
    })
    
    timeout = setTimeout(() => {
      resolve('After simulated latency, here is my response: ' + message)
    }, 1500)
  })
}

// Core state takeover: just one line of code!
const { messages, isGenerating, sendMessage, clear } = useAiChat({
  request: mockRequest
})
</${_S}>`

const tsStream = `<${_T}>
  <div style="height: 520px; border: 1px solid var(--yh-border-color); border-radius: 8px; display: flex; flex-direction: column; overflow: hidden;">
    <yh-ai-chat 
      style="flex: 1; min-height: 0;"
      :messages="messages" 
      :loading="isGenerating" 
      @send="sendMessage" 
      @clear="clear" 
    />
    <div style="padding: 12px; border-top: 1px solid var(--yh-border-color); display: flex; gap: 8px; background: var(--yh-bg-color-page);">
      <yh-button type="danger" :disabled="!isGenerating" @click="stop">Force Interrupt</yh-button>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { useAiChat } from '@yh-ui/hooks'

// Pure Generator stream (Typewriter effect)
const mockStreamRequest = async function* (message: string, history: AiChatMessage[], abortSignal: AbortSignal) {
  const chars = ('Based on your question [' + message + '], here is my real-time reasoning process:\\n\\n' + 'I am an AI roaming in the frontend world, happy to help you.').split('')
  
  for (let i = 0; i < chars.length; i++) {
    // Detect if forced to abort
    if (abortSignal.aborted) throw new DOMException('Aborted', 'AbortError')
    
    // Simulate chunk network latency
    await new Promise(r => setTimeout(r, 60))
    yield chars[i]
  }
}

const { messages, isGenerating, sendMessage, stop, clear } = useAiChat({
  request: mockStreamRequest
})
</${_S}>`

const tsConv = `<${_T}>
  <div style="display: flex; gap: 16px;">
    <div style="width: 260px; border: 1px solid var(--yh-border-color); border-radius: 8px; padding: 12px;">
      <div style="font-weight: bold; margin-bottom: 12px;">My Conversations</div>
      <yh-button type="primary" style="width: 100%; margin-bottom: 12px;" @click="handleCreate">New Chat +</yh-button>
      <div 
        v-for="conv in conversations" 
        :key="conv.id" 
        style="padding: 8px; border-radius: 6px; margin-bottom: 8px; cursor: pointer; background: var(--yh-bg-color-page); display: flex; justify-content: space-between;"
      >
        <span>{{ conv.title }}</span>
        <span @click.stop="removeConversation(conv.id)" style="color: var(--yh-color-danger)">Delete</span>
      </div>
    </div>
    
    <div style="flex: 1; border: 1px solid var(--yh-border-color); border-radius: 8px; padding: 24px; display: flex; align-items: center; justify-content: center;">
      <span style="color: var(--yh-text-color-secondary)">Handled by <code>useAiConversations</code></span>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { useAiConversations } from '@yh-ui/hooks'

const { conversations, createConversation, removeConversation } = useAiConversations({
  initialConversations: [
    { id: '1', title: 'Vue 3 Best Practices', updatedAt: Date.now() },
    { id: '2', title: 'Write a sorting algorithm', updatedAt: Date.now() }
  ]
})

const handleCreate = () => {
  createConversation('New Topic ' + new Date().toLocaleTimeString())
}
</${_S}>`

// ----- Demo Implementation -----
import { useAiChat, useAiConversations } from '@yh-ui/hooks'

const mockRequest = async (message: string, history: AiChatMessage[], abortSignal: AbortSignal) => {
  return new Promise<string>((resolve, reject) => {
    let timeout: ReturnType<typeof setTimeout> | undefined
    abortSignal.addEventListener('abort', () => {
      clearTimeout(timeout)
      reject(new DOMException('Aborted', 'AbortError'))
    })
    
    timeout = setTimeout(() => {
      resolve('After simulated latency, here is my response: ' + message)
    }, 1500)
  })
}

const chat1 = useAiChat({ request: mockRequest })

const mockStreamRequest = async function* (message: string, history: AiChatMessage[], abortSignal: AbortSignal) {
  const chars = ('Based on your question [' + message + '], here is my real-time reasoning process:\\n\\n' + 'I am an AI roaming in the frontend world, happy to help you.').split('')
  
  for (let i = 0; i < chars.length; i++) {
    if (abortSignal.aborted) throw new DOMException('Aborted', 'AbortError')
    await new Promise((r) => setTimeout(r, 60))
    yield chars[i]
  }
}

const chat2 = useAiChat({ request: mockStreamRequest })

const convHook = useAiConversations({
  initialConversations: [
    { id: '1', title: 'Vue 3 Best Practices', updatedAt: Date.now() },
    { id: '2', title: 'Write a sorting algorithm', updatedAt: Date.now() }
  ]
})
const handleCreate = () => {
  convHook.createConversation('New Topic ' + new Date().toLocaleTimeString())
}
</script>

`@yh-ui/hooks` provides extremely powerful **Headless Hooks Abstraction** for AI workflows. The `useAiChat` and `useAiConversations` data engines completely separate visual rendering from pure data modeling.

In a traditional setup, handling AI model REST API requires maintaining Token streams, handling Stop/Abort capabilities, managing loading states, and keeping conversations synchronized.

Now, simply inject a custom `request` functional interceptor to `useAiChat`, and unlock the full-link state cycle immediately.

## Basic Integration

Use simple Promises to take over the isolation state without manually doing `messages.push`.

<DemoBlock title="Minimal Engine" :ts-code="tsBasic" :js-code="toJs(tsBasic)">
  <div style="height: 480px; border: 1px solid var(--yh-border-color); border-radius: 8px;">
    <yh-ai-chat 
      :messages="chat1.messages.value" 
      :loading="chat1.isGenerating.value" 
      @send="chat1.sendMessage" 
      @clear="chat1.clear" 
    />
  </div>
</DemoBlock>

## Native Event Stream and Instant Abort

Most large language models utilize `text/event-stream` for lower Time-To-First-Byte (TTFB).
Just turn your `request` engine into an `AsyncGenerator` (or yield streams). The Hook core automatically converts chunks into brilliant & silky-smooth continuous typewriter outputs!

It safely halts all subsequent fetches entirely by invoking the native browser `AbortController` from `stop()`.

<DemoBlock title="Data Streaming with Native Abort" :ts-code="tsStream" :js-code="toJs(tsStream)">
  <div style="height: 520px; border: 1px solid var(--yh-border-color); border-radius: 8px; display: flex; flex-direction: column; overflow: hidden;">
    <yh-ai-chat 
      style="flex: 1; min-height: 0;"
      :messages="chat2.messages.value" 
      :loading="chat2.isGenerating.value" 
      @send="chat2.sendMessage" 
      @clear="chat2.clear" 
    />
    <div style="padding: 12px; border-top: 1px solid var(--yh-border-color); display: flex; gap: 8px; background: var(--yh-bg-color-page);">
      <yh-button type="danger" :disabled="!chat2.isGenerating.value" @click="chat2.stop">Force Interrupt</yh-button>
    </div>
  </div>
</DemoBlock>

## Conversation Sidebar Navigation (useAiConversations)

A complete ChatGPT-like client requires managing side menus.
The `useAiConversations` quickly sets up immutable data lists for chats that securely handles state changes.

<DemoBlock title="Conversation Management Hook" :ts-code="tsConv" :js-code="toJs(tsConv)">
  <div style="display: flex; gap: 16px;">
  <div style="width: 260px; border: 1px solid var(--yh-border-color); border-radius: 8px; padding: 12px;">
  <div style="font-weight: bold; margin-bottom: 12px;">My Conversations</div>
  <yh-button type="primary" style="width: 100%; margin-bottom: 12px;" @click="handleCreate">New Chat +</yh-button>
  <div 
    v-for="conv in convHook.conversations.value" 
    :key="conv.id" 
    style="padding: 8px; border-radius: 6px; margin-bottom: 8px; cursor: pointer; background: var(--yh-bg-color-page); display: flex; justify-content: space-between;"
  >
  <span>{{ conv.title }}</span>
  <span @click.prevent="convHook.removeConversation(conv.id)" style="color: var(--yh-color-danger)">Delete</span>
  </div>
  </div>
  <div style="flex: 1; border: 1px solid var(--yh-border-color); border-radius: 8px; padding: 24px; display: flex; align-items: center; justify-content: center;">
  <span style="color: var(--yh-text-color-secondary)">Handled by <code>useAiConversations</code></span>
  </div>
  </div>
</DemoBlock>

## API Reference

### useAiChat Options

| Property          | Description                                                                                                         | Type              |
| ----------------- | ------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `initialMessages` | Array of default chat records                                                                                       | `AiChatMessage[]` |
| `request`         | Core response adapter: handles REST or streaming requests (AsyncGenerator) containing history and abort controller. | `Function`        |
| `idGenerator`     | Replaces random ID strings or UUID.                                                                                 | `() => string`    |
| `onError`         | Hook triggered when catching unpredictable errors                                                                   | `(err) => void`   |

### useAiChat Returns

The state hook unpacks all data and methods automatically:

| Property        | Description                                                   | Type                                 |
| --------------- | ------------------------------------------------------------- | ------------------------------------ |
| `messages`      | Returns state representation bound directly to conversations. | `Ref<AiChatMessage[]>`               |
| `isGenerating`  | Checking networking actions.                                  | `Ref<boolean>`                       |
| `sendMessage`   | Main trigger appending custom queries to AI                   | `(content: string) => Promise<void>` |
| `stop`          | Stop streaming and invoke local network suspension.           | `() => void`                         |
| `clear`         | Clears local history tracking window                          | `() => void`                         |
| `removeMessage` | Single deletion handler                                       | `(id: string) => void`               |
