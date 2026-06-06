<template>
  <div :class="[ns.b(), ns.m(layout)]" :style="themeStyle">
    <!-- Title Section -->
    <div v-if="title || $slots.title" :class="ns.e('header')">
      <slot name="title">
        <span :class="ns.e('title')">{{ title }}</span>
      </slot>
    </div>

    <!-- Prompts Grid/List -->
    <div :class="ns.e('list')">
      <div
        v-for="(item, index) in items"
        :key="typeof item === 'string' ? index : item.id || index"
        :class="ns.e('item')"
        @click="handleClick(item)"
      >
        <slot name="item" :item="item" :index="index">
          <div :class="ns.e('item-inner')">
            <span v-if="typeof item === 'object' && item.icon" :class="ns.e('icon')">
              <slot name="icon" :icon="item.icon">
                <i :class="item.icon"></i>
              </slot>
            </span>
            <div :class="ns.e('content')">
              <span :class="ns.e('text')">{{
                typeof item === 'string' ? item : item.content
              }}</span>
              <span
                v-if="typeof item === 'object' && item.description"
                :class="ns.e('description')"
              >
                {{ item.description }}
              </span>
            </div>

            <div :class="ns.e('arrow')">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </div>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNamespace } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import { aiPromptsProps, aiPromptsEmits, type AiPromptItem } from './ai-prompts'

defineOptions({
  name: 'YhAiPrompts'
})

const props = defineProps(aiPromptsProps)
const emit = defineEmits(aiPromptsEmits)

const ns = useNamespace('ai-prompts')
const { themeStyle } = useComponentTheme('ai-prompts', props.themeOverrides)

const handleClick = (item: AiPromptItem | string) => {
  emit('click', item)
}
</script>

<style lang="scss">
@use './ai-prompts.scss';
</style>
