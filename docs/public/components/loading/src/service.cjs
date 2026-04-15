"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Loading = void 0;
var _vue = require("vue");
var _hooks = require("@yh-ui/hooks");
var _theme = require("@yh-ui/theme");
var _spin = require("../../spin/index.cjs");
const createLoading = (options = {}, appContext) => {
  const resolvedOptions = {
    target: document.body,
    body: false,
    fullscreen: true,
    lock: false,
    glass: false,
    ...options
  };
  const state = (0, _vue.reactive)({
    visible: true
  });
  const component = {
    setup() {
      const {
        t
      } = (0, _hooks.useLocale)();
      const {
        themeStyle
      } = (0, _theme.useComponentTheme)("loading", (0, _vue.computed)(() => resolvedOptions.themeOverrides));
      return () => (0, _vue.h)(_vue.Transition, {
        name: "yh-loading-fade",
        appear: true
      }, {
        default: () => state.visible ? (0, _vue.h)("div", {
          class: ["yh-loading-mask", resolvedOptions.customClass, {
            "is-fullscreen": resolvedOptions.fullscreen,
            "is-glass": resolvedOptions.glass
          }],
          style: [{
            backgroundColor: resolvedOptions.background
          }, themeStyle.value]
        }, [(0, _vue.h)("div", {
          class: "yh-loading-spinner"
        }, [resolvedOptions.spinner ? typeof resolvedOptions.spinner === "string" ? (0, _vue.h)("i", {
          class: resolvedOptions.spinner
        }) : (0, _vue.isVNode)(resolvedOptions.spinner) ? resolvedOptions.spinner : (0, _vue.h)(resolvedOptions.spinner) : (0, _vue.h)(_spin.YhSpin, {
          tip: resolvedOptions.text ?? t("loading.text"),
          size: resolvedOptions.fullscreen ? "large" : "default",
          vertical: true,
          color: resolvedOptions.color,
          dot: resolvedOptions.dot,
          type: resolvedOptions.spinnerType || "circle",
          show: true
        })])]) : null
      });
    }
  };
  const container = document.createElement("div");
  container.style.display = "contents";
  const vnode = (0, _vue.createVNode)(component);
  if (appContext) {
    vnode.appContext = appContext;
  }
  (0, _vue.render)(vnode, container);
  let target = document.body;
  if (resolvedOptions.fullscreen) {
    target = document.body;
  } else if (resolvedOptions.target) {
    target = typeof resolvedOptions.target === "string" ? document.querySelector(resolvedOptions.target) : resolvedOptions.target;
  }
  if (!target) target = document.body;
  const isRelative = target.style.position === "relative" || target.classList.contains("yh-loading-parent--relative");
  if (!resolvedOptions.fullscreen && !isRelative) {
    target.classList.add("yh-loading-parent--relative");
  }
  target.appendChild(container);
  if (resolvedOptions.lock) {
    target.style.overflow = "hidden";
  }
  const instance = {
    close: () => {
      state.visible = false;
      setTimeout(() => {
        (0, _vue.render)(null, container);
        container.remove();
        if (!resolvedOptions.fullscreen) {
          target.classList.remove("yh-loading-parent--relative");
        }
        if (resolvedOptions.lock) {
          target.style.overflow = "";
        }
      }, 400);
    },
    get visible() {
      return state.visible;
    }
  };
  return instance;
};
const Loading = exports.Loading = {
  service: createLoading
};