# 主题定制

YH-UI 的主题系统以 CSS 变量为基础，所有公开变量均以 `--yh-` 为前缀。你可以在全局、局部容器或组件级别覆盖变量，用同一套组件承载不同品牌和业务线。

## 基础用法

在应用入口引入样式：

```ts
import '@yh-ui/yh-ui/css'
```

在全局样式中覆盖变量：

```css
:root {
  --yh-color-primary: #2563eb;
  --yh-color-success: #16a34a;
  --yh-radius-base: 6px;
  --yh-font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

## 局部主题

当一个页面中存在多个品牌区域时，可以把变量限定在容器内：

```css
.finance-theme {
  --yh-color-primary: #0f766e;
  --yh-color-warning: #ca8a04;
}

.ai-theme {
  --yh-color-primary: #7c3aed;
  --yh-bg-color-page: #f8fafc;
}
```

```vue
<template>
  <section class="finance-theme">
    <yh-button type="primary">提交审批</yh-button>
  </section>
</template>
```

## 暗色模式

如果项目自行管理暗色模式，建议通过根节点 class 切换：

```css
html.dark {
  --yh-bg-color: #141414;
  --yh-bg-color-page: #0f0f0f;
  --yh-text-color-primary: #f5f7fa;
  --yh-text-color-regular: #d4d7de;
  --yh-border-color: #414243;
}
```

如果使用 `@yh-ui/theme`，可以通过主题 API 管理：

```ts
import { useTheme } from '@yh-ui/theme'

const theme = useTheme()
theme.toggleDarkMode()
```

## 组件级覆盖

大多数组件支持 `themeOverrides`。组件级覆盖适合临时业务样式，设计系统级差异仍建议沉淀为全局 Token。

```vue
<template>
  <yh-button
    type="primary"
    :theme-overrides="{
      borderRadius: '10px',
      fontWeight: '600'
    }"
  >
    品牌按钮
  </yh-button>
</template>
```

## Token 分类

| 分类 | 示例                                            | 建议用途                     |
| ---- | ----------------------------------------------- | ---------------------------- |
| 颜色 | `--yh-color-primary`、`--yh-text-color-primary` | 品牌、语义、文本、边框、背景 |
| 字体 | `--yh-font-family`、`--yh-font-size-base`       | 字体栈、字号、行高           |
| 间距 | `--yh-spacing-md`                               | 布局、表单、列表密度         |
| 圆角 | `--yh-radius-base`                              | 按钮、输入框、卡片、弹层     |
| 阴影 | `--yh-shadow-base`                              | 下拉、弹层、浮层             |
| 层级 | `--yh-z-index-modal`                            | 弹窗、通知、加载层           |
| 动效 | `--yh-duration-base`                            | 过渡时间和缓动               |

## 主题治理建议

- 不要在业务 CSS 中直接覆盖组件内部 class，优先使用 Token、`themeOverrides`、插槽。
- 不要为同一语义创建多个颜色变量，例如 `primaryBlue`、`brandBlue`、`mainBlue`。
- 每次新增 Token 都应说明语义、默认值、适用组件和是否支持暗色模式。
- 主题变更必须在亮色、暗色、移动端和 SSR 场景下验证。

## 相关文档

- [设计原则](/guide/design)
- [Figma 与 Token 体系](/guide/figma-tokens)
- [主题系统](/guide/theme)
