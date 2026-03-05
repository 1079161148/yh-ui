# Avatar 头像

<script setup lang="ts">
import { ref } from 'vue'

const tsBasic = `<template>
  <div style="display: flex; gap: 20px; align-items: center;">
    <yh-avatar icon="user" />
    <yh-avatar src="https://picsum.photos/seed/avatar1/200" />
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
    <yh-avatar :size="80" src="https://picsum.photos/seed/avatar1/200" fit="fill" />
    <yh-avatar :size="80" src="https://picsum.photos/seed/avatar1/200" fit="contain" />
    <yh-avatar :size="80" src="https://picsum.photos/seed/avatar1/200" fit="cover" />
    <yh-avatar :size="80" src="https://picsum.photos/seed/avatar1/200" fit="none" />
    <yh-avatar :size="80" src="https://picsum.photos/seed/avatar1/200" fit="scale-down" />
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
  <yh-avatar src="https://picsum.photos/seed/error/200" @error="handleError">
    <img src="https://picsum.photos/seed/avatar2/200" />
  </yh-avatar>
</template>

<script setup lang="ts">
const handleError = () => {
  console.log('Avatar load error')
}
<\/script>`

const jsError = `<template>
  <yh-avatar src="https://picsum.photos/seed/error/200" @error="handleError">
    <img src="https://picsum.photos/seed/avatar2/200" />
  </yh-avatar>
</template>

<script setup>
const handleError = () => {
  console.log('Avatar load error')
}
<\/script>`

// Nuxt 使用示例
const tsNuxt = `<template>
  <div style="display: flex; gap: 20px; align-items: center;">
    <!-- 基础头像，自动导入 -->
    <yh-avatar src="https://picsum.photos/seed/avatar1/200" />

    <!-- 结合 Nuxt 用户状态 -->
    <yh-avatar :size="48" :src="userAvatar">
      {{ userInitial }}
    </yh-avatar>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// 无需手动导入 YhAvatar
const userName = ref('张三')
const userAvatar = ref('')

const userInitial = computed(() => userName.value.charAt(0))
<\/script>`.replace(/\\\//g, '/')

const jsNuxt = tsNuxt.replace('lang="ts"', '').replace(/import { computed } from 'vue'/, "import { computed } from 'vue'")
</script>

用图标、图片或字符的形式展示用户或事物。

## 基础用法

通过 `icon`, `src` 或默认插槽展示头像。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="display: flex; gap: 20px; align-items: center;">
    <yh-avatar>
      <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 512c141.4 0 256-114.6 256-256S653.4 0 512 0 256 114.6 256 256s114.6 256 256 256zm0 128c-235.8 0-426.7 190.9-426.7 426.7 0 14.7 12 26.7 26.7 26.7h800c14.7 0 26.7-12 26.7-26.7 0-235.8-190.9-426.7-426.7-426.7z"/></svg>
    </yh-avatar>
    <yh-avatar src="https://picsum.photos/seed/avatar1/200" />
    <yh-avatar>USER</yh-avatar>
  </div>
</DemoBlock>

## 不同尺寸

通过 `size` 属性设置头像大小，支持预设值 `small` (28px)、`default` (40px)、`large` (56px) 或自定义像素数值。

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

## 图片适配

通过 `fit` 属性设置图片在头像中的适配方式，与 CSS `object-fit` 一致。

<DemoBlock title="图片适配" :ts-code="tsFit" :js-code="jsFit">
  <div style="display: flex; gap: 20px; align-items: center;">
    <yh-avatar :size="80" src="https://picsum.photos/seed/avatar1/200" fit="fill" />
    <yh-avatar :size="80" src="https://picsum.photos/seed/avatar1/200" fit="contain" />
    <yh-avatar :size="80" src="https://picsum.photos/seed/avatar1/200" fit="cover" />
    <yh-avatar :size="80" src="https://picsum.photos/seed/avatar1/200" fit="none" />
    <yh-avatar :size="80" src="https://picsum.photos/seed/avatar1/200" fit="scale-down" />
  </div>
</DemoBlock>

## 自定义颜色

通过 `background-color` 属性自定义头像背景色。

<DemoBlock title="自定义颜色" :ts-code="tsColor" :js-code="jsColor">
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

## 加载失败

当图片加载失败时，可以通过 `error` 事件进行处理，默认插槽可作为降级展示。

<DemoBlock title="加载失败" :ts-code="tsError" :js-code="jsError">
  <yh-avatar src="https://picsum.photos/seed/error/200">
    <img src="https://picsum.photos/seed/avatar2/200" />
  </yh-avatar>
</DemoBlock>

## 在 Nuxt 中使用

Avatar 组件完全支持 Nuxt 3/4 的 SSR 渲染。头像的尺寸、形状和图片在服务端渲染时即可正确展示，确保首屏即呈现完整的用户头像信息。

<DemoBlock title="Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="display: flex; gap: 20px; align-items: center;">
    <yh-avatar src="https://picsum.photos/seed/avatar1/200" />
    <yh-avatar :size="48">张</yh-avatar>
  </div>
</DemoBlock>

**SSR 注意事项**：

- ✅ 头像尺寸 (size)、形状 (shape)、图片适配 (fit) 首屏正确渲染
- ✅ 自定义背景色 (background-color) 和文字内容支持 SSR
- ✅ 图片 src / srcset 在服务端即包含在 HTML 中
- 💡 图片加载失败的降级处理在客户端激活后自动完成

::: tip Nuxt 自动导入
在安装 `@yh-ui/nuxt` 模块后，`YhAvatar` 组件会被自动注册，无需手动导入。
:::

## API

### Props

| 属性名           | 说明                           | 类型                                                       | 默认值      |
| ---------------- | ------------------------------ | ---------------------------------------------------------- | ----------- |
| shape            | 头像形状                       | `'circle' \| 'square'`                                     | `'circle'`  |
| size             | 头像大小，支持预设值或像素数值 | `number \| 'large' \| 'default' \| 'small'`                | `'default'` |
| src              | 图片地址                       | `string`                                                   | —           |
| src-set          | 图片懒加载地址列表（srcset）   | `string`                                                   | —           |
| alt              | 图片 alt 描述文字              | `string`                                                   | —           |
| fit              | 图片适配方式                   | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `'cover'`   |
| icon             | 图标组件，当无图片时显示       | `string \| Component`                                      | —           |
| color            | 背景色（兼容旧 API）           | `string`                                                   | —           |
| background-color | 背景颜色                       | `string`                                                   | —           |
| theme-overrides  | 主题覆盖变量                   | `ComponentThemeVars`                                       | —           |

### Events

| 事件名 | 说明               | 回调参数                 |
| ------ | ------------------ | ------------------------ |
| error  | 图片加载失败时触发 | `(event: Event) => void` |

### Slots

| 插槽名  | 说明                     |
| ------- | ------------------------ |
| default | 自定义内容（文字或图标） |

## 主题变量

| 变量名                   | 说明         | 默认值                                     |
| ------------------------ | ------------ | ------------------------------------------ |
| `--yh-avatar-bg-color`   | 背景颜色     | `var(--yh-color-primary-light-8, #d9ecff)` |
| `--yh-avatar-text-color` | 文字颜色     | `var(--yh-color-primary, #409eff)`         |
| `--yh-avatar-radius`     | 方形头像圆角 | `var(--yh-border-radius-base, 4px)`        |
