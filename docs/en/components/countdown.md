# Countdown

High-performance countdown component supporting target time/duration modes, pause/resume, warning state, flip animation, server time calibration, and more. Uses `requestAnimationFrame` for precise timing.

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S, _St } from '../../.vitepress/theme/utils/demo-utils'

// --- Preview state (for live doc demos) ---
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
  console.log('Countdown finished!')
}

const handleWarning = () => {
  console.log('Entered warning state!')
}

// Warning demo independent state
const warningValue = ref(15000)
const resetWarningDemo = () => {
  warningValue.value = 0
  setTimeout(() => {
    warningValue.value = 15000
  }, 10)
}

const onStart = () => console.log('Started')
const onStatusChange = (status: string) => console.log('Status:', status)

// --- Real-world example state ---
const showModal = ref(false)
const sharedDeadline = ref(Date.now() + 10 * 60 * 1000)
const flashSaleProducts = ref([
  { id: 1, name: 'Smart Watch Pro', deadline: Date.now() + 3600000, price: '$199' },
  { id: 2, name: 'ANC Headphones Max', deadline: Date.now() + 7200000, price: '$289' },
  { id: 3, name: 'Mechanical Keyboard G9', deadline: Date.now() + 1800000, price: '$89' }
])

// --- Code example definitions ---

// 1. Basic usage
const tsBasic = `<${_T}>
  <yh-countdown :value="deadline" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
// Target time: pass a Date object or millisecond timestamp
const deadline = ref(Date.now() + 2 * 60 * 60 * 1000)
</${_S}>`

const jsBasic = toJs(tsBasic)

// 2. Duration mode
const tsDuration = `<${_T}>
  <div style="display: flex; gap: 32px; align-items: center;">
    <!-- Values less than 978307200000 are treated as duration -->
    <yh-countdown :value="60000" format="mm:ss" />
    <yh-countdown :value="300000" format="mm min ss sec" />
  </div>
</${_T}>`

const jsDuration = toJs(tsDuration)

// 3. Custom format
const tsFormat = `<${_T}>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <!-- Days, hours, minutes, seconds -->
    <yh-countdown :value="90061000" format="DD days HH:mm:ss" />
    <!-- Millisecond precision -->
    <yh-countdown :value="61500" format="mm:ss.SSS" :interval="10" :precision="10" />
    <!-- Prefix and suffix -->
    <yh-countdown :value="3600000" title="Remaining: " suffix=" (estimated)" />
  </div>
</${_T}>`

const jsFormat = toJs(tsFormat)

// 4. Flip animation style
const tsFlip = `<${_T}>
  <yh-countdown
    :value="3661000"
    flip-animation
    :labels="{ hours: 'h', minutes: 'm', seconds: 's' }"
  />
</${_T}>`

const jsFlip = toJs(tsFlip)

// 5. Control countdown
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
      <yh-button size="small" @click="countdownRef?.start()">Start</yh-button>
      <yh-button size="small" @click="togglePause">{{ isPaused ? 'Resume' : 'Pause' }}</yh-button>
      <yh-button size="small" @click="resetCountdown">Reset</yh-button>
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

// 6. Warning state
const tsWarning = `<${_T}>
  <yh-countdown
    :value="15000"
    :warning-threshold="10000"
    @warning="handleWarning"
  />
</${_T}>

<${_S} setup lang="ts">
const handleWarning = () => {
  console.log('Less than 10 seconds remaining, entered warning state!')
}
</${_S}>`

const jsWarning = toJs(tsWarning)

// 7. Fully custom
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

// 8. Server time calibration
const tsServerTime = `<${_T}>
  <yh-countdown
    :value="serverDeadline"
    :server-time-offset="serverTimeOffset"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref, onMounted } from 'vue'

const serverDeadline = ref(0)
const serverTimeOffset = ref(0) // server time - local time

onMounted(async () => {
  // Simulated API request
  const res = await fetch('/api/server-time')
  const { deadline, serverTime } = await res.json()
  serverDeadline.value = deadline
  serverTimeOffset.value = serverTime - Date.now()
})
</${_S}>`

const jsServerTime = toJs(tsServerTime)

// Flash sale scenario
const tsFlashSale = `<${_T}>
  <div class="flash-sale">
    <span class="flash-sale__label">Flash Sale</span>
    <yh-countdown
      :value="flashSaleEnd"
      flip-animation
      :warning-threshold="300000"
      :labels="{ hours: 'h', minutes: 'm', seconds: 's' }"
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

// 9. Nuxt usage
const tsNuxt = `<${_T}>
  <yh-countdown :value="deadline" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'
// Auto-imported in Nuxt, no config needed
const deadline = ref(Date.now() + 60000)
</${_S}>`

const jsNuxt = toJs(tsNuxt)

// 10. Dialog sync
const tsShared = `<${_T}>
  <div class="demo-sync">
    <div class="demo-sync__main" style="display: flex; align-items: center; gap: 12px;">
      <span>Page countdown:</span>
      <yh-countdown :value="sharedDeadline" />
      <yh-button type="primary" size="small" @click="showModal = true">Open Dialog</yh-button>
    </div>

    <yh-dialog v-model="showModal" title="Countdown Sync Test" width="400px">
      <div style="text-align: center; padding: 20px 0;">
        <p style="margin-bottom: 16px; color: #64748b;">Dialog countdown is strictly synced with the page:</p>
        <yh-countdown :value="sharedDeadline" value-style="font-size: 32px; color: var(--yh-primary-color);" />
        <p style="margin-top: 16px; color: #94a3b8; font-size: 13px;">Close and reopen the dialog, and the countdown stays perfectly in sync.</p>
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

// 11. Flash sale list
const tsList = `<${_T}>
  <div class="flash-sale-list">
    <div v-for="item in products" :key="item.id" class="flash-sale-item">
      <div class="item-info">
        <span class="item-name">{{ item.name }}</span>
        <span class="item-price">{{ item.price }}</span>
      </div>
      <div class="item-timer">
        <span class="timer-label">Ends in</span>
        <yh-countdown :value="item.deadline" format="HH:mm:ss" />
      </div>
      <yh-button type="danger" size="small" round>Buy Now</yh-button>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const products = ref([
  { id: 1, name: 'Smart Watch Pro', deadline: Date.now() + 3600000, price: '$199' },
  { id: 2, name: 'ANC Headphones Max', deadline: Date.now() + 7200000, price: '$289' },
  { id: 3, name: 'Mechanical Keyboard G9', deadline: Date.now() + 1800000, price: '$89' }
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

## Basic Usage

Set `value` to a target timestamp or Date object. The component automatically calculates remaining time and counts down.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div class="yh-demo-row">
    <yh-countdown :value="deadline" />
  </div>
</DemoBlock>

## Duration Mode

When passing milliseconds (less than `978307200000`, i.e., 2001-01-01), it is treated as duration mode.

<DemoBlock title="Duration Mode" :ts-code="tsDuration" :js-code="jsDuration">
  <div style="display: flex; gap: 32px; align-items: center;">
    <yh-countdown :value="60000" format="mm:ss" />
    <yh-countdown :value="300000" format="mm min ss sec" />
  </div>
</DemoBlock>

## Custom Format & Text

Customize the display format via the `format` prop. Supports `DD`, `HH`, `mm`, `ss`, `SSS` placeholders. Also supports `title` and `suffix`.

<DemoBlock title="Custom Format" :ts-code="tsFormat" :js-code="jsFormat">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-countdown :value="90061000" format="DD days HH:mm:ss" />
    <yh-countdown :value="61500" format="mm:ss.SSS" :interval="10" :precision="10" />
    <yh-countdown :value="3600000" title="Remaining: " suffix=" (estimated)" />
  </div>
</DemoBlock>

## Flip Animation

Set `flip-animation` to enable flip-card style. Combine with `labels` to add labels for each time unit.

<DemoBlock title="Flip Animation" :ts-code="tsFlip" :js-code="jsFlip">
  <yh-countdown
    :value="3661000"
    flip-animation
    :labels="{ hours: 'h', minutes: 'm', seconds: 's' }"
  />
</DemoBlock>

## Control Countdown

Get the component instance via `ref` to manually control the countdown lifecycle.

<DemoBlock title="Control Countdown" :ts-code="tsControl" :js-code="jsControl">
  <div>
    <yh-countdown
      ref="countdownRef"
      :value="60000"
      :auto-start="false"
      @start="onStart"
      @status-change="onStatusChange"
    />
    <div style="margin-top: 12px; display: flex; gap: 8px;">
      <yh-button size="small" @click="countdownRef?.start()">Start</yh-button>
      <yh-button size="small" @click="togglePause">{{ isPaused ? 'Resume' : 'Pause' }}</yh-button>
      <yh-button size="small" @click="resetCountdown">Reset</yh-button>
    </div>
  </div>
</DemoBlock>

## Warning State

Set a warning threshold via `warning-threshold`. When the countdown enters this range, `is-warning` class is added for style customization.

<DemoBlock title="Warning State" :ts-code="tsWarning" :js-code="jsWarning">
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <yh-countdown
      :value="warningValue"
      :warning-threshold="10000"
      @warning="handleWarning"
    />
    <div>
      <yh-button size="small" @click="resetWarningDemo">Reset Warning Demo</yh-button>
    </div>
  </div>
</DemoBlock>

## Fully Custom

Use the default slot to fully take over rendering. The slot scope exposes the complete `current` format object and state flags.

<DemoBlock title="Fully Custom" :ts-code="tsCustom" :js-code="jsCustom">
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

## Scenario: Flash Sale

Combines flip animation, labels, and warning state to create an urgent e-commerce countdown.

<DemoBlock title="Flash Sale" :ts-code="tsFlashSale" :js-code="jsFlashSale">
  <div style="display: flex; align-items: center; gap: 12px; padding: 16px 24px; background: linear-gradient(135deg, #ff6b6b 0%, #ee5a5a 100%); border-radius: 12px;">
    <span style="color: white; font-weight: bold; font-size: 16px;">Flash Sale</span>
    <yh-countdown
      :value="flashSaleEnd"
      flip-animation
      :warning-threshold="300000"
      :labels="{ hours: 'h', minutes: 'm', seconds: 's' }"
    />
  </div>
</DemoBlock>

## Server Time Calibration

Handles client clock deviations caused by manual adjustments or system delays.

<DemoBlock title="Server Time Calibration" :ts-code="tsServerTime" :js-code="jsServerTime">
  <yh-countdown
    :value="Date.now() + 7200000"
    :server-time-offset="3600000"
  />
</DemoBlock>

## Real-World: Dialog Sync

In complex SPA applications, the same timer task may appear in multiple places (e.g., product detail page and purchase popup). The component ensures through internal time alignment that the time display stays absolutely consistent when dialogs are frequently opened/closed.

<DemoBlock title="Dialog Sync" :ts-code="tsShared" :js-code="jsShared">
  <div style="display: flex; align-items: center; gap: 12px;">
    <span>Page countdown:</span>
    <yh-countdown :value="sharedDeadline" />
    <yh-button type="primary" size="small" @click="showModal = true">Open Dialog</yh-button>
  </div>

  <yh-dialog v-model="showModal" title="Countdown Sync Test" width="400px">
    <div style="text-align: center; padding: 20px 0;">
      <p style="margin-bottom: 16px; color: #64748b;">Dialog countdown is strictly synced with the page:</p>
      <yh-countdown :value="sharedDeadline" value-style="font-size: 32px; color: var(--yh-primary-color);" />
      <p style="margin-top: 16px; color: #94a3b8; font-size: 13px;">Close and reopen the dialog, and the countdown stays perfectly in sync.</p>
    </div>
  </yh-dialog>
</DemoBlock>

## Real-World: Flash Sale List

High-performance `requestAnimationFrame` scheduling keeps each countdown independent while maintaining smooth UI updates, even in waterfall lists and high-frequency refresh scenarios.

<DemoBlock title="Flash Sale List" :ts-code="tsList" :js-code="jsList">
  <div style="display: flex; flex-direction: column; gap: 12px; max-width: 600px;">
    <div v-for="item in flashSaleProducts" :key="item.id" style="display: flex; align-items: center; justify-content: space-between; padding: 16px; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
      <div style="display: flex; flex-direction: column;">
        <span style="font-weight: bold; color: #1e293b;">{{ item.name }}</span>
        <span style="color: #ef4444; font-size: 14px;">{{ item.price }}</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center;">
        <span style="font-size: 12px; color: #64748b; margin-bottom: 4px;">Ends in</span>
        <yh-countdown :value="item.deadline" format="HH:mm:ss" />
      </div>
      <yh-button type="danger" size="small" round>Buy Now</yh-button>
    </div>
  </div>
</DemoBlock>

## Use in Nuxt

The Countdown component fully supports SSR rendering in Nuxt 3/4. Components are auto-imported in Nuxt projects.

<DemoBlock title="Use in Nuxt" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="max-width: 240px;">
    <yh-countdown :value="deadline" />
  </div>
</DemoBlock>

**SSR Notes**:

- The initial countdown structure and formatted text can be rendered during SSR.
- Remaining time is calculated from the current server render time before hydration.
- The internal animation frame loop starts only on the client after mount.
- Use `server-time-offset` when you need stricter server-client time alignment across devices.

::: tip SSR Performance
Countdown uses `requestAnimationFrame` internally for timing, which only executes on the client and consumes zero server resources. During initial render, remaining values are pre-calculated based on the current server time, ensuring consistent full-pipeline experience.
:::

## API

### Props

| Prop | Description | Type | Default |
| --- | --- | --- | --- |
| value | Target time or duration. | `YhCountdownValue` | Required |
| format | Format template or custom formatter. | `YhCountdownFormat` | `'HH:mm:ss'` |
| auto-start | Whether the countdown starts immediately. | `boolean` | `true` |
| interval | Refresh interval in milliseconds. | `number` | `1000` |
| precision | Timing precision in milliseconds. | `1000 \| 100 \| 10` | `1000` |
| title | Prefix text. | `string` | `''` |
| suffix | Suffix text. | `string` | `''` |
| use-monospace-font | Whether a monospace font is used to avoid digit jitter. | `boolean` | `true` |
| flip-animation | Whether flip-card animation is enabled. | `boolean` | `false` |
| value-style | Inline style applied to the value area. | `CSSProperties \| string` | `undefined` |
| separator | Separator between time units. | `string` | `':'` |
| show-days | Whether to show days. `'auto'` shows days only when needed. | `boolean \| 'auto'` | `'auto'` |
| show-hours | Whether to show hours. | `boolean` | `true` |
| show-minutes | Whether to show minutes. | `boolean` | `true` |
| show-seconds | Whether to show seconds. | `boolean` | `true` |
| show-milliseconds | Whether to show milliseconds. | `boolean` | `false` |
| labels | Label mapping for time units. | `Partial<Record<keyof YhCountdownTimeUnits, string>>` | `undefined` |
| keep-alive-on-finish | Whether the zero state stays visible after finish. | `boolean` | `true` |
| warning-threshold | Remaining time threshold that triggers warning mode, in milliseconds. | `number` | `undefined` |
| timezone-offset | Timezone offset used for time alignment, in minutes. | `number` | `undefined` |
| server-time-offset | Difference between server time and local time, in milliseconds. | `number` | `0` |
| theme-overrides | Component-level theme overrides. | `ComponentThemeVars` | `undefined` |

### Events

| Event Name | Description | Parameters |
| --- | --- | --- |
| change | Triggered on countdown update | `(ctx: YhCountdownFormatContext) => void` |
| finish | Triggered when countdown ends | `() => void` |
| start | Triggered when countdown starts | `() => void` |
| pause | Triggered on pause | `() => void` |
| resume | Triggered on resume | `() => void` |
| reset | Triggered on reset | `() => void` |
| warning | Triggered when entering warning range | `(ctx: YhCountdownFormatContext) => void` |
| status-change | Triggered on status change | `(status: YhCountdownStatus) => void` |

### Slots

| Slot Name | Description | Parameters |
| --- | --- | --- |
| default | Fully custom rendering | `{ current, remaining, formatted, status, isWarning, isFinished }` |
| prefix | Prefix content | - |
| suffix | Suffix content | - |
| value | Custom digit display | `{ text: string }` |
| separator | Custom unit separator | - |
| [key]-cell | Custom specific cell (e.g., `seconds-cell`) | `{ value: string }` |

### Expose

| Method | Description | Parameters | Return |
| --- | --- | --- | --- |
| start | Start timing | - | `void` |
| pause | Pause timing | - | `void` |
| resume | Resume timing | - | `void` |
| reset | Reset timing | - | `void` |
| getRemain | Get current remaining milliseconds | - | `number` |
| getStatus | Get current countdown status | - | `YhCountdownStatus` |

### Type Definitions

```typescript
type YhCountdownStatus = 'pending' | 'running' | 'paused' | 'finished'

interface YhCountdownFormatContext {
  total: number // Total remaining ms
  days: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
  DD: string // Two-digit days
  HH: string
  mm: string
  ss: string
  SSS: string
  SS: string // First two digits of ms
  S: string // First digit of ms
}
```

### Theme Variables

The Countdown component supports customizing styles by overriding the following CSS variables. All color variables integrate with the global theme system, automatically supporting dark mode:

| Variable | Description | Default |
| --- | --- | --- |
| `--yh-countdown-font-size` | Digit font size | `24px` |
| `--yh-countdown-value-color` | Digit color | `var(--yh-text-color-primary)` |
| `--yh-countdown-label-color` | Label color | `var(--yh-text-color-secondary)` |
| `--yh-countdown-separator-color` | Separator color | `var(--yh-text-color-placeholder)` |
| `--yh-countdown-warning-color` | Warning state color | `var(--yh-color-danger)` |
| `--yh-countdown-finished-color` | Finished state color | `var(--yh-color-success)` |
| `--yh-countdown-bg` | Component root background | `transparent` |
| `--yh-countdown-block-bg` | Flip block background | `var(--yh-fill-color-light)` |
| `--yh-countdown-block-shadow` | Flip block shadow | `var(--yh-shadow-sm)` |
| `--yh-countdown-block-radius` | Flip block border radius | `var(--yh-radius-md)` |
| `--yh-countdown-block-padding` | Flip block padding | `12px 16px` |
| `--yh-countdown-gap` | Internal element gap | `8px` |
| `--yh-countdown-font-family` | Default font family | `var(--yh-font-family)` |
| `--yh-countdown-monospace-font` | Monospace font (anti-jitter) | `JetBrains Mono, SF Mono...` |

### Type Exports

| Name | Description |
| --- | --- |
| `YhCountdownProps` | Props type for `YhCountdown` |
| `YhCountdownEmits` | Emits type for `YhCountdown` |
| `YhCountdownExpose` | Expose type for `YhCountdown` |
| `YhCountdownTimeUnits` | Time units structure type |
| `YhCountdownFormatContext` | Formatting context type |
| `YhCountdownValue` | Countdown target value type |
| `YhCountdownFormat` | Format config type |
| `YhCountdownStatus` | Countdown status union |
| `YhCountdownInstance` | Public instance type for `YhCountdown` |
