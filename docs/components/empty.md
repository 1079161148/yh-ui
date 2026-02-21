# Empty 空状态

空状态时的展示占位图。

<script setup lang="ts">
import { ref } from 'vue'

const tsBasic = `<template>
  <yh-empty description="暂无数据" />
</template>`

const jsBasic = tsBasic

const tsImage = `<template>
  <yh-empty 
    image="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
    description="自定义图片" 
  />
</template>`

const jsImage = tsImage

const tsSize = `<template>
  <yh-empty :image-size="200" description="自定义图片大小" />
</template>`

const jsSize = tsSize

const tsBottom = `<template>
  <yh-empty description="您还没有任何订单">
    <yh-button type="primary">立即购买</yh-button>
  </yh-empty>
</template>`

const jsBottom = tsBottom
</script>

## 基础用法

展示最简单的空状态。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-empty description="暂无数据" />
</DemoBlock>

## 自定义图片

通过 `image` 属性传入图片的地址。

<DemoBlock title="自定义图片" :ts-code="tsImage" :js-code="jsImage">
  <yh-empty 
    image="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
    description="自定义图片" 
  />
</DemoBlock>

## 图片尺寸

通过 `image-size` 属性设置图片的大小。

<DemoBlock title="图片尺寸" :ts-code="tsSize" :js-code="jsSize">
  <yh-empty :image-size="200" description="自定义图片大小" />
</DemoBlock>

## 自定义底部内容

使用默认插槽可在底部添加自定义内容。

<DemoBlock title="自定义底部内容" :ts-code="tsBottom" :js-code="jsBottom">
  <yh-empty description="您还没有任何订单">
    <yh-button type="primary">立即购买</yh-button>
  </yh-empty>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| image | 图片地址 | `string` | — |
| image-size | 图片大小（宽度） | `number` | — |
| description | 描述文字 | `string` | — |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义底部内容 |
| image | 自定义图片 |
| description | 自定义描述文字 |
