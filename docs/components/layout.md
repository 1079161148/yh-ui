<script setup lang="ts">
const tsBasic = `<template>
  <yh-row>
    <yh-col :span="24"><div class="grid-content bg-purple-dark">24</div></yh-col>
  </yh-row>
  <yh-row>
    <yh-col :span="12"><div class="grid-content bg-purple">12</div></yh-col>
    <yh-col :span="12"><div class="grid-content bg-purple-light">12</div></yh-col>
  </yh-row>
  <yh-row>
    <yh-col :span="8"><div class="grid-content bg-purple">8</div></yh-col>
    <yh-col :span="8"><div class="grid-content bg-purple-light">8</div></yh-col>
    <yh-col :span="8"><div class="grid-content bg-purple">8</div></yh-col>
  </yh-row>
<\/template>`

const jsBasic = tsBasic

const tsGutter = `<template>
  <yh-row :gutter="20">
    <yh-col :span="6"><div class="grid-content bg-purple">6</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">6</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">6</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">6</div></yh-col>
  </yh-row>
<\/template>`

const jsGutter = tsGutter

const tsMixed = `<template>
  <yh-row :gutter="20">
    <yh-col :span="16"><div class="grid-content bg-purple">16</div></yh-col>
    <yh-col :span="8"><div class="grid-content bg-purple-light">8</div></yh-col>
  </yh-row>
  <yh-row :gutter="20">
    <yh-col :span="8"><div class="grid-content bg-purple">8</div></yh-col>
    <yh-col :span="8"><div class="grid-content bg-purple-light">8</div></yh-col>
    <yh-col :span="4"><div class="grid-content bg-purple">4</div></yh-col>
    <yh-col :span="4"><div class="grid-content bg-purple-light">4</div></yh-col>
  </yh-row>
<\/template>`

const jsMixed = tsMixed

const tsOffset = `<template>
  <yh-row :gutter="20">
    <yh-col :span="6"><div class="grid-content bg-purple">6</div></yh-col>
    <yh-col :span="6" :offset="6"><div class="grid-content bg-purple">6 offset-6</div></yh-col>
  </yh-row>
<\/template>`

const jsOffset = tsOffset

const tsAlign = `<template>
  <yh-row justify="center">
    <yh-col :span="6"><div class="grid-content bg-purple">center</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple-light">center</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">center</div></yh-col>
  </yh-row>
<\/template>`

const jsAlign = tsAlign
</script>

<style>
.demo-row {
  margin-bottom: 20px;
}
.demo-row:last-child {
  margin-bottom: 0;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 14px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
  color: #5e6d82;
}
.bg-purple-light {
  background: #e5e9f2;
  color: #5e6d82;
}
</style>

# Layout 布局

通过基础的 24 分栏，迅速简便地创建布局。

## 基础布局

使用 `yh-row` 和 `yh-col` 组件，通过 `span` 属性即可自由地组合布局。

<DemoBlock title="基础布局" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-row class="demo-row">
    <yh-col :span="24"><div class="grid-content bg-purple-dark">24</div></yh-col>
  </yh-row>
  <yh-row class="demo-row">
    <yh-col :span="12"><div class="grid-content bg-purple">12</div></yh-col>
    <yh-col :span="12"><div class="grid-content bg-purple-light">12</div></yh-col>
  </yh-row>
  <yh-row class="demo-row">
    <yh-col :span="8"><div class="grid-content bg-purple">8</div></yh-col>
    <yh-col :span="8"><div class="grid-content bg-purple-light">8</div></yh-col>
    <yh-col :span="8"><div class="grid-content bg-purple">8</div></yh-col>
  </yh-row>
  <yh-row class="demo-row">
    <yh-col :span="6"><div class="grid-content bg-purple">6</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple-light">6</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">6</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple-light">6</div></yh-col>
  </yh-row>
</DemoBlock>

## 分栏间隔

通过 `gutter` 属性指定分栏间隔，默认间隔为 0。

<DemoBlock title="分栏间隔" :ts-code="tsGutter" :js-code="jsGutter">
  <yh-row :gutter="20" class="demo-row">
    <yh-col :span="6"><div class="grid-content bg-purple">6</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">6</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">6</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">6</div></yh-col>
  </yh-row>
</DemoBlock>

## 混合布局

通过基础的 1/24 分栏任意扩展组合形成较为复杂的混合布局。

<DemoBlock title="混合布局" :ts-code="tsMixed" :js-code="jsMixed">
  <yh-row :gutter="20" class="demo-row">
    <yh-col :span="16"><div class="grid-content bg-purple">16</div></yh-col>
    <yh-col :span="8"><div class="grid-content bg-purple-light">8</div></yh-col>
  </yh-row>
  <yh-row :gutter="20" class="demo-row">
    <yh-col :span="8"><div class="grid-content bg-purple">8</div></yh-col>
    <yh-col :span="8"><div class="grid-content bg-purple-light">8</div></yh-col>
    <yh-col :span="4"><div class="grid-content bg-purple">4</div></yh-col>
    <yh-col :span="4"><div class="grid-content bg-purple-light">4</div></yh-col>
  </yh-row>
</DemoBlock>

## 分栏偏移

通过 `offset` 属性指定分栏偏移的栏数。

<DemoBlock title="分栏偏移" :ts-code="tsOffset" :js-code="jsOffset">
  <yh-row :gutter="20" class="demo-row">
    <yh-col :span="6"><div class="grid-content bg-purple">6</div></yh-col>
    <yh-col :span="6" :offset="6"><div class="grid-content bg-purple">6 offset-6</div></yh-col>
  </yh-row>
  <yh-row :gutter="20" class="demo-row">
    <yh-col :span="6" :offset="6"><div class="grid-content bg-purple">6 offset-6</div></yh-col>
    <yh-col :span="6" :offset="6"><div class="grid-content bg-purple">6 offset-6</div></yh-col>
  </yh-row>
</DemoBlock>

## 对齐方式

通过 `justify` 属性来控制行内元素的水平排列方式。

<DemoBlock title="对齐方式" :ts-code="tsAlign" :js-code="jsAlign">
  <yh-row class="demo-row" justify="center">
    <yh-col :span="6"><div class="grid-content bg-purple">center</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple-light">center</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">center</div></yh-col>
  </yh-row>
  <yh-row class="demo-row" justify="end">
    <yh-col :span="6"><div class="grid-content bg-purple">end</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple-light">end</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">end</div></yh-col>
  </yh-row>
  <yh-row class="demo-row" justify="space-between">
    <yh-col :span="6"><div class="grid-content bg-purple">space-between</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple-light">space-between</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">space-between</div></yh-col>
  </yh-row>
</DemoBlock>

## Row API

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| gutter | 栅格间隔 | number | 0 |
| tag | 自定义元素标签 | string | div |
| justify | flex 布局下的水平排列方式 | 'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| 'space-evenly' | start |
| align | flex 布局下的垂直排列方式 | 'top' \| 'middle' \| 'bottom' | top |

## Col API

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| span | 栅格占据的列数 | number | 24 |
| offset | 栅格左侧的间隔格数 | number | 0 |
| push | 栅格向右移动格数 | number | 0 |
| pull | 栅格向左移动格数 | number | 0 |
| xs | <768px 响应式栅格数或者栅格属性对象 | number / object | - |
| sm | ≥768px 响应式栅格数或者栅格属性对象 | number / object | - |
| md | ≥992px 响应式栅格数或者栅格属性对象 | number / object | - |
| lg | ≥1200px 响应式栅格数或者栅格属性对象 | number / object | - |
| xl | ≥1920px 响应式栅格数或者栅格属性对象 | number / object | - |
| tag | 自定义元素标签 | string | div |
