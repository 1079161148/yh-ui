# InputTag

Used for inputting and managing multiple tags.

<script setup lang="ts">
import { ref } from 'vue'

const tags1 = ref(['Vue', 'React'])
const tags2 = ref(['Tag 1', 'Tag 2'])
const tags3 = ref([])
const tags4 = ref(['JavaScript', 'TypeScript'])
const tags5 = ref(['Tag One'])
const tagsCollapse = ref(['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5'])
const tagsDrag = ref(['Draggable 1', 'Draggable 2', 'Draggable 3', 'Draggable 4'])

// Code examples
const tsBasic = `<template>
  <yh-input-tag v-model="tags" placeholder="Enter tags" />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const tags = ref(['Vue', 'React'])
<\/script>`

const jsBasic = tsBasic.replace('lang="ts"', '')

const tsDisabled = `<template>
  <yh-input-tag v-model="tags" disabled />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const tags = ref(['Tag 1', 'Tag 2'])
<\/script>`

const jsDisabled = tsDisabled.replace('lang="ts"', '')

const tsMax = `<template>
  <yh-input-tag v-model="tags" :max="5" placeholder="Enter up to 5 tags" />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const tags = ref([])
<\/script>`

const jsMax = tsMax.replace('lang="ts"', '')

const tsClearable = `<template>
  <yh-input-tag v-model="tags" clearable placeholder="Can be cleared" />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const tags = ref(['JavaScript', 'TypeScript'])
<\/script>`

const jsClearable = tsClearable.replace('lang="ts"', '')

const tsCollapse = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <!-- Basic Collapse -->
    <div>
      <p>use collapse-tags:</p>
      <yh-input-tag v-model="tags" collapse-tags />
    </div>

    <!-- Collapse + Tooltip -->
    <div>
      <p>use collapse-tags-tooltip:</p>
      <yh-input-tag v-model="tags" collapse-tags collapse-tags-tooltip />
    </div>

    <!-- Max Collapse Tags -->
    <div>
      <p>use max-collapse-tags:</p>
      <yh-input-tag v-model="tags" collapse-tags :max-collapse-tags="3" />
    </div>
  </div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const tags = ref(['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5'])
<\/script>`

const jsCollapse = tsCollapse.replace('lang="ts"', '')

const tsDraggable = `<template>
  <yh-input-tag v-model="tags" draggable placeholder="Draggable sorting" />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const tags = ref(['Draggable 1', 'Draggable 2', 'Draggable 3', 'Draggable 4'])
<\/script>`

const jsDraggable = tsDraggable.replace('lang="ts"', '')

const tsPrefixSuffix = `<template>
  <yh-input-tag v-model="tags" prefix="Tag:" />
  <yh-input-tag v-model="tags" suffix=" units" />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const tags = ref(['Vue', 'React'])
<\/script>`

const jsPrefixSuffix = tsPrefixSuffix.replace('lang="ts"', '')

const tsTagEffect = `<template>
  <yh-input-tag v-model="tags" tag-effect="light" type="primary" />
  <yh-input-tag v-model="tags" tag-effect="dark" type="success" />
  <yh-input-tag v-model="tags" tag-effect="plain" type="warning" />
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const tags = ref(['Tag 1', 'Tag 2'])
<\/script>`

const jsTagEffect = tsTagEffect.replace('lang="ts"', '')

const tsSizes = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-input-tag v-model="tags" size="large" placeholder="Large" />
    <yh-input-tag v-model="tags" placeholder="Default" />
    <yh-input-tag v-model="tags" size="small" placeholder="Small" />
  </div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const tags = ref(['Tag One'])
<\/script>`

const jsSizes = tsSizes.replace('lang="ts"', '')

// Nuxt usage example
const nuxtTags = ref(['SSR', 'Nuxt 3'])

const tsNuxt = `<template>
  <div style="max-width: 400px;">
    <!-- Component is auto-imported -->
    <yh-input-tag 
      v-model="tags" 
      placeholder="Nuxt auto-import" 
      tag-type="success"
      clearable
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// No need to manually import YhInputTag
const tags = ref(['SSR', 'Nuxt 3'])
<\/script>`.replace(/\\/g, '')

const jsNuxt = tsNuxt.replace('lang="ts"', '')
</script>

## Basic Usage

Bind a tag array with `v-model`. Press `Enter` or `,` to confirm input and add a tag.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-input-tag v-model="tags1" placeholder="Enter tags, press Enter to confirm" style="width: 400px;" />
  <p style="margin-top: 12px; color: var(--yh-text-color-secondary);">Current tags: {{ tags1.join(', ') }}</p>
</DemoBlock>

## Disabled State

Use the `disabled` attribute to disable the input field.

<DemoBlock title="Disabled State" :ts-code="tsDisabled" :js-code="jsDisabled">
  <yh-input-tag v-model="tags2" disabled style="width: 400px;" />
</DemoBlock>

## Limit Count

Use the `max` attribute to limit the maximum number of tags.

<DemoBlock title="Limit Count" :ts-code="tsMax" :js-code="jsMax">
  <yh-input-tag v-model="tags3" :max="5" placeholder="Enter up to 5 tags" style="width: 400px;" />
  <p style="margin-top: 12px; color: var(--yh-text-color-secondary);">Inputted {{ tags3.length }} / 5 tags</p>
</DemoBlock>

## Clearable

Use the `clearable` attribute to enable one-click clear functionality.

<DemoBlock title="Clearable" :ts-code="tsClearable" :js-code="jsClearable">
  <yh-input-tag v-model="tags4" clearable placeholder="Clear all tags" style="width: 400px;" />
</DemoBlock>

## Collapsible Tags

Use the `collapse-tags` attribute to collapse multiple tags. Combine with `collapse-tags-tooltip` to show all tags on hover.

<DemoBlock title="Collapsible Tags" :ts-code="tsCollapse" :js-code="jsCollapse">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <p style="margin-bottom: 8px; color: var(--yh-text-color-secondary);">use collapse-tags:</p>
      <yh-input-tag v-model="tagsCollapse" collapse-tags style="width: 400px;" />
    </div>
    <div>
      <p style="margin-bottom: 8px; color: var(--yh-text-color-secondary);">use collapse-tags-tooltip:</p>
      <yh-input-tag v-model="tagsCollapse" collapse-tags collapse-tags-tooltip style="width: 400px;" />
    </div>
    <div>
      <p style="margin-bottom: 8px; color: var(--yh-text-color-secondary);">use max-collapse-tags:</p>
      <yh-input-tag v-model="tagsCollapse" collapse-tags :max-collapse-tags="3" style="width: 400px;" />
    </div>
  </div>
</DemoBlock>

## Draggable Sorting

Use the `draggable` attribute to sort tags by dragging.

<DemoBlock title="Draggable Sorting" :ts-code="tsDraggable" :js-code="jsDraggable">
  <yh-input-tag v-model="tagsDrag" draggable placeholder="Draggable sorting" style="width: 400px;" />
  <p style="margin-top: 12px; color: var(--yh-text-color-secondary);">Drag tags to change order</p>
</DemoBlock>

## Prefix and Suffix

Use `prefix` and `suffix` attributes to add prefix and suffix.

<DemoBlock title="Prefix and Suffix" :ts-code="tsPrefixSuffix" :js-code="jsPrefixSuffix">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-input-tag v-model="tags1" prefix="Tag:" style="width: 400px;" />
    <yh-input-tag v-model="tags1" suffix=" units" style="width: 400px;" />
  </div>
</DemoBlock>

## Tag Effect

Use `tag-effect` to set the display effect of tags.

<DemoBlock title="Tag Effect" :ts-code="tsTagEffect" :js-code="jsTagEffect">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-input-tag v-model="tags5" tag-effect="light" type="primary" placeholder="Light effect" style="width: 400px;" />
    <yh-input-tag v-model="tags5" tag-effect="dark" type="success" placeholder="Dark effect" style="width: 400px;" />
    <yh-input-tag v-model="tags5" tag-effect="plain" type="warning" placeholder="Plain effect" style="width: 400px;" />
  </div>
</DemoBlock>

## Different Sizes

Use the `size` attribute to control the input size.

<DemoBlock title="Different Sizes" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-input-tag v-model="tags5" size="large" placeholder="Large size" style="width: 400px;" />
    <yh-input-tag v-model="tags5" placeholder="Default size" style="width: 400px;" />
    <yh-input-tag v-model="tags5" size="small" placeholder="Small size" style="width: 400px;" />
  </div>
</DemoBlock>

## Use in Nuxt

InputTag is fully compatible with Nuxt 3/4. In SSR scenarios, existing tags (modelValue) are rendered directly as static HTML tags on the server, ensuring visual consistency on the first screen and being SEO-friendly.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="max-width: 400px;">
    <yh-input-tag 
      v-model="nuxtTags" 
      placeholder="Nuxt auto-import demo" 
      tag-type="success"
      clearable
    />
  </div>
</DemoBlock>

**SSR Notes**:

- ✅ Initial tag array is fully supported for SSR synchronous rendering.
- ✅ Tag styles, themes (tag-effect), and sizes support server-side rendering.
- ✅ Prefix/suffix text and icons are placed and displayed on the server.
- ⚠️ Dynamic addition (Enter confirmation), draggable sorting, and deleting tags take effect after client-side activation (Hydration).
- 💡 Virtual scrolling (for extremely long tag lists, if enabled) renders the basic visible part on the server.

::: tip SSR Performance Optimization
When rendered on the server, the InputTag component dynamically generates optimized HTML fragments based on the length of `modelValue`, reducing the DOM diff calculations during client hydration and improving interaction response speed.
:::

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| model-value / v-model | Binding value (Tag array) | `string[]` | `[]` |
| type | Tag type | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'info'` |
| size | Size | `'large' \| 'default' \| 'small'` | `'default'` |
| disabled | Whether to disable | `boolean` | `false` |
| readonly | Whether to set read-only | `boolean` | `false` |
| max | Maximum number of tags | `number` | — |
| separator | Separator | `string \| string[]` | `[',', 'Enter']` |
| placeholder | Placeholder | `string` | — |
| clearable | Whether it is clearable | `boolean` | `false` |
| add-on-blur | Whether to add input content on blur | `boolean` | `true` |
| closable | Whether tags are closable | `boolean` | `true` |
| validate-tag | Validation function | `(value: string) => boolean` | — |
| trim | Whether to trim whitespace | `boolean` | `true` |
| allow-duplicate | Whether to allow duplicate tags | `boolean` | `false` |
| **collapse-tags** | Whether to collapse tags | `boolean` | `false` |
| **collapse-tags-tooltip** | Whether to show tooltip when collapsed | `boolean` | `false` |
| **max-collapse-tags** | Maximum number of tags to show before collapsing | `number` | `1` |
| **draggable** | Whether draggable sorting is enabled | `boolean` | `false` |
| **tag-effect** | Tag effect | `'dark' \| 'light' \| 'plain'` | `'light'` |
| prefix | Prefix text | `string` | — |
| suffix | Suffix text | `string` | — |
| prefix-icon | Prefix icon | `Component` | — |
| suffix-icon | Suffix icon | `Component` | — |

### Events

| Event Name | Description | Callback Parameters |
| --- | --- | --- |
| change | Triggered when tags change | `(value: string[]) => void` |
| input | Triggered on input | `(value: string) => void` |
| add | Triggered when a tag is added | `(tag: string) => void` |
| remove | Triggered when a tag is removed | `(tag: string, index: number) => void` |
| focus | Triggered on focus | `(event: FocusEvent) => void` |
| blur | Triggered on blur | `(event: FocusEvent) => void` |
| clear | Triggered on clear | `() => void` |
| **drag-end** | Triggered when dragging ends | `(tags: string[]) => void` |

### Slots

| Slot Name | Description | Scoped Parameters |
| --- | --- | --- |
| prefix | Custom prefix content | — |
| suffix | Custom suffix content | — |
| **tag** | Custom tag content | `{ tag: string, index: number, close: () => void }` |
| **clear-icon** | Custom clear icon | — |
| **collapse-tag** | Custom collapsed tag content | `{ count: number, tags: string[] }` |

### Expose

| Name | Description | Type |
| --- | --- | --- |
| focus | Focus the input field | `() => void` |
| blur | Blur the input field | `() => void` |
| clear | Clear all tags | `() => void` |

## Theme Variables

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-input-tag-min-height` | Minimum height | `var(--yh-component-size-default)` |
| `--yh-input-tag-font-size` | Font size | `var(--yh-font-size-base)` |
| `--yh-input-tag-bg-color` | Background color | `var(--yh-fill-color-blank)` |
| `--yh-input-tag-border-color` | Border color | `var(--yh-border-color)` |
| `--yh-input-tag-tag-height` | Tag height | `22px` |
| `--yh-input-tag-gap` | Tag gap | `4px` |
