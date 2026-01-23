<script setup lang="ts">
const tsBasic = `<template>
  <yh-row class="demo-row">
    <yh-col :span="24"><div class="grid-content bg-purple-dark">24</div></yh-col>
  </yh-row>
  <yh-row class="demo-row">
    <yh-col :span="12"><div class="grid-content bg-purple">12</div></yh-col>
    <yh-col :span="12"><div class="grid-content bg-purple-light">12</div></yh-col>
  </yh-row>
  <yh-row class="demo-row">
    <yh-col :span="8"><div class="grid-content bg-purple">8</div></yh-col>
    <yh-col :span="8"><div class="grid-content bg-purple-light">8</div></yh-col>
    <yh-col :span="8"><div class="grid-content bg-purple">8</div></yh-col>
  </yh-row>
  <yh-row class="demo-row">
    <yh-col :span="6"><div class="grid-content bg-purple">6</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple-light">6</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">6</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple-light">6</div></yh-col>
  </yh-row>
<\/template>

<style scoped>
.demo-row {
  margin-bottom: 20px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
.bg-purple-dark { background: #99a9bf; }
.bg-purple { background: #d3dce6; color: #5e6d82; }
.bg-purple-light { background: #e5e9f2; color: #5e6d82; }
<\/style>`

const jsBasic = tsBasic

const tsGutter = `<template>
  <yh-row :gutter="20">
    <yh-col :span="6"><div class="grid-content bg-purple">6</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">6</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">6</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">6</div></yh-col>
  </yh-row>
<\/template>

<style scoped>
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  background: #d3dce6;
}
<\/style>`

const jsGutter = tsGutter

const tsMixed = `<template>
  <yh-row :gutter="20" class="demo-row">
    <yh-col :span="16"><div class="grid-content bg-purple">16</div></yh-col>
    <yh-col :span="8"><div class="grid-content bg-purple-light">8</div></yh-col>
  </yh-row>
  <yh-row :gutter="20" class="demo-row">
    <yh-col :span="8"><div class="grid-content bg-purple">8</div></yh-col>
    <yh-col :span="8"><div class="grid-content bg-purple-light">8</div></yh-col>
    <yh-col :span="4"><div class="grid-content bg-purple">4</div></yh-col>
    <yh-col :span="4"><div class="grid-content bg-purple-light">4</div></yh-col>
  </yh-row>
<\/template>

<style scoped>
.demo-row { margin-bottom: 20px; }
.grid-content { border-radius: 4px; min-height: 36px; }
.bg-purple { background: #d3dce6; }
.bg-purple-light { background: #e5e9f2; }
<\/style>`

const jsMixed = tsMixed

const tsOffset = `<template>
  <yh-row :gutter="20" class="demo-row">
    <yh-col :span="6"><div class="grid-content bg-purple">6</div></yh-col>
    <yh-col :span="6" :offset="6"><div class="grid-content bg-purple">6 offset-6</div></yh-col>
  </yh-row>
  <yh-row :gutter="20" class="demo-row">
    <yh-col :span="6" :offset="6"><div class="grid-content bg-purple">6 offset-6</div></yh-col>
    <yh-col :span="6" :offset="6"><div class="grid-content bg-purple">6 offset-6</div></yh-col>
  </yh-row>
<\/template>

<style scoped>
.demo-row { margin-bottom: 20px; }
.grid-content { border-radius: 4px; min-height: 36px; background: #d3dce6; }
<\/style>`

const jsOffset = tsOffset

const tsAlign = `<template>
  <yh-row justify="start" class="demo-row">
    <yh-col :span="6"><div class="grid-content bg-purple">start</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple-light">start</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">start</div></yh-col>
  </yh-row>
  <yh-row justify="center" class="demo-row">
    <yh-col :span="6"><div class="grid-content bg-purple">center</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple-light">center</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">center</div></yh-col>
  </yh-row>
  <yh-row justify="end" class="demo-row">
    <yh-col :span="6"><div class="grid-content bg-purple">end</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple-light">end</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">end</div></yh-col>
  </yh-row>
  <yh-row justify="space-between" class="demo-row">
    <yh-col :span="6"><div class="grid-content bg-purple">space-between</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple-light">space-between</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">space-between</div></yh-col>
  </yh-row>
  <yh-row justify="space-around" class="demo-row">
    <yh-col :span="6"><div class="grid-content bg-purple">space-around</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple-light">space-around</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">space-around</div></yh-col>
  </yh-row>
<\/template>

<style scoped>
.demo-row { margin-bottom: 20px; }
.grid-content { border-radius: 4px; min-height: 36px; line-height: 36px; text-align: center; }
.bg-purple { background: #d3dce6; color: #5e6d82; }
.bg-purple-light { background: #e5e9f2; color: #5e6d82; }
<\/style>`

const jsAlign = tsAlign

// Nuxt 使用示例
const tsNuxt = `<template>
  <yh-row :gutter="20">
    <yh-col :span="12">
      <div style="background: var(--yh-color-primary-light-8); padding: 20px; border-radius: 8px; text-align: center; border: 1px dashed var(--yh-color-primary);">
        <yh-icon name="success" :size="24" color="var(--yh-color-primary)" />
        <p style="margin: 8px 0 0; color: var(--yh-color-primary-dark-2);">Nuxt Auto Import</p>
      </div>
    </yh-col>
    <yh-col :span="12">
      <div style="background: var(--yh-color-success-light-8); padding: 20px; border-radius: 8px; text-align: center; border: 1px dashed var(--yh-color-success);">
        <yh-icon name="star" :size="24" color="var(--yh-color-success)" />
        <p style="margin: 8px 0 0; color: var(--yh-color-success-dark-2);">SSR Optimized</p>
      </div>
    </yh-col>
  </yh-row>
</template>

<script setup lang="ts">
// 布局组件已完成 Nuxt 自动导入配置
<\/script>`.replace(/\\/g, '')

const jsNuxt = tsNuxt.replace('lang="ts"', '')
</script>

<style>
.demo-row {
  margin-bottom: 20px;
}
.demo-row:last-child {
  margin-bottom: 0;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 14px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
  color: #5e6d82;
}
.bg-purple-light {
  background: #e5e9f2;
  color: #5e6d82;
}
</style>

# Layout 布局

通过基础的 24 分栏，迅速简便地创建布局。

## 基础布局

使用 `yh-row` 和 `yh-col` 组件，通过 `span` 属性即可自由地组合布局。

<DemoBlock title="基础布局" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-row class="demo-row">
    <yh-col :span="24"><div class="grid-content bg-purple-dark">24</div></yh-col>
  </yh-row>
  <yh-row class="demo-row">
    <yh-col :span="12"><div class="grid-content bg-purple">12</div></yh-col>
    <yh-col :span="12"><div class="grid-content bg-purple-light">12</div></yh-col>
  </yh-row>
  <yh-row class="demo-row">
    <yh-col :span="8"><div class="grid-content bg-purple">8</div></yh-col>
    <yh-col :span="8"><div class="grid-content bg-purple-light">8</div></yh-col>
    <yh-col :span="8"><div class="grid-content bg-purple">8</div></yh-col>
  </yh-row>
  <yh-row class="demo-row">
    <yh-col :span="6"><div class="grid-content bg-purple">6</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple-light">6</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">6</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple-light">6</div></yh-col>
  </yh-row>
</DemoBlock>

## 分栏间隔

通过 `gutter` 属性指定分栏间隔，默认间隔为 0。

<DemoBlock title="分栏间隔" :ts-code="tsGutter" :js-code="jsGutter">
  <yh-row :gutter="20" class="demo-row">
    <yh-col :span="6"><div class="grid-content bg-purple">6</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">6</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">6</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">6</div></yh-col>
  </yh-row>
</DemoBlock>

## 混合布局

通过基础的 1/24 分栏任意扩展组合形成较为复杂的混合布局。

<DemoBlock title="混合布局" :ts-code="tsMixed" :js-code="jsMixed">
  <yh-row :gutter="20" class="demo-row">
    <yh-col :span="16"><div class="grid-content bg-purple">16</div></yh-col>
    <yh-col :span="8"><div class="grid-content bg-purple-light">8</div></yh-col>
  </yh-row>
  <yh-row :gutter="20" class="demo-row">
    <yh-col :span="8"><div class="grid-content bg-purple">8</div></yh-col>
    <yh-col :span="8"><div class="grid-content bg-purple-light">8</div></yh-col>
    <yh-col :span="4"><div class="grid-content bg-purple">4</div></yh-col>
    <yh-col :span="4"><div class="grid-content bg-purple-light">4</div></yh-col>
  </yh-row>
</DemoBlock>

## 分栏偏移

通过 `offset` 属性指定分栏偏移的栏数。

<DemoBlock title="分栏偏移" :ts-code="tsOffset" :js-code="jsOffset">
  <yh-row :gutter="20" class="demo-row">
    <yh-col :span="6"><div class="grid-content bg-purple">6</div></yh-col>
    <yh-col :span="6" :offset="6"><div class="grid-content bg-purple">6 offset-6</div></yh-col>
  </yh-row>
  <yh-row :gutter="20" class="demo-row">
    <yh-col :span="6" :offset="6"><div class="grid-content bg-purple">6 offset-6</div></yh-col>
    <yh-col :span="6" :offset="6"><div class="grid-content bg-purple">6 offset-6</div></yh-col>
  </yh-row>
</DemoBlock>

## 对齐方式

通过 `justify` 属性来控制行内元素的水平排列方式。

<DemoBlock title="对齐方式" :ts-code="tsAlign" :js-code="jsAlign">
  <yh-row class="demo-row" justify="start">
    <yh-col :span="6"><div class="grid-content bg-purple">start</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple-light">start</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">start</div></yh-col>
  </yh-row>
  <yh-row class="demo-row" justify="center">
    <yh-col :span="6"><div class="grid-content bg-purple">center</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple-light">center</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">center</div></yh-col>
  </yh-row>
  <yh-row class="demo-row" justify="end">
    <yh-col :span="6"><div class="grid-content bg-purple">end</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple-light">end</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">end</div></yh-col>
  </yh-row>
  <yh-row class="demo-row" justify="space-between">
    <yh-col :span="6"><div class="grid-content bg-purple">space-between</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple-light">space-between</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">space-between</div></yh-col>
  </yh-row>
  <yh-row class="demo-row" justify="space-around">
    <yh-col :span="6"><div class="grid-content bg-purple">space-around</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple-light">space-around</div></yh-col>
    <yh-col :span="6"><div class="grid-content bg-purple">space-around</div></yh-col>
  </yh-row>
</DemoBlock>

## 在 Nuxt 中使用

Row 和 Col 组件在 Nuxt 3/4 环境下表现卓越。布局系统的 HTML 结构在服务端即根据 `span`、`gutter` 等参数精准生成，确保了首屏布局的高稳定性和响应式一致性。

<DemoBlock title="Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <yh-row :gutter="20">
    <yh-col :span="12">
      <div style="background: var(--yh-color-primary-light-8); padding: 20px; border-radius: 8px; text-align: center; border: 1px dashed var(--yh-color-primary);">
        <yh-icon name="success" :size="24" color="var(--yh-color-primary)" />
        <p style="margin: 8px 0 0; color: var(--yh-color-primary-dark-2);">Nuxt Auto Import</p>
      </div>
    </yh-col>
    <yh-col :span="12">
      <div style="background: var(--yh-color-success-light-8); padding: 20px; border-radius: 8px; text-align: center; border: 1px dashed var(--yh-color-success);">
        <yh-icon name="star" :size="24" color="var(--yh-color-success)" />
        <p style="margin: 8px 0 0; color: var(--yh-color-success-dark-2);">SSR Optimized</p>
      </div>
    </yh-col>
  </yh-row>
</DemoBlock>

**SSR 注意事项**：

- ✅ 24 分栏比例在服务端直接生成相应的 CSS 类名
- ✅ Gutter 间隔通过服务端的负 Margin 和内补丁 (Padding) 完美实现，首屏无对齐抖动
- ✅ 响应式配置 (xs, sm, md, lg, xl) 在服务端生成对应的媒体查询类
- ✅ 对齐 (justify) 和垂直对齐 (align) 在服务端生效

::: tip 布局一致性
由于 Layout 组件完全基于 CSS (Flexbox) 样式控制，它天生具备 100% 的 SSR 一致性。在 Nuxt 页面中使用 Row/Col 几乎不需要担心任何水合冲突。
:::

## API

### Row Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| gutter | 栅格间隔 | `number` | `0` |
| tag | 自定义元素标签 | `string` | `'div'` |
| justify | 水平排列方式 | `'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| 'space-evenly'` | `'start'` |
| align | 垂直排列方式 | `'top' \| 'middle' \| 'bottom'` | `'top'` |

### Col Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| span | 栅格占据的列数 | `number` | `24` |
| offset | 栅格左侧的间隔格数 | `number` | `0` |
| push | 栅格向右移动格数 | `number` | `0` |
| pull | 栅格向左移动格数 | `number` | `0` |
| xs | <768px 响应式栅格数或属性对象 | `number \| object` | — |
| sm | ≥768px 响应式栅格数或属性对象 | `number \| object` | — |
| md | ≥992px 响应式栅格数或属性对象 | `number \| object` | — |
| lg | ≥1200px 响应式栅格数或属性对象 | `number \| object` | — |
| xl | ≥1920px 响应式栅格数或属性对象 | `number \| object` | — |
| tag | 自定义元素标签 | `string` | `'div'` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| — | 该组件暂无自定义事件 | — |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 自定义内容 |

### Expose

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
| — | 该组件暂无暴露属性 | — |

## 主题变量

Row/Col 组件主要基于 Flex 布局，目前暂无特定组件级全局 CSS 变量。

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| — | 暂无 | — |
