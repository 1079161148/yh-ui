# AiBubble

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

const tsBasic = `<${_T}>
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-bubble role="assistant" content="Artificial Intelligence (AI) is the simulation of human intelligence processes by machines." />
    
    <yh-ai-bubble role="user" content="Can it write code by itself?" />
    
    <yh-ai-bubble role="assistant" loading typing />
  </div>
</${_T}>

<${_S} setup lang="ts">
</${_S}>`

const tsAdvanced = `<${_T}>
  <div style="background:var(--yh-bg-color-page); padding:16px; display:flex; flex-direction:column; gap:16px;">
    <!-- Built-in Markdown parse & code highlighting -->
    <yh-ai-bubble role="assistant" time="10:23 AM" :content="mdContent" />
    
    <!-- Shape Control: Round -->
    <yh-ai-bubble role="user" shape="round" content="Awesome! Can I change the styling?" />
    
    <!-- Visual Variant: Outlined -->
    <yh-ai-bubble role="assistant" variant="outlined" content="Sure, this is the outlined variant." />
    
    <!-- Visual Variant: Shadow -->
    <yh-ai-bubble role="user" variant="shadow" content="Looks very textured." />
    
    <!-- Visual Variant: Borderless -->
    <yh-ai-bubble role="assistant" variant="borderless" content="If you prefer no border, use the borderless variant." />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const mdContent = ref("Here is a **Markdown** rendering example with code:\\n\\n\`\`\`typescript\\nconst greeting = 'Hello World';\\nconsole.log(greeting);\\n\`\`\`")
</${_S}>`

const mdContent = ref("Here is a **Markdown** rendering example with code:\n\n```typescript\nconst greeting = 'Hello World';\nconsole.log(greeting);\n```")

const tsTyping = `<${_T}>
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-button @click="startTyping" style="margin-bottom: 16px;">Start Streaming Demo</yh-button>
    
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
const fullText = 'The typing effect provides a dynamically blinking cursor indicator appending at the very end of the string. It vividly portrays the stepwise output process of large models.'

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
const fullText = 'The typing effect provides a dynamically blinking cursor indicator appending at the very end of the string. It vividly portrays the stepwise output process of large models.'

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

Carries the bubble display of conversation messages.

## Basic Usage

Can display the style difference between `user` and `assistant`, as well as loading animation effects.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="toJs(tsBasic)">
<div style="background:var(--yh-bg-color-page); padding:16px; display:flex; flex-direction:column; gap:16px;">
  <yh-ai-bubble role="assistant" content="Artificial Intelligence (AI) is the simulation of human intelligence processes by machines." />
  <yh-ai-bubble role="user" content="Can it write code by itself?" />
  <yh-ai-bubble role="assistant" loading typing />
</div>
</DemoBlock>

## Advanced Features & Variants

AiBubble directly builds in a powerful Markdown engine and highlight.js code highlighting. It also provides rich supports for `variant`, `shape`, and `time` configurations.

<DemoBlock title="Advanced Combinations" :ts-code="tsAdvanced" :js-code="toJs(tsAdvanced)">
<div style="background:var(--yh-bg-color-page); padding:16px; display:flex; flex-direction:column; gap:16px;">
  <yh-ai-bubble role="assistant" time="10:23 AM" :content="mdContent" />
  <yh-ai-bubble role="user" shape="round" content="Awesome! Can I change the styling?" />
  <yh-ai-bubble role="assistant" variant="outlined" content="Sure, this is the outlined variant." />
  <yh-ai-bubble role="user" variant="shadow" content="Looks very textured." />
  <yh-ai-bubble role="assistant" variant="borderless" content="If you prefer no border, use the borderless variant." />
</div>
</DemoBlock>

## Typing Effect Animation

It's more than an empty loading container. It displays a blinking cursor right after strings populating char-by-char, perfectly illustrating writing processes under generative environments.

<DemoBlock title="Typing Effect" :ts-code="tsTyping" :js-code="toJs(tsTyping)">
<div style="background:var(--yh-bg-color-page); padding:16px;">
  <yh-button @click="startTyping" style="margin-bottom: 16px;">Start Streaming Demo</yh-button>
  <yh-ai-bubble 
    v-if="isGenerating"
    role="assistant" 
    :loading="currentText === ''" 
    :typing="isTypingMode" 
    :content="currentText" 
  />
</div>
</DemoBlock>

## Use in Nuxt

The component fully supports Nuxt 3/4 SSR rendering. In Nuxt projects, the component is auto-imported without manual registration.

For detail configurations, please check [Nuxt Usage](/en/guide/nuxt).

**SSR Notes**:

- ✅ All props and styles fully supported
- ✅ Dynamic states (typing, loading, etc.) normally generated

::: tip SSR Safety
AiBubble component has passed comprehensive SSR testing, ensuring consistent rendering between server and client.
:::

## API

### Props

| Name      | Description                                  | Type                                                 | Default                              |
| --------- | -------------------------------------------- | ---------------------------------------------------- | ------------------------------------ |
| content   | Bubble content text                          | `string`                                             | `''`                                 |
| markdown  | Enable Markdown and code highlighting engine | `boolean`                                            | `true`                               |
| role      | Sender Identity                              | `'user' \| 'assistant' \| 'system'`                  | `'assistant'`                        |
| placement | Alignment position                           | `'start' \| 'end'`                                   | Automatically inferred based on role |
| shape     | Bubble corner shape                          | `'corner' \| 'round'`                                | `'corner'`                           |
| variant   | Visual style variant                         | `'filled' \| 'outlined' \| 'shadow' \| 'borderless'` | `'filled'`                           |
| time      | Header time string                           | `string`                                             | —                                    |
| avatar    | Custom avatar URL                            | `string`                                             | —                                    |
| loading   | Displays loading state                       | `boolean`                                            | `false`                              |
| typing    | Show typing effect animation                 | `boolean`                                            | `false`                              |

### Slots

| Name    | Description           | Parameters |
| ------- | --------------------- | ---------- |
| default | Custom bubble content | —          |
| avatar  | Custom avatar display | —          |
| header  | Custom header area    | —          |
| footer  | Custom footer area    | —          |

## Theme Variables

| Variable Name                    | Description                  | Default Value                  |
| -------------------------------- | ---------------------------- | ------------------------------ |
| `--yh-ai-bubble-user-bg`         | User bubble background color | `var(--yh-color-primary)`      |
| `--yh-ai-bubble-user-color`      | User bubble text color       | `var(--yh-color-white)`        |
| `--yh-ai-bubble-assistant-bg`    | AI bubble background color   | `var(--yh-fill-color-light)`   |
| `--yh-ai-bubble-assistant-color` | AI bubble text color         | `var(--yh-text-color-primary)` |
| `--yh-ai-bubble-border-radius`   | Bubble border radius         | `12px`                         |
