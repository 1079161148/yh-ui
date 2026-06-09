# Deep Recipe: YhTable

Use this recipe when building complex data tables, admin list views, large datasets with virtualization, custom cell layouts, context menus, data export, or printing.

## Default Choice

Use `YhTable` with a statically defined `columns` array. Let `YhTable` handle pagination internally through the `pagination` configuration property.

## Source-Aligned API Highlights

- **Props**: `data`, `columns`, `rowKey`, `loading`, `pagination`, `height`, `maxHeight`, `border`, `stripe`, `virtualConfig`, `toolbarConfig`, `rowConfig`, `expandConfig`, `selectionConfig`, `sortConfig`, `filterConfig`.
- **Events**: `sort-change`, `filter-change`, `page-change`, `selection-change`, `row-click`, `cell-click`, `scroll`, `update:data`.
- **Slots**: `default` (column definitions), `toolbar`, `toolbar-left`, `toolbar-right`, `toolbar-left-prefix`, `toolbar-right-suffix`.
- **Exposed APIs**: `refresh()`, `clearSelection()`, `getSelectionRows()`, `exportData(options)`, `importData(options)`, `print(options)`, `scrollTo(options)`, `doLayout()`, `setColumnVisible(prop, visible)`.

## Pattern: Advanced Admin Table

This example demonstrates request-driven loading, cell custom slot rendering, toolbars, virtual scrolling for large datasets, printing, and Excel exporting:

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import { YhTable, YhButton, YhTag, YhMessage, YhPopconfirm } from '@yh-ui/components'
import { createRequest, useRequest } from '@yh-ui/request'

interface LogRow {
  id: number
  username: string
  action: string
  status: 'success' | 'failed'
  ip: string
  createdTime: string
}

const api = createRequest({ baseURL: '/api' })
const tableRef = ref<InstanceType<typeof YhTable> | null>(null)
const page = ref({ currentPage: 1, pageSize: 50, total: 0 })

// Static columns definition - keep outside template
const columns = [
  { prop: 'username', label: 'User', width: 150, sortable: true },
  { prop: 'action', label: 'Action Description', minWidth: 200 },
  { prop: 'status', label: 'Status', width: 120, slot: 'status' },
  { prop: 'ip', label: 'IP Address', width: 140 },
  { prop: 'createdTime', label: 'Timestamp', width: 180 },
  { prop: 'operations', label: 'Operations', width: 120, slot: 'operations' }
]

// Request client using useRequest
const { data, loading, refresh } = useRequest(async () => {
  const result = await api.get<{ list: LogRow[]; total: number }>('/audit/logs', {
    params: { page: page.value.currentPage, limit: page.value.pageSize }
  })
  page.value.total = result.total
  return result.list
})

const rows = computed(() => data.value || [])

// Native Excel Export using YhTable exposed method
function exportExcel() {
  if (!tableRef.value) return
  tableRef.value.exportData({
    filename: 'audit_logs',
    type: 'xlsx',
    original: true
  })
  YhMessage.success('Exporting file...')
}

// Native Print using YhTable exposed method
function printTable() {
  if (!tableRef.value) return
  tableRef.value.print({
    title: 'Audit Activity Report',
    showPageNumber: true
  })
}

function deleteRow(row: LogRow) {
  YhMessage.success(`Deleted log: ${row.id}`)
  refresh()
}
</script>

<template>
  <div class="table-container">
    <YhTable
      ref="tableRef"
      row-key="id"
      :data="rows"
      :columns="columns"
      :loading="loading"
      :pagination="page"
      height="600px"
      border
      stripe
      :virtual-config="{ enabled: true, itemHeight: 45 }"
      @page-change="refresh"
    >
      <!-- Custom Left Toolbar Slot -->
      <template #toolbar-left>
        <YhButton type="primary" icon="mdi:refresh" @click="refresh">Refresh Logs</YhButton>
        <YhButton type="success" icon="mdi:file-excel" @click="exportExcel"
          >Export to Excel</YhButton
        >
        <YhButton icon="mdi:printer" @click="printTable">Print Report</YhButton>
      </template>

      <!-- Custom Cell Slots mapped via column.slot -->
      <template #status="{ row }">
        <YhTag :type="row.status === 'success' ? 'success' : 'danger'">
          {{ row.status === 'success' ? 'Success' : 'Failed' }}
        </YhTag>
      </template>

      <template #operations="{ row }">
        <YhPopconfirm title="Are you sure you want to delete this log?" @confirm="deleteRow(row)">
          <template #reference>
            <YhButton type="text" danger icon="mdi:delete" />
          </template>
        </YhPopconfirm>
      </template>
    </YhTable>
  </div>
</template>
```

## Agent Rules

- **Static Columns**: Always define the `columns` array inside `<script setup>` as a constant or a reactive `computed` array; never define arrays inline inside the template to prevent duplicate component re-renders.
- **Set Table Height**: When enabling `virtual-config` for large datasets, an explicit `height` or `max-height` (e.g. `600px` or `100%`) must be set on `YhTable` to calculate viewport slots correctly.
- **Row Identity**: Always pass a unique `row-key` prop (e.g. `id`, `uuid`) to help Vue track element identity during sort, select, and virtual updates.
- **Avoid wrapper components**: Do not invent a custom `YhDataTable` or wrapper component. Always use the native `YhTable` from `@yh-ui/components`.
