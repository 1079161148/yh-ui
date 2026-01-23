# TimeSelect 时间选择

<script setup lang="ts">
import { ref } from 'vue'

// 基础用法
const timeBasic = ref('')

// 禁用状态
const timeDisabled = ref('09:00')

// 可清空
const timeClearable = ref('10:30')

// 时间范围选择
const startTime = ref('')
const endTime = ref('')

// 固定时间范围
const timeRange = ref('')

// 禁用时间段
const timeDisabledHours = ref('')

// minTime 和 maxTime
const timeMinMax = ref('')

// 不同尺寸
const timeLarge = ref('')
const timeDefault = ref('')
const timeSmall = ref('')
const timeFormat = ref('')

// 自定义时间选项
const timeCustom = ref('')
const customOptions = [
  { value: '08:00', label: '🌅 早上 8:00' },
  { value: '09:00', label: '☀️ 上午 9:00' },
  { value: '12:00', label: '🌞 中午 12:00' },
  { value: '14:00', label: '🌤️ 下午 2:00' },
  { value: '18:00', label: '🌆 傍晚 6:00' },
  { value: '20:00', label: '🌙 晚上 8:00' }
]

// 完整功能演示
const timeFull = ref('')

// Nuxt 使用示例
const nuxtTime = ref('')

// Nuxt 使用示例
const tsNuxt = `<template>
  <div style="max-width: 240px;">
    <!-- 时间选择，自动导入 -->
    <yh-time-select 
      v-model="nuxtTime" 
      start="08:30" 
      step="00:15" 
      end="18:30" 
      placeholder="Nuxt 自动导入"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 无需手动导入 YhTimeSelect
const nuxtTime = ref('09:00')
<\/script>`.replace(/\\/g, '')

const jsNuxt = tsNuxt.replace('lang="ts"', '')

// 代码示例
// 代码示例
const tsBasic = `<` + `template>
  <div style="max-width: 240px;">
    <yh-time-select 
      v-model="value" 
      start="00:00" 
      end="23:30" 
      step="00:30" 
      placeholder="选择时间" 
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">当前值: {{ value || '未选择' }}</p>
  </div>
</` + `template>

<` + `script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</` + `script>`

const jsBasic = `<` + `template>
  <div style="max-width: 240px;">
    <yh-time-select 
      v-model="value" 
      start="00:00" 
      end="23:30" 
      step="00:30" 
      placeholder="选择时间" 
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">当前值: {{ value || '未选择' }}</p>
  </div>
</` + `template>

<` + `script setup>
import { ref } from 'vue'

const value = ref('')
</` + `script>`

const tsDisabled = `<` + `template>
  <div style="max-width: 240px;">
    <yh-time-select v-model="value" disabled placeholder="禁用状态" />
  </div>
</` + `template>

<` + `script setup lang="ts">
import { ref } from 'vue'

const value = ref('09:00')
</` + `script>`

const jsDisabled = `<` + `template>
  <div style="max-width: 240px;">
    <yh-time-select v-model="value" disabled placeholder="禁用状态" />
  </div>
</` + `template>

<` + `script setup>
import { ref } from 'vue'

const value = ref('09:00')
</` + `script>`

const tsClearable = `<` + `template>
  <div style="max-width: 240px;">
    <yh-time-select v-model="value" clearable placeholder="可清空" />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">当前值: {{ value || '未选择' }}</p>
  </div>
</` + `template>

<` + `script setup lang="ts">
import { ref } from 'vue'

const value = ref('10:30')
</` + `script>`

const jsClearable = `<` + `template>
  <div style="max-width: 240px;">
    <yh-time-select v-model="value" clearable placeholder="可清空" />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">当前值: {{ value || '未选择' }}</p>
  </div>
</` + `template>

<` + `script setup>
import { ref } from 'vue'

const value = ref('10:30')
</` + `script>`

const tsTimeRange = `<` + `template>
  <div style="display: flex; align-items: center; gap: 16px; max-width: 500px;">
    <yh-time-select
      v-model="startTime"
      :max-time="endTime"
      placeholder="开始时间"
      start="08:00"
      end="18:00"
      step="00:30"
      style="flex: 1;"
    />
    <span style="color: #909399;">至</span>
    <yh-time-select
      v-model="endTime"
      :min-time="startTime"
      placeholder="结束时间"
      start="08:00"
      end="18:00"
      step="00:30"
      style="flex: 1;"
    />
  </div>
  <p style="margin-top: 8px; color: #909399; font-size: 12px;">
    选择的时间段: {{ startTime || '--' }} 至 {{ endTime || '--' }}
  </p>
</` + `template>

<` + `script setup lang="ts">
import { ref } from 'vue'

const startTime = ref('')
const endTime = ref('')
</` + `script>`

const jsTimeRange = `<` + `template>
  <div style="display: flex; align-items: center; gap: 16px; max-width: 500px;">
    <yh-time-select
      v-model="startTime"
      :max-time="endTime"
      placeholder="开始时间"
      start="08:00"
      end="18:00"
      step="00:30"
      style="flex: 1;"
    />
    <span style="color: #909399;">至</span>
    <yh-time-select
      v-model="endTime"
      :min-time="startTime"
      placeholder="结束时间"
      start="08:00"
      end="18:00"
      step="00:30"
      style="flex: 1;"
    />
  </div>
  <p style="margin-top: 8px; color: #909399; font-size: 12px;">
    选择的时间段: {{ startTime || '--' }} 至 {{ endTime || '--' }}
  </p>
</` + `template>

<` + `script setup>
import { ref } from 'vue'

const startTime = ref('')
const endTime = ref('')
</` + `script>`

const tsFixedRange = `<` + `template>
  <div style="max-width: 240px;">
    <yh-time-select
      v-model="value"
      start="09:00"
      end="21:00"
      step="00:30"
      placeholder="选择诊疗时间"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">诊疗时间: 09:00 - 21:00，每 30 分钟一个时段</p>
  </div>
</` + `template>

<` + `script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</` + `script>`

const jsFixedRange = `<` + `template>
  <div style="max-width: 240px;">
    <yh-time-select
      v-model="value"
      start="09:00"
      end="21:00"
      step="00:30"
      placeholder="选择诊疗时间"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">诊疗时间: 09:00 - 21:00，每 30 分钟一个时段</p>
  </div>
</` + `template>

<` + `script setup>
import { ref } from 'vue'

const value = ref('')
</` + `script>`

const tsDisabledHours = `<` + `template>
  <div style="max-width: 280px;">
    <yh-time-select
      v-model="value"
      start="08:00"
      end="20:00"
      step="00:30"
      :disabled-hours="[['12:00', '13:30'], ['18:00', '19:00']]"
      placeholder="午休和晚餐时间不可选"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      禁用时段: 12:00-13:30 (午休), 18:00-19:00 (晚餐)
    </p>
  </div>
</` + `template>

<` + `script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</` + `script>`

const jsDisabledHours = `<` + `template>
  <div style="max-width: 280px;">
    <yh-time-select
      v-model="value"
      start="08:00"
      end="20:00"
      step="00:30"
      :disabled-hours="[['12:00', '13:30'], ['18:00', '19:00']]"
      placeholder="午休和晚餐时间不可选"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      禁用时段: 12:00-13:30 (午休), 18:00-19:00 (晚餐)
    </p>
  </div>
</` + `template>

<` + `script setup>
import { ref } from 'vue'

const value = ref('')
</` + `script>`

const tsMinMax = `<` + `template>
  <div style="max-width: 280px;">
    <yh-time-select
      v-model="value"
      start="06:00"
      end="22:00"
      step="00:30"
      min-time="09:00"
      max-time="18:00"
      placeholder="工作时间 09:00-18:00"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      可选范围: 09:00 - 18:00
    </p>
  </div>
</` + `template>

<` + `script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</` + `script>`

const jsMinMax = `<` + `template>
  <div style="max-width: 280px;">
    <yh-time-select
      v-model="value"
      start="06:00"
      end="22:00"
      step="00:30"
      min-time="09:00"
      max-time="18:00"
      placeholder="工作时间 09:00-18:00"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      可选范围: 09:00 - 18:00
    </p>
  </div>
</` + `template>

<` + `script setup>
import { ref } from 'vue'

const value = ref('')
</` + `script>`

const tsSizes = `<` + `template>
  <div style="max-width: 240px; display: flex; flex-direction: column; gap: 16px;">
    <yh-time-select v-model="large" size="large" placeholder="大型" />
    <yh-time-select v-model="defaultVal" placeholder="默认" />
    <yh-time-select v-model="small" size="small" placeholder="小型" />
  </div>
</` + `template>

<` + `script setup lang="ts">
import { ref } from 'vue'

const large = ref('')
const defaultVal = ref('')
const small = ref('')
</` + `script>`

const jsSizes = `<` + `template>
  <div style="max-width: 240px; display: flex; flex-direction: column; gap: 16px;">
    <yh-time-select v-model="large" size="large" placeholder="大型" />
    <yh-time-select v-model="defaultVal" placeholder="默认" />
    <yh-time-select v-model="small" size="small" placeholder="小型" />
  </div>
</` + `template>

<` + `script setup>
import { ref } from 'vue'

const large = ref('')
const defaultVal = ref('')
const small = ref('')
</` + `script>`

const tsFormat = `<` + `template>
  <div style="max-width: 240px;">
    <yh-time-select
      v-model="value"
      start="08:30"
      step="00:15"
      end="18:30"
      format="HH时mm分"
      placeholder="自定义格式"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">当前值: {{ value || '未选择' }}</p>
  </div>
</` + `template>

<` + `script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</` + `script>`

const jsFormat = `<` + `template>
  <div style="max-width: 240px;">
    <yh-time-select
      v-model="value"
      start="08:30"
      step="00:15"
      end="18:30"
      format="HH时mm分"
      placeholder="自定义格式"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">当前值: {{ value || '未选择' }}</p>
  </div>
</` + `template>

<` + `script setup>
import { ref } from 'vue'

const value = ref('')
</` + `script>`

const tsCustomOptions = `<` + `template>
  <div style="max-width: 240px;">
    <yh-time-select v-model="value" :options="options" placeholder="选择时间段" />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">当前值: {{ value || '未选择' }}</p>
  </div>
</` + `template>

<` + `script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = [
  { value: '08:00', label: '🌅 早上 8:00' },
  { value: '09:00', label: '☀️ 上午 9:00' },
  { value: '12:00', label: '🌞 中午 12:00' },
  { value: '14:00', label: '🌤️ 下午 2:00' },
  { value: '18:00', label: '🌆 傍晚 6:00' },
  { value: '20:00', label: '🌙 晚上 8:00' }
]
</` + `script>`

const jsCustomOptions = `<` + `template>
  <div style="max-width: 240px;">
    <yh-time-select v-model="value" :options="options" placeholder="选择时间段" />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">当前值: {{ value || '未选择' }}</p>
  </div>
</` + `template>

<` + `script setup>
import { ref } from 'vue'

const value = ref('')
const options = [
  { value: '08:00', label: '🌅 早上 8:00' },
  { value: '09:00', label: '☀️ 上午 9:00' },
  { value: '12:00', label: '🌞 中午 12:00' },
  { value: '14:00', label: '🌤️ 下午 2:00' },
  { value: '18:00', label: '🌆 傍晚 6:00' },
  { value: '20:00', label: '🌙 晚上 8:00' }
]
</` + `script>`

const tsFull = `<` + `template>
  <div style="max-width: 320px;">
    <yh-time-select
      v-model="value"
      start="00:00"
      end="23:59"
      step="00:15"
      clearable
      editable
      include-end-time
      placeholder="选择任意时间（15分钟间隔）"
      @change="handleChange"
      @clear="handleClear"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">当前选择: {{ value || '未选择' }}</p>
  </div>
</` + `template>

<` + `script setup lang="ts">
import { ref } from 'vue'

const value = ref('')

const handleChange = (val: string) => {
  console.log('时间变更:', val)
}

const handleClear = () => {
  console.log('已清空')
}
</` + `script>`

const jsFull = `<` + `template>
  <div style="max-width: 320px;">
    <yh-time-select
      v-model="value"
      start="00:00"
      end="23:59"
      step="00:15"
      clearable
      editable
      include-end-time
      placeholder="选择任意时间（15分钟间隔）"
      @change="handleChange"
      @clear="handleClear"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">当前选择: {{ value || '未选择' }}</p>
  </div>
</` + `template>

<` + `script setup>
import { ref } from 'vue'

const value = ref('')

const handleChange = (val) => {
  console.log('时间变更:', val)
}

const handleClear = () => {
  console.log('已清空')
}
</` + `script>`
</script>

用于选择或输入固定时间点的时间选择器，适用于预约、排班、营业时间等场景。

## 基础用法

## 基础用法

基础的时间选择器，可自定义开始时间、结束时间和步长。例如设置全天范围：

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="max-width: 240px;">
    <yh-time-select 
      v-model="timeBasic" 
      start="00:00" 
      end="23:30" 
      step="00:30" 
      placeholder="选择时间" 
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">当前值: {{ timeBasic || '未选择' }}</p>
  </div>
</DemoBlock>

## 禁用状态

使用 `disabled` 属性禁用整个时间选择器。

<DemoBlock title="禁用状态" :ts-code="tsDisabled" :js-code="jsDisabled">
  <div style="max-width: 240px;">
    <yh-time-select v-model="timeDisabled" disabled placeholder="禁用状态" />
  </div>
</DemoBlock>

## 可清空

设置 `clearable` 属性可以清空已选时间。

<DemoBlock title="可清空" :ts-code="tsClearable" :js-code="jsClearable">
  <div style="max-width: 240px;">
    <yh-time-select v-model="timeClearable" clearable placeholder="可清空" />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">当前值: {{ timeClearable || '未选择' }}</p>
  </div>
</DemoBlock>

## 时间范围选择

通过 `min-time` 和 `max-time` 实现时间范围联动，开始时间的 `max-time` 绑定结束时间，结束时间的 `min-time` 绑定开始时间。

<DemoBlock title="时间范围选择" :ts-code="tsTimeRange" :js-code="jsTimeRange">
  <div style="display: flex; align-items: center; gap: 16px; max-width: 500px;">
    <yh-time-select
      v-model="startTime"
      :max-time="endTime"
      placeholder="开始时间"
      start="08:00"
      end="18:00"
      step="00:30"
      style="flex: 1;"
    />
    <span style="color: #909399;">至</span>
    <yh-time-select
      v-model="endTime"
      :min-time="startTime"
      placeholder="结束时间"
      start="08:00"
      end="18:00"
      step="00:30"
      style="flex: 1;"
    />
  </div>
  <p style="margin-top: 8px; color: #909399; font-size: 12px;">
    选择的时间段: {{ startTime || '--' }} 至 {{ endTime || '--' }}
  </p>
</DemoBlock>

## 固定时间范围

通过 `start`、`end` 和 `step` 属性设置时间范围和间隔。

<DemoBlock title="固定时间范围" :ts-code="tsFixedRange" :js-code="jsFixedRange">
  <div style="max-width: 240px;">
    <yh-time-select
      v-model="timeRange"
      start="09:00"
      end="21:00"
      step="00:30"
      placeholder="选择诊疗时间"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">诊疗时间: 09:00 - 21:00，每 30 分钟一个时段</p>
  </div>
</DemoBlock>

## 禁用时间段

使用 `disabled-hours` 属性禁用特定时间段，如午休时间、用餐时间等。

<DemoBlock title="禁用时间段" :ts-code="tsDisabledHours" :js-code="jsDisabledHours">
  <div style="max-width: 280px;">
    <yh-time-select
      v-model="timeDisabledHours"
      start="08:00"
      end="20:00"
      step="00:30"
      :disabled-hours="[['12:00', '13:30'], ['18:00', '19:00']]"
      placeholder="午休和晚餐时间不可选"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      禁用时段: 12:00-13:30 (午休), 18:00-19:00 (晚餐)
    </p>
  </div>
</DemoBlock>

## minTime 和 maxTime 限制

使用 `min-time` 和 `max-time` 限制可选时间范围，超出范围的选项将被禁用。

<DemoBlock title="minTime 和 maxTime 限制" :ts-code="tsMinMax" :js-code="jsMinMax">
  <div style="max-width: 280px;">
    <yh-time-select
      v-model="timeMinMax"
      start="06:00"
      end="22:00"
      step="00:30"
      min-time="09:00"
      max-time="18:00"
      placeholder="工作时间 09:00-18:00"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">
      可选范围: 09:00 - 18:00
    </p>
  </div>
</DemoBlock>

## 不同尺寸

使用 `size` 属性改变时间选择器大小，可选值为 `large`、`default`、`small`。

<DemoBlock title="不同尺寸" :ts-code="tsSizes" :js-code="jsSizes">
  <div style="max-width: 240px; display: flex; flex-direction: column; gap: 16px;">
    <yh-time-select v-model="timeLarge" size="large" placeholder="大型" />
    <yh-time-select v-model="timeDefault" placeholder="默认" />
    <yh-time-select v-model="timeSmall" size="small" placeholder="小型" />
  </div>
</DemoBlock>

## 时间格式

使用 `format` 属性自定义时间显示格式。

<DemoBlock title="时间格式" :ts-code="tsFormat" :js-code="jsFormat">
  <div style="max-width: 240px;">
    <yh-time-select
      v-model="timeFormat"
      start="08:30"
      step="00:15"
      end="18:30"
      format="HH时mm分"
      placeholder="自定义格式"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">当前值: {{ timeFormat || '未选择' }}</p>
  </div>
</DemoBlock>

## 自定义时间选项

使用 `options` 属性传入自定义的时间选项列表，优先级高于 `start`/`end`/`step` 配置。

<DemoBlock title="自定义时间选项" :ts-code="tsCustomOptions" :js-code="jsCustomOptions">
  <div style="max-width: 240px;">
    <yh-time-select v-model="timeCustom" :options="customOptions" placeholder="选择时间段" />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">当前值: {{ timeCustom || '未选择' }}</p>
  </div>
</DemoBlock>

## 完整功能演示

展示时间选择器的所有常用功能：可搜索、可清空、自定义时间间隔等。

<DemoBlock title="完整功能演示" :ts-code="tsFull" :js-code="jsFull">
  <div style="max-width: 320px;">
    <yh-time-select
      v-model="timeFull"
      start="00:00"
      end="23:59"
      step="00:15"
      clearable
      editable
      include-end-time
      placeholder="选择任意时间（15分钟间隔）"
    />
    <p style="margin-top: 8px; color: #909399; font-size: 12px;">当前选择: {{ timeFull || '未选择' }}</p>
  </div>
</DemoBlock>

## 在 Nuxt 中使用

TimeSelect 组件完全支持 Nuxt 3/4 的 SSR 渲染。在 Nuxt 项目中使用时，组件会自动导入。

<DemoBlock title="Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="max-width: 240px;">
    <yh-time-select 
      v-model="nuxtTime" 
      start="08:30" 
      step="00:15" 
      end="18:30" 
      placeholder="Nuxt 自动导入"
    />
  </div>
</DemoBlock>

**SSR 注意事项**：

- ✅ 时间选项列表及初始值完全支持
- ✅ 格式化（format）在服务器端正确渲染
- ✅ 禁用时段（disabled-hours）及范围限制支持
- ✅ 下拉列表通过 Teleport 渲染，兼容 SSR 首屏
- ⚠️ 滚动定位、输入搜索匹配在客户端激活后生效

::: tip SSR 安全性
TimeSelect 的时间列表在服务端即根据 start/end/step 参数预生成，确保了首屏加载时下拉列表即包含完整的可用选项，提供了极佳的 SEO 和首屏交换体验。
:::

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 绑定值 | `string` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| editable | 是否可编辑（可输入搜索） | `boolean` | `true` |
| clearable | 是否可清空 | `boolean` | `true` |
| size | 输入框尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| placeholder | 占位文本 | `string` | `'请选择时间'` |
| name | 原生 name 属性 | `string` | — |
| effect | 下拉框主题 | `'dark' \| 'light'` | `'light'` |
| prefix-icon | 前缀图标 | `string \| Component` | 时钟图标 |
| clear-icon | 清空图标 | `string \| Component` | 关闭圆形图标 |
| start | 开始时间 | `string` | `'09:00'` |
| end | 结束时间 | `string` | `'18:00'` |
| step | 时间间隔 | `string` | `'00:30'` |
| min-time | 最小可选时间 | `string` | — |
| max-time | 最大可选时间 | `string` | — |
| value-on-clear | 清空时的返回值 | `string` | `undefined` |
| format | 显示格式 | `string` | `'HH:mm'` |
| popper-class | 下拉框类名 | `string` | — |
| popper-style | 下拉框样式 | `string \| object` | — |
| teleported | 是否将下拉框插入到 body | `boolean` | `true` |
| include-end-time | 是否包含结束时间 | `boolean` | `false` |
| validate-event | 是否触发表单验证 | `boolean` | `true` |
| options | 自定义时间选项 | `TimeOption[]` | — |
| disabled-hours | 禁用的时间段 | `string[][]` | — |

### TimeOption

| 属性名 | 说明 | 类型 | 必填 |
| --- | --- | --- | --- |
| value | 时间值 | `string` | ✅ |
| label | 显示标签 | `string` | ✅ |
| disabled | 是否禁用 | `boolean` | — |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 值改变时触发 | `(value: string \| undefined) => void` |
| focus | 获取焦点时触发 | `(event: FocusEvent) => void` |
| blur | 失去焦点时触发 | `(event: FocusEvent) => void` |
| clear | 清空时触发 | `() => void` |
| visible-change | 下拉框显示/隐藏时触发 | `(visible: boolean) => void` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| prefix | 自定义前缀图标 | — |
| empty | 无数据时的内容 | — |
| option | 自定义选项内容 | `{ option: TimeOption }` |

### Expose

| 属性名 | 说明 | 类型 |
| --- | --- | --- |
| focus | 使组件获取焦点 | `() => void` |
| blur | 使组件失去焦点 | `() => void` |
| inputRef | 输入框 DOM 引用 | `HTMLInputElement \| undefined` |

## 主题变量

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-time-select-height-large` | 大尺寸高度 | `40px` |
| `--yh-time-select-height-default` | 默认尺寸高度 | `32px` |
| `--yh-time-select-height-small` | 小尺寸高度 | `24px` |
| `--yh-time-select-border-color` | 边框颜色 | `var(--yh-border-color)` |
| `--yh-time-select-border-color-hover` | 悬停边框颜色 | `var(--yh-border-color-hover)` |
| `--yh-time-select-bg-color` | 背景颜色 | `var(--yh-fill-color-blank)` |
| `--yh-time-select-text-color` | 文字颜色 | `var(--yh-text-color-primary)` |
| `--yh-time-select-placeholder-color` | 占位文字颜色 | `var(--yh-text-color-placeholder)` |
| `--yh-time-select-disabled-bg-color` | 禁用背景颜色 | `var(--yh-fill-color-light)` |
| `--yh-time-select-disabled-text-color` | 禁用文字颜色 | `var(--yh-text-color-disabled)` |

## 使用场景

### 预约系统

```vue
<template>
  <yh-form :model="form">
    <yh-form-item label="预约日期">
      <yh-date-picker v-model="form.date" />
    </yh-form-item>
    <yh-form-item label="预约时间">
      <yh-time-select
        v-model="form.time"
        start="09:00"
        end="17:00"
        step="00:30"
        :disabled-hours="[['12:00', '13:00']]"
        placeholder="选择预约时间"
      />
    </yh-form-item>
  </yh-form>
</template>
```

### 营业时间设置

```vue
<template>
  <div style="display: flex; gap: 16px; align-items: center;">
    <yh-time-select
      v-model="openTime"
      :max-time="closeTime"
      start="00:00"
      end="23:59"
      step="00:30"
      placeholder="开门时间"
    />
    <span>-</span>
    <yh-time-select
      v-model="closeTime"
      :min-time="openTime"
      start="00:00"
      end="23:59"
      step="00:30"
      placeholder="关门时间"
    />
  </div>
</template>
```

### 排班系统

```vue
<template>
  <yh-time-select
    v-model="shiftTime"
    :options="[
      { value: '08:00', label: '早班 (08:00-16:00)' },
      { value: '16:00', label: '中班 (16:00-00:00)' },
      { value: '00:00', label: '夜班 (00:00-08:00)' }
    ]"
    placeholder="选择班次"
  />
</template>
```
