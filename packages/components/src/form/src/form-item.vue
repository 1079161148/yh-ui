<script setup lang="ts">
/**
 * YhFormItem - 表单项组件
 * @description 彻底修复：1. 实时校验反馈失效；2. 控制台报错异常；3. 动画与显示步调不一致
 */
import {
  inject,
  onMounted,
  onBeforeUnmount,
  provide,
  reactive,
  ref,
  computed,
  toRefs
} from 'vue'
import AsyncValidator, { type Rules } from 'async-validator'
import { formItemProps } from './form-item'
import type { ValidateStatus } from './form-item'
import type { FormRule } from './form'
import { FormContextKey, FormItemContextKey, useId } from '@yh-ui/hooks'
import { useNamespace, useLocale } from '@yh-ui/hooks'
import { useConfig } from '../../hooks/use-config'
import { get, set } from '@yh-ui/utils'

defineOptions({
  name: 'YhFormItem'
})

const props = defineProps(formItemProps)
const ns = useNamespace('form-item')
const { t } = useLocale()

// 注入表单上下文
const formContext = inject(FormContextKey, null)

// 全局配置
const { globalSize } = useConfig()

// 生成唯一 ID
const id = useId().value
const labelId = `yh-label-${id}`
const contentId = `yh-content-${id}`
const errorId = `yh-error-${id}`

// 内部状态
const innerValidateStatus = ref<ValidateStatus>('')
const innerValidateMessage = ref('')
const initialValue = ref<unknown>(undefined)

// 最终展现给 UI 的状态
const currentValidateStatus = computed(() => props.validateStatus || innerValidateStatus.value)
const currentValidateMessage = computed(() => props.error || innerValidateMessage.value)

// 合并规则
const itemRules = computed(() => {
  const rules: FormRule[] = []
  if (props.rules) {
    const pRules = Array.isArray(props.rules) ? props.rules : [props.rules]
    rules.push(...(pRules as FormRule[]))
  }
  const formRules = formContext?.rules
  if (formRules && props.prop) {
    const fRules = (formRules as Record<string, FormRule | FormRule[]>)[props.prop]
    if (fRules) {
      const fRulesArray = Array.isArray(fRules) ? fRules : [fRules]
      rules.push(...fRulesArray)
    }
  }
  return rules
})

// 是否必填
const isRequired = computed(() => {
  if (props.required) return true
  return itemRules.value.some(rule => !!rule.required)
})

// 获取当前字段的值（响应式）
const fieldValue = computed(() => {
  const model = formContext?.model
  if (!model || !props.prop) return undefined
  return get(model, props.prop)
})

const labelStyle = computed(() => {
  const width = props.labelWidth || formContext?.labelWidth
  if (width) {
    return { width: typeof width === 'number' ? `${width}px` : width }
  }
  return {}
})

const itemSize = computed(() => props.size || formContext?.size || globalSize.value || 'default')
const isDisabled = computed(() => props.disabled || formContext?.disabled || false)

/**
 * 核心校验算法：已优化错误捕获
 */
const validate = async (trigger: string = '', callback?: (isValid: boolean) => void) => {
  const rules = trigger
    ? itemRules.value.filter(rule => !rule.trigger || (Array.isArray(rule.trigger) ? rule.trigger.includes(trigger as import('./form').FormValidateTrigger) : rule.trigger === trigger))
    : itemRules.value

  if (rules.length === 0) {
    callback?.(true)
    return true
  }

  // 开始校验，清除旧消息
  innerValidateStatus.value = 'validating'

  const descriptor = { [props.prop]: rules } as Rules
  const validator = new AsyncValidator(descriptor)
  const model = { [props.prop]: fieldValue.value }

  return validator.validate(model, { firstFields: true })
    .then(() => {
      innerValidateStatus.value = 'success'
      innerValidateMessage.value = ''
      callback?.(true)
      return true
    })
    .catch((errorData) => {
      innerValidateStatus.value = 'error'

      // 提取错误信息
      const { errors } = errorData || {}
      if (errors && errors.length > 0) {
        innerValidateMessage.value = errors[0].message || t('form.validationFailed')
      } else {
        innerValidateMessage.value = typeof errorData === 'string' ? errorData : t('form.validationFailed')
      }

      callback?.(false)
      // 抛出 Promise 拒绝，供外部 Form 组件聚合
      return Promise.reject(errorData)
    })
}

const resetField = () => {
  innerValidateStatus.value = ''
  innerValidateMessage.value = ''
  const model = formContext?.model
  if (model && props.prop && initialValue.value !== undefined) {
    set(model, props.prop, initialValue.value)
  }
}

const clearValidate = () => {
  innerValidateStatus.value = ''
  innerValidateMessage.value = ''
}

const context = reactive({
  ...toRefs(props),
  validate,
  resetField,
  clearValidate,
  validateStatus: currentValidateStatus,
  validateMessage: currentValidateMessage,
  label: computed(() => props.label),
  disabled: isDisabled,
  size: itemSize,
  errorId,
  inputId: contentId
})

provide(FormItemContextKey, context)

onMounted(() => {
  if (props.prop) {
    formContext?.addField(context)
    if (fieldValue.value !== undefined) {
      try {
        initialValue.value = JSON.parse(JSON.stringify(fieldValue.value))
      } catch (e) {
        initialValue.value = fieldValue.value
      }
    }
  }
})

onBeforeUnmount(() => {
  if (props.prop) {
    formContext?.removeField(context)
  }
})

defineExpose({
  validate,
  resetField,
  clearValidate,
  validateStatus: currentValidateStatus,
  validateMessage: currentValidateMessage,
  size: itemSize
})
</script>

<template>
  <div :class="[
    ns.b(),
    ns.m(itemSize),
    ns.is('error', currentValidateStatus === 'error'),
    ns.is('validating', currentValidateStatus === 'validating'),
    ns.is('success', currentValidateStatus === 'success'),
    ns.is('required', isRequired),
    ns.is('disabled', isDisabled)
  ]" :data-prop="prop">
    <!-- 标签 -->
    <label v-if="label || $slots.label" :id="labelId" :for="contentId" :class="ns.e('label')" :style="labelStyle">
      <slot name="label">{{ label }}{{ formContext?.labelSuffix }}</slot>
    </label>

    <div :class="ns.e('content')" :id="contentId">
      <slot />

      <!-- 状态图标 -->
      <div v-if="formContext?.statusIcon && currentValidateStatus"
        :class="[ns.e('status-icon'), ns.is(currentValidateStatus)]">
        <svg v-if="currentValidateStatus === 'success'" viewBox="0 0 1024 1024" width="16" height="16">
          <path fill="currentColor"
            d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.32l-114.944-114.88a32 32 0 1 0-45.248 45.248l137.536 137.472a32 32 0 0 0 45.248 0l310.4-310.272a32 32 0 1 0-45.248-45.248L456.192 600.32z" />
        </svg>
        <svg v-else-if="currentValidateStatus === 'error'" viewBox="0 0 1024 1024" width="16" height="16">
          <path fill="currentColor"
            d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z" />
        </svg>
      </div>

      <!-- 校验提示 - 确保即使没有点击提交，通过触发 blur/change 也能即时显示 -->
      <Transition name="yh-fade">
        <div v-if="currentValidateStatus === 'error' && showMessage && (formContext?.showMessage ?? true)" :id="errorId"
          :class="[ns.e('error'), ns.is(errorPosition)]" role="alert" aria-live="polite">
          {{ currentValidateMessage }}
        </div>
      </Transition>
    </div>
  </div>
</template>

<style lang="scss">
@use './form.scss';
</style>
