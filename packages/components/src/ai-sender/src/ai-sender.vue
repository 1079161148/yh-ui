<script setup lang="ts">
import { useNamespace, useLocale } from '@yh-ui/hooks'
import { ref, computed, nextTick, watch } from 'vue'
import { aiSenderProps, aiSenderEmits, type AiCommand } from './ai-sender'
import { YhButton } from '../../button'
import { YhIcon } from '../../icon'
import { YhImage } from '../../image'
import { useComponentTheme } from '@yh-ui/theme'

defineOptions({
  name: 'YhAiSender'
})

const props = defineProps(aiSenderProps)
const emit = defineEmits(aiSenderEmits)

const ns = useNamespace('ai-sender')
const { t } = useLocale()

// 主题覆盖
const { themeStyle } = useComponentTheme(
  'ai-sender',
  computed(() => props.themeOverrides)
)

const textareaRef = ref<HTMLTextAreaElement>()
const localValue = ref(props.modelValue)
const isFocused = ref(false)

// Slash Command State
const showCommands = ref(false)
const commandSearch = ref('')
const selectedCommandIndex = ref(0)
const commandPanelRef = ref<HTMLElement>()

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

const filteredCommands = computed(() => {
  if (!commandSearch.value) return props.commands
  const search = commandSearch.value.toLowerCase()
  return props.commands.filter(
    (cmd) => cmd.key.toLowerCase().includes(search) || cmd.label.toLowerCase().includes(search)
  )
})

const autoResize = () => {
  const el = textareaRef.value
  if (!el) return
  el.style.height = 'auto'
  el.style.height = `${el.scrollHeight}px`
}

const handleInput = (e: Event) => {
  const val = (e.target as HTMLTextAreaElement).value
  innerValue.value = val

  // Detect Slash Command
  const cursorPosition = (e.target as HTMLTextAreaElement).selectionStart
  const textBeforeCursor = val.slice(0, cursorPosition)
  const lastSlashIndex = textBeforeCursor.lastIndexOf('/')

  if (lastSlashIndex !== -1) {
    const textAfterSlash = textBeforeCursor.slice(lastSlashIndex + 1)
    // Only show if slash is at start or after space
    if (
      lastSlashIndex === 0 ||
      textBeforeCursor[lastSlashIndex - 1] === ' ' ||
      textBeforeCursor[lastSlashIndex - 1] === '\n'
    ) {
      if (!textAfterSlash.includes(' ')) {
        showCommands.value = true
        commandSearch.value = textAfterSlash
        selectedCommandIndex.value = 0
      } else {
        showCommands.value = false
      }
    } else {
      showCommands.value = false
    }
  } else {
    showCommands.value = false
  }

  nextTick(autoResize)
}

const handleSelectCommand = (command: AiCommand) => {
  const val = innerValue.value
  const cursorPosition = textareaRef.value?.selectionStart || 0
  const textBeforeCursor = val.slice(0, cursorPosition)
  const lastSlashIndex = textBeforeCursor.lastIndexOf('/')

  const textAfterCursor = val.slice(cursorPosition)
  const replacement = command.prompt || `/${command.key} `

  innerValue.value = textBeforeCursor.slice(0, lastSlashIndex) + replacement + textAfterCursor
  showCommands.value = false

  emit('command', command)

  nextTick(() => {
    textareaRef.value?.focus()
    autoResize()
  })
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (showCommands.value && filteredCommands.value.length > 0) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      selectedCommandIndex.value = (selectedCommandIndex.value + 1) % filteredCommands.value.length
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      selectedCommandIndex.value =
        (selectedCommandIndex.value - 1 + filteredCommands.value.length) %
        filteredCommands.value.length
    } else if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault()
      handleSelectCommand(filteredCommands.value[selectedCommandIndex.value])
    } else if (e.key === 'Escape') {
      showCommands.value = false
    }
    return
  }

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

const handleBlur = (e: FocusEvent) => {
  isFocused.value = false
  // Delay closing commands to allow mouse clicks
  setTimeout(() => {
    showCommands.value = false
  }, 200)
  emit('blur', e)
}

const handleFocus = (e: FocusEvent) => {
  isFocused.value = true
  emit('focus', e)
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
    :style="themeStyle"
  >
    <!-- Slash Commands Panel -->
    <Transition name="yh-zoom-in-bottom">
      <div
        v-if="showCommands && filteredCommands.length > 0"
        ref="commandPanelRef"
        :class="ns.e('command-panel')"
      >
        <div
          v-for="(cmd, index) in filteredCommands"
          :key="cmd.key"
          :class="[ns.e('command-item'), ns.is('active', index === selectedCommandIndex)]"
          @click="handleSelectCommand(cmd)"
        >
          <div :class="ns.e('command-icon')">
            <YhIcon :name="cmd.icon || 'sparkles'" />
          </div>
          <div :class="ns.e('command-info')">
            <div :class="ns.e('command-label')">/{{ cmd.key }}</div>
            <div v-if="cmd.description" :class="ns.e('command-desc')">{{ cmd.description }}</div>
          </div>
        </div>
      </div>
    </Transition>

    <div :class="ns.e('input-wrapper')">
      <div v-if="$slots.prefix" :class="ns.e('prefix')">
        <slot name="prefix"></slot>
      </div>

      <!-- Attachments Area -->
      <div v-if="attachments && attachments.length > 0" :class="ns.e('attachments')">
        <div
          v-for="file in attachments"
          :key="file.id"
          :class="[ns.e('attachment-item'), ns.is(file.status || 'success')]"
        >
          <div :class="ns.e('attachment-preview')">
            <template v-if="file.type.startsWith('image/')">
              <YhImage
                :src="file.url"
                :alt="file.name"
                :preview-src-list="file.url ? [file.url] : []"
                preview-teleported
                fit="cover"
              />
            </template>
            <YhIcon v-else :name="'document'" />
          </div>
          <div :class="ns.e('attachment-info')">
            <div :class="ns.e('attachment-name')" :title="file.name">{{ file.name }}</div>
            <div v-if="file.status === 'uploading'" :class="ns.e('attachment-progress')">
              <div
                :class="ns.e('progress-bar')"
                :style="{ width: (file.progress || 0) + '%' }"
              ></div>
            </div>
          </div>
          <button :class="ns.e('attachment-remove')" @click="emit('remove-attachment', file)">
            <YhIcon name="close" />
          </button>
        </div>
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
          @focus="handleFocus"
          @blur="handleBlur"
          @input="handleInput"
          @keydown="handleKeyDown"
        ></textarea>
      </div>

      <div :class="ns.e('suffix')">
        <span v-if="showWordLimit && maxLength" :class="ns.e('word-limit')">
          {{ innerValue.length }} / {{ maxLength }}
        </span>
      </div>

      <div :class="ns.e('actions')">
        <slot name="actions"></slot>

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
