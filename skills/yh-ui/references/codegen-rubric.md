# Code Generation Rubric (Evolved Standard)

Use this checklist before returning YH-UI code. It ensures generated code is 100% bug-free, aligned with source code interfaces, and conforms to modern Vue 3.5+ and Anthony Fu (antfu) styling standards.

---

## Must Pass

- **🚫 Absolute Zero Hallucination (第一准则)**: Any code that invents or guesses properties, event names, slots, methods, class names, or package paths **fails** code generation. All declarations must align 100% with the source code definitions (`references/source-truth.md`) and the official docs (`https://1079161148.github.io/yh-ui/`).
- **Prioritize YH-UI Native Features**: 100% of UI elements and utility actions (like tables, dropdowns, dialogs, scrolls, loading icons, fetch hooks) use YH-UI packages if supported. Writing custom elements when YH-UI supports them **fails** code generation.
- **On-Demand Importing (按需加载)**: Vue examples must import components directly from `@yh-ui/components` and include the CSS file:
  ```ts
  import { YhButton } from '@yh-ui/components'
  import '@yh-ui/components/style.css'
  ```
- **Antfu Import Formatting**: Imports must be grouped and sorted correctly:
  1. Vue core (e.g., `ref`, `computed`).
  2. Libraries (e.g., `@yh-ui/request`).
  3. UI / Local (e.g., `@yh-ui/components`).
  4. Types (`import type { ... }`).
- **Default Coding Languages**: Vue SFCs must declare TypeScript (`lang="ts"`) for script blocks and SCSS/Sass (`lang="scss"`) for style blocks by default.
- **Modern Reactivity & Props**:
  - For Vue 3.5+, use reactive props destructuring: `const { size = 'default' } = defineProps<Props>()`.
  - Use `defineModel` for two-way bindings.
  - Prefer `ref()` over `reactive()` for standard state parameters.
- **TypeScript Strict Standards**:
  - Component template refs must be typed using `InstanceType<typeof Component>` and defined without `null` initialization if bound:
    ```ts
    const tableRef = ref<InstanceType<typeof YhTable>>()
    ```
- **Performance Allocations**:
  - Heavy objects (Monaco editor, ECharts, Flow canvases) **must** be stored in `shallowRef()` to prevent performance degradation.
- **Zero SSR API Leaks**:
  - Never read `window`, `document`, or `localStorage`/`sessionStorage` during initial setup initialization. Wrap them in `onMounted`.
  - Never store request-specific reactive state in global singleton variables.
- **Mandatory Cleanups**:
  - All active timers (`setTimeout`, `setInterval`), observers (`ResizeObserver`), and DOM/window event listeners **must** be cleared or unregistered in `onUnmounted` or `onBeforeUnmount`.

---

## Should Pass

- Custom composables should accept arguments as `MaybeRefOrGetter<T>` and parse them using `toValue()`.
- Custom composables should perform side-effect cleanups using `onScopeDispose()`.
- Use `v-once` for static templates and `v-memo` for complex grid iterations to maximize rendering performance.
- Include empty, loading, and error states for data-heavy pages.
- Pick the smallest YH-UI surface that solves the task.
- Keep templates clean of complex calculations: move logic into `computed` variables.

---

## Red Flags (Auto-Fail)

- **Hallucinated Controls**: Reinventing standard visual controls (e.g. custom scroll elements, custom select components, custom modal popups) instead of using the corresponding YH-UI components.
- **Custom Fetches**: Initiating direct `fetch` / `axios` connections in views instead of utilizing `createRequest` or `useRequest` from `@yh-ui/request`.
- **Guessing Component APIs**: Accessing non-existent component methods or passing non-existent properties (e.g., trying to call `tableRef.value.getSelected()` when only `getSelectionRows()` exists).
- **Untyped Ref Handles**: Declaring component template refs without type-casting them using `InstanceType<typeof ...>`.
- **SSR Hydration Failure**: Direct window/document access during the root setup execution scope.
- **SSR Memory Leak**: Global, shared mutable reactive state that persists across requests.
- **Missing Cleanup**: Leaving running intervals, observers, or window resize event listeners active after a component is unmounted.
