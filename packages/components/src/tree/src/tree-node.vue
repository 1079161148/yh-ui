<script setup lang="ts">
/**
 * TreeNode - 树节点组件
 */
import { computed, inject } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { TREE_INJECTION_KEY } from './tree'
import type { TreeNode, TreeNodeData, TreeNodeSlotData } from './tree'
import { YhIcon } from '../../icon'
import { YhCheckbox } from '../../checkbox'

defineOptions({ name: 'YhTreeNode' })

const props = defineProps<{
  node: TreeNode
}>()

const ns = useNamespace('tree')
const tree = inject(TREE_INJECTION_KEY)!

// 节点样式
const nodeStyle = computed(() => ({
  paddingLeft: `${props.node.level * tree.props.indent}px`
}))

// 是否当前节点
const isCurrent = computed(() => tree.currentNodeKey.value === props.node.key)

// 节点类名
const nodeClass = computed(() => [
  ns.e('node'),
  props.node.class, // 支持自定义类名
  {
    [ns.is('expanded')]: props.node.expanded,
    [ns.is('current')]: isCurrent.value && tree.props.highlightCurrent,
    [ns.is('disabled')]: props.node.disabled,
    [ns.is('checked')]: props.node.checked,
    [ns.is('leaf')]: props.node.isLeaf || !props.node.children?.length,
    [ns.is('dragging')]: tree.draggingNodeKey.value === props.node.key,
    [ns.is('drop-inner')]: tree.dropTargetNodeKey.value === props.node.key && tree.dropPosition.value === 'inner',
    [ns.is('drop-before')]: tree.dropTargetNodeKey.value === props.node.key && tree.dropPosition.value === 'before',
    [ns.is('drop-after')]: tree.dropTargetNodeKey.value === props.node.key && tree.dropPosition.value === 'after'
  }
])

// 拖拽处理
const handleDragStart = (e: DragEvent) => {
  if (!tree.props.draggable || props.node.disabled) return
  tree.handleDragStart(props.node, e)
}

const handleDragOver = (e: DragEvent) => {
  if (!tree.props.draggable) return
  e.preventDefault()
  tree.handleDragOver(props.node, e)
}

const handleDragEnter = (e: DragEvent) => {
  if (!tree.props.draggable) return
  e.preventDefault()
  tree.handleDragEnter(props.node, e)
}

const handleDragLeave = (e: DragEvent) => {
  if (!tree.props.draggable) return
  tree.handleDragLeave(props.node, e)
}

const handleDragEnd = (e: DragEvent) => {
  if (!tree.props.draggable) return
  tree.handleDragEnd(props.node, e)
}

const handleDrop = (e: DragEvent) => {
  if (!tree.props.draggable) return
  e.preventDefault()
  tree.handleDrop(props.node, e)
}

// 处理展开图标点击
const handleExpandClick = (e: MouseEvent) => {
  e.stopPropagation()
  tree.handleNodeExpand(props.node)
}

// 处理节点内容点击
const handleContentClick = (e: MouseEvent) => {
  tree.handleNodeClick(props.node, e)
}

// 处理复选框变化
const handleCheckChange = (checked: boolean | string | number) => {
  tree.handleNodeCheck(props.node, Boolean(checked))
}

defineSlots<{
  default?: (props: TreeNodeSlotData) => any
  icon?: (props: TreeNodeSlotData) => any
  prefix?: (props: TreeNodeSlotData) => any
  suffix?: (props: TreeNodeSlotData) => any
}>()
</script>

<template>
  <div v-show="node.visible" :class="nodeClass" role="treeitem">
    <div :class="ns.e('content')" :style="nodeStyle" :draggable="tree.props.draggable && !node.disabled"
      @click="handleContentClick" @dragstart="handleDragStart" @dragover="handleDragOver" @dragenter="handleDragEnter"
      @dragleave="handleDragLeave" @dragend="handleDragEnd" @drop="handleDrop">
      <!-- 展开图标 -->
      <span :class="[ns.e('expand-icon'), { [ns.is('expanded')]: node.expanded, [ns.is('loading')]: node.loading }]"
        @click="handleExpandClick">
        <slot name="icon" :node="node" :data="node.rawData">
          <template v-if="node.loading">
            <svg class="loading-icon" viewBox="0 0 1024 1024" width="14" height="14">
              <path
                d="M512 1024c-282.77 0-512-229.23-512-512s229.23-512 512-512c28.28 0 51.2 22.92 51.2 51.2s-22.92 51.2-51.2 51.2c-226.28 0-409.6 183.32-409.6 409.6s183.32 409.6 409.6 409.6 409.6-183.32 409.6-409.6c0-28.28 22.92-51.2 51.2-51.2s51.2 22.92 51.2 51.2c0 282.77-229.23 512-512 512z"
                fill="currentColor"></path>
            </svg>
          </template>
          <template v-else-if="!node.isLeaf && (node.children?.length || tree.props.lazy)">
            <svg v-if="node.expanded" viewBox="0 0 1024 1024" width="12" height="12">
              <path d="M192 384l320 320 320-320z" fill="currentColor"></path>
            </svg>
            <svg v-else viewBox="0 0 1024 1024" width="12" height="12">
              <path d="M384 192l320 320-320 320z" fill="currentColor"></path>
            </svg>
          </template>
          <template v-else>
            <span :class="ns.e('expand-placeholder')"></span>
          </template>
        </slot>
      </span>

      <!-- 左侧复选框 -->
      <yh-checkbox v-if="tree.props.showCheckbox && tree.props.checkboxPosition === 'left'" :model-value="node.checked"
        :indeterminate="node.indeterminate" :disabled="node.disabled" @update:model-value="handleCheckChange"
        @click.stop />

      <!-- 前缀插槽 -->
      <slot name="prefix" :node="node" :data="node.rawData" />

      <!-- 快捷图标 (通过 rawData.icon 渲染) -->
      <yh-icon v-if="node.icon" :name="node.icon" :class="ns.e('icon')" />

      <!-- 节点内容 -->
      <span :class="ns.e('label')">
        <slot name="default" :node="node" :data="node.rawData">
          {{ node.label }}
        </slot>
      </span>

      <!-- 后缀插槽 -->
      <slot name="suffix" :node="node" :data="node.rawData" />

      <!-- 右侧复选框 -->
      <yh-checkbox v-if="tree.props.showCheckbox && tree.props.checkboxPosition === 'right'" :model-value="node.checked"
        :indeterminate="node.indeterminate" :disabled="node.disabled" @update:model-value="handleCheckChange"
        @click.stop />
    </div>

    <!-- 子节点 (非虚拟滚动模式下递归渲染) -->
    <div v-if="!tree.props.virtual && node.children && node.children.length > 0" v-show="node.expanded"
      :class="ns.e('children')" role="group">
      <yh-tree-node v-for="child in node.children" :key="child.key" :node="child">
        <template #default="{ node: childNode, data: childData }">
          <slot name="default" :node="childNode" :data="childData" />
        </template>
        <template #icon="{ node: childNode, data: childData }">
          <slot name="icon" :node="childNode" :data="childData" />
        </template>
        <template #prefix="{ node: childNode, data: childData }">
          <slot name="prefix" :node="childNode" :data="childData" />
        </template>
        <template #suffix="{ node: childNode, data: childData }">
          <slot name="suffix" :node="childNode" :data="childData" />
        </template>
      </yh-tree-node>
    </div>
  </div>
</template>

<style lang="scss">
@use './tree.scss';
</style>
