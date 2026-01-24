# Skeleton 骨架屏

在需要等待加载内容的位置提供占位图形。融合了市面上主流 UI 框架的便捷布局、高级动效以及高度灵活性。

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)

const tsBasic = `<template>
  <yh-skeleton />
</template>`

const tsLayout = `<template>
  <yh-skeleton avatar title :rows="3" animated />
</template>`

const tsItem = `<template>
  <div style="display: flex; gap: 20px; align-items: center">
    <yh-skeleton-item variant="circle" :width="64" :height="64" />
    <div style="flex: 1">
      <yh-skeleton-item variant="h3" style="width: 30%" />
      <yh-skeleton-item variant="text" style="width: 80%" />
    </div>
  </div>
</template>`

const tsCreative = `<template>
  <!-- 场景：卡片骨架 -->
  <div class="skeleton-card">
    <yh-skeleton-item variant="image" style="width: 100%; height: 200px" />
    <div style="padding: 16px">
      <yh-skeleton-item variant="h3" style="width: 50%" />
      <yh-skeleton-item variant="text" repeat="2" />
      <div style="margin-top: 16px; display: flex; justify-content: space-between">
        <yh-skeleton-item variant="button" />
        <yh-skeleton-item variant="caption" style="width: 60px" />
      </div>
    </div>
  </div>
</template>`

const tsThrottle = `<template>
  <yh-button @click="reloadData">触发极速加载</yh-button>
  <!-- throttle=500 会在 loading 持续 500ms 后才显示骨架，避免闪烁 -->
  <yh-skeleton :loading="loading" :throttle="500">
    <div class="real-content">
      真实数据已加载，由于加载极快（<500ms），骨架屏从未出现，保障了视觉连贯性。
    </div>
  </yh-skeleton>
</template>`

const tsNuxt = `<template>
  <!-- Nuxt 环境下自动感应，SSR 安全 -->
  <yh-skeleton avatar title />
</template>`

</script>

## 基础用法

最基础的纯文本行骨架屏。

<DemoBlock title="基础用法" :ts-code="tsBasic">
  <yh-skeleton />
</DemoBlock>

## 常见布局

通过 `avatar`、`title` 和 `rows` 快速构建常见的列表项布局。

<DemoBlock title="常见布局" :ts-code="tsLayout">
  <yh-skeleton avatar title :rows="3" />
</DemoBlock>

## 精细化项控制 (SkeletonItem)

当内置布局无法满足时，可以使用 `YhSkeletonItem` 自由组装。支持 `circle`、`rect`、`text`、`button`、`image` 等多种语义化变体。

<DemoBlock title="项控演示" :ts-code="tsItem">
  <div style="display: flex; gap: 20px; align-items: center">
    <yh-skeleton-item variant="circle" :width="64" :height="64" />
    <div style="flex: 1">
      <yh-skeleton-item variant="h3" style="width: 30%" />
      <yh-skeleton-item variant="text" style="width: 80%" />
    </div>
  </div>
</DemoBlock>

## 创意组合：高级卡片

利用 `variant="image"` 和 `repeat` 属性，可以轻松实现复杂的卡片流式骨架。

<DemoBlock title="卡片骨架" :ts-code="tsCreative">
  <div class="skeleton-card">
    <yh-skeleton-item variant="image" style="width: 100%; height: 180px" />
    <div style="padding: 16px">
      <yh-skeleton-item variant="h3" style="width: 50%" />
      <yh-skeleton :rows="2" />
      <div style="margin-top: 16px; display: flex; justify-content: space-between; align-items: center">
        <yh-skeleton-item variant="button" />
        <yh-skeleton-item variant="caption" style="width: 60px" />
      </div>
    </div>
  </div>
</DemoBlock>

## 自创高级特性

### 1. 智能节流 (Throttle)
通过 `throttle` 属性设置延迟显示时间。如果异步数据在设定时间内加载完成，骨架屏将**永不出现**。这能有效消除网络状况良好时骨架屏瞬间闪烁带来的“焦虑感”。

### 2. 视口感应 (Lazy Animation)
开启 `lazy` 后，骨架屏的闪烁动画仅会在元素进入视口（Viewport）时才正式启动。这大幅减少了长列表页面中不可见元素的 GPU 占用，是**性能优化**的极致实践。

### 3. 多态渲染 (Polymorphic)
`SkeletonItem` 的 `variant` 覆盖了所有主流交互设计稿中的原子元素，确保了从设计到代码的高还原度。

## 在 Nuxt 中使用

`YhSkeleton` 完全优化了 Nuxt/SSR 环境，自动降级至安全渲染模式。

<DemoBlock title="Nuxt 中使用" :ts-code="tsNuxt">
  <yh-skeleton avatar title />
</DemoBlock>

## API

### Skeleton Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| loading | 是否显示加载中渲染 | `boolean` | `true` |
| animated | 是否开启闪烁动画 | `boolean` | `true` |
| rows | 默认布局渲染的行数 | `number` | `3` |
| title | 是否渲染标题占位 | `boolean` | `false` |
| avatar | 是否渲染圆形头衔占位 | `boolean` | `false` |
| throttle | 延迟显示毫秒数，防止闪烁 | `number` | `0` |
| lazy | 仅在视口内才启动动画 (自创高级) | `boolean` | `false` |

### SkeletonItem Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| variant | 变体种类 (`circle`, `rect`, `h1`, `h3`, `text`, `button`, `image`) | `string` | `'text'` |
| width | 宽度 | `string \| number` | — |
| height | 高度 | `string \| number` | — |
| animated | 是否开启闪烁动画 | `boolean` | `true` |
| round | 是否为圆角 | `boolean` | `false` |
| sharp | 为 true 时，显式设为直角 | `boolean` | `false` |
| repeat | 循环渲染次数 (自创实用) | `number` | `1` |

## 主题变量

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-skeleton-bg-color` | 骨架基础背景色 | `var(--yh-fill-color-dark)` |
| `--yh-skeleton-shimmer-color` | 动画扫光颜色 | `var(--yh-fill-color-light)` |

<style scoped>
.skeleton-card {
  width: 300px;
  background: var(--yh-bg-color-overlay);
  border-radius: 12px;
  border: 1px solid var(--yh-border-color-lighter);
  overflow: hidden;
}
</style>
