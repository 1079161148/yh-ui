# AiThinking

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

const tsBasic = `<${_T}>
<yh-ai-thinking v-model="expanded" :status="status" :content="content" />

<div style="margin-top: 16px; display: flex; gap: 8px;">
  <yh-button size="small" @click="status = 'start'">Start</yh-button>
  <yh-button size="small" @click="status = 'thinking'">Thinking</yh-button>
  <yh-button size="small" @click="status = 'end'">End</yh-button>
  <yh-button size="small" @click="status = 'error'">Error</yh-button>
</div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const expanded = ref(true)
const status = ref('thinking')
const content = ref('Invoking search engine to retrieve related info...\\n3 relevant documents found.')
</${_S}>`

const expanded = ref(true)
const status = ref('thinking')
const content = ref('Invoking search engine to retrieve related info...\n3 relevant documents found.')

const tsAutoCollapse = `<${_T}>
<yh-ai-thinking status="end" :auto-collapse="true" content="This detail section will auto-collapse once reasoning ends." />
</${_T}>`

</script>

Used to display the reasoning state of AI models before generating the final output, allowing detailed thoughts to be collapsed for a cleaner chat interface.

## Basic Usage

Control the current thinking state using the `status` prop.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="toJs(tsBasic)">
<div style="background:var(--yh-bg-color-page); padding:16px;">
  <yh-ai-thinking v-model="expanded" :status="status" :content="content" />
  <div style="margin-top: 16px; display: flex; gap: 8px;">
    <yh-button size="small" @click="status = 'start'">Start</yh-button>
    <yh-button size="small" @click="status = 'thinking'">Thinking</yh-button>
    <yh-button size="small" @click="status = 'end'">End</yh-button>
    <yh-button size="small" @click="status = 'error'">Error</yh-button>
  </div>
</div>
</DemoBlock>

## Auto Collapse

Set `auto-collapse` to `true`. When `status` changes to `end`, the component will automatically collapse the detail area.

<DemoBlock title="Auto Collapse" :ts-code="tsAutoCollapse" :js-code="toJs(tsAutoCollapse)">
<div style="background:var(--yh-bg-color-page); padding:16px;">
  <yh-ai-thinking status="end" :auto-collapse="true" content="This detail section will auto-collapse once reasoning ends." />
</div>
</DemoBlock>

## Nuxt Support

This component fully supports Nuxt 3/4 SSR. In a Nuxt project, it is auto-imported.

For more details, refer to [Nuxt Integration Guide](/en/guide/nuxt).

## API

### Props

| Name                 | Description                      | Type                                        | Default      |
| -------------------- | -------------------------------- | ------------------------------------------- | ------------ |
| modelValue / v-model | Whether the details are expanded | `boolean`                                   | `false`      |
| status               | Thinking status                  | `'start' \| 'thinking' \| 'end' \| 'error'` | `'thinking'` |
| title                | Custom title text                | `string`                                    | —            |
| content              | Detail content text              | `string`                                    | —            |
| auto-collapse        | Collapses once status is 'end'   | `boolean`                                   | `false`      |

### Slots

| Name    | Description                    |
| ------- | ------------------------------ |
| default | Custom details section content |

## Theme Variables

AiThinking uses a compact design to maintain clarity in message flows while offering high extensibility:

**AI Thinking CSS Variables**

| Variable Name                    | Default Value                |
| -------------------------------- | ---------------------------- |
| `--yh-ai-thinking-bg`            | `var(--yh-fill-color-light)` |
| `--yh-ai-thinking-border-radius` | `8px`                        |
