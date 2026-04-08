"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseDate = exports.generateCalendar = exports.formatDate = exports.DEFAULT_FORMATS = void 0;
var _dayjs = _interopRequireDefault(require("../../dayjs.cjs"));
var _isBetween = _interopRequireDefault(require("dayjs/plugin/isBetween.js"));
var _weekOfYear = _interopRequireDefault(require("dayjs/plugin/weekOfYear.js"));
var _isoWeek = _interopRequireDefault(require("dayjs/plugin/isoWeek.js"));
var _quarterOfYear = _interopRequireDefault(require("dayjs/plugin/quarterOfYear.js"));
var _advancedFormat = _interopRequireDefault(require("dayjs/plugin/advancedFormat.js"));
var _customParseFormat = _interopRequireDefault(require("dayjs/plugin/customParseFormat.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
_dayjs.default.extend(_isBetween.default);
_dayjs.default.extend(_weekOfYear.default);
_dayjs.default.extend(_isoWeek.default);
_dayjs.default.extend(_quarterOfYear.default);
_dayjs.default.extend(_advancedFormat.default);
_dayjs.default.extend(_customParseFormat.default);
const DEFAULT_FORMATS = exports.DEFAULT_FORMATS = {
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
const generateCalendar = (date, firstDayOfWeek = 7, disabledDate) => {
  const startOfMonth = (0, _dayjs.default)(date).startOf("month");
  const endOfMonth = (0, _dayjs.default)(date).endOf("month");
  const startDay = startOfMonth.day();
  const offset = (startDay - firstDayOfWeek % 7 + 7) % 7;
  const startDate = startOfMonth.subtract(offset, "day");
  const rows = [];
  let current = startDate;
  const today = (0, _dayjs.default)().startOf("day");
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
exports.generateCalendar = generateCalendar;
const formatDate = (date, format) => {
  if (!date) return "";
  return (0, _dayjs.default)(date).format(format);
};
exports.formatDate = formatDate;
const parseDate = (date, format) => {
  if (!date) return null;
  const d = format ? (0, _dayjs.default)(date, format) : (0, _dayjs.default)(date);
  return d.isValid() ? d : null;
};
exports.parseDate = parseDate;