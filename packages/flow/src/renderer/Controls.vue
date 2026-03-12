<template>
  <div class="yh-flow-controls">
    <button class="yh-flow-controls__btn" :title="t('yh.flow.zoomIn')" @click="zoomIn">
      <svg viewBox="0 0 24 24" width="16" height="16">
        <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
      </svg>
    </button>
    <button class="yh-flow-controls__btn" :title="t('yh.flow.zoomOut')" @click="zoomOut">
      <svg viewBox="0 0 24 24" width="16" height="16">
        <path fill="currentColor" d="M19 13H5v-2h14v2z" />
      </svg>
    </button>
    <div class="yh-flow-controls__divider" />
    <button class="yh-flow-controls__btn" :title="t('yh.flow.fitView')" @click="handleFitView">
      <svg viewBox="0 0 24 24" width="16" height="16">
        <path
          fill="currentColor"
          d="M15 3l2.3 2.3-2.89 2.87 1.42 1.42L18.7 6.7 21 9V3h-6zM3 9l2.3-2.3 2.87 2.89 1.42-1.42L6.7 5.3 9 3H3v6zm6 12l-2.3-2.3 2.89-2.87-1.42-1.42L5.3 17.3 3 15v6h6zm12-6l-2.3 2.3-2.87-2.89-1.42 1.42 2.89 2.87L15 21h6v-6z"
        />
      </svg>
    </button>
    <button
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
import { useLocale } from '@yh-ui/hooks'

const props = defineProps<{
  zoom: number
  readonly?: boolean
}>()

const emit = defineEmits<{
  (e: 'zoomIn'): void
  (e: 'zoomOut'): void
  (e: 'fitView'): void
  (e: 'update:readonly', value: boolean): void
}>()

const { t } = useLocale()

const zoomIn = () => emit('zoomIn')
const zoomOut = () => emit('zoomOut')
const handleFitView = () => emit('fitView')
const toggleLock = () => emit('update:readonly', !props.readonly)
</script>

<style scoped>
.yh-flow-controls {
  position: absolute;
  left: 10px;
  bottom: 10px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.yh-flow-controls__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: #4b5563;
  transition:
    background-color 0.2s,
    color 0.2s;
}

.yh-flow-controls__btn:hover {
  background: #f3f4f6;
  color: #1f2937;
}

.yh-flow-controls__btn.is-active {
  background: #3b82f6;
  color: white;
}

.yh-flow-controls__divider {
  width: 1px;
  height: 20px;
  background: #e5e7eb;
  margin: 0 4px;
}
</style>
