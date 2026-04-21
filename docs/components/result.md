# Result 结果

用于反馈一系列操作或任务的处理结果。

<script setup lang="ts">
import { ref, computed } from 'vue'

const tsBasic = `<template>
  <yh-result
    icon="success"
    title="操作成功"
    sub-title="您的订单已提交成功，预计 3-5 个工作日送达。"
  >
    <yh-button type="primary">返回首页</yh-button>
  </yh-result>
<\/template>`

const jsBasic = tsBasic

const tsTypes = `<template>
  <yh-space direction="vertical" :size="40" fill>
    <yh-result icon="success" title="成功" sub-title="提交成功" />
    <yh-result icon="warning" title="警告" sub-title="请注意此次操作" />
    <yh-result icon="error" title="错误" sub-title="提交失败，请重试" />
    <yh-result icon="info" title="信息" sub-title="这是一条提示信息" />
  </yh-space>
<\/template>`

const jsTypes = tsTypes

const tsCustom = `<template>
  <yh-result title="404" sub-title="抱歉，您访问的页面不存在">
    <template #icon>
      <span style="font-size: 72px;">📄</span>
    </template>
    <template #extra>
      <p style="color: var(--yh-text-color-secondary);">
        请检查 URL 是否正确，或返回首页。
      </p>
    </template>
    <yh-button type="primary">返回首页</yh-button>
    <yh-button>联系客服</yh-button>
  </yh-result>
<\/template>`

const jsCustom = tsCustom

const tsNuxt = `<template>
  <div>
    <div style="display: flex; gap: 8px; margin-bottom: 24px; justify-content: center;">
      <yh-button :type="code === 404 ? 'primary' : 'default'" @click="code = 404">模拟 404</yh-button>
      <yh-button :type="code === 403 ? 'primary' : 'default'" @click="code = 403">模拟 403</yh-button>
      <yh-button :type="code === 500 ? 'primary' : 'default'" @click="code = 500">模拟 500</yh-button>
    </div>

    <yh-result
      :icon="resultIcon"
      :title="String(code)"
      :sub-title="resultSubTitle"
    >
      <yh-button type="primary" @click="handleClear">返回首页</yh-button>
      <yh-button style="margin-left: 8px;" @click="handleBack">返回上一页</yh-button>
    </yh-result>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const code = ref(404)

const resultIcon = computed(() => {
  if (code.value === 404) return 'warning'
  if (code.value === 403) return 'error'
  return 'info'
})

const resultSubTitle = computed(() => {
  if (code.value === 404) return '抱歉，您访问的页面不存在'
  if (code.value === 403) return '抱歉，您没有权限访问该页面'
  return '页面发生了未知错误，请稍后重试'
})

const handleClear = () => clearError({ redirect: '/' })
const handleBack = () => clearError({ redirect: -1 })
<\/script>`

const jsNuxt = tsNuxt.replace('lang="ts"', '')

const resultErrorCode = ref(404)
const previewIcon = computed(() => {
  if (resultErrorCode.value === 404) return 'warning'
  if (resultErrorCode.value === 403) return 'error'
  return 'info'
})
const previewTitle = computed(() => String(resultErrorCode.value))
const previewSubTitle = computed(() => {
  if (resultErrorCode.value === 404) return '抱歉，您访问的页面不存在'
  if (resultErrorCode.value === 403) return '抱歉，您没有权限访问该页面'
  return '页面发生了未知错误，请稍后重试'
})
</script>

## 基础用法

通过 `icon`、`title` 和 `sub-title` 展示标准结果页。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <yh-result
    icon="success"
    title="操作成功"
    sub-title="您的订单已提交成功，预计 3-5 个工作日送达。"
  >
    <yh-button type="primary">返回首页</yh-button>
  </yh-result>
</DemoBlock>

## 不同状态

通过 `icon` 切换 `success`、`warning`、`error`、`info` 四种状态。

<DemoBlock title="不同状态" :ts-code="tsTypes" :js-code="jsTypes">
  <yh-space direction="vertical" :size="40" fill>
    <yh-result icon="success" title="成功" sub-title="提交成功" />
    <yh-result icon="warning" title="警告" sub-title="请注意此次操作" />
    <yh-result icon="error" title="错误" sub-title="提交失败，请重试" />
    <yh-result icon="info" title="信息" sub-title="这是一条提示信息" />
  </yh-space>
</DemoBlock>

## 自定义内容

通过 `icon`、`extra` 等插槽自定义结果页内容，默认插槽通常用于放置操作按钮。

<DemoBlock title="自定义内容" :ts-code="tsCustom" :js-code="jsCustom">
  <yh-result title="404" sub-title="抱歉，您访问的页面不存在">
    <template #icon>
      <span style="font-size: 72px;">📄</span>
    </template>
    <template #extra>
      <p style="color: var(--yh-text-color-secondary);">
        请检查 URL 是否正确，或返回首页。
      </p>
    </template>
    <yh-button type="primary">返回首页</yh-button>
    <yh-button>联系客服</yh-button>
  </yh-result>
</DemoBlock>

## 在 Nuxt 中使用

`YhResult` 在 Nuxt 3/4 中可直接作为常规页面反馈组件使用，也适合放入 `error.vue` 这类全局错误页。

<DemoBlock title="在 Nuxt 中使用（模拟 error.vue）" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div>
    <div style="display: flex; gap: 8px; margin-bottom: 24px; justify-content: center;">
      <yh-button
        :type="resultErrorCode === 404 ? 'primary' : 'default'"
        @click="resultErrorCode = 404"
      >模拟 404</yh-button>
      <yh-button
        :type="resultErrorCode === 403 ? 'primary' : 'default'"
        @click="resultErrorCode = 403"
      >模拟 403</yh-button>
      <yh-button
        :type="resultErrorCode === 500 ? 'primary' : 'default'"
        @click="resultErrorCode = 500"
      >模拟 500</yh-button>
    </div>
    <yh-result
      :icon="previewIcon"
      :title="previewTitle"
      :sub-title="previewSubTitle"
    >
      <yh-button type="primary">返回首页</yh-button>
      <yh-button style="margin-left: 8px;">返回上一页</yh-button>
    </yh-result>
  </div>
</DemoBlock>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `title` | 标题 | `string` | `undefined` |
| `sub-title` | 副标题 | `string` | `undefined` |
| `icon` | 状态图标类型 | `'success' \| 'warning' \| 'error' \| 'info'` | `'info'` |
| `theme-overrides` | 组件级主题变量覆盖 | `ComponentThemeVars` | `undefined` |

### Events

当前组件未暴露组件事件。

### Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 操作区内容 |
| `icon` | 自定义图标内容 |
| `title` | 自定义标题内容 |
| `sub-title` | 自定义副标题内容 |
| `extra` | 额外内容区域，位于副标题与操作区之间 |

### Expose

当前组件未暴露公开实例方法或属性。

## 主题变量

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-result-padding` | 容器内边距 | `40px 30px` |
| `--yh-result-icon-size` | 图标尺寸 | `72px` |
| `--yh-result-icon-margin` | 图标底部间距 | `20px` |
| `--yh-result-title-size` | 标题字号 | `20px` |
| `--yh-result-title-color` | 标题颜色 | `var(--yh-text-color-primary, #303133)` |
| `--yh-result-subtitle-size` | 副标题字号 | `14px` |
| `--yh-result-subtitle-color` | 副标题颜色 | `var(--yh-text-color-secondary, #909399)` |

### 类型导出

| 名称 | 说明 |
| --- | --- |
| `YhResultProps` | 组件 Props 类型 |
| `YhResultSlots` | 组件插槽类型 |
| `YhResultIconType` | 结果图标联合类型 |
| `YhResultInstance` | 组件实例类型 |
