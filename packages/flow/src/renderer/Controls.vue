<template>
  <div class="yh-flow-controls" :class="[position]">
    <button
      v-if="showZoom"
      class="yh-flow-controls__btn"
      :title="t('yh.flow.zoomIn')"
      @click="zoomIn"
    >
      <svg viewBox="0 0 24 24" width="16" height="16">
        <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
      </svg>
    </button>
    <button
      v-if="showZoom"
      class="yh-flow-controls__btn"
      :title="t('yh.flow.zoomOut')"
      @click="zoomOut"
    >
      <svg viewBox="0 0 24 24" width="16" height="16">
        <path fill="currentColor" d="M19 13H5v-2h14v2z" />
      </svg>
    </button>
    <div v-if="showZoom && showFitView" class="yh-flow-controls__divider" />
    <button
      v-if="showFitView"
      class="yh-flow-controls__btn"
      :title="t('yh.flow.fitView')"
      @click="handleFitView"
    >
      <svg viewBox="0 0 24 24" width="16" height="16">
        <path
          fill="currentColor"
          d="M15 3l2.3 2.3-2.89 2.87 1.42 1.42L18.7 6.7 21 9V3h-6zM3 9l2.3-2.3 2.87 2.89 1.42-1.42L6.7 5.3 9 3H3v6zm6 12l-2.3-2.3 2.89-2.87-1.42-1.42L5.3 17.3 3 15v6h6zm12-6l-2.3 2.3-2.87-2.89-1.42 1.42 2.89 2.87L15 21h6v-6z"
        />
      </svg>
    </button>
    <button
      v-if="showInteractive"
      class="yh-flow-controls__btn"
      :title="t('yh.flow.lock')"
      @click="toggleLock"
      :class="{ 'is-active': readonly }"
    >
      <svg v-if="readonly" viewBox="0 0 24 24" width="16" height="16">
        <path
          fill="currentColor"
          d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"
        />
      </svg>
      <svg v-else viewBox="0 0 24 24" width="16" height="16">
        <path
          fill="currentColor"
          d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10z"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLocale } from '@yh-ui/hooks'
import { useFlowContext } from '../core/FlowContext'

withDefaults(
  defineProps<{
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
    showZoom?: boolean
    showFitView?: boolean
    showInteractive?: boolean
  }>(),
  {
    position: 'bottom-right',
    showZoom: true,
    showFitView: true,
    showInteractive: true
  }
)

const { t } = useLocale()
const flowInstance = useFlowContext()

// 暂时通过 flowInstance 内部状态管理 readonly，或者 emit 到父组件
// 由于插件系统需要更好的状态同步，这里我们先假设 flowInstance 能处理这些
const readonly = ref(false)

const zoomIn = () => flowInstance.zoomIn()
const zoomOut = () => flowInstance.zoomOut()
const handleFitView = () => flowInstance.fitView()
const toggleLock = () => {
  readonly.value = !readonly.value
  // 如果 FlowInstance 支持，可以同步状态
}
</script>

<style scoped>
.yh-flow-controls {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 5px;
  /* Premium Glassmorphism Effect */
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 10px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  z-index: 10;
}

.yh-flow-controls.bottom-right {
  right: 16px;
  bottom: 16px;
}

.yh-flow-controls.top-right {
  right: 16px;
  top: 16px;
}

.yh-flow-controls.bottom-left {
  left: 16px;
  bottom: 16px;
}

.yh-flow-controls.top-left {
  left: 16px;
  top: 16px;
}

.yh-flow-controls__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: #4b5563;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.yh-flow-controls__btn:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #111827;
  transform: translateY(-1px);
}

.yh-flow-controls__btn.is-active {
  background: #3b82f6;
  color: white;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
}

.yh-flow-controls__divider {
  width: 1px;
  height: 18px;
  background: rgba(0, 0, 0, 0.1);
  margin: 0 2px;
}
</style>
