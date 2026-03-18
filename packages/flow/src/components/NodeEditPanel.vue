<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Node, NodeStyle, NodeData } from '../types'

const props = defineProps<{
  node: Node | null
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'update', node: Partial<Node>): void
  (e: 'close'): void
}>()

interface NodeForm {
  label: string
  description: string
  width?: number
  height?: number
  type?: string
  style?: NodeStyle
}

const localNode = ref<NodeForm & { labelColor?: string; descriptionColor?: string }>({
  label: '',
  description: ''
})

/** 常见业务字段扩展接口，避免使用 any */
interface CommonDataFields extends NodeData {
  title?: string
  name?: string
  text?: string
  desc?: string
}

watch(
  () => props.node,
  (node) => {
    if (node) {
      const data = node.data as CommonDataFields
      // 寻找最合适的展示标签
      const displayLabel = data.label || data.title || data.name || data.text || node.id

      localNode.value = {
        label: String(displayLabel),
        description: data.description || data.desc || '',
        labelColor: node.labelColor || '#303133',
        descriptionColor: node.descriptionColor || '#909399',
        width: node.width || document.getElementById(`node-${node.id}`)?.offsetWidth || 150,
        height: node.height || document.getElementById(`node-${node.id}`)?.offsetHeight || 40,
        type: node.type
      }
    }
  },
  { immediate: true }
)

const updateLabelColor = (color: string) => {
  localNode.value.labelColor = color
  emit('update', { labelColor: color })
}

const updateDescriptionColor = (color: string) => {
  localNode.value.descriptionColor = color
  emit('update', { descriptionColor: color })
}

const updateLabel = () => {
  if (!props.node) return
  const data = { ...props.node.data } as CommonDataFields

  // 决定更新哪个字段
  if ('label' in data || !('title' in data || 'name' in data || 'text' in data)) {
    data.label = localNode.value.label
  } else if ('title' in data) {
    data.title = localNode.value.label
  } else if ('name' in data) {
    data.name = localNode.value.label
  } else if ('text' in data) {
    data.text = localNode.value.label
  }

  emit('update', { data })
}

const updateDescription = () => {
  if (!props.node) return
  const data = { ...props.node.data } as CommonDataFields

  if ('description' in data || !('desc' in data)) {
    data.description = localNode.value.description
  } else {
    data.desc = localNode.value.description
  }

  emit('update', { data })
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

const handleBorderRadius = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  updateStyle('borderRadius', `${value}px`)
}

const getBorderColor = () => {
  const border = props.node?.style?.border
  if (typeof border === 'string') {
    const match = border.match(/#(?:[0-9a-fA-F]{3}){1,2}|rgb\(.*?\)|rgba\(.*?\)/)
    return match ? match[0] : '#dddddd'
  }
  return '#dddddd'
}
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
            <div class="color-picker-row">
              <input
                type="color"
                :value="node.style?.backgroundColor || '#ffffff'"
                class="modern-color-picker"
                @input="(e) => updateStyle('backgroundColor', (e.target as HTMLInputElement).value)"
              />
              <span class="color-value">{{ node.style?.backgroundColor || '#ffffff' }}</span>
            </div>
          </div>

          <div class="form-group">
            <label>边框颜色</label>
            <div class="color-picker-row">
              <input
                type="color"
                :value="getBorderColor()"
                class="modern-color-picker"
                @input="
                  (e) => updateStyle('border', `1px solid ${(e.target as HTMLInputElement).value}`)
                "
              />
              <span class="color-value">{{ getBorderColor() }}</span>
            </div>
          </div>

          <div class="form-group">
            <label>圆角</label>
            <input
              :value="parseInt(String(node.style?.borderRadius || '8'))"
              type="range"
              min="0"
              max="20"
              @input="handleBorderRadius"
            />
          </div>

          <div class="form-group">
            <label>标签文字颜色</label>
            <div class="color-picker-row">
              <input
                type="color"
                :value="localNode.labelColor"
                class="modern-color-picker"
                @input="(e) => updateLabelColor((e.target as HTMLInputElement).value)"
              />
              <span class="color-value">{{ localNode.labelColor }}</span>
            </div>
          </div>

          <div class="form-group">
            <label>文字描述颜色</label>
            <div class="color-picker-row">
              <input
                type="color"
                :value="localNode.descriptionColor"
                class="modern-color-picker"
                @input="(e) => updateDescriptionColor((e.target as HTMLInputElement).value)"
              />
              <span class="color-value">{{ localNode.descriptionColor }}</span>
            </div>
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
