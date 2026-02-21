# Empty

<script setup lang="ts">
import { ref } from 'vue'

const tsBasic = `<template>
  <yh-empty description="No Data" />
<\/template>`

const jsBasic = tsBasic

const tsImage = `<template>
  <yh-empty 
    image="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
    description="Custom Image" 
  />
<\/template>`

const jsImage = tsImage

const tsSize = `<template>
  <yh-empty :image-size="200" description="Custom Image Size" />
<\/template>`

const jsSize = tsSize

const tsBottom = `<template>
  <yh-empty description="No orders yet">
    <yh-button type="primary">Buy Now</yh-button>
  </yh-empty>
<\/template>`

const jsBottom = tsBottom

const tsSlotImage = `<template>
  <yh-empty description="Custom image slot">
    <template #image>
      <div style="display: flex; align-items: center; justify-content: center; width: 100px; height: 100px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
        <span style="font-size: 40px; color: #fff;">📦</span>
      </div>
    </template>
  </yh-empty>
<\/template>`

const jsSlotImage = tsSlotImage

const tsSlotDesc = `<template>
  <yh-empty>
    <template #description>
      <p style="color: #909399; margin: 0;">No results found, try <a href="#" style="color: #409eff;">modifying keywords</a></p>
    </template>
  </yh-empty>
<\/template>`

const jsSlotDesc = tsSlotDesc

// Nuxt usage example
const tsNuxt = `<template>
  <div>
    <yh-empty v-if="!dataList.length" description="No Data">
      <yh-button type="primary" @click="fetchData">Refresh Data</yh-button>
    </yh-empty>
    <div v-else>
      <!-- Data list -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// No need to manually import YhEmpty / YhButton
const dataList = ref([])

const fetchData = async () => {
  // Fetch data from Nuxt API route
  const { data } = await useFetch('/api/list')
  dataList.value = data.value || []
}
<\/script>`.replace(/\\\//g, '/')

const jsNuxt = tsNuxt.replace('lang="ts"', '')
</script>

Placeholder for empty states.

## Basic Usage

Display a simple empty state.

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

Set image width and height via `image-size` prop.

<DemoBlock title="Image Size" :ts-code="tsSize" :js-code="jsSize">
  <yh-empty :image-size="200" description="Custom Image Size" />
</DemoBlock>

## Custom Bottom Content

Add custom content at the bottom via default slot, such as action buttons.

<DemoBlock title="Custom Bottom Content" :ts-code="tsBottom" :js-code="jsBottom">
  <yh-empty description="No orders yet">
    <yh-button type="primary">Buy Now</yh-button>
  </yh-empty>
</DemoBlock>

## Custom Image Slot

Use the `#image` slot to fully customize the image area.

<DemoBlock title="Custom Image Slot" :ts-code="tsSlotImage" :js-code="jsSlotImage">
  <yh-empty description="Custom image slot">
    <template #image>
      <div style="display: flex; align-items: center; justify-content: center; width: 100px; height: 100px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
        <span style="font-size: 40px; color: #fff;">📦</span>
      </div>
    </template>
  </yh-empty>
</DemoBlock>

## Custom Description

Use the `#description` slot to customize the description text area.

<DemoBlock title="Custom Description" :ts-code="tsSlotDesc" :js-code="jsSlotDesc">
  <yh-empty>
    <template #description>
      <p style="color: #909399; margin: 0;">No results found, try <a href="#" style="color: #409eff;">modifying keywords</a></p>
    </template>
  </yh-empty>
</DemoBlock>

## Use in Nuxt

The Empty component fully supports Nuxt 3/4 SSR rendering. The empty state image and description are correctly rendered on the server, ensuring a complete empty state prompt is presented on the first screen, enhancing user experience.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <yh-empty description="No Data">
    <yh-button type="primary">Refresh Data</yh-button>
  </yh-empty>
</DemoBlock>

**SSR Notes**:

- ✅ Description text (description) and image (image) render correctly on first load
- ✅ Built-in SVG illustration fully output on the server
- ✅ Custom image size (image-size) takes effect on initial render
- 💡 Dynamic data loading and state switching logic is completed after client-side activation

::: tip Nuxt Auto Import
After installing the `@yh-ui/nuxt` module, the `YhEmpty` component is auto-registered, no manual import needed.
:::

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| image | Custom image URL | `string` | — |
| image-size | Image size in pixels | `number` | `100` |
| description | Description text | `string` | `'暂无数据'` |
| icon | Custom image component | `string \| Component` | — |
| theme-overrides | Theme override variables | `ComponentThemeVars` | — |

### Slots

| Slot Name | Description |
| --- | --- |
| default | Custom bottom content (e.g. action buttons) |
| image | Custom image area |
| description | Custom description text |

## Theme Variables

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-empty-padding` | Container padding | `40px 0` |
| `--yh-empty-description-color` | Description text color | `var(--yh-text-color-secondary, #909399)` |
| `--yh-empty-description-font-size` | Description font size | `14px` |
| `--yh-empty-ellipse-color` | Default illustration ellipse color | `#f5f5f7` |
| `--yh-empty-image-fill` | Default illustration primary fill color | `#aeb8c2` |
| `--yh-empty-image-fill2` | Default illustration secondary fill color | `#f5f5f7` |
| `--yh-empty-plane-bg` | Default illustration plane background | `#f5f5f7` |
| `--yh-empty-comment-fill` | Default illustration comment fill color | `#dce0e6` |
