# Result

Used to provide feedback on the results of a series of operations or tasks.

<script setup lang="ts">
import { ref, computed } from 'vue'

const tsBasic = `<template>
  <yh-result
    icon="success"
    title="Operation Successful"
    sub-title="Your order has been submitted successfully, expected delivery in 3-5 business days."
  >
    <yh-button type="primary">Back to Home</yh-button>
  </yh-result>
<\/template>`

const jsBasic = tsBasic

const tsTypes = `<template>
  <yh-space direction="vertical" :size="40" fill>
    <yh-result icon="success" title="Success" sub-title="Submitted successfully" />
    <yh-result icon="warning" title="Warning" sub-title="Please note this operation" />
    <yh-result icon="error" title="Error" sub-title="Submission failed, please try again" />
    <yh-result icon="info" title="Information" sub-title="This is a prompt message" />
  </yh-space>
<\/template>`

const jsTypes = tsTypes

const tsCustom = `<template>
  <yh-result title="404" sub-title="Sorry, the page you visited does not exist">
    <template #icon>
      <span style="font-size: 72px;">📄</span>
    </template>
    <template #extra>
      <p style="color: var(--yh-text-color-secondary);">
        Please check if the URL is correct, or return to home.
      </p>
    </template>
    <yh-button type="primary">Back to Home</yh-button>
    <yh-button>Contact Support</yh-button>
  </yh-result>
<\/template>`

const jsCustom = tsCustom

const tsNuxt = `<template>
  <div>
    <div style="display: flex; gap: 8px; margin-bottom: 24px; justify-content: center;">
      <yh-button :type="code === 404 ? 'primary' : 'default'" @click="code = 404">Mock 404</yh-button>
      <yh-button :type="code === 403 ? 'primary' : 'default'" @click="code = 403">Mock 403</yh-button>
      <yh-button :type="code === 500 ? 'primary' : 'default'" @click="code = 500">Mock 500</yh-button>
    </div>

    <yh-result
      :icon="resultIcon"
      :title="String(code)"
      :sub-title="resultSubTitle"
    >
      <yh-button type="primary" @click="handleClear">Back to Home</yh-button>
      <yh-button style="margin-left: 8px;" @click="handleBack">Go Back</yh-button>
    </yh-result>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const code = ref(404)

const resultIcon = computed(() => {
  if (code.value === 404) return 'warning'
  if (code.value === 403) return 'error'
  return 'info'
})

const resultSubTitle = computed(() => {
  if (code.value === 404) return "Sorry, the page you visited does not exist"
  if (code.value === 403) return "Sorry, you don't have permission to access this page"
  return 'An unknown error occurred, please try again later'
})

const handleClear = () => clearError({ redirect: '/' })
const handleBack = () => clearError({ redirect: -1 })
<\/script>`

const jsNuxt = tsNuxt.replace('lang="ts"', '')

const resultErrorCode = ref(404)
const previewIcon = computed(() => {
  if (resultErrorCode.value === 404) return 'warning'
  if (resultErrorCode.value === 403) return 'error'
  return 'info'
})
const previewTitle = computed(() => String(resultErrorCode.value))
const previewSubTitle = computed(() => {
  if (resultErrorCode.value === 404) return "Sorry, the page you visited does not exist"
  if (resultErrorCode.value === 403) return "Sorry, you don't have permission to access this page"
  return 'An unknown error occurred, please try again later'
})
</script>

## Basic Usage

Use `icon`, `title`, and `sub-title` to render a standard result state.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-result
    icon="success"
    title="Operation Successful"
    sub-title="Your order has been submitted successfully, expected delivery in 3-5 business days."
  >
    <yh-button type="primary">Back to Home</yh-button>
  </yh-result>
</DemoBlock>

## Different Statuses

Switch between `success`, `warning`, `error`, and `info` via the `icon` prop.

<DemoBlock title="Different Statuses" :ts-code="tsTypes" :js-code="jsTypes">
  <yh-space direction="vertical" :size="40" fill>
    <yh-result icon="success" title="Success" sub-title="Submitted successfully" />
    <yh-result icon="warning" title="Warning" sub-title="Please note this operation" />
    <yh-result icon="error" title="Error" sub-title="Submission failed, please try again" />
    <yh-result icon="info" title="Information" sub-title="This is a prompt message" />
  </yh-space>
</DemoBlock>

## Custom Content

Use slots such as `icon` and `extra` to customize the result page. The default slot is typically used for action buttons.

<DemoBlock title="Custom Content" :ts-code="tsCustom" :js-code="jsCustom">
  <yh-result title="404" sub-title="Sorry, the page you visited does not exist">
    <template #icon>
      <span style="font-size: 72px;">📄</span>
    </template>
    <template #extra>
      <p style="color: var(--yh-text-color-secondary);">
        Please check if the URL is correct, or return to home.
      </p>
    </template>
    <yh-button type="primary">Back to Home</yh-button>
    <yh-button>Contact Support</yh-button>
  </yh-result>
</DemoBlock>

## Use in Nuxt

`YhResult` works well in Nuxt 3/4 as a regular feedback component and also fits global error pages such as `error.vue`.

<DemoBlock title="Use in Nuxt (Mock error.vue)" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div>
    <div style="display: flex; gap: 8px; margin-bottom: 24px; justify-content: center;">
      <yh-button
        :type="resultErrorCode === 404 ? 'primary' : 'default'"
        @click="resultErrorCode = 404"
      >Mock 404</yh-button>
      <yh-button
        :type="resultErrorCode === 403 ? 'primary' : 'default'"
        @click="resultErrorCode = 403"
      >Mock 403</yh-button>
      <yh-button
        :type="resultErrorCode === 500 ? 'primary' : 'default'"
        @click="resultErrorCode = 500"
      >Mock 500</yh-button>
    </div>
    <yh-result
      :icon="previewIcon"
      :title="previewTitle"
      :sub-title="previewSubTitle"
    >
      <yh-button type="primary">Back to Home</yh-button>
      <yh-button style="margin-left: 8px;">Go Back</yh-button>
    </yh-result>
  </div>
</DemoBlock>

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `title` | Title | `string` | `undefined` |
| `sub-title` | Sub-title | `string` | `undefined` |
| `icon` | Result icon type | `'success' \| 'warning' \| 'error' \| 'info'` | `'info'` |
| `theme-overrides` | Component-level theme variable overrides | `ComponentThemeVars` | `undefined` |

### Events

This component does not expose component events.

### Slots

| Slot | Description |
| --- | --- |
| `default` | Actions area |
| `icon` | Custom icon content |
| `title` | Custom title content |
| `sub-title` | Custom sub-title content |
| `extra` | Extra content area between sub-title and actions |

### Expose

This component does not expose public instance methods or properties.

## Theme Variables

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-result-padding` | Container padding | `40px 30px` |
| `--yh-result-icon-size` | Icon size | `72px` |
| `--yh-result-icon-margin` | Icon margin bottom | `20px` |
| `--yh-result-title-size` | Title font size | `20px` |
| `--yh-result-title-color` | Title color | `var(--yh-text-color-primary, #303133)` |
| `--yh-result-subtitle-size` | Sub-title font size | `14px` |
| `--yh-result-subtitle-color` | Sub-title color | `var(--yh-text-color-secondary, #909399)` |

### Type Exports

| Name | Description |
| --- | --- |
| `YhResultProps` | Component props type |
| `YhResultSlots` | Component slots type |
| `YhResultIconType` | Result icon union type |
| `YhResultInstance` | Component instance type |
