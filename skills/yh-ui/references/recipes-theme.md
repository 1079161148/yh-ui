# Deep Recipe: YH-UI Theme System

Use this recipe when integrating or customising themes, dark mode, responsive scaling, compact density, or color-blind friendly palettes using `@yh-ui/theme`.

## Default Choice

Use `ThemePlugin` during app registration and access reactive theme state using `useTheme` or `useThemeVars`.

## Setup

```ts
import { createApp } from 'vue'
import { ThemePlugin } from '@yh-ui/theme'
import App from './App.vue'

const app = createApp(App)

app.use(ThemePlugin, {
  preset: 'default', // 'default' | 'dark' | 'blue' | 'green' | 'purple' | 'orange' | 'rose' | 'amber' | 'teal' | 'indigo' | 'slate' | 'zinc'
  dark: false, // Initial mode
  persist: true, // Save theme choices to localStorage automatically
  persistKey: 'yh-ui-theme',
  followSystem: true, // Follow OS dark/light mode preference
  radius: 'md', // 'none' | 'sm' | 'md' | 'lg' | 'full'
  density: 'comfortable', // 'comfortable' | 'compact' | 'dense'
  colorBlindMode: 'none', // 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia'
  algorithm: 'default' // 'default' | 'vibrant' | 'muted' | 'pastel'
})

app.mount('#app')
```

## Composition APIs

Use `useTheme` to get the ThemeManager instance or `useThemeVars` for Vue-friendly reactive properties:

```vue
<script setup lang="ts">
import { useTheme, useThemeVars } from '@yh-ui/theme'

// Option 1: Accessing the ThemeManager
const theme = useTheme()

function toggleDark() {
  theme.toggleDarkMode()
}

function selectPreset(name: 'blue' | 'green' | 'purple') {
  theme.setPreset(name)
}

function selectDensity(density: 'comfortable' | 'compact' | 'dense') {
  theme.setDensity(density)
}

// Option 2: Using reactive variables directly
const { dark, theme: currentPreset, density, colorBlindMode } = useThemeVars()
</script>

<template>
  <div class="settings">
    <p>Current Theme: {{ currentPreset }} (Dark mode: {{ dark }})</p>
    <p>Density Factor: {{ density }}</p>
    <p>Accessibility Mode: {{ colorBlindMode }}</p>

    <button @click="toggleDark">Toggle Dark Mode</button>
    <button @click="selectPreset('blue')">Blue Preset</button>
    <button @click="selectDensity('compact')">Compact Layout</button>
  </div>
</template>
```

## Advanced Theme Customization

### Smart Palette Generation

Generate complete secondary semantic status colors (success, warning, danger, info) automatically from a single primary brand color:

```ts
import { useTheme } from '@yh-ui/theme'

const theme = useTheme()
// Generates and applies primary/success/warning/danger/info hex color scale
theme.applyFromPrimary('#722ed1')
```

### Color Contrast Checks (WCAG 2.1 AA/AAA)

Ensure generated colors meet user accessibility contrast guidelines:

```ts
import { checkContrast, getTextColorForBackground } from '@yh-ui/theme'

// Returns true if contrast ratio is >= 4.5 (or >= 7 for AAA)
const isAccessible = checkContrast('#ffffff', '#1890ff', 'AA')

// Returns '#ffffff' or '#000000' based on contrast luminance
const suitableTextColor = getTextColorForBackground('#1890ff')
```

### Component-Level Custom Styles

You can override specific design tokens for a single component globally or dynamically:

```ts
import { useTheme } from '@yh-ui/theme'

const theme = useTheme()
theme.apply({
  components: {
    YhButton: {
      '--yh-button-font-weight': '600',
      '--yh-button-border-radius': '8px'
    }
  }
})
```

## CSS Variable Usage

Instead of hardcoding color hexes, border-radii, spacing, or typography values, always leverage YH-UI's global theme tokens:

```vue
<style scoped>
.custom-card {
  color: var(--yh-text-color-primary);
  background-color: var(--yh-bg-color);
  border: 1px solid var(--yh-border-color);
  border-radius: var(--yh-border-radius-base);
  padding: calc(var(--yh-spacing-unit) * 2);

  /* Font size and line height scales dynamically with density setting */
  font-size: var(--yh-font-size-base);
  line-height: var(--yh-line-height-base);
}

.custom-card:hover {
  border-color: var(--yh-color-primary-hover);
}
</style>
```
