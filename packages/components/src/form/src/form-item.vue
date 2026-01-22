<script setup lang="ts">
/**
 * YhFormItem - 表单项组件
 * @description 负责展示标签、错误信息，并处理单个字段的校验逻辑
 */
import {
  inject,
  onMounted,
  onBeforeUnmount,
  provide,
  reactive,
  ref,
  computed,
  toRefs,
  nextTick
} from 'vue'
import AsyncValidator from 'async-validator'
import { formItemProps } from './form-item'
import type { ValidateStatus } from './form-item'
import { FormContextKey, FormItemContextKey, useId } from '@yh-ui/hooks'
import { useNamespace } from '@yh-ui/hooks'
import { useConfig } from '../../hooks/use-config'
import { get, set } from '@yh-ui/utils'

defineOptions({
  name: 'YhFormItem'
})

const props = defineProps(formItemProps)
const slots = defineSlots()
const ns = useNamespace('form-item')

// 注入表单上下文
const formContext = inject(FormContextKey, undefined)

// 全局配置
const { globalSize } = useConfig()

// 生成唯一 ID 用于 A11y
const id = useId().value
const labelId = `yh-label-${id}`
const contentId = `yh-content-${id}`
const errorId = `yh-error-${id}`

// 内部状态
const validateStatus = ref<ValidateStatus>('')
const validateMessage = ref('')
const initialValue = ref<any>(undefined)

// 计算最终的规则
const itemRules = computed(() => {
  const rules = props.rules ? (Array.isArray(props.rules) ? props.rules : [props.rules]) : []
  const formRules = formContext?.rules?.[props.prop] || []
  const formRulesArray = Array.isArray(formRules) ? formRules : [formRules]

  return [...rules, ...formRulesArray]
})

// 计算是否必填
const isRequired = computed(() => {
  if (props.required) return true
  return itemRules.value.some(rule => rule.required)
})

// 计算标签样式
const labelStyle = computed(() => {
  const width = props.labelWidth || formContext?.labelWidth
  if (width) {
    return { width: typeof width === 'number' ? `${width}px` : width }
  }
  return {}
})

// 获取对应字段的值
const fieldValue = computed(() => {
  const model = formContext?.model
  if (!model || !props.prop) return undefined
  return get(model, props.prop)
})

// 计算尺寸：优先项配置，后由表单继承，最后使用全局配置
const itemSize = computed(() => props.size || formContext?.size || globalSize.value || 'default')

// 计算禁用状态
const isDisabled = computed(() => props.disabled || formContext?.disabled || false)

// 校验逻辑
const validate = async (trigger: string = '', callback?: (isValid: boolean) => void) => {
  const rules = trigger
    ? itemRules.value.filter(rule => !rule.trigger || (Array.isArray(rule.trigger) ? rule.trigger.includes(trigger as any) : rule.trigger === trigger))
    : itemRules.value

  if (rules.length === 0) {
    callback?.(true)
    return true
  }

  validateStatus.value = 'validating'

  const descriptor = { [props.prop]: rules }
  const validator = new AsyncValidator(descriptor as any)
  const model = { [props.prop]: fieldValue.value }

  return validator.validate(model, { firstFields: true })
    .then(() => {
      validateStatus.value = 'success'
      validateMessage.value = ''
      callback?.(true)
      return true
    })
    .catch(({ errors }) => {
      validateStatus.value = 'error'
      validateMessage.value = errors ? errors[0].message : '校验失败'
      callback?.(false)
      return Promise.reject(errors)
    })
}

// 重置字段
const resetField = () => {
  validateStatus.value = ''
  validateMessage.value = ''

  const model = formContext?.model
  if (model && props.prop && initialValue.value !== undefined) {
    set(model, props.prop, initialValue.value)
  }
}

// 清除校验
const clearValidate = () => {
  validateStatus.value = ''
  validateMessage.value = ''
}

// 提供给子组件的上下文
const context = reactive({
  ...toRefs(props),
  validate,
  resetField,
  clearValidate,
  validateStatus,
  validateMessage,
  label: computed(() => props.label),
  disabled: isDisabled,
  size: itemSize,
  errorId,
  inputId: contentId
})

provide(FormItemContextKey, context as any)

// 生命周期
onMounted(() => {
  if (props.prop) {
    formContext?.addField(context)
    if (fieldValue.value !== undefined) {
      initialValue.value = JSON.parse(JSON.stringify(fieldValue.value))
    }
  }
})

onBeforeUnmount(() => {
  if (props.prop) {
    formContext?.removeField(context)
  }
})

// 暴露 API
defineExpose({
  validate,
  resetField,
  clearValidate,
  validateStatus,
  validateMessage,
  size: itemSize
})
</script>

<template>
  <div :class="[
    ns.b(),
    ns.m(itemSize),
    ns.is('error', validateStatus === 'error'),
    ns.is('validating', validateStatus === 'validating'),
    ns.is('success', validateStatus === 'success'),
    ns.is('required', isRequired),
    ns.is('disabled', isDisabled)
  ]" :data-prop="prop">
    <!-- 标签区域 -->
    <label v-if="label || $slots.label" :id="labelId" :for="contentId" :class="ns.e('label')" :style="labelStyle">
      <slot name="label">{{ label }}{{ formContext?.labelSuffix }}</slot>
    </label>

    <!-- 内容区域 -->
    <div :class="ns.e('content')" :id="contentId">
      <slot />

      <!-- 状态图标 -->
      <div v-if="formContext?.statusIcon && validateStatus" :class="[ns.e('status-icon'), ns.is(validateStatus)]">
        <svg v-if="validateStatus === 'success'" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="16"
          height="16">
          <path fill="currentColor"
            d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.32l-114.944-114.88a32 32 0 1 0-45.248 45.248l137.536 137.472a32 32 0 0 0 45.248 0l310.4-310.272a32 32 0 1 0-45.248-45.248L456.192 600.32z" />
        </svg>
        <svg v-else-if="validateStatus === 'error'" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"
          width="16" height="16">
          <path fill="currentColor"
            d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z" />
        </svg>
        <svg v-else-if="validateStatus === 'validating'" class="is-loading" viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg" width="16" height="16">
          <path fill="currentColor"
            d="M512 64a448 448 0 0 1 448 448 448 448 0 0 1-448 448 448 448 0 0 1-448-448 448 448 0 0 1 448-448zm0 192a256 256 0 1 0 0 512 256 256 0 0 0 0-512z" />
        </svg>
      </div>

      <!-- 错误信息 -->
      <Transition name="fade">
        <div v-if="validateStatus === 'error' && showMessage && (formContext?.showMessage ?? true)" :id="errorId"
          :class="[ns.e('error'), ns.is(errorPosition)]" role="alert" aria-live="polite">
          {{ validateMessage }}
        </div>
      </Transition>
    </div>
  </div>
</template>
