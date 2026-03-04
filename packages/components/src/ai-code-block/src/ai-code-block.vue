<script setup lang="ts">
import { useNamespace, useLocale } from '@yh-ui/hooks'
import { ref, computed, watch, useSlots, type VNodeChild, type VNode, Comment, Text } from 'vue'
import { YhButton } from '../../button'
import { YhIcon } from '../../icon'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

import { aiCodeBlockProps, aiCodeBlockEmits } from './ai-code-block'
import { useComponentTheme } from '@yh-ui/theme'
import YhAiCodeEditor from '../../ai-code-editor'

defineOptions({
  name: 'YhAiCodeBlock'
})

const props = defineProps(aiCodeBlockProps)
const emit = defineEmits(aiCodeBlockEmits)
const ns = useNamespace('ai-code-block')
const { t } = useLocale()
const { themeStyle } = useComponentTheme('ai-code-block', props.themeOverrides)
const slots = useSlots()

/** 将字面量 \n 转为真实换行，并去掉首尾空白（避免前后多余空格/空行） */
function normalizeCodeLines(code: string): string {
  if (!code) return ''
  return code.replace(/\\n/g, '\n').trim()
}

const copied = ref(false)
const collapsed = ref(props.defaultCollapsed)
const isEditing = ref(false)

function getVNodeText(node: VNodeChild): string {
  if (node == null) return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(getVNodeText).join('')
  // VNode：经过前面的 string/number/Array 判断后，剩余的是 VNode 对象
  const vnode = node as VNode
  if (vnode.type === Comment) return ''
  if (vnode.type === Text) return typeof vnode.children === 'string' ? vnode.children : ''
  const children = vnode.children
  if (typeof children === 'string' || typeof children === 'number') return String(children)
  if (Array.isArray(children)) return children.map(getVNodeText).join('')
  return ''
}

const slotCode = computed(() => {
  const vnodes = slots.default?.() ?? []
  return normalizeCodeLines(vnodes.map(getVNodeText).join(''))
})

const normalizedCode = computed(() => {
  const fromProp = normalizeCodeLines(props.code)
  return fromProp || slotCode.value
})

const editCode = ref(normalizedCode.value)

const lineCount = computed(() => {
  return normalizedCode.value ? normalizedCode.value.split('\n').length : 0
})

const highlightedCodeLines = computed(() => {
  if (!normalizedCode.value) return []

  let html = normalizedCode.value
  try {
    if (props.highlight) {
      if (props.language && hljs.getLanguage(props.language)) {
        html = hljs.highlight(normalizedCode.value, {
          language: props.language,
          ignoreIllegals: true
        }).value
      } else {
        html = hljs.highlightAuto(normalizedCode.value).value
      }
    }
  } catch (err) {
    console.error('Highlight error:', err)
  }

  return html.split('\n').map((line: string, idx: number) => {
    const isHighlighted = props.highlightLines.includes(idx + 1)
    return `<div class="${ns.e('line')} ${isHighlighted ? 'is-active' : ''}">${line === '' ? ' ' : line}</div>`
  })
})

const handleCopy = async () => {
  if (!normalizedCode.value) return
  try {
    await navigator.clipboard.writeText(normalizedCode.value)
    copied.value = true
    emit('copy', normalizedCode.value)
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}

const handleRun = () => {
  emit('run', normalizedCode.value)
}

const handleEdit = () => {
  const code = normalizedCode.value
  editCode.value = code
  isEditing.value = true
  emit('edit', code)
}

const handleSaveEdit = () => {
  emit('update', editCode.value)
  isEditing.value = false
}

const handleCancelEdit = () => {
  editCode.value = normalizedCode.value
  isEditing.value = false
}

watch(normalizedCode, (val: string) => {
  if (!isEditing.value) {
    editCode.value = val
  }
})

const toggleCollapse = () => {
  if (props.collapsible) {
    collapsed.value = !collapsed.value
  }
}
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.is('collapsible', collapsible),
      ns.is('collapsed', collapsed),
      ns.is('editing', isEditing)
    ]"
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
        <YhButton
          v-if="showEdit && !isEditing"
          size="small"
          text
          @click="handleEdit"
          style="margin-right: 8px"
        >
          <template #icon>
            <YhIcon name="edit" />
          </template>
          {{ t('ai.codeBlock.edit') }}
        </YhButton>
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
      <template v-if="isEditing">
        <div :class="ns.e('editor-wrapper')">
          <YhAiCodeEditor
            :initial-value="editCode"
            v-model="editCode"
            :language="language"
            :height="300"
          />
          <div :class="ns.e('editor-actions')">
            <YhButton type="primary" size="small" @click="handleSaveEdit">
              {{ t('ai.codeBlock.save') }}
            </YhButton>
            <YhButton size="small" @click="handleCancelEdit" style="margin-left: 8px">
              {{ t('ai.codeBlock.cancel') }}
            </YhButton>
          </div>
        </div>
      </template>
      <template v-else>
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
      </template>
    </div>
  </div>
</template>

<style lang="scss">
@use './ai-code-block.scss';
</style>
