<script setup lang="ts">
import { useNamespace, useLocale } from '@yh-ui/hooks'
import { ref, computed, watch, onBeforeUnmount, nextTick, shallowRef } from 'vue'
import {
  aiArtifactsProps,
  aiArtifactsEmits,
  type ArtifactVersion,
  type ArtifactEChartsOption
} from './ai-artifacts'
import { YhIcon } from '../../icon'
import { YhButton } from '../../button'
import { YhSpin } from '../../spin'
import { useComponentTheme } from '@yh-ui/theme'
import hljs from '../../highlight'
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
      return hljs.highlight(content, { language: lang, ignoreIllegals: true }).value
    } catch {
      return content
    }
  }

  return hljs.highlightAuto(content).value
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
      const resizeObserver = new ResizeObserver(() => {
        echartsInstance.value?.resize()
      })
      resizeObserver.observe(echartsRef.value)
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
  () => [props.visible, props.data?.type, getEchartsOption.value, internalMode.value] as const,
  ([newVisible, , , mode]) => {
    const isChart = props.data?.type === 'chart' || props.data?.type === 'echarts'
    if (newVisible && isChart && (mode === 'preview' || mode === 'inline')) {
      nextTick(() => {
        initECharts()
      })
    }
  },
  { immediate: true }
)

// 清理
onBeforeUnmount(() => {
  if (echartsInstance.value) {
    echartsInstance.value.dispose()
    echartsInstance.value = null
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

          <!-- ECharts 图表 (使用 v-show 保持 DOM) -->
          <div
            v-show="data?.type === 'echarts'"
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
              <span>{{ chartLoadingText }}</span>
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
              <span>图表加载失败: {{ echartsError.message }}</span>
            </div>
          </div>

          <!-- 其他类型 -->
          <template
            v-if="data?.type !== 'html' && data?.type !== 'sandbox' && data?.type !== 'echarts'"
          >
            <!-- 通用图表 -->
            <div
              v-if="data?.type === 'chart'"
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
