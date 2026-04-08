export const aiThinkingProps = {
  /**
   * @description 思考状态
   */
  status: {
    type: String,
    default: "thinking"
  },
  /**
   * @description 思考标题
   */
  title: String,
  /**
   * @description 思考详情内容
   */
  content: String,
  /**
   * @description 是否展开详情 (v-model)
   */
  modelValue: Boolean,
  /**
   * @description 完成后是否自动收起
   */
  autoCollapse: {
    type: Boolean,
    default: true
  },
  /**
   * @description 样式类名
   */
  className: {
    type: String,
    default: ""
  },
  /**
   * @description 样式类名（语义化）
   */
  classNames: {
    type: Object,
    default: () => ({})
  },
  /**
   * @description 样式对象
   */
  styles: {
    type: Object,
    default: () => ({})
  },
  /**
   * @description 自定义样式
   */
  style: {
    type: Object,
    default: () => ({})
  },
  /**
   * @description 主题覆盖变量
   */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
export const aiThinkingEmits = {
  "update:modelValue": (value) => typeof value === "boolean"
};
