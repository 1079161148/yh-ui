# Avatar

Display user or thing with icons, images, or characters.

<script setup lang="ts">
import { ref } from 'vue'

const tsBasic = `<template>
  <div style="display: flex; gap: 20px; align-items: center;">
    <yh-avatar icon="user" />
    <yh-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    <yh-avatar>USER</yh-avatar>
  </div>
</template>`

const jsBasic = tsBasic

const tsSizes = `<template>
  <div style="display: flex; gap: 20px; align-items: center;">
    <yh-avatar :size="30" icon="user" />
    <yh-avatar size="small" icon="user" />
    <yh-avatar size="default" icon="user" />
    <yh-avatar size="large" icon="user" />
    <yh-avatar :size="80" icon="user" />
  </div>
</template>`

const jsSizes = tsSizes

const tsShapes = `<template>
  <div style="display: flex; gap: 20px; align-items: center;">
    <yh-avatar shape="circle" icon="user" />
    <yh-avatar shape="square" icon="user" />
  </div>
</template>`

const jsShapes = tsShapes

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

const jsError = tsError

</script>

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

Set size via `size` prop.

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

Supports `circle` and `square`.

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

## Error Handling

Handle image load error via `error` event.

<DemoBlock title="Error Handling" :ts-code="tsError" :js-code="jsError">
  <yh-avatar src="https://invalid-url.com/avatar.png">
    <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
  </yh-avatar>
</DemoBlock>

## API

### Props

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| size | Avatar size | `number \| 'large' \| 'default' \| 'small'` | `'default'` |
| shape | Avatar shape | `'circle' \| 'square'` | `'circle'` |
| src | Image URL | `string` | — |
| alt | Alternate text | `string` | — |
| icon | Icon | `string \| Component` | — |
| background | Custom background color | `string` | — |
| color | Custom text color | `string` | — |

### Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| error | Triggered when image loads failed | `(event: Event) => void` |

### Slots

| Slot Name | Description |
| --- | --- |
| default | Custom content (text or icon) |
