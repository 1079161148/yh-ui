# AiBubble

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

const isGenerating = ref(false)
const isTypingMode = ref(false)
const currentText = ref('')
const fullText = 'The typewriter effect allows text to be output one by one, providing a flickering cursor indicator (Cursor) at the end. It vividly portrays the model\'s thinking and returning segments process, offering an excellent experience when combined with the loading state.'

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
  { id: 1, title: 'YH-UI Official Docs', url: '/' },
  { id: 2, title: 'Vue 3 Composition API Guide', url: 'https://vuejs.org' },
  { id: 3, title: 'Vite Developer Community', url: 'https://vitejs.dev' }
]

const multimodalData = [
  {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=200&auto=format&fit=crop',
    title: 'Prototype 1'
  },
  {
    type: 'image',
    url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=200&auto=format&fit=crop',
    title: 'Prototype 2'
  },
  {
    type: 'audio',
    url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3',
    extra: { duration: '0:02' }
  },
  {
    type: 'file',
    title: 'Requirements.pdf',
    size: '1.2 MB',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  }
]

const mdContent = "This is a **Markdown** rendering example. Let's see some code:\n\n```typescript\nconst greeting = 'Hello World';\nconsole.log(greeting);\n```"

const tsBasic = `<${_T}>
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble role="assistant" content="Artificial Intelligence (AI) is technology that can perform tasks that typically require human intelligence." />
    <yh-ai-bubble role="user" content="Can it write code by itself?" />
    <yh-ai-bubble role="assistant" loading typing />
  </div>
</${_T}>`

const tsAdvanced = `<${_T}>
  <div style="background:var(--yh-bg-color-page); padding:16px; display:flex; flex-direction:column; gap:16px;">
    <yh-ai-bubble role="assistant" time="10:23 AM" :content="mdContent" />
    <yh-ai-bubble role="user" shape="round" content="Great! Can I change the style?" />
    <yh-ai-bubble role="assistant" variant="outlined" content="Sure, this is outlined mode." />
    <yh-ai-bubble role="user" variant="shadow" content="It looks really premium." />
    <yh-ai-bubble role="assistant" variant="borderless" content="If you don't like outlines, you can use borderless mode." />
  </div>
</${_T}>

<${_S} setup lang="ts">
const mdContent = "This is a **Markdown** rendering example. Let's see some code:\\n\\n\`\`\`typescript\\nconst greeting = 'Hello World';\\nconsole.log(greeting);\\n\`\`\`";
</${_S}>`

const tsTyping = `<${_T}>
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-button @click="startTyping" style="margin-bottom: 16px;">Start Generation Demo</yh-button>
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
const fullText = 'The typewriter effect allows text to be output one by one...';

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
    }
  }, 40);
};
</${_S}>`

const tsCitations = `<${_T}>
  <div style="max-width: 600px;">
    <yh-ai-bubble 
      role="assistant" 
      content="According to the latest YH-UI guide [1], we recommend using Composition API [2]. Moreover, Vite's build optimizations [3] can significantly improve UX." 
      :citations="citations"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import type { AiCitation } from '@yh-ui/components';

const citations: AiCitation[] = [
  { id: 1, title: 'YH-UI Official Docs', url: 'https://yh-ui.com' },
  { id: 2, title: 'Vue 3 Composition API Guide', url: 'https://vuejs.org' },
  { id: 3, title: 'Vite Developer Community', url: 'https://vitejs.dev' }
];
</${_S}>`

const tsMultimodal = `<${_T}>
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble 
      content="Here are the audio assets and reference documents I generated for you."
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
    title: 'Prototype 1'
  },
  {
    type: 'audio',
    url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3',
    extra: { duration: '0:02' }
  },
  {
    type: 'file',
    title: 'Requirement.pdf',
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
    content="I've adjusted my appearance based on your brand colors." 
    :theme-overrides="{
      assistantBgColor: '#e3f2fd',
      assistantTextColor: '#1565c0',
      borderRadius: '24px'
    }"
  />
</${_T}>`
const jsTheme = toJs(tsTheme)
</script>

`AiBubble` is the core component for AI conversation interaction.

## Basic Usage

Display visual differences between `user` and `assistant`, along with loading animations.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
<div style="background:var(--yh-bg-color-page); padding:16px; display:flex; flex-direction:column; gap:16px;">
  <yh-ai-bubble role="assistant" content="Artificial Intelligence (AI) is technology that can perform tasks that typically require human intelligence." />
  <yh-ai-bubble role="user" content="Can it write code by itself?" />
  <yh-ai-bubble role="assistant" loading typing />
</div>
</DemoBlock>

## Advanced Features & Variants

`AiBubble` features a built-in Markdown engine and highlight.js parsing. It offers various variants (`variant`), shapes (`shape`), and specialized metadata support.

<DemoBlock title="Advanced Combo" :ts-code="tsAdvanced" :js-code="jsAdvanced">
<div style="background:var(--yh-bg-color-page); padding:16px; display:flex; flex-direction:column; gap:16px;">
  <yh-ai-bubble role="assistant" time="10:23 AM" :content="mdContent" />
  <yh-ai-bubble role="user" shape="round" content="Great! Can I change the style?" />
  <yh-ai-bubble role="assistant" variant="outlined" content="Sure, this is outlined mode." />
  <yh-ai-bubble role="user" variant="shadow" content="It looks really premium." />
  <yh-ai-bubble role="assistant" variant="borderless" content="If you don't like outlines, you can use borderless mode." />
</div>
</DemoBlock>

## Typewriter Effect & 60fps Streaming

More than just a loading state, it allows text to flow out with a flickering cursor, mimicking the AI writing experience.

- **Streaming Performance**: Under the hood, we introduced a `requestAnimationFrame` debouncing queue. When receiving high-frequency text payloads in `typing` mode, it stabilizes the intense Markdown parsing and keeps your browser refreshing at a seamless 60 frames per second without blocking the main thread!

<DemoBlock title="Typewriter Effect" :ts-code="tsTyping" :js-code="jsTyping">
<div style="background:var(--yh-bg-color-page); padding:16px;">
  <yh-button @click="startTyping" style="margin-bottom: 16px;">Start Generation Demo</yh-button>
  <yh-ai-bubble 
    v-if="isGenerating"
    role="assistant" 
    :loading="currentText === ''" 
    :typing="isTypingMode" 
    :content="currentText" 
  />
</div>
</DemoBlock>

## Citations & Reference Tooltip

AI responses often need verification to avoid hallucinations. Besides appending a raw list at the bottom, we injected a smart Citation syntax interceptor natively.
If the `citations` array is present and the model outputs Markdown tags like `[1]` or `[2]`: **the bubble automatically transforms them into interactive, softly-glowing citation badges**.
💡 **Try it:** Hover your mouse over `[1]`, `[2]`, or `[3]` in the text below to trigger the elegant floating citation popover.

<DemoBlock title="Citations" :ts-code="tsCitations" :js-code="jsCitations">
  <div style="max-width: 600px;">
    <yh-ai-bubble 
      role="assistant" 
      content="According to the latest YH-UI guide [1], we recommend using Composition API [2]. Moreover, Vite's build optimizations [3] can significantly improve UX." 
      :citations="citations"
    />
  </div>
</DemoBlock>

## Multimodal Rendering

The component supports direct display of various media formats, including image grids, audio players with waveform animations, and file/download cards.

<DemoBlock title="Multimodal" :ts-code="tsMultimodal" :js-code="jsMultimodal">
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble 
      content="Here are the audio assets and reference documents I generated for you."
      :multimodal="multimodalData"
    />
  </div>
</DemoBlock>

## Theme Overrides

Besides global CSS variables, you can use the `theme-overrides` property for granular instance-level styling.

<DemoBlock title="Instance Level Overrides" :ts-code="tsTheme" :js-code="jsTheme">
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble 
      role="assistant" 
      content="I've adjusted my appearance based on your brand colors." 
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

| Property       | Description                      | Type                                                 | Default            |
| -------------- | -------------------------------- | ---------------------------------------------------- | ------------------ |
| content        | Message content                  | `string`                                             | `''`               |
| markdown       | Enable Markdown & highlight.js   | `boolean`                                            | `true`             |
| role           | Sender role                      | `'user' \| 'assistant' \| 'system'`                  | `'assistant'`      |
| placement      | Bubble side                      | `'start' \| 'end'`                                   | Inferred from role |
| shape          | Corner shape                     | `'corner' \| 'round'`                                | `'corner'`         |
| variant        | Visual style                     | `'filled' \| 'outlined' \| 'shadow' \| 'borderless'` | `'filled'`         |
| time           | Timestamp label                  | `string`                                             | —                  |
| avatar         | Custom avatar URL                | `string`                                             | —                  |
| loading        | Whether is loading               | `boolean`                                            | `false`            |
| typing         | Show typewriter cursor animation | `boolean`                                            | `false`            |
| citations      | Citation sources list            | `AiCitation[]`                                       | `[]`               |
| multimodal     | Multimodal content list          | `AiMultimodal[]`                                     | `[]`               |
| themeOverrides | Theme variable overrides         | `ComponentThemeVars`                                 | —                  |

### AiCitation

| Property | Description      | Type               |
| -------- | ---------------- | ------------------ |
| `id`     | Index identifier | `string \| number` |
| `title`  | Title of source  | `string`           |
| `url`    | Web link         | `string`           |
| `source` | Source site name | `string`           |
| `icon`   | Source icon      | `string`           |

### AiMultimodal

| Property | Description                | Type                                      |
| -------- | -------------------------- | ----------------------------------------- |
| `type`   | Media type                 | `'image' \| 'audio' \| 'file' \| 'video'` |
| `title`  | Title/Filename             | `string`                                  |
| `url`    | Resource URL               | `string`                                  |
| `size`   | Resource size              | `string`                                  |
| `extra`  | Extra args (e.g. duration) | `Record<string, unknown>`                 |

### Slots

| Name    | Description    | Props |
| ------- | -------------- | ----- |
| default | Custom content | —     |
| avatar  | Custom avatar  | —     |
| header  | Custom header  | —     |
| footer  | Custom footer  | —     |

## Theme Variables

| Variable Name                    | Description            | Default Value                  |
| -------------------------------- | ---------------------- | ------------------------------ |
| `--yh-ai-bubble-user-bg`         | User bubble background | `var(--yh-color-primary)`      |
| `--yh-ai-bubble-user-color`      | User bubble text color | `var(--yh-color-white)`        |
| `--yh-ai-bubble-assistant-bg`    | AI bubble background   | `var(--yh-fill-color-light)`   |
| `--yh-ai-bubble-assistant-color` | AI bubble text color   | `var(--yh-text-color-primary)` |
| `--yh-ai-bubble-border-radius`   | Bubble border radius   | `12px`                         |
