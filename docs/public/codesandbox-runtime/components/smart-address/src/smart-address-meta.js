const smartAddressProps = {
  /** 当前地址值（支持 v-model） */
  modelValue: {
    type: Object,
    default: () => ({
      name: "",
      phone: "",
      province: "",
      city: "",
      district: "",
      street: "",
      detail: ""
    })
  },
  /** 是否显示姓名字段 */
  showName: {
    type: Boolean,
    default: true
  },
  /** 是否显示电话字段 */
  showPhone: {
    type: Boolean,
    default: true
  },
  /** 是否显示街道字段 */
  showStreet: {
    type: Boolean,
    default: false
  },
  /** 智能识别输入框的 placeholder */
  parsePlaceholder: {
    type: String,
    default: ""
  },
  /** 是否必填（显示星号） */
  required: {
    type: Boolean,
    default: false
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 识别按钮文案 */
  parseButtonText: {
    type: String,
    default: ""
  },
  /** 是否显示智能识别区域 */
  showParser: {
    type: Boolean,
    default: true
  },
  /** 省市区输入模式 */
  regionType: {
    type: String,
    default: "input"
  },
  /** 省市区选项数据源（树形） */
  regionOptions: {
    type: Array,
    default: () => []
  },
  /** 自定义选项的标签字段 */
  labelField: {
    type: String,
    default: "label"
  },
  /** 自定义选项的值字段 */
  valueField: {
    type: String,
    default: "value"
  },
  /** 自定义选项的子级字段 */
  childrenField: {
    type: String,
    default: "children"
  },
  /** 标签位置 */
  labelPlacement: {
    type: String,
    default: "left"
  },
  /** 自定义解析函数 (用于替代内置解析逻辑) */
  parser: {
    type: Function,
    default: null
  },
  /** 主题变量覆盖 */
  themeOverrides: {
    type: Object,
    default: () => ({})
  }
};
const smartAddressEmits = {
  "update:modelValue": (val) => val !== void 0,
  /** 智能识别完成 */
  parsed: (val) => val !== void 0,
  /** 任意字段变化 */
  change: (val) => val !== void 0
};
export {
  smartAddressEmits,
  smartAddressProps
};
