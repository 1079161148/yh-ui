"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rateProps = exports.rateEmits = void 0;
const rateProps = exports.rateProps = {
  modelValue: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 5
  },
  disabled: {
    type: Boolean,
    default: false
  },
  allowHalf: {
    type: Boolean,
    default: false
  },
  // 自定义图标 - 选中状态
  icon: {
    type: [String, Object],
    default: ""
  },
  // 自定义图标 - 未选中状态
  voidIcon: {
    type: [String, Object],
    default: ""
  },
  // 禁用状态下未选中图标
  disabledVoidIcon: {
    type: [String, Object],
    default: ""
  },
  // 选中颜色
  colors: {
    type: [Array, Object, String],
    default: "#F7BA2A"
  },
  // 未选中颜色
  voidColor: {
    type: String,
    default: "#C6D1DE"
  },
  // 禁用状态下未选中颜色
  disabledVoidColor: {
    type: String,
    default: "#EFF2F7"
  },
  showScore: {
    type: Boolean,
    default: false
  },
  showText: {
    type: Boolean,
    default: false
  },
  textColor: {
    type: String,
    default: "#1f2d3d"
  },
  texts: {
    type: Array,
    default: () => []
  },
  scoreTemplate: {
    type: String,
    default: "{value}"
  },
  size: {
    type: String,
    default: "default"
  },
  // 清除评分
  clearable: {
    type: Boolean,
    default: false
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
const rateEmits = exports.rateEmits = {
  "update:modelValue": value => typeof value === "number",
  change: value => typeof value === "number"
};