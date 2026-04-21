# Space 间距

<script setup lang="ts">
import { ref } from 'vue'

const tsBasic = `<template>
  <yh-space>
    <yh-button>按钮 1</yh-button>
    <yh-button>按钮 2</yh-button>
    <yh-button>按钮 3</yh-button>
  </yh-space>
<\/template>`

const jsBasic = tsBasic

const tsVertical = `<template>
  <yh-space direction="vertical">
    <yh-button>按钮 1</yh-button>
    <yh-button>按钮 2</yh-button>
    <yh-button>按钮 3</yh-button>
  </yh-space>
<\/template>`

const jsVertical = tsVertical

const tsSize = `<template>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <yh-space size="mini">
      <yh-button>Mini 4px</yh-button>
      <yh-button>Mini 4px</yh-button>
    </yh-space>
    <yh-space size="small">
      <yh-button>Small 8px</yh-button>
      <yh-button>Small 8px</yh-button>
    </yh-space>
    <yh-space size="medium">
      <yh-button>Medium 16px</yh-button>
      <yh-button>Medium 16px</yh-button>
    </yh-space>
    <yh-space size="large">
      <yh-button>Large 24px</yh-button>
      <yh-button>Large 24px</yh-button>
    </yh-space>
    <yh-space :size="40">
      <yh-button>Custom 40px</yh-button>
      <yh-button>Custom 40px</yh-button>
    </yh-space>
  </div>
<\/template>`

const jsSize = tsSize

const tsAlignment = `<template>
  <div style="padding: 20px; border: 1px solid #ccc;">
    <yh-space align="center">
      <span>居中对齐:</span>
      <yh-button>按钮</yh-button>
      <div style="height: 60px; width: 60px; background: #eee; display: flex; align-items: center; justify-content: center;">Box</div>
    </yh-space>
  </div>
<\/template>`

const jsAlignment = tsAlignment

const tsJustify = `<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-space justify="start" fill style="border: 1px dashed #ccc; padding: 8px;">
      <yh-button>Start</yh-button>
      <yh-button>Start</yh-button>
    </yh-space>
    <yh-space justify="center" fill style="border: 1px dashed #ccc; padding: 8px;">
      <yh-button>Center</yh-button>
      <yh-button>Center</yh-button>
    </yh-space>
    <yh-space justify="end" fill style="border: 1px dashed #ccc; padding: 8px;">
      <yh-button>End</yh-button>
      <yh-button>End</yh-button>
    </yh-space>
    <yh-space justify="space-between" fill style="border: 1px dashed #ccc; padding: 8px;">
      <yh-button>Between</yh-button>
      <yh-button>Between</yh-button>
    </yh-space>
  </div>
<\/template>`

const jsJustify = tsJustify

const tsWrap = `<template>
  <yh-space wrap :size="[10, 20]">
    <yh-button v-for="i in 20" :key="i">按钮 {{ i }}</yh-button>
  </yh-space>
<\/template>`

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
<\/template>`

const jsSpacer = tsSpacer

const tsFill = `<template>
  <yh-space fill direction="vertical">
    <yh-button>撑满容器按钮 1</yh-button>
    <yh-button>撑满容器按钮 2</yh-button>
    <yh-button>撑满容器按钮 3</yh-button>
  </yh-space>
<\/template>`

const jsFill = tsFill

// Nuxt 使用示例
const tsNuxt = `<template>
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <!-- 基础间距，自动导入 -->
    <yh-space>
      <yh-button>Nuxt 按钮 1</yh-button>
      <yh-button>Nuxt 按钮 2</yh-button>
      <yh-button>Nuxt 按钮 3</yh-button>
    </yh-space>

    <!-- 结合 Nuxt 响应式布局 -->
    <yh-space wrap :size="gap">
      <yh-button v-for="item in items" :key="item">{{ item }}</yh-button>
    </yh-space>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 无需手动导入 YhSpace / YhButton
const gap = ref(16)
const items = ref(['首页', '产品', '服务', '关于我们'])
<\/script>`.replace(/\\\//g, '/')

const jsNuxt = tsNuxt.replace('lang="ts"', '')
</script>

设置组件之间的间距。

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

通过 `size` 属性设置间距大小，可选值为 `mini` (4px)、`small` (8px)、`medium` (16px)、`large` (24px)，也支持传入数字自定义像素大小，或数组 `[horizontal, vertical]`。

<DemoBlock title="不同间距" :ts-code="tsSize" :js-code="jsSize">
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <yh-space size="mini">
      <yh-button>Mini 4px</yh-button>
      <yh-button>Mini 4px</yh-button>
    </yh-space>
    <yh-space size="small">
      <yh-button>Small 8px</yh-button>
      <yh-button>Small 8px</yh-button>
    </yh-space>
    <yh-space size="medium">
      <yh-button>Medium 16px</yh-button>
      <yh-button>Medium 16px</yh-button>
    </yh-space>
    <yh-space size="large">
      <yh-button>Large 24px</yh-button>
      <yh-button>Large 24px</yh-button>
    </yh-space>
    <yh-space :size="40">
      <yh-button>Custom 40px</yh-button>
      <yh-button>Custom 40px</yh-button>
    </yh-space>
  </div>
</DemoBlock>

## 对齐方式

通过 `align` 属性设置对齐方式。

<DemoBlock title="对齐方式" :ts-code="tsAlignment" :js-code="jsAlignment">
  <div style="padding: 20px; border: 1px solid var(--yh-border-color-light);">
    <yh-space align="center">
      <span>居中对齐:</span>
      <yh-button>按钮</yh-button>
      <div style="height: 60px; width: 60px; background: var(--yh-fill-color-light); border-radius: 4px; display: flex; align-items: center; justify-content: center;">Box</div>
    </yh-space>
  </div>
</DemoBlock>

## 主轴对齐

通过 `justify` 属性设置主轴对齐方式，需配合 `fill` 属性使用。

<DemoBlock title="主轴对齐" :ts-code="tsJustify" :js-code="jsJustify">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-space justify="start" fill style="border: 1px dashed var(--yh-border-color-light); padding: 8px;">
      <yh-button>Start</yh-button>
      <yh-button>Start</yh-button>
    </yh-space>
    <yh-space justify="center" fill style="border: 1px dashed var(--yh-border-color-light); padding: 8px;">
      <yh-button>Center</yh-button>
      <yh-button>Center</yh-button>
    </yh-space>
    <yh-space justify="end" fill style="border: 1px dashed var(--yh-border-color-light); padding: 8px;">
      <yh-button>End</yh-button>
      <yh-button>End</yh-button>
    </yh-space>
    <yh-space justify="space-between" fill style="border: 1px dashed var(--yh-border-color-light); padding: 8px;">
      <yh-button>Between</yh-button>
      <yh-button>Between</yh-button>
    </yh-space>
  </div>
</DemoBlock>

## 自动换行

通过 `wrap` 属性设置是否自动换行。

<DemoBlock title="自动换行" :ts-code="tsWrap" :js-code="jsWrap">
  <yh-space wrap :size="[10, 20]">
    <yh-button v-for="i in 20" :key="i">按钮 {{ i }}</yh-button>
  </yh-space>
</DemoBlock>

## 填充容器

通过 `fill` 属性让间距组件撑满父容器宽度。

<DemoBlock title="填充容器" :ts-code="tsFill" :js-code="jsFill">
  <yh-space fill direction="vertical">
    <yh-button>撑满容器按钮 1</yh-button>
    <yh-button>撑满容器按钮 2</yh-button>
    <yh-button>撑满容器按钮 3</yh-button>
  </yh-space>
</DemoBlock>

## 分隔符

通过 `spacer` 属性传入分隔符文本，或使用 `#spacer` 插槽自定义分隔符。

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

## 在 Nuxt 中使用

Space 组件完全支持 Nuxt 3/4 的 SSR 渲染。间距的布局在服务端即可计算完成，首屏即呈现正确的间距效果，无需等待客户端激活。

<DemoBlock title="Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="display: flex; flex-direction: column; gap: 24px;">
    <yh-space>
      <yh-button>Nuxt 按钮 1</yh-button>
      <yh-button>Nuxt 按钮 2</yh-button>
      <yh-button>Nuxt 按钮 3</yh-button>
    </yh-space>
    <yh-space wrap :size="16">
      <yh-button>首页</yh-button>
      <yh-button>产品</yh-button>
      <yh-button>服务</yh-button>
      <yh-button>关于我们</yh-button>
    </yh-space>
  </div>
</DemoBlock>

**SSR 注意事项**：

- ✅ 间距方向 (direction)、大小 (size)、对齐 (align) 首屏即生效
- ✅ 自动换行 (wrap) 与填充 (fill) 支持 SSR
- ✅ 分隔符 (spacer) 在服务端正确渲染
- 💡 动态间距变化将在客户端激活后通过响应式系统自动完成

::: tip Nuxt 自动导入
在安装 `@yh-ui/nuxt` 模块后，`YhSpace` 组件会被自动注册，无需手动导入。
:::

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| direction | 间距方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| size | 间距大小 | `'mini' \| 'small' \| 'medium' \| 'large' \| number \| [SpaceSize, SpaceSize]` | `'small'` |
| align | 交叉轴对齐方式 | `'start' \| 'end' \| 'center' \| 'baseline' \| 'stretch'` | `'center'` |
| justify | 主轴对齐方式 | `'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| 'space-evenly'` | `'start'` |
| wrap | 是否自动换行（仅水平方向有效） | `boolean` | `false` |
| fill | 是否撑满父容器 | `boolean` | `false` |
| spacer | 间隔符文本 | `string \| number` | — |
| theme-overrides | 主题覆盖变量 | `ComponentThemeVars` | — |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 间距内的子元素 |
| spacer | 自定义分隔符内容 |

### Events

当前组件未暴露组件事件。

### Expose

当前组件未暴露公开实例方法或属性。

## 主题变量

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-space-spacer-padding` | 分隔符内边距 | `2px` |

### 类型导出

| 名称 | 说明 |
| --- | --- |
| `YhSpaceProps` | 组件 Props 类型 |
| `YhSpaceSlots` | 组件插槽类型 |
| `YhSpaceSize` | 间距尺寸联合类型 |
| `YhSpaceDirection` | 布局方向联合类型 |
| `YhSpaceAlign` | 交叉轴对齐联合类型 |
| `YhSpaceJustify` | 主轴对齐联合类型 |
| `YhSpaceInstance` | 组件实例类型 |
