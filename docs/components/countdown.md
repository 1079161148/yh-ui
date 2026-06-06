# Countdown 倒计时

高性能倒计时组件，支持目标时间/持续时间模式、暂停/恢复、预警状态、翻牌动画、服务器时间校准等高级功能。采用 `requestAnimationFrame` 实现精准计时。

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S, _St } from '../.vitepress/theme/utils/demo-utils'

// --- 预览用状态（用于文档中的实时演示） ---
const deadline = ref(Date.now() + 2 * 60 * 60 * 1000)
const flashSaleEnd = ref(Date.now() + 3600000)
const countdownRef = ref()
const isPaused = ref(false)

const togglePause = () => {
  if (isPaused.value) {
    countdownRef.value?.resume()
  } else {
    countdownRef.value?.pause()
  }
  isPaused.value = !isPaused.value
}

const resetCountdown = () => {
  countdownRef.value?.reset()
  isPaused.value = false
}

const handleFinish = () => {
  console.log('倒计时结束！')
}

const handleWarning = () => {
  console.log('进入预警状态！')
}

// 预警演示用的独立状态
const warningValue = ref(15000)
const resetWarningDemo = () => {
  warningValue.value = 0 // 先强制归零触发重置监听
  setTimeout(() => {
    warningValue.value = 15000
  }, 10)
}

const onStart = () => console.log('Started')
const onStatusChange = (status: string) => console.log('Status:', status)

// --- 实战案例状态 ---
const showModal = ref(false)
const sharedDeadline = ref(Date.now() + 10 * 60 * 1000)
const flashSaleProducts = ref([
  { id: 1, name: '智能手表 Pro', deadline: Date.now() + 3600000, price: '¥1,299' },
  { id: 2, name: '降噪耳机 Max', deadline: Date.now() + 7200000, price: '¥1,899' },
  { id: 3, name: '机械键盘 G9', deadline: Date.now() + 1800000, price: '¥599' }
])

// --- 代码示例定义 ---

// 1. 基础用法
const tsBasic = `<${_T}>
  <yh-countdown :value="deadline" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
// 目标时间：传入 Date 对象或毫秒时间戳
const deadline = ref(Date.now() + 2 * 60 * 60 * 1000)
</${_S}>`

const jsBasic = toJs(tsBasic)

// 2. 持续时间模式
const tsDuration = `<${_T}>
  <div style="display: flex; gap: 32px; align-items: center;">
    <!-- 传入毫秒数（小于 978307200000）视为时长 -->
    <yh-countdown :value="60000" format="mm:ss" />
    <yh-countdown :value="300000" format="mm分ss秒" />
  </div>
</${_T}>`

const jsDuration = toJs(tsDuration)

// 3. 自定义格式
const tsFormat = `<${_T}>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <!-- 天、时、分、秒 -->
    <yh-countdown :value="90061000" format="DD天HH:mm:ss" />
    <!-- 毫秒精度 -->
    <yh-countdown :value="61500" format="mm:ss.SSS" :interval="10" :precision="10" />
    <!-- 前缀和后缀 -->
    <yh-countdown :value="3600000" title="剩余：" suffix="秒" />
  </div>
</${_T}>`

const jsFormat = toJs(tsFormat)

// 4. 翻牌样式
const tsFlip = `<${_T}>
  <yh-countdown
    :value="3661000"
    flip-animation
    :labels="{ hours: '时', minutes: '分', seconds: '秒' }"
  />
</${_T}>`

const jsFlip = toJs(tsFlip)

// 5. 控制倒计时
const tsControl = `<${_T}>
  <div>
    <yh-countdown
      ref="countdownRef"
      :value="60000"
      :auto-start="false"
      @start="onStart"
      @status-change="onStatusChange"
    />
    <div style="margin-top: 12px; display: flex; gap: 8px;">
      <yh-button size="small" @click="countdownRef?.start()">开始</yh-button>
      <yh-button size="small" @click="togglePause">{{ isPaused ? '继续' : '暂停' }}</yh-button>
      <yh-button size="small" @click="resetCountdown">重置</yh-button>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const countdownRef = ref()
const isPaused = ref(false)

const togglePause = () => {
  if (isPaused.value) {
    countdownRef.value?.resume()
  } else {
    countdownRef.value?.pause()
  }
  isPaused.value = !isPaused.value
}

const resetCountdown = () => {
  countdownRef.value?.reset()
  isPaused.value = false
}

const onStart = () => console.log('Started')
const onStatusChange = (status: string) => console.log('Status:', status)
</${_S}>`

const jsControl = toJs(tsControl)

// 6. 预警状态
const tsWarning = `<${_T}>
  <yh-countdown
    :value="15000"
    :warning-threshold="10000"
    @warning="handleWarning"
  />
</${_T}>

<${_S} setup lang="ts">
const handleWarning = () => {
  console.log('倒计时不足 10 秒，进入预警状态！')
}
</${_S}>`

const jsWarning = toJs(tsWarning)

// 7. 完全自定义
const tsCustom = `<${_T}>
  <yh-countdown :value="3600000">
    <template #default="{ current, isWarning }">
      <div :class="['custom-countdown', { 'is-warning': isWarning }]">
        <span class="time-block">{{ current.HH }}</span>
        <span class="time-sep">:</span>
        <span class="time-block">{{ current.mm }}</span>
        <span class="time-sep">:</span>
        <span class="time-block">{{ current.ss }}</span>
      </div>
    </template>
  </yh-countdown>
</${_T}>

<${_St} scoped>
.custom-countdown {
  display: flex;
  align-items: center;
  gap: 4px;
}
.time-block {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 24px;
  min-width: 44px;
  text-align: center;
}
.time-sep {
  font-size: 24px;
  font-weight: bold;
  color: #667eea;
}
.is-warning .time-block {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}
</${_St}>`

const jsCustom = toJs(tsCustom)

// 8. 服务器时间校准
const tsServerTime = `<${_T}>
  <yh-countdown
    :value="serverDeadline"
    :server-time-offset="serverTimeOffset"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref, onMounted } from 'vue'

const serverDeadline = ref(0)
const serverTimeOffset = ref(0) // 服务器时间 - 本地时间

onMounted(async () => {
  // 模拟接口请求
  const res = await fetch('/api/server-time')
  const { deadline, serverTime } = await res.json()
  serverDeadline.value = deadline
  serverTimeOffset.value = serverTime - Date.now()
})
</${_S}>`

const jsServerTime = toJs(tsServerTime)

// 综合场景：限时抢购
const tsFlashSale = `<${_T}>
  <div class="flash-sale">
    <span class="flash-sale__label">限时抢购</span>
    <yh-countdown
      :value="flashSaleEnd"
      flip-animation
      :warning-threshold="300000"
      :labels="{ hours: '时', minutes: '分', seconds: '秒' }"
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const flashSaleEnd = ref(Date.now() + 3600000)
</${_S}>

<${_St} scoped>
.flash-sale {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%);
  border-radius: 12px;
}
.flash-sale__label {
  color: white;
  font-weight: bold;
  font-size: 16px;
}
</${_St}>`

const jsFlashSale = toJs(tsFlashSale)

// 9. Nuxt 使用
const tsNuxt = `<${_T}>
  <yh-countdown :value="deadline" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
// Nuxt 环境下组件自动导入，无需配置
const deadline = ref(Date.now() + 60000)
</${_S}>`

const jsNuxt = toJs(tsNuxt)

// 10. 弹框同步
const tsShared = `<${_T}>
  <div class="demo-sync">
    <div class="demo-sync__main" style="display: flex; align-items: center; gap: 12px;">
      <span>页面倒计时：</span>
      <yh-countdown :value="sharedDeadline" />
      <yh-button type="primary" size="small" @click="showModal = true">打开弹窗</yh-button>
    </div>

    <yh-dialog v-model="showModal" title="倒计时同步测试" width="400px">
      <div style="text-align: center; padding: 20px 0;">
        <p style="margin-bottom: 16px; color: #64748b;">弹窗内倒计时与页面严格同步：</p>
        <yh-countdown :value="sharedDeadline" value-style="font-size: 32px; color: var(--yh-primary-color);" />
        <p style="margin-top: 16px; color: #94a3b8; font-size: 13px;">关闭并重新打开弹窗，时间依然精准衔接</p>
      </div>
    </yh-dialog>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const showModal = ref(false)
const sharedDeadline = ref(Date.now() + 10 * 60 * 1000)
</${_S}>`

const jsShared = toJs(tsShared)

// 11. 秒杀列表
const tsList = `<${_T}>
  <div class="flash-sale-list">
    <div v-for="item in products" :key="item.id" class="flash-sale-item">
      <div class="item-info">
        <span class="item-name">{{ item.name }}</span>
        <span class="item-price">{{ item.price }}</span>
      </div>
      <div class="item-timer">
        <span class="timer-label">距结束</span>
        <yh-countdown :value="item.deadline" format="HH:mm:ss" />
      </div>
      <yh-button type="danger" size="small" round>立即抢购</yh-button>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const products = ref([
  { id: 1, name: '智能手表 Pro', deadline: Date.now() + 3600000, price: '¥1,299' },
  { id: 2, name: '降噪耳机 Max', deadline: Date.now() + 7200000, price: '¥1,899' },
  { id: 3, name: '机械键盘 G9', deadline: Date.now() + 1800000, price: '¥599' }
])
</${_S}>

<${_St} scoped>
.flash-sale-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.flash-sale-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}
.item-info {
  display: flex;
  flex-direction: column;
}
.item-name {
  font-weight: bold;
  color: #1e293b;
}
.item-price {
  color: #ef4444;
  font-size: 14px;
}
.item-timer {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.timer-label {
  font-size: 12px;
  color: #64748b;
  margin-bottom: 4px;
}
</${_St}>`

const jsList = toJs(tsList)
</script>

## 基础用法

设置 `value` 为目标时间戳或 Date 对象，组件会自动计算剩余时间并倒计时。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div class="yh-demo-row">
    <yh-countdown :value="deadline" />
  </div>
</DemoBlock>

## 持续时间模式

传入毫秒数（小于 `978307200000`，即 2001-01-01）时，视为持续时间模式。

<DemoBlock title="持续时间模式" :ts-code="tsDuration" :js-code="jsDuration">
  <div style="display: flex; gap: 32px; align-items: center;">
    <yh-countdown :value="60000" format="mm:ss" />
    <yh-countdown :value="300000" format="mm分ss秒" />
  </div>
</DemoBlock>

## 自定义格式与文本

通过 `format` 属性自定义显示格式。支持 `DD`、`HH`、`mm`、`ss`、`SSS` 占位符。同时支持 `title` 和 `suffix`。

<DemoBlock title="自定义格式" :ts-code="tsFormat" :js-code="jsFormat">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-countdown :value="90061000" format="DD天HH:mm:ss" />
    <yh-countdown :value="61500" format="mm:ss.SSS" :interval="10" :precision="10" />
    <yh-countdown :value="3600000" title="剩余计时：" suffix=" (预计)" />
  </div>
</DemoBlock>

## 翻牌样式

设置 `flip-animation` 启用翻牌样式，结合 `labels` 为每个时间单位添加标签。

<DemoBlock title="翻牌样式" :ts-code="tsFlip" :js-code="jsFlip">
  <yh-countdown
    :value="3661000"
    flip-animation
    :labels="{ hours: '时', minutes: '分', seconds: '秒' }"
  />
</DemoBlock>

## 控制倒计时

通过 `ref` 获取组件实例，手动控制倒计时的生命周期。

<DemoBlock title="控制倒计时" :ts-code="tsControl" :js-code="jsControl">
  <div>
    <yh-countdown
      ref="countdownRef"
      :value="60000"
      :auto-start="false"
      @start="onStart"
      @status-change="onStatusChange"
    />
    <div style="margin-top: 12px; display: flex; gap: 8px;">
      <yh-button size="small" @click="countdownRef?.start()">开始</yh-button>
      <yh-button size="small" @click="togglePause">{{ isPaused ? '继续' : '暂停' }}</yh-button>
      <yh-button size="small" @click="resetCountdown">重置</yh-button>
    </div>
  </div>
</DemoBlock>

## 预警状态

通过 `warning-threshold` 设置预警阈值。当倒计时进入该范围时，会添加 `is-warning` 类以便于样式自定义。

<DemoBlock title="预警状态" :ts-code="tsWarning" :js-code="jsWarning">
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <yh-countdown
      :value="warningValue"
      :warning-threshold="10000"
      @warning="handleWarning"
    />
    <div>
      <yh-button size="small" @click="resetWarningDemo">重置预警演示</yh-button>
    </div>
  </div>
</DemoBlock>

## 完全自定义

利用默认插槽完全接管渲染。插槽作用域暴露了完整的 `current` 格式化对象及状态标识。

<DemoBlock title="完全自定义" :ts-code="tsCustom" :js-code="jsCustom">
  <yh-countdown :value="3600000">
    <template #default="{ current, isWarning }">
      <div :class="['custom-countdown-demo', { 'is-warning': isWarning }]">
        <span class="time-block-demo">{{ current.HH }}</span>
        <span class="time-sep-demo">:</span>
        <span class="time-block-demo">{{ current.mm }}</span>
        <span class="time-sep-demo">:</span>
        <span class="time-block-demo">{{ current.ss }}</span>
      </div>
    </template>
  </yh-countdown>
</DemoBlock>

<style scoped>
.custom-countdown-demo {
  display: flex;
  align-items: center;
  gap: 4px;
}
.time-block-demo {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 24px;
  min-width: 44px;
  text-align: center;
}
.time-sep-demo {
  font-size: 24px;
  font-weight: bold;
  color: #667eea;
}
.is-warning .time-block-demo {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}
</style>

## 综合场景：限时抢购

结合翻牌动画、标签和预警状态，打造极具紧迫感的电商场景。

<DemoBlock title="限时抢购" :ts-code="tsFlashSale" :js-code="jsFlashSale">
  <div style="display: flex; align-items: center; gap: 12px; padding: 16px 24px; background: linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%); border-radius: 12px;">
    <span style="color: white; font-weight: bold; font-size: 16px;">限时抢购</span>
    <yh-countdown
      :value="flashSaleEnd"
      flip-animation
      :warning-threshold="300000"
      :labels="{ hours: '时', minutes: '分', seconds: '秒' }"
    />
  </div>
</DemoBlock>

## 服务器时间校准

应对客户端时钟由于手动调节或系统延迟导致的偏差。

<DemoBlock title="服务器时间校准" :ts-code="tsServerTime" :js-code="jsServerTime">
  <yh-countdown
    :value="Date.now() + 7200000"
    :server-time-offset="3600000"
  />
</DemoBlock>

## 实战：弹窗同步案例

在复杂的 SPA 应用中，同一计时任务可能在页面多个位置出现（如商品详情页及弹出的购买面板）。组件通过内部的时间对齐机制，确保弹窗频繁开启/关闭时，时间显示始终与页面保持绝对一致。

<DemoBlock title="弹窗同步" :ts-code="tsShared" :js-code="jsShared">
  <div style="display: flex; align-items: center; gap: 12px;">
    <span>页面倒计时：</span>
    <yh-countdown :value="sharedDeadline" />
    <yh-button type="primary" size="small" @click="showModal = true">打开弹窗</yh-button>
  </div>

  <yh-dialog v-model="showModal" title="倒计时同步测试" width="400px">
    <div style="text-align: center; padding: 20px 0;">
      <p style="margin-bottom: 16px; color: #64748b;">弹窗内倒计时与页面严格同步：</p>
      <yh-countdown :value="sharedDeadline" value-style="font-size: 32px; color: var(--yh-primary-color);" />
      <p style="margin-top: 16px; color: #94a3b8; font-size: 13px;">关闭并重新打开弹窗，时间依然精准衔接</p>
    </div>
  </yh-dialog>
</DemoBlock>

## 实战：电商秒杀列表

高性能 `requestAnimationFrame` 驱动，即使在瀑布流列表、海量秒杀券等高频刷新场景下，仍能保持极低的 CPU 占用和流畅的 UI 交互，且各计时器逻辑独立、互不干扰。

<DemoBlock title="秒杀列表" :ts-code="tsList" :js-code="jsList">
  <div style="display: flex; flex-direction: column; gap: 12px; max-width: 600px;">
    <div v-for="item in flashSaleProducts" :key="item.id" style="display: flex; align-items: center; justify-content: space-between; padding: 16px; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
      <div style="display: flex; flex-direction: column;">
        <span style="font-weight: bold; color: #1e293b;">{{ item.name }}</span>
        <span style="color: #ef4444; font-size: 14px;">{{ item.price }}</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center;">
        <span style="font-size: 12px; color: #64748b; margin-bottom: 4px;">距结束</span>
        <yh-countdown :value="item.deadline" format="HH:mm:ss" />
      </div>
      <yh-button type="danger" size="small" round>立即抢购</yh-button>
    </div>
  </div>
</DemoBlock>

## 在 Nuxt 中使用

Countdown 组件完全支持 Nuxt 3/4 的 SSR 渲染。在 Nuxt 项目中使用时，组件会自动导入，无需手动注册。

<DemoBlock title="Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="max-width: 240px;">
    <yh-countdown :value="deadline" />
  </div>
</DemoBlock>

**SSR 注意事项**：

- ✅ 组件初始渲染完全支持 SSR
- ✅ 时间计算和格式化在服务端完成
- ✅ Hydration 表现优异，无首屏跳动
- ✅ 自动感应客户端挂载并启动计时
- 💡 建议结合 `server-time-offset` 使用以保证多端时间绝对一致

::: tip SSR 性能
Countdown 内部使用 `requestAnimationFrame` 进行计时，该逻辑仅在客户端执行，不会消耗任何服务端资源。初始渲染时会根据当前服务器时间预计算剩余值，确保全链路体验的一致性。
:::

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 目标时间（Date/时间戳）或持续时间（毫秒） | `Date \| number` | — |
| format | 格式化模板或函数 | `string \| (ctx) => string` | `'HH:mm:ss'` |
| auto-start | 是否自动开始 | `boolean` | `true` |
| interval | 刷新间隔（毫秒） | `number` | `1000` |
| precision | 计时精度（毫秒） | `1000 \| 100 \| 10` | `1000` |
| title | 标题/前缀文本 | `string` | — |
| suffix | 后缀文本 | `string` | — |
| use-monospace-font | 使用等宽字体防止数字跳变 | `boolean` | `true` |
| flip-animation | 启用翻牌动画模式 | `boolean` | `false` |
| value-style | 倒计时数字的内联样式 | `CSSProperties \| string` | — |
| separator | 时间单位之间的分隔符 | `string` | `':'` |
| show-days | 显示天数 (`'auto'` 表示 >= 24h 时显示) | `boolean \| 'auto'` | `'auto'` |
| show-hours | 是否显示小时 | `boolean` | `true` |
| show-minutes | 是否显示分钟 | `boolean` | `true` |
| show-seconds | 是否显示秒 | `boolean` | `true` |
| show-milliseconds | 是否显示毫秒 | `boolean` | `false` |
| labels | 时间单位的标签模板 | `object` | — |
| keep-alive-on-finish | 结束后是否保持在 00:00:00 | `boolean` | `true` |
| warning-threshold | 预警阈值（毫秒） | `number` | — |
| timezone-offset | 时区偏移（分钟），用于校准多端时差 | `number` | — |
| server-time-offset | 服务器时间与本地时间的毫秒差 | `number` | `0` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 倒计时更新时触发 | `(ctx: CountdownFormatContext) => void` |
| finish | 倒计时结束时触发 | `() => void` |
| start | 开始倒计时时触发 | `() => void` |
| pause | 暂停时触发 | `() => void` |
| resume | 恢复时触发 | `() => void` |
| reset | 重置时触发 | `() => void` |
| warning | 进入预警范围时触发 | `(ctx: CountdownFormatContext) => void` |
| status-change | 状态改变时触发 | `(status: CountdownStatus) => void` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| default | 完全自定义渲染 | `{ current, remaining, formatted, status, isWarning, isFinished }` |
| prefix | 前缀占位符 | — |
| suffix | 后缀占位符 | — |
| value | 自定义数字显示部分 | `{ text: string }` |
| separator | 自定义单位分隔符 | — |
| [key]-cell | 自定义具体单元格 (如 `seconds-cell`) | `{ value: string }` |

### Methods (通过 ref 调用)

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| start | 开始计时 | — | `void` |
| pause | 暂停计时 | — | `void` |
| resume | 恢复计时 | — | `void` |
| reset | 重置计时 | — | `void` |
| getRemain | 获取当前剩余毫秒 | — | `number` |
| getStatus | 获取当前计时状态 | — | `CountdownStatus` |

### 类型定义

```typescript
type CountdownStatus = 'pending' | 'running' | 'paused' | 'finished'

interface CountdownFormatContext {
  total: number // 总剩余毫秒
  days: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
  DD: string // 两位数天
  HH: string
  mm: string
  ss: string
  SSS: string
  SS: string // 两位数毫秒前的两位
  S: string // 一位数毫秒的第一位
}
```

### 主题变量

Countdown 组件支持通过覆盖以下 CSS 变量来自定义局部样式。所有颜色变量已与全局主题系统对接，自动支持暗黑模式：

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-countdown-font-size` | 数字字体大小 | `24px` |
| `--yh-countdown-value-color` | 数字颜色 | `var(--yh-text-color-primary)` |
| `--yh-countdown-label-color` | 标签颜色 | `var(--yh-text-color-secondary)` |
| `--yh-countdown-separator-color` | 分隔符颜色 | `var(--yh-text-color-placeholder)` |
| `--yh-countdown-warning-color` | 预警状态颜色 | `var(--yh-color-danger)` |
| `--yh-countdown-finished-color` | 结束状态颜色 | `var(--yh-color-success)` |
| `--yh-countdown-bg` | 组件根背景 | `transparent` |
| `--yh-countdown-block-bg` | 翻牌块背景 | `var(--yh-fill-color-light)` |
| `--yh-countdown-block-shadow` | 翻牌块阴影 | `var(--yh-shadow-sm)` |
| `--yh-countdown-block-radius` | 翻牌块圆角 | `var(--yh-radius-md)` |
| `--yh-countdown-block-padding` | 翻牌块内边距 | `12px 16px` |
| `--yh-countdown-gap` | 组件内部元素间距 | `8px` |
| `--yh-countdown-font-family` | 默认字体族 | `var(--yh-font-family)` |
| `--yh-countdown-monospace-font` | 等宽字体族 (用于防止跳变) | `JetBrains Mono, SF Mono...` |

### 类型导出

| 名称 | 说明 |
| --- | --- |
| `YhCountdownProps` | `YhCountdown` props 类型 |
| `YhCountdownEmits` | `YhCountdown` emits 类型 |
| `YhCountdownExpose` | `YhCountdown` expose 类型 |
| `YhCountdownTimeUnits` | 时间单元结构类型 |
| `YhCountdownFormatContext` | 格式化上下文类型 |
| `YhCountdownValue` | 目标时间值类型 |
| `YhCountdownFormat` | 格式化配置类型 |
| `YhCountdownStatus` | 倒计时状态联合类型 |
| `YhCountdownInstance` | `YhCountdown` 实例类型 |
