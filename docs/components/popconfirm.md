<script setup lang="ts">
import { ref } from 'vue'
import { YhMessage } from '../../packages/components/src/message'

// --- 全量对齐的代码示例字符串 (确保用户复制代码即所得) ---
const tsBasic = `<template>
  <yh-popconfirm title="确定要执行此操作吗？" @confirm="onConfirm">
    <yh-button type="danger">基础用法</yh-button>
  </yh-popconfirm>
</template>

<script setup lang="ts">
import { YhMessage } from 'yh-ui'
const onConfirm = () => YhMessage.success('操作成功')
<\/script>`

const tsPlacement = `<template>
  <div class="demo-placement-container">
    <div class="top">
      <yh-popconfirm title="提示" placement="top-start"><yh-button>top-start</yh-button></yh-popconfirm>
      <yh-popconfirm title="提示" placement="top"><yh-button>top</yh-button></yh-popconfirm>
      <yh-popconfirm title="提示" placement="top-end"><yh-button>top-end</yh-button></yh-popconfirm>
    </div>
    <div class="middle">
      <div class="left">
        <yh-popconfirm title="提示" placement="left-start"><yh-button>left-start</yh-button></yh-popconfirm>
        <yh-popconfirm title="提示" placement="left"><yh-button>left</yh-button></yh-popconfirm>
        <yh-popconfirm title="提示" placement="left-end"><yh-button>left-end</yh-button></yh-popconfirm>
      </div>
      <div class="right">
        <yh-popconfirm title="提示" placement="right-start"><yh-button>right-start</yh-button></yh-popconfirm>
        <yh-popconfirm title="提示" placement="right"><yh-button>right</yh-button></yh-popconfirm>
        <yh-popconfirm title="提示" placement="right-end"><yh-button>right-end</yh-button></yh-popconfirm>
      </div>
    </div>
    <div class="bottom">
      <yh-popconfirm title="提示" placement="bottom-start"><yh-button>bottom-start</yh-button></yh-popconfirm>
      <yh-popconfirm title="提示" placement="bottom"><yh-button>bottom</yh-button></yh-popconfirm>
      <yh-popconfirm title="提示" placement="bottom-end"><yh-button>bottom-end</yh-button></yh-popconfirm>
    </div>
  </div>
</template>`

const tsPersonalized = `<template>
  <div style="display: flex; gap: 16px">
    <yh-popconfirm 
      title="确定要重置配置吗？" 
      confirm-button-text="重置"
      cancel-button-text="保留"
      confirm-button-type="danger"
      icon="warning"
      icon-color="#f56c6c"
    >
      <yh-button type="danger" plain>自定义配置</yh-button>
    </yh-popconfirm>

    <yh-popconfirm title="提示" hide-icon>
      <yh-button plain>无图标模式</yh-button>
    </yh-popconfirm>

    <yh-popconfirm title="确定删除？" hide-cancel>
      <yh-button type="info" plain>隐藏取消</yh-button>
    </yh-popconfirm>
  </div>
</template>`

const tsAdvanced = `<template>
  <div style="display: flex; gap: 16px">
    <yh-popconfirm title="按钮反置" swap-buttons confirm-button-text="下一步">
      <yh-button>按钮反向布局</yh-button>
    </yh-popconfirm>

    <yh-popconfirm 
      title="不再提示" 
      show-dont-ask-again 
      @confirm="onConfirm"
    >
      <yh-button type="warning">不再提示功能</yh-button>
    </yh-popconfirm>
  </div>
</template>

<script setup lang="ts">
import { YhMessage } from 'yh-ui'

const onConfirm = (isSet: boolean) => {
  if (isSet === true) {
    YhMessage.success('已记录：下次不再提示')
  } else {
    YhMessage.success('确认操作成功')
  }
}
<\/script>`

const tsAsync = `<template>
  <yh-popconfirm 
    title="数据同步中" 
    :before-confirm="onBeforeConfirm"
  >
    <yh-button type="primary">异步拦截示例</yh-button>
  </yh-popconfirm>
</template>

<script setup lang="ts">
import { YhMessage } from 'yh-ui'
const onBeforeConfirm = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      YhMessage.success('异步同步完成')
      resolve(true)
    }, 2000)
  })
}
<\/script>`

const tsSlots = `<template>
  <yh-popconfirm width="280">
    <yh-button type="primary">高级内容插槽</yh-button>
    
    <template #title>
      <div style="display: flex; align-items: center; gap: 6px; font-weight: bold;">
        <yh-icon name="warning" color="#faad14" />
        系统更新提醒
      </div>
    </template>

    <template #description>
      <div style="margin-top: 8px;">
        <p style="margin-bottom: 8px; font-size: 13px;">检测到新版本 v2.2.0，建议立即升级以获得更佳的亚克力背景体验。</p>
        <div style="display: flex; gap: 8px;">
          <yh-tag size="small" type="info">v2.1</yh-tag>
          <span>→</span>
          <yh-tag size="small" type="success">v2.2.0</yh-tag>
        </div>
      </div>
    </template>
  </yh-popconfirm>
</template>`

const tsArrow = `<template>
  <div style="display: flex; gap: 16px">
    <yh-popconfirm title="默认显示小三角">
      <yh-button>显示三角</yh-button>
    </yh-popconfirm>

    <yh-popconfirm title="已隐藏小三角" :show-arrow="false">
      <yh-button type="info" plain>隐藏三角</yh-button>
    </yh-popconfirm>
  </div>
</template>`

const tsTheme = `<template>
  <yh-popconfirm 
    title="品牌配色预览" 
    description="通过自定义 CSS 变量轻松对齐品牌视觉。"
    :popper-style="{
      '--yh-tooltip-bg-color': '#f5f3ff',
      '--yh-popconfirm-title': '#5b21b6',
      '--yh-popconfirm-desc': '#7c3aed',
      '--yh-tooltip-border-color': '#ddd6fe'
    }"
  >
    <yh-button type="primary" plain>品牌主题示例</yh-button>
  </yh-popconfirm>
</template>`

const tsNuxt = `<template>
  <yh-popconfirm title="Nuxt SSR 友好确认框">
    <yh-button type="success" plain>Nuxt 3 已就绪</yh-button>
  </yh-popconfirm>
</template>`

const jsBasic = tsBasic.replace(/lang="ts"/g, '').replace(/<script setup>/g, '<script setup>')
const jsPlacement = tsPlacement
const jsPersonalized = tsPersonalized
const jsAdvanced = tsAdvanced.replace(/lang="ts"/g, '')
const jsAsync = tsAsync.replace(/lang="ts"/g, '')
const jsSlots = tsSlots
const jsArrow = tsArrow
const jsTheme = tsTheme
const jsNuxt = tsNuxt

// --- 实际环境运行逻辑 (同步名称与文字内容) ---
const onConfirm = (isSet: boolean) => {
  if (isSet === true) {
    YhMessage.success('已记录：下次不再提示')
  } else {
    YhMessage.success('确认操作成功')
  }
}

const onBeforeConfirm = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      YhMessage.success('异步同步完成')
      resolve(true)
    }, 2000)
  })
}
</script>

# Popconfirm 气泡确认框

点击元素弹出气泡内容，进行二次确认。常用于危险提示、重要开关等场景。

## 基础用法

通过 `title` 配置简单的提示信息。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="padding: 10px 0;">
    <yh-popconfirm title="确定要执行此操作吗？" @confirm="() => onConfirm(false)">
      <yh-button type="danger">基础用法</yh-button>
    </yh-popconfirm>
  </div>
</DemoBlock>

## 弹出位置

支持 12 个方向的弹出定位，通过 `placement` 属性控制。

<DemoBlock title="弹出位置" :ts-code="tsPlacement" :js-code="jsPlacement">
  <div class="demo-placement-container">
    <div class="top">
      <yh-popconfirm title="提示" placement="top-start"><yh-button>top-start</yh-button></yh-popconfirm>
      <yh-popconfirm title="提示" placement="top"><yh-button>top</yh-button></yh-popconfirm>
      <yh-popconfirm title="提示" placement="top-end"><yh-button>top-end</yh-button></yh-popconfirm>
    </div>
    <div class="middle">
      <div class="left">
        <yh-popconfirm title="提示" placement="left-start"><yh-button>left-start</yh-button></yh-popconfirm>
        <yh-popconfirm title="提示" placement="left"><yh-button>left</yh-button></yh-popconfirm>
        <yh-popconfirm title="提示" placement="left-end"><yh-button>left-end</yh-button></yh-popconfirm>
      </div>
      <div class="right">
        <yh-popconfirm title="提示" placement="right-start"><yh-button>right-start</yh-button></yh-popconfirm>
        <yh-popconfirm title="提示" placement="right"><yh-button>right</yh-button></yh-popconfirm>
        <yh-popconfirm title="提示" placement="right-end"><yh-button>right-end</yh-button></yh-popconfirm>
      </div>
    </div>
    <div class="bottom">
      <yh-popconfirm title="提示" placement="bottom-start"><yh-button>bottom-start</yh-button></yh-popconfirm>
      <yh-popconfirm title="提示" placement="bottom"><yh-button>bottom</yh-button></yh-popconfirm>
      <yh-popconfirm title="提示" placement="bottom-end"><yh-button>bottom-end</yh-button></yh-popconfirm>
    </div>
  </div>
</DemoBlock>

<style>
.demo-placement-container { display: flex; flex-direction: column; align-items: center; padding: 20px 0; }
.demo-placement-container .top, .demo-placement-container .bottom { display: flex; gap: 10px; }
.demo-placement-container .middle { display: flex; justify-content: space-between; width: 450px; margin: 10px 0; }
.demo-placement-container .left, .demo-placement-container .right { display: flex; flex-direction: column; gap: 10px; width: 100px; }
</style>

## 个性化配置

自由定制按钮文字、类型或隐藏特定元素。

<DemoBlock title="个性化配置" :ts-code="tsPersonalized" :js-code="jsPersonalized">
  <div style="padding: 10px 0; display: flex; gap: 16px;"><yh-popconfirm title="确定要重置吗？" confirm-button-text="重置" cancel-button-text="保留" confirm-button-type="danger" icon="warning" icon-color="#f56c6c"><yh-button type="danger" plain>自定义配置</yh-button></yh-popconfirm><yh-popconfirm title="提示" hide-icon><yh-button plain>无图标</yh-button></yh-popconfirm><yh-popconfirm title="确定删除？" hide-cancel><yh-button type="info" plain>隐藏取消</yh-button></yh-popconfirm></div>
</DemoBlock>

## 高级特性

YH-UI 独有的“按钮位置反置”和“不再提示”状态反馈。

<DemoBlock title="高级特性" :ts-code="tsAdvanced" :js-code="jsAdvanced">
  <div style="padding: 10px 0; display: flex; gap: 16px;"><yh-popconfirm title="按钮反置" swap-buttons confirm-button-text="下一步"><yh-button>按钮反向布局</yh-button></yh-popconfirm><yh-popconfirm title="不再提示" show-dont-ask-again @confirm="onConfirm"><yh-button type="warning">不再提示功能</yh-button></yh-popconfirm></div>
</DemoBlock>

## 异步关闭

结合 `before-confirm` 属性轻松实现接口拦截逻辑。

<DemoBlock title="异步拦截" :ts-code="tsAsync" :js-code="jsAsync">
  <div style="padding: 10px 0;">
    <yh-popconfirm title="数据异步同步中" :before-confirm="onBeforeConfirm">
      <yh-button type="primary">异步拦截示例</yh-button>
    </yh-popconfirm>
  </div>
</DemoBlock>

## 自定义插槽

支持通过 `title` 和 `description` 插槽自定义复杂的富文本内容。

<DemoBlock title="复杂内容插槽" :ts-code="tsSlots" :js-code="jsSlots">
  <div style="padding: 10px 0;">
    <yh-popconfirm width="280">
      <yh-button type="primary">高级内容插槽</yh-button>
      <template #title>
        <div style="display: flex; align-items: center; gap: 6px; font-weight: bold;">
          <yh-icon name="warning" color="#faad14" />
          系统更新提醒
        </div>
      </template>
      <template #description>
        <div style="margin-top: 8px;">
          <p style="margin-bottom: 8px; font-size: 13px;">检测到新版本 v2.2.0，建议立即升级以获得更佳的亚克力背景体验。</p>
          <div style="display: flex; gap: 8px;">
            <yh-tag size="small" type="info">v2.1</yh-tag>
            <span>→</span>
            <yh-tag size="small" type="success">v2.2.0</yh-tag>
          </div>
        </div>
      </template>
    </yh-popconfirm>
  </div>
</DemoBlock>

## 隐藏小三角

可以通过 `show-arrow` 属性控制气泡框是否显示指示三角。

<DemoBlock title="小三角展示" :ts-code="tsArrow" :js-code="jsArrow">
  <div style="padding: 10px 0; display: flex; gap: 16px;">
    <yh-popconfirm title="默认显示小三角">
      <yh-button>显示三角</yh-button>
    </yh-popconfirm>
    <yh-popconfirm title="已隐藏小三角" :show-arrow="false">
      <yh-button type="info" plain>隐藏三角</yh-button>
    </yh-popconfirm>
  </div>
</DemoBlock>

## 主题外观

通过修改 CSS 变量，可以轻松实现组件的样式定制。例如，通过 `popper-style` 覆盖局部的主题变量。

<DemoBlock title="主题定制" :ts-code="tsTheme" :js-code="jsTheme">
  <div style="padding: 10px 0;">
    <yh-popconfirm 
      title="品牌配色预览" 
      description="通过自定义 CSS 变量轻松对齐品牌视觉。"
      :popper-style="{
        '--yh-tooltip-bg-color': '#f5f3ff',
        '--yh-popconfirm-title': '#5b21b6',
        '--yh-popconfirm-desc': '#7c3aed',
        '--yh-tooltip-border-color': '#ddd6fe'
      }"
    >
      <yh-button type="primary" plain>品牌主题示例</yh-button>
    </yh-popconfirm>
  </div>
</DemoBlock>

## 在 Nuxt 中使用

`YhPopconfirm` 完美支持 Nuxt 3。得益于基于 Tooltip 的极速定位引擎，在 SSR 环境下依然具有极佳的表现。

<DemoBlock title="Nuxt 开发演示" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div style="padding: 10px 0;">
    <yh-popconfirm title="Nuxt 3 已就绪">
      <yh-button type="success" plain>Nuxt 示例按钮</yh-button>
    </yh-popconfirm>
  </div>
</DemoBlock>

只需在 `nuxt.config.ts` 加入模块配置：
```ts
export default defineNuxtConfig({ modules: ['@yh-ui/nuxt'] })
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | string | - |
| description | 描述内容 | string | - |
| confirm-button-text | 确认按钮文字 | string | `确定` |
| cancel-button-text | 取消按钮文字 | string | `取消` |
| confirm-button-type | 确认按钮类型 | string | `primary` |
| cancel-button-type | 取消按钮类型 | string | `default` |
| icon | 图标名称 | string | `warning` |
| icon-color | 图标颜色 | string | `#faad14` |
| hide-icon | 是否隐藏图标 | boolean | `false` |
| hide-cancel | 是否隐藏取消按钮 | boolean | `false` |
| width | 宽度 | string / number | `180` |
| placement | 出现位置 | `TooltipPlacement` | `'top'` |
| visible | 手动控制可见性 | `boolean \| null` | `null` |
| offset | 偏移量 [skidding, distance] | array | `[0, 12]` |
| disabled | 是否禁用 | boolean | `false` |
| show-arrow | 是否显示小三角 | boolean | `true` |
| teleported | 是否挂载至 body | boolean | `true` |
| z-index | 层级 | number | `2000` |
| popper-class | 自定义弹出层类名 | string | - |
| popper-style | 自定义弹出层样式 | object | `{}` |
| before-confirm | 确认前的生命周期钩子 | function | - |
| swap-buttons | 是否交换按钮位置 | boolean | `false` |
| show-dont-ask-again | 是否显示不再提示勾选框 | boolean | `false` |
| dont-ask-again-text | “不再提示”的文本内容 | string | `不再提示` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 触发弹出层的目标元素 |
| icon | 自定义图标 |
| title | 自定义标题 |
| description | 自定义描述内容 |

### Events

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| confirm | 点击确认按钮触发 | `(isSet: boolean)` |
| cancel | 点击取消按钮触发 | - |
| update:visible | 可见性状态改变时触发 | `(visible: boolean)` |

### 主题变量 (CSS Variables)

| 变量名 | 默认值 | 描述 |
| --- | --- | --- |
| `--yh-popconfirm-title` | `#1d1d1f` | 标题文字颜色 |
| `--yh-popconfirm-desc` | `#424245` | 描述文字颜色 |
| `--yh-tooltip-bg-color` | `rgba(255, 255, 255, 0.88)` | 气泡背景色 |
| `--yh-tooltip-border-color` | `rgba(0, 0, 0, 0.08)` | 气泡边框颜色 |
