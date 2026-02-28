# AiWelcome

`AiWelcome` is a component designed for the start page of AI chat conversations, providing a friendly first impression and interaction guide through beautiful gradients and glassmorphism design.

## Basic Usage

Display Logo, title, and a list of suggested Prompts.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils'

const suggestions = [
  { icon: 'edit', title: 'Write code', description: 'Help me write a calculator component using Vue 3', prompt: 'Write a calculator component using Vue 3' },
  { icon: 'chat', title: 'Translate report', description: 'Translate this weekly report into natural English', prompt: 'Translate this report: ...' },
  { icon: 'sparkles', title: 'Creative writing', description: 'Write a sci-fi short story about future cities', prompt: 'Write a sci-fi short story about future cities' }
]

interface AiSuggestion {
  icon?: string
  title: string
  description?: string
  prompt?: string
}

const handleSelect = (item: AiSuggestion) => {
  console.log('Selected:', item.prompt)
}

const tsBasic = `<${_T}>
  <div style="padding: 40px 0; background: var(--yh-bg-color-page); border-radius: 8px;">
    <YhAiWelcome 
      title="Hello, I am YH AI"
      description="I can help you with coding, translating documents, or creative writing. What can I do for you today?"
      :suggestions="suggestions"
      @select="handleSelect"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const suggestions = [
  { icon: 'edit', title: 'Write code', description: 'Help me write a calculator component using Vue 3', prompt: 'Write a calculator component using Vue 3' },
  { icon: 'chat', title: 'Translate report', description: 'Translate this weekly report into natural English', prompt: 'Translate this report: ...' },
  { icon: 'sparkles', title: 'Creative writing', description: 'Write a sci-fi short story about future cities', prompt: 'Write a sci-fi short story about future cities' }
]

const handleSelect = (item: AiSuggestion) => {
  console.log('Selected:', item.prompt)
}
</${_S}>`

const jsBasic = toJs(tsBasic)

const tsSlot = `<${_T}>
  <YhAiWelcome icon="chat">
    <template #title>
      <span style="background: linear-gradient(90deg, #ff4d4f, #f759ab); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
        Limited Beta AI
      </span>
    </template>
    <div style="margin-top: 20px; display: flex; gap: 8px; justify-content: center;">
      <YhTag effect="dark" type="warning">GPT-4o</YhTag>
      <YhTag effect="dark" type="info">8k Context</YhTag>
    </div>
  </YhAiWelcome>
</${_T}>`

const jsSlot = toJs(tsSlot)

</script>

## Basic Usage

Display Logo, title, and a list of suggested Prompts.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="padding: 40px 0; background: var(--yh-bg-color-page); border-radius: 8px;">
    <YhAiWelcome 
      title="Hello, I am YH AI"
      description="I can help you with coding, translating documents, or creative writing. What can I do for you today?"
      :suggestions="suggestions"
      @select="handleSelect"
    />
  </div>
</DemoBlock>

## Custom Icons and Slots

You can customize the Logo icon or completely customize the header content through slots.

<DemoBlock title="Custom Icons and Slots" :ts-code="tsSlot" :js-code="jsSlot">
  <YhAiWelcome icon="chat">
    <template #title>
      <span style="background: linear-gradient(90deg, #ff4d4f, #f759ab); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
        Limited Beta AI
      </span>
    </template>
    <div style="margin-top: 20px; display: flex; gap: 8px; justify-content: center;">
      <YhTag effect="dark" type="warning">GPT-4o</YhTag>
      <YhTag effect="dark" type="info">8k Context</YhTag>
    </div>
  </YhAiWelcome>
</DemoBlock>

## API

### Props

| Name          | Description              | Type             | Default      |
| ------------- | ------------------------ | ---------------- | ------------ |
| `title`       | Title text               | `string`         | `''`         |
| `description` | Description text         | `string`         | `''`         |
| `suggestions` | Suggested items list     | `AiSuggestion[]` | `[]`         |
| `showIcon`    | Whether to show the icon | `boolean`        | `true`       |
| `icon`        | Icon name                | `string`         | `'sparkles'` |

### AiSuggestion Item

| Name          | Description                      | Type     |
| ------------- | -------------------------------- | -------- |
| `icon`        | Icon name                        | `string` |
| `title`       | Suggestion title                 | `string` |
| `description` | Detailed description             | `string` |
| `prompt`      | Command text passed when clicked | `string` |

### Events

| Event Name | Description                                 | Callback Parameters    |
| ---------- | ------------------------------------------- | ---------------------- |
| `select`   | Triggered when a suggestion card is clicked | `(item: AiSuggestion)` |

### Slots

| Slot Name     | Description           |
| ------------- | --------------------- |
| `default`     | Bottom custom content |
| `icon`        | Custom Logo           |
| `title`       | Custom Title          |
| `description` | Custom Description    |

## Theme Variables

| Variable Name                      | Default Value                                                       |
| ---------------------------------- | ------------------------------------------------------------------- |
| `--yh-ai-welcome-padding`          | `var(--yh-spacing-xl)`                                              |
| `--yh-ai-welcome-max-width`        | `800px`                                                             |
| `--yh-ai-welcome-primary-gradient` | `linear-gradient(135deg, var(--yh-color-primary) 0%, #a855f7 100%)` |
| `--yh-ai-welcome-card-bg`          | `var(--yh-bg-color-overlay)`                                        |
