<script setup lang="ts">
import { useNamespace, useLocale } from '@yh-ui/hooks'
import { ref, computed, watch } from 'vue'
import { aiArtifactsProps, aiArtifactsEmits, type ArtifactVersion } from './ai-artifacts'
import { YhIcon } from '../../icon'
import { YhButton } from '../../button'
import { useComponentTheme } from '@yh-ui/theme'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

defineOptions({
  name: 'YhAiArtifacts'
})

const props = defineProps(aiArtifactsProps)
const emit = defineEmits(aiArtifactsEmits)

const ns = useNamespace('ai-artifacts')
const { t } = useLocale()

// 主题覆盖
const { themeStyle } = useComponentTheme(
  'ai-artifacts',
  computed(() => props.themeOverrides)
)

const internalMode = ref(props.mode)
const currentVersionState = ref<string | number>(props.data?.currentVersion || '')

watch(
  () => props.mode,
  (val) => {
    internalMode.value = val
  }
)

watch(
  () => props.data?.currentVersion,
  (val) => {
    if (val) currentVersionState.value = val
  }
)

const getIcon = (type?: string) => {
  if (type === 'code') return 'code'
  if (type === 'chart') return 'chart-bar'
  if (type === 'canvas') return 'edit'
  if (type === 'sandbox') return 'play'
  if (type === 'diagram') return 'connection'
  return 'document'
}

const currentVersionData = computed(() => {
  if (!props.data || props.data.versions.length === 0) return null
  return (
    props.data.versions.find((v) => v.version === currentVersionState.value) ||
    props.data.versions[0]
  )
})

const handleClose = () => {
  emit('update:visible', false)
  emit('close')
}

const toggleMode = (mode: 'preview' | 'code' | 'inline') => {
  internalMode.value = mode
  emit('update:mode', mode)
}

const selectVersion = (v: ArtifactVersion) => {
  currentVersionState.value = v.version
  emit('version-change', v)
}

const sandboxSrc = computed(() => {
  if (
    !currentVersionData.value ||
    (internalMode.value !== 'preview' && internalMode.value !== 'inline')
  )
    return ''

  const content = currentVersionData.value.content
  if (props.data?.type === 'html' && typeof window !== 'undefined') {
    const blob = new Blob([content], { type: 'text/html' })
    return URL.createObjectURL(blob)
  }

  return ''
})

const highlightedCode = computed(() => {
  const content = currentVersionData.value?.content || ''
  const type = props.data?.type || 'code'

  let lang = 'typescript'
  if (type === 'html') lang = 'xml'
  if (type === 'markdown') lang = 'markdown'
  if (type === 'react' || type === 'vue') lang = 'javascript'

  if (lang && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(content, { language: lang, ignoreIllegals: true }).value
    } catch {
      return content
    }
  }

  return hljs.highlightAuto(content).value
})
</script>

<template>
  <Transition name="yh-slide-right">
    <div
      v-if="visible"
      :class="[ns.b(), ns.m(internalMode)]"
      :style="[{ width: typeof width === 'number' ? width + 'px' : width }, themeStyle]"
    >
      <!-- Header -->
      <div :class="ns.e('header')">
        <div :class="ns.e('title-area')">
          <YhIcon :name="getIcon(data?.type)" />
          <span :class="ns.e('title')">{{ data?.title || 'Artifact' }}</span>
        </div>

        <div :class="ns.e('actions')">
          <div :class="ns.e('tabs')">
            <button
              :class="[ns.e('tab'), ns.is('active', internalMode === 'preview')]"
              @click="toggleMode('preview')"
            >
              {{ t('ai.artifacts.preview') }}
            </button>
            <button
              v-if="data?.type === 'html'"
              :class="[ns.e('tab'), ns.is('active', internalMode === 'inline')]"
              @click="toggleMode('inline')"
            >
              {{ t('ai.artifacts.inline') }}
            </button>
            <button
              :class="[ns.e('tab'), ns.is('active', internalMode === 'code')]"
              @click="toggleMode('code')"
            >
              {{ t('ai.artifacts.code') }}
            </button>
          </div>

          <YhButton text circle @click="handleClose">
            <template #icon>
              <YhIcon name="close" />
            </template>
          </YhButton>
        </div>
      </div>

      <!-- Version Bar -->
      <div v-if="data && data.versions.length > 1" :class="ns.e('version-bar')">
        <div :class="ns.e('version-label')">
          <YhIcon name="history" />
          <span>{{ t('ai.artifacts.versions') }}</span>
        </div>
        <div :class="ns.e('version-list')">
          <div
            v-for="v in data.versions"
            :key="v.version"
            :class="[ns.e('version-item'), ns.is('active', v.version === currentVersionState)]"
            @click="selectVersion(v)"
          >
            v{{ v.version }}
          </div>
        </div>
      </div>

      <!-- Content area -->
      <div :class="ns.e('content')">
        <template v-if="internalMode === 'preview' || internalMode === 'inline'">
          <iframe
            v-if="data?.type === 'html' || data?.type === 'sandbox'"
            :src="sandboxSrc"
            :class="ns.e('sandbox')"
          ></iframe>
          <div v-else-if="data?.type === 'chart'" :class="ns.e('chart-container')">
            <slot name="chart" :data="currentVersionData" :title="data.title">
              <div :class="ns.e('placeholder')">
                <YhIcon name="chart-bar" />
                <p>{{ t('ai.artifacts.renderingChart') }}</p>
              </div>
            </slot>
          </div>
          <div v-else-if="data?.type === 'canvas'" :class="ns.e('canvas-container')">
            <slot name="canvas" :data="currentVersionData">
              <div :class="ns.e('placeholder')">
                <YhIcon name="edit" />
                <p>{{ t('ai.artifacts.renderingCanvas') }}</p>
              </div>
            </slot>
          </div>
          <div v-else :class="ns.e('placeholder')">
            <YhIcon name="sparkles" />
            <p>{{ t('ai.artifacts.rendering') }}</p>
          </div>
        </template>

        <template v-else>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <pre :class="ns.e('code-viewer')"><code v-html="highlightedCode"></code></pre>
        </template>
      </div>

      <!-- Footer Info -->
      <div :class="ns.e('footer')">
        <span v-if="currentVersionData?.timestamp">{{ currentVersionData.timestamp }}</span>
        <span v-if="currentVersionData?.description">{{ currentVersionData.description }}</span>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss">
@use './ai-artifacts.scss';
</style>
