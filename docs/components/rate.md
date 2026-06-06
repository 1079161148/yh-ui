# Rate 评分

用于对事物进行评分操作。

<script setup lang="ts">
import { ref } from 'vue'

const val1 = ref(3)
const val2 = ref(4)
const val3 = ref(3)
const valHalf = ref(3.5)
const val4 = ref(3)
const val5 = ref(3.7)
const val6 = ref(3)
const val7 = ref(3.7)
const val8 = ref(3.5)
const nuxtRate = ref(4)

const tsNuxt = `<template>
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <yh-rate v-model="nuxtRate" />
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="font-size: 14px; color: var(--yh-text-color-regular);">平均得分:</span>
      <yh-rate :model-value="4.5" disabled show-score />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const nuxtRate = ref(4)
<\/script>`

const jsNuxt = tsNuxt.replace('lang="ts"', '')

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

组件默认使用五分制，`colors` 可用于自定义激活图标颜色。

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

使用 `size` 在 `large`、`default`、`small` 三种尺寸间切换。

<DemoBlock title="不同尺寸" :ts-code="tsSize" :js-code="jsSize">
  <div style="display: flex; flex-direction: column; gap: 15px;">
    <yh-rate v-model="val3" size="large" />
    <yh-rate v-model="val3" size="default" />
    <yh-rate v-model="val3" size="small" />
  </div>
</DemoBlock>

## 允许半选

设置 `allow-half` 以启用半星评分。

<DemoBlock title="允许半选" :ts-code="tsHalf" :js-code="jsHalf">
  <yh-rate v-model="valHalf" allow-half />
</DemoBlock>

## 辅助文字

`show-text` 用于显示辅助文案，`show-score` 用于显示当前分值。

<DemoBlock title="辅助文字" :ts-code="tsText" :js-code="jsText">
  <div style="display: flex; flex-direction: column; gap: 15px;">
    <yh-rate v-model="val4" show-text />
    <yh-rate v-model="val5" show-score score-template="{value} 分" />
  </div>
</DemoBlock>

## 可清空

设置 `clearable` 后，再次点击当前值可以将评分重置为 `0`。

<DemoBlock title="可清空" :ts-code="tsClearable" :js-code="jsClearable">
  <yh-rate v-model="val6" clearable />
</DemoBlock>

## 只读

设置 `disabled` 可进入只读展示模式。

<DemoBlock title="只读" :ts-code="tsDisabled" :js-code="jsDisabled">
  <yh-rate v-model="val7" disabled show-score text-color="#ff9900" />
</DemoBlock>

## 自定义图标

通过 `icon` 插槽替换内置评分图标。

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

## 在 Nuxt 中使用

`YhRate` 在注册 `@yh-ui/nuxt` 后可直接用于 Nuxt 3/4。

<DemoBlock title="在 Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <yh-rate v-model="nuxtRate" />
    <div style="display: flex; align-items: center; gap: 8px;">
      <span style="font-size: 14px; color: var(--yh-text-color-regular);">平均得分:</span>
      <yh-rate :model-value="4.5" disabled show-score />
    </div>
  </div>
</DemoBlock>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `model-value` / `v-model` | 绑定值 | `number` | `0` |
| `max` | 最大分值 | `number` | `5` |
| `disabled` | 是否只读 | `boolean` | `false` |
| `allow-half` | 是否允许半选 | `boolean` | `false` |
| `icon` | 自定义选中图标 | `string \| Component` | `''` |
| `void-icon` | 自定义未选中图标 | `string \| Component` | `''` |
| `disabled-void-icon` | 禁用状态下的未选中图标 | `string \| Component` | `''` |
| `colors` | 激活颜色，支持字符串、数组或阈值映射对象 | `string \| string[] \| Record<number, string>` | `'#F7BA2A'` |
| `void-color` | 未选中颜色 | `string` | `'#C6D1DE'` |
| `disabled-void-color` | 禁用状态下的未选中颜色 | `string` | `'#EFF2F7'` |
| `show-score` | 是否显示当前分数 | `boolean` | `false` |
| `show-text` | 是否显示辅助文案 | `boolean` | `false` |
| `text-color` | 辅助文案颜色 | `string` | `'#1f2d3d'` |
| `texts` | 辅助文案数组 | `string[]` | `[]` |
| `score-template` | 分数显示模板 | `string` | `'{value}'` |
| `size` | 图标尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| `clearable` | 再次点击当前值时是否清空 | `boolean` | `false` |
| `theme-overrides` | 组件级主题变量覆盖 | `ComponentThemeVars` | `undefined` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 绑定值变化时触发 | `(value: number) => void` |
| `change` | 评分值变化时触发 | `(value: number) => void` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `icon` | 自定义评分图标 | `{ index: number, width: string, activeColor: string, voidColor: string }` |

### Expose

当前组件未暴露公开实例方法或属性。

## 主题变量

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-rate-void-color` | 未选中颜色 | `#c6d1de` |
| `--yh-rate-fill-color` | 选中颜色 | `#f7ba2a` |
| `--yh-rate-disabled-void-color` | 禁用状态下的未选中颜色 | `#eff2f7` |
| `--yh-rate-text-color` | 辅助文案颜色 | `#1f2d3d` |
| `--yh-rate-font-size` | 辅助文案字号 | `14px` |
| `--yh-rate-icon-margin` | 图标间距 | `6px` |

### 类型导出

| 名称 | 说明 |
| --- | --- |
| `YhRateProps` | 组件 Props 类型 |
| `YhRateEmits` | 组件事件类型 |
| `YhRateSlots` | 组件插槽类型 |
| `YhRateSize` | 尺寸联合类型 |
| `YhRateInstance` | 组件实例类型 |
