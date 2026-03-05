<script setup lang="ts">
import { useNamespace, useLocale } from '@yh-ui/hooks'
import { ref, computed, watch } from 'vue'
import type { AiThoughtStatus, AiThoughtItem } from './ai-thought-chain'
import { YhIcon } from '../../icon'
import MarkdownIt from 'markdown-it'

import { aiThoughtChainProps, aiThoughtChainEmits } from './ai-thought-chain'
import { useComponentTheme } from '@yh-ui/theme'

defineOptions({
  name: 'YhAiThoughtChain'
})

const props = defineProps(aiThoughtChainProps)
const emit = defineEmits(aiThoughtChainEmits)

const ns = useNamespace('ai-thought-chain')
const { t } = useLocale()
const { themeStyle } = useComponentTheme('ai-thought-chain', props.themeOverrides)
const isExpanded = ref(false)

// Markdown instance for rendering node content
const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true
})

// 跟踪每个节点的展开状态
const itemExpandedStates = ref<boolean[]>([])

// 内部可变节点列表（用于 editable / draggable 场景）
const internalItems = ref<AiThoughtItem[]>([])

// 拖拽状态
const draggedIndex = ref<number | null>(null)
const dragOverIndex = ref<number | null>(null)

// 当前实际渲染的节点列表
const itemsToUse = computed<AiThoughtItem[]>(() => {
  if (props.editable || props.draggable) {
    return internalItems.value.length > 0 ? internalItems.value : props.items
  }
  return props.items
})

// 同步外部 props.items -> internalItems
watch(
  () => props.items,
  (newItems) => {
    if (Array.isArray(newItems)) {
      internalItems.value = [...newItems]
    } else {
      internalItems.value = []
    }
  },
  { immediate: true, deep: true }
)

const ensureInternalItems = () => {
  if (!internalItems.value.length && props.items && props.items.length) {
    internalItems.value = [...props.items]
  }
}

// 计算当前进度
const currentProgress = computed(() => {
  if (!itemsToUse.value || itemsToUse.value.length === 0) return 0
  const completedCount = itemsToUse.value.filter(
    (item) => item.status === 'success' || item.status === 'complete'
  ).length
  return Math.round((completedCount / itemsToUse.value.length) * 100)
})

// 综合确定状态
const currentStatus = computed<AiThoughtStatus>(() => {
  if (props.status !== 'none') return props.status
  if (props.thinking === true) return 'thinking'
  if (props.thinking === false) return 'complete'
  return 'none'
})

const displayTitle = computed(() => {
  if (props.title) return props.title
  return currentStatus.value === 'thinking' || currentStatus.value === 'loading'
    ? t('ai.thoughtChain.thinking')
    : t('ai.thoughtChain.thoughtProcess')
})

// 渲染 Markdown 内容
const renderMarkdown = (content: string): string => {
  if (!props.markdown || !content) return content
  return md.render(content)
}

// 状态图标映射
const getStatusIcon = (status: AiThoughtStatus = 'none') => {
  switch (status) {
    case 'thinking':
    case 'loading':
      return 'loading'
    case 'success':
    case 'complete':
      return 'check-circle'
    case 'error':
      return 'circle-close'
    default:
      return 'check-circle'
  }
}

// 自动收起逻辑
watch(
  () => currentStatus.value,
  (newStatus) => {
    if (props.autoCollapse && (newStatus === 'complete' || newStatus === 'success')) {
      isExpanded.value = false
    }
  }
)

// 初始化节点展开状态
watch(
  () => itemsToUse.value,
  (newItems) => {
    if (newItems && newItems.length > 0) {
      // 默认展开最后一个节点，或者遵循 item 自身的 expanded 属性
      itemExpandedStates.value = newItems.map((item, index) => {
        if (item.expanded !== undefined) return item.expanded
        return index === newItems.length - 1
      })
    }
  },
  { immediate: true, deep: true }
)

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

const toggleItemExpand = (index: number) => {
  itemExpandedStates.value[index] = !itemExpandedStates.value[index]
}

// 节点点击事件
const handleItemClick = (item: AiThoughtItem, index: number) => {
  if (item.clickable !== false) {
    emit('node-click', item, index)
  }
}

// 删除节点
const handleDeleteNode = (item: AiThoughtItem, index: number) => {
  emit('node-delete', item, index)

  if (!props.editable) return

  ensureInternalItems()
  const newItems = [...internalItems.value]
  newItems.splice(index, 1)
  internalItems.value = newItems
  emit('update:items', newItems)
  emit('reorder', newItems)
}

// 添加节点
const handleAddNode = (index: number) => {
  emit('node-add', index)

  if (!props.editable) return

  ensureInternalItems()
  const newItems = [...internalItems.value]
  newItems.splice(index + 1, 0, {
    title: t('ai.thoughtChain.defaultTitle'),
    status: 'none'
  })
  internalItems.value = newItems
  emit('update:items', newItems)
  emit('reorder', newItems)
}

// 拖拽相关处理
const handleDragStart = (e: DragEvent, index: number) => {
  if (!props.draggable) return
  draggedIndex.value = index
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move'
  }
}

const handleDragOver = (e: DragEvent, index: number) => {
  if (!props.draggable || draggedIndex.value === null) return
  e.preventDefault()
  dragOverIndex.value = index
}

const handleDragLeave = () => {
  dragOverIndex.value = null
}

const handleDrop = (e: DragEvent, targetIndex: number) => {
  if (!props.draggable || draggedIndex.value === null) return
  e.preventDefault()

  if (draggedIndex.value !== null) {
    ensureInternalItems()
    const newItems = [...internalItems.value]
    const [removed] = newItems.splice(draggedIndex.value, 1)
    newItems.splice(targetIndex, 0, removed)
    internalItems.value = newItems
    emit('update:items', newItems)
    emit('reorder', newItems)
  }

  draggedIndex.value = null
  dragOverIndex.value = null
}

const handleDragEnd = () => {
  draggedIndex.value = null
  dragOverIndex.value = null
}
</script>

<template>
  <div
    :class="[
      ns.b(),
      ns.is('expanded', isExpanded),
      ns.is('thinking', currentStatus === 'thinking' || currentStatus === 'loading'),
      ns.is('timeline', itemsToUse && itemsToUse.length > 0),
      ns.is('draggable', draggable)
    ]"
    :style="themeStyle"
  >
    <!-- 进度条 -->
    <div v-if="showProgress && itemsToUse && itemsToUse.length > 0" :class="ns.e('progress-bar')">
      <div :class="ns.e('progress-fill')" :style="{ width: currentProgress + '%' }"></div>
    </div>

    <!-- 多节点时间轴模式 -->
    <template v-if="itemsToUse && itemsToUse.length > 0">
      <div
        v-for="(item, index) in itemsToUse"
        :key="item.id || index"
        :class="[
          ns.e('item'),
          ns.is('last', index === items.length - 1),
          ns.is('active', item.status === 'thinking' || item.status === 'loading'),
          ns.is('drag-over', dragOverIndex === index),
          ns.is('dragging', draggedIndex === index)
        ]"
        :draggable="draggable"
        @dragstart="handleDragStart($event, index)"
        @dragover="handleDragOver($event, index)"
        @dragleave="handleDragLeave"
        @drop="handleDrop($event, index)"
        @dragend="handleDragEnd"
      >
        <div :class="ns.e('item-dot-wrapper')">
          <div :class="[ns.e('item-dot'), ns.m(dotSize), ns.m(item.status || 'none')]">
            <YhIcon
              :name="item.icon || getStatusIcon(item.status)"
              :class="{ 'is-loading': item.status === 'thinking' || item.status === 'loading' }"
            />
          </div>
          <div
            v-if="index < items.length - 1"
            :class="[ns.e('item-line'), { 'is-gradient': lineGradient }]"
          ></div>
        </div>

        <div :class="ns.e('item-main')">
          <div :class="ns.e('item-header')" @click="toggleItemExpand(index)">
            <!-- 拖拽手柄 -->
            <YhIcon v-if="draggable" name="rank" :class="ns.e('drag-handle')" />

            <span :class="ns.e('item-title')">{{ item.title }}</span>

            <!-- 节点进度 -->
            <span v-if="item.progress !== undefined" :class="ns.e('item-progress')">
              {{ item.progress }}%
            </span>

            <!-- 操作按钮 -->
            <div :class="ns.e('item-actions')" v-if="editable" @click.stop>
              <YhIcon
                name="delete"
                :class="ns.e('action-icon')"
                @click="handleDeleteNode(item, index)"
              />
              <YhIcon name="plus" :class="ns.e('action-icon')" @click="handleAddNode(index)" />
            </div>

            <YhIcon
              v-if="item.content || item.description"
              name="arrow-down"
              :class="[ns.e('item-arrow'), { 'is-expanded': itemExpandedStates[index] }]"
            />
          </div>

          <!-- 内容区域 -->
          <Transition name="yh-ai-thought-collapse">
            <div
              v-if="itemExpandedStates[index] && (item.content || item.description)"
              :class="ns.e('item-content')"
              @click="handleItemClick(item, index)"
            >
              <!-- 支持 Markdown：内容来自 renderMarkdown，仅用于受控的思维链节点 -->
              <!-- eslint-disable vue/no-v-html -->
              <div
                v-if="markdown"
                :class="ns.e('item-text')"
                v-html="renderMarkdown(item.content || item.description || '')"
              ></div>
              <!-- eslint-enable vue/no-v-html -->
              <!-- 纯文本 -->
              <div v-else :class="ns.e('item-text')">{{ item.content || item.description }}</div>
            </div>
          </Transition>
        </div>
      </div>

      <!-- 添加节点按钮 -->
      <div v-if="editable" :class="ns.e('add-node')" @click="handleAddNode(items.length)">
        <YhIcon name="plus" />
        <span>{{ t('ai.thoughtChain.addNode') }}</span>
      </div>
    </template>

    <!-- 单节点/传统模式 -->
    <template v-else>
      <div :class="ns.e('header')" @click="toggleExpand">
        <div :class="ns.e('icon')">
          <YhIcon
            :name="getStatusIcon(currentStatus)"
            :class="[
              ns.e('status-icon'),
              { 'is-loading': currentStatus === 'thinking' || currentStatus === 'loading' }
            ]"
          />
        </div>
        <div :class="ns.e('title')">{{ displayTitle }}</div>
        <YhIcon name="arrow-down" :class="[ns.e('arrow'), { 'is-expanded': isExpanded }]" />
      </div>

      <Transition name="yh-ai-thought-collapse">
        <div v-if="isExpanded" :class="ns.e('content')">
          <slot>
            <div :class="ns.e('text')">{{ content }}</div>
          </slot>
        </div>
      </Transition>
    </template>
  </div>
</template>

<style lang="scss">
@use './ai-thought-chain.scss';
</style>
