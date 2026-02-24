<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
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
  (e: 'select', year: number): void
  (e: 'hover', date: Date | null): void
}>()

const ns = useNamespace('date-picker')

const startYear = computed(() => {
  return Math.floor(dayjs(props.date).year() / 10) * 10
})

const years = computed(() => {
  const start = startYear.value
  const res = []
  for (let i = 0; i < 10; i++) {
    res.push(start + i)
  }
  return res
})

const getCellClasses = (year: number) => {
  const classes: string[] = [ns.e('cell'), ns.is(props.cellShape || 'round')]
  const cellDate = dayjs().year(year).startOf('year')
  const today = dayjs().startOf('year')

  if (cellDate.isSame(today, 'year')) classes.push('is-today')
  if (props.disabledDate && props.disabledDate(cellDate.toDate())) classes.push('is-disabled')

  const isSelected = (val: Date | Date[] | null | undefined) => {
    if (!val || Array.isArray(val)) return false
    const d = dayjs(val as Date)
    return d.year() === year
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
    const start = from ? dayjs(from).startOf('year') : null
    const end = to ? dayjs(to).startOf('year') : hovering ? dayjs(hovering).startOf('year') : null

    if (start && cellDate.isSame(start)) classes.push('is-range-start', 'is-selected')
    if (end && cellDate.isSame(end)) classes.push('is-range-end', 'is-selected')

    if (start && end) {
      const min = start.isBefore(end) ? start : end
      const max = start.isBefore(end) ? end : start
      if (cellDate.isAfter(min) && cellDate.isBefore(max)) {
        classes.push('is-in-range')
      }
    }
  }

  return classes
}

const handleClick = (year: number) => {
  const cellDate = dayjs().year(year).startOf('year').toDate()
  if (props.disabledDate && props.disabledDate(cellDate)) return
  emit('select', year)
}
</script>

<template>
  <div :class="[ns.e('table'), ns.em('table', 'year')]">
    <div
      v-for="year in years"
      :key="year"
      :class="getCellClasses(year)"
      @click="handleClick(year)"
      @mouseenter="emit('hover', dayjs().year(year).startOf('year').toDate())"
    >
      <span :class="ns.e('cell-content')">{{ year }}</span>
    </div>
  </div>
</template>

<style lang="scss">
.yh-date-picker__table--year {
  display: grid !important;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px 4px;
  width: 100%;
}
</style>
