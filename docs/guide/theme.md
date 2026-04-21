# Theme 主题系统

YH-UI 提供基于 **CSS 变量** 与 **Design Tokens** 的主题系统，运行时主题定制能力由 `@yh-ui/theme` 提供。

## 功能概览

当前主题包包含：

- 预设主题
- 暗色模式 API
- 密度控制
- 色彩算法切换
- 色盲模式辅助
- 组件级主题覆盖
- 主题导入导出与历史能力
- 响应式变量能力

---

## 设计思想

YH-UI 将样式分为三个层级：

1. **基础变量 (Global Tokens)**：如主色、基础字号、圆角
2. **语义变量 (Alias Tokens)**：如交互主色、成功色、失效色
3. **组件变量 (Component Tokens)**：如 `Card` 的背景色、`Message` 的高度等

---

## 快速开始

### 安装

```bash
npm install @yh-ui/theme
# 或
pnpm add @yh-ui/theme
```

### 基础用法

```typescript
import { initTheme, useTheme } from '@yh-ui/theme'

const theme = initTheme({
  preset: 'blue',
  dark: false,
  persist: true
})

const themeManager = useTheme()
```

### Vue 插件方式

```typescript
// main.ts
import { createApp } from 'vue'
import { ThemePlugin } from '@yh-ui/theme'
import App from './App.vue'

const app = createApp(App)

app.use(ThemePlugin, {
  preset: 'default',
  dark: false,
  persist: true,
  followSystem: true
})

app.mount('#app')
```

---

## 核心功能

### 预设主题

YH-UI 内置 12 个预设主题：

- `default` - 默认蓝色
- `dark` - 暗色预设
- `blue` - 蓝色主题
- `green` - 绿色主题
- `purple` - 紫色主题
- `orange` - 橙色主题
- `rose` - 玫瑰粉
- `amber` - 琥珀色
- `teal` - 青色
- `indigo` - 靛蓝色
- `slate` - 石板灰
- `zinc` - 锌灰色

### 密度/紧凑度

| 模式 | 组件大小 | 适用场景 |
| --- | --- | --- |
| `comfortable` | 32px | 普通表单、内容页面 |
| `compact` | 28px | 数据密集型应用 |
| `dense` | 24px | 管理后台、表格 |

### 色彩算法

| 算法 | 说明 |
| --- | --- |
| `default` | 默认算法 |
| `vibrant` | 鲜艳模式，饱和度更高 |
| `muted` | 柔和模式，饱和度更低 |
| `pastel` | 粉彩模式，整体更浅 |

### 色盲友好模式

| 模式 | 说明 |
| --- | --- |
| `none` | 正常 |
| `protanopia` | 红色盲 |
| `deuteranopia` | 绿色盲 |
| `tritanopia` | 蓝色盲 |
| `achromatopsia` | 全色盲 |

---

## API 参考

### ThemeManager 方法

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| `setPreset` | 设置预设主题 | `preset: PresetTheme` |
| `setThemePreset` | 设置预设主题别名方法 | `preset: PresetTheme` |
| `setColors` | 设置自定义颜色 | `colors: ThemeColors` |
| `setPrimaryColor` | 设置主色 | `color: string` |
| `setDarkMode` | 设置暗色模式 | `dark: boolean` |
| `toggleDarkMode` | 切换暗色模式 | — |
| `setDensity` | 设置密度 | `density: ThemeDensity` |
| `setAlgorithm` | 设置色彩算法 | `algorithm: ColorAlgorithm` |
| `setColorBlindMode` | 设置色盲模式 | `mode: ColorBlindMode` |
| `setComponentTheme` | 设置组件级覆盖 | `name, overrides` |
| `clearComponentTheme` | 清除组件级覆盖 | `name` |
| `enableTransition` | 启用切换动画 | `config?` |
| `disableTransition` | 禁用切换动画 | — |
| `applyFromPrimary` | 从主色生成调色板 | `color: string` |
| `exportTheme` | 导出当前主题 | `options?` |
| `importTheme` | 导入主题配置 | `json: string` |
| `exportAsCss` | 导出当前主题为 CSS | — |
| `createTheme` | 创建主题配置对象 | `config` |
| `applyFullConfig` | 应用完整主题配置 | `config` |
| `undo` | 撤销主题变更 | — |
| `getHistory` | 获取主题历史 | — |
| `clearHistory` | 清空主题历史 | — |
| `setResponsiveVar` | 设置响应式 CSS 变量 | `name, values` |
| `reset` | 重置为默认主题 | — |

### 快捷函数

| 函数名 | 说明 |
| --- | --- |
| `initTheme` | 初始化主题 |
| `useTheme` | 获取主题管理器 |
| `setThemeColor` | 设置主色 |
| `toggleDarkMode` | 切换暗色模式 |
| `setThemePreset` | 设置预设主题 |
| `useThemeVars` | 读取当前主题变量 |
| `provideComponentThemes` | 提供组件级主题覆盖 |
| `useComponentTheme` | 读取组件级主题覆盖 |

### 类型定义

```typescript
type PresetTheme =
  | 'default'
  | 'dark'
  | 'blue'
  | 'green'
  | 'purple'
  | 'orange'
  | 'rose'
  | 'amber'
  | 'teal'
  | 'indigo'
  | 'slate'
  | 'zinc'

type ThemeDensity = 'comfortable' | 'compact' | 'dense'

type ColorAlgorithm = 'default' | 'vibrant' | 'muted' | 'pastel'

type ColorBlindMode = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia'
```

---

## CSS 变量参考

### 全局变量

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-color-primary` | 主题主色 | `#409eff` |
| `--yh-color-success` | 成功色 | `#67c23a` |
| `--yh-color-warning` | 警告色 | `#e6a23c` |
| `--yh-color-danger` | 危险色 | `#f56c6c` |
| `--yh-color-info` | 信息色 | `#909399` |
| `--yh-border-radius-base` | 基础圆角 | `4px` |
| `--yh-font-size-base` | 基础字号 | `14px` |
| `--yh-bg-color` | 全站背景色 | `#ffffff` |

### 密度变量

| 变量名 | 舒适 | 紧凑 | 密集 |
| --- | --- | --- | --- |
| `--yh-density-factor` | `1` | `0.85` | `0.7` |
| `--yh-component-size-default` | `32px` | `28px` | `24px` |
| `--yh-spacing-unit` | `8px` | `6px` | `4px` |

### 断点系统

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-breakpoint-xs` | 超小屏幕 | `0` |
| `--yh-breakpoint-sm` | 小屏幕 | `576px` |
| `--yh-breakpoint-md` | 中等屏幕 | `768px` |
| `--yh-breakpoint-lg` | 大屏幕 | `992px` |
| `--yh-breakpoint-xl` | 超大屏幕 | `1200px` |
| `--yh-breakpoint-xxl` | 巨大屏幕 | `1400px` |

### 无障碍变量

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-focus-ring-color` | 聚焦环颜色 | `var(--yh-color-primary)` |
| `--yh-focus-ring-width` | 聚焦环宽度 | `2px` |
| `--yh-font-family-monospace` | 等宽字体 | `SFMono-Regular...` |

---

## 无障碍支持

YH-UI 内置完整的无障碍支持：

- **减少动画偏好**：自动检测 `prefers-reduced-motion`
- **高对比度模式**：支持 `prefers-contrast: high`
- **强制颜色模式**：使用系统颜色关键字
- **主题无障碍辅助**：提供对比度与相关主题能力

---

## 更多示例

查看 [主题系统示例](/guide/theme-examples) 获取完整的交互式演示和代码示例。
