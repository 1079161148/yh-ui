# Vue Component Practices

Use these rules when generating or reviewing YH-UI Vue 3 code. They combine Vue official guidance with component-library patterns that make AI-generated code safer and easier to maintain.

## SFC Structure

- Prefer `<script setup lang="ts">` for application examples and small components.
- Order SFC blocks as `<script>`, `<template>`, then `<style>`.
- Keep imports at the top, then types, props/emits/models, state, computed values, watchers, lifecycle hooks, and functions grouped by feature.
- Use `scoped` styles for page/example CSS unless the task intentionally edits global theme CSS.
- Avoid large inline template expressions. Move non-trivial logic to computed values or functions.

## Props, Emits, And v-model

- Type props with TypeScript interfaces or inline type literals.
- Use `withDefaults(defineProps<Props>(), defaults)` when defaults are needed.
- Use typed `defineEmits` for custom events.
- For two-way binding, prefer `defineModel` in new Vue 3.4+ examples when the target project supports it; otherwise use `modelValue` and `update:modelValue`.
- Never mutate props directly. Emit events or copy prop values into local state when local edits are needed.
- Keep event names explicit and user-action oriented, such as `submit`, `cancel`, `refresh`, or `update:filters`.

## Slots And Composition

- Prefer slots for customizable content over hard-coded markup when writing reusable components.
- Use named slots for clear extension points such as `header`, `toolbar`, `actions`, `empty`, and `footer`.
- In app pages, compose YH-UI components directly instead of wrapping every component in a thin local abstraction.
- Create composables only when stateful logic is reused or complex enough to deserve a named boundary.

## Reactivity

- Use `ref` for primitives and replaceable values.
- Use `reactive` for stable object state that is mutated by field.
- Use `computed` for derived values instead of maintaining duplicated state.
- Use `watch` for side effects, not for deriving values.
- Avoid destructuring reactive objects unless using `toRefs`, `storeToRefs`, or Vue 3.5 reactive props destructure intentionally.
- Use `shallowRef` for large immutable objects, external instances, editors, charts, or flow graphs when deep reactivity is unnecessary.

## Accessibility

- Prefer semantic HTML around YH-UI components.
- Ensure icon-only buttons have an accessible label.
- Keep form labels visible through `YhFormItem` or explicit `aria-label`.
- Preserve keyboard behavior for dialogs, drawers, dropdowns, popovers, tabs, and menus.
- Do not remove focus outlines unless replacing them with an equally visible focus style.

## Performance

- Keep large tables and lists virtualized when YH-UI offers virtual scrolling.
- Use lazy-loaded components for heavy features such as flow editors, charts, code editors, and AI artifact renderers.
- Avoid creating new object/function literals in hot template loops when they can be stable constants.
- Use `v-show` for frequent toggles and `v-if` for expensive conditional branches.
- Use stable `:key` values in `v-for`; never use array index when item identity exists.
- Keep expensive formatting in computed values or memoized helpers.

## SSR And Hydration

- Do not access `window`, `document`, `localStorage`, `ResizeObserver`, or canvas APIs during SSR.
- Use `onMounted` or Nuxt `<ClientOnly>` for browser-only integrations.
- Give flow editors, charts, virtual lists, and code editors stable container dimensions to avoid hydration/layout shifts.
- Keep server-rendered initial state deterministic.

## Forms And Data Pages

- Use `YhForm`, `YhFormItem`, and typed form state for editable data.
- Keep search filters separate from committed query params when a page needs reset/search behavior.
- Include loading, error, empty, and success feedback for request-driven screens.
- Use `YhMessage`, `YhNotification`, `YhPopconfirm`, and `YhMessageBox` for user feedback instead of ad hoc alerts.
- Use `YhTable` columns as stable constants or computed values, not inline arrays in templates.

## Component-Library Code Style

- Preserve public API compatibility when editing reusable components.
- Do not rename props/events unless the user explicitly asks for a breaking change.
- Keep component props small and orthogonal.
- Prefer CSS variables and existing theme tokens over hard-coded colors.
- Use `useNamespace` for internal BEM-style component classes when editing package components.
- Use `useZIndex`, `useLocale`, `useId`/`useYhId`, and config hooks instead of local one-off implementations.

## Testing Expectations

- For reusable components, test props, emitted events, slots, keyboard/focus behavior, and important visual states.
- For composables, test state transitions and cleanup.
- For request code, test loading, success, error, retry, and cancellation when present.
- For Nuxt/SSR examples, check that browser-only code is gated.
