<script setup lang="ts">
import { ref, h, defineComponent } from 'vue'

// 图标组件
const CheckIcon = defineComponent({
  name: 'CheckIcon',
  render() {
    return h('svg', { viewBox: '0 0 1024 1024', width: '1em', height: '1em' }, [
      h('path', { fill: 'currentColor', d: 'M406.656 706.944L195.84 496.256a32 32 0 10-45.248 45.248l256 256 512-512a32 32 0 00-45.248-45.248L406.656 706.944z' })
    ])
  }
})

const CloseIcon = defineComponent({
  name: 'CloseIcon',
  render() {
    return h('svg', { viewBox: '0 0 1024 1024', width: '1em', height: '1em' }, [
      h('path', { fill: 'currentColor', d: 'M764.288 214.592L512 466.88 259.712 214.592a31.936 31.936 0 00-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1045.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0045.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 10-45.12-45.184z' })
    ])
  }
})

const ViewIcon = defineComponent({
  name: 'ViewIcon',
  render() {
    return h('svg', { viewBox: '0 0 1024 1024', width: '1em', height: '1em' }, [
      h('path', { fill: 'currentColor', d: 'M512 160c320 0 512 352 512 352s-192 352-512 352S0 512 0 512s192-352 512-352zM149.76 512c41.28 74.88 124.16 192 362.24 192s320.96-117.12 362.24-192c-41.28-74.88-124.16-192-362.24-192S190.08 437.12 149.76 512zM512 592a80 80 0 110-160 80 80 0 010 160z' })
    ])
  }
})

const HideIcon = defineComponent({
  name: 'HideIcon',
  render() {
    return h('svg', { viewBox: '0 0 1024 1024', width: '1em', height: '1em' }, [
      h('path', { fill: 'currentColor', d: 'M876.8 156.8c0-9.6-3.2-16-9.6-22.4-6.4-6.4-12.8-9.6-22.4-9.6s-16 3.2-22.4 9.6l-96 96c-57.6-35.2-128-57.6-214.4-57.6-320 0-512 352-512 352s73.6 134.4 192 246.4l-80 80c-6.4 6.4-9.6 12.8-9.6 22.4s3.2 16 9.6 22.4c6.4 6.4 12.8 9.6 22.4 9.6s16-3.2 22.4-9.6l688-688c6.4-6.4 9.6-12.8 9.6-22.4zM512 672c-89.6 0-160-70.4-160-160 0-25.6 6.4-48 16-70.4l214.4 214.4c-22.4 9.6-44.8 16-70.4 16zM1024 512s-73.6-134.4-192-246.4l-80 80c41.6 41.6 73.6 89.6 96 134.4-41.28 74.88-124.16 192-362.24 192-25.6 0-51.2-3.2-73.6-6.4l-64 64c44.8 12.8 89.6 22.4 137.6 22.4 320 0 512-352 512-352l-38.4-70.4-57.6 57.6c19.2 22.4 35.2 48 54.4 76.8z' })
    ])
  }
})

// 基础用法
const basicValue = ref(true)

// 尺寸
const sizeValue = ref(true)

// 文字描述
const textValue1 = ref(false)
const textValue2 = ref(true)
const textValue3 = ref(true)

// 图标
const iconValue1 = ref(true)
const iconValue2 = ref(true)

// 扩展 value 类型
const extendValue = ref('100')

// 禁用状态
const disabledValue1 = ref(true)
const disabledValue2 = ref(false)

// 加载状态
const loadingValue1 = ref(true)
const loadingValue2 = ref(false)

// 阻止切换
const beforeChangeValue1 = ref(false)
const beforeChangeValue2 = ref(false)
const loading1 = ref(false)
const loading2 = ref(false)

const beforeChange1 = () => {
  loading1.value = true
  return new Promise<boolean>((resolve) => {
    setTimeout(() => {
      loading1.value = false
      resolve(true)
    }, 1000)
  })
}

const beforeChange2 = () => {
  loading2.value = true
  return new Promise<boolean>((_, reject) => {
    setTimeout(() => {
      loading2.value = false
      reject(new Error('rejected'))
    }, 1000)
  })
}

// 自定义动作图标
const actionIconValue1 = ref(true)
const actionIconValue2 = ref(false)

// Nuxt 使用示例
const nuxtSwitch = ref(true)

// Nuxt 使用示例
const tsNuxt = `<template>
  <div style="display: flex; gap: 16px;">
    <!-- 基础开关，自动导入 -->
    <yh-switch v-model="nuxtSwitch" />
    
    <!-- 带文字描述 -->
    <yh-switch v-model="nuxtSwitch" active-text="开启" inactive-text="关闭" />
  </div>
</template>

<script setup lang="ts">
// 无需导入 Switch 组件
const nuxtSwitch = ref(true)
<\/script>`

const jsNuxt = tsNuxt.replace('lang="ts"', '')

// 代码示例
const tsBasic = `<template>
  <yh-switch v-model="value" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref(true)
<\/script>`

const jsBasic = tsBasic.replace('lang="ts"', '')

const tsSize = `<template>
  <yh-switch v-model="value" size="large" />
  <yh-switch v-model="value" />
  <yh-switch v-model="value" size="small" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref(true)
<\/script>`

const jsSize = tsSize.replace('lang="ts"', '')

const tsText = `<template>
  <yh-switch v-model="value1" active-text="开" inactive-text="关" />
  <yh-switch v-model="value2" active-text="是" inactive-text="否" inline-prompt />
  <yh-switch v-model="value3" active-text="Y" inactive-text="N" inline-prompt />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value1 = ref(false)
const value2 = ref(true)
const value3 = ref(true)
<\/script>`

const jsText = tsText.replace('lang="ts"', '')

const tsIcons = `<template>
  <yh-switch v-model="value1" :active-icon="CheckIcon" :inactive-icon="CloseIcon" />
  <yh-switch v-model="value2" inline-prompt :active-icon="CheckIcon" :inactive-icon="CloseIcon" />
</template>

<script setup lang="ts">
import { ref, h } from 'vue'

const CheckIcon = {
  render() {
    return h('svg', { viewBox: '0 0 1024 1024' }, [
      h('path', { fill: 'currentColor', d: 'M406.656 706.944L195.84 496.256a32 32 0 10-45.248 45.248l256 256 512-512a32 32 0 00-45.248-45.248L406.656 706.944z' })
    ])
  }
}

const CloseIcon = {
  render() {
    return h('svg', { viewBox: '0 0 1024 1024' }, [
      h('path', { fill: 'currentColor', d: 'M764.288 214.592L512 466.88 259.712 214.592a31.936 31.936 0 00-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1045.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0045.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 10-45.12-45.184z' })
    ])
  }
}

const value1 = ref(true)
const value2 = ref(true)
<\/script>`

const jsIcons = tsIcons.replace('lang="ts"', '')

const tsValue = `<template>
  <yh-switch v-model="value" active-value="100" inactive-value="0" />
  <span>Value: {{ value }}</span>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref("100")
<\/script>`

const jsValue = tsValue.replace('lang="ts"', '')

const tsDisabled = `<template>
  <yh-switch v-model="value1" disabled />
  <yh-switch v-model="value2" disabled />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value1 = ref(true)
const value2 = ref(false)
<\/script>`

const jsDisabled = tsDisabled.replace('lang="ts"', '')

const tsLoading = `<template>
  <yh-switch v-model="value1" loading />
  <yh-switch v-model="value2" loading />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value1 = ref(true)
const value2 = ref(false)
<\/script>`

const jsLoading = tsLoading.replace('lang="ts"', '')

const tsBeforeChange = `<template>
  <yh-switch v-model="value1" :loading="loading1" :before-change="beforeChange1" />
  <yh-switch v-model="value2" :loading="loading2" :before-change="beforeChange2" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref(false)
const value2 = ref(false)
const loading1 = ref(false)
const loading2 = ref(false)

const beforeChange1 = () => {
  loading1.value = true
  return new Promise((resolve) => {
    setTimeout(() => {
      loading1.value = false
      resolve(true)
    }, 1000)
  })
}

const beforeChange2 = () => {
  loading2.value = true
  return new Promise((_, reject) => {
    setTimeout(() => {
      loading2.value = false
      reject(new Error('rejected'))
    }, 1000)
  })
}
<\/script>`

const jsBeforeChange = tsBeforeChange.replace('lang="ts"', '')

const tsActionIcons = `<template>
  <yh-switch v-model="value1" :active-action-icon="ViewIcon" :inactive-action-icon="HideIcon" />
  <yh-switch v-model="value2" :active-action-icon="CheckIcon" :inactive-action-icon="CloseIcon" />
</template>

<script setup lang="ts">
import { ref, h } from 'vue'

const CheckIcon = {
  render() {
    return h('svg', { viewBox: '0 0 1024 1024' }, [
      h('path', { fill: 'currentColor', d: 'M406.656 706.944L195.84 496.256a32 32 0 10-45.248 45.248l256 256 512-512a32 32 0 00-45.248-45.248L406.656 706.944z' })
    ])
  }
}

const CloseIcon = {
  render() {
    return h('svg', { viewBox: '0 0 1024 1024' }, [
      h('path', { fill: 'currentColor', d: 'M764.288 214.592L512 466.88 259.712 214.592a31.936 31.936 0 00-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1045.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0045.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 10-45.12-45.184z' })
    ])
  }
}

const ViewIcon = {
  render() {
    return h('svg', { viewBox: '0 0 1024 1024' }, [
      h('path', { fill: 'currentColor', d: 'M512 160c320 0 512 352 512 352s-192 352-512 352S0 512 0 512s192-352 512-352zM149.76 512c41.28 74.88 124.16 192 362.24 192s320.96-117.12 362.24-192c-41.28-74.88-124.16-192-362.24-192S190.08 437.12 149.76 512zM512 592a80 80 0 110-160 80 80 0 010 160z' })
    ])
  }
}

const HideIcon = {
  render() {
    return h('svg', { viewBox: '0 0 1024 1024' }, [
      h('path', { fill: 'currentColor', d: 'M876.8 156.8c0-9.6-3.2-16-9.6-22.4-6.4-6.4-12.8-9.6-22.4-9.6s-16 3.2-22.4 9.6l-96 96c-57.6-35.2-128-57.6-214.4-57.6-320 0-512 352-512 352s73.6 134.4 192 246.4l-80 80c-6.4 6.4-9.6 12.8-9.6 22.4s3.2 16 9.6 22.4c6.4 6.4 12.8 9.6 22.4 9.6s16-3.2 22.4-9.6l688-688c6.4-6.4 9.6-12.8 9.6-22.4zM512 672c-89.6 0-160-70.4-160-160 0-25.6 6.4-48 16-70.4l214.4 214.4c-22.4 9.6-44.8 16-70.4 16zM1024 512s-73.6-134.4-192-246.4l-80 80c41.6 41.6 73.6 89.6 96 134.4-41.28 74.88-124.16 192-362.24 192-25.6 0-51.2-3.2-73.6-6.4l-64 64c44.8 12.8 89.6 22.4 137.6 22.4 320 0 512-352 512-352l-38.4-70.4-57.6 57.6c19.2 22.4 35.2 48 54.4 76.8z' })
    ])
  }
}

const value1 = ref(true)
const value2 = ref(false)
<\/script>`

const jsActionIcons = tsActionIcons.replace('lang="ts"', '')
</script>

# Switch 开关

表示两种相互对立的状态间的切换，多用于触发「开/关」。

## 基础用法

绑定 `v-model` 到一个 `Boolean` 类型的变量。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-switch v-model="basicValue" />
</DemoBlock>

## 尺寸

通过 `size` 属性可以设置 Switch 的大小。

<DemoBlock title="尺寸" :ts-code="tsSize" :js-code="jsSize">
  <div style="display: flex; align-items: center; gap: 16px;">
    <yh-switch v-model="sizeValue" size="large" />
    <yh-switch v-model="sizeValue" />
    <yh-switch v-model="sizeValue" size="small" />
  </div>
</DemoBlock>

## 文字描述

使用 `active-text` 属性与 `inactive-text` 属性来设置开关的文字描述。使用 `inline-prompt` 属性来控制文本是否显示在点内。

<DemoBlock title="文字描述" :ts-code="tsText" :js-code="jsText">
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-switch v-model="textValue1" active-text="开" inactive-text="关" />
    <yh-switch v-model="textValue2" active-text="是" inactive-text="否" inline-prompt />
    <yh-switch v-model="textValue3" active-text="Y" inactive-text="N" inline-prompt />
  </div>
</DemoBlock>

## 显示自定义图标

使用 `active-icon` 和 `inactive-icon` 属性来添加图标。使用 `inline-prompt` 属性来控制图标显示在点内。

<DemoBlock title="显示自定义图标" :ts-code="tsIcons" :js-code="jsIcons">
  <div style="display: flex; gap: 16px;">
    <yh-switch v-model="iconValue1" :active-icon="CheckIcon" :inactive-icon="CloseIcon" />
    <yh-switch v-model="iconValue2" :active-icon="CheckIcon" :inactive-icon="CloseIcon" inline-prompt />
  </div>
</DemoBlock>

## 扩展的 value 类型

你可以设置 `active-value` 和 `inactive-value` 属性，它们接受 `Boolean`、`String` 或 `Number` 类型的值。

<DemoBlock title="扩展的 value 类型" :ts-code="tsValue" :js-code="jsValue">
  <div style="display: flex; align-items: center; gap: 16px;">
    <yh-switch v-model="extendValue" active-value="100" inactive-value="0" />
    <span>Value: {{ extendValue }}</span>
  </div>
</DemoBlock>

## 禁用状态

设置 `disabled` 属性，接受一个 `Boolean`，设置 `true` 即可禁用。

<DemoBlock title="禁用状态" :ts-code="tsDisabled" :js-code="jsDisabled">
  <div style="display: flex; gap: 16px;">
    <yh-switch v-model="disabledValue1" disabled />
    <yh-switch v-model="disabledValue2" disabled />
  </div>
</DemoBlock>

## 加载状态

设置 `loading` 属性，接受一个 `Boolean`，设置 `true` 即显示加载状态。

<DemoBlock title="加载状态" :ts-code="tsLoading" :js-code="jsLoading">
  <div style="display: flex; gap: 16px;">
    <yh-switch v-model="loadingValue1" loading />
    <yh-switch v-model="loadingValue2" loading />
  </div>
</DemoBlock>

## 阻止切换

设置 `before-change` 属性，若返回 `false` 或者返回 `Promise` 且被 reject，则停止切换。

<DemoBlock title="阻止切换" :ts-code="tsBeforeChange" :js-code="jsBeforeChange">
  <div style="display: flex; gap: 16px;">
    <yh-switch v-model="beforeChangeValue1" :loading="loading1" :before-change="beforeChange1" />
    <yh-switch v-model="beforeChangeValue2" :loading="loading2" :before-change="beforeChange2" />
  </div>
</DemoBlock>

## 自定义动作图标

使用 `active-action-icon` 和 `inactive-action-icon` 属性来自定义滑块内的图标。

<DemoBlock title="自定义动作图标" :ts-code="tsActionIcons" :js-code="jsActionIcons">
  <div style="display: flex; gap: 16px;">
    <yh-switch v-model="actionIconValue1" :active-action-icon="ViewIcon" :inactive-action-icon="HideIcon" />
    <yh-switch v-model="actionIconValue2" :active-action-icon="CheckIcon" :inactive-action-icon="CloseIcon" />
  </div>
</DemoBlock>

## 在 Nuxt 中使用

Switch 组件完全支持 Nuxt 3/4 的 SSR 渲染。在 Nuxt 项目中使用时，组件会自动导入。

<DemoBlock title="Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="display: flex; gap: 16px;">
    <yh-switch v-model="nuxtSwitch" />
    <yh-switch v-model="nuxtSwitch" active-text="开启" inactive-text="关闭" />
  </div>
</DemoBlock>

**SSR 注意事项**：

- ✅ 基础开关状态、尺寸样式完全支持
- ✅ 文字描述及图标在 SSR 中渲染一致
- ✅ 扩展 Value 类型（active-value）支持
- ⚠️ 初始状态在 SSR 完成后与客户端激活一致

::: tip SSR 安全性
Switch 组件针对 SSR 进行了深度适配，确保滑块位置和颜色在服务端渲染时就被正确计算，提供流畅的视觉体验。
:::

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model-value / v-model | 绑定值，必须等于 `active-value` 或 `inactive-value`，默认为 `Boolean` 类型 | `boolean \| string \| number` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 是否显示加载中 | `boolean` | `false` |
| size | switch 的大小 | `'large' \| 'default' \| 'small'` | `'default'` |
| width | switch 的宽度 | `number \| string` | — |
| inline-prompt | 图标或文本是否显示在点内，开启时文本最多呈现 3 个字符 | `boolean` | `false` |
| active-icon | switch 状态为 on 时所显示图标，设置此项会忽略 `active-text` | `string \| Component` | — |
| inactive-icon | switch 状态为 off 时所显示图标，设置此项会忽略 `inactive-text` | `string \| Component` | — |
| active-action-icon | on 状态下滑块内显示的图标组件 | `string \| Component` | — |
| inactive-action-icon | off 状态下滑块内显示的图标组件 | `string \| Component` | — |
| active-text | switch 打开时的文字描述 | `string` | — |
| inactive-text | switch 关闭时的文字描述 | `string` | — |
| active-value | switch 状态为 on 时的值 | `boolean \| string \| number` | `true` |
| inactive-value | switch 状态为 off 时的值 | `boolean \| string \| number` | `false` |
| name | switch 对应的 name 属性 | `string` | — |
| validate-event | 改变 switch 状态时是否触发表单的校验 | `boolean` | `true` |
| before-change | switch 状态改变前的钩子，返回 `false` 或者返回 `Promise` 且被 reject 则停止切换 | `() => Promise<boolean> \| boolean` | — |
| id | input 的 id | `string` | — |
| tabindex | input 的 tabindex | `string \| number` | — |
| aria-label | 等价于原生 input `aria-label` 属性 | `string` | — |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | switch 状态发生变化时的回调函数 | `(value: boolean \| string \| number) => void` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| active-action | 自定义打开状态下滑块（Action）的内容 |
| inactive-action | 自定义关闭状态下滑块（Action）的内容 |
| active | 自定义打开状态下的内容（inline-prompt 模式下在点内，否则在右侧） |
| inactive | 自定义关闭状态下的内容（inline-prompt 模式下在点内，否则在左侧） |

### Expose

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| focus | 使 Switch 获取焦点 | `() => void` |
| checked | Switch 是否选中 | `ComputedRef<boolean>` |

## 主题变量

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-switch-on-color` | 开启状态背景色 | `var(--yh-color-primary)` |
| `--yh-switch-off-color` | 关闭状态背景色 | `var(--yh-border-color)` |
| `--yh-switch-width` | 开关总宽度 | `40px` |
| `--yh-switch-height` | 开关总高度 | `20px` |
| `--yh-switch-button-size` | 滑块按钮大小 | `16px` |
| `--yh-switch-font-size` | 字体大小 | `var(--yh-font-size-base)` |
