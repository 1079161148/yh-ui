<template>
  <teleport :to="teleportTo" :disabled="!teleportTo || inner">
    <transition name="yh-drawer-fade" @after-leave="onAfterLeave">
      <div v-if="rendered" v-show="modelValue" :class="[
        ns.e('wrapper'),
        modalClass,
        { [ns.is('active')]: modelValue },
        { [ns.is('with-modal')]: modal },
        { [ns.is('inner')]: inner }
      ]" :style="{ zIndex: drawerZIndex - 1 }" @click.self="handleClose(true)">
        <div ref="drawerRef" v-show="modelValue" :class="[
          ns.b(),
          ns.m(placement),
          { [ns.is('open')]: modelValue },
          { [ns.m('glass')]: glass },
          { [ns.is('round')]: round },
          { [ns.is('inner')]: inner },
          customClass
        ]" :style="[drawerStyles, { zIndex: drawerZIndex }]" role="dialog" aria-modal="true" :aria-labelledby="titleId"
          :aria-describedby="bodyId" @mousedown.stop>
          <!-- Resizable Handle -->
          <div v-if="resizable" :class="[ns.e('handle'), ns.em('handle', placement)]" @mousedown="handleResizeStart">
          </div>

          <div v-if="showHeader" :class="ns.e('header')" :style="titleStyle">
            <slot name="header">
              <span :id="titleId" :class="ns.e('title')">
                <template v-if="typeof title === 'string'">{{ title }}</template>
                <component :is="title" v-else-if="title" />
                <slot v-else name="title" />
              </span>
            </slot>
            <button v-if="showClose" type="button" :class="ns.e('close')" :aria-label="t('dialog.close')"
              @click="handleClose()">
              <slot name="close-icon">
                <yh-icon :name="closeIcon" />
              </slot>
            </button>
          </div>

          <div :id="bodyId" :class="ns.e('body')" :style="contentStyle">
            <slot />
          </div>

          <div v-if="showFooter" :class="ns.e('footer')" :style="footerStyle">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick, type CSSProperties } from 'vue'
import { drawerProps, drawerEmits } from './drawer'
import { YhIcon } from '../../icon'
import { useNamespace, useZIndex, useScrollLock, useLocale } from '@yh-ui/hooks'
import { useComponentTheme } from '@yh-ui/theme'

defineOptions({
  name: 'YhDrawer'
})

const props = defineProps(drawerProps)
const emit = defineEmits(drawerEmits)

const ns = useNamespace('drawer')
const { t } = useLocale()
const { nextZIndex } = useZIndex()

// 组件级 themeOverrides
const { themeStyle } = useComponentTheme('drawer', computed(() => props.themeOverrides))

const drawerRef = ref<HTMLElement | null>(null)
const rendered = ref(false)
const drawerZIndex = ref(props.zIndex || nextZIndex())
const currentSize = ref<string | number>(props.size)

// A11y IDs
const titleId = `yh-drawer-title-${Math.random().toString(36).slice(2, 9)}`
const bodyId = `yh-drawer-body-${Math.random().toString(36).slice(2, 9)}`

const isHorizontal = computed(() => ['left', 'right'].includes(props.placement))

const drawerStyles = computed<CSSProperties>(() => {
  const baseStyle = typeof props.drawerStyle === 'object' ? props.drawerStyle : {}
  const styles: CSSProperties = {
    ...themeStyle.value as any,
    ...baseStyle
  }
  const sizeValue = typeof currentSize.value === 'number' ? `${currentSize.value}px` : currentSize.value

  if (isHorizontal.value) {
    styles.width = sizeValue
  } else {
    styles.height = sizeValue
  }
  return styles
})

// Lock scroll logic
useScrollLock(computed(() => props.modelValue && props.lockScroll))

// Visibility logic
watch(() => props.modelValue, (val: boolean) => {
  if (val) {
    rendered.value = true
    drawerZIndex.value = props.zIndex || nextZIndex()
    emit('open')

    nextTick(() => {
      emit('opened')
    })
  } else {
    emit('close')
  }
}, { immediate: true })

const handleClose = (isClickModal = false) => {
  if (isClickModal && !props.closeOnClickModal) return

  const done = () => {
    emit('update:modelValue', false)
  }

  if (props.beforeClose) {
    props.beforeClose(done)
  } else {
    done()
  }
}

const onAfterLeave = () => {
  emit('closed')
  if (props.destroyOnClose) {
    rendered.value = false
  }
}

// Resizing logic
let startPos = 0
let startSize = 0

const handleResizeStart = (e: MouseEvent) => {
  startPos = isHorizontal.value ? e.clientX : e.clientY
  const rect = drawerRef.value?.getBoundingClientRect()
  if (!rect) return

  startSize = isHorizontal.value ? rect.width : rect.height

  window.addEventListener('mousemove', handleResizeMove)
  window.addEventListener('mouseup', handleResizeEnd)
  document.body.style.cursor = isHorizontal.value ? 'col-resize' : 'row-resize'
  document.body.style.userSelect = 'none'
}

const handleResizeMove = (e: MouseEvent) => {
  const currentPos = isHorizontal.value ? e.clientX : e.clientY
  let diff = currentPos - startPos

  if (props.placement === 'right' || props.placement === 'bottom') {
    diff = -diff
  }

  let newSize = startSize + diff
  newSize = Math.max(props.minSize, Math.min(newSize, props.maxSize))

  currentSize.value = newSize
  emit('resize', newSize)
}

const handleResizeEnd = () => {
  window.removeEventListener('mousemove', handleResizeMove)
  window.removeEventListener('mouseup', handleResizeEnd)
  document.body.style.cursor = ''
  document.body.style.userSelect = ''
}

// Global listeners
const handleKeyDown = (e: KeyboardEvent) => {
  if (props.modelValue && props.closeOnPressEscape && e.key === 'Escape') {
    handleClose()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
})

defineExpose({
  drawerRef,
  handleClose
})
</script>

<style lang="scss">
@use './drawer.scss';
</style>
