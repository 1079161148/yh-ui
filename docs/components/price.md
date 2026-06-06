# Price 价格组件

电商场景下的核心组件，用于规范化展示商品价格。支持金额拆分显示（整数部分大，小数部分小）、千分符、动画递增等特性。

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S, _St } from '../.vitepress/theme/utils/demo-utils'

const tsBasic = `<${_T}>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-price :value="1234.56" />
    <yh-price :value="1234.56" :precision="0" />
    <yh-price :value="1234.56" symbol-position="after" symbol="元" />
    <yh-price :value="1234.56" approx />
  </div>
</${_T}>`

const jsBasic = toJs(tsBasic)

const tsRange = `<${_T}>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-price :value="99" :max-value="199" />
    <yh-price :value="9.9" :max-value="12.5" size="large" bold />
  </div>
</${_T}>`
const jsRange = toJs(tsRange)

const tsEcommerce = `<${_T}>
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <!-- 会员价场景 -->
    <div style="display: flex; align-items: center; gap: 8px;">
      <yh-price :value="168" tag="会员价" tag-type="danger" size="large" bold />
      <yh-price :value="299" delete-value="299" delete-label="指导价" />
    </div>

    <!-- 底部单位场景 -->
    <yh-price :value="5.8" unit="/ 斤" />
    
    <!-- 渐变性文字 -->
    <yh-price :value="8888" :gradient="['#ff4d4f', '#722ed1']" size="large" bold />
  </div>
</${_T}>`
const jsEcommerce = toJs(tsEcommerce)

const tsSizes = `<${_T}>
  <div style="display: flex; align-items: baseline; gap: 20px;">
    <yh-price :value="99" size="small" />
    <yh-price :value="99" size="default" />
    <yh-price :value="99" size="large" />
    <yh-price :value="99" style="font-size: 40px; color: #ff4d4f;" />
  </div>
</${_T}>`
const jsSizes = toJs(tsSizes)

const tsFeatures = `<${_T}>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <span style="font-size: 14px; color: #999;">划线价：</span>
      <yh-price :value="299" line-through />
    </div>
    <div>
      <span style="font-size: 14px; color: #999;">千分符：</span>
      <yh-price :value="1234567.89" thousandth />
    </div>
  </div>
</${_T}>`
const jsFeatures = toJs(tsFeatures)

const tsNuxt = `<${_T}>
  <yh-price :value="getPrice" animated />
</${_T}>

<${_S} setup lang="ts">
import { ref, onMounted } from 'vue'
const getPrice = ref(0)
onMounted(() => {
  getPrice.value = 888.88
})
</${_S}>`
const jsNuxt = toJs(tsNuxt)

const getPrice = ref(888.88)

</script>

## 基础用法

最基本的展示方式，默认保留两位小数并自带人民币符号。支持开启 `approx` 近似展示。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-price :value="1234.56" />
    <yh-price :value="1234.56" :precision="0" />
    <yh-price :value="1234.56" symbol-position="after" symbol="元" />
    <yh-price :value="1234.56" approx />
  </div>
</DemoBlock>

## 价格区间

通过 `max-value` 属性轻松实现电商场景下的价格区间展示。

<DemoBlock title="价格区间" :ts-code="tsRange" :js-code="jsRange">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-price :value="99" :max-value="199" />
    <yh-price :value="9.9" :max-value="12.5" size="large" bold />
  </div>
</DemoBlock>

## 电商高级扩展

集成了常见的会员标签、库存单位、原价对比以及酷炫的渐变文字效果。

<DemoBlock title="电商场景" :ts-code="tsEcommerce" :js-code="jsEcommerce">
  <div style="display: flex; flex-direction: column; gap: 20px;">
    <div style="display: flex; align-items: center; gap: 8px;">
      <yh-price :value="168" tag="会员价" tag-type="danger" size="large" bold />
      <yh-price :value="299" delete-value="299" delete-label="指导价" />
    </div>
    <yh-price :value="5.8" unit="/ 斤" />
    <yh-price :value="8888" :gradient="['#ff4d4f', '#722ed1']" size="large" bold />
  </div>
</DemoBlock>

## 多种尺寸

内置 `small`, `default`, `large` 三种尺寸，同时也支持通过 `style` 或 `theme-overrides` 自由控制字号与颜色。

<DemoBlock title="尺寸对比" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="display: flex; align-items: baseline; gap: 20px;">
    <yh-price :value="99" size="small" />
    <yh-price :value="99" size="default" />
    <yh-price :value="99" size="large" />
    <yh-price :value="99" style="font-size: 40px; color: #ff4d4f;" />
  </div>
</DemoBlock>

## 更多特性

包含划线价显示、千分符处理。

<DemoBlock title="功能展示" :ts-code="tsFeatures" :js-code="jsFeatures">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <span style="font-size: 14px; color: #999;">划线价：</span>
      <yh-price :value="299" line-through />
    </div>
    <div>
      <span style="font-size: 14px; color: #999;">千分符：</span>
      <yh-price :value="1234567.89" thousandth />
    </div>
  </div>
</DemoBlock>

## 在 Nuxt 中使用

`YhPrice` 在 Nuxt 3 中支持动态数值动画。即使在复杂数据流下也能保持极高的渲染性能。

<DemoBlock title="Nuxt 集成" :ts-code="tsNuxt" :js-code="jsNuxt">
  <yh-price :value="getPrice" animated />
</DemoBlock>

## API

### Props

| 属性名          | 说明                         | 类型                                                        | 默认值      |
| --------------- | ---------------------------- | ----------------------------------------------------------- | ----------- |
| value           | 价格数值                     | `number \| string`                                          | `0`         |
| max-value       | 最大价格数值 (区间模式)      | `number \| string`                                          | `undefined` |
| symbol          | 货币符号                     | `string`                                                    | `'¥'`       |
| symbol-position | 符号位置                     | `'before' \| 'after'`                                       | `'before'`  |
| precision       | 小数精度                     | `number`                                                    | `2`         |
| line-through    | 是否显示划线价样式           | `boolean`                                                   | `false`     |
| size            | 尺寸                         | `'small' \| 'default' \| 'large' \| string`                 | `'default'` |
| split           | 是否将整数和小数分拆字号显示 | `boolean`                                                   | `true`      |
| decimal-scale   | 小数部分字号缩小比例 (0-1)   | `number`                                                    | `0.8`       |
| thousandth      | 是否开启千分符               | `boolean`                                                   | `true`      |
| bold            | 是否加粗                     | `boolean`                                                   | `false`     |
| approx          | 是否开启约等于符号 (~)       | `boolean`                                                   | `false`     |
| prefix          | 前缀文本                     | `string`                                                    | `''`        |
| suffix          | 后缀文本                     | `string`                                                    | `''`        |
| unit            | 价格单位 (如 /件, /kg)       | `string`                                                    | `''`        |
| delete-value    | 原价 (用于划线对比展示)      | `number \| string`                                          | `undefined` |
| delete-label    | 原价标签 (如 吊牌价)         | `string`                                                    | `''`        |
| tag             | 价格标签 (如 会员价)         | `string`                                                    | `''`        |
| tag-type        | 标签类型                     | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'danger'`  |
| animated        | 是否开启动态滚动动画         | `boolean`                                                   | `false`     |
| gradient        | 是否开启并设置渐变色         | `boolean \| string[]`                                       | `false`     |
| theme-overrides | 主题变量覆盖                 | `object`                                                    | —           |

### Events

当前组件未暴露组件事件。

### Slots

| 插槽名 | 说明             | 参数 |
| ------ | ---------------- | ---- |
| prefix | 前缀插槽         | —    |
| suffix | 后缀插槽         | —    |
| symbol | 货币符号区域插槽 | —    |
| tag    | 标签区域插槽     | —    |
| unit   | 单位区域插槽     | —    |

## 主题变量

| 变量名                     | 说明                 | 默认值                   |
| -------------------------- | -------------------- | ------------------------ |
| `--yh-price-color`         | 价格主色             | `var(--yh-color-danger)` |
| `--yh-price-font-family`   | 价格字体族           | `var(--yh-font-family)`  |
| `--yh-price-integer-size`  | 整数部分基础字号     | `1.25em`                 |
| `--yh-price-symbol-size`   | 符号部分基础字号     | `0.75em`                 |
| `--yh-price-decimal-scale` | 小数部分字号缩放比例 | `0.8`                    |
| `--yh-price-tag-bg`        | 标签背景颜色         | `var(--yh-color-danger)` |

### Expose

当前组件未暴露公开实例方法或属性。

### 类型导出

| 名称 | 说明 |
| --- | --- |
| `YhPriceProps` | 组件 Props 类型 |
| `YhPriceSlots` | 组件插槽类型 |
| `YhPriceInstance` | 组件实例类型 |
