<template>
  <div
    ref="scrollbar"
    :class="ns.b()"
    :style="themeStyle"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      ref="wrap"
      :class="[ns.e('wrap'), native ? '' : ns.em('wrap', 'hidden-native')]"
      :style="wrapStyle"
      @scroll="handleScroll"
    >
      <component :is="tag" ref="resize" :class="[ns.e('view'), viewClass]" :style="viewStyle">
        <slot></slot>
      </component>
    </div>
    <template v-if="!native">
      <thumb
        ref="horizontalThumb"
        :move="moveX"
        :ratio="ratioX"
        :size="sizeWidth"
        :always="always"
      />
      <thumb
        ref="verticalThumb"
        :move="moveY"
        :ratio="ratioY"
        :size="sizeHeight"
        :always="always"
        vertical
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, provide, ref, watch, nextTick } from 'vue'
import { scrollbarProps, scrollbarEmits, SCROLLBAR_INJECTION_KEY } from './scrollbar'
import Thumb from './thumb.vue'
import { useNamespace } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'

defineOptions({
  name: 'YhScrollbar'
})

const props = defineProps(scrollbarProps)
const emit = defineEmits(scrollbarEmits)

const ns = useNamespace('scrollbar')
const { themeStyle } = useComponentTheme('scrollbar', props.themeOverrides)

const scrollbar = ref<HTMLDivElement>()
const wrap = ref<HTMLDivElement>()
const resize = ref<HTMLElement>()

const sizeWidth = ref('0')
const sizeHeight = ref('0')
const moveX = ref(0)
const moveY = ref(0)
const ratioY = ref(1)
const ratioX = ref(1)

const horizontalThumb = ref<InstanceType<typeof Thumb>>()
const verticalThumb = ref<InstanceType<typeof Thumb>>()

const wrapStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.height)
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  if (props.maxHeight)
    style.maxHeight = typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight
  return style
})

const handleScroll = () => {
  if (wrap.value) {
    const offsetHeight = wrap.value.offsetHeight - 4
    const offsetWidth = wrap.value.offsetWidth - 4

    moveY.value = ((wrap.value.scrollTop * 100) / offsetHeight) * ratioY.value
    moveX.value = ((wrap.value.scrollLeft * 100) / offsetWidth) * ratioX.value

    emit('scroll', {
      scrollTop: wrap.value.scrollTop,
      scrollLeft: wrap.value.scrollLeft
    })

    if (!props.native) {
      horizontalThumb.value?.handleScrollbarAppearance()
      verticalThumb.value?.handleScrollbarAppearance()
    }
  }
}

const handleMouseEnter = () => {
  if (!props.native) {
    horizontalThumb.value?.handleScrollbarAppearance()
    verticalThumb.value?.handleScrollbarAppearance()
  }
}

const handleMouseLeave = () => {
  // Appearance is handled by timeout in thumb's handleScrollbarAppearance
}

const update = () => {
  if (!wrap.value) return

  const offsetHeight = wrap.value.offsetHeight
  const offsetWidth = wrap.value.offsetWidth

  if (offsetHeight === 0 || offsetWidth === 0) return

  const originalHeight = offsetHeight ** 2 / wrap.value.scrollHeight
  const originalWidth = offsetWidth ** 2 / wrap.value.scrollWidth

  const height = originalHeight < offsetHeight ? Math.max(originalHeight, props.minSize) : 0
  const width = originalWidth < offsetWidth ? Math.max(originalWidth, props.minSize) : 0

  ratioY.value =
    originalHeight / (offsetHeight - originalHeight) / (height / (offsetHeight - height))
  ratioX.value = originalWidth / (offsetWidth - originalWidth) / (width / (offsetWidth - width))

  sizeHeight.value = height > 0 ? `${height}px` : ''
  sizeWidth.value = width > 0 ? `${width}px` : ''
}

provide(SCROLLBAR_INJECTION_KEY, {
  wrapElement: wrap
})

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  if (!props.native) {
    nextTick(update)
  }
  if (!props.noresize && resize.value) {
    resizeObserver = new ResizeObserver(update)
    resizeObserver.observe(resize.value)
  }
})

onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
})

watch(
  () => props.noresize,
  (noresize) => {
    if (noresize) {
      resizeObserver?.disconnect()
    } else if (resize.value) {
      resizeObserver = new ResizeObserver(update)
      resizeObserver.observe(resize.value)
    }
  }
)

defineExpose({
  wrap,
  update,
  scrollTo(options: ScrollToOptions | number, y?: number) {
    if (typeof options === 'object') {
      wrap.value?.scrollTo(options)
    } else if (typeof options === 'number' && typeof y === 'number') {
      wrap.value?.scrollTo(options, y)
    }
  },
  setScrollTop(value: number) {
    if (wrap.value) wrap.value.scrollTop = value
  },
  setScrollLeft(value: number) {
    if (wrap.value) wrap.value.scrollLeft = value
  }
})
</script>

<style lang="scss">
@use './scrollbar.scss';
</style>
