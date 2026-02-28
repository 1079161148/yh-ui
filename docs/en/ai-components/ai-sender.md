# AiSender

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

const tsBasic = `<${_T}>
  <yh-ai-sender v-model="value" @send="onSend" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const onSend = (v: string) => {
  alert('You sent: ' + v)
}
</${_S}>`

const value = ref('')
const onSend = (v: string) => {
  alert('You sent: ' + v)
}

const tsLoading = `<${_T}>
  <yh-ai-sender v-model="value2" :loading="true" placeholder="AI is thinking..." />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const value2 = ref('')
</${_S}>`

const value2 = ref('')

const tsAdvanced = `<${_T}>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <!-- Word limit and Clear button -->
    <yh-ai-sender 
      v-model="valLimit" 
      :max-length="200" 
      show-word-limit 
      clearable 
      placeholder="Type something here..." 
    />

    <!-- Multi-modal input structure with prefix & suffix slots -->
    <yh-ai-sender v-model="valMulti" placeholder="Ask any question...">
      <template #prefix>
        <yh-button text size="small">
          <template #icon><yh-icon name="paperclip" style="margin-right: 4px;" /></template> Add File
        </yh-button>
      </template>
      <template #actions>
        <yh-button text circle>
          <template #icon><yh-icon name="microphone" /></template>
        </yh-button>
      </template>
    </yh-ai-sender>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const valLimit = ref('Here is some highly valuable prompt...')
const valMulti = ref('')
</${_S}>`

const tsSlot = `<${_T}>
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-sender v-model="valSlot" placeholder="Ask any question...">
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
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const valSlot = ref('')
</${_S}>`

const valLimit = ref('Here is some highly valuable prompt...')
const valMulti = ref('')
const valSlot = ref('')
</script>

An adaptive auto-resizing smart textual input, bundled with a submit action icon.

## Basic Usage

Supports sending messages immediately with `Enter`.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="toJs(tsBasic)">
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-sender v-model="value" @send="onSend" />
  </div>
</DemoBlock>

## Loading State

Displays an animated state preventing input when set to `:loading`.

<DemoBlock title="Loading State" :ts-code="tsLoading" :js-code="toJs(tsLoading)">
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-sender v-model="value2" :loading="true" placeholder="AI is thinking..." />
  </div>
</DemoBlock>

## Advanced & Multimodal Scaling

Offers high-level native attributes like `max-length`, `show-word-limit` tracking and `clearable`. Through interpolating `#prefix` / `#actions`, you could painlessly wrap other abilities (file attachment / mic recording) around the primary field area!

<DemoBlock title="Advanced Modes" :ts-code="tsAdvanced" :js-code="toJs(tsAdvanced)">
<div style="background:var(--yh-bg-color-page); padding:16px; display: flex; flex-direction: column; gap: 16px;">
<!-- Word limit and Clear button -->
<yh-ai-sender 
  v-model="valLimit" 
  :max-length="200" 
  show-word-limit 
  clearable 
  placeholder="Type something here..." 
/>
<!-- Multi-modal input structure with prefix & suffix slots -->
<yh-ai-sender v-model="valMulti" placeholder="Ask any question...">
  <template #prefix>
    <yh-button text size="small">
      <yh-icon name="paperclip" style="margin-right: 4px;" /> Add File
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

## Custom Submit Slot

You can fully take over the view of the sender action area via the `#submit` slot. Here we replace the arrow with a checkmark.

<div class="demo-box">
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-sender v-model="valSlot" placeholder="Ask any question...">
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

## Use in Nuxt

The component fully supports Nuxt 3/4 SSR rendering. In Nuxt projects, the component is auto-imported without manual registration.

For detail configurations, please check [Nuxt Usage](/en/guide/nuxt).

**SSR Notes**:

- ✅ Two-way v-model data flow safe
- ✅ Props configurations consistently mounted
- ✅ Slots flawlessly structured

::: tip SSR Safety
AiSender smart input achieves high reliability across hydration contexts.
:::

## API

### Props

| Name                 | Description                          | Type      | Default               |
| -------------------- | ------------------------------------ | --------- | --------------------- |
| modelValue / v-model | Bound Input content                  | `string`  | `''`                  |
| placeholder          | Placeholder text                     | `string`  | `'Send a message...'` |
| loading              | Disable interactions on awaiting     | `boolean` | `false`               |
| disabled             | Indicates component ban              | `boolean` | `false`               |
| maxLength            | System limitation on length          | `number`  | —                     |
| clearable            | Offers an X button                   | `boolean` | `false`               |
| showWordLimit        | Renders the bottom word limit digits | `boolean` | `false`               |

### Events

| Name              | Description                  | Parameter                 |
| ----------------- | ---------------------------- | ------------------------- |
| update:modelValue | V-model update               | `(value: string) => void` |
| change            | Emitted on input change      | `(value: string) => void` |
| send              | Triggers via button or enter | `(value: string) => void` |
| clear             | Triggered by clear button    | `() => void`              |

### Slots

| Name    | Description                                                                                                            |
| ------- | ---------------------------------------------------------------------------------------------------------------------- |
| prefix  | Top-left wrapper inside main zone                                                                                      |
| suffix  | Right area just before inner action buttons                                                                            |
| actions | Wrapper near external send action layout                                                                               |
| submit  | Overrides the entire upward-arrow default sender button, exposing `disabled`, `loading` and `submit` action parameters |

| Variable Name                       | Description               | Default Value                                        |
| ----------------------------------- | ------------------------- | ---------------------------------------------------- |
| `--yh-ai-sender-bg`                 | Sender background color   | `var(--yh-bg-color-overlay)`                         |
| `--yh-ai-sender-border-color`       | Sender border color       | `var(--yh-border-color)`                             |
| `--yh-ai-sender-focus-border-color` | Border color when focused | `var(--yh-color-primary)`                            |
| `--yh-ai-sender-border-radius`      | Sender border radius      | `16px`                                               |
| `--yh-ai-sender-shadow`             | Sender box shadow         | `0 4px 16px rgba(0, 0, 0, 0.08)`                     |
| `--yh-ai-sender-focus-shadow`       | Box shadow when focused   | `0 6px 20px rgba(var(--yh-color-primary-rgb), 0.15)` |
