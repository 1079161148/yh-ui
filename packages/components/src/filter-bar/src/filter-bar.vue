<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import { useLocale } from '@yh-ui/hooks'
import { filterBarProps, filterBarEmits } from './filter-bar'
import type { FilterSort, FilterValue, FilterItem, FilterOption } from './filter-bar'

defineOptions({ name: 'YhFilterBar' })

const props = defineProps(filterBarProps)
const emit = defineEmits(filterBarEmits)

const ns = useNamespace('filter-bar')
const { themeStyle } = useComponentTheme(
  'filter-bar',
  computed(() => props.themeOverrides)
)
const { t } = useLocale()

// ─── 排序状态 ────────────────────────────────────────────────────────────────
const innerSort = ref<FilterSort>({ ...props.sort })

watch(
  () => props.sort,
  (v) => {
    innerSort.value = { ...v }
  },
  { deep: true }
)

function handleSortClick(key: string) {
  let order: FilterSort['order']
  if (innerSort.value.key !== key) {
    order = 'desc'
  } else if (innerSort.value.order === 'desc') {
    order = 'asc'
  } else if (innerSort.value.order === 'asc') {
    order = null
  } else {
    order = 'desc'
  }
  const newSort: FilterSort = { key: order === null ? null : key, order }
  innerSort.value = newSort
  emit('update:sort', newSort)
  emit('sortChange', newSort)
}

// ─── 筛选面板状态 ─────────────────────────────────────────────────────────────
const isPanelOpen = ref(false)
const panelFilter = ref<FilterItem | null>(null)
// 面板中临时的筛选值（确认后才同步）
const tempPanelValue = ref<FilterValue>({})
const innerFilterValue = ref<FilterValue>({ ...props.filterValue })

watch(
  () => props.filterValue,
  (v) => {
    innerFilterValue.value = { ...v }
  },
  { deep: true }
)

function openFilterPanel(item: FilterItem) {
  panelFilter.value = item
  tempPanelValue.value = { ...innerFilterValue.value }
  isPanelOpen.value = true
}

function closePanel() {
  isPanelOpen.value = false
  panelFilter.value = null
}

function confirmPanel() {
  innerFilterValue.value = { ...tempPanelValue.value }
  emit('update:filterValue', { ...innerFilterValue.value })
  emit('filterChange', { ...innerFilterValue.value })
  emit('confirm', { ...innerFilterValue.value })
  closePanel()
}

function resetPanel() {
  if (panelFilter.value) {
    const key = panelFilter.value.key
    tempPanelValue.value = { ...tempPanelValue.value, [key]: null }
    emit('resetPanel', panelFilter.value, tempPanelValue.value)

    // Auto confirm and close the panel after resetting
    confirmPanel()
  }
}

function resetAll() {
  innerFilterValue.value = {}
  innerSort.value = { key: null, order: null }
  emit('update:filterValue', {})
  emit('update:sort', { key: null, order: null })
  emit('reset')
}

// 单选/多选 面板 toggle
function toggleOption(item: FilterItem, option: FilterOption) {
  const key = item.key
  const currentVal = tempPanelValue.value[key]
  if (item.type === 'checkbox') {
    const arr = Array.isArray(currentVal) ? [...currentVal] : []
    const idx = arr.indexOf(option.value)
    if (idx >= 0) arr.splice(idx, 1)
    else arr.push(option.value)
    tempPanelValue.value = { ...tempPanelValue.value, [key]: arr.length ? arr : null }
  } else {
    // radio / select
    const newVal = currentVal === option.value ? null : option.value
    tempPanelValue.value = { ...tempPanelValue.value, [key]: newVal }
    if (!props.filterInPanel) {
      innerFilterValue.value = { ...tempPanelValue.value }
      emit('update:filterValue', { ...innerFilterValue.value })
      emit('filterChange', { ...innerFilterValue.value })
    }
  }
}

function isOptionSelected(item: FilterItem, option: FilterOption): boolean {
  const val = props.filterInPanel
    ? tempPanelValue.value[item.key]
    : innerFilterValue.value[item.key]
  if (item.type === 'checkbox') {
    return Array.isArray(val) && val.includes(option.value)
  }
  return val === option.value
}

// ─── 活跃筛选项数量 ───────────────────────────────────────────────────────────
const activeFilterCount = computed(() => {
  return Object.values(innerFilterValue.value).filter((v) => {
    if (v === null || v === undefined) return false
    if (Array.isArray(v)) return v.length > 0
    return true
  }).length
})

// ─── 吸顶逻辑 ─────────────────────────────────────────────────────────────────
const barRef = ref<HTMLElement | null>(null)
const isStuck = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!props.sticky || typeof IntersectionObserver === 'undefined') return
  observer = new IntersectionObserver(
    ([entry]) => {
      isStuck.value = !entry.isIntersecting
    },
    { rootMargin: `-${props.stickyOffset}px 0px 0px 0px`, threshold: 1 }
  )
  if (barRef.value) observer.observe(barRef.value)
})

onUnmounted(() => {
  observer?.disconnect()
})

// ─── 视图切换逻辑 ─────────────────────────────────────────────────────────────
function handleViewToggle() {
  const next = props.viewType === 'list' ? 'grid' : 'list'
  emit('update:viewType', next)
  emit('viewChange', next)
}
</script>

<template>
  <div
    ref="barRef"
    :class="[ns.b(), ns.is('sticky', sticky), ns.is('stuck', isStuck)]"
    :style="[themeStyle, sticky ? { top: `${stickyOffset}px` } : {}]"
  >
    <!-- 筛选/排序 tab 行 -->
    <div :class="ns.e('bar')">
      <!-- 全部 tab -->
      <button
        v-if="showAll"
        :class="[ns.e('tab'), ns.is('active', !innerSort.key && !activeFilterCount)]"
        @click="resetAll"
      >
        {{ t('filterbar.all') }}
      </button>

      <!-- 排序 tabs -->
      <button
        v-for="sortItem in sorts"
        :key="sortItem.key"
        :class="[ns.e('tab'), ns.e('sort-tab'), ns.is('active', innerSort.key === sortItem.key)]"
        @click="handleSortClick(sortItem.key)"
      >
        <span>{{ sortItem.label }}</span>
        <span :class="[ns.e('sort-arrows')]">
          <i
            :class="[
              ns.e('arrow-up'),
              ns.is('active', innerSort.key === sortItem.key && innerSort.order === 'asc')
            ]"
          >
            <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
              <path d="M512 320L192 704h640z" />
            </svg>
          </i>
          <i
            :class="[
              ns.e('arrow-down'),
              ns.is('active', innerSort.key === sortItem.key && innerSort.order === 'desc')
            ]"
          >
            <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
              <path d="M512 704L832 320H192z" />
            </svg>
          </i>
        </span>
      </button>

      <!-- 筛选 tabs -->
      <template v-if="filterInPanel">
        <button
          v-for="filterItem in filters"
          :key="filterItem.key"
          :class="[
            ns.e('tab'),
            ns.e('filter-tab'),
            ns.is(
              'active',
              !!innerFilterValue[filterItem.key] &&
                (Array.isArray(innerFilterValue[filterItem.key])
                  ? (innerFilterValue[filterItem.key] as (string | number)[]).length > 0
                  : true)
            )
          ]"
          @click="openFilterPanel(filterItem)"
        >
          <span>{{ filterItem.label }}</span>
          <i :class="ns.e('arrow-icon')">
            <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
              <path d="M512 704L832 320H192z" />
            </svg>
          </i>
        </button>
        <!-- 综合筛选按钮 -->
        <button
          v-if="showGlobalFilter"
          :class="[ns.e('tab'), ns.e('filter-btn'), ns.is('active', activeFilterCount > 0)]"
          @click="emit('openFilter')"
        >
          <span>{{ t('filterbar.filter') }}</span>
          <span v-if="activeFilterCount" :class="ns.e('badge')">{{ activeFilterCount }}</span>
          <slot name="filter-icon">
            <i :class="ns.e('filter-icon')">
              <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
                <path
                  d="M880.005 224H143.995c-23.778 0-38.653 25.492-22.95 45.418L384 602.822v263.854c0 15.365 17.554 24.088 29.818 14.89l185.394-139.046c6.242-4.682 9.924-12.072 9.924-19.866V602.823l293.818-333.406c15.704-19.926.83-45.417-22.949-45.417z"
                ></path>
              </svg>
            </i>
          </slot>
        </button>
      </template>

      <!-- 内联筛选 -->
      <template v-else>
        <div v-for="filterItem in filters" :key="filterItem.key" :class="ns.e('inline-filter')">
          <span :class="ns.e('inline-label')">{{ filterItem.label }}</span>
          <button
            v-for="opt in filterItem.options"
            :key="String(opt.value)"
            :class="[ns.e('inline-opt'), ns.is('active', isOptionSelected(filterItem, opt))]"
            @click="toggleOption(filterItem, opt)"
          >
            {{ opt.label }}
          </button>
        </div>
      </template>

      <!-- 视图切换按钮 -->
      <button
        v-if="showViewToggle"
        :class="[ns.e('tab'), ns.e('view-btn')]"
        @click="handleViewToggle"
      >
        <slot name="view-icon" :view-type="viewType">
          <svg
            v-if="viewType === 'list'"
            viewBox="0 0 1024 1024"
            width="1.2em"
            height="1.2em"
            fill="currentColor"
          >
            <path d="M128 320h768v85.333H128V320zM128 618.667h768V704H128v-85.333z" />
          </svg>
          <svg v-else viewBox="0 0 1024 1024" width="1.2em" height="1.2em" fill="currentColor">
            <path
              d="M213.333 213.333h256v256h-256v-256zM554.667 213.333h256v256h-256v-256zM213.333 554.667h256v256h-256v-256zM554.667 554.667h256v256h-256v-256z"
            />
          </svg>
        </slot>
      </button>

      <!-- 自定义扩展区 -->
      <slot name="extra" />
    </div>

    <!-- 筛选面板（下拉浮层） -->
    <Transition :name="ns.b('panel')">
      <div
        v-if="isPanelOpen && filterInPanel && panelFilter"
        :class="ns.e('panel')"
        role="dialog"
        :aria-label="t('filterbar.filter')"
      >
        <!-- 面板遮罩 -->
        <div :class="ns.e('overlay')" @click="closePanel" />
        <div :class="ns.e('panel-body')">
          <!-- 标题 -->
          <div :class="ns.e('panel-header')">
            <span :class="ns.e('panel-title')">{{ panelFilter.label }}</span>
            <button
              :class="ns.e('panel-close')"
              :aria-label="t('filterbar.cancel')"
              @click="closePanel"
            >
              <svg viewBox="0 0 1024 1024" width="14" height="14" fill="currentColor">
                <path
                  d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9c-4.4 5.2-.7 13.1 6.1 13.1h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
                />
              </svg>
            </button>
          </div>
          <!-- 内容 -->
          <div :class="ns.e('panel-content')">
            <slot
              name="panel-content"
              :filter="panelFilter"
              :value="tempPanelValue"
              :toggle="toggleOption"
            >
              <div v-if="panelFilter.options?.length" :class="ns.e('panel-options')">
                <button
                  v-for="opt in panelFilter.options"
                  :key="String(opt.value)"
                  :class="[ns.e('panel-opt'), ns.is('active', isOptionSelected(panelFilter, opt))]"
                  @click="toggleOption(panelFilter, opt)"
                >
                  {{ opt.label }}
                </button>
              </div>
              <p v-else :class="ns.e('no-options')">
                {{ t('filterbar.noOptions') }}
              </p>
            </slot>
          </div>
          <!-- 操作区 -->
          <div :class="ns.e('panel-footer')">
            <button :class="[ns.e('btn'), ns.e('btn-reset')]" @click="resetPanel">
              {{ t('filterbar.reset') }}
            </button>
            <button :class="[ns.e('btn'), ns.e('btn-confirm')]" @click="confirmPanel">
              {{ t('filterbar.confirm') }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss">
@use './filter-bar.scss';
</style>
