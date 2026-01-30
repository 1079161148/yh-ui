<script setup lang="ts">
/**
 * YhPagination - 分页组件
 */
import { computed, ref, watch } from 'vue'
import { useNamespace } from '../../hooks/use-config'
import { paginationProps } from './pagination'
import type { PaginationEmits, PaginationExpose } from './pagination'

defineOptions({
  name: 'YhPagination'
})

const props = defineProps(paginationProps)
const emit = defineEmits<PaginationEmits>()

const ns = useNamespace('pagination')

// 计算总页数
const pageCount = computed(() => {
  if (props.total > 0) {
    return Math.max(1, Math.ceil(props.total / props.pageSize))
  }
  return 1
})

// 当前内部页码
const internalCurrentPage = ref(props.currentPage)

watch(() => props.currentPage, (val) => {
  internalCurrentPage.value = val
})

// 页码列表逻辑
const pagers = computed(() => {
  const count = props.pagerCount
  const currentPage = internalCurrentPage.value
  const totalPages = pageCount.value

  const showPrevMore = totalPages > count && currentPage > count - (count - 1) / 2
  const showNextMore = totalPages > count && currentPage < totalPages - (count - 1) / 2

  const array: number[] = []

  if (showPrevMore && !showNextMore) {
    const startPage = totalPages - (count - 2)
    for (let i = startPage; i < totalPages; i++) {
      array.push(i)
    }
  } else if (!showPrevMore && showNextMore) {
    for (let i = 2; i < count; i++) {
      array.push(i)
    }
  } else if (showPrevMore && showNextMore) {
    const offset = Math.floor(count / 2) - 1
    for (let i = currentPage - offset; i <= currentPage + offset; i++) {
      array.push(i)
    }
  } else {
    for (let i = 2; i < totalPages; i++) {
      array.push(i)
    }
  }

  return {
    showPrevMore,
    showNextMore,
    array
  }
})

const handleCurrentChange = (val: number) => {
  if (props.disabled || val < 1 || val > pageCount.value || val === internalCurrentPage.value) return
  internalCurrentPage.value = val
  emit('update:currentPage', val)
  emit('current-change', val)
}

const handlePrev = () => {
  if (internalCurrentPage.value <= 1) return
  const val = internalCurrentPage.value - 1
  handleCurrentChange(val)
  emit('prev-click', val)
}

const handleNext = () => {
  if (internalCurrentPage.value >= pageCount.value) return
  const val = internalCurrentPage.value + 1
  handleCurrentChange(val)
  emit('next-click', val)
}

const handleSizeChange = (val: number) => {
  emit('update:pageSize', val)
  emit('size-change', val)
}

const jumpValue = ref<string | number>(internalCurrentPage.value)
watch(internalCurrentPage, (val) => {
  jumpValue.value = val
})

const handleJump = () => {
  let val = Number(jumpValue.value)
  if (isNaN(val)) val = internalCurrentPage.value
  val = Math.max(1, Math.min(pageCount.value, Math.floor(val)))
  handleCurrentChange(val)
  jumpValue.value = val
}

const paginationClasses = computed(() => [
  ns.b(),
  ns.is('background', props.background),
  ns.is('small', props.small),
  ns.is('circle', props.circle),
  ns.is('disabled', props.disabled)
])

// 布局组件映射
const layoutComponents = computed(() => {
  return props.layout.split(',').map(item => item.trim())
})

defineExpose<PaginationExpose>({
  currentPage: internalCurrentPage.value,
  pageSize: props.pageSize,
  pageCount: pageCount.value
})
</script>

<template>
  <nav v-if="!hideOnSinglePage || pageCount > 1" :class="paginationClasses">
    <template v-for="item in layoutComponents" :key="item">
      <!-- Total -->
      <span v-if="item === 'total'" :class="ns.e('total')">
        共 {{ total }} 条
      </span>

      <!-- Sizes -->
      <div v-if="item === 'sizes'" :class="ns.e('sizes')">
        <yh-select :model-value="pageSize" :disabled="disabled" :size="small ? 'small' : 'default'"
          @update:model-value="handleSizeChange">
          <yh-option v-for="size in pageSizes" :key="size" :label="`${size}条/页`" :value="size" />
        </yh-select>
      </div>

      <!-- Prev -->
      <button v-if="item === 'prev'" :class="ns.e('prev')" :disabled="disabled || internalCurrentPage <= 1"
        @click="handlePrev">
        <slot name="prev-icon">
          <span v-if="prevText">{{ prevText }}</span>
          <svg v-else viewBox="0 0 1024 1024" width="1em" height="1em">
            <path fill="currentColor"
              d="M609.4 824.6L296.8 512l312.6-312.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L228.9 489.4c-12.5 12.5-12.5 32.8 0 45.3l335.2 335.2c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3z" />
          </svg>
        </slot>
      </button>

      <!-- Pager -->
      <ul v-if="item === 'pager'" :class="ns.e('pager')">
        <li :class="[ns.e('item'), ns.is('active', internalCurrentPage === 1)]" @click="handleCurrentChange(1)">
          1
        </li>

        <li v-if="pagers.showPrevMore" :class="[ns.e('item'), ns.e('more')]"
          @click="handleCurrentChange(Math.max(1, internalCurrentPage - 5))">
          <span :class="ns.e('more-icon')">...</span>
        </li>

        <li v-for="page in pagers.array" :key="page"
          :class="[ns.e('item'), ns.is('active', internalCurrentPage === page)]" @click="handleCurrentChange(page)">
          {{ page }}
        </li>

        <li v-if="pagers.showNextMore" :class="[ns.e('item'), ns.e('more')]"
          @click="handleCurrentChange(Math.min(pageCount, internalCurrentPage + 5))">
          <span :class="ns.e('more-icon')">...</span>
        </li>

        <li v-if="pageCount > 1" :class="[ns.e('item'), ns.is('active', internalCurrentPage === pageCount)]"
          @click="handleCurrentChange(pageCount)">
          {{ pageCount }}
        </li>
      </ul>

      <!-- Next -->
      <button v-if="item === 'next'" :class="ns.e('next')" :disabled="disabled || internalCurrentPage >= pageCount"
        @click="handleNext">
        <slot name="next-icon">
          <span v-if="nextText">{{ nextText }}</span>
          <svg v-else viewBox="0 0 1024 1024" width="1em" height="1em">
            <path fill="currentColor"
              d="M341.3 824.6l312.6-312.6L341.3 199.4c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L721.8 489.4c12.5 12.5 12.5 32.8 0 45.3L386.6 869.9c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3z" />
          </svg>
        </slot>
      </button>

      <!-- Jumper -->
      <div v-if="item === 'jumper'" :class="ns.e('jumper')">
        前往 <yh-input v-model="jumpValue" :size="small ? 'small' : 'default'" :disabled="disabled" @blur="handleJump"
          @keyup.enter="handleJump" /> 页
      </div>

      <!-- Slot -->
      <slot v-if="item === 'slot'" />
    </template>
  </nav>
</template>

<style lang="scss">
@use './pagination.scss';
</style>
