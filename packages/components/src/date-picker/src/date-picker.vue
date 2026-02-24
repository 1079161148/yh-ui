<script setup lang="ts">
/**
 * YhDatePicker - 统一日期选择器
 * @description 融合日期、时间、范围、年、月、季度等多种模式于一体。采用业内最佳实践设计。
 */
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useNamespace, useFormItem, useLocale } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import { useConfig } from '@yh-ui/hooks'
import DateTable from './date-table.vue'
import MonthTable from './month-table.vue'
import YearTable from './year-table.vue'
import QuarterTable from './quarter-table.vue'
import {
  datePickerProps,
  type DateValue,
  type DateRangeValue,
  type PanelView,
  type DatePickerType
} from './date-picker'
import { DEFAULT_FORMATS, formatDate } from './panel-utils'
import dayjs from 'dayjs'

defineOptions({
  name: 'YhDatePicker'
})

const props = defineProps(datePickerProps)
const emit = defineEmits<{
  (e: 'update:modelValue', value: DateValue | DateRangeValue): void
  (e: 'change', value: DateValue | DateRangeValue): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'clear'): void
  (e: 'confirm', value: DateValue | DateRangeValue): void
  (e: 'panel-change', value: Date, mode: PanelView): void
  (e: 'visible-change', visible: boolean): void
}>()

const ns = useNamespace('date-picker')
const { t, locale } = useLocale()
const { form, formItem, validate: triggerValidate } = useFormItem()
const { globalSize } = useConfig()

// 组件级 themeOverrides
const { themeStyle } = useComponentTheme(
  'date-picker',
  computed(() => props.themeOverrides)
)

// --- 状态控制 ---
const visible = ref(props.panelOnly)
const hovering = ref(false)

// 初始化视图
const getInitialView = (type: DatePickerType): PanelView => {
  if (type.includes('year')) return 'year'
  if (type.includes('month')) return 'month'
  if (type.includes('quarter')) return 'quarter'
  if (type === 'week') return 'date'
  return 'date'
}

// 当前面板视图
const currentView = ref<PanelView>(getInitialView(props.type))
// 内部日期状态
const innerDate = ref(new Date())
const rangeHoverDate = ref<Date | null>(null)

// 元素引用
const wrapperRef = ref<HTMLElement>()

// --- 计算属性 ---
const isRange = computed(() => props.type.includes('range'))
const selectSize = computed(
  () => props.size || formItem?.size || form?.size || globalSize.value || 'default'
)

const getFormat = () => {
  if (props.format) return props.format
  return DEFAULT_FORMATS[props.type] || 'YYYY-MM-DD'
}

const displayValue = computed(() => {
  if (isRange.value) return ''
  if (!props.modelValue || props.modelValue === '') return ''

  const dateVal = Array.isArray(props.modelValue) ? props.modelValue[0] : props.modelValue
  if (!dateVal) return ''

  const result = formatDate(dateVal, getFormat())
  return result === 'Invalid Date' ? '' : result
})

const rangeDisplayValue = computed(() => {
  if (!isRange.value || !Array.isArray(props.modelValue)) return ['', '']
  const fmt = getFormat()
  const [start, end] = props.modelValue
  return [start ? formatDate(start, fmt) : '', end ? formatDate(end, fmt) : '']
})

// --- 核心修复：属性合规性转换 ---
// 针对用户在模板中使用 v-model="" 或 ref('') 初始化的情况，将其转换为子组件能接受的 Date | null | Array
const parsedSelectedDate = computed(() => {
  const val = props.modelValue
  if (val === '' || val === null || val === undefined) return null
  if (Array.isArray(val)) {
    return val
      .map((v) => (v && v !== '' ? dayjs(v as string | number | Date).toDate() : null))
      .filter((v) => v !== null) as Date[]
  }
  const d = dayjs(val as string | number | Date)
  return d.isValid() ? d.toDate() : null
})

const parsedRangeState = computed(() => {
  if (!isRange.value) return undefined
  const val = props.modelValue as Date[]
  const from = Array.isArray(val) && val[0] ? dayjs(val[0] as Date).toDate() : null
  const to = Array.isArray(val) && val[1] ? dayjs(val[1] as Date).toDate() : null
  return {
    from,
    to,
    hovering: rangeHoverDate.value
  }
})

const wrapperClasses = computed(() => [
  ns.b(),
  ns.m(selectSize.value),
  ns.is('disabled', props.disabled),
  ns.is('focused', visible.value),
  ns.is('range', isRange.value),
  ns.is('panel-only', props.panelOnly),
  ns.m(props.status)
])

// --- 头部导航逻辑 ---
const monthKeys = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec'
] as const

const headerLabel = computed(() => {
  const d = dayjs(innerDate.value)
  const dateLocale = (locale.value.yh as Record<string, Record<string, unknown>>).datepicker

  if (currentView.value === 'year') {
    const start = Math.floor(d.year() / 10) * 10
    return `${start} - ${start + 9}`
  }

  if (currentView.value === 'month' || currentView.value === 'quarter') {
    return dateLocale.monthBeforeYear ? d.format('YYYY') : `${d.year()}${dateLocale.year || ''}`
  }

  // 使用语言包中的月份名称
  const monthName = (dateLocale as Record<string, Record<string, string>>).months[
    monthKeys[d.month()]
  ]

  if (!dateLocale.monthBeforeYear) {
    // 典型如 中/日/韩：2024年3月 或 2024年三月
    return `${d.year()}${dateLocale.year || ''}${monthName}`
  }

  return `${monthName} ${d.year()}`
})

const moveMonth = (offset: number) => {
  innerDate.value = dayjs(innerDate.value).add(offset, 'month').toDate()
}

const moveYear = (offset: number) => {
  const step = currentView.value === 'year' ? 10 : 1
  innerDate.value = dayjs(innerDate.value)
    .add(offset * step, 'year')
    .toDate()
}

const handleHeaderClick = () => {
  if (currentView.value === 'date') currentView.value = 'month'
  else if (currentView.value === 'month') currentView.value = 'year'
}

// --- 选择逻辑 ---
const emitChange = (val: DateValue | DateRangeValue) => {
  const fmt = props.valueFormat || ''
  let result: DateValue | DateRangeValue = val
  if (fmt && val) {
    if (Array.isArray(val)) {
      result = [val[0] ? formatDate(val[0], fmt) : null, val[1] ? formatDate(val[1], fmt) : null]
    } else {
      result = formatDate(val as Date, fmt)
    }
  }
  emit('update:modelValue', result)
  emit('change', result)
  if (props.validateEvent) triggerValidate('change')
}

const handleSelect = (val: Date | number | Date[]) => {
  if (Array.isArray(val)) {
    if (isRange.value) emitChange([val[0], val[1]])
    else emitChange(val[0])
    if (!props.panelOnly) visible.value = false
    return
  }

  let targetDate: Date
  if (typeof val === 'number') {
    if (currentView.value === 'year') {
      targetDate = dayjs(innerDate.value).year(val).toDate()
      if (props.type.includes('year')) {
        performFinalSelect(targetDate)
      } else {
        innerDate.value = targetDate
        currentView.value = 'month'
      }
    } else if (currentView.value === 'month') {
      targetDate = dayjs(innerDate.value).month(val).toDate()
      if (props.type.includes('month')) {
        performFinalSelect(targetDate)
      } else {
        innerDate.value = targetDate
        currentView.value = 'date'
      }
    } else if (currentView.value === 'quarter') {
      targetDate = dayjs(innerDate.value)
        .month((val - 1) * 3)
        .toDate()
      performFinalSelect(targetDate)
    }
  } else {
    performFinalSelect(val)
  }
}

const performFinalSelect = (date: Date) => {
  if (isRange.value) {
    const current = (props.modelValue as DateRangeValue) || [null, null]
    if (!current[0] || (current[0] && current[1])) {
      emit('update:modelValue', [date, null])
    } else {
      let start: Date = dayjs(current[0] as string | number | Date).toDate()
      let end: Date | null = date
      if (dayjs(end).isBefore(dayjs(start))) {
        if (props.orderOnConfirm) [start, end] = [end as Date, start]
        else {
          start = date
          end = null
        }
      }
      emitChange([start, end] as DateRangeValue)
      if (end && !props.panelOnly) visible.value = false
    }
  } else {
    emitChange(date)
    // 只有非 datetime 类型才在选中后自动关闭
    if (!props.panelOnly && !props.type.includes('datetime')) {
      visible.value = false
    }
  }
}

// --- 下拉定位 ---
const dropdownStyle = ref<Record<string, string>>({})
const updatePosition = () => {
  if (!wrapperRef.value || !props.teleported || props.panelOnly) return
  const rect = wrapperRef.value.getBoundingClientRect()

  // 核心修复：从所在容器提取当前有效的主题变量
  // 确保 popper 被 teleport 到 body 后，依然能维持所在作用域的主题色（如紫色）
  const styles = window.getComputedStyle(wrapperRef.value)
  const primary = styles.getPropertyValue('--yh-color-primary').trim()
  const primaryRgb = styles.getPropertyValue('--yh-color-primary-rgb').trim()
  const primaryLight9 = styles.getPropertyValue('--yh-color-primary-light-9').trim()

  dropdownStyle.value = {
    ...(themeStyle.value as Record<string, string | number>),
    position: 'fixed',
    top: `${rect.bottom + 4}px`,
    left: `${rect.left}px`,
    zIndex: '2000',
    '--yh-color-primary': primary,
    '--yh-color-primary-rgb': primaryRgb,
    '--yh-color-primary-light-9': primaryLight9
  }
}

const syncInnerDate = () => {
  // 提取当前有效的参考日期
  const modelVal = Array.isArray(props.modelValue) ? props.modelValue[0] : props.modelValue
  const defaultVal = Array.isArray(props.defaultValue) ? props.defaultValue[0] : props.defaultValue

  if (modelVal && dayjs(modelVal as Date | string | number).isValid()) {
    innerDate.value = dayjs(modelVal as Date | string | number).toDate()
  } else if (defaultVal && dayjs(defaultVal as Date | string | number).isValid()) {
    innerDate.value = dayjs(defaultVal as Date | string | number).toDate()
  } else {
    innerDate.value = new Date()
  }
}

watch(visible, (val: boolean) => {
  if (val) {
    currentView.value = getInitialView(props.type)
    updatePosition()
    syncInnerDate() // 每次打开时重新校准视图锚点
  }
})

const handleClear = (e: Event) => {
  e.stopPropagation()
  emitChange(null)
  emit('clear')
}

const togglePanel = (e?: Event) => {
  if (props.disabled || props.readonly || props.panelOnly) return
  if (e) e.stopPropagation()
  visible.value = !visible.value
}

const handleOutsideClick = (e: MouseEvent) => {
  if (!visible.value || props.panelOnly) return
  const target = e.target as HTMLElement
  if (wrapperRef.value?.contains(target)) return

  // 检查是否点击在 Teleport 的 popper 内部
  const poppers = document.querySelectorAll(`.${ns.e('panel')}`)
  for (const p of poppers) {
    if (p.contains(target)) return
  }

  visible.value = false
}

const shouldShowFooter = computed(() => {
  if (props.showFooter === false) return false
  return props.type.includes('datetime') || isRange.value || props.presets.length > 0
})

onMounted(() => {
  syncInnerDate() // 初始同步一次日期，确保 panel-only 或初始状态正确
  if (!props.panelOnly) {
    window.addEventListener('click', handleOutsideClick, true)
    if (props.teleported) {
      window.addEventListener('scroll', updatePosition, true)
      window.addEventListener('resize', updatePosition)
    }
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleOutsideClick, true)
  window.removeEventListener('scroll', updatePosition, true)
  window.removeEventListener('resize', updatePosition)
})
</script>

<template>
  <div
    ref="wrapperRef"
    :class="wrapperClasses"
    :style="themeStyle"
    @click="togglePanel"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <!-- 输入框部分 -->
    <div v-if="!panelOnly" :class="ns.e('wrapper')">
      <span :class="ns.e('icon')">
        <slot name="prefix-icon">
          <component :is="prefixIcon" v-if="prefixIcon" />
          <svg v-else viewBox="0 0 24 24" width="1em" height="1em">
            <path
              fill="currentColor"
              d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 16H5V10h14zM9 14H7v-2h2zm4 0h-2v-2h2zm4 0h-2v-2h2zm-8 4H7v-2h2zm4 4H11V16h2z"
            />
          </svg>
        </slot>
      </span>

      <template v-if="!isRange">
        <input
          :class="ns.e('inner')"
          :placeholder="placeholder ?? t('datepicker.selectDate')"
          :value="displayValue"
          readonly
        />
      </template>
      <template v-else>
        <div :class="ns.e('range-input-wrapper')">
          <input
            :class="ns.e('range-input')"
            :placeholder="startPlaceholder ?? t('datepicker.startDate')"
            :value="rangeDisplayValue[0]"
            readonly
          />
          <span :class="ns.e('range-separator')">{{ rangeSeparator }}</span>
          <input
            :class="ns.e('range-input')"
            :placeholder="endPlaceholder ?? t('datepicker.endDate')"
            :value="rangeDisplayValue[1]"
            readonly
          />
        </div>
      </template>

      <span :class="ns.e('suffix')">
        <span
          v-if="clearable && modelValue && hovering && !disabled"
          :class="ns.e('clear')"
          @click.stop="handleClear"
        >
          <slot name="clear-icon">
            <component :is="clearIcon" v-if="clearIcon" />
            <svg v-else viewBox="0 0 1024 1024" width="1em" height="1em">
              <path
                fill="currentColor"
                d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z"
              />
            </svg>
          </slot>
        </span>
      </span>
    </div>

    <!-- 弹窗面板 -->
    <component :is="panelOnly ? 'div' : 'Teleport'" to="body" :disabled="!teleported || panelOnly">
      <Transition :name="panelOnly ? '' : ns.b('panel')">
        <div
          v-if="visible"
          :class="[ns.e('panel'), popperClass, ns.is('plain', panelOnly)]"
          :style="!panelOnly && teleported ? dropdownStyle : {}"
          @click.stop
        >
          <div :class="ns.e('header')">
            <div :class="ns.e('header-group')">
              <button
                :class="[ns.e('header-btns'), ns.em('header-btns', 'double-left')]"
                @click="moveYear(-1)"
              >
                «
              </button>
              <button
                v-if="currentView === 'date'"
                :class="[ns.e('header-btns'), ns.em('header-btns', 'left')]"
                @click="moveMonth(-1)"
              >
                ‹
              </button>
            </div>
            <span :class="ns.e('header-label')" @click="handleHeaderClick">{{ headerLabel }}</span>
            <div :class="ns.e('header-group')">
              <button
                v-if="currentView === 'date'"
                :class="[ns.e('header-btns'), ns.em('header-btns', 'right')]"
                @click="moveMonth(1)"
              >
                ›
              </button>
              <button
                :class="[ns.e('header-btns'), ns.em('header-btns', 'double-right')]"
                @click="moveYear(1)"
              >
                »
              </button>
            </div>
          </div>

          <div :class="ns.e('content')">
            <DateTable
              v-if="currentView === 'date'"
              :date="innerDate"
              :selected-date="parsedSelectedDate"
              :selection-mode="type === 'week' ? 'week' : 'date'"
              :range-state="parsedRangeState"
              :disabled-date="disabledDate"
              :first-day-of-week="firstDayOfWeek"
              :cell-shape="cellShape"
              :cell-render="cellRender"
              @select="handleSelect"
              @hover="(val) => (rangeHoverDate = val)"
            >
              <template #date-cell="slotProps">
                <slot name="date-cell" v-bind="slotProps" />
              </template>
            </DateTable>
            <MonthTable
              v-else-if="currentView === 'month'"
              :date="innerDate"
              :selected-date="parsedSelectedDate"
              :range-state="parsedRangeState"
              :disabled-date="disabledDate"
              :cell-shape="cellShape"
              @select="handleSelect"
              @hover="(val) => (rangeHoverDate = val)"
            />
            <YearTable
              v-else-if="currentView === 'year'"
              :date="innerDate"
              :selected-date="parsedSelectedDate"
              :range-state="parsedRangeState"
              :disabled-date="disabledDate"
              :cell-shape="cellShape"
              @select="handleSelect"
              @hover="(val) => (rangeHoverDate = val)"
            />
            <QuarterTable
              v-else-if="currentView === 'quarter'"
              :date="innerDate"
              :selected-date="parsedSelectedDate"
              :range-state="parsedRangeState"
              :disabled-date="disabledDate"
              :cell-shape="cellShape"
              @select="handleSelect"
              @hover="(val) => (rangeHoverDate = val)"
            />
          </div>

          <div v-if="$slots.extra" :class="ns.e('extra')">
            <slot name="extra"></slot>
          </div>

          <div v-if="presets.length > 0" :class="ns.e('presets')">
            <button
              v-for="p in presets"
              :key="p.label"
              :class="ns.e('preset-item')"
              @click="handleSelect(typeof p.value === 'function' ? p.value() : p.value)"
            >
              {{ p.label }}
            </button>
          </div>

          <div v-if="shouldShowFooter" :class="ns.e('footer')">
            <slot name="footer">
              <div v-if="type.includes('datetime') && !isRange" :class="ns.e('footer-time')">
                {{ dayjs((modelValue as any) || new Date()).format(timeFormat || 'HH:mm:ss') }}
              </div>
              <div :class="ns.e('footer-btns')">
                <button
                  v-if="isRange || type.includes('datetime')"
                  :class="ns.e('footer-btn')"
                  @click="visible = false"
                >
                  {{ t('datepicker.cancel') }}
                </button>
                <button
                  :class="[ns.e('footer-btn'), ns.e('footer-btn--confirm')]"
                  @click="
                    emit('confirm', modelValue as any)
                    visible = false
                  "
                >
                  {{ t('datepicker.confirm') }}
                </button>
              </div>
            </slot>
          </div>
        </div>
      </Transition>
    </component>
  </div>
</template>

<style lang="scss">
@use './date-picker.scss';
</style>
