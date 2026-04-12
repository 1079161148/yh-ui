var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
const countdownProps = {
  /**
   * 目标截止时间（Date 或毫秒时间戳）或倒计时时长（毫秒）
   * @description 当传入 Date 或 > 1e12 的数值时视为目标时间戳，否则视为持续时间
   */
  value: {
    type: [Number, Date],
    required: true
  },
  /**
   * 格式化模板或自定义格式化函数
   * @description 支持 DD（天）、HH（时）、mm（分）、ss（秒）、SSS（毫秒）占位符
   * @default 'HH:mm:ss'
   */
  format: {
    type: [String, Function],
    default: "HH:mm:ss"
  },
  /**
   * 是否自动开始倒计时
   * @default true
   */
  autoStart: {
    type: Boolean,
    default: true
  },
  /**
   * 刷新间隔（毫秒）
   * @description 设置小于 1000 可显示毫秒级变化。建议值 1000/100/50 等
   * @default 1000
   */
  interval: {
    type: Number,
    default: 1e3,
    validator: (val) => val >= 10 && val <= 1e4
  },
  /**
   * 倒计时精度（毫秒）
   * @description 配合 interval 使用，决定毫秒位的刷新频率
   * @default 1000
   */
  precision: {
    type: Number,
    default: 1e3,
    validator: (val) => [1e3, 100, 10].includes(val)
  },
  /**
   * 标题/前缀文本
   */
  title: {
    type: String,
    default: ""
  },
  /**
   * 后缀文本
   */
  suffix: {
    type: String,
    default: ""
  },
  /**
   * 数字使用等宽字体（防止数字变化时抖动）
   * @default true
   */
  useMonospaceFont: {
    type: Boolean,
    default: true
  },
  /**
   * 是否使用翻牌效果动画
   * @default false
   */
  flipAnimation: {
    type: Boolean,
    default: false
  },
  /**
   * 值的样式
   */
  valueStyle: {
    type: [Object, String]
  },
  /**
   * 分隔符
   * @description 用于格式化显示中各时间单位之间的分隔符
   * @default ':'
   */
  separator: {
    type: String,
    default: ":"
  },
  /**
   * 是否显示日（当剩余时间 >= 24 小时时强制显示）
   * @default 'auto'
   */
  showDays: {
    type: [Boolean, String],
    default: "auto"
  },
  /**
   * 是否显示小时
   * @default true
   */
  showHours: {
    type: Boolean,
    default: true
  },
  /**
   * 是否显示分钟
   * @default true
   */
  showMinutes: {
    type: Boolean,
    default: true
  },
  /**
   * 是否显示秒
   * @default true
   */
  showSeconds: {
    type: Boolean,
    default: true
  },
  /**
   * 是否显示毫秒
   * @default false
   */
  showMilliseconds: {
    type: Boolean,
    default: false
  },
  /**
   * 时间单位标签（自动模式）
   * @description 为每个时间单位添加标签，如 { days: '天', hours: '时' }
   */
  labels: {
    type: Object
  },
  /**
   * 时间结束时是否保持在 0 而不是隐藏
   * @default true
   */
  keepAliveOnFinish: {
    type: Boolean,
    default: true
  },
  /**
   * 倒计时结束前预警时间（毫秒）
   * @description 倒计时剩余时间小于此值时，会添加 is-warning 类名并触发 warning 事件
   */
  warningThreshold: {
    type: Number
  },
  /**
   * 时区偏移（分钟）
   * @description 用于服务端和客户端时间校准
   */
  timezoneOffset: {
    type: Number
  },
  /**
   * 服务器时间校准值（毫秒）
   * @description 当服务器时间和本地时间存在偏差时使用，值 = 服务器时间 - 本地时间
   */
  serverTimeOffset: {
    type: Number,
    default: 0
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
const countdownEmits = {
  /** 倒计时更新时触发 */
  change: (_ctx) => true,
  /** 倒计时结束时触发 */
  finish: () => true,
  /** 倒计时开始时触发 */
  start: () => true,
  /** 倒计时暂停时触发 */
  pause: () => true,
  /** 倒计时继续时触发 */
  resume: () => true,
  /** 倒计时重置时触发 */
  reset: () => true,
  /** 进入预警状态时触发 */
  warning: (_ctx) => true,
  /** 状态变化时触发 */
  statusChange: (status) => ["pending", "running", "paused", "finished"].includes(status)
};
const TIME_CONSTANTS = {
  /** 毫秒/秒 */
  SECOND: 1e3,
  /** 毫秒/分 */
  MINUTE: 60 * 1e3,
  /** 毫秒/时 */
  HOUR: 60 * 60 * 1e3,
  /** 毫秒/天 */
  DAY: 24 * 60 * 60 * 1e3
};
function parseTimeUnits(remain) {
  const total = Math.max(0, remain);
  const days = Math.floor(total / TIME_CONSTANTS.DAY);
  const hours = Math.floor(total % TIME_CONSTANTS.DAY / TIME_CONSTANTS.HOUR);
  const minutes = Math.floor(total % TIME_CONSTANTS.HOUR / TIME_CONSTANTS.MINUTE);
  const seconds = Math.floor(total % TIME_CONSTANTS.MINUTE / TIME_CONSTANTS.SECOND);
  const milliseconds = Math.floor(total % TIME_CONSTANTS.SECOND);
  return { days, hours, minutes, seconds, milliseconds };
}
function padZero(num, len = 2) {
  return String(num).padStart(len, "0");
}
function createFormatContext(remain) {
  const units = parseTimeUnits(remain);
  return __spreadProps(__spreadValues({}, units), {
    total: Math.max(0, remain),
    DD: padZero(units.days),
    HH: padZero(units.hours),
    mm: padZero(units.minutes),
    ss: padZero(units.seconds),
    SSS: padZero(units.milliseconds, 3),
    SS: padZero(Math.floor(units.milliseconds / 10), 2),
    S: String(Math.floor(units.milliseconds / 100))
  });
}
function formatCountdown(format, ctx) {
  if (typeof format === "function") {
    return format(ctx);
  }
  return format.replace(/DD/g, ctx.DD).replace(/HH/g, ctx.HH).replace(/mm/g, ctx.mm).replace(/ss/g, ctx.ss).replace(/SSS/g, ctx.SSS).replace(/SS/g, ctx.SS).replace(/S/g, ctx.S);
}
function isTargetTimestamp(value) {
  if (value instanceof Date) return true;
  return value > 9783072e5;
}
function calculateRemain(value, serverTimeOffset = 0) {
  const now = Date.now() + serverTimeOffset;
  if (isTargetTimestamp(value)) {
    const target = value instanceof Date ? value.getTime() : value;
    return Math.max(0, target - now);
  }
  return Math.max(0, value instanceof Date ? value.getTime() : value);
}
export {
  TIME_CONSTANTS,
  calculateRemain,
  countdownEmits,
  countdownProps,
  createFormatContext,
  formatCountdown,
  isTargetTimestamp,
  padZero,
  parseTimeUnits
};
