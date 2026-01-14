# 主题定制

YH-UI 提供了灵活的主题定制能力，你可以通过多种方式自定义组件样式。

## CSS 变量

YH-UI 使用 CSS 变量（CSS Custom Properties）来定义所有设计令牌。所有变量以 `--yh-` 作为前缀。

### 全局覆盖

在你的样式文件中覆盖 CSS 变量：

```css
:root {
  /* 修改主色 */
  --yh-color-primary: #6366f1;
  --yh-color-primary-light-3: #818cf8;
  --yh-color-primary-light-5: #a5b4fc;
  --yh-color-primary-light-7: #c7d2fe;
  --yh-color-primary-light-9: #e0e7ff;
  --yh-color-primary-dark-2: #4f46e5;

  /* 修改圆角 */
  --yh-radius-base: 8px;

  /* 修改字体 */
  --yh-font-family: 'Inter', sans-serif;
}
```

### 作用域覆盖

可以在特定作用域内覆盖变量：

```css
.my-custom-theme {
  --yh-color-primary: #8b5cf6;
  --yh-radius-base: 12px;
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

YH-UI 内置了暗黑模式支持，只需在 `html` 元素上添加 `dark` 类即可：

```ts
// 切换暗黑模式
const toggleDark = () => {
  document.documentElement.classList.toggle('dark')
}
```

或使用 [VueUse](https://vueuse.org/) 的 `useDark`：

```ts
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
```

### 自定义暗黑模式变量

```css
html.dark {
  --yh-color-primary: #60a5fa;
  --yh-bg-color: #1a1a1a;
  --yh-bg-color-page: #0f0f0f;
}
```

## SCSS 变量

如果你使用 SCSS，可以通过 `@forward` 和 `with` 来自定义变量：

```scss
// styles/yh-ui-custom.scss

// 自定义变量
@forward '@yh-ui/theme/styles/variables.scss' with (
  $colors: (
    'primary': #6366f1,
    'success': #22c55e,
    'warning': #f59e0b,
    'danger': #ef4444,
    'info': #6b7280,
  ),
  $border-radius: (
    'base': 8px,
    'sm': 4px,
    'md': 12px,
    'lg': 16px,
  )
);

// 引入组件样式
@use '@yh-ui/theme';
```

在 Vite 中配置：

```ts
// vite.config.ts
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/yh-ui-custom.scss" as *;`
      }
    }
  }
})
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
| `--yh-radius-base` | 基础圆角 | `4px` |
| `--yh-radius-md` | 中等圆角 | `8px` |
| `--yh-radius-lg` | 大圆角 | `12px` |
| `--yh-radius-round` | 圆形 | `20px` |

### 间距

| 变量名 | 描述 | 默认值 |
| --- | --- | --- |
| `--yh-spacing-xs` | 超小间距 | `4px` |
| `--yh-spacing-sm` | 小间距 | `8px` |
| `--yh-spacing-md` | 中等间距 | `16px` |
| `--yh-spacing-lg` | 大间距 | `24px` |
| `--yh-spacing-xl` | 超大间距 | `32px` |

更多变量请参考 [设计规范](/guide/design) 或查看 [源代码](https://github.com/xxx/yh-ui/blob/main/packages/theme/src/styles/variables.scss)。
