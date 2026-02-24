/**
 * useFormItem Hook
 * @description 严格类型化的表单上下文注入，已修复校验失败时的控制台报错问题
 */
import { inject } from 'vue'
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
  themeOverrides?: Record<string, unknown>
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

export const FormContextKey: InjectionKey<FormContext> = Symbol('FormContextKey')
export const FormItemContextKey: InjectionKey<FormItemContext> = Symbol('FormItemContextKey')

/**
 * useFormItem - 供组件内部使用的 Hook
 * @description 获取表单项上下文。已优化内部触发校验逻辑，防止 Promise 拒绝导致控制台报错。
 */
export const useFormItem = () => {
  const form = inject(FormContextKey, undefined)
  const formItem = inject(FormItemContextKey, undefined)

  return {
    form,
    formItem,
    // 触发校验
    validate: (trigger: string): Promise<boolean | unknown> => {
      if (formItem) {
        // 内部组件触发的校验直接 catch 掉，防止控制台打印 Uncaught (in promise)
        // 校验结果会通过 FormItem 内部的响应式状态反馈到 UI 上
        return formItem.validate(trigger).catch(() => {
          // 这里的错误已在 FormItem 内部处理，此处仅静默 Promise 链
          return false
        })
      }
      return Promise.resolve(true)
    }
  }
}

export type UseFormItemReturn = ReturnType<typeof useFormItem>
