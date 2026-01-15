<script setup lang="ts">
/**
 * YhForm - 高性能高度扩展表单组件
 * @description 支持各种布局、校验方式，完美融合组件库
 */
import { provide, reactive, toRefs, ref } from 'vue'
import { formProps, FormContextKey } from './form'
import type { FormContext, FormRules } from './form'
import type { FormItemContext } from './form-item'
import { useNamespace } from '@yh-ui/hooks'

defineOptions({
  name: 'YhForm'
})

const props = defineProps(formProps)
const emit = defineEmits(['validate'])
const ns = useNamespace('form')

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
    fields.splice(fields.indexOf(field), 1)
  }
}

// 验证表单
const validate = async (
  props: string | string[] | ((isValid: boolean, invalidFields?: any) => void) = [],
  callback?: (isValid: boolean, invalidFields?: any) => void
) => {
  // 如果第一个参数是回调函数
  if (typeof props === 'function') {
    callback = props
    props = []
  }

  const propsToValidate = Array.isArray(props)
    ? props
    : (props ? [props as string] : [])

  let isValid = true
  let invalidFields: any = {}

  const fieldsToValidate = propsToValidate.length > 0
    ? fields.filter(field => propsToValidate.includes(field.prop))
    : fields

  if (fieldsToValidate.length === 0 && propsToValidate.length === 0) {
    callback?.(true)
    return true
  }

  for (const field of fieldsToValidate) {
    try {
      await field.validate('')
    } catch (error: any) {
      isValid = false
      if (field.prop) {
        invalidFields[field.prop] = error
      }
    }
  }

  if (context.scrollToError && !isValid) {
    const firstProp = Object.keys(invalidFields)[0]
    scrollToField(firstProp)
  }

  callback?.(isValid, invalidFields)
  emit('validate', isValid, invalidFields)

  if (!isValid) return Promise.reject(invalidFields)
  return true
}

// 重置字段
const resetFields = (props: string | string[] = []) => {
  const propsToReset = Array.isArray(props) ? props : (props ? [props] : [])
  const fieldsToReset = propsToReset.length > 0
    ? fields.filter(field => propsToReset.includes(field.prop))
    : fields
  fieldsToReset.forEach(field => field.resetField())
}

// 清除验证结果
const clearValidate = (props: string | string[] = []) => {
  const fieldsToClear = props.length
    ? fields.filter(field => field.prop && (typeof props === 'string' ? props === field.prop : props.includes(field.prop)))
    : fields

  fieldsToClear.forEach(field => field.clearValidate())
}

// 滚动到指定字段
const scrollToField = (prop: string) => {
  const field = fields.find(f => f.prop === prop)
  if (field) {
    const el = document.querySelector(`[data-prop="${prop}"]`)
    if (el) {
      const options = (typeof context.scrollIntoViewOptions === 'object'
        ? context.scrollIntoViewOptions
        : { behavior: 'smooth', block: 'center' }) as ScrollIntoViewOptions
      el.scrollIntoView(options)
    }
  }
}

// 向子组件提供表单上下文
const context = reactive({
  ...toRefs(props),
  addField,
  removeField
})

provide(FormContextKey, context as any as FormContext)

// 暴露 API
defineExpose({
  validate,
  resetFields,
  clearValidate,
  scrollToField
})
</script>

<template>
  <form :class="[
    ns.b(),
    ns.m(layout),
    ns.m(size),
    ns.m(`label-${labelPosition}`)
  ]" @submit.prevent>
    <slot />
  </form>
</template>
