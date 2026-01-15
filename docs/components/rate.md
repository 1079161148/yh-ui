# Rate 评分

用于对事物进行评分操作。

<script setup lang="ts">
import { ref } from 'vue'

// Demo 状态
const val1 = ref(3)
const val2 = ref(4)
const val3 = ref(3)
const valHalf = ref(3.5)
const val4 = ref(3)
const val5 = ref(3.7)
const val6 = ref(3)
const val7 = ref(3.7)
const val8 = ref(3.5)

// TypeScript 代码示例
const tsBasic = `<template>
  <div class="demo-rate-block">
    <span>默认:</span>
    <yh-rate v-model="value1" />
  </div>
  <div class="demo-rate-block">
    <span>自定义颜色:</span>
    <yh-rate v-model="value2" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value1 = ref(3)
const value2 = ref(4)
<\/script>

<style scoped>
.demo-rate-block {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}
<\/style>`

const jsBasic = tsBasic.replace('lang="ts"', '')

const tsSize = `<template>
  <yh-rate v-model="value" size="large" />
  <yh-rate v-model="value" size="default" />
  <yh-rate v-model="value" size="small" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref(3)
<\/script>`

const jsSize = tsSize.replace('lang="ts"', '')

const tsHalf = `<template>
  <yh-rate v-model="value" allow-half />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref(3.5)
<\/script>`

const jsHalf = tsHalf.replace('lang="ts"', '')

const tsText = `<template>
  <yh-rate v-model="value1" show-text />
  <yh-rate v-model="value2" show-score score-template="{value} 分" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value1 = ref(3)
const value2 = ref(3.7)
<\/script>`

const jsText = tsText.replace('lang="ts"', '')

const tsClearable = `<template>
  <yh-rate v-model="value" clearable />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref(3)
<\/script>`

const jsClearable = tsClearable.replace('lang="ts"', '')

const tsDisabled = `<template>
  <yh-rate v-model="value" disabled show-score text-color="#ff9900" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref(3.7)
<\/script>`

const jsDisabled = tsDisabled.replace('lang="ts"', '')

const tsCustom = `<template>
  <yh-rate v-model="value" colors="#f56c6c" allow-half>
    <template #icon="{ width, activeColor }">
      <div class="custom-rate-icon">
         <span class="custom-rate-icon-void">★</span>
         <div class="custom-rate-icon-active" :style="{ width, color: activeColor }">
           <span>★</span>
         </div>
      </div>
    </template>
  </yh-rate>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref(3.5)
<\/script>

<style scoped>
.custom-rate-icon {
  position: relative;
  width: 1em;
  height: 1em;
  line-height: 1em;
}
.custom-rate-icon-void {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  color: #eee;
}
.custom-rate-icon-active {
  position: absolute;
  top: 0; left: 0;
  height: 100%;
  overflow: hidden;
}
.custom-rate-icon-active span {
  display: block;
  width: 1em;
}
<\/style>`

const jsCustom = tsCustom.replace('lang="ts"', '')
</script>

## 基础用法

评分默认被分为三个等级，可以利用颜色数组对分数及情感倾向进行分级。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <div style="display: flex; align-items: center;">
      <span style="margin-right: 10px; width: 100px;">默认:</span>
      <yh-rate v-model="val1" />
    </div>
    <div style="display: flex; align-items: center;">
      <span style="margin-right: 10px; width: 100px;">自定义颜色:</span>
      <yh-rate v-model="val2" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" />
    </div>
  </div>
</DemoBlock>

## 不同尺寸

使用 `size` 属性来设置评分组件的尺寸。

<DemoBlock title="不同尺寸" :ts-code="tsSize" :js-code="jsSize">
  <div style="display: flex; flex-direction: column; gap: 15px;">
    <yh-rate v-model="val3" size="large" />
    <yh-rate v-model="val3" size="default" />
    <yh-rate v-model="val3" size="small" />
  </div>
</DemoBlock>

## 允许半选

设置 `allow-half` 属性允许选择半星。

<DemoBlock title="允许半选" :ts-code="tsHalf" :js-code="jsHalf">
  <yh-rate v-model="valHalf" allow-half />
</DemoBlock>

## 辅助文字

设置 `show-text` 属性显示辅助文字，或者 `show-score` 显示分数。

<DemoBlock title="辅助文字" :ts-code="tsText" :js-code="jsText">
  <div style="display: flex; flex-direction: column; gap: 15px;">
    <yh-rate v-model="val4" show-text />
    <yh-rate v-model="val5" show-score score-template="{value} 分" />
  </div>
</DemoBlock>

## 可清空

使用 `clearable` 属性，当再次点击相同的值时，可以将值重置为 0。

<DemoBlock title="可清空" :ts-code="tsClearable" :js-code="jsClearable">
  <yh-rate v-model="val6" clearable />
</DemoBlock>

## 只读

设置 `disabled` 属性开启只读模式，常用于展示分数。

<DemoBlock title="只读" :ts-code="tsDisabled" :js-code="jsDisabled">
  <yh-rate v-model="val7" disabled show-score text-color="#ff9900" />
</DemoBlock>

## 自定义图标

通过 `icon` 插槽可以自定义图标。

<DemoBlock title="自定义图标" :ts-code="tsCustom" :js-code="jsCustom">
  <yh-rate v-model="val8" colors="#f56c6c" allow-half>
    <template #icon="{ width, activeColor }">
      <div class="demo-custom-icon">
         <span class="demo-custom-icon-void">★</span>
         <div class="demo-custom-icon-active" :style="{ width, color: activeColor }">
           <span>★</span>
         </div>
      </div>
    </template>
  </yh-rate>
</DemoBlock>

<style scoped>
.demo-custom-icon {
  position: relative;
  width: 1em;
  height: 1em;
  line-height: 1em;
}
.demo-custom-icon-void {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  color: #eee;
}
.demo-custom-icon-active {
  position: absolute;
  top: 0; left: 0;
  height: 100%;
  overflow: hidden;
}
.demo-custom-icon-active span {
  display: block;
  width: 1em;
}
</style>

## API

### Rate Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model / model-value | 绑定值 | `number` | `0` |
| max | 最大分值 | `number` | `5` |
| disabled | 是否为只读 | `boolean` | `false` |
| allow-half | 是否允许半选 | `boolean` | `false` |
| clearable | 是否可以通过点击当前值来重置 | `boolean` | `false` |
| show-text | 是否显示辅助文字，会覆盖 score | `boolean` | `false` |
| show-score | 是否显示当前分数，show-text 为 false 时有效 | `boolean` | `false` |
| text-color | 辅助文字颜色 | `string` | `'#1f2d3d'` |
| texts | 辅助文字数组 | `string[]` | `['极差', '失望', '一般', '满意', '惊喜']` |
| colors | 评分激活颜色，支持字符串或颜色数组（分别对应 2分及以下，4分及以下，5分） | `string \| string[]` | `'#F7BA2A'` |
| void-color | 未选中状态颜色 | `string` | `'#C6D1DE'` |
| disabled-void-color | 禁用状态下未选中颜色 | `string` | `'#EFF2F7'` |
| size | 评分图标的大小 | `'large' \| 'default' \| 'small'` | `'default'` |
| score-template | 分数显示模板 | `string` | `'{value}'` |

### Rate Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 分值改变时触发 | `(value: number) => void` |

### Rate Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| icon | 自定义图标 | `{ index: number, width: string, activeColor: string, voidColor: string }` |
