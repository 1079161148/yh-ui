<script setup lang="ts">
/**
 * YhTransferPanel - 穿梭框面板组件
 * @description Transfer 内部面板组件，支持虚拟滚动，严格类型化
 */
import { computed, ref, watch, provide } from 'vue'
import { useNamespace, useLocale } from '@yh-ui/hooks'
import type {
  TransferPanelProps,
  TransferPanelEmits,
  TransferPanelExpose,
  TransferData,
  TransferKey,
  TransferPanelContext
} from './transfer'
import { transferPanelContextKey } from './transfer'

defineOptions({
  name: 'YhTransferPanel'
})

const props = withDefaults(defineProps<TransferPanelProps>(), {
  data: () => [],
  checked: () => [],
  title: '',
  filterable: false,
  disabled: false,
  size: 'default',
  virtual: false,
  itemHeight: 40,
  height: 280,
  showAllCheckbox: true
})

const emit = defineEmits<TransferPanelEmits>()

// 命名空间
const ns = useNamespace('transfer-panel')
const { t } = useLocale()

// 搜索关键词
const query = ref('')

// 虚拟滚动状态
const scrollTop = ref(0)
const virtualWrapperRef = ref<HTMLElement>()

// 获取字段别名
const keyProp = computed(() => props.props?.key || 'key')
const labelProp = computed(() => props.props?.label || 'label')
const disabledProp = computed(() => props.props?.disabled || 'disabled')

// 获取数据项的 key
const getKey = (item: TransferData): TransferKey => {
  return (item[keyProp.value] as TransferKey) ?? ''
}

// 获取数据项的 label
const getLabel = (item: TransferData): string => {
  return String(item[labelProp.value] || '')
}

// 获取数据项的 disabled
const isItemDisabled = (item: TransferData): boolean => {
  return Boolean(item[disabledProp.value]) || (props.disabled ?? false)
}

// 过滤后的数据
const filteredData = computed<TransferData[]>(() => {
  if (!query.value) return props.data

  const q = query.value.toLowerCase()

  if (props.filterMethod) {
    return props.data.filter(item => props.filterMethod!(query.value, item))
  }

  return props.data.filter(item => {
    const label = getLabel(item)
    return label.toLowerCase().includes(q)
  })
})

// 可选项（非禁用）
const checkableData = computed<TransferData[]>(() => {
  return filteredData.value.filter(item => !isItemDisabled(item))
})

// 已选中的项
const checkedKeys = computed(() => props.checked)

// 是否选中
const isChecked = (key: TransferKey): boolean => {
  return checkedKeys.value.includes(key)
}

// 全选状态
const isAllChecked = computed(() => {
  if (checkableData.value.length === 0) return false
  return checkableData.value.every(item => isChecked(getKey(item)))
})

// 半选状态
const isIndeterminate = computed(() => {
  const checkedCount = checkableData.value.filter(item => isChecked(getKey(item))).length
  return checkedCount > 0 && checkedCount < checkableData.value.length
})

// 统计信息
const totalCheckedCount = computed(() => {
  return props.data.filter(item => isChecked(getKey(item))).length
})

// 虚拟滚动配置
const virtualConfig = computed(() => {
  const itemHeight = props.itemHeight || 40
  const containerHeight = props.height || 280
  const overscan = 3
  const items = filteredData.value

  if (!props.virtual || items.length === 0) {
    return {
      visibleItems: items,
      totalHeight: items.length * itemHeight,
      offsetY: 0,
      startIndex: 0,
      endIndex: items.length
    }
  }

  const totalHeight = items.length * itemHeight
  const startIndex = Math.max(0, Math.floor(scrollTop.value / itemHeight) - overscan)
  const visibleCount = Math.ceil(containerHeight / itemHeight)
  const endIndex = Math.min(items.length, startIndex + visibleCount + overscan * 2)

  return {
    visibleItems: items.slice(startIndex, endIndex),
    totalHeight,
    offsetY: startIndex * itemHeight,
    startIndex,
    endIndex
  }
})

// 显示的数据项
const displayItems = computed(() => {
  return props.virtual ? virtualConfig.value.visibleItems : filteredData.value
})

// 虚拟滚动处理
const handleVirtualScroll = (event: Event) => {
  const target = event.target as HTMLElement
  scrollTop.value = target.scrollTop
}

// 处理勾选
const handleCheck = (key: TransferKey, checked: boolean) => {
  if (props.disabled) return

  const newChecked = [...checkedKeys.value]
  const index = newChecked.indexOf(key)

  if (checked) {
    if (index === -1) {
      newChecked.push(key)
    }
  } else {
    if (index > -1) {
      newChecked.splice(index, 1)
    }
  }

  emit('update:checked', newChecked)
  emit('checked-change', newChecked, [key])
}

// 处理项点击
const handleItemClick = (item: TransferData) => {
  if (isItemDisabled(item)) return
  const key = getKey(item)
  handleCheck(key, !isChecked(key))
}

// 全选 / 取消全选
const handleCheckAll = () => {
  if (props.disabled || checkableData.value.length === 0) return

  let newChecked: TransferKey[]

  if (isAllChecked.value) {
    // 取消勾选当前过滤后的可选项
    const checkableKeys = new Set(checkableData.value.map(item => getKey(item)))
    newChecked = checkedKeys.value.filter(key => !checkableKeys.has(key))
  } else {
    // 全选当前过滤后的可选项
    const checkableKeys = checkableData.value.map(item => getKey(item))
    newChecked = [...new Set([...checkedKeys.value, ...checkableKeys])]
  }

  emit('update:checked', newChecked)
  emit('checked-change', newChecked)
}

// 清空选中状态
const clearChecked = () => {
  emit('update:checked', [])
  emit('checked-change', [])
}

// 提供上下文
provide<TransferPanelContext>(transferPanelContextKey, {
  props,
  checked: checkedKeys.value,
  handleCheck
})

// 暴露方法
defineExpose<TransferPanelExpose>({
  clearChecked,
  query: query.value
})

// 监听 query 变化重置滚动
watch(query, () => {
  scrollTop.value = 0
  if (virtualWrapperRef.value) {
    virtualWrapperRef.value.scrollTop = 0
  }
})
</script>

<template>
  <div :class="ns.b()">
    <!-- 头部 -->
    <div :class="ns.e('header')">
      <slot name="header">
        <div :class="[ns.e('check-all'), { 'is-disabled': disabled || checkableData.length === 0 }]"
          @click="handleCheckAll">
          <span :class="[
            ns.e('item-checkbox'),
            { 'is-checked': isAllChecked, 'is-indeterminate': isIndeterminate }
          ]">
            <!-- 选中图标 -->
            <svg v-if="isAllChecked" :class="ns.e('item-checkbox__icon')" viewBox="0 0 1024 1024">
              <path fill="currentColor" d="M406.4 726.4l-236.8-236.8 57.6-57.6 179.2 179.2 390.4-390.4 57.6 57.6z" />
            </svg>
            <!-- 半选图标 -->
            <svg v-if="isIndeterminate && !isAllChecked" :class="ns.e('item-checkbox__icon')" viewBox="0 0 1024 1024">
              <path fill="currentColor" d="M192 480h640v64H192z" />
            </svg>
          </span>
        </div>
        <div :class="ns.e('title')">
          <span>{{ title }}</span>
          <span :class="ns.e('count')">
            {{
              totalCheckedCount > 0
                ? t('transfer.hasCheckedFormat', { checked: totalCheckedCount, total: data.length })
                : t('transfer.noCheckedFormat', { total: data.length })
            }}
          </span>
        </div>
      </slot>
    </div>

    <!-- 搜索框 -->
    <div v-if="filterable" :class="ns.e('filter')">
      <input v-model="query" type="text" :class="ns.e('filter-input')"
        :placeholder="filterPlaceholder || t('transfer.filterPlaceholder')" :disabled="disabled" />
    </div>

    <!-- 列表区域 -->
    <div :class="ns.e('body')">
      <!-- 空状态 -->
      <div v-if="filteredData.length === 0" :class="ns.e('empty')">
        <slot name="empty">
          <svg :class="ns.e('empty-icon')" viewBox="0 0 1024 1024">
            <path fill="currentColor"
              d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
            <path fill="currentColor"
              d="M464 336a48 48 0 1096 0 48 48 0 10-96 0zM464 512v176c0 8.8 7.2 16 16 16h64c8.8 0 16-7.2 16-16V512c0-8.8-7.2-16-16-16h-64c-8.8 0-16 7.2-16 16z" />
          </svg>
          <span :class="ns.e('empty-text')">{{ emptyText || t('transfer.noData') }}</span>
        </slot>
      </div>

      <!-- 虚拟滚动列表 -->
      <template v-else-if="virtual">
        <div ref="virtualWrapperRef" :class="ns.e('virtual-wrapper')" :style="{ height: height + 'px' }"
          @scroll="handleVirtualScroll">
          <div :style="{ height: virtualConfig.totalHeight + 'px', position: 'relative' }">
            <ul :class="ns.e('list')" :style="{ transform: `translateY(${virtualConfig.offsetY}px)` }">
              <li v-for="item in displayItems" :key="getKey(item)" :class="[
                ns.e('item'),
                { 'is-checked': isChecked(getKey(item)), 'is-disabled': isItemDisabled(item) }
              ]" :style="{ height: itemHeight + 'px' }" @click="handleItemClick(item)">
                <span :class="[ns.e('item-checkbox'), { 'is-checked': isChecked(getKey(item)) }]">
                  <svg v-if="isChecked(getKey(item))" :class="ns.e('item-checkbox__icon')" viewBox="0 0 1024 1024">
                    <path fill="currentColor"
                      d="M406.4 726.4l-236.8-236.8 57.6-57.6 179.2 179.2 390.4-390.4 57.6 57.6z" />
                  </svg>
                </span>
                <span :class="ns.e('item-label')">
                  <slot :option="item">{{ getLabel(item) }}</slot>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </template>

      <!-- 普通列表 -->
      <ul v-else :class="ns.e('list')">
        <li v-for="item in displayItems" :key="getKey(item)" :class="[
          ns.e('item'),
          { 'is-checked': isChecked(getKey(item)), 'is-disabled': isItemDisabled(item) }
        ]" @click="handleItemClick(item)">
          <span :class="[ns.e('item-checkbox'), { 'is-checked': isChecked(getKey(item)) }]">
            <svg v-if="isChecked(getKey(item))" :class="ns.e('item-checkbox__icon')" viewBox="0 0 1024 1024">
              <path fill="currentColor" d="M406.4 726.4l-236.8-236.8 57.6-57.6 179.2 179.2 390.4-390.4 57.6 57.6z" />
            </svg>
          </span>
          <span :class="ns.e('item-label')">
            <slot :option="item">{{ getLabel(item) }}</slot>
          </span>
        </li>
      </ul>
    </div>

    <!-- 底部插槽 -->
    <div v-if="$slots.footer" :class="ns.e('footer')">
      <slot name="footer" />
    </div>
  </div>
</template>

<style lang="scss">
@use './transfer.scss';
</style>
