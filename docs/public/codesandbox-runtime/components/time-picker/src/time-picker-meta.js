const parseTimeValue = (value, _format = "HH:mm:ss") => {
  if (value === null || value === void 0 || value === "") {
    return null;
  }
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  if (value instanceof Date) {
    hours = value.getHours();
    minutes = value.getMinutes();
    seconds = value.getSeconds();
  } else if (typeof value === "number") {
    const date = new Date(value);
    hours = date.getHours();
    minutes = date.getMinutes();
    seconds = date.getSeconds();
  } else if (typeof value === "string") {
    const timeParts = value.match(/(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?/);
    if (timeParts) {
      hours = parseInt(timeParts[1], 10);
      minutes = parseInt(timeParts[2], 10);
      seconds = timeParts[3] ? parseInt(timeParts[3], 10) : 0;
    }
  }
  hours = Math.max(0, Math.min(23, hours));
  minutes = Math.max(0, Math.min(59, minutes));
  seconds = Math.max(0, Math.min(59, seconds));
  return { hours, minutes, seconds };
};
const formatTimeState = (state, format = "HH:mm:ss", use12Hours = false) => {
  if (!state) return "";
  let { hours, minutes, seconds } = state;
  let suffix = "";
  if (use12Hours) {
    suffix = hours >= 12 ? " PM" : " AM";
    hours = hours % 12 || 12;
  }
  const HH = String(hours).padStart(2, "0");
  const H = String(hours);
  const mm = String(minutes).padStart(2, "0");
  const m = String(minutes);
  const ss = String(seconds).padStart(2, "0");
  const s = String(seconds);
  let result = format.replace("HH", HH).replace("H", H).replace("mm", mm).replace("m", m).replace("ss", ss).replace("s", s);
  if (use12Hours) {
    result = result.replace("A", suffix.trim()).replace("a", suffix.trim().toLowerCase());
  }
  return result;
};
const timeStateToDate = (state) => {
  const date = /* @__PURE__ */ new Date();
  date.setHours(state.hours, state.minutes, state.seconds, 0);
  return date;
};
const generateNumberList = (max, step = 1, disabledList = [], customOptions) => {
  const result = [];
  const set = /* @__PURE__ */ new Set();
  if (customOptions && customOptions.length > 0) {
    customOptions.forEach((v) => {
      if (v >= 0 && v <= max && !set.has(v)) {
        set.add(v);
        result.push({
          value: v,
          disabled: disabledList.includes(v)
        });
      }
    });
  } else {
    for (let i = 0; i <= max; i += step) {
      result.push({
        value: i,
        disabled: disabledList.includes(i)
      });
    }
  }
  return result.sort((a, b) => a.value - b.value);
};
const isTimeStateEqual = (a, b) => {
  if (a === null && b === null) return true;
  if (a === null || b === null) return false;
  return a.hours === b.hours && a.minutes === b.minutes && a.seconds === b.seconds;
};
const getCurrentTimeState = () => {
  const now = /* @__PURE__ */ new Date();
  return {
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds()
  };
};
export {
  formatTimeState,
  generateNumberList,
  getCurrentTimeState,
  isTimeStateEqual,
  parseTimeValue,
  timeStateToDate
};
