<script setup lang="ts">
import { ref } from 'vue'
const disabled = ref(false)

const tsBasic = `<template>
  <yh-affix :offset="120">
    <yh-button type="primary">基础顶部固定 (120px)</yh-button>
  </yh-affix>
</template>`

const tsBottom = `<template>
  <yh-affix position="bottom" :offset="100">
    <yh-button type="success">智能底部固定 (100px)</yh-button>
  </yh-affix>
</template>`

const tsTeleport = `<template>
  <div style="transform: scale(0.9); padding: 40px; border: 1px dashed #ccc; border-radius: 8px;">
    <yh-affix :offset="200" teleported>
      <yh-button type="warning">Teleport 修复定位</yh-button>
    </yh-affix>
    <p style="margin-top: 100px; font-size: 13px; color: #666;">
      此容器具有样式缩放 (scale: 0.9)，普通固钉会错位，本组件通过 Teleport 完美兼容。
    </p>
  </div>
</template>`

const tsScoped = `<template>
  <yh-affix :offset="250">
    <template #default="{ fixed }">
      <yh-button :type="fixed ? 'danger' : 'primary'">
        {{ fixed ? '磁吸状态中' : '自由状态' }}
      </yh-button>
    </template>
  </yh-affix>
</template>`

const tsDisabled = `<template>
  <yh-button @click="disabled = !disabled" style="margin-bottom: 30px;">
    {{ disabled ? '启用' : '禁用' }} 固钉
  </yh-button>
  <yh-affix :offset="300" :disabled="disabled">
    <yh-button type="info">可随时禁用的固钉</yh-button>
  </yh-affix>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const disabled = ref(false)
<\/script>`

const tsNuxt = `<template>
  <yh-affix :offset="140" teleported>
    <yh-button type="success">Nuxt SSR 完美兼容 (140px)</yh-button>
  </yh-affix>
  <p style="margin-top: 10px; font-size: 13px; color: #666;">
    在 Nuxt 环境下，开启 teleported 可获得最稳健的定位表现。
  </p>
</template>`

const jsBasic = tsBasic
const jsBottom = tsBottom
const jsTeleport = tsTeleport
const jsScoped = tsScoped
const jsDisabled = tsDisabled.replace('lang="ts"', '').replace('const disabled = ref(false)', 'const disabled = ref(false)')
const jsNuxt = tsNuxt
</script>

# Affix 固钉 (Next-Gen)

基于物理引擎算法与浏览器原生观察期的高性能固钉组件。功能与性能全面超越业界标准。

## 性能架构设计 (Surpassing Engine)

YhAffix 采用了双层观察系统：
- **IntersectionObserver**: 引擎会自动监听元素与触发区的距离。当元素距离视口触发点超过 500px 时，自动切断所有高频计算，实现极致省电。
- **ResizeObserver**: 深度观察占位符、内容物、目标容器三方的尺寸裂变，确保异步内容加载时零抖动。

---

## 基础用法

设置偏移量，享受极速磁吸反馈。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
<div style="padding: 10px 0;">
  <yh-affix :offset="120">
    <yh-button type="primary">基础顶部固定 (120px)</yh-button>
  </yh-affix>
</div>
</DemoBlock>

## 智能底部固定

`position="bottom"` 模式下，组件会自动感知视口底部。

<DemoBlock title="底部固定" :ts-code="tsBottom" :js-code="jsBottom">
<div style="padding: 100px 0; text-align: center;">
  <p style="margin-bottom: 20px; color: var(--yh-color-text-secondary);">滚动查看 100px 偏移的底部吸附</p>
  <yh-affix position="bottom" :offset="100">
    <yh-button type="success">智能底部固定 (100px)</yh-button>
  </yh-affix>
  <div style="height: 1200px;"></div>
</div>
</DemoBlock>

## 穿透定位 (Teleport)

**核心突破**：针对传统 `fixed` 定位在拥有 `transform`, `filter`, `perspective` 属性的父容器下失效的问题，YhAffix 支持 `teleported` 属性。它会将渲染节点传送至 `body`，并通过坐标射影算法保持视觉位置的完美对齐。

<DemoBlock title="Teleport 穿透" :ts-code="tsTeleport" :js-code="jsTeleport">
<div style="transform: scale(0.9); padding: 40px; border: 1px dashed var(--yh-border-color); border-radius: 8px;">
  <yh-affix :offset="200" teleported>
    <yh-button type="warning">Teleport 修复定位</yh-button>
  </yh-affix>
  <p style="margin-top: 100px; font-size: 13px; color: var(--yh-color-text-secondary);">
    此容器具有样式缩放 (scale: 0.9)，普通固钉会错位，本组件通过 Teleport 完美兼容。
  </p>
</div>
</DemoBlock>

## 状态插槽 (Scoped Slot)

支持通过作用域插槽实时获取固定状态，实现更复杂的 UI 联动逻辑。

<DemoBlock title="作用域插槽" :ts-code="tsScoped" :js-code="jsScoped">
<div style="padding: 10px 0;">
  <yh-affix :offset="250">
    <template #default="{ fixed }">
      <yh-button :type="fixed ? 'danger' : 'primary'">
        {{ fixed ? '磁吸状态中' : '自由状态' }}
      </yh-button>
    </template>
  </yh-affix>
</div>
</DemoBlock>

## 动态禁用

通过 `disabled` 属性一键接管状态，适用于权限控制或复杂的动态交互场景。

<DemoBlock title="动态禁用" :ts-code="tsDisabled" :js-code="jsDisabled">
<div style="padding: 20px 0;">
  <yh-button @click="disabled = !disabled" style="margin-bottom: 30px;">
    {{ disabled ? '启用' : '禁用' }} 固钉
  </yh-button>
  <yh-affix :offset="300" :disabled="disabled">
    <yh-button type="info">可随时禁用的固钉</yh-button>
  </yh-affix>
</div>
</DemoBlock>

## 在 Nuxt 中使用

`YhAffix` 完美支持 Nuxt 3/4 的 SSR 渲染。由于固钉依赖于浏览器窗口坐标，组件内部已经处理好客户端激活逻辑，您可以放心使用。

**最佳实践**：在 Nuxt 项目中，页面通常嵌套在 `NuxtLayout` 或各种层级复杂的动画组件中。建议启用 `teleported` 属性，这能确保固钉元素在 DOM 树中被提升至根节点，避开任何中间层级的样式干扰。

<DemoBlock title="Nuxt SSR 支持" :ts-code="tsNuxt" :js-code="jsNuxt">
<div id="nuxt-demo-wrapper" style="padding: 10px 0;">
  <yh-affix :offset="140" teleported>
    <yh-button type="success">Nuxt SSR 完美兼容 (140px)</yh-button>
  </yh-affix>
  <p style="font-size: 13px; color: var(--yh-color-text-secondary); margin-top: 10px;">
    在 Nuxt 环境下，开启 teleported 可获得最稳健的定位表现。
  </p>
</div>
</DemoBlock>

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| offset | 触发固定的偏移距离 | `number` | `0` |
| position | 固钉位置 | `'top' \| 'bottom'` | `'top'` |
| target | 目标容器选择器。在此容器外将停止固定 | `string` | — |
| z-index | 固定时的层级 | `number` | `100` |
| teleported | 是否传送至指定节点渲染，解决父级 transform 定位失效问题 | `boolean` | `false` |
| append-to | 指定传送的目标容器节点，需配合 `teleported` 使用 | `string \| HTMLElement` | `'body'` |
| disabled | 是否禁用组件 | `boolean` | `false` |
| affix-style | 额外透传给固定容器的样式 | `CSSProperties` | `{}` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 固定状态改变时触发 | `(fixed: boolean)` |
| scroll | 滚动时实时触发 | `(payload: { scrollTop: number, fixed: boolean })` |

### Slots

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| default | 需要固定的内容插槽 | `{ fixed: boolean }` |

### Expose

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| update | 手动触发位置计算与状态更新 | `() => void` |
| fixed | 当前是否处于固定状态 | `Ref<boolean>` |
| scrollTop | 当前滚动容器的垂直滚动距离 | `Ref<number>` |

### 主题变量 (CSS Variables)

所有颜色变量已与全局主题系统对接，自动支持暗黑模式：

| 变量名 | 默认值 | 说明 |
| --- | --- | --- |
| `--yh-affix-z-index` | `100` | 固定状态下的默认层级 |
| `--yh-affix-bg-color` | `var(--yh-bg-color-overlay)` | 固钉内容背景色 |
| `--yh-affix-shadow` | `var(--yh-shadow-md)` | 固定状态下的阴影效果 |
| `--yh-affix-transition-duration` | `var(--yh-transition-duration)` | 进入固定状态时的动画持续时间 |
| `--yh-affix-transition-timing` | `var(--yh-transition-timing)` | 动画过渡曲线 |
