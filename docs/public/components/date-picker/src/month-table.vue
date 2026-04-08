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
const months = computed(() => [
  t("datepicker.months.jan"),
  t("datepicker.months.feb"),
  t("datepicker.months.mar"),
  t("datepicker.months.apr"),
  t("datepicker.months.may"),
  t("datepicker.months.jun"),
  t("datepicker.months.jul"),
  t("datepicker.months.aug"),
  t("datepicker.months.sep"),
  t("datepicker.months.oct"),
  t("datepicker.months.nov"),
  t("datepicker.months.dec")
]);
const getCellClasses = (month) => {
  const classes = [ns.e("cell"), ns.is(props.cellShape || "round")];
  const cellDate = dayjs(props.date).month(month).startOf("month");
  const today = dayjs().startOf("month");
  if (cellDate.isSame(today, "month")) classes.push("is-today");
  if (props.disabledDate && props.disabledDate(cellDate.toDate())) classes.push("is-disabled");
  const isSelected = (val) => {
    if (!val || Array.isArray(val)) return false;
    const d = dayjs(val);
    return d.year() === dayjs(props.date).year() && d.month() === month;
  };
  if (props.selectedDate && !Array.isArray(props.selectedDate)) {
    if (isSelected(props.selectedDate)) {
      classes.push("is-selected");
    }
  }
  if (props.rangeState) {
    const { from, to, hovering } = props.rangeState;
    const start = from ? dayjs(from).startOf("month") : null;
    const end = to ? dayjs(to).startOf("month") : hovering ? dayjs(hovering).startOf("month") : null;
    if (start && cellDate.isSame(start, "month")) classes.push("is-range-start", "is-selected");
    if (end && cellDate.isSame(end, "month")) classes.push("is-range-end", "is-selected");
    if (start && end) {
      const min = start.isBefore(end) ? start : end;
      const max = start.isBefore(end) ? end : start;
      if (cellDate.isAfter(min, "month") && cellDate.isBefore(max, "month")) {
        classes.push("is-in-range");
      }
    }
  }
  return classes;
};
const handleClick = (month) => {
  const cellDate = dayjs(props.date).month(month).startOf("month").toDate();
  if (props.disabledDate && props.disabledDate(cellDate)) return;
  emit("select", month);
};
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

<style>
.yh-date-picker__table--month {
  display: grid !important;
  grid-template-columns: repeat(4, 1fr) !important;
  gap: 12px 0 !important;
}
</style>
