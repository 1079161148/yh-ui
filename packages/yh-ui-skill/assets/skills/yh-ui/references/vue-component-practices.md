# Vue Component Practices (Evolved Standard)

Use these rules when generating or reviewing YH-UI Vue 3.5+ code. They combine Vue official core guidance, Anthony Fu (antfu) best practices, and industry-leading component-library standards.

---

## 1. Imports & SFC Code Structure (Antfu Style)

- **Strict Import Grouping & Sorting**:
  1. **Core dependencies**: Vue core APIs (e.g. `ref`, `computed`, `watch`, `onMounted`).
  2. **Third-party / Tooling libraries**: (e.g. `@yh-ui/request`, `@yh-ui/ai-sdk`).
  3. **Local components and hooks**: (e.g. `@yh-ui/components`, `@yh-ui/hooks`).
  4. **Types and Interfaces**: Always separate runtime imports from type-only imports using `import type`.
  ```ts
  import { computed, onMounted, ref } from 'vue'
  import { useRequest } from '@yh-ui/request'
  import { YhTable } from '@yh-ui/components'
  import type { TableColumn } from '@yh-ui/components'
  ```
- **SFC Block Ordering & Language Defaults**: Always write scripts in TypeScript (`lang="ts"`) and styles in SCSS/Sass (`lang="scss"`) by default. Layout files strictly as:

  ```html
  <script setup lang="ts">
    // TypeScript Logic
  </script>

  <template>
    <!-- HTML Structure -->
  </template>

  <style scoped lang="scss">
    /* SCSS Scoped Styling */
  </style>
  ```

- **Scoped Styles Requirement**: Styles must always be `scoped` to prevent selector leaking. Prefer CSS custom properties (Variables) with sensible fallbacks:
  ```css
  .yh-element {
    color: var(--yh-color-primary, #1d4ed8);
    background-color: var(--yh-bg-color, #ffffff);
  }
  ```

---

## 2. Props, Emits, and v-model

- **Reactive Props Destructuring (Vue 3.5+)**:
  Always use Vue 3.5 native reactive destructuring for props, supplying defaults directly in the destructure expression. Avoid verbose `withDefaults`.

  ```ts
  interface Props {
    size?: 'small' | 'default' | 'large'
    disabled?: boolean
    items?: string[]
  }

  const { size = 'default', disabled = false, items = () => [] } = defineProps<Props>()
  ```

- **Two-way Bindings with `defineModel`**:
  Use the Vue 3.4+ native `defineModel` macro for cleaner two-way data flows:
  ```ts
  const modelValue = defineModel<string>({ default: '' })
  ```
- **Typed Emits**:
  Always declare emits with strict TypeScript tuple parameters instead of array strings:
  ```ts
  const emit = defineEmits<{
    change: [value: string]
    submit: []
  }>()
  ```

---

## 3. Slots & Composition Customization

- **Flexible Slot Design (`slots`)**:
  Prefer using Vue `slots` for customizable templates over hard-coded markup. Always declare and use named slots (e.g. `header`, `footer`, `actions`, `empty`) to provide clear extension templates:
  ```html
  <slot name="header">
    <h3>Default Header Title</h3>
  </slot>
  ```
- **Component Composition**:
  Prefer composing multiple YH-UI library components together (e.g. nesting slots, wrapper components) before deciding to write raw custom controls.

---

## 4. Reactivity and Composable Design (Antfu & Vueuse Standards)

- **Prefer `ref()` over `reactive()`**:
  Use `ref()` for all state variables (including objects and arrays) to keep destructuring clean and avoid losing reactivity. Use `reactive()` only when managing deep, nested form states that must be passed as a single object.
- **MaybeRefOrGetter and toValue (Vue 3.3+)**:
  When writing reusable hooks/composables that accept reactive inputs, declare them as `MaybeRefOrGetter<T>` to accept raw values, Refs, or Getter functions. Use `toValue()` to retrieve their current value reactively:

  ```ts
  import { toValue } from 'vue'
  import type { MaybeRefOrGetter } from 'vue'

  export function useFeature(enabled: MaybeRefOrGetter<boolean>) {
    const isActive = computed(() => toValue(enabled))
  }
  ```

- **Scope Disposal for Composables**:
  Always clean up active watchers, event listeners, and side-effects inside composables using `onScopeDispose` so they can be clean-run in non-component reactive scopes (like Pinia stores):

  ```ts
  import { onScopeDispose, watch } from 'vue'

  watch(source, (val) => {
    // side effect
  })

  onScopeDispose(() => {
    // clean up side effect if scope is destroyed
  })
  ```

- **Shallow Ref for Performance (`shallowRef`)**:
  Always wrap heavy non-reactive objects, DOM nodes, third-party libraries (e.g. Monaco Editor, ECharts, Flow canvas objects) in `shallowRef()` instead of `ref()` to bypass Vue's deep proxy traversal, saving significant CPU cycles:
  ```ts
  import { shallowRef } from 'vue'
  const editorInstance = shallowRef<any>(null)
  ```

---

## 5. Performance & DOM Optimization

- **Template Ref Binding**:
  Type template refs cleanly using Vue's component instance types. Keep the ref initializer empty (without passing `null`) since Vue will automatically assign it on mount:

  ```ts
  import { ref } from 'vue'
  import { YhTable } from '@yh-ui/components'

  const tableRef = ref<InstanceType<typeof YhTable>>()
  // Access: tableRef.value?.exportData()
  ```

- **v-once and v-memo**:
  - Use `v-once` for complex static text, icons, or banners that never update after initial mount.
  - Use `v-memo` for virtual lists, heavy table columns, or grids to selectively re-trigger patch loops only when specific criteria changes:
    ```html
    <div v-for="item in list" :key="item.id" v-memo="[item.updatedAt, selectedId === item.id]">
      <!-- Deep cell content -->
    </div>
    ```

---

## 6. Accessibility Standards (A11y)

- **Accessible Outlines & Semantic HTML**:
  Never strip accessibility focus outlines without supplying custom visible focus states. Rely on semantic HTML structure (`<nav>`, `<main>`, `<article>`, `<header>`) when writing template wrappers.
- **Labels & Aria attributes**:
  Ensure that icon-only buttons define a descriptive `aria-label` attribute. Keep inputs properly linked with visual labels or explicit `aria-label` placeholders to guarantee full screen-reader accessibility.
- **Keyboard Navigation**:
  Maintain correct keyboard accessibility tab indexes and focus-trap logic inside overlay views (like dialogs, drawer panels, or search drop-downs).

---

## 7. SSR & Hydration Safeguards (Nuxt Compatibility)

- **Zero Browser API Calls during Setup**:
  - Do not access `window`, `document`, `navigator`, or `localStorage`/`sessionStorage` directly in the setup scope.
  - Wrap all browser-specific execution inside `onMounted` or gate it using `import.meta.client` (or `typeof window !== 'undefined'`):
    ```ts
    onMounted(() => {
      const token = localStorage.getItem('auth-token')
    })
    ```
- **Memory Leak Prevention on Server**:
  Never declare component-level or page-level mutable state in global singleton module-level variables. All reactive state must be wrapped inside `setup()` or Pinia boundaries to prevent cross-request state pollution during SSR.
- **ClientOnly Wrapping**:
  For charts, code editors, and canvas components (like `@yh-ui/flow`), wrap them inside the `<ClientOnly>` component (in Nuxt) or gate them via dynamic mounting triggers:
  ```html
  <ClientOnly fallback="Loading canvas...">
    <Flow :nodes="nodes" :edges="edges" />
  </ClientOnly>
  ```

---

## 8. CSS BEM Namespace (YH-UI Library Rule)

When modifying or building library components, use YH-UI's built-in namespace utility `useNamespace` to auto-generate standard classes following the BEM (Block-Element-Modifier) pattern:

```ts
import { useNamespace } from '@yh-ui/hooks'

const ns = useNamespace('my-button')
// ns.b()     -> 'yh-my-button'
// ns.e('icon') -> 'yh-my-button__icon'
// ns.m('disabled') -> 'yh-my-button--disabled'
```

---

## 9. Lifecycle Cleanups Checklist

To ensure absolute stability, every component **must** clean up all registered side-effects inside `onUnmounted` / `onBeforeUnmount`:

- Clear all `setTimeout` and `setInterval` handles.
- Disconnect `ResizeObserver`, `IntersectionObserver`, and `MutationObserver` instances.
- Remove event listeners bound to `window`, `document`, or custom event emitter nodes:

  ```ts
  const onResize = () => {
    /* ... */
  }
  window.addEventListener('resize', onResize)

  onUnmounted(() => {
    window.removeEventListener('resize', onResize)
  })
  ```

- Clean up active audio/video elements, media recorders, or streaming controllers (like LangChain's `AbortController`).
