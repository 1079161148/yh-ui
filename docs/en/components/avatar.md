# Avatar

<script setup lang="ts">
import { ref } from 'vue'

const tsBasic = `<template>
  <div style="display: flex; gap: 20px; align-items: center;">
    <yh-avatar icon="user" />
    <yh-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    <yh-avatar>USER</yh-avatar>
  </div>
<\/template>`

const jsBasic = tsBasic

const tsSizes = `<template>
  <div style="display: flex; gap: 20px; align-items: center;">
    <yh-avatar :size="30" icon="user" />
    <yh-avatar size="small" icon="user" />
    <yh-avatar size="default" icon="user" />
    <yh-avatar size="large" icon="user" />
    <yh-avatar :size="80" icon="user" />
  </div>
<\/template>`

const jsSizes = tsSizes

const tsShapes = `<template>
  <div style="display: flex; gap: 20px; align-items: center;">
    <yh-avatar shape="circle" icon="user" />
    <yh-avatar shape="square" icon="user" />
  </div>
<\/template>`

const jsShapes = tsShapes

const tsFit = `<template>
  <div style="display: flex; gap: 20px; align-items: center;">
    <yh-avatar :size="80" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" fit="fill" />
    <yh-avatar :size="80" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" fit="contain" />
    <yh-avatar :size="80" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" fit="cover" />
    <yh-avatar :size="80" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" fit="none" />
    <yh-avatar :size="80" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" fit="scale-down" />
  </div>
<\/template>`

const jsFit = tsFit

const tsColor = `<template>
  <div style="display: flex; gap: 20px; align-items: center;">
    <yh-avatar background-color="#67C23A" icon="user" />
    <yh-avatar background-color="#E6A23C" icon="user" />
    <yh-avatar background-color="#F56C6C">YH</yh-avatar>
  </div>
<\/template>`

const jsColor = tsColor

const tsError = `<template>
  <yh-avatar src="https://invalid-url.com/avatar.png" @error="handleError">
    <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
  </yh-avatar>
</template>

<script setup lang="ts">
const handleError = () => {
  console.log('Avatar load error')
}
<\/script>`

const jsError = `<template>
  <yh-avatar src="https://invalid-url.com/avatar.png" @error="handleError">
    <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
  </yh-avatar>
</template>

<script setup>
const handleError = () => {
  console.log('Avatar load error')
}
<\/script>`

// Nuxt usage example
const tsNuxt = `<template>
  <div style="display: flex; gap: 20px; align-items: center;">
    <!-- Basic avatar, auto-imported -->
    <yh-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />

    <!-- Combined with Nuxt user state -->
    <yh-avatar :size="48" :src="userAvatar">
      {{ userInitial }}
    </yh-avatar>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// No need to manually import YhAvatar
const userName = ref('John')
const userAvatar = ref('')

const userInitial = computed(() => userName.value.charAt(0))
<\/script>`.replace(/\\\//g, '/')

const jsNuxt = tsNuxt.replace('lang="ts"', '')
</script>

Display user or thing with icons, images, or characters.

## Basic Usage

Display avatar via `icon`, `src`, or default slot.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="display: flex; gap: 20px; align-items: center;">
    <yh-avatar>
      <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 512c141.4 0 256-114.6 256-256S653.4 0 512 0 256 114.6 256 256s114.6 256 256 256zm0 128c-235.8 0-426.7 190.9-426.7 426.7 0 14.7 12 26.7 26.7 26.7h800c14.7 0 26.7-12 26.7-26.7 0-235.8-190.9-426.7-426.7-426.7z"/></svg>
    </yh-avatar>
    <yh-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    <yh-avatar>USER</yh-avatar>
  </div>
</DemoBlock>

## Sizes

Set size via `size` prop. Preset values are `small` (28px), `default` (40px), `large` (56px), or a custom pixel number.

<DemoBlock title="Sizes" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="display: flex; gap: 20px; align-items: center;">
    <yh-avatar :size="30">
      <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 512c141.4 0 256-114.6 256-256S653.4 0 512 0 256 114.6 256 256s114.6 256 256 256zm0 128c-235.8 0-426.7 190.9-426.7 426.7 0 14.7 12 26.7 26.7 26.7h800c14.7 0 26.7-12 26.7-26.7 0-235.8-190.9-426.7-426.7-426.7z"/></svg>
    </yh-avatar>
    <yh-avatar size="small">
      <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 512c141.4 0 256-114.6 256-256S653.4 0 512 0 256 114.6 256 256s114.6 256 256 256zm0 128c-235.8 0-426.7 190.9-426.7 426.7 0 14.7 12 26.7 26.7 26.7h800c14.7 0 26.7-12 26.7-26.7 0-235.8-190.9-426.7-426.7-426.7z"/></svg>
    </yh-avatar>
    <yh-avatar size="default">
      <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 512c141.4 0 256-114.6 256-256S653.4 0 512 0 256 114.6 256 256s114.6 256 256 256zm0 128c-235.8 0-426.7 190.9-426.7 426.7 0 14.7 12 26.7 26.7 26.7h800c14.7 0 26.7-12 26.7-26.7 0-235.8-190.9-426.7-426.7-426.7z"/></svg>
    </yh-avatar>
    <yh-avatar size="large">
      <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 512c141.4 0 256-114.6 256-256S653.4 0 512 0 256 114.6 256 256s114.6 256 256 256zm0 128c-235.8 0-426.7 190.9-426.7 426.7 0 14.7 12 26.7 26.7 26.7h800c14.7 0 26.7-12 26.7-26.7 0-235.8-190.9-426.7-426.7-426.7z"/></svg>
    </yh-avatar>
    <yh-avatar :size="80">
      <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 512c141.4 0 256-114.6 256-256S653.4 0 512 0 256 114.6 256 256s114.6 256 256 256zm0 128c-235.8 0-426.7 190.9-426.7 426.7 0 14.7 12 26.7 26.7 26.7h800c14.7 0 26.7-12 26.7-26.7 0-235.8-190.9-426.7-426.7-426.7z"/></svg>
    </yh-avatar>
  </div>
</DemoBlock>

## Shapes

Supports `circle` and `square` shapes.

<DemoBlock title="Shapes" :ts-code="tsShapes" :js-code="jsShapes">
  <div style="display: flex; gap: 20px; align-items: center;">
    <yh-avatar shape="circle">
      <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 512c141.4 0 256-114.6 256-256S653.4 0 512 0 256 114.6 256 256s114.6 256 256 256zm0 128c-235.8 0-426.7 190.9-426.7 426.7 0 14.7 12 26.7 26.7 26.7h800c14.7 0 26.7-12 26.7-26.7 0-235.8-190.9-426.7-426.7-426.7z"/></svg>
    </yh-avatar>
    <yh-avatar shape="square">
      <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 512c141.4 0 256-114.6 256-256S653.4 0 512 0 256 114.6 256 256s114.6 256 256 256zm0 128c-235.8 0-426.7 190.9-426.7 426.7 0 14.7 12 26.7 26.7 26.7h800c14.7 0 26.7-12 26.7-26.7 0-235.8-190.9-426.7-426.7-426.7z"/></svg>
    </yh-avatar>
  </div>
</DemoBlock>

## Image Fit

Set image fit mode via `fit` prop, consistent with CSS `object-fit`.

<DemoBlock title="Image Fit" :ts-code="tsFit" :js-code="jsFit">
  <div style="display: flex; gap: 20px; align-items: center;">
    <yh-avatar :size="80" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" fit="fill" />
    <yh-avatar :size="80" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" fit="contain" />
    <yh-avatar :size="80" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" fit="cover" />
    <yh-avatar :size="80" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" fit="none" />
    <yh-avatar :size="80" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" fit="scale-down" />
  </div>
</DemoBlock>

## Custom Color

Customize the avatar background color via `background-color` prop.

<DemoBlock title="Custom Color" :ts-code="tsColor" :js-code="jsColor">
  <div style="display: flex; gap: 20px; align-items: center;">
    <yh-avatar background-color="#67C23A">
      <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 512c141.4 0 256-114.6 256-256S653.4 0 512 0 256 114.6 256 256s114.6 256 256 256zm0 128c-235.8 0-426.7 190.9-426.7 426.7 0 14.7 12 26.7 26.7 26.7h800c14.7 0 26.7-12 26.7-26.7 0-235.8-190.9-426.7-426.7-426.7z"/></svg>
    </yh-avatar>
    <yh-avatar background-color="#E6A23C">
      <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 512c141.4 0 256-114.6 256-256S653.4 0 512 0 256 114.6 256 256s114.6 256 256 256zm0 128c-235.8 0-426.7 190.9-426.7 426.7 0 14.7 12 26.7 26.7 26.7h800c14.7 0 26.7-12 26.7-26.7 0-235.8-190.9-426.7-426.7-426.7z"/></svg>
    </yh-avatar>
    <yh-avatar background-color="#F56C6C">YH</yh-avatar>
  </div>
</DemoBlock>

## Error Handling

Handle image load error via `error` event. The default slot serves as fallback content.

<DemoBlock title="Error Handling" :ts-code="tsError" :js-code="jsError">
  <yh-avatar src="https://invalid-url.com/avatar.png">
    <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
  </yh-avatar>
</DemoBlock>

## Use in Nuxt

The Avatar component fully supports Nuxt 3/4 SSR rendering. The avatar size, shape, and image are correctly rendered on the server, ensuring complete user avatar information is presented on the first screen.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="display: flex; gap: 20px; align-items: center;">
    <yh-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    <yh-avatar :size="48">J</yh-avatar>
  </div>
</DemoBlock>

**SSR Notes**:

- ✅ Avatar size (size), shape (shape), and image fit (fit) render correctly on first load
- ✅ Custom background color (background-color) and text content supported in SSR
- ✅ Image src / srcset are included in server-rendered HTML
- 💡 Image load error fallback handling is completed after client-side activation

::: tip Nuxt Auto Import
After installing the `@yh-ui/nuxt` module, the `YhAvatar` component is auto-registered, no manual import needed.
:::

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| shape | Avatar shape | `'circle' \| 'square'` | `'circle'` |
| size | Avatar size, supports preset values or pixel number | `number \| 'large' \| 'default' \| 'small'` | `'default'` |
| src | Image URL | `string` | — |
| src-set | Image srcset for responsive loading | `string` | — |
| alt | Image alt text | `string` | — |
| fit | Image fit mode | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `'cover'` |
| icon | Icon component, displayed when no image | `string \| Component` | — |
| color | Background color (legacy API) | `string` | — |
| background-color | Background color | `string` | — |
| theme-overrides | Theme override variables | `ComponentThemeVars` | — |

### Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| error | Triggered when image fails to load | `(event: Event) => void` |

### Slots

| Slot Name | Description |
| --- | --- |
| default | Custom content (text or icon) |

## Theme Variables

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-avatar-bg-color` | Background color | `var(--yh-color-primary-light-8, #d9ecff)` |
| `--yh-avatar-text-color` | Text color | `var(--yh-color-primary, #409eff)` |
| `--yh-avatar-radius` | Square avatar border radius | `var(--yh-border-radius-base, 4px)` |
