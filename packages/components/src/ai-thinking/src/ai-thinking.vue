<script setup lang="ts">
import { useNamespace, useLocale } from '@yh-ui/hooks'
import { computed, watch } from 'vue'
import type { AiThinkingProps, AiThinkingEmits } from './ai-thinking'
import { YhIcon } from '../../icon'

defineOptions({
  name: 'YhAiThinking'
})

const props = withDefaults(defineProps<AiThinkingProps>(), {
  status: 'thinking',
  title: '',
  content: '',
  modelValue: false,
  autoCollapse: false
})

const emit = defineEmits<AiThinkingEmits>()
const ns = useNamespace('ai-thinking')
const { t } = useLocale()

const isExpanded = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const displayTitle = computed(() => {
  if (props.title) return props.title
  switch (props.status) {
    case 'start':
      return t('ai.thinking.start') || '开始思考'
    case 'thinking':
      return t('ai.thinking.thinking') || '思考中...'
    case 'end':
      return t('ai.thinking.complete') || '已完成思考'
    case 'error':
      return t('ai.thinking.error') || '思考出错了'
    default:
      return t('ai.thinking.thinking') || '思考中...'
  }
})

const statusIcon = computed(() => {
  switch (props.status) {
    case 'start':
      return 'loading'
    case 'thinking':
      return 'loading'
    case 'end':
      return 'check-circle'
    case 'error':
      return 'circle-close'
    default:
      return 'loading'
  }
})

watch(
  () => props.status,
  (newStatus) => {
    if (props.autoCollapse && newStatus === 'end') {
      isExpanded.value = false
    }
  }
)

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <div :class="[ns.b(), ns.m(status), ns.is('expanded', isExpanded)]">
    <div :class="ns.e('header')" @click="toggleExpand">
      <div :class="ns.e('icon-wrapper')">
        <YhIcon
          :name="statusIcon"
          :class="[
            ns.e('status-icon'),
            { 'is-loading': status === 'thinking' || status === 'start' }
          ]"
        />
      </div>
      <div :class="ns.e('title')">{{ displayTitle }}</div>
      <YhIcon name="arrow-down" :class="[ns.e('arrow'), { 'is-expanded': isExpanded }]" />
    </div>

    <div v-show="isExpanded && ($slots.default || content)" :class="ns.e('body')">
      <div :class="ns.e('content')">
        <slot>{{ content }}</slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use './ai-thinking.scss';
</style>
