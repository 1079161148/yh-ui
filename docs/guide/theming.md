# 主题定制

YH-UI 提供灵活的主题定制能力，您可以通过多种方式自定义组件样式。

## CSS 变量

YH-UI 使用 CSS 变量（CSS Custom Properties）定义设计令牌，所有变量都以 `--yh-` 为前缀。

### 全局覆盖

在样式文件中直接覆盖 CSS 变量：

```css
:root {
  --yh-color-primary: #6366f1;
  --yh-color-primary-light-3: #818cf8;
  --yh-color-primary-light-5: #a5b4fc;
  --yh-color-primary-light-7: #c7d2fe;
  --yh-color-primary-light-9: #e0e7ff;
  --yh-color-primary-dark-2: #4f46e5;

  --yh-border-radius-base: 8px;
  --yh-font-family: 'Inter', sans-serif;
}
```

### 作用域覆盖

也可以在特定作用域内覆盖变量：

```css
.my-custom-theme {
  --yh-color-primary: #8b5cf6;
  --yh-border-radius-base: 12px;
}
```

```vue
<template>
  <div class="my-custom-theme">
    <yh-button type="primary">自定义主题按钮</yh-button>
  </div>
</template>
```

## 暗黑模式

YH-UI 通过 `@yh-ui/theme` 提供暗色模式 API。如果项目使用主题包，建议优先通过主题管理器切换暗色模式：

```ts
import { useTheme } from '@yh-ui/theme'

const theme = useTheme()
theme.toggleDarkMode()
```

如果项目自行管理暗色模式，也可以在作用域中覆盖相关 `--yh-*` 变量。

### 自定义暗黑模式变量

```css
html.dark {
  --yh-color-primary: #60a5fa;
  --yh-bg-color: #1a1a1a;
  --yh-bg-color-page: #0f0f0f;
}
```

## SCSS 用法

当前主题包的稳定定制方式以公开的 CSS 变量为主。应用层如果需要定制，建议直接覆盖暴露出来的 `--yh-*` 变量：

```scss
:root {
  --yh-color-primary: #6366f1;
  --yh-border-radius-base: 8px;
  --yh-font-family: 'Inter', sans-serif;
}
```

然后在应用入口正常引入样式：

```ts
import '@yh-ui/yh-ui/css'
```

## 可用的 CSS 变量

### 颜色

| 变量名 | 描述 | 默认值 |
| --- | --- | --- |
| `--yh-color-primary` | 主色 | `#409eff` |
| `--yh-color-success` | 成功色 | `#67c23a` |
| `--yh-color-warning` | 警告色 | `#e6a23c` |
| `--yh-color-danger` | 危险色 | `#f56c6c` |
| `--yh-color-info` | 信息色 | `#909399` |

### 文字

| 变量名 | 描述 | 默认值 |
| --- | --- | --- |
| `--yh-text-color-primary` | 主要文字颜色 | `#303133` |
| `--yh-text-color-regular` | 常规文字颜色 | `#606266` |
| `--yh-text-color-secondary` | 次要文字颜色 | `#909399` |
| `--yh-text-color-placeholder` | 占位符颜色 | `#a8abb2` |
| `--yh-text-color-disabled` | 禁用文字颜色 | `#c0c4cc` |

### 边框

| 变量名 | 描述 | 默认值 |
| --- | --- | --- |
| `--yh-border-color` | 边框颜色 | `#dcdfe6` |
| `--yh-border-color-light` | 浅色边框 | `#e4e7ed` |
| `--yh-border-color-lighter` | 更浅边框 | `#ebeef5` |

### 圆角

| 变量名 | 描述 | 默认值 |
| --- | --- | --- |
| `--yh-radius-sm` | 小圆角 | `2px` |
| `--yh-border-radius-base` | 基础圆角 | `4px` |
| `--yh-radius-md` | 中等圆角 | `8px` |
| `--yh-radius-lg` | 大圆角 | `12px` |
| `--yh-radius-round` | 圆形圆角 | `20px` |

### 间距

| 变量名 | 描述 | 默认值 |
| --- | --- | --- |
| `--yh-spacing-xs` | 超小间距 | `4px` |
| `--yh-spacing-sm` | 小间距 | `8px` |
| `--yh-spacing-md` | 中等间距 | `16px` |
| `--yh-spacing-lg` | 大间距 | `24px` |
| `--yh-spacing-xl` | 超大间距 | `32px` |

### 断点系统

| 变量名 | 描述 | 默认值 |
| --- | --- | --- |
| `--yh-breakpoint-xs` | 超小屏幕 | `0` |
| `--yh-breakpoint-sm` | 小屏幕 | `576px` |
| `--yh-breakpoint-md` | 中等屏幕 | `768px` |
| `--yh-breakpoint-lg` | 大屏幕 | `992px` |
| `--yh-breakpoint-xl` | 超大屏幕 | `1200px` |
| `--yh-breakpoint-xxl` | 巨大屏幕 | `1400px` |

### 字体族

| 变量名 | 描述 | 默认值 |
| --- | --- | --- |
| `--yh-font-family` | 默认字体 | 系统字体栈 |
| `--yh-font-family-monospace` | 等宽字体 | `SFMono-Regular, Consolas...` |

### 无障碍/聚焦

| 变量名 | 描述 | 默认值 |
| --- | --- | --- |
| `--yh-focus-ring-color` | 聚焦环颜色 | `var(--yh-color-primary)` |
| `--yh-focus-ring-width` | 聚焦环宽度 | `2px` |
| `--yh-focus-ring-offset` | 聚焦环偏移 | `2px` |
| `--yh-focus-ring` | 完整聚焦环样式 | 组合值 |

### 遮罩层

| 变量名 | 描述 | 默认值 |
| --- | --- | --- |
| `--yh-mask-color` | 遮罩颜色 | `rgba(0, 0, 0, 0.5)` |
| `--yh-mask-color-light` | 浅色遮罩 | `rgba(0, 0, 0, 0.3)` |
| `--yh-mask-color-extra-light` | 超浅遮罩 | `rgba(0, 0, 0, 0.1)` |

### 滚动条

| 变量名 | 描述 | 默认值 |
| --- | --- | --- |
| `--yh-scrollbar-width` | 滚动条宽度 | `6px` |
| `--yh-scrollbar-thumb-color` | 滚动条滑块颜色 | `var(--yh-text-color-disabled)` |
| `--yh-scrollbar-thumb-hover-color` | 滚动条滑块悬停颜色 | `var(--yh-text-color-secondary)` |
| `--yh-scrollbar-track-color` | 滚动条轨道颜色 | `transparent` |

## 无障碍支持

### 减少动画偏好

YH-UI 会根据 `prefers-reduced-motion` 减少动画。相关持续时间变量也可以在应用层覆盖：

```css
@media (prefers-reduced-motion: reduce) {
  :root {
    --yh-duration-fast: 0ms;
    --yh-duration-base: 0ms;
    --yh-duration-slow: 0ms;
  }
}
```

### 高对比度模式

YH-UI 支持 Windows 高对比度模式和 `prefers-contrast: high` 媒体查询：

```css
@media (prefers-contrast: high) {
  :root {
    --yh-border-color: #000000;
    --yh-focus-ring-width: 3px;
  }
}
```

### 强制颜色模式

对于 Windows 高对比度主题，YH-UI 使用系统颜色关键字确保可访问性：

```css
@media (forced-colors: active) {
  :root {
    --yh-color-primary: LinkText;
    --yh-bg-color: Canvas;
    --yh-text-color-primary: CanvasText;
  }
}
```

---

## 高级主题功能

YH-UI 在 `@yh-ui/theme` 中提供一组运行时主题管理 API。

### 主题管理器

```ts
import { useTheme, initTheme } from '@yh-ui/theme'

const theme = initTheme({
  preset: 'blue',
  dark: false,
  persist: true,
  followSystem: true
})

const themeManager = useTheme()
```

### 密度控制

```ts
import { useTheme } from '@yh-ui/theme'

const theme = useTheme()

theme.setDensity('comfortable')
theme.setDensity('compact')
theme.setDensity('dense')
```

### 色盲友好模式

```ts
import { useTheme } from '@yh-ui/theme'

const theme = useTheme()

theme.setColorBlindMode('none')
theme.setColorBlindMode('protanopia')
theme.setColorBlindMode('deuteranopia')
theme.setColorBlindMode('tritanopia')
theme.setColorBlindMode('achromatopsia')
```

### 主题切换动画

```ts
import { useTheme } from '@yh-ui/theme'

const theme = useTheme()

theme.enableTransition({
  duration: 300,
  timing: 'cubic-bezier(0.4, 0, 0.2, 1)'
})

theme.toggleDarkMode()
theme.disableTransition()
```

### 主色生成

```ts
import { useTheme } from '@yh-ui/theme'

const theme = useTheme()
theme.applyFromPrimary('#8b5cf6')
```

### 组件级主题覆盖

```ts
import { useTheme } from '@yh-ui/theme'

const theme = useTheme()

theme.setComponentTheme('button', {
  'border-radius': '20px',
  'font-weight': '600',
  'padding': '0 24px'
})

theme.clearComponentTheme('button')
```

### 主题导入导出

```ts
import { useTheme } from '@yh-ui/theme'

const theme = useTheme()
const themeJson = theme.exportTheme({
  name: 'My Theme',
  author: 'Your Name'
})

theme.importTheme(themeJson)
const css = theme.exportAsCss()
```

---

更多变量请参考 [设计规范](/guide/design) 或查看 [源代码](https://github.com/1079161148/yh-ui/blob/main/packages/theme/src/styles/variables.scss)。
