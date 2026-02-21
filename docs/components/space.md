# Space 间距

设置组件之间的间距。

<script setup lang="ts">
import { ref } from 'vue'

const size = ref(20)

const tsBasic = `<template>
  <yh-space>
    <yh-button>按钮 1</yh-button>
    <yh-button>按钮 2</yh-button>
    <yh-button>按钮 3</yh-button>
  </yh-space>
</template>`

const jsBasic = tsBasic

const tsVertical = `<template>
  <yh-space direction="vertical">
    <yh-button>按钮 1</yh-button>
    <yh-button>按钮 2</yh-button>
    <yh-button>按钮 3</yh-button>
  </yh-space>
</template>`

const jsVertical = tsVertical

const tsSize = `<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <yh-space size="small">
      <yh-button>Small</yh-button>
      <yh-button>Small</yh-button>
    </yh-space>
    <yh-space size="default">
      <yh-button>Default</yh-button>
      <yh-button>Default</yh-button>
    </yh-space>
    <yh-space size="large">
      <yh-button>Large</yh-button>
      <yh-button>Large</yh-button>
    </yh-space>
    <yh-space :size="40">
      <yh-button>Custom 40px</yh-button>
      <yh-button>Custom 40px</yh-button>
    </yh-space>
  </div>
</template>`

const jsSize = tsSize

const tsAlignment = `<template>
  <div style="padding: 20px; border: 1px solid #ccc;">
    <yh-space alignment="center">
      <span>居中对齐:</span>
      <yh-button>按钮</yh-button>
      <div style="height: 60px; width: 60px; background: #eee; display: flex; align-items: center; justify-content: center;">Box</div>
    </yh-space>
  </div>
</template>`

const jsAlignment = tsAlignment

const tsWrap = `<template>
  <yh-space wrap :size="[10, 20]">
    <yh-button v-for="i in 20" :key="i">按钮 {{ i }}</yh-button>
  </yh-space>
</template>`

const jsWrap = tsWrap

const tsSpacer = `<template>
  <yh-space :size="20">
    <template #spacer>
      <span style="color: #ccc;">|</span>
    </template>
    <yh-button text>首页</yh-button>
    <yh-button text>产品</yh-button>
    <yh-button text>关于</yh-button>
  </yh-space>
</template>`

const jsSpacer = tsSpacer
</script>

## 基础用法

设置组件之间的间距，默认为水平方向，间距大小为 `small` (8px)。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-space>
    <yh-button>按钮 1</yh-button>
    <yh-button>按钮 2</yh-button>
    <yh-button>按钮 3</yh-button>
  </yh-space>
</DemoBlock>

## 垂直布局

通过 `direction` 属性设置为 `vertical`。

<DemoBlock title="垂直布局" :ts-code="tsVertical" :js-code="jsVertical">
  <yh-space direction="vertical">
    <yh-button>按钮 1</yh-button>
    <yh-button>按钮 2</yh-button>
    <yh-button>按钮 3</yh-button>
  </yh-space>
</DemoBlock>

## 不同间距

通过 `size` 属性设置间距大小，可选值为 `small` (8px), `default` (12px), `large` (16px)，也支持传入数字自定义像素大小，或数组 `[horizontal, vertical]`。

<DemoBlock title="不同间距" :ts-code="tsSize" :js-code="jsSize">
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <yh-space size="small">
      <yh-button>Small</yh-button>
      <yh-button>Small</yh-button>
    </yh-space>
    <yh-space size="default">
      <yh-button>Default</yh-button>
      <yh-button>Default</yh-button>
    </yh-space>
    <yh-space size="large">
      <yh-button>Large</yh-button>
      <yh-button>Large</yh-button>
    </yh-space>
    <yh-space :size="40">
      <yh-button>Custom 40px</yh-button>
      <yh-button>Custom 40px</yh-button>
    </yh-space>
  </div>
</DemoBlock>

## 对齐方式

通过 `alignment` 属性设置对齐方式。

<DemoBlock title="对齐方式" :ts-code="tsAlignment" :js-code="jsAlignment">
  <div style="padding: 20px; border: 1px solid var(--yh-border-color-light);">
    <yh-space alignment="center">
      <span>居中对齐:</span>
      <yh-button>按钮</yh-button>
      <div style="height: 60px; width: 60px; background: var(--yh-fill-color-light); border-radius: 4px; display: flex; align-items: center; justify-content: center;">Box</div>
    </yh-space>
  </div>
</DemoBlock>

## 自动换行

通过 `wrap` 属性设置是否自动换行。

<DemoBlock title="自动换行" :ts-code="tsWrap" :js-code="jsWrap">
  <yh-space wrap :size="[10, 20]">
    <yh-button v-for="i in 15" :key="i">按钮 {{ i }}</yh-button>
  </yh-space>
</DemoBlock>

## 分隔符

通过 `spacer` 插槽自定义分隔符。

<DemoBlock title="分隔符" :ts-code="tsSpacer" :js-code="jsSpacer">
  <yh-space :size="20">
    <template #spacer>
      <span style="color: var(--yh-text-color-placeholder);">|</span>
    </template>
    <yh-button text>首页</yh-button>
    <yh-button text>产品</yh-button>
    <yh-button text>关于</yh-button>
  </yh-space>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| direction | 间距方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| size | 间距大小 | `number \| 'small' \| 'default' \| 'large' \| [number, number]` | `'small'` |
| alignment | 对齐方式 | `'stretch' \| 'start' \| 'end' \| 'center' \| 'baseline'` | `'center'` |
| wrap | 是否自动换行 | `boolean` | `false` |
| fill | 是否撑满容器 | `boolean` | `false` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 间距内的内容 |
| spacer | 自定义分隔符 |
