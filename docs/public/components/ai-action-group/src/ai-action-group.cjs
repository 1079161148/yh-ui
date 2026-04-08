"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aiActionGroupProps = exports.aiActionGroupEmits = void 0;
const aiActionGroupProps = exports.aiActionGroupProps = {
  /**
   * 操作项列表
   * 可以传简单的 string 如 ['copy', 'refresh', 'thumb-up']
   */
  items: {
    type: Array,
    default: () => []
  },
  /**
   * 尺寸: small | default | large
   */
  size: {
    type: String,
    default: "small"
  },
  /**
   * 视觉变体: text | ghost | outlined
   */
  variant: {
    type: String,
    default: "text"
  },
  /**
   * 布局: horizontal | vertical
   */
  direction: {
    type: String,
    default: "horizontal"
  },
  /**
   * 主题覆盖变量
   */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
const aiActionGroupEmits = exports.aiActionGroupEmits = {
  /**
   * 点击操作项时触发
   */
  click: (key, _item) => !!key
};