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
  modules: [
    '@yh-ui/nuxt'
  ]
})
```

## Core Advantages

Why choose YH-UI for use with Nuxt?

1.  **🚀 Zero-Configuration SSR Support**: All components undergo deep SSR optimization to ensure HTML is generated on the server, enhancing SEO and first-screen loading speeds without tedious configuration.
2.  **🧩 Semantic Auto-import**: The module automatically registers all `Yh` components, Composables, and global methods. You just write the code; the IDE provides perfect hints, and no `import` is needed.
3.  **⚡ Extreme Performance Optimization**: Supports Tree Shaking. Combined with Nuxt's code-splitting mechanism, only the components you truly use are bundled, keeping the package size to a minimum.
4.  **🔒 Status Isolation and Safety**: Addressing global state pollution risks in SSR environments, we provide request-level isolation for `useZIndex` and `useId` to ensure the safety of concurrent multi-user access.
5.  **🎨 On-demand Style Loading**: The style system supports SCSS/CSS on-demand injection and is deeply integrated with the Nuxt theme system.

## Precautions

During use, please be sure to follow these points to avoid common SSR pitfalls:

### 1. Client-only Logic
Since code executes on both the server and client simultaneously, direct access to `window`, `document`, or `localStorage` will cause server errors.
*   **Recommended Practice**: Use the `onMounted` hook or the environment check provided by Nuxt via `import { isClient } from '@yh-ui/utils'`.

### 2. Hydration Mismatch
Vue errors will occur if the server-generated HTML differs from the initial client-rendered HTML (for example, generating random numbers or rendering the current time directly within `setup`).
*   **Recommended Practice**: Ensure consistency in rendered data or wrap dynamic content with the `<ClientOnly>` component.

### 3. Component Ref Retrieval
In Nuxt, it is recommended to use `ref<InstanceType<typeof YhButton>>()` to retrieve component instances for the best type support.

## Configuration

You can customize module behavior using the `yhUI` configuration key:

```typescript
export default defineNuxtConfig({
  modules: ['@yh-ui/nuxt'],
  
  yhUI: {
    // Whether to auto-import styles (default: true)
    importStyle: true
  }
})
```

### Available Options

| Option | Type | Default | Description |
|------|------|--------|------|
| `importStyle` | `boolean` | `true` | Whether to automatically import component styles |
| `prefix` | `string` | `'Yh'` | Component prefix; for example, if set to `My`, component names will be `MyButton` |
| `buildTranspile` | `boolean` | `true` | Whether to automatically transpile related dependencies |

## Auto-import

### Component Auto-import

All components starting with `Yh` are automatically imported, no manual registration required:

```vue
<template>
  <div>
    <!-- Use directly, no import needed -->
    <YhButton type="primary">Click me</YhButton>
    <YhInput v-model="value" placeholder="Input content" />
    <YhSelect v-model="selected">
      <YhOption label="Option 1" value="1" />
      <YhOption label="Option 2" value="2" />
    </YhSelect>
  </div>
</template>

<script setup>
// No need to import components
const value = ref('')
const selected = ref('')
</script>
```

### Composables Auto-import

Commonly used hooks are also automatically imported:

```vue
<script setup>
// Use directly, no import needed
const ns = useNamespace('my-component')
const id = useId()
const { nextZIndex } = useZIndex()

// Generate BEM class names
const className = computed(() => ns.b())  // 'yh-my-component'
const blockClass = computed(() => ns.b('header'))  // 'yh-my-component-header'
</script>
```

**Available Composables**:
- `useNamespace` - BEM class name generation
- `useId` - Unique ID generation
- `useZIndex` - z-index management
- `useLocale` - Internationalization
- `useFormItem` - Form item integration
- `useGlobalNamespace` - Global namespace

### Global Method Auto-import

Message and Notification methods are also automatically imported:

```vue
<script setup>
const showSuccess = () => {
  // Use directly, no import needed
  YhMessage.success('Operation successful!')
}

const showNotification = () => {
  YhNotification({
    title: 'Notification Title',
    message: 'This is notification content',
    type: 'success'
  })
}
</script>
```

## SSR Support

YH-UI fully supports Server-Side Rendering (SSR), and all components have passed SSR compatibility tests.

### SSR Safety

#### ✅ Features Safe for SSR

- Rendering of all base components
- Props and event binding
- Style application
- BEM class name generation
- ID generation (using Vue 3.5 native `useId`)
- z-index management (application-level isolation)

#### 🔒 Features Restricted to Client

The following features only take effect in client environments and are safely ignored during the SSR phase:

- DOM operations (such as `focus()`, `blur()`)
- Browser event listeners (such as `resize`, `scroll`)
- Accessing `window` or `document`

### Hydration Consistency

YH-UI ensures the HTML structures rendered on the server and client are perfectly consistent, avoiding Hydration Mismatch errors.

#### Internal Mechanisms

1. **ID Generation**: Uses Vue 3.5+ native `useId()` API
2. **Z-Index Management**: Each SSR request has an independent counter
3. **DOM Access Protection**: All DOM operations are wrapped within `onMounted`

### Best Practices

#### 1. Avoid Direct DOM Access in Setup

```vue
<script setup>
// ❌ Error: window does not exist during SSR
const width = window.innerWidth

// ✅ Correct: Access within onMounted
const width = ref(0)
onMounted(() => {
  width.value = window.innerWidth
})
</script>
```

#### 2. Use isClient / isServer Checks

```vue
<script setup>
import { isClient } from '@yh-ui/utils'

// ✅ Correct: Conditional execution
if (isClient) {
  // Client-only logic
  console.log('Running in browser')
}
</script>
```

#### 3. Asynchronous Data Fetching

```vue
<script setup>
// ✅ Recommended: Use Nuxt data fetching methods
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
    
    <!-- Form -->
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
        <YhButton type="primary" @click="handleSubmit">
          Submit
        </YhButton>
        <YhButton @click="handleReset">
          Reset
        </YhButton>
      </YhFormItem>
    </YhForm>
  </div>
</template>

<script setup lang="ts">
// Components and methods are auto-imported

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

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px;
}
</style>
```

### Page with Data Fetching

```vue
<!-- pages/users.vue -->
<template>
  <div class="user-list">
    <YhCard v-for="user in users" :key="user.id" class="user-card">
      <template #header>
        <div class="card-header">
          <span>{{ user.name }}</span>
          <YhTag :type="user.status">{{ user.status }}</YhTag>
        </div>
      </template>
      
      <div class="user-info">
        <p>Email: {{ user.email }}</p>
        <p>Phone: {{ user.phone }}</p>
      </div>
      
      <template #footer>
        <YhButton type="primary" size="small" @click="editUser(user)">
          Edit
        </YhButton>
        <YhButton type="danger" size="small" @click="deleteUser(user.id)">
          Delete
        </YhButton>
      </template>
    </YhCard>
  </div>
</template>

<script setup lang="ts">
// Use Nuxt data fetching (SSR friendly)
const { data: users } = await useFetch('/api/users')

const editUser = (user) => {
  YhNotification({
    title: 'Edit User',
    message: `Editing user: ${user.name}`,
    type: 'info'
  })
}

const deleteUser = async (userid) => {
  try {
    await $fetch(`/api/users/${id}`, { method: 'DELETE' })
    YhMessage.success('Deleted successfully')
  } catch (error) {
    YhMessage.error('Deletion failed')
  }
}
</script>

<style scoped>
.user-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.user-card {
  height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
```

## Theme Customization

### Global Configuration

Use the `ConfigProvider` component for global configuration:

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
const theme = ref({
  primaryColor: '#6366f1',
  borderRadius: '8px'
})

const locale = ref('en-US')
</script>
```

### CSS Variable Overriding

Override CSS variables in your global styles:

```css
/* assets/css/main.css */
:root {
  /* Primary color */
  --yh-color-primary: #6366f1;
  --yh-color-success: #10b981;
  --yh-color-warning: #f59e0b;
  --yh-color-danger: #ef4444;
  
  /* Border radius */
  --yh-border-radius-base: 8px;
  
  /* Font */
  --yh-font-family: 'Inter', sans-serif;
}
```

## Performance Optimization

### Tree Shaking

YH-UI supports Tree Shaking—unused components are not bundled:

```vue
<template>
  <!-- Only Button is used; other components will not be bundled -->
  <YhButton>Click Me</YhButton>
</template>
```

### On-demand Loading

For large components (such as Table or Transfer), consider dynamic importing when needed:

```vue
<script setup>
// Dynamic import (though components are auto-imported, this can be used for code-splitting)
const showTree = ref(false)

const loadTreeSelect = async () => {
  showTree.value = true
}
</script>

<template>
  <div>
    <YhButton @click="loadTreeSelect">Load TreeSelect</YhButton>
    <YhTreeSelect v-if="showTree" v-model="value" :data="treeData" />
  </div>
</template>
```

## Type Support

YH-UI provides complete TypeScript type definitions, enabling type safety and autocomplete:

```vue
<script setup lang="ts">
import type { FormInstance } from '@yh-ui/components'

const formRef = ref<FormInstance>()

const validate = async () => {
  try {
    await formRef.value?.validate()
    // Validation passed
  } catch (error) {
    // Validation failed
  }
}
</script>

<template>
  <YhForm ref="formRef" :model="form">
    <!-- ... -->
  </YhForm>
</template>
```

## Frequently Asked Questions

### 1. Components not auto-imported?

Ensure you have correctly installed and registered the `@yh-ui/nuxt` module:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@yh-ui/nuxt']  // Ensure this line exists
})
```

### 2. Styles not loading?

Check if style importation is enabled in your configuration:

```typescript
export default defineNuxtConfig({
  yhUI: {
    importStyle: true  // Ensure this is true
  }
})
```

### 3. Hydration Mismatch error?

This is usually caused by accessing `window` or `document` directly within `setup`. Please use `onMounted`:

```vue
<script setup>
// ❌ Error
const width = ref(window.innerWidth)

// ✅ Correct
const width = ref(0)
onMounted(() => {
  width.value = window.innerWidth
})
</script>
```

### 4. How to disable auto-import for a specific component?

Currently, all components are automatically imported. If you need fine-grained control, you can import them manually:

```vue
<script setup>
import { YhButton } from '@yh-ui/components'
// Explicit imports will override automatic ones
</script>
```

## Getting Help

- [GitHub Issues](https://github.com/1079161148/yh-ui/issues)
- [Documentation](https://yh-ui.example.com)
- [Changelog](https://github.com/1079161148/yh-ui/blob/main/CHANGELOG.md)

## Related Links

- [Nuxt Official Documentation](https://nuxtjs.org)
- [Vue 3 Documentation](https://vuejs.org)
- [YH-UI Component Documentation](/)
