# TimePicker 时间选择器

<script setup lang="ts">
import { ref } from 'vue'

// 基础用法
const timeBasic = ref('')

// 禁用状态
const timeDisabled = ref('14:30:00')

// 可清空
const timeClearable = ref('09:15:30')

// 不同尺寸
const timeLarge = ref('')
const timeDefault = ref('')
const timeSmall = ref('')

// 12 小时制
const time12Hours = ref('')

// 隐藏秒
const timeNoSeconds = ref('')

// 箭头控制
const timeArrow = ref('')

// 步长设置
const timeStep = ref('')

// 禁用时间
const timeDisabledTime = ref('')

// 时间范围
const timeRangeStart = ref('')
const timeRangeEnd = ref('')

// 范围选择
const timeRange = ref<[string, string] | null>(null)
const timeRangeOrder = ref<[string, string] | null>(['10:00:00', '08:00:00'])

// 完整功能
const timeFull = ref('')

// Nuxt 示例
const nuxtTime = ref('')

// 禁用时间配置
const disabledTimeConfig = {
  disabledHours: () => [0, 1, 2, 3, 4, 5, 22, 23],
  disabledMinutes: (hour: number) => hour === 12 ? [0, 15, 30, 45] : [],
  disabledSeconds: () => []
}

// 代码示例
const tsBasic = `<template>
  <div style="max-width: 220px;">
    <yh-time-picker
      v-model="time"
      placeholder="选择时间"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      当前值: {{ time || '未选择' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const time = ref('')
<\/script>`

const jsBasic = tsBasic.replace('lang="ts"', '')

const tsDisabled = `<template>
  <div style="max-width: 220px;">
    <yh-time-picker v-model="time" disabled placeholder="禁用状态" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const time = ref('14:30:00')
<\/script>`

const jsDisabled = tsDisabled.replace('lang="ts"', '')

const tsClearable = `<template>
  <div style="max-width: 220px;">
    <yh-time-picker v-model="time" clearable placeholder="可清空" />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      当前值: {{ time || '未选择' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const time = ref('09:15:30')
<\/script>`

const jsClearable = tsClearable.replace('lang="ts"', '')

const tsSizes = `<template>
  <div style="max-width: 220px; display: flex; flex-direction: column; gap: 16px;">
    <yh-time-picker v-model="large" size="large" placeholder="大型" />
    <yh-time-picker v-model="defaultVal" placeholder="默认" />
    <yh-time-picker v-model="small" size="small" placeholder="小型" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const large = ref('')
const defaultVal = ref('')
const small = ref('')
<\/script>`

const jsSizes = tsSizes.replace('lang="ts"', '')

const ts12Hours = `<template>
  <div style="max-width: 220px;">
    <yh-time-picker
      v-model="time"
      use12-hours
      format="hh:mm:ss A"
      placeholder="12 小时制"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      当前值: {{ time || '未选择' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const time = ref('')
<\/script>`

const js12Hours = ts12Hours.replace('lang="ts"', '')

const tsNoSeconds = `<template>
  <div style="max-width: 180px;">
    <yh-time-picker
      v-model="time"
      :show-seconds="false"
      format="HH:mm"
      placeholder="时:分"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      当前值: {{ time || '未选择' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const time = ref('')
<\/script>`

const jsNoSeconds = tsNoSeconds.replace('lang="ts"', '')

const tsArrow = `<template>
  <div style="max-width: 200px;">
    <yh-time-picker
      v-model="time"
      arrow-control
      placeholder="箭头控制"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const time = ref('')
<\/script>`

const jsArrow = tsArrow.replace('lang="ts"', '')

const tsStep = `<template>
  <div style="max-width: 220px;">
    <yh-time-picker
      v-model="time"
      :hour-step="2"
      :minute-step="15"
      :second-step="30"
      placeholder="自定义步长"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      小时步长: 2, 分钟步长: 15, 秒步长: 30
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const time = ref('')
<\/script>`

const jsStep = tsStep.replace('lang="ts"', '')

const tsDisabledTime = `<template>
  <div style="max-width: 220px;">
    <yh-time-picker
      v-model="time"
      :disabled-time="disabledTimeConfig"
      placeholder="限制可选时间"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      禁用: 0-5点, 22-23点, 12点的0/15/30/45分
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const time = ref('')

const disabledTimeConfig = {
  disabledHours: () => [0, 1, 2, 3, 4, 5, 22, 23],
  disabledMinutes: (hour: number) => hour === 12 ? [0, 15, 30, 45] : [],
  disabledSeconds: () => []
}
<\/script>`

const jsDisabledTime = tsDisabledTime.replace('lang="ts"', '').replace(': number', '')

const tsRange = `<template>
  <div style="max-width: 380px;">
    <yh-time-picker
      v-model="timeRange"
      is-range
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      range-separator="至"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      当前值: {{ timeRange ? timeRange.join(' - ') : '未选择' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const timeRange = ref<[string, string] | null>(null)
<\/script>`

const jsRange = tsRange.replace('lang="ts"', '').replace('<[string, string] | null>', '')

const tsRangeOrder = `<template>
  <div style="max-width: 380px;">
    <yh-time-picker
      v-model="timeRange"
      is-range
      order-on-confirm
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      range-separator="至"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      当前值: {{ timeRange ? timeRange.join(' - ') : '未选择' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const timeRange = ref<[string, string] | null>(['10:00:00', '08:00:00'])
<\/script>`

const jsRangeOrder = tsRangeOrder.replace('lang="ts"', '').replace('<[string, string] | null>', '')

const tsFull = `<template>
  <div style="max-width: 220px;">
    <yh-time-picker
      v-model="time"
      clearable
      :show-seconds="true"
      :show-footer="true"
      :show-now="true"
      now-text="现在"
      confirm-text="确认"
      cancel-text="取消"
      placeholder="完整功能演示"
      @change="handleChange"
      @confirm="handleConfirm"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const time = ref('')

const handleChange = (value: string) => {
  console.log('时间变更:', value)
}

const handleConfirm = (value: string) => {
  console.log('确认时间:', value)
}
<\/script>`

const jsFull = tsFull.replace('lang="ts"', '').replace(': string', '')

const tsNuxt = `<template>
  <div style="max-width: 220px;">
    <!-- 时间选择器，Nuxt 自动导入 -->
    <yh-time-picker
      v-model="time"
      placeholder="Nuxt 自动导入"
    />
  </div>
</template>

<script setup lang="ts">
// 无需手动导入 YhTimePicker，Nuxt 模块自动注册
const time = ref('')
<\/script>`

const jsNuxt = tsNuxt.replace('lang="ts"', '')
</script>

用于选择或输入任意时间点的时间选择器，支持时/分/秒滚轮选择、12/24 小时制、禁用时间等高级功能。

::: tip TimePicker vs TimeSelect
- **TimePicker**: 通过滚轮面板自由选择任意时间点（本组件）
- **TimeSelect**: 从预设的固定时间列表中选择，适用于预约场景

根据业务需求选择合适的组件。
:::

## 基础用法

点击输入框打开时间选择面板，通过滚动或点击选择时/分/秒。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="max-width: 220px;">
    <yh-time-picker
      v-model="timeBasic"
      placeholder="选择时间"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      当前值: {{ timeBasic || '未选择' }}
    </p>
  </div>
</DemoBlock>

## 禁用状态

使用 `disabled` 属性禁用整个时间选择器。

<DemoBlock title="禁用状态" :ts-code="tsDisabled" :js-code="jsDisabled">
  <div style="max-width: 220px;">
    <yh-time-picker v-model="timeDisabled" disabled placeholder="禁用状态" />
  </div>
</DemoBlock>

## 可清空

设置 `clearable` 属性可以清空已选时间。

<DemoBlock title="可清空" :ts-code="tsClearable" :js-code="jsClearable">
  <div style="max-width: 220px;">
    <yh-time-picker v-model="timeClearable" clearable placeholder="可清空" />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      当前值: {{ timeClearable || '未选择' }}
    </p>
  </div>
</DemoBlock>

## 不同尺寸

使用 `size` 属性改变时间选择器大小，可选值为 `large`、`default`、`small`。

<DemoBlock title="不同尺寸" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="max-width: 220px; display: flex; flex-direction: column; gap: 16px;">
    <yh-time-picker v-model="timeLarge" size="large" placeholder="大型" />
    <yh-time-picker v-model="timeDefault" placeholder="默认" />
    <yh-time-picker v-model="timeSmall" size="small" placeholder="小型" />
  </div>
</DemoBlock>

## 12 小时制

设置 `use12-hours` 属性启用 12 小时制（AM/PM）。

<DemoBlock title="12 小时制" :ts-code="ts12Hours" :js-code="js12Hours">
  <div style="max-width: 220px;">
    <yh-time-picker
      v-model="time12Hours"
      use12-hours
      format="hh:mm:ss A"
      placeholder="12 小时制"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      当前值: {{ time12Hours || '未选择' }}
    </p>
  </div>
</DemoBlock>

## 隐藏秒选择器

设置 `show-seconds` 为 `false` 可以隐藏秒选择列。

<DemoBlock title="隐藏秒选择器" :ts-code="tsNoSeconds" :js-code="jsNoSeconds">
  <div style="max-width: 180px;">
    <yh-time-picker
      v-model="timeNoSeconds"
      :show-seconds="false"
      format="HH:mm"
      placeholder="时:分"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      当前值: {{ timeNoSeconds || '未选择' }}
    </p>
  </div>
</DemoBlock>

## 箭头控制模式

设置 `arrow-control` 属性使用上下箭头控制时间，而非滚动列表。

<DemoBlock title="箭头控制模式" :ts-code="tsArrow" :js-code="jsArrow">
  <div style="max-width: 200px;">
    <yh-time-picker
      v-model="timeArrow"
      arrow-control
      placeholder="箭头控制"
    />
  </div>
</DemoBlock>

## 步长设置

通过 `hour-step`、`minute-step`、`second-step` 属性设置时/分/秒的选择步长。

<DemoBlock title="步长设置" :ts-code="tsStep" :js-code="jsStep">
  <div style="max-width: 220px;">
    <yh-time-picker
      v-model="timeStep"
      :hour-step="2"
      :minute-step="15"
      :second-step="30"
      placeholder="自定义步长"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      小时步长: 2, 分钟步长: 15, 秒步长: 30
    </p>
  </div>
</DemoBlock>

## 禁用时间

通过 `disabled-time` 属性配置禁用的时间，支持分别禁用小时、分钟、秒。

<DemoBlock title="禁用时间" :ts-code="tsDisabledTime" :js-code="jsDisabledTime">
  <div style="max-width: 220px;">
    <yh-time-picker
      v-model="timeDisabledTime"
      :disabled-time="disabledTimeConfig"
      placeholder="限制可选时间"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      禁用: 0-5点, 22-23点, 12点的0/15/30/45分
    </p>
  </div>
</DemoBlock>

## 时间范围选择

设置 `is-range` 属性启用时间范围选择模式。

<DemoBlock title="时间范围选择" :ts-code="tsRange" :js-code="jsRange">
  <div style="max-width: 380px;">
    <yh-time-picker
      v-model="timeRange"
      is-range
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      range-separator="至"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      当前值: {{ timeRange ? timeRange.join(' - ') : '未选择' }}
    </p>
  </div>
</DemoBlock>

## 时间范围自动排序

通过设置 `order-on-confirm` 属性为 `true`，系统将不再启用严格的禁用约束（即可以选择任意时间），而是在点击“确定”时如果发现时间顺序不对，自动进行交换处理。

<DemoBlock title="时间范围自动排序" :ts-code="tsRangeOrder" :js-code="jsRangeOrder">
  <div style="max-width: 380px;">
    <yh-time-picker
      v-model="timeRangeOrder"
      is-range
      order-on-confirm
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      range-separator="至"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      当前值: {{ timeRangeOrder ? timeRangeOrder.join(' - ') : '未选择' }}
    </p>
  </div>
</DemoBlock>

## 完整功能演示

展示时间选择器的所有常用功能：可清空、底部操作栏、"此刻"按钮等。

<DemoBlock title="完整功能演示" :ts-code="tsFull" :js-code="jsFull">
  <div style="max-width: 220px;">
    <yh-time-picker
      v-model="timeFull"
      clearable
      :show-seconds="true"
      :show-footer="true"
      :show-now="true"
      now-text="现在"
      confirm-text="确认"
      cancel-text="取消"
      placeholder="完整功能演示"
    />
  </div>
</DemoBlock>

## 在 Nuxt 中使用

TimePicker 组件完全支持 Nuxt 3/4 的 SSR 渲染。在 Nuxt 项目中使用时，组件会自动导入。

<DemoBlock title="Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="max-width: 220px;">
    <yh-time-picker
      v-model="nuxtTime"
      placeholder="Nuxt 自动导入"
    />
  </div>
</DemoBlock>

**SSR 注意事项**：

- ✅ 组件结构和样式完全支持 SSR
- ✅ 初始值在服务端正确渲染
- ✅ 面板通过 Teleport 渲染，兼容 SSR 首屏
- ⚠️ 滚轮滚动定位在客户端激活后生效
- ⚠️ DOM 操作（如 focus）仅在客户端执行

::: tip SSR 最佳实践
TimePicker 的核心逻辑已针对 SSR 进行优化，所有可能导致 Hydration Mismatch 的操作（如时间戳生成、DOM 操作）都被安全地延迟到客户端执行。
:::

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 绑定值 | `string \| Date \| number \| [string, string]` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| editable | 是否可编辑 | `boolean` | `true` |
| clearable | 是否可清空 | `boolean` | `true` |
| size | 输入框尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| placeholder | 占位文本 | `string` | `'选择时间'` |
| start-placeholder | 范围选择时开始的占位文本 | `string` | `'开始时间'` |
| end-placeholder | 范围选择时结束的占位文本 | `string` | `'结束时间'` |
| is-range | 是否为范围选择 | `boolean` | `false` |
| format | 时间格式 | `string` | `'HH:mm:ss'` |
| value-format | 绑定值的格式 | `string` | `'HH:mm:ss'` |
| use12-hours | 是否使用 12 小时制 | `boolean` | `false` |
| show-seconds | 是否显示秒选择器 | `boolean` | `true` |
| hour-step | 小时步长 | `number` | `1` |
| minute-step | 分钟步长 | `number` | `1` |
| second-step | 秒步长 | `number` | `1` |
| disabled-time | 禁用的时间配置 | `DisabledTimeConfig` | — |
| popper-class | 下拉框类名 | `string` | — |
| teleported | 是否将下拉框插入到 body | `boolean` | `true` |
| range-separator | 范围分隔符 | `string` | `'-'` |
| arrow-control | 是否使用箭头控制 | `boolean` | `false` |
| order-on-confirm | 范围选择时，如果结束时间早于开始时间，是否自动交换 | `boolean` | `false` |
| show-footer | 是否显示底部操作栏 | `boolean` | `true` |
| show-now | 是否显示"此刻"按钮 | `boolean` | `true` |
| confirm-text | 确认按钮文本 | `string` | `'确定'` |
| cancel-text | 取消按钮文本 | `string` | `'取消'` |
| now-text | 此刻按钮文本 | `string` | `'此刻'` |
| validate-event | 是否触发表单验证 | `boolean` | `true` |

### DisabledTimeConfig

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
| disabledHours | 禁用的小时 | `() => number[]` |
| disabledMinutes | 禁用的分钟（基于选中的小时） | `(hour: number) => number[]` |
| disabledSeconds | 禁用的秒（基于选中的小时和分钟） | `(hour: number, minute: number) => number[]` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 时间变化时触发 | `(value: TimeValue \| TimeRangeValue) => void` |
| focus | 获取焦点时触发 | `(event: FocusEvent) => void` |
| blur | 失去焦点时触发 | `(event: FocusEvent) => void` |
| clear | 清空时触发 | `() => void` |
| visible-change | 面板显示/隐藏时触发 | `(visible: boolean) => void` |
| confirm | 点击确认按钮时触发 | `(value: TimeValue \| TimeRangeValue) => void` |
| cancel | 点击取消按钮时触发 | `() => void` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| prefix | 自定义前缀图标 |
| suffix | 自定义后缀图标 |
| range-separator | 自定义范围分隔符 |

### Expose

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| focus | 使选择器获取焦点 | `() => void` |
| blur | 使选择器失去焦点 | `() => void` |
| open | 打开选择面板 | `() => void` |
| close | 关闭选择面板 | `() => void` |

## 主题变量

所有颜色变量已与全局主题系统对接，自动支持暗黑模式：

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-time-picker-width` | 选择器宽度 | `220px` |
| `--yh-time-picker-range-width` | 范围选择器宽度 | `360px` |
| `--yh-time-picker-active-color` | 高亮文字颜色 | `var(--yh-color-primary)` |
| `--yh-time-picker-active-bg` | 高亮背景颜色 | `var(--yh-color-primary-light-9)` |
| `--yh-time-picker-hover-bg` | 悬停背景颜色 | `var(--yh-fill-color-light)` |
| `--yh-time-picker-panel-bg` | 面板背景色 | `var(--yh-bg-color-overlay)` |
| `--yh-time-picker-panel-shadow` | 面板阴影 | `var(--yh-shadow-lg)` |
| `--yh-time-picker-text-color` | 文字颜色 | `var(--yh-text-color-primary)` |
| `--yh-time-picker-text-secondary` | 次要文字颜色 | `var(--yh-text-color-secondary)` |
| `--yh-time-picker-border` | 边框颜色 | `var(--yh-border-color-light)` |
| `--yh-time-picker-item-height` | 选项高度 | `32px` |
| `--yh-time-picker-spinner-height` | 滚轮高度 | `192px` |
| `--yh-time-picker-border-radius` | 圆角大小 | `var(--yh-border-radius-base)` |
