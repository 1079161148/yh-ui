<script setup lang="ts">
/**
 * YhImage - 图片组件
 */
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import { useNamespace, useLocale } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'
import { isClient, getScrollContainer } from '@yh-ui/utils'
import { imageProps } from './image'
import type { ImageEmits } from './image'
import YhImageViewer from './image-viewer.vue'
import type Viewer from 'viewerjs'
import { loadViewer } from '../../viewerjs'

defineOptions({
  name: 'YhImage'
})

const props = defineProps(imageProps)
const emit = defineEmits<ImageEmits>()

const ns = useNamespace('image')
const { t } = useLocale()

// 组件级 themeOverrides
const { themeStyle } = useComponentTheme(
  'image',
  computed(() => props.themeOverrides)
)

const isLoading = ref(true)
const error = ref(false)
const showViewer = ref(false)
const container = ref<HTMLElement>()
const isLazy = ref(false)
const useNativeLazy = ref(false)
let viewer: Viewer | null = null
let viewerList: HTMLElement | null = null
const isSupportNativeLazy = isClient && 'loading' in HTMLImageElement.prototype

const onImgLoad = (e: Event) => {
  isLoading.value = false
  emit('load', e)
}

const onImgError = (e: Event) => {
  isLoading.value = false
  error.value = true
  emit('error', e)
}

const imageStyle = computed(() => {
  const { fit } = props
  if (fit) {
    return { 'object-fit': fit }
  }
  return {}
})

const preview = computed(() => {
  const { previewSrcList } = props
  return Array.isArray(previewSrcList) && previewSrcList.length > 0
})

const loadImage = () => {
  if (!isClient) return

  isLoading.value = true
  error.value = false

  const img = new Image()
  img.src = props.src
  if (props.crossorigin) img.crossOrigin = props.crossorigin

  img.onload = (e) => {
    isLoading.value = false
    emit('load', e)
  }
  img.onerror = (e: Event | string) => {
    isLoading.value = false
    error.value = true
    emit('error', e)
  }
}

let observer: IntersectionObserver | null = null

const handleLazyLoad = () => {
  if (!isClient) return

  if (props.lazy) {
    if (isSupportNativeLazy && props.loading === 'lazy') {
      useNativeLazy.value = true
      isLoading.value = true
      error.value = false
    } else {
      isLazy.value = true
      initLazyLoad()
    }
  } else {
    loadImage()
  }
}

const initLazyLoad = () => {
  if (!isClient || !container.value) return

  // 如果已经有加载过的，直接返回
  if (!isLoading.value && !error.value) return

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadImage()
          stopLazyLoad()
        }
      })
    },
    {
      root: getRoot(),
      rootMargin: '200px' // 提前 200px 开始加载
    }
  )
  observer.observe(container.value)
}

const getRoot = () => {
  if (!isClient || !container.value) return null

  if (typeof props.scrollContainer === 'string') {
    if (typeof document === 'undefined') return null
    return document.querySelector(props.scrollContainer) as HTMLElement
  } else if (typeof HTMLElement !== 'undefined' && props.scrollContainer instanceof HTMLElement) {
    return props.scrollContainer
  }

  // 按照文档：若未定义，则为最近一个 overflow 值为 auto 或 scroll 的父元素
  const scrollContainer = getScrollContainer(container.value)
  // 如果找到的是 window (Window 类型)，IntersectionObserver 的 root 需要传 null
  return scrollContainer instanceof HTMLElement ? scrollContainer : null
}

const stopLazyLoad = () => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
}

const initViewerJS = async () => {
  if (!isClient || !container.value) return

  const imgElement = container.value.querySelector('img')
  if (!imgElement) return

  let ViewerClass
  try {
    ViewerClass = await loadViewer()
  } catch {
    return
  }

  // 如果有 previewSrcList，我们需要创建一个虚拟列表给 viewerjs
  if (props.previewSrcList && props.previewSrcList.length > 0) {
    const list = document.createElement('div')
    list.style.display = 'none'
    props.previewSrcList.forEach((src) => {
      const img = document.createElement('img')
      img.src = src
      list.appendChild(img)
    })
    document.body.appendChild(list) // Append to body to make it part of the DOM for Viewer.js
    viewerList = list
    const nextViewer = new ViewerClass(list, {
      ...props.viewerOptions,
      hidden: () => {
        if (viewerList) {
          document.body.removeChild(viewerList)
          viewerList = null
        }
        viewer?.destroy()
        viewer = null
      }
    })
    viewer = nextViewer as unknown as Viewer
    nextViewer.view(props.initialIndex)
  } else {
    const nextViewer = new ViewerClass(imgElement, props.viewerOptions)
    viewer = nextViewer as unknown as Viewer
    nextViewer.show()
  }
}

watch(
  () => props.src,
  () => {
    if (useNativeLazy.value) {
      isLoading.value = true
      error.value = false
    } else if (isLazy.value) {
      stopLazyLoad()
      initLazyLoad()
    } else {
      loadImage()
    }
  }
)

onMounted(() => {
  handleLazyLoad()
})

onUnmounted(() => {
  stopLazyLoad()
  if (viewer) {
    viewer.destroy()
    viewer = null
  }
  if (viewerList) {
    document.body.removeChild(viewerList)
    viewerList = null
  }
})

const clickHandler = async () => {
  if (!preview.value) return

  if (props.viewerMode === 'viewerjs') {
    await initViewerJS()
  } else {
    showViewer.value = true
  }
  emit('show')
}

const closeViewer = () => {
  showViewer.value = false
  emit('close')
}

const handleSwitch = (index: number) => {
  emit('switch', index)
}
</script>

<template>
  <div ref="container" :class="ns.b()" :style="themeStyle">
    <slot v-if="isLoading && !useNativeLazy" name="placeholder">
      <div :class="ns.e('placeholder')">{{ t('image.loading') }}</div>
    </slot>
    <slot v-else-if="error" name="error">
      <div :class="ns.e('error')">{{ t('image.error') }}</div>
    </slot>
    <template v-else-if="!useNativeLazy">
      <img
        :src="src"
        :alt="alt"
        :class="[ns.e('inner'), preview && ns.is('preview')]"
        :style="imageStyle"
        :crossorigin="crossorigin"
        :loading="props.loading"
        @click="clickHandler"
      />
    </template>

    <!-- Native lazy loading branch -->
    <template v-if="useNativeLazy">
      <slot v-if="isLoading" name="placeholder">
        <div :class="ns.e('placeholder')">{{ t('image.loading') }}</div>
      </slot>
      <img
        :src="src"
        :alt="alt"
        :class="[ns.e('inner'), preview && ns.is('preview')]"
        :style="[
          imageStyle,
          isLoading || error
            ? { width: '0px', height: '0px', opacity: 0, position: 'absolute' }
            : {}
        ]"
        :crossorigin="crossorigin"
        loading="lazy"
        @load="onImgLoad"
        @error="onImgError"
        @click="clickHandler"
      />
    </template>

    <!-- Viewer -->
    <yh-image-viewer
      v-if="preview && showViewer"
      :url-list="previewSrcList"
      :z-index="zIndex"
      :initial-index="initialIndex"
      :infinite="infinite"
      :hide-on-click-modal="hideOnClickModal"
      :close-on-press-escape="closeOnPressEscape"
      :show-progress="showProgress"
      :zoom-rate="zoomRate"
      :teleported="previewTeleported"
      @close="closeViewer"
      @switch="handleSwitch"
    />
  </div>
</template>

<style lang="scss">
@use './image.scss';
</style>
