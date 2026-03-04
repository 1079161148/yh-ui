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
          headers: ['Metric', 'Value'],
          rows: [
            ['Tokens', 256],
            ['Latency(ms)', 120]
          ]
        }
      }"
      :on-run-code="async (code, lang) => {
        return { output: \`Run \${lang} code successfully (demo)\` }
      }"
      :on-explain-code="async () => 'This is a demo explanation for the code.'"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
const mdContent = "This is a **Markdown** rendering example, combined with structured data and code interactions.";
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
    content="I've adjusted my appearance based on your brand colors." 
    :theme-overrides="{
      assistantBgColor: '#e3f2fd',
      assistantTextColor: '#1565c0',
      borderRadius: '24px'
    }"
  />
</${_T}>`
const jsTheme = toJs(tsTheme)

// === Additional Demo Examples ===

// 1. Custom Avatar Demo
const tsAvatar = `<${_T}>
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble
      role="assistant"
      avatar="https://api.dicebear.com/7.x/bottts/svg?seed=ai"
      content="Hello! I'm your AI assistant. How can I help you today?"
    />
    <yh-ai-bubble
      role="user"
      avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=user1"
      content="I want to learn how to use this component library."
    />
  </div>
</${_T}>`

// 2. Custom Header/Footer Slots Demo
const tsSlots = `<${_T}>
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble role="assistant" content="This is a bubble with custom header and footer.">
      <template #header>
        <div style="display:flex;align-items:center;gap:8px;">
          <span style="color:var(--yh-color-success);">● Delivered</span>
          <span style="font-size:12px;color:var(--yh-text-color-placeholder);">10:30</span>
        </div>
      </template>
      <template #footer>
        <div style="display:flex;gap:8px;">
          <yh-button size="small" type="primary">Copy</yh-button>
          <yh-button size="small" type="primary">Forward</yh-button>
        </div>
      </template>
    </yh-ai-bubble>
  </div>
</${_T}>`

// 3. Placement Demo
const tsPlacement = `<${_T}>
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble role="assistant" placement="start" content="Left aligned bubble (start)" />
    <yh-ai-bubble role="user" placement="end" content="Right aligned bubble (end)" />
  </div>
</${_T}>`

// 4. System Message Demo
const tsSystem = `<${_T}>
  <div style="background:var(--yh-bg-color-page); padding:16px; display:flex; flex-direction:column; gap:16px;">
    <yh-ai-bubble role="system" content="⚠️ System Notice: This conversation has exceeded 30 minutes. Please save your progress." />
    <yh-ai-bubble role="assistant" content="How can I assist you today?" />
  </div>
</${_T}>`

// 5. Plain Text Mode Demo
const tsPlainText = `<${_T}>
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble
      role="assistant"
      :markdown="false"
      content="This is plain text content that will not be parsed as Markdown.\n\nLine breaks will be preserved, but there will be no **bold** or code highlighting."
    />
  </div>
</${_T}>`

// 6. Full Conversation Flow Demo
const conversationMessages = [
  { role: 'assistant', content: "Hello! I'm your AI assistant today. What can I help you with?" },
  { role: 'user', content: "I'd like to learn Vue 3's Composition API." },
  { role: 'assistant', content: 'Composition API is a new API style introduced in Vue 3 that allows you to organize component logic better.' },
  { role: 'user', content: 'Can you give me an example?' },
  { role: 'assistant', content: 'Of course!\n\n```vue\n<script setup>\nimport { ref, computed } from \"vue\"\n\nconst count = ref(0)\nconst doubled = computed(() => count.value * 2)\n<\\/script>\n\n<template>\n  <button @click=\"count++\">Count: {{ count }}</button>\n</template>\n```\nThis is a simple Composition API example.' }
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
  { role: 'assistant', content: 'Hello! I\'m your AI assistant today. What can I help you with?' },
  { role: 'user', content: 'I\'d like to learn Vue 3\'s Composition API.' },
  { role: 'assistant', content: 'Composition API is a new API style introduced in Vue 3 that allows you to organize component logic better.' },
  { role: 'user', content: 'Can you give me an example?' },
  { role: 'assistant', content: 'Of course!\\n\\n\`\`\`vue\\n<script setup>\\nimport { ref, computed } from "vue"\\n\\nconst count = ref(0)\\nconst doubled = computed(() => count.value * 2)\\n<\\/script>\\n\\n<template>\\n  <button @click="count++">Count: {{ count }}</button>\\n</template>\\n\`\`\`\\nThis is a simple Composition API example.' }
];
</${_S}>`

// 7. JSON Structured Data Demo
const tsJsonData = `<${_T}>
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble
      role="assistant"
      content="Here is the user data I retrieved:"
      :structured-data="{
        type: 'json',
        data: {
          name: 'John Doe',
          email: 'john@example.com',
          role: 'Admin',
          status: 'active'
        }
      }"
    />
  </div>
</${_T}>`

// 8. Thought Chain Demo
const tsThoughtChain = `<${_T}>
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble
      role="assistant"
      content="Let me think through this problem step by step:"
      :structured-data="{
        type: 'thought-chain',
        data: [
          { title: 'Understand the Problem', content: 'First analyze the user requirements to determine the functional goals.' },
          { title: 'Design the Solution', content: 'Design the technical solution based on requirements, selecting appropriate frameworks and tools.' },
          { title: 'Implement the Code', content: 'Write code according to the design, paying attention to code quality and performance.' },
          { title: 'Test and Verify', content: 'Write test cases to verify the correctness and stability of the functionality.' }
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

// 9. Monaco + WebContainer demo
const liveMonacoCodeSnippet = "```js\nconsole.log('Hello from WebContainer!')\n```"

// 10. Streaming code output demo
const codeStreamContent = `\`\`\`js
// This code will stream output in real-time
console.log('First line');
console.log('Second line');
console.log('Third line');
return 'Final return value';
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
// This code will stream output in real-time
console.log('First line');
console.log('Second line');
console.log('Third line');
return 'Final return value';
\\\`\\\`\`;
</${_S}>`
const jsCodeStream = toJs(tsCodeStream)
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

## Typing Effect & Visual Feedback

More than just a loading state, it allows text to flow out with a flickering cursor, mimicking the AI writing experience.

> [!TIP]
> **Enhanced Feedback**: When `typing` mode is enabled, the component automatically appends a **"Blinking Cursor"** to the last line and adds a **"Gentle Ripple"** glow to the bubble background, making the generation process feel alive.

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

## Advanced Configuration: Markdown & Structured Data

With `markdown-options`, `structured-data`, and callbacks `on-run-code` / `on-explain-code`, you can turn `AiBubble` into a richer Markdown and data visualization surface.

<DemoBlock title="Advanced Configuration: Markdown & Structured Data" :ts-code="tsAdvancedConfig" :js-code="jsAdvancedConfig">
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
          headers: ['Metric', 'Value'],
          rows: [
            ['Tokens', 256],
            ['Latency(ms)', 120]
          ]
        }
      }"
      :on-run-code="async (code, lang) => {
        return { output: `Run ${lang} code successfully (demo)` }
      }"
      :on-explain-code="async () => 'This is a demo explanation for the code.'"
    />
  </div>
</DemoBlock>

## More Examples

### Custom Avatar

Customize the bubble avatar using the `avatar` prop or `#avatar` slot.

<DemoBlock title="Custom Avatar" :ts-code="tsAvatar" :js-code="jsAvatar">
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble
      role="assistant"
      avatar="https://api.dicebear.com/7.x/bottts/svg?seed=ai"
      content="Hello! I'm your AI assistant. How can I help you today?"
    />
    <yh-ai-bubble
      role="user"
      avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=user1"
      content="I want to learn how to use this component library."
    />
  </div>
</DemoBlock>

### Custom Header/Footer Slots

Use `#header` and `#footer` slots to customize the bubble's supplementary information area.

<DemoBlock title="Custom Header/Footer Slots" :ts-code="tsSlots" :js-code="jsSlots">
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble role="assistant" content="This is a bubble with custom header and footer.">
      <template #header>
        <div style="display:flex;align-items:center;gap:8px;">
          <span style="color:var(--yh-color-success);">● Delivered</span>
          <span style="font-size:12px;color:var(--yh-text-color-placeholder);">10:30</span>
        </div>
      </template>
      <template #footer>
        <div style="display:flex;gap:8px;">
          <yh-button size="default" text>Copy</yh-button>
          <yh-button size="default" text>Forward</yh-button>
        </div>
      </template>
    </yh-ai-bubble>
  </div>
</DemoBlock>

### Bubble Placement

Control the bubble alignment using the `placement` prop.

<DemoBlock title="Bubble Placement" :ts-code="tsPlacement" :js-code="jsPlacement">
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble role="assistant" placement="start" content="Left aligned bubble (start)" />
    <yh-ai-bubble role="user" placement="end" content="Right aligned bubble (end)" />
  </div>
</DemoBlock>

### System Message

Use `role="system"` to display system notices or announcements.

<DemoBlock title="System Message" :ts-code="tsSystem" :js-code="jsSystem">
  <div style="background:var(--yh-bg-color-page); padding:16px; display:flex; flex-direction:column; gap:16px;">
    <yh-ai-bubble role="system" content="⚠️ System Notice: This conversation has exceeded 30 minutes. Please save your progress." />
    <yh-ai-bubble role="assistant" content="How can I assist you today?" />
  </div>
</DemoBlock>

### Plain Text Mode

Disable Markdown parsing to display plain text content.

<DemoBlock title="Plain Text Mode" :ts-code="tsPlainText" :js-code="jsPlainText">
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble
      role="assistant"
      :markdown="false"
      content="This is plain text content that will not be parsed as Markdown.\n\nLine breaks will be preserved, but there will be no **bold** or code highlighting."
    />
  </div>
</DemoBlock>

### Full Conversation Flow

Demonstrate a complete multi-turn conversation.

<DemoBlock title="Full Conversation Flow" :ts-code="tsConversation" :js-code="jsConversation">
  <div style="background:var(--yh-bg-color-page); padding:16px; display:flex; flex-direction:column; gap:12px; max-width:600px;">
    <yh-ai-bubble
      v-for="(msg, idx) in conversationMessages"
      :key="idx"
      :role="msg.role as 'user' | 'assistant'"
      :content="msg.content"
    />
  </div>
</DemoBlock>

### JSON Structured Data

Display structured JSON data.

<DemoBlock title="JSON Structured Data" :ts-code="tsJsonData" :js-code="jsJsonData">
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble
      role="assistant"
      content="Here is the user data I retrieved:"
      :structured-data="{
        type: 'json',
        data: {
          name: 'John Doe',
          email: 'john@example.com',
          role: 'Admin',
          status: 'active'
        }
      }"
    />
  </div>
</DemoBlock>

### Thought Chain

Use the `thought-chain` type to display the thinking process.

<DemoBlock title="Thought Chain" :ts-code="tsThoughtChain" :js-code="jsThoughtChain">
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble
      role="assistant"
      content="Let me think through this problem step by step:"
      :structured-data="{
        type: 'thought-chain',
        data: [
          { title: 'Understand the Problem', content: 'First analyze the user requirements to determine the functional goals.' },
          { title: 'Design the Solution', content: 'Design the technical solution based on requirements, selecting appropriate frameworks and tools.' },
          { title: 'Implement the Code', content: 'Write code according to the design, paying attention to code quality and performance.' },
          { title: 'Test and Verify', content: 'Write test cases to verify the correctness and stability of the functionality.' }
        ]
      }"
    />
  </div>
</DemoBlock>

### Streaming Code Output

Code blocks support true streaming output - execution results are displayed in real-time line by line, mimicking a real terminal experience.

**Features:**

- Real-time streaming display of execution results
- Color-coded prefixes for different output types (`>` running, `←` return value, `✓` success, `✗` error)
- Supports both WebContainer and browser runtime environments

<DemoBlock title="Streaming Code Output" :ts-code="tsCodeStream" :js-code="jsCodeStream">
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

### Online Code Runner: Monaco + WebContainer

By setting `runtime: 'webcontainer'` inside `markdown-options.codeBlock`, code blocks will run inside an embedded **WebContainer sandbox** and use an inline Monaco editor for live editing.

> **Local Development Note**: WebContainer requires the following to run in browser:
>
> - **HTTPS** or **localhost** environment
> - Server must include these headers:
>   - `Cross-Origin-Embedder-Policy: require-corp`
>   - `Cross-Origin-Opener-Policy: same-origin`
> - Browser must support `SharedArrayBuffer`
>
> If conditions are not met, the component automatically falls back to in-browser execution.

**The Playground dev server is pre-configured with these headers**, so you can test WebContainer functionality directly.

<DemoBlock title="Monaco + WebContainer Runner" :ts-code="tsMonacoWeb" :js-code="jsMonacoWeb">
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

| Property        | Description                         | Type                                                                              | Default            |
| --------------- | ----------------------------------- | --------------------------------------------------------------------------------- | ------------------ |
| content         | Message content                     | `string`                                                                          | `''`               |
| markdown        | Enable Markdown & highlight.js      | `boolean`                                                                         | `true`             |
| role            | Sender role                         | `'user' \| 'assistant' \| 'system'`                                               | `'assistant'`      |
| placement       | Bubble side                         | `'start' \| 'end'`                                                                | Inferred from role |
| shape           | Corner shape                        | `'corner' \| 'round'`                                                             | `'round'`          |
| variant         | Visual style                        | `'filled' \| 'outlined' \| 'shadow' \| 'borderless'`                              | `'filled'`         |
| time            | Timestamp label                     | `string`                                                                          | —                  |
| avatar          | Custom avatar URL                   | `string`                                                                          | —                  |
| loading         | Whether is loading                  | `boolean`                                                                         | `false`            |
| typing          | Show typewriter cursor animation    | `boolean`                                                                         | `false`            |
| citations       | Citation sources list               | `AiCitation[]`                                                                    | `[]`               |
| multimodal      | Multimodal content list             | `AiMultimodal[]`                                                                  | `[]`               |
| markdownOptions | Markdown behavior & feature options | `AiMarkdownOptions`                                                               | `{}`               |
| structuredData  | Structured data payload             | `AiStructuredData`                                                                | —                  |
| onExplainCode   | Code explanation callback           | `(code: string, language: string) => Promise<string>`                             | —                  |
| onRunCode       | Code execution callback             | `(code: string, language: string) => Promise<{ output: string; error?: string }>` | —                  |
| onCitationClick | Click handler for a citation item   | `(citation: AiCitation) => void`                                                  | —                  |
| themeOverrides  | Theme variable overrides            | `ComponentThemeVars`                                                              | —                  |

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

### AiMarkdownOptions

| Property           | Description                    | Type                              | Default |
| ------------------ | ------------------------------ | --------------------------------- | ------- |
| `codeBlock`        | Code block interaction options | `AiCodeBlockOptions`              | `{}`    |
| `mermaid`          | Enable Mermaid diagrams        | `AiMermaidConfig \| boolean`      | `true`  |
| `latex`            | Enable LaTeX math rendering    | `AiLatexOptions \| boolean`       | `true`  |
| `filePreview`      | Enable built-in file preview   | `AiFilePreviewOptions \| boolean` | `true`  |
| `linkify`          | Auto-detect and linkify URLs   | `boolean`                         | `true`  |
| `html`             | Allow raw HTML tags            | `boolean`                         | `false` |
| `typographer`      | Smart typography enhancements  | `boolean`                         | `true`  |
| `allowedProtocols` | Whitelisted URL protocols      | `string[]`                        | `[]`    |

### AiStructuredData

| Property  | Description                | Type                                                           |
| --------- | -------------------------- | -------------------------------------------------------------- |
| `type`    | Data type                  | `'json' \| 'table' \| 'chart' \| 'mindmap' \| 'thought-chain'` |
| `data`    | Raw structured payload     | `unknown`                                                      |
| `options` | Optional rendering options | `Record<string, unknown>`                                      |

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
