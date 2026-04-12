// public/codesandbox-runtime/components/config-provider/src/config-provider.js
import { defineComponent, provide as provide2, renderSlot, watch as watch4, computed as computed11, ref as ref12, h, onMounted as onMounted3 } from "vue";

// public/codesandbox-runtime/theme/tokens/index.js
var colorTokens = {
  primary: {
    DEFAULT: "#409eff",
    light: {
      1: "#53a8ff",
      2: "#66b1ff",
      3: "#79bbff",
      4: "#8cc5ff",
      5: "#a0cfff",
      6: "#b3d8ff",
      7: "#c6e2ff",
      8: "#d9ecff",
      9: "#ecf5ff"
    },
    dark: {
      2: "#337ecc"
    }
  },
  success: {
    DEFAULT: "#67c23a",
    light: {
      3: "#95d475",
      5: "#b3e19d",
      7: "#d1edc4",
      9: "#f0f9eb"
    },
    dark: {
      2: "#529b2e"
    }
  },
  warning: {
    DEFAULT: "#e6a23c",
    light: {
      3: "#eebe77",
      5: "#f3d19e",
      7: "#f8e3c5",
      9: "#fdf6ec"
    },
    dark: {
      2: "#b88230"
    }
  },
  danger: {
    DEFAULT: "#f56c6c",
    light: {
      3: "#f89898",
      5: "#fab6b6",
      7: "#fcd3d3",
      9: "#fef0f0"
    },
    dark: {
      2: "#c45656"
    }
  },
  info: {
    DEFAULT: "#909399",
    light: {
      3: "#b1b3b8",
      5: "#c8c9cc",
      7: "#dedfe0",
      9: "#f4f4f5"
    },
    dark: {
      2: "#73767a"
    }
  }
};
var textColorTokens = {
  primary: "#303133",
  regular: "#606266",
  secondary: "#909399",
  placeholder: "#a8abb2",
  disabled: "#c0c4cc"
};
var borderColorTokens = {
  DEFAULT: "#dcdfe6",
  light: "#e4e7ed",
  lighter: "#ebeef5",
  extraLight: "#f2f6fc",
  dark: "#d4d7de",
  darker: "#cdd0d6"
};
var fillColorTokens = {
  DEFAULT: "#f0f2f5",
  light: "#f5f7fa",
  lighter: "#fafafa",
  extraLight: "#fafcff",
  dark: "#ebedf0",
  darker: "#e6e8eb",
  blank: "#ffffff"
};
var bgColorTokens = {
  DEFAULT: "#ffffff",
  page: "#f2f3f5",
  overlay: "#ffffff"
};
var spacingTokens = {
  none: "0",
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  xxl: "48px"
};
var radiusTokens = {
  none: "0",
  sm: "2px",
  base: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  round: "20px",
  circle: "50%"
};
var fontSizeTokens = {
  xs: "12px",
  sm: "13px",
  base: "14px",
  md: "16px",
  lg: "18px",
  xl: "20px",
  xxl: "24px"
};
var lineHeightTokens = {
  none: "1",
  tight: "1.25",
  snug: "1.375",
  normal: "1.5",
  relaxed: "1.625",
  loose: "2"
};
var fontWeightTokens = {
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700"
};
var shadowTokens = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
};
var durationTokens = {
  fast: "150ms",
  base: "200ms",
  slow: "300ms"
};
var timingTokens = {
  ease: "ease",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  linear: "linear"
};
var zIndexTokens = {
  normal: "1",
  top: "1000",
  popper: "2000",
  overlay: "2001",
  modal: "2002",
  popover: "2003",
  tooltip: "2004",
  loading: "2005"
};
var breakpointTokens = {
  xs: "0",
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
  xxl: "1400px"
};
var fontFamilyTokens = {
  base: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
  monospace: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
  serif: "Georgia, Cambria, 'Times New Roman', Times, serif"
};
var accessibilityTokens = {
  focusRingColor: "#409eff",
  focusRingWidth: "2px",
  focusRingOffset: "2px",
  focusRingOpacity: "0.2"
};
var maskTokens = {
  DEFAULT: "rgba(0, 0, 0, 0.5)",
  light: "rgba(0, 0, 0, 0.3)",
  extraLight: "rgba(0, 0, 0, 0.1)"
};
var scrollbarTokens = {
  width: "6px",
  thumbColor: "#c0c4cc",
  thumbHoverColor: "#909399",
  trackColor: "transparent",
  thumbRadius: "3px"
};
var componentSizeTokens = {
  large: {
    height: "40px",
    fontSize: "14px",
    paddingX: "20px"
  },
  default: {
    height: "32px",
    fontSize: "14px",
    paddingX: "16px"
  },
  small: {
    height: "24px",
    fontSize: "12px",
    paddingX: "12px"
  }
};
var designTokens = {
  colors: colorTokens,
  textColors: textColorTokens,
  borderColors: borderColorTokens,
  fillColors: fillColorTokens,
  bgColors: bgColorTokens,
  spacing: spacingTokens,
  radius: radiusTokens,
  fontSize: fontSizeTokens,
  lineHeight: lineHeightTokens,
  fontWeight: fontWeightTokens,
  fontFamily: fontFamilyTokens,
  shadow: shadowTokens,
  duration: durationTokens,
  timing: timingTokens,
  zIndex: zIndexTokens,
  componentSize: componentSizeTokens,
  breakpoints: breakpointTokens,
  accessibility: accessibilityTokens,
  mask: maskTokens,
  scrollbar: scrollbarTokens
};

// public/codesandbox-runtime/theme/theme.js
import { reactive, toRefs } from "vue";
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
var presetThemes = {
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
  let h2 = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h2 = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h2 = ((b - r) / d + 2) / 6;
        break;
      case b:
        h2 = ((r - g) / d + 4) / 6;
        break;
    }
  }
  return { h: h2 * 360, s: s * 100, l: l * 100 };
}
function hslToRgb(h2, s, l) {
  h2 /= 360;
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
    r = hue2rgb(p, q, h2 + 1 / 3);
    g = hue2rgb(p, q, h2);
    b = hue2rgb(p, q, h2 - 1 / 3);
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
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
var breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400
};
var densityConfig = {
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
var colorBlindPalettes = {
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
var THEME_TRANSITION_CLASS = "yh-theme-transitioning";
var DEFAULT_TRANSITION_DURATION = 300;
var DEFAULT_TRANSITION_TIMING = "cubic-bezier(0.4, 0, 0.2, 1)";
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
var ThemeManager = class {
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
    var _a2, _b;
    this.transitionEnabled = true;
    if (config) {
      this.transitionConfig = {
        duration: (_a2 = config.duration) != null ? _a2 : DEFAULT_TRANSITION_DURATION,
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
};
var globalThemeManager = null;
function useTheme() {
  if (!globalThemeManager) {
    globalThemeManager = new ThemeManager();
  }
  return globalThemeManager;
}
var THEME_INJECTION_KEY = Symbol("theme");

// public/codesandbox-runtime/theme/component-theme.js
import { inject, provide, computed, unref } from "vue";
var COMPONENT_THEME_KEY = Symbol("component-theme");

// public/codesandbox-runtime/locale/lang/zh-cn.js
var zhCn = {
  name: "zh-cn",
  yh: {
    // 通用
    common: {
      yes: "\u662F",
      no: "\u5426",
      confirm: "\u786E\u8BA4",
      cancel: "\u53D6\u6D88",
      loading: "\u52A0\u8F7D\u4E2D",
      close: "\u5173\u95ED",
      clear: "\u6E05\u7A7A",
      reset: "\u91CD\u7F6E",
      save: "\u4FDD\u5B58",
      delete: "\u5220\u9664",
      edit: "\u7F16\u8F91",
      add: "\u65B0\u589E",
      search: "\u641C\u7D22",
      refresh: "\u5237\u65B0",
      expand: "\u5C55\u5F00",
      collapse: "\u6536\u8D77",
      more: "\u66F4\u591A",
      noData: "\u6682\u65E0\u6570\u636E",
      noMatch: "\u65E0\u5339\u914D\u6570\u636E",
      selectAll: "\u5168\u9009",
      unselectAll: "\u53D6\u6D88\u5168\u9009"
    },
    // 颜色选择器
    colorpicker: {
      confirm: "\u786E\u5B9A",
      clear: "\u6E05\u7A7A",
      eyeDropper: "\u5438\u8272\u5668",
      suggestionDark: "\u767D\u8272\u6587\u5B57\u6700\u4F73",
      suggestionLight: "\u9ED1\u8272\u6587\u5B57\u6700\u4F73",
      recentColors: "\u6700\u8FD1\u4F7F\u7528",
      presetColors: "\u9884\u8BBE\u989C\u8272"
    },
    // 日期选择器
    datepicker: {
      now: "\u6B64\u523B",
      today: "\u4ECA\u5929",
      cancel: "\u53D6\u6D88",
      clear: "\u6E05\u7A7A",
      confirm: "\u786E\u5B9A",
      selectDate: "\u9009\u62E9\u65E5\u671F",
      selectTime: "\u9009\u62E9\u65F6\u95F4",
      startDate: "\u5F00\u59CB\u65E5\u671F",
      startTime: "\u5F00\u59CB\u65F6\u95F4",
      endDate: "\u7ED3\u675F\u65E5\u671F",
      endTime: "\u7ED3\u675F\u65F6\u95F4",
      year: "\u5E74",
      month: "\u6708",
      day: "\u65E5",
      week: "\u5468",
      monthBeforeYear: false,
      prevYear: "\u4E0A\u4E00\u5E74",
      nextYear: "\u4E0B\u4E00\u5E74",
      prevMonth: "\u4E0A\u4E2A\u6708",
      nextMonth: "\u4E0B\u4E2A\u6708",
      weeks: {
        sun: "\u65E5",
        mon: "\u4E00",
        tue: "\u4E8C",
        wed: "\u4E09",
        thu: "\u56DB",
        fri: "\u4E94",
        sat: "\u516D"
      },
      months: {
        jan: "\u4E00\u6708",
        feb: "\u4E8C\u6708",
        mar: "\u4E09\u6708",
        apr: "\u56DB\u6708",
        may: "\u4E94\u6708",
        jun: "\u516D\u6708",
        jul: "\u4E03\u6708",
        aug: "\u516B\u6708",
        sep: "\u4E5D\u6708",
        oct: "\u5341\u6708",
        nov: "\u5341\u4E00\u6708",
        dec: "\u5341\u4E8C\u6708"
      },
      quarters: {
        q1: "\u7B2C\u4E00\u5B63\u5EA6",
        q2: "\u7B2C\u4E8C\u5B63\u5EA6",
        q3: "\u7B2C\u4E09\u5B63\u5EA6",
        q4: "\u7B2C\u56DB\u5B63\u5EA6"
      }
    },
    // 时间选择器
    timepicker: {
      confirm: "\u786E\u5B9A",
      cancel: "\u53D6\u6D88",
      now: "\u6B64\u523B",
      placeholder: "\u9009\u62E9\u65F6\u95F4",
      startPlaceholder: "\u5F00\u59CB\u65F6\u95F4",
      endPlaceholder: "\u7ED3\u675F\u65F6\u95F4",
      selectTime: "\u9009\u62E9\u65F6\u95F4"
    },
    // 时间选择
    timeselect: {
      placeholder: "\u9009\u62E9\u65F6\u95F4"
    },
    // 树
    tree: {
      emptyText: "\u6682\u65E0\u6570\u636E",
      loading: "\u52A0\u8F7D\u4E2D...",
      checkAll: "\u5168\u9009",
      uncheckAll: "\u53D6\u6D88\u5168\u9009",
      expandAll: "\u5C55\u5F00\u5168\u90E8",
      collapseAll: "\u6536\u8D77\u5168\u90E8"
    },
    // 树选择
    treeselect: {
      placeholder: "\u8BF7\u9009\u62E9",
      emptyText: "\u6682\u65E0\u6570\u636E",
      loading: "\u52A0\u8F7D\u4E2D...",
      noMatch: "\u65E0\u5339\u914D\u6570\u636E"
    },
    // 日历
    calendar: {
      prevMonth: "\u4E0A\u4E2A\u6708",
      nextMonth: "\u4E0B\u4E2A\u6708",
      prevYear: "\u4E0A\u4E00\u5E74",
      nextYear: "\u4E0B\u4E00\u5E74",
      today: "\u4ECA\u5929",
      week: "\u5468",
      holiday: "\u4F11",
      workday: "\u73ED",
      monthHeaderFormat: "YYYY\u5E74M\u6708",
      weeks: {
        sun: "\u65E5",
        mon: "\u4E00",
        tue: "\u4E8C",
        wed: "\u4E09",
        thu: "\u56DB",
        fri: "\u4E94",
        sat: "\u516D"
      }
    },
    // 自动完成
    autocomplete: {
      loading: "\u52A0\u8F7D\u4E2D...",
      placeholder: "\u8BF7\u8F93\u5165",
      noData: "\u6682\u65E0\u6570\u636E",
      noMatch: "\u65E0\u5339\u914D\u6570\u636E"
    },
    // 倒计时
    countdown: {
      days: "\u5929",
      hours: "\u65F6",
      minutes: "\u5206",
      seconds: "\u79D2",
      milliseconds: "\u6BEB\u79D2",
      finished: "\u5DF2\u7ED3\u675F"
    },
    // 级联选择
    cascader: {
      noMatch: "\u65E0\u5339\u914D\u6570\u636E",
      placeholder: "\u8BF7\u9009\u62E9",
      loading: "\u52A0\u8F7D\u4E2D...",
      noData: "\u6682\u65E0\u6570\u636E"
    },
    // 穿梭框
    transfer: {
      noMatch: "\u65E0\u5339\u914D\u6570\u636E",
      noData: "\u65E0\u6570\u636E",
      titles: ["\u5217\u8868 1", "\u5217\u8868 2"],
      filterPlaceholder: "\u8BF7\u8F93\u5165\u641C\u7D22\u5185\u5BB9",
      noCheckedFormat: "\u5171 {total} \u9879",
      hasCheckedFormat: "\u5DF2\u9009 {checked}/{total} \u9879",
      searchPlaceholder: "\u8BF7\u8F93\u5165\u5173\u952E\u8BCD"
    },
    // 表格
    table: {
      emptyText: "\u6682\u65E0\u6570\u636E",
      confirmFilter: "\u7B5B\u9009",
      resetFilter: "\u91CD\u7F6E",
      clearFilter: "\u5168\u90E8",
      sumText: "\u5408\u8BA1",
      loading: "\u6B63\u5728\u52A0\u8F7D...",
      index: "\u5E8F\u53F7",
      print: "\u6253 \u5370",
      cancel: "\u53D6 \u6D88",
      preview: "\u6253\u5370\u9884\u89C8",
      printTime: "\u6253\u5370\u65F6\u95F4",
      total: "\u5171 {total} \u6761",
      page: "\u7B2C {page} \u9875",
      yes: "\u662F",
      no: "\u5426",
      // 工具栏
      toolbar: {
        refresh: "\u5237\u65B0",
        density: "\u5BC6\u5EA6",
        densityDefault: "\u9ED8\u8BA4",
        densityLarge: "\u5BBD\u677E",
        densitySmall: "\u7D27\u51D1",
        columnSetting: "\u5217\u8BBE\u7F6E",
        fullscreen: "\u5168\u5C4F",
        exitFullscreen: "\u9000\u51FA\u5168\u5C4F",
        export: "\u5BFC\u51FA",
        import: "\u5BFC\u5165",
        search: "\u641C\u7D22",
        searchPlaceholder: "\u8BF7\u8F93\u5165\u5173\u952E\u8BCD\u641C\u7D22"
      },
      // 筛选
      filter: {
        selectAll: "\u5168\u9009",
        selectInvert: "\u53CD\u9009",
        empty: "\u4E3A\u7A7A",
        notEmpty: "\u4E0D\u4E3A\u7A7A",
        contains: "\u5305\u542B",
        notContains: "\u4E0D\u5305\u542B",
        equals: "\u7B49\u4E8E",
        notEquals: "\u4E0D\u7B49\u4E8E",
        startsWith: "\u5F00\u5934\u662F",
        endsWith: "\u7ED3\u5C3E\u662F",
        greaterThan: "\u5927\u4E8E",
        lessThan: "\u5C0F\u4E8E",
        between: "\u4ECB\u4E8E"
      },
      // 排序
      sort: {
        asc: "\u5347\u5E8F",
        desc: "\u964D\u5E8F",
        clear: "\u53D6\u6D88\u6392\u5E8F"
      },
      // 导出
      export: {
        title: "\u5BFC\u51FA\u6570\u636E",
        filename: "\u6587\u4EF6\u540D",
        type: "\u6587\u4EF6\u7C7B\u578B",
        scope: "\u5BFC\u51FA\u8303\u56F4",
        scopeAll: "\u5168\u90E8\u6570\u636E",
        scopeSelected: "\u9009\u4E2D\u6570\u636E",
        scopeCurrentPage: "\u5F53\u524D\u9875\u6570\u636E",
        includeHeader: "\u5305\u542B\u8868\u5934",
        exporting: "\u6B63\u5728\u5BFC\u51FA...",
        success: "\u5BFC\u51FA\u6210\u529F",
        error: "\u5BFC\u51FA\u5931\u8D25"
      },
      // 导入
      import: {
        title: "\u5BFC\u5165\u6570\u636E",
        selectFile: "\u9009\u62E9\u6587\u4EF6",
        dragTip: "\u70B9\u51FB\u6216\u62D6\u62FD\u6587\u4EF6\u5230\u6B64\u5904\u4E0A\u4F20",
        importing: "\u6B63\u5728\u5BFC\u5165...",
        success: "\u5BFC\u5165\u6210\u529F",
        error: "\u5BFC\u5165\u5931\u8D25",
        preview: "\u6570\u636E\u9884\u89C8",
        confirm: "\u786E\u8BA4\u5BFC\u5165"
      },
      // 打印
      printConfig: {
        title: "\u6253\u5370\u8BBE\u7F6E",
        pageTitle: "\u9875\u9762\u6807\u9898",
        pageHeader: "\u9875\u7709",
        pageFooter: "\u9875\u811A",
        printAll: "\u6253\u5370\u5168\u90E8",
        printSelected: "\u6253\u5370\u9009\u4E2D",
        printCurrentPage: "\u6253\u5370\u5F53\u524D\u9875",
        landscape: "\u6A2A\u5411",
        portrait: "\u7EB5\u5411",
        printing: "\u6B63\u5728\u6253\u5370..."
      },
      // 列设置
      columnSetting: {
        title: "\u5217\u8BBE\u7F6E",
        showAll: "\u663E\u793A\u5168\u90E8",
        hideAll: "\u9690\u85CF\u5168\u90E8",
        reset: "\u91CD\u7F6E",
        fixedLeft: "\u56FA\u5B9A\u5728\u5DE6\u4FA7",
        fixedRight: "\u56FA\u5B9A\u5728\u53F3\u4FA7",
        unfixed: "\u53D6\u6D88\u56FA\u5B9A"
      },
      // 右键菜单
      contextMenu: {
        copy: "\u590D\u5236",
        copyRow: "\u590D\u5236\u884C",
        copyCell: "\u590D\u5236\u5355\u5143\u683C",
        paste: "\u7C98\u8D34",
        insertRowAbove: "\u5728\u4E0A\u65B9\u63D2\u5165\u884C",
        insertRowBelow: "\u5728\u4E0B\u65B9\u63D2\u5165\u884C",
        deleteRow: "\u5220\u9664\u884C",
        deleteSelectedRows: "\u5220\u9664\u9009\u4E2D\u884C",
        exportSelected: "\u5BFC\u51FA\u9009\u4E2D\u6570\u636E"
      },
      // 选择
      selection: {
        selectAll: "\u5168\u9009",
        selectInvert: "\u53CD\u9009",
        selectNone: "\u53D6\u6D88\u9009\u62E9",
        selected: "\u5DF2\u9009\u62E9 {count} \u9879"
      },
      // 展开
      expand: {
        expandAll: "\u5C55\u5F00\u5168\u90E8",
        collapseAll: "\u6536\u8D77\u5168\u90E8"
      },
      // 树形
      tree: {
        expandAll: "\u5C55\u5F00\u5168\u90E8",
        collapseAll: "\u6536\u8D77\u5168\u90E8",
        expandLevel: "\u5C55\u5F00\u5230\u7B2C {level} \u5C42"
      },
      // 拖拽
      drag: {
        dragTip: "\u62D6\u62FD\u4EE5\u8C03\u6574\u987A\u5E8F",
        dropTip: "\u91CA\u653E\u4EE5\u653E\u7F6E"
      }
    },
    // 消息框
    messagebox: {
      title: "\u63D0\u793A",
      confirm: "\u786E\u5B9A",
      cancel: "\u53D6\u6D88",
      close: "\u5173\u95ED",
      error: "\u8F93\u5165\u7684\u6570\u636E\u4E0D\u5408\u6CD5!",
      alert: "\u8B66\u544A",
      prompt: "\u8BF7\u8F93\u5165",
      inputPlaceholder: "\u8BF7\u8F93\u5165\u5185\u5BB9"
    },
    // 上传
    upload: {
      deleteTip: "\u6309 delete \u952E\u53EF\u5220\u9664",
      delete: "\u5220\u9664",
      preview: "\u67E5\u770B\u56FE\u7247",
      continue: "\u7EE7\u7EED\u4E0A\u4F20",
      upload: "\u70B9\u51FB\u4E0A\u4F20",
      tip: "\u70B9\u51FB\u6216\u62D6\u62FD\u6587\u4EF6\u5230\u6B64\u5904<em>\u4E0A\u4F20</em>",
      dragTip: "\u5C06\u6587\u4EF6\u62D6\u5230\u6B64\u5904\uFF0C\u6216\u70B9\u51FB\u4E0A\u4F20",
      uploading: "\u4E0A\u4F20\u4E2D...",
      success: "\u4E0A\u4F20\u6210\u529F",
      error: "\u4E0A\u4F20\u5931\u8D25",
      retry: "\u91CD\u65B0\u4E0A\u4F20",
      cancel: "\u53D6\u6D88\u4E0A\u4F20",
      fileTypeError: "\u6587\u4EF6\u7C7B\u578B\u4E0D\u652F\u6301",
      fileSizeError: "\u6587\u4EF6\u5927\u5C0F\u8D85\u51FA\u9650\u5236",
      fileCountError: "\u6587\u4EF6\u6570\u91CF\u8D85\u51FA\u9650\u5236"
    },
    // 表单
    form: {
      validationFailed: "\u6821\u9A8C\u5931\u8D25",
      required: "\u5FC5\u586B\u9879",
      pleaseInput: "\u8BF7\u8F93\u5165",
      pleaseSelect: "\u8BF7\u9009\u62E9"
    },
    // 按钮
    button: {
      loading: "\u52A0\u8F7D\u4E2D..."
    },
    // 输入框
    input: {
      placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9",
      clear: "\u6E05\u7A7A",
      showPassword: "\u663E\u793A\u5BC6\u7801",
      hidePassword: "\u9690\u85CF\u5BC6\u7801",
      copy: "\u590D\u5236",
      copied: "\u5DF2\u590D\u5236"
    },
    // 数字输入框
    inputnumber: {
      placeholder: "\u8BF7\u8F93\u5165\u6570\u5B57",
      increase: "\u589E\u52A0",
      decrease: "\u51CF\u5C11"
    },
    // 标签输入
    inputtag: {
      placeholder: "\u8BF7\u8F93\u5165",
      add: "\u6DFB\u52A0",
      remove: "\u79FB\u9664"
    },
    // 面包屑
    breadcrumb: {
      label: "\u9762\u5305\u5C51",
      more: "\u66F4\u591A"
    },
    // 返回顶部
    backtop: {
      text: "\u56DE\u5230\u9876\u90E8"
    },
    // 选择器
    select: {
      placeholder: "\u8BF7\u9009\u62E9",
      noData: "\u6682\u65E0\u6570\u636E",
      loading: "\u52A0\u8F7D\u4E2D...",
      noMatch: "\u65E0\u5339\u914D\u6570\u636E",
      selectAll: "\u5168\u9009",
      clearAll: "\u6E05\u7A7A"
    },
    // 分页
    pagination: {
      goto: "\u524D\u5F80",
      page: "\u9875",
      total: "\u5171 {total} \u6761",
      pageSize: "\u6761/\u9875",
      prev: "\u4E0A\u4E00\u9875",
      next: "\u4E0B\u4E00\u9875",
      first: "\u9996\u9875",
      last: "\u672B\u9875",
      pageClassifier: "\u9875"
    },
    // 气泡确认
    popconfirm: {
      confirm: "\u786E\u5B9A",
      cancel: "\u53D6\u6D88",
      dontAskAgain: "\u4E0D\u518D\u63D0\u793A"
    },
    // 对话框
    dialog: {
      confirm: "\u786E\u5B9A",
      cancel: "\u53D6\u6D88",
      close: "\u5173\u95ED",
      maximize: "\u6700\u5927\u5316",
      restore: "\u8FD8\u539F"
    },
    // 抽屉
    drawer: {
      close: "\u5173\u95ED",
      confirm: "\u786E\u5B9A",
      cancel: "\u53D6\u6D88"
    },
    // 下拉菜单
    dropdown: {
      loading: "\u52A0\u8F7D\u4E2D..."
    },
    // 图片
    image: {
      error: "\u52A0\u8F7D\u5931\u8D25",
      loading: "\u52A0\u8F7D\u4E2D...",
      preview: "\u9884\u89C8",
      zoomIn: "\u653E\u5927",
      zoomOut: "\u7F29\u5C0F",
      rotateLeft: "\u5411\u5DE6\u65CB\u8F6C",
      rotateRight: "\u5411\u53F3\u65CB\u8F6C",
      originalSize: "\u539F\u59CB\u5927\u5C0F",
      fullscreen: "\u5168\u5C4F"
    },
    // 图片预览
    imageviewer: {
      close: "\u5173\u95ED",
      prev: "\u4E0A\u4E00\u5F20",
      next: "\u4E0B\u4E00\u5F20",
      zoomIn: "\u653E\u5927",
      zoomOut: "\u7F29\u5C0F",
      rotateLeft: "\u5411\u5DE6\u65CB\u8F6C",
      rotateRight: "\u5411\u53F3\u65CB\u8F6C",
      reset: "\u91CD\u7F6E",
      fullscreen: "\u5168\u5C4F",
      exitFullscreen: "\u9000\u51FA\u5168\u5C4F"
    },
    // 无限滚动
    infinitescroll: {
      loading: "\u52A0\u8F7D\u4E2D...",
      finished: "\u6CA1\u6709\u66F4\u591A\u4E86",
      error: "\u52A0\u8F7D\u5931\u8D25\uFF0C\u70B9\u51FB\u91CD\u8BD5",
      retry: "\u70B9\u51FB\u91CD\u8BD5"
    },
    // 消息
    message: {
      close: "\u5173\u95ED"
    },
    // 通知
    notification: {
      close: "\u5173\u95ED"
    },
    // 加载
    loading: {
      text: "\u52A0\u8F7D\u4E2D..."
    },
    // 加载中
    spin: {
      text: "\u52A0\u8F7D\u4E2D..."
    },
    // 评分
    rate: {
      texts: ["\u6781\u5DEE", "\u5931\u671B", "\u4E00\u822C", "\u6EE1\u610F", "\u60CA\u559C"]
    },
    // 警告
    alert: {
      close: "\u5173\u95ED"
    },
    // 标签
    tag: {
      close: "\u5173\u95ED"
    },
    // 标签页
    tabs: {
      close: "\u5173\u95ED",
      add: "\u65B0\u589E",
      more: "\u66F4\u591A"
    },
    // 步骤条
    steps: {
      finish: "\u5DF2\u5B8C\u6210",
      process: "\u8FDB\u884C\u4E2D",
      wait: "\u7B49\u5F85\u4E2D",
      error: "\u9519\u8BEF"
    },
    // 进度条
    progress: {
      success: "\u6210\u529F",
      exception: "\u5F02\u5E38",
      warning: "\u8B66\u544A"
    },
    // 骨架屏
    skeleton: {
      loading: "\u52A0\u8F7D\u4E2D..."
    },
    // 空状态
    empty: {
      description: "\u6682\u65E0\u6570\u636E",
      noData: "\u6682\u65E0\u6570\u636E",
      noResult: "\u6682\u65E0\u7ED3\u679C",
      networkError: "\u7F51\u7EDC\u9519\u8BEF",
      serverError: "\u670D\u52A1\u5668\u9519\u8BEF"
    },
    // 结果
    result: {
      success: "\u64CD\u4F5C\u6210\u529F",
      error: "\u64CD\u4F5C\u5931\u8D25",
      warning: "\u8B66\u544A",
      info: "\u63D0\u793A",
      backHome: "\u8FD4\u56DE\u9996\u9875"
    },
    // 瀑布流
    waterfall: {
      loading: "\u52A0\u8F7D\u4E2D...",
      noMore: "\u6CA1\u6709\u66F4\u591A\u4E86",
      empty: "\u6682\u65E0\u6570\u636E"
    },
    // 描述列表
    descriptions: {
      colon: "\uFF1A"
    },
    // 滑块
    slider: {
      tipFormatter: "{value}"
    },
    // 开关
    switch: {
      on: "\u5F00",
      off: "\u5173"
    },
    // 复选框
    checkbox: {
      selectAll: "\u5168\u9009"
    },
    // 单选框
    radio: {},
    // 菜单
    menu: {
      collapse: "\u6536\u8D77\u83DC\u5355",
      expand: "\u5C55\u5F00\u83DC\u5355"
    },
    // 卡片
    card: {
      collapse: "\u6536\u8D77",
      expand: "\u5C55\u5F00"
    },
    // 折叠面板
    collapse: {
      expand: "\u5C55\u5F00",
      collapse: "\u6536\u8D77"
    },
    // 工具提示
    tooltip: {},
    // 气泡卡片
    popover: {},
    // 徽标
    badge: {},
    // 头像
    avatar: {
      error: "\u52A0\u8F7D\u5931\u8D25"
    },
    // 水印
    watermark: {},
    // 分割线
    divider: {},
    // 走马灯
    carousel: {
      prev: "\u4E0A\u4E00\u5F20",
      next: "\u4E0B\u4E00\u5F20"
    },
    // 跑马灯
    marquee: {},
    // 固钉
    affix: {},
    // 流程图
    flow: {
      zoomIn: "\u653E\u5927\u753B\u5E03",
      zoomOut: "\u7F29\u5C0F\u753B\u5E03",
      fitView: "\u81EA\u9002\u5E94\u89C6\u56FE",
      lock: "\u9501\u5B9A/\u89E3\u9501\u753B\u5E03"
    },
    // 锚点
    anchor: {},
    // 提及
    mention: {
      placeholder: "\u8BF7\u8F93\u5165",
      loading: "\u52A0\u8F7D\u4E2D...",
      noData: "\u6682\u65E0\u6570\u636E"
    },
    // SKU 选择器
    skuselector: {
      placeholder: "\u8BF7\u9009\u62E9\u89C4\u683C",
      emptyText: "\u6682\u65E0\u89C4\u683C",
      stock: "\u5E93\u5B58",
      price: "\u4EF7\u683C",
      selected: "\u5DF2\u9009",
      outOfStock: "\u6682\u65F6\u65E0\u8D27"
    },
    // 商品卡片
    productcard: {
      viewDetails: "\u67E5\u770B\u8BE6\u60C5",
      buyNow: "\u7ACB\u5373\u8D2D\u4E70",
      addToCart: "\u52A0\u5165\u8D2D\u7269\u8F66",
      sold: "\u5DF2\u552E"
    },
    // 价格
    price: {
      original: "\u539F\u4EF7"
    },
    // 优惠券
    couponcard: {
      available: "\u70B9\u51FB\u9886\u53D6",
      used: "\u5DF2\u4F7F\u7528",
      expired: "\u5DF2\u8FC7\u671F",
      received: "\u5DF2\u9886\u53D6",
      limit: "\u6EE1 {threshold} \u5143\u53EF\u7528",
      noThreshold: "\u65E0\u95E8\u69DB",
      validPeriod: "\u6709\u6548\u671F",
      ruleTitle: "\u4F7F\u7528\u8BF4\u660E\u53CA\u89C4\u5219"
    },
    // 幸运抽奖
    luckydraw: {
      start: "\u5F00\u59CB\u62BD\u5956",
      drawing: "\u62BD\u5956\u4E2D...",
      end: "\u4E2D\u5956\u4E86",
      retry: "\u518D\u8BD5\u4E00\u6B21"
    },
    // 筛选排序栏
    filterbar: {
      all: "\u5168\u90E8",
      sort: "\u6392\u5E8F",
      filter: "\u7B5B\u9009",
      reset: "\u91CD\u7F6E",
      confirm: "\u786E\u5B9A",
      noOptions: "\u6682\u65E0\u7B5B\u9009\u9879",
      asc: "\u5347\u5E8F",
      desc: "\u964D\u5E8F",
      selected: "\u5DF2\u9009"
    },
    // 结算栏
    submitbar: {
      total: "\u5C0F\u8BA1\uFF1A",
      selected: "\u5DF2\u9009 {count} \u4EF6",
      submit: "\u53BB\u7ED3\u7B97",
      allSelect: "\u5168\u9009"
    },
    // 品类导航
    categorynav: {
      all: "\u5168\u90E8",
      noData: "\u6682\u65E0\u6570\u636E",
      loading: "\u52A0\u8F7D\u4E2D..."
    },
    // 智能地址
    smartaddress: {
      placeholder: "\u8BF7\u7C98\u8D34\u6536\u8D27\u5730\u5740\uFF0C\u81EA\u52A8\u8BC6\u522B\u59D3\u540D\u3001\u624B\u673A\u53F7\u3001\u5730\u5740",
      parse: "\u667A\u80FD\u8BC6\u522B",
      province: "\u7701/\u5E02/\u533A",
      city: "\u5E02",
      district: "\u533A/\u53BF",
      street: "\u8857\u9053/\u9547",
      detail: "\u8BE6\u7EC6\u5730\u5740",
      phone: "\u624B\u673A\u53F7",
      name: "\u6536\u8D27\u4EBA",
      parseSuccess: "\u5730\u5740\u8BC6\u522B\u6210\u529F",
      parseFailed: "\u672A\u80FD\u8BC6\u522B\uFF0C\u8BF7\u624B\u52A8\u586B\u5199",
      required: "\u8BF7\u586B\u5199\u5B8C\u6574\u5730\u5740",
      provinceKeywords: ["\u7701", "\u81EA\u6CBB\u533A", "\u7279\u522B\u884C\u653F\u533A"],
      cityKeywords: ["\u5E02", "\u5DDE", "\u76DF"],
      districtKeywords: ["\u533A", "\u53BF", "\u65D7", "\u9547", "\u5E02"],
      streetKeywords: ["\u8857\u9053", "\u9547", "\u4E61", "\u6751"]
    },
    // AI 组件
    ai: {
      bubble: {
        citations: "\u53C2\u8003\u5F15\u7528"
      },
      mention: {
        placeholder: "@ \u547C\u53EB Agent\u3001\u6587\u6863\u6216\u8868\u683C...",
        agent: "\u667A\u80FD\u4F53",
        document: "\u6587\u6863",
        table: "\u8868\u683C",
        knowledge: "\u77E5\u8BC6\u5E93"
      },
      codeBlock: {
        copyCode: "\u590D\u5236\u4EE3\u7801",
        copied: "\u5DF2\u590D\u5236\uFF01",
        run: "\u8FD0\u884C\u4EE3\u7801",
        edit: "\u7F16\u8F91",
        save: "\u4FDD\u5B58",
        cancel: "\u53D6\u6D88"
      },
      codeRunner: {
        run: "\u8FD0\u884C",
        stop: "\u505C\u6B62",
        clear: "\u6E05\u7A7A",
        reset: "\u91CD\u7F6E",
        placeholder: "\u70B9\u51FB\u8FD0\u884C\u6309\u94AE\u6267\u884C\u4EE3\u7801..."
      },
      sender: {
        placeholder: "\u53D1\u9001\u6D88\u606F...",
        dragTip: "\u91CA\u653E\u9F20\u6807\u4EE5\u4E0A\u4F20\u6587\u4EF6"
      },
      thoughtChain: {
        thoughtProcess: "\u601D\u8003\u8FC7\u7A0B",
        thinking: "\u601D\u8003\u4E2D...",
        defaultTitle: "\u65B0\u6B65\u9AA4",
        addNode: "\u6DFB\u52A0\u8282\u70B9"
      },
      thinking: {
        start: "\u5F00\u59CB\u601D\u8003",
        thinking: "\u601D\u8003\u4E2D...",
        complete: "\u5DF2\u5B8C\u6210\u601D\u8003",
        error: "\u601D\u8003\u51FA\u9519\u4E86"
      },
      welcome: {
        title: "\u4F60\u597D\uFF0C\u6211\u662F YH AI",
        description: "\u6211\u53EF\u4EE5\u5E2E\u4F60\u5199\u4EE3\u7801\u3001\u7FFB\u8BD1\u6587\u6863\u6216\u8FDB\u884C\u521B\u610F\u5199\u4F5C\u3002\u4ECA\u5929\u6211\u80FD\u4E3A\u4F60\u505A\u70B9\u4EC0\u4E48\uFF1F"
      },
      action: {
        copy: "\u590D\u5236",
        regenerate: "\u91CD\u65B0\u751F\u6210",
        share: "\u5206\u4EAB",
        like: "\u8D5E\u540C",
        dislike: "\u53CD\u5BF9",
        edit: "\u7F16\u8F91",
        delete: "\u5220\u9664"
      },
      artifacts: {
        preview: "\u9884\u89C8",
        inline: "\u884C\u5185",
        code: "\u6E90\u7801",
        versions: "\u7248\u672C\u5386\u53F2",
        rendering: "\u6B63\u5728\u6E32\u67D3\u7EC4\u4EF6...",
        renderingChart: "\u6B63\u5728\u6E32\u67D3\u56FE\u8868...",
        renderingCanvas: "\u6B63\u5728\u51C6\u5907\u753B\u677F..."
      },
      voice: {
        trigger: "\u70B9\u51FB\u8BF4\u8BDD",
        listening: "\u8046\u542C\u4E2D..."
      },
      // AiAgentCard
      agent: {
        uses: "\u6B21\u8C03\u7528",
        use: "\u7ACB\u5373\u4F7F\u7528",
        favorite: "\u6536\u85CF",
        unfavorite: "\u53D6\u6D88\u6536\u85CF",
        share: "\u5206\u4EAB",
        online: "\u5728\u7EBF",
        offline: "\u79BB\u7EBF",
        busy: "\u5FD9\u788C",
        verified: "\u5B98\u65B9\u8BA4\u8BC1",
        rating: "\u8BC4\u5206",
        reviews: "\u6761\u8BC4\u4EF7",
        responseTime: "\u54CD\u5E94\u65F6\u95F4",
        ms: "ms"
      },
      // AiSources
      sources: {
        references: "\u53C2\u8003\u6765\u6E90",
        referencedSources: "\u5F15\u7528\u6765\u6E90",
        relevant: "\u76F8\u5173\u5EA6",
        viewOriginal: "\u67E5\u770B\u539F\u6587",
        showAll: "\u663E\u793A\u5168\u90E8",
        more: "\u66F4\u591A\u6765\u6E90",
        drawerTitle: "\u53C2\u8003\u6765\u6E90",
        expandMore: "\u5C55\u5F00\u66F4\u591A",
        collapseMore: "\u6536\u8D77",
        noSources: "\u6682\u65E0\u6765\u6E90",
        today: "\u4ECA\u5929",
        last7Days: "\u6700\u8FD1 7 \u5929",
        last30Days: "\u6700\u8FD1 30 \u5929",
        earlier: "\u66F4\u65E9",
        pinned: "\u5DF2\u7F6E\u9876"
      },
      // AiConversations groups
      conversations: {
        today: "\u4ECA\u5929",
        last7Days: "\u6700\u8FD1 7 \u5929",
        last30Days: "\u6700\u8FD1 30 \u5929",
        earlier: "\u66F4\u65E9",
        pinned: "\u7F6E\u9876",
        pin: "\u7F6E\u9876",
        unpin: "\u53D6\u6D88\u7F6E\u9876",
        newConversation: "\u65B0\u5EFA\u5BF9\u8BDD",
        noData: "\u6682\u65E0\u5BF9\u8BDD\u8BB0\u5F55",
        rename: "\u91CD\u547D\u540D",
        delete: "\u5220\u9664",
        deleteConfirm: "\u786E\u8BA4\u5220\u9664\u6B64\u5BF9\u8BDD\uFF1F"
      },
      // AiAttachments
      attachments: {
        dropTip: "\u91CA\u653E\u9F20\u6807\u4EE5\u4E0A\u4F20\u6587\u4EF6",
        clickToUpload: "\u70B9\u51FB\u6216\u62D6\u62FD\u6587\u4EF6\u5230\u6B64\u5904\u4E0A\u4F20",
        uploadSuccess: "\u4E0A\u4F20\u6210\u529F",
        uploadError: "\u4E0A\u4F20\u5931\u8D25",
        deleteConfirm: "\u786E\u5B9A\u5220\u9664\u6B64\u6587\u4EF6\uFF1F",
        fileTooLarge: "\u6587\u4EF6\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC7 {size}",
        invalidFileType: "\u4E0D\u652F\u6301\u7684\u6587\u4EF6\u7C7B\u578B"
      },
      // AiMermaid
      mermaid: {
        image: "\u56FE\u7247",
        code: "\u4EE3\u7801",
        zoomIn: "\u653E\u5927",
        zoomOut: "\u7F29\u5C0F",
        reset: "\u91CD\u7F6E",
        download: "\u4E0B\u8F7D",
        copyCode: "\u590D\u5236\u4EE3\u7801",
        rendering: "\u6B63\u5728\u6E32\u67D3...",
        renderError: "\u6E32\u67D3\u5931\u8D25",
        renderSuccess: "\u6E32\u67D3\u6210\u529F",
        retry: "\u91CD\u8BD5"
      }
    }
  }
};

// public/codesandbox-runtime/hooks/use-namespace/index.js
import { inject as inject2, ref, unref as unref2 } from "vue";
var namespaceContextKey = Symbol("namespaceContextKey");

// public/codesandbox-runtime/hooks/use-z-index/index.js
import { computed as computed2, inject as inject3, unref as unref3 } from "vue";
var zIndexContextKey = Symbol("zIndexContextKey");
var zIndexCounterKey = Symbol("zIndexCounterKey");

// public/codesandbox-runtime/hooks/use-sku/index.js
import { ref as ref2, computed as computed3 } from "vue";

// public/codesandbox-runtime/hooks/use-countdown/index.js
import { ref as ref3, computed as computed4, onUnmounted } from "vue";

// public/codesandbox-runtime/hooks/use-locale/index.js
import { computed as computed6, unref as unref5, watch } from "vue";

// public/codesandbox-runtime/hooks/use-config/index.js
import { inject as inject4, computed as computed5, unref as unref4 } from "vue";
var configProviderContextKey = Symbol(
  "configProviderContextKey"
);

// public/codesandbox-runtime/hooks/dayjs.js
import * as dayjsModule from "dayjs";
var _a;
var dayjs = "default" in dayjsModule ? (_a = dayjsModule.default) != null ? _a : dayjsModule : dayjsModule;

// public/codesandbox-runtime/hooks/use-locale/dayjs-locale.js
import "dayjs/locale/en";

// public/codesandbox-runtime/hooks/use-id/index.js
import { computed as computed7, inject as inject5, unref as unref6, useId as useVueId } from "vue";
var idInjectionKey = Symbol("idInjectionKey");

// public/codesandbox-runtime/hooks/use-form-item/index.js
import { inject as inject6 } from "vue";
var FormContextKey = Symbol("FormContextKey");
var FormItemContextKey = Symbol("FormItemContextKey");

// public/codesandbox-runtime/hooks/use-virtual-scroll/index.js
import { ref as ref4, computed as computed8, unref as unref7 } from "vue";

// public/codesandbox-runtime/hooks/use-cache/index.js
import { shallowRef } from "vue";

// public/codesandbox-runtime/hooks/use-event-listener/index.js
import { onMounted, onBeforeUnmount, isRef, watch as watch2, unref as unref8 } from "vue";

// public/codesandbox-runtime/hooks/use-scroll-lock/index.js
import { ref as ref5, watch as watch3, onUnmounted as onUnmounted2 } from "vue";

// public/codesandbox-runtime/hooks/use-click-outside/index.js
import { unref as unref9 } from "vue";

// public/codesandbox-runtime/hooks/use-ai/use-ai-chat.js
import { ref as ref7, computed as computed9 } from "vue";

// public/codesandbox-runtime/hooks/use-ai/use-ai-stream.js
import { ref as ref6 } from "vue";

// public/codesandbox-runtime/hooks/use-ai/use-ai-conversations.js
import { ref as ref8, computed as computed10 } from "vue";

// public/codesandbox-runtime/hooks/use-ai/use-ai-request.js
import { ref as ref9 } from "vue";

// public/codesandbox-runtime/hooks/use-ai/use-ai-voice.js
import { ref as ref10, onUnmounted as onUnmounted3, shallowRef as shallowRef2 } from "vue";

// public/codesandbox-runtime/hooks/use-ai/use-ai-persistence.js
import { ref as ref11, onMounted as onMounted2 } from "vue";

// public/codesandbox-runtime/components/config-provider/src/config-provider.js
var configProviderProps = {
  theme: {
    type: String,
    default: "default"
  },
  locale: {
    type: Object,
    default: zhCn
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
var stdin_default2 = defineComponent({
  name: "YhConfigProvider",
  props: configProviderProps,
  setup(props, { slots }) {
    const containerRef = ref12(null);
    const isMounted = ref12(false);
    let themeManager = null;
    const validPresets = ["default", "dark", "blue", "green", "purple", "orange"];
    const isValidPreset = (theme) => {
      return validPresets.includes(theme);
    };
    const getThemeManager = () => {
      if (props.global) {
        return useTheme();
      }
      if (!themeManager) {
        themeManager = new ThemeManager({ preset: "default" });
      }
      return themeManager;
    };
    const applyTheme = (theme, el) => {
      if (!theme) return;
      const manager = getThemeManager();
      if (!props.global && el) {
        manager.apply({ scope: el });
      }
      if (isValidPreset(theme)) {
        manager.setThemePreset(theme);
      } else if (typeof theme === "string" && theme.startsWith("#")) {
        manager.setThemeColor(theme);
      }
    };
    onMounted3(() => {
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
    watch4(
      () => props.theme,
      (newTheme) => {
        if (isMounted.value) {
          applyTheme(newTheme, containerRef.value);
        }
      }
    );
    const config = computed11(() => ({
      size: props.size,
      zIndex: props.zIndex,
      locale: props.locale,
      message: props.message
    }));
    const themeStyles = computed11(() => {
      const manager = getThemeManager();
      const colors = {};
      if (!isValidPreset(props.theme) && props.theme.startsWith("#")) {
        colors.primary = props.theme;
      }
      return manager.getThemeStyles(colors);
    });
    provide2(configProviderContextKey, config);
    return () => {
      return h(
        "div",
        {
          ref: containerRef,
          class: "yh-config-provider",
          style: themeStyles.value
        },
        [renderSlot(slots, "default")]
      );
    };
  }
});
export {
  configProviderProps,
  stdin_default2 as default
};
