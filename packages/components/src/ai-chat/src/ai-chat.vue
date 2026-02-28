<script setup lang="ts">
import { useNamespace, useLocale } from '@yh-ui/hooks'
import { ref, watch, nextTick } from 'vue'
import type { AiChatProps, AiChatEmits } from './ai-chat'
import YhAiSender from '../../ai-sender/src/ai-sender.vue'
import YhAiBubble from '../../ai-bubble/src/ai-bubble.vue'
import { YhButton } from '../../button'
import { YhIcon } from '../../icon'

defineOptions({
  name: 'YhAiChat'
})

const props = withDefaults(defineProps<AiChatProps>(), {
  messages: () => [],
  suggestions: () => [],
  loading: false
})

const emit = defineEmits<AiChatEmits>()
const ns = useNamespace('ai-chat')
const { t } = useLocale()

const contentRef = ref<HTMLElement>()

// Auto-scroll logic
const scrollToBottom = () => {
  nextTick(() => {
    if (contentRef.value) {
      contentRef.value.scrollTop = contentRef.value.scrollHeight
    }
  })
}

watch(() => props.messages, scrollToBottom, { deep: true })
watch(() => props.loading, scrollToBottom)

const handleSend = (text: string) => {
  emit('send', text)
}

const handleClear = () => {
  emit('update:messages', [])
  emit('clear')
}
</script>

<template>
  <div :class="ns.b()">
    <!-- Header Tools (optional) -->
    <div :class="ns.e('header')" v-if="$slots.header || props.messages.length > 0">
      <slot name="header">
        <div :class="ns.e('header-tools')">
          <YhButton v-if="props.messages.length > 0" size="small" text @click="handleClear">
            <template #icon>
              <YhIcon name="delete" />
            </template>
            {{ t('common.clear') }}
          </YhButton>
        </div>
      </slot>
    </div>

    <!-- Messages List -->
    <div :class="ns.e('content')" ref="contentRef">
      <div
        v-if="props.messages.length === 0 && props.suggestions.length > 0"
        :class="ns.e('suggestions')"
      >
        <YhButton
          v-for="(suggestion, idx) in props.suggestions"
          :key="idx"
          plain
          round
          @click="handleSend(suggestion)"
        >
          {{ suggestion }}
        </YhButton>
      </div>

      <template v-for="(msg, index) in props.messages" :key="msg.id || index">
        <slot name="message" :message="msg" :index="index">
          <!-- We use the powerful markdown rendering by default on the bubbles inside AiChat -->
          <YhAiBubble
            :content="msg.content"
            :role="msg.role"
            :loading="msg.status === 'loading'"
            :variant="msg.role === 'assistant' ? 'borderless' : 'filled'"
            :time="msg.time"
            :markdown="true"
          />
        </slot>
      </template>

      <!-- Loading Placeholder -->
      <slot
        name="loading"
        v-if="
          props.loading &&
          (!props.messages.length ||
            props.messages[props.messages.length - 1].role !== 'assistant' ||
            props.messages[props.messages.length - 1].status !== 'loading')
        "
      >
        <YhAiBubble role="assistant" loading typing variant="borderless" />
      </slot>
    </div>

    <!-- Footer Input Bar -->
    <div :class="ns.e('footer')">
      <slot name="sender">
        <YhAiSender :loading="props.loading" @send="handleSend" />
      </slot>
    </div>
  </div>
</template>

<style lang="scss">
@use './ai-chat.scss';
</style>
