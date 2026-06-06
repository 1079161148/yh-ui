<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { useComponentTheme, type ComponentThemeVars } from '@yh-ui/theme'
import { aiFileCardProps, aiFileCardEmits } from './ai-file-card'
import { YhIcon } from '../../icon'
import { YhSpin } from '../../spin'
import { YhImageViewer } from '../../image'
import { YhTooltip } from '../../tooltip'

defineOptions({
  name: 'YhAiFileCard'
})

const props = defineProps(aiFileCardProps)
const emit = defineEmits(aiFileCardEmits)

const ns = useNamespace('ai-file-card')

// 图片预览
const imageViewerVisible = ref(false)

// 主题覆盖
const { themeStyle } = useComponentTheme(
  'ai-file-card',
  computed(() => props.themeOverrides as unknown as ComponentThemeVars)
)

// 格式化文件大小
const formatFileSize = (bytes?: number): string => {
  if (!bytes) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let unitIndex = 0
  let size = bytes
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }
  return `${size.toFixed(1)} ${units[unitIndex]}`
}

// 预设图标映射
const iconMap: Record<string, string> = {
  default: 'document',
  excel: 'file-excel',
  image: 'image',
  markdown: 'document',
  pdf: 'file-pdf',
  ppt: 'document',
  word: 'file-word',
  zip: 'folder',
  video: 'file-video',
  audio: 'file-audio',
  java: 'document',
  javascript: 'document',
  python: 'document',
  txt: 'file-txt'
}

// 根据文件类型获取图标
const fileIcon = computed(() => {
  if (props.icon && iconMap[props.icon]) {
    return iconMap[props.icon]
  }
  // 根据 type 判断
  if (props.type === 'image') return 'image'
  if (props.type === 'video') return 'file-video'
  if (props.type === 'audio') return 'file-audio'
  return iconMap.default
})

// 是否显示图片预览
const showImagePreview = computed(() => {
  return props.type === 'image' && props.src
})

// 是否显示视频预览区域（与图片容器一致宽高、占满）
const showVideoPreview = computed(() => props.type === 'video')

// 是否显示音频预览区域（与图片容器一致宽高、占满）
const showAudioPreview = computed(() => props.type === 'audio')

// 有 src 的音频使用横向布局（图标左 + 内容右 + 播放条）
const isHorizontalAudio = computed(() => props.type === 'audio' && !!props.src)

// 音频横向布局：左侧图标尺寸
const audioThumbIconSize = computed(() => {
  if (props.size === 'small') return 18
  if (props.size === 'large') return 32
  return 24
})

// 文件名是否需要 Tooltip（仅当实际溢出时才展示）
const nameRef = ref<HTMLElement | null>(null)
const showNameTooltip = ref(false)

const updateNameTooltip = () => {
  const el = nameRef.value
  if (!el) return
  // 当 scrollWidth 大于可视宽度时，说明发生了省略
  showNameTooltip.value = el.scrollWidth > el.clientWidth + 1
}

const scheduleUpdate = () => {
  nextTick(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(updateNameTooltip)
    })
  })
}

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  scheduleUpdate()
  const el = nameRef.value
  if (el && typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(scheduleUpdate)
    resizeObserver.observe(el)
  }
})

onUnmounted(() => {
  if (resizeObserver && nameRef.value) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
})

watch(() => [props.name, props.size], scheduleUpdate)

// 尺寸映射
const sizeClass = computed(() => {
  return ns.m(props.size || 'default')
})

const handleClick = () => {
  if (!props.loading) {
    // 图片类型点击时打开预览
    if (showImagePreview.value) {
      imageViewerVisible.value = true
    }
    emit('click')
  }
}
</script>

<template>
  <div
    :class="[ns.b(), sizeClass, isHorizontalAudio && ns.is('horizontal-audio')]"
    :style="themeStyle"
    @click="handleClick"
  >
    <!-- 图片类型：加载时显示模糊图，加载完成后过渡为清晰 -->
    <template v-if="showImagePreview">
      <div :class="[ns.e('image-wrapper'), ns.is('image-loading', loading)]">
        <img :src="src" :alt="name" :class="ns.e('image')" v-bind="imageProps" />
        <div v-if="loading" :class="ns.e('image-loading-overlay')">
          <YhSpin />
        </div>
        <!-- 遮罩 -->
        <div v-if="mask" :class="ns.e('mask')">
          <span>{{ mask }}</span>
        </div>
      </div>
    </template>

    <!-- 视频类型：与 Ant Design X 一致，使用原生 <video> 可直接播放；有 src 时展示播放器 -->
    <template v-else-if="showVideoPreview">
      <div :class="ns.e('image-wrapper')">
        <video
          v-if="src"
          :src="src"
          :class="ns.e('media-video')"
          controls
          preload="metadata"
          playsinline
          v-bind="videoProps"
        />
        <div v-else :class="[ns.e('media-placeholder'), ns.e('media-placeholder--video')]">
          <YhIcon :name="fileIcon" :size="size === 'small' ? 32 : size === 'large' ? 64 : 48" />
        </div>
        <div v-if="loading" :class="ns.e('image-loading-overlay')">
          <YhSpin />
        </div>
        <div v-if="mask" :class="ns.e('mask')">
          <span>{{ mask }}</span>
        </div>
      </div>
      <div :class="ns.e('info')">
        <div :class="ns.e('name-wrap')">
          <YhTooltip
            :content="name"
            placement="bottom"
            :popper-class="ns.e('name-tooltip')"
            :disabled="!showNameTooltip"
          >
            <div ref="nameRef" :class="ns.e('name')">
              {{ name }}
            </div>
          </YhTooltip>
        </div>
        <div v-if="byte !== undefined" :class="ns.e('size')">
          {{ formatFileSize(byte) }}
        </div>
        <div v-if="description" :class="ns.e('description')">
          {{ description }}
        </div>
      </div>
    </template>

    <!-- 音频类型：有 src 时使用横向布局（左图标 + 右内容 + 播放条），无 src 时方形占位卡片 -->
    <template v-else-if="showAudioPreview">
      <!-- 有 src：纵向布局（顶部文件信息行 + 底部全宽播放器） -->
      <template v-if="src">
        <div :class="ns.e('audio-header')">
          <div :class="ns.e('audio-thumb')">
            <YhIcon :name="fileIcon" :size="audioThumbIconSize" />
          </div>
          <div :class="ns.e('audio-meta')">
            <div :class="ns.e('name-wrap')">
              <YhTooltip
                :content="name"
                placement="bottom"
                :popper-class="ns.e('name-tooltip')"
                :disabled="!showNameTooltip"
              >
                <div ref="nameRef" :class="ns.e('name')">
                  {{ name }}
                </div>
              </YhTooltip>
            </div>
            <div v-if="byte !== undefined" :class="ns.e('size')">
              {{ formatFileSize(byte) }}
            </div>
          </div>
        </div>
        <audio :src="src" :class="ns.e('media-audio')" controls v-bind="audioProps" />
        <div v-if="loading" :class="ns.e('image-loading-overlay')">
          <YhSpin />
        </div>
      </template>
      <!-- 无 src：方形占位卡片（与之前一致） -->
      <template v-else>
        <div :class="ns.e('image-wrapper')">
          <div :class="[ns.e('media-placeholder'), ns.e('media-placeholder--audio')]">
            <YhIcon :name="fileIcon" :size="size === 'small' ? 32 : size === 'large' ? 64 : 48" />
          </div>
          <div v-if="loading" :class="ns.e('image-loading-overlay')">
            <YhSpin />
          </div>
          <div v-if="mask" :class="ns.e('mask')">
            <span>{{ mask }}</span>
          </div>
        </div>
        <div :class="ns.e('info')">
          <div :class="ns.e('name-wrap')">
            <YhTooltip
              :content="name"
              placement="bottom"
              :popper-class="ns.e('name-tooltip')"
              :disabled="!showNameTooltip"
            >
              <div ref="nameRef" :class="ns.e('name')">
                {{ name }}
              </div>
            </YhTooltip>
          </div>
          <div v-if="byte !== undefined" :class="ns.e('size')">
            {{ formatFileSize(byte) }}
          </div>
          <div v-if="description" :class="ns.e('description')">
            {{ description }}
          </div>
        </div>
      </template>
    </template>

    <!-- 文件类型 -->
    <template v-else>
      <div :class="ns.e('icon-wrapper')">
        <!-- 加载状态 -->
        <YhSpin v-if="loading" />
        <!-- 文件图标 -->
        <YhIcon
          v-else
          :name="fileIcon"
          :size="size === 'small' ? 32 : size === 'large' ? 64 : 48"
        />
      </div>

      <div :class="ns.e('info')">
        <div :class="ns.e('name-wrap')">
          <YhTooltip
            :content="name"
            placement="bottom"
            :popper-class="ns.e('name-tooltip')"
            :disabled="!showNameTooltip"
          >
            <div ref="nameRef" :class="ns.e('name')">
              {{ name }}
            </div>
          </YhTooltip>
        </div>
        <div v-if="byte !== undefined" :class="ns.e('size')">
          {{ formatFileSize(byte) }}
        </div>
        <div v-if="description" :class="ns.e('description')">
          {{ description }}
        </div>
      </div>
    </template>

    <!-- 遮罩层（非图片类型） -->
    <div v-if="mask && !showImagePreview" :class="ns.e('file-mask')">
      <span>{{ mask }}</span>
    </div>

    <!-- 扩展插槽（用于 AiAttachments 传入的删除按钮、进度条等） -->
    <div :class="ns.e('actions')">
      <slot />
    </div>
  </div>

  <!-- 图片预览 -->
  <YhImageViewer
    v-if="showImagePreview && imageViewerVisible"
    :url-list="[src || '']"
    @close="imageViewerVisible = false"
  />
</template>

<style lang="scss">
@use './ai-file-card.scss';
</style>
