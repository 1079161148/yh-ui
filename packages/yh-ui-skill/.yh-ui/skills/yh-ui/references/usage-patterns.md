# Usage Patterns

These patterns are intentionally short. Use them as starting points, then adapt names and data to the user's app.

## Filterable Table Page

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { YhButton, YhForm, YhFormItem, YhInput, YhTable } from '@yh-ui/components'

const keyword = ref('')
const rows = ref([{ id: 1, name: 'YH-UI', status: 'active' }])
const columns = [
  { prop: 'name', label: 'Name' },
  { prop: 'status', label: 'Status' }
]

function search() {
  // call API or filter rows
}
</script>

<template>
  <YhForm inline>
    <YhFormItem label="Keyword">
      <YhInput v-model="keyword" clearable placeholder="Search" />
    </YhFormItem>
    <YhFormItem>
      <YhButton type="primary" @click="search">Search</YhButton>
    </YhFormItem>
  </YhForm>

  <YhTable :data="rows" :columns="columns" />
</template>
```

## Dialog Form

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { YhButton, YhDialog, YhForm, YhFormItem, YhInput } from '@yh-ui/components'

const open = ref(false)
const name = ref('')
</script>

<template>
  <YhButton type="primary" @click="open = true">Create</YhButton>

  <YhDialog v-model="open" title="Create item">
    <YhForm>
      <YhFormItem label="Name">
        <YhInput v-model="name" />
      </YhFormItem>
    </YhForm>
  </YhDialog>
</template>
```

## Theme Variables In Custom CSS

```vue
<template>
  <section class="summary-panel">
    <slot />
  </section>
</template>

<style scoped>
.summary-panel {
  color: var(--yh-text-color-primary);
  background: var(--yh-bg-color);
  border: 1px solid var(--yh-border-color);
  border-radius: var(--yh-border-radius-base);
}
</style>
```

## Locale Boundary

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { YhConfigProvider } from '@yh-ui/components'
import zhCn from '@yh-ui/locale/lang/zh-cn'
import en from '@yh-ui/locale/lang/en'

const locale = ref(zhCn)
</script>

<template>
  <YhConfigProvider :locale="locale">
    <YhButton @click="locale = en">English</YhButton>
    <slot />
  </YhConfigProvider>
</template>
```

## Icon Usage

```vue
<script setup lang="ts">
import { Icon } from '@yh-ui/icons/vue'
</script>

<template>
  <Icon icon="lucide:search" :size="18" />
</template>
```
