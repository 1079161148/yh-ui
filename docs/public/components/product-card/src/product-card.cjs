"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productCardProps = exports.productCardEmits = void 0;
const productCardProps = exports.productCardProps = {
  /** 商品图片 */
  image: {
    type: String,
    default: ""
  },
  /** 鼠标悬浮切换图 */
  hoverImage: {
    type: String,
    default: ""
  },
  /** 视频预览地址 */
  videoSrc: {
    type: String,
    default: ""
  },
  /** 商品标题 */
  title: {
    type: String,
    default: ""
  },
  /** 副标题/属性简述 */
  description: {
    type: String,
    default: ""
  },
  /** 当前售价 */
  price: {
    type: [Number, String],
    default: 0
  },
  /** 会员价/到手价 */
  vipPrice: {
    type: [Number, String],
    default: ""
  },
  /** 会员价标签文本 (默认 "会员价") */
  vipLabel: {
    type: String,
    default: "\u4F1A\u5458"
  },
  /** 划线价/参考价 */
  marketPrice: {
    type: [Number, String],
    default: ""
  },
  /** 货币符号 */
  currency: {
    type: String,
    default: "\xA5"
  },
  /** 价格后置单位 (如: /件, /kg) */
  unit: {
    type: String,
    default: ""
  },
  /** 营销丝带文本 (推荐) */
  ribbon: {
    type: String,
    default: ""
  },
  /** 丝带背景颜色 */
  ribbonColor: {
    type: String,
    default: ""
  },
  /** 兼容性：标题标签文本 (不推荐，建议使用 ribbons 或 badges) */
  tag: {
    type: String,
    default: ""
  },
  /** 兼容性：标签颜色类型 */
  tagType: {
    type: String,
    default: "danger"
  },
  /** 标签组 (支持图片 or 文本标签) */
  badges: {
    type: Array,
    default: () => []
  },
  /** 布局模式 */
  layout: {
    type: String,
    default: "vertical"
  },
  /** 是否开启图片懒加载 */
  lazy: {
    type: Boolean,
    default: true
  },
  /** 库存进度（0-100） */
  stockProgress: {
    type: Number,
    default: 0
  },
  /** 库存进度条颜色 (支持渐变色) */
  stockColor: {
    type: String,
    default: ""
  },
  /** 库存文字提示 */
  stockText: {
    type: String,
    default: ""
  },
  /** 是否显示边框 */
  border: {
    type: Boolean,
    default: true
  },
  /** 是否开启悬浮阴影 */
  shadow: {
    type: Boolean,
    default: true
  },
  /** 是否只读 (隐藏所有操作按钮) */
  readonly: {
    type: Boolean,
    default: false
  },
  /** 操作按钮文本 */
  actionText: {
    type: String,
    default: ""
  },
  /** 按钮加载态 */
  actionLoading: {
    type: Boolean,
    default: false
  },
  /** 是否已售罄/禁用 */
  soldOut: {
    type: Boolean,
    default: false
  },
  /** 是否开启曝光监听 */
  exposure: {
    type: Boolean,
    default: false
  },
  /** 曝光上报阈值 (0-1) */
  exposureThreshold: {
    type: Number,
    default: 0.5
  },
  /** 曝光成功后是否只上报一次 */
  exposureOnce: {
    type: Boolean,
    default: true
  },
  /** 标题显示行数限制 (多行截断) */
  titleLines: {
    type: Number,
    default: 2
  },
  /** 描述显示行数限制 (多行截断) */
  descriptionLines: {
    type: Number,
    default: 1
  },
  /** 标签显示位置 */
  badgePosition: {
    type: String,
    default: "top"
  },
  /** 主题覆盖 */
  themeOverrides: {
    type: Object,
    default: () => ({})
  }
};
const productCardEmits = exports.productCardEmits = {
  click: e => e instanceof MouseEvent,
  action: e => e instanceof MouseEvent,
  /** 曝光上报事件 */
  expose: () => true
};