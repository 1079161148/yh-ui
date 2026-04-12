const skuSelectorProps = {
  /** 规格列表 */
  specs: {
    type: Array,
    default: () => []
  },
  /** SKU 列表 */
  skus: {
    type: Array,
    default: () => []
  },
  /** 当前选中的规格值 ID 列表（支持 v-model） */
  modelValue: {
    type: Array,
    default: () => []
  },
  /** 是否开启库存检查，库存为 0 的组合将自动置灰 */
  checkStock: {
    type: Boolean,
    default: true
  },
  /** 整体是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 是否允许点击已选中项来取消选中 */
  allowUnselect: {
    type: Boolean,
    default: true
  },
  /** 规格选项的尺寸 */
  size: {
    type: String,
    default: "default"
  },
  /** 图片规格的图片高度（px） */
  imageSize: {
    type: Number,
    default: 80
  },
  /** 是否显示已选规格的汇总文本，如 "已选：红色/L" */
  showSelectedSummary: {
    type: Boolean,
    default: false
  },
  /** 汇总文本前缀 */
  summaryPrefix: {
    type: String,
    default: "\u5DF2\u9009"
  },
  /** 主题变量覆盖 */
  themeOverrides: {
    type: Object,
    default: () => ({})
  }
};
const skuSelectorEmits = {
  "update:modelValue": (value) => Array.isArray(value),
  /** 每次选中结果变化时触发，sku 为 null 表示未完整选中 */
  change: (_sku, _selectedValues) => true,
  /** 点击某个规格值时触发（无论是否可选） */
  select: (_spec, _value) => true
};
export {
  skuSelectorEmits,
  skuSelectorProps
};
