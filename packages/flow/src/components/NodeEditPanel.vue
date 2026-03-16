<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Node, NodeStyle } from '../types'

const props = defineProps<{
  node: Node | null
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'update', node: Partial<Node>): void
  (e: 'close'): void
}>()

const localNode = ref<Partial<Node>>({})

watch(
  () => props.node,
  (node) => {
    if (node) {
      localNode.value = {
        label: node.data?.label || node.id,
        description: node.data?.description || '',
        style: { ...node.style },
        width: node.width,
        height: node.height,
        type: node.type
      }
    }
  },
  { immediate: true }
)

const updateLabel = () => {
  emit('update', {
    data: {
      ...props.node?.data,
      label: localNode.value.label
    }
  })
}

const updateDescription = () => {
  emit('update', {
    data: {
      ...props.node?.data,
      description: localNode.value.description
    }
  })
}

const updateStyle = (key: keyof NodeStyle, value: string | number) => {
  const newStyle = { ...props.node?.style, [key]: value }
  emit('update', { style: newStyle })
}

const updateSize = () => {
  emit('update', {
    width: localNode.value.width,
    height: localNode.value.height
  })
}

const handleClose = () => {
  emit('close')
}

const colors = [
  '#fff',
  '#f8f9fa',
  '#e9ecef',
  '#dee2e6',
  '#ced4da',
  '#3b82f6',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6'
]

const borderColors = [
  '#ddd',
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
      <div v-if="visible && node" class="node-edit-panel">
        <div class="panel-header">
          <span class="panel-title">编辑节点</span>
          <button class="close-btn" @click="handleClose">×</button>
        </div>

        <div class="panel-content">
          <div class="form-group">
            <label>标签</label>
            <input
              v-model="localNode.label"
              type="text"
              placeholder="节点标签"
              @blur="updateLabel"
              @keyup.enter="updateLabel"
            />
          </div>

          <div class="form-group">
            <label>描述</label>
            <textarea
              v-model="localNode.description"
              placeholder="节点描述"
              rows="2"
              @blur="updateDescription"
            />
          </div>

          <div class="form-group">
            <label>尺寸</label>
            <div class="size-inputs">
              <input
                v-model.number="localNode.width"
                type="number"
                min="50"
                max="800"
                placeholder="宽度"
                @blur="updateSize"
              />
              <span>×</span>
              <input
                v-model.number="localNode.height"
                type="number"
                min="30"
                max="600"
                placeholder="高度"
                @blur="updateSize"
              />
            </div>
          </div>

          <div class="form-group">
            <label>背景色</label>
            <div class="color-picker">
              <button
                v-for="color in colors"
                :key="color"
                class="color-swatch"
                :class="{ active: node.style?.backgroundColor === color }"
                :style="{ backgroundColor: color }"
                @click="updateStyle('backgroundColor', color)"
              />
            </div>
          </div>

          <div class="form-group">
            <label>边框颜色</label>
            <div class="color-picker">
              <button
                v-for="color in borderColors"
                :key="color"
                class="color-swatch"
                :class="{ active: node.style?.border?.includes(color) }"
                :style="{ backgroundColor: color }"
                @click="updateStyle('border', `1px solid ${color}`)"
              />
            </div>
          </div>

          <div class="form-group">
            <label>圆角</label>
            <input
              :value="parseInt(String(node.style?.borderRadius || '8'))"
              type="range"
              min="0"
              max="20"
              @input="updateStyle('borderRadius', `${($event.target as HTMLInputElement).value}px`)"
            />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.node-edit-panel {
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
.form-group input[type='number'],
.form-group textarea {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 13px;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3b82f6;
}

.form-group textarea {
  resize: vertical;
}

.size-inputs {
  display: flex;
  align-items: center;
  gap: 8px;
}

.size-inputs input {
  flex: 1;
}

.size-inputs span {
  color: #999;
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
