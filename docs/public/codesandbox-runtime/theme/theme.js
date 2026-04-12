var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { reactive, toRefs } from "vue";
import { designTokens } from "./tokens/index.js";
const presetThemes = {
  default: {
    primary: "#409eff",
    success: "#67c23a",
    warning: "#e6a23c",
    danger: "#f56c6c",
    info: "#909399"
  },
  dark: {
    primary: "#409eff",
    success: "#67c23a",
    warning: "#e6a23c",
    danger: "#f56c6c",
    info: "#909399"
  },
  blue: {
    primary: "#1890ff",
    success: "#52c41a",
    warning: "#faad14",
    danger: "#ff4d4f",
    info: "#909399"
  },
  green: {
    primary: "#10b981",
    success: "#22c55e",
    warning: "#f59e0b",
    danger: "#ef4444",
    info: "#6b7280"
  },
  purple: {
    primary: "#8b5cf6",
    success: "#22c55e",
    warning: "#f59e0b",
    danger: "#ef4444",
    info: "#6b7280"
  },
  orange: {
    primary: "#f97316",
    success: "#22c55e",
    warning: "#eab308",
    danger: "#ef4444",
    info: "#6b7280"
  },
  rose: {
    primary: "#f43f5e",
    success: "#22c55e",
    warning: "#f59e0b",
    danger: "#dc2626",
    info: "#6b7280"
  },
  amber: {
    primary: "#f59e0b",
    success: "#22c55e",
    warning: "#eab308",
    danger: "#ef4444",
    info: "#6b7280"
  },
  teal: {
    primary: "#14b8a6",
    success: "#22c55e",
    warning: "#f59e0b",
    danger: "#ef4444",
    info: "#6b7280"
  },
  indigo: {
    primary: "#6366f1",
    success: "#22c55e",
    warning: "#f59e0b",
    danger: "#ef4444",
    info: "#6b7280"
  },
  slate: {
    primary: "#475569",
    success: "#22c55e",
    warning: "#f59e0b",
    danger: "#ef4444",
    info: "#64748b"
  },
  zinc: {
    primary: "#52525b",
    success: "#22c55e",
    warning: "#f59e0b",
    danger: "#ef4444",
    info: "#71717a"
  }
};
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
function rgbToHex(r, g, b) {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}
function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}
function hslToRgb(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p2, q2, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p2 + (q2 - p2) * 6 * t;
      if (t < 1 / 2) return q2;
      if (t < 2 / 3) return p2 + (q2 - p2) * (2 / 3 - t) * 6;
      return p2;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}
function getRelativeLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}
function getContrastRatio(color1, color2) {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  if (!rgb1 || !rgb2) return 1;
  const l1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}
function ensureContrast(foreground, background, minRatio = 4.5) {
  const ratio = getContrastRatio(foreground, background);
  if (ratio >= minRatio) return foreground;
  const fgRgb = hexToRgb(foreground);
  if (!fgRgb) return foreground;
  const hsl = rgbToHsl(fgRgb.r, fgRgb.g, fgRgb.b);
  const bgRgb = hexToRgb(background);
  if (!bgRgb) return foreground;
  const bgLuminance = getRelativeLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
  if (bgLuminance > 0.5) {
    while (hsl.l > 0 && getContrastRatio(
      rgbToHex(...Object.values(hslToRgb(hsl.h, hsl.s, hsl.l))),
      background
    ) < minRatio) {
      hsl.l -= 5;
    }
  } else {
    while (hsl.l < 100 && getContrastRatio(
      rgbToHex(...Object.values(hslToRgb(hsl.h, hsl.s, hsl.l))),
      background
    ) < minRatio) {
      hsl.l += 5;
    }
  }
  const adjusted = hslToRgb(hsl.h, hsl.s, hsl.l);
  return rgbToHex(adjusted.r, adjusted.g, adjusted.b);
}
function mixColor(color1, color2, weight) {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  if (!rgb1 || !rgb2) return color1;
  const w = weight / 100;
  const r = Math.round(rgb1.r * w + rgb2.r * (1 - w));
  const g = Math.round(rgb1.g * w + rgb2.g * (1 - w));
  const b = Math.round(rgb1.b * w + rgb2.b * (1 - w));
  return rgbToHex(r, g, b);
}
function adjustSaturation(color, amount) {
  const rgb = hexToRgb(color);
  if (!rgb) return color;
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  hsl.s = Math.max(0, Math.min(100, hsl.s + amount));
  const adjusted = hslToRgb(hsl.h, hsl.s, hsl.l);
  return rgbToHex(adjusted.r, adjusted.g, adjusted.b);
}
function adjustLightness(color, amount) {
  const rgb = hexToRgb(color);
  if (!rgb) return color;
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  hsl.l = Math.max(0, Math.min(100, hsl.l + amount));
  const adjusted = hslToRgb(hsl.h, hsl.s, hsl.l);
  return rgbToHex(adjusted.r, adjusted.g, adjusted.b);
}
function generateColorScaleWithAlgorithm(baseColor, isDark = false, algorithm = "default") {
  const white = "#ffffff";
  const black = "#000000";
  let adjustedBase = baseColor;
  switch (algorithm) {
    case "vibrant":
      adjustedBase = adjustSaturation(baseColor, 15);
      break;
    case "muted":
      adjustedBase = adjustSaturation(baseColor, -20);
      break;
    case "pastel":
      adjustedBase = adjustSaturation(adjustLightness(baseColor, 15), -30);
      break;
  }
  if (isDark) {
    return {
      "": adjustedBase,
      "light-3": mixColor(adjustedBase, black, 70),
      "light-5": mixColor(adjustedBase, black, 50),
      "light-7": mixColor(adjustedBase, black, 30),
      "light-8": mixColor(adjustedBase, black, 20),
      "light-9": mixColor(adjustedBase, black, 10),
      "dark-2": mixColor(adjustedBase, white, 80)
    };
  }
  return {
    "": adjustedBase,
    "light-1": mixColor(adjustedBase, white, 90),
    "light-2": mixColor(adjustedBase, white, 80),
    "light-3": mixColor(adjustedBase, white, 70),
    "light-4": mixColor(adjustedBase, white, 60),
    "light-5": mixColor(adjustedBase, white, 50),
    "light-6": mixColor(adjustedBase, white, 40),
    "light-7": mixColor(adjustedBase, white, 30),
    "light-8": mixColor(adjustedBase, white, 20),
    "light-9": mixColor(adjustedBase, white, 10),
    "dark-2": mixColor(adjustedBase, black, 80)
  };
}
function generateSemanticColors(baseColor, isDark = false) {
  return {
    hover: isDark ? adjustLightness(baseColor, 10) : adjustLightness(baseColor, -5),
    active: isDark ? adjustLightness(baseColor, -5) : adjustLightness(baseColor, -10),
    disabled: adjustSaturation(adjustLightness(baseColor, isDark ? -20 : 30), -40),
    focus: baseColor
  };
}
function setCssVar(name, value, el = null) {
  const target = el || (typeof document !== "undefined" ? document.documentElement : null);
  if (target) {
    target.style.setProperty(name, value);
  }
}
function getCssVar(name, el = null) {
  const target = el || (typeof document !== "undefined" ? document.documentElement : null);
  if (target) {
    return getComputedStyle(target).getPropertyValue(name).trim();
  }
  return "";
}
function removeCssVar(name, el = null) {
  const target = el || (typeof document !== "undefined" ? document.documentElement : null);
  if (target) {
    target.style.removeProperty(name);
  }
}
function getTargetElement(scope) {
  if (typeof document === "undefined") return null;
  if (!scope) return document.documentElement;
  if (typeof scope === "string") {
    return document.querySelector(scope);
  }
  return scope;
}
const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400
};
const densityConfig = {
  comfortable: {
    "--yh-density-factor": "1",
    "--yh-component-size-default": "32px",
    "--yh-component-size-small": "24px",
    "--yh-component-size-large": "40px",
    "--yh-padding-default": "12px 16px",
    "--yh-padding-small": "8px 12px",
    "--yh-padding-large": "16px 20px",
    "--yh-spacing-unit": "8px",
    "--yh-font-size-base": "14px",
    "--yh-line-height-base": "1.5"
  },
  compact: {
    "--yh-density-factor": "0.85",
    "--yh-component-size-default": "28px",
    "--yh-component-size-small": "20px",
    "--yh-component-size-large": "36px",
    "--yh-padding-default": "8px 12px",
    "--yh-padding-small": "4px 8px",
    "--yh-padding-large": "12px 16px",
    "--yh-spacing-unit": "6px",
    "--yh-font-size-base": "13px",
    "--yh-line-height-base": "1.4"
  },
  dense: {
    "--yh-density-factor": "0.7",
    "--yh-component-size-default": "24px",
    "--yh-component-size-small": "18px",
    "--yh-component-size-large": "32px",
    "--yh-padding-default": "4px 8px",
    "--yh-padding-small": "2px 6px",
    "--yh-padding-large": "8px 12px",
    "--yh-spacing-unit": "4px",
    "--yh-font-size-base": "12px",
    "--yh-line-height-base": "1.35"
  }
};
const colorBlindPalettes = {
  none: {},
  // 红色盲（无法区分红绿）
  protanopia: {
    primary: "#0072B2",
    // 蓝色
    success: "#009E73",
    // 蓝绿色
    warning: "#E69F00",
    // 橙色
    danger: "#D55E00",
    // 深橙色
    info: "#56B4E9"
    // 浅蓝色
  },
  // 绿色盲（无法区分红绿）
  deuteranopia: {
    primary: "#0072B2",
    success: "#009E73",
    warning: "#E69F00",
    danger: "#CC79A7",
    // 粉紫色
    info: "#56B4E9"
  },
  // 蓝色盲（无法区分蓝黄）
  tritanopia: {
    primary: "#CC79A7",
    // 粉紫色
    success: "#009E73",
    // 蓝绿色
    warning: "#D55E00",
    // 深橙色
    danger: "#E69F00",
    // 橙色
    info: "#999999"
    // 灰色
  },
  // 全色盲（只能看到灰度）
  achromatopsia: {
    primary: "#404040",
    success: "#606060",
    warning: "#808080",
    danger: "#202020",
    info: "#a0a0a0"
  }
};
const THEME_TRANSITION_CLASS = "yh-theme-transitioning";
const DEFAULT_TRANSITION_DURATION = 300;
const DEFAULT_TRANSITION_TIMING = "cubic-bezier(0.4, 0, 0.2, 1)";
function enableThemeTransition(duration = DEFAULT_TRANSITION_DURATION, timing = DEFAULT_TRANSITION_TIMING) {
  if (typeof document === "undefined") return;
  const style = document.createElement("style");
  style.id = "yh-theme-transition";
  style.textContent = `
    .${THEME_TRANSITION_CLASS},
    .${THEME_TRANSITION_CLASS} *,
    .${THEME_TRANSITION_CLASS} *::before,
    .${THEME_TRANSITION_CLASS} *::after {
      transition: 
        background-color ${duration}ms ${timing},
        border-color ${duration}ms ${timing},
        color ${duration}ms ${timing},
        fill ${duration}ms ${timing},
        stroke ${duration}ms ${timing},
        box-shadow ${duration}ms ${timing} !important;
    }
  `;
  document.head.appendChild(style);
  document.documentElement.classList.add(THEME_TRANSITION_CLASS);
  setTimeout(() => {
    document.documentElement.classList.remove(THEME_TRANSITION_CLASS);
    style.remove();
  }, duration);
}
function getComplementaryColor(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  hsl.h = (hsl.h + 180) % 360;
  const result = hslToRgb(hsl.h, hsl.s, hsl.l);
  return rgbToHex(result.r, result.g, result.b);
}
function getAnalogousColors(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return [hex, hex];
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const hsl1 = __spreadProps(__spreadValues({}, hsl), { h: (hsl.h + 30) % 360 });
  const hsl2 = __spreadProps(__spreadValues({}, hsl), { h: (hsl.h - 30 + 360) % 360 });
  const result1 = hslToRgb(hsl1.h, hsl1.s, hsl1.l);
  const result2 = hslToRgb(hsl2.h, hsl2.s, hsl2.l);
  return [rgbToHex(result1.r, result1.g, result1.b), rgbToHex(result2.r, result2.g, result2.b)];
}
function getTriadicColors(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return [hex, hex];
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const hsl1 = __spreadProps(__spreadValues({}, hsl), { h: (hsl.h + 120) % 360 });
  const hsl2 = __spreadProps(__spreadValues({}, hsl), { h: (hsl.h + 240) % 360 });
  const result1 = hslToRgb(hsl1.h, hsl1.s, hsl1.l);
  const result2 = hslToRgb(hsl2.h, hsl2.s, hsl2.l);
  return [rgbToHex(result1.r, result1.g, result1.b), rgbToHex(result2.r, result2.g, result2.b)];
}
function generatePaletteFromPrimary(primaryColor) {
  const rgb = hexToRgb(primaryColor);
  if (!rgb) return { primary: primaryColor };
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const successHsl = { h: 142, s: Math.min(hsl.s, 70), l: 45 };
  const successRgb = hslToRgb(successHsl.h, successHsl.s, successHsl.l);
  const warningHsl = { h: 36, s: Math.min(hsl.s + 10, 85), l: 50 };
  const warningRgb = hslToRgb(warningHsl.h, warningHsl.s, warningHsl.l);
  const dangerHsl = { h: 0, s: Math.min(hsl.s + 5, 75), l: 55 };
  const dangerRgb = hslToRgb(dangerHsl.h, dangerHsl.s, dangerHsl.l);
  const infoHsl = { h: hsl.h, s: Math.max(hsl.s - 40, 10), l: 60 };
  const infoRgb = hslToRgb(infoHsl.h, infoHsl.s, infoHsl.l);
  return {
    primary: primaryColor,
    success: rgbToHex(successRgb.r, successRgb.g, successRgb.b),
    warning: rgbToHex(warningRgb.r, warningRgb.g, warningRgb.b),
    danger: rgbToHex(dangerRgb.r, dangerRgb.g, dangerRgb.b),
    info: rgbToHex(infoRgb.r, infoRgb.g, infoRgb.b)
  };
}
function getCurrentBreakpoint() {
  if (typeof window === "undefined") return "md";
  const width = window.innerWidth;
  if (width >= breakpoints.xxl) return "xxl";
  if (width >= breakpoints.xl) return "xl";
  if (width >= breakpoints.lg) return "lg";
  if (width >= breakpoints.md) return "md";
  if (width >= breakpoints.sm) return "sm";
  return "xs";
}
class ThemeManager {
  constructor(options) {
    __publicField(this, "currentTheme", "default");
    __publicField(this, "customColors", {});
    __publicField(this, "isDark", false);
    __publicField(this, "targetEl", null);
    __publicField(this, "persistKey", "yh-ui-theme");
    __publicField(this, "algorithm", "default");
    __publicField(this, "responsiveConfig", {});
    __publicField(this, "currentBreakpoint", "md");
    __publicField(this, "resizeHandler", null);
    __publicField(this, "systemDarkQuery", null);
    __publicField(this, "systemDarkHandler", null);
    __publicField(this, "followSystem", false);
    __publicField(this, "currentDensity", "comfortable");
    __publicField(this, "colorBlindMode", "none");
    __publicField(this, "componentOverrides", {});
    __publicField(this, "transitionEnabled", false);
    __publicField(this, "transitionConfig", {
      duration: DEFAULT_TRANSITION_DURATION,
      timing: DEFAULT_TRANSITION_TIMING
    });
    __publicField(this, "themeHistory", []);
    __publicField(this, "maxHistoryLength", 10);
    // 响应式状态
    __publicField(this, "state", reactive({
      theme: "default",
      dark: false,
      colors: {},
      breakpoint: "md",
      density: "comfortable",
      colorBlindMode: "none"
    }));
    this.initTheme(options);
  }
  /** 初始化主题 */
  initTheme(options) {
    if ((options == null ? void 0 : options.persist) !== false) {
      this.persistKey = (options == null ? void 0 : options.persistKey) || "yh-ui-theme";
      this.restoreFromStorage();
    }
    this.apply(__spreadValues({
      preset: "default"
    }, options));
    if (options == null ? void 0 : options.responsive) {
      this.setResponsiveTheme(options.responsive);
    }
    if (options == null ? void 0 : options.followSystem) {
      this.enableSystemFollow();
    }
    this.applyTokens();
  }
  /** 应用主题 */
  apply(options) {
    const { preset, colors, dark, scope, algorithm } = options;
    this.targetEl = getTargetElement(scope);
    if (algorithm) {
      this.algorithm = algorithm;
    }
    if (dark !== void 0) {
      this.setDarkMode(dark);
    }
    if (preset) {
      this.setPreset(preset);
    }
    if (colors) {
      this.setColors(colors);
    }
  }
  /** 设置预设主题 */
  setPreset(preset) {
    const colors = presetThemes[preset];
    if (!colors) {
      console.warn(`[YH-UI Theme] Invalid preset: "${preset}"`);
      return;
    }
    this.currentTheme = preset;
    this.state.theme = preset;
    this.applyColors(colors);
    this.saveToStorage();
  }
  /** 设置自定义颜色 */
  setColors(colors) {
    this.customColors = __spreadValues(__spreadValues({}, this.customColors), colors);
    this.state.colors = this.customColors;
    this.applyColors(colors);
    this.saveToStorage();
  }
  /** 设置主色 */
  setPrimaryColor(color) {
    this.setColors({ primary: color });
  }
  /** 设置主题色 (别名) */
  setThemeColor(color) {
    this.setPrimaryColor(color);
  }
  /** 设置预设主题 (别名) */
  setThemePreset(preset) {
    this.setPreset(preset);
  }
  /** 设置颜色算法 */
  setAlgorithm(algorithm) {
    this.algorithm = algorithm;
    const currentColors = __spreadValues(__spreadValues({}, presetThemes[this.currentTheme]), this.customColors);
    this.applyColors(currentColors);
    this.saveToStorage();
  }
  /** 设置暗色模式 */
  setDarkMode(dark) {
    this.isDark = dark;
    this.state.dark = dark;
    if (typeof document !== "undefined") {
      if (dark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
    const currentColors = __spreadValues(__spreadValues({}, presetThemes[this.currentTheme]), this.customColors);
    this.applyColors(currentColors);
    this.saveToStorage();
  }
  /** 切换暗色模式 */
  toggleDarkMode() {
    this.setDarkMode(!this.isDark);
    return this.isDark;
  }
  /** 启用系统主题跟随 */
  enableSystemFollow() {
    if (typeof window === "undefined") return;
    this.followSystem = true;
    this.systemDarkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    this.setDarkMode(this.systemDarkQuery.matches);
    this.systemDarkHandler = (e) => {
      if (this.followSystem) {
        this.setDarkMode(e.matches);
      }
    };
    this.systemDarkQuery.addEventListener("change", this.systemDarkHandler);
  }
  /** 禁用系统主题跟随 */
  disableSystemFollow() {
    this.followSystem = false;
    if (this.systemDarkQuery && this.systemDarkHandler) {
      this.systemDarkQuery.removeEventListener("change", this.systemDarkHandler);
    }
  }
  /** 设置响应式主题 */
  setResponsiveTheme(config) {
    this.responsiveConfig = config;
    if (typeof window === "undefined") return;
    this.currentBreakpoint = getCurrentBreakpoint();
    this.state.breakpoint = this.currentBreakpoint;
    this.applyResponsiveTheme();
    this.resizeHandler = () => {
      const newBreakpoint = getCurrentBreakpoint();
      if (newBreakpoint !== this.currentBreakpoint) {
        this.currentBreakpoint = newBreakpoint;
        this.state.breakpoint = newBreakpoint;
        this.applyResponsiveTheme();
      }
    };
    window.addEventListener("resize", this.resizeHandler);
  }
  /** 应用响应式主题 */
  applyResponsiveTheme() {
    const config = this.responsiveConfig[this.currentBreakpoint];
    if (config) {
      this.apply(config);
    }
  }
  /** 获取当前是否暗色模式 */
  get dark() {
    return this.isDark;
  }
  /** 获取当前主题 */
  get theme() {
    return this.currentTheme;
  }
  /** 获取所有可用预设 */
  get presets() {
    return Object.keys(presetThemes);
  }
  /** 获取当前断点 */
  get breakpoint() {
    return this.currentBreakpoint;
  }
  /** 应用颜色到 CSS 变量 */
  applyColors(colors) {
    const el = this.targetEl || (typeof document !== "undefined" ? document.documentElement : null);
    if (!el) return;
    const styles = this.getThemeStyles(colors);
    Object.entries(styles).forEach(([name, value]) => {
      setCssVar(name, value, el);
    });
  }
  /** 获取当前主题的 CSS 变量对象 */
  getThemeStyles(colors = {}) {
    const styles = {};
    const themeColors = __spreadValues(__spreadValues(__spreadValues({}, presetThemes[this.currentTheme]), this.customColors), colors);
    const colorTypes = [
      { key: "primary", cssVar: "primary" },
      { key: "success", cssVar: "success" },
      { key: "warning", cssVar: "warning" },
      { key: "danger", cssVar: "danger" },
      { key: "info", cssVar: "info" }
    ];
    colorTypes.forEach(({ key, cssVar }) => {
      const baseColor = themeColors[key];
      if (baseColor) {
        const colorScale = generateColorScaleWithAlgorithm(baseColor, this.isDark, this.algorithm);
        Object.entries(colorScale).forEach(([suffix, value]) => {
          const varName = suffix ? `--yh-color-${cssVar}-${suffix}` : `--yh-color-${cssVar}`;
          styles[varName] = value;
        });
        const semanticColors = generateSemanticColors(baseColor, this.isDark);
        Object.entries(semanticColors).forEach(([state, value]) => {
          styles[`--yh-color-${cssVar}-${state}`] = value;
        });
        const rgb = hexToRgb(baseColor);
        if (rgb) {
          styles[`--yh-color-${cssVar}-rgb`] = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
        }
      }
    });
    Object.entries(designTokens.textColors).forEach(([key, value]) => {
      styles[`--yh-text-color-${key}`] = value;
    });
    Object.entries(designTokens.borderColors).forEach(([key, value]) => {
      const name = key === "DEFAULT" ? "--yh-border-color" : `--yh-border-color-${key}`;
      styles[name] = value;
    });
    Object.entries(designTokens.bgColors).forEach(([key, value]) => {
      const name = key === "DEFAULT" ? "--yh-bg-color" : `--yh-bg-color-${key}`;
      styles[name] = value;
    });
    Object.entries(designTokens.radius).forEach(([key, value]) => {
      styles[`--yh-radius-${key}`] = value;
    });
    Object.entries(designTokens.zIndex).forEach(([key, value]) => {
      styles[`--yh-z-index-${key}`] = value;
    });
    Object.entries(designTokens.spacing).forEach(([key, value]) => {
      styles[`--yh-spacing-${key}`] = value;
    });
    Object.entries(designTokens.fontSize).forEach(([key, value]) => {
      styles[`--yh-font-size-${key}`] = value;
    });
    Object.entries(designTokens.lineHeight).forEach(([key, value]) => {
      styles[`--yh-line-height-${key}`] = value;
    });
    Object.entries(designTokens.fontWeight).forEach(([key, value]) => {
      styles[`--yh-font-weight-${key}`] = value;
    });
    Object.entries(designTokens.shadow).forEach(([key, value]) => {
      styles[`--yh-shadow-${key}`] = value;
    });
    Object.entries(designTokens.duration).forEach(([key, value]) => {
      styles[`--yh-duration-${key}`] = value;
    });
    Object.entries(designTokens.timing).forEach(([key, value]) => {
      styles[`--yh-timing-${key}`] = value;
    });
    Object.entries(designTokens.scrollbar).forEach(([key, value]) => {
      const kebabKey = key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
      styles[`--yh-scrollbar-${kebabKey}`] = value;
    });
    Object.entries(designTokens.mask).forEach(([key, value]) => {
      const name = key === "DEFAULT" ? "--yh-mask" : `--yh-mask-${key}`;
      styles[name] = value;
    });
    Object.entries(this.componentOverrides).forEach(([component, overrides]) => {
      Object.entries(overrides).forEach(([name, value]) => {
        styles[`--yh-${component}-${name}`] = value;
      });
    });
    return styles;
  }
  /** 获取 CSS 变量值 */
  getCssVar(name) {
    return getCssVar(name, this.targetEl);
  }
  /** 设置 CSS 变量值 */
  setCssVar(name, value) {
    setCssVar(name, value, this.targetEl);
  }
  /** 应用所有设计令牌 */
  applyTokens() {
    const el = this.targetEl || (typeof document !== "undefined" ? document.documentElement : null);
    if (!el) return;
    const styles = this.getThemeStyles();
    Object.entries(styles).forEach(([name, value]) => {
      setCssVar(name, value, el);
    });
  }
  // ==================== 持久化 ====================
  /** 保存到存储 */
  saveToStorage() {
    if (typeof localStorage === "undefined") return;
    const snapshot = {
      preset: this.currentTheme,
      colors: this.customColors,
      dark: this.isDark,
      radius: "md",
      algorithm: this.algorithm,
      density: this.currentDensity,
      timestamp: Date.now(),
      version: "1.0.0"
    };
    try {
      localStorage.setItem(this.persistKey, JSON.stringify(snapshot));
    } catch (e) {
      console.warn("[YH-UI Theme] Failed to persist theme:", e);
    }
  }
  /** 从存储恢复 */
  restoreFromStorage() {
    if (typeof localStorage === "undefined") return false;
    try {
      const stored = localStorage.getItem(this.persistKey);
      if (!stored) return false;
      const snapshot = JSON.parse(stored);
      this.currentTheme = snapshot.preset;
      this.customColors = snapshot.colors || {};
      this.isDark = snapshot.dark;
      this.algorithm = snapshot.algorithm || "default";
      this.currentDensity = snapshot.density || "comfortable";
      this.state.theme = this.currentTheme;
      this.state.dark = this.isDark;
      this.state.colors = this.customColors;
      this.state.density = this.currentDensity;
      return true;
    } catch (e) {
      console.warn("[YH-UI Theme] Failed to restore theme:", e);
      return false;
    }
  }
  /** 导出主题配置 */
  exportTheme(options) {
    const snapshot = {
      preset: this.currentTheme,
      colors: this.customColors,
      dark: this.isDark,
      radius: "md",
      algorithm: this.algorithm,
      density: this.currentDensity,
      timestamp: Date.now(),
      version: "1.0.0",
      name: options == null ? void 0 : options.name,
      author: options == null ? void 0 : options.author
    };
    return JSON.stringify(snapshot, null, 2);
  }
  /** 导入主题配置 */
  importTheme(json) {
    try {
      const snapshot = JSON.parse(json);
      if (this.transitionEnabled) {
        enableThemeTransition(this.transitionConfig.duration, this.transitionConfig.timing);
      }
      this.setPreset(snapshot.preset);
      if (snapshot.colors && Object.keys(snapshot.colors).length > 0) {
        this.setColors(snapshot.colors);
      }
      this.setDarkMode(snapshot.dark);
      if (snapshot.algorithm) {
        this.setAlgorithm(snapshot.algorithm);
      }
      if (snapshot.density) {
        this.setDensity(snapshot.density);
      }
      return true;
    } catch (e) {
      console.error("[YH-UI Theme] Failed to import theme:", e);
      return false;
    }
  }
  /** 导出为纯 CSS */
  exportAsCss() {
    const styles = this.getThemeStyles();
    let css = ":root {\n";
    Object.entries(styles).forEach(([name, value]) => {
      css += `  ${name}: ${value};
`;
    });
    css += "}\n";
    return css;
  }
  /** 重置为默认主题 */
  reset() {
    if (typeof document === "undefined") return;
    this.currentTheme = "default";
    this.customColors = {};
    this.isDark = false;
    this.algorithm = "default";
    this.currentDensity = "comfortable";
    this.colorBlindMode = "none";
    this.componentOverrides = {};
    this.state.theme = "default";
    this.state.dark = false;
    this.state.colors = {};
    this.state.density = "comfortable";
    this.state.colorBlindMode = "none";
    document.documentElement.classList.remove("dark");
    const el = this.targetEl || document.documentElement;
    const colorTypes = ["primary", "success", "warning", "danger", "info"];
    const suffixes = [
      "",
      "light-1",
      "light-2",
      "light-3",
      "light-4",
      "light-5",
      "light-6",
      "light-7",
      "light-8",
      "light-9",
      "dark-2",
      "hover",
      "active",
      "disabled",
      "focus",
      "rgb"
    ];
    colorTypes.forEach((type) => {
      suffixes.forEach((suffix) => {
        const varName = suffix ? `--yh-color-${type}-${suffix}` : `--yh-color-${type}`;
        removeCssVar(varName, el);
      });
    });
    Object.keys(densityConfig.comfortable).forEach((key) => {
      removeCssVar(key, el);
    });
    this.saveToStorage();
  }
  // ==================== 密度/紧凑度控制 ====================
  /** 设置密度 */
  setDensity(density) {
    if (this.transitionEnabled) {
      enableThemeTransition(this.transitionConfig.duration, this.transitionConfig.timing);
    }
    this.currentDensity = density;
    this.state.density = density;
    const el = this.targetEl || (typeof document !== "undefined" ? document.documentElement : null);
    if (!el) return;
    const config = densityConfig[density];
    Object.entries(config).forEach(([name, value]) => {
      setCssVar(name, value, el);
    });
    this.saveToStorage();
  }
  /** 获取当前密度 */
  get density() {
    return this.currentDensity;
  }
  // ==================== 色盲模式 ====================
  /** 设置色盲友好模式 */
  setColorBlindMode(mode) {
    if (this.transitionEnabled) {
      enableThemeTransition(this.transitionConfig.duration, this.transitionConfig.timing);
    }
    this.colorBlindMode = mode;
    this.state.colorBlindMode = mode;
    if (mode === "none") {
      const currentColors = __spreadValues(__spreadValues({}, presetThemes[this.currentTheme]), this.customColors);
      this.applyColors(currentColors);
    } else {
      const palette = colorBlindPalettes[mode];
      this.applyColors(palette);
    }
    this.saveToStorage();
  }
  /** 获取当前色盲模式 */
  get colorBlind() {
    return this.colorBlindMode;
  }
  // ==================== 组件级主题覆盖 ====================
  /** 设置组件级主题覆盖 */
  setComponentTheme(componentName, overrides) {
    this.componentOverrides[componentName] = __spreadValues(__spreadValues({}, this.componentOverrides[componentName]), overrides);
    const el = this.targetEl || (typeof document !== "undefined" ? document.documentElement : null);
    if (!el) return;
    Object.entries(overrides).forEach(([name, value]) => {
      setCssVar(`--yh-${componentName}-${name}`, value, el);
    });
  }
  /** 获取组件主题覆盖 */
  getComponentTheme(componentName) {
    return this.componentOverrides[componentName] || {};
  }
  /** 清除组件级覆盖 */
  clearComponentTheme(componentName) {
    const overrides = this.componentOverrides[componentName];
    if (!overrides) return;
    const el = this.targetEl || (typeof document !== "undefined" ? document.documentElement : null);
    if (!el) return;
    Object.keys(overrides).forEach((name) => {
      removeCssVar(`--yh-${componentName}-${name}`, el);
    });
    delete this.componentOverrides[componentName];
  }
  // ==================== 主题切换动画 ====================
  /** 启用主题切换动画 */
  enableTransition(config) {
    var _a, _b;
    this.transitionEnabled = true;
    if (config) {
      this.transitionConfig = {
        duration: (_a = config.duration) != null ? _a : DEFAULT_TRANSITION_DURATION,
        timing: (_b = config.timing) != null ? _b : DEFAULT_TRANSITION_TIMING
      };
    }
  }
  /** 禁用主题切换动画 */
  disableTransition() {
    this.transitionEnabled = false;
  }
  // ==================== 主题继承与合并 ====================
  /** 创建继承主题 */
  createTheme(config) {
    let baseColors = {};
    if (config.extends) {
      if (typeof config.extends === "string") {
        baseColors = __spreadValues({}, presetThemes[config.extends]);
      } else {
        const parentSnapshot = this.createTheme(config.extends);
        baseColors = __spreadValues({}, parentSnapshot.colors);
      }
    }
    const mergedColors = __spreadValues(__spreadValues({}, baseColors), config.colors);
    return {
      preset: config.preset || "default",
      colors: mergedColors,
      dark: config.dark || false,
      radius: config.radius || "md",
      algorithm: config.algorithm || "default",
      density: config.density || "comfortable",
      timestamp: Date.now(),
      version: "1.0.0",
      name: config.name,
      author: config.author
    };
  }
  /** 应用完整主题配置 */
  applyFullConfig(config) {
    if (this.transitionEnabled || config.transition) {
      const transitionConfig = typeof config.transition === "object" ? config.transition : { duration: DEFAULT_TRANSITION_DURATION, timing: DEFAULT_TRANSITION_TIMING };
      enableThemeTransition(transitionConfig.duration, transitionConfig.timing);
    }
    this.pushHistory();
    const snapshot = this.createTheme(config);
    this.setPreset(snapshot.preset);
    if (snapshot.colors && Object.keys(snapshot.colors).length > 0) {
      this.setColors(snapshot.colors);
    }
    this.setDarkMode(snapshot.dark);
    if (snapshot.algorithm) {
      this.setAlgorithm(snapshot.algorithm);
    }
    if (config.density) {
      this.setDensity(config.density);
    }
    if (config.colorBlindMode) {
      this.setColorBlindMode(config.colorBlindMode);
    }
    if (config.components) {
      Object.entries(config.components).forEach(([componentName, overrides]) => {
        this.setComponentTheme(componentName, overrides);
      });
    }
  }
  // ==================== 主题历史 ====================
  /** 保存当前状态到历史 */
  pushHistory() {
    const snapshot = {
      preset: this.currentTheme,
      colors: __spreadValues({}, this.customColors),
      dark: this.isDark,
      radius: "md",
      algorithm: this.algorithm,
      density: this.currentDensity,
      timestamp: Date.now(),
      version: "1.0.0"
    };
    this.themeHistory.push(snapshot);
    if (this.themeHistory.length > this.maxHistoryLength) {
      this.themeHistory.shift();
    }
  }
  /** 撤销到上一个主题状态 */
  undo() {
    const previousSnapshot = this.themeHistory.pop();
    if (!previousSnapshot) return false;
    this.importTheme(JSON.stringify(previousSnapshot));
    return true;
  }
  /** 获取主题历史 */
  getHistory() {
    return [...this.themeHistory];
  }
  /** 清除主题历史 */
  clearHistory() {
    this.themeHistory = [];
  }
  // ==================== 智能色彩生成 ====================
  /** 从主色生成完整调色板 */
  generateFromPrimary(primaryColor) {
    return generatePaletteFromPrimary(primaryColor);
  }
  /** 应用从主色生成的调色板 */
  applyFromPrimary(primaryColor) {
    const palette = this.generateFromPrimary(primaryColor);
    this.setColors(palette);
  }
  /** 获取互补色 */
  getComplementary(hex) {
    return getComplementaryColor(hex);
  }
  /** 获取类似色 */
  getAnalogous(hex) {
    return getAnalogousColors(hex);
  }
  /** 获取三角色 */
  getTriadic(hex) {
    return getTriadicColors(hex);
  }
  // ==================== 响应式主题变量 ====================
  /** 设置响应式变量 (根据断点自动切换) */
  setResponsiveVar(name, values) {
    if (typeof document === "undefined") return;
    let style = document.getElementById("yh-responsive-vars");
    if (!style) {
      style = document.createElement("style");
      style.id = "yh-responsive-vars";
      document.head.appendChild(style);
    }
    let css = "";
    const orderedBreakpoints = ["xs", "sm", "md", "lg", "xl", "xxl"];
    orderedBreakpoints.forEach((bp) => {
      if (values[bp]) {
        if (bp === "xs") {
          css += `
            :root { ${name}: ${values[bp]}; }
          `;
        } else {
          css += `
            @media (min-width: ${breakpoints[bp]}px) {
              :root { ${name}: ${values[bp]}; }
            }
          `;
        }
      }
    });
    style.textContent += css;
  }
  /** 销毁 */
  destroy() {
    if (this.resizeHandler && typeof window !== "undefined") {
      window.removeEventListener("resize", this.resizeHandler);
    }
    this.disableSystemFollow();
    const style = document.getElementById("yh-responsive-vars");
    if (style) {
      style.remove();
    }
  }
}
let globalThemeManager = null;
function useTheme() {
  if (!globalThemeManager) {
    globalThemeManager = new ThemeManager();
  }
  return globalThemeManager;
}
function setThemeColor(color) {
  useTheme().setPrimaryColor(color);
}
function toggleDarkMode() {
  return useTheme().toggleDarkMode();
}
function setThemePreset(preset) {
  useTheme().setPreset(preset);
}
function initTheme(options) {
  globalThemeManager = new ThemeManager(options);
  return globalThemeManager;
}
function useThemeVars() {
  const theme = useTheme();
  return __spreadProps(__spreadValues({}, toRefs(theme.state)), {
    getCssVar: (name) => theme.getCssVar(name),
    setCssVar: (name, value) => theme.setCssVar(name, value)
  });
}
function checkContrast(foreground, background, level = "AA") {
  const ratio = getContrastRatio(foreground, background);
  return level === "AAA" ? ratio >= 7 : ratio >= 4.5;
}
function getTextColorForBackground(background) {
  const rgb = hexToRgb(background);
  if (!rgb) return "#000000";
  const luminance = getRelativeLuminance(rgb.r, rgb.g, rgb.b);
  return luminance > 0.5 ? "#000000" : "#ffffff";
}
const THEME_INJECTION_KEY = Symbol("theme");
const ThemePlugin = {
  install(app, options) {
    const themeManager = initTheme(options);
    app.config.globalProperties.$theme = themeManager;
    app.provide(THEME_INJECTION_KEY, themeManager);
    app.provide("theme", themeManager);
  }
};
var stdin_default = ThemePlugin;
export {
  THEME_INJECTION_KEY,
  ThemeManager,
  ThemePlugin,
  adjustLightness,
  adjustSaturation,
  breakpoints,
  checkContrast,
  colorBlindPalettes,
  stdin_default as default,
  densityConfig,
  ensureContrast,
  generatePaletteFromPrimary,
  getAnalogousColors,
  getComplementaryColor,
  getContrastRatio,
  getRelativeLuminance,
  getTextColorForBackground,
  getTriadicColors,
  hexToRgb,
  hslToRgb,
  initTheme,
  mixColor,
  presetThemes,
  rgbToHex,
  rgbToHsl,
  setThemeColor,
  setThemePreset,
  toggleDarkMode,
  useTheme,
  useThemeVars
};
