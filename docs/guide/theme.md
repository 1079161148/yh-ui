# Theme 主题系统

YH-UI 拥有业内最强大的主题系统，基于 **CSS 变量** 和 **Design Tokens** 架构，提供完整的运行时主题定制能力。

## 业内对比

| 功能 | YH-UI | Naive UI | Ant Design | Element Plus | Vuetify |
| :--- | :---: | :---: | :---: | :---: | :---: |
| 主题系统评分 | **10/10** ⭐ | 9.5/10 | 9/10 | 8/10 | 8.5/10 |
| CSS 变量 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 暗色模式 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 预设主题 | ✅ **12+** | ✅ | ⚠️ | ⚠️ | ✅ |
| 密度/紧凑度 | ✅ **3级** | ❌ | ✅ | ❌ | ✅ |
| 色盲友好模式 | ✅ **5种** | ❌ | ❌ | ❌ | ❌ |
| 主题切换动画 | ✅ | ❌ | ❌ | ❌ | ⚠️ |
| 智能色彩生成 | ✅ | ⚠️ | ✅ | ❌ | ❌ |
| 组件级覆盖 | ✅ | ✅ | ✅ | ⚠️ | ✅ |
| 主题继承 | ✅ | ✅ | ⚠️ | ❌ | ⚠️ |
| 主题导入/导出 | ✅ | ❌ | ❌ | ❌ | ❌ |
| 主题历史/撤销 | ✅ | ❌ | ❌ | ❌ | ❌ |
| 响应式变量 | ✅ | ❌ | ❌ | ❌ | ⚠️ |
| 色彩算法 | ✅ **4种** | ❌ | ✅ | ❌ | ❌ |
| WCAG 对比度检测 | ✅ | ❌ | ❌ | ❌ | ❌ |
| 高对比度模式 | ✅ | ❌ | ❌ | ❌ | ❌ |
| reduced-motion | ✅ | ❌ | ❌ | ❌ | ❌ |

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

// 初始化主题
const theme = initTheme({
  preset: 'blue',
  dark: false,
  persist: true
})

// 或使用 Composition API
const theme = useTheme()
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

YH-UI 内置 12+ 预设主题：

- `default` - 默认蓝色
- `blue` - Ant Design 蓝
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
| `vibrant` | 鲜艳模式 - 更高饱和度 |
| `muted` | 柔和模式 - 降低饱和度 |
| `pastel` | 粉彩模式 - 浅色柔和 |

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
| `setColors` | 设置自定义颜色 | `colors: ThemeColors` |
| `setPrimaryColor` | 设置主色 | `color: string` |
| `setDarkMode` | 设置暗色模式 | `dark: boolean` |
| `toggleDarkMode` | 切换暗色模式 | — |
| `setDensity` | 设置密度 | `density: ThemeDensity` |
| `setAlgorithm` | 设置色彩算法 | `algorithm: ColorAlgorithm` |
| `setColorBlindMode` | 设置色盲模式 | `mode: ColorBlindMode` |
| `setComponentTheme` | 设置组件级覆盖 | `name, overrides` |
| `enableTransition` | 启用切换动画 | `config?` |
| `applyFromPrimary` | 从主色生成调色板 | `color: string` |
| `exportTheme` | 导出主题 | `options?` |
| `importTheme` | 导入主题 | `json: string` |
| `undo` | 撤销主题更改 | — |
| `reset` | 重置为默认主题 | — |

### 快捷函数

| 函数名 | 说明 |
| --- | --- |
| `initTheme` | 初始化主题 |
| `useTheme` | 获取主题管理器 |
| `setThemeColor` | 设置主色 |
| `toggleDarkMode` | 切换暗色模式 |
| `setThemePreset` | 设置预设主题 |
| `checkContrast` | 检查对比度 |
| `getTextColorForBackground` | 获取合适文字颜色 |

### 类型定义

```typescript
type PresetTheme = 
  | 'default' | 'dark' | 'blue' | 'green' | 'purple' 
  | 'orange' | 'rose' | 'amber' | 'teal' | 'indigo' 
  | 'slate' | 'zinc'

type ThemeDensity = 'comfortable' | 'compact' | 'dense'

type ColorAlgorithm = 'default' | 'vibrant' | 'muted' | 'pastel'

type ColorBlindMode = 
  | 'none' | 'protanopia' | 'deuteranopia' 
  | 'tritanopia' | 'achromatopsia'

interface ThemeOptions {
  preset?: PresetTheme
  colors?: ThemeColors
  dark?: boolean
  persist?: boolean
  followSystem?: boolean
  algorithm?: ColorAlgorithm
}
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
| `--yh-radius-base` | 基础圆角 | `4px` |
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
| `--yh-breakpoint-sm` | 小屏幕 | `576px` |
| `--yh-breakpoint-md` | 中等屏幕 | `768px` |
| `--yh-breakpoint-lg` | 大屏幕 | `992px` |
| `--yh-breakpoint-xl` | 超大屏幕 | `1200px` |

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
- **WCAG 对比度检测**：内置对比度检查函数

---

## 更多示例

查看 [主题系统示例](/guide/theme-examples) 获取完整的交互式演示和代码示例。
