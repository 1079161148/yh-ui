"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rowProps = exports.rowContextKey = exports.default = void 0;
var _vue = require("vue");
var _hooks = require("@yh-ui/hooks");
var _theme = require("@yh-ui/theme");
const rowProps = exports.rowProps = {
  tag: {
    type: String,
    default: "div"
  },
  gutter: {
    type: Number,
    default: 0
  },
  justify: {
    type: String,
    default: "start"
  },
  align: {
    type: String,
    default: "top"
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
const rowContextKey = exports.rowContextKey = Symbol("rowContextKey");
module.exports = (0, _vue.defineComponent)({
  name: "YhRow",
  props: rowProps,
  setup(props, {
    slots
  }) {
    const ns = (0, _hooks.useNamespace)("row");
    const gutter = (0, _vue.computed)(() => props.gutter);
    const {
      themeStyle
    } = (0, _theme.useComponentTheme)("row", (0, _vue.computed)(() => props.themeOverrides));
    (0, _vue.provide)(rowContextKey, {
      gutter
    });
    const style = (0, _vue.computed)(() => {
      const styles = {
        ...themeStyle.value
      };
      if (!props.gutter) {
        return styles;
      }
      styles.marginRight = styles.marginLeft = `-${props.gutter / 2}px`;
      return styles;
    });
    const classes = (0, _vue.computed)(() => [ns.b(), ns.is(`justify-${props.justify}`, props.justify !== "start"), ns.is(`align-${props.align}`, props.align !== "top")]);
    return () => (0, _vue.h)(props.tag, {
      class: classes.value,
      style: style.value
    }, slots.default?.());
  }
});