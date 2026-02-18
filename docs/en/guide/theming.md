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
  --yh-radius-base: 8px;

  /* Modify typography */
  --yh-font-family: 'Inter', sans-serif;
}
```

### Scoped Overriding

Variable overrides can be applied within a specific scope:

```css
.my-custom-theme {
  --yh-color-primary: #8b5cf6;
  --yh-radius-base: 12px;
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

YH-UI has built-in dark mode support. Simply add the `dark` class to the `html` element:

```ts
// Toggle dark mode
const toggleDark = () => {
  document.documentElement.classList.toggle('dark')
}
```

Alternatively, use `useDark` from [VueUse](https://vueuse.org/):

```ts
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
```

### Customizing Dark Mode Variables

```css
html.dark {
  --yh-color-primary: #60a5fa;
  --yh-bg-color: #1a1a1a;
  --yh-bg-color-page: #0f0f0f;
}
```

## SCSS Variables

If you use SCSS, you can customize variables using `@forward` and `with`:

```scss
// styles/yh-ui-custom.scss

// Custom variables
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

// Import component styles
@use '@yh-ui/theme';
```

Configure in Vite:

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
| `--yh-radius-base` | Base radius | `4px` |
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
| `--yh-font-family-serif` | Serif font | `Georgia, Cambria...` |

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

YH-UI automatically detects the user's `prefers-reduced-motion` preference. When "reduce motion" is enabled, all animations and transitions are automatically disabled:

```css
/* Automatically applied - no manual configuration required */
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
/* Automatically applies stronger contrast */
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

YH-UI provides industry-leading theme management features, surpassing major UI libraries like Naive UI and Ant Design.

### Theme Manager

```ts
import { useTheme, initTheme } from '@yh-ui/theme'

// Initialize theme
const theme = initTheme({
  preset: 'blue',
  dark: false,
  persist: true,
  followSystem: true // Follow system dark mode
})

// Or use the Composition API
const theme = useTheme()
```

### Density/Compactness Control

YH-UI supports three density modes to suit different scenario requirements:

```ts
import { useTheme } from '@yh-ui/theme'

const theme = useTheme()

// Set density
theme.setDensity('comfortable') // Comfortable mode (Default)
theme.setDensity('compact')     // Compact mode
theme.setDensity('dense')       // Dense mode
```

| Mode | Component Size | Suitable Scenarios |
| --- | --- | --- |
| `comfortable` | 32px | Normal forms, content pages |
| `compact` | 28px | Data-intensive applications |
| `dense` | 24px | Admin dashboards, tables |

### Colorblind Friendly Mode

YH-UI features various built-in colorblind friendly palettes:

```ts
import { useTheme } from '@yh-ui/theme'

const theme = useTheme()

// Set colorblind mode
theme.setColorBlindMode('none')          // Normal
theme.setColorBlindMode('protanopia')    // Protanopia (Redblind)
theme.setColorBlindMode('deuteranopia')  // Deuteranopia (Greenblind)
theme.setColorBlindMode('tritanopia')    // Tritanopia (Blueblind)
theme.setColorBlindMode('achromatopsia') // Achromatopsia (Total colorblind)
```

### Theme Switcher Animations

Enable smooth animation effects during theme switching:

```ts
import { useTheme } from '@yh-ui/theme'

const theme = useTheme()

// Enable animations
theme.enableTransition({
  duration: 300, // milliseconds
  timing: 'cubic-bezier(0.4, 0, 0.2, 1)'
})

// Subsequent theme switches will have smooth transitions
theme.toggleDarkMode()

// Disable animations
theme.disableTransition()
```

### Intelligent Color Generation

Automatically generate a full color palette from a single primary color:

```ts
import { useTheme, generatePaletteFromPrimary } from '@yh-ui/theme'

const theme = useTheme()

// Generate a full palette from a primary color
theme.applyFromPrimary('#8b5cf6')

// Or retrieve the palette manually
const palette = generatePaletteFromPrimary('#8b5cf6')
console.log(palette)
// { primary: '#8b5cf6', success: '...', warning: '...', danger: '...', info: '...' }
```

### Color Harmony Tools

Retrieve complementary, analogous, or triadic colors:

```ts
import { useTheme } from '@yh-ui/theme'

const theme = useTheme()
const primary = '#409eff'

// Get complementary color
const complementary = theme.getComplementary(primary)

// Get analogous colors
const [analogous1, analogous2] = theme.getAnalogous(primary)

// Get triadic colors
const [triadic1, triadic2] = theme.getTriadic(primary)
```

### Component-Level Theme Overriding

Customize styles for specific components without making global modifications:

```ts
import { useTheme } from '@yh-ui/theme'

const theme = useTheme()

// Override Button component variables
theme.setComponentTheme('button', {
  'border-radius': '20px',
  'font-weight': '600',
  'padding': '0 24px'
})

// Override Input component variables
theme.setComponentTheme('input', {
  'border-radius': '8px',
  'bg-color': '#f5f5f5'
})

// Clear component-level overrides
theme.clearComponentTheme('button')
```

### Theme Inheritance and Extension

Create new themes based on existing ones:

```ts
import { useTheme } from '@yh-ui/theme'

const theme = useTheme()

// Create an inherited theme
const customTheme = theme.createTheme({
  name: 'My Brand Theme',
  author: 'Your Name',
  extends: 'blue', // Inherits from the blue preset
  colors: {
    primary: '#8b5cf6' // Only override the primary color
  },
  density: 'compact'
})

// Apply full configuration
theme.applyFullConfig({
  name: 'My App Theme',
  extends: 'purple',
  colors: { primary: '#ec4899' },
  density: 'compact',
  colorBlindMode: 'none',
  transition: true, // Enable switch animations
  components: {
    button: { 'border-radius': '20px' },
    card: { 'border-radius': '16px' }
  }
})
```

### Theme Importing/Exporting

Share theme configurations via JSON format:

```ts
import { useTheme } from '@yh-ui/theme'

const theme = useTheme()

// Export theme
const themeJson = theme.exportTheme({
  name: 'My Theme',
  author: 'Your Name'
})

// Save to file or share with others
console.log(themeJson)

// Import theme
theme.importTheme(themeJson)

// Export as pure CSS
const css = theme.exportAsCss()
```

### Theme History and Undo

Support for undoing theme changes:

```ts
import { useTheme } from '@yh-ui/theme'

const theme = useTheme()

// Change theme...
theme.setPreset('purple')
theme.setDarkMode(true)

// Undo to the previous state
theme.undo()

// Retrieve theme history
const history = theme.getHistory()

// Clear history
theme.clearHistory()
```

### Responsive Theme Variables

Automatically switch variable values based on breakpoints:

```ts
import { useTheme } from '@yh-ui/theme'

const theme = useTheme()

// Set responsive variables
theme.setResponsiveVar('--yh-font-size-base', {
  xs: '12px',
  sm: '13px',
  md: '14px',
  lg: '15px',
  xl: '16px'
})

// Set responsive spacing
theme.setResponsiveVar('--yh-spacing-unit', {
  xs: '4px',
  md: '8px',
  xl: '12px'
})
```

### Color Algorithms

Different color generation algorithms to suit various styles:

```ts
import { useTheme } from '@yh-ui/theme'

const theme = useTheme()

// Default algorithm
theme.setAlgorithm('default')

// Vibrant mode - Higher saturation
theme.setAlgorithm('vibrant')

// Muted mode - Lower saturation
theme.setAlgorithm('muted')

// Pastel mode - Light and soft
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

```vue
<!-- Usage in components -->
<script setup>
import { inject } from 'vue'

const theme = inject('theme')

const toggleDark = () => theme.toggleDarkMode()
</script>
```

---

## Comparison with Other UI Libraries

| Feature | YH-UI | Naive UI | Ant Design | Element Plus |
| --- | :---: | :---: | :---: | :---: |
| CSS Variables | ✅ | ✅ | ✅ | ✅ |
| Dark Mode | ✅ | ✅ | ✅ | ✅ |
| Preset Themes | ✅ 12+ | ✅ | ⚠️ Limited | ⚠️ Limited |
| Density/Compactness | ✅ 3 Levels | ❌ | ✅ | ❌ |
| Colorblind Modes | ✅ 5 Types | ❌ | ❌ | ❌ |
| Switcher Animations | ✅ | ❌ | ❌ | ❌ |
| Intelligent Color Generation | ✅ | ⚠️ Limited | ✅ | ❌ |
| Component-Level Overrides | ✅ | ✅ | ✅ | ⚠️ Limited |
| Theme Inheritance | ✅ | ✅ | ⚠️ | ❌ |
| Importing/Exporting | ✅ | ❌ | ❌ | ❌ |
| History/Undo | ✅ | ❌ | ❌ | ❌ |
| Responsive Variables | ✅ | ❌ | ❌ | ❌ |
| Color Algorithms | ✅ 4 Types | ❌ | ✅ | ❌ |
| WCAG Contrast Detection | ✅ | ❌ | ❌ | ❌ |
| Follow System Theme | ✅ | ⚠️ Manual | ⚠️ Manual | ⚠️ Manual |
| High Contrast Mode | ✅ | ❌ | ❌ | ❌ |
| reduced-motion | ✅ | ❌ | ❌ | ❌ |

---

For more variables, please refer to [Design Specification](/guide/design) or view the [Source Code](https://github.com/1079161148/yh-ui/blob/main/packages/theme/src/styles/variables.scss).
