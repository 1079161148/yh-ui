<script setup lang="ts">
/**
 * YhTableColumn - 表格列组件
 * 用于声明式定义表格列
 */
import { inject, onMounted, onUnmounted, getCurrentInstance } from 'vue'
import { tableContextKey, type TableColumn } from './table'

defineOptions({
  name: 'YhTableColumn'
})

const props = withDefaults(defineProps<{
  /** 列唯一标识 */
  columnKey?: string
  /** 列字段名 */
  prop?: string
  /** 列标题 */
  label?: string
  /** 列宽 */
  width?: number | string
  /** 最小列宽 */
  minWidth?: number | string
  /** 最大列宽 */
  maxWidth?: number | string
  /** 内容对齐方式 */
  align?: 'left' | 'center' | 'right'
  /** 表头对齐方式 */
  headerAlign?: 'left' | 'center' | 'right'
  /** 固定列 */
  fixed?: 'left' | 'right' | boolean
  /** 是否可排序 */
  sortable?: boolean | 'custom'
  /** 是否可筛选 */
  filterable?: boolean
  /** 筛选选项 */
  filters?: Array<{ text: string; value: unknown }>
  /** 是否支持多选筛选 */
  filterMultiple?: boolean
  /** 是否可调整列宽 */
  resizable?: boolean
  /** 是否显示溢出提示 */
  showOverflowTooltip?: boolean
  /** 列类名 */
  className?: string
  /** 表头类名 */
  headerClassName?: string
  /** 列类型 */
  type?: 'selection' | 'index' | 'expand' | 'radio'
  /** 是否可见 */
  visible?: boolean
  /** 是否为树形展开列 */
  treeNode?: boolean
}>(), {
  align: 'left',
  visible: true,
  filterMultiple: true
})

const tableContext = inject(tableContextKey, null)
const instance = getCurrentInstance()

// 构建列配置
const columnConfig: TableColumn = {
  key: props.columnKey,
  prop: props.prop,
  label: props.label,
  width: props.width,
  minWidth: props.minWidth,
  maxWidth: props.maxWidth,
  align: props.align,
  headerAlign: props.headerAlign,
  fixed: props.fixed === false ? undefined : props.fixed,
  sortable: props.sortable,
  filterable: props.filterable,
  filters: props.filters,
  filterMultiple: props.filterMultiple,
  resizable: props.resizable,
  showOverflowTooltip: props.showOverflowTooltip,
  className: props.className,
  headerClassName: props.headerClassName,
  type: props.type,
  visible: props.visible,
  treeNode: props.treeNode
}


onMounted(() => {
  if (tableContext) {
    tableContext.registerColumn(columnConfig)
  }
})

onUnmounted(() => {
  if (tableContext) {
    tableContext.unregisterColumn(columnConfig)
  }
})
</script>

<template>
  <slot />
</template>

<style lang="scss">
@use './table.scss';
</style>
