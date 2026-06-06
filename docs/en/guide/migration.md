# Migration Guide

This guide is for teams moving from an older YH-UI version, another Vue component library, or an internal component system. Start with one product module, validate the migration, and then expand gradually.

## Pre-Migration Audit

Before changing code, build an inventory:

- Components, wrappers, and global style overrides currently in use.
- Theme variables, brand colors, dark mode, and typography.
- High-frequency features such as forms, validation, overlays, messages, tables, and upload.
- Engineering constraints such as Nuxt, SSR, auto imports, tree shaking, and bundle size.
- Legacy pages that are still used but no longer have clear ownership.

## Install and Register

Install the package:

```bash
pnpm add @yh-ui/yh-ui
```

Register it in your app entry:

```ts
import { createApp } from 'vue'
import YhUI from '@yh-ui/yh-ui'
import '@yh-ui/yh-ui/css'
import App from './App.vue'

createApp(App).use(YhUI).mount('#app')
```

For Nuxt projects, prefer the YH-UI Nuxt module so server and client registration stay consistent.

## Recommended Order

1. Base styles and tokens: import `@yh-ui/yh-ui/css`, restore brand colors, typography, radius, and dark mode.
2. Low-risk display components: Button, Icon, Tag, Badge, Card, Alert.
3. Form controls: Input, Select, DatePicker, Checkbox, Radio, Form.
4. Feedback and overlays: Message, Notification, Dialog, Drawer, Tooltip, Popover.
5. Complex product components: Table, Upload, Tree, Transfer, Flow, AI Components.
6. Remove old wrappers and unused style overrides.

## Migrating From Other Libraries

### Naming

YH-UI components use the `Yh` prefix and kebab-case tags:

```vue
<yh-button type="primary">Save</yh-button>
<yh-input v-model="keyword" clearable />
```

If your app already has business wrappers, keep their names first and replace internals with YH-UI to reduce the initial diff.

### Theme Mapping

Do not copy old class overrides directly. Map them to YH-UI tokens:

```css
:root {
  --yh-color-primary: var(--brand-primary);
  --yh-radius-base: 6px;
  --yh-font-family: var(--app-font-family);
}
```

### Forms

When migrating forms, verify:

- `v-model` field names and initial values.
- Validation triggers, such as `change`, `blur`, or manual validation.
- Error messages still appear near the field.
- Disabled, readonly, clearable, prefix, suffix, and slot behavior is preserved.

## Release Strategy

Use gradual rollout:

- Migrate one product domain or component group at a time.
- Add visual screenshots or Playwright smoke tests for migrated modules.
- Keep comparison examples in Storybook, docs playground, or an internal page.
- When an API gap appears, adapt it in a product wrapper first, then decide whether to upstream it to YH-UI.

## Acceptance Checklist

- `pnpm typecheck` passes.
- `pnpm lint` passes.
- Key pages pass SSR or Nuxt preview.
- Form submission, overlay close paths, messages, route changes, and dark mode are verified.
- Migrated modules no longer depend on styles from the old component library.

## Related Docs

- [Quick Start](/en/guide/quickstart)
- [Theme Customization](/en/guide/theming)
- [Best Practices](/en/guide/best-practices)
