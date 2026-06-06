# useAiChat 数据响应流

<script setup lang="ts">
import type { AiChatMessage } from '@yh-ui/hooks'
import { useAiChat, useAiConversations } from '@yh-ui/hooks'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

const tsBasic = `<${_T}>
  <div style="height: 480px; border: 1px solid var(--yh-border-color); border-radius: 8px;">
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

const mockRequest = async (message: string, history: AiChatMessage[], abortSignal: AbortSignal) => {
  return new Promise<string>((resolve, reject) => {
    let timeout: ReturnType<typeof setTimeout> | undefined

    abortSignal.addEventListener('abort', () => {
      clearTimeout(timeout)
      reject(new DOMException('Aborted', 'AbortError'))
    })

    timeout = setTimeout(() => {
      resolve('这是经过模拟网络延迟后，我为您回复的内容：' + message)
    }, 1500)
  })
}

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
      <yh-button type="danger" :disabled="!isGenerating" @click="stop">强制中止生成</yh-button>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { useAiChat } from '@yh-ui/hooks'
import type { AiChatMessage } from '@yh-ui/hooks'

const mockStreamRequest = async function* (message: string, history: AiChatMessage[], abortSignal: AbortSignal) {
  const chars = ('基于您的提问 [' + message + ']，下面是我实时流式生成的思考过程：\\n\\n' + '我是一只在前端漫游的人工智能，很高兴为您服务。').split('')

  for (let i = 0; i < chars.length; i++) {
    if (abortSignal.aborted) throw new DOMException('Aborted', 'AbortError')
    await new Promise((r) => setTimeout(r, 60))
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
      <div style="font-weight: bold; margin-bottom: 12px;">我的会话</div>
      <yh-button type="primary" style="width: 100%; margin-bottom: 12px;" @click="handleCreate">新会话 +</yh-button>
      <div
        v-for="conv in conversations"
        :key="conv.id"
        style="padding: 8px; border-radius: 6px; margin-bottom: 8px; cursor: pointer; background: var(--yh-bg-color-page); display: flex; justify-content: space-between;"
      >
        <span>{{ conv.title }}</span>
        <span @click.stop="removeConversation(conv.id)" style="color: var(--yh-color-danger)">删除</span>
      </div>
    </div>

    <div style="flex: 1; border: 1px solid var(--yh-border-color); border-radius: 8px; padding: 24px; display: flex; align-items: center; justify-content: center;">
      <span style="color: var(--yh-text-color-secondary)">左侧由 <code>useAiConversations</code> 管理</span>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { useAiConversations } from '@yh-ui/hooks'

const { conversations, createConversation, removeConversation } = useAiConversations({
  initialConversations: [
    { id: '1', title: 'Vue3 最佳实践', updatedAt: Date.now() },
    { id: '2', title: '帮我写个排序算法', updatedAt: Date.now() }
  ]
})

const handleCreate = () => {
  createConversation('新话题 ' + new Date().toLocaleTimeString())
}
</${_S}>`

const mockRequest = async (message: string, history: AiChatMessage[], abortSignal: AbortSignal) => {
  return new Promise<string>((resolve, reject) => {
    let timeout: ReturnType<typeof setTimeout> | undefined

    abortSignal.addEventListener('abort', () => {
      clearTimeout(timeout)
      reject(new DOMException('Aborted', 'AbortError'))
    })

    timeout = setTimeout(() => {
      resolve('这是经过模拟网络延迟后，我为您回复的内容：' + message)
    }, 1500)
  })
}

const chat1 = useAiChat({ request: mockRequest })

const mockStreamRequest = async function* (message: string, history: AiChatMessage[], abortSignal: AbortSignal) {
  const chars = ('基于您的提问 [' + message + ']，下面是我实时流式生成的思考过程：\\n\\n' + '我是一只在前端漫游的人工智能，很高兴为您服务。').split('')

  for (let i = 0; i < chars.length; i++) {
    if (abortSignal.aborted) throw new DOMException('Aborted', 'AbortError')
    await new Promise((r) => setTimeout(r, 60))
    yield chars[i]
  }
}

const chat2 = useAiChat({ request: mockStreamRequest })

const convHook = useAiConversations({
  initialConversations: [
    { id: '1', title: 'Vue3 最佳实践', updatedAt: Date.now() },
    { id: '2', title: '帮我写个排序算法', updatedAt: Date.now() }
  ]
})

const handleCreate = () => {
  convHook.createConversation('新话题 ' + new Date().toLocaleTimeString())
}
</script>

`@yh-ui/hooks` 提供了一套适合 AI 场景的 Headless Hooks。`useAiChat` 负责消息流、请求生命周期和中止控制，`useAiConversations` 负责会话列表与元数据管理。

## 基础请求接管

把你自己的 `request` 函数注入给 `useAiChat`，就可以直接把异步请求结果接到聊天 UI 上。

<DemoBlock title="极简接管" :ts-code="tsBasic" :js-code="toJs(tsBasic)">
  <div style="height: 480px; border: 1px solid var(--yh-border-color); border-radius: 8px;">
    <yh-ai-chat
      :messages="chat1.messages.value"
      :loading="chat1.isGenerating.value"
      @send="chat1.sendMessage"
      @clear="chat1.clear"
    />
  </div>
</DemoBlock>

## 流式生成与强制中止

当 `request` 返回 `AsyncGenerator` 时，`useAiChat` 会自动把流式内容拼成连续输出。调用 `stop()` 时，会同时中止请求与后续渲染。

<DemoBlock title="流式生成与强制中止" :ts-code="tsStream" :js-code="toJs(tsStream)">
  <div style="height: 520px; border: 1px solid var(--yh-border-color); border-radius: 8px; display: flex; flex-direction: column; overflow: hidden;">
    <yh-ai-chat
      style="flex: 1; min-height: 0;"
      :messages="chat2.messages.value"
      :loading="chat2.isGenerating.value"
      @send="chat2.sendMessage"
      @clear="chat2.clear"
    />
    <div style="padding: 12px; border-top: 1px solid var(--yh-border-color); display: flex; gap: 8px; background: var(--yh-bg-color-page);">
      <yh-button type="danger" :disabled="!chat2.isGenerating.value" @click="chat2.stop">强制中止生成</yh-button>
    </div>
  </div>
</DemoBlock>

## 会话状态管理

如果你需要做带左侧会话栏的 AI 页面，可以把会话列表单独交给 `useAiConversations`。

<DemoBlock title="历史会话无头管理" :ts-code="tsConv" :js-code="toJs(tsConv)">
  <div style="display: flex; gap: 16px;">
    <div style="width: 260px; border: 1px solid var(--yh-border-color); border-radius: 8px; padding: 12px;">
      <div style="font-weight: bold; margin-bottom: 12px;">我的会话</div>
      <yh-button type="primary" style="width: 100%; margin-bottom: 12px;" @click="handleCreate">新会话 +</yh-button>
      <div
        v-for="conv in convHook.conversations.value"
        :key="conv.id"
        style="padding: 8px; border-radius: 6px; margin-bottom: 8px; cursor: pointer; background: var(--yh-bg-color-page); display: flex; justify-content: space-between;"
      >
        <span>{{ conv.title }}</span>
        <span @click.prevent="convHook.removeConversation(conv.id)" style="color: var(--yh-color-danger)">删除</span>
      </div>
    </div>
    <div style="flex: 1; border: 1px solid var(--yh-border-color); border-radius: 8px; padding: 24px; display: flex; align-items: center; justify-content: center;">
      <span style="color: var(--yh-text-color-secondary)">左侧由 <code>useAiConversations</code> 管理</span>
    </div>
  </div>
</DemoBlock>

## API Reference

### useAiChat Options

| 参数              | 说明                                                                                                  | 类型                |
| ----------------- | ----------------------------------------------------------------------------------------------------- | ------------------- |
| `initialMessages` | 默认消息列表                                                                                          | `AiChatMessage[]`   |
| `request`         | 请求适配器，签名为 `(message, history, abortSignal) => AsyncGenerator \| Promise<string \| Response>` | `Function`          |
| `idGenerator`     | 自定义消息 ID 生成器                                                                                  | `() => string`      |
| `parser`          | SSE / 流式分块解析器，用于适配不同厂商返回格式                                                        | `StreamChunkParser` |

### useAiChat Returns

| 名称           | 说明             | 类型                                 |
| -------------- | ---------------- | ------------------------------------ |
| `messages`     | 当前消息列表     | `Ref<AiChatMessage[]>`               |
| `isGenerating` | 是否正在生成     | `Ref<boolean>`                       |
| `sendMessage`  | 发送消息         | `(message: string) => Promise<void>` |
| `stop`         | 中止当前流式请求 | `() => void`                         |
| `clear`        | 清空消息         | `() => void`                         |

### useAiConversations Options

| 参数                   | 说明                 | 类型               |
| ---------------------- | -------------------- | ------------------ |
| `initialConversations` | 初始会话列表         | `AiConversation[]` |
| `idGenerator`          | 自定义会话 ID 生成器 | `() => string`     |

### useAiConversations Returns

| 名称                 | 说明     | 类型                         |
| -------------------- | -------- | ---------------------------- |
| `conversations`      | 会话列表 | `Ref<AiConversation[]>`      |
| `createConversation` | 创建会话 | `(title?: string) => string` |
| `removeConversation` | 删除会话 | `(id: string) => void`       |
