# BackTop 回到顶部

用于长页面，点击按钮后可平滑滚回页面顶部。

<script setup lang="ts">
import { ref } from 'vue'

const tsBasic = `<template>
  <yh-back-top :visibility-height="100" />
  <div class="demo-info">
    <span class="dot"></span>
    向下滚动页面查看右下角按钮
  </div>
</template>`

const tsProgress = `<template>
  <yh-back-top :visibility-height="100" />
  <div class="demo-info">
    <span class="dot"></span>
    注意观察按钮外圈的环形进度变化
  </div>
</template>`

const tsCustom = `<template>
  <yh-back-top :bottom="100" :right="100" progress-color="#ec4899">
    <div class="custom-bt">UP</div>
  </yh-back-top>
  <div class="demo-info">在右侧底部观察粉色进度条对比</div>
</template>

<` + `style scoped>
.custom-bt {
  width: 44px;
  height: 44px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  color: #ec4899;
  font-weight: bold;
  font-size: 12px;
}
<` + `/style>`

const tsNuxt = `<template>
  <yh-back-top :visibility-height="100" />
  <div class="demo-info">
    <span class="dot"></span>
    Nuxt 项目中开箱即用，支持 SSR 静态容错
  </div>
</template>`

</script>

## 基础用法

最简单的用法，默认在滚动 200px 后显示。

<DemoBlock title="基础用法" :ts-code="tsBasic">
  <div class="demo-info">
    <span class="dot"></span>
    向下滚动页面查看右下角按钮
  </div>
  <yh-back-top :visibility-height="100" />
</DemoBlock>

## 进度指示 (Advanced)

`YhBackTop` 具备行业领先的进度环特性。通过按钮外圈的动态环状条，用户可以直观地感知当前距离文章顶部的物理位置。

<DemoBlock title="带进度的预览" :ts-code="tsProgress">
  <div class="demo-info">
    <span class="dot"></span>
    注意观察按钮外圈的环形进度变化
  </div>
</DemoBlock>

## 自定义内容与样式

通过插槽可以自定义按钮内容，通过属性可以调整显示位置及进度条颜色。

<DemoBlock title="自定义内容" :ts-code="tsCustom">
  <yh-back-top :bottom="100" :right="100" progress-color="#ec4899">
    <div class="custom-bt">UP</div>
  </yh-back-top>
  <div class="demo-info">在右侧底部观察粉色进度条对比</div>
</DemoBlock>

## 自创高级特性

### 1. 环形物理感应 (Kinetic Progress)
通过高频率同步网页滚动高度与 SVG 圆环周长，实现了“滚动即反馈”的沉浸式体验。圆环采用 `stroke-dashoffset` 线性映射，确保性能与视觉上的极致平衡。

### 2. 智能容器自适应 (Smart Viewport)
不仅仅支持 `window` 全局滚动。如果将其放入一个具有 `overflow: scroll` 的局部容器中并配合 `target` 属性，它能精准控制局部区域的回归逻辑。

### 3. 三阶贝塞尔回归 (Cubic Animation)
内置 `Cubic Easing` 函数，滚动回归动作更符合物理感知，比简单的线性位移更有“质感”。

## 在 Nuxt 中使用

`YhBackTop` 完美适配 Nuxt 自动导入。

<DemoBlock title="Nuxt 中使用" :ts-code="tsNuxt">
  <div class="demo-info">
    <span class="dot"></span>
    Nuxt 项目中开箱即用，支持 SSR 静态容错
  </div>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visibility-height | 滚动高度达到此值时才显示 | `number` | `200` |
| target | 容器选择器，全屏滚动无需设置 | `string` | — |
| right | 距离右侧的距离 | `number` | `40` |
| bottom | 距离底部的距离 | `number` | `40` |
| show-progress | 是否显示进度环 | `boolean` | `true` |
| progress-color | 进度环颜色 | `string` | `var(--yh-color-primary)` |
| duration | 回滚动画持续时间 (ms) | `number` | `400` |

### Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| click | 点击按钮时触发 | `(evt: MouseEvent)` |

## 主题变量

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-back-top-bg-color` | 背景色 | `#ffffff` |
| `--yh-back-top-text-color` | 文字/图标颜色 | `var(--yh-color-primary)` |

<style scoped>
.demo-info {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px;
  background: var(--yh-fill-color-light);
  border-radius: 12px;
  font-size: 14px;
  color: var(--yh-text-color-secondary);
}
.demo-info .dot { width: 8px; height: 8px; background: var(--yh-color-primary); border-radius: 50%; }

.custom-bt {
  width: 44px;
  height: 44px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  color: #ec4899;
  font-weight: bold;
  font-size: 12px;
}
</style>
