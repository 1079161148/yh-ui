<script setup lang="ts">
import { useNamespace, useLocale } from '@yh-ui/hooks'
import { computed } from 'vue'
import type { AiBubbleProps } from './ai-bubble'
import { YhAvatar } from '../../avatar'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

defineOptions({
  name: 'YhAiBubble'
})

const props = withDefaults(defineProps<AiBubbleProps>(), {
  content: '',
  markdown: true,
  role: 'assistant',
  shape: 'corner',
  variant: 'filled',
  loading: false,
  typing: false
})

const ns = useNamespace('ai-bubble')
useLocale()

const mdi = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
  highlight: function (str: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
      } catch {}
    }
    return '' // use external default escaping
  }
})

const parsedContent = computed(() => {
  if (props.markdown) {
    // Basic Markdown conversion
    return mdi.render(props.content || '')
  }
  return props.content
})

// Auto placement fallback
const computedPlacement = computed(() => {
  if (props.placement) return props.placement
  return props.role === 'user' ? 'end' : 'start'
})

const classes = computed(() => [
  ns.b(),
  ns.m(props.role),
  ns.m(`placement-${computedPlacement.value}`),
  ns.m(`shape-${props.shape}`),
  ns.m(`variant-${props.variant}`),
  ns.is('loading', props.loading),
  ns.is('typing', props.typing)
])
</script>

<template>
  <div :class="classes">
    <!-- Avatar -->
    <div :class="ns.e('avatar')" v-if="role !== 'system'">
      <slot name="avatar">
        <YhAvatar v-if="avatar" :src="avatar" />
        <YhAvatar v-else>
          <YhIcon :name="role === 'user' ? 'user' : 'robot'" />
        </YhAvatar>
      </slot>
    </div>

    <!-- Content Wrapper -->
    <div :class="ns.e('content-wrapper')">
      <!-- Header -->
      <div :class="ns.e('header')" v-if="$slots.header || time">
        <slot name="header">
          <span v-if="time" :class="ns.e('time')">{{ time }}</span>
        </slot>
      </div>

      <!-- Body -->
      <div :class="ns.e('body')">
        <template v-if="loading && !content">
          <span :class="ns.e('typing-indicator')"> <span></span><span></span><span></span> </span>
        </template>
        <template v-else>
          <slot>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div
              v-if="markdown"
              :class="[ns.e('text'), ns.e('markdown')]"
              v-html="parsedContent"
            ></div>
            <div v-else :class="ns.e('text')">{{ content }}</div>
          </slot>
        </template>
      </div>

      <!-- Footer -->
      <div :class="ns.e('footer')" v-if="$slots.footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use './ai-bubble.scss';
</style>
