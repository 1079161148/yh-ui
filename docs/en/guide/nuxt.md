# Using YH-UI in Nuxt

This guide will help you integrate and use the YH-UI component library in your Nuxt 3/4 projects.

## Installation

### 1. Install Dependencies

```bash
pnpm add @yh-ui/nuxt

# Or using npm
npm install @yh-ui/nuxt

# Or using yarn
yarn add @yh-ui/nuxt
```

### 2. Register Module

Add the `@yh-ui/nuxt` module to your `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: ['@yh-ui/nuxt']
})
```

## Core Advantages

Why choose YH-UI for use with Nuxt?

1. **Nuxt 3/4 Module Integration**: The module is built for Nuxt `^3.11.0 || ^4.0.0-rc.1`.
2. **Auto-imports**: The module auto-imports `Yh` components, directives, common hooks, and several global methods.
3. **SSR-aware Utilities**: The runtime plugin creates a per-request z-index counter to avoid shared SSR state.
4. **CSS Entry Injection**: With `importStyle: true`, the module injects `@yh-ui/components/style`.
5. **Build Integration**: With `buildTranspile: true`, related YH-UI packages are added to Nuxt transpilation.

## Precautions

During use, please be sure to follow these points to avoid common SSR pitfalls:

### 1. Client-only Logic

Since code executes on both the server and client simultaneously, direct access to `window`, `document`, or `localStorage` will cause server errors.

- **Recommended Practice**: Use the `onMounted` hook or the environment check provided by `@yh-ui/utils`.

### 2. Hydration Mismatch

Vue errors will occur if the server-generated HTML differs from the initial client-rendered HTML.

- **Recommended Practice**: Ensure consistency in rendered data or wrap dynamic content with the `<ClientOnly>` component.

### 3. Component Ref Retrieval

In Nuxt, it is recommended to use `ref<InstanceType<typeof YhButton>>()` to retrieve component instances for the best type support.

## Configuration

You can customize module behavior using the `yhUI` configuration key:

```typescript
export default defineNuxtConfig({
  modules: ['@yh-ui/nuxt'],

  yhUI: {
    importStyle: true
  }
})
```

In the default setup, `@yh-ui/nuxt` automatically injects YH-UI's CSS styles, so pure CSS projects work without any Sass setup.
The module injects the explicit CSS subpath `@yh-ui/components/style.css` into `nuxt.options.css`, avoiding any dependency on source Sass files and preventing Nuxt SSR style extraction warnings.

### Available Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `importStyle` | `boolean` | `true` | Whether to automatically inject YH-UI CSS styles |
| `prefix` | `string` | `'Yh'` | Component prefix; for example, if set to `My`, component names will be `MyButton` |
| `buildTranspile` | `boolean` | `true` | Whether to automatically transpile related dependencies |
| `ssrOptimization.componentCache` | `boolean` | `true` | Whether to enable the module's component cache optimization option |

When `importStyle` is `true`, the Nuxt module appends `@yh-ui/components/style.css` to `nuxt.options.css`.

## Auto-import

### Component Auto-import

All components starting with `Yh` are automatically imported, no manual registration required:

```vue
<template>
  <div>
    <YhButton type="primary">Click me</YhButton>
    <YhInput v-model="value" placeholder="Input content" />
    <YhSelect v-model="selected">
      <YhOption label="Option 1" value="1" />
      <YhOption label="Option 2" value="2" />
    </YhSelect>
  </div>
</template>

<script setup>
const value = ref('')
const selected = ref('')
</script>
```

### Composables Auto-import

Commonly used hooks are also automatically imported:

```vue
<script setup>
const ns = useNamespace('my-component')
const id = useId()
const yhId = useYhId()
const { nextZIndex } = useZIndex()
</script>
```

Available composables include `useNamespace`, `useId`, `useYhId`, `useZIndex`, `useLocale`, `useFormItem`, and `useGlobalNamespace`.

### Global Method Auto-import

Message utilities are also automatically imported:

```vue
<script setup>
const showSuccess = () => {
  YhMessage.success('Operation successful!')
}

const showNotification = () => {
  YhNotification({
    title: 'Notification Title',
    message: 'This is notification content',
    type: 'success'
  })
}

const openDialog = async () => {
  await YhMessageBox.alert('Dialog content')
}
</script>
```

The module also auto-imports `YhDialogMethod`, `YhLoading`, and `useAddressParser`.

## SSR Support

YH-UI can be used in SSR-based Nuxt projects, and the module includes SSR-oriented runtime handling for IDs and z-index state.

### SSR Safety

#### Features Safe for SSR

- Rendering of component markup
- Props and event binding
- Style application
- BEM class name generation
- ID generation through Vue 3.5 `useId`
- z-index management with per-request state

#### Features Restricted to Client

The following features only take effect in client environments and are safely ignored during the SSR phase:

- DOM operations such as `focus()` and `blur()`
- Browser event listeners such as `resize` and `scroll`
- Accessing `window` or `document`

### Hydration Consistency

The module keeps SSR IDs and z-index state isolated per request to reduce common hydration mismatches caused by shared runtime state.

### Best Practices

#### 1. Avoid Direct DOM Access in Setup

```vue
<script setup>
// Error: window does not exist during SSR
// const width = window.innerWidth

const width = ref(0)
onMounted(() => {
  width.value = window.innerWidth
})
</script>
```

#### 2. Use isClient Checks

```vue
<script setup>
import { isClient } from '@yh-ui/utils'

if (isClient) {
  console.log('Running in browser')
}
</script>
```

#### 3. Asynchronous Data Fetching

```vue
<script setup>
const { data } = await useFetch('/api/data')
</script>
```

## Full Examples

### Basic Page

```vue
<!-- pages/index.vue -->
<template>
  <div class="container">
    <h1>YH-UI + Nuxt Example</h1>

    <YhForm :model="form" label-width="100px">
      <YhFormItem label="Username">
        <YhInput v-model="form.username" placeholder="Please input username" />
      </YhFormItem>

      <YhFormItem label="Password">
        <YhInput
          v-model="form.password"
          type="password"
          show-password
          placeholder="Please input password"
        />
      </YhFormItem>

      <YhFormItem label="Type">
        <YhSelect v-model="form.type" placeholder="Please select">
          <YhOption label="Type 1" value="1" />
          <YhOption label="Type 2" value="2" />
          <YhOption label="Type 3" value="3" />
        </YhSelect>
      </YhFormItem>

      <YhFormItem>
        <YhButton type="primary" @click="handleSubmit">Submit</YhButton>
        <YhButton @click="handleReset">Reset</YhButton>
      </YhFormItem>
    </YhForm>
  </div>
</template>

<script setup lang="ts">
const form = reactive({
  username: '',
  password: '',
  type: ''
})

const handleSubmit = () => {
  YhMessage.success('Submitted successfully!')
}

const handleReset = () => {
  form.username = ''
  form.password = ''
  form.type = ''
}
</script>
```

### Page with Data Fetching

```vue
<!-- pages/users.vue -->
<script setup lang="ts">
const { data: users } = await useFetch('/api/users')

const editUser = (user) => {
  YhNotification({
    title: 'Edit User',
    message: `Editing user: ${user.name}`,
    type: 'info'
  })
}

const deleteUser = async (userId) => {
  try {
    await $fetch(`/api/users/${userId}`, { method: 'DELETE' })
    YhMessage.success('Deleted successfully')
  } catch (error) {
    YhMessage.error('Deletion failed')
  }
}
</script>
```

## Theme Customization

### Global Configuration

Use the `YhConfigProvider` component for global configuration:

```vue
<!-- app.vue -->
<template>
  <YhConfigProvider :theme="theme" :locale="locale" size="default">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </YhConfigProvider>
</template>

<script setup lang="ts">
import { en } from '@yh-ui/locale'

const theme = ref('default')
const locale = ref(en)
</script>
```

### CSS Variable Overriding

Override CSS variables in your global styles:

```css
/* assets/css/main.css */
:root {
  --yh-color-primary: #6366f1;
  --yh-color-success: #10b981;
  --yh-color-warning: #f59e0b;
  --yh-color-danger: #ef4444;
  --yh-border-radius-base: 8px;
  --yh-font-family: 'Inter', sans-serif;
}
```

## Type Support

YH-UI provides TypeScript type definitions through the public package exports:

```vue
<script setup lang="ts">
import type { FormInstance } from '@yh-ui/yh-ui'

const formRef = ref<FormInstance>()
</script>
```

## Frequently Asked Questions

### 1. Components not auto-imported?

Ensure you have correctly installed and registered the `@yh-ui/nuxt` module:

```typescript
export default defineNuxtConfig({
  modules: ['@yh-ui/nuxt']
})
```

### 2. Styles not loading?

Check whether automatic style injection was explicitly disabled:

```typescript
export default defineNuxtConfig({
  yhUI: {
    importStyle: true
  }
})
```

### 3. Hydration Mismatch error?

This is usually caused by accessing `window` or `document` directly within `setup`. Please use `onMounted`.

### 4. How to disable auto-import for a specific component?

If you need fine-grained control, you can import the component manually from the public package:

```vue
<script setup>
import { YhButton } from '@yh-ui/yh-ui'
</script>
```

## Getting Help

- [GitHub Issues](https://github.com/1079161148/yh-ui/issues)
- [Documentation](https://1079161148.github.io/yh-ui/)
- [Changelog](https://github.com/1079161148/yh-ui/blob/main/CHANGELOG.md)

## Related Links

- [Nuxt Official Documentation](https://nuxt.com)
- [Vue 3 Documentation](https://vuejs.org)
- [YH-UI Component Documentation](/en/)
