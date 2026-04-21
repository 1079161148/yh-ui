import type { InjectionKey } from 'vue'
export interface FormContext {
  model: Record<string, unknown>
  rules?: Record<string, unknown>
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
  addField: (field: FormItemContext) => void
  removeField: (field: FormItemContext) => void
  themeOverrides?: Record<string, string | undefined>
}
export interface FormItemContext {
  prop: string
  validate: (trigger: string, callback?: (isValid: boolean) => void) => Promise<boolean | unknown>
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
export declare const FormContextKey: InjectionKey<FormContext>
export declare const FormItemContextKey: InjectionKey<FormItemContext>
/**
 * useFormItem - 供组件内部使用的 Hook
 * @description 获取表单项上下文。已优化内部触发校验逻辑，防止 Promise 拒绝导致控制台报错。
 */
export declare const useFormItem: () => {
  form: FormContext | undefined
  formItem: FormItemContext | undefined
  validate: (trigger: string) => Promise<boolean | unknown>
}
export type UseFormItemReturn = ReturnType<typeof useFormItem>
