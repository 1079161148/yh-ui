import { isNumeric } from "./types.js";
const addUnit = (value, unit = "px") => {
  if (value === void 0 || value === null || value === "") return void 0;
  if (isNumeric(value)) {
    return `${value}${unit}`;
  }
  return String(value);
};
const removeUnit = (value) => {
  return parseFloat(value) || 0;
};
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};
const rgbToHex = (r, g, b) => {
  const toHex = (c) => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};
const adjustColorBrightness = (color, amount) => {
  const rgb = hexToRgb(color);
  if (!rgb) return color;
  const adjust = (value) => {
    const newValue = value + amount;
    return Math.max(0, Math.min(255, newValue));
  };
  return rgbToHex(adjust(rgb.r), adjust(rgb.g), adjust(rgb.b));
};
const generateColorPalette = (baseColor, levels = [1, 2, 3, 4, 5, 6, 7, 8, 9]) => {
  const palette = {};
  const rgb = hexToRgb(baseColor);
  if (!rgb) return palette;
  levels.forEach((level) => {
    const factor = (10 - level) / 10;
    palette[level] = rgbToHex(
      Math.round(rgb.r + (255 - rgb.r) * factor),
      Math.round(rgb.g + (255 - rgb.g) * factor),
      Math.round(rgb.b + (255 - rgb.b) * factor)
    );
  });
  return palette;
};
const setCssVar = (name, value, element = document.documentElement) => {
  element.style.setProperty(name, value);
};
const getCssVar = (name, element = document.documentElement) => {
  return getComputedStyle(element).getPropertyValue(name).trim();
};
const setCssVars = (vars, element = document.documentElement) => {
  Object.entries(vars).forEach(([name, value]) => {
    setCssVar(name, value, element);
  });
};
export {
  addUnit,
  adjustColorBrightness,
  generateColorPalette,
  getCssVar,
  hexToRgb,
  removeUnit,
  rgbToHex,
  setCssVar,
  setCssVars
};
