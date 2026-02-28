<script setup lang="ts">
import { useNamespace, useLocale } from '@yh-ui/hooks'
import { ref, computed, nextTick, watch } from 'vue'
import type { AiSenderProps, AiSenderEmits } from './ai-sender'
import { YhButton } from '../../button'
import { YhIcon } from '../../icon'

defineOptions({
  name: 'YhAiSender'
})

const props = withDefaults(defineProps<AiSenderProps>(), {
  modelValue: '',
  disabled: false,
  loading: false,
  placeholder: 'Send a message...',
  clearable: false,
  showWordLimit: false
})

const emit = defineEmits<AiSenderEmits>()
const ns = useNamespace('ai-sender')
const { t } = useLocale()

const textareaRef = ref<HTMLTextAreaElement>()
const localValue = ref(props.modelValue)
const isFocused = ref(false)

watch(
  () => props.modelValue,
  (val) => {
    localValue.value = val
  }
)

const innerValue = computed({
  get: () => localValue.value,
  set: (val) => {
    localValue.value = val
    emit('update:modelValue', val)
    emit('change', val)
  }
})

const autoResize = () => {
  const el = textareaRef.value
  if (!el) return
  el.style.height = 'auto'
  el.style.height = `${el.scrollHeight}px`
}

const handleInput = (e: Event) => {
  innerValue.value = (e.target as HTMLTextAreaElement).value
  nextTick(autoResize)
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    if (!innerValue.value.trim() || props.loading || props.disabled) {
      e.preventDefault()
    } else {
      e.preventDefault()
      handleSend()
    }
  }
}

const handleSend = () => {
  if (!innerValue.value.trim() || props.loading || props.disabled) return
  emit('send', innerValue.value)
  innerValue.value = ''
  nextTick(() => {
    if (textareaRef.value) {
      textareaRef.value.style.height = 'auto'
    }
  })
}

const handleClear = () => {
  innerValue.value = ''
  emit('clear')
  nextTick(autoResize)
}
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.is('disabled', disabled),
      ns.is('loading', loading),
      ns.is('focused', isFocused)
    ]"
  >
    <div :class="ns.e('input-wrapper')">
      <div v-if="$slots.prefix" :class="ns.e('prefix')">
        <slot name="prefix"></slot>
      </div>
      <div :class="ns.e('textarea-container')">
        <textarea
          ref="textareaRef"
          v-model="innerValue"
          :class="ns.e('textarea')"
          :placeholder="
            placeholder === 'Send a message...' ? t('ai.sender.placeholder') : placeholder
          "
          :disabled="disabled || loading"
          :maxlength="maxLength"
          rows="1"
          @focus="isFocused = true"
          @blur="isFocused = false"
          @input="handleInput"
          @keydown="handleKeyDown"
        ></textarea>
      </div>

      <div :class="ns.e('suffix')">
        <!-- Text limits -->
        <span v-if="showWordLimit && maxLength" :class="ns.e('word-limit')">
          {{ innerValue.length }} / {{ maxLength }}
        </span>
      </div>

      <div :class="ns.e('actions')">
        <slot name="actions"></slot>

        <!-- Clearable button -->
        <YhButton
          v-if="clearable && innerValue.length > 0"
          :class="ns.e('clear-btn')"
          circle
          @click="handleClear"
          :disabled="loading"
        >
          <template #icon>
            <YhIcon name="clean" />
          </template>
        </YhButton>

        <!-- Send button -->
        <slot
          name="submit"
          :disabled="!innerValue.trim() || disabled"
          :loading="loading"
          :submit="handleSend"
        >
          <YhButton
            :type="innerValue.trim() && !disabled && !loading ? 'primary' : 'default'"
            :class="ns.e('send-btn')"
            :disabled="!innerValue.trim() || disabled"
            :loading="loading"
            @click="handleSend"
            circle
          >
            <template #icon>
              <YhIcon name="send-arrow" />
            </template>
          </YhButton>
        </slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use './ai-sender.scss';
</style>
