# Empty

Placeholder for empty states.

<script setup lang="ts">
import { ref } from 'vue'

const tsBasic = `<template>
  <yh-empty description="No Data" />
</template>`

const jsBasic = tsBasic

const tsImage = `<template>
  <yh-empty 
    image="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
    description="Custom Image" 
  />
</template>`

const jsImage = tsImage

const tsSize = `<template>
  <yh-empty :image-size="200" description="Custom Image Size" />
</template>`

const jsSize = tsSize

const tsBottom = `<template>
  <yh-empty description="No orders yet">
    <yh-button type="primary">Buy Now</yh-button>
  </yh-empty>
</template>`

const jsBottom = tsBottom
</script>

## Basic Usage

Display simple empty state.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-empty description="No Data" />
</DemoBlock>

## Custom Image

Set image URL via `image` prop.

<DemoBlock title="Custom Image" :ts-code="tsImage" :js-code="jsImage">
  <yh-empty 
    image="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
    description="Custom Image" 
  />
</DemoBlock>

## Image Size

Set image width via `image-size` prop.

<DemoBlock title="Image Size" :ts-code="tsSize" :js-code="jsSize">
  <yh-empty :image-size="200" description="Custom Image Size" />
</DemoBlock>

## Custom Bottom Content

Add custom content at the bottom via default slot.

<DemoBlock title="Custom Bottom Content" :ts-code="tsBottom" :js-code="jsBottom">
  <yh-empty description="No orders yet">
    <yh-button type="primary">Buy Now</yh-button>
  </yh-empty>
</DemoBlock>

## API

### Props

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| image | Image URL | `string` | — |
| image-size | Image size (width) | `number` | — |
| description | Description text | `string` | — |

### Slots

| Slot Name | Description |
| --- | --- |
| default | Custom bottom content |
| image | Custom image |
| description | Custom description text |
