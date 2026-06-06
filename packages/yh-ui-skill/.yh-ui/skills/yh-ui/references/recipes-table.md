# Deep Recipe: YhTable

Use this recipe when the user asks for data tables, admin list pages, exports, selection, pagination, or large datasets.

## Default Choice

Use `YhTable` with a stable `columns` array and typed row data. Add `YhPagination` only when pagination is not handled through `YhTable`'s `pagination` prop.

## Source-Aligned API Highlights

- Props: `data`, `columns`, `rowKey`, `loading`, `pagination`, `selectionConfig`, `sortConfig`, `filterConfig`, `virtualConfig`, `toolbarConfig`, `emptyConfig`, `height`, `maxHeight`, `border`, `stripe`, `showIndex`.
- Events: `sort-change`, `filter-change`, `page-change`, `selection-change`, `row-click`, `cell-click`, `scroll`, `update:data`.
- Expose: `refresh`, `clearSelection`, `getSelectionRows`, `sort`, `clearSort`, `filter`, `clearFilter`, `exportData`, `print`, `scrollTo`, `doLayout`.

## Pattern: Request-Driven Table

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import { YhButton, YhEmpty, YhForm, YhFormItem, YhInput, YhTable } from '@yh-ui/components'
import { createRequest, useRequest } from '@yh-ui/request'

interface UserRow {
  id: number
  name: string
  email: string
  status: string
}

const api = createRequest({ baseURL: '/api' })
const keyword = ref('')
const page = ref({ currentPage: 1, pageSize: 20, total: 0 })

const columns = [
  { prop: 'name', label: 'Name', minWidth: 160 },
  { prop: 'email', label: 'Email', minWidth: 220 },
  { prop: 'status', label: 'Status', width: 120 }
]

const { data, loading, error, refresh } = useRequest(async () => {
  const result = await api.get<{ list: UserRow[]; total: number }>('/users', {
    params: { keyword: keyword.value, page: page.value.currentPage, pageSize: page.value.pageSize }
  })
  page.value.total = result.total
  return result.list
})

const rows = computed(() => data.value || [])
</script>

<template>
  <YhForm inline>
    <YhFormItem label="Keyword">
      <YhInput v-model="keyword" clearable placeholder="Search users" />
    </YhFormItem>
    <YhFormItem>
      <YhButton type="primary" :loading="loading" @click="refresh">Search</YhButton>
    </YhFormItem>
  </YhForm>

  <YhTable
    row-key="id"
    :data="rows"
    :columns="columns"
    :loading="loading"
    :pagination="page"
    border
    stripe
    @page-change="refresh"
  />

  <YhEmpty v-if="!loading && !rows.length && !error" description="No users found" />
</template>
```

## Agent Rules

- Keep `columns` outside the template.
- Use `rowKey` whenever rows have identity.
- Use `virtualConfig` for large local datasets.
- Use `loading` and `emptyConfig`/`YhEmpty` for async states.
- Use table events for remote sort/filter/page behavior.
- Do not invent `YhDataTable`; use `YhTable`.
