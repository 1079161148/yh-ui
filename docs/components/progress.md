# Progress 进度条

用于展示当前操作的进度状态。融合了各家 UI 之长，并首创了双态进度、多环嵌套以及高性能环形动效。

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const percentage = ref(20)
const secondary = ref(45)
const multiPercentages = ref([85, 70, 55, 40])

onMounted(() => {
  const timer = setInterval(() => {
    percentage.value = (percentage.value % 100) + 1
    secondary.value = Math.min(100, (percentage.value + 25))
    multiPercentages.value = multiPercentages.value.map(p => (p + 1) % 100)
  }, 300)
})

const tsBasic = `<template>
  <div class="demo-progress">
    <yh-progress :percentage="50" />
    <yh-progress :percentage="100" status="success" />
    <yh-progress :percentage="80" status="warning" />
    <yh-progress :percentage="50" status="exception" />
  </div>
</template>`

const tsCircle = `<template>
  <div class="demo-progress-row">
    <yh-progress type="circle" :percentage="25" />
    <yh-progress type="circle" :percentage="100" status="success" />
    <yh-progress type="dashboard" :percentage="75" status="warning" />
  </div>
</template>`

const tsGradient = `<template>
  <div class="demo-progress-row">
    <!-- SVG 渐变 -->
    <yh-progress 
      type="circle" 
      :percentage="80" 
      :color="{ '0%': '#3f5efb', '100%': '#fc466b' }" 
    />
    <!-- 环形旋转动画 -->
    <yh-progress 
      type="circle" 
      :percentage="70" 
      status="success" 
      animated 
    />
    <!-- 渐变数组 -->
    <yh-progress 
      type="dashboard" 
      :percentage="50" 
      :color="['#409eff', '#67c23a']" 
    />
  </div>
</template>`

const tsMulti = `<template>
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
        <div style="font-weight:bold; font-size:16px">多圈赛跑</div>
      </div>
    </yh-progress>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const multiPercentages = ref([85, 70, 55, 40])
<\/script>`

const tsStriped = `<template>
  <div class="demo-progress">
    <yh-progress :percentage="60" striped />
    <yh-progress :percentage="80" striped striped-flow :duration="1" />
  </div>
</template>`

const tsSecondary = `<template>
  <yh-progress :percentage="percentage" :secondary-percentage="secondary" />
</template>`

const tsTextInside = `<template>
  <div class="demo-progress">
    <yh-progress :stroke-width="26" :percentage="70" text-inside />
    <yh-progress :stroke-width="24" :percentage="100" status="success" text-inside />
    <yh-progress :stroke-width="22" :percentage="80" status="warning" text-inside />
    <yh-progress :stroke-width="20" :percentage="50" status="exception" text-inside />
  </div>
</template>`

const tsCustomContent = `<template>
  <div class="demo-progress">
    <!-- 外部自定义内容 -->
    <yh-progress :percentage="50">
      <span style="margin-left: 10px; color: #909399; font-size: 13px">Content</span>
    </yh-progress>
    
    <!-- 内部自定义内容 -->
    <yh-progress :stroke-width="20" :percentage="70" text-inside>
      <span style="font-size: 12px">Content</span>
    </yh-progress>
    
    <div class="demo-progress-row">
      <!-- 环形自定义内容 (覆盖默认图标) -->
      <yh-progress type="circle" :percentage="100" status="success">
        <svg viewBox="0 0 1024 1024" width="28" height="28">
           <path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.8 560.3L342.3 510.4a32 32 0 1 0-45.2 45.2l136 136a32 32 0 0 0 45.2 0l311.4-311.4a32 32 0 1 0-45.2-45.2L456.2 624.3z" />
        </svg>
      </yh-progress>
      
      <!-- 仪表盘分层内容 -->
      <yh-progress type="dashboard" :percentage="80">
        <template #default="{ percentage }">
          <div style="text-align: center">
            <div style="font-size: 20px; color: #303133">{{ percentage }}%</div>
            <div style="font-size: 12px; color: #909399">Progressing</div>
          </div>
        </template>
      </yh-progress>
    </div>
  </div>
</template>`

const tsSteps = `<template>
  <yh-progress :percentage="60" :steps="5" :stroke-width="15" />
</template>`

const tsIndeterminate = `<template>
  <yh-progress indeterminate :duration="2" />
</template>`

const tsNuxt = `<template>
  <!-- 直接使用，支持自动导入 -->
  <YhProgress :percentage="50" striped striped-flow />
</template>`
</script>

## 基础用法

线形进度条，支持多种内置语义化颜色及自动状态图标。

<DemoBlock title="基础用法指标" :ts-code="tsBasic">
  <div class="demo-progress">
    <yh-progress :percentage="50" />
    <yh-progress :percentage="100" status="success" />
    <yh-progress :percentage="80" status="warning" />
    <yh-progress :percentage="50" status="exception" />
  </div>
</DemoBlock>

## 进度条内显示百分比标识

百分比不占用额外空间，适用于文件上传等场景。可以通过 `stroke-width` 更改进度条的高度，并通过 `text-inside` 属性来改变进度条内部的文字。

<DemoBlock title="内显百分比" :ts-code="tsTextInside">
  <div class="demo-progress">
    <yh-progress :stroke-width="26" :percentage="70" text-inside />
    <yh-progress :stroke-width="24" :percentage="100" status="success" text-inside />
    <yh-progress :stroke-width="22" :percentage="80" status="warning" text-inside />
    <yh-progress :stroke-width="20" :percentage="50" status="exception" text-inside />
  </div>
</DemoBlock>

## 自定义内容

通过默认插槽添加自定义内容。针对环形进度条，还支持作用域插槽（Scoped Slot）来获取实时进度。

<DemoBlock title="自定义内容演示" :ts-code="tsCustomContent">
  <div class="demo-progress">
    <yh-progress :percentage="50">
      <span style="margin-left: 10px; color: #909399; font-size: 13px">Content</span>
    </yh-progress>
    <yh-progress :stroke-width="20" :percentage="70" text-inside>
      <span style="font-size: 12px">Content</span>
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
            <div style="font-size: 12px; color: #909399">Progressing</div>
          </div>
        </template>
      </yh-progress>
    </div>
  </div>
</DemoBlock>

## 环形与仪表盘

通过 `type="circle"` 或 `dashboard` 开启。支持**旋转动画**与自定义 **SVG 渐变**。

<DemoBlock title="视觉增强" :ts-code="tsGradient">
  <div class="demo-progress-row">
    <yh-progress type="circle" :percentage="80" :color="{ '0%': '#3f5efb', '100%': '#fc466b' }" />
    <yh-progress type="circle" :percentage="70" status="success" animated />
    <yh-progress type="dashboard" :percentage="50" :color="['#409eff', '#67c23a']" />
  </div>
</DemoBlock>

## 多环嵌套 (Premium)

通过向 `percentage` 传递数组，可以实现类似 Apple Watch 的多环嵌套效果。

<DemoBlock title="多圈赛跑" :ts-code="tsMulti">
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
        <div style="font-weight:bold; font-size:16px">多圈赛跑</div>
      </div>
    </yh-progress>
  </div>
</DemoBlock>

## 条纹与流动

开启 `striped` 增加设计感，开启 `striped-flow` 让进度条“动”起来。

<DemoBlock title="动态条纹" :ts-code="tsStriped">
  <div class="demo-progress">
    <yh-progress :percentage="60" striped />
    <yh-progress :percentage="80" striped striped-flow :duration="1" />
  </div>
</DemoBlock>

## 高级特性

### 1. 双态感应进度 (Secondary Percentage)
支持 `secondary-percentage` 属性。非常适合视频播放缓冲。

<DemoBlock title="双态演示" :ts-code="tsSecondary">
  <yh-progress :percentage="percentage" :secondary-percentage="secondary" />
</DemoBlock>

### 2. 精准分段 (Steps)
通过 `steps` 属性可以将进度条通过物理刻度进行切分。

<DemoBlock title="分段刻度" :ts-code="tsSteps">
  <yh-progress :percentage="60" :steps="5" :stroke-width="15" />
</DemoBlock>

### 3. 未确定状态 (Indeterminate)
当无法预知确切数值（如正在扫描、正在连接）时。

<DemoBlock title="加载中状态" :ts-code="tsIndeterminate">
  <yh-progress indeterminate :duration="2" />
</DemoBlock>

## 在 Nuxt 中使用

组件已完美适配 Nuxt 3，支持自动导入与 SSR 渐变 ID 唯一化。

<DemoBlock title="Nuxt 适配" :ts-code="tsNuxt">
  <yh-progress :percentage="50" striped striped-flow />
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 进度类型 | `'line' \| 'circle' \| 'dashboard'` | `'line'` |
| percentage | 百分比 | `number \| number[]` | `0` |
| secondary-percentage | 二级百分比（带缓冲感） | `number` | `0` |
| status | 内置状态，自动匹配颜色与图标 | `'success' \| 'exception' \| 'warning' \| 'info'` | — |
| stroke-width | 进度条宽度 | `number` | `6` |
| text-inside | 文字内显（仅限 line 类型） | `boolean` | `false` |
| width | 环形画布宽度 | `number` | `126` |
| show-text | 是否显示进度文字/图标 | `boolean` | `true` |
| color | 进度条颜色，支持函数/数组渐变/对象渐变 | `string \| function \| string[] \| Record<string, string>` | — |
| define-background-color | 背景轨道颜色 | `string` | — |
| icon | 自定义状态图标 | `string` | — |
| animated | 开启环形旋转动效 | `boolean` | `false` |
| steps | 分段数量 | `number` | `0` |
| stroke-linecap | 进度条末端形状 | `'butt' \| 'round' \| 'square'` | `'round'` |
| format | 文字定制化函数 | `function(percentage)` | — |
| striped | 开启条纹样式 | `boolean` | `false` |
| striped-flow | 开启条纹流动动画 | `boolean` | `false` |
| indeterminate | 开启未确定滑动模式 | `boolean` | `false` |
| duration | 动画周期时长 (s) | `number` | `3` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| default | 自定义进度条中心或右侧的内容 | `{ percentage: number }` |

## 主题变量

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-progress-bar-bg` | 轨道背景 | `var(--yh-fill-color-darker)` |
| `--yh-progress-duration` | 默认动画周期 | `3s` |

<style scoped>
.demo-progress { display: flex; flex-direction: column; gap: 20px; width: 100%; }
.demo-progress-row { display: flex; gap: 24px; align-items: center; justify-content: center; padding: 20px; flex-wrap: wrap; }
</style>

<style scoped>
.demo-progress { display: flex; flex-direction: column; gap: 20px; width: 100%; }
.demo-progress-row { display: flex; gap: 24px; align-items: center; justify-content: center; padding: 20px; }
</style>
