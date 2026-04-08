"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createIconComponent = createIconComponent;
exports.getIcon = getIcon;
exports.iconRegistry = exports.iconProps = void 0;
exports.registerIcon = registerIcon;
exports.registerIconSet = registerIconSet;
exports.registerIcons = registerIcons;
const iconProps = exports.iconProps = {
  /**
   * 图标名称（使用内置图标时）
   */
  name: {
    type: String,
    default: ""
  },
  /**
   * SVG 字符串（直接渲染 SVG）
   */
  svg: {
    type: String,
    default: ""
  },
  /**
   * 图标组件（传入 Vue 组件）
   */
  icon: {
    type: Object,
    default: void 0
  },
  /**
   * 图标尺寸
   * - number: 像素值
   * - string: CSS 尺寸值（如 '1em', '24px'）
   */
  size: {
    type: [Number, String],
    default: void 0
  },
  /**
   * 图标颜色
   * - 默认继承父元素的 color
   */
  color: {
    type: String,
    default: void 0
  },
  /**
   * 是否启用旋转动画
   */
  spin: {
    type: Boolean,
    default: false
  },
  /**
   * 旋转角度（度数）
   */
  rotate: {
    type: Number,
    default: 0
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
const iconRegistry = exports.iconRegistry = /* @__PURE__ */new Map();
function registerIcon(icon) {
  iconRegistry.set(icon.name, icon);
}
function registerIcons(icons) {
  icons.forEach(icon => registerIcon(icon));
}
function registerIconSet(iconSet) {
  Object.entries(iconSet.icons).forEach(([name, icon]) => {
    iconRegistry.set(`${iconSet.prefix}:${name}`, icon);
  });
}
function getIcon(name) {
  return iconRegistry.get(name);
}
function createIconComponent(svg, viewBox = "0 0 24 24") {
  return {
    name: "YhIconComponent",
    render() {
      return null;
    },
    __svg: svg,
    __viewBox: viewBox
  };
}