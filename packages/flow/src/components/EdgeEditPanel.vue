<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Edge, EdgeStyle, EdgeType } from '../types'

const props = defineProps<{
  edge: Edge | null
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'update', edge: Partial<Edge>): void
  (e: 'close'): void
}>()

const localEdge = ref<Partial<Edge>>({})

watch(
  () => props.edge,
  (edge) => {
    if (edge) {
      localEdge.value = {
        label: edge.label || '',
        type: edge.type || 'bezier',
        animated: edge.animated || false,
        style: { ...edge.style },
        labelStyle: { ...edge.labelStyle },
        labelShowBg: !!edge.labelShowBg,
        labelBgColor: edge.labelBgColor || '#fff'
      }
    }
  },
  { immediate: true }
)

const updateLabel = () => {
  emit('update', { label: localEdge.value.label })
}

const updateType = () => {
  emit('update', { type: localEdge.value.type })
}

const updateAnimated = () => {
  emit('update', { animated: localEdge.value.animated })
}

const updateStyle = (key: keyof EdgeStyle, value: string | number) => {
  const newStyle = { ...props.edge?.style, [key]: value }
  emit('update', { style: newStyle })
}

const updateLabelBg = () => {
  emit('update', {
    labelShowBg: localEdge.value.labelShowBg,
    labelBgColor: localEdge.value.labelBgColor
  })
}

const handleClose = () => {
  emit('close')
}

const handleStrokeWidth = (event: Event) => {
  const value = parseFloat((event.target as HTMLInputElement).value)
  updateStyle('strokeWidth', value)
}

const edgeTypes: { value: EdgeType; label: string }[] = [
  { value: 'bezier', label: '贝塞尔曲线' },
  { value: 'smoothstep', label: '平滑阶梯' },
  { value: 'step', label: '阶梯' },
  { value: 'straight', label: '直线' }
]

const strokeColors = [
  '#b1b1b7',
  '#3b82f6',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#ec4899',
  '#06b6d4'
]
</script>

<template>
  <Teleport to="body">
    <Transition name="slide-fade">
      <div v-if="visible && edge" class="edge-edit-panel">
        <div class="panel-header">
          <span class="panel-title">编辑连线</span>
          <button class="close-btn" @click="handleClose">×</button>
        </div>

        <div class="panel-content">
          <div class="form-group">
            <label>标签</label>
            <input
              v-model="localEdge.label"
              type="text"
              placeholder="连线标签"
              @blur="updateLabel"
              @keyup.enter="updateLabel"
            />
          </div>

          <div class="form-group">
            <label>连线类型</label>
            <select v-model="localEdge.type" @change="updateType">
              <option v-for="t in edgeTypes" :key="t.value" :value="t.value">
                {{ t.label }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label class="checkbox-label">
              <input v-model="localEdge.animated" type="checkbox" @change="updateAnimated" />
              动画连线
            </label>
          </div>

          <div class="form-group">
            <label>线条颜色</label>
            <div class="color-picker">
              <button
                v-for="color in strokeColors"
                :key="color"
                class="color-swatch"
                :class="{ active: edge.style?.stroke === color }"
                :style="{ backgroundColor: color }"
                @click="updateStyle('stroke', color)"
              />
            </div>
          </div>

          <div class="form-group">
            <label>线条宽度</label>
            <input
              :value="edge.style?.strokeWidth || 1.5"
              type="range"
              min="1"
              max="6"
              step="0.5"
              @input="handleStrokeWidth"
            />
          </div>

          <div class="form-group">
            <label class="checkbox-label">
              <input v-model="localEdge.labelShowBg" type="checkbox" @change="updateLabelBg" />
              显示标签背景
            </label>
          </div>

          <div v-if="localEdge.labelShowBg" class="form-group">
            <label>标签背景色</label>
            <input v-model="localEdge.labelBgColor" type="color" @change="updateLabelBg" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.edge-edit-panel {
  position: fixed;
  right: 20px;
  top: 100px;
  width: 280px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 1000;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
}

.panel-title {
  font-weight: 600;
  font-size: 14px;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #999;
  padding: 0;
  line-height: 1;
}

.close-btn:hover {
  color: #333;
}

.panel-content {
  padding: 16px;
  max-height: 70vh;
  overflow-y: auto;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-size: 12px;
  color: #666;
  margin-bottom: 6px;
}

.form-group input[type='text'],
.form-group select {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 13px;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #3b82f6;
}

.checkbox-label {
  display: flex !important;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.checkbox-label input[type='checkbox'] {
  width: auto;
}

.color-picker {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.color-swatch {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 2px solid transparent;
  cursor: pointer;
  padding: 0;
}

.color-swatch.active {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}

.form-group input[type='range'] {
  width: 100%;
}

.form-group input[type='color'] {
  width: 100%;
  height: 32px;
  padding: 2px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
