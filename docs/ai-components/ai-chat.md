# AiChat 智能对话

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

const tsBasic = `<${_T}>
  <div style="height: 400px; border: 1px solid var(--yh-border-color); border-radius: 8px;">
    <yh-ai-chat :messages="messages" :loading="loading" @send="handleSend" />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const messages = ref([
  { id: '1', role: 'assistant', content: '你好！我是你的 AI 助手，有什么可以帮你的吗？' }
])

const handleSend = (text: string) => {
  messages.value.push({ id: Date.now().toString(), role: 'user', content: text })
  loading.value = true
  
  setTimeout(() => {
    messages.value.push({
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '我收到了你的消息：' + text
    })
    loading.value = false
  }, 1500)
}
</${_S}>`

const loading = ref(false)
const messages = ref([
  { id: '1', role: 'assistant', content: '你好！我是你的 AI 助手，有什么可以帮你的吗？' }
])

const handleSend = (text: string) => {
  messages.value.push({ id: Date.now().toString(), role: 'user', content: text })
  loading.value = true
  
  setTimeout(() => {
    messages.value.push({
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '我收到了你的消息：' + text
    })
    loading.value = false
  }, 1500)
}

const tsAdvanced = `<${_T}>
  <div style="height: 500px; border: 1px solid var(--yh-border-color); border-radius: 8px;">
    <!-- 内附清空记录和引导提示词能力 -->
    <yh-ai-chat 
      v-model:messages="advMessages" 
      :loading="advLoading" 
      :suggestions="['用 Vue 3 写一个防抖函数', '如何优化首屏加载？', '生成一段快排代码']" 
      @send="advHandleSend" 
      @clear="advHandleClear" 
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

// 初始状态为空聊天记录
const advLoading = ref(false)
const advMessages = ref([])

const advHandleSend = (text: string) => {
  advMessages.value.push({
    id: Date.now().toString(),
    role: 'user',
    content: text,
    time: new Date().toLocaleTimeString()
  })
  advLoading.value = true
  
  setTimeout(() => {
    advMessages.value.push({
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '基于您询问的问题 **"' + text + '"**，这是我为您生成的回复流程：\\n\\n\`\`\`javascript\\nconsole.log("执行成功！");\\n\`\`\`',
      time: new Date().toLocaleTimeString()
    })
    advLoading.value = false
  }, 1200)
}

const advHandleClear = () => {
  advMessages.value = []
}
</${_S}>`

const advLoading = ref(false)
const advMessages = ref([])

const advHandleSend = (text: string) => {
  advMessages.value.push({
    id: Date.now().toString(),
    role: 'user',
    content: text,
    time: new Date().toLocaleTimeString()
  })
  advLoading.value = true
  
  setTimeout(() => {
    advMessages.value.push({
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '基于您询问的问题 **"' + text + '"**，这是我为您生成的回复流程：\n\n```javascript\nconsole.log("执行成功！");\n```',
      time: new Date().toLocaleTimeString()
    })
    advLoading.value = false
  }, 1200)
}

const advHandleClear = () => {
  advMessages.value = []
}

const tsGen = `<${_T}>
  <div style="height: 500px; border: 1px solid var(--yh-border-color); border-radius: 8px;">
    <!-- 魔法插槽 #message 基于工具调用自动判定 Generative UI 结构挂载 -->
    <yh-ai-chat :messages="genMessages" :loading="genLoading" @send="genHandleSend">
      <template #message="{ message }">
        <yh-ai-bubble
          :role="message.role"
          :content="message.content"
          :variant="message.role === 'assistant' ? 'borderless' : 'filled'"
          :time="message.time"
        >
          <!-- 动态化挂载：思维链组件 (Generative UI) -->
          <template #header v-if="message.tool === 'thinking'">
            <yh-ai-thought-chain 
              :thinking="message.status === 'loading'" 
              :title="message.status === 'loading' ? '深度推理中...' : '已完成思考'" 
              style="margin-bottom: 8px;"
            >
               <div>调用工具: **模型抽象重构**</div>
               <div>检索最新全端适配节点...</div>
               <div>构建底层依赖抽象树...</div>
            </yh-ai-thought-chain>
          </template>
        </yh-ai-bubble>
      </template>
    </yh-ai-chat>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const genLoading = ref(false)
const genMessages = ref([
  { id: 'g0', role: 'assistant', content: '我是能够进行多模态扩展的强力助手，你可以交给我需要复杂推演或生成定制组件的任务。' }
])

const genHandleSend = (text: string) => {
  genMessages.value.push({ id: Date.now().toString(), role: 'user', content: text, time: new Date().toLocaleTimeString() })
  genLoading.value = true
  
  // 第一阶段：触发 Agent Tool Calling (插入带状态的思考链)
  setTimeout(() => {
    genMessages.value.push({
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '',
      tool: 'thinking',
      status: 'loading',
      time: new Date().toLocaleTimeString()
    })
  }, 500)

  // 第二阶段：思考完成，同时返回实际聊天内容，且前端组件树热更
  setTimeout(() => {
    const lastMsg = genMessages.value[genMessages.value.length - 1]
    lastMsg.status = 'success'
    lastMsg.content = '经过我刚刚缜密的工具分析，得出了最优解，此界面即是动态结构生成的结果。'
    genLoading.value = false
  }, 3500)
}
</${_S}>`

const genLoading = ref(false)
const genMessages = ref([
  { id: 'g0', role: 'assistant', content: '我是能够进行多模态扩展的强力助手，你可以交给我需要复杂推演或生成定制组件的任务。' }
])

const genHandleSend = (text: string) => {
  genMessages.value.push({ id: Date.now().toString(), role: 'user', content: text, time: new Date().toLocaleTimeString() })
  genLoading.value = true
  
  setTimeout(() => {
    genMessages.value.push({
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '',
      tool: 'thinking',
      status: 'loading',
      time: new Date().toLocaleTimeString()
    })
  }, 500)

  setTimeout(() => {
    const lastMsg = genMessages.value[genMessages.value.length - 1]
    lastMsg.status = 'success'
    lastMsg.content = '经过我刚刚缜密的工具分析，得出了最优解，此界面即是动态结构生成（Generative UI）的结果。'
    genLoading.value = false
  }, 3500)
}


</script>

提供了一套开箱即用的 AI 智能对话界面容器。全面包揽底侧推荐词列阵，上下文清空按钮以及无感滚动。

## 基础用法

基于 `messages` 数组来渲染整个对话流。

<DemoBlock title="基础对话流" :ts-code="tsBasic" :js-code="toJs(tsBasic)">
  <div style="height: 400px; border: 1px solid var(--yh-border-color); border-radius: 8px;">
    <yh-ai-chat :messages="messages" :loading="loading" @send="handleSend" />
  </div>
</DemoBlock>

## 交互进阶（提示词与动态清空）

通过赋予 `suggestions` 和 `clear` 的支持。你可以实现开局用户空白记录时的 **猜你想问功能**，并在有了聊天记录后，通过头部内置的 **垃圾桶（重置）按钮一键清除记忆**。
得益于深层的内部封装，在加载状态下甚至包含自动锁死与防抖效果，并且永远在每次对话时平滑的滚动到最新一条信息的坐标层。

<DemoBlock title="智能交互模型" :ts-code="tsAdvanced" :js-code="toJs(tsAdvanced)">
  <div style="height: 500px; border: 1px solid var(--yh-border-color); border-radius: 8px;">
    <yh-ai-chat 
      v-model:messages="advMessages" 
      :loading="advLoading" 
      :suggestions="['用 Vue 3 写一个防抖函数', '如何优化首屏加载？', '生成一段快排代码']" 
      @send="advHandleSend" 
      @clear="advHandleClear" 
    />
  </div>
</DemoBlock>

## 动态组件挂载 (Generative UI)

AiChat 具有极其强大的内部状态隔离，这意味着你完全可以通过其 `#message` 插槽配合数据字典驱动 `Generative UI`（生成式页面）。它能够根据对话历史中的元数据（例如调用的工具、是否进入深度思考模式），在常规的气泡流中无缝拼合任意的其他组件（如 `AiThoughtChain` 思维链）。这是一项挑战行业难点的终极级能力：使您的网页聊天框具备自主搭建前端结构的能力。

尝试向下发送消息，触发带有思考链组件的复杂状态组装。

<DemoBlock title="生成式 UI (Generative Component Rendering)" :ts-code="tsGen" :js-code="toJs(tsGen)">
  <div style="height: 500px; border: 1px solid var(--yh-border-color); border-radius: 8px;">
    <yh-ai-chat :messages="genMessages" :loading="genLoading" @send="genHandleSend">
      <template #message="{ message }">
        <yh-ai-bubble
          :role="message.role"
          :content="message.content"
          :variant="message.role === 'assistant' ? 'borderless' : 'filled'"
          :time="message.time"
        >
          <!-- 这里就是生成式动态组件插入的位置！ -->
          <template #header v-if="message.tool === 'thinking'">
            <yh-ai-thought-chain 
              :thinking="message.status === 'loading'" 
              :title="message.status === 'loading' ? '深度推理中...' : '已完成思考'" 
              style="margin-bottom: 8px;"
            >
               <div>调用工具: **模型抽象重构**</div>
               <div>检索最新全端适配节点...</div>
               <div>构建底层依赖抽象树...</div>
            </yh-ai-thought-chain>
          </template>
        </yh-ai-bubble>
      </template>
    </yh-ai-chat>
  </div>
</DemoBlock>

## 在 Nuxt 中使用

该组合容器组件完美支持 Nuxt 3/4 SSR 渲染与开箱即用的局部热更新。在 Nuxt 项目中同样享受基于组件名称映射的自动按需导出。

有关详细配置和使用方法，请阅读 [Nuxt 集成文档](/guide/nuxt)。

**SSR 注意事项**：

- ✅ 子组件状态同构支持
- ✅ API 事件和事件绑定正常工作

::: tip SSR 安全性
AiChat 组件已通过完整的 SSR 测试，完美适配 Vue 同构特性。
:::

## API

### Props

| 属性名      | 说明                   | 类型                                                                                 | 默认值  |
| ----------- | ---------------------- | ------------------------------------------------------------------------------------ | ------- |
| messages    | 消息列表               | `Array<{id: string, role: string, content: string, status?: string, time?: string}>` | `[]`    |
| loading     | 是否正在回复中         | `boolean`                                                                            | `false` |
| suggestions | 底侧默认聊天推荐提示词 | `string[]`                                                                           | `[]`    |

### Events

| 事件名 | 说明                                           | 回调参数                    |
| ------ | ---------------------------------------------- | --------------------------- |
| send   | 用户发送消息时触发（包含手写或点击推荐提示词） | `(message: string) => void` |
| clear  | 用户手动点击"清空"历史记录按钮                 | `() => void`                |

### Slots

| 插槽名  | 说明                 | 参数                                                  |
| ------- | -------------------- | ----------------------------------------------------- |
| message | 自定义每条消息的渲染 | `{ message: Record<string, unknown>, index: number }` |
| sender  | 自定义底部智能输入框 | —                                                     |
| header  | 自定义顶部工具条区域 | —                                                     |

## 主题变量

| 变量名                   | 说明               | 默认值                    |
| ------------------------ | ------------------ | ------------------------- |
| `--yh-ai-chat-bg`        | 对话容器背景色     | `var(--yh-bg-color)`      |
| `--yh-ai-chat-header-bg` | 顶部工具栏背景色   | `var(--yh-bg-color-page)` |
| `--yh-ai-chat-footer-bg` | 底部输入区域背景色 | `var(--yh-bg-color)`      |
