import { inject } from 'vue'
import type { InjectionKey } from 'vue'

export interface FormContext {
  model: Record<string, any>
  rules?: any
  labelWidth?: string | number
  labelPosition?: string
  labelSuffix?: string
  showMessage?: boolean
  scrollToError?: boolean
  scrollIntoViewOptions?: boolean | ScrollIntoViewOptions
  disabled?: boolean
  size?: string
  statusIcon?: boolean
  layout?: string
  addField: (field: any) => void
  removeField: (field: any) => void
}

export interface FormItemContext {
  prop: string
  validate: (trigger: string, callback?: any) => Promise<any>
  resetField: () => void
  clearValidate: () => void
  validateStatus: string
  validateMessage: string
  label: string
  errorId?: string
  inputId?: string
  size?: string
  disabled?: boolean
}

export const FormContextKey: InjectionKey<FormContext> = Symbol('FormContextKey')
export const FormItemContextKey: InjectionKey<FormItemContext> = Symbol('FormItemContextKey')

/**
 * useFormItem - 供组件内部使用的 Hook
 * @description 获取表单项上下文并提供触发校验的方法
 */
export const useFormItem = () => {
  const form = inject(FormContextKey, undefined)
  const formItem = inject(FormItemContextKey, undefined)

  return {
    form,
    formItem,
    // 触发校验
    validate: (trigger: string) => {
      if (formItem) {
        formItem.validate(trigger)
      }
    }
  }
}
