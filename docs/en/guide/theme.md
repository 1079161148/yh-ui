# Theme System

YH-UI provides a theme system based on **CSS variables** and **design tokens**, with runtime theme customization APIs exposed by `@yh-ui/theme`.

## Overview

The current theme package includes:

- preset themes
- dark mode APIs
- density control
- color algorithm switching
- colorblind mode helpers
- component-level theme overrides
- theme import/export and history APIs
- responsive variable helpers

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

YH-UI includes 12 built-in preset themes:

- `default` - Default blue
- `dark` - Dark preset
- `blue` - Blue preset
- `green` - Green theme
- `purple` - Purple theme
- `orange` - Orange theme
- `rose` - Rose pink
- `amber` - Amber
- `teal` - Teal
- `indigo` - Indigo
- `slate` - Slate gray
- `zinc` - Zinc gray

### Density/Compactness

| Mode | Component Size | Suitable Scenarios |
| --- | --- | --- |
| `comfortable` | 32px | Normal forms, content pages |
| `compact` | 28px | Data-intensive applications |
| `dense` | 24px | Admin dashboards, tables |

### Color Algorithms

| Algorithm | Description |
| --- | --- |
| `default` | Default algorithm |
| `vibrant` | Vibrant mode - Higher saturation |
| `muted` | Muted mode - Lower saturation |
| `pastel` | Pastel mode - Light and soft |

### Colorblind Friendly Mode

| Mode | Description |
| --- | --- |
| `none` | Normal |
| `protanopia` | Protanopia (Redblind) |
| `deuteranopia` | Deuteranopia (Greenblind) |
| `tritanopia` | Tritanopia (Blueblind) |
| `achromatopsia` | Achromatopsia (Total colorblind) |

---

## API

### ThemeManager Methods

| Method | Description | Parameters |
| --- | --- | --- |
| `setPreset` | Set a preset theme | `preset: PresetTheme` |
| `setThemePreset` | Alias for setting a preset theme | `preset: PresetTheme` |
| `setColors` | Set custom colors | `colors: ThemeColors` |
| `setPrimaryColor` | Set the primary color | `color: string` |
| `setDarkMode` | Set dark mode | `dark: boolean` |
| `toggleDarkMode` | Toggle dark mode | — |
| `setDensity` | Set density | `density: ThemeDensity` |
| `setAlgorithm` | Set color generation algorithm | `algorithm: ColorAlgorithm` |
| `setColorBlindMode` | Set colorblind mode | `mode: ColorBlindMode` |
| `setComponentTheme` | Set component-level overrides | `name, overrides` |
| `clearComponentTheme` | Clear component-level overrides | `name` |
| `enableTransition` | Enable switcher animations | `config?` |
| `disableTransition` | Disable switcher animations | — |
| `applyFromPrimary` | Generate a palette from a primary color | `color: string` |
| `exportTheme` | Export the current theme | `options?` |
| `importTheme` | Import a theme configuration | `json: string` |
| `exportAsCss` | Export the current theme as CSS | — |
| `createTheme` | Create a theme configuration object | `config` |
| `applyFullConfig` | Apply a full theme configuration | `config` |
| `undo` | Undo theme changes | — |
| `getHistory` | Retrieve theme history | — |
| `clearHistory` | Clear theme history | — |
| `setResponsiveVar` | Set a responsive CSS variable | `name, values` |
| `reset` | Reset to the default theme | — |

### Shortcut Functions

| Function Name | Description |
| --- | --- |
| `initTheme` | Initialize theme |
| `useTheme` | Retrieve the theme manager |
| `setThemeColor` | Set the primary theme color |
| `toggleDarkMode` | Toggle dark mode |
| `setThemePreset` | Set a preset theme |
| `useThemeVars` | Read current theme CSS variables |
| `provideComponentThemes` | Provide component theme overrides |
| `useComponentTheme` | Read component-level theme overrides |

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

| Variable Name | Description | Default |
| --- | --- | --- |
| `--yh-color-primary` | Theme primary color | `#409eff` |
| `--yh-color-success` | Success color | `#67c23a` |
| `--yh-color-warning` | Warning color | `#e6a23c` |
| `--yh-color-danger` | Danger color | `#f56c6c` |
| `--yh-color-info` | Info color | `#909399` |
| `--yh-border-radius-base` | Base border radius | `4px` |
| `--yh-font-size-base` | Base font size | `14px` |
| `--yh-bg-color` | Site-wide background color | `#ffffff` |

### Density Variables

| Variable Name | Comfortable | Compact | Dense |
| --- | --- | --- | --- |
| `--yh-density-factor` | `1` | `0.85` | `0.7` |
| `--yh-component-size-default` | `32px` | `28px` | `24px` |
| `--yh-spacing-unit` | `8px` | `6px` | `4px` |

### Breakpoints

| Variable Name | Description | Default |
| --- | --- | --- |
| `--yh-breakpoint-xs` | Extra small screen | `0` |
| `--yh-breakpoint-sm` | Small screen | `576px` |
| `--yh-breakpoint-md` | Medium screen | `768px` |
| `--yh-breakpoint-lg` | Large screen | `992px` |
| `--yh-breakpoint-xl` | Extra large screen | `1200px` |
| `--yh-breakpoint-xxl` | Double extra large screen | `1400px` |

### Accessibility Variables

| Variable Name | Description | Default |
| --- | --- | --- |
| `--yh-focus-ring-color` | Focus ring color | `var(--yh-color-primary)` |
| `--yh-focus-ring-width` | Focus ring width | `2px` |
| `--yh-font-family-monospace` | Monospace font | `SFMono-Regular...` |

---

## Accessibility Support

YH-UI includes comprehensive built-in accessibility support:

- **Reduced Motion Preference**: Automatically detects `prefers-reduced-motion`.
- **High Contrast Mode**: Supports `prefers-contrast: high`.
- **Forced Color Mode**: Uses system color keywords.
- **WCAG Contrast Detection**: Includes built-in theme accessibility helpers.

---

## More Examples

Visit [Theme System Examples](/en/guide/theme-examples) for a full interactive demonstration and code samples.
