import { FormItemContextKey } from "../../../hooks/index.js";
const formItemProps = {
  /**
   * 对应 model 里的字段名
   */
  prop: {
    type: String,
    default: ""
  },
  /**
   * 标签文本
   */
  label: {
    type: String,
    default: ""
  },
  /**
   * 标签宽度，覆盖 Form 的设置
   */
  labelWidth: {
    type: [String, Number],
    default: ""
  },
  /**
   * 是否必填
   */
  required: {
    type: Boolean,
    default: false
  },
  /**
   * 校验规则，覆盖 Form 的设置
   */
  rules: {
    type: [Object, Array],
    default: () => []
  },
  /**
   * 是否显示校验错误信息
   */
  showMessage: {
    type: Boolean,
    default: true
  },
  /**
   * 尺寸，覆盖 Form 的设置
   */
  size: {
    type: String,
    default: ""
  },
  /**
   * 校验触发时机
   */
  validateTrigger: {
    type: [String, Array],
    default: ""
  },
  /**
   * 错误信息对齐方式
   */
  errorPosition: {
    type: String,
    default: "left"
  },
  /**
   * 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * 表单项校验状态
   */
  validateStatus: {
    type: String,
    default: ""
  },
  /**
   * 自定义错误信息
   */
  error: {
    type: String,
    default: ""
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object,
    default: void 0
  }
};
export {
  FormItemContextKey,
  formItemProps
};
