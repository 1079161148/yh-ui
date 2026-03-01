<script setup lang="ts">
import { useNamespace, useLocale } from '@yh-ui/hooks'
import { ref, computed } from 'vue'
import { YhButton } from '../../button'
import { YhIcon } from '../../icon'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

import { aiCodeBlockProps, aiCodeBlockEmits } from './ai-code-block'
import { useComponentTheme } from '@yh-ui/theme'

defineOptions({
  name: 'YhAiCodeBlock'
})

const props = defineProps(aiCodeBlockProps)
const emit = defineEmits(aiCodeBlockEmits)
const ns = useNamespace('ai-code-block')
const { t } = useLocale()
const { themeStyle } = useComponentTheme('ai-code-block', props.themeOverrides)

const copied = ref(false)
const collapsed = ref(props.defaultCollapsed)

const lineCount = computed(() => {
  return props.code ? props.code.split('\n').length : 0
})

const highlightedCodeLines = computed(() => {
  if (!props.code) return []

  let html = props.code
  try {
    if (props.highlight) {
      if (props.language && hljs.getLanguage(props.language)) {
        html = hljs.highlight(props.code, { language: props.language, ignoreIllegals: true }).value
      } else {
        html = hljs.highlightAuto(props.code).value
      }
    }
  } catch (err) {
    console.error('Highlight error:', err)
  }

  // Wrap lines with div to support line highlighting
  return html.split('\n').map((line, idx) => {
    const isHighlighted = props.highlightLines.includes(idx + 1)
    return `<div class="${ns.e('line')} ${isHighlighted ? 'is-active' : ''}">${line === '' ? ' ' : line}</div>`
  })
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

const handleRun = () => {
  emit('run', props.code)
}

const toggleCollapse = () => {
  if (props.collapsible) {
    collapsed.value = !collapsed.value
  }
}
</script>

<template>
  <div
    :class="[ns.b(), ns.is('collapsible', collapsible), ns.is('collapsed', collapsed)]"
    :style="themeStyle"
  >
    <div :class="ns.e('header')" @click="toggleCollapse">
      <div :class="ns.e('header-left')">
        <YhIcon
          v-if="collapsible"
          :name="collapsed ? 'arrow-right' : 'arrow-down'"
          :class="ns.e('collapse-icon')"
        />
        <span :class="ns.e('lang')">{{ filename || language }}</span>
      </div>
      <div :class="ns.e('actions')" @click.stop>
        <slot name="actions"></slot>
        <YhButton v-if="showRun" size="small" text @click="handleRun" style="margin-right: 8px">
          <template #icon>
            <YhIcon name="video-play" />
          </template>
          {{ t('ai.codeBlock.run') }}
        </YhButton>
        <YhButton size="small" text @click="handleCopy">
          <template #icon>
            <YhIcon :name="copied ? 'check' : 'copy'" />
          </template>
          {{ copied ? t('ai.codeBlock.copied') : t('ai.codeBlock.copyCode') }}
        </YhButton>
      </div>
    </div>
    <div :class="ns.e('body')" v-show="!collapsed">
      <div v-if="showLineNumbers" :class="ns.e('line-numbers')">
        <span
          v-for="n in lineCount"
          :key="n"
          :class="[ns.e('line-number'), ns.is('active', highlightLines.includes(n))]"
        >
          {{ n }}
        </span>
      </div>
      <div :class="ns.e('content')">
        <pre v-if="!$slots.default"><!-- eslint-disable-next-line vue/no-v-html --><code
        :class="['hljs', language ? 'language-' + language : '']" v-html="highlightedCodeLines.join('\n')"></code></pre>
        <pre v-else><code :class="['hljs', language ? 'language-' + language : '']">
        <slot></slot>
      </code></pre>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use './ai-code-block.scss';
</style>
