import type { ExtractPropTypes, PropType } from 'vue'
import type { FormRule } from './form'
import { FormItemContextKey } from '@yh-ui/hooks'

export type { FormItemContext } from '@yh-ui/hooks'
export { FormItemContextKey }

/**
 * 校验状态
 */
export type ValidateStatus = 'success' | 'error' | 'validating' | ''

/**
 * FormItem Props 定义
 */
export const formItemProps = {
  /**
   * 对应 model 里的字段名
   */
  prop: {
    type: String,
    default: ''
  },
  /**
   * 标签文本
   */
  label: {
    type: String,
    default: ''
  },
  /**
   * 标签宽度，覆盖 Form 的设置
   */
  labelWidth: {
    type: [String, Number] as PropType<string | number>,
    default: ''
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
    type: [Object, Array] as PropType<FormRule | FormRule[]>,
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
    type: String as PropType<'large' | 'default' | 'small'>,
    default: ''
  },
  /**
   * 校验触发时机
   */
  validateTrigger: {
    type: [String, Array] as PropType<string | string[]>,
    default: ''
  },
  /**
   * 错误信息对齐方式
   */
  errorPosition: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'left'
  },
  /**
   * 是否禁用
   */
  disabled: {
    type: Boolean,
    default: false
  }
} as const

export type FormItemProps = ExtractPropTypes<typeof formItemProps>
