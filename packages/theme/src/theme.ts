/**
 * YH-UI Theme Configuration
 * 主题配置系统
 * @description 提供主题切换、自定义主题色等功能，严格类型化
 */

import type { App } from 'vue'
import { designTokens } from './tokens'

/** 主题色配置 */
export interface ThemeColors {
  /** 主色 */
  primary?: string
  /** 成功色 */
  success?: string
  /** 警告色 */
  warning?: string
  /** 危险色 */
  danger?: string
  /** 信息色 */
  info?: string
}

/** 预设主题 */
export type PresetTheme = 'default' | 'dark' | 'blue' | 'green' | 'purple' | 'orange'

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
}

/** 预设主题颜色 */
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
    primary: '#13c2c2',
    success: '#52c41a',
    warning: '#faad14',
    danger: '#ff4d4f',
    info: '#909399'
  },
  purple: {
    primary: '#722ed1',
    success: '#52c41a',
    warning: '#faad14',
    danger: '#ff4d4f',
    info: '#909399'
  },
  orange: {
    primary: '#fa8c16',
    success: '#52c41a',
    warning: '#faad14',
    danger: '#ff4d4f',
    info: '#909399'
  }
}

/**
 * 将 HEX 颜色转换为 RGB
 */
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

/**
 * 混合两种颜色
 */
function mixColor(color1: string, color2: string, weight: number): string {
  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)

  if (!rgb1 || !rgb2) return color1

  const w = weight / 100
  const r = Math.round(rgb1.r * w + rgb2.r * (1 - w))
  const g = Math.round(rgb1.g * w + rgb2.g * (1 - w))
  const b = Math.round(rgb1.b * w + rgb2.b * (1 - w))

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

/**
 * 生成颜色渐变系列
 */
function generateColorScale(baseColor: string, isDark: boolean = false): Record<string, string> {
  const white = '#ffffff'
  const black = '#000000'

  if (isDark) {
    return {
      '': baseColor,
      'light-3': mixColor(baseColor, black, 70),
      'light-5': mixColor(baseColor, black, 50),
      'light-7': mixColor(baseColor, black, 30),
      'light-8': mixColor(baseColor, black, 20),
      'light-9': mixColor(baseColor, black, 10),
      'dark-2': mixColor(baseColor, white, 80)
    }
  }

  return {
    '': baseColor,
    'light-1': mixColor(baseColor, white, 90),
    'light-2': mixColor(baseColor, white, 80),
    'light-3': mixColor(baseColor, white, 70),
    'light-4': mixColor(baseColor, white, 60),
    'light-5': mixColor(baseColor, white, 50),
    'light-6': mixColor(baseColor, white, 40),
    'light-7': mixColor(baseColor, white, 30),
    'light-8': mixColor(baseColor, white, 20),
    'light-9': mixColor(baseColor, white, 10),
    'dark-2': mixColor(baseColor, black, 80)
  }
}

/**
 * 设置 CSS 变量
 */
function setCssVar(
  name: string,
  value: string,
  el: HTMLElement | null = typeof document !== 'undefined' ? document.documentElement : null
): void {
  if (el) {
    el.style.setProperty(name, value)
  }
}

/**
 * 移除 CSS 变量
 */
function removeCssVar(
  name: string,
  el: HTMLElement | null = typeof document !== 'undefined' ? document.documentElement : null
): void {
  if (el) {
    el.style.removeProperty(name)
  }
}

/**
 * 获取目标元素
 */
function getTargetElement(scope?: string | HTMLElement): HTMLElement | null {
  if (typeof document === 'undefined') return null
  if (!scope) return document.documentElement
  if (typeof scope === 'string') {
    return document.querySelector(scope)
  }
  return scope
}

/**
 * 主题管理类
 */
export class ThemeManager {
  private currentTheme: PresetTheme = 'default'
  private customColors: ThemeColors = {}
  private isDark: boolean = false
  private targetEl: HTMLElement | null = null

  constructor(options?: ThemeOptions) {
    this.initTheme(options)
  }

  /**
   * 初始化主题
   */
  initTheme(options?: ThemeOptions): void {
    this.apply({
      preset: 'default',
      ...options
    })
    this.applyTokens()
  }

  /**
   * 应用主题
   */
  apply(options: ThemeOptions): void {
    const { preset, colors, dark, scope } = options

    this.targetEl = getTargetElement(scope)

    // 设置暗色模式
    if (dark !== undefined) {
      this.setDarkMode(dark)
    }

    // 应用预设主题
    if (preset) {
      this.setPreset(preset)
    }

    // 应用自定义颜色
    if (colors) {
      this.setColors(colors)
    }
  }

  /**
   * 设置预设主题
   */
  setPreset(preset: PresetTheme): void {
    const colors = presetThemes[preset]
    if (!colors) {
      console.warn(
        `[YH-UI Theme] Invalid preset theme: "${preset}". Available presets: ${Object.keys(presetThemes).join(', ')}`
      )
      return
    }
    this.currentTheme = preset
    this.applyColors(colors)
  }

  /**
   * 设置自定义颜色
   */
  setColors(colors: ThemeColors): void {
    this.customColors = { ...this.customColors, ...colors }
    this.applyColors(colors)
  }

  /**
   * 设置主色
   */
  setPrimaryColor(color: string): void {
    this.setColors({ primary: color })
  }

  /**
   * 设置主题色 (setPrimaryColor 的别名)
   */
  setThemeColor(color: string): void {
    this.setPrimaryColor(color)
  }

  /**
   * 设置预设主题 (setPreset 的别名)
   */
  setThemePreset(preset: PresetTheme): void {
    this.setPreset(preset)
  }

  /**
   * 设置暗色模式
   */
  setDarkMode(dark: boolean): void {
    this.isDark = dark
    if (typeof document === 'undefined') return

    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    // 重新应用当前颜色
    const currentColors = {
      ...presetThemes[this.currentTheme],
      ...this.customColors
    }
    this.applyColors(currentColors)
  }

  /**
   * 切换暗色模式
   */
  toggleDarkMode(): boolean {
    this.setDarkMode(!this.isDark)
    return this.isDark
  }

  /**
   * 获取当前是否暗色模式
   */
  get dark(): boolean {
    return this.isDark
  }

  /**
   * 获取当前主题
   */
  get theme(): PresetTheme {
    return this.currentTheme
  }

  /**
   * 应用颜色到 CSS 变量
   */
  private applyColors(colors: ThemeColors): void {
    const el = this.targetEl || (typeof document !== 'undefined' ? document.documentElement : null)
    if (!el) return

    const styles = this.getThemeStyles(colors)
    Object.entries(styles).forEach(([name, value]) => {
      setCssVar(name, value, el)
    })
  }

  /**
   * 获取当前主题的 CSS 变量对象
   */
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
        const colorScale = generateColorScale(baseColor, this.isDark)
        Object.entries(colorScale).forEach(([suffix, value]) => {
          const varName = suffix ? `--yh-color-${cssVar}-${suffix}` : `--yh-color-${cssVar}`
          styles[varName] = value
        })
      }
    })

    return styles
  }

  /**
   * 应用所有设计令牌到 CSS 变量
   */
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

    // 应用文字颜色
    Object.entries(designTokens.textColors).forEach(([key, value]) => {
      setCssVar(`--yh-text-color-${key}`, value, el)
    })

    // 应用边框颜色
    Object.entries(designTokens.borderColors).forEach(([key, value]) => {
      const name = key === 'DEFAULT' ? '--yh-border-color' : `--yh-border-color-${key}`
      setCssVar(name, value, el)
    })

    // 应用背景颜色
    Object.entries(designTokens.bgColors).forEach(([key, value]) => {
      const name = key === 'DEFAULT' ? '--yh-bg-color' : `--yh-bg-color-${key}`
      setCssVar(name, value, el)
    })

    // 应用圆角
    Object.entries(designTokens.radius).forEach(([key, value]) => {
      setCssVar(`--yh-radius-${key}`, value, el)
    })

    // 应用 z-index
    Object.entries(designTokens.zIndex).forEach(([key, value]) => {
      setCssVar(`--yh-z-index-${key}`, value, el)
    })

    // 特殊处理语义化变量
    setCssVar('--yh-message-bg-color', designTokens.bgColors.overlay, el)
    setCssVar('--yh-message-text-color', designTokens.textColors.primary, el)
  }

  /**
   * 重置为默认主题
   */
  reset(): void {
    if (typeof document === 'undefined') return

    this.currentTheme = 'default'
    this.customColors = {}
    this.isDark = false
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
      'dark-2'
    ]

    colorTypes.forEach((type) => {
      suffixes.forEach((suffix) => {
        const varName = suffix ? `--yh-color-${type}-${suffix}` : `--yh-color-${type}`
        removeCssVar(varName, el)
      })
    })
  }
}

// 全局主题管理器实例
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

/**
 * Vue 插件安装
 */
export const ThemePlugin = {
  install(app: App, options?: ThemeOptions) {
    const themeManager = initTheme(options)
    app.config.globalProperties.$theme = themeManager
    app.provide('theme', themeManager)
  }
}

export default ThemePlugin
