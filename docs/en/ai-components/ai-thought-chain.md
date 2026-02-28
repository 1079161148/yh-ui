# AiThoughtChain

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

const tsBasic = `<${_T}>
<yh-ai-thought-chain title="Analyzing code..." status="thinking" :content="chainContent" />

<yh-ai-thought-chain title="Thinking complete" status="complete" content="Finished in 3s with optimal results." />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const chainContent = ref("1. Analyze AST\\n2. Search for redundancy\\n3. Execute optimization suggestions.")
</${_S}>`

const chainContent = ref("1. Analyze AST\n2. Search for redundancy\n3. Execute optimization suggestions.")

const tsTimeline = `<${_T}>
<yh-ai-thought-chain 
  :items="thoughtSteps" 
  :line-gradient="true"
  dot-size="default"
/>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const thoughtSteps = ref([
  { title: 'Analysis', content: 'Understanding requirements...', status: 'success' },
  { title: 'Context Search', content: 'Searching local modules...', status: 'success' },
  { title: 'Generation', content: 'Building refactor suggestions...', status: 'thinking' },
  { title: 'Verification', status: 'none' }
])
</${_S}>`

const thoughtSteps = ref([
  { title: 'Analysis', content: 'Understanding requirements...', status: 'success' },
  { title: 'Context Search', content: 'Searching local modules...', status: 'success' },
  { title: 'Generation', content: 'Building refactor suggestions...', status: 'thinking' },
  { title: 'Verification', status: 'none' }
])

</script>

Used to display multiple steps or complex reasoning paths taken by the AI. Supports single-node and multi-node timeline views.

## Basic Usage

Single node mode, similar to `AiThinking` but with side border. Great for long text blocks.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="toJs(tsBasic)">
<div style="background:var(--yh-bg-color-page); padding:16px; display:flex; flex-direction:column; gap:16px;">
  <yh-ai-thought-chain title="Analyzing code..." status="thinking" :content="chainContent" />
  <yh-ai-thought-chain title="Thinking complete" status="complete" content="Finished in 3s with optimal results." />
</div>
</DemoBlock>

## Multi-node Timeline

Pass a list of steps to the `items` prop for a full timeline reasoning trace.

<DemoBlock title="Timeline Mode" :ts-code="tsTimeline" :js-code="toJs(tsTimeline)">
<div style="background:var(--yh-bg-color-page); padding:24px;">
  <yh-ai-thought-chain :items="thoughtSteps" :line-gradient="true" />
</div>
</DemoBlock>

## Nuxt Support

Thinking chain interactions are Nuxt 3/4 SSR compatible. Component state hydrations are handled at mount.

For more information, see [Nuxt Integration Guide](/en/guide/nuxt).

## API

### Props

| Name          | Description                                | Type                                                                      | Default     |
| ------------- | ------------------------------------------ | ------------------------------------------------------------------------- | ----------- |
| title         | Title (Single mode)                        | `string`                                                                  | —           |
| content       | Content (Single mode)                      | `string`                                                                  | —           |
| status        | Overall status                             | `'thinking' \| 'loading' \| 'success' \| 'complete' \| 'error' \| 'none'` | `'none'`    |
| items         | Reasoning steps                            | `AiThoughtItem[]`                                                         | `[]`        |
| dot-size      | Node dot size                              | `'small' \| 'default' \| 'large'`                                         | `'default'` |
| line-gradient | Whether the line has gradient              | `boolean`                                                                 | `false`     |
| auto-collapse | Collapses once status is complete (Single) | `boolean`                                                                 | `false`     |

### AiThoughtItem Structure

| Name                  | Description                  | Type              |
| --------------------- | ---------------------------- | ----------------- |
| title                 | Step title                   | `string`          |
| content / description | Step details text            | `string`          |
| status                | Step status                  | `AiThoughtStatus` |
| expanded              | Whether details are expanded | `boolean`         |
| icon                  | Custom icon name             | `string`          |

### Slots

| Name    | Description                      |
| ------- | -------------------------------- |
| default | Detail area for single node mode |

## Theme Variables

AiThoughtChain is deeply integrated with the design system:

**AI ThoughtChain CSS Variables**

| Variable Name                        | Default Value                    |
| ------------------------------------ | -------------------------------- |
| `--yh-ai-thought-chain-line-color`   | `var(--yh-border-color-lighter)` |
| `--yh-ai-thought-chain-active-color` | `var(--yh-color-primary)`        |
