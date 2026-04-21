# Alert 警告提示

`YhAlert` 用于展示需要用户立即关注的重要提示信息，支持语义状态、滚动公告、自动关闭和自定义操作区。

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
    <yh-alert title="成功提示文案" type="success" />
    <yh-alert title="消息提示文案" type="info" />
    <yh-alert title="警告提示文案" type="warning" />
    <yh-alert title="错误提示文案" type="error" />
  </div>
</template>`

const tsClosable = `<template>
  <div class="demo-list">
    <yh-alert title="默认不可关闭" type="success" />
    <yh-alert title="开启关闭按钮" type="info" closable />
    <yh-alert title="自定义关闭文案" type="warning" closable close-text="知道了" />
    <yh-alert title="显示图标" type="error" show-icon closable />
  </div>
</template>`

const tsScrollable = `<template>
  <yh-alert
    type="error"
    scrollable
    :scroll-speed="5"
    description="[极速通知] 系统检测到当前环境压力较大，请注意优化渲染性能。"
  />

  <yh-alert
    type="success"
    show-icon
    scrollable
    :pause-on-hover="true"
    description="这是一条会自动滚动的通知信息，支持跑马灯效果、悬停暂停以及速度配置。"
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
    此提示会在 5 秒后自动关闭，并显示倒计时进度条。
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
      title="玻璃态主题"
      type="info"
      effect="glass"
      show-icon
      closable
    >
      适合需要强调视觉层次的场景，组件会叠加模糊和半透明背景效果。
    </yh-alert>
  </div>
</template>`

const tsNuxt = `<template>
  <yh-alert title="Nuxt 中可直接使用" type="success" show-icon />
</template>`

const toJs = (code: string) => code.replace('setup lang="ts"', 'setup').replace('lang="ts"', '')
const jsBasic = toJs(tsBasic)
const jsClosable = toJs(tsClosable)
const jsScrollable = toJs(tsScrollable)
const jsProgress = tsProgress.replace('lang="ts"', '')
const jsGlass = toJs(tsGlass)
const jsNuxt = toJs(tsNuxt)
</script>

## 基础状态

通过 `type` 可以快速切换成功、信息、警告和错误四种语义状态。

<DemoBlock title="基础状态" :ts-code="tsBasic" :js-code="jsBasic">
  <div class="demo-list">
    <yh-alert title="成功提示文案" type="success" />
    <yh-alert title="消息提示文案" type="info" />
    <yh-alert title="警告提示文案" type="warning" />
    <yh-alert title="错误提示文案" type="error" />
  </div>
</DemoBlock>

## 关闭与图标

组件默认不显示关闭按钮。开启 `closable` 后可手动关闭，开启 `show-icon` 后会显示状态图标。

<DemoBlock title="关闭与图标" :ts-code="tsClosable" :js-code="jsClosable">
  <div class="demo-list">
    <yh-alert title="默认不可关闭" type="success" />
    <yh-alert title="开启关闭按钮" type="info" closable />
    <yh-alert title="自定义关闭文案" type="warning" closable close-text="知道了" />
    <yh-alert title="显示图标" type="error" show-icon closable />
  </div>
</DemoBlock>

## 滚动公告

内容较长时可以开启 `scrollable`，并通过 `scroll-speed` 与 `pause-on-hover` 控制滚动节奏。

<DemoBlock title="滚动公告" :ts-code="tsScrollable" :js-code="jsScrollable">
  <div class="demo-list">
    <yh-alert
      type="error"
      scrollable
      :scroll-speed="5"
      description="[极速通知] 系统检测到当前环境压力较大，请注意优化渲染性能。"
    />
    <yh-alert
      type="success"
      show-icon
      scrollable
      :scroll-speed="20"
      :pause-on-hover="true"
      description="这是一条会自动滚动的通知信息，支持跑马灯效果、悬停暂停以及速度配置。"
    />
  </div>
</DemoBlock>

## 自动关闭

设置 `duration` 后，提示会在指定时间后自动关闭；开启 `show-progress` 后，会在底部显示倒计时进度条。

<DemoBlock title="自动关闭" :ts-code="tsProgress" :js-code="jsProgress">
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
      此提示会在 5 秒后自动关闭，并显示倒计时进度条。
    </yh-alert>
    <div style="margin-top: 10px">
      <yh-button type="primary" size="small" @click="resetAlert">重新播放倒计时演示</yh-button>
    </div>
  </div>
</DemoBlock>

## 主题效果

`effect` 支持 `light`、`dark`、`outline` 和 `glass` 四种视觉风格。

<DemoBlock title="主题效果" :ts-code="tsGlass" :js-code="jsGlass">
  <div class="glass-container">
    <yh-alert
      title="玻璃态主题"
      type="info"
      effect="glass"
      show-icon
      closable
    >
      适合需要强调视觉层次的场景，组件会叠加模糊和半透明背景效果。
    </yh-alert>
  </div>
</DemoBlock>

## 在 Nuxt 中使用

接入 `@yh-ui/nuxt` 后，可直接在页面中使用 `YhAlert`。组件初始渲染不依赖浏览器专属 API，因此 SSR 阶段可以正常输出静态内容，自动关闭与悬停暂停会在客户端激活后生效。

<DemoBlock title="在 Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <yh-alert title="Nuxt 中可直接使用" type="success" show-icon />
</DemoBlock>

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `title` | 标题文本 | `string` | `''` |
| `description` | 描述文本 | `string` | `''` |
| `type` | 提示类型 | `'success' \| 'info' \| 'warning' \| 'error'` | `'info'` |
| `effect` | 视觉风格 | `'light' \| 'dark' \| 'outline' \| 'glass'` | `'light'` |
| `closable` | 是否显示关闭按钮 | `boolean` | `false` |
| `close-text` | 自定义关闭按钮文案 | `string` | `''` |
| `close-icon` | 自定义关闭图标组件或图标名 | `string \| Component` | `''` |
| `show-icon` | 是否显示状态图标 | `boolean` | `false` |
| `icon` | 自定义状态图标组件或图标名 | `string \| Component` | `''` |
| `center` | 内容是否居中 | `boolean` | `false` |
| `scrollable` | 是否开启滚动公告模式 | `boolean` | `false` |
| `scroll-speed` | 完成一轮滚动所需秒数 | `number` | `15` |
| `pause-on-hover` | 悬停时是否暂停滚动 | `boolean` | `true` |
| `duration` | 自动关闭时长，单位毫秒，`0` 表示不自动关闭 | `number` | `0` |
| `show-progress` | 自动关闭时是否显示进度条 | `boolean` | `false` |
| `theme-overrides` | 组件级主题覆盖 | `ComponentThemeVars` | `undefined` |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| `close` | 点击关闭按钮时触发 | `(event: MouseEvent)` |

### Slots

| 名称 | 说明 |
| --- | --- |
| `default` | 描述内容 |
| `title` | 标题内容 |
| `icon` | 自定义状态图标 |
| `close` | 自定义关闭区域 |
| `action` | 自定义操作区 |

### Expose

当前组件未暴露公开实例方法或属性。

### 类型导出

| 名称 | 说明 |
| --- | --- |
| `YhAlertProps` | `YhAlert` 的 props 类型 |
| `YhAlertEmits` | `YhAlert` 的 emits 类型 |
| `YhAlertSlots` | `YhAlert` 的 slots 类型 |
| `YhAlertType` | 提示类型联合类型 |
| `YhAlertEffect` | 视觉风格联合类型 |
| `YhAlertInstance` | 组件实例类型 |

### 主题变量

`YhAlert` 没有完整暴露一组独立的组件级专属主题变量，当前样式主要依赖全局主题令牌。滚动公告模式额外消费下方变量，组件仍支持通过 `themeOverrides` 参与主题覆盖。

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-alert-scroll-speed` | 滚动公告动画时长 | `15s` |

<style scoped>
.demo-list { display: flex; flex-direction: column; gap: 12px; }
.demo-column { display: flex; flex-direction: column; align-items: flex-start; }
.glass-container {
  padding: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
}
</style>
