<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
import { useNamespace } from '../../hooks/use-config'
import { imageViewerProps, imageViewerEmits } from './image-viewer'
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.css'

defineOptions({
  name: 'YhImageViewer'
})

const props = defineProps(imageViewerProps)
const emit = defineEmits(imageViewerEmits)

const ns = useNamespace('viewer')

const index = ref(props.initialIndex)
const scale = ref(1)
const rotate = ref(0)
let viewer: Viewer | null = null
let viewerList: HTMLElement | null = null

const transform = computed(() => {
  return `scale(${scale.value}) rotate(${rotate.value}deg)`
})

const handleClose = () => {
  emit('close')
}

// ViewerJS Logic
const initViewerJS = () => {
  const list = document.createElement('div')
  list.style.display = 'none'
  props.urlList.forEach(src => {
    const img = document.createElement('img')
    img.src = src
    list.appendChild(img)
  })
  document.body.appendChild(list)
  viewerList = list

  viewer = new Viewer(list, {
    ...props.viewerOptions,
    initialViewIndex: props.initialIndex,
    hidden: () => {
      if (viewerList) {
        document.body.removeChild(viewerList)
        viewerList = null
      }
      viewer?.destroy()
      viewer = null
      emit('close')
    }
  })
  viewer.show()
}

const handlePrev = () => {
  const len = props.urlList.length
  if (len <= 1) return

  if (index.value > 0) {
    index.value--
  } else if (props.infinite) {
    index.value = len - 1
  }
}

const handleNext = () => {
  const len = props.urlList.length
  if (len <= 1) return

  if (index.value < len - 1) {
    index.value++
  } else if (props.infinite) {
    index.value = 0
  }
}

const handleZoomIn = () => {
  scale.value *= props.zoomRate
}

const handleZoomOut = () => {
  scale.value /= props.zoomRate
}

const handleRotateLeft = () => {
  rotate.value -= 90
}

const handleRotateRight = () => {
  rotate.value += 90
}

const reset = () => {
  scale.value = 1
  rotate.value = 0
}

watch(index, (val: number) => {
  reset()
  emit('switch', val)
})

watch(() => props.initialIndex, (val: number) => {
  index.value = val
})

const handleKeyDown = (e: KeyboardEvent) => {
  if (props.viewerMode === 'viewerjs') return

  if (e.key === 'Escape' && props.closeOnPressEscape) {
    handleClose()
  } else if (e.key === 'ArrowLeft') {
    handlePrev()
  } else if (e.key === 'ArrowRight') {
    handleNext()
  } else if (e.key === 'ArrowUp') {
    handleZoomIn()
  } else if (e.key === 'ArrowDown') {
    handleZoomOut()
  }
}

onMounted(() => {
  if (props.viewerMode === 'viewerjs') {
    initViewerJS()
  } else {
    window.addEventListener('keydown', handleKeyDown)
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  if (viewer) {
    viewer.destroy()
    viewer = null
  }
  if (viewerList) {
    document.body.removeChild(viewerList)
    viewerList = null
  }
})
</script>

<template>
  <Teleport to="body" :disabled="!teleported">
    <div v-if="viewerMode !== 'viewerjs'" :class="ns.b()" :style="{ zIndex }">
      <div :class="ns.e('mask')" @click="hideOnClickModal && handleClose()"></div>

      <!-- Close -->
      <span :class="[ns.e('btn'), ns.e('close')]" @click="handleClose">
        <svg viewBox="0 0 1024 1024" width="1em" height="1em">
          <path fill="currentColor"
            d="M512 456.2L794.8 173.4l55.8 55.8L567.8 512l282.8 282.8-55.8 55.8L512 567.8 229.2 850.6l-55.8-55.8L456.2 512 173.4 229.2l55.8-55.8L512 456.2z" />
        </svg>
      </span>

      <!-- Arrows -->
      <template v-if="urlList.length > 1">
        <span :class="[ns.e('btn'), ns.e('prev')]" @click="handlePrev">
          <svg viewBox="0 0 1024 1024" width="1em" height="1em">
            <path fill="currentColor"
              d="M609.4 824.6L296.8 512l312.6-312.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L228.9 489.4c-12.5 12.5-12.5 32.8 0 45.3l335.2 335.2c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3z" />
          </svg>
        </span>
        <span :class="[ns.e('btn'), ns.e('next')]" @click="handleNext">
          <svg viewBox="0 0 1024 1024" width="1em" height="1em">
            <path fill="currentColor"
              d="M414.6 824.6l312.6-312.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L346.7 802.1c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L727.2 512 414.6 199.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l335.2 335.2c12.5 12.5 12.5 32.8 0 45.3L369.3 915.1c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
          </svg>
        </span>
      </template>

      <!-- Actions -->
      <div v-if="showProgress" :class="ns.e('actions')">
        <div :class="ns.e('actions-inner')">
          <i :class="ns.e('zoom-out')" @click="handleZoomOut"><svg viewBox="0 0 1024 1024" width="1em" height="1em">
              <path fill="currentColor" d="M192 480h640v64H192z" />
            </svg></i>
          <i :class="ns.e('zoom-in')" @click="handleZoomIn"><svg viewBox="0 0 1024 1024" width="1em" height="1em">
              <path fill="currentColor" d="M480 480V224h64v256h256v64H544v256h-64V544H224v-64h256z" />
            </svg></i>
          <i :class="ns.e('reset')" @click="reset"><svg viewBox="0 0 1024 1024" width="1em" height="1em">
              <path fill="currentColor"
                d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 64a384 384 0 1 0 0 768 384 384 0 0 0 0-768zm0 128a256 256 0 1 1 0 512 256 256 0 0 1 0-512z" />
            </svg></i>
          <i :class="ns.e('rotate-left')" @click="handleRotateLeft">
            <svg viewBox="0 0 1024 1024" width="1em" height="1em">
              <path fill="currentColor"
                d="M512 128c-212.1 0-384 171.9-384 384s171.9 384 384 384 384-171.9 384-384h-64c0 176.7-143.3 320-320 320s-320-143.3-320-320 143.3-320 320-320v64l192-128-192-128v64z" />
            </svg>
          </i>
          <i :class="ns.e('rotate-right')" @click="handleRotateRight">
            <svg viewBox="0 0 1024 1024" width="1em" height="1em">
              <path fill="currentColor"
                d="M512 128V64L320 192l192 128v-64c176.7 0 320 143.3 320 320s-143.3 320-320 320-320-143.3-320-320h-64c0 212.1 171.9 384 384 384s384-171.9 384-384-171.9-384-384-384z" />
            </svg>
          </i>
        </div>
      </div>

      <!-- Canvas -->
      <div :class="ns.e('canvas')">
        <img :src="urlList[index]" :class="ns.e('img')" :style="{ transform }" />
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss">
@use './image.scss';
</style>
