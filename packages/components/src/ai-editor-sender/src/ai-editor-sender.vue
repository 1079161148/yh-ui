<script setup lang="ts">
import { useNamespace } from '@yh-ui/hooks'
import { ref, computed, nextTick, watch } from 'vue'
import { aiEditorSenderProps, type AttachmentItem } from './ai-editor-sender'
import { YhButton } from '../../button'
import { YhIcon } from '../../icon'

defineOptions({
  name: 'YhAiEditorSender'
})

const props = defineProps(aiEditorSenderProps)
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'send', value: string): void
  (e: 'change', value: string): void
  (e: 'remove-attachment', index: number, item: AttachmentItem): void
  (e: 'clear'): void
}>()

const ns = useNamespace('ai-editor-sender')

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

const handleRemoveAttachment = (index: number, item: AttachmentItem) => {
  emit('remove-attachment', index, item)
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
    <!-- Header (Attachments bar) -->
    <div
      v-if="attachments.length > 0 || $slots.header"
      :class="[ns.e('header'), ns.is('empty', attachments.length === 0 && !$slots.header)]"
    >
      <slot name="header">
        <div v-for="(item, index) in attachments" :key="index" :class="ns.e('attachment')">
          <YhIcon :name="item.url ? 'image' : 'document'" :class="ns.e('attachment-icon')" />
          <span>{{ item.name }}</span>
          <YhIcon
            name="close"
            :class="ns.e('attachment-remove')"
            @click="handleRemoveAttachment(index, item)"
          />
        </div>
      </slot>
    </div>

    <!-- Body (Textarea) -->
    <div :class="ns.e('body')">
      <textarea
        ref="textareaRef"
        v-model="innerValue"
        :class="ns.e('textarea')"
        :placeholder="placeholder"
        :disabled="disabled || loading"
        :maxlength="maxLength"
        :rows="rows"
        @focus="isFocused = true"
        @blur="isFocused = false"
        @input="handleInput"
        @keydown="handleKeyDown"
      ></textarea>
    </div>

    <!-- Footer (Toolbar & Actions) -->
    <div :class="ns.e('footer')">
      <!-- Toolbar (Shortcuts) -->
      <div :class="ns.e('toolbar')">
        <slot name="toolbar"></slot>
      </div>

      <!-- Actions -->
      <div :class="ns.e('actions')">
        <span v-if="showWordLimit && maxLength" :class="ns.e('word-limit')">
          {{ innerValue.length }} / {{ maxLength }}
        </span>

        <slot name="actions"></slot>

        <slot
          name="submit"
          :submit="handleSend"
          :disabled="!innerValue.trim() || disabled || loading"
          :loading="loading"
        >
          <YhButton
            :type="innerValue.trim() && !disabled && !loading ? 'primary' : 'default'"
            :class="ns.e('send-btn')"
            :disabled="!innerValue.trim() || disabled"
            :loading="loading"
            circle
            @click="handleSend"
          >
            <template #icon>
              <YhIcon name="send" />
            </template>
          </YhButton>
        </slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use './ai-editor-sender.scss';
</style>
