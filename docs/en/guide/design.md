# Design Principles

YH-UI is designed for real product systems. Interfaces should be clear, stable, predictable, and consistent across teams, themes, and framework environments.

## Core Principles

### Consistency

Similar information should look similar, and similar actions should provide similar feedback.

- Visual consistency: colors, radius, spacing, shadows, and motion come from shared tokens.
- Interaction consistency: buttons, overlays, forms, and feedback components follow the same state model.
- Language consistency: use clear verbs and avoid multiple names for the same action.

### Predictability

Users should understand what will happen before an action and confirm the result afterwards.

- Destructive actions must be clearly marked and should provide confirmation or undo when possible.
- Form errors should appear where users can fix them, not only at the top of the page.
- Async operations need loading, disabled, or progress feedback to avoid repeated submissions.

### Efficiency

Defaults should cover most product scenarios so common tasks are fast to complete.

- Provide stable default layouts for forms, tables, overlays, and navigation.
- Support keyboard access, batch operations, data-driven configuration, and slots.
- Do not trade information density for decoration in admin or operational interfaces.

### Composability

Components should be independent, replaceable, and easy to compose.

- A component should not silently take over application state.
- Advanced behavior should be exposed through props, events, slots, and composables.
- Theme, locale, size, and namespace should work through `ConfigProvider` and CSS variables.

### Accessibility

Accessibility is part of component behavior, not a patch after release.

- Interactive elements need visible focus styles.
- Color must not be the only source of information.
- Overlays, dropdowns, messages, and form controls should preserve semantic and keyboard paths.
- Motion should respect `prefers-reduced-motion`.

## Visual System

### Color

Colors are organized as brand, semantic, text, border, fill, and background tokens.

| Type    | Token Example         | Purpose                                            |
| ------- | --------------------- | -------------------------------------------------- |
| Brand   | `--yh-color-primary`  | Primary buttons, links, active states              |
| Success | `--yh-color-success`  | Success feedback and completed states              |
| Warning | `--yh-color-warning`  | Risk hints and pending confirmation                |
| Danger  | `--yh-color-danger`   | Errors, deletion, irreversible actions             |
| Info    | `--yh-color-info`     | Neutral descriptions and auxiliary information     |
| Text    | `--yh-text-color-*`   | Headings, body text, secondary text, disabled text |
| Border  | `--yh-border-color-*` | Dividers, inputs, card boundaries                  |

### Typography

The default font stack uses system UI fonts first for clarity and performance.

```css
--yh-font-family:
  -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans',
  sans-serif;
--yh-font-family-monospace:
  'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
```

### Spacing

YH-UI uses a 4px base grid. Common spacing values are 4, 8, 12, 16, 20, 24, and 32px. Compact interfaces should reduce outer whitespace instead of compressing line height.

### Radius and Shadow

Radius communicates hierarchy and tactility, but it should not weaken information density in professional tools. Keep default radius restrained. Cards and overlays may use stronger shadows, but avoid mixing too many shadow levels on one page.

## Interaction Principles

### Complete States

Every interactive component should consider:

- Default
- Hover
- Active
- Focus
- Disabled
- Loading
- Error / Warning / Success

### Feedback Levels

| Scenario                       | Recommended Component         |
| ------------------------------ | ----------------------------- |
| Field-level form errors        | `FormItem` validation message |
| Lightweight operation feedback | `Message`                     |
| System-level notifications     | `Notification`                |
| Actions requiring confirmation | `MessageBox` / `Popconfirm`   |
| Page-level result              | `Result`                      |
| Area loading                   | `Loading` / `Spin`            |

### Responsive Behavior

Mobile is not just a smaller desktop layout. Tables, filters, action bars, and overlays should adjust information priority on narrow screens to avoid overlaps and squeezed buttons.

## Design Review Checklist

Before merging or releasing, check:

- The component supports dark theme and key semantic colors.
- Keyboard users can complete the main interaction path.
- Long text, empty data, loading, and error states remain readable.
- Overlays handle scroll lock, focus, close paths, and layer order.
- Documentation demos cover default usage, edge cases, and product integration.

## Related Docs

- [Theme Customization](/en/guide/theming)
- [Figma and Tokens](/en/guide/figma-tokens)
- [Best Practices](/en/guide/best-practices)
