# Best Practices

This page summarizes recommended YH-UI usage in real product projects. It is not an API list; it is a set of conventions for team collaboration and long-term maintenance.

## Component Usage

- Prefer public component APIs instead of internal DOM structure.
- Handle product differences through `props`, events, slots, and `themeOverrides`.
- Extract repeated page patterns into product components instead of copying templates.
- Avoid writing global application state into base components so they remain reusable and testable.

## Forms

- Every field should have a clear label, validation rule, and error message.
- Group long forms by business meaning instead of showing every field at once.
- Submit buttons should enter loading or disabled state during async submission.
- Backend errors should map to fields or page-level feedback, not only console logs.

## Overlays and Feedback

- Use `Message` for lightweight immediate feedback.
- Use `Notification` for system-level information users can read later.
- Use `Dialog` for tasks that require user decisions. Avoid stacked dialogs.
- Destructive actions such as delete, overwrite, and publish need confirmation or undo.

## Theme and Styles

- Manage theme differences through tokens. Avoid global class overrides against internal component styles.
- Page-level CSS should handle layout, not component behavior states.
- Dark mode, mobile viewports, and high-contrast scenarios should be required checks for theme changes.

## Performance

- Use pagination, virtual scrolling, or lazy loading for large lists.
- Keep table cell renderers pure and avoid heavy objects per cell.
- Load icons, charts, editors, and other heavy resources on demand.
- Run docs playground and sandbox smoke tests regularly so examples do not rot.

## SSR and Nuxt

- Avoid direct `window`, `document`, or `localStorage` access during SSR initialization.
- Put browser API logic in `onMounted` or client-only plugins.
- Prefer the official Nuxt module and auto-import support in Nuxt projects.

## Testing

- Base components should cover default states, edge states, events, slots, accessibility, and SSR.
- Product components should test user paths, not just DOM fragments.
- Documentation demos should be validated through playground or sandbox checks.
- Before release, run typecheck, lint, unit tests, build, and consumer smoke tests.

## Open Source Collaboration

- Issues should include reproduction, expected behavior, actual behavior, and environment details.
- PRs should focus on one problem. Avoid mixing formatting, refactors, and feature changes.
- Breaking changes need migration notes and versioning review.
