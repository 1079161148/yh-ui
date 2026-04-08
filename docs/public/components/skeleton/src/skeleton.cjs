"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.skeletonProps = exports.skeletonItemVariants = exports.skeletonItemProps = void 0;
const skeletonItemVariants = exports.skeletonItemVariants = ["circle", "rect", "h1", "h3", "text", "caption", "button", "image"];
const skeletonItemProps = exports.skeletonItemProps = {
  /** 骨架屏种类 */
  variant: {
    type: String,
    default: "text"
  },
  /** 宽度 */
  width: {
    type: [String, Number]
  },
  /** 高度 */
  height: {
    type: [String, Number]
  },
  /** 是否开启闪烁动画 */
  animated: {
    type: Boolean,
    default: true
  },
  /** 是否为圆角 */
  round: {
    type: Boolean,
    default: false
  },
  /** 为 true 时，圆角半径为 0 */
  sharp: {
    type: Boolean,
    default: false
  },
  /** 重复次数 */
  repeat: {
    type: Number,
    default: 1
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
const skeletonProps = exports.skeletonProps = {
  /** 是否显示加载中渲染 */
  loading: {
    type: Boolean,
    default: true
  },
  /** 是否开启闪烁动画 */
  animated: {
    type: Boolean,
    default: true
  },
  /** 渲染的行数 */
  rows: {
    type: Number,
    default: 3
  },
  /** 渲染标题 */
  title: {
    type: Boolean,
    default: false
  },
  /** 渲染头衔 */
  avatar: {
    type: Boolean,
    default: false
  },
  /** 节流延迟渲染（ms） */
  throttle: {
    type: Number,
    default: 0
  },
  /** 自创高级：视口内才开始动画 */
  lazy: {
    type: Boolean,
    default: false
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};