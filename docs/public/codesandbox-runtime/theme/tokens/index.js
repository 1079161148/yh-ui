const colorTokens = {
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
const textColorTokens = {
  primary: "#303133",
  regular: "#606266",
  secondary: "#909399",
  placeholder: "#a8abb2",
  disabled: "#c0c4cc"
};
const borderColorTokens = {
  DEFAULT: "#dcdfe6",
  light: "#e4e7ed",
  lighter: "#ebeef5",
  extraLight: "#f2f6fc",
  dark: "#d4d7de",
  darker: "#cdd0d6"
};
const fillColorTokens = {
  DEFAULT: "#f0f2f5",
  light: "#f5f7fa",
  lighter: "#fafafa",
  extraLight: "#fafcff",
  dark: "#ebedf0",
  darker: "#e6e8eb",
  blank: "#ffffff"
};
const bgColorTokens = {
  DEFAULT: "#ffffff",
  page: "#f2f3f5",
  overlay: "#ffffff"
};
const spacingTokens = {
  none: "0",
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  xxl: "48px"
};
const radiusTokens = {
  none: "0",
  sm: "2px",
  base: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  round: "20px",
  circle: "50%"
};
const fontSizeTokens = {
  xs: "12px",
  sm: "13px",
  base: "14px",
  md: "16px",
  lg: "18px",
  xl: "20px",
  xxl: "24px"
};
const lineHeightTokens = {
  none: "1",
  tight: "1.25",
  snug: "1.375",
  normal: "1.5",
  relaxed: "1.625",
  loose: "2"
};
const fontWeightTokens = {
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700"
};
const shadowTokens = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
};
const durationTokens = {
  fast: "150ms",
  base: "200ms",
  slow: "300ms"
};
const timingTokens = {
  ease: "ease",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  linear: "linear"
};
const zIndexTokens = {
  normal: "1",
  top: "1000",
  popper: "2000",
  overlay: "2001",
  modal: "2002",
  popover: "2003",
  tooltip: "2004",
  loading: "2005"
};
const breakpointTokens = {
  xs: "0",
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
  xxl: "1400px"
};
const fontFamilyTokens = {
  base: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
  monospace: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
  serif: "Georgia, Cambria, 'Times New Roman', Times, serif"
};
const accessibilityTokens = {
  focusRingColor: "#409eff",
  focusRingWidth: "2px",
  focusRingOffset: "2px",
  focusRingOpacity: "0.2"
};
const maskTokens = {
  DEFAULT: "rgba(0, 0, 0, 0.5)",
  light: "rgba(0, 0, 0, 0.3)",
  extraLight: "rgba(0, 0, 0, 0.1)"
};
const scrollbarTokens = {
  width: "6px",
  thumbColor: "#c0c4cc",
  thumbHoverColor: "#909399",
  trackColor: "transparent",
  thumbRadius: "3px"
};
const componentSizeTokens = {
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
const designTokens = {
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
export {
  accessibilityTokens,
  bgColorTokens,
  borderColorTokens,
  breakpointTokens,
  colorTokens,
  componentSizeTokens,
  designTokens,
  durationTokens,
  fillColorTokens,
  fontFamilyTokens,
  fontSizeTokens,
  fontWeightTokens,
  lineHeightTokens,
  maskTokens,
  radiusTokens,
  scrollbarTokens,
  shadowTokens,
  spacingTokens,
  textColorTokens,
  timingTokens,
  zIndexTokens
};
