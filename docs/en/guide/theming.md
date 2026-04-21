# Theme Customization

YH-UI offers flexible theme customization capabilities, allowing you to personalize component styles in multiple ways.

## CSS Variables

YH-UI uses CSS variables (CSS Custom Properties) to define all design tokens. All variables are prefixed with `--yh-`.

### Global Overriding

Override CSS variables in your style files:

```css
:root {
  /* Modify primary colors */
  --yh-color-primary: #6366f1;
  --yh-color-primary-light-3: #818cf8;
  --yh-color-primary-light-5: #a5b4fc;
  --yh-color-primary-light-7: #c7d2fe;
  --yh-color-primary-light-9: #e0e7ff;
  --yh-color-primary-dark-2: #4f46e5;

  /* Modify border radius */
  --yh-border-radius-base: 8px;

  /* Modify typography */
  --yh-font-family: 'Inter', sans-serif;
}
```

### Scoped Overriding

Variable overrides can be applied within a specific scope:

```css
.my-custom-theme {
  --yh-color-primary: #8b5cf6;
  --yh-border-radius-base: 12px;
}
```

```vue
<template>
  <div class="my-custom-theme">
    <yh-button type="primary">Custom Theme Button</yh-button>
  </div>
</template>
```

## Dark Mode

YH-UI provides dark mode APIs through `@yh-ui/theme`. If you are using the theme package, prefer switching dark mode through the theme manager:

```ts
import { useTheme } from '@yh-ui/theme'

const theme = useTheme()
theme.toggleDarkMode()
```

If your project manages dark mode separately, you can still override the related `--yh-*` variables in a scoped selector.

### Customizing Dark Mode Variables

```css
html.dark {
  --yh-color-primary: #60a5fa;
  --yh-bg-color: #1a1a1a;
  --yh-bg-color-page: #0f0f0f;
}
```

## SCSS Usage

The current theme package is centered on published CSS variables. For app-level customization, the reliable approach is to override the exposed `--yh-*` variables directly:

```scss
:root {
  --yh-color-primary: #6366f1;
  --yh-border-radius-base: 8px;
  --yh-font-family: 'Inter', sans-serif;
}
```

Then import the package styles as usual in your app entry:

```ts
import '@yh-ui/yh-ui/css'
```

## Available CSS Variables

### Colors

| Variable Name | Description | Default |
| --- | --- | --- |
| `--yh-color-primary` | Primary color | `#409eff` |
| `--yh-color-success` | Success color | `#67c23a` |
| `--yh-color-warning` | Warning color | `#e6a23c` |
| `--yh-color-danger` | Danger color | `#f56c6c` |
| `--yh-color-info` | Info color | `#909399` |

### Typography

| Variable Name | Description | Default |
| --- | --- | --- |
| `--yh-text-color-primary` | Primary text color | `#303133` |
| `--yh-text-color-regular` | Regular text color | `#606266` |
| `--yh-text-color-secondary` | Secondary text color | `#909399` |
| `--yh-text-color-placeholder` | Placeholder color | `#a8abb2` |
| `--yh-text-color-disabled` | Disabled text color | `#c0c4cc` |

### Borders

| Variable Name | Description | Default |
| --- | --- | --- |
| `--yh-border-color` | Border color | `#dcdfe6` |
| `--yh-border-color-light` | Light border color | `#e4e7ed` |
| `--yh-border-color-lighter` | Lighter border color | `#ebeef5` |

### Border Radius

| Variable Name | Description | Default |
| --- | --- | --- |
| `--yh-radius-sm` | Small radius | `2px` |
| `--yh-border-radius-base` | Base radius | `4px` |
| `--yh-radius-md` | Medium radius | `8px` |
| `--yh-radius-lg` | Large radius | `12px` |
| `--yh-radius-round` | Round | `20px` |

### Spacing

| Variable Name | Description | Default |
| --- | --- | --- |
| `--yh-spacing-xs` | Extra small spacing | `4px` |
| `--yh-spacing-sm` | Small spacing | `8px` |
| `--yh-spacing-md` | Medium spacing | `16px` |
| `--yh-spacing-lg` | Large spacing | `24px` |
| `--yh-spacing-xl` | Extra large spacing | `32px` |

### Breakpoints

| Variable Name | Description | Default |
| --- | --- | --- |
| `--yh-breakpoint-xs` | Extra small screen | `0` |
| `--yh-breakpoint-sm` | Small screen | `576px` |
| `--yh-breakpoint-md` | Medium screen | `768px` |
| `--yh-breakpoint-lg` | Large screen | `992px` |
| `--yh-breakpoint-xl` | Extra large screen | `1200px` |
| `--yh-breakpoint-xxl` | Double extra large screen | `1400px` |

### Font Families

| Variable Name | Description | Default |
| --- | --- | --- |
| `--yh-font-family` | Default font | System font stack |
| `--yh-font-family-monospace` | Monospace font | `SFMono-Regular, Consolas...` |

### Accessibility/Focus

| Variable Name | Description | Default |
| --- | --- | --- |
| `--yh-focus-ring-color` | Focus ring color | `var(--yh-color-primary)` |
| `--yh-focus-ring-width` | Focus ring width | `2px` |
| `--yh-focus-ring-offset` | Focus ring offset | `2px` |
| `--yh-focus-ring` | Complete focus ring style | Composite value |

### Mask Layer

| Variable Name | Description | Default |
| --- | --- | --- |
| `--yh-mask-color` | Mask color | `rgba(0, 0, 0, 0.5)` |
| `--yh-mask-color-light` | Light mask color | `rgba(0, 0, 0, 0.3)` |
| `--yh-mask-color-extra-light` | Extra light mask color | `rgba(0, 0, 0, 0.1)` |

### Scrollbars

| Variable Name | Description | Default |
| --- | --- | --- |
| `--yh-scrollbar-width` | Scrollbar width | `6px` |
| `--yh-scrollbar-thumb-color` | Scrollbar thumb color | `var(--yh-text-color-disabled)` |
| `--yh-scrollbar-thumb-hover-color` | Scrollbar thumb hover color | `var(--yh-text-color-secondary)` |
| `--yh-scrollbar-track-color` | Scrollbar track color | `transparent` |

## Accessibility Support

### Reduced Motion Preference

YH-UI automatically detects the user's `prefers-reduced-motion` preference. When "reduce motion" is enabled, animations and transitions can be reduced through the exported theme variables:

```css
@media (prefers-reduced-motion: reduce) {
  :root {
    --yh-duration-fast: 0ms;
    --yh-duration-base: 0ms;
    --yh-duration-slow: 0ms;
  }
}
```

### High Contrast Mode

YH-UI supports Windows High Contrast Mode and the `prefers-contrast: high` media query:

```css
@media (prefers-contrast: high) {
  :root {
    --yh-border-color: #000000;
    --yh-focus-ring-width: 3px;
  }
}
```

### Forced Colors Mode

For Windows High Contrast themes, YH-UI uses system color keywords to ensure accessibility:

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

## Advanced Theme Features

YH-UI provides a set of runtime theme management APIs in `@yh-ui/theme`.

### Theme Manager

```ts
import { useTheme, initTheme } from '@yh-ui/theme'

// Initialize theme
const theme = initTheme({
  preset: 'blue',
  dark: false,
  persist: true,
  followSystem: true
})

// Or use the Composition API
const theme = useTheme()
```

### Density/Compactness Control

YH-UI supports three density modes to suit different scenario requirements:

```ts
import { useTheme } from '@yh-ui/theme'

const theme = useTheme()

theme.setDensity('comfortable')
theme.setDensity('compact')
theme.setDensity('dense')
```

| Mode | Component Size | Suitable Scenarios |
| --- | --- | --- |
| `comfortable` | 32px | Normal forms, content pages |
| `compact` | 28px | Data-intensive applications |
| `dense` | 24px | Admin dashboards, tables |

### Colorblind Friendly Mode

```ts
import { useTheme } from '@yh-ui/theme'

const theme = useTheme()

theme.setColorBlindMode('none')
theme.setColorBlindMode('protanopia')
theme.setColorBlindMode('deuteranopia')
theme.setColorBlindMode('tritanopia')
theme.setColorBlindMode('achromatopsia')
```

### Theme Switcher Animations

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

### Intelligent Color Generation

```ts
import { useTheme } from '@yh-ui/theme'

const theme = useTheme()
theme.applyFromPrimary('#8b5cf6')
```

### Color Harmony Tools

```ts
import { useTheme } from '@yh-ui/theme'

const theme = useTheme()
const primary = '#409eff'

const complementary = theme.getComplementary(primary)
const [analogous1, analogous2] = theme.getAnalogous(primary)
const [triadic1, triadic2] = theme.getTriadic(primary)
```

### Component-Level Theme Overriding

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

### Theme Inheritance and Extension

```ts
import { useTheme } from '@yh-ui/theme'

const theme = useTheme()

const customTheme = theme.createTheme({
  name: 'My Brand Theme',
  author: 'Your Name',
  extends: 'blue',
  colors: {
    primary: '#8b5cf6'
  },
  density: 'compact'
})

theme.applyFullConfig(customTheme)
```

### Theme Importing/Exporting

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

### Theme History and Undo

```ts
import { useTheme } from '@yh-ui/theme'

const theme = useTheme()

theme.setPreset('purple')
theme.setDarkMode(true)
theme.undo()

const history = theme.getHistory()
theme.clearHistory()
```

### Responsive Theme Variables

```ts
import { useTheme } from '@yh-ui/theme'

const theme = useTheme()

theme.setResponsiveVar('--yh-font-size-base', {
  xs: '12px',
  sm: '13px',
  md: '14px',
  lg: '15px',
  xl: '16px'
})
```

### Color Algorithms

```ts
import { useTheme } from '@yh-ui/theme'

const theme = useTheme()

theme.setAlgorithm('default')
theme.setAlgorithm('vibrant')
theme.setAlgorithm('muted')
theme.setAlgorithm('pastel')
```

### Usage as a Vue Plugin

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

---

For more variables, please refer to [Design Specification](/en/guide/design) or view the [Source Code](https://github.com/1079161148/yh-ui/blob/main/packages/theme/src/styles/variables.scss).
