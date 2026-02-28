<script setup lang="ts">
import { useNamespace, useLocale } from '@yh-ui/hooks'
import { ref, computed } from 'vue'
import type { AiCodeBlockProps, AiCodeBlockEmits } from './ai-code-block'
import { YhButton } from '../../button'
import { YhIcon } from '../../icon'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

defineOptions({
  name: 'YhAiCodeBlock'
})

const props = withDefaults(defineProps<AiCodeBlockProps>(), {
  language: 'text',
  code: '',
  filename: '',
  highlight: true
})

const emit = defineEmits<AiCodeBlockEmits>()
const ns = useNamespace('ai-code-block')
const { t } = useLocale()
const copied = ref(false)

const highlightedCode = computed(() => {
  if (!props.highlight || !props.code) return props.code
  try {
    if (props.language && hljs.getLanguage(props.language)) {
      return hljs.highlight(props.code, { language: props.language, ignoreIllegals: true }).value
    }
    return hljs.highlightAuto(props.code).value
  } catch (err) {
    console.error('Highlight error:', err)
    return props.code
  }
})

const handleCopy = async () => {
  if (!props.code) return

  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    emit('copy', props.code)
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}
</script>

<template>
  <div :class="ns.b()">
    <div :class="ns.e('header')">
      <span :class="ns.e('lang')">{{ filename || language }}</span>
      <div :class="ns.e('actions')">
        <slot name="actions"></slot>
        <YhButton size="small" text @click="handleCopy">
          <template #icon>
            <YhIcon :name="copied ? 'check' : 'copy'" />
          </template>
          {{ copied ? t('ai.codeBlock.copied') : t('ai.codeBlock.copyCode') }}
        </YhButton>
      </div>
    </div>
    <div :class="ns.e('body')">
      <pre v-if="!$slots.default"><!-- eslint-disable-next-line vue/no-v-html --><code
      :class="['hljs', language ? 'language-' + language : '']" v-html="highlightedCode"></code></pre>
      <pre v-else><code :class="['hljs', language ? 'language-' + language : '']">
      <slot></slot>
    </code></pre>
    </div>
  </div>
</template>

<style lang="scss">
@use './ai-code-block.scss';
</style>
