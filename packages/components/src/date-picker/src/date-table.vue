<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { generateCalendar } from './panel-utils'
import type { CalendarCell } from './panel-utils'
import dayjs from 'dayjs'

const props = defineProps<{
  date: Date
  selectedDate?: Date | Date[] | null
  selectionMode?: 'date' | 'week'
  rangeState?: {
    from: Date | null
    to: Date | null
    hovering: Date | null
  }
  disabledDate?: (date: Date) => boolean
  firstDayOfWeek?: number
  cellShape?: 'round' | 'square'
}>()

const emit = defineEmits<{
  (e: 'select', date: Date): void
  (e: 'hover', date: Date | null): void
}>()

const ns = useNamespace('date-picker')

const rows = computed(() => {
  return generateCalendar(props.date, props.firstDayOfWeek, props.disabledDate)
})

const weekDays = computed(() => {
  const days = ['日', '一', '二', '三', '四', '五', '六']
  const start = props.firstDayOfWeek ? props.firstDayOfWeek % 7 : 0
  const result = []
  for (let i = 0; i < 7; i++) {
    result.push(days[(start + i) % 7])
  }
  return result
})

const getCellClasses = (cell: CalendarCell) => {
  const classes: any[] = [
    ns.e('cell'),
    ns.is(cell.type),
    ns.is(props.cellShape || 'round')
  ]

  if (cell.isToday) classes.push('is-today')
  if (cell.disabled) classes.push('is-disabled')

  const cellDay = cell.dayjs.startOf('day')

  // 单选选中 (包含周模式)
  if (props.selectedDate && !Array.isArray(props.selectedDate)) {
    const selectedDay = dayjs(props.selectedDate).startOf('day')
    if (props.selectionMode === 'week') {
      if (cell.dayjs.isSame(selectedDay, 'week')) {
        classes.push('is-selected')
        if (cell.dayjs.day() === (props.firstDayOfWeek || 7) % 7) classes.push('is-week-start')
        if (cell.dayjs.day() === ((props.firstDayOfWeek || 7) + 6) % 7) classes.push('is-week-end')
      }
    } else {
      if (cellDay.isSame(selectedDay)) {
        classes.push('is-selected')
      }
    }
  }

  // 范围选择
  if (props.rangeState) {
    const { from, to, hovering } = props.rangeState
    const start = from ? dayjs(from).startOf('day') : null
    const end = to ? dayjs(to).startOf('day') : null
    const hover = hovering ? dayjs(hovering).startOf('day') : null

    // 重点修复：逻辑清晰化，避免抖动
    if (start && cellDay.isSame(start)) classes.push('is-range-start', 'is-selected')
    if (end && cellDay.isSame(end)) classes.push('is-range-end', 'is-selected')

    if (start && !end && hover) {
      // 未选终点时，显示从起点到鼠标悬停点的预览范围
      const min = start.isBefore(hover) ? start : hover
      const max = start.isBefore(hover) ? hover : start
      if (cellDay.isAfter(min) && cellDay.isBefore(max)) {
        classes.push('is-in-range')
      }
      if (cellDay.isSame(hover) && !cellDay.isSame(start)) {
        classes.push('is-range-end', 'is-selected', 'is-hover-end')
      }
    } else if (start && end) {
      // 已选起终点
      const min = start.isBefore(end) ? start : end
      const max = start.isBefore(end) ? end : start
      if (cellDay.isAfter(min) && cellDay.isBefore(max)) {
        classes.push('is-in-range')
      }
    }
  }

  return classes
}

const handleClick = (cell: CalendarCell) => {
  if (cell.disabled) return
  if (props.selectionMode === 'week') {
    const firstDay = cell.dayjs.startOf('week').toDate()
    emit('select', firstDay)
  } else {
    emit('select', cell.date)
  }
}

const handleMouseEnter = (cell: CalendarCell) => {
  if (cell.disabled) return
  emit('hover', cell.date)
}
</script>

<template>
  <table :class="[ns.e('table'), ns.is('week-mode', selectionMode === 'week')]" @mouseleave="emit('hover', null)">
    <thead>
      <tr>
        <th v-for="day in weekDays" :key="day">{{ day }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, i) in rows" :key="i" :class="ns.e('table-row')">
        <td v-for="(cell, j) in row" :key="j" :class="getCellClasses(cell)" @click="handleClick(cell)"
          @mouseenter="handleMouseEnter(cell)">
          <div :class="ns.e('cell-content')">
            {{ cell.text }}
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss">
.yh-date-picker__table.is-week-mode {
  .yh-date-picker__table-row {
    &:hover {
      background-color: var(--yh-date-picker-hover-bg);
      border-radius: 4px;
    }
  }

  .yh-date-picker__cell {
    &.is-selected {
      background-color: var(--yh-date-picker-active-bg) !important;
      color: var(--yh-date-picker-active-color) !important;

      &.is-week-start {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }

      &.is-week-end {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    }

    &:hover {
      background-color: transparent !important;
    }
  }
}
</style>
