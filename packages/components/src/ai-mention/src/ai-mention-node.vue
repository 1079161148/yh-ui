<script setup lang="ts">
import { inject, computed } from 'vue'
import { YhIcon } from '../../icon'
import { useNamespace } from '@yh-ui/hooks'
import type { AiMentionFileNode } from './ai-mention'

defineOptions({
  name: 'AiMentionNode'
})

const props = defineProps<{
  node: AiMentionFileNode
  depth: number
}>()

const isFolderExpanded = inject<(key: string) => boolean>('isFolderExpanded')!
const toggleFolder = inject<(key: string) => void>('toggleFolder')!
const handleFileSelect = inject<(node: AiMentionFileNode) => void>('handleFileSelect')!
const getFileIcon = inject<(node: AiMentionFileNode) => string>('getFileIcon')!
const formatFileSizeFn = inject<(size?: number) => string>('formatFileSizeFn')!
const formatTimeFn = inject<(timestamp?: number) => string>('formatTimeFn')!
const showFileIcon = inject<boolean>('showFileIcon', true)
const showFileSize = inject<boolean>('showFileSize', true)
const showModifiedTime = inject<boolean>('showModifiedTime', true)
const ns = inject<ReturnType<typeof useNamespace>>('ns')!

const expanded = computed(() => isFolderExpanded(props.node.key))
</script>

<template>
  <div
    :class="[ns.e('file-tree-node'), ns.is('folder', node.isFolder), ns.is('expanded', expanded)]"
    @click="handleFileSelect(node)"
  >
    <span v-for="i in depth" :key="i" :class="ns.e('file-tree-indent')"></span>

    <span v-if="node.isFolder" :class="ns.e('folder-toggle')" @click.stop="toggleFolder(node.key)">
      <YhIcon :name="expanded ? 'chevron-down' : 'chevron-right'" />
    </span>
    <span v-else :class="ns.e('file-tree-indent')"></span>

    <YhIcon v-if="showFileIcon" :name="getFileIcon(node)" :class="ns.e('file-tree-icon')" />

    <span :class="ns.e('file-tree-label')">{{ node.label }}</span>

    <span v-if="showFileSize && !node.isFolder" :class="ns.e('file-tree-size')">
      {{ formatFileSizeFn(node.size) }}
    </span>

    <span v-if="showModifiedTime && !node.isFolder" :class="ns.e('file-tree-time')">
      {{ formatTimeFn(node.modifiedAt) }}
    </span>
  </div>

  <template v-if="node.isFolder && node.children && expanded">
    <AiMentionNode
      v-for="child in node.children"
      :key="child.key"
      :node="child"
      :depth="depth + 1"
    />
  </template>
</template>
