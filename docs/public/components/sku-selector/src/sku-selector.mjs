export const skuSelectorProps = {
  specs: {
    type: Array,
    default: () => []
  },
  skus: {
    type: Array,
    default: () => []
  },
  modelValue: {
    type: Array,
    default: () => []
  },
  checkStock: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  allowUnselect: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: "default"
  },
  imageSize: {
    type: Number,
    default: 80
  },
  showSelectedSummary: {
    type: Boolean,
    default: false
  },
  summaryPrefix: {
    type: String,
    default: ""
  },
  themeOverrides: {
    type: Object,
    default: () => ({})
  }
};
export const skuSelectorEmits = {
  "update:modelValue": (value) => Array.isArray(value),
  change: (_sku, _selectedValues) => true,
  select: (_spec, _value) => true
};
