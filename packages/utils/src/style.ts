/**
 * Style utilities
 */
import { isNumeric } from './types'

/**
 * 添加单位
 */
export const addUnit = (value?: string | number, unit = 'px'): string | undefined => {
  if (value === undefined || value === null || value === '') return undefined
  if (isNumeric(value)) {
    return `${value}${unit}`
  }
  return String(value)
}

/**
 * 移除单位，返回数值
 */
export const removeUnit = (value: string): number => {
  return parseFloat(value) || 0
}

/**
 * 将十六进制颜色转换为 RGB
 */
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
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
 * 将 RGB 转换为十六进制颜色
 */
export const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (c: number) => {
    const hex = c.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

/**
 * 调整颜色亮度
 */
export const adjustColorBrightness = (color: string, amount: number): string => {
  const rgb = hexToRgb(color)
  if (!rgb) return color

  const adjust = (value: number) => {
    const newValue = value + amount
    return Math.max(0, Math.min(255, newValue))
  }

  return rgbToHex(adjust(rgb.r), adjust(rgb.g), adjust(rgb.b))
}

/**
 * 生成颜色的色阶
 */
export const generateColorPalette = (
  baseColor: string,
  levels: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]
): Record<number, string> => {
  const palette: Record<number, string> = {}
  const rgb = hexToRgb(baseColor)

  if (!rgb) return palette

  levels.forEach((level) => {
    const factor = (10 - level) / 10
    palette[level] = rgbToHex(
      Math.round(rgb.r + (255 - rgb.r) * factor),
      Math.round(rgb.g + (255 - rgb.g) * factor),
      Math.round(rgb.b + (255 - rgb.b) * factor)
    )
  })

  return palette
}

/**
 * 设置 CSS 变量
 */
export const setCssVar = (
  name: string,
  value: string,
  element: HTMLElement = document.documentElement
): void => {
  element.style.setProperty(name, value)
}

/**
 * 获取 CSS 变量
 */
export const getCssVar = (
  name: string,
  element: HTMLElement = document.documentElement
): string => {
  return getComputedStyle(element).getPropertyValue(name).trim()
}

/**
 * 批量设置 CSS 变量
 */
export const setCssVars = (
  vars: Record<string, string>,
  element: HTMLElement = document.documentElement
): void => {
  Object.entries(vars).forEach(([name, value]) => {
    setCssVar(name, value, element)
  })
}
