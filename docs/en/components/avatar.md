# Avatar

`YhAvatar` displays a user or object with an image, icon, or text fallback.

<script setup lang="ts">
const tsBasic = `<template>
  <div style="display: flex; gap: 20px; align-items: center;">
    <yh-avatar src="https://picsum.photos/seed/avatar1/200" />
    <yh-avatar>USER</yh-avatar>
    <yh-avatar>
      <svg viewBox="0 0 1024 1024" width="1em" height="1em">
        <path fill="currentColor" d="M512 512c141.4 0 256-114.6 256-256S653.4 0 512 0 256 114.6 256 256s114.6 256 256 256zm0 128c-235.8 0-426.7 190.9-426.7 426.7 0 14.7 12 26.7 26.7 26.7h800c14.7 0 26.7-12 26.7-26.7 0-235.8-190.9-426.7-426.7-426.7z"/>
      </svg>
    </yh-avatar>
  </div>
</template>`

const jsBasic = tsBasic

const tsSizes = `<template>
  <div style="display: flex; gap: 20px; align-items: center;">
    <yh-avatar :size="30">A</yh-avatar>
    <yh-avatar size="small">B</yh-avatar>
    <yh-avatar size="default">C</yh-avatar>
    <yh-avatar size="large">D</yh-avatar>
    <yh-avatar :size="80">YH</yh-avatar>
  </div>
</template>`

const jsSizes = tsSizes

const tsShapes = `<template>
  <div style="display: flex; gap: 20px; align-items: center;">
    <yh-avatar shape="circle">C</yh-avatar>
    <yh-avatar shape="square">S</yh-avatar>
  </div>
</template>`

const jsShapes = tsShapes

const tsFit = `<template>
  <div style="display: flex; gap: 20px; align-items: center;">
    <yh-avatar :size="80" src="https://picsum.photos/seed/avatar1/200" fit="fill" />
    <yh-avatar :size="80" src="https://picsum.photos/seed/avatar1/200" fit="contain" />
    <yh-avatar :size="80" src="https://picsum.photos/seed/avatar1/200" fit="cover" />
    <yh-avatar :size="80" src="https://picsum.photos/seed/avatar1/200" fit="none" />
    <yh-avatar :size="80" src="https://picsum.photos/seed/avatar1/200" fit="scale-down" />
  </div>
</template>`

const jsFit = tsFit

const tsColor = `<template>
  <div style="display: flex; gap: 20px; align-items: center;">
    <yh-avatar background-color="#67C23A">A</yh-avatar>
    <yh-avatar background-color="#E6A23C">B</yh-avatar>
    <yh-avatar background-color="#F56C6C">YH</yh-avatar>
  </div>
</template>`

const jsColor = tsColor

const tsError = `<template>
  <yh-avatar src="https://example.com/not-found.png" @error="handleError">
    Broken
  </yh-avatar>
</template>

<` + `script setup lang="ts">
const handleError = (event: Event) => {
  console.log('Avatar load error', event)
}
<` + `/script>`

const jsError = `<template>
  <yh-avatar src="https://example.com/not-found.png" @error="handleError">
    Broken
  </yh-avatar>
</template>

<` + `script setup>
const handleError = event => {
  console.log('Avatar load error', event)
}
<` + `/script>`

const tsNuxt = `<template>
  <div style="display: flex; gap: 20px; align-items: center;">
    <yh-avatar src="https://picsum.photos/seed/avatar1/200" />
    <yh-avatar :size="48">{{ userInitial }}</yh-avatar>
  </div>
</template>

<` + `script setup lang="ts">
import { computed, ref } from 'vue'

const userName = ref('John')
const userInitial = computed(() => userName.value.charAt(0))
<` + `/script>`

const jsNuxt = tsNuxt.replace('lang="ts"', '')
</script>

## Basic Usage

Display content through `src`, the `icon` prop, or the default slot.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="display: flex; gap: 20px; align-items: center;">
    <yh-avatar src="https://picsum.photos/seed/avatar1/200" />
    <yh-avatar>USER</yh-avatar>
    <yh-avatar>
      <svg viewBox="0 0 1024 1024" width="1em" height="1em">
        <path fill="currentColor" d="M512 512c141.4 0 256-114.6 256-256S653.4 0 512 0 256 114.6 256 256s114.6 256 256 256zm0 128c-235.8 0-426.7 190.9-426.7 426.7 0 14.7 12 26.7 26.7 26.7h800c14.7 0 26.7-12 26.7-26.7 0-235.8-190.9-426.7-426.7-426.7z"/>
      </svg>
    </yh-avatar>
  </div>
</DemoBlock>

## Sizes

`size` supports `small`, `default`, `large`, and custom numeric pixel values.

<DemoBlock title="Sizes" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="display: flex; gap: 20px; align-items: center;">
    <yh-avatar :size="30">A</yh-avatar>
    <yh-avatar size="small">B</yh-avatar>
    <yh-avatar size="default">C</yh-avatar>
    <yh-avatar size="large">D</yh-avatar>
    <yh-avatar :size="80">YH</yh-avatar>
  </div>
</DemoBlock>

## Shapes

Use `shape` to switch between circle and square avatars.

<DemoBlock title="Shapes" :ts-code="tsShapes" :js-code="jsShapes">
  <div style="display: flex; gap: 20px; align-items: center;">
    <yh-avatar shape="circle">C</yh-avatar>
    <yh-avatar shape="square">S</yh-avatar>
  </div>
</DemoBlock>

## Image Fit

`fit` follows native `object-fit` semantics for image content inside the avatar.

<DemoBlock title="Image Fit" :ts-code="tsFit" :js-code="jsFit">
  <div style="display: flex; gap: 20px; align-items: center;">
    <yh-avatar :size="80" src="https://picsum.photos/seed/avatar1/200" fit="fill" />
    <yh-avatar :size="80" src="https://picsum.photos/seed/avatar1/200" fit="contain" />
    <yh-avatar :size="80" src="https://picsum.photos/seed/avatar1/200" fit="cover" />
    <yh-avatar :size="80" src="https://picsum.photos/seed/avatar1/200" fit="none" />
    <yh-avatar :size="80" src="https://picsum.photos/seed/avatar1/200" fit="scale-down" />
  </div>
</DemoBlock>

## Custom Background Color

Use `background-color`, or the compatible `color` prop, to customize the avatar background.

<DemoBlock title="Custom Background Color" :ts-code="tsColor" :js-code="jsColor">
  <div style="display: flex; gap: 20px; align-items: center;">
    <yh-avatar background-color="#67C23A">A</yh-avatar>
    <yh-avatar background-color="#E6A23C">B</yh-avatar>
    <yh-avatar background-color="#F56C6C">YH</yh-avatar>
  </div>
</DemoBlock>

## Error Handling

When the image fails to load, the component emits `error`, and the default slot becomes the fallback content.

<DemoBlock title="Error Handling" :ts-code="tsError" :js-code="jsError">
  <yh-avatar src="https://example.com/not-found.png">
    Broken
  </yh-avatar>
</DemoBlock>

## Use in Nuxt

After installing `@yh-ui/nuxt`, `YhAvatar` can be used directly. Size, shape, image source, and text fallback render during SSR, while image loading and error fallback continue on the client.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="display: flex; gap: 20px; align-items: center;">
    <yh-avatar src="https://picsum.photos/seed/avatar1/200" />
    <yh-avatar :size="48">J</yh-avatar>
  </div>
</DemoBlock>

## API

### Props

| Name | Description | Type | Default |
| --- | --- | --- | --- |
| `shape` | Avatar shape | `'circle' \| 'square'` | `'circle'` |
| `size` | Avatar size | `number \| 'large' \| 'default' \| 'small'` | `'default'` |
| `src` | Image URL | `string` | `undefined` |
| `src-set` | Image `srcset` | `string` | `undefined` |
| `alt` | Image alt text | `string` | `undefined` |
| `fit` | Image fit mode | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `'cover'` |
| `icon` | Icon component or icon name used when no image is shown | `string \| Component` | `undefined` |
| `color` | Compatible background color field | `string` | `undefined` |
| `background-color` | Background color | `string` | `undefined` |
| `style` | Inline custom style | `CSSProperties` | `undefined` |
| `crossorigin` | Native image `crossorigin` attribute | `'' \| 'anonymous' \| 'use-credentials'` | `'anonymous'` |
| `theme-overrides` | Component-level theme overrides | `ComponentThemeVars` | `undefined` |

### Events

| Name | Description | Parameters |
| --- | --- | --- |
| `error` | Triggered when the image fails to load | `(event: Event) => void` |

### Slots

| Name | Description |
| --- | --- |
| `default` | Custom avatar content, such as text or an icon |

### Expose

This component does not expose public instance methods or properties.

### Type Exports

| Name | Description |
| --- | --- |
| `YhAvatarProps` | Props type for `YhAvatar` |
| `YhAvatarEmits` | Emits type for `YhAvatar` |
| `YhAvatarSlots` | Slots type for `YhAvatar` |
| `YhAvatarShape` | Shape union type |
| `YhAvatarSize` | Size union type |
| `YhAvatarFit` | Image fit union type |
| `YhAvatarInstance` | Component instance type |

### Theme Variables

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-avatar-bg-color` | Avatar background color | `var(--yh-color-primary-light-8, #d9ecff)` |
| `--yh-avatar-text-color` | Avatar text color | `var(--yh-color-primary, #409eff)` |
| `--yh-avatar-radius` | Border radius for square avatars | `var(--yh-border-radius-base, 4px)` |
