# AiEditorSender Panel Input

`AiEditorSender` is a powerful AI conversation input component inspired by Element Plus X `EditorSender`. It integrates attachment display, toolbars, and custom slots, making it suitable for complex AI interaction scenarios.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

const input1 = ref('')
const input2 = ref('')
const input3 = ref('')
const loading = ref(false)
const modelValue = ref('gpt4')

const onSend = (val: string) => {
  console.log('Send Message:', val)
  if (val && val.includes('loading')) {
    loading.value = true
    setTimeout(() => { loading.value = false }, 2000)
  }
}

const files = ref([
  { name: 'code-snippet.ts', type: 'document' },
  { name: 'ui-prototype.png', type: 'image', url: '...' }
])

const onRemoveAttachment = (index: number) => {
  files.value.splice(index, 1)
}

const tsBasic = `<${_T}>
  <div style="padding: 24px; background: var(--yh-bg-color-page);">
    <yh-ai-editor-sender v-model="input" placeholder="Ask me something about code..." @send="onSend" />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const input = ref('')
const onSend = (val: string) => { console.log('Send:', val) }
</${_S}>`

const jsBasic = toJs(tsBasic)

const tsFiles = `<${_T}>
  <div style="padding: 24px; background: var(--yh-bg-color-page);">
    <yh-ai-editor-sender
      v-model="input"
      :attachments="files"
      @remove-attachment="onRemove"
      @send="onSend"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const input = ref('')
const files = ref([
  { name: 'code-snippet.ts', type: 'document' },
  { name: 'ui-prototype.png', type: 'image', url: '...' }
])
const onRemove = (index: number) => { files.value.splice(index, 1) }
const onSend = (val: string) => { console.log('Send:', val) }
</${_S}>`

const jsFiles = toJs(tsFiles)

const tsStatus = `<${_T}>
  <div style="padding: 24px; background: var(--yh-bg-color-page);">
    <yh-ai-editor-sender
      v-model="input"
      :loading="loading"
      placeholder="Type something and select a model..."
      @send="onSend"
    >
      <template #toolbar>
        <YhButton circle size="small"><YhIcon name="image" /></YhButton>
        <YhButton circle size="small"><YhIcon name="document" /></YhButton>
      </template>
      <template #actions>
        <YhSelect v-model="model" size="small" style="width: 120px;">
          <YhOption label="GPT-4o" value="gpt4" />
          <YhOption label="Claude 3.5" value="claude" />
        </YhSelect>
      </template>
    </yh-ai-editor-sender>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const input = ref('')
const loading = ref(false)
const model = ref('gpt4')
const onSend = (val: string) => {
  loading.value = true
  setTimeout(() => { loading.value = false }, 2000)
}
</${_S}>`

const jsStatus = toJs(tsStatus)
</script>

## Basic Usage

Included default input box, word count, and send button.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="padding: 24px; background: var(--yh-bg-color-page);">
    <yh-ai-editor-sender v-model="input1" placeholder="Ask me something about code..." @send="onSend" />
  </div>
</DemoBlock>

## Attachment Display and Operations

Built-in attachment list layout (for display only, upload logic needs external control), supports preview and removal.

<DemoBlock title="Attachment Display and Operations" :ts-code="tsFiles" :js-code="jsFiles">
  <div style="padding: 24px; background: var(--yh-bg-color-page);">
    <yh-ai-editor-sender
      v-model="input2"
      :attachments="files"
      @remove-attachment="onRemoveAttachment"
      @send="onSend"
    />
  </div>
</DemoBlock>

## Status and Toolbar Slots

Through `toolbar` and `actions` slots, you can freely extend the business logic at the bottom of the input box.

<DemoBlock title="Status and Toolbar Slots" :ts-code="tsStatus" :js-code="jsStatus">
  <div style="padding: 24px; background: var(--yh-bg-color-page);">
    <yh-ai-editor-sender
      v-model="input3"
      :loading="loading"
      placeholder="Type something and select a model..."
      @send="onSend"
    >
      <template #toolbar>
        <YhButton circle size="small"><YhIcon name="image" /></YhButton>
        <YhButton circle size="small"><YhIcon name="document" /></YhButton>
      </template>
      <template #actions>
        <YhSelect v-model="modelValue" size="small" style="width: 120px; vertical-align: middle;">
          <YhOption label="GPT-4o" value="gpt4" />
          <YhOption label="Claude 3.5" value="claude" />
        </YhSelect>
      </template>
    </yh-ai-editor-sender>
  </div>
</DemoBlock>

## Use in Nuxt

This component fully supports Nuxt 3/4. In Nuxt projects, the component will be automatically imported.

For detailed configuration, please see [Nuxt Integration](/guide/nuxt).

## Theme Variables

| Variable Name                        | Description            | Default Value                       |
| ------------------------------------ | ---------------------- | ----------------------------------- |
| `--yh-ai-editor-sender-bg`           | Panel background color | `var(--yh-bg-color-overlay)`        |
| `--yh-ai-editor-sender-radius`       | Border radius          | `12px`                              |
| `--yh-ai-editor-sender-border`       | Border style           | `1px solid var(--yh-border-color)`  |
| `--yh-ai-editor-sender-shadow`       | Panel shadow           | `0 4px 16px rgba(0, 0, 0, 0.08)`    |
| `--yh-ai-editor-sender-focus-border` | Focus border style     | `1px solid var(--yh-color-primary)` |

## API

### Props

| Name            | Description                      | Type               | Default     |
| --------------- | -------------------------------- | ------------------ | ----------- |
| `modelValue`    | V-model for input content        | `string`           | `''`        |
| `placeholder`   | Placeholder text                 | `string`           | `''`        |
| `disabled`      | Whether to disable               | `boolean`          | `false`     |
| `loading`       | Whether in loading/sending state | `boolean`          | `false`     |
| `attachments`   | Attachment list                  | `AttachmentItem[]` | `[]`        |
| `showWordLimit` | Whether to show word limit       | `boolean`          | `true`      |
| `maxLength`     | Maximum word limit               | `number`           | `undefined` |
| `rows`          | Default initial rows             | `number`           | `1`         |

### Events

| Name                | Description                                                    | Callback Parameters                     |
| ------------------- | -------------------------------------------------------------- | --------------------------------------- |
| `update:modelValue` | Triggered when content changes                                 | `(value: string)`                       |
| `send`              | Triggered when clicking send or pressing Enter (without Shift) | `(value: string)`                       |
| `change`            | Triggered when content change is complete                      | `(value: string)`                       |
| `remove-attachment` | Triggered when clicking attachment remove button               | `(index: number, item: AttachmentItem)` |
| `clear`             | Triggered when clearing content                                | `()`                                    |

### Slots

| Name      | Description                                                                   |
| --------- | ----------------------------------------------------------------------------- |
| `header`  | Top attachment display area slot                                              |
| `toolbar` | Bottom left shortcut toolbar slot                                             |
| `actions` | Bottom right additional operation slot (after word count, before send button) |
| `submit`  | Custom send button                                                            |
