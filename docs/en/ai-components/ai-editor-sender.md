# AiEditorSender Panel Input

`AiEditorSender` is a powerful AI conversation input component inspired by Element Plus X `EditorSender`. It integrates attachment display, toolbars, and custom slots, making it suitable for complex AI interaction scenarios.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'
import type { AiCommandItem } from '@yh-ui/components'

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

const commandInput1 = ref('')
const commandInput2 = ref('')
const commandInput3 = ref('')
const commandInput4 = ref('')

const basicCommands = ref([
  { id: '1', label: 'Code Snippet', icon: 'code', keywords: ['code', 'snippet'] },
  { id: '2', label: 'Upload File', icon: 'upload', keywords: ['file', 'upload'] },
  { id: '3', label: 'Insert Image', icon: 'image', keywords: ['image', 'picture'] },
  { id: '4', label: 'Insert Table', icon: 'table', keywords: ['table', 'grid'] }
])

const commandsWithDesc = ref([
  { id: '1', label: 'Code Snippet', description: 'Insert code block with syntax highlighting', icon: 'code' },
  { id: '2', label: 'Upload File', description: 'Upload file from local', icon: 'upload' },
  { id: '3', label: 'Insert Image', description: 'Insert image into content', icon: 'image' },
  { id: '4', label: 'Insert Table', description: 'Insert Markdown table', icon: 'table' }
])

const cascadeCommands = ref([
  {
    id: 'insert',
    label: 'Insert',
    icon: 'plus',
    children: [
      { id: 'code', label: 'Code Block', icon: 'code' },
      { id: 'image', label: 'Image', icon: 'image' },
      { id: 'table', label: 'Table', icon: 'table' },
      { id: 'link', label: 'Link', icon: 'link' }
    ]
  },
  {
    id: 'format',
    label: 'Format',
    icon: 'format',
    children: [
      { id: 'bold', label: 'Bold', icon: 'bold' },
      { id: 'italic', label: 'Italic', icon: 'italic' },
      { id: 'heading', label: 'Heading', icon: 'heading' }
    ]
  },
  { id: 'clear', label: 'Clear Content', icon: 'delete', description: 'Clear current input' }
])

const onCommandSelect = (command: AiCommandItem, parentCommand?: AiCommandItem) => {
  console.log('Selected:', command.label, 'Parent:', parentCommand?.label)
}

const onCommandCascade = (command: AiCommandItem, parentCommand: AiCommandItem) => {
  console.log('Cascade:', command.label, 'From:', parentCommand.label)
}

// Basic command panel example code
const tsCommandBasic = `<${_T}>
  <div style="padding: 24px; background: var(--yh-bg-color-page);">
    <yh-ai-editor-sender
      v-model="input"
      :commands="commands"
      placeholder="Type / to trigger..."
      @command-select="onCommandSelect"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { AiCommandItem } from '@yh-ui/components'

const input = ref('')
const commands = ref<AiCommandItem[]>([
  { id: '1', label: 'Code Snippet', icon: 'code', keywords: ['code', 'snippet'] },
  { id: '2', label: 'Upload File', icon: 'upload', keywords: ['file', 'upload'] },
  { id: '3', label: 'Insert Image', icon: 'image', keywords: ['image', 'picture'] },
  { id: '4', label: 'Insert Table', icon: 'table', keywords: ['table', 'grid'] }
])

const onCommandSelect = (command: AiCommandItem) => {
  console.log('Selected:', command.label)
}
</${_S}>`

const jsCommandBasic = toJs(tsCommandBasic)

// Commands with description example code
const tsCommandDesc = `<${_T}>
  <div style="padding: 24px; background: var(--yh-bg-color-page);">
    <yh-ai-editor-sender
      v-model="input"
      :commands="commands"
      :show-command-description="true"
      placeholder="Type / to search..."
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { AiCommandItem } from '@yh-ui/components'

const input = ref('')
const commands = ref<AiCommandItem[]>([
  { id: '1', label: 'Code Snippet', description: 'Insert code block with syntax highlighting', icon: 'code' },
  { id: '2', label: 'Upload File', description: 'Upload file from local', icon: 'upload' },
  { id: '3', label: 'Insert Image', description: 'Insert image into content', icon: 'image' },
  { id: '4', label: 'Insert Table', description: 'Insert Markdown table', icon: 'table' }
])
</${_S}>`

const jsCommandDesc = toJs(tsCommandDesc)

// Cascade command menu example code
const tsCommandCascade = `<${_T}>
  <div style="padding: 24px; background: var(--yh-bg-color-page);">
    <yh-ai-editor-sender
      v-model="input"
      :commands="commands"
      :enable-command-cascade="true"
      placeholder="Type / for cascade menu..."
      @command-select="onCommandSelect"
      @command-cascade="onCommandCascade"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { AiCommandItem } from '@yh-ui/components'

const input = ref('')
const commands = ref<AiCommandItem[]>([
  {
    id: 'insert',
    label: 'Insert',
    icon: 'plus',
    children: [
      { id: 'code', label: 'Code Block', icon: 'code' },
      { id: 'image', label: 'Image', icon: 'image' },
      { id: 'table', label: 'Table', icon: 'table' },
      { id: 'link', label: 'Link', icon: 'link' }
    ]
  },
  {
    id: 'format',
    label: 'Format',
    icon: 'format',
    children: [
      { id: 'bold', label: 'Bold', icon: 'bold' },
      { id: 'italic', label: 'Italic', icon: 'italic' },
      { id: 'heading', label: 'Heading', icon: 'heading' }
    ]
  },
  { id: 'clear', label: 'Clear Content', icon: 'delete', description: 'Clear current input' }
])

const onCommandSelect = (command: AiCommandItem, parent?: AiCommandItem) => {
  console.log('Selected:', command.label, 'Parent:', parent?.label)
}

const onCommandCascade = (command: AiCommandItem, parent: AiCommandItem) => {
  console.log('Cascade:', parent.label)
}
</${_S}>`

const jsCommandCascade = toJs(tsCommandCascade)

// Custom trigger character example code
const tsCommandTrigger = `<${_T}>
  <div style="padding: 24px; background: var(--yh-bg-color-page);">
    <yh-ai-editor-sender
      v-model="input"
      :commands="commands"
      command-trigger=">"
      placeholder="Type > to trigger..."
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
import type { AiCommandItem } from '@yh-ui/components'

const input = ref('')
const commands = ref<AiCommandItem[]>([
  { id: '1', label: 'Code Snippet', icon: 'code', keywords: ['code', 'snippet'] },
  { id: '2', label: 'Upload File', icon: 'upload', keywords: ['file', 'upload'] },
  { id: '3', label: 'Insert Image', icon: 'image', keywords: ['image', 'picture'] },
  { id: '4', label: 'Insert Table', icon: 'table', keywords: ['table', 'grid'] }
])
</${_S}>`

const jsCommandTrigger = toJs(tsCommandTrigger)
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

## Command Panel

Trigger the command panel by typing `/`. Supports fuzzy search, icons, descriptions and cascade sub-commands.

### Basic Command Panel

<DemoBlock title="Basic Command Panel" :ts-code="tsCommandBasic" :js-code="jsCommandBasic">
  <div style="padding: 24px; background: var(--yh-bg-color-page);">
    <yh-ai-editor-sender
      v-model="commandInput1"
      :commands="basicCommands"
      placeholder="Type / to trigger..."
      @command-select="onCommandSelect"
    />
  </div>
</DemoBlock>

### Commands with Description

<DemoBlock title="Commands with Description" :ts-code="tsCommandDesc" :js-code="jsCommandDesc">
  <div style="padding: 24px; background: var(--yh-bg-color-page);">
    <yh-ai-editor-sender
      v-model="commandInput2"
      :commands="commandsWithDesc"
      :show-command-description="true"
      placeholder="Type / to search..."
      @command-select="onCommandSelect"
    />
  </div>
</DemoBlock>

### Cascade Command Menu

<DemoBlock title="Cascade Command Menu" :ts-code="tsCommandCascade" :js-code="jsCommandCascade">
  <div style="padding: 24px; background: var(--yh-bg-color-page);">
    <yh-ai-editor-sender
      v-model="commandInput3"
      :commands="cascadeCommands"
      :enable-command-cascade="true"
      placeholder="Type / for cascade menu..."
      @command-select="onCommandSelect"
      @command-cascade="onCommandCascade"
    />
  </div>
</DemoBlock>

### Custom Trigger Character

<DemoBlock title="Custom Trigger Character" :ts-code="tsCommandTrigger" :js-code="jsCommandTrigger">
  <div style="padding: 24px; background: var(--yh-bg-color-page);">
    <yh-ai-editor-sender
      v-model="commandInput4"
      :commands="basicCommands"
      command-trigger=">"
      placeholder="Type > to trigger..."
      @command-select="onCommandSelect"
    />
  </div>
</DemoBlock>

## API

### Props

| Name              | Description                      | Type               | Default     |
| ----------------- | -------------------------------- | ------------------ | ----------- |
| `model-value`     | V-model for input content        | `string`           | `''`        |
| `placeholder`     | Placeholder text                 | `string`           | `''`        |
| `disabled`        | Whether to disable               | `boolean`          | `false`     |
| `loading`         | Whether in loading/sending state | `boolean`          | `false`     |
| `attachments`     | Attachment list                  | `AttachmentItem[]` | `[]`        |
| `show-word-limit` | Whether to show word limit       | `boolean`          | `true`      |
| `max-length`      | Maximum word limit               | `number`           | `undefined` |
| `rows`            | Default initial rows             | `number`           | `1`         |

### Command Panel Props

| Name                       | Description                | Type                           | Default    |
| -------------------------- | -------------------------- | ------------------------------ | ---------- |
| `enable-commands`          | Enable command panel       | `boolean`                      | `true`     |
| `command-trigger`          | Command trigger character  | `string`                       | `'/'`      |
| `commands`                 | Command list               | `AiCommandItem[]`              | `[]`       |
| `command-panel-position`   | Panel position             | `'top' \| 'bottom'`            | `'bottom'` |
| `command-panel-align`      | Panel alignment            | `'start' \| 'center' \| 'end'` | `'start'`  |
| `command-panel-width`      | Panel width                | `string \| number`             | `320`      |
| `command-panel-max-height` | Panel max height (px)      | `number`                       | `400`      |
| `show-command-description` | Show command description   | `boolean`                      | `true`     |
| `show-command-icon`        | Show command icon          | `boolean`                      | `true`     |
| `command-search-delay`     | Search debounce delay (ms) | `number`                       | `150`      |
| `enable-command-cascade`   | Enable cascade sub-menu    | `boolean`                      | `true`     |
| `cascade-offset`           | Cascade panel offset (px)  | `number`                       | `4`        |

### Events

| Name                 | Description                                                    | Callback Parameters                     |
| -------------------- | -------------------------------------------------------------- | --------------------------------------- |
| `update:model-value` | Triggered when content changes                                 | `(value: string)`                       |
| `send`               | Triggered when clicking send or pressing Enter (without Shift) | `(value: string)`                       |
| `change`             | Triggered when content change is complete                      | `(value: string)`                       |
| `remove-attachment`  | Triggered when clicking attachment remove button               | `(index: number, item: AttachmentItem)` |
| `clear`              | Triggered when clearing content                                | `()`                                    |

### Command Panel Events

| Name                 | Description                           | Callback Parameters                                       |
| -------------------- | ------------------------------------- | --------------------------------------------------------- |
| `command-select`     | Triggered when selecting a command    | `(command: AiCommandItem, parentCommand?: AiCommandItem)` |
| `command-search`     | Triggered when searching commands     | `(keyword: string)`                                       |
| `command-panel-show` | Triggered when panel shows            | `()`                                                      |
| `command-panel-hide` | Triggered when panel hides            | `()`                                                      |
| `command-cascade`    | Triggered when cascade sub-menu opens | `(command: AiCommandItem, parentCommand: AiCommandItem)`  |

### Slots

| Name      | Description                                                                   |
| --------- | ----------------------------------------------------------------------------- |
| `header`  | Top attachment display area slot                                              |
| `toolbar` | Bottom left shortcut toolbar slot                                             |
| `actions` | Bottom right additional operation slot (after word count, before send button) |
| `submit`  | Custom send button                                                            |

### AiCommandItem

| Property      | Description                      | Type                      | Required |
| ------------- | -------------------------------- | ------------------------- | -------- |
| `id`          | Unique identifier                | `string`                  | ✅       |
| `label`       | Display text                     | `string`                  | ✅       |
| `keywords`    | Fuzzy search keywords            | `string[]`                | ❌       |
| `icon`        | Icon name                        | `string`                  | ❌       |
| `description` | Command description text         | `string`                  | ❌       |
| `disabled`    | Whether this command is disabled | `boolean`                 | ❌       |
| `children`    | Sub-command list (cascade menu)  | `AiCommandItem[]`         | ❌       |
| `level`       | Hierarchy depth level            | `number`                  | ❌       |
| `data`        | Custom extension data            | `Record<string, unknown>` | ❌       |

### AttachmentItem

| Property     | Description     | Type                                  |
| ------------ | --------------- | ------------------------------------- |
| `name`       | File name       | `string`                              |
| `url`        | File URL        | `string`                              |
| `status`     | Upload status   | `'uploading' \| 'success' \| 'error'` |
| `percentage` | Upload progress | `number`                              |

## Use in Nuxt

This component fully supports Nuxt 3/4. In Nuxt projects, the component and its types will be automatically imported on demand.

For detailed configuration, please see [Nuxt Integration](/en/guide/nuxt).

## Theme Variables

| Variable Name                        | Description            | Default Value                       |
| ------------------------------------ | ---------------------- | ----------------------------------- |
| `--yh-ai-editor-sender-bg`           | Panel background color | `var(--yh-bg-color-overlay)`        |
| `--yh-ai-editor-sender-radius`       | Border radius          | `12px`                              |
| `--yh-ai-editor-sender-border`       | Border style           | `1px solid var(--yh-border-color)`  |
| `--yh-ai-editor-sender-shadow`       | Panel shadow           | `0 4px 16px rgba(0, 0, 0, 0.08)`    |
| `--yh-ai-editor-sender-focus-border` | Focus border style     | `1px solid var(--yh-color-primary)` |
