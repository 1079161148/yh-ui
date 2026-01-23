<script setup lang="ts">
/**
 * YhInput - 输入框组件
 * @description 通过鼠标或键盘输入内容，是最基础的表单域包装
 */
import { computed, ref, watch, nextTick, useSlots, onMounted, inject } from 'vue'
import { useNamespace, useFormItem } from '@yh-ui/hooks'
import { useConfig } from '../../hooks/use-config'
import type { InputProps, InputEmits, InputExpose } from './input'
import { calcTextareaHeight } from './utils'
import type { CSSProperties } from 'vue'

defineOptions({
  name: 'YhInput'
})

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  size: undefined,
  disabled: false,
  readonly: false,
  clearable: false,
  showPassword: false,
  showWordLimit: false,
  autofocus: false,
  autocomplete: 'off',
  validateEvent: true,
  rows: 2
})

const emit = defineEmits<InputEmits>()

const slots = useSlots()

// 命名空间
const ns = useNamespace('input')

// 输入框元素引用
const inputRef = ref<HTMLInputElement>()
const textareaRef = ref<HTMLTextAreaElement>()
const wrapperRef = ref<HTMLElement>()

// 表单集成
const { form, formItem, validate: triggerValidate } = useFormItem()

// 全局配置
const { globalSize } = useConfig()

// 输入框尺寸：组件 props > formItem > form > globalConfig
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
  // 应用 formatter
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

const showWordLimitCount = computed(() =>
  props.showWordLimit &&
  !!props.maxlength &&
  (props.type === 'text' || props.type === 'textarea') &&
  !props.disabled &&
  !props.readonly
)

const textLength = computed(() => {
  const value = props.modelValue === null || props.modelValue === undefined
    ? ''
    : String(props.modelValue)
  return value.length
})

const inputExceed = computed(() =>
  showWordLimitCount.value && textLength.value > Number(props.maxlength)
)

// 插槽检测
const hasPrepend = computed(() => !!slots.prepend)
const hasAppend = computed(() => !!slots.append)
const hasPrefix = computed(() => !!slots.prefix || !!props.prefixIcon)
const hasSuffix = computed(() =>
  !!slots.suffix ||
  !!props.suffixIcon ||
  showClear.value ||
  showPasswordIcon.value
)

// 类名计算
const wrapperClasses = computed(() => [
  ns.b(),
  ns.m(inputSize.value),
  ns.is('disabled', props.disabled),
  ns.is('focused', focused.value),
  ns.is('textarea', isTextarea.value),
  ns.is('exceed', inputExceed.value),
  {
    [ns.b('group')]: hasPrepend.value || hasAppend.value,
    [ns.bem('group', '', 'prepend')]: hasPrepend.value,
    [ns.bem('group', '', 'append')]: hasAppend.value
  }
])

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

  // 输入法编辑中不触发
  if (isComposing.value) return

  // 应用 parser
  if (props.parser) {
    value = props.parser(value)
  }

  emit('update:modelValue', value)
  emit('input', value)
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
  // 直接清空原生输入框的值
  const input = inputOrTextarea.value
  if (input) {
    input.value = ''
  }
  // 清空后重新获取焦点
  nextTick(() => {
    focus()
  })
}

const handlePasswordToggle = () => {
  passwordVisible.value = !passwordVisible.value
  nextTick(() => {
    focus()
  })
}

const handleKeydown = (event: KeyboardEvent) => {
  emit('keydown', event)
}

const handleKeyup = (event: KeyboardEvent) => {
  emit('keyup', event)
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

// 监听 modelValue 变化
watch(
  () => props.modelValue,
  () => {
    nextTick(() => {
      setNativeInputValue()
      resizeTextarea()
    })
  }
)

// 挂载时设置初始值
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
  clear
})
</script>

<template>
  <div ref="wrapperRef" :class="wrapperClasses" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <!-- 前置元素 -->
    <div v-if="hasPrepend" :class="ns.e('prepend')">
      <slot name="prepend" />
    </div>

    <!-- 输入框包装器 -->
    <div :class="ns.e('wrapper')">
      <!-- 前置图标/内容 -->
      <span v-if="hasPrefix" :class="ns.e('prefix')">
        <slot name="prefix">
          <component v-if="prefixIcon && typeof prefixIcon !== 'string'" :is="prefixIcon" :class="ns.e('icon')" />
          <span v-else-if="prefixIcon" :class="ns.e('icon')">{{ prefixIcon }}</span>
        </slot>
      </span>

      <!-- 文本域 -->
      <textarea v-if="isTextarea" ref="textareaRef" :class="inputClasses" :value="nativeInputValue"
        :placeholder="placeholder" :disabled="disabled" :readonly="readonly" :maxlength="maxlength"
        :minlength="minlength" :rows="rows" :name="name" :id="id" :tabindex="tabindex" :autocomplete="autocomplete"
        :autofocus="autofocus" :style="textareaStyle" @input="handleInput" @change="handleChange" @focus="handleFocus"
        @blur="handleBlur" @keydown="handleKeydown" @keyup="handleKeyup" @compositionstart="handleCompositionStart"
        @compositionupdate="handleCompositionUpdate" @compositionend="handleCompositionEnd" />

      <!-- 普通输入框 -->
      <input v-else ref="inputRef" :class="inputClasses"
        :type="showPassword ? (passwordVisible ? 'text' : 'password') : type" :value="nativeInputValue"
        :placeholder="placeholder" :disabled="disabled" :readonly="readonly" :maxlength="maxlength"
        :minlength="minlength" :name="name" :id="id" :tabindex="tabindex" :autocomplete="autocomplete"
        :autofocus="autofocus" :aria-invalid="formItem?.validateStatus === 'error'"
        :aria-describedby="formItem?.validateStatus === 'error' ? formItem?.errorId : undefined" @input="handleInput"
        @change="handleChange" @focus="handleFocus" @blur="handleBlur" @keydown="handleKeydown" @keyup="handleKeyup"
        @compositionstart="handleCompositionStart" @compositionupdate="handleCompositionUpdate"
        @compositionend="handleCompositionEnd" />

      <!-- 后置图标/内容 -->
      <span v-if="hasSuffix" :class="ns.e('suffix')">
        <!-- 清空按钮 -->
        <span v-if="showClear" :class="[ns.e('icon'), ns.e('clear')]" @mousedown.prevent @click.stop="handleClear">
          <slot name="clearIcon">
            <component v-if="clearIcon && typeof clearIcon !== 'string'" :is="clearIcon" />
            <svg v-else viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em">
              <path fill="currentColor"
                d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z" />
            </svg>
          </slot>
        </span>

        <!-- 密码切换按钮 -->
        <span v-if="showPasswordIcon" :class="[ns.e('icon'), ns.e('password')]" @click.stop="handlePasswordToggle">
          <!-- View icon (eye open) -->
          <svg v-if="passwordVisible" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em"
            height="1em">
            <path fill="currentColor"
              d="M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352zm0 64c-225.28 0-384.128 233.472-429.056 288 44.928 54.528 203.776 288 429.056 288s384.128-233.472 429.056-288C896.128 457.472 737.28 224 512 224zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448zm0 64a160 160 0 1 0 0 320 160 160 0 0 0 0-320z" />
          </svg>
          <!-- Hide icon (eye closed) -->
          <svg v-else viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em">
            <path fill="currentColor"
              d="M876.8 156.8c0-9.6-3.2-16-9.6-22.4-6.4-6.4-12.8-9.6-22.4-9.6-9.6 0-16 3.2-22.4 9.6L736 220.8c-64-32-137.6-51.2-224-51.2-160 0-288 64-400 192-19.2 22.4-32 38.4-32 54.4s12.8 32 32 54.4c25.6 32 54.4 64 86.4 89.6l-86.4 86.4c-6.4 6.4-9.6 12.8-9.6 22.4s3.2 16 9.6 22.4c6.4 6.4 12.8 9.6 22.4 9.6 9.6 0 16-3.2 22.4-9.6l745.6-745.6c6.4-6.4 9.6-12.8 9.6-22.4zM512 352c35.2 0 67.2 9.6 96 25.6l-96 96c-32 0-57.6 25.6-57.6 57.6l-96 96c-16-28.8-25.6-60.8-25.6-96 0-99.2 80-179.2 179.2-179.2z" />
          </svg>
        </span>

        <!-- 后置图标插槽 -->
        <slot name="suffix">
          <component v-if="suffixIcon && typeof suffixIcon !== 'string'" :is="suffixIcon" :class="ns.e('icon')" />
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
