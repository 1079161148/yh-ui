<script setup lang="ts">
import { useNamespace, useLocale } from '@yh-ui/hooks'
import { computed, ref, useSlots } from 'vue'
import { aiMentionProps, aiMentionEmits, type AiMentionOption } from './ai-mention'
import { YhMention } from '../../mention'
import { YhIcon } from '../../icon'
import { useComponentTheme } from '@yh-ui/theme'

defineOptions({
  name: 'YhAiMention'
})

const props = defineProps(aiMentionProps)
const emit = defineEmits(aiMentionEmits)
const slots = useSlots()

const ns = useNamespace('ai-mention')
const { t } = useLocale()
const { themeStyle } = useComponentTheme('ai-mention', props.themeOverrides)

const mentionRef = ref<InstanceType<typeof YhMention> | null>(null)

const filteredOptions = computed(() => {
  if (!props.types || props.types.length === 0) return props.options
  return props.options.filter((option) => !option.type || props.types.includes(option.type))
})

const handleUpdateValue = (val: string) => {
  emit('update:modelValue', val)
}

const handleSelect = (option: AiMentionOption, trigger: string) => {
  emit('select', option, trigger)
}

const handleSearch = (keyword: string, trigger: string) => {
  emit('search', keyword, trigger)
}

const getIcon = (type?: string) => {
  switch (type) {
    case 'agent':
      return 'robot'
    case 'document':
      return 'document'
    case 'table':
      return 'table'
    case 'knowledge':
      return 'book'
    default:
      return 'sparkles'
  }
}

defineExpose({
  focus: () => mentionRef.value?.focus(),
  blur: () => mentionRef.value?.blur(),
  clear: () => mentionRef.value?.clear(),
  getRef: () => mentionRef.value?.ref,
  insertMention: (option: AiMentionOption, trigger?: string) =>
    mentionRef.value?.insertMention(option, trigger)
})
</script>

<template>
  <div :class="ns.b()" :style="themeStyle">
    <YhMention
      ref="mentionRef"
      v-bind="$attrs"
      :model-value="modelValue"
      :options="filteredOptions"
      :triggers="triggers"
      :type="type"
      :placeholder="placeholder || t('ai.mention.placeholder') || '@ 呼叫 Agent、文档或表格...'"
      :disabled="disabled"
      :size="size"
      :loading="loading"
      :filter-option="filterOption"
      :maxlength="maxLength"
      :rows="rows"
      @update:model-value="handleUpdateValue"
      @select="handleSelect"
      @search="handleSearch"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
      @input="emit('input', $event)"
      @keydown="emit('keydown', $event)"
    >
      <!-- 自定义选项渲染 -->
      <template #option="{ option }: { option: AiMentionOption }">
        <div :class="ns.e('option-item')">
          <div :class="[ns.e('option-icon'), option.type ? ns.em('option-icon', option.type) : '']">
            <YhIcon :name="option.icon || getIcon(option.type)" />
          </div>
          <div :class="ns.e('option-info')">
            <div :class="ns.e('option-label')">{{ option.label || option.value }}</div>
            <div v-if="option.description" :class="ns.e('option-desc')">
              {{ option.description }}
            </div>
          </div>
          <div v-if="option.type" :class="[ns.e('option-tag'), ns.em('option-tag', option.type)]">
            {{ t(`ai.mention.${option.type}`) || option.type }}
          </div>
        </div>
      </template>

      <!-- 适配其他插槽 -->
      <template v-for="(_, name) in slots" :key="name" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps"></slot>
      </template>
    </YhMention>
  </div>
</template>

<style lang="scss">
@use './ai-mention.scss';
</style>
