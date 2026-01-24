# ColorPicker 颜色选择器

用于选择和设置颜色。支持多种色彩模式（HEX, RGB, HSL），具备透明度控制及预定义色彩等高级特性。

<script setup lang="ts">
import { ref, watch } from 'vue'

// --- Showcase 状态 ---
const demoAlpha = ref(false)
const demoSize = ref('default')
const demoValue = ref('#6366f1')

const color1 = ref('#6366f1')
const colorAlpha = ref('rgba(99, 102, 241, 0.8)')
const colorPre = ref('#8b5cf6')
const s1 = ref('#6366f1'), s2 = ref('#ec4899')

// --- 代码片段定义 ---
const showcaseTS = `<template>
  <div class="demo-showcase">
    <div class="demo-ctrl">
      <div class="ctrl-row">
        <span class="label">透明度调节:</span>
        <yh-switch v-model="showAlpha" />
      </div>
      <div class="ctrl-row">
        <span class="label">尺寸选择:</span>
        <yh-radio-group v-model="size" size="small">
          <yh-radio-button value="large">大号</yh-radio-button>
          <yh-radio-button value="default">默认</yh-radio-button>
          <yh-radio-button value="small">小号</yh-radio-button>
        </yh-radio-group>
      </div>
    </div>
    <div class="demo-viewport">
      <yh-color-picker v-model="value" :show-alpha="showAlpha" :size="size" />
    </div>
  </div>
</template>

<` + `script setup lang="ts">
import { ref } from 'vue'
const value = ref('#6366f1')
const showAlpha = ref(false)
const size = ref('default')
<` + `/script>`

const tsBasic = `<template>
  <div class="yh-demo-row">
    <yh-color-picker v-model="color1" />
    <yh-color-picker v-model="color2" size="large" />
    <yh-color-picker v-model="color3" size="small" />
  </div>
</template>

<` + `script setup lang="ts">
import { ref } from 'vue'
const color1 = ref('#6366f1')
const color2 = ref('#ec4899')
const color3 = ref('#10b981')
<` + `/script>`

const tsAlpha = `<template>
  <yh-color-picker v-model="color" show-alpha />
</template>

<` + `script setup lang="ts">
import { ref } from 'vue'
const color = ref('rgba(99, 102, 241, 0.8)')
<` + `/script>`

const tsPre = `<template>
  <yh-color-picker 
    v-model="color" 
    :predefine="['#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585']" 
  />
</template>

<` + `script setup lang="ts">
import { ref } from 'vue'
const color = ref('#8b5cf6')
<` + `/script>`

const tsNuxt = `<template>
  <div class="yh-demo-row">
    <yh-color-picker v-model="color" />
  </div>
</template>

<` + `script setup lang="ts">
import { ref } from 'vue'
// 在 Nuxt 中无需 import，直接定义响应式数据即可
const color = ref('#6366f1')
<` + `/script>`

</script>

## 展示模式

ColorPicker 提供全功能的交互演示，您可以实时切换透明度支持和不同尺寸。

<DemoBlock title="全功能展示" :ts-code="showcaseTS">
  <div class="demo-showcase">
    <div class="demo-ctrl">
      <div class="ctrl-row">
        <span class="label">透明度调节:</span>
        <yh-switch v-model="demoAlpha" />
      </div>
      <div class="ctrl-row">
        <span class="label">尺寸选择:</span>
        <yh-radio-group v-model="demoSize" size="small">
          <yh-radio-button value="large">大号</yh-radio-button>
          <yh-radio-button value="default">默认</yh-radio-button>
          <yh-radio-button value="small">小号</yh-radio-button>
        </yh-radio-group>
      </div>
    </div>
    <div class="demo-viewport">
       <yh-color-picker v-model="demoValue" :show-alpha="demoAlpha" :size="demoSize" />
    </div>
    <div class="demo-result">
      <span class="dot"></span>
      <span class="label">当前值：</span>
      <span class="val">{{ demoValue }}</span>
    </div>
  </div>
</DemoBlock>

## 基础用法

颜色选择器的基础功能，支持 HEX 格式的双向绑定。

<DemoBlock title="基础用法" :ts-code="tsBasic">
  <div class="yh-demo-row">
    <yh-color-picker v-model="color1" />
    <yh-color-picker v-model="s1" size="large" />
    <yh-color-picker v-model="s2" size="small" />
  </div>
</DemoBlock>

## 透明度调节

开启 `show-alpha` 属性后，组件将支持 alpha 通道的调节，并自动切换为 RGBA 格式。

<DemoBlock title="支持透明度" :ts-code="tsAlpha">
  <yh-color-picker v-model="colorAlpha" show-alpha />
</DemoBlock>

## 预定义色彩

可以在面板底部显示一系列预设的快速颜色选项。

<DemoBlock title="预定义颜色" :ts-code="tsPre">
  <yh-color-picker 
    v-model="colorPre" 
    :predefine="['#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585', 'rgba(255, 69, 0, 0.68)']" 
  />
</DemoBlock>

## 禁用状态

设置 `disabled` 属性后颜色选择器将无法进行交互。

<DemoBlock title="禁用状态">
  <yh-color-picker v-model="color1" disabled />
</DemoBlock>

## 自创高级特性

### 1. 智能对比度预览 (Intelligent Contrast)
组件面板会自动根据 **WCAG 标准** 计算选中颜色与背景的相对亮度，并在右上角实时给出辅助功能建议，确保设计方案满足视觉无障碍要求。

### 2. 跨平台吸色器 (EyeDropper)
基于现代浏览器原生的 `EyeDropper API`，支持从屏幕任何位置获取颜色（不仅限于浏览器窗口内），为专业设计场景提供生产力级支持。

### 3. 双向交互输入框
底部的值显示区域现已升级为**感应式输入框**。您可以直接粘贴设计师提供的 HEX 或 RGB 代码，组件会瞬间解析定位。

## 在 Nuxt 中使用

`YhColorPicker` 已完美适配 Nuxt 3/4。在 Nuxt 架构下，所有相关 API（包括 EyeDropper 检测）均经过了 Client-Only 环境优化，确保 SSR 流程零报警。

<DemoBlock title="Nuxt 中使用" :ts-code="tsNuxt">
  <div class="yh-demo-row">
    <yh-color-picker v-model="color1" />
  </div>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 绑定值 | `string` | — |
| show-alpha | 是否支持透明度 | `boolean` | `false` |
| predefine | 预定义颜色列表 | `string[]` | `[]` |
| size | 尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| disabled | 是否禁用 | `boolean` | `false` |
| popper-class | 面板自定义类名 | `string` | — |

### Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| change | 确定选择颜色时触发 | `(val: string)` |
| active-change | 面板内颜色实时改变时触发 | `(val: string)` |

## 主题变量

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-color-picker-width` | 组件基础宽度 | `60px` |
| `--yh-color-picker-panel-width` | 展开面板宽度 | `280px` |
| `--yh-color-picker-border-radius` | 圆角弧度 | `12px` |

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
.demo-result {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  background: #fff;
  border-radius: 50px;
  border: 1px solid var(--yh-border-color-lighter);
  box-shadow: 0 4px 16px rgba(0,0,0,0.04);
}
.demo-result .dot { width: 8px; height: 8px; background: var(--yh-color-primary); border-radius: 50%; animation: blink 2s infinite; }
.demo-result .label { color: var(--yh-text-color-secondary); font-size: 14px; font-weight: 500; }
.demo-result .val { color: var(--yh-color-primary); font-weight: 700; font-family: 'JetBrains Mono', monospace; }

.yh-demo-row { display: flex; gap: 16px; flex-wrap: wrap; align-items: center; }

@keyframes blink { 0% { opacity: 0.4; } 50% { opacity: 1; } 100% { opacity: 0.4; } }

:deep(.is-holiday) { color: var(--yh-color-danger) !important; font-weight: bold; }
</style>
