/**
 * 添加单位
 */
export declare const addUnit: (value?: string | number, unit?: string) => string | undefined
/**
 * 移除单位，返回数值
 */
export declare const removeUnit: (value: string) => number
/**
 * 将十六进制颜色转换为 RGB
 */
export declare const hexToRgb: (hex: string) => {
  r: number
  g: number
  b: number
} | null
/**
 * 将 RGB 转换为十六进制颜色
 */
export declare const rgbToHex: (r: number, g: number, b: number) => string
/**
 * 调整颜色亮度
 */
export declare const adjustColorBrightness: (color: string, amount: number) => string
/**
 * 生成颜色的色阶
 */
export declare const generateColorPalette: (
  baseColor: string,
  levels?: number[]
) => Record<number, string>
/**
 * 设置 CSS 变量
 */
export declare const setCssVar: (name: string, value: string, element?: HTMLElement) => void
/**
 * 获取 CSS 变量
 */
export declare const getCssVar: (name: string, element?: HTMLElement) => string
/**
 * 批量设置 CSS 变量
 */
export declare const setCssVars: (vars: Record<string, string>, element?: HTMLElement) => void
