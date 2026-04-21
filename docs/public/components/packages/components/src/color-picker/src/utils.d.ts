/**
 * Color logic for ColorPicker
 */
export interface HSV {
  h: number
  s: number
  v: number
  a: number
}
export declare const hsvToRgb: (
  h: number,
  s: number,
  v: number
) => {
  r: number
  g: number
  b: number
}
export declare const rgbToHex: (r: number, g: number, b: number) => string
export declare const hexToRgb: (hex: string) => {
  r: number
  g: number
  b: number
}
export declare const rgbToHsv: (
  r: number,
  g: number,
  b: number
) => {
  h: number
  s: number
  v: number
}
export declare const parseColor: (color: string) => {
  h: number
  s: number
  v: number
  a: number
}
export declare const formatColor: (hsv: HSV, format: string) => string
export declare const getLuminance: (r: number, g: number, b: number) => number
export declare const getContrastRatio: (lum1: number, lum2: number) => number
