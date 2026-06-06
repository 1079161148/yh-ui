# Theme Customization

YH-UI's theme system is based on CSS variables. Public variables use the `--yh-` prefix. You can override them globally, within a local container, or at component level so one component set can support multiple brands and product lines.

## Basic Usage

Import styles in your application entry:

```ts
import '@yh-ui/yh-ui/css'
```

Override variables in global CSS:

```css
:root {
  --yh-color-primary: #2563eb;
  --yh-color-success: #16a34a;
  --yh-radius-base: 6px;
  --yh-font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

## Local Themes

When multiple brand areas exist on the same page, scope variables to a container:

```css
.finance-theme {
  --yh-color-primary: #0f766e;
  --yh-color-warning: #ca8a04;
}

.ai-theme {
  --yh-color-primary: #7c3aed;
  --yh-bg-color-page: #f8fafc;
}
```

```vue
<template>
  <section class="finance-theme">
    <yh-button type="primary">Submit approval</yh-button>
  </section>
</template>
```

## Dark Mode

If your application manages dark mode itself, switch variables through a root class:

```css
html.dark {
  --yh-bg-color: #141414;
  --yh-bg-color-page: #0f0f0f;
  --yh-text-color-primary: #f5f7fa;
  --yh-text-color-regular: #d4d7de;
  --yh-border-color: #414243;
}
```

If you use `@yh-ui/theme`, manage it through the theme API:

```ts
import { useTheme } from '@yh-ui/theme'

const theme = useTheme()
theme.toggleDarkMode()
```

## Component-Level Overrides

Most components support `themeOverrides`. Use component-level overrides for local product styling. Design-system-level differences should still become global tokens.

```vue
<template>
  <yh-button
    type="primary"
    :theme-overrides="{
      borderRadius: '10px',
      fontWeight: '600'
    }"
  >
    Brand button
  </yh-button>
</template>
```

## Token Categories

| Category   | Examples                                        | Recommended Usage                         |
| ---------- | ----------------------------------------------- | ----------------------------------------- |
| Color      | `--yh-color-primary`, `--yh-text-color-primary` | Brand, semantic, text, border, background |
| Typography | `--yh-font-family`, `--yh-font-size-base`       | Font stack, font size, line height        |
| Spacing    | `--yh-spacing-md`                               | Layout, form, list density                |
| Radius     | `--yh-radius-base`                              | Buttons, inputs, cards, overlays          |
| Shadow     | `--yh-shadow-base`                              | Dropdowns, overlays, floating layers      |
| Z-index    | `--yh-z-index-modal`                            | Dialogs, notifications, loading layers    |
| Motion     | `--yh-duration-base`                            | Transition duration and easing            |

## Theme Governance

- Do not override internal component classes in product CSS. Prefer tokens, `themeOverrides`, and slots.
- Do not create multiple variables for the same meaning, such as `primaryBlue`, `brandBlue`, and `mainBlue`.
- Every new token should document its meaning, default value, applicable components, and dark-mode behavior.
- Theme changes must be verified in light mode, dark mode, mobile viewports, and SSR.

## Related Docs

- [Design Principles](/en/guide/design)
- [Figma and Tokens](/en/guide/figma-tokens)
- [Theme System](/en/guide/theme)
