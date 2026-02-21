# Typography

<script setup lang="ts">
import { ref } from 'vue'

const tsBasicTitle = `<template>
  <yh-typography-title :level="1">Heading h1</yh-typography-title>
  <yh-typography-title :level="2">Heading h2</yh-typography-title>
  <yh-typography-title :level="3">Heading h3</yh-typography-title>
  <yh-typography-title :level="4">Heading h4</yh-typography-title>
  <yh-typography-title :level="5">Heading h5</yh-typography-title>
  <yh-typography-title :level="6">Heading h6</yh-typography-title>
<\/template>`

const jsBasicTitle = tsBasicTitle

const tsTextType = `<template>
  <div style="display: flex; flex-wrap: wrap; gap: 16px;">
    <yh-typography-text>Default Text</yh-typography-text>
    <yh-typography-text type="primary">Primary</yh-typography-text>
    <yh-typography-text type="success">Success</yh-typography-text>
    <yh-typography-text type="warning">Warning</yh-typography-text>
    <yh-typography-text type="danger">Danger</yh-typography-text>
    <yh-typography-text type="info">Info</yh-typography-text>
    <yh-typography-text type="secondary">Secondary</yh-typography-text>
  </div>
<\/template>`

const jsTextType = tsTextType

const tsTextDecoration = `<template>
  <div style="display: flex; flex-wrap: wrap; gap: 16px;">
    <yh-typography-text bold>Bold Text</yh-typography-text>
    <yh-typography-text italic>Italic Text</yh-typography-text>
    <yh-typography-text underline>Underline Text</yh-typography-text>
    <yh-typography-text delete>Strikethrough Text</yh-typography-text>
    <yh-typography-text mark>Marked Text</yh-typography-text>
    <yh-typography-text code>Code Style</yh-typography-text>
    <yh-typography-text keyboard>Keyboard Style</yh-typography-text>
  </div>
<\/template>`

const jsTextDecoration = tsTextDecoration

const tsTextSize = `<template>
  <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: baseline;">
    <yh-typography-text size="small">Small Text</yh-typography-text>
    <yh-typography-text size="default">Default Text</yh-typography-text>
    <yh-typography-text size="large">Large Text</yh-typography-text>
  </div>
<\/template>`

const jsTextSize = tsTextSize

const tsParagraph = `<template>
  <yh-typography-paragraph>
    YH-UI is a modern UI component library for Vue 3, providing rich components and utilities.
    With Composition API and strong TypeScript support, it offers an ultimate development experience.
  </yh-typography-paragraph>
  <yh-typography-paragraph type="secondary">
    This paragraph uses the secondary color type, suitable for auxiliary descriptions.
  </yh-typography-paragraph>
<\/template>`

const jsParagraph = tsParagraph

const tsLink = `<template>
  <div style="display: flex; flex-wrap: wrap; gap: 16px;">
    <yh-typography-link href="https://github.com" target="_blank">Default Link</yh-typography-link>
    <yh-typography-link href="#" type="success">Success Link</yh-typography-link>
    <yh-typography-link href="#" type="warning">Warning Link</yh-typography-link>
    <yh-typography-link href="#" type="danger">Danger Link</yh-typography-link>
    <yh-typography-link href="#" underline>Underline Link</yh-typography-link>
    <yh-typography-link href="#" disabled>Disabled Link</yh-typography-link>
  </div>
<\/template>`

const jsLink = tsLink

const tsEllipsis = `<template>
  <yh-typography-title :level="5" ellipsis>
    This is a very long title. It will be truncated with an ellipsis when the container width is insufficient.
  </yh-typography-title>
  <yh-typography-paragraph :ellipsis="2">
    This is a multi-line paragraph. By setting ellipsis to a number, you can control the number of lines displayed.
    When the content exceeds the specified lines, it will automatically show an ellipsis. This is very useful
    in list pages and card components to effectively control the display area.
  </yh-typography-paragraph>
<\/template>`

const jsEllipsis = tsEllipsis

// Nuxt usage example
const tsNuxt = `<template>
  <div>
    <div style="margin-bottom: 16px;">
      <yh-button size="small" @click="pending = !pending">
        {{ pending ? 'Switch to: Loaded' : 'Switch to: Loading' }}
      </yh-button>
    </div>

    <yh-typography-title :level="2">Welcome to YH-UI</yh-typography-title>

    <yh-typography-paragraph type="secondary">
      A modern Vue 3 component library with full Nuxt SSR support.
    </yh-typography-paragraph>

    <!-- Combine with Nuxt async loading state demonstration -->
    <yh-typography-text v-if="pending" type="info">Loading...</yh-typography-text>
    <yh-typography-paragraph v-else>
      YH-UI provides rich components to help quickly build modern web applications.
    </yh-typography-paragraph>

    <yh-typography-link href="/about" type="primary">Learn More</yh-typography-link>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// In a real Nuxt app, pending usually comes from useAsyncData or useFetch
// const { pending } = useFetch(...)
const pending = ref(false)
<\/script>`

const jsNuxt = tsNuxt
  .replace('lang="ts"', '')
  .replace('<{ content: string }>', '')

// Demo pending state toggle
const pending = ref(false)
</script>

Used to display titles, paragraphs, text, links, and other typographic content.

## Heading Levels

Use the `level` prop to define the heading level, supporting h1 - h6.

<DemoBlock title="Heading Levels" :ts-code="tsBasicTitle" :js-code="jsBasicTitle">
  <yh-typography-title :level="1">Heading h1</yh-typography-title>
  <yh-typography-title :level="2">Heading h2</yh-typography-title>
  <yh-typography-title :level="3">Heading h3</yh-typography-title>
  <yh-typography-title :level="4">Heading h4</yh-typography-title>
  <yh-typography-title :level="5">Heading h5</yh-typography-title>
  <yh-typography-title :level="6">Heading h6</yh-typography-title>
</DemoBlock>

## Text Types

Use the `type` prop to define the semantic color of the text.

<DemoBlock title="Text Types" :ts-code="tsTextType" :js-code="jsTextType">
  <div style="display: flex; flex-wrap: wrap; gap: 16px;">
    <yh-typography-text>Default Text</yh-typography-text>
    <yh-typography-text type="primary">Primary</yh-typography-text>
    <yh-typography-text type="success">Success</yh-typography-text>
    <yh-typography-text type="warning">Warning</yh-typography-text>
    <yh-typography-text type="danger">Danger</yh-typography-text>
    <yh-typography-text type="info">Info</yh-typography-text>
    <yh-typography-text type="secondary">Secondary</yh-typography-text>
  </div>
</DemoBlock>

## Text Decorations

Control text styles through props like `bold`, `italic`, `underline`, `delete`, `mark`, `code`, and `keyboard`.

<DemoBlock title="Text Decorations" :ts-code="tsTextDecoration" :js-code="jsTextDecoration">
  <div style="display: flex; flex-wrap: wrap; gap: 16px;">
    <yh-typography-text bold>Bold Text</yh-typography-text>
    <yh-typography-text italic>Italic Text</yh-typography-text>
    <yh-typography-text underline>Underline Text</yh-typography-text>
    <yh-typography-text delete>Strikethrough Text</yh-typography-text>
    <yh-typography-text mark>Marked Text</yh-typography-text>
    <yh-typography-text code>Code Style</yh-typography-text>
    <yh-typography-text keyboard>Keyboard Style</yh-typography-text>
  </div>
</DemoBlock>

## Text Sizes

Use the `size` prop to set the font size.

<DemoBlock title="Text Sizes" :ts-code="tsTextSize" :js-code="jsTextSize">
  <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: baseline;">
    <yh-typography-text size="small">Small Text</yh-typography-text>
    <yh-typography-text size="default">Default Text</yh-typography-text>
    <yh-typography-text size="large">Large Text</yh-typography-text>
  </div>
</DemoBlock>

## Paragraph

The Paragraph component supports `type` semantic colors and `align` alignment.

<DemoBlock title="Paragraph" :ts-code="tsParagraph" :js-code="jsParagraph">
  <yh-typography-paragraph>
    YH-UI is a modern UI component library for Vue 3, providing rich components and utilities.
    With Composition API and strong TypeScript support, it offers an ultimate development experience.
  </yh-typography-paragraph>
  <yh-typography-paragraph type="secondary">
    This paragraph uses the secondary color type, suitable for auxiliary descriptions.
  </yh-typography-paragraph>
</DemoBlock>

## Link

The Link component supports props like `href`, `target`, `type`, `underline`, and `disabled`.

<DemoBlock title="Link" :ts-code="tsLink" :js-code="jsLink">
  <div style="display: flex; flex-wrap: wrap; gap: 16px;">
    <yh-typography-link href="https://github.com" target="_blank">Default Link</yh-typography-link>
    <yh-typography-link href="#" type="success">Success Link</yh-typography-link>
    <yh-typography-link href="#" type="warning">Warning Link</yh-typography-link>
    <yh-typography-link href="#" type="danger">Danger Link</yh-typography-link>
    <yh-typography-link href="#" underline>Underline Link</yh-typography-link>
    <yh-typography-link href="#" disabled>Disabled Link</yh-typography-link>
  </div>
</DemoBlock>

## Ellipsis

Titles and paragraphs support the `ellipsis` prop. Set to boolean for Titles (single-line) and numbers for Paragraphs (multi-line).

<DemoBlock title="Ellipsis" :ts-code="tsEllipsis" :js-code="jsEllipsis">
  <yh-typography-title :level="5" ellipsis style="max-width: 400px;">
    This is a very long title. It will be truncated with an ellipsis when the container width is insufficient.
  </yh-typography-title>
  <yh-typography-paragraph :ellipsis="2" style="max-width: 400px;">
    This is a multi-line paragraph. By setting ellipsis to a number, you can control the number of lines displayed.
    When the content exceeds the specified lines, it will automatically show an ellipsis. This is very useful
    in list pages and card components to effectively control the display area.
  </yh-typography-paragraph>
</DemoBlock>

## Use in Nuxt

Typography fully supports Nuxt 3/4 SSR rendering. Components are auto-imported in Nuxt projects, no manual registration needed. The following example demonstrates async loading state with `useAsyncData`.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div>
    <div style="margin-bottom: 16px;">
      <yh-button size="small" @click="pending = !pending">
        {{ pending ? 'Switch to: Loaded' : 'Switch to: Loading' }}
      </yh-button>
    </div>
    <yh-typography-title :level="2">Welcome to YH-UI</yh-typography-title>
    <yh-typography-paragraph type="secondary">
      A modern Vue 3 component library with full Nuxt SSR support.
    </yh-typography-paragraph>
    <yh-typography-text v-if="pending" type="info">Loading...</yh-typography-text>
    <yh-typography-paragraph v-else>
      YH-UI provides rich components to help quickly build modern web applications.
    </yh-typography-paragraph>
    <yh-typography-link href="/about" type="primary">Learn More</yh-typography-link>
  </div>
</DemoBlock>

**SSR Notes**:

- ✅ All Props and styles fully supported
- ✅ Semantic tags (h1-h6, p, span, a) render perfectly
- ✅ Slot content fully rendered
- ✅ Ellipsis styles correctly output
- ✅ Text decoration, type colors, and other states work normally

::: tip SSR Safety
All Typography sub-components have passed complete SSR tests, ensuring that server-side and client-side rendering are completely consistent with no Hydration errors.
:::

## API

### Typography.Title Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| level | Heading level | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | `1` |
| type | Text type | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'secondary'` | — |
| bold | Bold | `boolean` | `true` |
| delete | Strikethrough | `boolean` | `false` |
| underline | Underline | `boolean` | `false` |
| italic | Italic | `boolean` | `false` |
| mark | Highlight mark | `boolean` | `false` |
| code | Code style | `boolean` | `false` |
| ellipsis | Ellipsis | `boolean` | `false` |
| tag | Custom tag name | `string` | — |
| themeOverrides | Theme overrides | `ComponentThemeVars` | — |

### Typography.Text Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| type | Text type | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'secondary'` | — |
| size | Font size | `'small' \| 'default' \| 'large'` | — |
| bold | Bold | `boolean` | `false` |
| delete | Strikethrough | `boolean` | `false` |
| underline | Underline | `boolean` | `false` |
| italic | Italic | `boolean` | `false` |
| mark | Mark | `boolean` | `false` |
| code | Code style | `boolean` | `false` |
| keyboard | Keyboard style | `boolean` | `false` |
| ellipsis | Ellipsis | `boolean` | `false` |
| tag | Custom tag name | `string` | `'span'` |
| themeOverrides | Theme overrides | `ComponentThemeVars` | — |

### Typography.Paragraph Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| type | Text type | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'secondary'` | — |
| align | Alignment | `'left' \| 'center' \| 'right' \| 'justify'` | — |
| spacing | Paragraph spacing | `'compact' \| 'default' \| 'loose'` | `'default'` |
| bold | Bold | `boolean` | `false` |
| delete | Strikethrough | `boolean` | `false` |
| italic | Italic | `boolean` | `false` |
| mark | Mark | `boolean` | `false` |
| ellipsis | Ellipsis (boolean=single, number=multi) | `boolean \| number` | `false` |
| themeOverrides | Theme overrides | `ComponentThemeVars` | — |

### Typography.Link Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| href | Link URL | `string` | — |
| target | Target | `'_blank' \| '_self' \| '_parent' \| '_top'` | `'_self'` |
| type | Link type | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | — |
| underline | Underline | `boolean` | `false` |
| disabled | Disabled | `boolean` | `false` |
| themeOverrides | Theme overrides | `ComponentThemeVars` | — |

### Slots

All Typography sub-components support the `default` slot.

## Theme Variables

Typography supports customizing local styles by overriding the following CSS variables:

| Variable Name | Description | Default |
| --- | --- | --- |
| `--yh-typography-title-color` | Title color | `var(--yh-text-color-primary, #303133)` |
| `--yh-typography-title-weight` | Title font weight | `600` |
| `--yh-typography-h1-size` | h1 size | `32px` |
| `--yh-typography-h2-size` | h2 size | `28px` |
| `--yh-typography-h3-size` | h3 size | `24px` |
| `--yh-typography-h4-size` | h4 size | `20px` |
| `--yh-typography-h5-size` | h5 size | `16px` |
| `--yh-typography-h6-size` | h6 size | `14px` |
| `--yh-typography-text-color` | Text color | `var(--yh-text-color-regular, #606266)` |
| `--yh-typography-text-size` | Text size | `14px` |
| `--yh-typography-line-height` | Line height | `1.5` |
| `--yh-typography-paragraph-line-height` | Paragraph line height | `1.8` |
| `--yh-typography-link-color` | Link color | `var(--yh-color-primary, #409eff)` |
| `--yh-typography-link-hover-color` | Link hover color | `var(--yh-color-primary-light-3, #79bbff)` |
| `--yh-typography-mark-bg` | Mark background color | `#ffe58f` |
| `--yh-font-family-monospace` | Monospace font | `'SFMono-Regular', Consolas, monospace` |
