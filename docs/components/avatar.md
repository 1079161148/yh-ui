# Avatar 头像

`YhAvatar` 用于通过图片、图标或文本占位内容展示用户或对象头像。

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
    失效
  </yh-avatar>
</template>

<` + `script setup lang="ts">
const handleError = (event: Event) => {
  console.log('Avatar load error', event)
}
<` + `/script>`

const jsError = `<template>
  <yh-avatar src="https://example.com/not-found.png" @error="handleError">
    失效
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

const userName = ref('张三')
const userInitial = computed(() => userName.value.charAt(0))
<` + `/script>`

const jsNuxt = tsNuxt.replace('lang="ts"', '')
</script>

## 基础用法

通过 `src`、`icon` 或默认插槽展示头像内容。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
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

## 不同尺寸

`size` 支持 `small`、默认、`large`，也支持直接传入数字像素值。

<DemoBlock title="不同尺寸" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="display: flex; gap: 20px; align-items: center;">
    <yh-avatar :size="30">A</yh-avatar>
    <yh-avatar size="small">B</yh-avatar>
    <yh-avatar size="default">C</yh-avatar>
    <yh-avatar size="large">D</yh-avatar>
    <yh-avatar :size="80">YH</yh-avatar>
  </div>
</DemoBlock>

## 头像形状

通过 `shape` 在圆形和方形头像之间切换。

<DemoBlock title="头像形状" :ts-code="tsShapes" :js-code="jsShapes">
  <div style="display: flex; gap: 20px; align-items: center;">
    <yh-avatar shape="circle">C</yh-avatar>
    <yh-avatar shape="square">S</yh-avatar>
  </div>
</DemoBlock>

## 图片适配

`fit` 与原生 `object-fit` 语义一致，用于控制头像中的图片裁剪方式。

<DemoBlock title="图片适配" :ts-code="tsFit" :js-code="jsFit">
  <div style="display: flex; gap: 20px; align-items: center;">
    <yh-avatar :size="80" src="https://picsum.photos/seed/avatar1/200" fit="fill" />
    <yh-avatar :size="80" src="https://picsum.photos/seed/avatar1/200" fit="contain" />
    <yh-avatar :size="80" src="https://picsum.photos/seed/avatar1/200" fit="cover" />
    <yh-avatar :size="80" src="https://picsum.photos/seed/avatar1/200" fit="none" />
    <yh-avatar :size="80" src="https://picsum.photos/seed/avatar1/200" fit="scale-down" />
  </div>
</DemoBlock>

## 自定义背景色

可以通过 `background-color`，或兼容字段 `color`，自定义头像背景色。

<DemoBlock title="自定义背景色" :ts-code="tsColor" :js-code="jsColor">
  <div style="display: flex; gap: 20px; align-items: center;">
    <yh-avatar background-color="#67C23A">A</yh-avatar>
    <yh-avatar background-color="#E6A23C">B</yh-avatar>
    <yh-avatar background-color="#F56C6C">YH</yh-avatar>
  </div>
</DemoBlock>

## 加载失败处理

当图片加载失败时，组件会触发 `error` 事件，并回退到默认插槽内容。

<DemoBlock title="加载失败处理" :ts-code="tsError" :js-code="jsError">
  <yh-avatar src="https://example.com/not-found.png">
    失效
  </yh-avatar>
</DemoBlock>

## 在 Nuxt 中使用

接入 `@yh-ui/nuxt` 后，可直接使用 `YhAvatar`。头像尺寸、形状、图片地址和文本占位内容都可以参与 SSR 渲染，图片加载与失败回退逻辑会在客户端继续执行。

<DemoBlock title="在 Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="display: flex; gap: 20px; align-items: center;">
    <yh-avatar src="https://picsum.photos/seed/avatar1/200" />
    <yh-avatar :size="48">张</yh-avatar>
  </div>
</DemoBlock>

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `shape` | 头像形状 | `'circle' \| 'square'` | `'circle'` |
| `size` | 头像尺寸 | `number \| 'large' \| 'default' \| 'small'` | `'default'` |
| `src` | 图片地址 | `string` | `undefined` |
| `src-set` | 图片 `srcset` | `string` | `undefined` |
| `alt` | 图片替代文本 | `string` | `undefined` |
| `fit` | 图片适配方式 | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `'cover'` |
| `icon` | 无图片时显示的图标组件或图标名 | `string \| Component` | `undefined` |
| `color` | 兼容字段，设置头像背景色 | `string` | `undefined` |
| `background-color` | 头像背景色 | `string` | `undefined` |
| `style` | 内联自定义样式 | `CSSProperties` | `undefined` |
| `crossorigin` | 原生图片 `crossorigin` 属性 | `'' \| 'anonymous' \| 'use-credentials'` | `'anonymous'` |
| `theme-overrides` | 组件级主题覆盖 | `ComponentThemeVars` | `undefined` |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| `error` | 图片加载失败时触发 | `(event: Event) => void` |

### Slots

| 名称 | 说明 |
| --- | --- |
| `default` | 自定义头像内容，可放文本或图标 |

### Expose

当前组件未暴露公开实例方法或属性。

### 类型导出

| 名称 | 说明 |
| --- | --- |
| `YhAvatarProps` | `YhAvatar` 的 props 类型 |
| `YhAvatarEmits` | `YhAvatar` 的 emits 类型 |
| `YhAvatarSlots` | `YhAvatar` 的 slots 类型 |
| `YhAvatarShape` | 头像形状联合类型 |
| `YhAvatarSize` | 头像尺寸联合类型 |
| `YhAvatarFit` | 图片适配联合类型 |
| `YhAvatarInstance` | 组件实例类型 |

### 主题变量

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-avatar-bg-color` | 头像背景色 | `var(--yh-color-primary-light-8, #d9ecff)` |
| `--yh-avatar-text-color` | 头像文字颜色 | `var(--yh-color-primary, #409eff)` |
| `--yh-avatar-radius` | 方形头像圆角 | `var(--yh-border-radius-base, 4px)` |
