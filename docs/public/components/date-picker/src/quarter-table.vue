<script setup>
import { computed } from "vue";
import { useNamespace, useLocale } from "@yh-ui/hooks";
import dayjs from "../../dayjs";
const props = defineProps({
  date: { type: Date, required: true },
  selectedDate: { type: [Date, Array, null], required: false },
  rangeState: { type: Object, required: false },
  disabledDate: { type: Function, required: false },
  cellShape: { type: String, required: false }
});
const emit = defineEmits(["select", "hover"]);
const ns = useNamespace("date-picker");
const { t } = useLocale();
const quarters = computed(() => [
  { text: t("datepicker.quarters.q1"), value: 1 },
  { text: t("datepicker.quarters.q2"), value: 2 },
  { text: t("datepicker.quarters.q3"), value: 3 },
  { text: t("datepicker.quarters.q4"), value: 4 }
]);
const getCellClasses = (quarter) => {
  const classes = [ns.e("cell"), ns.is(props.cellShape || "round")];
  const month = (quarter - 1) * 3;
  const cellDate = dayjs(props.date).month(month).startOf("month");
  const today = dayjs().startOf("month");
  if (today.year() === cellDate.year() && Math.floor(today.month() / 3) === quarter - 1) {
    classes.push("is-today");
  }
  if (props.disabledDate && props.disabledDate(cellDate.toDate())) classes.push("is-disabled");
  const isSelected = (val) => {
    if (!val || Array.isArray(val)) return false;
    const d = dayjs(val);
    return d.year() === dayjs(props.date).year() && Math.floor(d.month() / 3) === quarter - 1;
  };
  if (props.selectedDate && !Array.isArray(props.selectedDate)) {
    if (isSelected(props.selectedDate)) {
      classes.push("is-selected");
    }
  }
  if (props.rangeState) {
    const { from, to, hovering } = props.rangeState;
    const start = from ? dayjs(from).startOf("month").month(Math.floor(dayjs(from).month() / 3) * 3) : null;
    const end = to ? dayjs(to).startOf("month").month(Math.floor(dayjs(to).month() / 3) * 3) : hovering ? dayjs(hovering).startOf("month").month(Math.floor(dayjs(hovering).month() / 3) * 3) : null;
    const current = cellDate.startOf("month");
    if (start && current.isSame(start, "month")) classes.push("is-range-start", "is-selected");
    if (end && current.isSame(end, "month")) classes.push("is-range-end", "is-selected");
    if (start && end) {
      const min = start.isBefore(end) ? start : end;
      const max = start.isBefore(end) ? end : start;
      if (current.isAfter(min, "month") && current.isBefore(max, "month")) {
        classes.push("is-in-range");
      }
    }
  }
  return classes;
};
const handleClick = (quarter) => {
  const month = (quarter - 1) * 3;
  const cellDate = dayjs(props.date).month(month).startOf("month").toDate();
  if (props.disabledDate && props.disabledDate(cellDate)) return;
  emit("select", quarter);
};
</script>

<template>
  <div :class="[ns.e('table'), ns.em('table', 'quarter')]">
    <div
      v-for="q in quarters"
      :key="q.value"
      :class="getCellClasses(q.value)"
      @click="handleClick(q.value)"
      @mouseenter="emit('hover', dayjs(date).month((q.value - 1) * 3).startOf('month').toDate())"
    >
      <span :class="ns.e('cell-content')">{{ q.text }}</span>
    </div>
  </div>
</template>

<style>
.yh-date-picker__table--quarter {
  display: grid !important;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  width: 100%;
  padding-top: 10px;
}
</style>
