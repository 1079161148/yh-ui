# Button 按钮

<script setup lang="ts">
import { ref } from 'vue'

// TypeScript 代码示例
const tsBasic = `<template>
  <yh-button>默认按钮</yh-button>
  <yh-button type="primary">主要按钮</yh-button>
  <yh-button type="success">成功按钮</yh-button>
  <yh-button type="warning">警告按钮</yh-button>
  <yh-button type="danger">危险按钮</yh-button>
  <yh-button type="info">信息按钮</yh-button>
<\/template>`

const jsBasic = tsBasic

const tsPlain = `<template>
  <yh-button plain>朴素按钮</yh-button>
  <yh-button type="primary" plain>主要按钮</yh-button>
  <yh-button type="success" plain>成功按钮</yh-button>
  <yh-button type="warning" plain>警告按钮</yh-button>
  <yh-button type="danger" plain>危险按钮</yh-button>
  <yh-button type="info" plain>信息按钮</yh-button>
<\/template>`

const jsPlain = tsPlain

const tsRound = `<template>
  <yh-button round>圆角按钮</yh-button>
  <yh-button type="primary" round>主要按钮</yh-button>
  <yh-button type="success" round>成功按钮</yh-button>
  <yh-button type="warning" round>警告按钮</yh-button>
  <yh-button type="danger" round>危险按钮</yh-button>
  <yh-button type="info" round>信息按钮</yh-button>
<\/template>`

const jsRound = tsRound

const tsCircle = `<template>
  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
    <yh-button circle>
      <template #icon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
      </template>
    </yh-button>
    <yh-button type="primary" circle>
      <template #icon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
      </template>
    </yh-button>
    <yh-button type="success" circle>
      <template #icon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
      </template>
    </yh-button>
    <yh-button type="warning" circle>
      <template #icon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
      </template>
    </yh-button>
    <yh-button type="danger" circle>
      <template #icon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
      </template>
    </yh-button>
    <yh-button type="info" circle>
      <template #icon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
      </template>
    </yh-button>
  </div>
<\/template>`

const jsCircle = tsCircle

const tsDisabled = `<template>
  <yh-button disabled>禁用按钮</yh-button>
  <yh-button type="primary" disabled>主要按钮</yh-button>
  <yh-button type="success" disabled>成功按钮</yh-button>
<\/template>`

const jsDisabled = tsDisabled

const tsLoading = `<template>
  <yh-button loading>加载中</yh-button>
  <yh-button type="primary" loading>加载中</yh-button>
  <yh-button type="success" loading>加载中</yh-button>
<\/template>`

const jsLoading = tsLoading

const tsSizes = `<template>
  <yh-button size="large">大型按钮</yh-button>
  <yh-button>默认按钮</yh-button>
  <yh-button size="small">小型按钮</yh-button>
<\/template>`

const jsSizes = tsSizes

const tsText = `<template>
  <yh-button text>文字按钮</yh-button>
  <yh-button type="primary" text>主要按钮</yh-button>
  <yh-button type="success" text>成功按钮</yh-button>
<\/template>`

const jsText = tsText

const tsLink = `<template>
  <yh-button link>链接按钮</yh-button>
  <yh-button type="primary" link>主要链接</yh-button>
  <yh-button type="danger" link>危险链接</yh-button>
<\/template>`

const jsLink = tsLink

const tsBlock = `<template>
  <yh-button type="primary" block>块级按钮</yh-button>
<\/template>`

const jsBlock = tsBlock

const tsCustomColor = `<template>
  <yh-button color="#6366f1">Indigo</yh-button>
  <yh-button color="#8b5cf6">Purple</yh-button>
  <yh-button color="#ec4899">Pink</yh-button>
  <yh-button color="#6366f1" plain>Indigo Plain</yh-button>
<\/template>`

const jsCustomColor = tsCustomColor

const tsIconPosition = `<template>
  <div style="display: flex; align-items: flex-start; flex-wrap: wrap; gap: 16px;">
    <!-- 左侧图标 (默认) -->
    <yh-button type="primary">
      <template #icon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
      </template>
      左侧图标
    </yh-button>

    <!-- 右侧图标 -->
    <yh-button type="success" icon-position="right">
      <template #icon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
      </template>
      右侧图标
    </yh-button>

    <!-- 上置图标 (垂直布局) -->
    <yh-button type="warning" icon-position="top">
      <template #icon>
        <svg viewBox="0 0 1024 1024" width="1.2em" height="1.2em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
      </template>
      上置图标
    </yh-button>

    <!-- 下置图标 (垂直布局) -->
    <yh-button type="danger" icon-position="bottom">
      <template #icon>
        <svg viewBox="0 0 1024 1024" width="1.2em" height="1.2em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
      </template>
      下置图标
    </yh-button>

    <!-- 后缀图标 (suffixIcon 插槽) -->
    <yh-button type="info">
      内容
      <template #suffixIcon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
      </template>
    </yh-button>
  </div>
<\/template>`

const jsIconPosition = tsIconPosition

// Nuxt 使用示例
const tsNuxt = `<template>
  <div style="display: flex; flex-wrap: wrap; gap: 12px;">
    <!-- 组件自动导入，直接使用 -->
    <yh-button type="primary" @click="nuxtHandleClick">
      提交表单
    </yh-button>
    
    <!-- 结合 Nuxt 的异步操作 -->
    <yh-button :loading="nuxtPending" @click="nuxtFetchData">
      {{ nuxtPending ? '加载中...' : '获取数据' }}
    </yh-button>
  </div>
</template>

<script setup lang="ts">
// 无需导入 Button 组件
const nuxtPending = ref(false)

const nuxtHandleClick = () => {
  // YhMessage 也是自动导入的
  YhMessage.success('表单提交成功！')
}

const nuxtFetchData = () => {
  nuxtPending.value = true
  setTimeout(() => {
    nuxtPending.value = false
  }, 2000)
}
<\/script>`

const jsNuxt = tsNuxt.replace('lang="ts"', '')

// Demo 状态
const nuxtPending = ref(false)
const nuxtHandleClick = () => {
  alert('表单提交成功！')
}
const nuxtFetchData = () => {
  nuxtPending.value = true
  setTimeout(() => {
    nuxtPending.value = false
  }, 2000)
}
</script>

常用的操作按钮。

## 基础用法

使用 `type` 属性来定义按钮的类型。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div class="yh-demo-flex">
    <yh-button>默认按钮</yh-button>
    <yh-button type="primary">主要按钮</yh-button>
    <yh-button type="success">成功按钮</yh-button>
    <yh-button type="warning">警告按钮</yh-button>
    <yh-button type="danger">危险按钮</yh-button>
    <yh-button type="info">信息按钮</yh-button>
  </div>
</DemoBlock>

## 朴素按钮

使用 `plain` 属性可以设置为朴素按钮。

<DemoBlock title="朴素按钮" :ts-code="tsPlain" :js-code="jsPlain">
  <div class="yh-demo-flex">
    <yh-button plain>朴素按钮</yh-button>
    <yh-button type="primary" plain>主要按钮</yh-button>
    <yh-button type="success" plain>成功按钮</yh-button>
    <yh-button type="warning" plain>警告按钮</yh-button>
    <yh-button type="danger" plain>危险按钮</yh-button>
    <yh-button type="info" plain>信息按钮</yh-button>
  </div>
</DemoBlock>

## 圆角按钮

使用 `round` 属性可以设置为圆角按钮。

<DemoBlock title="圆角按钮" :ts-code="tsRound" :js-code="jsRound">
  <div class="yh-demo-flex">
    <yh-button round>圆角按钮</yh-button>
    <yh-button type="primary" round>主要按钮</yh-button>
    <yh-button type="success" round>成功按钮</yh-button>
    <yh-button type="warning" round>警告按钮</yh-button>
    <yh-button type="danger" round>危险按钮</yh-button>
    <yh-button type="info" round>信息按钮</yh-button>
  </div>
</DemoBlock>

## 圆形按钮

使用 `circle` 属性来设置圆形按钮，通常用于只包含图标的按钮。

<DemoBlock title="圆形按钮" :ts-code="tsCircle" :js-code="jsCircle">
  <div style="display: flex; flex-wrap: wrap; gap: 12px;">
    <yh-button circle>
      <template #icon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
      </template>
    </yh-button>
    <yh-button type="primary" circle>
      <template #icon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
      </template>
    </yh-button>
    <yh-button type="success" circle>
      <template #icon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
      </template>
    </yh-button>
    <yh-button type="warning" circle>
      <template #icon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
      </template>
    </yh-button>
    <yh-button type="danger" circle>
      <template #icon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
      </template>
    </yh-button>
    <yh-button type="info" circle>
      <template #icon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
      </template>
    </yh-button>
  </div>
</DemoBlock>

## 禁用状态

使用 `disabled` 属性来控制按钮的禁用状态。

<DemoBlock title="禁用状态" :ts-code="tsDisabled" :js-code="jsDisabled">
  <div style="display: flex; flex-wrap: wrap; gap: 12px;">
    <yh-button disabled>禁用按钮</yh-button>
    <yh-button type="primary" disabled>主要按钮</yh-button>
    <yh-button type="success" disabled>成功按钮</yh-button>
  </div>
</DemoBlock>

## 加载状态

使用 `loading` 属性来控制按钮的加载状态。

<DemoBlock title="加载状态" :ts-code="tsLoading" :js-code="jsLoading">
  <div style="display: flex; flex-wrap: wrap; gap: 12px;">
    <yh-button loading>加载中</yh-button>
    <yh-button type="primary" loading>加载中</yh-button>
    <yh-button type="success" loading>加载中</yh-button>
  </div>
</DemoBlock>

## 不同尺寸

使用 `size` 属性来设置按钮的尺寸。

<DemoBlock title="不同尺寸" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
    <yh-button size="large">大型按钮</yh-button>
    <yh-button>默认按钮</yh-button>
    <yh-button size="small">小型按钮</yh-button>
  </div>
</DemoBlock>

## 文字按钮

使用 `text` 属性可以设置为文字按钮。

<DemoBlock title="文字按钮" :ts-code="tsText" :js-code="jsText">
  <div style="display: flex; flex-wrap: wrap; gap: 12px;">
    <yh-button text>文字按钮</yh-button>
    <yh-button type="primary" text>主要按钮</yh-button>
    <yh-button type="success" text>成功按钮</yh-button>
  </div>
</DemoBlock>

## 链接按钮

使用 `link` 属性可以设置为链接样式按钮。

<DemoBlock title="链接按钮" :ts-code="tsLink" :js-code="jsLink">
  <div style="display: flex; flex-wrap: wrap; gap: 12px;">
    <yh-button link>链接按钮</yh-button>
    <yh-button type="primary" link>主要链接</yh-button>
    <yh-button type="danger" link>危险链接</yh-button>
  </div>
</DemoBlock>

## 块级按钮

使用 `block` 属性可以设置为块级按钮，宽度占满容器。

<DemoBlock title="块级按钮" :ts-code="tsBlock" :js-code="jsBlock">
  <div style="max-width: 400px;">
    <yh-button type="primary" block>块级按钮</yh-button>
  </div>
</DemoBlock>

## 自定义颜色

使用 `color` 属性可以自定义按钮颜色。

<DemoBlock title="自定义颜色" :ts-code="tsCustomColor" :js-code="jsCustomColor">
  <div style="display: flex; flex-wrap: wrap; gap: 12px;">
    <yh-button color="#6366f1">Indigo</yh-button>
    <yh-button color="#8b5cf6">Purple</yh-button>
    <yh-button color="#ec4899">Pink</yh-button>
    <yh-button color="#6366f1" plain>Indigo Plain</yh-button>
  </div>
</DemoBlock>

## 图标位置

通过 `icon-position` 属性可以控制图标相对于文字的位置。支持 `left` (默认), `right`, `top`, `bottom`。

<DemoBlock title="图标位置" :ts-code="tsIconPosition" :js-code="jsIconPosition">
  <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: flex-start;">
    <yh-button type="primary">
      <template #icon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
      </template>
      左侧图标
    </yh-button>
    <yh-button type="success" icon-position="right">
      <template #icon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
      </template>
      右侧图标
    </yh-button>
    <yh-button type="warning" icon-position="top">
      <template #icon>
        <svg viewBox="0 0 1024 1024" width="1.2em" height="1.2em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
      </template>
      上置图标
    </yh-button>
    <yh-button type="danger" icon-position="bottom">
      <template #icon>
        <svg viewBox="0 0 1024 1024" width="1.2em" height="1.2em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
      </template>
      下置图标
    </yh-button>
    <yh-button type="info">
      内容
      <template #suffixIcon>
        <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
      </template>
    </yh-button>
  </div>
</DemoBlock>

## 在 Nuxt 中使用

Button 组件完全支持 Nuxt 3/4 的 SSR 渲染。在 Nuxt 项目中使用时，组件会自动导入，无需手动注册。

<DemoBlock title="Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="display: flex; flex-wrap: wrap; gap: 12px;">
    <yh-button type="primary" @click="nuxtHandleClick">
      提交表单
    </yh-button>
    <yh-button :loading="nuxtPending" @click="nuxtFetchData">
      {{ nuxtPending ? '加载中...' : '获取数据' }}
    </yh-button>
  </div>
</DemoBlock>

**SSR 注意事项**：

- ✅ 所有 Props 和样式完全支持
- ✅ 事件绑定正常工作
- ✅ 插槽内容完整渲染
- ✅ 动态状态（loading、disabled 等）
- ⚠️ `autofocus` 属性仅客户端生效

::: tip SSR 安全性
Button 组件已通过完整的 SSR 测试，确保服务端和客户端渲染完全一致。
:::

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 按钮类型 | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'default'` |
| size | 按钮尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 是否加载中 | `boolean` | `false` |
| plain | 是否为朴素按钮 | `boolean` | `false` |
| round | 是否为圆角按钮 | `boolean` | `false` |
| circle | 是否为圆形按钮 | `boolean` | `false` |
| text | 是否为文字按钮 | `boolean` | `false` |
| link | 是否为链接按钮 | `boolean` | `false` |
| block | 是否为块级按钮 | `boolean` | `false` |
| native-type | 原生 type 属性 | `'button' \| 'submit' \| 'reset'` | `'button'` |
| autofocus | 是否自动聚焦 | `boolean` | `false` |
| icon | 左侧图标组件 | `string \| Component` | — |
| suffix-icon | 右侧图标组件 | `string \| Component` | — |
| icon-position | 图标位置 | `'left' \| 'right' \| 'top' \| 'bottom'` | `'left'` |
| color | 自定义按钮颜色 | `string` | — |
| tag | 自定义元素标签 | `string \| Component` | `'button'` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击按钮时触发 | `(event: MouseEvent) => void` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 按钮内容 |
| icon | 自定义内容 (受 icon-position 影响) |
| suffixIcon | 独立后缀插槽 (固定在右侧) |
| loading | 自定义加载图标 |

### Expose

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
| ref | 按钮 DOM 元素引用 | `HTMLButtonElement \| undefined` |
| size | 计算后的实际尺寸 | `ButtonSize` |
| type | 按钮类型 | `ButtonType` |
| disabled | 是否禁用状态 | `boolean` |

## 主题变量

Button 组件支持通过覆盖以下 CSS 变量来自定义局部样式：

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-button-bg-color` | 按钮背景颜色 | `var(--yh-fill-color-blank)` |
| `--yh-button-text-color` | 按钮文字颜色 | `var(--yh-text-color-regular)` |
| `--yh-button-border-color` | 按钮边框颜色 | `var(--yh-border-color)` |
| `--yh-button-hover-bg-color` | 悬停状态背景颜色 | `var(--yh-color-primary-light-9)` |
| `--yh-button-hover-text-color` | 悬停状态文字颜色 | `var(--yh-color-primary)` |
| `--yh-button-hover-border-color` | 悬停状态边框颜色 | `var(--yh-color-primary-light-8)` |
| `--yh-button-active-bg-color` | 激活/点击状态背景颜色 | `var(--yh-color-primary-light-8)` |
| `--yh-button-active-border-color` | 激活/点击状态边框颜色 | `var(--yh-color-primary)` |
| `--yh-button-active-text-color` | 激活/点击状态文字颜色 | — |
