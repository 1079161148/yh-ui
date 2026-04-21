# Progress 进度条

`YhProgress` 用于展示任务进度，支持线形、环形、仪表盘、多环嵌套、缓冲进度、条纹动画、未确定状态以及插槽自定义内容。

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils'

const percentage = ref(20)
const secondary = ref(45)
const multiPercentages = ref([85, 70, 55, 40])

let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  timer = setInterval(() => {
    percentage.value = (percentage.value % 100) + 1
    secondary.value = Math.min(100, percentage.value + 25)
    multiPercentages.value = multiPercentages.value.map((p) => (p + 1) % 100)
  }, 300)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})

const tsBasic = `<${_T}>
  <div class="demo-progress">
    <yh-progress :percentage="50" />
    <yh-progress :percentage="100" status="success" />
    <yh-progress :percentage="80" status="warning" />
    <yh-progress :percentage="50" status="exception" />
  </div>
</${_T}>`

const tsTextInside = `<${_T}>
  <div class="demo-progress">
    <yh-progress :stroke-width="26" :percentage="70" text-inside />
    <yh-progress :stroke-width="24" :percentage="100" status="success" text-inside />
    <yh-progress :stroke-width="22" :percentage="80" status="warning" text-inside />
    <yh-progress :stroke-width="20" :percentage="50" status="exception" text-inside />
  </div>
</${_T}>`

const tsCustomContent = `<${_T}>
  <div class="demo-progress">
    <yh-progress :percentage="50">
      <span style="margin-left: 10px; color: #909399; font-size: 13px">自定义内容</span>
    </yh-progress>
    <yh-progress :stroke-width="20" :percentage="70" text-inside>
      <span style="font-size: 12px">内部内容</span>
    </yh-progress>
    <div class="demo-progress-row">
      <yh-progress type="circle" :percentage="100" status="success">
        <svg viewBox="0 0 1024 1024" width="28" height="28">
          <path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.8 560.3L342.3 510.4a32 32 0 1 0-45.2 45.2l136 136a32 32 0 0 0 45.2 0l311.4-311.4a32 32 0 1 0-45.2-45.2L456.2 624.3z" />
        </svg>
      </yh-progress>
      <yh-progress type="dashboard" :percentage="80">
        <template #default="{ percentage }">
          <div style="text-align: center">
            <div style="font-size: 20px; color: #303133">{{ percentage }}%</div>
            <div style="font-size: 12px; color: #909399">进行中</div>
          </div>
        </template>
      </yh-progress>
    </div>
  </div>
</${_T}>`

const tsCircle = `<${_T}>
  <div class="demo-progress-row">
    <yh-progress type="circle" :percentage="25" />
    <yh-progress type="circle" :percentage="100" status="success" />
    <yh-progress type="dashboard" :percentage="75" status="warning" />
  </div>
</${_T}>`

const tsGradient = `<${_T}>
  <div class="demo-progress-row">
    <yh-progress type="circle" :percentage="80" :color="{ '0%': '#3f5efb', '100%': '#fc466b' }" />
    <yh-progress type="circle" :percentage="70" status="success" animated />
    <yh-progress type="dashboard" :percentage="50" :color="['#409eff', '#67c23a']" />
  </div>
</${_T}>`

const tsMulti = `<${_T}>
  <div class="demo-progress-row">
    <yh-progress
      type="circle"
      :percentage="multiPercentages"
      :color="['#409eff', '#67c23a', '#e6a23c', '#f56c6c']"
      :stroke-width="12"
      :width="200"
    >
      <div style="text-align:center">
        <div style="font-size:12px; opacity:0.6">多维数据</div>
        <div style="font-weight:bold; font-size:16px">多环嵌套</div>
      </div>
    </yh-progress>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue'

const multiPercentages = ref([85, 70, 55, 40])
</${_S}>`

const tsStriped = `<${_T}>
  <div class="demo-progress">
    <yh-progress :percentage="60" striped />
    <yh-progress :percentage="80" striped striped-flow :duration="1" />
  </div>
</${_T}>`

const tsSecondary = `<${_T}>
  <yh-progress :percentage="percentage" :secondary-percentage="secondary" />
</${_T}>`

const tsSteps = `<${_T}>
  <yh-progress :percentage="60" :steps="5" :stroke-width="15" />
</${_T}>`

const tsIndeterminate = `<${_T}>
  <yh-progress indeterminate :duration="2" />
</${_T}>`

const tsNuxt = `<${_T}>
  <yh-progress :percentage="50" striped striped-flow />
</${_T}>`

const jsBasic = toJs(tsBasic)
const jsTextInside = toJs(tsTextInside)
const jsCustomContent = toJs(tsCustomContent)
const jsCircle = toJs(tsCircle)
const jsGradient = toJs(tsGradient)
const jsMulti = toJs(tsMulti)
const jsStriped = toJs(tsStriped)
const jsSecondary = toJs(tsSecondary)
const jsSteps = toJs(tsSteps)
const jsIndeterminate = toJs(tsIndeterminate)
const jsNuxt = toJs(tsNuxt)
</script>

## 基础用法

默认线形模式支持语义化状态样式和内置状态图标。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div class="demo-progress">
    <yh-progress :percentage="50" />
    <yh-progress :percentage="100" status="success" />
    <yh-progress :percentage="80" status="warning" />
    <yh-progress :percentage="50" status="exception" />
  </div>
</DemoBlock>

## 条内显示百分比

使用 `text-inside` 可以将进度文本放到线形进度条内部。

<DemoBlock title="条内显示百分比" :ts-code="tsTextInside" :js-code="jsTextInside">
  <div class="demo-progress">
    <yh-progress :stroke-width="26" :percentage="70" text-inside />
    <yh-progress :stroke-width="24" :percentage="100" status="success" text-inside />
    <yh-progress :stroke-width="22" :percentage="80" status="warning" text-inside />
    <yh-progress :stroke-width="20" :percentage="50" status="exception" text-inside />
  </div>
</DemoBlock>

## 自定义内容

默认插槽可以替换内置标签区域。所有模式下插槽都可以拿到当前 `percentage`。

<DemoBlock title="自定义内容" :ts-code="tsCustomContent" :js-code="jsCustomContent">
  <div class="demo-progress">
    <yh-progress :percentage="50">
      <span style="margin-left: 10px; color: #909399; font-size: 13px">自定义内容</span>
    </yh-progress>
    <yh-progress :stroke-width="20" :percentage="70" text-inside>
      <span style="font-size: 12px">内部内容</span>
    </yh-progress>
    <div class="demo-progress-row">
      <yh-progress type="circle" :percentage="100" status="success">
        <svg viewBox="0 0 1024 1024" width="28" height="28">
          <path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.8 560.3L342.3 510.4a32 32 0 1 0-45.2 45.2l136 136a32 32 0 0 0 45.2 0l311.4-311.4a32 32 0 1 0-45.2-45.2L456.2 624.3z" />
        </svg>
      </yh-progress>
      <yh-progress type="dashboard" :percentage="80">
        <template #default="{ percentage }">
          <div style="text-align: center">
            <div style="font-size: 20px; color: #303133">{{ percentage }}%</div>
            <div style="font-size: 12px; color: #909399">进行中</div>
          </div>
        </template>
      </yh-progress>
    </div>
  </div>
</DemoBlock>

## 环形与仪表盘

通过 `type="circle"` 或 `type="dashboard"` 切换径向进度样式。

<DemoBlock title="环形与仪表盘" :ts-code="tsCircle" :js-code="jsCircle">
  <div class="demo-progress-row">
    <yh-progress type="circle" :percentage="25" />
    <yh-progress type="circle" :percentage="100" status="success" />
    <yh-progress type="dashboard" :percentage="75" status="warning" />
  </div>
</DemoBlock>

<DemoBlock title="渐变与动画" :ts-code="tsGradient" :js-code="jsGradient">
  <div class="demo-progress-row">
    <yh-progress type="circle" :percentage="80" :color="{ '0%': '#3f5efb', '100%': '#fc466b' }" />
    <yh-progress type="circle" :percentage="70" status="success" animated />
    <yh-progress type="dashboard" :percentage="50" :color="['#409eff', '#67c23a']" />
  </div>
</DemoBlock>

## 多环嵌套

当 `percentage` 传入数组时，组件会按顺序渲染多层同心圆进度。

<DemoBlock title="多环嵌套" :ts-code="tsMulti" :js-code="jsMulti">
  <div class="demo-progress-row">
    <yh-progress
      type="circle"
      :percentage="multiPercentages"
      :color="['#409eff', '#67c23a', '#e6a23c', '#f56c6c']"
      :stroke-width="12"
      :width="200"
    >
      <div style="text-align:center">
        <div style="font-size:12px; opacity:0.6">多维数据</div>
        <div style="font-weight:bold; font-size:16px">多环嵌套</div>
      </div>
    </yh-progress>
  </div>
</DemoBlock>

## 条纹与流动

`striped` 用于开启条纹样式，`striped-flow` 会按照 `duration` 让条纹流动起来。

<DemoBlock title="条纹与流动" :ts-code="tsStriped" :js-code="jsStriped">
  <div class="demo-progress">
    <yh-progress :percentage="60" striped />
    <yh-progress :percentage="80" striped striped-flow :duration="1" />
  </div>
</DemoBlock>

## 高级特性

### 缓冲进度

使用 `secondary-percentage` 可以在主进度后面显示缓冲轨道。

<DemoBlock title="缓冲进度" :ts-code="tsSecondary" :js-code="jsSecondary">
  <yh-progress :percentage="percentage" :secondary-percentage="secondary" />
</DemoBlock>

### 分段进度

使用 `steps` 可以将线形进度条划分为固定段数。

<DemoBlock title="分段进度" :ts-code="tsSteps" :js-code="jsSteps">
  <yh-progress :percentage="60" :steps="5" :stroke-width="15" />
</DemoBlock>

### 未确定状态

当暂时无法给出精确进度时，可以开启 `indeterminate`。

<DemoBlock title="未确定状态" :ts-code="tsIndeterminate" :js-code="jsIndeterminate">
  <yh-progress indeterminate :duration="2" />
</DemoBlock>

## 在 Nuxt 中使用

安装 `@yh-ui/nuxt` 后，可以在 Nuxt 3/4 页面和组件中直接使用 `YhProgress`。

<DemoBlock title="在 Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <yh-progress :percentage="50" striped striped-flow />
</DemoBlock>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `type` | 进度条模式 | `'line' \| 'circle' \| 'dashboard'` | `'line'` |
| `percentage` | 当前进度值，多环模式下可传数组 | `number \| number[]` | `0` |
| `secondary-percentage` | 次级缓冲进度 | `number` | `0` |
| `status` | 语义化状态样式 | `'success' \| 'exception' \| 'warning' \| 'info'` | `undefined` |
| `stroke-width` | 进度条厚度 | `number` | `6` |
| `text-inside` | 是否将文字显示在线形进度条内部 | `boolean` | `false` |
| `width` | 环形和仪表盘模式宽度 | `number` | `126` |
| `show-text` | 是否显示文字或状态图标 | `boolean` | `true` |
| `color` | 自定义颜色、颜色函数、数组或渐变映射 | `string \| ((percentage: number) => string) \| string[] \| Record<string, string>` | `''` |
| `icon` | 自定义图标类名 | `string` | `''` |
| `animated` | 是否旋转环形激活路径 | `boolean` | `false` |
| `define-background-color` | 自定义轨道背景色 | `string` | `''` |
| `format` | 默认文本格式化函数 | `(percentage: number) => string` | `undefined` |
| `stroke-linecap` | 线帽样式 | `'butt' \| 'round' \| 'square'` | `'round'` |
| `striped` | 是否开启线形条纹样式 | `boolean` | `false` |
| `striped-flow` | 是否开启线形条纹流动动画 | `boolean` | `false` |
| `indeterminate` | 是否开启未确定线形动画 | `boolean` | `false` |
| `duration` | 动画时长，单位秒 | `number` | `3` |
| `steps` | 线形模式下的分段数量 | `number` | `0` |
| `theme-overrides` | 组件主题覆盖变量 | `ComponentThemeVars` | `undefined` |

### Events

当前组件未暴露组件事件。

### Slots

| 插槽 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 替换内置标签区域 | `{ percentage: number }` |

### Expose

当前组件未暴露公开实例方法或属性。

### 类型导出

| 类型 | 说明 |
| --- | --- |
| `YhProgressProps` | 组件 Props 类型 |
| `YhProgressSlots` | 组件 Slots 类型 |
| `YhProgressType` | 进度条模式联合类型 |
| `YhProgressStatus` | 进度条状态联合类型 |
| `YhProgressInstance` | 组件实例类型 |

### 主题变量

`YhProgress` 支持 `themeOverrides`。当前组件样式中实际消费的专属 CSS 变量只有下面这一项，其余颜色与背景主要来自全局主题令牌。

| 变量 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-progress-duration` | 条纹动画、未确定动画和环形旋转动画使用的时长 | `3s` |

<style scoped>
.demo-progress {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.demo-progress-row {
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: center;
  padding: 20px;
  flex-wrap: wrap;
}
</style>
