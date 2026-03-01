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

const jsBasic = toJs(tsBasic)
const jsAdvanced = toJs(tsAdvanced)
const jsTyping = toJs(tsTyping)
const jsCitations = toJs(tsCitations)
const jsMultimodal = toJs(tsMultimodal)

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

## 打字特效与 60fps 流式渲染防抖

这不仅仅是一个空 loading，它允许文字在一个一个吐出时跟随一个强烈的闪烁光标（类似光标指针的效果），以模仿正在被 AI 书写的感觉。

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

| 属性名         | 说明                             | 类型                                                 | 默认值             |
| -------------- | -------------------------------- | ---------------------------------------------------- | ------------------ |
| content        | 会话文本                         | `string`                                             | `''`               |
| markdown       | 开启 Markdown 和代码高亮解析引擎 | `boolean`                                            | `true`             |
| role           | 发送方身份                       | `'user' \| 'assistant' \| 'system'`                  | `'assistant'`      |
| placement      | 气泡排列位置                     | `'start' \| 'end'`                                   | 根据 role 自动推断 |
| shape          | 气泡边角形制                     | `'corner' \| 'round'`                                | `'corner'`         |
| variant        | 气泡视觉变体风格                 | `'filled' \| 'outlined' \| 'shadow' \| 'borderless'` | `'filled'`         |
| time           | 气泡顶部时间标签                 | `string`                                             | —                  |
| avatar         | 自定义气泡头像地址               | `string`                                             | —                  |
| loading        | 是否正在输出                     | `boolean`                                            | `false`            |
| typing         | 显示打字特效动画                 | `boolean`                                            | `false`            |
| citations      | 参考引用列表                     | `AiCitation[]`                                       | `[]`               |
| multimodal     | 多模态内容 (图片、音频、文件等)  | `AiMultimodal[]`                                     | `[]`               |
| themeOverrides | 主题变量覆盖                     | `ComponentThemeVars`                                 | —                  |

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
