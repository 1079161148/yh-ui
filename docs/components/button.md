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
  <!-- 左侧图标（默认） -->
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
  
  <!-- 后缀图标 -->
  <yh-button type="warning">
    <template #suffixIcon>
      <svg viewBox="0 0 1024 1024" width="1em" height="1em"><path fill="currentColor" d="M512 64l512 512-512 512L0 576z"/></svg>
    </template>
    后缀图标
  </yh-button>
<\/template>`

const jsIconPosition = tsIconPosition
</script>

常用的操作按钮。

## 基础用法

使用 `type` 属性来定义按钮的类型。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="display: flex; flex-wrap: wrap; gap: 12px;">
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
  <div style="display: flex; flex-wrap: wrap; gap: 12px;">
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
  <div style="display: flex; flex-wrap: wrap; gap: 12px;">
    <yh-button round>圆角按钮</yh-button>
    <yh-button type="primary" round>主要按钮</yh-button>
    <yh-button type="success" round>成功按钮</yh-button>
    <yh-button type="warning" round>警告按钮</yh-button>
    <yh-button type="danger" round>危险按钮</yh-button>
    <yh-button type="info" round>信息按钮</yh-button>
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

使用 `icon-position` 属性可以控制图标的位置，或使用 `#suffixIcon` 插槽添加后缀图标。

<DemoBlock title="图标位置" :ts-code="tsIconPosition" :js-code="jsIconPosition">
  <div style="display: flex; flex-wrap: wrap; gap: 12px;">
    <yh-button type="primary">
      <template #icon>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6Z"/></svg>
      </template>
      左侧图标
    </yh-button>
    <yh-button type="success" icon-position="right">
      <template #icon>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><path d="m13.172 12 -4.95 -4.95 1.414 -1.414L16 12l-6.364 6.364 -1.414 -1.414L13.172 12Z"/></svg>
      </template>
      右侧图标
    </yh-button>
    <yh-button type="warning">
      内容
      <template #suffixIcon>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><path d="m13.172 12 -4.95 -4.95 1.414 -1.414L16 12l-6.364 6.364 -1.414 -1.414L13.172 12Z"/></svg>
      </template>
    </yh-button>
    <yh-button type="danger">
      <template #icon>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6Z"/></svg>
      </template>
      两侧图标
      <template #suffixIcon>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><path d="m13.172 12 -4.95 -4.95 1.414 -1.414L16 12l-6.364 6.364 -1.414 -1.414L13.172 12Z"/></svg>
      </template>
    </yh-button>
  </div>
</DemoBlock>

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
| **suffix-icon** | 右侧图标组件 | `string \| Component` | — |
| **icon-position** | 图标位置 | `'left' \| 'right' \| 'top' \| 'bottom'` | `'left'` |
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
| icon | 自定义左侧图标 |
| **suffixIcon** | 自定义右侧图标 |
| loading | 自定义加载图标 |

### Expose

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
| ref | 按钮 DOM 元素 | `Ref<HTMLButtonElement>` |
| size | 按钮尺寸 | `ButtonSize` |
| type | 按钮类型 | `ButtonType` |
| disabled | 是否禁用 | `boolean` |

## 主题变量

Button 组件使用以下 CSS 变量，你可以通过覆盖这些变量来自定义样式：

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-button-bg-color` | 背景颜色 | `#ffffff` |
| `--yh-button-text-color` | 文字颜色 | `#606266` |
| `--yh-button-border-color` | 边框颜色 | `#dcdfe6` |
| `--yh-button-hover-bg-color` | 悬停背景色 | — |
| `--yh-button-hover-text-color` | 悬停文字色 | — |
| `--yh-button-hover-border-color` | 悬停边框色 | — |
| `--yh-button-disabled-bg-color` | 禁用背景色 | — |
| `--yh-button-disabled-text-color` | 禁用文字色 | — |
| `--yh-button-disabled-border-color` | 禁用边框色 | — |
