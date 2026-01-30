# Pagination 分页

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
    <div class="example-demonstration">页数较少</div>
    <yh-pagination layout="prev, pager, next" :total="50" />
  </div>
  <div class="example-pagination-block">
    <div class="example-demonstration">大于 7 页时折叠</div>
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
    <span style="padding: 0 15px;">当前处于自定义插槽位置</span>
  </yh-pagination>

  <yh-pagination
    layout="prev, pager, next"
    :total="50"
    style="margin-top: 20px;"
  >
    <template #prev-icon>
      <span>上一页</span>
    </template>
    <template #next-icon>
      <span>下一页</span>
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

当数据量过多时，使用分页分解数据。

## 基础用法

设置 `layout` 属性，用逗号分隔布局组件。默认值为 `prev, pager, next`。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div class="yh-demo-flex" style="flex-direction: column; align-items: flex-start; width: 100%;">
    <div style="margin-bottom: 10px; color: var(--yh-text-color-secondary); font-size: 14px;">页数较少</div>
    <yh-pagination layout="prev, pager, next" :total="50" />
    <div style="margin: 20px 0 10px; color: var(--yh-text-color-secondary); font-size: 14px;">大于 7 页时折叠</div>
    <yh-pagination layout="prev, pager, next" :total="1000" v-model:current-page="currentPage1" />
  </div>
</DemoBlock>

## 带有背景颜色

设置 `background` 属性可以为分页按钮添加背景颜色。

<DemoBlock title="带有背景颜色" :ts-code="tsBackground" :js-code="jsBackground">
  <yh-pagination background layout="prev, pager, next" :total="1000" v-model:current-page="currentPage2" />
</DemoBlock>

## 附加功能

通过组合 `layout` 中的子组件名，可以开启更多功能。
可选子组件：`total` (总条数)、`sizes` (每页条数选择)、`prev` (上一页)、`pager` (页码)、`next` (下一页)、`jumper` (跳转)、`slot` (自定义内容)。

<DemoBlock title="附加功能" :ts-code="tsSizes" :js-code="jsSizes">
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

## 小型分页

设置 `small` 属性可以使用小型分页，适用于空间有限的场景。小型分页下，按钮和输入框的尺寸都会相应缩小。

<DemoBlock title="小型分页" :ts-code="tsSmall" :js-code="jsSmall">
  <div class="yh-demo-flex" style="flex-direction: column; align-items: flex-start; width: 100%;">
    <yh-pagination small layout="prev, pager, next" :total="50" />
    <yh-pagination small background layout="prev, pager, next" :total="50" style="margin-top: 10px;" />
  </div>
</DemoBlock>

## 圆形分页

设置 `circle` 属性可以将分页按钮设置为圆形。

<DemoBlock title="圆形分页" :ts-code="tsCircle" :js-code="jsCircle">
  <div class="yh-demo-flex" style="flex-direction: column; align-items: flex-start; width: 100%;">
    <yh-pagination circle layout="prev, pager, next" :total="50" />
    <yh-pagination circle background layout="prev, pager, next" :total="50" style="margin-top: 10px;" />
  </div>
</DemoBlock>

## 自定义内容与图标

可以通过插槽自定义分页组件的内容或翻页图标。

<DemoBlock title="自定义内容与图标" :ts-code="tsCustom" :js-code="jsCustom">
  <div class="yh-demo-flex" style="flex-direction: column; align-items: flex-start; width: 100%;">
    <yh-pagination layout="prev, slot, next" :total="50">
      <span style="padding: 0 15px; color: var(--yh-color-primary);">[ 自定义插槽内容 ]</span>
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

## 在 Nuxt 中使用

Pagination 组件完全支持 Nuxt 3/4 的 SSR 渲染。在 Nuxt 项目中使用时，组件会自动导入，无需手动注册。

<DemoBlock title="Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="display: flex; flex-direction: column; align-items: flex-start; width: 100%;">
    <yh-pagination
      v-model:current-page="nuxtPage"
      layout="prev, pager, next"
      :total="100"
      @current-change="nuxtHandleChange"
    />
  </div>
</DemoBlock>

**SSR 特性**：

- ✅ 支持服务端首屏渲染（SEO 友好）
- ✅ 自动激活客户端注水（Hydration）
- ✅ 异步数据同步绑定
- ✅ 完美兼容 Nuxt 的自动导入机制

::: tip
在 Nuxt 生态中，配合 `useFetch` 或 `useAsyncData` 使用分页时，请确保 `v-model:current-page` 绑定的变量发生变化时重新触发数据请求。
:::

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `current-page / v-model:current-page` | 当前页码 | `number` | `1` |
| `total` | 总条数 | `number` | `0` |
| `page-size / v-model:page-size` | 每页条数 | `number` | `10` |
| `page-sizes` | 每页显示个数选择器的选项设置 | `number[]` | `[10, 20, 30, 40, 50, 100]` |
| `layout` | 组件布局，子组件名用逗号隔开 (可选值：`prev`, `pager`, `next`, `jumper`, `total`, `sizes`, `slot`) | `string` | `'prev, pager, next'` |
| `pager-count` | 页码按钮的数量，当总页数超过该值时会折叠 | `number` | `7` |
| `background` | 是否为背景颜色模式 | `boolean` | `false` |
| `circle` | 是否使用圆形分页 | `boolean` | `false` |
| `small` | 是否使用小型分页 | `boolean` | `false` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `hide-on-single-page` | 只有一页时是否隐藏 | `boolean` | `false` |
| `prev-text` | 替代图标的文字 - 上一页 | `string` | — |
| `next-text` | 替代图标的文字 - 下一页 | `string` | — |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `size-change` | pageSize 改变时触发 | `(val: number) => void` |
| `current-change` | currentPage 改变时触发 | `(val: number) => void` |
| `prev-click` | 用户点击上一页按钮改变当前页后触发 | `(val: number) => void` |
| `next-click` | 用户点击下一页按钮改变当前页后触发 | `(val: number) => void` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| `prev-icon` | 自定义上一页图标 |
| `next-icon` | 自定义下一页图标 |
| `default` | 自定义内容 (需在 layout 中包含 `slot` 项时生效) |

### Expose

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
| `currentPage` | 当前页码 | `number` |
| `pageSize` | 每页条数 | `number` |
| `pageCount` | 总页数 | `number` |

### 主题变量 (CSS Variables)

组件支持通过覆盖以下 CSS 变量来自定义局部样式：

| 变量名 | 默认值 |
| --- | --- |
| `--yh-pagination-font-size` | `14px` |
| `--yh-pagination-bg-color` | `transparent` |
| `--yh-pagination-text-color` | `var(--yh-text-color-regular)` |
| `--yh-pagination-btn-width` | `32px` |
| `--yh-pagination-btn-height` | `32px` |
| `--yh-pagination-btn-hover-color` | `var(--yh-color-primary)` |
| `--yh-pagination-item-active-bg-color` | `var(--yh-color-primary)` |
| `--yh-pagination-item-active-color` | `#ffffff` |
