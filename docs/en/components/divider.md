# Divider

A divider line to separate content.

## Basic Usage

Separate paragraphs of text in different sections.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div>
    <p>Youth is a common name, it is happy and beautiful, but it is also full of hard training.</p>
    <yh-divider />
    <p>The white sun sets behind the mountain, the Yellow River flows into the sea. To see a thousand miles, go up another level.</p>
    <yh-divider />
    <p>If you don't work hard when you are young, you will be sorry when you are old.</p>
  </div>
</DemoBlock>

## Custom Content

You can customize the text content on the divider line.

<DemoBlock title="Custom Content" :ts-code="tsContent" :js-code="jsContent">
  <div>
    <p>Rain falls in the old hometown, the grass and trees are deep, I heard you still guard the lonely city.</p>
    <yh-divider content-position="left">Left Text</yh-divider>
    <p>The sound of the shepherd's flute in the suburbs, falling in that wild village.</p>
    <yh-divider>Center Text</yh-divider>
    <p>Fate takes root and sprouts in us.</p>
    <yh-divider content-position="right">Right Text</yh-divider>
    <p>Listening to the rain at Jialan Temple, looking forward to eternity.</p>
  </div>
</DemoBlock>

## Vertical Divider

Use `direction="vertical"` to create a vertical divider.

<DemoBlock title="Vertical Divider" :ts-code="tsVertical" :js-code="jsVertical">
  <div>
    <span>Rain</span>
    <yh-divider direction="vertical" />
    <span>Falls</span>
    <yh-divider direction="vertical" />
    <span>Deep</span>
  </div>
</DemoBlock>

## Dashed Line

Set `border-style="dashed"` to present a dashed line.

<DemoBlock title="Dashed Line" :ts-code="tsDashed" :js-code="jsDashed">
  <div>
    <p>Content Area</p>
    <yh-divider border-style="dashed" />
    <p>Content Area</p>
    <yh-divider border-style="dotted">Dotted Line</yh-divider>
    <p>Content Area</p>
  </div>
</DemoBlock>

## Custom Color and Thickness

Use `color` and `border-width` attributes to customize the color and thickness of the divider.

<DemoBlock title="Custom Color and Thickness" :ts-code="tsCustom" :js-code="jsCustom">
  <div>
    <p>Default Style</p>
    <yh-divider />
    <p>Custom Color</p>
    <yh-divider color="#409eff" />
    <p>Custom Thickness (2px)</p>
    <yh-divider :border-width="2" color="#67c23a" />
    <p>Thick Line + Dashed</p>
    <yh-divider :border-width="3" color="#e6a23c" border-style="dashed" />
    <p>Custom Divider with Text</p>
    <yh-divider color="#f56c6c" :border-width="2">Important Split</yh-divider>
  </div>
</DemoBlock>

## Use in Nuxt

The Divider component fully supports Nuxt 3/4 environments. As a purely presentational component, its HTML structure is generated directly on the server, achieving perfect visual separation on the first screen with inline or external stylesheets.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div>
    <p style="margin: 0; color: var(--yh-text-color-secondary); font-size: 14px;">YH-UI runs extremely smoothly in Nuxt.</p>
    <yh-divider border-style="dashed">Nuxt SSR</yh-divider>
    <div style="display: flex; align-items: center; font-size: 14px; color: var(--yh-text-color-primary);">
      <span>Component 1</span>
      <yh-divider direction="vertical" border-width="2" color="var(--yh-color-primary)" />
      <span>Component 2</span>
      <yh-divider direction="vertical" border-width="2" color="var(--yh-color-success)" />
      <span>Component 3</span>
    </div>
  </div>
</DemoBlock>

**SSR Notes**:

- ✅ Horizontal and vertical directions are generated correctly on the server.
- ✅ Content position is correctly positioned during the SSR phase.
- ✅ Dashed/dotted styles and custom thickness take effect on the server via styles.
- ✅ Auto-import feature makes the development experience more pleasant.

::: tip Performance Tip
Since the Divider component has a minimalist structure, it generates almost no extra JS payload in SSR scenarios, making it ideal for content-heavy Nuxt pages that prioritize loading speed.
:::

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| direction | Divider direction | `'horizontal' \| 'vertical'` | `'horizontal'` |
| content-position | Content position | `'left' \| 'center' \| 'right'` | `'center'` |
| border-style | Divider border style | `'solid' \| 'dashed' \| 'dotted' \| 'double'` | `'solid'` |
| border-width | Divider border width | `string \| number` | `1px` |
| color | Divider color | `string` | — |

### Slots

| Slot Name | Description |
| --- | --- |
| default | Content text of the divider |

### Theme Variables

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-divider-border-color` | Divider border color | `var(--yh-border-color-lighter)` |
| `--yh-divider-border-width` | Divider border width | `1px` |
| `--yh-divider-border-style` | Divider border style | `solid` |
| `--yh-divider-margin-horizontal` | Horizontal margin | `24px 0` |
| `--yh-divider-margin-vertical` | Vertical margin | `0 8px` |
| `--yh-divider-text-color` | Content text color | `var(--yh-text-color-primary)` |

<script setup lang="ts">
const tsBasic = `
<template>
  <div>
    <p>Youth is a common name, it is happy and beautiful, but it is also full of hard training.</p>
    <yh-divider />
    <p>The white sun sets behind the mountain, the Yellow River flows into the sea. To see a thousand miles, go up another level.</p>
    <yh-divider />
    <p>If you don't work hard when you are young, you will be sorry when you are old.</p>
  </div>
</template>
`.trim()
const jsBasic = tsBasic

const tsContent = `
<template>
  <div>
    <p>Rain falls in the old hometown, the grass and trees are deep, I heard you still guard the lonely city.</p>
    <yh-divider content-position="left">Left Text</yh-divider>
    <p>The sound of the shepherd's flute in the suburbs, falling in that wild village.</p>
    <yh-divider>Center Text</yh-divider>
    <p>Fate takes root and sprouts in us.</p>
    <yh-divider content-position="right">Right Text</yh-divider>
    <p>Listening to the rain at Jialan Temple, looking forward to eternity.</p>
  </div>
</template>
`.trim()
const jsContent = tsContent

const tsVertical = `
<template>
  <div>
    <span>Rain</span>
    <yh-divider direction="vertical" />
    <span>Falls</span>
    <yh-divider direction="vertical" />
    <span>Deep</span>
  </div>
</template>
`.trim()
const jsVertical = tsVertical

const tsDashed = `
<template>
  <div>
    <p>Content Area</p>
    <yh-divider border-style="dashed" />
    <p>Content Area</p>
    <yh-divider border-style="dotted">Dotted Line</yh-divider>
    <p>Content Area</p>
  </div>
</template>
`.trim()
const jsDashed = tsDashed

const tsCustom = `
<template>
  <div>
    <p>Default Style</p>
    <yh-divider />
    <p>Custom Color</p>
    <yh-divider color="#409eff" />
    <p>Custom Thickness (2px)</p>
    <yh-divider :border-width="2" color="#67c23a" />
    <p>Thick Line + Dashed</p>
    <yh-divider :border-width="3" color="#e6a23c" border-style="dashed" />
    <p>Custom Divider with Text</p>
    <yh-divider color="#f56c6c" :border-width="2">Important Split</yh-divider>
  </div>
</template>
`.trim()
const jsCustom = tsCustom

// Nuxt usage example
const tsNuxt = `<template>
  <div>
    <p style="margin: 0; color: var(--yh-text-color-secondary); font-size: 14px;">YH-UI runs extremely smoothly in Nuxt.</p>
    <yh-divider border-style="dashed">Nuxt SSR</yh-divider>
    <div style="display: flex; align-items: center; font-size: 14px; color: var(--yh-text-color-primary);">
      <span>Component 1</span>
      <yh-divider direction="vertical" border-width="2" color="var(--yh-color-primary)" />
      <span>Component 2</span>
      <yh-divider direction="vertical" border-width="2" color="var(--yh-color-success)" />
      <span>Component 3</span>
    </div>
  </div>
</template>

<script setup lang="ts">
// Auto-imported, no config needed
<\/script>`.replace(/\\/g, '')

const jsNuxt = tsNuxt.replace('lang="ts"', '')
</script>
