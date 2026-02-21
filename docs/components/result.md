# Result 结果

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
    <yh-result icon="warning" title="警告" sub-title="请注意此操作" />
    <yh-result icon="error" title="错误" sub-title="提交失败，请重试" />
    <yh-result icon="info" title="信息" sub-title="这是一条提示信息" />
  </yh-space>
<\/template>`

const jsTypes = tsTypes

const tsCustom = `<template>
  <yh-result title="404" sub-title="抱歉，您访问的页面不存在">
    <template #icon>
      <span style="font-size: 72px;">🔍</span>
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

// Nuxt 使用示例（以 error.vue 为例演示状态切换）
const tsNuxt = `<template>
  <div>
    <!-- 模拟切换不同错误状态的控制按钮（仅用于演示） -->
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

// 这里的 code 模拟了 error.value?.statusCode
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

// clearError 清除错误状态并完成跳转
const handleClear = () => clearError({ redirect: '/' })
const handleBack = () => clearError({ redirect: -1 })
<\/script>`

const jsNuxt = tsNuxt
  .replace('lang="ts"', '')

// 文档内预览用的模拟错误状态
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

用于反馈一系列操作任务的处理结果。

## 基础用法

最简单的使用方式，设置 `icon`、`title` 和 `sub-title` 属性。

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

通过 `icon` 属性设置不同的状态图标：`success`、`warning`、`error`、`info`。

<DemoBlock title="不同状态" :ts-code="tsTypes" :js-code="jsTypes">
  <yh-space direction="vertical" :size="40" fill>
    <yh-result icon="success" title="成功" sub-title="提交成功" />
    <yh-result icon="warning" title="警告" sub-title="请注意此操作" />
    <yh-result icon="error" title="错误" sub-title="提交失败，请重试" />
    <yh-result icon="info" title="信息" sub-title="这是一条提示信息" />
  </yh-space>
</DemoBlock>

## 自定义内容

通过 `#icon`、`#extra` 插槽自定义图标和额外内容区域。默认插槽用于放置操作按钮。

<DemoBlock title="自定义内容" :ts-code="tsCustom" :js-code="jsCustom">
  <yh-result title="404" sub-title="抱歉，您访问的页面不存在">
    <template #icon>
      <span style="font-size: 72px;">🔍</span>
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

Result 组件完全支持 Nuxt 3/4 的 SSR 渲染。以下示例展示了在 Nuxt 中将 Result 用作 **`error.vue` 全局错误页**，结合 `useError`、`clearError` 等 Nuxt 专属 API 动态响应不同的 HTTP 错误码。

<DemoBlock title="Nuxt 中使用（模拟 error.vue）" :ts-code="tsNuxt" :js-code="jsNuxt">
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

**SSR 注意事项**：

- ✅ 所有 Props 和样式完全支持
- ✅ SVG 图标正确渲染
- ✅ 插槽内容（icon、title、sub-title、extra、default）完整渲染
- ✅ 可作为 Nuxt 的 `error.vue` 错误页面使用
- ✅ 动态状态（icon 类型切换）正常工作

::: tip SSR 安全性
Result 组件已通过完整的 SSR 测试，确保服务端和客户端渲染完全一致，Hydration 无错误。
:::

## API

### Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `string` | — |
| subTitle | 副标题 | `string` | — |
| icon | 图标类型 | `'success' \| 'warning' \| 'error' \| 'info'` | `'info'` |
| themeOverrides | 主题覆盖变量 | `ComponentThemeVars` | — |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 操作区域（通常放置按钮） |
| icon | 自定义图标内容 |
| title | 自定义标题内容 |
| sub-title | 自定义副标题内容 |
| extra | 额外内容区域（位于副标题与操作区之间） |

## 主题变量

Result 组件支持通过覆盖以下 CSS 变量来自定义局部样式：

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-result-padding` | 容器内边距 | `40px 30px` |
| `--yh-result-icon-size` | 图标尺寸 | `72px` |
| `--yh-result-icon-margin` | 图标下边距 | `20px` |
| `--yh-result-title-size` | 标题字号 | `20px` |
| `--yh-result-title-color` | 标题颜色 | `var(--yh-text-color-primary, #303133)` |
| `--yh-result-subtitle-size` | 副标题字号 | `14px` |
| `--yh-result-subtitle-color` | 副标题颜色 | `var(--yh-text-color-secondary, #909399)` |
