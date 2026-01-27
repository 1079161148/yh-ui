<script setup lang="ts">
/**
 * YhPopover - 气泡卡片
 * @description 展示比 Tooltip 更丰富的承载内容
 */
import { ref, computed, watch, nextTick } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { YhTooltip } from '../../tooltip'
import { YhIcon } from '../../icon'
import { popoverProps, popoverEmits } from './popover'

defineOptions({
  name: 'YhPopover'
})

const props = defineProps(popoverProps)
const emit = defineEmits(popoverEmits)
const ns = useNamespace('popover')
const internalVisible = ref(false)
const visible = computed({
  get: () => (props.visible !== null ? props.visible : internalVisible.value),
  set: (val) => {
    internalVisible.value = val
    emit('update:visible', val)
  }
})

const tooltipRef = ref<any>(null)
const triggerWidth = ref<string>('auto')

// 计算内容区域样式
const contentStyle = computed(() => {
  const styles: any = {}

  if (props.matchTriggerWidth) {
    styles.width = triggerWidth.value
  } else if (props.width !== 'auto') {
    styles.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }

  if (props.maxHeight !== 'none') {
    styles.maxHeight = typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight
    styles.overflowY = props.scrollable ? 'auto' : 'hidden'
  }

  return styles
})

const updateTriggerWidth = () => {
  if (props.matchTriggerWidth && tooltipRef.value?.triggerRef) {
    const width = tooltipRef.value.triggerRef.offsetWidth
    triggerWidth.value = `${width}px`
  }
}

const handleShow = () => {
  updateTriggerWidth()
  emit('show')
  emit('update:visible', true)
}

const handleHide = () => {
  emit('hide')
  emit('update:visible', false)
}

// 监听 matchTriggerWidth 变化
watch(() => props.matchTriggerWidth, (val) => {
  if (val) updateTriggerWidth()
})

defineExpose({
  /** 手动控制可见性 */
  toggle: (val: boolean) => (visible.value = val),
  /** 弹出状态 */
  visible
})
</script>

<template>
  <YhTooltip ref="tooltipRef" v-model:visible="visible" :class="ns.b()" :trigger="trigger" :placement="placement"
    :disabled="disabled" :show-arrow="showArrow" :show-after="showAfter" :hide-after="hideAfter" :offset="offset"
    :z-index="zIndex" :effect="effect" :teleported="teleported" :transition="transition" :persistent="persistent"
    :interactive="interactive" :popper-class="`${ns.e('popper')} ${popperClass}`" :popper-style="popperStyle"
    @show="handleShow" @hide="handleHide">
    <!-- 默认插槽：触发元素 -->
    <slot />

    <template #content>
      <div :class="ns.e('content')" :style="contentStyle">
        <!-- 核心内容区 (支持 Icon 侧边对齐) -->
        <div :class="[ns.e('main'), ns.is('has-icon', !!icon || !!$slots.icon)]">
          <!-- 侧边图标栏 -->
          <div v-if="icon || $slots.icon" :class="ns.e('icon')" :style="{ color: iconColor }">
            <slot name="icon">
              <YhIcon :name="icon" />
            </slot>
          </div>

          <!-- 文本内容区 (强制对齐) -->
          <div :class="ns.e('inner')">
            <!-- 头部/标题 -->
            <div v-if="title || $slots.header" :class="ns.e('header')">
              <slot name="header">
                <div :class="ns.e('title')">{{ title }}</div>
              </slot>
            </div>

            <!-- 主体内容 -->
            <div :class="ns.e('body')">
              <slot name="content">
                <div v-if="description" :class="ns.e('description')">{{ description }}</div>
                <template v-if="content">{{ content }}</template>
                <slot v-else />
              </slot>
            </div>
          </div>
        </div>

        <!-- 底部插槽 -->
        <div v-if="$slots.footer" :class="ns.e('footer')">
          <slot name="footer" />
        </div>
      </div>
    </template>
  </YhTooltip>
</template>

<style lang="scss">
@use './popover.scss';
</style>
