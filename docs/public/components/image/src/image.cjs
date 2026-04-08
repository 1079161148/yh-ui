"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.imageProps = exports.imageFits = void 0;
const imageFits = exports.imageFits = ["", "contain", "cover", "fill", "none", "scale-down"];
const imageProps = exports.imageProps = {
  /**
   * @description 图片源地址
   */
  src: {
    type: String,
    default: ""
  },
  /**
   * @description 确定图片如何适应容器框
   */
  fit: {
    type: String,
    default: ""
  },
  /**
   * @description 是否使用懒加载
   */
  lazy: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否开启预览
   */
  previewSrcList: {
    type: Array,
    default: () => []
  },
  /**
   * @description 预览的 z-index
   */
  zIndex: {
    type: Number
  },
  /**
   * @description 开启预览图片时，第一张显示的图片索引
   */
  initialIndex: {
    type: Number,
    default: 0
  },
  /**
   * @description 预览是否可以按 ESC 关闭
   */
  closeOnPressEscape: {
    type: Boolean,
    default: true
  },
  /**
   * @description 预览是否在点击遮罩层时关闭
   */
  hideOnClickModal: {
    type: Boolean,
    default: false
  },
  /**
   * @description 预览模式下是否展示操作栏
   */
  showProgress: {
    type: Boolean,
    default: true
  },
  /**
   * @description 预览模式下是否可以缩放
   */
  zoomRate: {
    type: Number,
    default: 1.2
  },
  /**
   * @description 无限循环预览
   */
  infinite: {
    type: Boolean,
    default: true
  },
  /**
   * @description 跨域设置
   */
  crossorigin: {
    type: String
  },
  /**
   * @description 原生 alt 属性
   */
  alt: String,
  /**
   * @description 原生 loading 属性
   */
  loading: String,
  /**
   * @description 预览容器渲染到的目标节点
   */
  previewTeleported: {
    type: Boolean,
    default: true
  },
  /**
   * @description 开启懒加载后，指定滚动的容器
   */
  scrollContainer: {
    type: [String, Object]
  },
  /**
   * @description 预览模式，'default' 为内置预览器，'viewerjs' 为外部 viewerjs (需自行安装依赖)
   */
  viewerMode: {
    type: String,
    default: "default"
  },
  /**
   * @description 传递给 viewerjs 的配置项
   */
  viewerOptions: {
    type: Object,
    default: () => ({})
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};