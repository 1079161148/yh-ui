export const colorPickerProps = {
  modelValue: {
    type: String,
    default: ""
  },
  /** 是否支持透明度 */
  showAlpha: {
    type: Boolean,
    default: false
  },
  /** 颜色格式 */
  colorFormat: {
    type: String,
    default: "hex"
  },
  /** 尺寸 */
  size: {
    type: String,
    default: "default"
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 预定义颜色 */
  predefine: {
    type: Array,
    default: () => []
  },
  /** 面板类名 */
  popperClass: {
    type: String,
    default: ""
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
export const colorPickerEmits = {
  "update:modelValue": (val) => typeof val === "string",
  change: (val) => typeof val === "string",
  activeChange: (val) => typeof val === "string"
};
