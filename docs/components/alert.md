# Alert 警告提示

警告提示组件，用于向用户展示重要的提示或反馈信息。具备多种内置状态模式、创新的毛玻璃视觉特效以及极致流畅的跑马灯公告功能。

<script setup lang="ts">
import { ref } from 'vue'

const showAlert = ref(true)
const resetAlert = () => {
  showAlert.value = false
  setTimeout(() => {
    showAlert.value = true
  }, 300)
}

const tsBasic = `<template>
  <div class="demo-list">
    <yh-alert title="成功提示的文案" type="success" />
    <yh-alert title="消息提示的文案" type="info" />
    <yh-alert title="警告提示的文案" type="warning" />
    <yh-alert title="错误提示的文案" type="error" />
  </div>
</template>`

const tsClosable = `<template>
  <div class="demo-list">
    <yh-alert title="默认不可关闭" type="success" />
    <yh-alert title="手动开启关闭" type="info" closable />
    <yh-alert title="自定义关闭文本" type="warning" closable close-text="知道了" />
    <yh-alert title="显示图标" type="error" show-icon closable />
  </div>
</template>`

const tsScrollable = `<template>
  <!-- 极速模式（5s 完成一圈） -->
  <yh-alert 
    type="error" 
    scrollable 
    :scroll-speed="5"
    description="[极速通知] 系统检测到当前环境压力较大，请注意优化代码性能！"
  />
  
  <!-- 默认模式（带悬停暂停） -->
  <yh-alert 
    type="success" 
    show-icon 
    scrollable
    :pause-on-hover="true"
    description="这是一条会自动滚动的通知信息：欢迎使用 YH-UI 增强型 Alert 组件，它支持跑马灯效果、鼠标悬停暂停、动态速率配置。试试将鼠标移上来看看效果！"
  />
</template>`

const tsProgress = `<template>
  <yh-alert 
    v-if="visible"
    title="自动消失的警告" 
    type="warning" 
    :duration="5000" 
    show-icon
    show-progress
    closable
  >
    此提示将在 5 秒后自动关闭，并带有倒计时进度条提示。
  </yh-alert>
  <yh-button @click="reset">重新播放演示</yh-button>
</template>

<` + `script setup lang="ts">
import { ref } from 'vue'
const visible = ref(true)
const reset = () => {
  visible.value = false
  setTimeout(() => visible.value = true, 300)
}
<` + `/script>`

const tsGlass = `<template>
  <div class="glass-container">
    <yh-alert 
      title="高级毛玻璃效果" 
      type="info" 
      effect="glass"
      show-icon
      closable
    >
      这是 YH-UI 自创的 premium 毛玻璃主题，适合在深色背景或复杂纹理上展示。
    </yh-alert>
  </div>
</template>`

const tsNuxt = `<template>
  <yh-alert title="Nuxt 开箱即用" type="success" show-icon />
</template>`

const toJs = (code: string) => code.replace('setup lang="ts"', 'setup').replace('lang="ts"', '')
const jsBasic = toJs(tsBasic)
const jsClosable = toJs(tsClosable)
const jsScrollable = toJs(tsScrollable)
const jsProgress = tsProgress.replace('lang="ts"', '')
const jsGlass = toJs(tsGlass)
const jsNuxt = toJs(tsNuxt)
</script>

## 展示模式

警告提示支持多种语义化状态和视觉主题。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div class="demo-list">
    <yh-alert title="成功提示的文案" type="success" />
    <yh-alert title="消息提示的文案" type="info" />
    <yh-alert title="警告提示的文案" type="warning" />
    <yh-alert title="错误提示的文案" type="error" />
  </div>
</DemoBlock>

## 可配置交互

组件默认不可关闭，可通过 `closable` 开启。同时支持显示状态图标及其位置。

<DemoBlock title="按钮与图标" :ts-code="tsClosable" :js-code="jsClosable">
  <div class="demo-list">
    <yh-alert title="默认不可关闭" type="success" />
    <yh-alert title="手动开启关闭" type="info" closable />
    <yh-alert title="自定义关闭文本" type="warning" closable close-text="知道了" />
    <yh-alert title="显示图标" type="error" show-icon closable />
  </div>
</DemoBlock>

## 文字滚动 (Scrollable)

对于内容较长的公告信息，可以开启 `scrollable` 属性实现跑马灯滚动效果。
我们通过 `will-change: transform` 和 `translate3d` 硬件加速，将滚动细腻度优化到了极致。

<DemoBlock title="滚动通知" :ts-code="tsScrollable" :js-code="jsScrollable">
  <div class="demo-list">
    <yh-alert 
      type="error" 
      scrollable 
      :scroll-speed="5"
      description="[极速模式] 系统检测到当前环境压力较大，请注意优化代码性能！"
    />
    <yh-alert 
      type="success" 
      show-icon 
      scrollable
      :scroll-speed="20"
      :pause-on-hover="true"
      description="这是一条会自动滚动的通知信息：欢迎使用 YH-UI 增强型 Alert 组件，它支持跑马灯效果、鼠标悬停暂停、动态速率配置。试试将鼠标移上来看看效果！"
    />
  </div>
</DemoBlock>

## 自动关闭与计时 (Advanced)

`YhAlert` 支持定时关闭。开启 `show-progress` 后，底部会出现一条灵动的进度条演化倒计时。

<DemoBlock title="自动消失展示" :ts-code="tsProgress" :js-code="jsProgress">
  <div class="demo-column">
    <yh-alert 
      v-if="showAlert"
      title="自动消失的警告" 
      type="warning" 
      :duration="5000" 
      show-icon
      show-progress
      closable
    >
      此提示将在 5 秒后自动关闭，并带有倒计时进度条提示。
    </yh-alert>
    <div style="margin-top: 10px">
      <yh-button type="primary" size="small" @click="resetAlert">重新播放倒计时演示</yh-button>
    </div>
  </div>
</DemoBlock>

## 自创高级特性

### 1. 智能辅助毛玻璃 (Glassmorphism)
通过 `effect="glass"` 开启。组件会自动应用背景模糊（Backdrop Blur）和半透明蒙版，非常适合在具有强烈视觉背景的现代化仪表盘中使用。

<DemoBlock title="毛玻璃效果" :ts-code="tsGlass" :js-code="jsGlass">
  <div class="glass-container">
    <yh-alert 
      title="高级毛玻璃效果" 
      type="info" 
      effect="glass"
      show-icon
      closable
    >
      这是 YH-UI 自创的 premium 毛玻璃主题，适合在极具设计感的背景上展示。
    </yh-alert>
  </div>
</DemoBlock>

### 2. 多态 Action 槽位
支持 `action` 插槽。您可以在警告条内放置“重试”、“查看详情”等交互按钮，使警告由单向通知变为双向交互。

## 在 Nuxt 中使用

`YhAlert` 已全面适配 Nuxt 3/4。组件支持全自动导入，且所有动画策略均针对 SSR 环境进行了优化。

<DemoBlock title="Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <yh-alert title="Nuxt 开箱即用" type="success" show-icon />
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `string` | — |
| description | 描述 | `string` | — |
| type | 类型 | `'success' \| 'info' \| 'warning' \| 'error'` | `'info'` |
| effect | 主题 | `'light' \| 'dark' \| 'outline' \| 'glass'` | `'light'` |
| closable | 是否可关闭 | `boolean` | `false` |
| close-text | 关闭按钮自定义文本 | `string` | — |
| close-icon | 关闭按钮展示图标 | `string \| Component` | — |
| show-icon | 是否显示图标 | `boolean` | `false` |
| center | 内容是否居中 | `boolean` | `false` |
| scrollable | 是否开启跑马灯滚动 | `boolean` | `false` |
| scroll-speed | 滚动完成一次所需的秒数 | `number` | `15` |
| pause-on-hover | 鼠标悬停时是否暂停滚动 | `boolean` | `true` |
| duration | 自动消失毫秒数，0 为永不消失 | `number` | `0` |
| show-progress | 是否显示自动关闭进度条 | `boolean` | `false` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 描述内容描述 |
| title | 标题内容 |
| icon | 自定义图标 |
| close | 自定义关闭触发器 |
| action | 自定义操作区（位于描述下方） |

### Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| close | 关闭时触发 | `(evt: MouseEvent)` |

## 主题变量

您可以通过以下 CSS 变量深度定制 Alert 的视觉风格。

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-alert-padding` | 内边距 | `12px 16px` |
| `--yh-alert-border-radius` | 圆角 | `12px` |
| `--yh-alert-title-font-size` | 标题字号 | `14px` |
| `--yh-alert-description-font-size` | 描述字号 | `13px` |
| `--yh-alert-icon-size` | 图标尺寸 | `20px` |
| `--yh-alert-scroll-speed` | 滚动速度控制 (S) | `15s` |

<style scoped>
.demo-list { display: flex; flex-direction: column; gap: 12px; }
.demo-column { display: flex; flex-direction: column; align-items: flex-start; }
.glass-container {
  padding: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
}
</style>
