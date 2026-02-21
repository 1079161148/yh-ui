# Grid 网格布局

<script setup lang="ts">
import { ref } from 'vue'

const tsBasic = `<template>
  <yh-grid :cols="3" :gap="16">
    <yh-grid-item>
      <div class="grid-demo-item">1</div>
    </yh-grid-item>
    <yh-grid-item>
      <div class="grid-demo-item">2</div>
    </yh-grid-item>
    <yh-grid-item>
      <div class="grid-demo-item">3</div>
    </yh-grid-item>
  </yh-grid>
<\/template>`

const jsBasic = tsBasic

const tsSpan = `<template>
  <yh-grid :cols="6" :gap="16">
    <yh-grid-item :span="2">
      <div class="grid-demo-item">span=2</div>
    </yh-grid-item>
    <yh-grid-item :span="3">
      <div class="grid-demo-item">span=3</div>
    </yh-grid-item>
    <yh-grid-item :span="1">
      <div class="grid-demo-item">span=1</div>
    </yh-grid-item>
    <yh-grid-item :span="6">
      <div class="grid-demo-item">span=6 (整行)</div>
    </yh-grid-item>
  </yh-grid>
<\/template>`

const jsSpan = tsSpan

const tsOffset = `<template>
  <yh-grid :cols="6" :gap="16">
    <yh-grid-item :span="2">
      <div class="grid-demo-item">A</div>
    </yh-grid-item>
    <yh-grid-item :span="2" :offset="2">
      <div class="grid-demo-item">B (offset=2)</div>
    </yh-grid-item>
  </yh-grid>
<\/template>`

const jsOffset = tsOffset

const tsGap = `<template>
  <yh-grid :cols="4" :gap="[8, 24]">
    <yh-grid-item v-for="i in 8" :key="i">
      <div class="grid-demo-item">{{ i }}</div>
    </yh-grid-item>
  </yh-grid>
<\/template>`

const jsGap = tsGap

const tsCustomCols = `<template>
  <yh-grid cols="200px 1fr 200px" :gap="16">
    <yh-grid-item>
      <div class="grid-demo-item">200px</div>
    </yh-grid-item>
    <yh-grid-item>
      <div class="grid-demo-item">1fr</div>
    </yh-grid-item>
    <yh-grid-item>
      <div class="grid-demo-item">200px</div>
    </yh-grid-item>
  </yh-grid>
<\/template>`

const jsCustomCols = tsCustomCols

const tsSuffix = `<template>
  <yh-grid :cols="6" :gap="16">
    <yh-grid-item :span="2">
      <div class="grid-demo-item">内容</div>
    </yh-grid-item>
    <yh-grid-item suffix>
      <div class="grid-demo-item">Suffix</div>
    </yh-grid-item>
  </yh-grid>
<\/template>`

const jsSuffix = tsSuffix

// Nuxt 使用示例
const tsNuxt = `<template>
  <div>
    <!-- 使用 Grid 布局展示商品卡片，组件在 Nuxt 中自动导入 -->
    <yh-typography-title :level="3">商品列表</yh-typography-title>

    <yh-grid :cols="4" :gap="16" style="margin-top: 16px;">
      <yh-grid-item v-for="item in products" :key="item.id">
        <div class="product-card">
          <yh-typography-title :level="5">{{ item.name }}</yh-typography-title>
          <yh-typography-text type="danger">¥ {{ item.price }}</yh-typography-text>
        </div>
      </yh-grid-item>
    </yh-grid>
  </div>
</template>

<script setup lang="ts">
// 组件在 Nuxt 中自动导入，无需手动注册
interface Product {
  id: number
  name: string
  price: number
}

// 使用 useFetch 从 API 获取商品数据
const { data } = await useFetch<{ items: Product[] }>('/api/products')
const products = computed(() => data.value?.items ?? [])
<\/script>

<style scoped>
.product-card {
  padding: 16px;
  border: 1px solid var(--yh-border-color, #dcdfe6);
  border-radius: 4px;
}
<\/style>`

const jsNuxt = tsNuxt
  .replace('lang="ts"', '')
  .replace(/interface Product \{[\s\S]*?\}\n\n/, '')
  .replace('<{ items: Product[] }>', '')
</script>

<style>
.grid-demo-item {
  background: var(--yh-color-primary-light-8, #d9ecff);
  color: var(--yh-color-primary, #409eff);
  padding: 16px;
  text-align: center;
  border-radius: 4px;
  font-weight: 500;
}
.grid-demo-product-card {
  padding: 16px;
  border: 1px solid var(--yh-border-color, #dcdfe6);
  border-radius: 4px;
}
</style>

基于 CSS Grid 的网格布局组件，相比 Row/Col 的 Flex 布局，提供更强大的二维布局能力。

## 基础用法

设置 `cols` 属性定义列数，`gap` 属性设置间距。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-grid :cols="3" :gap="16">
    <yh-grid-item>
      <div class="grid-demo-item">1</div>
    </yh-grid-item>
    <yh-grid-item>
      <div class="grid-demo-item">2</div>
    </yh-grid-item>
    <yh-grid-item>
      <div class="grid-demo-item">3</div>
    </yh-grid-item>
  </yh-grid>
</DemoBlock>

## 跨列

使用 `span` 属性设置 GridItem 跨越的列数。

<DemoBlock title="跨列" :ts-code="tsSpan" :js-code="jsSpan">
  <yh-grid :cols="6" :gap="16">
    <yh-grid-item :span="2">
      <div class="grid-demo-item">span=2</div>
    </yh-grid-item>
    <yh-grid-item :span="3">
      <div class="grid-demo-item">span=3</div>
    </yh-grid-item>
    <yh-grid-item :span="1">
      <div class="grid-demo-item">span=1</div>
    </yh-grid-item>
    <yh-grid-item :span="6">
      <div class="grid-demo-item">span=6 (整行)</div>
    </yh-grid-item>
  </yh-grid>
</DemoBlock>

## 偏移

使用 `offset` 属性设置 GridItem 的列偏移量。

<DemoBlock title="偏移" :ts-code="tsOffset" :js-code="jsOffset">
  <yh-grid :cols="6" :gap="16">
    <yh-grid-item :span="2">
      <div class="grid-demo-item">A</div>
    </yh-grid-item>
    <yh-grid-item :span="2" :offset="2">
      <div class="grid-demo-item">B (offset=2)</div>
    </yh-grid-item>
  </yh-grid>
</DemoBlock>

## 不同间距

`gap` 属性支持传入数组 `[行间距, 列间距]` 来分别设置行列间距。

<DemoBlock title="不同间距" :ts-code="tsGap" :js-code="jsGap">
  <yh-grid :cols="4" :gap="[8, 24]">
    <yh-grid-item v-for="i in 8" :key="i">
      <div class="grid-demo-item">{{ i }}</div>
    </yh-grid-item>
  </yh-grid>
</DemoBlock>

## 自定义列模板

`cols` 属性传入字符串时，将直接作为 CSS `grid-template-columns` 的值，实现灵活布局。

<DemoBlock title="自定义列模板" :ts-code="tsCustomCols" :js-code="jsCustomCols">
  <yh-grid cols="200px 1fr 200px" :gap="16">
    <yh-grid-item>
      <div class="grid-demo-item">200px</div>
    </yh-grid-item>
    <yh-grid-item>
      <div class="grid-demo-item">1fr</div>
    </yh-grid-item>
    <yh-grid-item>
      <div class="grid-demo-item">200px</div>
    </yh-grid-item>
  </yh-grid>
</DemoBlock>

## Suffix 后缀元素

设置 `suffix` 属性可将 GridItem 固定到行末。

<DemoBlock title="Suffix 后缀元素" :ts-code="tsSuffix" :js-code="jsSuffix">
  <yh-grid :cols="6" :gap="16">
    <yh-grid-item :span="2">
      <div class="grid-demo-item">内容</div>
    </yh-grid-item>
    <yh-grid-item suffix>
      <div class="grid-demo-item">Suffix</div>
    </yh-grid-item>
  </yh-grid>
</DemoBlock>

## 在 Nuxt 中使用

Grid 组件完全支持 Nuxt 3/4 的 SSR 渲染。以下示例展示了在 Nuxt 中使用 Grid 布局构建商品列表页面，结合 `useFetch` 异步加载数据。

<DemoBlock title="Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div>
    <yh-typography-title :level="3">商品列表</yh-typography-title>
    <yh-grid :cols="4" :gap="16" style="margin-top: 16px;">
      <yh-grid-item v-for="i in 4" :key="i">
        <div class="grid-demo-product-card">
          <yh-typography-title :level="5">商品 {{ i }}</yh-typography-title>
          <yh-typography-text type="danger">¥ {{ (i * 99.9).toFixed(1) }}</yh-typography-text>
        </div>
      </yh-grid-item>
    </yh-grid>
  </div>
</DemoBlock>

**SSR 注意事项**：

- ✅ 所有 Props 和样式完全支持
- ✅ CSS Grid 布局正确渲染
- ✅ 插槽内容完整渲染
- ✅ `cols` 字符串模板模式正常输出
- ✅ `span`、`offset`、`suffix` 等定位属性完美工作

::: tip SSR 安全性
Grid 组件已通过完整的 SSR 测试，确保服务端和客户端渲染完全一致，Hydration 无错误。
:::

## API

### Grid Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| cols | 列数或 CSS 列模板 | `number \| string` | `12` |
| gap | 间距 | `number \| string \| [number \| string, number \| string]` | `0` |
| colGap | 列间距（优先于 gap） | `number \| string` | `0` |
| rowGap | 行间距（优先于 gap） | `number \| string` | `0` |
| collapsed | 是否折叠 | `boolean` | `false` |
| collapsedRows | 折叠后显示行数 | `number` | `1` |
| justifyItems | 水平对齐 | `'start' \| 'end' \| 'center' \| 'stretch'` | — |
| alignItems | 垂直对齐 | `'start' \| 'end' \| 'center' \| 'stretch'` | — |
| themeOverrides | 主题覆盖变量 | `ComponentThemeVars` | — |

### GridItem Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| span | 跨列数 | `number` | `1` |
| offset | 偏移列数 | `number` | `0` |
| suffix | 是否为后缀元素（固定行末） | `boolean` | `false` |
| themeOverrides | 主题覆盖变量 | `ComponentThemeVars` | — |

### Slots

Grid 和 GridItem 均支持 `default` 默认插槽。

## 主题变量

Grid 组件支持通过覆盖以下 CSS 变量来自定义局部样式：

### Grid 变量

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-grid-gap` | 网格间距 | `0` |
| `--yh-grid-col-gap` | 网格列间距 | `var(--yh-grid-gap, 0)` |
| `--yh-grid-row-gap` | 网格行间距 | `var(--yh-grid-gap, 0)` |

### GridItem 变量

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-grid-item-padding` | 项目内边距 | `0` |
