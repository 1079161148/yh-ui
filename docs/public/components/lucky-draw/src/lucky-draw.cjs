"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.luckyDrawProps = exports.luckyDrawEmits = void 0;
const luckyDrawProps = exports.luckyDrawProps = {
  /** 抽奖类型 */
  type: {
    type: String,
    default: "wheel"
  },
  /** 奖品列表 */
  prizes: {
    type: Array,
    default: () => []
  },
  /** 是否正在旋转 */
  loading: {
    type: Boolean,
    default: false
  },
  /** 目标奖品 ID（由后端计算得出后传入） */
  targetId: {
    type: [String, Number],
    default: ""
  },
  /** 转盘/九宫格内径尺寸 (px) */
  size: {
    type: [Number, String],
    default: 300
  },
  /** 旋转圈数 */
  rounds: {
    type: Number,
    default: 8
  },
  /** 动画时长 (ms) */
  duration: {
    type: Number,
    default: 4e3
  },
  /** 按钮文本 */
  actionText: {
    type: String,
    default: ""
  },
  /** 是否隐藏按钮 */
  hideBtn: {
    type: Boolean,
    default: false
  },
  /** 主题覆盖 */
  themeOverrides: {
    type: Object,
    default: () => ({})
  }
};
const luckyDrawEmits = exports.luckyDrawEmits = {
  start: () => true,
  finish: prize => !!prize,
  click: e => e instanceof MouseEvent
};