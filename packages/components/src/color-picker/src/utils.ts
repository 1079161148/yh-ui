/**
 * Color logic for ColorPicker
 */

export interface HSV {
  h: number // 0-360
  s: number // 0-100
  v: number // 0-100
  a: number // 0-1
}

export const hsvToRgb = (h: number, s: number, v: number) => {
  s /= 100
  v /= 100
  let r = 0,
    g = 0,
    b = 0
  const i = Math.floor(h / 60)
  const f = h / 60 - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)
  switch (i % 6) {
    case 0:
      r = v
      g = t
      b = p
      break
    case 1:
      r = q
      g = v
      b = p
      break
    case 2:
      r = p
      g = v
      b = t
      break
    case 3:
      r = p
      g = q
      b = v
      break
    case 4:
      r = t
      g = p
      b = v
      break
    case 5:
      r = v
      g = p
      b = q
      break
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  }
}

export const rgbToHex = (r: number, g: number, b: number) => {
  const toHex = (n: number) => n.toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase()
}

export const hexToRgb = (hex: string) => {
  let r = 0,
    g = 0,
    b = 0
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16)
    g = parseInt(hex[2] + hex[2], 16)
    b = parseInt(hex[3] + hex[3], 16)
  } else if (hex.length === 7) {
    r = parseInt(hex.substring(1, 3), 16)
    g = parseInt(hex.substring(3, 5), 16)
    b = parseInt(hex.substring(5, 7), 16)
  }
  return { r, g, b }
}

export const rgbToHsv = (r: number, g: number, b: number) => {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b)
  let h = 0,
    s,
    v = max
  const d = max - min
  s = max === 0 ? 0 : d / max
  if (max !== min) {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100)
  }
}

export const parseColor = (color: string) => {
  if (!color) return { h: 0, s: 100, v: 100, a: 1 }
  if (color.startsWith('#')) {
    const rgb = hexToRgb(color)
    const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b)
    return { ...hsv, a: 1 }
  }
  // Simplified parsing for common formats
  const matchRgba = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
  if (matchRgba) {
    const hsv = rgbToHsv(parseInt(matchRgba[1]), parseInt(matchRgba[2]), parseInt(matchRgba[3]))
    return { ...hsv, a: matchRgba[4] ? parseFloat(matchRgba[4]) : 1 }
  }
  return { h: 0, s: 100, v: 100, a: 1 }
}

export const formatColor = (hsv: HSV, format: string) => {
  const rgb = hsvToRgb(hsv.h, hsv.s, hsv.v)
  if (format === 'hex') return rgbToHex(rgb.r, rgb.g, rgb.b)
  if (format === 'rgb') {
    return hsv.a < 1
      ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${hsv.a})`
      : `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
  }
  return rgbToHex(rgb.r, rgb.g, rgb.b) // fallback
}

export const getLuminance = (r: number, g: number, b: number) => {
  const [lr, lg, lb] = [r, g, b].map((v) => {
    v /= 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb
}

export const getContrastRatio = (lum1: number, lum2: number) => {
  const l1 = Math.max(lum1, lum2)
  const l2 = Math.min(lum1, lum2)
  return (l1 + 0.05) / (l2 + 0.05)
}
