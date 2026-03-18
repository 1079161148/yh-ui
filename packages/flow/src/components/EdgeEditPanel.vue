<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { Edge, EdgeStyle, EdgeTypes } from '../types'
import { getAllCustomEdges, getAllEdgeTemplates } from '../utils/custom-types'

const props = defineProps<{
  edge: Edge | null
  visible: boolean
  edgeTypes?: EdgeTypes
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
        labelColor: edge.labelColor || '#000000',
        labelShowBg: !!edge.labelShowBg,
        labelBgColor: edge.labelBgColor || '#ffffff'
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

const updateLabelColor = (color: string) => {
  localEdge.value.labelColor = color
  emit('update', { labelColor: color })
}

const updateLabelBg = (color: string | null) => {
  if (color === null) {
    localEdge.value.labelShowBg = false
    emit('update', { labelShowBg: false })
  } else {
    localEdge.value.labelShowBg = true
    localEdge.value.labelBgColor = color
    emit('update', { labelShowBg: true, labelBgColor: color })
  }
}

const handleClose = () => {
  emit('close')
}

const handleStrokeWidth = (event: Event) => {
  const value = parseFloat((event.target as HTMLInputElement).value)
  updateStyle('strokeWidth', value)
}

const allEdgeTypes = computed(() => {
  const typeMap = new Map<string, { value: string; label: string }>()

  // 1. Presets (Highest priority for base labels)
  const presets = [
    { value: 'bezier', label: '贝塞尔曲线' },
    { value: 'smoothstep', label: '平滑阶梯' },
    { value: 'step', label: '阶梯' },
    { value: 'straight', label: '直线' }
  ]
  presets.forEach((p) => typeMap.set(p.value, p))

  // 2. From global registry
  getAllCustomEdges().forEach((e) => {
    if (!typeMap.has(e.type)) {
      typeMap.set(e.type, { value: e.type, label: e.label || `自定义: ${e.type}` })
    }
  })

  // 3. From edge templates
  getAllEdgeTemplates().forEach((t) => {
    if (!typeMap.has(t.type)) {
      typeMap.set(t.type, { value: t.type, label: t.label || `模板: ${t.type}` })
    }
  })

  // 4. From props.edgeTypes (scoped)
  if (props.edgeTypes) {
    Object.keys(props.edgeTypes).forEach((type) => {
      if (!typeMap.has(type)) {
        typeMap.set(type, { value: type, label: `局部组件: ${type}` })
      }
    })
  }

  // 5. Fallback for the current edge type if it's missing in all above
  if (props.edge?.type && !typeMap.has(props.edge.type)) {
    typeMap.set(props.edge.type, { value: props.edge.type, label: `未知类型: ${props.edge.type}` })
  }

  return Array.from(typeMap.values())
})
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
              <option v-for="t in allEdgeTypes" :key="t.value" :value="t.value">
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
            <div class="color-picker-row">
              <input
                type="color"
                :value="edge.style?.stroke || '#b1b1b7'"
                class="modern-color-picker"
                @input="(e) => updateStyle('stroke', (e.target as HTMLInputElement).value)"
              />
              <span class="color-value">{{ edge.style?.stroke || '#b1b1b7' }}</span>
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
            <label>标签文字颜色</label>
            <div class="color-picker-row">
              <input
                type="color"
                :value="localEdge.labelColor"
                class="modern-color-picker"
                @input="(e) => updateLabelColor((e.target as HTMLInputElement).value)"
              />
              <span class="color-value">{{ localEdge.labelColor }}</span>
            </div>
          </div>

          <div class="form-group">
            <label>标签背景颜色</label>
            <div class="color-picker-row">
              <button
                class="color-swatch none-swatch"
                :class="{ active: !localEdge.labelShowBg }"
                @click="updateLabelBg(null)"
              >
                ×
              </button>
              <template v-if="localEdge.labelShowBg">
                <input
                  type="color"
                  v-model="localEdge.labelBgColor"
                  class="modern-color-picker"
                  @input="updateLabelBg(localEdge.labelBgColor || '#ffffff')"
                />
                <span class="color-value">{{ localEdge.labelBgColor }}</span>
              </template>
              <button v-else class="add-bg-btn" @click="updateLabelBg('#ffffff')">
                启用背景
              </button>
            </div>
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

.color-picker-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.modern-color-picker {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 36px;
  height: 36px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.modern-color-picker::-webkit-color-swatch {
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.05);
}

.modern-color-picker::-moz-color-swatch {
  border-radius: 6px;
  border: 1px solid #e2e8f0;
}

.color-value {
  font-size: 13px;
  color: #64748b;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  text-transform: uppercase;
}

.add-bg-btn {
  font-size: 12px;
  color: #3b82f6;
  background: white;
  border: 1px solid #3b82f6;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.add-bg-btn:hover {
  background: #eff6ff;
  border-color: #2563eb;
  color: #2563eb;
}

.color-swatch {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: 2px solid transparent;
  cursor: pointer;
  padding: 0;
}

.color-swatch.active {
  border-color: #3b82f6 !important;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}

.none-swatch {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border: 1px dashed #ccc !important;
  color: #999;
  font-size: 16px;
  font-weight: bold;
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
