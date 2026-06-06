<script setup lang="ts">
import { useNamespace } from '@yh-ui/hooks'
import { aiWelcomeProps, aiWelcomeEmits, type AiSuggestion } from './ai-welcome'
import { YhIcon } from '../../icon'
import { useComponentTheme } from '@yh-ui/theme'

defineOptions({
  name: 'YhAiWelcome'
})

const props = defineProps(aiWelcomeProps)
const emit = defineEmits(aiWelcomeEmits)
const ns = useNamespace('ai-welcome')
const { themeStyle } = useComponentTheme('ai-welcome', props.themeOverrides)

const handleSelect = (suggestion: AiSuggestion) => {
  emit('select', suggestion)
}
</script>

<template>
  <div :class="ns.b()" :style="themeStyle">
    <!-- Header -->
    <div :class="ns.e('header')">
      <!-- Icon/Logo Area -->
      <slot name="icon">
        <div v-if="showIcon" :class="ns.e('icon-wrapper')">
          <YhIcon :name="icon" />
        </div>
      </slot>

      <!-- Title -->
      <h1 :class="ns.e('title')">
        <slot name="title">{{ title }}</slot>
      </h1>

      <!-- Description -->
      <p v-if="description || $slots.description" :class="ns.e('description')">
        <slot name="description">{{ description }}</slot>
      </p>
    </div>

    <!-- Suggestions Grid -->
    <div v-if="suggestions && suggestions.length > 0" :class="ns.e('body')">
      <div
        v-for="(item, index) in suggestions"
        :key="index"
        :class="ns.e('card')"
        @click="handleSelect(item)"
      >
        <div v-if="item.icon" :class="ns.e('card-icon')">
          <YhIcon :name="item.icon" />
        </div>
        <div :class="ns.e('card-title')">{{ item.title }}</div>
        <div v-if="item.description" :class="ns.e('card-description')">{{ item.description }}</div>
      </div>
    </div>

    <!-- Extra Content -->
    <div v-if="$slots.default" :class="ns.e('footer')">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
@use './ai-welcome.scss';
</style>
