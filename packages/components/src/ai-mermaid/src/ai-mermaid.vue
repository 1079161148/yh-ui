<script setup lang="ts">
import { ref, computed, watch, shallowRef } from 'vue'
import { useNamespace, useLocale } from '@yh-ui/hooks'
import { useComponentTheme, type ComponentThemeVars } from '@yh-ui/theme'
import { aiMermaidProps, aiMermaidEmits, type RenderType } from './ai-mermaid'
import { YhIcon } from '../../icon'
import { YhSpin } from '../../spin'

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

    // 基础全局初始化（仅执行一次或保持最小化）
    module.initialize({
      startOnLoad: false,
      securityLevel: 'loose'
    })

    // 处理配置：使用指令形式注入。这是解决多实例页面（如文档）全局配置冲突的最佳实践。
    // 将 props.config 转换为 %%{init: { ... }}%% 前缀
    let processedCode = props.code
    if (props.config && Object.keys(props.config).length > 0) {
      const configStr = JSON.stringify(props.config)
      processedCode = `%%{init: ${configStr}}%%\n${processedCode}`
    }

    // 生成唯一 ID
    const id = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // 使用注入了配置指令的代码进行渲染
    const { svg } = await module.render(id, processedCode)
    svgContent.value = svg

    emit('ready')
  } catch (error) {
    console.error('Failed to render mermaid:', error)
    errorMessage.value = error instanceof Error ? error.message : 'Failed to render diagram'
    emit('error', error instanceof Error ? error : new Error(String(error)))
  } finally {
    isLoading.value = false
  }
}

// 监听代码或配置变化
watch(
  [() => props.code, () => props.config],
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
const transformStyle = computed(() => ({
  transform: `scale(${zoomLevel.value})`,
  transformOrigin: 'top left'
}))

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
  <div :class="[ns.b(), className]" :style="[themeStyle, style]">
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
