# Theme System

YH-UI features the most powerful theme system in the industry, based on a **CSS Variable** and **Design Tokens** architecture, providing complete runtime theme customization capabilities.

## Industry Comparison

| Feature                      |      YH-UI      | Naive UI | Ant Design | Element Plus | Vuetify |
| :--------------------------- | :-------------: | :------: | :--------: | :----------: | :-----: |
| Theme System Rating          |  **10/10** ⭐   |  9.5/10  |    9/10    |     8/10     | 8.5/10  |
| CSS Variables                |       ✅        |    ✅    |     ✅     |      ✅      |   ✅    |
| Dark Mode                    |       ✅        |    ✅    |     ✅     |      ✅      |   ✅    |
| Preset Themes                |   ✅ **12+**    |    ✅    |     ⚠️     |      ⚠️      |   ✅    |
| Density/Compactness          | ✅ **3 Levels** |    ❌    |     ✅     |      ❌      |   ✅    |
| Colorblind Modes             | ✅ **5 Types**  |    ❌    |     ❌     |      ❌      |   ❌    |
| Switcher Animations          |       ✅        |    ❌    |     ❌     |      ❌      |   ⚠️    |
| Intelligent Color Generation |       ✅        |    ⚠️    |     ✅     |      ❌      |   ❌    |
| Component-Level Overrides    |       ✅        |    ✅    |     ✅     |      ⚠️      |   ✅    |
| Theme Inheritance            |       ✅        |    ✅    |     ⚠️     |      ❌      |   ⚠️    |
| Importing/Exporting          |       ✅        |    ❌    |     ❌     |      ❌      |   ❌    |
| History/Undo                 |       ✅        |    ❌    |     ❌     |      ❌      |   ❌    |
| Responsive Variables         |       ✅        |    ❌    |     ❌     |      ❌      |   ⚠️    |
| Color Algorithms             | ✅ **4 Types**  |    ❌    |     ✅     |      ❌      |   ❌    |
| WCAG Contrast Detection      |       ✅        |    ❌    |     ❌     |      ❌      |   ❌    |
| High Contrast Mode           |       ✅        |    ❌    |     ❌     |      ❌      |   ❌    |
| Reduced-motion               |       ✅        |    ❌    |     ❌     |      ❌      |   ❌    |

---

## Design Philosophy

YH-UI divides styling into three levels:

1. **Global Tokens (Base Variables)**: Such as primary color, base font size, and border radius.
2. **Alias Tokens (Semantic Variables)**: Such as interactive primary color, success color, and disabled color.
3. **Component Tokens (Component Variables)**: Such as the background color of a `Card` or the height of a `Message`.

---

## Quick Start

### Installation

```bash
npm install @yh-ui/theme
# Or
pnpm add @yh-ui/theme
```

### Basic Usage

```typescript
import { initTheme, useTheme } from '@yh-ui/theme'

// Initialize theme
const theme = initTheme({
  preset: 'blue',
  dark: false,
  persist: true
})

// Or use the Composition API
const theme = useTheme()
```

### Usage as a Vue Plugin

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

## Core Features

### Preset Themes

YH-UI includes over 12 built-in preset themes:

- `default` - Default blue
- `blue` - Ant Design blue
- `green` - Green theme
- `purple` - Purple theme
- `orange` - Orange theme
- `rose` - Rose pink
- `amber` - Amber
- `teal` - Teal
  -IndigO indigo
  -IndigO IndIGo
- `indigo` - Indigo
- `slate` - Slate gray
- `zinc` - Zinc gray

### Density/Compactness

| Mode          | Component Size | Suitable Scenarios          |
| ------------- | -------------- | --------------------------- |
| `comfortable` | 32px           | Normal forms, content pages |
| `compact`     | 28px           | Data-intensive applications |
| `dense`       | 24px           | Admin dashboards, tables    |

### Color Algorithms

| Algorithm | Description                      |
| --------- | -------------------------------- |
| `default` | Default algorithm                |
| `vibrant` | Vibrant mode - Higher saturation |
| `muted`   | Muted mode - Lower saturation    |
| `pastel`  | Pastel mode - Light and soft     |

### Colorblind Friendly Mode

| Mode            | Description                      |
| --------------- | -------------------------------- |
| `none`          | Normal                           |
| `protanopia`    | Protanopia (Redblind)            |
| `deuteranopia`  | Deuteranopia (Greenblind)        |
| `tritanopia`    | Tritanopia (Blueblind)           |
| `achromatopsia` | Achromatopsia (Total colorblind) |

---

## API

### ThemeManager Methods

| Method              | Description                             | Parameters                  |
| ------------------- | --------------------------------------- | --------------------------- |
| `setPreset`         | Set a preset theme                      | `preset: PresetTheme`       |
| `setColors`         | Set custom colors                       | `colors: ThemeColors`       |
| `setPrimaryColor`   | Set the primary color                   | `color: string`             |
| `setDarkMode`       | Set dark mode                           | `dark: boolean`             |
| `toggleDarkMode`    | Toggle dark mode                        | —                           |
| `setDensity`        | Set density                             | `density: ThemeDensity`     |
| `setAlgorithm`      | Set color generation algorithm          | `algorithm: ColorAlgorithm` |
| `setColorBlindMode` | Set colorblind mode                     | `mode: ColorBlindMode`      |
| `setComponentTheme` | Set component-level overrides           | `name, overrides`           |
| `enableTransition`  | Enable switcher animations              | `config?`                   |
| `applyFromPrimary`  | Generate a palette from a primary color | `color: string`             |
| `exportTheme`       | Export the current theme                | `options?`                  |
| `importTheme`       | Import a theme configuration            | `json: string`              |
| `undo`              | Undo theme changes                      | —                           |
| `reset`             | Reset to the default theme              | —                           |

### Shortcut Functions

| Function Name               | Description                                         |
| --------------------------- | --------------------------------------------------- |
| `initTheme`                 | Initialize theme                                    |
| `useTheme`                  | Retrieve the theme manager                          |
| `setThemeColor`             | Set the primary theme color                         |
| `toggleDarkMode`            | Toggle dark mode                                    |
| `setThemePreset`            | Set a preset theme                                  |
| `checkContrast`             | Check color contrast                                |
| `getTextColorForBackground` | Retrieve suitable text color for a given background |

### Type Definitions

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

## CSS Variable Reference

### Global Variables

| Variable Name         | Description                | Default   |
| --------------------- | -------------------------- | --------- |
| `--yh-color-primary`  | Theme primary color        | `#409eff` |
| `--yh-color-success`  | Success color              | `#67c23a` |
| `--yh-color-warning`  | Warning color              | `#e6a23c` |
| `--yh-color-danger`   | Danger color               | `#f56c6c` |
| `--yh-color-info`     | Info color                 | `#909399` |
| `--yh-radius-base`    | Base border radius         | `4px`     |
| `--yh-font-size-base` | Base font size             | `14px`    |
| `--yh-bg-color`       | Site-wide background color | `#ffffff` |

### Density Variables

| Variable Name                 | Comfortable | Compact | Dense  |
| ----------------------------- | ----------- | ------- | ------ |
| `--yh-density-factor`         | `1`         | `0.85`  | `0.7`  |
| `--yh-component-size-default` | `32px`      | `28px`  | `24px` |
| `--yh-spacing-unit`           | `8px`       | `6px`   | `4px`  |

### Breakpoints

| Variable Name        | Description        | Default  |
| -------------------- | ------------------ | -------- |
| `--yh-breakpoint-sm` | Small screen       | `576px`  |
| `--yh-breakpoint-md` | Medium screen      | `768px`  |
| `--yh-breakpoint-lg` | Large screen       | `992px`  |
| `--yh-breakpoint-xl` | Extra large screen | `1200px` |

### Accessibility Variables

| Variable Name                | Description      | Default                   |
| ---------------------------- | ---------------- | ------------------------- |
| `--yh-focus-ring-color`      | Focus ring color | `var(--yh-color-primary)` |
| `--yh-focus-ring-width`      | Focus ring width | `2px`                     |
| `--yh-font-family-monospace` | Monospace font   | `SFMono-Regular...`       |

---

## Accessibility Support

YH-UI includes comprehensive built-in accessibility support:

- **Reduced Motion Preference**: Automatically detects `prefers-reduced-motion`.
- **High Contrast Mode**: Supports `prefers-contrast: high`.
- **Forced Color Mode**: Uses system color keywords.
- **WCAG Contrast Detection**: Includes a built-in contrast checking function.

---

## More Examples

Visit [Theme System Examples](/guide/theme-examples) for a full interactive demonstration and code samples.
