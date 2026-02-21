# Avatar 头像

用图标、图片或字符的形式展示用户或事物。

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

## 基础用法

通过 `icon`, `src` 或默认插槽展示头像。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="display: flex; gap: 20px; align-items: center;">
    <yh-avatar>
      <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 512c141.4 0 256-114.6 256-256S653.4 0 512 0 256 114.6 256 256s114.6 256 256 256zm0 128c-235.8 0-426.7 190.9-426.7 426.7 0 14.7 12 26.7 26.7 26.7h800c14.7 0 26.7-12 26.7-26.7 0-235.8-190.9-426.7-426.7-426.7z"/></svg>
    </yh-avatar>
    <yh-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    <yh-avatar>USER</yh-avatar>
  </div>
</DemoBlock>

## 不同尺寸

通过 `size` 属性设置头像大小。

<DemoBlock title="不同尺寸" :ts-code="tsSizes" :js-code="jsSizes">
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

## 头像形状

支持 `circle` 和 `square` 两种形状。

<DemoBlock title="头像形状" :ts-code="tsShapes" :js-code="jsShapes">
  <div style="display: flex; gap: 20px; align-items: center;">
    <yh-avatar shape="circle">
      <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 512c141.4 0 256-114.6 256-256S653.4 0 512 0 256 114.6 256 256s114.6 256 256 256zm0 128c-235.8 0-426.7 190.9-426.7 426.7 0 14.7 12 26.7 26.7 26.7h800c14.7 0 26.7-12 26.7-26.7 0-235.8-190.9-426.7-426.7-426.7z"/></svg>
    </yh-avatar>
    <yh-avatar shape="square">
      <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 512c141.4 0 256-114.6 256-256S653.4 0 512 0 256 114.6 256 256s114.6 256 256 256zm0 128c-235.8 0-426.7 190.9-426.7 426.7 0 14.7 12 26.7 26.7 26.7h800c14.7 0 26.7-12 26.7-26.7 0-235.8-190.9-426.7-426.7-426.7z"/></svg>
    </yh-avatar>
  </div>
</DemoBlock>

## 加载失败

当图片加载失败时，可以通过 `error` 事件进行处理。

<DemoBlock title="加载失败" :ts-code="tsError" :js-code="jsError">
  <yh-avatar src="https://invalid-url.com/avatar.png">
    <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
  </yh-avatar>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 头像大小 | `number \| 'large' \| 'default' \| 'small'` | `'default'` |
| shape | 头像形状 | `'circle' \| 'square'` | `'circle'` |
| src | 头像图片地址 | `string` | — |
| alt | 头像图片描述 | `string` | — |
| icon | 头像图标 | `string \| Component` | — |
| background | 自定义背景色 | `string` | — |
| color | 自定义文字显色 | `string` | — |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| error | 图片加载失败时触发 | `(event: Event) => void` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义内容 (如文字或图标) |
