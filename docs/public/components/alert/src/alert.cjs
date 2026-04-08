"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.alertTypes = exports.alertProps = exports.alertEmits = exports.alertEffects = void 0;
const alertTypes = exports.alertTypes = ["success", "info", "warning", "error"];
const alertEffects = exports.alertEffects = ["light", "dark", "outline", "glass"];
const alertProps = exports.alertProps = {
  /** 标题 */
  title: {
    type: String,
    default: ""
  },
  /** 描述文字 */
  description: {
    type: String,
    default: ""
  },
  /** 类型 */
  type: {
    type: String,
    default: "info",
    validator: val => alertTypes.includes(val)
  },
  /** 主题样式 */
  effect: {
    type: String,
    default: "light",
    validator: val => alertEffects.includes(val)
  },
  /** 是否可关闭 */
  closable: {
    type: Boolean,
    default: false
  },
  /** 关闭按钮自定义文字 */
  closeText: {
    type: String,
    default: ""
  },
  /** 关闭按钮自定义图标 */
  closeIcon: {
    type: [Object, String, Function],
    default: ""
  },
  /** 是否显示图标 */
  showIcon: {
    type: Boolean,
    default: false
  },
  /** 自定义图标组件 */
  icon: {
    type: [Object, String, Function],
    default: ""
  },
  /** 文字是否居中 */
  center: {
    type: Boolean,
    default: false
  },
  /** 是否开启文字滚动（跑马灯效果） */
  scrollable: {
    type: Boolean,
    default: false
  },
  /** 滚动速率（完成一次滚动所需的秒数） */
  scrollSpeed: {
    type: Number,
    default: 15
  },
  /** 鼠标悬停时是否暂停滚动 */
  pauseOnHover: {
    type: Boolean,
    default: true
  },
  /** 自动关闭延迟时间（毫秒），0 为不自动关闭 */
  duration: {
    type: Number,
    default: 0
  },
  /** 是否在自动关闭时显示倒计时进度条 */
  showProgress: {
    type: Boolean,
    default: false
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
const alertEmits = exports.alertEmits = {
  close: evt => evt instanceof MouseEvent
};