<script setup lang="ts">
import { ref, computed, watch, shallowRef, onMounted, onUnmounted, nextTick } from 'vue'
import { useNamespace, useLocale } from '@yh-ui/hooks'
import { useComponentTheme, useThemeVars, type ComponentThemeVars } from '@yh-ui/theme'
import {
  aiMermaidProps,
  aiMermaidEmits,
  buildMermaidRenderSource,
  type RenderType
} from './ai-mermaid'
import { YhIcon } from '../../icon'
import { YhSpin } from '../../spin'
import { sanitizeSvgMarkup } from '../../sanitize'

defineOptions({
  name: 'YhAiMermaid'
})

const props = defineProps(aiMermaidProps)
const emit = defineEmits(aiMermaidEmits)

const ns = useNamespace('ai-mermaid')
const { t } = useLocale()

// 主题覆盖
const { themeStyle } = useComponentTheme(
  'ai-mermaid',
  computed(() => props.themeOverrides as unknown as ComponentThemeVars)
)

// 暗黑模式自适应逻辑
const isDark = ref(false)
const themeVars = useThemeVars()
let observer: MutationObserver | null = null

const updateDark = () => {
  if (typeof document !== 'undefined') {
    const isHtmlDark = document.documentElement.classList.contains('dark')
    const isThemeDark = themeVars.dark?.value || false
    isDark.value = isHtmlDark || isThemeDark
  }
}

watch(
  () => themeVars.dark?.value,
  () => {
    updateDark()
  }
)

onMounted(() => {
  updateDark()
  if (typeof window !== 'undefined' && 'MutationObserver' in window) {
    observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === 'class') {
          updateDark()
        }
      }
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})

// 判断用户是否自定义了节点文本颜色
const hasCustomNodeTextColor = computed(() => {
  return props.themeOverrides && 'nodeTextColor' in props.themeOverrides
})

// Mermaid 模块类型
interface Mermaid {
  initialize(config: Record<string, unknown>): void
  render(id: string, text: string, container?: Element): Promise<{ svg: string }>
  default?: Mermaid
}
const mermaidModule = shallowRef<Mermaid | null>(null)

// SVG 内容
const svgContent = ref('')

// 错误信息
const errorMessage = ref<string | null>(null)

// 加载状态
const isLoading = ref(false)

// 渲染类型
const renderType = ref<RenderType>('image')

// 缩放比例
const zoomLevel = ref(1)

// 容器引用
const graphContainerRef = ref<HTMLDivElement | null>(null)
const canUseDom = typeof window !== 'undefined' && typeof document !== 'undefined'

const resolveCssVar = (name: string, fallback: string) => {
  if (!canUseDom) return fallback

  const targets = [graphContainerRef.value, document.documentElement, document.body].filter(
    (target): target is HTMLElement => target instanceof HTMLElement
  )

  for (const target of targets) {
    const value = window.getComputedStyle(target).getPropertyValue(name).trim()
    if (value) {
      return value
    }
  }

  return fallback
}

const mermaidThemeVariables = computed(() => {
  const background = resolveCssVar('--yh-bg-color', isDark.value ? '#141414' : '#ffffff')
  const overlayBackground = resolveCssVar('--yh-bg-color-overlay', background)
  const pageBackground = resolveCssVar('--yh-bg-color-page', isDark.value ? '#0a0a0a' : '#f2f3f5')
  const primaryColor = resolveCssVar('--yh-color-primary', '#409eff')
  const textColor = resolveCssVar('--yh-text-color-primary', isDark.value ? '#e5eaf3' : '#303133')
  const regularTextColor = resolveCssVar(
    '--yh-text-color-regular',
    isDark.value ? '#cfd3dc' : '#606266'
  )
  const secondaryTextColor = resolveCssVar(
    '--yh-text-color-secondary',
    isDark.value ? '#a3a6ad' : '#909399'
  )
  const borderColor = resolveCssVar('--yh-border-color', isDark.value ? '#4c4d4f' : '#dcdfe6')
  const lightBorderColor = resolveCssVar(
    '--yh-border-color-light',
    isDark.value ? '#414243' : '#e4e7ed'
  )
  const darkBorderColor = resolveCssVar(
    '--yh-border-color-dark',
    isDark.value ? '#58585b' : '#d4d7de'
  )

  return {
    darkMode: isDark.value,
    background,
    textColor,
    primaryColor,
    primaryTextColor: textColor,
    secondaryColor: pageBackground,
    secondaryTextColor: textColor,
    tertiaryColor: pageBackground,
    tertiaryTextColor: regularTextColor,
    mainBkg: overlayBackground,
    secondBkg: pageBackground,
    lineColor: darkBorderColor,
    defaultLinkColor: darkBorderColor,
    titleColor: textColor,
    nodeBkg: overlayBackground,
    nodeBorder: borderColor,
    nodeTextColor: textColor,
    clusterBkg: pageBackground,
    clusterBorder: lightBorderColor,
    edgeLabelBackground: overlayBackground,
    labelTextColor: regularTextColor,
    actorBkg: overlayBackground,
    actorBorder: borderColor,
    actorTextColor: textColor,
    activationBorderColor: borderColor,
    activationBkgColor: pageBackground,
    sequenceNumberColor: textColor,
    signalColor: darkBorderColor,
    signalTextColor: textColor,
    labelBoxBkgColor: overlayBackground,
    labelBoxBorderColor: lightBorderColor,
    loopTextColor: secondaryTextColor,
    noteBkgColor: pageBackground,
    noteBorderColor: lightBorderColor,
    noteTextColor: textColor,
    sectionBkgColor: pageBackground,
    altSectionBkgColor: overlayBackground,
    gridColor: lightBorderColor,
    taskBorderColor: lightBorderColor,
    taskBkgColor: overlayBackground,
    taskTextColor: textColor,
    taskTextDarkColor: textColor,
    taskTextOutsideColor: textColor,
    todayLineColor: primaryColor,
    personBorder: borderColor,
    personBkg: overlayBackground,
    relationColor: darkBorderColor
  }
})

// 加载 Mermaid 模块
const loadMermaid = async (): Promise<Mermaid | null> => {
  if (mermaidModule.value) return mermaidModule.value

  try {
    const module = (await import('mermaid')) as unknown as Mermaid
    // 兼容不同的 ESM 导出方式
    const mermaid = (module.default || module) as Mermaid
    mermaidModule.value = mermaid
    return mermaidModule.value
  } catch (error) {
    console.error('Failed to load mermaid:', error)
    errorMessage.value = 'Failed to load mermaid library'
    return null
  }
}

// 渲染图表
const renderGraph = async () => {
  if (!props.code) {
    svgContent.value = ''
    return
  }

  if (!canUseDom) {
    svgContent.value = ''
    errorMessage.value = null
    return
  }

  isLoading.value = true
  errorMessage.value = null

  try {
    const module = await loadMermaid()
    if (!module) {
      isLoading.value = false
      return
    }

    // 默认关闭 htmlLabels，使用原生 SVG text 渲染以抗宿主 CSS 污染，并自适应各种主题背景色
    const userConfig = props.config ?? {}
    const htmlLabels = userConfig.htmlLabels ?? false
    const useDefaultThemeVariables =
      !userConfig.theme ||
      userConfig.theme === 'default' ||
      userConfig.theme === 'dark' ||
      userConfig.theme === 'base'
    const mergedConfig = {
      ...userConfig,
      theme: userConfig.theme ?? (isDark.value ? 'dark' : 'default'),
      htmlLabels,
      flowchart: {
        useHtmlLabels: userConfig.flowchart?.useHtmlLabels ?? htmlLabels,
        ...userConfig.flowchart
      },
      sequence: {
        useHtmlLabels: userConfig.sequence?.useHtmlLabels ?? htmlLabels,
        ...userConfig.sequence
      },
      themeVariables: {
        ...(useDefaultThemeVariables ? mermaidThemeVariables.value : {}),
        ...userConfig.themeVariables
      }
    }

    // 处理配置：使用指令形式注入。这是解决多实例页面（如文档）全局配置冲突的最佳实践。
    // 将 mergedConfig 转换为 %%{init: { ... }}%% 前缀
    const processedCode = buildMermaidRenderSource(props.code, mergedConfig)

    // 生成唯一 ID
    const id = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // 使用注入了配置指令的代码进行渲染
    const { svg } = await module.render(id, processedCode)
    svgContent.value = sanitizeSvgMarkup(svg)

    emit('ready')
  } catch (error) {
    console.error('Failed to render mermaid:', error)
    errorMessage.value = error instanceof Error ? error.message : 'Failed to render diagram'
    emit('error', error instanceof Error ? error : new Error(String(error)))
  } finally {
    isLoading.value = false
  }
}

// 动态修正动态生成的 SVG 内联样式，解决 Mermaid 内置 ID 选择器权重覆盖问题
const patchSvgStyles = () => {
  if (!graphContainerRef.value) return

  // 直接获取最新的实际明暗状态，避开 Vue 响应式数据在热更新期间的异步时序差
  const isCurrentlyDark =
    typeof document !== 'undefined' &&
    (document.documentElement.classList.contains('dark') || themeVars.dark?.value === true)

  // 1. 连线样式调整（强行改写内联 stroke 属性以对抗内建的 ID 选择器权重，使用与箭头一致的亮灰色）
  const paths = graphContainerRef.value.querySelectorAll(
    'g.edgePath path, .edgePaths .edgePath path, .edge-paths .edgePath path, path.path'
  )
  paths.forEach((p) => {
    const el = p as SVGPathElement
    if (isCurrentlyDark) {
      el.style.setProperty('stroke', '#e2e8f0', 'important')
    } else {
      el.style.removeProperty('stroke')
    }
  })

  // 2. 箭头样式调整
  const arrowheads = graphContainerRef.value.querySelectorAll(
    'g.edgePath path.arrowheadPath, .arrowheadPath, [id^=arrowhead] path, marker path'
  )
  arrowheads.forEach((p) => {
    const el = p as SVGPathElement
    if (isCurrentlyDark) {
      el.style.setProperty('fill', '#e2e8f0', 'important')
      el.style.setProperty('stroke', '#e2e8f0', 'important')
    } else {
      el.style.removeProperty('fill')
      el.style.removeProperty('stroke')
    }
  })
}

// 当 SVG 内容挂载、加载状态改变、明暗主题切换或视图模式改变时，在 DOM 更新后执行内联样式 Patch
watch(
  [svgContent, isLoading, isDark, renderType],
  () => {
    nextTick(() => {
      patchSvgStyles()
    })
  },
  { flush: 'post', immediate: true }
)

// 监听代码、配置或暗黑模式状态变化
watch(
  [() => props.code, () => props.config, isDark],
  () => {
    if (canUseDom && renderType.value === 'image') {
      renderGraph()
    }
  },
  { immediate: true, deep: true }
)

// 切换渲染类型
const handleRenderTypeChange = (type: RenderType) => {
  renderType.value = type
  emit('render-type-change', type)
  if (props.onRenderTypeChange) {
    props.onRenderTypeChange(type)
  }

  if (canUseDom && type === 'image') {
    renderGraph()
  }
}

// 放大
const handleZoomIn = () => {
  if (zoomLevel.value < 3) {
    zoomLevel.value = Number((zoomLevel.value + 0.1).toFixed(1))
  }
}

// 缩小
const handleZoomOut = () => {
  if (zoomLevel.value > 0.5) {
    zoomLevel.value = Number((zoomLevel.value - 0.1).toFixed(1))
  }
}

// 重置
const handleReset = () => {
  zoomLevel.value = 1
}

// 复制
const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(props.code)
    // 这里可以添加成功提示
  } catch (error) {
    console.error('Failed to copy code:', error)
  }
}

// 下载
const handleDownload = () => {
  const el = graphContainerRef.value?.querySelector('svg')
  if (!el) return

  try {
    const svgData = new XMLSerializer().serializeToString(el)
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(svgBlob)

    const link = document.createElement('a')
    link.href = url
    link.download = `mermaid-chart-${Date.now()}.svg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Failed to download SVG:', error)
  }
}

// 缩放样式
const transformStyle = computed(() => {
  const scale = zoomLevel.value
  return {
    transform: `scale(${scale})`,
    transformOrigin: 'top left',
    width: scale > 1 ? `${100 * scale}%` : '100%'
  }
})

// 操作栏按钮
const actionButtons = computed(() => {
  const { enableZoom, enableDownload, enableCopy, customActions } = props.actions
  const buttons = []

  if (enableZoom) {
    buttons.push(
      { key: 'zoom-in', label: t('ai.mermaid.zoomIn'), icon: 'zoom-in', onClick: handleZoomIn },
      { key: 'zoom-out', label: t('ai.mermaid.zoomOut'), icon: 'zoom-out', onClick: handleZoomOut },
      { key: 'reset', label: t('ai.mermaid.reset'), icon: 'refresh', onClick: handleReset }
    )
  }

  if (enableDownload) {
    buttons.push({
      key: 'download',
      label: t('ai.mermaid.download'),
      icon: 'download',
      onClick: handleDownload
    })
  }

  if (enableCopy) {
    buttons.push({
      key: 'copy',
      label: t('ai.mermaid.copyCode'),
      icon: 'copy',
      onClick: handleCopy
    })
  }

  if (customActions) {
    buttons.push(...customActions)
  }

  return buttons
})
</script>

<template>
  <div
    :class="[
      ns.b(),
      { 'is-dark': isDark, 'has-custom-text-color': hasCustomNodeTextColor },
      className
    ]"
    :style="[themeStyle, style]"
  >
    <!-- 头部区域 -->
    <div v-if="header || $slots.header" :class="ns.e('header')">
      <div :class="ns.e('header-content')">
        <slot name="header">{{ header }}</slot>
      </div>
      <div :class="ns.e('extra')">
        <slot name="extra" />
      </div>
    </div>

    <!-- 操作栏 -->
    <div :class="ns.e('actions')">
      <div :class="ns.e('render-tabs')">
        <button
          :class="[ns.e('render-tab'), renderType === 'image' && ns.is('active')]"
          @click="handleRenderTypeChange('image')"
        >
          <YhIcon name="image" />
          <span>{{ t('ai.mermaid.image') }}</span>
        </button>
        <button
          :class="[ns.e('render-tab'), renderType === 'code' && ns.is('active')]"
          @click="handleRenderTypeChange('code')"
        >
          <YhIcon name="code" />
          <span>{{ t('ai.mermaid.code') }}</span>
        </button>
      </div>
      <div v-if="actionButtons.length > 0" :class="ns.e('action-buttons')">
        <button
          v-for="btn in actionButtons"
          :key="btn.key"
          :class="ns.e('action-btn')"
          :title="btn.label"
          @click="btn.onClick"
        >
          <YhIcon :name="btn.icon || 'document'" />
        </button>
      </div>
    </div>

    <!-- 内容区域 -->
    <div :class="ns.e('content')">
      <!-- 加载状态 -->
      <div v-if="isLoading" :class="ns.e('loading')">
        <YhSpin />
      </div>

      <!-- 错误状态 -->
      <div v-else-if="errorMessage" :class="ns.e('error')">
        <YhIcon name="warning" />
        <span>{{ errorMessage }}</span>
        <button @click="renderGraph">{{ t('ai.mermaid.retry') }}</button>
      </div>

      <!-- 代码模式 -->
      <div v-if="renderType === 'code'" :class="ns.e('code')">
        <pre><code>{{ code }}</code></pre>
      </div>

      <!-- 图片模式 -->
      <!-- eslint-disable vue/no-v-html -->
      <div
        v-else-if="renderType === 'image'"
        ref="graphContainerRef"
        :class="ns.e('graph')"
        :style="transformStyle"
        v-html="svgContent"
      ></div>
      <!-- eslint-enable vue/no-v-html -->
    </div>
  </div>
</template>

<style lang="scss">
@use './ai-mermaid.scss';
</style>
