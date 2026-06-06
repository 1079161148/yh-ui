# Nuxt Integration

Use `@yh-ui/nuxt` for Nuxt 3/4 apps.

## Setup

```ts
export default defineNuxtConfig({
  modules: ['@yh-ui/nuxt'],
  yhUI: {
    importStyle: true,
    buildTranspile: true,
    prefix: 'Yh',
    ssrOptimization: {
      componentCache: true
    }
  }
})
```

## Usage

After module registration, ordinary pages should use YH-UI components directly:

```vue
<template>
  <YhButton type="primary">Create</YhButton>
  <YhInput v-model="keyword" clearable placeholder="Search" />
  <YhTable :data="rows" :columns="columns" />
</template>

<script setup lang="ts">
const keyword = ref('')
const rows = ref([{ id: 1, name: 'YH-UI' }])
const columns = [{ prop: 'name', label: 'Name' }]
</script>
```

## Auto-Imported Utilities

The module auto-imports common hooks and utilities such as `useNamespace`, `useZIndex`, `useLocale`, `useVirtualScroll`, `useAiChat`, `useSKU`, and `useCountdown`.

`useId` is imported as `useYhId` to avoid conflicts with Vue/Nuxt native `useId`.

## SSR Rules

- Use `<ClientOnly>` around browser-heavy flow editors.
- Do not assume `window`, `document`, or `localStorage` exists during SSR.
- Keep API keys on the server side, especially for AI provider routes.
- Let the module inject CSS unless the user explicitly disabled `importStyle`.
