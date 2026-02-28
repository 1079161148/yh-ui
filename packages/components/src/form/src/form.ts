import type { ExtractPropTypes, PropType } from 'vue'
import { FormContextKey } from '@yh-ui/hooks'

export type { FormContext } from '@yh-ui/hooks'
export { FormContextKey }

/**
 * 表单布局模式
 */
export type FormLayout = 'horizontal' | 'vertical' | 'inline'

/**
 * 标签位置
 */
export type LabelPosition = 'left' | 'right' | 'top'

/**
 * 校验触发时机
 */
export type FormValidateTrigger = 'blur' | 'change'

/**
 * 表单组件尺寸
 */
export type ComponentSize = 'large' | 'default' | 'small'

/**
 * 校验规则接口
 */
export interface FormRule {
  required?: boolean
  message?: string
  trigger?: FormValidateTrigger | FormValidateTrigger[]
  min?: number
  max?: number
  len?: number
  pattern?: RegExp
  validator?: (
    rule: FormRule,
    value: unknown,
    callback: (error?: string | Error) => void
  ) => void | Promise<void>
  type?: string
}

export type FormRules = Record<string, FormRule | FormRule[]>

/**
 * Form Props 定义
 */
export const formProps = {
  /**
   * 表单数据对象
   */
  model: {
    type: Object as PropType<Record<string, unknown>>,
    required: true
  },
  /**
   * 表单验证规则
   */
  rules: {
    type: Object as PropType<FormRules>,
    default: () => ({})
  },
  /**
   * 标签宽度
   */
  labelWidth: {
    type: [String, Number] as PropType<string | number>,
    default: ''
  },
  /**
   * 标签位置
   */
  labelPosition: {
    type: String as PropType<LabelPosition>,
    default: 'right'
  },
  /**
   * 标签后缀
   */
  labelSuffix: {
    type: String,
    default: ''
  },
  /**
   * 是否显示校验错误信息
   */
  showMessage: {
    type: Boolean,
    default: true
  },
  /**
   * 校验由于失败滚动到第一个错误表单项
   */
  scrollToError: {
    type: Boolean,
    default: false
  },
  /**
   * 滚动到错误表单项的配置
   */
  scrollIntoViewOptions: {
    type: [Object, Boolean] as PropType<boolean | ScrollIntoViewOptions>,
    default: false
  },
  /**
   * 是否禁用该表单内所有组件
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * 是否显示必填星号
   */
  hideRequiredAsterisk: {
    type: Boolean,
    default: false
  },
  /**
   * 表单内组件的尺寸
   */
  size: {
    type: String as PropType<ComponentSize>,
    default: 'default'
  },
  /**
   * 是否显示校验图标
   */
  statusIcon: {
    type: Boolean,
    default: false
  },
  /**
   * 布局模式
   */
  layout: {
    type: String as PropType<FormLayout>,
    default: 'horizontal'
  },
  /** 主题覆盖变量 */
  themeOverrides: {
    type: Object as PropType<import('@yh-ui/theme').ComponentThemeVars>,
    default: undefined
  }
} as const

export type FormProps = ExtractPropTypes<typeof formProps>

/**
 * YhForm 组件实例暴露的 API 类型
 */
export interface FormInstance {
  /** 触发校验 */
  validate: (
    props?:
      | string
      | string[]
      | ((isValid: boolean, invalidFields?: Record<string, unknown>) => void),
    callback?: (isValid: boolean, invalidFields?: Record<string, unknown>) => void
  ) => Promise<boolean>
  /** 重置字段 */
  resetFields: (props?: string | string[]) => void
  /** 清除校验结果 */
  clearValidate: (props?: string | string[]) => void
  /** 滚动到指定字段 */
  scrollToField: (prop: string) => void
}
