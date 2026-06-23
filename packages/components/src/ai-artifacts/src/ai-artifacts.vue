<script setup lang="ts">
import { useNamespace, useLocale } from '@yh-ui/hooks'
import {
  ref,
  computed,
  watch,
  onBeforeUnmount,
  nextTick,
  shallowRef,
  onMounted,
  inject,
  useSlots
} from 'vue'
import {
  aiArtifactsProps,
  aiArtifactsEmits,
  type ArtifactVersion,
  type ArtifactEChartsOption
} from './ai-artifacts'
import {
  createSandboxHtml,
  DEFAULT_SANDBOX_YH_UI_URL,
  DEFAULT_SANDBOX_YH_UI_CSS_URL
} from './sandbox-renderer'
import { YhIcon } from '../../icon'
import { YhButton } from '../../button'
import { YhSpin } from '../../spin'
import { useComponentTheme } from '@yh-ui/theme'
import hljs, { loadHighlightStyle } from '../../highlight'
import { sanitizeHighlightedHtml } from '../../sanitize'

defineOptions({
  name: 'YhAiArtifacts'
})

const props = defineProps(aiArtifactsProps)
const emit = defineEmits(aiArtifactsEmits)

const ns = useNamespace('ai-artifacts')
const { t } = useLocale()
const slots = useSlots()

// 主题覆盖
const { themeStyle } = useComponentTheme(
  'ai-artifacts',
  computed(() => props.themeOverrides)
)

const internalMode = ref(props.mode)
const currentVersionState = ref<string | number>(props.data?.currentVersion || '')

const isPreviewable = computed(() => {
  if (!props.data?.type) return false
  const type = props.data.type
  if (slots[type]) return true
  const previewableTypes = [
    'html',
    'sandbox',
    'echarts',
    'chart',
    'canvas',
    'image',
    'video',
    'audio',
    'pdf',
    'iframe',
    'vue'
  ]
  return previewableTypes.includes(type)
})

const activeMode = computed(() => {
  if (internalMode.value === 'preview' && !isPreviewable.value) {
    return 'code'
  }
  return internalMode.value
})

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

// ECharts 类型定义
interface EChartsInstance {
  setOption: (option: Record<string, unknown>) => void
  on: (event: string, handler: (params: unknown) => void) => void
  resize: () => void
  dispose: () => void
}

interface EChartsCore {
  init: (el: HTMLElement, theme?: string) => EChartsInstance
}

// ECharts 相关
const echartsRef = ref<HTMLElement | null>(null)
const echartsInstance = shallowRef<EChartsInstance | null>(null)
const echartsLoading = ref(false)
const echartsError = ref<Error | null>(null)
let chartResizeObserver: ResizeObserver | null = null

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
  if (type === 'chart' || type === 'echarts') return 'chart-bar'
  if (type === 'canvas') return 'edit'
  if (type === 'sandbox') return 'play'
  if (type === 'diagram') return 'connection'
  if (type === 'image') return 'image'
  if (type === 'video') return 'file-video'
  if (type === 'audio') return 'file-audio'
  if (type === 'pdf') return 'file-pdf'
  if (type === 'text') return 'document-text'
  if (type === 'iframe') return 'link'
  return 'document'
}

const currentVersionData = computed(() => {
  if (!props.data || props.data.versions.length === 0) return null
  return (
    props.data.versions.find((v: ArtifactVersion) => v.version === currentVersionState.value) ||
    props.data.versions[0]
  )
})

// 获取 ECharts 配置
const getEchartsOption = computed((): ArtifactEChartsOption | undefined => {
  // 优先使用 data.echartsOption
  if (props.data?.echartsOption) return props.data.echartsOption
  // 其次使用 props.echartsOption
  return props.echartsOption
})

const isEChartsContainer = computed(() => {
  if (props.data?.type === 'echarts') return true
  if (props.data?.type === 'chart') {
    return !slots.chart && !!getEchartsOption.value
  }
  return false
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

const sandboxSrcUrl = ref('')

const revokeCurrentUrl = () => {
  if (sandboxSrcUrl.value) {
    try {
      URL.revokeObjectURL(sandboxSrcUrl.value)
    } catch {
      // ignore
    }
    sandboxSrcUrl.value = ''
  }
}

watch(
  () =>
    [props.visible, currentVersionData.value?.content, props.data?.type, activeMode.value] as const,
  ([visible, content, type, mode]) => {
    revokeCurrentUrl()
    if (
      visible &&
      content &&
      (type === 'html' || type === 'sandbox') &&
      (mode === 'preview' || mode === 'inline') &&
      typeof window !== 'undefined'
    ) {
      const blob = new Blob([content], { type: 'text/html;charset=utf-8' })
      sandboxSrcUrl.value = URL.createObjectURL(blob)
    }
  },
  { immediate: true }
)

const highlightedCode = computed(() => {
  let content = currentVersionData.value?.content || ''
  const type = props.data?.type || 'code'

  // 如果是 ECharts 类型且源码为空，尝试将配置项转为 JSON 展示
  if (type === 'echarts' && !content) {
    const opt = getEchartsOption.value
    if (opt) {
      content = JSON.stringify(opt, null, 2)
    }
  }

  let lang = 'typescript'
  if (type === 'html') lang = 'xml'
  if (type === 'markdown') lang = 'markdown'
  if (type === 'react' || type === 'vue') lang = 'javascript'
  if (type === 'echarts') lang = 'json'

  if (lang && hljs.getLanguage(lang)) {
    try {
      return sanitizeHighlightedHtml(
        hljs.highlight(content, { language: lang, ignoreIllegals: true }).value
      )
    } catch {
      return sanitizeHighlightedHtml(escapeHtml(content))
    }
  }

  return sanitizeHighlightedHtml(hljs.highlightAuto(content).value)
})

// ECharts 初始化
const initECharts = async () => {
  const chartType = props.data?.type
  if (chartType !== 'chart' && chartType !== 'echarts') return

  const chartOption = getEchartsOption.value
  if (!chartOption) return

  echartsLoading.value = true
  echartsError.value = null

  try {
    // 清理已有的 ResizeObserver
    if (chartResizeObserver) {
      chartResizeObserver.disconnect()
      chartResizeObserver = null
    }

    // 先销毁旧实例，防止在同一 DOM 上重复 init 报错
    if (echartsInstance.value) {
      echartsInstance.value.dispose()
      echartsInstance.value = null
    }

    // 动态加载 ECharts
    let echarts: EChartsCore
    if (props.autoLoadECharts) {
      echarts = (await import('echarts')) as unknown as EChartsCore
    } else {
      echarts = (window as unknown as { echarts: EChartsCore }).echarts
    }

    // 再次检查 ref（异步加载期间面板可能已关闭）
    if (!echarts || !echartsRef.value) return

    // 创建实例
    echartsInstance.value = echarts.init(echartsRef.value, chartOption.theme || props.echartsTheme)

    // 应用配置
    if (chartOption.option) {
      // 如果启用了 dataZoom，添加默认配置
      if (chartOption.dataZoom !== false && props.echartsDataZoom) {
        chartOption.option.dataZoom = chartOption.option.dataZoom || [
          { type: 'inside' },
          { type: 'slider' }
        ]
      }
      // 如果启用了 toolbox，添加默认配置
      if (chartOption.toolbox !== false && props.echartsToolbox) {
        chartOption.option.toolbox = chartOption.option.toolbox || {
          feature: {
            dataZoom: { yAxisIndex: 'none' },
            restore: {},
            saveAsImage: {}
          }
        }
      }

      echartsInstance.value.setOption(chartOption.option)
    }

    // 绑定事件
    echartsInstance.value.on('click', (params: unknown) => {
      emit('chart-click', params)
    })

    emit('chart-ready', echartsInstance.value)

    // 响应式调整
    if (props.responsiveWidth) {
      chartResizeObserver = new ResizeObserver(() => {
        echartsInstance.value?.resize()
      })
      chartResizeObserver.observe(echartsRef.value)
    }
  } catch (error) {
    echartsError.value = error as Error
    emit('chart-error', error as Error)
  } finally {
    echartsLoading.value = false
  }
}

// 监听面板显示状态、数据类型、配置以及模式变化，重新渲染图表
watch(
  () =>
    [props.visible, isEChartsContainer.value, getEchartsOption.value, activeMode.value] as const,
  ([newVisible, isChart, , mode]) => {
    if (newVisible && isChart && (mode === 'preview' || mode === 'inline')) {
      nextTick(() => {
        initECharts()
      })
    }
  },
  { immediate: true }
)

const vueRendererIframeRef = ref<HTMLIFrameElement | null>(null)

// ── Vue SFC sandbox URL ──────────────────────────────────────────────────────
// Docs can globally inject bundle URLs via:
//   app.provide('yhSandboxYhUiUrl', '/yh-ui/playground/yh-ui-sandbox-bundle.js')
//   app.provide('yhSandboxYhUiCssUrl', '/yh-ui/playground/yh-ui-sandbox-bundle.css')
//   app.provide('yhSandboxRendererUrl', '/yh-ui/vue-renderer.html')
// Consumers either rely on the CDN default or pass the props directly.
const injectedYhUiUrl = inject<string>('yhSandboxYhUiUrl', '')
const injectedYhUiCssUrl = inject<string>('yhSandboxYhUiCssUrl', '')

/**
 * Optional injected URL to a static renderer HTML page (e.g., '/yh-ui/vue-renderer.html').
 * When provided the component uses that same-origin HTML page instead of a blob: URL,
 * which avoids the COEP issue that blocks cross-origin CSS loading inside blob iframes.
 * The JS/CSS bundle URLs are forwarded as query params.
 */
const injectedRendererUrl = inject<string>('yhSandboxRendererUrl', '')

/** Resolve a root-relative URL to a fully-qualified URL based on the current origin/subpath */
const resolveRootUrl = (url: string): string => {
  if (typeof window === 'undefined' || !url.startsWith('/')) return url
  const pathSegments = window.location.pathname.split('/')
  const baseIndex = pathSegments.indexOf('yh-ui')
  const subpath = baseIndex !== -1 ? '/' + pathSegments.slice(1, baseIndex + 1).join('/') : ''
  if (subpath && !url.startsWith(subpath)) {
    return `${window.location.origin}${subpath}${url.replace(/^\/+/, '')}`
  }
  return `${window.location.origin}${url}`
}

const resolvedSandboxYhUiUrl = computed(() => {
  const url = props.sandboxYhUiUrl || injectedYhUiUrl || DEFAULT_SANDBOX_YH_UI_URL
  return resolveRootUrl(url)
})
const resolvedSandboxYhUiCssUrl = computed(() => {
  const url = props.sandboxYhUiCssUrl || injectedYhUiCssUrl || DEFAULT_SANDBOX_YH_UI_CSS_URL
  return resolveRootUrl(url)
})

/**
 * The actual src used for the Vue SFC sandbox iframe.
 * - If a static renderer URL is injected (preferred), append jsUrl+cssUrl as query params.
 *   This avoids the blob: origin COEP issue where cross-origin CSS gets blocked.
 * - Otherwise fallback to a blob: URL (works in consumer apps without the static renderer file).
 */
const vueRendererSrc = computed(() => {
  if (injectedRendererUrl) {
    const rendererUrl = resolveRootUrl(injectedRendererUrl)
    const params = new URLSearchParams({
      jsUrl: resolvedSandboxYhUiUrl.value,
      cssUrl: resolvedSandboxYhUiCssUrl.value
    })
    return `${rendererUrl}?${params.toString()}`
  }
  return vueRendererBlobUrl.value
})

/** Blob URL fallback – only used when no static renderer URL is injected */
const vueRendererBlobUrl = ref('')

const revokeSandboxBlobUrl = () => {
  if (vueRendererBlobUrl.value) {
    try {
      URL.revokeObjectURL(vueRendererBlobUrl.value)
    } catch {
      // ignore
    }
    vueRendererBlobUrl.value = ''
  }
}

const createVueSandbox = () => {
  if (typeof window === 'undefined') return
  // If using a static renderer page, no blob URL needed
  if (injectedRendererUrl) return
  revokeSandboxBlobUrl()
  const html = createSandboxHtml({
    yhUiUrl: resolvedSandboxYhUiUrl.value,
    yhUiCssUrl: resolvedSandboxYhUiCssUrl.value
  })
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
  vueRendererBlobUrl.value = URL.createObjectURL(blob)
}

// Recreate sandbox when URL props/injections change (blob fallback only)
watch([resolvedSandboxYhUiUrl, resolvedSandboxYhUiCssUrl], () => {
  if (typeof window !== 'undefined' && !injectedRendererUrl) {
    createVueSandbox()
  }
})

const sendVueCodeToRenderer = () => {
  const iframe = vueRendererIframeRef.value
  const content = currentVersionData.value?.content
  if (iframe && iframe.contentWindow && content) {
    iframe.contentWindow.postMessage(
      {
        type: 'render-vue',
        code: content
      },
      '*'
    )
  }
}

const onVueRendererLoad = () => {
  sendVueCodeToRenderer()
}

const handleRendererMessage = (event: MessageEvent) => {
  if (event.data?.type === 'renderer-ready') {
    sendVueCodeToRenderer()
  }
}

watch(
  () => currentVersionData.value?.content,
  () => {
    if (props.data?.type === 'vue') {
      nextTick(() => {
        sendVueCodeToRenderer()
      })
    }
  }
)

// 清理
onBeforeUnmount(() => {
  revokeCurrentUrl()
  revokeSandboxBlobUrl()
  if (chartResizeObserver) {
    chartResizeObserver.disconnect()
    chartResizeObserver = null
  }
  if (echartsInstance.value) {
    echartsInstance.value.dispose()
    echartsInstance.value = null
  }
  if (typeof window !== 'undefined') {
    window.removeEventListener('message', handleRendererMessage)
  }
})

onMounted(() => {
  loadHighlightStyle()
  if (typeof window !== 'undefined') {
    window.addEventListener('message', handleRendererMessage)
    // Create the sandbox blob URL eagerly so it's ready when the user opens the panel
    createVueSandbox()
  }
})

// 图表高度样式
const chartContainerStyle = computed(() => ({
  height: typeof props.chartHeight === 'number' ? props.chartHeight + 'px' : props.chartHeight
}))
</script>

<template>
  <Transition name="yh-slide-right">
    <div
      v-if="visible"
      :class="[ns.b(), ns.m(activeMode), ns.is('fullscreen', props.fullscreen)]"
      :style="[
        { width: props.fullscreen ? '100%' : typeof width === 'number' ? width + 'px' : width },
        themeStyle
      ]"
    >
      <!-- Header -->
      <div :class="ns.e('header')">
        <div :class="ns.e('title-area')">
          <YhIcon :name="getIcon(data?.type)" />
          <span :class="ns.e('title')">{{ data?.title || 'Artifact' }}</span>
        </div>

        <div :class="ns.e('actions')">
          <div v-if="isPreviewable" :class="ns.e('tabs')">
            <button
              :class="[ns.e('tab'), ns.is('active', activeMode === 'preview')]"
              @click="toggleMode('preview')"
            >
              {{ t('ai.artifacts.preview') }}
            </button>
            <button
              v-if="data?.type === 'html'"
              :class="[ns.e('tab'), ns.is('active', activeMode === 'inline')]"
              @click="toggleMode('inline')"
            >
              {{ t('ai.artifacts.inline') }}
            </button>
            <button
              :class="[ns.e('tab'), ns.is('active', activeMode === 'code')]"
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
        <template v-if="activeMode === 'preview' || activeMode === 'inline'">
          <!-- Check if a slot with the name of the type is defined, allowing custom preview rendering -->
          <template v-if="data?.type && slots[data.type]">
            <slot :name="data.type" :data="currentVersionData" :title="data.title" />
          </template>

          <template v-else>
            <iframe
              v-if="data?.type === 'html' || data?.type === 'sandbox'"
              :src="sandboxSrcUrl"
              :class="ns.e('sandbox')"
              :sandbox="data?.type === 'sandbox' ? 'allow-scripts' : ''"
            ></iframe>

            <!-- ECharts 图表 (使用 v-show 保持 DOM) -->
            <div
              v-show="isEChartsContainer"
              :class="ns.e('echarts-wrapper')"
              :style="chartContainerStyle"
              style="position: relative"
            >
              <div
                ref="echartsRef"
                :class="ns.e('echarts-container')"
                style="width: 100%; height: 100%"
              ></div>
              <YhSpin
                v-if="echartsLoading"
                :class="ns.e('chart-loading')"
                style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)"
              >
                <span>{{ chartLoadingText ?? t('ai.artifacts.renderingChart') }}</span>
              </YhSpin>
              <div
                v-else-if="echartsError"
                :class="ns.e('chart-error')"
                style="
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                "
              >
                <YhIcon name="warning" />
                <span
                  >{{
                    t('ai.artifacts.chartLoadError') === 'ai.artifacts.chartLoadError'
                      ? t('common.close') === '关闭'
                        ? '图表加载失败'
                        : 'Chart loading failed'
                      : t('ai.artifacts.chartLoadError')
                  }}: {{ echartsError.message }}</span
                >
              </div>
            </div>

            <!-- 其他类型 -->
            <template
              v-if="data?.type !== 'html' && data?.type !== 'sandbox' && !isEChartsContainer"
            >
              <!-- Image Preview -->
              <div
                v-if="data?.type === 'image'"
                :class="ns.e('image-container')"
                style="
                  width: 100%;
                  height: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  overflow: auto;
                  padding: 16px;
                  box-sizing: border-box;
                "
              >
                <img
                  :src="currentVersionData?.content"
                  style="max-width: 100%; max-height: 100%; object-fit: contain"
                />
              </div>

              <!-- Video Preview -->
              <div
                v-else-if="data?.type === 'video'"
                :class="ns.e('video-container')"
                style="
                  width: 100%;
                  height: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  padding: 16px;
                  box-sizing: border-box;
                "
              >
                <video
                  :src="currentVersionData?.content"
                  controls
                  style="max-width: 100%; max-height: 100%"
                ></video>
              </div>

              <!-- Audio Preview -->
              <div
                v-else-if="data?.type === 'audio'"
                :class="ns.e('audio-container')"
                style="
                  width: 100%;
                  height: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  padding: 16px;
                  box-sizing: border-box;
                "
              >
                <audio :src="currentVersionData?.content" controls style="max-width: 100%"></audio>
              </div>

              <!-- PDF Preview -->
              <iframe
                v-else-if="data?.type === 'pdf'"
                :src="currentVersionData?.content"
                style="width: 100%; height: 100%; border: none"
              ></iframe>

              <!-- Plain Text Preview -->
              <pre
                v-else-if="data?.type === 'text'"
                style="
                  width: 100%;
                  height: 100%;
                  margin: 0;
                  padding: 16px;
                  overflow: auto;
                  font-family: monospace;
                  white-space: pre-wrap;
                  box-sizing: border-box;
                "
                >{{ currentVersionData?.content }}</pre
              >

              <!-- Generic Iframe Preview -->
              <iframe
                v-else-if="data?.type === 'iframe'"
                :src="currentVersionData?.content"
                style="width: 100%; height: 100%; border: none"
              ></iframe>

              <!-- Vue SFC Preview (Sandbox) -->
              <!-- Uses static vue-renderer.html when injected (avoids blob: COEP issue), -->
              <!-- otherwise falls back to a blob: URL for consumer apps. -->
              <iframe
                v-else-if="data?.type === 'vue' && vueRendererSrc"
                ref="vueRendererIframeRef"
                :src="vueRendererSrc"
                style="width: 100%; height: 100%; border: none"
                @load="onVueRendererLoad"
              ></iframe>

              <!-- 通用图表 -->
              <div
                v-else-if="data?.type === 'chart'"
                :class="ns.e('chart-container')"
                :style="chartContainerStyle"
              >
                <slot name="chart" :data="currentVersionData" :title="data.title">
                  <div :class="ns.e('placeholder')">
                    <YhIcon name="chart-bar" />
                    <p>{{ t('ai.artifacts.renderingChart') }}</p>
                  </div>
                </slot>
              </div>
              <!-- 画布 -->
              <div v-else-if="data?.type === 'canvas'" :class="ns.e('canvas-container')">
                <slot name="canvas" :data="currentVersionData">
                  <div :class="ns.e('placeholder')">
                    <YhIcon name="edit" />
                    <p>{{ t('ai.artifacts.renderingCanvas') }}</p>
                  </div>
                </slot>
              </div>
              <!-- 占位 -->
              <div v-else :class="ns.e('placeholder')">
                <YhIcon name="sparkles" />
                <p>{{ t('ai.artifacts.rendering') }}</p>
              </div>
            </template>
          </template>
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
