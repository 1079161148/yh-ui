# Coupon Card 优惠券卡片

用于展示优惠券信息的标准组件，支持多种边框形状（内切圆、波浪线、传统缺口）、状态管理（可用、已使用、已过期）以及下单页的勾选模式。

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S, _St } from '../.vitepress/theme/utils/demo-utils'

const tsBasic = `<${_T}>
  <div style="display: grid; gap: 16px; width: 340px;">
    <yh-coupon-card
      title="全场通用券"
      description="适用于全场商品（特殊商品除外）"
      amount="50"
      threshold="满 500 可用"
      validPeriod="2024.01.01 - 2024.12.31"
      actionText="立即领取"
    />
  </div>
</${_T}>`
const jsBasic = toJs(tsBasic)

const tsStatus = `<${_T}>
  <div style="display: grid; gap: 16px; width: 340px;">
    <yh-coupon-card
      status="used"
      title="已使用的券"
      amount="100"
      threshold="满 1000 可用"
      :action-text="'已使用'"
    />
    <yh-coupon-card
      status="expired"
      title="已过期的券"
      amount="20"
      threshold="满 200 可用"
      :action-text="'已过期'"
    />
  </div>
</${_T}>`
const jsStatus = toJs(tsStatus)

const isSelected = ref(false)
const tsSelectable = `<${_T}>
  <div style="width: 340px;">
    <yh-coupon-card
      v-model:selected="isSelected"
      selectable
      title="可选择的优惠券"
      amount="30"
      threshold="满 300 可用"
    />
    <p style="margin-top: 12px; font-size: 14px; color: var(--yh-text-color-secondary);">
      当前选中状态: {{ isSelected ? '已选中' : '未选中' }}
    </p>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
const isSelected = ref(false)
</${_S}>`
const jsSelectable = toJs(tsSelectable)

const tsNuxt = `<${_T}>
  <yh-coupon-card
    title="Nuxt 适配券"
    amount="10"
    action-text="立即领取"
  />
</${_T}>`
const jsNuxt = toJs(tsNuxt)

const tsAdvanced = `<${_T}>
  <div style="display: grid; gap: 24px; width: 340px;">
    <!-- 角标模式 -->
    <yh-coupon-card
      badge="神券"
      badge-type="danger"
      title="限时大翻倍"
      amount="100"
      threshold="满 1000 可用"
      :valid-period="'仅限今日使用'"
    />

    <!-- 疯抢进度模式 -->
    <yh-coupon-card
      title="百亿补贴"
      amount="50"
      threshold="无门槛"
      :percent="85"
      percent-text="已抢 85%"
      :valid-period="'2024.01.01 - 2024.12.31'"
    />

    <!-- 使用规则折叠模式 -->
    <yh-coupon-card
      title="超级会员券"
      amount="30"
      threshold="满 300 可用"
      :valid-period="'长期有效'"
      rules="1. 仅限超级会员账号使用\n2. 适用于全场自营商品\n3. 不可与红包叠加使用"
    />
  </div>
</${_T}>`
const jsAdvanced = toJs(tsAdvanced)

</script>

## 基础用法

展示优惠券的核心信息。支持 `circle` (默认), `indent`, `scallop` 三种边框变体。

<DemoBlock title="基础展示" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="display: grid; gap: 16px; width: 340px;">
    <yh-coupon-card
      title="全场通用券"
      description="适用于全场商品（特殊商品除外）"
      amount="50"
      threshold="满 500 可用"
      :valid-period="'2024.01.01 - 2024.12.31'"
      :action-text="'立即领取'"
    />
  </div>
</DemoBlock>

## 状态管理

内置 `available`, `used`, `expired`, `locked` 四种状态切换，自动处理置灰和水印效果。

<DemoBlock title="不同状态演示" :ts-code="tsStatus" :js-code="jsStatus">
  <div style="display: grid; gap: 16px; width: 340px;">
    <yh-coupon-card
      status="used"
      title="已使用的券"
      amount="100"
      threshold="满 1000 可用"
      :action-text="'已使用'"
    />
    <yh-coupon-card
      status="expired"
      title="已过期的券"
      amount="20"
      threshold="满 200 可用"
      :action-text="'已过期'"
    />
  </div>
</DemoBlock>

## 选择模式

支持 `selectable` 模式，配合 `v-model:selected` 用于结算页的券勾选场景。

<DemoBlock title="可勾选模式" :ts-code="tsSelectable" :js-code="jsSelectable">
  <div style="width: 340px;">
    <yh-coupon-card
      v-model:selected="isSelected"
      selectable
      title="可选择的优惠券"
      amount="30"
      threshold="满 300 可用"
    />
    <p style="margin-top: 12px; font-size: 14px; color: var(--yh-text-color-secondary);">
      当前选中状态: {{ isSelected ? '已选中' : '未选中' }}
    </p>
  </div>
</DemoBlock>

## 进阶电商特性

针对现代电商业务，提供了角标、疯抢进度条以及规则折叠等增强功能。

<DemoBlock title="高级特性演示" :ts-code="tsAdvanced" :js-code="jsAdvanced">
  <div style="display: grid; gap: 24px; width: 340px;">
    <yh-coupon-card
      badge="神券"
      badge-type="danger"
      title="限时大翻倍"
      amount="100"
      threshold="满 1000 可用"
      :valid-period="'仅限今日使用'"
      :action-text="'立即翻倍'"
    />
    <yh-coupon-card
      title="百亿补贴"
      amount="50"
      threshold="无门槛"
      :percent="85"
      percent-text="已抢 85%"
      :valid-period="'2024.01.01 - 2024.12.31'"
      :action-text="'立即领取'"
    />
    <yh-coupon-card
      title="超级会员券"
      amount="30"
      threshold="满 300 可用"
      :valid-period="'长期有效'"
      rules="1. 仅限超级会员账号使用\n2. 适用于全场自营商品\n3. 不可与红包叠加使用"
      :action-text="'立即兑换'"
    />
  </div>
</DemoBlock>

## 在 Nuxt 中使用

`YhCouponCard` 完美适配 Nuxt 3。

<DemoBlock title="Nuxt 集成" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="width: 340px;">
    <yh-coupon-card
      title="Nuxt 适配券"
      amount="10"
      action-text="立即领取"
    />
  </div>
</DemoBlock>

## API

### Props

| 属性名          | 说明                    | 类型                                              | 默认值             |
| --------------- | ----------------------- | ------------------------------------------------- | ------------------ |
| title           | 优惠券标题              | `string`                                          | `''`               |
| description     | 描述文本                | `string`                                          | `''`               |
| amount          | 优惠金额/数值           | `string \| number`                                | `''`               |
| symbol          | 货币符号                | `string`                                          | `'¥'`              |
| threshold       | 使用门槛描述            | `string \| number`                                | `''`               |
| valid-period    | 有效期描述              | `string`                                          | `''`               |
| status          | 状态                    | `'available' \| 'used' \| 'expired' \| 'locked'`  | `'available'`      |
| variant         | 背景镂空变体            | `'circle' \| 'indent' \| 'scallop'`               | `'circle'`         |
| selectable      | 是否开启选择模式        | `boolean`                                         | `false`            |
| selected        | 是否选中 (支持 v-model) | `boolean`                                         | `false`            |
| action-text     | 操作按钮文案            | `string`                                          | `''`               |
| badge           | 角标文本                | `string`                                          | `''`               |
| badge-type      | 角标颜色类型            | `'danger' \| 'warning' \| 'primary' \| 'success'` | `'danger'`         |
| percent         | 疯抢进度百分比 (0-100)  | `number`                                          | —                  |
| percent-text    | 进度条旁边的提示文本    | `string`                                          | `''`               |
| rules           | 底部展开的使用规则文本  | `string`                                          | `''`               |
| rule-title      | 使用规则展示的标题文本  | `string`                                          | `''`               |
| disabled        | 是否禁用过期样式展示    | `boolean`                                         | `false`            |
| theme-overrides | 主题变量覆盖            | `object`                                          | —                  |

### Events

| 事件名          | 说明                 | 回调参数                      |
| --------------- | -------------------- | ----------------------------- |
| click           | 点击卡片整体触发     | `(event: MouseEvent) => void` |
| action          | 点击右侧操作按钮触发 | `(event: MouseEvent) => void` |
| update:selected | 选中状态改变时触发   | `(val: boolean) => void`      |

### Slots

| 插槽名      | 说明               | 参数 |
| ----------- | ------------------ | ---- |
| title       | 自定义优惠券标题   | —    |
| description | 自定义描述内容     | —    |
| action      | 自定义右侧操作区域 | —    |
| badge       | 自定义角标内容     | —    |
| seal        | 自定义状态印章     | `{ status: CouponStatus }` |
| rules       | 自定义规则说明区域 | —    |

### Expose

当前组件未暴露公开实例方法或属性。

## 主题变量

| 变量名                      | 说明               | 默认值                       |
| --------------------------- | ------------------ | ---------------------------- |
| `--yh-coupon-bg`            | 卡片背景色         | `var(--yh-bg-color-overlay)` |
| `--yh-coupon-primary-color` | 强调色 (金额/按钮) | `var(--yh-color-primary)`    |
| `--yh-coupon-amount-size`   | 金额字号           | `28px`                       |

### 类型导出

| 名称 | 说明 |
| --- | --- |
| `YhCouponCardProps` | 组件 Props 类型 |
| `YhCouponCardEmits` | 组件事件类型 |
| `YhCouponCardSlots` | 组件插槽类型 |
| `YhCouponStatus` | 优惠券状态联合类型 |
| `YhCouponCardInstance` | 组件实例类型 |
