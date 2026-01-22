# Card 卡片

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)

// 代码示例
const tsBasic = `<template>
  <yh-card header="卡片标题">
    <p>卡片内容。这是一些描述文本。</p>
    <p>卡片可以承载文字、列表、图片段落等。</p>
  </yh-card>
<\/template>`

const jsBasic = tsBasic

const tsSimple = `<template>
  <yh-card>
    <p>没有标题的简洁卡片。</p>
  </yh-card>
<\/template>`

const jsSimple = tsSimple

const tsExtra = `<template>
  <yh-card header="卡片标题">
    <template #extra>
      <yh-button type="primary" text>操作</yh-button>
    </template>
    <p>带有额外操作的卡片。</p>
  </yh-card>
<\/template>`

const jsExtra = tsExtra

const tsShadow = `<template>
  <yh-card shadow="always" header="总是显示阴影">
    <p>这个卡片总是显示阴影。</p>
  </yh-card>
  <yh-card shadow="hover" header="悬浮时显示阴影">
    <p>这个卡片只在鼠标悬浮时显示阴影。</p>
  </yh-card>
  <yh-card shadow="never" header="从不显示阴影">
    <p>这个卡片从不显示阴影。</p>
  </yh-card>
<\/template>`

const jsShadow = tsShadow

const tsHoverable = `<template>
  <yh-card hoverable header="可悬浮卡片">
    <p>鼠标悬浮时会有提升效果。</p>
  </yh-card>
<\/template>`

const jsHoverable = tsHoverable

const tsLoading = `<template>
  <div style="display: flex; gap: 16px; align-items: start;">
    <yh-card :loading="loading" header="加载中的卡片" style="flex: 1;">
      <p>这是卡片内容。</p>
    </yh-card>
    <yh-button @click="loading = !loading">切换加载状态</yh-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const loading = ref(true)
<\/script>`

const jsLoading = `<template>
  <div style="display: flex; gap: 16px; align-items: start;">
    <yh-card :loading="loading" header="加载中的卡片" style="flex: 1;">
      <p>这是卡片内容。</p>
    </yh-card>
    <yh-button @click="loading = !loading">切换加载状态</yh-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const loading = ref(true)
<\/script>`

const tsFooter = `<template>
  <yh-card header="带底部的卡片">
    <p>卡片内容区域。</p>
    <template #footer>
      <div style="display: flex; justify-content: flex-end; gap: 8px;">
        <yh-button type="primary">确认</yh-button>
        <yh-button>取消</yh-button>
      </div>
    </template>
  </yh-card>
</template>`

const jsFooter = tsFooter

const tsSize = `<template>
  <div style="display: flex; gap: 16px;">
    <yh-card size="small" header="小型卡片">
      <p>小尺寸的卡片。</p>
    </yh-card>
    <yh-card header="默认卡片">
      <p>默认尺寸的卡片。</p>
    </yh-card>
    <yh-card size="large" header="大型卡片">
      <p>大尺寸的卡片。</p>
    </yh-card>
  </div>
</template>`

const jsSize = tsSize

const tsBordered = `<template>
  <div style="background: var(--yh-bg-color-page); padding: 16px;">
    <yh-card :bordered="false" header="无边框卡片">
      <p>没有边框的卡片。</p>
    </yh-card>
  </div>
</template>`

const jsBordered = tsBordered
</script>

通用卡片容器，承载文字、列表、图片、段落等内容。

## 基础用法

通过 `header` 属性设置卡片标题。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-card header="卡片标题">
    <p style="margin: 0 0 8px;">卡片内容。这是一些描述文本。</p>
    <p style="margin: 0;">卡片可以承载文字、列表、图片段落等。</p>
  </yh-card>
</DemoBlock>

## 简洁卡片

可以省略标题，只保留内容区域。

<DemoBlock title="简洁卡片" :ts-code="tsSimple" :js-code="jsSimple">
  <yh-card>
    <p style="margin: 0;">没有标题的简洁卡片。</p>
  </yh-card>
</DemoBlock>

## 带额外操作

使用 `#extra` 插槽在标题栏右侧添加操作按钮。

<DemoBlock title="带额外操作" :ts-code="tsExtra" :js-code="jsExtra">
  <yh-card header="卡片标题">
    <template #extra>
      <yh-button type="primary" text>操作</yh-button>
    </template>
    <p style="margin: 0;">带有额外操作的卡片。</p>
  </yh-card>
</DemoBlock>

## 阴影效果

通过 `shadow` 属性控制卡片阴影的显示时机。

<DemoBlock title="阴影效果" :ts-code="tsShadow" :js-code="jsShadow">
  <div style="display: flex; gap: 16px; flex-wrap: wrap;">
    <yh-card shadow="always" header="总是显示阴影" style="flex: 1; min-width: 200px;">
      <p style="margin: 0;">这个卡片总是显示阴影。</p>
    </yh-card>
    <yh-card shadow="hover" header="悬浮时显示阴影" style="flex: 1; min-width: 200px;">
      <p style="margin: 0;">这个卡片只在鼠标悬浮时显示阴影。</p>
    </yh-card>
    <yh-card shadow="never" header="从不显示阴影" style="flex: 1; min-width: 200px;">
      <p style="margin: 0;">这个卡片从不显示阴影。</p>
    </yh-card>
  </div>
</DemoBlock>

## 悬浮效果

设置 `hoverable` 属性可以在鼠标悬浮时产生提升效果。

<DemoBlock title="悬浮效果" :ts-code="tsHoverable" :js-code="jsHoverable">
  <yh-card hoverable header="可悬浮卡片" style="max-width: 300px;">
    <p style="margin: 0;">鼠标悬浮时会有提升效果。</p>
  </yh-card>
</DemoBlock>

## 加载状态

设置 `loading` 属性可以显示骨架屏加载状态。

<DemoBlock title="加载状态" :ts-code="tsLoading" :js-code="jsLoading">
  <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: start;">
    <yh-card :loading="loading" header="加载中的卡片" style="flex: 1; min-width: 250px;">
      <p style="margin: 0;">这是卡片内容。</p>
    </yh-card>
    <yh-button @click="loading = !loading">切换加载状态</yh-button>
  </div>
</DemoBlock>

## 带底部

使用 `#footer` 插槽添加底部内容。

<DemoBlock title="带底部" :ts-code="tsFooter" :js-code="jsFooter">
  <yh-card header="带底部的卡片" style="max-width: 400px;">
    <p style="margin: 0;">卡片内容区域。</p>
    <template #footer>
      <div style="display: flex; justify-content: flex-end; gap: 8px;">
        <yh-button type="primary">确认</yh-button>
        <yh-button>取消</yh-button>
      </div>
    </template>
  </yh-card>
</DemoBlock>

## 不同尺寸

通过 `size` 属性设置卡片尺寸。

<DemoBlock title="不同尺寸" :ts-code="tsSize" :js-code="jsSize">
  <div style="display: flex; gap: 16px; flex-wrap: wrap;">
    <yh-card size="small" header="小型卡片" style="flex: 1; min-width: 180px;">
      <p style="margin: 0;">小尺寸的卡片。</p>
    </yh-card>
    <yh-card header="默认卡片" style="flex: 1; min-width: 180px;">
      <p style="margin: 0;">默认尺寸的卡片。</p>
    </yh-card>
    <yh-card size="large" header="大型卡片" style="flex: 1; min-width: 180px;">
      <p style="margin: 0;">大尺寸的卡片。</p>
    </yh-card>
  </div>
</DemoBlock>

## 无边框

设置 `bordered` 为 `false` 可以去掉边框。

<DemoBlock title="无边框" :ts-code="tsBordered" :js-code="jsBordered">
  <div style="background: var(--yh-bg-color-page); padding: 16px;">
    <yh-card :bordered="false" header="无边框卡片">
      <p style="margin: 0;">没有边框的卡片。</p>
    </yh-card>
  </div>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| header | 卡片标题 | `string` | — |
| body-style | 卡片内容区域的样式 | `object` | — |
| header-style | 卡片头部的样式 | `object` | — |
| shadow | 卡片阴影显示时机 | `'always' \| 'hover' \| 'never'` | `'always'` |
| bordered | 是否显示边框 | `boolean` | `true` |
| hoverable | 是否可悬浮（鼠标悬浮时有提升效果） | `boolean` | `false` |
| size | 卡片的尺寸 | `'small' \| 'default' \| 'large'` | `'default'` |
| loading | 是否加载中 (显示骨架屏) | `boolean` | `false` |
| body-padding | 是否有内边距 | `boolean` | `true` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 卡片内容 |
| header | 卡片标题 |
| extra | 卡片额外操作区域 |
| footer | 卡片底部内容 |

## 主题变量

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-card-bg-color` | 背景颜色 | `var(--yh-bg-color-overlay)` |
| `--yh-card-border-color` | 边框颜色 | `var(--yh-border-color-light)` |
| `--yh-card-border-radius` | 圆角大小 | `var(--yh-border-radius-base)` |
| `--yh-card-header-padding` | 头部内边距 | `18px 20px` |
| `--yh-card-body-padding` | 主体内边距 | `20px` |
| `--yh-card-footer-padding` | 底部内边距 | `18px 20px` |
| `--yh-card-shadow` | 卡片阴影 | `var(--yh-box-shadow-light)` |
