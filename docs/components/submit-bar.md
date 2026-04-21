<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

// ─── 基础用法 ─────────────────────────────────────────────────────────────────
const tsBasic = `<${_T}>
  <div style="height: 56px;">
    <yh-submit-bar
      :price="30.50"
      button-text="提交订单"
      @submit="onSubmit"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
const onSubmit = () => {
  alert('订单已提交，合计：30.50')
}
</${_S}>`

const jsBasic = toJs(tsBasic)
const onSubmit = () => { alert('订单已提交，合计：30.50') }

// ─── 购物车模式 ───────────────────────────────────────────────────────────────
const cartChecked = ref(false)
const cartPrice = ref(99900)
const cartCount = ref(2)

const tsCart = `<${_T}>
  <div style="height: 56px;">
    <yh-submit-bar
      v-model:checked="cartChecked"
      :price="cartPrice"
      :selected-count="cartCount"
      button-text="去结算"
      show-checkbox
      cent-unit
      @submit="onSubmit"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const cartChecked = ref(false)
const cartPrice = ref(99900)
const cartCount = ref(2)

const onSubmit = () => {
  console.log('去结算操作')
}
</${_S}>`

const jsCart = toJs(tsCart)

// ─── 状态控制 ───────────────────────────────────────────────────────────────
const tsState = `<${_T}>
  <div style="background-color: #f7f8fa; padding: 20px 0;">
    <!-- 加载中状态 -->
    <yh-submit-bar
      :price="30.50"
      button-text="提交订单"
      loading
      style="margin-bottom: 30px; position: static;"
    />
    <!-- 禁用状态与顶部提示 -->
    <yh-submit-bar
      :price="30.50"
      button-text="提交订单"
      disabled
      tip="您的收货地址超出商品配送范围，暂时无法下单"
      style="position: static;"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
</${_S}>`

const jsState = toJs(tsState)

// ─── 高级插槽 ───────────────────────────────────────────────────────────────
const tsAdvanced = `<${_T}>
  <div style="background-color: #f7f8fa; padding: 20px 0;">
    <yh-submit-bar :price="30.50" style="position: static;">
      <!-- 顶部自定义插槽 -->
      <template #tip>
        <div style="display: flex; align-items: center; gap: 4px;">
          <yh-icon name="info" style="color: #ff4d4f;" />
          <span style="color: #ff4d4f; font-weight: 500; font-size: 12px;">限时满减活动即将结束，请尽快结算！</span>
        </div>
      </template>
      <!-- 左侧补充信息 -->
      <template #left>
        <span style="font-size: 13px; color: var(--yh-text-color-secondary); margin-left: 14px;">另需运费 ¥5.00</span>
      </template>
      <!-- 强调按钮文字 -->
      <template #button>
        <span style="font-size: 16px; font-weight: 600; font-style: italic;">立即抢购</span>
      </template>
    </yh-submit-bar>
  </div>
</${_T}>

<${_S} setup lang="ts">
</${_S}>`

const jsAdvanced = toJs(tsAdvanced)

// --- Nuxt Demo 状态 (解耦避免干扰) ---
const nuxtPrice = ref(128.50)
const onSubmitNuxt = () => { alert('Nuxt SSR 提交：¥128.50') }

const tsNuxt = `<${_T}>
  <div style="height: 56px;">
    <yh-submit-bar
      :price="nuxtPrice"
      button-text="Nuxt 提交"
      @submit="onSubmitNuxt"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const nuxtPrice = ref(128.50)
const onSubmitNuxt = () => {
  alert('Nuxt SSR 提交：¥128.50')
}
</${_S}>`

const jsNuxt = toJs(tsNuxt)
</script>

# SubmitBar 提交栏

用于电商结算页或购物车底部，用于展示合计金额、已选件数及提交按钮。支持吸底适配（Safe Area）和全选功能。

## 基础用法

展示合计金额和点击结算按钮。要求 `height: 56px` 或其他包裹容器来占据正常文档流高度，若吸底则无需占位。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="height: 56px;">
    <yh-submit-bar
      :price="30.50"
      button-text="提交订单"
      @submit="onSubmit"
    />
  </div>
</DemoBlock>

## 购物车模式（带全选）

集成全选复选框，适用于购物车页面。通过配置 `cent-unit` 属性可以直接传入按"分"计算的后端金额。

<DemoBlock title="购物车模式" :ts-code="tsCart" :js-code="jsCart">
  <div style="height: 56px;">
    <yh-submit-bar
      v-model:checked="cartChecked"
      :price="cartPrice"
      :selected-count="cartCount"
      button-text="去结算"
      show-checkbox
      cent-unit
      @submit="onSubmit"
    />
  </div>
</DemoBlock>

## 禁用与加载状态

组件内置了 `disabled` 和 `loading` 状态，并且可以通过 `tip` 属性在结算栏上方展示醒目的警告/提示横幅（如不在配送范围等）。

<DemoBlock title="状态控制与提示横幅" :ts-code="tsState" :js-code="jsState">
  <div style="background-color: #f7f8fa; padding: 20px 0;">
    <yh-submit-bar
      :price="30.50"
      button-text="提交订单"
      loading
      style="margin-bottom: 30px; position: static;"
    />
    <yh-submit-bar
      :price="30.50"
      button-text="提交订单"
      disabled
      tip="您的收货地址超出商品配送范围，暂时无法下单"
      style="position: static;"
    />
  </div>
</DemoBlock>

## 高级插槽自定义

你可以通过 `#tip`, `#left`, `#button`, 和 `#right` 插槽实现高度定制化的购物结算块布局。

<DemoBlock title="高级插槽" :ts-code="tsAdvanced" :js-code="jsAdvanced">
  <div style="background-color: #f7f8fa; padding: 20px 0;">
    <yh-submit-bar :price="30.50" style="position: static;">
      <!-- 顶部自定义插槽 -->
      <template #tip>
        <div style="display: flex; align-items: center; gap: 4px;">
          <yh-icon name="info" style="color: #ff4d4f;" />
          <span style="color: #ff4d4f; font-weight: 500; font-size: 12px;">限时满减活动即将结束，请尽快结算！</span>
        </div>
      </template>
      <!-- 左侧补充信息 -->
      <template #left>
        <span style="font-size: 13px; color: var(--yh-text-color-secondary); margin-left: 14px;">另需运费 ¥5.00</span>
      </template>
      <!-- 强调按钮文字 -->
      <template #button>
        <span style="font-size: 16px; font-weight: 600; font-style: italic;">立即抢购</span>
      </template>
    </yh-submit-bar>
  </div>
</DemoBlock>

## 在 Nuxt 中使用

本组件完美支持 Nuxt 3/4 SSR 数据在服务端的预渲染计算。

<DemoBlock title="Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="height: 56px; background-color: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.05);">
    <yh-submit-bar
      :price="nuxtPrice"
      button-text="Nuxt 提交"
      @submit="onSubmitNuxt"
    />
  </div>
</DemoBlock>

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@yh-ui/nuxt'],
  yhUI: {
    // 默认已自动按需引入，无需特殊配置
    // options...
  }
})
```

## API

### Props

| 参数                   | 说明                                 | 类型                     | 默认值      |
| ---------------------- | ------------------------------------ | ------------------------ | ----------- |
| price                  | 金额                                 | `number`                 | `0`         |
| currency               | 货币符号                             | `string`                 | `¥`         |
| cent-unit              | price 是否以分为单位                 | `boolean`                | `false`     |
| decimal-length         | 金额保留几位小数                     | `number`                 | `2`         |
| label                  | 金额说明前缀文字                     | `string`                 | `'合计：'`  |
| button-text            | 提交按钮文字                         | `string`                 | —           |
| button-type            | 按钮预设类型 (`primary` `danger` 等) | `SubmitBarButtonType`    | `'primary'` |
| show-checkbox          | 是否显示全选复选框                   | `boolean`                | `false`     |
| checked                | 全选状态，支持 `v-model:checked`     | `boolean`                | `false`     |
| indeterminate          | 半选状态                             | `boolean`                | `false`     |
| selected-count         | 已选件数                             | `number`                 | `0`         |
| tip                    | 顶部提示文案                         | `string`                 | —           |
| disabled               | 是否禁用按钮                         | `boolean`                | `false`     |
| loading                | 是否处于加载状态                     | `boolean`                | `false`     |
| safe-area-inset-bottom | 是否开启底部安全区适配               | `boolean`                | `true`      |
| theme-overrides        | 自定义主题 CSS 变量                  | `Record<string, string>` | `{}`        |

### Events

| 事件名         | 说明                       | 回调参数          |
| -------------- | -------------------------- | ----------------- |
| submit         | 点击提交按钮时触发         | `(e: MouseEvent)` |
| update:checked | 复选框状态发生双向绑定变化 | `(val: boolean)`  |
| check-change   | 勾选框主动改变时触发       | `(val: boolean)`  |

### Slots (插槽)

| 插槽名  | 说明                              | 参数 |
| ------- | --------------------------------- | ---- |
| default | 默认插槽                          | -    |
| tip     | 自定义顶部提示横幅内容            | -    |
| left    | 自定义左侧全选框旁的内容补充      | -    |
| right   | 自定义右侧提交按钮旁的内容补充    | -    |
| price   | 完全复写整个中间金额区域展示      | -    |
| button  | 复写提交按钮里的所有样式/文案结构 | -    |

### Expose

当前组件未暴露公开实例方法或属性。

### 主题变量 (CSS Variables)

通过传入 `theme-overrides` prop 或全局定制，可轻松定制组件主题。

| 变量名                          | 说明                   | 默认值                               |
| ------------------------------- | ---------------------- | ------------------------------------ |
| `--yh-submit-bar-bg`            | 组件整体背景色         | `var(--yh-bg-color)`                 |
| `--yh-submit-bar-border`        | 顶部上边框颜色         | `var(--yh-border-color-lighter)`     |
| `--yh-submit-bar-height`        | 组件整体高度           | `56px`                               |
| `--yh-submit-bar-price-color`   | 金额主色偏红           | `var(--yh-color-danger)`             |
| `--yh-submit-bar-price-size`    | 金额整体部分数字大小   | `22px`                               |
| `--yh-submit-bar-label-color`   | 合计标签颜色           | `var(--yh-text-color-regular)`       |
| `--yh-submit-bar-btn-radius`    | 结算按钮圆角           | `var(--yh-radius-large)`             |
| `--yh-submit-bar-btn-min-width` | 结算按钮最小宽度       | `108px`                              |
| `--yh-submit-bar-tip-bg`        | 顶部提示横幅的背景色   | `var(--yh-color-warning-light-9)`    |
| `--yh-submit-bar-tip-color`     | 顶部提示横幅的文字主色 | `var(--yh-color-warning)`            |
| `--yh-submit-bar-shadow`        | 吸底时的阴影           | `0 -2px 12px var(--yh-shadow-color)` |
| `--yh-submit-bar-z-index`       | 组件吸底时的固定层级   | `200`                                |

### 类型导出

| 名称 | 说明 |
| --- | --- |
| `YhSubmitBarProps` | 组件 Props 类型 |
| `YhSubmitBarEmits` | 组件事件类型 |
| `YhSubmitBarSlots` | 组件插槽类型 |
| `YhSubmitBarButtonType` | 按钮类型联合类型 |
| `YhSubmitBarInstance` | 组件实例类型 |
