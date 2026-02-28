# AiChat

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

const tsBasic = `<${_T}>
  <div style="height: 400px; border: 1px solid var(--yh-border-color); border-radius: 8px;">
    <yh-ai-chat :messages="messages" :loading="loading" @send="handleSend" />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const messages = ref([
  { id: '1', role: 'assistant', content: 'Hello! I am your AI assistant, how can I help you?' }
])

const handleSend = (text: string) => {
  messages.value.push({ id: Date.now().toString(), role: 'user', content: text })
  loading.value = true
  
  setTimeout(() => {
    messages.value.push({
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: 'I received your message: ' + text
    })
    loading.value = false
  }, 1500)
}
</${_S}>`

const loading = ref(false)
const messages = ref([
  { id: '1', role: 'assistant', content: 'Hello! I am your AI assistant, how can I help you?' }
])

const handleSend = (text: string) => {
  messages.value.push({ id: Date.now().toString(), role: 'user', content: text })
  loading.value = true
  
  setTimeout(() => {
    messages.value.push({
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: 'I received your message: ' + text
    })
    loading.value = false
  }, 1500)
}

const tsAdvanced = `<${_T}>
  <div style="height: 500px; border: 1px solid var(--yh-border-color); border-radius: 8px;">
    <!-- Provides clear history and suggestions -->
    <yh-ai-chat 
      v-model:messages="advMessages" 
      :loading="advLoading" 
      :suggestions="['Write a debounce function in Vue 3', 'How to optimize initial page load?', 'Generate a quicksort algorithm']" 
      @send="advHandleSend" 
      @clear="advHandleClear" 
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

// Initial state with empty history
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
      content: 'Based on your query **"' + text + '"**, here is what I generated:\\n\\n\`\`\`javascript\\nconsole.log("Success!");\\n\`\`\`',
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
      content: 'Based on your query **"' + text + '"**, here is what I generated:\n\n```javascript\nconsole.log("Success!");\n```',
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
    <!-- Magical #message slot enabling conditional component mounting for Generative UI -->
    <yh-ai-chat :messages="genMessages" :loading="genLoading" @send="genHandleSend">
      <template #message="{ message }">
        <yh-ai-bubble
          :role="message.role"
          :content="message.content"
          :variant="message.role === 'assistant' ? 'borderless' : 'filled'"
          :time="message.time"
        >
          <!-- Dynamic Mounting: Thought Chain Component (Generative UI) -->
          <template #header v-if="message.tool === 'thinking'">
            <yh-ai-thought-chain 
              :thinking="message.status === 'loading'" 
              :title="message.status === 'loading' ? 'Deep Reasoning...' : 'Reasoning Completed'" 
              style="margin-bottom: 8px;"
            >
               <div>Tool Call: **Model Refactoring**</div>
               <div>Retrieving node mapping...</div>
               <div>Formulating architectural AST...</div>
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
  { id: 'g0', role: 'assistant', content: 'I am capable of executing complex generative structure tasks for you.' }
])

const genHandleSend = (text: string) => {
  genMessages.value.push({ id: Date.now().toString(), role: 'user', content: text, time: new Date().toLocaleTimeString() })
  genLoading.value = true
  
  // Phase 1: Tool Call initiates (Inserts loading Thought Chain state)
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

  // Phase 2: Completion replaces state and updates inner texts natively via reactivity
  setTimeout(() => {
    const lastMsg = genMessages.value[genMessages.value.length - 1]
    lastMsg.status = 'success'
    lastMsg.content = 'My thought process derived the optimal generative UI architecture, displayed directly here!'
    genLoading.value = false
  }, 3500)
}
</${_S}>`

const genLoading = ref(false)
const genMessages = ref([
  { id: 'g0', role: 'assistant', content: 'I am capable of executing complex generative structure tasks for you.' }
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
    lastMsg.content = 'My thought process derived the optimal generative UI architecture, displayed directly here!'
    genLoading.value = false
  }, 3500)
}


</script>

Provides an out-of-the-box AI conversational interface container. Features a pre-built suggestions array, context clear button, and seamless scrolling.

## Basic Usage

Renders the conversation flow based on the `messages` array.

<DemoBlock title="Basic Chat Flow" :ts-code="tsBasic" :js-code="toJs(tsBasic)">
  <div style="height: 400px; border: 1px solid var(--yh-border-color); border-radius: 8px;">
    <yh-ai-chat :messages="messages" :loading="loading" @send="handleSend" />
  </div>
</DemoBlock>

## Advanced Interactions

With support for `suggestions` and `clear` functions, you can display what users might want to ask initially on a blank slate. Also, once messages hold history, the header clear button offers an easy way to reset memory.

<DemoBlock title="Advanced Model" :ts-code="tsAdvanced" :js-code="toJs(tsAdvanced)">
  <div style="height: 500px; border: 1px solid var(--yh-border-color); border-radius: 8px;">
    <yh-ai-chat 
      v-model:messages="advMessages" 
      :loading="advLoading" 
      :suggestions="['Write a debounce function in Vue 3', 'How to optimize initial page load?', 'Generate a quicksort algorithm']" 
      @send="advHandleSend" 
      @clear="advHandleClear" 
    />
  </div>
</DemoBlock>

## Generative UI (Dynamic Component Mounting)

AiChat possesses an exceptionally robust internal state isolation, meaning you can fully drive Generative UI directly through metadata in the dialogue context utilizing the `#message` slot. Based on metadata—such as triggered tool calls or deep reasoning steps—the `<yh-ai-bubble>` component empowers seamless integration of any external component logic inside its natural flow structure (e.g., embedding the `AiThoughtChain`).

Experiment by sending a message below to witness the seamless internal transition between rendering a logic chain UI and textual markdown.

<DemoBlock title="Generative Component Rendering" :ts-code="tsGen" :js-code="toJs(tsGen)">
  <div style="height: 500px; border: 1px solid var(--yh-border-color); border-radius: 8px;">
    <yh-ai-chat :messages="genMessages" :loading="genLoading" @send="genHandleSend">
      <template #message="{ message }">
        <yh-ai-bubble
          :role="message.role"
          :content="message.content"
          :variant="message.role === 'assistant' ? 'borderless' : 'filled'"
          :time="message.time"
        >
          <!-- Dynamic Component Injection Location! -->
          <template #header v-if="message.tool === 'thinking'">
            <yh-ai-thought-chain 
              :thinking="message.status === 'loading'" 
              :title="message.status === 'loading' ? 'Deep Reasoning...' : 'Reasoning Completed'" 
              style="margin-bottom: 8px;"
            >
               <div>Tool Call: **Model Refactoring**</div>
               <div>Retrieving node mapping...</div>
               <div>Formulating architectural AST...</div>
            </yh-ai-thought-chain>
          </template>
        </yh-ai-bubble>
      </template>
    </yh-ai-chat>
  </div>
</DemoBlock>

## Use in Nuxt

This container wrapper perfectly embraces Nuxt 3/4 SSR and lazy hydrated behaviors. Works flawlessly under Nuxt's auto-importing environments.

For detail configurations, please check [Nuxt Usage](/en/guide/nuxt).

**SSR Notes**:

- ✅ Inner sub-components isomorphic generation supported
- ✅ Events bindings operate correctly

::: tip SSR Safety
AiChat wrapper natively passes SSR compliance checks across major frameworks.
:::

## API

### Props

| Name        | Description                     | Type                                                                                 | Default |
| ----------- | ------------------------------- | ------------------------------------------------------------------------------------ | ------- |
| messages    | Message List                    | `Array<{id: string, role: string, content: string, status?: string, time?: string}>` | `[]`    |
| loading     | Indicates if the AI is replying | `boolean`                                                                            | `false` |
| suggestions | Bottom default suggestion pills | `string[]`                                                                           | `[]`    |

### Events

| Name  | Description                 | Parameter                   |
| ----- | --------------------------- | --------------------------- |
| send  | Emitted on message sent     | `(message: string) => void` |
| clear | Emitted on clearing history | `() => void`                |

### Slots

| Name    | Description                          | Parameter                                             |
| ------- | ------------------------------------ | ----------------------------------------------------- |
| message | Customize message rendering per item | `{ message: Record<string, unknown>, index: number }` |
| sender  | Customize the bottom sender block    | —                                                     |
| header  | Customize the top toolbar header     | —                                                     |

## Theme Variables

| Variable Name            | Description                         | Default Value             |
| ------------------------ | ----------------------------------- | ------------------------- |
| `--yh-ai-chat-bg`        | Chat container background color     | `var(--yh-bg-color)`      |
| `--yh-ai-chat-header-bg` | Top header toolbar background color | `var(--yh-bg-color-page)` |
| `--yh-ai-chat-footer-bg` | Bottom sender area background color | `var(--yh-bg-color)`      |
