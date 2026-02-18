# Design Specification

YH-UI follows modern design principles to provide a consistent, beautiful, and easy-to-use user interface.

## Design Principles

### 1. Consistency

Maintain visual and interactive consistency:

- **Visual Consistency**: Components with the same function have the same appearance.
- **Interactive Consistency**: The same operations provide the same feedback.
- **Language Consistency**: Use unified terminology and phrasing.

### 2. Feedback

Every user action should have clear feedback:

- **Instant Feedback**: Button clicks have hover/active states.
- **Progress Feedback**: Loading states show when an operation is in progress.
- **Result Feedback**: Message/Notification informs the user of the result of an operation.

### 3. Efficiency

Reduce the user's operational cost:

- **Reduce Steps**: Simplify processes and minimize unnecessary actions.
- **Provide Default Values**: Sensible default configurations.
- **Keyboard Friendly**: Support for Tab navigation and keyboard shortcuts.

### 4. Controllability

Users should be able to control the interface:

- **Undoable**: Support for undoing operations.
- **Configurable**: Provide customization options.
- **Predictable**: Operational results are as expected.

---

## Color System

### Brand Colors

| Color | Variable Name | Purpose |
| --- | --- | --- |
| <span style="background:#409eff;color:white;padding:2px 8px;border-radius:4px">#409eff</span> | `--yh-color-primary` | Primary actions, links, active states |
| <span style="background:#67c23a;color:white;padding:2px 8px;border-radius:4px">#67c23a</span> | `--yh-color-success` | Success, completion, correct |
| <span style="background:#e6a23c;color:white;padding:2px 8px;border-radius:4px">#e6a23c</span> | `--yh-color-warning` | Warnings, reminders |
| <span style="background:#f56c6c;color:white;padding:2px 8px;border-radius:4px">#f56c6c</span> | `--yh-color-danger` | Errors, danger, deletion |
| <span style="background:#909399;color:white;padding:2px 8px;border-radius:4px">#909399</span> | `--yh-color-info` | Information, descriptions |

### Text Colors

| Color | Variable Name | Purpose |
| --- | --- | --- |
| <span style="background:#303133;color:white;padding:2px 8px;border-radius:4px">#303133</span> | `--yh-text-color-primary` | Headings, primary text |
| <span style="background:#606266;color:white;padding:2px 8px;border-radius:4px">#606266</span> | `--yh-text-color-regular` | Body content |
| <span style="background:#909399;color:white;padding:2px 8px;border-radius:4px">#909399</span> | `--yh-text-color-secondary` | Secondary information |
| <span style="background:#a8abb2;color:white;padding:2px 8px;border-radius:4px">#a8abb2</span> | `--yh-text-color-placeholder` | Placeholder text |
| <span style="background:#c0c4cc;color:black;padding:2px 8px;border-radius:4px">#c0c4cc</span> | `--yh-text-color-disabled` | Disabled states |

### Border Colors

| Color | Variable Name | Purpose |
| --- | --- | --- |
| <span style="background:#dcdfe6;padding:2px 8px;border-radius:4px">#dcdfe6</span> | `--yh-border-color` | Default borders |
| <span style="background:#e4e7ed;padding:2px 8px;border-radius:4px">#e4e7ed</span> | `--yh-border-color-light` | Light borders |
| <span style="background:#ebeef5;padding:2px 8px;border-radius:4px">#ebeef5</span> | `--yh-border-color-lighter` | Lighter borders |

---

## Typography System

### Font Families

```css
--yh-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
                  'Helvetica Neue', Arial, 'Noto Sans', sans-serif;

--yh-font-family-monospace: 'SFMono-Regular', Consolas, 'Liberation Mono', 
                             Menlo, Courier, monospace;
```

### Font Sizes

| Variable | Size | Purpose |
| --- | --- | --- |
| `--yh-font-size-extra-large` | 20px | Large headings |
| `--yh-font-size-large` | 18px | Headings |
| `--yh-font-size-medium` | 16px | Subheadings |
| `--yh-font-size-base` | 14px | Body (Default) |
| `--yh-font-size-small` | 13px | Supporting text |
| `--yh-font-size-extra-small` | 12px | Labels, descriptions |

### Line Heights

| Variable | Value | Purpose |
| --- | --- | --- |
| `--yh-line-height-tight` | 1.3 | Compact text |
| `--yh-line-height-normal` | 1.5 | Body text |
| `--yh-line-height-loose` | 1.7 | Multi-line text |

---

## Spacing System

Based on a 4px spacing system:

| Variable | Value | Purpose |
| --- | --- | --- |
| `--yh-spacing-xs` | 4px | Minimal spacing |
| `--yh-spacing-sm" | 8px | Small spacing |
| `--yh-spacing-md" | 16px | Medium spacing |
| `--yh-spacing-lg" | 24px | Large spacing |
| `--yh-spacing-xl" | 32px | Extra large spacing |

---

## Border Radius

| Variable | Value | Purpose |
| --- | --- | --- |
| `--yh-radius-sm` | 2px | Small elements |
| `--yh-radius-base` | 4px | Default |
| `--yh-radius-md` | 8px | Medium |
| `--yh-radius-lg` | 12px | Large elements |
| `--yh-radius-round` | 20px | Rounded buttons |

---

## Shadows

| Variable | Purpose |
| --- | --- |
| `--yh-shadow-sm` | Subtle shadow, e.g., cards |
| `--yh-shadow-base` | Default shadow, e.g., dropdown menus |
| `--yh-shadow-md` | Medium shadow, e.g., pop-ups |
| `--yh-shadow-lg` | Large shadow, e.g., modal dialogs |

---

## Animations

### Duration

| Variable | Value | Purpose |
| --- | --- | --- |
| `--yh-duration-fast` | 100ms | Rapid feedback |
| `--yh-duration-base` | 200ms | Default animations |
| `--yh-duration-slow` | 300ms | Complex animations |

### Timing Functions

| Variable | Value | Purpose |
| --- | --- | --- |
| `--yh-timing-ease` | ease | Default |
| `--yh-timing-ease-in` | ease-in | Entrance |
| `--yh-timing-ease-out` | ease-out | Exit |
| `--yh-timing-ease-in-out` | ease-in-out | Smooth |

---

## Z-index Layers

| Variable | Value | Purpose |
| --- | --- | --- |
| `--yh-z-index-normal` | 1 | Normal elements |
| `--yh-z-index-top` | 1000 | Top elements |
| `--yh-z-index-popper` | 2000 | Pop-up layers |
| `--yh-z-index-overlay` | 2001 | Mask layers |
| `--yh-z-index-modal` | 2002 | Modal dialogs |
| `--yh-z-index-popover` | 2003 | Popovers |
| `--yh-z-index-tooltip` | 2004 | Tooltips |
| `--yh-z-index-loading` | 2005 | Loading layers |

---

## Responsive Breakpoints

| Variable | Value | Device |
| --- | --- | --- |
| `--yh-breakpoint-xs` | 0 | Extra small screen |
| `--yh-breakpoint-sm` | 576px | Mobile landscape |
| `--yh-breakpoint-md` | 768px | Tablet |
| `--yh-breakpoint-lg` | 992px | Small desktop |
| `--yh-breakpoint-xl` | 1200px | Desktop |
| `--yh-breakpoint-xxl` | 1400px | Large desktop |

---

## Accessibility Design

YH-UI adheres to WCAG 2.1 AA standards:

- **Color Contrast**: Text and background contrast ratio ≥ 4.5:1.
- **Focus Visibility**: All interactive elements have clear focus styles.
- **Keyboard Navigation**: Full support for keyboard-only operation.
- **Semantic Structure**: Use correct ARIA attributes.
- **Reduced Motion**: Support for `prefers-reduced-motion`.

---

## More Resources

- [Theme System](/guide/theme) - Learn how to customize themes.
- [Theme System Examples](/guide/theme-examples) - View interactive examples.
- [Theme Customization](/guide/theming) - Detailed customization documentation.
