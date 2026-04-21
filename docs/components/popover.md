<script setup lang="ts">
import { ref } from 'vue'
import { YhMessage } from '../../packages/components/src/message'

const visible = ref(false)

const tsBasic = `<template>
  <yh-popover 
    title="卡片标题" 
    content="这是一段非常精彩的卡片内容描述，支持自动换行和亚克力毛玻璃背景。"
  >
    <yh-button>基础用法</yh-button>
  </yh-popover>
</template>`

const jsBasic = tsBasic

const tsPlacement = `<template>
  <div class="demo-placement-container">
    <div class="top">
      <yh-popover title="提示" placement="top-start"><yh-button>top-start</yh-button></yh-popover>
      <yh-popover title="提示" placement="top"><yh-button>top</yh-button></yh-popover>
      <yh-popover title="提示" placement="top-end"><yh-button>top-end</yh-button></yh-popover>
    </div>
    <div class="middle">
      <div class="left">
        <yh-popover title="提示" placement="left-start"><yh-button>left-start</yh-button></yh-popover>
        <yh-popover title="提示" placement="left"><yh-button>left</yh-button></yh-popover>
        <yh-popover title="提示" placement="left-end"><yh-button>left-end</yh-button></yh-popover>
      </div>
      <div class="right">
        <yh-popover title="提示" placement="right-start"><yh-button>right-start</yh-button></yh-popover>
        <yh-popover title="提示" placement="right"><yh-button>right</yh-button></yh-popover>
        <yh-popover title="提示" placement="right-end"><yh-button>right-end</yh-button></yh-popover>
      </div>
    </div>
    <div class="bottom">
      <yh-popover title="提示" placement="bottom-start"><yh-button>bottom-start</yh-button></yh-popover>
      <yh-popover title="提示" placement="bottom"><yh-button>bottom</yh-button></yh-popover>
      <yh-popover title="提示" placement="bottom-end"><yh-button>bottom-end</yh-button></yh-popover>
    </div>
  </div>
</template>`

const jsPlacement = tsPlacement

const tsAligned = `<template>
  <div style="display: flex; gap: 16px">
    <yh-popover 
      title="结构化展示" 
      description="这是仿 Popconfirm 的结构化展示说明，支持图标与分段描述。"
      icon="info-filled"
      icon-color="#409eff"
    >
      <yh-button type="primary" plain>功能对齐示例</yh-button>
    </yh-popover>

    <yh-popover 
      title="警告提示" 
      description="检测到非法操作，请检查您的账户权限。"
      icon="warning-filled"
      icon-color="#f56c6c"
    >
      <yh-button type="danger" plain>警报风格</yh-button>
    </yh-popover>
  </div>
</template>`

const jsAligned = tsAligned

const tsTriggers = `<template>
  <div style="display: flex; gap: 16px">
    <yh-popover trigger="hover" title="Hover" content="用户悬停时触发"><yh-button plain>悬停</yh-button></yh-popover>
    <yh-popover trigger="click" title="Click" content="用户点击时触发"><yh-button plain>点击</yh-button></yh-popover>
    <yh-popover trigger="focus" title="Focus" content="元素获焦时触发"><yh-button plain>聚焦</yh-button></yh-popover>
    <yh-popover trigger="contextmenu" title="ContextMenu" content="用户右键时触发"><yh-button plain>右键</yh-button></yh-popover>
  </div>
</template>`

const jsTriggers = tsTriggers

const tsSlots = `<template>
  <yh-popover width="300">
    <yh-button type="primary">高级插槽内容</yh-button>
    
    <template #header>
      <div style="display: flex; align-items: center; gap: 8px; font-weight: bold; color: var(--yh-primary-color)">
        <yh-icon name="user" />
        用户信息详情
      </div>
    </template>

    <template #content>
      <div style="display: flex; gap: 12px; align-items: flex-start;">
        <img src="https://avatars.githubusercontent.com/u/1?v=4" style="width: 48px; height: 48px; border-radius: 50%" />
        <div>
          <p style="font-weight: 600; margin-bottom: 4px;">Senior Front-end Engineer</p>
          <p style="font-size: 13px; color: #86868b">高级前端架构师，专注于组件库性能优化与工程化建设。</p>
        </div>
      </div>
    </template>

    <template #footer>
      <div style="display: flex; gap: 12px;">
        <yh-button size="small" type="primary">了解更多</yh-button>
        <yh-button size="small">取消</yh-button>
      </div>
    </template>
  </yh-popover>
</template>`

const jsSlots = tsSlots

const tsManual = `<template>
  <yh-popover v-model:visible="visible" title="手动控制" content="外部点击按钮控制卡片可见性。">
    <yh-button @click="visible = !visible">
      控制显隐: {{ visible ? '隐藏' : '显示' }}
    </yh-button>
  </yh-popover>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
<\/script>`

const jsManual = tsManual.replace('lang="ts"', '')

const tsNuxt = `<template>
  <yh-popover 
    title="Nuxt 自动导入" 
    content="在 Nuxt 项目中，组件会自动导入，您可以直接使用而无需任何配置。"
  >
    <yh-button type="primary">Nuxt 示例</yh-button>
  </yh-popover>
</template>`

const jsNuxt = tsNuxt
</script>

# Popover 气泡卡片

展示比 Tooltip 更丰富的承载内容，常用于展示详细信息、表单提交或用户引导。

## 基础用法

通过 `title` 和 `content` 快速配置标准卡片。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
<div style="padding: 10px 0;">
<yh-popover title="卡片标题" content="这是一段非常精彩的卡片内容描述，支持自动换行和亚克力毛玻璃背景。"><yh-button>基础用法</yh-button></yh-popover>
</div>
</DemoBlock>

## 弹出位置

支持 12 个方向的弹出定位。

<DemoBlock title="弹出位置" :ts-code="tsPlacement" :js-code="jsPlacement">
<div class="demo-placement-container">
<div class="top">
<yh-popover title="提示" placement="top-start"><yh-button>top-start</yh-button></yh-popover>
<yh-popover title="提示" placement="top"><yh-button>top</yh-button></yh-popover>
<yh-popover title="提示" placement="top-end"><yh-button>top-end</yh-button></yh-popover>
</div>
<div class="middle">
<div class="left">
<yh-popover title="提示" placement="left-start"><yh-button>left-start</yh-button></yh-popover>
<yh-popover title="提示" placement="left"><yh-button>left</yh-button></yh-popover>
<yh-popover title="提示" placement="left-end"><yh-button>left-end</yh-button></yh-popover>
</div>
<div class="right">
<yh-popover title="提示" placement="right-start"><yh-button>right-start</yh-button></yh-popover>
<yh-popover title="提示" placement="right"><yh-button>right</yh-button></yh-popover>
<yh-popover title="提示" placement="right-end"><yh-button>right-end</yh-button></yh-popover>
</div>
</div>
<div class="bottom">
<yh-popover title="提示" placement="bottom-start"><yh-button>bottom-start</yh-button></yh-popover>
<yh-popover title="提示" placement="bottom"><yh-button>bottom</yh-button></yh-popover>
<yh-popover title="提示" placement="bottom-end"><yh-button>bottom-end</yh-button></yh-popover>
</div>
</div>
</DemoBlock>

<style>
.demo-placement-container { display: flex; flex-direction: column; align-items: center; padding: 20px 0; }
.demo-placement-container .top, .demo-placement-container .bottom { display: flex; gap: 10px; }
.demo-placement-container .middle { display: flex; justify-content: space-between; width: 450px; margin: 10px 0; }
.demo-placement-container .left, .demo-placement-container .right { display: flex; flex-direction: column; gap: 10px; width: 100px; }
</style>

## 功能对齐 (Popconfirm)

Popover 支持像 Popconfirm 一样配置结构化的内容，包括图标、标题和描述。

<DemoBlock title="功能对齐示例" :ts-code="tsAligned" :js-code="jsAligned">
<div style="padding: 10px 0; display: flex; gap: 16px;">
<yh-popover title="结构化展示" description="这是仿 Popconfirm 的结构化展示说明，支持图标与分段描述。" icon="info-filled" icon-color="#409eff"><yh-button type="primary" plain>功能对齐示例</yh-button></yh-popover>
<yh-popover title="警告提示" description="检测到非法操作，请检查您的账户权限。" icon="warning-filled" icon-color="#f56c6c"><yh-button type="danger" plain>警报风格</yh-button></yh-popover>
</div>
</DemoBlock>

## 触发方式

支持 `hover`、`click`、`focus`、`contextmenu` 多种触发方式。支持触发方式的组合，如 `['hover', 'click']`。

<DemoBlock title="触发方式" :ts-code="tsTriggers" :js-code="jsTriggers">
<div style="padding: 10px 0; display: flex; gap: 16px;">
<yh-popover trigger="hover" title="Hover" content="用户悬停时触发"><yh-button plain>悬停</yh-button></yh-popover>
<yh-popover trigger="click" title="Click" content="用户点击时触发"><yh-button plain>点击</yh-button></yh-popover>
<yh-popover trigger="focus" title="Focus" content="元素获焦时触发"><yh-button plain>聚焦</yh-button></yh-popover>
<yh-popover trigger="contextmenu" title="ContextMenu" content="用户右键时触发"><yh-button plain>右键</yh-button></yh-popover>
</div>
</DemoBlock>

## 高级插槽内容

支持 `header`、`content`、`footer` 和 `icon` 插槽，可实现极富表现力的复杂 UI。

<DemoBlock title="高级插槽内容" :ts-code="tsSlots" :js-code="jsSlots">
<div style="padding: 10px 0;">
<yh-popover width="300">
<yh-button type="primary">高级插槽内容</yh-button>
<template #header><div style="display: flex; align-items: center; gap: 8px; font-weight: bold;"><yh-icon name="user" />用户信息详情</div></template>
<template #content>
<div style="display: flex; gap: 12px; align-items: flex-start;">
<img src="https://avatars.githubusercontent.com/u/1?v=4" style="width: 48px; height: 48px; border-radius: 50%" />
<div>
<p style="font-weight: 600; margin-bottom: 4px;">Senior Front-end Engineer</p>
<p style="font-size: 13px; color: #86868b">高级前端架构师，专注于组件库性能优化与工程化建设。</p>
</div>
</div>
</template>
<template #footer><div style="display: flex; gap: 12px;"><yh-button size="small" type="primary">了解更多</yh-button><yh-button size="small">取消</yh-button></div></template>
</yh-popover>
</div>
</DemoBlock>

## 受控显隐

通过 `v-model:visible` 实现手动组件状态同步。

<DemoBlock title="手动控制" :ts-code="tsManual" :js-code="jsManual">
<div style="padding: 10px 0;">
<yh-popover v-model:visible="visible" title="手动控制" content="外部点击按钮控制卡片可见性。"><yh-button @click="visible = !visible">控制显隐: {{ visible ? '隐藏' : '显示' }}</yh-button></yh-popover>
</div>
</DemoBlock>

## 在 Nuxt 中使用

`Popover` 组件完全支持 Nuxt 3/4 的 SSR 渲染。在 Nuxt 项目中使用时，组件会自动导入，无需手动注册。

<DemoBlock title="Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="padding: 10px 0;">
    <yh-popover title="Nuxt 自动导入" content="在 Nuxt 项目中，组件会自动导入，您可以直接使用而无需任何配置。">
      <yh-button type="primary">Nuxt 示例</yh-button>
    </yh-popover>
  </div>
</DemoBlock>

**SSR 注意事项**：

- ✅ 完美支持服务端渲染 (SSR)，无水合错误
- ✅ 自动感知全局暗黑模式
- ✅ 支持所有的 Props 和 插槽
- ✅ 浮层容器自动 Teleport 至 body 确保层级正确

::: tip SSR 透明度
Popover 组件使用了 Backdrop-filter 亚克力效果，在 SSR 环境下会自动降级为纯色直到客户端激活，确保极致的载入性能。
:::

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `title` | 标题 | `string` | `undefined` |
| `description` | 描述文案，和 Popconfirm 对齐 | `string` | `undefined` |
| `icon` | 图标名称，和 Popconfirm 对齐 | `string` | `undefined` |
| `icon-color` | 图标颜色 | `string` | `undefined` |
| `content` | 内容文案 | `string` | `undefined` |
| `placement` | 浮层位置 | `Placement` | `'bottom'` |
| `trigger` | 触发方式 | `PopoverTrigger \| PopoverTrigger[]` | `'click'` |
| `visible` | 受控显隐状态 | `boolean \| null` | `null` |
| `effect` | 主题风格 | `'light' \| 'dark' \| string` | `'light'` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `show-arrow` | 是否显示箭头 | `boolean` | `true` |
| `show-after` | 显示延迟，单位毫秒 | `number` | `0` |
| `hide-after` | 隐藏延迟，单位毫秒 | `number` | `100` |
| `offset` | 浮层偏移量 | `[number, number]` | `[0, 12]` |
| `width` | 浮层宽度 | `string \| number` | `'auto'` |
| `max-height` | 最大高度 | `string \| number` | `'none'` |
| `scrollable` | 内容是否可滚动 | `boolean` | `false` |
| `interactive` | 鼠标移入浮层后是否保持显示 | `boolean` | `true` |
| `match-trigger-width` | 是否跟随触发器宽度 | `boolean` | `false` |
| `z-index` | 浮层层级 | `number` | `2003` |
| `teleported` | 是否挂载到 `body` | `boolean` | `true` |
| `popper-class` | 自定义浮层类名 | `string` | `''` |
| `popper-style` | 自定义浮层样式 | `StyleValue` | `{}` |
| `transition` | 过渡动画名称 | `string` | `'yh-popover-fade'` |
| `persistent` | 隐藏时是否保留 DOM | `boolean` | `true` |
| `theme-overrides` | 组件级主题变量覆盖 | `ComponentThemeVars` | `undefined` |

### Events

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| update:visible | 可见性状态改变时触发 | `(visible: boolean)` |
| show | 显示时触发 | - |
| hide | 隐藏时触发 | - |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 触发元素 |
| `header` | 自定义头部/标题内容 |
| `content` | 自定义主体内容 |
| `icon` | 自定义图标区域 |
| `footer` | 自定义底部操作区 |

### Expose

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| `toggle` | 手动切换显隐状态 | `(val: boolean) => boolean` |
| `visible` | 当前是否可见 | `Ref<boolean>` |

### 主题变量 (CSS Variables)

组件支持 `themeOverrides`，但源码没有定义专属的组件级 CSS 变量表，外观主要由共享浮层主题令牌构成。

---

**提示**: `Popover` 深度集成底层 `Tooltip` 引擎，支持 12 个方向弹出，并自然适配 Nuxt SSR 场景。

### 类型导出

| 名称 | 说明 |
| --- | --- |
| `YhPopoverProps` | 组件 Props 类型 |
| `YhPopoverEmits` | 组件事件类型 |
| `YhPopoverSlots` | 组件插槽类型 |
| `YhPopoverExpose` | 组件 expose 类型 |
| `YhPopoverTrigger` | 触发方式联合类型 |
| `YhPopoverInstance` | 组件实例类型 |
