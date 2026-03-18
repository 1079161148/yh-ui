<script setup lang="ts">
import { ref, watch, computed } from 'vue'
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
  style?: Record<string, unknown>
  // AI workflow specific fields
  model?: string
  prompt?: string
  temperature?: number
  maxTokens?: number
  tools?: string[]
  toolName?: string
  condition?: string
  memoryType?: string
  status?: 'pending' | 'running' | 'success' | 'error'
  streamOutput?: string
}

const localNode = ref<NodeForm>({
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

// 判断是否为 AI 工作流节点
const isAiWorkflowNode = computed(() => {
  if (!props.node) return false
  const type = props.node.type
  return type?.startsWith('ai-')
})

// 判断是否为特定类型的 AI 节点
const isAiLlmNode = computed(() => props.node?.type === 'ai-llm')
const isAiPromptNode = computed(() => props.node?.type === 'ai-prompt')
const isAiAgentNode = computed(() => props.node?.type === 'ai-agent')
const isAiToolNode = computed(() => props.node?.type === 'ai-tool')
const isAiConditionNode = computed(() => props.node?.type === 'ai-condition')
const isAiMemoryNode = computed(() => props.node?.type === 'ai-memory')

// LLM 模型选项
const llmModels = [
  { value: 'gpt-4', label: 'GPT-4' },
  { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
  { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
  { value: 'claude-3-opus', label: 'Claude 3 Opus' },
  { value: 'claude-3-sonnet', label: 'Claude 3 Sonnet' },
  { value: 'claude-3-haiku', label: 'Claude 3 Haiku' }
]

// 可用工具选项
const availableTools = [
  { value: 'search', label: '🔍 搜索' },
  { value: 'calculator', label: '🧮 计算器' },
  { value: 'weather', label: '🌤️ 天气查询' },
  { value: 'code_interpreter', label: '💻 代码执行' },
  { value: 'web_fetch', label: '🌐 网页获取' }
]

// 记忆类型选项
const memoryTypes = [
  { value: 'short', label: '短期记忆' },
  { value: 'long', label: '长期记忆' },
  { value: 'session', label: '会话记忆' }
]

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
        style: { ...node.style },
        width: node.width,
        height: node.height,
        type: node.type,
        // AI workflow fields - explicitly cast to correct types
        model: (data?.model as string) || 'gpt-4',
        prompt: (data?.prompt as string) || '',
        temperature: (data?.temperature as number) ?? 0.7,
        maxTokens: (data?.maxTokens as number) ?? 2000,
        tools: (data?.tools as string[]) || [],
        toolName: (data?.toolName as string) || '',
        condition: (data?.condition as string) || '',
        memoryType: (data?.memoryType as string) || 'short',
        status: (data?.status as 'pending' | 'running' | 'success' | 'error') || 'pending',
        streamOutput: (data?.streamOutput as string) || ''
      }
    }
  },
  { immediate: true }
)

const updateField = (field: keyof NodeForm, value: string | number | string[] | undefined) => {
  const updateData: NodeData = { ...props.node?.data }
  ;(updateData as Record<string, unknown>)[field] = value
  emit('update', { data: updateData })
}

const handleLabelBlur = () => {
  if (!props.node) return
  const data = { ...props.node.data } as CommonDataFields

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

const handleModelChange = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value
  updateField('model', value)
}

const handlePromptBlur = () => {
  updateField('prompt', localNode.value.prompt)
}

const handleTemperatureChange = (event: Event) => {
  const value = parseFloat((event.target as HTMLInputElement).value)
  updateField('temperature', value)
}

const handleMaxTokensChange = (event: Event) => {
  const value = parseInt((event.target as HTMLInputElement).value)
  updateField('maxTokens', value)
}

const toggleTool = (toolValue: string) => {
  const currentTools = localNode.value.tools || []
  const newTools = currentTools.includes(toolValue)
    ? currentTools.filter((t) => t !== toolValue)
    : [...currentTools, toolValue]
  localNode.value.tools = newTools
  updateField('tools', newTools)
}

const handleToolNameBlur = () => {
  updateField('toolName', localNode.value.toolName)
}

const handleConditionBlur = () => {
  updateField('condition', localNode.value.condition)
}

const handleMemoryTypeChange = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value
  updateField('memoryType', value)
}

const handleClose = () => {
  emit('close')
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
      <div v-if="visible && node" class="ai-node-edit-panel">
        <div class="panel-header">
          <span class="panel-title">
            <span v-if="isAiLlmNode">🧠 LLM 配置</span>
            <span v-else-if="isAiPromptNode">💬 提示词配置</span>
            <span v-else-if="isAiAgentNode">🤖 Agent 配置</span>
            <span v-else-if="isAiToolNode">🔧 工具配置</span>
            <span v-else-if="isAiConditionNode">🔀 条件配置</span>
            <span v-else-if="isAiMemoryNode">💾 记忆配置</span>
            <span v-else>编辑节点</span>
          </span>
          <button class="close-btn" @click="handleClose">×</button>
        </div>

        <div class="panel-content">
          <!-- 通用字段 -->
          <div class="form-group">
            <label>标签</label>
            <input
              v-model="localNode.label"
              type="text"
              placeholder="节点标签"
              @blur="handleLabelBlur"
              @keyup.enter="handleLabelBlur"
            />
          </div>

          <!-- LLM 节点配置 -->
          <template v-if="isAiLlmNode">
            <div class="form-group">
              <label>模型</label>
              <select :value="localNode.model" class="form-select" @change="handleModelChange">
                <option v-for="model in llmModels" :key="model.value" :value="model.value">
                  {{ model.label }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label>Temperature ({{ localNode.temperature }})</label>
              <input
                :value="localNode.temperature"
                type="range"
                min="0"
                max="2"
                step="0.1"
                @input="handleTemperatureChange"
              />
              <div class="range-labels">
                <span>精确</span>
                <span>创意</span>
              </div>
            </div>

            <div class="form-group">
              <label>Max Tokens</label>
              <input
                :value="localNode.maxTokens"
                type="number"
                min="100"
                max="32000"
                @change="handleMaxTokensChange"
              />
            </div>

            <div class="form-group">
              <label>状态</label>
              <div class="status-badges">
                <span
                  class="status-badge"
                  :class="{ active: localNode.status === 'pending', 'status-pending': true }"
                  >○ 待运行</span
                >
                <span
                  class="status-badge"
                  :class="{ active: localNode.status === 'running', 'status-running': true }"
                  >● 运行中</span
                >
                <span
                  class="status-badge"
                  :class="{ active: localNode.status === 'success', 'status-success': true }"
                  >✓ 成功</span
                >
                <span
                  class="status-badge"
                  :class="{ active: localNode.status === 'error', 'status-error': true }"
                  >✗ 错误</span
                >
              </div>
            </div>

            <!-- 流式输出预览 -->
            <div class="form-group" v-if="localNode.status === 'running'">
              <label>流式输出</label>
              <div class="stream-preview">
                <span class="streaming-cursor">▊</span>
                <span class="stream-text">{{ localNode.streamOutput || '正在生成...' }}</span>
              </div>
            </div>
          </template>

          <!-- 提示词节点配置 -->
          <template v-if="isAiPromptNode">
            <div class="form-group">
              <label>提示词内容</label>
              <textarea
                v-model="localNode.prompt"
                placeholder="输入提示词模板，可以使用 &#123;&#123;variable&#125;&#125; 语法"
                rows="6"
                @blur="handlePromptBlur"
              />
              <div class="form-hint">支持 &#123;&#123;variable&#125;&#125; 变量语法</div>
            </div>
          </template>

          <!-- Agent 节点配置 -->
          <template v-if="isAiAgentNode">
            <div class="form-group">
              <label>选择工具</label>
              <div class="tools-checkboxes">
                <label v-for="tool in availableTools" :key="tool.value" class="tool-checkbox">
                  <input
                    type="checkbox"
                    :checked="localNode.tools?.includes(tool.value)"
                    @change="toggleTool(tool.value)"
                  />
                  <span>{{ tool.label }}</span>
                </label>
              </div>
            </div>
          </template>

          <!-- 工具节点配置 -->
          <template v-if="isAiToolNode">
            <div class="form-group">
              <label>工具名称</label>
              <input
                v-model="localNode.toolName"
                type="text"
                placeholder="输入工具名称"
                @blur="handleToolNameBlur"
              />
            </div>
          </template>

          <!-- 条件节点配置 -->
          <template v-if="isAiConditionNode">
            <div class="form-group">
              <label>条件表达式</label>
              <input
                v-model="localNode.condition"
                type="text"
                placeholder="例如: score > 60"
                @blur="handleConditionBlur"
              />
              <div class="form-hint">满足条件走下方输出，不满足走右侧输出</div>
            </div>
          </template>

          <!-- 记忆节点配置 -->
          <template v-if="isAiMemoryNode">
            <div class="form-group">
              <label>记忆类型</label>
              <select
                :value="localNode.memoryType"
                class="form-select"
                @change="handleMemoryTypeChange"
              >
                <option v-for="mem in memoryTypes" :key="mem.value" :value="mem.value">
                  {{ mem.label }}
                </option>
              </select>
            </div>
          </template>

          <!-- 通用样式配置 -->
          <template v-if="!isAiWorkflowNode">
            <div class="form-group">
              <label>尺寸</label>
              <div class="size-inputs">
                <input
                  v-model.number="localNode.width"
                  type="number"
                  min="50"
                  max="800"
                  @blur="updateSize"
                />
                <span>×</span>
                <input
                  v-model.number="localNode.height"
                  type="number"
                  min="30"
                  max="600"
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
                  :style="{ backgroundColor: color }"
                  @click="updateStyle('border', `1px solid ${color}`)"
                />
              </div>
            </div>
          </template>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.ai-node-edit-panel {
  position: fixed;
  right: 20px;
  top: 100px;
  width: 320px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  z-index: 1000;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 18px;
  border-bottom: 1px solid #eee;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px 12px 0 0;
  color: #fff;
}

.panel-title {
  font-weight: 600;
  font-size: 14px;
}

.close-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  line-height: 1;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.panel-content {
  padding: 18px;
  max-height: 70vh;
  overflow-y: auto;
}

.form-group {
  margin-bottom: 18px;
}

.form-group label {
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
}

.form-group input[type='text'],
.form-group input[type='number'],
.form-group textarea,
.form-select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 13px;
  box-sizing: border-box;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.form-group input:focus,
.form-group textarea:focus,
.form-select:focus {
  outline: none;
  border-color: #8b5cf6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

.form-group textarea {
  resize: vertical;
  font-family: 'Monaco', 'Consolas', monospace;
}

.form-hint {
  font-size: 11px;
  color: #9ca3af;
  margin-top: 4px;
}

.form-group input[type='range'] {
  width: 100%;
}

.range-labels {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: #9ca3af;
  margin-top: 4px;
}

.status-badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.status-badge {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  cursor: pointer;
  opacity: 0.5;
  transition: all 0.2s;
}

.status-badge.active {
  opacity: 1;
}

.status-badge.status-pending {
  background: #f3f4f6;
  color: #6b7280;
}

.status-badge.status-running {
  background: #fef3c7;
  color: #d97706;
}

.status-badge.status-success {
  background: #d1fae5;
  color: #059669;
}

.status-badge.status-error {
  background: #fee2e2;
  color: #dc2626;
}

.stream-preview {
  background: #1f2937;
  color: #10b981;
  padding: 12px;
  border-radius: 6px;
  font-family: monospace;
  font-size: 12px;
  min-height: 60px;
}

.streaming-cursor {
  animation: blink 1s infinite;
}

@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }

  51%,
  100% {
    opacity: 0;
  }
}

.tools-checkboxes {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tool-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 13px;
}

.tool-checkbox input {
  width: auto;
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
  color: #9ca3af;
}

.color-picker {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.color-swatch {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 2px solid transparent;
  cursor: pointer;
  padding: 0;
  transition: transform 0.2s;
}

.color-swatch:hover {
  transform: scale(1.1);
}

.color-swatch.active {
  border-color: #8b5cf6;
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
