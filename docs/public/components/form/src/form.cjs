"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "FormContextKey", {
  enumerable: true,
  get: function () {
    return _hooks.FormContextKey;
  }
});
exports.formProps = void 0;
var _hooks = require("@yh-ui/hooks");
const formProps = exports.formProps = {
  /**
   * 表单数据对象
   */
  model: {
    type: Object,
    required: true
  },
  /**
   * 表单验证规则
   */
  rules: {
    type: Object,
    default: () => ({})
  },
  /**
   * 标签宽度
   */
  labelWidth: {
    type: [String, Number],
    default: ""
  },
  /**
   * 标签位置
   */
  labelPosition: {
    type: String,
    default: "right"
  },
  /**
   * 标签后缀
   */
  labelSuffix: {
    type: String,
    default: ""
  },
  /**
   * 是否显示校验错误信息
   */
  showMessage: {
    type: Boolean,
    default: true
  },
  /**
   * 校验由于失败滚动到第一个错误表单项
   */
  scrollToError: {
    type: Boolean,
    default: false
  },
  /**
   * 滚动到错误表单项的配置
   */
  scrollIntoViewOptions: {
    type: [Object, Boolean],
    default: false
  },
  /**
   * 滚动到错误表单项时的偏移量 (仅当 scrollToError 为 true 时有效)
   */
  scrollToErrorOffset: {
    type: Number,
    default: 0
  },
  /**
   * 是否禁用该表单内所有组件
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * 是否显示必填星号
   */
  hideRequiredAsterisk: {
    type: Boolean,
    default: false
  },
  /**
   * 表单内组件的尺寸
   */
  size: {
    type: String,
    default: "default"
  },
  /**
   * 是否显示校验图标
   */
  statusIcon: {
    type: Boolean,
    default: false
  },
  /**
   * 布局模式
   */
  layout: {
    type: String,
    default: "horizontal"
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};