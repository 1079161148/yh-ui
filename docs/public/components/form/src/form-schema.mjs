export const formSchemaProps = {
  /**
   * 表单数据对象 (v-model)
   */
  modelValue: {
    type: Object,
    required: true
  },
  /**
   * 表单配置列表
   */
  schema: {
    type: Array,
    required: true,
    default: () => []
  },
  /**
   * 透传给 YhForm 的属性
   */
  formProps: {
    type: Object,
    default: () => ({})
  },
  /**
   * 栅格间距（px）
   * @default 20
   */
  gutter: {
    type: Number,
    default: 20
  }
};
