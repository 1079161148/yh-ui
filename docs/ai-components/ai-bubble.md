# AiBubble 对话气泡

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

const isGenerating = ref(false)
const isTypingMode = ref(false)
const currentText = ref('')
const fullText = '打字机特效能够在文字按顺序输出的同时，提供一个跟在末尾的光标闪烁指示器（Cursor）。它生动地刻画了模型思考与返回片段的过程，配合 loading 状态食用体验极佳。'

let timer: ReturnType<typeof setInterval> | null = null

const startTyping = () => {
  if (timer) clearInterval(timer)
  isGenerating.value = true
  isTypingMode.value = true
  currentText.value = ''
  
  let i = 0
  timer = setInterval(() => {
    if (i < fullText.length) {
      currentText.value += fullText[i]
      i++
    } else {
      isTypingMode.value = false
      clearInterval(timer)
      timer = null
    }
  }, 40)
}

const citations = [
  { id: 1, title: 'YH-UI 官方文档', url: '/' },
  { id: 2, title: 'Vue 3 组合式 API 指南', url: 'https://vuejs.org' },
  { id: 3, title: 'Vite 开发者社区', url: 'https://vitejs.dev' }
]

const multimodalData = [
  {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=200&auto=format&fit=crop',
    title: '设计稿预览 1'
  },
  {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=200&auto=format&fit=crop',
    title: '设计稿预览 2'
  },
  {
    type: 'audio',
    url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3',
    extra: { duration: '0:02' }
  },
  {
    type: 'file',
    title: 'YH-UI-Requirement.pdf',
    size: '1.2 MB',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  }
]

const mdContent = "这是一段 **Markdown** 的渲染示例。来看一段代码：\n\n```typescript\nconst greeting = 'Hello World';\nconsole.log(greeting);\n```"

const tsBasic = `<${_T}>
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble role="assistant" content="人工智能（AI）是一种能够执行通常需要人类智能的任务的技术。" />
    <yh-ai-bubble role="user" content="那它能自己写代码吗？" />
    <yh-ai-bubble role="assistant" loading typing />
  </div>
</${_T}>`

const tsAdvanced = `<${_T}>
  <div style="background:var(--yh-bg-color-page); padding:16px; display:flex; flex-direction:column; gap:16px;">
    <yh-ai-bubble role="assistant" time="10:23 AM" :content="mdContent" />
    <yh-ai-bubble role="user" shape="round" content="真棒！可以更换样式吗？" />
    <yh-ai-bubble role="assistant" variant="outlined" content="当然可以，这是 outlined 模式。" />
    <yh-ai-bubble role="user" variant="shadow" content="看起来非常有质感。" />
    <yh-ai-bubble role="assistant" variant="borderless" content="如果您不喜欢外轮廓，可以使用 borderless 模式。" />
  </div>
</${_T}>

<${_S} setup lang="ts">
const mdContent = "这是一段 **Markdown** 的渲染示例。来看一段代码：\\n\\n\`\`\`typescript\\nconst greeting = 'Hello World';\\nconsole.log(greeting);\\n\`\`\`";
</${_S}>`

const tsTyping = `<${_T}>
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-button @click="startTyping" style="margin-bottom: 16px;">开始生成演示</yh-button>
    <yh-ai-bubble 
      v-if="isGenerating"
      role="assistant" 
      :loading="currentText === ''" 
      :typing="isTypingMode" 
      :content="currentText" 
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue';

const isGenerating = ref(false);
const isTypingMode = ref(false);
const currentText = ref('');
const fullText = '打字机特效能够在文字按顺序输出的同时...（见文末说明）';

let timer: ReturnType<typeof setInterval> | null = null;

const startTyping = () => {
  if (timer) clearInterval(timer);
  isGenerating.value = true;
  isTypingMode.value = true;
  currentText.value = '';
  
  let i = 0;
  timer = setInterval(() => {
    if (i < fullText.length) {
      currentText.value += fullText[i];
      i++;
    } else {
      isTypingMode.value = false;
      clearInterval(timer);
      timer = null;
    }
  }, 40);
};
</${_S}>`

const tsCitations = `<${_T}>
  <div style="max-width: 600px;">
    <yh-ai-bubble 
      role="assistant" 
      content="根据最新的 YH-UI 指南 [1]。我们建议在处理 AI 对话时使用组合式 API [2]。此外，Vite 的构建优化 [3] 也能显著提升用户体验。" 
      :citations="citations"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import type { AiCitation } from '@yh-ui/components';

const citations: AiCitation[] = [
  { id: 1, title: 'YH-UI 官方文档', url: 'https://yh-ui.com' },
  { id: 2, title: 'Vue 3 组合式 API 指南', url: 'https://vuejs.org' },
  { id: 3, title: 'Vite 开发者社区', url: 'https://vitejs.dev' }
];
</${_S}>`

const tsMultimodal = `<${_T}>
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble 
      content="这是我为你生成的语音素材和参考文档。"
      :multimodal="multimodalData"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import type { AiMultimodal } from '@yh-ui/components';

const multimodalData: AiMultimodal[] = [
  {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=200&auto=format&fit=crop',
    title: '设计稿预览 1'
  },
  {
    type: 'audio',
    url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3',
    extra: { duration: '0:02' }
  },
  {
    type: 'file',
    title: 'YH-UI-Requirement.pdf',
    size: '1.2 MB',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  }
];
</${_S}>`

const tsAdvancedConfig = `<${_T}>
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble
      :content="mdContent"
      :markdown-options="{
        mermaid: true,
        latex: true,
        codeBlock: {
          copyable: true,
          runnable: true,
          explainable: true
        }
      }"
      :structured-data="{
        type: 'table',
        data: {
          headers: ['指标', '数值'],
          rows: [
            ['Tokens', 256],
            ['Latency(ms)', 120]
          ]
        }
      }"
      :on-run-code="async (code, lang) => {
        return { output: \`运行 \${lang} 代码成功（示例）\` }
      }"
      :on-explain-code="async () => '这里是对代码的示例解释（示例）'"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
const mdContent = "这是一段 **Markdown** 的渲染示例，同时演示结构化数据与代码交互。";
</${_S}>`

const jsBasic = toJs(tsBasic)
const jsAdvanced = toJs(tsAdvanced)
const jsTyping = toJs(tsTyping)
const jsCitations = toJs(tsCitations)
const jsMultimodal = toJs(tsMultimodal)
const jsAdvancedConfig = toJs(tsAdvancedConfig)

const tsTheme = `<${_T}>
  <yh-ai-bubble 
    role="assistant" 
    content="我已经根据您的品牌色调整了我的外观。" 
    :theme-overrides="{
      assistantBgColor: '#e3f2fd',
      assistantTextColor: '#1565c0',
      borderRadius: '24px'
    }"
  />
</${_T}>`
const jsTheme = toJs(tsTheme)

// === 新增示例数据 ===

// 1. 自定义头像示例
const tsAvatar = `<${_T}>
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble
      role="assistant"
      avatar="https://api.dicebear.com/7.x/bottts/svg?seed=ai"
      content="你好！我是 AI 助手，有什么可以帮助你的吗？"
    />
    <yh-ai-bubble
      role="user"
      avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=user1"
      content="我想了解如何使用这个组件库。"
    />
  </div>
</${_T}>`

// 2. 自定义头部/尾部插槽示例
const tsSlots = `<${_T}>
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble role="assistant" content="这是一个带有自定义头部和尾部的气泡。">
      <template #header>
        <div style="display:flex;align-items:center;gap:8px;">
          <span style="color:var(--yh-color-success);">● 已送达</span>
          <span style="font-size:12px;color:var(--yh-text-color-placeholder);">10:30</span>
        </div>
      </template>
      <template #footer>
        <div style="display:flex;gap:8px;">
          <yh-button size="small" type="primary">复制</yh-button>
          <yh-button size="small" type="primary">转发</yh-button>
        </div>
      </template>
    </yh-ai-bubble>
  </div>
</${_T}>`

// 3. 气泡位置示例
const tsPlacement = `<${_T}>
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble role="assistant" placement="start" content="左侧气泡（start）" />
    <yh-ai-bubble role="user" placement="end" content="右侧气泡（end）" />
  </div>
</${_T}>`

// 4. 系统消息示例
const tsSystem = `<${_T}>
  <div style="background:var(--yh-bg-color-page); padding:16px; display:flex; flex-direction:column; gap:16px;">
    <yh-ai-bubble role="system" content="⚠️ 系统提示：当前对话时长已超过 30 分钟，建议保存进度。" />
    <yh-ai-bubble role="assistant" content="有什么我可以帮助你的？" />
  </div>
</${_T}>`

// 5. 纯文本模式示例
const tsPlainText = `<${_T}>
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble
      role="assistant"
      :markdown="false"
      content="这是一段纯文本内容，不会被解析为 Markdown。\n\n这里的换行会保留，但不会有**加粗**或代码高亮。"
    />
  </div>
</${_T}>`

// 6. 完整对话流示例
const conversationMessages = [
  { role: 'assistant', content: '你好！我是 AI 助手，今天有什么我可以帮助你的？' },
  { role: 'user', content: '我想学习 Vue 3 的组合式 API。' },
  { role: 'assistant', content: '组合式 API 是 Vue 3 引入的一种新的 API 风格，它允许你更好地组织组件逻辑。' },
  { role: 'user', content: '能给我一个例子吗？' },
  { role: 'assistant', content: '当然可以！\n\n```vue\n<script setup>\nimport { ref, computed } from \"vue\"\n\nconst count = ref(0)\nconst doubled = computed(() => count.value * 2)\n<\\/script>\n\n<template>\n  <button @click=\"count++\">Count: {{ count }}</button>\n</template>\n```\n这就是一个简单的组合式 API 示例。' }
]

const tsConversation = `<${_T}>
  <div style="background:var(--yh-bg-color-page); padding:16px; display:flex; flex-direction:column; gap:12px; max-width:600px;">
    <yh-ai-bubble
      v-for="(msg, idx) in conversationMessages"
      :key="idx"
      :role="msg.role as 'user' | 'assistant'"
      :content="msg.content"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
const conversationMessages = [
  { role: 'assistant', content: '你好！我是 AI 助手，今天有什么我可以帮助你的？' },
  { role: 'user', content: '我想学习 Vue 3 的组合式 API。' },
  { role: 'assistant', content: '组合式 API 是 Vue 3 引入的一种新的 API 风格，它允许你更好地组织组件逻辑。' },
  { role: 'user', content: '能给我一个例子吗？' },
  { role: 'assistant', content: '当然可以！\\n\\n\`\`\`vue\\n<script setup>\\nimport { ref, computed } from "vue"\\n\\nconst count = ref(0)\\nconst doubled = computed(() => count.value * 2)\\n<\\/script>\\n\\n<template>\\n  <button @click="count++">Count: {{ count }}</button>\\n</template>\\n\`\`\`\\n这就是一个简单的组合式 API 示例。' }
];
</${_S}>`

// 7. JSON 结构化数据示例
const tsJsonData = `<${_T}>
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble
      role="assistant"
      content="以下是查询到的用户数据："
      :structured-data="{
        type: 'json',
        data: {
          name: '张三',
          email: 'zhangsan@example.com',
          role: '管理员',
          status: 'active'
        }
      }"
    />
  </div>
</${_T}>`

// 8. 思维链示例
const tsThoughtChain = `<${_T}>
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble
      role="assistant"
      content="让我一步步思考这个问题："
      :structured-data="{
        type: 'thought-chain',
        data: [
          { title: '理解问题', content: '首先分析用户的需求，确定要实现的功能目标。' },
          { title: '设计方案', content: '根据需求设计技术方案，选择合适的框架和工具。' },
          { title: '实现代码', content: '按照设计方案编写代码，注意代码质量和性能。' },
          { title: '测试验证', content: '编写测试用例，验证功能的正确性和稳定性。' }
        ]
      }"
    />
  </div>
</${_T}>`

const jsAvatar = toJs(tsAvatar)
const jsSlots = toJs(tsSlots)
const jsPlacement = toJs(tsPlacement)
const jsSystem = toJs(tsSystem)
const jsPlainText = toJs(tsPlainText)
const jsConversation = toJs(tsConversation)
const jsJsonData = toJs(tsJsonData)
const jsThoughtChain = toJs(tsThoughtChain)
const tsCodeStream = `<${_T}>
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble
      role="assistant"
      :content="codeStreamContent"
      :markdown-options="{
        codeBlock: {
          copyable: true,
          runnable: true,
          explainable: false
        }
      }"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
const codeStreamContent = \`\\\`\\\`js
// 这段代码会流式输出执行结果
console.log('第一行输出');
console.log('第二行输出');
console.log('第三行输出');
return '最终返回值';
\\\`\\\`\`;
</${_S}>`
const jsCodeStream = toJs(tsCodeStream)

// 9. Monaco + WebContainer 示例
const liveMonacoCodeSnippet = "```js\nconsole.log('Hello from WebContainer!')\n```"

// 10. 代码块流式输出示例
const codeStreamContent = `\`\`\`js
// 这段代码会流式输出执行结果
console.log('第一行输出');
console.log('第二行输出');
console.log('第三行输出');
return '最终返回值';
\`\`\``

const tsMonacoWeb = `<${_T}>
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble
      role="assistant"
      :content="codeSnippet"
      :markdown-options="{
        codeBlock: {
          copyable: true,
          runnable: true,
          explainable: false,
          runtime: 'webcontainer'
        }
      }"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
const codeSnippet = \`\\\`\\\`js
console.log('Hello from WebContainer!')
\\\`\\\`\`;
</${_S}>`

const jsMonacoWeb = toJs(tsMonacoWeb)

// --- Python & XSS 示例数据 ---

// 模拟代码运行回调
const handleRunCode = async (code: string, lang: string) => {
  if (lang === 'python') {
    // 允许忽略大小写和空格的简单匹配
    if (code.includes('pi')) {
      return { output: '圆周率: 3.141592653589793\n✓ 执行成功 (模拟远程 API)' }
    }
    return { output: '1 到 100 的累加和: 5050\n✓ 执行成功 (模拟 Pyodide)' }
  }
  return { output: `[${lang}] 执行成功: ${code.slice(0, 20)}...` }
}

const tsPythonBrowser = `<${_T}>
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble
      role="assistant"
      content="\\\`\\\`\\\`python
# Python 计算示例
result = sum(range(1, 101))
print(f'1 到 100 的累加和: {result}')
\\\`\\\`\\\`"
      :enable-python-runtime="true"
      :python-runtime="'browser'"
      :markdown-options="{
        codeBlock: {
          copyable: true,
          runnable: true,
          explainable: false
        }
      }"
      :on-run-code="handleRunCode"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
const handleRunCode = async (code: string, lang: string) => {
  if (lang === 'python') {
    return { output: '1 到 100 的累加和: 5050\\n✓ 执行成功 (模拟 Pyodide)' }
  }
  return { output: \`[\${lang}] 执行成功\` }
}
</${_S}>`

const jsPythonBrowser = toJs(tsPythonBrowser)

const tsPythonRemote = `<${_T}>
  <yh-ai-bubble
    role="assistant"
    content="使用远程 API 执行 Python"
    :enable-python-runtime="true"
    python-runtime="remote"
    python-api-url="https://api.example.com/python"
    :on-run-code="handleRunCode"
  />
</${_T}>`

const jsPythonRemote = toJs(tsPythonRemote)

const xssContent = ref('这是一个包含 <script>alert("xss")<\/script> 危险脚本的内容，但会被自动清理。')
const tsXssDemo = `<${_T}>
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble
      role="assistant"
      :content="xssContent"
      :enable-sanitizer="true"
      :markdown-options="{ html: true }"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const xssContent = ref('这是一个包含 <script>alert("xss")<\\/script> 危险脚本的内容...')
</${_S}>`

const jsXssDemo = toJs(tsXssDemo)

const customSanitizer = (html: string): string => {
  return html.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gim, ' [REMOVED SCRIPT] ')
}

const customHtmlContent = '<p>自定义 <b>白名单</b> 示例 <a href="javascript:alert(1)">移除非法链接</a></p>'
const tsCustomWhitelist = `<${_T}>
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble
      role="assistant"
      :content="customHtmlContent"
      :enable-sanitizer="true"
      :allowed-tags="['p', 'b', 'i', 'a']"
      :allowed-attributes="['href', 'class']"
      :markdown-options="{ html: true }"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
const customHtmlContent = '<p>自定义 <b>白名单</b> 示例 <a href="javascript:alert(1)">移除非法链接</a></p>';
</${_S}>`

const virtualMessages = ref(Array.from({ length: 1000 }, (_, i) => ({
  id: `msg-${i}`,
  role: i % 2 === 0 ? 'user' : 'assistant',
  content: i % 2 === 0 ? `这是第 ${i + 1} 个用户问题` : `这是第 ${i + 1} 个 AI 回复，模拟大数据量下的极致性能表现。`,
  time: '12:00 PM',
  variant: i % 2 === 0 ? 'filled' : 'borderless'
})))

const tsVirtualScroll = `<${_T}>
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble-list
      :items="virtualMessages"
      :virtual-scroll="true"
      :height="400"
      :item-height="100"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const virtualMessages = ref(Array.from({ length: 1000 }, (_, i) => ({
  id: 'msg-' + i,
  role: i % 2 === 0 ? 'user' : 'assistant',
  content: i % 2 === 0 ? '这是第 ' + (i + 1) + ' 个用户问题' : '这是第 ' + (i + 1) + ' 个 AI 回复，支持虚拟滚动性能优化。',
  time: '12:00 PM',
  variant: i % 2 === 0 ? 'filled' : 'borderless'
})))
</${_S}>`

const jsVirtualScroll = toJs(tsVirtualScroll)

const jsCustomWhitelist = toJs(tsCustomWhitelist)
</script>

承载对话消息的冒泡显示。

## 基础用法

可以展示 `user` 和 `assistant` 的样式差异，以及加载动画效果！

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
<div style="background:var(--yh-bg-color-page); padding:16px; display:flex; flex-direction:column; gap:16px;">
  <yh-ai-bubble role="assistant" content="人工智能（AI）是一种能够执行通常需要人类智能的任务的技术。" />
  <yh-ai-bubble role="user" content="那它能自己写代码吗？" />
  <yh-ai-bubble role="assistant" loading typing />
</div>
</DemoBlock>

## 进阶功能与变体

AiBubble 直接内置了强大的 Markdown 引擎与 highlight.js 代码高亮解析。并提供了丰富的变体 (`variant`) 与形制 (`shape`)、以及时间等信息传递的支持。

<DemoBlock title="进阶组合" :ts-code="tsAdvanced" :js-code="jsAdvanced">
<div style="background:var(--yh-bg-color-page); padding:16px; display:flex; flex-direction:column; gap:16px;">
  <yh-ai-bubble role="assistant" time="10:23 AM" :content="mdContent" />
  <yh-ai-bubble role="user" shape="round" content="真棒！可以更换样式吗？" />
  <yh-ai-bubble role="assistant" variant="outlined" content="当然可以，这是 outlined 模式。" />
  <yh-ai-bubble role="user" variant="shadow" content="看起来非常有质感。" />
  <yh-ai-bubble role="assistant" variant="borderless" content="如果您不喜欢外轮廓，可以使用 borderless 模式。" />
</div>
</DemoBlock>

## 打字特效与视觉反馈 (Typing & Ripple Effect)

这不仅仅是一个空 loading，它允许文字在一个一个吐出时跟随一个强烈的闪烁光标（类似光标指针的效果），以模仿正在被 AI 书写的感觉。

> [!TIP]
> **增强反馈**：当开启 `typing` 模式时，组件会自动在最后一行附加**“光标闪烁”**效果，并伴随背景的**“温和波纹”**流光动效，让生成过程更具生命感。

- **极致性能 (Streaming Performance)**：在底层我们引入了 `requestAnimationFrame` 截流刷新机制。当在 `typing` 模式下接收大量文本包进行 Markdown 复杂频繁重绘时，不仅能防止引发页面主线程卡死，更能将您的打印机的刷新率恒定在舒适的 60 帧每秒！

<DemoBlock title="打字特效动画" :ts-code="tsTyping" :js-code="jsTyping">
<div style="background:var(--yh-bg-color-page); padding:16px;">
  <yh-button @click="startTyping" style="margin-bottom: 16px;">开始生成演示</yh-button>
  <yh-ai-bubble 
    v-if="isGenerating"
    role="assistant" 
    :loading="currentText === ''" 
    :typing="isTypingMode" 
    :content="currentText" 
  />
</div>
</DemoBlock>

## 引用来源与幻觉标注 (Citations & Reference Tooltip)

AI 回复的信息通常需要来源支撑以避免模型幻觉。除了底部展示详细的长串被引地址，我们在底层注入了智能学术脚注（Citation）解析器。
当且仅当属性 `citations` 数组有内容时，若大模型在 Markdown 返回内容中包含 `[1]` 或 `[2]` 这样的结构：**气泡将其自动转义拦截拦截为带有交互光效状态的学术悬浮角标**！
💡 **试一试：** 停留在下方的 `[1]`, `[2]`, `[3]` 等文字段落上悬浮，观察动态出现带有链接及标题的精细化气泡弹出组件。

<DemoBlock title="引用来源" :ts-code="tsCitations" :js-code="jsCitations">
  <div style="max-width: 600px;">
    <yh-ai-bubble 
      role="assistant" 
      content="根据最新的 YH-UI 指南 [1]，我们建议在处理 AI 对话时使用组合式 API [2]。此外，Vite 的构建优化 [3] 也能显著提升用户体验。" 
      :citations="citations"
    />
  </div>
</DemoBlock>

## 多模态渲染 (Multimodal)

组件支持多种媒体格式的直接展示，包括图片网格、带波形动画的语音播放器以及标准化的文件/下载卡片。

<DemoBlock title="多模态展示" :ts-code="tsMultimodal" :js-code="jsMultimodal">
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble 
      content="这是我为你生成的语音素材和参考文档。"
      :multimodal="multimodalData"
    />
  </div>
</DemoBlock>

## 高级配置：Markdown & 结构化数据

通过 `markdown-options` 与 `structured-data` 以及回调 `on-run-code` / `on-explain-code`，你可以让 AiBubble 直接承载更复杂的 Markdown 交互与结构化内容渲染。

<DemoBlock title="高级配置：Markdown & 结构化数据" :ts-code="tsAdvancedConfig" :js-code="jsAdvancedConfig">
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble
      :content="mdContent"
      :markdown-options="{
        mermaid: true,
        latex: true,
        codeBlock: {
          copyable: true,
          runnable: true,
          explainable: true
        }
      }"
      :structured-data="{
        type: 'table',
        data: {
          headers: ['指标', '数值'],
          rows: [
            ['Tokens', 256],
            ['Latency(ms)', 120]
          ]
        }
      }"
      :on-run-code="async (code, lang) => {
        return { output: `运行 ${lang} 代码成功（示例）` }
      }"
      :on-explain-code="async () => '这里是对代码的示例解释（示例）'"
    />
  </div>
</DemoBlock>

## 更多示例

### 自定义头像

通过 `avatar` 属性或 `#avatar` 插槽自定义气泡的头像。

<DemoBlock title="自定义头像" :ts-code="tsAvatar" :js-code="jsAvatar">
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble
      role="assistant"
      avatar="https://api.dicebear.com/7.x/bottts/svg?seed=ai"
      content="你好！我是 AI 助手，有什么可以帮助你的吗？"
    />
    <yh-ai-bubble
      role="user"
      avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=user1"
      content="我想了解如何使用这个组件库。"
    />
  </div>
</DemoBlock>

### 自定义头部/尾部插槽

使用 `#header` 和 `#footer` 插槽自定义气泡的附加信息区域。

<DemoBlock title="自定义头部/尾部" :ts-code="tsSlots" :js-code="jsSlots">
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble role="assistant" content="这是一个带有自定义头部和尾部的气泡。">
      <template #header>
        <div style="display:flex;align-items:center;gap:8px;">
          <span style="color:var(--yh-color-success);">● 已送达</span>
          <span style="font-size:12px;color:var(--yh-text-color-placeholder);">10:30</span>
        </div>
      </template>
      <template #footer>
        <div style="display:flex;gap:8px;">
          <yh-button size="small" type="primary">复制</yh-button>
          <yh-button size="small" type="primary">转发</yh-button>
        </div>
      </template>
    </yh-ai-bubble>
  </div>
</DemoBlock>

### 气泡位置控制

通过 `placement` 属性控制气泡的对齐位置。

<DemoBlock title="气泡位置" :ts-code="tsPlacement" :js-code="jsPlacement">
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble role="assistant" placement="start" content="左侧气泡（start）" />
    <yh-ai-bubble role="user" placement="end" content="右侧气泡（end）" />
  </div>
</DemoBlock>

### 系统消息

使用 `role="system"` 展示系统提示或公告信息。

<DemoBlock title="系统消息" :ts-code="tsSystem" :js-code="jsSystem">
  <div style="background:var(--yh-bg-color-page); padding:16px; display:flex; flex-direction:column; gap:16px;">
    <yh-ai-bubble role="system" content="⚠️ 系统提示：当前对话时长已超过 30 分钟，建议保存进度。" />
    <yh-ai-bubble role="assistant" content="有什么我可以帮助你的？" />
  </div>
</DemoBlock>

### 纯文本模式

关闭 Markdown 解析，显示纯文本内容。

<DemoBlock title="纯文本模式" :ts-code="tsPlainText" :js-code="jsPlainText">
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble
      role="assistant"
      :markdown="false"
      content="这是一段纯文本内容，不会被解析为 Markdown。\n\n这里的换行会保留，但不会有**加粗**或代码高亮。"
    />
  </div>
</DemoBlock>

### 完整对话流

展示多轮对话的完整效果。

<DemoBlock title="完整对话流" :ts-code="tsConversation" :js-code="jsConversation">
  <div style="background:var(--yh-bg-color-page); padding:16px; display:flex; flex-direction:column; gap:12px; max-width:600px;">
    <yh-ai-bubble
      v-for="(msg, idx) in conversationMessages"
      :key="idx"
      :role="msg.role as 'user' | 'assistant'"
      :content="msg.content"
    />
  </div>
</DemoBlock>

### JSON 结构化数据

展示结构化的 JSON 数据。

<DemoBlock title="JSON 结构化数据" :ts-code="tsJsonData" :js-code="jsJsonData">
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble
      role="assistant"
      content="以下是查询到的用户数据："
      :structured-data="{
        type: 'json',
        data: {
          name: '张三',
          email: 'zhangsan@example.com',
          role: '管理员',
          status: 'active'
        }
      }"
    />
  </div>
</DemoBlock>

### 思维链展示

使用 `thought-chain` 类型展示思考过程。

<DemoBlock title="思维链" :ts-code="tsThoughtChain" :js-code="jsThoughtChain">
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble
      role="assistant"
      content="让我一步步思考这个问题："
      :structured-data="{
        type: 'thought-chain',
        data: [
          { title: '理解问题', content: '首先分析用户的需求，确定要实现的功能目标。' },
          { title: '设计方案', content: '根据需求设计技术方案，选择合适的框架和工具。' },
          { title: '实现代码', content: '按照设计方案编写代码，注意代码质量和性能。' },
          { title: '测试验证', content: '编写测试用例，验证功能的正确性和稳定性。' }
        ]
      }"
    />
  </div>
</DemoBlock>

### 代码块流式输出 (Streaming Code Output)

代码块支持真正的流式输出，执行结果会逐行实时显示，模仿真实终端体验。

**特性：**

- 逐行流式显示执行结果
- 彩色前缀区分不同类型输出（`>` 运行中、`←` 返回值、`✓` 成功、`✗` 错误）
- 支持 WebContainer 和浏览器两种运行环境

<DemoBlock title="代码块流式输出" :ts-code="tsCodeStream" :js-code="jsCodeStream">
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble
      role="assistant"
      :content="codeStreamContent"
      :markdown-options="{
        codeBlock: {
          copyable: true,
          runnable: true,
          explainable: false
        }
      }"
    />
  </div>
</DemoBlock>

### 在线运行代码：Monaco + WebContainer

通过在 `markdown-options.codeBlock` 中将 `runtime` 设置为 `webcontainer`，代码块可以在内置的 **WebContainer 沙箱** 中运行，并使用内联 Monaco 编辑器进行编辑。

> **本地开发注意**：WebContainer 需要以下条件才能在浏览器中运行：
>
> - **HTTPS** 或 **localhost** 环境
> - 服务器响应头必须包含：
>   - `Cross-Origin-Embedder-Policy: require-corp`
>   - `Cross-Origin-Opener-Policy: same-origin`
> - 浏览器支持 `SharedArrayBuffer`
>
> 如果不满足条件，组件会自动降级为浏览器内联执行。

**Playground 开发服务器已自动配置上述响应头**，可直接测试 WebContainer 功能。

<DemoBlock title="Monaco + WebContainer 运行代码" :ts-code="tsMonacoWeb" :js-code="jsMonacoWeb">
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble
      role="assistant"
      :content="liveMonacoCodeSnippet"
      :markdown-options="{
        codeBlock: {
          copyable: true,
          runnable: true,
          explainable: false,
          runtime: 'webcontainer'
        }
      }"
    />
  </div>
</DemoBlock>

## 主题定制 (Theme Overrides)

除了全局 CSS 变量外，您还可以通过 `theme-overrides` 属性对单个气泡进行精细化的外观定制。

<DemoBlock title="实例级主题覆盖" :ts-code="tsTheme" :js-code="jsTheme">
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble 
      role="assistant" 
      content="我已经根据您的品牌色调整了我的外观。" 
      :theme-overrides="{
        assistantBgColor: '#e3f2fd',
        assistantTextColor: '#1565c0',
        borderRadius: '24px'
      }"
    />
  </div>
</DemoBlock>

## API

### Props

| 属性名                  | 说明                                   | 类型                                                 | 默认值                               |
| ----------------------- | -------------------------------------- | ---------------------------------------------------- | ------------------------------------ |
| `content`               | 会话文本，支持 Markdown                | `string`                                             | `''`                                 |
| `markdown`              | 开启 Markdown 和代码高亮解析引擎       | `boolean`                                            | `true`                               |
| `role`                  | 发送方身份                             | `'user' \| 'assistant' \| 'system'`                  | `'assistant'`                        |
| `placement`             | 气泡排列位置                           | `'start' \| 'end'`                                   | 根据 role 自动推断                   |
| `shape`                 | 气泡边角形制                           | `'corner' \| 'round'`                                | `'round'`                            |
| `variant`               | 气泡视觉变体风格                       | `'filled' \| 'outlined' \| 'shadow' \| 'borderless'` | `'filled'`                           |
| `time`                  | 气泡顶部时间标签                       | `string`                                             | —                                    |
| `avatar`                | 自定义气泡头像地址                     | `string`                                             | —                                    |
| `loading`               | 是否正在输出                           | `boolean`                                            | `false`                              |
| `typing`                | 显示打字特效动画                       | `boolean`                                            | `false`                              |
| `streaming`             | 启用流式增量渲染 (逐字/逐句显示)       | `boolean`                                            | `false`                              |
| `stream-mode`           | 流式渲染模式                           | `'word' \| 'sentence' \| 'paragraph'`                | `'word'`                             |
| `stream-speed`          | 流式渲染速度 (每次渲染的字符数)        | `number`                                             | `1`                                  |
| `stream-interval`       | 流式渲染间隔 (ms)                      | `number`                                             | `20`                                 |
| `citations`             | 参考引用列表                           | `AiCitation[]`                                       | `[]`                                 |
| `multimodal`            | 多模态内容 (图片、音频、文件等)        | `AiMultimodal[]`                                     | `[]`                                 |
| `markdown-options`      | Markdown 行为与能力配置                | `AiMarkdownOptions`                                  | `{}`                                 |
| `structured-data`       | 结构化数据 (JSON/表格/思维导图/思路线) | `AiStructuredData`                                   | —                                    |
| `enable-python-runtime` | 是否启用 Python 代码运行支持           | `boolean`                                            | `false`                              |
| `python-runtime`        | Python 运行时类型                      | `'browser' \| 'remote'`                              | `'browser'`                          |
| `python-api-url`        | 远程 Python API 地址                   | `string`                                             | —                                    |
| `pyodide-url`           | Pyodide CDN 地址                       | `string`                                             | —                                    |
| `enable-sanitizer`      | 是否启用内置 XSS 防护                  | `boolean`                                            | `true`                               |
| `sanitizer`             | 自定义 HTML 清理函数                   | `(html: string) => string`                           | —                                    |
| `allowed-tags`          | 允许的标签白名单                       | `string[]`                                           | 默认常见安全标签                     |
| `allowed-attributes`    | 允许的属性白名单                       | `string[]`                                           | 默认常见安全属性                     |
| `allowed-schemes`       | 允许的协议白名单                       | `string[]`                                           | `['http', 'https', 'mailto', 'tel']` |
| `theme-overrides`       | 主题变量覆盖                           | `AiBubbleThemeVars`                                  | —                                    |

### Events / Callbacks

| 名称                 | 说明             | 类型                                                                              |
| -------------------- | ---------------- | --------------------------------------------------------------------------------- |
| `on-explain-code`    | 代码解释回调     | `(code: string, language: string) => Promise<string>`                             |
| `on-run-code`        | 代码运行回调     | `(code: string, language: string) => Promise<{ output: string; error?: string }>` |
| `on-citation-click`  | 引用项点击回调   | `(citation: AiCitation) => void`                                                  |
| `on-stream-complete` | 流式渲染完成回调 | `() => void`                                                                      |

### AiCitation

| 属性名   | 说明                       | 类型               |
| -------- | -------------------------- | ------------------ |
| `id`     | 引用索引，对应文本中的标识 | `string \| number` |
| `title`  | 来源标题                   | `string`           |
| `url`    | 详细链接                   | `string`           |
| `source` | 来源站点名称               | `string`           |
| `icon`   | 来源图标                   | `string`           |

### AiMultimodal

| 属性名  | 说明                        | 类型                                      |
| ------- | --------------------------- | ----------------------------------------- |
| `type`  | 媒体类型                    | `'image' \| 'audio' \| 'file' \| 'video'` |
| `title` | 标题/文件名                 | `string`                                  |
| `url`   | 资源链接                    | `string`                                  |
| `size`  | 文件大小                    | `string`                                  |
| `extra` | 额外参数（如语音 duration） | `Record<string, unknown>`                 |

### AiMarkdownOptions

| 属性名             | 说明                    | 类型                              | 默认值  |
| ------------------ | ----------------------- | --------------------------------- | ------- |
| `codeBlock`        | 代码块交互能力配置      | `AiCodeBlockOptions`              | `{}`    |
| `mermaid`          | 是否启用 Mermaid 图表   | `AiMermaidConfig \| boolean`      | `true`  |
| `latex`            | 是否启用 LaTeX 公式渲染 | `AiLatexOptions \| boolean`       | `true`  |
| `filePreview`      | 是否启用内置文件预览    | `AiFilePreviewOptions \| boolean` | `true`  |
| `linkify`          | 是否自动识别链接        | `boolean`                         | `true`  |
| `html`             | 是否允许 HTML 标签      | `boolean`                         | `false` |
| `typographer`      | 是否启用智能排版        | `boolean`                         | `true`  |
| `allowedProtocols` | 允许的 URL 协议白名单   | `string[]`                        | `[]`    |

### AiStructuredData

| 属性名    | 说明                     | 类型                                                           |
| --------- | ------------------------ | -------------------------------------------------------------- |
| `type`    | 数据类型                 | `'json' \| 'table' \| 'chart' \| 'mindmap' \| 'thought-chain'` |
| `data`    | 实际数据内容             | `unknown`                                                      |
| `options` | 渲染配置（图表等可选项） | `Record<string, unknown>`                                      |

### Slots

| 插槽名  | 说明           | 参数 |
| ------- | -------------- | ---- |
| default | 内容自定义     | —    |
| avatar  | 自定义头像     | —    |
| header  | 自定义头部区域 | —    |
| footer  | 自定义尾部区域 | —    |

### Python 沙盒 Props

| 属性名                | 说明                         | 类型                    | 默认值      |
| --------------------- | ---------------------------- | ----------------------- | ----------- |
| `enablePythonRuntime` | 是否启用 Python 代码运行支持 | `boolean`               | `false`     |
| `pythonRuntime`       | Python 运行时类型            | `'browser' \| 'remote'` | `'browser'` |
| `pythonApiUrl`        | 远程 Python API 地址         | `string`                | —           |
| `pyodideUrl`          | Pyodide CDN 地址             | `string`                | 见下方说明  |

### XSS 防护 Props

| 属性名              | 说明                  | 类型                       | 默认值                               |
| ------------------- | --------------------- | -------------------------- | ------------------------------------ |
| `enableSanitizer`   | 是否启用内置 XSS 防护 | `boolean`                  | `true`                               |
| `sanitizer`         | 自定义 HTML 清理函数  | `(html: string) => string` | —                                    |
| `allowedTags`       | 允许的标签白名单      | `string[]`                 | 见下方说明                           |
| `allowedAttributes` | 允许的属性白名单      | `string[]`                 | 见下方说明                           |
| `allowedSchemes`    | 允许的协议白名单      | `string[]`                 | `['http', 'https', 'mailto', 'tel']` |

### Python 沙盒与 XSS 防护示例

#### 浏览器端 Python 运行 (Pyodide)

<DemoBlock title="浏览器端 Python 运行" :ts-code="tsPythonBrowser" :js-code="jsPythonBrowser">
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble
      role="assistant"
      content="下面是一段 Python 代码，可以在浏览器中直接运行："
      :enable-python-runtime="true"
      :python-runtime="'browser'"
    />
    <yh-ai-bubble
      role="assistant"
      content="```python
# Python 计算示例
result = sum(range(1, 101))
print(f'1 到 100 的累加和: {result}')
```"
      :enable-python-runtime="true"
      :python-runtime="'browser'"
      :markdown-options="{
        codeBlock: {
          copyable: true,
          runnable: true,
          explainable: false
        }
      }"
      :on-run-code="handleRunCode"
    />
  </div>
</DemoBlock>

#### 远程 Python API

<DemoBlock title="远程 Python API" :ts-code="tsPythonRemote" :js-code="jsPythonRemote">
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble
      role="assistant"
      content="```python
# 远程 Python API 执行示例
import math
print(f'圆周率: {math.pi}')
```"
      :enable-python-runtime="true"
      python-runtime="remote"
      python-api-url="https://api.example.com/python/exec"
      :on-run-code="handleRunCode"
      :markdown-options="{ codeBlock: { runnable: true } }"
    />
  </div>
</DemoBlock>

#### XSS 防护示例

<DemoBlock title="XSS 防护" :ts-code="tsXssDemo" :js-code="jsXssDemo">
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble
      role="assistant"
      :content="xssContent"
      :enable-sanitizer="true"
      :markdown-options="{ html: true }"
    />
  </div>
</DemoBlock>

#### 自定义白名单

<DemoBlock title="自定义白名单" :ts-code="tsCustomWhitelist" :js-code="jsCustomWhitelist">
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble
      role="assistant"
      :content="customHtmlContent"
      :enable-sanitizer="true"
      :allowed-tags="['p', 'b', 'i', 'a']"
      :allowed-attributes="['href', 'class']"
      :allowed-schemes="['https']"
      :markdown-options="{ html: true }"
    />
  </div>
</DemoBlock>

### AiBubbleList 虚拟滚动 (Large List Performance)

当对话历史极长（如超过 100 条）时，DOM 节点的过多渲染会导致页面滚动卡顿。`AiBubbleList` 结合了强大的虚拟滚动引擎，即使加载 **10,000 条** 消息也能保持丝滑的 60fps 滚动体验。

<DemoBlock title="虚拟滚动 - 性能优化" :ts-code="tsVirtualScroll" :js-code="jsVirtualScroll">
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble-list
      :items="virtualMessages"
      :virtual-scroll="true"
      :height="400"
      :item-height="100"
    />
  </div>
</DemoBlock>

### AiBubbleList Props

| 属性名           | 说明                     | 类型                 | 默认值  |
| ---------------- | ------------------------ | -------------------- | ------- |
| `items`          | 会话消息数据列表         | `AiBubbleListItem[]` | `[]`    |
| `virtual-scroll` | 是否开启大屏数据虚拟滚动 | `boolean`            | `false` |
| `height`         | 滚动区域容器高度         | `number \| string`   | `400`   |
| `item-height`    | 列表项的预估高度         | `number`             | `80`    |
| `auto-scroll`    | 新增消息自动滚动到底部   | `boolean`            | `true`  |
| `loading`        | 是否处于生成或加载中状态 | `boolean`            | `false` |

### AiBubbleList Slots

| 插槽名    | 说明                       | 参数                                        |
| --------- | -------------------------- | ------------------------------------------- |
| `bubble`  | 自定义每一项的对话气泡渲染 | `{ item: AiBubbleListItem, index: number }` |
| `loading` | 列表底部自定义加载渲染     | —                                           |

### AiBubbleList Methods

可以使用引用 (ref) 获取组件实例并调用以下方法：

| 方法名           | 说明                     | 参数              |
| ---------------- | ------------------------ | ----------------- |
| `scrollToBottom` | 滚动到列表最底部         | —                 |
| `scrollToIndex`  | 虚拟滚动定位到指定的索引 | `(index: number)` |

## 在 Nuxt 中使用

该组件完美支持 Nuxt 3/4。在 Nuxt 项目中，组件会被自动按需导入。

有关详细配置，请阅读 [Nuxt 集成文档](/guide/nuxt)。

## 主题变量

| 变量名                           | 说明             | 默认值                         |
| -------------------------------- | ---------------- | ------------------------------ |
| `--yh-ai-bubble-user-bg`         | 用户气泡背景色   | `var(--yh-color-primary)`      |
| `--yh-ai-bubble-user-color`      | 用户气泡文字颜色 | `var(--yh-color-white)`        |
| `--yh-ai-bubble-assistant-bg`    | AI 气泡背景色    | `var(--yh-fill-color-light)`   |
| `--yh-ai-bubble-assistant-color` | AI 气泡文字颜色  | `var(--yh-text-color-primary)` |
| `--yh-ai-bubble-border-radius`   | 气泡圆角大小     | `12px`                         |
