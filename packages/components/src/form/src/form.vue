<script setup lang="ts">
/**
 * YhForm - 高性能高度扩展表单组件
 * @description 支持各种布局、校验方式，完美融合组件库，已实现类型安全
 */
import { provide, reactive, toRefs, computed } from 'vue'
import { formProps, FormContextKey } from './form'
import type { FormContext } from './form'
import type { FormItemContext } from './form-item'
import { useNamespace } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'

defineOptions({
  name: 'YhForm'
})

const props = defineProps(formProps)
const emit = defineEmits<{
  (e: 'validate', isValid: boolean, invalidFields?: Record<string, unknown>): void
}>()
const ns = useNamespace('form')

// 组件级 themeOverrides
const { themeStyle } = useComponentTheme(
  'form',
  computed(() => props.themeOverrides)
)

// 存储所有 FormItem 的实例上下文
const fields: FormItemContext[] = []

// 添加字段
const addField = (field: FormItemContext) => {
  if (field.prop) {
    fields.push(field)
  }
}

// 移除字段
const removeField = (field: FormItemContext) => {
  if (field.prop) {
    const index = fields.indexOf(field)
    if (index > -1) fields.splice(index, 1)
  }
}

/**
 * 验证表单
 * @param props 指定校验的字段，或者作为回调函数
 * @param callback 校验完成后的回调
 */
const validate = async (
  propsToValidateOrCb:
    | string
    | string[]
    | ((isValid: boolean, invalidFields?: Record<string, unknown>) => void) = [],
  callback?: (isValid: boolean, invalidFields?: Record<string, unknown>) => void
): Promise<boolean> => {
  let innerCallback = callback
  let propsToValidate: string | string[] = []

  // 参数归一化
  if (typeof propsToValidateOrCb === 'function') {
    innerCallback = propsToValidateOrCb
    propsToValidate = []
  } else {
    propsToValidate = propsToValidateOrCb
  }

  const propList = Array.isArray(propsToValidate)
    ? propsToValidate
    : propsToValidate
      ? [propsToValidate as string]
      : []

  const fieldsToValidate =
    propList.length > 0 ? fields.filter((field) => propList.includes(field.prop)) : fields

  if (fieldsToValidate.length === 0 && propList.length === 0) {
    innerCallback?.(true)
    return true
  }

  let isValid = true
  const invalidFields: Record<string, unknown> = {}

  for (const field of fieldsToValidate) {
    try {
      await field.validate('')
    } catch (error) {
      isValid = false
      if (field.prop) {
        invalidFields[field.prop] = error
      }
    }
  }

  if (context.scrollToError && !isValid) {
    const firstProp = Object.keys(invalidFields)[0]
    if (firstProp) scrollToField(firstProp)
  }

  innerCallback?.(isValid, invalidFields)
  emit('validate', isValid, invalidFields)

  if (!isValid) {
    // 如果有回调函数，则不 reject 掉这个 Promise，由回调函数处理结果
    // 这是为了防止在使用回调模式时出现 Uncaught (in promise)
    if (innerCallback) {
      return false
    }
    return Promise.reject(invalidFields)
  }
  return true
}

// 重置字段
const resetFields = (props: string | string[] = []) => {
  const propsToReset = Array.isArray(props) ? props : props ? [props] : []
  const fieldsToReset =
    propsToReset.length > 0 ? fields.filter((field) => propsToReset.includes(field.prop)) : fields
  fieldsToReset.forEach((field) => field.resetField())
}

// 清除验证结果
const clearValidate = (props: string | string[] = []) => {
  const propsArray = Array.isArray(props) ? props : props ? [props] : []
  const fieldsToClear =
    propsArray.length > 0
      ? fields.filter(
          (field) =>
            field.prop &&
            (typeof propsArray === 'string'
              ? propsArray === field.prop
              : propsArray.includes(field.prop))
        )
      : fields

  fieldsToClear.forEach((field) => field.clearValidate())
}

// 滚动到指定字段
const scrollToField = (prop: string) => {
  const field = fields.find((f) => f.prop === prop)
  if (field) {
    const el = document.querySelector(`[data-prop="${prop}"]`) as HTMLElement
    if (el) {
      if (props.scrollToErrorOffset) {
        const top = el.getBoundingClientRect().top + window.pageYOffset - props.scrollToErrorOffset
        window.scrollTo({
          top,
          behavior:
            typeof context.scrollIntoViewOptions === 'object'
              ? (context.scrollIntoViewOptions as ScrollIntoViewOptions).behavior
              : 'smooth'
        })
      } else {
        const options = (
          typeof context.scrollIntoViewOptions === 'object'
            ? context.scrollIntoViewOptions
            : { behavior: 'smooth', block: 'center' }
        ) as ScrollIntoViewOptions
        el.scrollIntoView(options)
      }
    }
  }
}

// 向子组件提供表单上下文
const context = reactive({
  ...toRefs(props),
  addField,
  removeField
})

// 使用类型安全的 provide
provide(FormContextKey, context as unknown as FormContext)

// 暴露 API
defineExpose({
  validate,
  resetFields,
  clearValidate,
  scrollToField
})
</script>

<template>
  <form
    :class="[ns.b(), ns.m(layout), ns.m(size), ns.m(`label-${labelPosition}`)]"
    :style="themeStyle"
    @submit.prevent
  >
    <slot />
  </form>
</template>

<style lang="scss">
@use './form.scss';
</style>
