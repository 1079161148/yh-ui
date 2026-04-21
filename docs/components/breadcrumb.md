# Breadcrumb 面板屑

显示当前页面的路径，快速返回之前的任意页面。

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

// --- Showcase 状态 ---
const maxItems = ref(4)

const tsOverflow = `<${_T}>
  <div class="demo-showcase">
    <div class="demo-ctrl">
      <div class="ctrl-row">
        <span class="label">最大展示数:</span>
        <yh-slider v-model="maxItems" :min="2" :max="6" />
      </div>
    </div>
    <div class="demo-viewport">
      <yh-breadcrumb :max-items="maxItems">
        <yh-breadcrumb-item to="/">首页</yh-breadcrumb-item>
        <yh-breadcrumb-item>开发指南</yh-breadcrumb-item>
        <yh-breadcrumb-item>组件库总览</yh-breadcrumb-item>
        <yh-breadcrumb-item>导航组件</yh-breadcrumb-item>
        <yh-breadcrumb-item>面包屑配置</yh-breadcrumb-item>
        <yh-breadcrumb-item>当前节点</yh-breadcrumb-item>
      </yh-breadcrumb>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const maxItems = ref(4)
</${_S}>`

const tsBasic = `<${_T}>
  <yh-breadcrumb>
    <yh-breadcrumb-item to="/">首页</yh-breadcrumb-item>
    <yh-breadcrumb-item to="/components">组件</yh-breadcrumb-item>
    <yh-breadcrumb-item>面包屑</yh-breadcrumb-item>
  </yh-breadcrumb>
</${_T}>`

const tsSeparator = `<${_T}>
  <div class="yh-demo-column">
    <yh-breadcrumb separator=">">
      <yh-breadcrumb-item to="/">首页</yh-breadcrumb-item>
      <yh-breadcrumb-item>层级一</yh-breadcrumb-item>
      <yh-breadcrumb-item>层级二</yh-breadcrumb-item>
    </yh-breadcrumb>
    
    <yh-breadcrumb separator="~">
      <yh-breadcrumb-item to="/">首页</yh-breadcrumb-item>
      <yh-breadcrumb-item>层级一</yh-breadcrumb-item>
      <yh-breadcrumb-item>层级二</yh-breadcrumb-item>
    </yh-breadcrumb>
  </div>
</${_T}>`

const tsNuxt = `<${_T}>
  <yh-breadcrumb>
    <yh-breadcrumb-item to="/">首页</yh-breadcrumb-item>
    <yh-breadcrumb-item to="/dashboard">仪表盘</yh-breadcrumb-item>
  </yh-breadcrumb>
</${_T}>

<${_S} setup lang="ts">
// 在 Nuxt 中会自动降级为 NuxtLink 实现无刷新跳转
</${_S}>`

</script>

## 展示模式

面包屑组件支持动态层级管理和智能路径折叠。

<DemoBlock title="智能溢出展示" :ts-code="tsOverflow" :js-code="toJs(tsOverflow)">
  <div class="demo-showcase">
    <div class="demo-ctrl">
      <div class="ctrl-row">
        <span class="label">最大展示数:</span>
        <yh-slider v-model="maxItems" :min="2" :max="6" />
      </div>
    </div>
    <div class="demo-viewport">
      <yh-breadcrumb :max-items="maxItems">
        <yh-breadcrumb-item to="/">首页</yh-breadcrumb-item>
        <yh-breadcrumb-item>开发指南</yh-breadcrumb-item>
        <yh-breadcrumb-item>组件库总览</yh-breadcrumb-item>
        <yh-breadcrumb-item>导航组件</yh-breadcrumb-item>
        <yh-breadcrumb-item>面包屑配置</yh-breadcrumb-item>
        <yh-breadcrumb-item>当前节点</yh-breadcrumb-item>
      </yh-breadcrumb>
    </div>
  </div>
</DemoBlock>

## 基础用法

最基础的用法，通过 `to` 属性设置跳转路径。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="toJs(tsBasic)">
  <yh-breadcrumb>
    <yh-breadcrumb-item to="/">首页</yh-breadcrumb-item>
    <yh-breadcrumb-item to="/components">组件</yh-breadcrumb-item>
    <yh-breadcrumb-item>面包屑</yh-breadcrumb-item>
  </yh-breadcrumb>
</DemoBlock>

## 自定义分隔符

通过 `separator` 属性可自定义分隔符字符串。

<DemoBlock title="自定义分隔符" :ts-code="tsSeparator" :js-code="toJs(tsSeparator)">
  <div class="yh-demo-column">
    <yh-breadcrumb separator=">">
      <yh-breadcrumb-item to="/">首页</yh-breadcrumb-item>
      <yh-breadcrumb-item>层级一</yh-breadcrumb-item>
      <yh-breadcrumb-item>层级二</yh-breadcrumb-item>
    </yh-breadcrumb>
    <yh-breadcrumb separator="~">
      <yh-breadcrumb-item to="/">首页</yh-breadcrumb-item>
      <yh-breadcrumb-item>层级一</yh-breadcrumb-item>
      <yh-breadcrumb-item>层级二</yh-breadcrumb-item>
    </yh-breadcrumb>
  </div>
</DemoBlock>

## 🚀 自创高级特性

### 1. 智能溢出折叠 (Smart Overflow)
当导航层级过深时，设置 `max-items` 可自动将中间项折叠为 `...`。这在窄屏容器或深层业务逻辑中能极大保护 UI 布局。

### 2. 路由无缝适配 (NuxtLink Compatible)
组件底层会自动感应 `Nuxt` 环境。在 Nuxt 3/4 中使用时，路由跳转会自动由 `NuxtLink` 接管，支持 Prefetch 预取。

## 在 Nuxt 中使用

`YhBreadcrumb` 完美支持 Nuxt 自动导入。

<DemoBlock title="Nuxt 中使用" :ts-code="tsNuxt" :js-code="toJs(tsNuxt)">
  <yh-breadcrumb>
    <yh-breadcrumb-item to="/">首页</yh-breadcrumb-item>
    <yh-breadcrumb-item to="/dashboard">仪表盘</yh-breadcrumb-item>
  </yh-breadcrumb>
</DemoBlock>

## API

### Breadcrumb Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| separator | 分隔符字符串 | `string` | `/` |
| separator-icon | 分隔符图标组件 | `string \| Component` | — |
| max-items | 最大展示数量，超过则折叠 | `number` | `0` (不折叠) |

### BreadcrumbItem Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| to | 路由跳转目标 | `string \| object` | — |
| replace | 是否替换当前路由 | `boolean` | `false` |

### 主题变量

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-breadcrumb-font-size` | 字号 | `14px` |
| `--yh-breadcrumb-item-color` | 默认文字颜色 | `var(--yh-text-color-regular)` |
| `--yh-breadcrumb-last-color` | 最后一项文字颜色 | `var(--yh-text-color-primary)` |

### Events

当前组件未暴露组件事件。

### Slots

| 插槽名 | 说明 | 插槽参数 |
| --- | --- | --- |
| `default` | 面包屑项内容。 | 无 |

### Expose

当前组件未暴露公开实例方法或属性。

### 类型导出

| 名称 | 说明 |
| --- | --- |
| `YhBreadcrumbProps` | `YhBreadcrumb` props 类型 |
| `YhBreadcrumbSlots` | `YhBreadcrumb` slots 类型 |
| `YhBreadcrumbItemProps` | `YhBreadcrumbItem` props 类型 |
| `YhBreadcrumbItemSlots` | `YhBreadcrumbItem` slots 类型 |
| `YhBreadcrumbInstance` | `YhBreadcrumb` 实例类型 |
| `YhBreadcrumbItemInstance` | `YhBreadcrumbItem` 实例类型 |

<style scoped>
.demo-showcase {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}
.demo-ctrl {
  background: var(--yh-fill-color-light);
  padding: 12px 20px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}
.ctrl-row { display: flex; align-items: center; gap: 12px; }
.ctrl-row .label { font-size: 13px; font-weight: 600; color: var(--yh-text-color-secondary); min-width: 80px; }

.demo-viewport {
  padding: 40px;
  background: var(--yh-fill-color-extra-light);
  border-radius: 24px;
  width: 100%;
  display: flex;
  justify-content: center;
  box-shadow: inset 0 2px 8px rgba(0,0,0,0.02);
}
.yh-demo-column { display: flex; flex-direction: column; gap: 24px; }
</style>
