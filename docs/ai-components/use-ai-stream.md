# useAiStream 流式请求引擎 🌊

`useAiStream` 是专为 AI 流式输出设计的底层引擎 Hook，内置：

- 🏭 **多厂商适配器**（OpenAI / DeepSeek / Claude / Gemini / 文心 / 通义）
- 🖋️ **打字机节流**（基于 `requestAnimationFrame`）
- 🛑 **AbortController 取消**

<script setup lang="ts">
import { ref, computed } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

// ─── 打字机演示（本地 AsyncGenerator，无需网络）────────────────────────────
const isTyping = ref(false)
const typedContent = ref('')
let typerId: ReturnType<typeof setTimeout> | null = null
let shouldStop = false

async function* mockAIReply(question: string): AsyncGenerator<string> {
  const answers: Record<string, string[]> = {
    'Vue3 Composition API 的核心优势是什么？': [
      'Vue 3 的 Composition API 是一种全新的组件逻辑组织方式。\n\n',
      '与 Options API 相比，它有以下几大优势：\n\n',
      '① **逻辑复用更自然** —— 通过自定义 Hook（useXxx）可以跨组件复用业务逻辑，',
      '无需 Mixin 带来的命名冲突和来源不清晰问题。\n\n',
      '② **TypeScript 支持更完善** —— 所有响应式 API（ref / computed）',
      '都有精确的类型推导，告别 this 的类型黑盒。\n\n',
      '③ **按功能聚合代码** —— 相关逻辑写在一起，维护大型组件时更清晰，',
      '不再需要在 data / methods / computed 间反复横跳。'
    ],
    'requestAnimationFrame 和 setTimeout 的区别？': [
      'requestAnimationFrame（rAF）与 setTimeout 的核心区别在于：\n\n',
      '**执行时机不同**\n',
      '- rAF 由浏览器在每次绘制帧前统一调度（通常 60fps = 16.6ms/帧），',
      '避免中间帧的"无效计算"。\n',
      '- setTimeout 在指定延迟后加入宏任务队列，受 Event Loop 影响，',
      '实际触发时间不精确。\n\n',
      '**性能差异**\n',
      '- rAF 在页面隐藏/最小化时自动暂停，节省 CPU/GPU 资源。\n',
      '- setTimeout 在后台仍继续运行，造成资源浪费。\n\n',
      '**适用场景**\n',
      '- 动画、打字机效果 → 首选 rAF\n',
      '- 定时轮询、延迟任务 → 使用 setTimeout'
    ],
    '什么是 RAG（检索增强生成）？': [
      'RAG（Retrieval-Augmented Generation，检索增强生成）是一种将',
      '**信息检索**与**大语言模型生成**结合的 AI 技术范式。\n\n',
      '**核心流程**\n',
      '1. 用户提问 → 将问题向量化\n',
      '2. 在知识库中检索最相关的文档片段\n',
      '3. 将检索结果拼入 Prompt，让 LLM 基于这些上下文生成回答\n\n',
      '**解决的痛点**\n',
      '- 大模型知识截止日期导致的"时效性"问题\n',
      '- 私有领域知识不在训练集中的"幻觉"问题\n',
      '- 无需重新训练，成本极低地注入新知识'
    ],
    '解释一下 Vue 3 的响应式原理': [
      'Vue 3 的响应式系统基于 ES6 **Proxy** 实现，相比 Vue 2 的 Object.defineProperty 有本质提升。\n\n',
      '**核心机制**\n',
      '- `reactive()` 使用 Proxy 代理对象，拦截 get/set/deleteProperty 等操作\n',
      '- `ref()` 对基本类型包裹为 `{ value }` 对象，同样通过 Proxy 追踪变化\n',
      '- `track()` 收集依赖（在 getter 中记录当前 effect）\n',
      '- `trigger()` 触发更新（在 setter 中通知所有依赖的 effect）\n\n',
      '**相比 Vue 2 的优势**\n',
      '- 可以检测属性的**新增和删除**（无需 $set）\n',
      '- 原生支持 Map / Set / WeakMap 等数据结构\n',
      '- 懒代理（只在访问时才深度代理），性能更优'
    ]
  }

  const defaultChunks = [
    `关于"${question}"，以下是详细解答：\n\n`,
    'Vue 3 生态系统持续演进，提供了更强大的工具链和开发体验。\n',
    'Composition API、Pinia、Vite 的组合已成为现代 Vue 开发的事实标准，',
    '大幅提升了大型应用的可维护性和开发效率。'
  ]

  const chunks = answers[question] ?? defaultChunks
  for (const chunk of chunks) {
    for (const char of chunk) {
      if (shouldStop) return
      await new Promise<void>(r => {
        typerId = setTimeout(r, Math.random() * 35 + 10)
      })
      yield char
    }
    await new Promise<void>(r => { typerId = setTimeout(r, 60) })
  }
}

const demoQuestions = [
  'Vue3 Composition API 的核心优势是什么？',
  'requestAnimationFrame 和 setTimeout 的区别？',
  '什么是 RAG（检索增强生成）？',
  '解释一下 Vue 3 的响应式原理'
]
const selectedQuestion = ref(demoQuestions[0])
const tokensCount = ref(0)
const elapsedMs = ref(0)
let timerInterval: ReturnType<typeof setInterval> | null = null

async function startTyping() {
  if (isTyping.value) return
  isTyping.value = true
  shouldStop = false
  typedContent.value = ''
  tokensCount.value = 0
  elapsedMs.value = 0

  const startTime = Date.now()
  timerInterval = setInterval(() => {
    elapsedMs.value = Date.now() - startTime
  }, 100)

  try {
    const gen = mockAIReply(selectedQuestion.value)
    for await (const char of gen) {
      typedContent.value += char
      tokensCount.value++
    }
  } finally {
    if (timerInterval) clearInterval(timerInterval)
    elapsedMs.value = Date.now() - (Date.now() - elapsedMs.value)
    isTyping.value = false
  }
}

function stopTyping() {
  shouldStop = true
  if (typerId) clearTimeout(typerId)
  if (timerInterval) clearInterval(timerInterval)
  isTyping.value = false
}

const speed = computed(() =>
  elapsedMs.value > 100
    ? (tokensCount.value / (elapsedMs.value / 1000)).toFixed(1)
    : '—'
)

// ─── 代码字符串（用于 DemoBlock 展示） ────────────────────────────────────────
const tsTypewriter = `\<${_T}>
  <div style="max-width: 640px; display: flex; flex-direction: column; gap: 12px;">
    <!-- 问题选择 -->
    <yh-select v-model="selectedQuestion" placeholder="选择一个问题" style="width: 100%;">
      <yh-option v-for="q in demoQuestions" :key="q" :label="q" :value="q" />
    </yh-select>
    <!-- 输出区域 -->
    <div style="min-height: 120px; padding: 16px; background: var(--yh-fill-color-light);
                border-radius: 8px; white-space: pre-wrap; font-size: 14px; line-height: 1.9;">
      <span v-if="!typedContent && !isTyping" style="color: var(--yh-text-color-secondary);">
        选择一个问题，点击「生成回答」体验打字机效果 ✨
      </span>
      <span>{{ typedContent }}</span>
      <span v-if="isTyping" class="yh-cursor-blink">|</span>
    </div>
    <!-- 操作栏 -->
    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
      <yh-button type="primary" :loading="isTyping" :disabled="isTyping" @click="startTyping">
        🚀 生成回答
      </yh-button>
      <yh-button type="danger" :disabled="!isTyping" @click="stopTyping">⏹ 停止</yh-button>
      <yh-button :disabled="isTyping" @click="typedContent = ''; tokensCount = 0; elapsedMs = 0">
        🗑 清空
      </yh-button>
      <span v-if="tokensCount > 0" style="font-size: 12px; color: var(--yh-text-color-secondary); margin-left: auto;">
        {{ tokensCount }} 字 · {{ elapsedMs }}ms · {{ speed }} 字/s
      </span>
    </div>
  </div>
\</${_T}>

\<${_S} setup lang="ts">
import { ref, computed } from 'vue'
import { useAiStream } from '@yh-ui/hooks'

const demoQuestions = [
  'Vue3 Composition API 的核心优势是什么？',
  'requestAnimationFrame 和 setTimeout 的区别？',
  '什么是 RAG（检索增强生成）？',
  '解释一下 Vue 3 的响应式原理'
]
const selectedQuestion = ref(demoQuestions[0])
const tokensCount = ref(0)
const elapsedMs = ref(0)

// 模拟 AI 回答（带自然节奏的 AsyncGenerator）
async function* mockAIReply(question: string): AsyncGenerator<string> {
  const reply = \`关于"\${question}"的回答：\\n\\nVue 3 生态持续演进，Composition API + Pinia + Vite 已成为现代开发标准。\`
  for (const char of reply) {
    await new Promise<void>(r => setTimeout(r, Math.random() * 35 + 10))
    yield char
  }
}

const { isStreaming: isTyping, currentContent: typedContent, fetchStream, stop: stopTyping } = useAiStream({
  request: (q: string) => mockAIReply(q),
  charsPerFrame: 1
})

const speed = computed(() =>
  elapsedMs.value > 100
    ? (tokensCount.value / (elapsedMs.value / 1000)).toFixed(1)
    : '—'
)

async function startTyping() {
  typedContent.value = ''
  tokensCount.value = 0
  elapsedMs.value = 0
  const startTime = Date.now()
  const timer = setInterval(() => {
    elapsedMs.value = Date.now() - startTime
    tokensCount.value = typedContent.value.length
  }, 100)
  await fetchStream(selectedQuestion.value)
  clearInterval(timer)
  tokensCount.value = typedContent.value.length
  elapsedMs.value = Date.now() - startTime
}
\</${_S}>`

const tsSseStream = `\<${_T}>
  <div style="max-width: 580px; display: flex; flex-direction: column; gap: 12px;">
    <div style="min-height: 100px; padding: 16px; background: var(--yh-fill-color-light);
                border-radius: 8px; white-space: pre-wrap; font-size: 14px; line-height: 1.9;">
      {{ currentContent || '👈 点击「发送」，通过 useAiStream 调用 OpenAI 兼容 API' }}
      <span v-if="isStreaming" class="yh-cursor-blink">|</span>
    </div>
    <div style="display: flex; gap: 8px;">
      <yh-button type="primary" :loading="isStreaming" :disabled="isStreaming" @click="send">
        🚀 发送
      </yh-button>
      <yh-button type="danger" :disabled="!isStreaming" @click="stop">⏹ 停止</yh-button>
    </div>
  </div>
\</${_T}>

\<${_S} setup lang="ts">
import { useAiStream } from '@yh-ui/hooks'

const { isStreaming, currentContent, fetchStream, stop } = useAiStream({
  // 替换为你的 API Key 和 Endpoint
  request: async (query: string) =>
    fetch('https://api.siliconflow.cn/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'Qwen/Qwen2.5-7B-Instruct',
        stream: true,
        max_tokens: 300,
        messages: [{ role: 'user', content: query }]
      })
    }),
  onFinish: (content) => console.log('完成，共', content.length, '字')
})

const send = () => fetchStream('用一段话介绍 Vue 3 Composition API 的核心优势')
\</${_S}>`
</script>

## 🖊️ 打字机效果演示（本地 AsyncGenerator）

通过 `AsyncGenerator` 模拟真实 AI 输出节奏，无需网络或 API Key，即可体验流式渲染。

<DemoBlock :ts-code="tsTypewriter" :js-code="toJs(tsTypewriter)">
  <div style="max-width: 640px; display: flex; flex-direction: column; gap: 12px;">
    <yh-select v-model="selectedQuestion" placeholder="选择一个问题" style="width: 100%;">
      <yh-option v-for="q in demoQuestions" :key="q" :label="q" :value="q" />
    </yh-select>
    <div style="min-height: 120px; padding: 16px; background: var(--yh-fill-color-light); border-radius: 8px; white-space: pre-wrap; font-size: 14px; line-height: 1.9;">
      <span v-if="!typedContent && !isTyping" style="color: var(--yh-text-color-secondary);">
        选择一个问题，点击「生成回答」体验打字机效果 ✨
      </span>
      <span>{{ typedContent }}</span>
      <span v-if="isTyping" style="display: inline-block; width: 2px; height: 1em; background: var(--yh-color-primary); margin-left: 1px; vertical-align: text-bottom; animation: yh-cursor-blink 0.8s step-end infinite;"></span>
    </div>
    <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
      <yh-button type="primary" :loading="isTyping" :disabled="isTyping" @click="startTyping">
        🚀 生成回答
      </yh-button>
      <yh-button type="danger" :disabled="!isTyping" @click="stopTyping">⏹ 停止</yh-button>
      <yh-button :disabled="isTyping" @click="typedContent = ''; tokensCount = 0; elapsedMs = 0">🗑 清空</yh-button>
      <span v-if="tokensCount > 0" style="font-size: 12px; color: var(--yh-text-color-secondary); margin-left: auto;">
        {{ tokensCount }} 字 · {{ elapsedMs }}ms · {{ speed }} 字/s
      </span>
    </div>
  </div>
</DemoBlock>

<style>
@keyframes yh-cursor-blink {
  0%, 100% { opacity: 1 }
  50% { opacity: 0 }
}
</style>

## 🌐 真实 SSE 接口接入

将 `request` 适配器替换为真实 API，传入你的 Key 即可实现生产级流式对话。

<DemoBlock :ts-code="tsSseStream" :js-code="toJs(tsSseStream)">
  <div style="max-width: 580px; background: var(--yh-fill-color-light); border-radius: 8px; padding: 20px;">
    <p style="margin: 0 0 12px; font-size: 14px; color: var(--yh-text-color-secondary); line-height: 1.7;">
      📋 替换 <code style="background: var(--yh-fill-color); padding: 2px 6px; border-radius: 4px;">YOUR_API_KEY</code> 为你的 SiliconFlow / OpenAI / DeepSeek 等兼容 Key，即可实现真实流式输出。
    </p>
    <p style="margin: 0; font-size: 13px; color: var(--yh-text-color-placeholder);">
      👉 支持: OpenAI · DeepSeek · SiliconFlow · 讯飞星火 · 月之暗面 · MiniMax 等所有 OpenAI SSE 格式
    </p>
  </div>
</DemoBlock>

## API

### Options

| 参数            | 类型                                                              | 默认值            | 说明                             |
| --------------- | ----------------------------------------------------------------- | ----------------- | -------------------------------- |
| `request`       | `(query, ...args) => AsyncGenerator \| Promise<Response \| AsyncGenerator>` | 必填              | 请求适配器 |
| `parser`        | `StreamChunkParser`                                               | `plainTextParser` | 流块解析器（多厂商适配）         |
| `typewriter`    | `boolean`                                                         | `true`            | 是否启用打字机效果               |
| `charsPerFrame` | `number`                                                          | `3`               | 每帧输出字符数（控制速度）       |
| `onUpdate`      | `(chunk, fullContent) => void`                                    | -                 | 每次增量更新回调                 |
| `onFinish`      | `(content) => void`                                               | -                 | 完成回调                         |
| `onError`       | `(err) => void`                                                   | -                 | 错误回调                         |

### 返回值

| 字段             | 类型                                | 说明                 |
| ---------------- | ----------------------------------- | -------------------- |
| `isStreaming`    | `Ref<boolean>`                      | 是否正在流式接收     |
| `currentContent` | `Ref<string>`                       | 当前已接收的完整内容 |
| `fetchStream`    | `(query, ...args) => Promise<void>` | 触发请求             |
| `stop`           | `() => void`                        | 停止当前流式输出       |
| `parsers`        | `{ openaiParser, ernieParser, qwenParser, claudeParser, geminiParser, plainTextParser }` | 内置解析器集合 |

### 内置 Parser

| Parser            | 适用厂商                                | 说明                 |
| ----------------- | --------------------------------------- | -------------------- |
| `openaiParser`    | OpenAI、DeepSeek、SiliconFlow、讯飞星火 | 兼容 OpenAI SSE 格式 |
| `claudeParser`    | Anthropic Claude                        | 兼容 Claude SSE 格式 |
| `geminiParser`    | Google Gemini                           | 兼容 Gemini 格式     |
| `ernieParser`     | 百度文心一言                            | 兼容文心 SSE 格式    |
| `qwenParser`      | 阿里通义千问（直连版）                  | 兼容通义 SSE 格式    |
| `plainTextParser` | AsyncGenerator 原始文本                 | yield 字符串直接追加 |

## 接入其他 AI 平台

```ts
import { useAiStream, openaiParser } from '@yh-ui/hooks'

// ── SiliconFlow（支持 Qwen / DeepSeek / GLM 等开源模型）──
const { fetchStream } = useAiStream({
  parser: openaiParser,
  request: async (query) =>
    fetch('https://api.siliconflow.cn/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer YOUR_SF_KEY',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'Qwen/Qwen2.5-7B-Instruct',
        stream: true,
        messages: [{ role: 'user', content: query }]
      })
    })
})

// ── DeepSeek ──
const { fetchStream: deepseekStream } = useAiStream({
  parser: openaiParser,
  request: async (query) =>
    fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer YOUR_DEEPSEEK_KEY',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        stream: true,
        messages: [{ role: 'user', content: query }]
      })
    })
})
```
