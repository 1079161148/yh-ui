"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseTimeToMinutes = exports.isTimeInRange = exports.generateTimeOptions = exports.formatMinutesToTime = exports.compareTime = void 0;
const parseTimeToMinutes = time => {
  if (!time) return 0;
  const parts = time.split(":");
  const hours = parseInt(parts[0], 10) || 0;
  const minutes = parseInt(parts[1], 10) || 0;
  return hours * 60 + minutes;
};
exports.parseTimeToMinutes = parseTimeToMinutes;
const formatMinutesToTime = (minutes, format = "HH:mm") => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const HH = String(hours).padStart(2, "0");
  const mm = String(mins).padStart(2, "0");
  return format.replace("HH", HH).replace("H", String(hours)).replace("mm", mm).replace("m", String(mins));
};
exports.formatMinutesToTime = formatMinutesToTime;
const compareTime = (time1, time2) => {
  const m1 = parseTimeToMinutes(time1);
  const m2 = parseTimeToMinutes(time2);
  if (m1 < m2) return -1;
  if (m1 > m2) return 1;
  return 0;
};
exports.compareTime = compareTime;
const isTimeInRange = (time, start, end) => {
  const t = parseTimeToMinutes(time);
  const s = parseTimeToMinutes(start);
  const e = parseTimeToMinutes(end);
  return t >= s && t <= e;
};
exports.isTimeInRange = isTimeInRange;
const generateTimeOptions = (start, end, step, format = "HH:mm", _includeEnd = false) => {
  const options = [];
  const startMinutes = parseTimeToMinutes(start);
  const endMinutes = parseTimeToMinutes(end);
  const stepMinutes = parseTimeToMinutes(step);
  if (stepMinutes <= 0) return options;
  for (let m = startMinutes; m <= endMinutes; m += stepMinutes) {
    if (m > 24 * 60) break;
    const value = formatMinutesToTime(m, "HH:mm");
    const label = formatMinutesToTime(m, format);
    options.push({
      value,
      label
    });
  }
  return options;
};
exports.generateTimeOptions = generateTimeOptions;