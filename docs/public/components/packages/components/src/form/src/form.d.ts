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
export declare const formProps: {
  /**
   * 表单数据对象
   */
  readonly model: {
    readonly type: PropType<Record<string, unknown>>
    readonly required: true
  }
  /**
   * 表单验证规则
   */
  readonly rules: {
    readonly type: PropType<FormRules>
    readonly default: () => {}
  }
  /**
   * 标签宽度
   */
  readonly labelWidth: {
    readonly type: PropType<string | number>
    readonly default: ''
  }
  /**
   * 标签位置
   */
  readonly labelPosition: {
    readonly type: PropType<LabelPosition>
    readonly default: 'right'
  }
  /**
   * 标签后缀
   */
  readonly labelSuffix: {
    readonly type: StringConstructor
    readonly default: ''
  }
  /**
   * 是否显示校验错误信息
   */
  readonly showMessage: {
    readonly type: BooleanConstructor
    readonly default: true
  }
  /**
   * 校验由于失败滚动到第一个错误表单项
   */
  readonly scrollToError: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /**
   * 滚动到错误表单项的配置
   */
  readonly scrollIntoViewOptions: {
    readonly type: PropType<boolean | ScrollIntoViewOptions>
    readonly default: false
  }
  /**
   * 滚动到错误表单项时的偏移量 (仅当 scrollToError 为 true 时有效)
   */
  readonly scrollToErrorOffset: {
    readonly type: NumberConstructor
    readonly default: 0
  }
  /**
   * 是否禁用该表单内所有组件
   */
  readonly disabled: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /**
   * 是否显示必填星号
   */
  readonly hideRequiredAsterisk: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /**
   * 表单内组件的尺寸
   */
  readonly size: {
    readonly type: PropType<ComponentSize>
    readonly default: 'default'
  }
  /**
   * 是否显示校验图标
   */
  readonly statusIcon: {
    readonly type: BooleanConstructor
    readonly default: false
  }
  /**
   * 布局模式
   */
  readonly layout: {
    readonly type: PropType<FormLayout>
    readonly default: 'horizontal'
  }
  /** 主题覆盖变量 */
  readonly themeOverrides: {
    readonly type: PropType<import('@yh-ui/theme').ComponentThemeVars>
    readonly default: undefined
  }
}
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
