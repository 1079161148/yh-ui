# Slider 滑块

通过拖动滑块在一个固定区间内进行选择。

<script setup lang="ts">
import { ref } from 'vue'

const val1 = ref(0)
const val2 = ref(50)
const val5 = ref(42)
const val8 = ref(15)
const val9 = ref(30)
const val10 = ref(0)

const marks = ref({
  0: '0°C',
  37: '37°C',
  50: { label: '50%' },
  100: '100°C'
})

// 为 DemoBlock 准备的代码字符串
const tsBasic = `<template>
  <div class="slider-demo-block">
    <span class="demonstration">默认</span>
    <yh-slider v-model="val1" />
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">自定义初始值</span>
    <yh-slider v-model="val2" />
  </div>
  <div class="slider-demo-block">
    <span class="demonstration">禁用状态</span>
    <yh-slider v-model="val5" disabled />
  </div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const val1 = ref(0)
const val2 = ref(50)
const val5 = ref(42)
<\/script>`

const tsInput = `<template>
  <div class="slider-demo-block">
    <yh-slider v-model="val8" show-input />
  </div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const val8 = ref(15)
<\/script>`

const tsVertical = `<template>
  <div class="slider-demo-block vertical-demo">
    <yh-slider v-model="val9" vertical height="200px" />
  </div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const val9 = ref(30)
<\/script>`

const tsMarks = `<template>
  <div class="slider-demo-block">
    <yh-slider v-model="val10" :marks="marks" />
  </div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const val10 = ref(0)
const marks = ref({
  0: '0°C',
  37: '37°C',
  50: { label: '50%', style: { color: '#409eff' } },
  100: '100°C'
})
<\/script>`

const tsSlot = `<template>
  <div class="slider-demo-wrapper">
    <p class="slot-title">自定义按钮 (Thumb Slot):</p>
    <div class="slider-demo-block">
      <yh-slider v-model="val">
        <template #thumb="{ value }">
          <div class="custom-thumb">{{ value }}</div>
        </template>
      </yh-slider>
    </div>
  </div>
<\/template>

<script setup lang="ts">
import { ref } from 'vue'
const val = ref(45)
<\/script>

<style scoped>
.custom-thumb {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #409eff, #a855f7);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 11px;
  font-weight: bold;
  cursor: grab;
}
<\/style>`
</script>

## 基础用法

最基本的滑块用法。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="tsBasic">
  <div class="slider-demo-wrapper">
    <div class="slider-demo-block">
      <span class="demonstration">默认</span>
      <yh-slider v-model="val1" />
    </div>
    <div class="slider-demo-block">
      <span class="demonstration">自定义初始值</span>
      <yh-slider v-model="val2" />
    </div>
    <div class="slider-demo-block">
      <span class="demonstration">禁用状态</span>
      <yh-slider v-model="val5" disabled />
    </div>
  </div>
</DemoBlock>

## 带有输入框

配合 `show-input` 属性，可以实现数值的精确输入。

<DemoBlock title="带有输入框" :ts-code="tsInput" :js-code="tsInput">
  <div class="slider-demo-block">
    <yh-slider v-model="val8" show-input />
  </div>
  <div class="demo-val">当前数值: {{ val8 }}</div>
</DemoBlock>

## 垂直模式

配置 `vertical` 属性为 `true` 启用垂直模式。在垂直模式下，必须设置 `height` 属性。

<DemoBlock title="垂直模式" :ts-code="tsVertical" :js-code="tsVertical">
  <div class="vertical-demo-container">
    <div class="slider-demo-block vertical-demo">
      <yh-slider v-model="val9" vertical height="200px" />
    </div>
    <div class="demo-val" style="text-align: center;">当前数值: {{ val9 }}</div>
  </div>
</DemoBlock>

## 展示标记

使用 `marks` 属性标记 Slider 的刻度。

<DemoBlock title="展示标记" :ts-code="tsMarks" :js-code="tsMarks">
  <div class="slider-demo-block">
    <yh-slider v-model="val10" :marks="marks" />
  </div>
  <div class="demo-val">当前数值: {{ val10 }}</div>
</DemoBlock>

## 自定义插槽

通过 `thumb` 插槽自定义滑块按钮，通过 `mark` 插槽自定义标记文本。以下是示例代码：

<DemoBlock title="自定义插槽" :ts-code="tsSlot" :js-code="tsSlot">
  <div class="slider-demo-wrapper">
    <p class="slot-desc">插槽允许您完全自定义滑块的外观。查看上方的代码示例了解如何使用。</p>
    <div class="slider-demo-block">
      <yh-slider v-model="val1" />
    </div>
  </div>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 绑定值 | `number \| number[]` | `0` |
| min | 最小值 | `number` | `0` |
| max | 最大值 | `number` | `100` |
| step | 步长 | `number` | `1` |
| show-input | 是否显示输入框 | `boolean` | `false` |
| vertical | 是否垂直模式 | `boolean` | `false` |
| height | 垂直模式下的高度 | `string` | — |
| marks | 标记对象 | `Record<number, string \| object>` | — |
| color | 主题颜色 | `string` | — |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| thumb | 自定义滑块手柄 | `{ value: number }` |
| mark | 自定义刻度文本 | `{ mark: any }` |
| default | 组件底部预留插槽 | — |

<style>
.slider-demo-block {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}
.slider-demo-block .demonstration {
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 44px;
  flex: 0 0 100px;
}
.slider-demo-block .yh-slider {
  flex: 1;
  margin-left: 20px;
}
.vertical-demo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
}
.vertical-demo {
  height: 200px;
}
.demo-val {
  font-size: 14px;
  color: var(--yh-color-primary);
  font-weight: bold;
}
.slot-title {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin-bottom: 12px;
}
.slot-desc {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin-bottom: 20px;
  padding: 12px 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}
</style>
