# AiBubble 对话气泡

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

const tsBasic = `<${_T}>
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble role="assistant" content="人工智能（AI）是一种能够执行通常需要人类智能的任务的技术。" />
    
    <yh-ai-bubble role="user" content="那它能自己写代码吗？" />
    
    <yh-ai-bubble role="assistant" loading typing />
  </div>
</${_T}>

<${_S} setup lang="ts">
</${_S}>`

const tsAdvanced = `<${_T}>
  <div style="background:var(--yh-bg-color-page); padding:16px; display:flex; flex-direction:column; gap:16px;">
    <!-- 内置 Markdown 解析与代码高亮 -->
    <yh-ai-bubble role="assistant" time="10:23 AM" :content="mdContent" />
    
    <!-- 形制控制：Round 圆角风格 -->
    <yh-ai-bubble role="user" shape="round" content="真棒！可以更换样式吗？" />
    
    <!-- 视觉变体：Outlined 边框模式 -->
    <yh-ai-bubble role="assistant" variant="outlined" content="当然可以，这是 outlined 模式。" />
    
    <!-- 视觉变体：Shadow 阴影模式 -->
    <yh-ai-bubble role="user" variant="shadow" content="看起来非常有质感。" />
    
    <!-- 视觉变体：Borderless 无边框模式 -->
    <yh-ai-bubble role="assistant" variant="borderless" content="如果您不喜欢边框，可以使用 borderless 模式。" />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const mdContent = ref("这是一段 **Markdown** 的渲染示例。来看一段代码：\\n\\n\`\`\`typescript\\nconst greeting = 'Hello World';\\nconsole.log(greeting);\\n\`\`\`")
</${_S}>`

const mdContent = ref("这是一段 **Markdown** 的渲染示例。来看一段代码：\n\n```typescript\nconst greeting = 'Hello World';\nconsole.log(greeting);\n```")

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
import { ref } from 'vue'

const isGenerating = ref(false)
const isTypingMode = ref(false)
const currentText = ref('')
const fullText = '打字机特效能够在文字按顺序输出的同时，提供一个跟在末尾的光标闪烁指示器（Cursor）。它生动地刻画了模型思考与返回片段的过程，配合 loading 状态食用体验极佳。'

let timer: any = null

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
</${_S}>`

const isGenerating = ref(false)
const isTypingMode = ref(false)
const currentText = ref('')
const fullText = '打字机特效能够在文字按顺序输出的同时，提供一个跟在末尾的光标闪烁指示器（Cursor）。它生动地刻画了模型思考与返回片段的过程，配合 loading 状态食用体验极佳。'

let timer: any = null

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

</script>

承载对话消息的冒泡显示。

## 基础用法

可以展示 `user` 和 `assistant` 的样式差异，以及加载动画效果！

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="toJs(tsBasic)">
<div style="background:var(--yh-bg-color-page); padding:16px; display:flex; flex-direction:column; gap:16px;">
  <yh-ai-bubble role="assistant" content="人工智能（AI）是一种能够执行通常需要人类智能的任务的技术。" />
  <yh-ai-bubble role="user" content="那它能自己写代码吗？" />
  <yh-ai-bubble role="assistant" loading typing />
</div>
</DemoBlock>

## 进阶功能与变体

AiBubble 直接内置了强大的 Markdown 引擎与 highlight.js 代码高亮解析。并提供了丰富的变体 (`variant`) 与形制 (`shape`)、以及时间等信息传递的支持。

<DemoBlock title="进阶组合" :ts-code="tsAdvanced" :js-code="toJs(tsAdvanced)">
<div style="background:var(--yh-bg-color-page); padding:16px; display:flex; flex-direction:column; gap:16px;">
  <yh-ai-bubble role="assistant" time="10:23 AM" :content="mdContent" />
  <yh-ai-bubble role="user" shape="round" content="真棒！可以更换样式吗？" />
  <yh-ai-bubble role="assistant" variant="outlined" content="当然可以，这是 outlined 模式。" />
  <yh-ai-bubble role="user" variant="shadow" content="看起来非常有质感。" />
  <yh-ai-bubble role="assistant" variant="borderless" content="如果您不喜欢外轮廓，可以使用 borderless 模式。" />
</div>
</DemoBlock>

## 打字特效

这不仅仅是一个空 loading，它允许文字在一个一个吐出时跟随一个强烈的闪烁光标（类似光标指针的效果），以模仿正在被 AI 书写的感觉。

<DemoBlock title="打字特效动画" :ts-code="tsTyping" :js-code="toJs(tsTyping)">
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

## 在 Nuxt 中使用

该组件全面支持 Nuxt 3/4 SSR 渲染。在 Nuxt 项目中组件会自动按需导入，无需手动注册。

有关详细配置和使用方法，请阅读 [Nuxt 集成文档](/guide/nuxt)。

**SSR 注意事项**：

- ✅ 所有 Props 和样式完全支持
- ✅ 动态状态（打字机、加载中等）正常渲染

::: tip SSR 安全性
AiBubble 组件已通过完整的 SSR 测试，确保服务端和客户端渲染完全一致。
:::

## API

### Props

| 属性名    | 说明                             | 类型                                                 | 默认值             |
| --------- | -------------------------------- | ---------------------------------------------------- | ------------------ |
| content   | 会话文本                         | `string`                                             | `''`               |
| markdown  | 开启 Markdown 和代码高亮解析引擎 | `boolean`                                            | `true`             |
| role      | 发送方身份                       | `'user' \| 'assistant' \| 'system'`                  | `'assistant'`      |
| placement | 气泡排列位置                     | `'start' \| 'end'`                                   | 根据 role 自动推断 |
| shape     | 气泡边角形制                     | `'corner' \| 'round'`                                | `'corner'`         |
| variant   | 气泡视觉变体风格                 | `'filled' \| 'outlined' \| 'shadow' \| 'borderless'` | `'filled'`         |
| time      | 气泡顶部时间标签                 | `string`                                             | —                  |
| avatar    | 自定义气泡头像地址               | `string`                                             | —                  |
| loading   | 是否正在输出                     | `boolean`                                            | `false`            |
| typing    | 显示打字特效动画                 | `boolean`                                            | `false`            |

### Slots

| 插槽名  | 说明           | 参数 |
| ------- | -------------- | ---- |
| default | 内容自定义     | —    |
| avatar  | 自定义头像     | —    |
| header  | 自定义头部区域 | —    |
| footer  | 自定义尾部区域 | —    |

## 主题变量

| 变量名                           | 说明             | 默认值                         |
| -------------------------------- | ---------------- | ------------------------------ |
| `--yh-ai-bubble-user-bg`         | 用户气泡背景色   | `var(--yh-color-primary)`      |
| `--yh-ai-bubble-user-color`      | 用户气泡文字颜色 | `var(--yh-color-white)`        |
| `--yh-ai-bubble-assistant-bg`    | AI 气泡背景色    | `var(--yh-fill-color-light)`   |
| `--yh-ai-bubble-assistant-color` | AI 气泡文字颜色  | `var(--yh-text-color-primary)` |
| `--yh-ai-bubble-border-radius`   | 气泡圆角大小     | `12px`                         |
