# AiSender

<script setup lang="ts">
import { ref } from 'vue';
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils';

const value = ref('');
const value2 = ref('');
const valLimit = ref('This is some default high-value content!');
const valMulti = ref('');
const valSlot = ref('');
const input3 = ref('');
const input4 = ref('');

const onSend = (v: string) => {
  alert('You want to send: ' + v);
};

const commands = [
  { key: 'summary', label: 'Summary', description: 'Summarize the current page', icon: 'document', prompt: 'Summarize: ' },
  { key: 'translate', label: 'Translate', description: 'Translate text to specific language', icon: 'chat', prompt: 'Translate: ' },
  { key: 'fix', label: 'Fix', description: 'Check and fix grammar errors', icon: 'edit', prompt: 'Fix grammar: ' }
];

const attachments = ref([
  { id: '1', name: 'image.png', type: 'image/png', url: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=100&auto=format&fit=crop', status: 'success' },
  { id: '2', name: 'report.pdf', type: 'application/pdf', status: 'uploading', progress: 45 }
]);

const handleRemove = (file: { id: string }) => {
  attachments.value = attachments.value.filter(a => a.id !== file.id);
};

const tsBasic = `<${_T}>
  <yh-ai-sender v-model="value" @send="onSend" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue';

const value = ref('');
const onSend = (v: string) => {
  console.log('Send:', v);
};
</${_S}>`;

const tsLoading = `<${_T}>
  <yh-ai-sender v-model="value" :loading="true" placeholder="AI is thinking..." />
</${_T}>`;

const tsAdvanced = `<${_T}>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-ai-sender v-model="valLimit" :max-length="200" show-word-limit clearable />
    
    <yh-ai-sender v-model="valMulti" placeholder="Ask anything...">
      <${_T} #prefix>
        <yh-button text size="small">
          <yh-icon name="paperclip" style="margin-right: 4px;" /> Attach
        </yh-button>
      </${_T}>
      <${_T} #actions>
        <yh-button text circle>
          <yh-icon name="microphone" />
        </yh-button>
      </${_T}>
    </yh-ai-sender>
  </div>
</${_T}>`;

const tsCommand = `<${_T}>
  <yh-ai-sender 
    v-model="input3" 
    placeholder="Type / for commands..." 
    :commands="commands"
    clearable
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue';
import type { AiCommand } from '@yh-ui/components';

const input3 = ref('');
const commands: AiCommand[] = [
  { key: 'summary', label: 'Summary', description: 'Summarize the current page', icon: 'document', prompt: 'Summarize: ' },
  { key: 'translate', label: 'Translate', description: 'Translate text to specific language', icon: 'chat', prompt: 'Translate: ' },
  { key: 'fix', label: 'Fix', description: 'Check and fix grammar errors', icon: 'edit', prompt: 'Fix grammar: ' }
];
</${_S}>`;

const tsAttach = `<${_T}>
  <yh-ai-sender 
    v-model="input4" 
    placeholder="Input with attachments..." 
    :attachments="attachments"
    @remove-attachment="handleRemove"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue';
import type { AiAttachment } from '@yh-ui/components';

const attachments = ref<AiAttachment[]>([
  { id: '1', name: 'image.png', type: 'image/png', url: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=100&auto=format&fit=crop', status: 'success' },
  { id: '2', name: 'report.pdf', type: 'application/pdf', status: 'uploading', progress: 45 }
]);

const handleRemove = (file: AiAttachment) => {
  attachments.value = attachments.value.filter(a => a.id !== file.id);
};
</${_S}>`;

const tsPreset = `<${_T}>
  <yh-ai-sender v-model="value" placeholder="Type or use preset actions...">
    <${_T} #actions>
      <div style="display: flex; gap: 8px; margin-right: 8px;">
        <yh-button size="small" round @click="value = 'Summarize: '">
          <template #icon><yh-icon name="document" /></template>
          Summarize
        </yh-button>
        <yh-button size="small" round @click="value = 'Polish this text: '">
          <template #icon><yh-icon name="edit" /></template>
          Polish
        </yh-button>
      </div>
    </${_T}>
  </yh-ai-sender>
</${_T}>`

const jsBasic = toJs(tsBasic)
const jsLoading = toJs(tsLoading)
const jsAdvanced = toJs(tsAdvanced)
const jsCommand = toJs(tsCommand)
const jsAttach = toJs(tsAttach)
const jsPreset = toJs(tsPreset)
</script>

`AiSender` is a smart input component with multi-line auto-resize, integrated icons, slash commands, and file attachment previews.

## Basic Usage

Supports automatic submission when pressing Enter.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-sender v-model="value" @send="onSend" />
  </div>
</DemoBlock>

## Loading State

Use `:loading` to indicate that AI is processing and input is disabled.

<DemoBlock title="Loading State" :ts-code="tsLoading" :js-code="jsLoading">
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-sender v-model="value2" :loading="true" placeholder="AI is thinking..." />
  </div>
</DemoBlock>

## Advanced Features & Multi-modal

Provides high-level capabilities such as `max-length`, `show-word-limit`, and `clearable`.
Easily implement complex input containers by utilizing `prefix` and `actions` slots.

<DemoBlock title="Advanced Modal" :ts-code="tsAdvanced" :js-code="jsAdvanced">
<div style="background:var(--yh-bg-color-page); padding:16px; display: flex; flex-direction: column; gap: 16px;">
<yh-ai-sender 
  v-model="valLimit" 
  :max-length="200" 
  show-word-limit 
  clearable 
  placeholder="Type something to test limits..." 
/>
<yh-ai-sender v-model="valMulti" placeholder="Ask anything...">
  <template #prefix>
  <yh-button text size="small">
  <yh-icon name="paperclip" style="margin-right: 4px;" /> Attach
  </yh-button>
  </template>
  <template #actions>
  <yh-button text circle>
  <yh-icon name="microphone" />
  </yh-button>
  </template>
</yh-ai-sender>
</div>
</DemoBlock>

### Preset Interactions (AiInputAction Pattern)

Via the `#actions` slot, you can easily integrate common preset instructions such as summarization, polishing, etc.

<DemoBlock title="Preset Actions Panel" :ts-code="tsPreset" :js-code="jsPreset">
<div style="background:var(--yh-bg-color-page); padding:16px;">
  <yh-ai-sender v-model="value" placeholder="Type or use preset actions...">
  <template #actions>
  <div style="display: flex; gap: 8px; margin-right: 8px;">
  <yh-button size="small" round @click="value = 'Summarize: '">
  <template #icon><yh-icon name="document" /></template>
  Summarize
  </yh-button>
  <yh-button size="small" round @click="value = 'Polish this text: '">
  <template #icon><yh-icon name="edit" /></template>
  Polish
  </yh-button>
  </div>
  </template>
  </yh-ai-sender>
</div>
</DemoBlock>

## Fully Custom Submit Slot

You can completely take over the submit area view logic via the `#submit` slot.

<div class="demo-box" style="margin-top: 16px;">
<div style="background:var(--yh-bg-color-page); padding:16px;">
  <yh-ai-sender v-model="valSlot" placeholder="Ask anything...">
  <template #submit="{ disabled, loading, submit }">
  <yh-button 
  circle 
  type="success" 
  :disabled="disabled"
  :loading="loading"
  @click="submit">
  <template #icon>
  <yh-icon name="check-circle" />
  </template>
  </yh-button>
  </template>
  </yh-ai-sender>
</div>
</div>

## Slash Commands

Type `/` to trigger the command panel. Quickly select preset Prompt templates.

<DemoBlock title="Slash Commands" :ts-code="tsCommand" :js-code="jsCommand">
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-sender 
      v-model="input3" 
      placeholder="Type / for commands..." 
      :commands="commands"
      clearable
    />
  </div>
</DemoBlock>

## Attachments Preview

Supports previewing images and files before sending, with built-in upload progress and removal capability.

<DemoBlock title="Attachments" :ts-code="tsAttach" :js-code="jsAttach">
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-sender 
      v-model="input4" 
      placeholder="Input with attachments..." 
      :attachments="attachments"
      @remove-attachment="handleRemove"
    />
  </div>
</DemoBlock>

## API

### Props

| Property               | Description                     | Type                 | Default               |
| ---------------------- | ------------------------------- | -------------------- | --------------------- |
| `modelValue / v-model` | Input content binding           | `string`             | `''`                  |
| `placeholder`          | Placeholder text                | `string`             | `'Send a message...'` |
| `loading`              | Whether AI is responding        | `boolean`            | `false`               |
| `disabled`             | Whether disabled                | `boolean`            | `false`               |
| `maxLength`            | Native maxlength limit          | `number`             | —                     |
| `clearable`            | Whether to show clear button    | `boolean`            | `false`               |
| `showWordLimit`        | Whether to show character count | `boolean`            | `false`               |
| `commands`             | Slash command list              | `AiCommand[]`        | `[]`                  |
| `attachments`          | Selected attachment list        | `AiAttachment[]`     | `[]`                  |
| `themeOverrides`       | Theme variable overrides        | `ComponentThemeVars` | —                     |

### AiCommand

| Property      | Description                    | Type     |
| ------------- | ------------------------------ | -------- |
| `key`         | Command keyword (e.g. summary) | `string` |
| `label`       | Display name                   | `string` |
| `icon`        | Icon name                      | `string` |
| `description` | Short description              | `string` |
| `prompt`      | Prompt prefix to fill in       | `string` |

### AiAttachment

| Property   | Description             | Type                                  |
| ---------- | ----------------------- | ------------------------------------- |
| `id`       | Unique identifier       | `string`                              |
| `name`     | Filename                | `string`                              |
| `type`     | File type               | `string`                              |
| `url`      | Preview image or URL    | `string`                              |
| `status`   | Status                  | `'uploading' \| 'success' \| 'error'` |
| `progress` | Upload progress (0-100) | `number`                              |

### Events

| Name                | Description                        | Parameters                     |
| ------------------- | ---------------------------------- | ------------------------------ |
| `send`              | Fired on send button or Enter      | `(value: string) => void`      |
| `clear`             | Fired when clear button is clicked | —                              |
| `command`           | Fired when command is selected     | `(command: AiCommand) => void` |
| `remove-attachment` | Fired when attachment is removed   | `(file: AiAttachment) => void` |

## Use in Nuxt

This component fully supports Nuxt 3/4. In Nuxt projects, the component will be automatically imported.

For detailed configuration, please see [Nuxt Integration](/guide/nuxt).

## Theme Variables

| Variable Name                       | Description            | Default Value                      |
| ----------------------------------- | ---------------------- | ---------------------------------- |
| `--yh-ai-sender-bg`                 | Input background color | `var(--yh-bg-color)`               |
| `--yh-ai-sender-border-color`       | Border color           | `var(--yh-border-color)`           |
| `--yh-ai-sender-border-radius`      | Border radius          | `var(--yh-border-radius-base)`     |
| `--yh-ai-sender-focus-border-color` | Focus border color     | `var(--yh-color-primary)`          |
| `--yh-ai-sender-text-color`         | Input text color       | `var(--yh-text-color-primary)`     |
| `--yh-ai-sender-placeholder-color`  | Placeholder text color | `var(--yh-text-color-placeholder)` |

### Slots

| Name      | Description                                                   |
| --------- | ------------------------------------------------------------- |
| `prefix`  | Prefix content at top-left                                    |
| `actions` | Wrapper around send button                                    |
| `submit`  | Custom submit button, exposes `disabled`, `loading`, `submit` |

```

```
