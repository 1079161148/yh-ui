# Slider 滑块

通过拖动滑块在一个固定区间内进行选择。

<script setup lang="ts">
import { ref } from 'vue'

// 基础用法
const val1 = ref(0)
const val2 = ref(50)
const val5 = ref(42)

// 带有输入框
const val8 = ref(15)

// 垂直模式
const valV1 = ref(30)
const valV2 = ref([20, 50])

// 展示标记
const valM = ref(37)
const marks = ref({
  0: '0°C',
  37: '37°C',
  50: { label: '50%' },
  100: '100°C'
})

// 自定义插槽
const valS = ref(45)

// Nuxt 使用示例
const nuxtSlider1 = ref(30)
const nuxtSlider2 = ref([20, 50])

// Nuxt 使用示例
const tsNuxt = `<template>
  <div style="display: flex; flex-direction: column; gap: 24px; padding: 20px 0;">
    <!-- 基础滑块，自动导入 -->
    <yh-slider v-model="nuxtSlider1" />
    
    <!-- 范围选择 -->
    <yh-slider v-model="nuxtSlider2" range />
  </div>
</template>

<script setup lang="ts">
// 无需导入 Slider 组件
const nuxtSlider1 = ref(30)
const nuxtSlider2 = ref([20, 50])
<\/script>`

const jsNuxt = tsNuxt.replace('lang="ts"', '')

// 为 DemoBlock 准备的代码字符串
const tsBasic = `<template>
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">默认</span>
      <div class="yh-demo-content">
        <yh-slider v-model="val1" />
      </div>
    </div>
    <div class="yh-demo-row">
      <span class="yh-demo-label">自定义初始值</span>
      <div class="yh-demo-content">
        <yh-slider v-model="val2" />
      </div>
    </div>
    <div class="yh-demo-row">
      <span class="yh-demo-label">禁用状态</span>
      <div class="yh-demo-content">
        <yh-slider v-model="val5" disabled />
      </div>
    </div>
  </div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const val1 = ref(0)
const val2 = ref(50)
const val5 = ref(42)
<\/script>`

const jsBasic = tsBasic.replace('lang="ts"', '')


const tsInput = `<template>
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">带输入框</span>
      <div class="yh-demo-content">
        <yh-slider v-model="val8" show-input />
      </div>
    </div>
    <div class="demo-val-badge">当前数值: {{ val8 }}</div>
  </div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const val8 = ref(15)
<\/script>`

const jsInput = tsInput.replace('lang="ts"', '')


const tsVertical = `<template>
  <div class="yh-demo-wrapper">
    <div class="vertical-demo-container">
      <yh-slider v-model="valV1" vertical height="200px" />
      <yh-slider v-model="valV2" vertical height="200px" range />
    </div>
    <div style="text-align: center; display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
      <div class="demo-val-badge">单选: {{ valV1 }}</div>
      <div class="demo-val-badge">范围: {{ valV2 }}</div>
    </div>
  </div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const valV1 = ref(30)
const valV2 = ref([20, 50])
<\/script>`

const jsVertical = tsVertical.replace('lang="ts"', '')


const tsMarks = `<template>
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">滑块标记</span>
      <div class="yh-demo-content" style="padding: 0 20px;">
        <yh-slider v-model="valM" :marks="marks" />
      </div>
    </div>
    <div class="demo-val-badge">当前数值: {{ valM }}</div>
  </div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const valM = ref(37)
const marks = ref({
  0: '0°C',
  37: '37°C',
  50: { label: '50%' },
  100: '100°C'
})
<\/script>`

const jsMarks = tsMarks.replace('lang="ts"', '')


const tsSlot = `<template>
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">自定义按钮</span>
      <div class="yh-demo-content">
        <yh-slider v-model="valS">
          <template #thumb="{ value }">
            <div class="custom-thumb">{{ value }}</div>
          </template>
        </yh-slider>
      </div>
    </div>
  </div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const valS = ref(45)
<\/script>

<style scoped>
.custom-thumb {
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #409eff, #a855f7);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 10px;
  font-weight: bold;
  cursor: grab;
  box-shadow: 0 2px 8px rgba(168, 85, 247, 0.4);
}
<\/style>`

const jsSlot = tsSlot.replace('lang="ts"', '')

</script>

## 基础用法

最基本的滑块用法。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">默认</span>
      <div class="yh-demo-content">
        <yh-slider v-model="val1" />
      </div>
    </div>
    <div class="yh-demo-row">
      <span class="yh-demo-label">自定义初始值</span>
      <div class="yh-demo-content">
        <yh-slider v-model="val2" />
      </div>
    </div>
    <div class="yh-demo-row">
      <span class="yh-demo-label">禁用状态</span>
      <div class="yh-demo-content">
        <yh-slider v-model="val5" disabled />
      </div>
    </div>
  </div>
</DemoBlock>

## 带有输入框

配合 `show-input` 属性，可以实现数值的精确输入。

<DemoBlock title="带有输入框" :ts-code="tsInput" :js-code="jsInput">
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">带输入框</span>
      <div class="yh-demo-content">
        <yh-slider v-model="val8" show-input />
      </div>
    </div>
    <div class="demo-val-badge">当前数值: {{ val8 }}</div>
  </div>
</DemoBlock>

## 垂直模式

配置 `vertical` 属性为 `true` 启用垂直模式。在垂直模式下，必须设置 `height` 属性。

<DemoBlock title="垂直模式" :ts-code="tsVertical" :js-code="jsVertical">
  <div class="yh-demo-wrapper">
    <div class="vertical-demo-container">
      <yh-slider v-model="valV1" vertical height="200px" />
      <yh-slider v-model="valV2" vertical height="200px" range />
    </div>
    <div style="text-align: center; display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">
      <div class="demo-val-badge">单选: {{ valV1 }}</div>
      <div class="demo-val-badge">范围: {{ valV2 }}</div>
    </div>
  </div>
</DemoBlock>

## 展示标记

使用 `marks` 属性标记 Slider 的刻度。

<DemoBlock title="展示标记" :ts-code="tsMarks" :js-code="jsMarks">
  <div class="yh-demo-wrapper">
    <div class="yh-demo-row">
      <span class="yh-demo-label">滑块标记</span>
      <div class="yh-demo-content" style="padding: 0 20px;">
        <yh-slider v-model="valM" :marks="marks" />
      </div>
    </div>
    <div class="demo-val-badge">当前数值: {{ valM }}</div>
  </div>
</DemoBlock>

## 自定义插槽

通过 `thumb` 插槽自定义滑块按钮，通过 `mark` 插槽自定义标记文本。以下是示例代码：

<DemoBlock title="自定义插槽" :ts-code="tsSlot" :js-code="jsSlot">
  <div class="yh-demo-wrapper">
    <p class="slot-desc">
      <span style="font-size: 1.2em; margin-right: 8px;">✨</span>
      插槽允许您完全自定义滑块的外观，例如自定义滑块手柄 (Thumb) 或刻度标记 (Mark)。
    </p>
    <div class="yh-demo-row">
      <span class="yh-demo-label">自定义按钮</span>
      <div class="yh-demo-content">
        <yh-slider v-model="valS">
          <template #thumb="{ value }">
            <div class="custom-thumb">{{ value }}</div>
          </template>
        </yh-slider>
      </div>
    </div>
  </div>
</DemoBlock>

## 在 Nuxt 中使用

Slider 组件完全支持 Nuxt 3/4 的 SSR 渲染。在 Nuxt 项目中使用时，组件会自动导入。

<DemoBlock title="Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="display: flex; flex-direction: column; gap: 24px; padding: 20px 0;">
    <yh-slider v-model="nuxtSlider1" />
    <yh-slider v-model="nuxtSlider2" range />
  </div>
</DemoBlock>

**SSR 注意事项**：

- ✅ 基础滑动选择、范围选择完全支持
- ✅ 步长（step）、标记（marks）在服务器端正确渲染
- ✅ 垂直模式布局在 SSR 中保持一致
- ✅ 插槽（thumb/mark）支持 SSR 渲染
- ⚠️ 拖拽交互、Tooltip 提示仅在客户端激活后可用

::: tip SSR 安全性
Slider 组件针对 SSR 优化的样式系统，确保了滑块导轨和填充条在首屏加载时就具备正确的视觉效果，消除了 Hydration 时的视觉抖动。
:::

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 绑定值 | `number \| [number, number]` | `0` |
| min | 最小值 | `number` | `0` |
| max | 最大值 | `number` | `100` |
| step | 步长 | `number` | `1` |
| size | 滑块的尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| show-input | 是否显示输入框，仅在非范围选择时有效 | `boolean` | `false` |
| show-input-controls | 在显示输入框时，是否显示控制按钮 | `boolean` | `true` |
| input-size | 输入框的大小 | `'large' \| 'default' \| 'small'` | `'default'` |
| show-stops | 是否显示间断点 | `boolean` | `false` |
| show-tooltip | 是否显示提示 | `boolean` | `true` |
| format-tooltip | 格式化提示文字 | `(val: number) => string \| number` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| range | 是否为范围选择 | `boolean` | `false` |
| vertical | 是否垂直模式 | `boolean` | `false` |
| height | 垂直模式下的高度 | `string` | — |
| label | 屏幕阅读器标签 | `string` | — |
| debounce | 输入时的去抖延迟，单位为毫秒 | `number` | `300` |
| tooltip-class | 提示的自定义类名 | `string` | — |
| placement | 提示出现的位置 | `string` | `'top'` |
| marks | 标记， key 的类型必须为 number ，且在 [min, max] 范围内 | `object` | — |
| validate-event | 改变滑块值时是否触发表单的校验 | `boolean` | `true` |
| range-start-label | 自定义范围选择时的最小值属性名，用于 aria-label | `string` | — |
| range-end-label | 自定义范围选择时的最大值属性名，用于 aria-label | `string` | — |
| button-class | 自定义按钮类名 | `string` | — |
| color | 自定义主题颜色 | `string` | — |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 绑定值改变时触发 | `(val: number \| [number, number]) => void` |
| change | 值改变时触发（仅在松开鼠标或点击滑道时） | `(val: number \| [number, number]) => void` |
| input | 数据改变时触发（实时触发） | `(val: number \| [number, number]) => void` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| thumb | 自定义滑块手柄 | `{ value: number }` |
| mark | 自定义刻度文本 | `{ mark: any }` |
| default | 组件底部预留插槽 | — |

### 主题变量

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-slider-main-color` | 主题色（滑道填充、手柄边框） | `var(--yh-color-primary)` |
| `--yh-slider-bg-color` | 滑道背景颜色 | `var(--yh-border-color-light)` |
| `--yh-slider-hover-bg-color` | 悬停时滑道背景颜色 | `var(--yh-border-color-dark)` |
| `--yh-slider-button-size` | 手柄按钮尺寸 | `16px` |
| `--yh-slider-button-border` | 手柄按钮边框宽度 | `2px` |
| `--yh-slider-runway-height` | 滑道高度（横向为高，纵向为宽） | `6px` |
| `--yh-slider-height` | 组件整体高度（容器高度） | `32px` |

<style scoped>
.yh-demo-wrapper {
  margin-bottom: 24px;
}

.slot-desc {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin-bottom: 20px;
  padding: 12px 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border-left: 4px solid var(--vp-c-brand-1);
}

.custom-thumb {
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #409eff, #a855f7);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 10px;
  font-weight: bold;
  cursor: grab;
  box-shadow: 0 2px 8px rgba(168, 85, 247, 0.4);
}
</style>
