# Badge 徽标

<script setup lang="ts">
import { ref } from 'vue'

// 代码示例
const tsBasic = `<template>
  <yh-badge :value="12">
    <yh-button>消息</yh-button>
  </yh-badge>
  <yh-badge :value="3" type="primary">
    <yh-button>评论</yh-button>
  </yh-badge>
  <yh-badge :value="1" type="success">
    <yh-button>回复</yh-button>
  </yh-badge>
  <yh-badge :value="2" type="warning">
    <yh-button>提醒</yh-button>
  </yh-badge>
<\/template>`

const jsBasic = tsBasic

const tsMax = `<template>
  <yh-badge :value="200" :max="99">
    <yh-button>消息</yh-button>
  </yh-badge>
  <yh-badge :value="100" :max="10">
    <yh-button>评论</yh-button>
  </yh-badge>
<\/template>`

const jsMax = tsMax

const tsDot = `<template>
  <yh-badge is-dot>
    <yh-button>消息</yh-button>
  </yh-badge>
  <yh-badge is-dot type="success">
    <yh-button>评论</yh-button>
  </yh-badge>
  <yh-badge is-dot type="warning">
    <yh-button icon>📧</yh-button>
  </yh-badge>
<\/template>`

const jsDot = tsDot

const tsText = `<template>
  <yh-badge value="new">
    <yh-button>消息</yh-button>
  </yh-badge>
  <yh-badge value="hot">
    <yh-button>评论</yh-button>
  </yh-badge>
<\/template>`

const jsText = tsText

const tsColor = `<template>
  <yh-badge :value="8" color="#8B5CF6">
    <yh-button>紫色</yh-button>
  </yh-badge>
  <yh-badge :value="8" color="#06B6D4">
    <yh-button>青色</yh-button>
  </yh-badge>
  <yh-badge :value="8" color="#F97316">
    <yh-button>橙色</yh-button>
  </yh-badge>
<\/template>`

const jsColor = tsColor

const tsOffset = `<template>
  <yh-badge :value="8" :offset="[10, -10]">
    <yh-button>偏移</yh-button>
  </yh-badge>
<\/template>`

const jsOffset = tsOffset

const tsShowZero = `<template>
  <yh-badge :value="0">
    <yh-button>隐藏零值</yh-button>
  </yh-badge>
  <yh-badge :value="0" show-zero>
    <yh-button>显示零值</yh-button>
  </yh-badge>
<\/template>`

const jsShowZero = tsShowZero

const tsSlot = `<template>
  <yh-badge>
    <template #content>
      <span style="font-size: 10px;">VIP</span>
    </template>
    <yh-button>自定义内容</yh-button>
  </yh-badge>
<\/template>`

const jsSlot = tsSlot

const tsStandalone = `<template>
  <yh-badge :value="12" />
  <yh-badge :value="3" type="success" />
  <yh-badge is-dot type="warning" />
<\/template>`

const jsStandalone = tsStandalone
</script>

出现在按钮、图标旁的数字或状态标记。

## 基础用法

使用 `value` 属性定义显示的数值，通过 `type` 属性设置不同的类型。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div class="yh-demo-flex">
    <yh-badge :value="12">
      <yh-button>消息</yh-button>
    </yh-badge>
    <yh-badge :value="3" type="primary">
      <yh-button>评论</yh-button>
    </yh-badge>
    <yh-badge :value="1" type="success">
      <yh-button>回复</yh-button>
    </yh-badge>
    <yh-badge :value="2" type="warning">
      <yh-button>提醒</yh-button>
    </yh-badge>
  </div>
</DemoBlock>

## 最大值

通过 `max` 属性设置最大值，超过最大值会显示 `{max}+`。

<DemoBlock title="最大值" :ts-code="tsMax" :js-code="jsMax">
  <div class="yh-demo-flex">
    <yh-badge :value="200" :max="99">
      <yh-button>消息</yh-button>
    </yh-badge>
    <yh-badge :value="100" :max="10">
      <yh-button>评论</yh-button>
    </yh-badge>
  </div>
</DemoBlock>

## 小红点

使用 `is-dot` 属性显示小红点。

<DemoBlock title="小红点" :ts-code="tsDot" :js-code="jsDot">
  <div class="yh-demo-flex">
    <yh-badge is-dot>
      <yh-button>消息</yh-button>
    </yh-badge>
    <yh-badge is-dot type="success">
      <yh-button>评论</yh-button>
    </yh-badge>
    <yh-badge is-dot type="warning">
      <yh-button>📧</yh-button>
    </yh-badge>
  </div>
</DemoBlock>

## 文本内容

`value` 属性也可以传入字符串来显示文本内容。

<DemoBlock title="文本内容" :ts-code="tsText" :js-code="jsText">
  <div class="yh-demo-flex">
    <yh-badge value="new">
      <yh-button>消息</yh-button>
    </yh-badge>
    <yh-badge value="hot">
      <yh-button>评论</yh-button>
    </yh-badge>
  </div>
</DemoBlock>

## 自定义颜色

通过 `color` 属性自定义徽标颜色。

<DemoBlock title="自定义颜色" :ts-code="tsColor" :js-code="jsColor">
  <div class="yh-demo-flex">
    <yh-badge :value="8" color="#8B5CF6">
      <yh-button>紫色</yh-button>
    </yh-badge>
    <yh-badge :value="8" color="#06B6D4">
      <yh-button>青色</yh-button>
    </yh-badge>
    <yh-badge :value="8" color="#F97316">
      <yh-button>橙色</yh-button>
    </yh-badge>
  </div>
</DemoBlock>

## 偏移量

通过 `offset` 属性自定义徽标位置。

<DemoBlock title="偏移量" :ts-code="tsOffset" :js-code="jsOffset">
  <div style="display: flex; gap: 32px;">
    <yh-badge :value="8" :offset="[10, -10]">
      <yh-button>偏移</yh-button>
    </yh-badge>
  </div>
</DemoBlock>

## 显示零值

默认情况下，当 `value` 为 0 时徽标会隐藏，使用 `show-zero` 属性可以强制显示。

<DemoBlock title="显示零值" :ts-code="tsShowZero" :js-code="jsShowZero">
  <div style="display: flex; gap: 32px;">
    <yh-badge :value="0">
      <yh-button>隐藏零值</yh-button>
    </yh-badge>
    <yh-badge :value="0" show-zero>
      <yh-button>显示零值</yh-button>
    </yh-badge>
  </div>
</DemoBlock>

## 自定义内容

使用 `#content` 插槽自定义徽标内容。

<DemoBlock title="自定义内容" :ts-code="tsSlot" :js-code="jsSlot">
  <div style="display: flex; gap: 32px;">
    <yh-badge>
      <template #content>
        <span style="font-size: 10px;">VIP</span>
      </template>
      <yh-button>自定义内容</yh-button>
    </yh-badge>
  </div>
</DemoBlock>

## 独立使用

不包裹任何内容，可以独立使用。

<DemoBlock title="独立使用" :ts-code="tsStandalone" :js-code="jsStandalone">
  <div class="yh-demo-flex">
    <yh-badge :value="12" />
    <yh-badge :value="3" type="success" />
    <yh-badge is-dot type="warning" />
  </div>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 显示值 | `string \| number` | — |
| max | 最大值，超过显示 `{max}+` | `number` | `99` |
| is-dot | 是否显示小红点 | `boolean` | `false` |
| hidden | 是否隐藏徽标 | `boolean` | `false` |
| type | 徽标类型 | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'danger'` |
| show-border | 是否显示边框 | `boolean` | `true` |
| color | 自定义徽标颜色 | `string` | — |
| offset | 徽标偏移量 `[x, y]` | `[number, number]` | — |
| show-zero | 当值为 0 时是否显示 | `boolean` | `false` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 被徽标包裹的元素 |
| content | 自定义徽标内容 |

## 主题变量

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-badge-bg-color` | 背景颜色 | `var(--yh-color-danger)` |
| `--yh-badge-text-color` | 文字颜色 | `#ffffff` |
| `--yh-badge-font-size` | 字体大小 | `var(--yh-font-size-xs)` |
