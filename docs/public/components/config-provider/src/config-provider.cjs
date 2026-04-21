"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
module.exports = exports.configProviderProps = void 0;
var _vue = require("vue");
var _theme = require("@yh-ui/theme");
var _locale = require("@yh-ui/locale");
var _hooks = require("@yh-ui/hooks");
const configProviderProps = exports.configProviderProps = {
  theme: {
    type: String,
    default: "default"
  },
  locale: {
    type: Object,
    default: _locale.zhCn
  },
  size: {
    type: String,
    default: "default"
  },
  zIndex: {
    type: Number,
    default: 2e3
  },
  message: {
    type: Object,
    default: () => ({})
  },
  global: {
    type: Boolean,
    default: true
  }
};
module.exports = (0, _vue.defineComponent)({
  name: "YhConfigProvider",
  props: configProviderProps,
  setup(props, {
    slots
  }) {
    const containerRef = (0, _vue.ref)(null);
    const isMounted = (0, _vue.ref)(false);
    let themeManager = null;
    const validPresets = ["default", "dark", "blue", "green", "purple", "orange"];
    const isValidPreset = theme => {
      return validPresets.includes(theme);
    };
    const getThemeManager = () => {
      if (props.global) {
        return (0, _theme.useTheme)();
      }
      if (!themeManager) {
        themeManager = new _theme.ThemeManager({
          preset: "default"
        });
      }
      return themeManager;
    };
    const applyTheme = (theme, el) => {
      if (!theme) return;
      const manager = getThemeManager();
      if (!props.global && el) {
        manager.apply({
          scope: el
        });
      }
      if (isValidPreset(theme)) {
        manager.setThemePreset(theme);
      } else if (typeof theme === "string" && theme.startsWith("#")) {
        manager.setThemeColor(theme);
      }
    };
    (0, _vue.onMounted)(() => {
      isMounted.value = true;
      if (!props.global && containerRef.value) {
        const manager = getThemeManager();
        const initialPreset = isValidPreset(props.theme) ? props.theme : "default";
        manager.apply({
          scope: containerRef.value,
          preset: initialPreset
        });
        if (!isValidPreset(props.theme) && props.theme.startsWith("#")) {
          manager.setThemeColor(props.theme);
        }
      } else if (props.global) {
        applyTheme(props.theme);
      }
    });
    (0, _vue.watch)(() => props.theme, newTheme => {
      if (isMounted.value) {
        applyTheme(newTheme, containerRef.value);
      }
    });
    const config = (0, _vue.computed)(() => ({
      size: props.size,
      zIndex: props.zIndex,
      locale: props.locale,
      message: props.message
    }));
    const themeStyles = (0, _vue.computed)(() => {
      const manager = getThemeManager();
      const themeState = manager.state;
      void themeState.theme;
      void themeState.dark;
      void themeState.density;
      void themeState.colorBlindMode;
      void themeState.algorithm;
      void themeState.componentThemeVersion;
      void themeState.breakpoint;
      void JSON.stringify(themeState.colors);
      const colors = {};
      if (!isValidPreset(props.theme) && props.theme.startsWith("#")) {
        colors.primary = props.theme;
      }
      return manager.getThemeStyles(colors);
    });
    (0, _vue.provide)(_hooks.configProviderContextKey, config);
    return () => {
      return (0, _vue.h)("div", {
        ref: containerRef,
        class: "yh-config-provider",
        style: themeStyles.value
      }, [(0, _vue.renderSlot)(slots, "default")]);
    };
  }
});