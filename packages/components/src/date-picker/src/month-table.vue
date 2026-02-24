<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace, useLocale } from '@yh-ui/hooks'
import dayjs from 'dayjs'

const props = defineProps<{
  date: Date
  selectedDate?: Date | Date[] | null
  rangeState?: {
    from: Date | null
    to: Date | null
    hovering: Date | null
  }
  disabledDate?: (date: Date) => boolean
  cellShape?: 'round' | 'square'
}>()

const emit = defineEmits<{
  (e: 'select', month: number): void
  (e: 'hover', date: Date | null): void
}>()

const ns = useNamespace('date-picker')
const { t } = useLocale()

const months = computed(() => [
  t('datepicker.months.jan'),
  t('datepicker.months.feb'),
  t('datepicker.months.mar'),
  t('datepicker.months.apr'),
  t('datepicker.months.may'),
  t('datepicker.months.jun'),
  t('datepicker.months.jul'),
  t('datepicker.months.aug'),
  t('datepicker.months.sep'),
  t('datepicker.months.oct'),
  t('datepicker.months.nov'),
  t('datepicker.months.dec')
])

const getCellClasses = (month: number) => {
  const classes: string[] = [ns.e('cell'), ns.is(props.cellShape || 'round')]
  const cellDate = dayjs(props.date).month(month).startOf('month')
  const today = dayjs().startOf('month')

  if (cellDate.isSame(today, 'month')) classes.push('is-today')
  if (props.disabledDate && props.disabledDate(cellDate.toDate())) classes.push('is-disabled')

  const isSelected = (val: Date | Date[] | null | undefined) => {
    if (!val || Array.isArray(val)) return false
    const d = dayjs(val as Date)
    return d.year() === dayjs(props.date).year() && d.month() === month
  }

  // 单选
  if (props.selectedDate && !Array.isArray(props.selectedDate)) {
    if (isSelected(props.selectedDate)) {
      classes.push('is-selected')
    }
  }

  // 范围
  if (props.rangeState) {
    const { from, to, hovering } = props.rangeState
    const start = from ? dayjs(from).startOf('month') : null
    const end = to ? dayjs(to).startOf('month') : hovering ? dayjs(hovering).startOf('month') : null

    if (start && cellDate.isSame(start, 'month')) classes.push('is-range-start', 'is-selected')
    if (end && cellDate.isSame(end, 'month')) classes.push('is-range-end', 'is-selected')

    if (start && end) {
      const min = start.isBefore(end) ? start : end
      const max = start.isBefore(end) ? end : start
      if (cellDate.isAfter(min, 'month') && cellDate.isBefore(max, 'month')) {
        classes.push('is-in-range')
      }
    }
  }

  return classes
}

const handleClick = (month: number) => {
  const cellDate = dayjs(props.date).month(month).startOf('month').toDate()
  if (props.disabledDate && props.disabledDate(cellDate)) return
  emit('select', month)
}
</script>

<template>
  <div :class="[ns.e('table'), ns.em('table', 'month')]">
    <div
      v-for="(m, i) in months"
      :key="i"
      :class="getCellClasses(i)"
      @click="handleClick(i)"
      @mouseenter="emit('hover', dayjs(date).month(i).startOf('month').toDate())"
    >
      <span :class="ns.e('cell-content')">{{ m }}</span>
    </div>
  </div>
</template>

<style lang="scss">
.yh-date-picker__table--month {
  display: grid !important;
  grid-template-columns: repeat(4, 1fr) !important;
  gap: 12px 0 !important;
}
</style>
