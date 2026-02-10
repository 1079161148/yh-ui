/**
 * Design Tokens - 设计令牌
 */

// 颜色令牌
export const colorTokens = {
  primary: {
    DEFAULT: '#409eff',
    light: {
      1: '#53a8ff',
      2: '#66b1ff',
      3: '#79bbff',
      4: '#8cc5ff',
      5: '#a0cfff',
      6: '#b3d8ff',
      7: '#c6e2ff',
      8: '#d9ecff',
      9: '#ecf5ff'
    },
    dark: {
      2: '#337ecc'
    }
  },
  success: {
    DEFAULT: '#67c23a',
    light: {
      3: '#95d475',
      5: '#b3e19d',
      7: '#d1edc4',
      9: '#f0f9eb'
    },
    dark: {
      2: '#529b2e'
    }
  },
  warning: {
    DEFAULT: '#e6a23c',
    light: {
      3: '#eebe77',
      5: '#f3d19e',
      7: '#f8e3c5',
      9: '#fdf6ec'
    },
    dark: {
      2: '#b88230'
    }
  },
  danger: {
    DEFAULT: '#f56c6c',
    light: {
      3: '#f89898',
      5: '#fab6b6',
      7: '#fcd3d3',
      9: '#fef0f0'
    },
    dark: {
      2: '#c45656'
    }
  },
  info: {
    DEFAULT: '#909399',
    light: {
      3: '#b1b3b8',
      5: '#c8c9cc',
      7: '#dedfe0',
      9: '#f4f4f5'
    },
    dark: {
      2: '#73767a'
    }
  }
} as const

// 文字颜色
export const textColorTokens = {
  primary: '#303133',
  regular: '#606266',
  secondary: '#909399',
  placeholder: '#a8abb2',
  disabled: '#c0c4cc'
} as const

// 边框颜色
export const borderColorTokens = {
  DEFAULT: '#dcdfe6',
  light: '#e4e7ed',
  lighter: '#ebeef5',
  extraLight: '#f2f6fc',
  dark: '#d4d7de',
  darker: '#cdd0d6'
} as const

// 填充颜色
export const fillColorTokens = {
  DEFAULT: '#f0f2f5',
  light: '#f5f7fa',
  lighter: '#fafafa',
  extraLight: '#fafcff',
  dark: '#ebedf0',
  darker: '#e6e8eb',
  blank: '#ffffff'
} as const

// 背景颜色
export const bgColorTokens = {
  DEFAULT: '#ffffff',
  page: '#f2f3f5',
  overlay: '#ffffff'
} as const

// 间距令牌
export const spacingTokens = {
  none: '0',
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px'
} as const

// 圆角令牌
export const radiusTokens = {
  none: '0',
  sm: '2px',
  base: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  round: '20px',
  circle: '50%'
} as const

// 字号令牌
export const fontSizeTokens = {
  xs: '12px',
  sm: '13px',
  base: '14px',
  md: '16px',
  lg: '18px',
  xl: '20px',
  xxl: '24px'
} as const

// 行高令牌
export const lineHeightTokens = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2'
} as const

// 字重令牌
export const fontWeightTokens = {
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700'
} as const

// 阴影令牌
export const shadowTokens = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
} as const

// 过渡时间令牌
export const durationTokens = {
  fast: '150ms',
  base: '200ms',
  slow: '300ms'
} as const

// 缓动函数令牌
export const timingTokens = {
  ease: 'ease',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  linear: 'linear'
} as const

// z-index 令牌
export const zIndexTokens = {
  normal: '1',
  top: '1000',
  popper: '2000',
  overlay: '2001',
  modal: '2002',
  popover: '2003',
  tooltip: '2004',
  loading: '2005'
} as const

// 断点令牌
export const breakpointTokens = {
  xs: '0',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1400px'
} as const

// 字体族令牌
export const fontFamilyTokens = {
  base: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
  monospace: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
  serif: "Georgia, Cambria, 'Times New Roman', Times, serif"
} as const

// 无障碍/聚焦令牌
export const accessibilityTokens = {
  focusRingColor: '#409eff',
  focusRingWidth: '2px',
  focusRingOffset: '2px',
  focusRingOpacity: '0.2'
} as const

// 遮罩令牌
export const maskTokens = {
  DEFAULT: 'rgba(0, 0, 0, 0.5)',
  light: 'rgba(0, 0, 0, 0.3)',
  extraLight: 'rgba(0, 0, 0, 0.1)'
} as const

// 滚动条令牌
export const scrollbarTokens = {
  width: '6px',
  thumbColor: '#c0c4cc',
  thumbHoverColor: '#909399',
  trackColor: 'transparent',
  thumbRadius: '3px'
} as const

// 组件尺寸令牌
export const componentSizeTokens = {
  large: {
    height: '40px',
    fontSize: '14px',
    paddingX: '20px'
  },
  default: {
    height: '32px',
    fontSize: '14px',
    paddingX: '16px'
  },
  small: {
    height: '24px',
    fontSize: '12px',
    paddingX: '12px'
  }
} as const

// 导出所有令牌
export const designTokens = {
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
} as const

export type DesignTokens = typeof designTokens

// 导出单独的令牌类型
export type ColorTokens = typeof colorTokens
export type TextColorTokens = typeof textColorTokens
export type BorderColorTokens = typeof borderColorTokens
export type FillColorTokens = typeof fillColorTokens
export type BgColorTokens = typeof bgColorTokens
export type SpacingTokens = typeof spacingTokens
export type RadiusTokens = typeof radiusTokens
export type FontSizeTokens = typeof fontSizeTokens
export type LineHeightTokens = typeof lineHeightTokens
export type FontWeightTokens = typeof fontWeightTokens
export type FontFamilyTokens = typeof fontFamilyTokens
export type ShadowTokens = typeof shadowTokens
export type DurationTokens = typeof durationTokens
export type TimingTokens = typeof timingTokens
export type ZIndexTokens = typeof zIndexTokens
export type ComponentSizeTokens = typeof componentSizeTokens
export type BreakpointTokens = typeof breakpointTokens
export type AccessibilityTokens = typeof accessibilityTokens
export type MaskTokens = typeof maskTokens
export type ScrollbarTokens = typeof scrollbarTokens
