/**
 * YH-UI Theme Configuration
 * 主题配置系统 - 业内领先级别
 * @description 提供主题切换、自定义主题色、持久化、响应式主题等功能
 */

import type { App, InjectionKey } from 'vue'
import { reactive, toRefs } from 'vue'
import { designTokens } from './tokens'

// ==================== 类型定义 ====================

/** 主题色配置 */
export interface ThemeColors {
  primary?: string
  success?: string
  warning?: string
  danger?: string
  info?: string
}

/** 预设主题 */
export type PresetTheme =
  | 'default'
  | 'dark'
  | 'blue'
  | 'green'
  | 'purple'
  | 'orange'
  | 'rose'
  | 'amber'
  | 'teal'
  | 'indigo'
  | 'slate'
  | 'zinc'

/** 响应式断点 */
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

/** 响应式主题配置 */
export type ResponsiveTheme = Partial<Record<Breakpoint, Partial<ThemeOptions>>>

/** 主题配置选项 */
export interface ThemeOptions {
  /** 预设主题 */
  preset?: PresetTheme
  /** 自定义颜色 */
  colors?: ThemeColors
  /** 是否暗色模式 */
  dark?: boolean
  /** CSS 变量作用域（默认 :root） */
  scope?: string | HTMLElement
  /** 是否持久化到 localStorage */
  persist?: boolean
  /** 持久化 key */
  persistKey?: string
  /** 响应式主题配置 */
  responsive?: ResponsiveTheme
  /** 圆角配置 */
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  /** 是否启用系统主题跟随 */
  followSystem?: boolean
  /** 颜色算法 */
  algorithm?: 'default' | 'vibrant' | 'muted' | 'pastel'
}

/** 主题状态快照 */
export interface ThemeSnapshot {
  preset: PresetTheme
  colors: ThemeColors
  dark: boolean
  radius: string
  algorithm: string
  density: ThemeDensity
  timestamp: number
  version: string
  name?: string
  author?: string
}

/** 颜色算法类型 */
export type ColorAlgorithm = 'default' | 'vibrant' | 'muted' | 'pastel'

/** 紧凑度/密度类型 */
export type ThemeDensity = 'comfortable' | 'compact' | 'dense'

/** 组件级主题覆盖 */
export interface ComponentThemeOverride {
  [componentName: string]: Record<string, string>
}

/** 色盲友好模式 */
export type ColorBlindMode = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia'

/** 完整主题配置 */
export interface FullThemeConfig extends ThemeOptions {
  /** 主题名称 */
  name?: string
  /** 主题作者 */
  author?: string
  /** 紧凑度 */
  density?: ThemeDensity
  /** 色盲模式 */
  colorBlindMode?: ColorBlindMode
  /** 组件级覆盖 */
  components?: ComponentThemeOverride
  /** 主题切换动画 */
  transition?: boolean | { duration?: number; timing?: string }
  /** 继承的主题 */
  extends?: PresetTheme | FullThemeConfig
}

// ==================== 预设主题 ====================

const presetThemes: Record<PresetTheme, ThemeColors> = {
  default: {
    primary: '#409eff',
    success: '#67c23a',
    warning: '#e6a23c',
    danger: '#f56c6c',
    info: '#909399'
  },
  dark: {
    primary: '#409eff',
    success: '#67c23a',
    warning: '#e6a23c',
    danger: '#f56c6c',
    info: '#909399'
  },
  blue: {
    primary: '#1890ff',
    success: '#52c41a',
    warning: '#faad14',
    danger: '#ff4d4f',
    info: '#909399'
  },
  green: {
    primary: '#10b981',
    success: '#22c55e',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#6b7280'
  },
  purple: {
    primary: '#8b5cf6',
    success: '#22c55e',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#6b7280'
  },
  orange: {
    primary: '#f97316',
    success: '#22c55e',
    warning: '#eab308',
    danger: '#ef4444',
    info: '#6b7280'
  },
  rose: {
    primary: '#f43f5e',
    success: '#22c55e',
    warning: '#f59e0b',
    danger: '#dc2626',
    info: '#6b7280'
  },
  amber: {
    primary: '#f59e0b',
    success: '#22c55e',
    warning: '#eab308',
    danger: '#ef4444',
    info: '#6b7280'
  },
  teal: {
    primary: '#14b8a6',
    success: '#22c55e',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#6b7280'
  },
  indigo: {
    primary: '#6366f1',
    success: '#22c55e',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#6b7280'
  },
  slate: {
    primary: '#475569',
    success: '#22c55e',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#64748b'
  },
  zinc: {
    primary: '#52525b',
    success: '#22c55e',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#71717a'
  }
}

// ==================== 颜色工具函数 ====================

/** HEX 转 RGB */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null
}

/** RGB 转 HEX */
function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

/** RGB 转 HSL */
function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return { h: h * 360, s: s * 100, l: l * 100 }
}

/** HSL 转 RGB */
function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h /= 360
  s /= 100
  l /= 100

  let r: number, g: number, b: number

  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  }
}

/** 计算相对亮度 (WCAG 2.1) */
function getRelativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c /= 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

/** 计算对比度 (WCAG 2.1) */
function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)
  if (!rgb1 || !rgb2) return 1

  const l1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b)
  const l2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b)

  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)

  return (lighter + 0.05) / (darker + 0.05)
}

/** 确保颜色对比度达到 WCAG AA 标准 (4.5:1) */
function ensureContrast(foreground: string, background: string, minRatio: number = 4.5): string {
  const ratio = getContrastRatio(foreground, background)
  if (ratio >= minRatio) return foreground

  const fgRgb = hexToRgb(foreground)
  if (!fgRgb) return foreground

  const hsl = rgbToHsl(fgRgb.r, fgRgb.g, fgRgb.b)
  const bgRgb = hexToRgb(background)
  if (!bgRgb) return foreground

  const bgLuminance = getRelativeLuminance(bgRgb.r, bgRgb.g, bgRgb.b)

  // 根据背景亮度调整前景色
  if (bgLuminance > 0.5) {
    // 浅色背景，加深前景色
    while (
      hsl.l > 0 &&
      getContrastRatio(
        rgbToHex(...(Object.values(hslToRgb(hsl.h, hsl.s, hsl.l)) as [number, number, number])),
        background
      ) < minRatio
    ) {
      hsl.l -= 5
    }
  } else {
    // 深色背景，提亮前景色
    while (
      hsl.l < 100 &&
      getContrastRatio(
        rgbToHex(...(Object.values(hslToRgb(hsl.h, hsl.s, hsl.l)) as [number, number, number])),
        background
      ) < minRatio
    ) {
      hsl.l += 5
    }
  }

  const adjusted = hslToRgb(hsl.h, hsl.s, hsl.l)
  return rgbToHex(adjusted.r, adjusted.g, adjusted.b)
}

/** 混合两种颜色 */
function mixColor(color1: string, color2: string, weight: number): string {
  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)

  if (!rgb1 || !rgb2) return color1

  const w = weight / 100
  const r = Math.round(rgb1.r * w + rgb2.r * (1 - w))
  const g = Math.round(rgb1.g * w + rgb2.g * (1 - w))
  const b = Math.round(rgb1.b * w + rgb2.b * (1 - w))

  return rgbToHex(r, g, b)
}

/** 调整颜色饱和度 */
function adjustSaturation(color: string, amount: number): string {
  const rgb = hexToRgb(color)
  if (!rgb) return color

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
  hsl.s = Math.max(0, Math.min(100, hsl.s + amount))

  const adjusted = hslToRgb(hsl.h, hsl.s, hsl.l)
  return rgbToHex(adjusted.r, adjusted.g, adjusted.b)
}

/** 调整颜色亮度 */
function adjustLightness(color: string, amount: number): string {
  const rgb = hexToRgb(color)
  if (!rgb) return color

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
  hsl.l = Math.max(0, Math.min(100, hsl.l + amount))

  const adjusted = hslToRgb(hsl.h, hsl.s, hsl.l)
  return rgbToHex(adjusted.r, adjusted.g, adjusted.b)
}

/** 根据算法生成颜色变体 */
function generateColorScaleWithAlgorithm(
  baseColor: string,
  isDark: boolean = false,
  algorithm: ColorAlgorithm = 'default'
): Record<string, string> {
  const white = '#ffffff'
  const black = '#000000'

  let adjustedBase = baseColor

  // 根据算法调整基色
  switch (algorithm) {
    case 'vibrant':
      adjustedBase = adjustSaturation(baseColor, 15)
      break
    case 'muted':
      adjustedBase = adjustSaturation(baseColor, -20)
      break
    case 'pastel':
      adjustedBase = adjustSaturation(adjustLightness(baseColor, 15), -30)
      break
  }

  if (isDark) {
    return {
      '': adjustedBase,
      'light-3': mixColor(adjustedBase, black, 70),
      'light-5': mixColor(adjustedBase, black, 50),
      'light-7': mixColor(adjustedBase, black, 30),
      'light-8': mixColor(adjustedBase, black, 20),
      'light-9': mixColor(adjustedBase, black, 10),
      'dark-2': mixColor(adjustedBase, white, 80)
    }
  }

  return {
    '': adjustedBase,
    'light-1': mixColor(adjustedBase, white, 90),
    'light-2': mixColor(adjustedBase, white, 80),
    'light-3': mixColor(adjustedBase, white, 70),
    'light-4': mixColor(adjustedBase, white, 60),
    'light-5': mixColor(adjustedBase, white, 50),
    'light-6': mixColor(adjustedBase, white, 40),
    'light-7': mixColor(adjustedBase, white, 30),
    'light-8': mixColor(adjustedBase, white, 20),
    'light-9': mixColor(adjustedBase, white, 10),
    'dark-2': mixColor(adjustedBase, black, 80)
  }
}

/** 生成语义化状态颜色 */
function generateSemanticColors(
  baseColor: string,
  isDark: boolean = false
): Record<string, string> {
  return {
    hover: isDark ? adjustLightness(baseColor, 10) : adjustLightness(baseColor, -5),
    active: isDark ? adjustLightness(baseColor, -5) : adjustLightness(baseColor, -10),
    disabled: adjustSaturation(adjustLightness(baseColor, isDark ? -20 : 30), -40),
    focus: baseColor
  }
}

// ==================== CSS 变量工具 ====================

function setCssVar(name: string, value: string, el: HTMLElement | null = null): void {
  const target = el || (typeof document !== 'undefined' ? document.documentElement : null)
  if (target) {
    target.style.setProperty(name, value)
  }
}

function getCssVar(name: string, el: HTMLElement | null = null): string {
  const target = el || (typeof document !== 'undefined' ? document.documentElement : null)
  if (target) {
    return getComputedStyle(target).getPropertyValue(name).trim()
  }
  return ''
}

function removeCssVar(name: string, el: HTMLElement | null = null): void {
  const target = el || (typeof document !== 'undefined' ? document.documentElement : null)
  if (target) {
    target.style.removeProperty(name)
  }
}

function getTargetElement(scope?: string | HTMLElement): HTMLElement | null {
  if (typeof document === 'undefined') return null
  if (!scope) return document.documentElement
  if (typeof scope === 'string') {
    return document.querySelector(scope)
  }
  return scope
}

// ==================== 断点系统 ====================

const breakpoints: Record<Breakpoint, number> = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400
}

// ==================== 密度/紧凑度配置 ====================

const densityConfig: Record<ThemeDensity, Record<string, string>> = {
  comfortable: {
    '--yh-density-factor': '1',
    '--yh-component-size-default': '32px',
    '--yh-component-size-small': '24px',
    '--yh-component-size-large': '40px',
    '--yh-padding-default': '12px 16px',
    '--yh-padding-small': '8px 12px',
    '--yh-padding-large': '16px 20px',
    '--yh-spacing-unit': '8px',
    '--yh-font-size-base': '14px',
    '--yh-line-height-base': '1.5'
  },
  compact: {
    '--yh-density-factor': '0.85',
    '--yh-component-size-default': '28px',
    '--yh-component-size-small': '20px',
    '--yh-component-size-large': '36px',
    '--yh-padding-default': '8px 12px',
    '--yh-padding-small': '4px 8px',
    '--yh-padding-large': '12px 16px',
    '--yh-spacing-unit': '6px',
    '--yh-font-size-base': '13px',
    '--yh-line-height-base': '1.4'
  },
  dense: {
    '--yh-density-factor': '0.7',
    '--yh-component-size-default': '24px',
    '--yh-component-size-small': '18px',
    '--yh-component-size-large': '32px',
    '--yh-padding-default': '4px 8px',
    '--yh-padding-small': '2px 6px',
    '--yh-padding-large': '8px 12px',
    '--yh-spacing-unit': '4px',
    '--yh-font-size-base': '12px',
    '--yh-line-height-base': '1.35'
  }
}

// ==================== 色盲友好调色板 ====================

const colorBlindPalettes: Record<ColorBlindMode, Record<string, string>> = {
  none: {},
  // 红色盲（无法区分红绿）
  protanopia: {
    primary: '#0072B2', // 蓝色
    success: '#009E73', // 蓝绿色
    warning: '#E69F00', // 橙色
    danger: '#D55E00', // 深橙色
    info: '#56B4E9' // 浅蓝色
  },
  // 绿色盲（无法区分红绿）
  deuteranopia: {
    primary: '#0072B2',
    success: '#009E73',
    warning: '#E69F00',
    danger: '#CC79A7', // 粉紫色
    info: '#56B4E9'
  },
  // 蓝色盲（无法区分蓝黄）
  tritanopia: {
    primary: '#CC79A7', // 粉紫色
    success: '#009E73', // 蓝绿色
    warning: '#D55E00', // 深橙色
    danger: '#E69F00', // 橙色
    info: '#999999' // 灰色
  },
  // 全色盲（只能看到灰度）
  achromatopsia: {
    primary: '#404040',
    success: '#606060',
    warning: '#808080',
    danger: '#202020',
    info: '#a0a0a0'
  }
}

// ==================== 主题切换动画 ====================

const THEME_TRANSITION_CLASS = 'yh-theme-transitioning'
const DEFAULT_TRANSITION_DURATION = 300
const DEFAULT_TRANSITION_TIMING = 'cubic-bezier(0.4, 0, 0.2, 1)'

function enableThemeTransition(
  duration: number = DEFAULT_TRANSITION_DURATION,
  timing: string = DEFAULT_TRANSITION_TIMING
): void {
  if (typeof document === 'undefined') return

  const style = document.createElement('style')
  style.id = 'yh-theme-transition'
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
  `
  document.head.appendChild(style)
  document.documentElement.classList.add(THEME_TRANSITION_CLASS)

  setTimeout(() => {
    document.documentElement.classList.remove(THEME_TRANSITION_CLASS)
    style.remove()
  }, duration)
}

// ==================== 互补色与和谐色生成 ====================

/** 获取互补色 */
function getComplementaryColor(hex: string): string {
  const rgb = hexToRgb(hex)
  if (!rgb) return hex
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
  hsl.h = (hsl.h + 180) % 360
  const result = hslToRgb(hsl.h, hsl.s, hsl.l)
  return rgbToHex(result.r, result.g, result.b)
}

/** 获取类似色 (三等分) */
function getAnalogousColors(hex: string): [string, string] {
  const rgb = hexToRgb(hex)
  if (!rgb) return [hex, hex]
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)

  const hsl1 = { ...hsl, h: (hsl.h + 30) % 360 }
  const hsl2 = { ...hsl, h: (hsl.h - 30 + 360) % 360 }

  const result1 = hslToRgb(hsl1.h, hsl1.s, hsl1.l)
  const result2 = hslToRgb(hsl2.h, hsl2.s, hsl2.l)

  return [rgbToHex(result1.r, result1.g, result1.b), rgbToHex(result2.r, result2.g, result2.b)]
}

/** 获取三角色 */
function getTriadicColors(hex: string): [string, string] {
  const rgb = hexToRgb(hex)
  if (!rgb) return [hex, hex]
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)

  const hsl1 = { ...hsl, h: (hsl.h + 120) % 360 }
  const hsl2 = { ...hsl, h: (hsl.h + 240) % 360 }

  const result1 = hslToRgb(hsl1.h, hsl1.s, hsl1.l)
  const result2 = hslToRgb(hsl2.h, hsl2.s, hsl2.l)

  return [rgbToHex(result1.r, result1.g, result1.b), rgbToHex(result2.r, result2.g, result2.b)]
}

/** 从主色自动生成完整调色板 */
function generatePaletteFromPrimary(primaryColor: string): ThemeColors {
  const rgb = hexToRgb(primaryColor)
  if (!rgb) return { primary: primaryColor }

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)

  // Success: 绿色调，与主色同等饱和度
  const successHsl = { h: 142, s: Math.min(hsl.s, 70), l: 45 }
  const successRgb = hslToRgb(successHsl.h, successHsl.s, successHsl.l)

  // Warning: 橙黄色调
  const warningHsl = { h: 36, s: Math.min(hsl.s + 10, 85), l: 50 }
  const warningRgb = hslToRgb(warningHsl.h, warningHsl.s, warningHsl.l)

  // Danger: 红色调
  const dangerHsl = { h: 0, s: Math.min(hsl.s + 5, 75), l: 55 }
  const dangerRgb = hslToRgb(dangerHsl.h, dangerHsl.s, dangerHsl.l)

  // Info: 主色的低饱和度版本
  const infoHsl = { h: hsl.h, s: Math.max(hsl.s - 40, 10), l: 60 }
  const infoRgb = hslToRgb(infoHsl.h, infoHsl.s, infoHsl.l)

  return {
    primary: primaryColor,
    success: rgbToHex(successRgb.r, successRgb.g, successRgb.b),
    warning: rgbToHex(warningRgb.r, warningRgb.g, warningRgb.b),
    danger: rgbToHex(dangerRgb.r, dangerRgb.g, dangerRgb.b),
    info: rgbToHex(infoRgb.r, infoRgb.g, infoRgb.b)
  }
}

function getCurrentBreakpoint(): Breakpoint {
  if (typeof window === 'undefined') return 'md'

  const width = window.innerWidth
  if (width >= breakpoints.xxl) return 'xxl'
  if (width >= breakpoints.xl) return 'xl'
  if (width >= breakpoints.lg) return 'lg'
  if (width >= breakpoints.md) return 'md'
  if (width >= breakpoints.sm) return 'sm'
  return 'xs'
}

// ==================== 主题管理器 ====================

export class ThemeManager {
  private currentTheme: PresetTheme = 'default'
  private customColors: ThemeColors = {}
  private isDark: boolean = false
  private targetEl: HTMLElement | null = null
  private persistKey: string = 'yh-ui-theme'
  private algorithm: ColorAlgorithm = 'default'
  private responsiveConfig: ResponsiveTheme = {}
  private currentBreakpoint: Breakpoint = 'md'
  private resizeHandler: (() => void) | null = null
  private systemDarkQuery: MediaQueryList | null = null
  private systemDarkHandler: ((e: MediaQueryListEvent) => void) | null = null
  private followSystem: boolean = false
  private currentDensity: ThemeDensity = 'comfortable'
  private colorBlindMode: ColorBlindMode = 'none'
  private componentOverrides: ComponentThemeOverride = {}
  private transitionEnabled: boolean = false
  private transitionConfig: { duration: number; timing: string } = {
    duration: DEFAULT_TRANSITION_DURATION,
    timing: DEFAULT_TRANSITION_TIMING
  }
  private themeHistory: ThemeSnapshot[] = []
  private maxHistoryLength: number = 10

  // 响应式状态
  public readonly state = reactive({
    theme: 'default' as PresetTheme,
    dark: false,
    colors: {} as ThemeColors,
    breakpoint: 'md' as Breakpoint,
    density: 'comfortable' as ThemeDensity,
    colorBlindMode: 'none' as ColorBlindMode
  })

  constructor(options?: ThemeOptions) {
    this.initTheme(options)
  }

  /** 初始化主题 */
  initTheme(options?: ThemeOptions): void {
    // 先尝试从持久化存储恢复
    if (options?.persist !== false) {
      this.persistKey = options?.persistKey || 'yh-ui-theme'
      this.restoreFromStorage()
    }

    // 应用传入的选项
    this.apply({
      preset: 'default',
      ...options
    })

    // 设置响应式主题
    if (options?.responsive) {
      this.setResponsiveTheme(options.responsive)
    }

    // 设置系统主题跟随
    if (options?.followSystem) {
      this.enableSystemFollow()
    }

    this.applyTokens()
  }

  /** 应用主题 */
  apply(options: ThemeOptions): void {
    const { preset, colors, dark, scope, algorithm } = options

    this.targetEl = getTargetElement(scope)

    if (algorithm) {
      this.algorithm = algorithm
    }

    if (dark !== undefined) {
      this.setDarkMode(dark)
    }

    if (preset) {
      this.setPreset(preset)
    }

    if (colors) {
      this.setColors(colors)
    }
  }

  /** 设置预设主题 */
  setPreset(preset: PresetTheme): void {
    const colors = presetThemes[preset]
    if (!colors) {
      console.warn(`[YH-UI Theme] Invalid preset: "${preset}"`)
      return
    }
    this.currentTheme = preset
    this.state.theme = preset
    this.applyColors(colors)
    this.saveToStorage()
  }

  /** 设置自定义颜色 */
  setColors(colors: ThemeColors): void {
    this.customColors = { ...this.customColors, ...colors }
    this.state.colors = this.customColors
    this.applyColors(colors)
    this.saveToStorage()
  }

  /** 设置主色 */
  setPrimaryColor(color: string): void {
    this.setColors({ primary: color })
  }

  /** 设置主题色 (别名) */
  setThemeColor(color: string): void {
    this.setPrimaryColor(color)
  }

  /** 设置预设主题 (别名) */
  setThemePreset(preset: PresetTheme): void {
    this.setPreset(preset)
  }

  /** 设置颜色算法 */
  setAlgorithm(algorithm: ColorAlgorithm): void {
    this.algorithm = algorithm
    const currentColors = {
      ...presetThemes[this.currentTheme],
      ...this.customColors
    }
    this.applyColors(currentColors)
    this.saveToStorage()
  }

  /** 设置暗色模式 */
  setDarkMode(dark: boolean): void {
    this.isDark = dark
    this.state.dark = dark

    if (typeof document !== 'undefined') {
      if (dark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }

    const currentColors = {
      ...presetThemes[this.currentTheme],
      ...this.customColors
    }
    this.applyColors(currentColors)
    this.saveToStorage()
  }

  /** 切换暗色模式 */
  toggleDarkMode(): boolean {
    this.setDarkMode(!this.isDark)
    return this.isDark
  }

  /** 启用系统主题跟随 */
  enableSystemFollow(): void {
    if (typeof window === 'undefined') return

    this.followSystem = true
    this.systemDarkQuery = window.matchMedia('(prefers-color-scheme: dark)')

    // 初始设置
    this.setDarkMode(this.systemDarkQuery.matches)

    // 监听变化
    this.systemDarkHandler = (e: MediaQueryListEvent) => {
      if (this.followSystem) {
        this.setDarkMode(e.matches)
      }
    }
    this.systemDarkQuery.addEventListener('change', this.systemDarkHandler)
  }

  /** 禁用系统主题跟随 */
  disableSystemFollow(): void {
    this.followSystem = false
    if (this.systemDarkQuery && this.systemDarkHandler) {
      this.systemDarkQuery.removeEventListener('change', this.systemDarkHandler)
    }
  }

  /** 设置响应式主题 */
  setResponsiveTheme(config: ResponsiveTheme): void {
    this.responsiveConfig = config

    if (typeof window === 'undefined') return

    this.currentBreakpoint = getCurrentBreakpoint()
    this.state.breakpoint = this.currentBreakpoint

    // 应用当前断点的主题
    this.applyResponsiveTheme()

    // 监听窗口大小变化
    this.resizeHandler = () => {
      const newBreakpoint = getCurrentBreakpoint()
      if (newBreakpoint !== this.currentBreakpoint) {
        this.currentBreakpoint = newBreakpoint
        this.state.breakpoint = newBreakpoint
        this.applyResponsiveTheme()
      }
    }
    window.addEventListener('resize', this.resizeHandler)
  }

  /** 应用响应式主题 */
  private applyResponsiveTheme(): void {
    const config = this.responsiveConfig[this.currentBreakpoint]
    if (config) {
      this.apply(config)
    }
  }

  /** 获取当前是否暗色模式 */
  get dark(): boolean {
    return this.isDark
  }

  /** 获取当前主题 */
  get theme(): PresetTheme {
    return this.currentTheme
  }

  /** 获取所有可用预设 */
  get presets(): PresetTheme[] {
    return Object.keys(presetThemes) as PresetTheme[]
  }

  /** 获取当前断点 */
  get breakpoint(): Breakpoint {
    return this.currentBreakpoint
  }

  /** 应用颜色到 CSS 变量 */
  private applyColors(colors: ThemeColors): void {
    const el = this.targetEl || (typeof document !== 'undefined' ? document.documentElement : null)
    if (!el) return

    const styles = this.getThemeStyles(colors)
    Object.entries(styles).forEach(([name, value]) => {
      setCssVar(name, value, el)
    })
  }

  /** 获取当前主题的 CSS 变量对象 */
  public getThemeStyles(colors: ThemeColors = {}): Record<string, string> {
    const styles: Record<string, string> = {}
    const themeColors = {
      ...presetThemes[this.currentTheme],
      ...this.customColors,
      ...colors
    }

    const colorTypes = [
      { key: 'primary', cssVar: 'primary' },
      { key: 'success', cssVar: 'success' },
      { key: 'warning', cssVar: 'warning' },
      { key: 'danger', cssVar: 'danger' },
      { key: 'info', cssVar: 'info' }
    ] as const

    colorTypes.forEach(({ key, cssVar }) => {
      const baseColor = themeColors[key as keyof ThemeColors]
      if (baseColor) {
        // 生成色阶
        const colorScale = generateColorScaleWithAlgorithm(baseColor, this.isDark, this.algorithm)
        Object.entries(colorScale).forEach(([suffix, value]) => {
          const varName = suffix ? `--yh-color-${cssVar}-${suffix}` : `--yh-color-${cssVar}`
          styles[varName] = value
        })

        // 生成语义化状态颜色
        const semanticColors = generateSemanticColors(baseColor, this.isDark)
        Object.entries(semanticColors).forEach(([state, value]) => {
          styles[`--yh-color-${cssVar}-${state}`] = value
        })

        // 生成 RGB 值（用于透明度）
        const rgb = hexToRgb(baseColor)
        if (rgb) {
          styles[`--yh-color-${cssVar}-rgb`] = `${rgb.r}, ${rgb.g}, ${rgb.b}`
        }
      }
    })

    return styles
  }

  /** 获取 CSS 变量值 */
  public getCssVar(name: string): string {
    return getCssVar(name, this.targetEl)
  }

  /** 设置 CSS 变量值 */
  public setCssVar(name: string, value: string): void {
    setCssVar(name, value, this.targetEl)
  }

  /** 应用所有设计令牌 */
  private applyTokens(): void {
    const el = this.targetEl || (typeof document !== 'undefined' ? document.documentElement : null)
    if (!el) return

    // 应用颜色
    Object.entries(designTokens.colors).forEach(([type, colors]) => {
      const colorObj = colors as {
        DEFAULT: string
        light?: Record<string, string>
        dark?: Record<string, string>
      }
      setCssVar(`--yh-color-${type}`, colorObj.DEFAULT, el)

      if (colorObj.light) {
        Object.entries(colorObj.light).forEach(([level, value]) => {
          setCssVar(`--yh-color-${type}-light-${level}`, value, el)
        })
      }
      if (colorObj.dark) {
        Object.entries(colorObj.dark).forEach(([level, value]) => {
          setCssVar(`--yh-color-${type}-dark-${level}`, value, el)
        })
      }
    })

    // 应用其他令牌
    Object.entries(designTokens.textColors).forEach(([key, value]) => {
      setCssVar(`--yh-text-color-${key}`, value, el)
    })

    Object.entries(designTokens.borderColors).forEach(([key, value]) => {
      const name = key === 'DEFAULT' ? '--yh-border-color' : `--yh-border-color-${key}`
      setCssVar(name, value, el)
    })

    Object.entries(designTokens.bgColors).forEach(([key, value]) => {
      const name = key === 'DEFAULT' ? '--yh-bg-color' : `--yh-bg-color-${key}`
      setCssVar(name, value, el)
    })

    Object.entries(designTokens.radius).forEach(([key, value]) => {
      setCssVar(`--yh-radius-${key}`, value, el)
    })

    Object.entries(designTokens.zIndex).forEach(([key, value]) => {
      setCssVar(`--yh-z-index-${key}`, value, el)
    })
  }

  // ==================== 持久化 ====================

  /** 保存到存储 */
  private saveToStorage(): void {
    if (typeof localStorage === 'undefined') return

    const snapshot: ThemeSnapshot = {
      preset: this.currentTheme,
      colors: this.customColors,
      dark: this.isDark,
      radius: 'md',
      algorithm: this.algorithm,
      density: this.currentDensity,
      timestamp: Date.now(),
      version: '1.0.0'
    }

    try {
      localStorage.setItem(this.persistKey, JSON.stringify(snapshot))
    } catch (e) {
      console.warn('[YH-UI Theme] Failed to persist theme:', e)
    }
  }

  /** 从存储恢复 */
  private restoreFromStorage(): boolean {
    if (typeof localStorage === 'undefined') return false

    try {
      const stored = localStorage.getItem(this.persistKey)
      if (!stored) return false

      const snapshot: ThemeSnapshot = JSON.parse(stored)

      this.currentTheme = snapshot.preset
      this.customColors = snapshot.colors || {}
      this.isDark = snapshot.dark
      this.algorithm = (snapshot.algorithm as ColorAlgorithm) || 'default'
      this.currentDensity = snapshot.density || 'comfortable'

      this.state.theme = this.currentTheme
      this.state.dark = this.isDark
      this.state.colors = this.customColors
      this.state.density = this.currentDensity

      return true
    } catch (e) {
      console.warn('[YH-UI Theme] Failed to restore theme:', e)
      return false
    }
  }

  /** 导出主题配置 */
  exportTheme(options?: { name?: string; author?: string }): string {
    const snapshot: ThemeSnapshot = {
      preset: this.currentTheme,
      colors: this.customColors,
      dark: this.isDark,
      radius: 'md',
      algorithm: this.algorithm,
      density: this.currentDensity,
      timestamp: Date.now(),
      version: '1.0.0',
      name: options?.name,
      author: options?.author
    }
    return JSON.stringify(snapshot, null, 2)
  }

  /** 导入主题配置 */
  importTheme(json: string): boolean {
    try {
      const snapshot: ThemeSnapshot = JSON.parse(json)

      if (this.transitionEnabled) {
        enableThemeTransition(this.transitionConfig.duration, this.transitionConfig.timing)
      }

      this.setPreset(snapshot.preset)
      if (snapshot.colors && Object.keys(snapshot.colors).length > 0) {
        this.setColors(snapshot.colors)
      }
      this.setDarkMode(snapshot.dark)
      if (snapshot.algorithm) {
        this.setAlgorithm(snapshot.algorithm as ColorAlgorithm)
      }
      if (snapshot.density) {
        this.setDensity(snapshot.density)
      }

      return true
    } catch (e) {
      console.error('[YH-UI Theme] Failed to import theme:', e)
      return false
    }
  }

  /** 导出为纯 CSS */
  exportAsCss(): string {
    const styles = this.getThemeStyles()
    let css = ':root {\n'
    Object.entries(styles).forEach(([name, value]) => {
      css += `  ${name}: ${value};\n`
    })
    css += '}\n'
    return css
  }

  /** 重置为默认主题 */
  reset(): void {
    if (typeof document === 'undefined') return

    this.currentTheme = 'default'
    this.customColors = {}
    this.isDark = false
    this.algorithm = 'default'
    this.currentDensity = 'comfortable'
    this.colorBlindMode = 'none'
    this.componentOverrides = {}

    this.state.theme = 'default'
    this.state.dark = false
    this.state.colors = {}
    this.state.density = 'comfortable'
    this.state.colorBlindMode = 'none'

    document.documentElement.classList.remove('dark')

    const el = this.targetEl || document.documentElement
    const colorTypes = ['primary', 'success', 'warning', 'danger', 'info']
    const suffixes = [
      '',
      'light-1',
      'light-2',
      'light-3',
      'light-4',
      'light-5',
      'light-6',
      'light-7',
      'light-8',
      'light-9',
      'dark-2',
      'hover',
      'active',
      'disabled',
      'focus',
      'rgb'
    ]

    colorTypes.forEach((type) => {
      suffixes.forEach((suffix) => {
        const varName = suffix ? `--yh-color-${type}-${suffix}` : `--yh-color-${type}`
        removeCssVar(varName, el)
      })
    })

    // 重置密度变量
    Object.keys(densityConfig.comfortable).forEach((key) => {
      removeCssVar(key, el)
    })

    this.saveToStorage()
  }

  // ==================== 密度/紧凑度控制 ====================

  /** 设置密度 */
  setDensity(density: ThemeDensity): void {
    if (this.transitionEnabled) {
      enableThemeTransition(this.transitionConfig.duration, this.transitionConfig.timing)
    }

    this.currentDensity = density
    this.state.density = density

    const el = this.targetEl || (typeof document !== 'undefined' ? document.documentElement : null)
    if (!el) return

    const config = densityConfig[density]
    Object.entries(config).forEach(([name, value]) => {
      setCssVar(name, value, el)
    })

    this.saveToStorage()
  }

  /** 获取当前密度 */
  get density(): ThemeDensity {
    return this.currentDensity
  }

  // ==================== 色盲模式 ====================

  /** 设置色盲友好模式 */
  setColorBlindMode(mode: ColorBlindMode): void {
    if (this.transitionEnabled) {
      enableThemeTransition(this.transitionConfig.duration, this.transitionConfig.timing)
    }

    this.colorBlindMode = mode
    this.state.colorBlindMode = mode

    if (mode === 'none') {
      // 恢复原始颜色
      const currentColors = {
        ...presetThemes[this.currentTheme],
        ...this.customColors
      }
      this.applyColors(currentColors)
    } else {
      // 应用色盲友好调色板
      const palette = colorBlindPalettes[mode]
      this.applyColors(palette)
    }

    this.saveToStorage()
  }

  /** 获取当前色盲模式 */
  get colorBlind(): ColorBlindMode {
    return this.colorBlindMode
  }

  // ==================== 组件级主题覆盖 ====================

  /** 设置组件级主题覆盖 */
  setComponentTheme(componentName: string, overrides: Record<string, string>): void {
    this.componentOverrides[componentName] = {
      ...this.componentOverrides[componentName],
      ...overrides
    }

    const el = this.targetEl || (typeof document !== 'undefined' ? document.documentElement : null)
    if (!el) return

    Object.entries(overrides).forEach(([name, value]) => {
      setCssVar(`--yh-${componentName}-${name}`, value, el)
    })
  }

  /** 获取组件主题覆盖 */
  getComponentTheme(componentName: string): Record<string, string> {
    return this.componentOverrides[componentName] || {}
  }

  /** 清除组件级覆盖 */
  clearComponentTheme(componentName: string): void {
    const overrides = this.componentOverrides[componentName]
    if (!overrides) return

    const el = this.targetEl || (typeof document !== 'undefined' ? document.documentElement : null)
    if (!el) return

    Object.keys(overrides).forEach((name) => {
      removeCssVar(`--yh-${componentName}-${name}`, el)
    })

    delete this.componentOverrides[componentName]
  }

  // ==================== 主题切换动画 ====================

  /** 启用主题切换动画 */
  enableTransition(config?: { duration?: number; timing?: string }): void {
    this.transitionEnabled = true
    if (config) {
      this.transitionConfig = {
        duration: config.duration ?? DEFAULT_TRANSITION_DURATION,
        timing: config.timing ?? DEFAULT_TRANSITION_TIMING
      }
    }
  }

  /** 禁用主题切换动画 */
  disableTransition(): void {
    this.transitionEnabled = false
  }

  // ==================== 主题继承与合并 ====================

  /** 创建继承主题 */
  createTheme(config: FullThemeConfig): ThemeSnapshot {
    let baseColors: ThemeColors = {}

    // 处理继承
    if (config.extends) {
      if (typeof config.extends === 'string') {
        baseColors = { ...presetThemes[config.extends] }
      } else {
        const parentSnapshot = this.createTheme(config.extends)
        baseColors = { ...parentSnapshot.colors }
      }
    }

    // 合并自定义颜色
    const mergedColors = { ...baseColors, ...config.colors }

    return {
      preset: config.preset || 'default',
      colors: mergedColors,
      dark: config.dark || false,
      radius: config.radius || 'md',
      algorithm: config.algorithm || 'default',
      density: config.density || 'comfortable',
      timestamp: Date.now(),
      version: '1.0.0',
      name: config.name,
      author: config.author
    }
  }

  /** 应用完整主题配置 */
  applyFullConfig(config: FullThemeConfig): void {
    if (this.transitionEnabled || config.transition) {
      const transitionConfig =
        typeof config.transition === 'object'
          ? config.transition
          : { duration: DEFAULT_TRANSITION_DURATION, timing: DEFAULT_TRANSITION_TIMING }
      enableThemeTransition(transitionConfig.duration!, transitionConfig.timing!)
    }

    // 保存历史
    this.pushHistory()

    const snapshot = this.createTheme(config)

    this.setPreset(snapshot.preset)
    if (snapshot.colors && Object.keys(snapshot.colors).length > 0) {
      this.setColors(snapshot.colors)
    }
    this.setDarkMode(snapshot.dark)
    if (snapshot.algorithm) {
      this.setAlgorithm(snapshot.algorithm as ColorAlgorithm)
    }
    if (config.density) {
      this.setDensity(config.density)
    }
    if (config.colorBlindMode) {
      this.setColorBlindMode(config.colorBlindMode)
    }
    if (config.components) {
      Object.entries(config.components).forEach(([componentName, overrides]) => {
        this.setComponentTheme(componentName, overrides)
      })
    }
  }

  // ==================== 主题历史 ====================

  /** 保存当前状态到历史 */
  private pushHistory(): void {
    const snapshot: ThemeSnapshot = {
      preset: this.currentTheme,
      colors: { ...this.customColors },
      dark: this.isDark,
      radius: 'md',
      algorithm: this.algorithm,
      density: this.currentDensity,
      timestamp: Date.now(),
      version: '1.0.0'
    }

    this.themeHistory.push(snapshot)

    if (this.themeHistory.length > this.maxHistoryLength) {
      this.themeHistory.shift()
    }
  }

  /** 撤销到上一个主题状态 */
  undo(): boolean {
    const previousSnapshot = this.themeHistory.pop()
    if (!previousSnapshot) return false

    this.importTheme(JSON.stringify(previousSnapshot))
    return true
  }

  /** 获取主题历史 */
  getHistory(): ThemeSnapshot[] {
    return [...this.themeHistory]
  }

  /** 清除主题历史 */
  clearHistory(): void {
    this.themeHistory = []
  }

  // ==================== 智能色彩生成 ====================

  /** 从主色生成完整调色板 */
  generateFromPrimary(primaryColor: string): ThemeColors {
    return generatePaletteFromPrimary(primaryColor)
  }

  /** 应用从主色生成的调色板 */
  applyFromPrimary(primaryColor: string): void {
    const palette = this.generateFromPrimary(primaryColor)
    this.setColors(palette)
  }

  /** 获取互补色 */
  getComplementary(hex: string): string {
    return getComplementaryColor(hex)
  }

  /** 获取类似色 */
  getAnalogous(hex: string): [string, string] {
    return getAnalogousColors(hex)
  }

  /** 获取三角色 */
  getTriadic(hex: string): [string, string] {
    return getTriadicColors(hex)
  }

  // ==================== 响应式主题变量 ====================

  /** 设置响应式变量 (根据断点自动切换) */
  setResponsiveVar(name: string, values: Partial<Record<Breakpoint, string>>): void {
    // 为响应式变量创建样式标签 (仅在客户端)
    if (typeof document === 'undefined') return

    // 创建或更新 CSS 媒体查询
    let style = document.getElementById('yh-responsive-vars') as HTMLStyleElement
    if (!style) {
      style = document.createElement('style')
      style.id = 'yh-responsive-vars'
      document.head.appendChild(style)
    }

    let css = ''

    // 生成媒体查询
    const orderedBreakpoints: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']
    orderedBreakpoints.forEach((bp) => {
      if (values[bp]) {
        if (bp === 'xs') {
          css += `
            :root { ${name}: ${values[bp]}; }
          `
        } else {
          css += `
            @media (min-width: ${breakpoints[bp]}px) {
              :root { ${name}: ${values[bp]}; }
            }
          `
        }
      }
    })

    // 追加到现有样式
    style.textContent += css
  }

  /** 销毁 */
  destroy(): void {
    if (this.resizeHandler && typeof window !== 'undefined') {
      window.removeEventListener('resize', this.resizeHandler)
    }
    this.disableSystemFollow()

    // 清理响应式变量样式
    const style = document.getElementById('yh-responsive-vars')
    if (style) {
      style.remove()
    }
  }
}

// ==================== 全局实例与工具函数 ====================

let globalThemeManager: ThemeManager | null = null

export function useTheme(): ThemeManager {
  if (!globalThemeManager) {
    globalThemeManager = new ThemeManager()
  }
  return globalThemeManager
}

export function setThemeColor(color: string): void {
  useTheme().setPrimaryColor(color)
}

export function toggleDarkMode(): boolean {
  return useTheme().toggleDarkMode()
}

export function setThemePreset(preset: PresetTheme): void {
  useTheme().setPreset(preset)
}

export function initTheme(options?: ThemeOptions): ThemeManager {
  globalThemeManager = new ThemeManager(options)
  return globalThemeManager
}

/** Vue Composition API Hook - 获取主题变量 */
export function useThemeVars() {
  const theme = useTheme()

  return {
    ...toRefs(theme.state),
    getCssVar: (name: string) => theme.getCssVar(name),
    setCssVar: (name: string, value: string) => theme.setCssVar(name, value)
  }
}

/** 检查颜色对比度是否符合 WCAG 标准 */
export function checkContrast(
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA'
): boolean {
  const ratio = getContrastRatio(foreground, background)
  return level === 'AAA' ? ratio >= 7 : ratio >= 4.5
}

/** 获取合适的文字颜色 */
export function getTextColorForBackground(background: string): string {
  const rgb = hexToRgb(background)
  if (!rgb) return '#000000'

  const luminance = getRelativeLuminance(rgb.r, rgb.g, rgb.b)
  return luminance > 0.5 ? '#000000' : '#ffffff'
}

// ==================== Vue 插件 ====================

export const THEME_INJECTION_KEY: InjectionKey<ThemeManager> = Symbol('theme')

export const ThemePlugin = {
  install(app: App, options?: ThemeOptions) {
    const themeManager = initTheme(options)
    app.config.globalProperties.$theme = themeManager
    app.provide(THEME_INJECTION_KEY, themeManager)
    app.provide('theme', themeManager)
  }
}

export default ThemePlugin

// 导出颜色工具函数
export {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  mixColor,
  adjustSaturation,
  adjustLightness,
  getContrastRatio,
  ensureContrast,
  getRelativeLuminance,
  getComplementaryColor,
  getAnalogousColors,
  getTriadicColors,
  generatePaletteFromPrimary
}

// 类型已在文件顶部定义并自动导出，无需重复导出

// 导出常量
export { presetThemes, breakpoints, densityConfig, colorBlindPalettes }
