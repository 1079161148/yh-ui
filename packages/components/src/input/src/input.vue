<script setup lang="ts">
/**
 * YhInput - 输入框组件
 * @description 通过鼠标或键盘输入内容，是最基础的表单域包装
 * Features:
 *   1. Variant  - 视觉变体 (default/filled/borderless/underlined)
 *   2. Loading  - 加载状态
 *   3. Status   - 独立状态色 (success/warning/error)
 *   4. SelectOnFocus - 聚焦自选
 *   5. ClearOnEscape - Esc 清空
 *   6. List / prefix/suffix 字符串 - 原生 datalist + 前后缀字符串
 *   7. CountConfig  - 自定义字数计算
 */
import { computed, ref, watch, nextTick, useSlots, onMounted } from 'vue'
import { useNamespace, useFormItem, useLocale, useConfig } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import type { ComponentThemeVars } from '@yh-ui/theme'
import type { InputProps, InputEmits, InputExpose } from './input'
import { calcTextareaHeight } from './utils'
import type { CSSProperties } from 'vue'

defineOptions({
  name: 'YhInput'
})

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  size: undefined,
  variant: 'default',
  status: '',
  loading: false,
  disabled: false,
  readonly: false,
  clearable: false,
  clearOnEscape: false,
  selectOnFocus: false,
  showPassword: false,
  showWordLimit: false,
  autofocus: false,
  autocomplete: 'off',
  validateEvent: true,
  ariaLabel: undefined,
  label: undefined,
  inputmode: undefined,
  modelModifiers: () => ({}),
  rows: 2
})

const emit = defineEmits<InputEmits>()

const slots = useSlots()

// 命名空间
const ns = useNamespace('input')
const { t } = useLocale()

// 输入框元素引用
const inputRef = ref<HTMLInputElement>()
const textareaRef = ref<HTMLTextAreaElement>()
const wrapperRef = ref<HTMLElement>()

// 表单集成
const { form, formItem, validate: triggerValidate } = useFormItem()

// 组件级 themeOverrides
const { themeStyle } = useComponentTheme('input', computed(() => props.themeOverrides))

// 全局配置
const { globalSize } = useConfig()

// 输入框尺寸
const inputSize = computed(() => props.size || formItem?.size || form?.size || globalSize.value || 'default')

// 内部状态
const focused = ref(false)
const hovering = ref(false)
const isComposing = ref(false)
const passwordVisible = ref(false)
const textareaCalcStyle = ref<CSSProperties>({})

// 计算属性
const inputOrTextarea = computed(() => inputRef.value || textareaRef.value)
const isTextarea = computed(() => props.type === 'textarea')

const nativeInputValue = computed(() => {
  const value = props.modelValue === null || props.modelValue === undefined
    ? ''
    : String(props.modelValue)
  if (props.formatter && !isTextarea.value) {
    return props.formatter(value)
  }
  return value
})

const showClear = computed(() =>
  props.clearable &&
  !props.disabled &&
  !props.readonly &&
  !!nativeInputValue.value &&
  (focused.value || hovering.value)
)

const showPasswordIcon = computed(() =>
  props.showPassword &&
  !props.disabled &&
  !props.readonly &&
  !!nativeInputValue.value
)

// Feature 7: 自定义字数计算
const textLength = computed(() => {
  const value = props.modelValue === null || props.modelValue === undefined
    ? ''
    : String(props.modelValue)
  if (props.countConfig?.calculate) {
    return props.countConfig.calculate(value)
  }
  return value.length
})

const showWordLimitCount = computed(() =>
  props.showWordLimit &&
  !!props.maxlength &&
  (props.type === 'text' || props.type === 'textarea') &&
  !props.disabled &&
  !props.readonly
)

const inputExceed = computed(() =>
  showWordLimitCount.value && textLength.value > Number(props.maxlength)
)

// Feature 2: 加载状态 — 推导 hasSuffix 时应计及 loading
const isLoading = computed(() => props.loading && !props.disabled)

// 插槽检测
const hasPrepend = computed(() => !!slots.prepend)
const hasAppend = computed(() => !!slots.append)
const hasPrefix = computed(() => !!slots.prefix || !!props.prefixIcon || !!props.prefix)
const hasSuffix = computed(() =>
  !!slots.suffix ||
  !!props.suffixIcon ||
  !!props.suffix ||
  showClear.value ||
  showPasswordIcon.value ||
  isLoading.value
)

// Feature 3: 独立 status 计算 + 表单校验状态合并
const mergedStatus = computed(() => {
  if (props.status) return props.status
  if (formItem?.validateStatus === 'error') return 'error'
  if (formItem?.validateStatus === 'success') return 'success'
  return ''
})

// 类名计算
const wrapperClasses = computed(() => [
  ns.b(),
  ns.m(inputSize.value),
  ns.is('disabled', props.disabled),
  ns.is('focused', focused.value),
  ns.is('textarea', isTextarea.value),
  ns.is('exceed', inputExceed.value),
  ns.is('loading', isLoading.value),
  // Feature 1: Variant
  props.variant && props.variant !== 'default' ? ns.m(`variant-${props.variant}`) : '',
  // Feature 3: Status
  mergedStatus.value ? ns.m(`status-${mergedStatus.value}`) : '',
  {
    [ns.b('group')]: hasPrepend.value || hasAppend.value,
    [ns.is('prepend')]: hasPrepend.value,
    [ns.is('append')]: hasAppend.value
  }
])

const wrapperStyle = computed(() => ({
  ...themeStyle.value
}))

const inputClasses = computed(() => [
  ns.e('inner'),
  ns.is('disabled', props.disabled)
])

const textareaStyle = computed(() => {
  return [
    props.inputStyle,
    textareaCalcStyle.value,
    { resize: props.resize }
  ] as CSSProperties[]
})

// 同步原生输入框值
const setNativeInputValue = () => {
  const input = inputOrTextarea.value
  if (!input || input.value === nativeInputValue.value) return
  input.value = nativeInputValue.value
}

// 事件处理
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  let value = target.value

  if (isComposing.value) return

  if (props.parser) {
    value = props.parser(value)
  }

  // v-model 修饰符
  if (props.modelModifiers?.trim) {
    value = value.trim()
  }

  if (props.modelModifiers?.number) {
    const n = parseFloat(value)
    emit('update:modelValue', isNaN(n) ? value : n)
    emit('input', isNaN(n) ? value : n)
  } else {
    emit('update:modelValue', value)
    emit('input', value)
  }
}

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('change', target.value)
  if (props.validateEvent) {
    nextTick(() => {
      triggerValidate('change')
    })
  }
}

const handleFocus = (event: FocusEvent) => {
  focused.value = true
  emit('focus', event)
  // Feature 4: selectOnFocus
  if (props.selectOnFocus) {
    nextTick(() => {
      inputOrTextarea.value?.select()
    })
  }
}

const handleBlur = (event: FocusEvent) => {
  focused.value = false
  emit('blur', event)
  if (props.validateEvent) {
    nextTick(() => {
      triggerValidate('blur')
    })
  }
}

const handleMouseEnter = () => {
  hovering.value = true
}

const handleMouseLeave = () => {
  hovering.value = false
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('change', '')
  emit('clear')
  emit('input', '')
  const input = inputOrTextarea.value
  if (input) {
    input.value = ''
  }
  nextTick(() => {
    focus()
  })
}

// Feature 5: clearOnEscape
const handleKeydown = (event: KeyboardEvent) => {
  if (props.clearOnEscape && event.key === 'Escape' && !props.disabled && !props.readonly) {
    handleClear()
  }
  emit('keydown', event)
}

const handleKeyup = (event: KeyboardEvent) => {
  emit('keyup', event)
}

const handlePasswordToggle = () => {
  passwordVisible.value = !passwordVisible.value
  nextTick(() => {
    focus()
  })
}

const handleCompositionStart = (event: CompositionEvent) => {
  isComposing.value = true
  emit('compositionstart', event)
}

const handleCompositionUpdate = (event: CompositionEvent) => {
  emit('compositionupdate', event)
}

const handleCompositionEnd = (event: CompositionEvent) => {
  if (isComposing.value) {
    isComposing.value = false
    handleInput(event)
  }
  emit('compositionend', event)
}

// 暴露的方法
const focus = () => {
  inputOrTextarea.value?.focus()
}

const blur = () => {
  inputOrTextarea.value?.blur()
}

const select = () => {
  inputOrTextarea.value?.select()
}

const clear = () => {
  handleClear()
}

const resizeTextarea = () => {
  const { type, autosize } = props
  if (type !== 'textarea') return
  if (!autosize) {
    textareaCalcStyle.value = {}
    return
  }
  const minRows = typeof autosize === 'object' ? autosize.minRows : undefined
  const maxRows = typeof autosize === 'object' ? autosize.maxRows : undefined
  const textarea = textareaRef.value
  if (!textarea) return
  const style = calcTextareaHeight(textarea, minRows, maxRows)
  textareaCalcStyle.value = {
    height: style.height,
    minHeight: style.minHeight,
  }
}

watch(
  () => props.modelValue,
  () => {
    nextTick(() => {
      setNativeInputValue()
      resizeTextarea()
    })
  }
)

onMounted(() => {
  setNativeInputValue()
  resizeTextarea()
  if (props.autofocus) {
    focus()
  }
})

// 暴露的属性和方法
defineExpose<InputExpose>({
  ref: inputOrTextarea.value,
  wrapperRef: wrapperRef.value,
  focus,
  blur,
  select,
  clear,
  get textLength() { return textLength.value }
})
</script>

<template>
  <div ref="wrapperRef" :class="wrapperClasses" :style="wrapperStyle" @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave">
    <!-- 前置元素 -->
    <div v-if="hasPrepend" :class="ns.e('prepend')">
      <slot name="prepend" />
    </div>

    <!-- 输入框包装器 -->
    <div :class="ns.e('wrapper')">
      <!-- 前置图标/文本/内容 -->
      <span v-if="hasPrefix" :class="ns.e('prefix')">
        <slot name="prefix">
          <!-- Feature 6: prefix string prop -->
          <span v-if="prefix" :class="ns.e('prefix-text')">{{ prefix }}</span>
          <component v-else-if="prefixIcon && typeof prefixIcon !== 'string'" :is="prefixIcon" :class="ns.e('icon')" />
          <span v-else-if="prefixIcon" :class="ns.e('icon')">{{ prefixIcon }}</span>
        </slot>
      </span>

      <!-- 文本域 -->
      <textarea v-if="isTextarea" ref="textareaRef" :class="inputClasses" :value="nativeInputValue"
        :placeholder="placeholder || t('input.placeholder')" :disabled="disabled" :readonly="readonly"
        :maxlength="maxlength" :minlength="minlength" :rows="rows" :name="name" :id="id" :tabindex="tabindex"
        :autocomplete="autocomplete" :autofocus="autofocus" :aria-label="ariaLabel || label" :inputmode="inputmode"
        :style="textareaStyle" @input="handleInput" @change="handleChange" @focus="handleFocus" @blur="handleBlur"
        @keydown="handleKeydown" @keyup="handleKeyup" @compositionstart="handleCompositionStart"
        @compositionupdate="handleCompositionUpdate" @compositionend="handleCompositionEnd" />

      <!-- 普通输入框 -->
      <input v-else ref="inputRef" :class="inputClasses"
        :type="showPassword ? (passwordVisible ? 'text' : 'password') : type" :value="nativeInputValue"
        :placeholder="placeholder || t('input.placeholder')" :disabled="disabled" :readonly="readonly"
        :maxlength="maxlength" :minlength="minlength" :name="name" :id="id" :tabindex="tabindex" :list="list"
        :autocomplete="autocomplete" :autofocus="autofocus" :style="inputStyle" :aria-label="ariaLabel || label"
        :inputmode="inputmode" :aria-invalid="mergedStatus === 'error'"
        :aria-describedby="mergedStatus === 'error' ? formItem?.errorId : undefined" @input="handleInput"
        @change="handleChange" @focus="handleFocus" @blur="handleBlur" @keydown="handleKeydown" @keyup="handleKeyup"
        @compositionstart="handleCompositionStart" @compositionupdate="handleCompositionUpdate"
        @compositionend="handleCompositionEnd" />

      <!-- 后置图标/文本/内容 -->
      <span v-if="hasSuffix" :class="ns.e('suffix')">
        <!-- Feature 2: 加载状态图标 -->
        <span v-if="isLoading" :class="[ns.e('icon'), ns.e('loading')]">
          <slot name="loadingIcon">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
              class="yh-input__loading-spin">
              <path fill="currentColor"
                d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z" />
            </svg>
          </slot>
        </span>

        <!-- 清空按钮 -->
        <span v-if="showClear && !isLoading" :class="[ns.e('icon'), ns.e('clear')]" @mousedown.prevent
          @click.stop="handleClear">
          <slot name="clearIcon">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em">
              <path fill="currentColor"
                d="m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248L466.752 512zM512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 1 0 0-768 384 384 0 0 0 0 768z" />
            </svg>
          </slot>
        </span>

        <!-- 密码切换按钮 -->
        <span v-if="showPasswordIcon" :class="[ns.e('icon'), ns.e('password')]" @click.stop="handlePasswordToggle">
          <svg v-if="passwordVisible" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="overflow: visible;">
            <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <svg v-else viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" style="overflow: visible;">
            <path
              d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
            <line x1="3" y1="3" x2="21" y2="21" />
          </svg>
        </span>

        <!-- 后置图标/文本插槽 -->
        <slot name="suffix">
          <!-- Feature 6: suffix string prop -->
          <span v-if="suffix" :class="ns.e('suffix-text')">{{ suffix }}</span>
          <component v-else-if="suffixIcon && typeof suffixIcon !== 'string'" :is="suffixIcon" :class="ns.e('icon')" />
          <span v-else-if="suffixIcon" :class="ns.e('icon')">{{ suffixIcon }}</span>
        </slot>
      </span>

      <!-- 字数统计 (输入框内部，仅针对 type=text) -->
      <span v-if="showWordLimitCount && !isTextarea" :class="ns.e('count')">
        {{ textLength }} / {{ maxlength }}
      </span>
    </div>

    <!-- 后置元素 -->
    <div v-if="hasAppend" :class="ns.e('append')">
      <slot name="append" />
    </div>

    <!-- 字数统计 (Textarea 外部右下角) -->
    <span v-if="showWordLimitCount && isTextarea" :class="[ns.e('count'), ns.em('count', 'textarea')]">
      {{ textLength }} / {{ maxlength }}
    </span>
  </div>
</template>

<style lang="scss">
@use './input.scss';
</style>
