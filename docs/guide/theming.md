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
| `--yh-font-family-serif` | 衬线字体 | `Georgia, Cambria...` |

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

YH-UI 自动检测用户的 `prefers-reduced-motion` 偏好设置，当用户开启"减少动画"时，所有动画和过渡效果会自动禁用：

```css
/* 自动应用 - 无需手动设置 */
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
/* 自动应用更强的对比度 */
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

YH-UI 提供业内领先的主题管理功能，超越 Naive UI、Ant Design 等主流 UI 库。

### 主题管理器

```ts
import { useTheme, initTheme } from '@yh-ui/theme'

// 初始化主题
const theme = initTheme({
  preset: 'blue',
  dark: false,
  persist: true,
  followSystem: true // 跟随系统暗色模式
})

// 或使用 Composition API
const theme = useTheme()
```

### 密度/紧凑度控制

YH-UI 支持三种密度模式，适应不同场景需求：

```ts
import { useTheme } from '@yh-ui/theme'

const theme = useTheme()

// 设置密度
theme.setDensity('comfortable') // 舒适模式 (默认)
theme.setDensity('compact')     // 紧凑模式
theme.setDensity('dense')       // 密集模式
```

| 模式 | 组件大小 | 适用场景 |
| --- | --- | --- |
| `comfortable` | 32px | 普通表单、内容页面 |
| `compact` | 28px | 数据密集型应用 |
| `dense` | 24px | 管理后台、表格 |

### 色盲友好模式

YH-UI 内置多种色盲友好调色板：

```ts
import { useTheme } from '@yh-ui/theme'

const theme = useTheme()

// 设置色盲模式
theme.setColorBlindMode('none')          // 正常
theme.setColorBlindMode('protanopia')    // 红色盲
theme.setColorBlindMode('deuteranopia')  // 绿色盲
theme.setColorBlindMode('tritanopia')    // 蓝色盲
theme.setColorBlindMode('achromatopsia') // 全色盲
```

### 主题切换动画

启用平滑的主题切换动画效果：

```ts
import { useTheme } from '@yh-ui/theme'

const theme = useTheme()

// 启用动画
theme.enableTransition({
  duration: 300, // 毫秒
  timing: 'cubic-bezier(0.4, 0, 0.2, 1)'
})

// 之后切换主题时会有平滑过渡
theme.toggleDarkMode()

// 禁用动画
theme.disableTransition()
```

### 智能色彩生成

从单一主色自动生成完整调色板：

```ts
import { useTheme, generatePaletteFromPrimary } from '@yh-ui/theme'

const theme = useTheme()

// 从主色生成完整调色板
theme.applyFromPrimary('#8b5cf6')

// 或手动获取调色板
const palette = generatePaletteFromPrimary('#8b5cf6')
console.log(palette)
// { primary: '#8b5cf6', success: '...', warning: '...', danger: '...', info: '...' }
```

### 色彩和谐工具

获取互补色、类似色、三角色：

```ts
import { useTheme } from '@yh-ui/theme'

const theme = useTheme()
const primary = '#409eff'

// 获取互补色
const complementary = theme.getComplementary(primary)

// 获取类似色
const [analogous1, analogous2] = theme.getAnalogous(primary)

// 获取三角色
const [triadic1, triadic2] = theme.getTriadic(primary)
```

### 组件级主题覆盖

针对特定组件自定义样式，无需全局修改：

```ts
import { useTheme } from '@yh-ui/theme'

const theme = useTheme()

// 覆盖 Button 组件变量
theme.setComponentTheme('button', {
  'border-radius': '20px',
  'font-weight': '600',
  'padding': '0 24px'
})

// 覆盖 Input 组件变量
theme.setComponentTheme('input', {
  'border-radius': '8px',
  'bg-color': '#f5f5f5'
})

// 清除组件级覆盖
theme.clearComponentTheme('button')
```

### 主题继承与扩展

基于现有主题创建新主题：

```ts
import { useTheme } from '@yh-ui/theme'

const theme = useTheme()

// 创建继承主题
const customTheme = theme.createTheme({
  name: 'My Brand Theme',
  author: 'Your Name',
  extends: 'blue', // 继承 blue 预设
  colors: {
    primary: '#8b5cf6' // 只覆盖主色
  },
  density: 'compact'
})

// 应用完整配置
theme.applyFullConfig({
  name: 'My App Theme',
  extends: 'purple',
  colors: { primary: '#ec4899' },
  density: 'compact',
  colorBlindMode: 'none',
  transition: true, // 启用切换动画
  components: {
    button: { 'border-radius': '20px' },
    card: { 'border-radius': '16px' }
  }
})
```

### 主题导入/导出

支持 JSON 格式的主题配置分享：

```ts
import { useTheme } from '@yh-ui/theme'

const theme = useTheme()

// 导出主题
const themeJson = theme.exportTheme({
  name: 'My Theme',
  author: 'Your Name'
})

// 保存到文件或分享给他人
console.log(themeJson)

// 导入主题
theme.importTheme(themeJson)

// 导出为纯 CSS
const css = theme.exportAsCss()
```

### 主题历史与撤销

支持撤销主题更改：

```ts
import { useTheme } from '@yh-ui/theme'

const theme = useTheme()

// 更改主题...
theme.setPreset('purple')
theme.setDarkMode(true)

// 撤销到上一个状态
theme.undo()

// 获取主题历史
const history = theme.getHistory()

// 清除历史
theme.clearHistory()
```

### 响应式主题变量

根据断点自动切换变量值：

```ts
import { useTheme } from '@yh-ui/theme'

const theme = useTheme()

// 设置响应式变量
theme.setResponsiveVar('--yh-font-size-base', {
  xs: '12px',
  sm: '13px',
  md: '14px',
  lg: '15px',
  xl: '16px'
})

// 设置响应式间距
theme.setResponsiveVar('--yh-spacing-unit', {
  xs: '4px',
  md: '8px',
  xl: '12px'
})
```

### 颜色算法

不同的色阶生成算法，适应不同风格：

```ts
import { useTheme } from '@yh-ui/theme'

const theme = useTheme()

// 默认算法
theme.setAlgorithm('default')

// 鲜艳模式 - 更高饱和度
theme.setAlgorithm('vibrant')

// 柔和模式 - 降低饱和度
theme.setAlgorithm('muted')

// 粉彩模式 - 浅色柔和
theme.setAlgorithm('pastel')
```

### Vue 插件方式使用

```ts
// main.ts
import { createApp } from 'vue'
import { ThemePlugin } from '@yh-ui/theme'
import App from './App.vue'

const app = createApp(App)

app.use(ThemePlugin, {
  preset: 'blue',
  dark: false,
  persist: true,
  followSystem: true,
  density: 'comfortable'
})

app.mount('#app')
```

```vue
<!-- 组件中使用 -->
<script setup>
import { inject } from 'vue'

const theme = inject('theme')

const toggleDark = () => theme.toggleDarkMode()
</script>
```

---

## 与其他 UI 库对比

| 功能 | YH-UI | Naive UI | Ant Design | Element Plus |
| --- | :---: | :---: | :---: | :---: |
| CSS 变量 | ✅ | ✅ | ✅ | ✅ |
| 暗色模式 | ✅ | ✅ | ✅ | ✅ |
| 预设主题 | ✅ 12+ | ✅ | ⚠️ 有限 | ⚠️ 有限 |
| 密度/紧凑度 | ✅ 3级 | ❌ | ✅ | ❌ |
| 色盲友好模式 | ✅ 5种 | ❌ | ❌ | ❌ |
| 主题切换动画 | ✅ | ❌ | ❌ | ❌ |
| 智能色彩生成 | ✅ | ⚠️ 有限 | ✅ | ❌ |
| 组件级覆盖 | ✅ | ✅ | ✅ | ⚠️ 有限 |
| 主题继承 | ✅ | ✅ | ⚠️ | ❌ |
| 主题导入/导出 | ✅ | ❌ | ❌ | ❌ |
| 主题历史/撤销 | ✅ | ❌ | ❌ | ❌ |
| 响应式变量 | ✅ | ❌ | ❌ | ❌ |
| 色彩算法 | ✅ 4种 | ❌ | ✅ | ❌ |
| WCAG 对比度检测 | ✅ | ❌ | ❌ | ❌ |
| 系统主题跟随 | ✅ | ⚠️ 需手动 | ⚠️ 需手动 | ⚠️ 需手动 |
| 高对比度模式 | ✅ | ❌ | ❌ | ❌ |
| reduced-motion | ✅ | ❌ | ❌ | ❌ |

---

更多变量请参考 [设计规范](/guide/design) 或查看 [源代码](https://github.com/1079161148/yh-ui/blob/main/packages/theme/src/styles/variables.scss)。
