# Space

Set the spacing between components.

<script setup lang="ts">
import { ref } from 'vue'

const tsBasic = `<template>
  <yh-space>
    <yh-button>Button 1</yh-button>
    <yh-button>Button 2</yh-button>
    <yh-button>Button 3</yh-button>
  </yh-space>
</template>`

const jsBasic = tsBasic

const tsVertical = `<template>
  <yh-space direction="vertical">
    <yh-button>Button 1</yh-button>
    <yh-button>Button 2</yh-button>
    <yh-button>Button 3</yh-button>
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
      <span>Centered:</span>
      <yh-button>Button</yh-button>
      <div style="height: 60px; width: 60px; background: #eee; display: flex; align-items: center; justify-content: center;">Box</div>
    </yh-space>
  </div>
</template>`

const jsAlignment = tsAlignment

const tsWrap = `<template>
  <yh-space wrap :size="[10, 20]">
    <yh-button v-for="i in 20" :key="i">Button {{ i }}</yh-button>
  </yh-space>
</template>`

const jsWrap = tsWrap

const tsSpacer = `<template>
  <yh-space :size="20">
    <template #spacer>
      <span style="color: #ccc;">|</span>
    </template>
    <yh-button text>Home</yh-button>
    <yh-button text>Products</yh-button>
    <yh-button text>About</yh-button>
  </yh-space>
</template>`

const jsSpacer = tsSpacer
</script>

## Basic Usage

Set the spacing between components. Default direction is horizontal, spacing size is `small` (8px).

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-space>
    <yh-button>Button 1</yh-button>
    <yh-button>Button 2</yh-button>
    <yh-button>Button 3</yh-button>
  </yh-space>
</DemoBlock>

## Vertical Layout

Set `direction` to `vertical` for vertical layout.

<DemoBlock title="Vertical Layout" :ts-code="tsVertical" :js-code="jsVertical">
  <yh-space direction="vertical">
    <yh-button>Button 1</yh-button>
    <yh-button>Button 2</yh-button>
    <yh-button>Button 3</yh-button>
  </yh-space>
</DemoBlock>

## Different Sizes

Set spacing size via `size` prop. Supported values are `small` (8px), `default` (12px), `large` (16px), number (px), or array `[horizontal, vertical]`.

<DemoBlock title="Different Sizes" :ts-code="tsSize" :js-code="jsSize">
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

## Alignment

Set alignment via `alignment` prop.

<DemoBlock title="Alignment" :ts-code="tsAlignment" :js-code="jsAlignment">
  <div style="padding: 20px; border: 1px solid var(--yh-border-color-light);">
    <yh-space alignment="center">
      <span>Centered:</span>
      <yh-button>Button</yh-button>
      <div style="height: 60px; width: 60px; background: var(--yh-fill-color-light); border-radius: 4px; display: flex; align-items: center; justify-content: center;">Box</div>
    </yh-space>
  </div>
</DemoBlock>

## Wrap

Set whether to wrap automatically via `wrap` prop.

<DemoBlock title="Wrap" :ts-code="tsWrap" :js-code="jsWrap">
  <yh-space wrap :size="[10, 20]">
    <yh-button v-for="i in 15" :key="i">Button {{ i }}</yh-button>
  </yh-space>
</DemoBlock>

## Spacer

Customize separator via `spacer` slot.

<DemoBlock title="Spacer" :ts-code="tsSpacer" :js-code="jsSpacer">
  <yh-space :size="20">
    <template #spacer>
      <span style="color: var(--yh-text-color-placeholder);">|</span>
    </template>
    <yh-button text>Home</yh-button>
    <yh-button text>Products</yh-button>
    <yh-button text>About</yh-button>
  </yh-space>
</DemoBlock>

## API

### Props

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| direction | Spacing direction | `'horizontal' \| 'vertical'` | `'horizontal'` |
| size | Spacing size | `number \| 'small' \| 'default' \| 'large' \| [number, number]` | `'small'` |
| alignment | Alignment | `'stretch' \| 'start' \| 'end' \| 'center' \| 'baseline'` | `'center'` |
| wrap | Whether to wrap | `boolean` | `false` |
| fill | Whether to fill container | `boolean` | `false` |

### Slots

| Slot Name | Description |
| --- | --- |
| default | Spacing content |
| spacer | Custom spacer |
