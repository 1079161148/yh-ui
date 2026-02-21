# Typography 排版

<script setup lang="ts">
import { ref } from 'vue'

const tsBasicTitle = `<template>
  <yh-typography-title :level="1">一级标题 h1</yh-typography-title>
  <yh-typography-title :level="2">二级标题 h2</yh-typography-title>
  <yh-typography-title :level="3">三级标题 h3</yh-typography-title>
  <yh-typography-title :level="4">四级标题 h4</yh-typography-title>
  <yh-typography-title :level="5">五级标题 h5</yh-typography-title>
  <yh-typography-title :level="6">六级标题 h6</yh-typography-title>
<\/template>`

const jsBasicTitle = tsBasicTitle

const tsTextType = `<template>
  <div style="display: flex; flex-wrap: wrap; gap: 16px;">
    <yh-typography-text>默认文本</yh-typography-text>
    <yh-typography-text type="primary">主要</yh-typography-text>
    <yh-typography-text type="success">成功</yh-typography-text>
    <yh-typography-text type="warning">警告</yh-typography-text>
    <yh-typography-text type="danger">危险</yh-typography-text>
    <yh-typography-text type="info">信息</yh-typography-text>
    <yh-typography-text type="secondary">次要</yh-typography-text>
  </div>
<\/template>`

const jsTextType = tsTextType

const tsTextDecoration = `<template>
  <div style="display: flex; flex-wrap: wrap; gap: 16px;">
    <yh-typography-text bold>加粗文本</yh-typography-text>
    <yh-typography-text italic>斜体文本</yh-typography-text>
    <yh-typography-text underline>下划线文本</yh-typography-text>
    <yh-typography-text delete>删除线文本</yh-typography-text>
    <yh-typography-text mark>标记文本</yh-typography-text>
    <yh-typography-text code>代码风格</yh-typography-text>
    <yh-typography-text keyboard>键盘风格</yh-typography-text>
  </div>
<\/template>`

const jsTextDecoration = tsTextDecoration

const tsTextSize = `<template>
  <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: baseline;">
    <yh-typography-text size="small">小号文本</yh-typography-text>
    <yh-typography-text size="default">默认文本</yh-typography-text>
    <yh-typography-text size="large">大号文本</yh-typography-text>
  </div>
<\/template>`

const jsTextSize = tsTextSize

const tsParagraph = `<template>
  <yh-typography-paragraph>
    YH-UI 是一个基于 Vue 3 的现代化 UI 组件库，提供了丰富的组件和工具函数。
    通过组合式 API 和 TypeScript 的强类型支持，为开发者提供极致的开发体验。
  </yh-typography-paragraph>
  <yh-typography-paragraph type="secondary">
    本段落使用了次要色彩类型，适用于辅助说明和提示信息的场景。
  </yh-typography-paragraph>
<\/template>`

const jsParagraph = tsParagraph

const tsLink = `<template>
  <div style="display: flex; flex-wrap: wrap; gap: 16px;">
    <yh-typography-link href="https://github.com" target="_blank">默认链接</yh-typography-link>
    <yh-typography-link href="#" type="success">成功链接</yh-typography-link>
    <yh-typography-link href="#" type="warning">警告链接</yh-typography-link>
    <yh-typography-link href="#" type="danger">危险链接</yh-typography-link>
    <yh-typography-link href="#" underline>下划线链接</yh-typography-link>
    <yh-typography-link href="#" disabled>禁用链接</yh-typography-link>
  </div>
<\/template>`

const jsLink = tsLink

const tsEllipsis = `<template>
  <yh-typography-title :level="5" ellipsis>
    这是一段很长的标题文字，当容器宽度不足时会自动显示省略号来截断溢出的内容，保持界面整洁。
  </yh-typography-title>
  <yh-typography-paragraph :ellipsis="2">
    这是一段多行段落文本，通过设置 ellipsis 为数字可以控制显示的行数。
    当文本内容超过指定行数时，会自动显示省略号。这在列表页和卡片组件中非常实用，
    可以有效控制内容的显示区域，避免页面布局因内容过长而被破坏。
  </yh-typography-paragraph>
<\/template>`

const jsEllipsis = tsEllipsis

// Nuxt 使用示例
const tsNuxt = `<template>
  <div>
    <div style="margin-bottom: 16px;">
      <yh-button size="small" @click="pending = !pending">
        {{ pending ? '切换为：已加载' : '切换为：加载中' }}
      </yh-button>
    </div>

    <yh-typography-title :level="2">欢迎使用 YH-UI</yh-typography-title>

    <yh-typography-paragraph type="secondary">
      一个现代化的 Vue 3 组件库，完美支持 Nuxt SSR。
    </yh-typography-paragraph>

    <!-- 结合 Nuxt useAsyncData 展示异步加载状态 -->
    <yh-typography-text v-if="pending" type="info">加载中...</yh-typography-text>
    <yh-typography-paragraph v-else>
      YH-UI 提供了丰富的组件，助力快速构建现代化 Web 应用。
    </yh-typography-paragraph>

    <yh-typography-link href="/about" type="primary">了解更多</yh-typography-link>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 在真实 Nuxt 应用中，pending 通常来自 useAsyncData 或 useFetch
// const { pending } = await useAsyncData(...)
const pending = ref(false)
<\/script>`

const jsNuxt = tsNuxt
  .replace('lang="ts"', '')

// 文档内预览用的 pending 状态切换演示
const pending = ref(false)
</script>

用于展示标题、段落、文本和链接等排版内容。

## 标题级别

使用 `level` 属性来定义标题级别，支持 h1 - h6。

<DemoBlock title="标题级别" :ts-code="tsBasicTitle" :js-code="jsBasicTitle">
  <yh-typography-title :level="1">一级标题 h1</yh-typography-title>
  <yh-typography-title :level="2">二级标题 h2</yh-typography-title>
  <yh-typography-title :level="3">三级标题 h3</yh-typography-title>
  <yh-typography-title :level="4">四级标题 h4</yh-typography-title>
  <yh-typography-title :level="5">五级标题 h5</yh-typography-title>
  <yh-typography-title :level="6">六级标题 h6</yh-typography-title>
</DemoBlock>

## 文本类型

使用 `type` 属性来定义文本的语义颜色。

<DemoBlock title="文本类型" :ts-code="tsTextType" :js-code="jsTextType">
  <div style="display: flex; flex-wrap: wrap; gap: 16px;">
    <yh-typography-text>默认文本</yh-typography-text>
    <yh-typography-text type="primary">主要</yh-typography-text>
    <yh-typography-text type="success">成功</yh-typography-text>
    <yh-typography-text type="warning">警告</yh-typography-text>
    <yh-typography-text type="danger">危险</yh-typography-text>
    <yh-typography-text type="info">信息</yh-typography-text>
    <yh-typography-text type="secondary">次要</yh-typography-text>
  </div>
</DemoBlock>

## 文本装饰

通过 `bold`、`italic`、`underline`、`delete`、`mark`、`code`、`keyboard` 等属性控制文本样式。

<DemoBlock title="文本装饰" :ts-code="tsTextDecoration" :js-code="jsTextDecoration">
  <div style="display: flex; flex-wrap: wrap; gap: 16px;">
    <yh-typography-text bold>加粗文本</yh-typography-text>
    <yh-typography-text italic>斜体文本</yh-typography-text>
    <yh-typography-text underline>下划线文本</yh-typography-text>
    <yh-typography-text delete>删除线文本</yh-typography-text>
    <yh-typography-text mark>标记文本</yh-typography-text>
    <yh-typography-text code>代码风格</yh-typography-text>
    <yh-typography-text keyboard>键盘风格</yh-typography-text>
  </div>
</DemoBlock>

## 文本尺寸

使用 `size` 属性来设置文本大小。

<DemoBlock title="文本尺寸" :ts-code="tsTextSize" :js-code="jsTextSize">
  <div style="display: flex; flex-wrap: wrap; gap: 16px; align-items: baseline;">
    <yh-typography-text size="small">小号文本</yh-typography-text>
    <yh-typography-text size="default">默认文本</yh-typography-text>
    <yh-typography-text size="large">大号文本</yh-typography-text>
  </div>
</DemoBlock>

## 段落

段落组件支持 `type` 语义颜色和 `align` 对齐方式。

<DemoBlock title="段落" :ts-code="tsParagraph" :js-code="jsParagraph">
  <yh-typography-paragraph>
    YH-UI 是一个基于 Vue 3 的现代化 UI 组件库，提供了丰富的组件和工具函数。
    通过组合式 API 和 TypeScript 的强类型支持，为开发者提供极致的开发体验。
  </yh-typography-paragraph>
  <yh-typography-paragraph type="secondary">
    本段落使用了次要色彩类型，适用于辅助说明和提示信息的场景。
  </yh-typography-paragraph>
</DemoBlock>

## 链接

链接组件支持 `href`、`target`、`type`、`underline`、`disabled` 等属性。

<DemoBlock title="链接" :ts-code="tsLink" :js-code="jsLink">
  <div style="display: flex; flex-wrap: wrap; gap: 16px;">
    <yh-typography-link href="https://github.com" target="_blank">默认链接</yh-typography-link>
    <yh-typography-link href="#" type="success">成功链接</yh-typography-link>
    <yh-typography-link href="#" type="warning">警告链接</yh-typography-link>
    <yh-typography-link href="#" type="danger">危险链接</yh-typography-link>
    <yh-typography-link href="#" underline>下划线链接</yh-typography-link>
    <yh-typography-link href="#" disabled>禁用链接</yh-typography-link>
  </div>
</DemoBlock>

## 省略

标题和段落支持 `ellipsis` 属性。Title 设置布尔值控制单行省略，Paragraph 设置数字控制多行省略。

<DemoBlock title="省略" :ts-code="tsEllipsis" :js-code="jsEllipsis">
  <yh-typography-title :level="5" ellipsis style="max-width: 400px;">
    这是一段很长的标题文字，当容器宽度不足时会自动显示省略号来截断溢出的内容，保持界面整洁。
  </yh-typography-title>
  <yh-typography-paragraph :ellipsis="2" style="max-width: 400px;">
    这是一段多行段落文本，通过设置 ellipsis 为数字可以控制显示的行数。
    当文本内容超过指定行数时，会自动显示省略号。这在列表页和卡片组件中非常实用，
    可以有效控制内容的显示区域，避免页面布局因内容过长而被破坏。
  </yh-typography-paragraph>
</DemoBlock>

## 在 Nuxt 中使用

Typography 组件完全支持 Nuxt 3/4 的 SSR 渲染。在 Nuxt 项目中使用时，组件会自动导入，无需手动注册。以下示例演示结合 `useAsyncData` 展示异步加载状态。

<DemoBlock title="Nuxt 中使用" :ts-code="tsNuxt" :js-code="jsNuxt">
  <div>
    <div style="margin-bottom: 16px;">
      <yh-button size="small" @click="pending = !pending">
        {{ pending ? '切换为：已加载' : '切换为：加载中' }}
      </yh-button>
    </div>
    <yh-typography-title :level="2">欢迎使用 YH-UI</yh-typography-title>
    <yh-typography-paragraph type="secondary">
      一个现代化的 Vue 3 组件库，完美支持 Nuxt SSR。
    </yh-typography-paragraph>
    <yh-typography-text v-if="pending" type="info">加载中...</yh-typography-text>
    <yh-typography-paragraph v-else>
      YH-UI 提供了丰富的组件，助力快速构建现代化 Web 应用。
    </yh-typography-paragraph>
    <yh-typography-link href="/about" type="primary">了解更多</yh-typography-link>
  </div>
</DemoBlock>

**SSR 注意事项**：

- ✅ 所有 Props 和样式完全支持
- ✅ 语义化标签 (h1-h6, p, span, a) 完美渲染
- ✅ 插槽内容完整渲染
- ✅ 省略号样式正确输出
- ✅ 文本装饰、类型颜色等状态类正常工作

::: tip SSR 安全性
Typography 所有子组件均已通过 SSR 测试，确保服务端和客户端渲染完全一致，Hydration 无错误。
:::

## API

### Typography.Title Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| level | 标题级别 | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | `1` |
| type | 文本类型 | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'secondary'` | — |
| bold | 是否加粗 | `boolean` | `true` |
| delete | 删除线 | `boolean` | `false` |
| underline | 下划线 | `boolean` | `false` |
| italic | 斜体 | `boolean` | `false` |
| mark | 标记高亮 | `boolean` | `false` |
| code | 代码风格 | `boolean` | `false` |
| ellipsis | 省略 | `boolean` | `false` |
| tag | 自定义标签名 | `string` | — |
| themeOverrides | 主题覆盖变量 | `ComponentThemeVars` | — |

### Typography.Text Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 文本类型 | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'secondary'` | — |
| size | 字体大小 | `'small' \| 'default' \| 'large'` | — |
| bold | 加粗 | `boolean` | `false` |
| delete | 删除线 | `boolean` | `false` |
| underline | 下划线 | `boolean` | `false` |
| italic | 斜体 | `boolean` | `false` |
| mark | 标记 | `boolean` | `false` |
| code | 代码风格 | `boolean` | `false` |
| keyboard | 键盘风格 | `boolean` | `false` |
| ellipsis | 省略 | `boolean` | `false` |
| tag | 自定义标签名 | `string` | `'span'` |
| themeOverrides | 主题覆盖变量 | `ComponentThemeVars` | — |

### Typography.Paragraph Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 文本类型 | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'secondary'` | — |
| align | 对齐方式 | `'left' \| 'center' \| 'right' \| 'justify'` | — |
| spacing | 段落间距 | `'compact' \| 'default' \| 'loose'` | `'default'` |
| bold | 加粗 | `boolean` | `false` |
| delete | 删除线 | `boolean` | `false` |
| italic | 斜体 | `boolean` | `false` |
| mark | 标记 | `boolean` | `false` |
| ellipsis | 省略 (布尔=单行, 数字=多行) | `boolean \| number` | `false` |
| themeOverrides | 主题覆盖变量 | `ComponentThemeVars` | — |

### Typography.Link Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| href | 链接地址 | `string` | — |
| target | 打开方式 | `'_blank' \| '_self' \| '_parent' \| '_top'` | `'_self'` |
| type | 链接类型 | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | — |
| underline | 下划线 | `boolean` | `false` |
| disabled | 禁用 | `boolean` | `false` |
| themeOverrides | 主题覆盖变量 | `ComponentThemeVars` | — |

### Slots

所有 Typography 子组件均支持 `default` 默认插槽。

## 主题变量

Typography 组件支持通过覆盖以下 CSS 变量来自定义局部样式：

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-typography-title-color` | 标题颜色 | `var(--yh-text-color-primary, #303133)` |
| `--yh-typography-title-weight` | 标题字重 | `600` |
| `--yh-typography-h1-size` | h1 字号 | `32px` |
| `--yh-typography-h2-size` | h2 字号 | `28px` |
| `--yh-typography-h3-size` | h3 字号 | `24px` |
| `--yh-typography-h4-size` | h4 字号 | `20px` |
| `--yh-typography-h5-size` | h5 字号 | `16px` |
| `--yh-typography-h6-size` | h6 字号 | `14px` |
| `--yh-typography-text-color` | 文本颜色 | `var(--yh-text-color-regular, #606266)` |
| `--yh-typography-text-size` | 文本字号 | `14px` |
| `--yh-typography-line-height` | 行高 | `1.5` |
| `--yh-typography-paragraph-line-height` | 段落行高 | `1.8` |
| `--yh-typography-link-color` | 链接颜色 | `var(--yh-color-primary, #409eff)` |
| `--yh-typography-link-hover-color` | 链接悬浮色 | `var(--yh-color-primary-light-3, #79bbff)` |
| `--yh-typography-mark-bg` | 标记背景色 | `#ffe58f` |
| `--yh-font-family-monospace` | 等宽字体 | `'SFMono-Regular', Consolas, monospace` |
