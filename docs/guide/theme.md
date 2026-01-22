# Theme 主题系统

YH-UI 拥有一套基于 **CSS 变量** 和 **Design Tokens** 的深度定制化主题系统。

## 设计思想

YH-UI 将样式分为三个层级：
1. **基础变量 (Global Tokens)**：如主色、基础字号、圆角。
2. **语义变量 (Alias Tokens)**：如交互主色、成功色、失效色。
3. **组件变量 (Component Tokens)**：如 `Card` 的背景色、`Message` 的高度等。

通过这种层级设计，您可以实现“一键换色”，也能精确控制单个组件的微小细节。

---

## 动态切换主题

YH-UI 提供了内置的 `ThemeManager` 来在运行时动态修改 CSS 变量。

### 1. 修改主色

您可以随时调用 `setThemeColor` 来改变全站的主题色。

<script setup lang="ts">
import { setThemeColor, toggleDarkMode, useTheme } from '@yh-ui/theme'
import { YhMessage } from '@yh-ui/components/message'

const changeToPurple = () => {
  setThemeColor('#722ed1')
  YhMessage.success('已切换为紫色主题')
}

const changeToBlue = () => {
  setThemeColor('#409eff')
  YhMessage.info('已恢复默认蓝色主题')
}

const handleToggleDark = () => {
  const isDark = toggleDarkMode()
  YhMessage({
    message: isDark ? '已开启暗黑模式' : '已回到亮色模式',
    type: 'info'
  })
}
</script>

<div style="display: flex; gap: 12px; margin-bottom: 24px;">
  <yh-button type="primary" color="#722ed1" @click="changeToPurple">切换紫色</yh-button>
  <yh-button type="primary" @click="changeToBlue">恢复默认蓝</yh-button>
  <yh-button @click="handleToggleDark">切换暗黑/亮色</yh-button>
</div>

### 2. 代码示例

```typescript
import { setThemeColor, toggleDarkMode } from 'yh-ui'

// 一键修改主题色，全量组件自动适配
setThemeColor('#fa8c16')

// 切换暗黑模式
toggleDarkMode()
```

---

## CSS 变量深度定制

如果您想通过 CSS 直接覆盖某些属性，可以针对特定变量进行重写。

### 覆盖特定组件样式

您可以在 CSS 中直接覆盖特定组件的语义变量：

```css
:root {
  /* 改变所有卡片的圆角 */
  --yh-card-border-radius: 12px;
  
  /* 改变所有消息框的背景阴影 */
  --yh-message-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}
```

---

## API 参考

### 方法

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| setThemeColor | 动态更新主色 | `color: string` | — |
| toggleDarkMode | 切换暗黑模式 | — | `boolean` (当前是否为暗色) |
| setThemePreset | 设置预设主题 | `'default' \| 'blue' \| 'purple' \| 'orange' \| 'green'` | — |
| useTheme | 获取主题管理器实例 | — | `ThemeManager` |

### 常用全局变量 (Global Tokens)

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--yh-color-primary` | 主题主色 | `#409eff` |
| `--yh-radius-base` | 基础圆角 | `4px` |
| `--yh-font-size-base` | 基础字号 | `14px` |
| `--yh-bg-color` | 全站背景色 | `#ffffff` |
