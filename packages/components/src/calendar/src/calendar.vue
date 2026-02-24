<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import * as _dayjs from 'dayjs'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dayjs = (_dayjs as any).default || _dayjs
import type { Dayjs } from 'dayjs'
import * as _isoWeek from 'dayjs/plugin/isoWeek'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isoWeek = (_isoWeek as any).default || _isoWeek
import { useNamespace, useLocale } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import {
  calendarProps,
  calendarEmits,
  DEFAULT_CHINA_HOLIDAYS_2026,
  type CalendarDateCell,
  type HolidayMap
} from './calendar'
import { YhButton } from '../../button'

// 扩展 dayjs 支持 ISO 周数
dayjs.extend(isoWeek)

defineOptions({
  name: 'YhCalendar'
})

const props = defineProps(calendarProps)
const emit = defineEmits(calendarEmits)
const ns = useNamespace('calendar')
const { t, locale } = useLocale()

// 组件级 themeOverrides
const { themeStyle } = useComponentTheme(
  'calendar',
  computed(() => props.themeOverrides)
)

// --- 状态管理 ---
const now = dayjs()
// 当前显示的视口日期（年月）
const displayDate = ref<Dayjs>(props.modelValue ? dayjs(props.modelValue) : now)
// 当前选中的日期（单选）
const selectedDate = ref<Dayjs | undefined>(props.modelValue ? dayjs(props.modelValue) : undefined)

// 范围选择状态
const rangeStart = ref<Dayjs | undefined>(
  props.rangeValue?.[0] ? dayjs(props.rangeValue[0]) : undefined
)
const rangeEnd = ref<Dayjs | undefined>(
  props.rangeValue?.[1] ? dayjs(props.rangeValue[1]) : undefined
)
const hoverDate = ref<Dayjs | undefined>(undefined)

// 多选状态
const multipleSelected = ref<Dayjs[]>(props.multipleValue?.map((d) => dayjs(d)) || [])

// --- 计算假期数据 ---
const mergedHolidays = computed<HolidayMap>(() => {
  if (props.showHoliday) {
    return { ...DEFAULT_CHINA_HOLIDAYS_2026, ...props.holidays }
  }
  return props.holidays
})

// --- 逻辑计算 ---
// 月份 key 用于从语言包获取月份名称
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

const title = computed(() => {
  // 1. 优先使用 props 传入的格式
  if (props.monthHeaderFormat) {
    return displayDate.value.format(props.monthHeaderFormat)
  }

  // 2. 其次使用语言包中定义的日历专属格式 (如 'YYYY年MM月')
  const calendarLocale = locale.value.yh.calendar
  if (calendarLocale?.monthHeaderFormat) {
    return displayDate.value.format(calendarLocale.monthHeaderFormat)
  }

  // 3. 最后回退到默认组合逻辑，确保国际化
  const dateLocale = locale.value.yh.datepicker
  const monthName = dateLocale.months[monthKeys[displayDate.value.month()]]
  const year = displayDate.value.year()

  // 对于东亚语言（通常 monthBeforeYear 为 false 且有 '年' 定义），移除冗余空格
  if (!dateLocale.monthBeforeYear && dateLocale.year) {
    return `${year}${dateLocale.year}${monthName}`
  }

  return dateLocale.monthBeforeYear
    ? `${monthName} ${year}`
    : `${year} ${dateLocale.year} ${monthName}`
})

// 星期标题行 (根据 firstDayOfWeek 排序)
const weekDays = computed(() => {
  const days = [
    t('calendar.weeks.sun'),
    t('calendar.weeks.mon'),
    t('calendar.weeks.tue'),
    t('calendar.weeks.wed'),
    t('calendar.weeks.thu'),
    t('calendar.weeks.fri'),
    t('calendar.weeks.sat')
  ]
  const start = props.firstDayOfWeek % 7
  return [...days.slice(start), ...days.slice(0, start)]
})

// 判断日期是否禁用
const isDateDisabled = (date: Dayjs): boolean => {
  if (props.disabled) return true
  if (props.disabledDate && props.disabledDate(date.toDate())) return true
  if (props.minDate && date.isBefore(dayjs(props.minDate), 'day')) return true
  if (props.maxDate && date.isAfter(dayjs(props.maxDate), 'day')) return true
  return false
}

// 判断日期是否为周末
const isWeekend = (date: Dayjs): boolean => {
  const day = date.day()
  return day === 0 || day === 6
}

// 判断日期是否在选择范围内
const isInRange = (date: Dayjs): boolean => {
  if (props.selectionMode !== 'range') return false
  const start = rangeStart.value
  const end = rangeEnd.value || hoverDate.value
  if (!start || !end) return false

  const min = start.isBefore(end) ? start : end
  const max = start.isBefore(end) ? end : start
  return date.isAfter(min, 'day') && date.isBefore(max, 'day')
}

// 判断日期是否被多选选中
const isMultipleSelected = (date: Dayjs): boolean => {
  if (props.selectionMode !== 'multiple') return false
  return multipleSelected.value.some((d) => d.isSame(date, 'day'))
}

// 核心：计算 6x7 渲染矩阵
const rows = computed(() => {
  const date = displayDate.value
  // 本月第一天
  const firstDay = date.startOf('month')
  // 第一天是周几 (0-6)
  const weekday = firstDay.day()
  // 计算偏移量
  const offset = (weekday - (props.firstDayOfWeek % 7) + 7) % 7
  // 矩阵开始日期
  let current = firstDay.subtract(offset, 'day')

  const matrix: { weekNumber: number; cells: CalendarDateCell[] }[] = []
  for (let i = 0; i < 6; i++) {
    const weekNumber = current.isoWeek()
    const row: CalendarDateCell[] = []
    for (let j = 0; j < 7; j++) {
      const dateStr = current.format('YYYY-MM-DD')
      const holidayInfo = mergedHolidays.value[dateStr]

      const isCurrentMonth = current.isSame(displayDate.value, 'month')
      const isTodayDate = current.isSame(now, 'day')
      const disabled = isDateDisabled(current)

      // 判断选中逻辑
      let isSelected = false
      if (props.selectionMode === 'single') {
        isSelected = selectedDate.value ? current.isSame(selectedDate.value, 'day') : false
      } else if (props.selectionMode === 'multiple') {
        isSelected = isMultipleSelected(current)
      } else if (props.selectionMode === 'range') {
        isSelected =
          (rangeStart.value && current.isSame(rangeStart.value, 'day')) ||
          (rangeEnd.value && current.isSame(rangeEnd.value, 'day')) ||
          false
      }

      const cell: CalendarDateCell = {
        date: current,
        day: current.date(),
        type: getDayType(current),
        isCurrent: isCurrentMonth,
        isToday: isTodayDate,
        isSelected,
        isDisabled: disabled,
        isWeekend: isWeekend(current),
        isHoliday: holidayInfo?.isOffDay === true,
        holidayName: holidayInfo?.name,
        isWorkday: holidayInfo?.isOffDay === false,
        isInRange: isInRange(current),
        isRangeStart: props.selectionMode === 'range' && rangeStart.value?.isSame(current, 'day'),
        isRangeEnd: props.selectionMode === 'range' && rangeEnd.value?.isSame(current, 'day'),
        dateStr
      }
      row.push(cell)
      current = current.add(1, 'day')
    }
    matrix.push({ weekNumber, cells: row })
  }
  return matrix
})

function getDayType(date: Dayjs): 'prev-month' | 'current-month' | 'next-month' {
  if (date.isBefore(displayDate.value, 'month')) return 'prev-month'
  if (date.isAfter(displayDate.value, 'month')) return 'next-month'
  return 'current-month'
}

// --- 交互方法 ---
const selectDate = (cell: CalendarDateCell) => {
  if (props.readonly || cell.isDisabled) return

  const date = cell.date

  // 不显示其他月份时，点击无效
  if (!props.showOtherMonths && cell.type !== 'current-month') return

  if (props.selectionMode === 'single') {
    const oldDate = selectedDate.value
    selectedDate.value = date

    // 如果跨月点击，自动切月
    if (!date.isSame(displayDate.value, 'month')) {
      displayDate.value = date
    }

    emit('update:modelValue', date.toDate())
    emit('select', date.toDate(), cell)
    if (!oldDate || !date.isSame(oldDate, 'day')) {
      emit('change', date.toDate())
    }
  } else if (props.selectionMode === 'range') {
    if (!rangeStart.value || (rangeStart.value && rangeEnd.value)) {
      // 开始新的选择
      rangeStart.value = date
      rangeEnd.value = undefined
    } else {
      // 完成选择
      if (date.isBefore(rangeStart.value)) {
        rangeEnd.value = rangeStart.value
        rangeStart.value = date
      } else {
        rangeEnd.value = date
      }
      emit('update:rangeValue', [rangeStart.value.toDate(), rangeEnd.value.toDate()])
      emit('range-change', [rangeStart.value.toDate(), rangeEnd.value.toDate()])
    }
    emit('select', date.toDate(), cell)
  } else if (props.selectionMode === 'multiple') {
    const idx = multipleSelected.value.findIndex((d) => d.isSame(date, 'day'))
    if (idx > -1) {
      multipleSelected.value.splice(idx, 1)
    } else {
      multipleSelected.value.push(date)
    }
    emit(
      'update:multipleValue',
      multipleSelected.value.map((d) => d.toDate())
    )
    emit('select', date.toDate(), cell)
  }
}

const handleCellHover = (cell: CalendarDateCell) => {
  if (props.selectionMode === 'range' && rangeStart.value && !rangeEnd.value) {
    hoverDate.value = cell.date
  }
}

const moveMonth = (delta: number) => {
  displayDate.value = displayDate.value.add(delta, 'month')
  emit('panel-change', displayDate.value.toDate(), props.mode)
}

const goToday = () => {
  displayDate.value = now
  if (props.selectionMode === 'single' && !props.readonly && !props.disabled) {
    const todayCell = rows.value.flatMap((r) => r.cells).find((c) => c.isToday)
    if (todayCell && !todayCell.isDisabled) {
      selectDate(todayCell)
    }
  }
}

// 监听外部 modelValue 变化
watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      const d = dayjs(val)
      selectedDate.value = d
      displayDate.value = d
    }
  }
)

// 监听外部 rangeValue 变化
watch(
  () => props.rangeValue,
  (val) => {
    if (val) {
      rangeStart.value = val[0] ? dayjs(val[0]) : undefined
      rangeEnd.value = val[1] ? dayjs(val[1]) : undefined
    }
  }
)

// 监听外部 multipleValue 变化
watch(
  () => props.multipleValue,
  (val) => {
    multipleSelected.value = val?.map((d) => dayjs(d)) || []
  }
)

onMounted(() => {
  if (props.defaultValue && !props.modelValue) {
    selectedDate.value = dayjs(props.defaultValue)
    displayDate.value = dayjs(props.defaultValue)
  }
})

// --- 辅助标记格式化 ---
const getSlotData = (cell: CalendarDateCell) => {
  return {
    isSelected: cell.isSelected,
    type: cell.type,
    day: cell.dateStr,
    date: cell.date.toDate(),
    isToday: cell.isToday,
    isDisabled: cell.isDisabled,
    isWeekend: cell.isWeekend,
    isHoliday: cell.isHoliday,
    holidayName: cell.holidayName,
    isWorkday: cell.isWorkday,
    isInRange: cell.isInRange,
    isRangeStart: cell.isRangeStart,
    isRangeEnd: cell.isRangeEnd
  }
}

// 获取单元格自定义样式类
const getCellExtraClass = (cell: CalendarDateCell) => {
  if (props.cellClassName) {
    return props.cellClassName(cell.date.toDate())
  }
  return ''
}

// 计算根节点类
const rootClass = computed(() => [
  ns.b(),
  ns.is('fullscreen', props.fullscreen),
  ns.is('readonly', props.readonly),
  ns.is('disabled', props.disabled),
  ns.m(props.size)
])

// --- 暴露方法与属性 ---
defineExpose({
  /** 当前显示的日期对象 (Dayjs) */
  displayDate,
  /** 当前选中的日期对象 (Dayjs - 单选模式) */
  selectedDate,
  /** 切换月份 (delta: 1 或 -1) */
  moveMonth,
  /** 跳转到今天 */
  goToday,
  /** 手动选中日期 */
  selectDate
})
</script>

<template>
  <div :class="rootClass" :style="themeStyle">
    <!-- 顶栏 -->
    <div :class="ns.e('header')">
      <div :class="ns.e('title')">
        <slot name="header" :date="title">{{ title }}</slot>
      </div>

      <div :class="ns.e('controls')">
        <div :class="ns.e('nav-group')">
          <yh-button class="yh-calendar__nav-btn" size="small" @click="moveMonth(-1)">
            {{ t('calendar.prevMonth') }}
          </yh-button>
          <yh-button
            class="yh-calendar__nav-btn yh-calendar__nav-btn--today"
            size="small"
            @click="goToday"
          >
            {{ t('calendar.today') }}
          </yh-button>
          <yh-button class="yh-calendar__nav-btn" size="small" @click="moveMonth(1)">
            {{ t('calendar.nextMonth') }}
          </yh-button>
        </div>
      </div>
    </div>

    <!-- 表身 -->
    <div :class="ns.e('body')">
      <table :class="ns.e('table')">
        <thead>
          <tr>
            <th v-if="showWeekNumber" :class="ns.e('week-number-header')">
              {{ t('calendar.week') }}
            </th>
            <th
              v-for="(day, idx) in weekDays"
              :key="day"
              :class="[
                ns.e('weekday'),
                { [ns.em('weekday', 'weekend')]: highlightWeekends && (idx === 0 || idx === 6) }
              ]"
            >
              {{ day }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
            <td v-if="showWeekNumber" :class="ns.e('week-number')">
              {{ row.weekNumber }}
            </td>
            <td
              v-for="(cell, cellIndex) in row.cells"
              :key="cellIndex"
              :class="[
                ns.e('day'),
                ns.is('today', cell.isToday),
                ns.is('selected', cell.isSelected),
                ns.is('disabled', cell.isDisabled),
                ns.is('weekend', highlightWeekends && cell.isWeekend),
                ns.is('holiday', cell.isHoliday),
                ns.is('workday', cell.isWorkday),
                ns.is('in-range', cell.isInRange),
                ns.is('range-start', cell.isRangeStart),
                ns.is('range-end', cell.isRangeEnd),
                ns.is('other-month', cell.type !== 'current-month'),
                ns.is('hidden', !showOtherMonths && cell.type !== 'current-month'),
                ns.is(cell.type, true),
                getCellExtraClass(cell)
              ]"
              @click="selectDate(cell)"
              @mouseenter="handleCellHover(cell)"
            >
              <div :class="ns.e('day-inner')">
                <!-- 日期数字 -->
                <div :class="ns.e('day-value')">
                  {{ cell.day }}
                </div>

                <!-- 假期/补班标记 -->
                <div
                  v-if="showHoliday && (cell.isHoliday || cell.isWorkday)"
                  :class="[
                    ns.e('day-badge'),
                    cell.isHoliday ? ns.em('day-badge', 'holiday') : ns.em('day-badge', 'workday')
                  ]"
                >
                  {{ cell.isHoliday ? t('calendar.holiday') : t('calendar.workday') }}
                </div>

                <!-- 自定义内容插槽 -->
                <div :class="ns.e('day-content')">
                  <slot name="date-cell" :data="getSlotData(cell)"></slot>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 底部插槽 -->
    <div v-if="$slots.footer" :class="ns.e('footer')">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style lang="scss">
@use './calendar.scss';
</style>
