# Tag

Used for marking and selection.

<script setup lang="ts">
import { ref } from 'vue'

// Closable tags demo data
const closableTags = ref([
  { text: 'Tag 1', type: '' },
  { text: 'Tag 2', type: 'success' },
  { text: 'Tag 3', type: 'warning' },
  { text: 'Tag 4', type: 'danger' },
  { text: 'Tag 5', type: 'info' }
])

const handleCloseTag = (index: number) => {
  closableTags.value.splice(index, 1)
}

// Dynamic tags
const dynamicTags = ref(['Tag 1', 'Tag 2', 'Tag 3'])
const inputVisible = ref(false)
const inputValue = ref('')

const removeDynamicTag = (index: number) => {
  dynamicTags.value.splice(index, 1)
}

const showInput = () => {
  inputVisible.value = true
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}

// Checkable tags
const checked1 = ref(true)
const checked2 = ref(false)
const checked3 = ref(false)

// Code samples
const tsBasic = `<template>
  <yh-tag>Tag 1</yh-tag>
  <yh-tag type="success">Tag 2</yh-tag>
  <yh-tag type="warning">Tag 3</yh-tag>
  <yh-tag type="danger">Tag 4</yh-tag>
  <yh-tag type="info">Tag 5</yh-tag>
<\/template>`

const jsBasic = tsBasic

const tsEffect = `<template>
  <!-- Dark Effect -->
  <yh-tag effect="dark">Tag 1</yh-tag>
  <yh-tag type="success" effect="dark">Tag 2</yh-tag>
  <yh-tag type="warning" effect="dark">Tag 3</yh-tag>
  <yh-tag type="danger" effect="dark">Tag 4</yh-tag>
  <yh-tag type="info" effect="dark">Tag 5</yh-tag>
  
  <!-- Light Effect (Default) -->
  <yh-tag effect="light">Tag 1</yh-tag>
  <yh-tag type="success" effect="light">Tag 2</yh-tag>
  <yh-tag type="warning" effect="light">Tag 3</yh-tag>
  <yh-tag type="danger" effect="light">Tag 4</yh-tag>
  <yh-tag type="info" effect="light">Tag 5</yh-tag>
  
  <!-- Plain Effect -->
  <yh-tag effect="plain">Tag 1</yh-tag>
  <yh-tag type="success" effect="plain">Tag 2</yh-tag>
  <yh-tag type="warning" effect="plain">Tag 3</yh-tag>
  <yh-tag type="danger" effect="plain">Tag 4</yh-tag>
  <yh-tag type="info" effect="plain">Tag 5</yh-tag>
<\/template>`

const jsEffect = tsEffect

const tsClosable = `<template>
  <yh-tag
    v-for="(tag, index) in tags"
    :key="tag.text"
    :type="tag.type"
    closable
    @close="handleClose(index)"
  >
    {{ tag.text }}
  </yh-tag>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'

const tags = ref([
  { text: 'Tag 1', type: '' },
  { text: 'Tag 2', type: 'success' },
  { text: 'Tag 3', type: 'warning' },
  { text: 'Tag 4', type: 'danger' },
  { text: 'Tag 5', type: 'info' }
])

const handleClose = (index: number) => {
  tags.value.splice(index, 1)
}
<\/script>`

const jsClosable = tsClosable.replace('lang="ts"', '').replace(': number', '')

const tsDynamic = `<template>
  <yh-tag
    v-for="(tag, index) in dynamicTags"
    :key="tag"
    closable
    @close="removeTag(index)"
  >
    {{ tag }}
  </yh-tag>
  <input
    v-if="inputVisible"
    v-model="inputValue"
    @keyup.enter="handleInputConfirm"
    @blur="handleInputConfirm"
  />
  <yh-button v-else size="small" @click="showInput">+ New Tag</yh-button>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'

const dynamicTags = ref(['Tag 1', 'Tag 2', 'Tag 3'])
const inputVisible = ref(false)
const inputValue = ref('')

const removeTag = (index: number) => {
  dynamicTags.value.splice(index, 1)
}

const showInput = () => {
  inputVisible.value = true
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}
<\/script>`

const jsDynamic = tsDynamic.replace('lang="ts"', '').replace(': number', '')

const tsCheckable = `<template>
  <yh-tag checkable v-model:checked="checked1">Tag 1</yh-tag>
  <yh-tag checkable v-model:checked="checked2" type="success">Tag 2</yh-tag>
  <yh-tag checkable v-model:checked="checked3" type="warning">Tag 3</yh-tag>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'

const checked1 = ref(true)
const checked2 = ref(false)
const checked3 = ref(false)
<\/script>`

const jsCheckable = tsCheckable.replace('lang="ts"', '')

const tsSizes = `<template>
  <yh-tag size="large">Large</yh-tag>
  <yh-tag>Default</yh-tag>
  <yh-tag size="small">Small</yh-tag>
  <yh-tag size="large" closable>Large</yh-tag>
  <yh-tag closable>Default</yh-tag>
  <yh-tag size="small" closable>Small</yh-tag>
<\/template>`

const jsSizes = tsSizes

const tsRound = `<template>
  <yh-tag round>Tag 1</yh-tag>
  <yh-tag type="success" round>Tag 2</yh-tag>
  <yh-tag type="warning" round>Tag 3</yh-tag>
  <yh-tag type="danger" round>Tag 4</yh-tag>
  <yh-tag type="info" round>Tag 5</yh-tag>
<\/template>`

const jsRound = tsRound

const tsColor = `<template>
  <yh-tag color="#8B5CF6">Custom Purple</yh-tag>
  <yh-tag color="#F97316" effect="dark">Custom Orange</yh-tag>
  <yh-tag color="#06B6D4" effect="plain">Custom Cyan</yh-tag>
  <yh-tag color="#EC4899">Custom Pink</yh-tag>
  <yh-tag color="#14B8A6" effect="dark">Custom Teal</yh-tag>
<\/template>`

const jsColor = tsColor

const tsIcon = `<template>
  <!-- Using icon prop (component) -->
  <yh-tag :icon="StarIcon">Favorite</yh-tag>
  
  <!-- Using icon slot -->
  <yh-tag type="success">
    <template #icon>
      <svg viewBox="0 0 24 24" width="1em" height="1em">
        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    </template>
    Completed
  </yh-tag>
  
  <!-- Using suffix-icon slot -->
  <yh-tag type="warning">
    In Progress
    <template #suffixIcon>
      <svg viewBox="0 0 24 24" width="1em" height="1em">
        <path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
      </svg>
    </template>
  </yh-tag>
  
  <!-- Using both slots -->
  <yh-tag type="danger">
    <template #icon>
      <svg viewBox="0 0 24 24" width="1em" height="1em">
        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
      </svg>
    </template>
    Warning Info
    <template #suffixIcon>
      <svg viewBox="0 0 24 24" width="1em" height="1em">
        <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      </svg>
    </template>
  </yh-tag>
<\/template>`

const jsIcon = tsIcon

// Nuxt usage example
const nuxtTags = ref(['Nuxt', 'Vue', 'Vite'])

const tsNuxt = `<template>
  <div style="display: flex; flex-wrap: wrap; gap: 8px;">
    <!-- Basic tag, auto-imported -->
    <yh-tag type="primary">Nuxt Auto Import</yh-tag>
    
    <!-- Dynamic tag rendering -->
    <yh-tag 
      v-for="item in tags" 
      :key="item" 
      type="success" 
      effect="dark"
    >
      {{ item }}
    </yh-tag>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// No manual import needed for YhTag
const tags = ref(['Nuxt', 'Vue', 'Vite'])
<\/script>`.replace(/\\/g, '')

const jsNuxt = tsNuxt.replace('lang="ts"', '')
</script>

## Basic Usage

Use the `type` property to define the tag's type.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="display: flex; flex-wrap: wrap; gap: 8px;">
    <yh-tag>Tag 1</yh-tag>
    <yh-tag type="success">Tag 2</yh-tag>
    <yh-tag type="warning">Tag 3</yh-tag>
    <yh-tag type="danger">Tag 4</yh-tag>
    <yh-tag type="info">Tag 5</yh-tag>
  </div>
</DemoBlock>

## Theme Effects

The Tag component provides three theme effects: `dark`, `light` (default), and `plain`.

<DemoBlock title="Theme Effects" :ts-code="tsEffect" :js-code="jsEffect">
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="min-width: 50px; color: var(--yh-text-color-secondary);">Dark:</span>
      <yh-tag effect="dark">Tag 1</yh-tag>
      <yh-tag type="success" effect="dark">Tag 2</yh-tag>
      <yh-tag type="warning" effect="dark">Tag 3</yh-tag>
      <yh-tag type="danger" effect="dark">Tag 4</yh-tag>
      <yh-tag type="info" effect="dark">Tag 5</yh-tag>
    </div>
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="min-width: 50px; color: var(--yh-text-color-secondary);">Light:</span>
      <yh-tag effect="light">Tag 1</yh-tag>
      <yh-tag type="success" effect="light">Tag 2</yh-tag>
      <yh-tag type="warning" effect="light">Tag 3</yh-tag>
      <yh-tag type="danger" effect="light">Tag 4</yh-tag>
      <yh-tag type="info" effect="light">Tag 5</yh-tag>
    </div>
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="min-width: 50px; color: var(--yh-text-color-secondary);">Plain:</span>
      <yh-tag effect="plain">Tag 1</yh-tag>
      <yh-tag type="success" effect="plain">Tag 2</yh-tag>
      <yh-tag type="warning" effect="plain">Tag 3</yh-tag>
      <yh-tag type="danger" effect="plain">Tag 4</yh-tag>
      <yh-tag type="info" effect="plain">Tag 5</yh-tag>
    </div>
  </div>
</DemoBlock>

## Closable Tags

Use the `closable` property to define a closable tag. Clicking the close button triggers the `close` event.

<DemoBlock title="Closable Tags" :ts-code="tsClosable" :js-code="jsClosable">
  <div style="display: flex; flex-wrap: wrap; gap: 8px;">
    <yh-tag
      v-for="(tag, index) in closableTags"
      :key="tag.text"
      :type="tag.type"
      closable
      @close="handleCloseTag(index)"
    >
      {{ tag.text }}
    </yh-tag>
  </div>
</DemoBlock>

## Dynamic Editing

Dynamic editing can be implemented by responding to the `close` event triggered when a tag's close button is clicked.

<DemoBlock title="Dynamic Editing" :ts-code="tsDynamic" :js-code="jsDynamic">
  <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
    <yh-tag
      v-for="(tag, index) in dynamicTags"
      :key="tag"
      closable
      @close="removeDynamicTag(index)"
    >
      {{ tag }}
    </yh-tag>
    <input
      v-if="inputVisible"
      v-model="inputValue"
      style="width: 80px; height: 24px; padding: 0 8px; border: 1px solid var(--yh-border-color); border-radius: 4px; font-size: 12px;"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
    />
    <yh-button v-else size="small" @click="showInput">+ New Tag</yh-button>
  </div>
</DemoBlock>

## Checkable Tags

Use the `checkable` property to define a tag that can be selected, paired with `v-model:checked`.

<DemoBlock title="Checkable Tags" :ts-code="tsCheckable" :js-code="jsCheckable">
  <div style="display: flex; flex-wrap: wrap; gap: 8px;">
    <yh-tag checkable v-model:checked="checked1">Tag 1</yh-tag>
    <yh-tag checkable v-model:checked="checked2" type="success">Tag 2</yh-tag>
    <yh-tag checkable v-model:checked="checked3" type="warning">Tag 3</yh-tag>
  </div>
  <p style="margin-top: 12px; color: var(--yh-text-color-secondary);">
    Selection Status: {{ [checked1, checked2, checked3] }}
  </p>
</DemoBlock>

## Different Sizes

Use the `size` property to control the tag's dimensions.

<DemoBlock title="Different Sizes" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
    <yh-tag size="large">Large</yh-tag>
    <yh-tag>Default</yh-tag>
    <yh-tag size="small">Small</yh-tag>
    <yh-tag size="large" closable>Large</yh-tag>
    <yh-tag closable>Default</yh-tag>
    <yh-tag size="small" closable>Small</yh-tag>
  </div>
</DemoBlock>

## Round Tags

Use the `round` property to make the tag circular/round.

<DemoBlock title="Round Tags" :ts-code="tsRound" :js-code="jsRound">
  <div style="display: flex; flex-wrap: wrap; gap: 8px;">
    <yh-tag round>Tag 1</yh-tag>
    <yh-tag type="success" round>Tag 2</yh-tag>
    <yh-tag type="warning" round>Tag 3</yh-tag>
    <yh-tag type="danger" round>Tag 4</yh-tag>
    <yh-tag type="info" round>Tag 5</yh-tag>
  </div>
</DemoBlock>

## Custom Colors

Use the `color` property to customize the tag's background color.

<DemoBlock title="Custom Colors" :ts-code="tsColor" :js-code="jsColor">
  <div style="display: flex; flex-wrap: wrap; gap: 8px;">
    <yh-tag color="#8B5CF6">Custom Purple</yh-tag>
    <yh-tag color="#F97316" effect="dark">Custom Orange</yh-tag>
    <yh-tag color="#06B6D4" effect="plain">Custom Cyan</yh-tag>
    <yh-tag color="#EC4899">Custom Pink</yh-tag>
    <yh-tag color="#14B8A6" effect="dark">Custom Teal</yh-tag>
  </div>
</DemoBlock>

## Icon Configuration

Use the `icon` property or `#icon` slot for the left icon, and the `suffix-icon` property or `#suffixIcon` slot for the right icon.

<DemoBlock title="Icon Configuration" :ts-code="tsIcon" :js-code="jsIcon">
<div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
<yh-tag type="success"><template #icon><svg viewBox="0 0 24 24" width="1em" height="1em"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></template>Completed</yh-tag>
<yh-tag type="warning">In Progress<template #suffixIcon><svg viewBox="0 0 24 24" width="1em" height="1em"><path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg></template></yh-tag>
<yh-tag type="danger"><template #icon><svg viewBox="0 0 24 24" width="1em" height="1em"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg></template>Warning Info<template #suffixIcon><svg viewBox="0 0 24 24" width="1em" height="1em"><path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></template></yh-tag>
<yh-tag type="info"><template #icon><svg viewBox="0 0 24 24" width="1em" height="1em"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg></template>Tips</yh-tag>
</div>
</DemoBlock>

## Usage in Nuxt

The Tag component fully supports SSR in Nuxt 3/4. Its lightweight design makes it ideal for status display and categorization in Nuxt projects.

<DemoBlock title="Usage in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="display: flex; flex-wrap: wrap; gap: 8px;">
    <yh-tag type="primary">Nuxt Auto Import</yh-tag>
    <yh-tag v-for="tag in nuxtTags" :key="tag" type="success" effect="dark">{{ tag }}</yh-tag>
  </div>
</DemoBlock>

**SSR Considerations**:

- ✅ All types, sizes, and effects generate HTML offline on the server.
- ✅ Custom colors and rounded corners are supported in SSR.
- ✅ Icon slots (prefix and suffix) are correctly filled on the server.
- 💡 Interactions (like closing or editing) become active after client-side hydration.

::: tip Ultra Lightweight
The CSS for the Tag component is highly optimized/atomic, adding minimal style overhead to SSR pages, making it an ideal choice for performance-focused Nuxt apps.
:::

## API

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| type | Tag type | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'primary'` |
| size | Tag size | `'large' \| 'default' \| 'small'` | `'default'` |
| effect | Theme effect | `'dark' \| 'light' \| 'plain'` | `'light'` |
| closable | Whether the tag is closable | `boolean` | `false` |
| round | Whether the tag has rounded corners | `boolean` | `false` |
| color | Custom background color | `string` | — |
| hit | Whether the tag has a border stroke | `boolean` | `false` |
| disable-transitions | Whether to disable fade animations | `boolean` | `false` |
| checkable | Whether the tag is selectable | `boolean` | `false` |
| checked / v-model:checked | Whether the tag is currently selected | `boolean` | `false` |
| editable | Whether the tag is editable (double-click to edit) | `boolean` | `false` |
| icon | Left icon component | `Component` | — |
| suffix-icon | Right icon component | `Component` | — |

### Events

| Name | Description | Parameters |
| --- | --- | --- |
| click | Triggers when the tag is clicked | `(event: MouseEvent) => void` |
| close | Triggers when the close button is clicked | `(event: MouseEvent) => void` |
| update:checked | Triggers when selection status changes | `(checked: boolean) => void` |
| change | Triggers when selection status changes | `(checked: boolean) => void` |
| edit | Triggers when editing is completed | `(value: string) => void` |

### Slots

| Name | Description |
| --- | --- |
| default | Tag content |
| icon | Custom left icon |
| suffix-icon | Custom right icon |
| close-icon | Custom close icon |

## Theme Variables

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-tag-font-size` | Font size | `var(--yh-font-size-xs)` |
| `--yh-tag-border-radius` | Border radius | `var(--yh-radius-sm)` |
| `--yh-tag-bg-color` | Background color | (varies by type) |
| `--yh-tag-border-color` | Border color | (varies by type) |
| `--yh-tag-text-color` | Text color | (varies by type) |
