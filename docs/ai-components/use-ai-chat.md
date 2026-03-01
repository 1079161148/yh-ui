# useAiChat 数据响应流

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

const tsBasic = `<${_T}>
  <div style="height: 480px; border: 1px solid var(--yh-border-color); border-radius: 8px;">
    <!-- 纯渲染视图，由 Headless Hook 驱动状态 -->
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

// 模拟后端的 AI 流式 / 异步响应适配器
const mockRequest = async (message: string, history: any[], abortSignal: AbortSignal) => {
  return new Promise<string>((resolve, reject) => {
    let timeout: any
    // 监听打断事件
    abortSignal.addEventListener('abort', () => {
      clearTimeout(timeout)
      reject(new DOMException('Aborted', 'AbortError'))
    })
    
    timeout = setTimeout(() => {
      resolve('这是经过模拟网络延迟后，我为您回复的内容：' + message)
    }, 1500)
  })
}

// 核心状态接管：仅仅一行代码！
const { messages, isGenerating, sendMessage, clear } = useAiChat({
  request: mockRequest
})
</${_S}>`

const tsStream = `<${_T}>
  <div style="height: 520px; border: 1px solid var(--yh-border-color); border-radius: 8px;">
    <yh-ai-chat 
      :messages="messages" 
      :loading="isGenerating" 
      @send="sendMessage" 
      @clear="clear" 
    />
    <div style="padding: 12px; border-top: 1px solid var(--yh-border-color); display: flex; gap: 8px;">
      <yh-button type="danger" :disabled="!isGenerating" @click="stop">强制中断生成</yh-button>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { useAiChat } from '@yh-ui/hooks'

// 模拟纯正的 Generator 流式（打字机）
const mockStreamRequest = async function* (message: string, history: any[], abortSignal: AbortSignal) {
  const chars = ('基于您的提问 [' + message + ']，下面是我实时流式生成的思考过程：\n\n' + '我是一只在前端漫游的人工智能，很高兴为您服务。').split('')
  
  for (let i = 0; i < chars.length; i++) {
    // 检测是否被强制终止
    if (abortSignal.aborted) throw new DOMException('Aborted', 'AbortError')
    
    // 模拟网络分块延时
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

// ----- 以下是供页面真实运行使用的状态 -----
import { useAiChat, useAiConversations } from '../../packages/hooks/src'

const mockRequest = async (message: string, history: any[], abortSignal: AbortSignal) => {
  return new Promise<string>((resolve, reject) => {
    let timeout: any
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

const mockStreamRequest = async function* (message: string, history: any[], abortSignal: AbortSignal) {
  const chars = ('基于您的提问 [' + message + ']，下面是我实时流式生成的思考过程：\n\n' + '我是一只在前端漫游的人工智能，很高兴为您服务。').split('')
  
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

`@yh-ui/hooks` 提供了极其强大的 **纯逻辑 Headless Hooks 抽象** 系列。其中以 `useAiChat` 和 `useAiConversations` 为核心的数据引擎更是做到了完全与视觉解耦。

传统情况中，如果你需要接入后端模型接口，还要自己写网络 Fetch、维护 Token 流解析、实现历史记录与中止操作（Abort），不仅恶心而且极难做到组件通用。

现在，你只需注入一个你自定义的 `request` 函数接口给 `useAiChat` 挂靠，即可开箱即大地拿到所有 AI 全链路状态。

## 基础请求接管

利用纯纯的 Promise 完成接管和状态隔离，再也不需要手动 `refloading = true` 甚至自己去维护 `messages.push`。这一切已经在内部完全闭环。

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

## 原生事件流（Stream）与随时中断

市面上诸多模型为了更低的首字节延时（TTFB）会采用 `text/event-stream`。
只要让你的 `request` 变成 `AsyncGenerator`（异步生成器返回 `yield`），也就是一个大文本块块。这个 Hook 内部会**自动为你转化为精美的连贯打字流！**

并在调用 `stop()` API 的同时利用原生 `AbortController` 立即拦截接口和后续 DOM 的渲染。

<DemoBlock title="流式生成与强制中止" :ts-code="tsStream" :js-code="toJs(tsStream)">
  <div style="height: 520px; border: 1px solid var(--yh-border-color); border-radius: 8px;">
    <yh-ai-chat 
      :messages="chat2.messages.value" 
      :loading="chat2.isGenerating.value" 
      @send="chat2.sendMessage" 
      @clear="chat2.clear" 
    />
    <div style="padding: 12px; border-top: 1px solid var(--yh-border-color); display: flex; gap: 8px;">
      <yh-button type="danger" :disabled="!chat2.isGenerating.value" @click="chat2.stop">强制中断生成</yh-button>
    </div>
  </div>
</DemoBlock>

## 会话侧边状态漫游 (useAiConversations)

如果你要写一整个类似 ChatGPT 的宏大知识库界面。除了单聊天窗外的左侧抽屉记录一定跑不掉。
请使用 `useAiConversations` 快速获取一套开箱即用的带有不可变数据（Immutable）属性的安全集合。

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

| 参数名            | 说明                                                                                                        | 类型              |
| ----------------- | ----------------------------------------------------------------------------------------------------------- | ----------------- |
| `initialMessages` | 默认的消息记录数组                                                                                          | `AiChatMessage[]` |
| `request`         | 核心底层拦截器：在此实现请求响应（并支持返回 `AsyncGenerator` 实现流出），支持参数带 `history` 和取消控制符 | `Function`        |
| `idGenerator`     | 如果你需要替换生成随机字符串 UUID 的库，可以传进来                                                          | `() => string`    |
| `onError`         | 发送流期间遇到错误时的钩子                                                                                  | `(err) => void`   |

### useAiChat Returns

你可以从中解构这套会话的全部内容。

| 返回值          | 说明                           | 类型                                 |
| --------------- | ------------------------------ | ------------------------------------ |
| `messages`      | 双向绑定的会话历史列表。       | `Ref<AiChatMessage[]>`               |
| `isGenerating`  | 是否正在网络活动中             | `Ref<boolean>`                       |
| `sendMessage`   | 将文本压入会话并触发 `request` | `(content: string) => Promise<void>` |
| `stop`          | 立即中断当前请求并结算状态     | `() => void`                         |
| `clear`         | 清空屏幕                       | `() => void`                         |
| `removeMessage` | 删除指定一条消息               | `(id: string) => void`               |
