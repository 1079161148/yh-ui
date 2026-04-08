import dayjs from "../../dayjs.mjs";
import isBetweenPlugin from "dayjs/plugin/isBetween.js";
import weekOfYearPlugin from "dayjs/plugin/weekOfYear.js";
import isoWeekPlugin from "dayjs/plugin/isoWeek.js";
import quarterOfYearPlugin from "dayjs/plugin/quarterOfYear.js";
import advancedFormatPlugin from "dayjs/plugin/advancedFormat.js";
import customParseFormatPlugin from "dayjs/plugin/customParseFormat.js";
dayjs.extend(isBetweenPlugin);
dayjs.extend(weekOfYearPlugin);
dayjs.extend(isoWeekPlugin);
dayjs.extend(quarterOfYearPlugin);
dayjs.extend(advancedFormatPlugin);
dayjs.extend(customParseFormatPlugin);
export const DEFAULT_FORMATS = {
  date: "YYYY-MM-DD",
  datetime: "YYYY-MM-DD HH:mm:ss",
  month: "YYYY-MM",
  year: "YYYY",
  week: "gggg [\u7B2C] ww [\u5468]",
  quarter: "YYYY-[Q]Q",
  daterange: "YYYY-MM-DD",
  datetimerange: "YYYY-MM-DD HH:mm:ss",
  monthrange: "YYYY-MM",
  yearrange: "YYYY",
  quarterrange: "YYYY-[Q]Q"
};
export const generateCalendar = (date, firstDayOfWeek = 7, disabledDate) => {
  const startOfMonth = dayjs(date).startOf("month");
  const endOfMonth = dayjs(date).endOf("month");
  const startDay = startOfMonth.day();
  const offset = (startDay - firstDayOfWeek % 7 + 7) % 7;
  const startDate = startOfMonth.subtract(offset, "day");
  const rows = [];
  let current = startDate;
  const today = dayjs().startOf("day");
  for (let i = 0; i < 6; i++) {
    const row = [];
    for (let j = 0; j < 7; j++) {
      const isPrevMonth = current.isBefore(startOfMonth, "day");
      const isNextMonth = current.isAfter(endOfMonth, "day");
      const dateObj = current.toDate();
      let type = "current-month";
      if (isPrevMonth) type = "prev-month";
      if (isNextMonth) type = "next-month";
      row.push({
        date: dateObj,
        dayjs: current,
        type,
        text: current.date(),
        disabled: disabledDate ? disabledDate(dateObj) : false,
        isToday: current.isSame(today, "day")
      });
      current = current.add(1, "day");
    }
    rows.push(row);
  }
  return rows;
};
export const formatDate = (date, format) => {
  if (!date) return "";
  return dayjs(date).format(format);
};
export const parseDate = (date, format) => {
  if (!date) return null;
  const d = format ? dayjs(date, format) : dayjs(date);
  return d.isValid() ? d : null;
};
