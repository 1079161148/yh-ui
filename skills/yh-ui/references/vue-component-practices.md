# Vue Component Practices

Use these rules when generating or reviewing YH-UI Vue 3 code. They combine Vue official guidance with component-library patterns that make AI-generated code safer and easier to maintain.

## SFC Structure

- Prefer `<script setup lang="ts">` for all application pages and component definitions.
- Always order SFC blocks as `<script>`, `<template>`, then `<style scoped>`.
- Internal setup block sequence:
  1. Module/library imports (separate external dependencies from local `@yh-ui` packages).
  2. TypeScript types & interfaces.
  3. `defineProps`, `defineEmits`, and `defineModel`.
  4. Reactive state & refs.
  5. Computed properties.
  6. Watchers (`watch` / `watchEffect`).
  7. Lifecycle hooks (`onMounted`, `onUnmounted`, etc.).
  8. Action functions / methods.
- Use `scoped` styles to prevent styling leakages. Never use raw global selector tags inside SFC styles.
- Keep templates clean: move calculations, complex conditions, or array mapping out of the template into computed variables.

## Props, Emits, And v-model

- Always type props with clear TypeScript interfaces. Use type-only imports (`import type { ... }`) for external type models.
- For **Vue 3.5+**, prefer reactive props destructuring:
  ```ts
  const { size = 'medium', disabled = false, data = () => [] } = defineProps<Props>()
  ```
  This is the official Vue 3.5+ best practice and avoids verbose `withDefaults`.
- For Vue < 3.5 or projects without destructure support, fallback to `withDefaults(defineProps<Props>(), defaults)`.
- Use typed `defineEmits` or `defineModel` for two-way bindings:

  ```ts
  // Two-way binding model (Vue 3.4+)
  const modelValue = defineModel<string>({ default: '' })

  // Typed custom events
  const emit = defineEmits<{
    change: [value: string]
    submit: []
  }>()
  ```

- Never mutate props. If props need internal modifications, copy them to a local `ref` or compile them via `computed` getters/setters.

## Slots And Composition

- Prefer slots for customizable content over hard-coded markup when writing reusable components.
- Use named slots for clear extension points such as `header`, `toolbar`, `actions`, `empty`, and `footer`.
- In app pages, compose YH-UI components directly instead of wrapping every component in a thin local abstraction.
- Create composables only when stateful logic is reused or complex enough to deserve a named boundary.

## Reactivity & Lifecycle Cleanups

- Use `ref` for primitive values, lists/arrays, or objects that will be completely overwritten.
- Use `reactive` only for complex nested states that require deep property mutation.
- Use `computed` for all derived values instead of writing sync watchers or manually maintaining double state variables.
- Use `watch` or `watchEffect` solely for side-effects (e.g. storage sync, async API triggers). Always specify `immediate: true` or `deep: true` only if required.
- Use `shallowRef` for heavy objects, DOM nodes, third-party library instances (ECharts, Monco Editor, Flow canvases), as deep reactivity on these will degrade performance.
- **Critical Lifecycle Cleanups**: Always clean up timeouts, intervals, ResizeObservers, WebSocket event listeners, and custom event listeners in `onUnmounted`:
  ```ts
  const timer = setInterval(tick, 1000)
  onUnmounted(() => {
    clearInterval(timer)
  })
  ```

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

## YH-UI Prioritization & Extension Workflow

To ensure we prioritize existing UI framework logic and do not write duplicate custom HTML/CSS controls, follow this decision tree when implementing user interface requests:

1. **Verify Availability**: Search `references/source-truth.md` and `references/component-map.md`. If a component exists (e.g., `YhTable`, `YhDialog`, `YhConfigProvider`, `YhScrollbar`), you **must** use it. Do not write raw `<div class="custom-scroll">` or raw `<dialog>`.
2. **Handle Feature Gaps (Encapsulation/Extension)**: If a component is missing a sub-feature, do not abandon the component. Apply extension patterns in order of priority:
   - **Slot Customization**: Use slots (e.g., `#toolbar`, `#empty`, `#default` custom cells) to inject the custom logic.
   - **Props & Event Listeners**: Use component event bindings and dynamic property configs to override behavior.
   - **CSS Variable Injection**: Inject style variables (e.g. style overrides like `--yh-button-font-weight`) to alter theme aesthetics without altering core element code.
   - **Composite Patterns**: Group multiple YH-UI components together (e.g. wrap a `YhTable` and `YhPagination` or nesting slots) before trying to write raw elements.
3. **Raw Component Last Resort**: Only build a custom element from scratch if the functionality is entirely absent in the UI framework and cannot be composed/wrapped. You must document this reasoning in the code comments.

## TypeScript Strict Standards

To maintain clean typing boundaries and avoid runtime failures, follow these TS conventions:

- **Type-only imports**: When importing interfaces, schemas, or types from YH-UI packages, use the `import type` syntax:
  ```ts
  import type { FormSchema } from '@yh-ui/components'
  import type { FlowNode, FlowEdge } from '@yh-ui/flow'
  import type { ThemeOptions } from '@yh-ui/theme'
  ```
- **Type Template Refs**: Never leave component template refs untyped (`const refVal = ref(null)`). Always use Vue's `InstanceType` utility to extract component exports:

  ```ts
  import { ref } from 'vue'
  import { YhTable } from '@yh-ui/components'

  const tableRef = ref<InstanceType<typeof YhTable> | null>(null)
  ```

- **Exposed APIs**: Access exposed methods on components strictly through these typed instances (e.g., `tableRef.value?.exportData(...)`, `formRef.value?.validate()`).
- **Data Models**: Strongly type response objects and row lists using `interface` declarations; never pass `any` into data bindings or request helper promises.

## Testing Expectations

- For reusable components, test props, emitted events, slots, keyboard/focus behavior, and important visual states.
- For composables, test state transitions and cleanup.
- For request code, test loading, success, error, retry, and cancellation when present.
- For Nuxt/SSR examples, check that browser-only code is gated.
