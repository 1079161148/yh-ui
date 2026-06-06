# Accessibility Standard

YH-UI aims to keep core components usable with keyboards, screen readers, high contrast settings, and SSR-oriented applications. A release should prove not only that components render, but also that they can be understood and operated.

## Release Gate

```bash
pnpm verify:a11y
```

The command opens key documentation pages and checks:

| Area                 | Standard                                                                                      |
| -------------------- | --------------------------------------------------------------------------------------------- |
| Page title           | Every page must have a non-empty title                                                        |
| Headings             | Each page needs one visible `h1`, and heading levels must not skip                            |
| Images               | Non-decorative images need `alt` text                                                         |
| Interactive elements | Buttons, links, menu items, tabs, and similar controls need accessible names                  |
| Form controls        | Inputs, selects, and textareas need labels, `aria-label`, `title`, or meaningful placeholders |
| DOM stability        | Pages must not contain duplicate `id` values                                                  |

The report is written to `test-results/a11y/a11y-report.json`.

## Component Requirements

- Clickable controls should use native `button` or `a` elements whenever possible.
- Overlay components must handle focus entry, focus restoration, `Esc` close behavior, and modal semantics.
- Form components must support `disabled`, `readonly`, error states, helper text, and `aria-*` passthrough.
- Icon-only buttons must provide `aria-label` or visible text.
- Motion-heavy components should respect reduced-motion user preferences.

## Manual Acceptance

Automated checks only cover baseline rules. A stable release also needs manual verification:

- Complete the main Button, Input, Select, Dialog, Drawer, Table, and Upload flows using only the keyboard.
- Use a screen reader to inspect form errors, dialog titles, menu items, and table rows/columns.
- Check dark mode, high contrast, and 200% zoom for readable text and operable controls.

## Responsibility Model

Components own default semantics and keyboard behavior. Applications own real labels, image meaning, validation copy, and domain-specific descriptions. YH-UI should make the accessible path the default path.
