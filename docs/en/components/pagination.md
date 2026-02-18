# Pagination

<script setup lang="ts">
import { ref } from 'vue'

const currentPage1 = ref(1)
const currentPage2 = ref(1)
const currentPage3 = ref(1)
const currentPage4 = ref(1)
const pageSize3 = ref(20)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}

const tsBasic = `<template>
  <div class="example-pagination-block">
    <div class="example-demonstration">Fewer pages</div>
    <yh-pagination layout="prev, pager, next" :total="50" />
  </div>
  <div class="example-pagination-block">
    <div class="example-demonstration">Fold when more than 7 pages</div>
    <yh-pagination 
      layout="prev, pager, next" 
      :total="1000" 
      v-model:current-page="currentPage" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const currentPage = ref(1)
<\/script>`

const jsBasic = tsBasic.replace('lang="ts"', '')

const tsBackground = `<template>
  <yh-pagination 
    background 
    layout="prev, pager, next" 
    :total="1000" 
    v-model:current-page="currentPage" 
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const currentPage = ref(1)
<\/script>`

const jsBackground = tsBackground.replace('lang="ts"', '')

const tsSizes = `<template>
  <yh-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="[10, 20, 30, 40, 50, 100]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="400"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const currentPage = ref(1)
const pageSize = ref(20)
const handleSizeChange = (val: number) => console.log(val)
const handleCurrentChange = (val: number) => console.log(val)
<\/script>`

const jsSizes = tsSizes.replace('lang="ts"', '').replace(/: number/g, '')

const tsSmall = `<template>
  <yh-pagination small layout="prev, pager, next" :total="50" />
  <yh-pagination 
    small 
    background 
    layout="prev, pager, next" 
    :total="50" 
    style="margin-top: 10px;" 
  />
</template>`

const jsSmall = tsSmall

const tsCircle = `<template>
  <yh-pagination circle layout="prev, pager, next" :total="50" />
  <yh-pagination 
    circle 
    background 
    layout="prev, pager, next" 
    :total="50" 
    style="margin-top: 10px;" 
  />
</template>`

const jsCircle = tsCircle

const tsCustom = `<template>
  <yh-pagination
    layout="prev, slot, next"
    :total="50"
  >
    <span style="padding: 0 15px;">Currently at the custom slot position</span>
  </yh-pagination>

  <yh-pagination
    layout="prev, pager, next"
    :total="50"
    style="margin-top: 20px;"
  >
    <template #prev-icon>
      <span>Prev</span>
    </template>
    <template #next-icon>
      <span>Next</span>
    </template>
  </yh-pagination>
</template>`

const jsCustom = tsCustom

const tsNuxt = `<template>
  <yh-pagination
    v-model:current-page="nuxtPage"
    layout="prev, pager, next"
    :total="100"
    @current-change="nuxtHandleChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const nuxtPage = ref(1)
const nuxtHandleChange = (val: number) => {
  console.log('Nuxt Page Changed:', val)
}
<\/script>`

const jsNuxt = tsNuxt.replace('lang="ts"', '').replace(/: number/g, '')

const nuxtPage = ref(1)
const nuxtHandleChange = (val: number) => {
  console.log('Nuxt Page Changed:', val)
}
</script>

Divide data with pagination when there is too much of it.

## Basic Usage

Set the `layout` property, using commas to separate layout components. Default is `prev, pager, next`.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div class="yh-demo-flex" style="flex-direction: column; align-items: flex-start; width: 100%;">
    <div style="margin-bottom: 10px; color: var(--yh-text-color-secondary); font-size: 14px;">Fewer pages</div>
    <yh-pagination layout="prev, pager, next" :total="50" />
    <div style="margin: 20px 0 10px; color: var(--yh-text-color-secondary); font-size: 14px;">Fold when more than 7 pages</div>
    <yh-pagination layout="prev, pager, next" :total="1000" v-model:current-page="currentPage1" />
  </div>
</DemoBlock>

## With Background Color

Set the `background` property to add a background color to the pagination buttons.

<DemoBlock title="With Background Color" :ts-code="tsBackground" :js-code="jsBackground">
  <yh-pagination background layout="prev, pager, next" :total="1000" v-model:current-page="currentPage2" />
</DemoBlock>

## Extra Features

Enable more features by combining sub-component names in `layout`.
Available sub-components: `total` (total count), `sizes` (items per page selector), `prev` (previous page), `pager` (page numbers), `next` (next page), `jumper` (jump to page), `slot` (custom content).

<DemoBlock title="Extra Features" :ts-code="tsSizes" :js-code="jsSizes">
  <yh-pagination
    v-model:current-page="currentPage3"
    v-model:page-size="pageSize3"
    :page-sizes="[10, 20, 30, 40, 50, 100]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="400"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</DemoBlock>

## Small Pagination

Set the `small` property to use small-sized pagination, suitable for scenarios with limited space. Buttons and input fields will be correspondingly smaller.

<DemoBlock title="Small Pagination" :ts-code="tsSmall" :js-code="jsSmall">
  <div class="yh-demo-flex" style="flex-direction: column; align-items: flex-start; width: 100%;">
    <yh-pagination small layout="prev, pager, next" :total="50" />
    <yh-pagination small background layout="prev, pager, next" :total="50" style="margin-top: 10px;" />
  </div>
</DemoBlock>

## Circle Pagination

Set the `circle` property to make pagination buttons circular.

<DemoBlock title="Circle Pagination" :ts-code="tsCircle" :js-code="jsCircle">
  <div class="yh-demo-flex" style="flex-direction: column; align-items: flex-start; width: 100%;">
    <yh-pagination circle layout="prev, pager, next" :total="50" />
    <yh-pagination circle background layout="prev, pager, next" :total="50" style="margin-top: 10px;" />
  </div>
</DemoBlock>

## Custom Content and Icons

Customize pagination component content or paging icons via slots.

<DemoBlock title="Custom Content and Icons" :ts-code="tsCustom" :js-code="jsCustom">
  <div class="yh-demo-flex" style="flex-direction: column; align-items: flex-start; width: 100%;">
    <yh-pagination layout="prev, slot, next" :total="50">
      <span style="padding: 0 15px; color: var(--yh-color-primary);">[ Custom Slot Content ]</span>
    </yh-pagination>
    <yh-pagination layout="prev, pager, next" :total="50" style="margin-top: 20px;">
      <template #prev-icon>
        <span style="font-size: 12px;">Back</span>
      </template>
      <template #next-icon>
        <span style="font-size: 12px;">Forward</span>
      </template>
    </yh-pagination>
  </div>
</DemoBlock>

## Use in Nuxt

The Pagination component fully supports Nuxt 3/4 SSR rendering. In Nuxt projects, the component is auto-imported.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="display: flex; flex-direction: column; align-items: flex-start; width: 100%;">
    <yh-pagination
      v-model:current-page="nuxtPage"
      layout="prev, pager, next"
      :total="100"
      @current-change="nuxtHandleChange"
    />
  </div>
</DemoBlock>

**SSR Features**:

- ✅ Supports Server-Side Rendering (SEO-friendly)
- ✅ Automatic Client-Side Hydration
- ✅ Async Data Sync Binding
- ✅ Perfect Compatibility with Nuxt's Auto-import mechanism

::: tip
When using pagination with `useFetch` or `useAsyncData` in the Nuxt ecosystem, ensure that changing the `v-model:current-page` variable re-triggers the data request.
:::

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| `current-page / v-model:current-page` | Current page number | `number` | `1` |
| `total` | Total item count | `number` | `0` |
| `page-size / v-model:page-size` | Items per page | `number` | `10` |
| `page-sizes` | Options for the page size selector | `number[]` | `[10, 20, 30, 40, 50, 100]` |
| `layout` | Component layout, sub-components separated by commas (Options: `prev`, `pager`, `next`, `jumper`, `total`, `sizes`, `slot`) | `string` | `'prev, pager, next'` |
| `pager-count` | Maximum number of pager buttons; will fold when total pages exceed this value | `number` | `7` |
| `background` | Whether to enable background color mode | `boolean` | `false` |
| `circle` | Whether to use circular pagination buttons | `boolean` | `false` |
| `small` | Whether to use small pagination | `boolean` | `false` |
| `disabled` | Whether to disable | `boolean` | `false` |
| `hide-on-single-page` | Whether to hide pagination when there's only one page | `boolean` | `false` |
| `prev-text` | Text string for the "previous page" button (overrides icon) | `string` | — |
| `next-text` | Text string for the "next page" button (overrides icon) | `string` | — |

### Events

| Event Name | Description | Callback Parameters |
| --- | --- | --- |
| `size-change` | Triggered when `pageSize` changes | `(val: number) => void` |
| `current-change` | Triggered when `currentPage` changes | `(val: number) => void` |
| `prev-click` | Triggered when user clicks the "previous" button | `(val: number) => void` |
| `next-click` | Triggered when user clicks the "next" button | `(val: number) => void` |

### Slots

| Slot Name | Description |
| --- | --- |
| `prev-icon` | Custom previous page icon |
| `next-icon` | Custom next page icon |
| `default` | Custom content (requires `slot` in `layout`) |

### Expose

| Name | Description | Type |
| --- | --- | --- |
| `currentPage` | Current page number | `number` |
| `pageSize` | Items per page | `number` |
| `pageCount` | Total page count | `number` |

### Theme Variables

Customize localized styles by overriding these CSS variables:

| Variable | Default |
| --- | --- |
| `--yh-pagination-font-size` | `14px` |
| `--yh-pagination-bg-color` | `transparent` |
| `--yh-pagination-text-color` | `var(--yh-text-color-regular)` |
| `--yh-pagination-btn-width` | `32px` |
| `--yh-pagination-btn-height` | `32px` |
| `--yh-pagination-btn-hover-color` | `var(--yh-color-primary)` |
| `--yh-pagination-item-active-bg-color` | `var(--yh-color-primary)` |
| `--yh-pagination-item-active-color` | `#ffffff` |
