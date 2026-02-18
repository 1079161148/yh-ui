# Card

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)

// Code examples
const tsBasic = `<template>
  <yh-card header="Card Title">
    <p>Card content. This is some descriptive text.</p>
    <p>Cards can contain text, lists, images, paragraphs, etc.</p>
  </yh-card>
<\/template>`

const jsBasic = tsBasic

const tsSimple = `<template>
  <yh-card>
    <p>A simple card without a title.</p>
  </yh-card>
<\/template>`

const jsSimple = tsSimple

const tsExtra = `<template>
  <yh-card header="Card Title">
    <template #extra>
      <yh-button type="primary" text>Action</yh-button>
    </template>
    <p>Card with extra actions.</p>
  </yh-card>
<\/template>`

const jsExtra = tsExtra

const tsShadow = `<template>
  <yh-card shadow="always" header="Always Shadow">
    <p>This card always shows shadow.</p>
  </yh-card>
  <yh-card shadow="hover" header="Hover Shadow">
    <p>This card only shows shadow on hover.</p>
  </yh-card>
  <yh-card shadow="never" header="Never Shadow">
    <p>This card never shows shadow.</p>
  </yh-card>
<\/template>`

const jsShadow = tsShadow

const tsHoverable = `<template>
  <yh-card hoverable header="Hoverable Card">
    <p>Has a lift effect on hover.</p>
  </yh-card>
<\/template>`

const jsHoverable = tsHoverable

const tsLoading = `<template>
  <div style="display: flex; gap: 16px; align-items: start;">
    <yh-card :loading="loading" header="Loading Card" style="flex: 1;">
      <p>This is the card content.</p>
    </yh-card>
    <yh-button @click="loading = !loading">Toggle Loading</yh-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const loading = ref(true)
<\/script>`.replace(/\\/g, '')

const jsLoading = tsLoading.replace('lang="ts"', '')

const tsFooter = `<template>
  <yh-card header="Card with Footer">
    <p>Card content area.</p>
    <template #footer>
      <div style="display: flex; justify-content: flex-end; gap: 8px;">
        <yh-button type="primary">Confirm</yh-button>
        <yh-button>Cancel</yh-button>
      </div>
    </template>
  </yh-card>
</template>`

const jsFooter = tsFooter

const tsSize = `<template>
  <div style="display: flex; gap: 16px;">
    <yh-card size="small" header="Small Card">
      <p>A small-sized card.</p>
    </yh-card>
    <yh-card header="Default Card">
      <p>A default-sized card.</p>
    </yh-card>
    <yh-card size="large" header="Large Card">
      <p>A large-sized card.</p>
    </yh-card>
  </div>
</template>`

const jsSize = tsSize

const tsBordered = `<template>
  <div style="background: var(--yh-bg-color-page); padding: 16px;">
    <yh-card :bordered="false" header="Borderless Card">
      <p>A card without borders.</p>
    </yh-card>
  </div>
</template>`

const jsBordered = tsBordered

// Nuxt usage example
const tsNuxt = `<template>
  <div style="max-width: 480px;">
    <!-- Card component, auto-imported -->
    <yh-card header="Nuxt in Practice">
      <template #extra>
        <yh-button type="primary" text>More</yh-button>
      </template>
      
      <p>Using YH-UI Card component in Nuxt 3 is very simple.</p>
      
      <!-- Nested components -->
      <div style="margin-top: 16px;">
        <yh-tag type="success">SSR Ready</yh-tag>
        <yh-tag type="info" style="margin-left: 8px;">Auto Import</yh-tag>
      </div>
    </yh-card>
  </div>
</template>

<script setup lang="ts">
// No need to manually import components
<\/script>`.replace(/\\/g, '')

const jsNuxt = tsNuxt.replace('lang="ts"', '')
</script>

A versatile card container for text, lists, images, paragraphs, and other content.

## Basic Usage

Set the card title with the `header` prop.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-card header="Card Title">
    <p style="margin: 0 0 8px;">Card content. This is some descriptive text.</p>
    <p style="margin: 0;">Cards can contain text, lists, images, paragraphs, etc.</p>
  </yh-card>
</DemoBlock>

## Simple Card

The title can be omitted, keeping only the content area.

<DemoBlock title="Simple Card" :ts-code="tsSimple" :js-code="jsSimple">
  <yh-card>
    <p style="margin: 0;">A simple card without a title.</p>
  </yh-card>
</DemoBlock>

## Extra Actions

Use the `#extra` slot to add action buttons on the right side of the header.

<DemoBlock title="Extra Actions" :ts-code="tsExtra" :js-code="jsExtra">
  <yh-card header="Card Title">
    <template #extra>
      <yh-button type="primary" text>Action</yh-button>
    </template>
    <p style="margin: 0;">Card with extra actions.</p>
  </yh-card>
</DemoBlock>

## Shadow

Control when the card shadow appears with the `shadow` prop.

<DemoBlock title="Shadow" :ts-code="tsShadow" :js-code="jsShadow">
  <div style="display: flex; gap: 16px; flex-wrap: wrap;">
    <yh-card shadow="always" header="Always Shadow" style="flex: 1; min-width: 200px;">
      <p style="margin: 0;">This card always shows shadow.</p>
    </yh-card>
    <yh-card shadow="hover" header="Hover Shadow" style="flex: 1; min-width: 200px;">
      <p style="margin: 0;">This card only shows shadow on hover.</p>
    </yh-card>
    <yh-card shadow="never" header="Never Shadow" style="flex: 1; min-width: 200px;">
      <p style="margin: 0;">This card never shows shadow.</p>
    </yh-card>
  </div>
</DemoBlock>

## Hover Effect

Set the `hoverable` prop to create a lift effect on hover.

<DemoBlock title="Hover Effect" :ts-code="tsHoverable" :js-code="jsHoverable">
  <yh-card hoverable header="Hoverable Card" style="max-width: 300px;">
    <p style="margin: 0;">Has a lift effect on hover.</p>
  </yh-card>
</DemoBlock>

## Loading State

Set the `loading` prop to show a skeleton loading state.

<DemoBlock title="Loading" :ts-code="tsLoading" :js-code="jsLoading">
  <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: start;">
    <yh-card :loading="loading" header="Loading Card" style="flex: 1; min-width: 250px;">
      <p style="margin: 0;">This is the card content.</p>
    </yh-card>
    <yh-button @click="loading = !loading">Toggle Loading</yh-button>
  </div>
</DemoBlock>

## Footer

Use the `#footer` slot to add footer content.

<DemoBlock title="Footer" :ts-code="tsFooter" :js-code="jsFooter">
  <yh-card header="Card with Footer" style="max-width: 400px;">
    <p style="margin: 0;">Card content area.</p>
    <template #footer>
      <div style="display: flex; justify-content: flex-end; gap: 8px;">
        <yh-button type="primary">Confirm</yh-button>
        <yh-button>Cancel</yh-button>
      </div>
    </template>
  </yh-card>
</DemoBlock>

## Sizes

Set the card size with the `size` prop.

<DemoBlock title="Sizes" :ts-code="tsSize" :js-code="jsSize">
  <div style="display: flex; gap: 16px; flex-wrap: wrap;">
    <yh-card size="small" header="Small Card" style="flex: 1; min-width: 180px;">
      <p style="margin: 0;">A small-sized card.</p>
    </yh-card>
    <yh-card header="Default Card" style="flex: 1; min-width: 180px;">
      <p style="margin: 0;">A default-sized card.</p>
    </yh-card>
    <yh-card size="large" header="Large Card" style="flex: 1; min-width: 180px;">
      <p style="margin: 0;">A large-sized card.</p>
    </yh-card>
  </div>
</DemoBlock>

## Borderless

Set `bordered` to `false` to remove the border.

<DemoBlock title="Borderless" :ts-code="tsBordered" :js-code="jsBordered">
  <div style="background: var(--yh-bg-color-page); padding: 16px;">
    <yh-card :bordered="false" header="Borderless Card">
      <p style="margin: 0;">A card without borders.</p>
    </yh-card>
  </div>
</DemoBlock>

## Use in Nuxt

The Card component fully supports Nuxt 3/4 environments. Since it is primarily used for structured layouts, server-side rendering (SSR) can pre-generate the complete DOM structure, benefiting SEO optimization and first-screen rendering performance.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="max-width: 480px;">
    <yh-card header="Nuxt in Practice">
      <template #extra>
        <yh-button type="primary" text>More</yh-button>
      </template>
      <p style="margin: 0 0 12px;">In Nuxt, the Card component and all its child components (such as Button, Tag) have built-in auto-import support.</p>
      <div style="display: flex; gap: 8px;">
        <yh-tag type="success">SSR Ready</yh-tag>
        <yh-tag type="info">Auto Import</yh-tag>
      </div>
    </yh-card>
  </div>
</DemoBlock>

**SSR Notes**:

- ✅ Header, footer, and content areas fully rendered on the server
- ✅ Shadow effects (always/hover/never) support SSR
- ✅ Skeleton loading state (loading) displays on first screen during SSR, avoiding blank screens
- ✅ Size and bordered configurations take effect via CSS class names on the server
- 💡 Interactive logic and dynamic loading state toggling recover reactivity after client-side activation (Hydration)

::: tip SEO Optimization
The HTML generated by the Card component is semantically clear. It is recommended to use appropriate heading tags (such as `h3`) in the `header` slot to further improve search engine understanding of page content.
:::

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| header | Card title | `string` | — |
| body-style | Style for the card content area | `object` | — |
| header-style | Style for the card header | `object` | — |
| shadow | When to show card shadow | `'always' \| 'hover' \| 'never'` | `'always'` |
| bordered | Whether to show border | `boolean` | `true` |
| hoverable | Whether hoverable (lift effect on hover) | `boolean` | `false` |
| size | Card size | `'small' \| 'default' \| 'large'` | `'default'` |
| loading | Whether loading (shows skeleton) | `boolean` | `false` |
| body-padding | Whether to have padding | `boolean` | `true` |

### Slots

| Slot Name | Description |
| --- | --- |
| default | Card content |
| header | Card title |
| extra | Card extra action area |
| footer | Card footer content |

## Theme Variables

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-card-bg-color` | Background color | `var(--yh-bg-color-overlay)` |
| `--yh-card-border-color` | Border color | `var(--yh-border-color-light)` |
| `--yh-card-border-radius` | Border radius | `var(--yh-border-radius-base)` |
| `--yh-card-header-padding` | Header padding | `18px 20px` |
| `--yh-card-body-padding` | Body padding | `20px` |
| `--yh-card-footer-padding` | Footer padding | `18px 20px` |
| `--yh-card-shadow` | Card shadow | `var(--yh-box-shadow-light)` |
