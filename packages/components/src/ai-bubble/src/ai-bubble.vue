<script setup lang="ts">
import { useNamespace, useLocale } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import { computed, ref, onBeforeUnmount, watchEffect, shallowRef, watch } from 'vue'
import { aiBubbleProps } from './ai-bubble'
import { YhAvatar } from '../../avatar'
import { YhButton } from '../../button'
import { YhIcon } from '../../icon'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

defineOptions({
  name: 'YhAiBubble'
})

const props = defineProps(aiBubbleProps)

const ns = useNamespace('ai-bubble')
const { t } = useLocale()

// 主题覆盖
const { themeStyle } = useComponentTheme(
  'ai-bubble',
  computed(() => props.themeOverrides)
)

// Audio Playback Logic
const playingAsset = ref<string | null>(null)
let audioInstance: HTMLAudioElement | null = null

const handleAudioToggle = (url: string) => {
  if (playingAsset.value === url) {
    audioInstance?.pause()
    playingAsset.value = null
  } else {
    // If playing another audio, stop it first
    if (audioInstance) {
      audioInstance.pause()
    }

    playingAsset.value = url
    audioInstance = new Audio(url)
    audioInstance.play().catch((err) => {
      console.warn('Audio playback failed:', err)
      playingAsset.value = null
    })

    audioInstance.onended = () => {
      playingAsset.value = null
    }
  }
}

const handleDownload = (url: string) => {
  window.open(url, '_blank')
}

const getFileIcon = (url: string = '') => {
  const ext = url.split('.').pop()?.toLowerCase() || ''
  switch (ext) {
    case 'pdf':
      return 'file-pdf'
    case 'xlsx':
    case 'xls':
    case 'csv':
      return 'file-excel'
    case 'doc':
    case 'docx':
      return 'file-word'
    case 'mp4':
    case 'webm':
    case 'mov':
      return 'file-video'
    case 'mp3':
    case 'wav':
    case 'ogg':
      return 'file-audio'
    case 'txt':
    case 'md':
      return 'file-txt'
    default:
      return 'document'
  }
}

const getMarkdownInstance = () => {
  const md = new MarkdownIt({
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

  // 自研引用脚注拦截器插件
  md.inline.ruler.after('text', 'citation', (state, silent) => {
    const start = state.pos
    if (state.src.charCodeAt(start) !== 0x5b /* [ */) return false

    const match = state.src.slice(start).match(/^\[(\d+)\]/)
    if (!match) return false

    if (!silent) {
      const id = match[1]
      let token = state.push('citation_open', 'sup', 1)
      token.attrs = [
        ['class', 'yh-ai-citation'],
        ['data-id', id]
      ]

      token = state.push('text', '', 0)
      token.content = id

      state.push('citation_close', 'sup', -1)
    }

    state.pos += match[0].length
    return true
  })

  return md
}

const mdi = shallowRef<MarkdownIt | null>(null)

watchEffect(() => {
  if (props.markdown && !mdi.value) {
    mdi.value = getMarkdownInstance()
  }
})

onBeforeUnmount(() => {
  if (audioInstance) {
    audioInstance.pause()
    audioInstance = null
  }
  mdi.value = null
})

const parsedContent = ref(props.content)
let renderRafId: number | null = null

watch(
  () => props.content,
  (newContent: string) => {
    // 非 markdown 模式或非打字流式输出状态，直接同步渲染
    if (!props.markdown || !props.typing) {
      if (renderRafId && typeof cancelAnimationFrame !== 'undefined') {
        cancelAnimationFrame(renderRafId)
        renderRafId = null
      }
      parsedContent.value =
        props.markdown && mdi.value ? mdi.value.render(newContent || '') : newContent
      return
    }

    // SSR 环境或没有 requestAnimationFrame 时，直接同步渲染
    if (typeof requestAnimationFrame === 'undefined') {
      parsedContent.value = mdi.value ? mdi.value.render(newContent || '') : newContent
      return
    }

    // 处于流式输出过程，使用 rAF 进行刷新率防抖（保障复杂长文本下不会降帧）
    if (renderRafId) return
    renderRafId = requestAnimationFrame(() => {
      parsedContent.value = mdi.value ? mdi.value.render(newContent || '') : newContent
      renderRafId = null
    })
  },
  { immediate: true }
)

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

// Citations Tooltip Logic
const hoveredCitation = ref<import('./ai-bubble').AiCitation | null>(null)
const citationTooltipStyle = ref({
  top: '0px',
  left: '0px',
  position: 'fixed' as const,
  transform: '',
  zIndex: '9999'
})
let citationHoverTimer: ReturnType<typeof setTimeout> | null = null

const handleCitationHover = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (target && target.classList && target.classList.contains('yh-ai-citation')) {
    const id = target.getAttribute('data-id')
    const citation = props.citations?.find((c) => String(c.id) === id)
    if (citation) {
      if (citationHoverTimer) clearTimeout(citationHoverTimer)
      hoveredCitation.value = citation

      const rect = target.getBoundingClientRect()
      // 定位在脚标元素正上方
      citationTooltipStyle.value = {
        top: `${rect.top - 10}px`,
        left: `${rect.left + rect.width / 2}px`,
        transform: 'translate(-50%, -100%)',
        position: 'fixed',
        zIndex: '9999'
      }
    }
  }
}

const handleCitationLeave = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (target && target.classList && target.classList.contains('yh-ai-citation')) {
    citationHoverTimer = setTimeout(() => {
      hoveredCitation.value = null
    }, 200)
  }
}

const handleTooltipEnter = () => {
  if (citationHoverTimer) clearTimeout(citationHoverTimer)
}

const handleTooltipLeave = () => {
  citationHoverTimer = setTimeout(() => {
    hoveredCitation.value = null
  }, 200)
}
</script>

<template>
  <div :class="classes" :style="themeStyle">
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
          <!-- Multimodal: Images (Above text) -->
          <div
            v-if="multimodal && multimodal.some((m) => m.type === 'image')"
            :class="ns.e('image-grid')"
          >
            <div
              v-for="(img, idx) in multimodal.filter((m) => m.type === 'image')"
              :key="idx"
              :class="ns.e('image-item')"
            >
              <img :src="img.url" :alt="img.title" />
            </div>
          </div>

          <slot>
            <!-- eslint-disable vue/no-v-html -->
            <div
              v-if="markdown"
              :class="[ns.e('text'), ns.e('markdown')]"
              v-html="parsedContent"
              @mouseover="handleCitationHover"
              @mouseout="handleCitationLeave"
            ></div>
            <!-- eslint-enable vue/no-v-html -->
            <div v-else :class="ns.e('text')">{{ content }}</div>
          </slot>

          <!-- Multimodal: Audio/Files (Below text) -->
          <div
            v-if="multimodal && multimodal.some((m) => m.type !== 'image')"
            :class="ns.e('multimodal-assets')"
          >
            <template v-for="(asset, idx) in multimodal" :key="idx">
              <!-- Audio Player -->
              <div
                v-if="asset.type === 'audio'"
                :class="[ns.e('audio-player'), { 'is-active': playingAsset === asset.url }]"
              >
                <YhButton
                  circle
                  size="small"
                  :type="role === 'user' ? 'default' : 'primary'"
                  @click="handleAudioToggle(asset.url)"
                >
                  <template #icon>
                    <YhIcon :name="playingAsset === asset.url ? 'video-pause' : 'video-play'" />
                  </template>
                </YhButton>
                <div :class="[ns.e('audio-waveform'), { 'is-active': playingAsset === asset.url }]">
                  <span v-for="i in 12" :key="i" :style="{ '--delay': i * 0.1 + 's' }"></span>
                </div>
                <span :class="ns.e('audio-duration')">{{ asset.extra?.duration || '0:00' }}</span>
              </div>

              <!-- File/Table Card -->
              <div v-else-if="asset.type === 'file'" :class="ns.e('file-card')">
                <div :class="ns.e('file-icon')">
                  <YhIcon :name="getFileIcon(asset.url)" />
                </div>
                <div :class="ns.e('file-info')">
                  <div :class="ns.e('file-name')">{{ asset.title }}</div>
                  <div :class="ns.e('file-meta')">{{ asset.size }}</div>
                </div>
                <YhButton text circle @click="handleDownload(asset.url)">
                  <template #icon>
                    <YhIcon name="download" />
                  </template>
                </YhButton>
              </div>
            </template>
          </div>

          <!-- Citations -->
          <div v-if="citations && citations.length > 0" :class="ns.e('citations')">
            <div :class="ns.e('citations-title')">
              <YhIcon name="document" />
              <span>{{ t('ai.bubble.citations') || '参考引用' }}</span>
              <span :class="ns.e('citations-count')">{{ citations.length }}</span>
            </div>
            <div :class="ns.e('citations-list')">
              <a
                v-for="(cite, index) in citations"
                :key="index"
                :href="cite.url"
                target="_blank"
                :class="ns.e('citation-item')"
                :title="cite.title"
              >
                <span :class="ns.e('citation-index')">{{ cite.id || index + 1 }}</span>
                <span :class="ns.e('citation-text')">{{ cite.title }}</span>
                <YhIcon v-if="cite.url" name="arrow-right" :class="ns.e('citation-link-icon')" />
              </a>
            </div>
          </div>
        </template>
      </div>

      <!-- Footer -->
      <div :class="ns.e('footer')" v-if="$slots.footer">
        <slot name="footer"></slot>
      </div>
    </div>

    <!-- Floating Citation Tooltip -->
    <Teleport to="body">
      <Transition name="yh-fade-in-scale-up">
        <div
          v-if="hoveredCitation"
          :class="ns.e('citation-tooltip-wrapper')"
          :style="citationTooltipStyle"
          @mouseenter="handleTooltipEnter"
          @mouseleave="handleTooltipLeave"
        >
          <div :class="ns.e('citation-tooltip')">
            <div :class="ns.e('citation-tooltip-header')">
              <YhIcon :name="hoveredCitation.icon || 'document'" />
              <span>{{ hoveredCitation.source || hoveredCitation.title }}</span>
            </div>
            <div :class="ns.e('citation-tooltip-body')">
              <h4>{{ hoveredCitation.title }}</h4>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style lang="scss">
@use './ai-bubble.scss';
</style>
