<script setup lang="ts">
/**
 * YhPopconfirm - 气泡确认框 (基于极速 Tooltip 引擎重构)
 * @description 融合了业内顶级 UI 的交互优点，提供异步拦截、不再提示等功能
 */
import { ref, watch, computed } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { YhButton } from '../../button'
import { YhCheckbox } from '../../checkbox'
import { YhIcon } from '../../icon'
import { YhTooltip } from '../../tooltip'
import { popconfirmProps, popconfirmEmits } from './popconfirm'

defineOptions({
  name: 'YhPopconfirm'
})

const props = defineProps(popconfirmProps)
const emit = defineEmits(popconfirmEmits)
const ns = useNamespace('popconfirm')

// 内部状态
const internalVisible = ref(false)
const visible = computed({
  get: () => (props.visible !== null ? props.visible : internalVisible.value),
  set: (val) => {
    internalVisible.value = val
    emit('update:visible', val)
  }
})
const confirmLoading = ref(false)
const dontAskAgainChecked = ref(false)

// 处理确认逻辑
const handleConfirm = async () => {
  if (confirmLoading.value) return

  if (props.beforeConfirm) {
    confirmLoading.value = true
    try {
      const result = await props.beforeConfirm()
      if (result !== false) {
        visible.value = false // 先尝试关闭，提供即时反馈
        emit('confirm', dontAskAgainChecked.value)
      }
    } catch (e) {
      // 捕获异常
    } finally {
      confirmLoading.value = false
    }
  } else {
    visible.value = false // 先设置关闭，解除状态锁定
    emit('confirm', dontAskAgainChecked.value)
  }
}

// 处理取消逻辑
const handleCancel = () => {
  if (confirmLoading.value) return
  visible.value = false // 先响应 UI 变更
  emit('cancel')
}

defineExpose({
  visible,
  toggle: (val: boolean) => (visible.value = val)
})
</script>

<template>
  <YhTooltip v-model:visible="visible" :class="ns.b()" trigger="click" :placement="placement" :disabled="disabled"
    :teleported="teleported" :offset="offset" :z-index="zIndex" :show-arrow="showArrow" :show-after="0" :hide-after="0"
    :popper-class="`${ns.e('popper')} ${popperClass}`" :popper-style="popperStyle" persistent interactive>
    <!-- 触发触发元素 -->
    <slot />

    <!-- 气泡框内容 -->
    <template #content>
      <div :class="ns.e('content')" :style="{ width: typeof width === 'number' ? `${width}px` : width }">
        <div :class="ns.e('main')">
          <div v-if="!hideIcon" :class="ns.e('icon')" :style="{ color: iconColor }">
            <slot name="icon">
              <!-- 支持旧版图标名称 -->
              <YhIcon :name="icon" />
            </slot>
          </div>
          <div :class="ns.e('inner')">
            <div :class="ns.e('title')">
              <slot name="title">{{ title }}</slot>
            </div>
            <div v-if="description || $slots.description" :class="ns.e('description')">
              <slot name="description">{{ description }}</slot>
            </div>
          </div>
        </div>

        <!-- YH-UI 自创高级功能：不再提示 -->
        <div v-if="showDontAskAgain" :class="ns.e('extra')">
          <YhCheckbox v-model="dontAskAgainChecked">
            {{ dontAskAgainText }}
          </YhCheckbox>
        </div>

        <div :class="ns.e('footer')" @click.stop>
          <!-- 自创高级功能：交换按钮位置 -->
          <template v-if="swapButtons">
            <YhButton size="small" :type="confirmButtonType" :loading="confirmLoading" @click.stop="handleConfirm">
              {{ confirmButtonText }}
            </YhButton>
            <YhButton v-if="!hideCancel" size="small" :type="cancelButtonType" :disabled="confirmLoading"
              @click.stop="handleCancel">
              {{ cancelButtonText }}
            </YhButton>
          </template>
          <template v-else>
            <YhButton v-if="!hideCancel" size="small" :type="cancelButtonType" :disabled="confirmLoading"
              @click.stop="handleCancel">
              {{ cancelButtonText }}
            </YhButton>
            <YhButton size="small" :type="confirmButtonType" :loading="confirmLoading" @click.stop="handleConfirm">
              {{ confirmButtonText }}
            </YhButton>
          </template>
        </div>
      </div>
    </template>
  </YhTooltip>
</template>

<style lang="scss">
@use './popconfirm.scss';
</style>
