<script setup lang="ts">
/**
 * YhTree - 树形控件
 * @description 高性能树形组件，支持虚拟滚动、懒加载、拖拽等特性
 */
import { ref, computed, provide, watch, shallowRef } from 'vue'
import { useNamespace } from '@yh-ui/hooks'
import { treeProps, treeEmits, TREE_INJECTION_KEY } from './tree'
import type { TreeNode, TreeNodeData, TreeContext } from './tree'
import TreeNodeComponent from './tree-node.vue'

defineOptions({ name: 'YhTree' })

const props = defineProps(treeProps)
const emit = defineEmits(treeEmits)
const ns = useNamespace('tree')

// 内部状态
const expandedKeys = ref<Set<string | number>>(new Set(props.defaultExpandedKeys))
const checkedKeys = ref<Set<string | number>>(new Set(props.defaultCheckedKeys))
const currentNodeKey = ref<string | number | undefined>(props.currentNodeKey)

// 扁平化节点映射
const nodeMap = shallowRef<Map<string | number, TreeNode>>(new Map())
// 响应式树节点
const treeNodes = ref<TreeNode[]>([])

// 虚拟滚动逻辑
const scrollTop = ref(0)
const handleScroll = (e: Event) => {
  scrollTop.value = (e.target as HTMLElement).scrollTop
}

const totalHeight = computed(() => flattenedNodes.value.length * props.itemHeight)
const startIndex = computed(() => Math.floor(scrollTop.value / props.itemHeight))
const visibleCount = computed(() => Math.ceil(props.height / props.itemHeight))
const endIndex = computed(() => startIndex.value + visibleCount.value)
const visibleNodes = computed(() => flattenedNodes.value.slice(startIndex.value, endIndex.value + 1))
const offset = computed(() => startIndex.value * props.itemHeight)

// 将原始数据转换为内部节点结构
const buildTree = (
  data: TreeNodeData[],
  parent: TreeNode | null = null,
  level: number = 0
): TreeNode[] => {
  const { label: labelKey = 'label', children: childrenKey = 'children', disabled: disabledKey = 'disabled' } = props.props || {}

  return data.map((item) => {
    const key = (item[props.nodeKey as keyof TreeNodeData] ?? item.key ?? item.id) as string | number
    const node: TreeNode = {
      ...item,
      key,
      label: String(item[labelKey as keyof TreeNodeData] ?? item.label ?? ''),
      disabled: !!item[disabledKey as keyof TreeNodeData] || !!item.disabled,
      level,
      parent,
      expanded: props.defaultExpandAll || expandedKeys.value.has(key),
      checked: checkedKeys.value.has(key),
      indeterminate: false,
      visible: true,
      loading: false,
      loaded: !props.lazy,
      rawData: item,
      children: undefined
    }

    nodeMap.value.set(key, node)

    const childrenData = item[childrenKey as keyof TreeNodeData] as TreeNodeData[] | undefined
    if (childrenData && childrenData.length > 0) {
      node.children = buildTree(childrenData, node, level + 1)
    }

    return node
  })
}

// 监听数据源变化
watch(
  () => props.data,
  (newData) => {
    nodeMap.value.clear()
    treeNodes.value = buildTree(newData)
    // 如果已有选中 Key，确保同步
    if (currentNodeKey.value) {
      const node = nodeMap.value.get(currentNodeKey.value)
      if (node) {
        // 可以执行一些逻辑，如自动展开到该节点
      }
    }
  },
  { immediate: true, deep: true }
)

// 监听当前选中 Key 变化 (外部 Prop 变化)
watch(
  () => props.currentNodeKey,
  (val) => {
    if (val !== currentNodeKey.value) {
      currentNodeKey.value = val
    }
  }
)

// 扁平化可见节点列表 (用于计算高度和虚拟滚动)
const flattenedNodes = computed(() => {
  const result: TreeNode[] = []
  const traverse = (nodes: TreeNode[]) => {
    nodes.forEach((node) => {
      if (!node.visible) return
      result.push(node)
      if (node.expanded && node.children) {
        traverse(node.children)
      }
    })
  }
  traverse(treeNodes.value)
  return result
})

// 处理节点点击
const handleNodeClick = (node: TreeNode, e: MouseEvent) => {
  if (node.disabled) return

  // 总是更新当前节点 Key (内部追踪)
  currentNodeKey.value = node.key
  emit('update:currentNodeKey', node.key)
  emit('current-change', node)

  if (props.expandOnClickNode && (!node.isLeaf && (node.children?.length || props.lazy))) {
    handleNodeExpand(node)
  }

  if (props.checkOnClickNode && props.showCheckbox) {
    handleNodeCheck(node, !node.checked)
  }

  emit('node-click', node, e)
}

// 处理节点展开/收起
const handleNodeExpand = async (node: TreeNode) => {
  if (node.isLeaf) return

  // 懒加载逻辑
  if (props.lazy && !node.loaded && props.load) {
    if (node.loading) return
    node.loading = true
    try {
      const children = await props.load(node)
      node.children = buildTree(children, node, node.level + 1)
      node.loaded = true
    } finally {
      node.loading = false
    }
  }

  const newExpanded = !node.expanded
  node.expanded = newExpanded

  if (newExpanded) {
    expandedKeys.value.add(node.key)
    // 手风琴模式：收起同级
    if (props.accordion) {
      const siblings = node.parent ? node.parent.children : treeNodes.value
      siblings?.forEach((sibling) => {
        if (sibling.key !== node.key && sibling.expanded) {
          sibling.expanded = false
          expandedKeys.value.delete(sibling.key)
        }
      })
    }
  } else {
    expandedKeys.value.delete(node.key)
  }

  emit('node-expand', node, newExpanded)
}

// 处理节点勾选
const handleNodeCheck = (node: TreeNode, checked: boolean) => {
  if (node.disabled) return

  node.checked = checked
  node.indeterminate = false

  if (checked) {
    checkedKeys.value.add(node.key)
  } else {
    checkedKeys.value.delete(node.key)
  }

  // 非严格模式下联动子节点和父节点
  if (!props.checkStrictly) {
    // 更新子节点
    const updateChildren = (children: TreeNode[] | undefined) => {
      children?.forEach((child) => {
        if (!child.disabled) {
          child.checked = checked
          child.indeterminate = false
          if (checked) {
            checkedKeys.value.add(child.key)
          } else {
            checkedKeys.value.delete(child.key)
          }
          updateChildren(child.children)
        }
      })
    }
    updateChildren(node.children)

    // 更新父节点
    const updateParent = (parent: TreeNode | null) => {
      if (!parent) return
      const children = parent.children || []
      const checkedCount = children.filter((c) => c.checked).length
      const indeterminateCount = children.filter((c) => c.indeterminate).length

      if (checkedCount === children.length) {
        parent.checked = true
        parent.indeterminate = false
        checkedKeys.value.add(parent.key)
      } else if (checkedCount > 0 || indeterminateCount > 0) {
        parent.checked = false
        parent.indeterminate = true
        checkedKeys.value.delete(parent.key)
      } else {
        parent.checked = false
        parent.indeterminate = false
        checkedKeys.value.delete(parent.key)
      }

      updateParent(parent.parent)
    }
    updateParent(node.parent)
  }

  emit('check', node, checked, Array.from(checkedKeys.value))
}

// 设置当前选中节点
const setCurrentKey = (key: string | number | undefined) => {
  currentNodeKey.value = key
  emit('update:currentNodeKey', key)
}

// 过滤节点
const filter = (query: string) => {
  const filterFn = props.filterMethod || ((q: string, node: TreeNode) => node.label.includes(q))

  const filterNodes = (nodes: TreeNode[]): boolean => {
    let hasVisible = false
    nodes.forEach((node) => {
      let visible = filterFn(query, node)
      if (node.children) {
        const childVisible = filterNodes(node.children)
        visible = visible || childVisible
      }
      node.visible = visible
      if (visible) hasVisible = true
    })
    return hasVisible
  }

  if (query) {
    filterNodes(treeNodes.value)
  } else {
    // 清空过滤时恢复所有节点可见
    const resetVisible = (nodes: TreeNode[]) => {
      nodes.forEach((node) => {
        node.visible = true
        if (node.children) resetVisible(node.children)
      })
    }
    resetVisible(treeNodes.value)
  }
}

// 获取选中节点
const getCheckedNodes = (): TreeNode[] => {
  return flattenedNodes.value.filter((node) => node.checked)
}

// 获取选中节点 keys
const getCheckedKeys = (): (string | number)[] => {
  return Array.from(checkedKeys.value)
}

// 设置选中节点
const setCheckedKeys = (keys: (string | number)[]) => {
  checkedKeys.value = new Set(keys)
  // 更新节点状态
  nodeMap.value.forEach((node, key) => {
    node.checked = keys.includes(key)
    node.indeterminate = false
  })
}

// 拖拽相关状态
const dragNode = ref<TreeNode | null>(null)
const draggingNodeKey = ref<string | number | undefined>(undefined)
const dropTargetNodeKey = ref<string | number | undefined>(undefined)
const dropPosition = ref<'before' | 'after' | 'inner' | undefined>(undefined)

const handleDragStart = (node: TreeNode, e: DragEvent) => {
  dragNode.value = node
  draggingNodeKey.value = node.key
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', '') // 某些浏览器需要
  }
  emit('node-drag-start', node, e)
}

const handleDragOver = (node: TreeNode, e: DragEvent) => {
  e.preventDefault()
  if (e.dataTransfer) e.dataTransfer.dropEffect = 'move'

  // 计算位置
  const el = e.currentTarget as HTMLElement
  if (!el) return

  const rect = el.getBoundingClientRect()
  const offsetTop = e.clientY - rect.top

  let position: 'before' | 'after' | 'inner' = 'inner'
  // 前 25% 是 before, 后 25% 是 after, 中间是 inner
  if (offsetTop < rect.height * 0.25) {
    position = 'before'
  } else if (offsetTop > rect.height * 0.75) {
    position = 'after'
  }

  dropPosition.value = position
  dropTargetNodeKey.value = node.key
  emit('node-drag-over', node, e)
}

const handleDragEnter = (node: TreeNode, e: DragEvent) => {
  e.preventDefault()
  dropTargetNodeKey.value = node.key
  emit('node-drag-enter', node, e)
}

const handleDragLeave = (node: TreeNode, e: DragEvent) => {
  if (dropTargetNodeKey.value === node.key) {
    // 离开时不需要立即清除，由 dragover 或 drop 统一管理
  }
  emit('node-drag-leave', node, e)
}

const handleDragEnd = (node: TreeNode, e: DragEvent) => {
  dragNode.value = null
  draggingNodeKey.value = undefined
  dropTargetNodeKey.value = undefined
  dropPosition.value = undefined
}

const handleDrop = (node: TreeNode, e: DragEvent) => {
  e.preventDefault()
  if (!dragNode.value) return

  // 防止将父节点拖入子节点中
  let curr = node.parent
  while (curr) {
    if (curr.key === dragNode.value.key) return
    curr = curr.parent
  }

  emit('node-drop', dragNode.value, node, dropPosition.value || 'inner', e)

  draggingNodeKey.value = undefined
  dropTargetNodeKey.value = undefined
  dropPosition.value = undefined
}

// 监听 currentNodeKey prop 变化
watch(
  () => props.currentNodeKey,
  (val) => {
    currentNodeKey.value = val
  }
)

// 提供上下文
provide<TreeContext>(TREE_INJECTION_KEY, {
  props,
  currentNodeKey,
  expandedKeys,
  checkedKeys,
  draggingNodeKey,
  dropTargetNodeKey,
  dropPosition,
  handleNodeClick,
  handleNodeExpand,
  handleNodeCheck,
  setCurrentKey,
  handleDragStart,
  handleDragOver,
  handleDragEnter,
  handleDragLeave,
  handleDragEnd,
  handleDrop
})

// --- 实例方法补全 ---

// 获取单个节点
const getNode = (key: string | number): TreeNode | undefined => {
  return nodeMap.value.get(key)
}

// 获取半选节点
const getHalfCheckedNodes = (): TreeNode[] => {
  const result: TreeNode[] = []
  nodeMap.value.forEach(node => {
    if (node.indeterminate) result.push(node)
  })
  return result
}

const getHalfCheckedKeys = (): (string | number)[] => {
  return getHalfCheckedNodes().map(node => node.key)
}

// 获取当前选中
const getCurrentKey = () => currentNodeKey.value
const getCurrentNode = () => (currentNodeKey.value ? nodeMap.value.get(currentNodeKey.value) : undefined)

// 手动设置展开
const setExpandedKeys = (keys: (string | number)[]) => {
  expandedKeys.value = new Set(keys)
  nodeMap.value.forEach((node, key) => {
    node.expanded = keys.includes(key)
  })
}

const expandNode = (key: string | number) => {
  const node = nodeMap.value.get(key)
  if (node && !node.expanded) handleNodeExpand(node)
}

const collapseNode = (key: string | number) => {
  const node = nodeMap.value.get(key)
  if (node && node.expanded) handleNodeExpand(node)
}

// 手动设置选中 (支持单节点设置)
const setChecked = (key: string | number, checked: boolean, deep: boolean = true) => {
  const node = nodeMap.value.get(key)
  if (!node || node.disabled) return

  if (deep && !props.checkStrictly) {
    handleNodeCheck(node, checked)
  } else {
    node.checked = checked
    if (checked) checkedKeys.value.add(key)
    else checkedKeys.value.delete(key)
    emit('check', node, checked, Array.from(checkedKeys.value))
  }
}

// 滚动相关
const innerScrollRef = ref<HTMLElement>()
const scrollTo = (options: number | ScrollToOptions) => {
  if (props.virtual) {
    innerScrollRef.value?.scrollTo(typeof options === 'number' ? { top: options } : options)
  }
}

const scrollToNode = (key: string | number) => {
  if (!props.virtual) return
  const index = flattenedNodes.value.findIndex(n => n.key === key)
  if (index !== -1) {
    scrollTo(index * props.itemHeight)
  }
}

const setCheckedNodes = (nodes: TreeNodeData[]) => {
  const keys = nodes.map(node => (node[props.nodeKey as keyof TreeNodeData] ?? node.key ?? node.id) as string | number)
  setCheckedKeys(keys)
}

const setData = (data: TreeNodeData[]) => {
  nodeMap.value.clear()
  treeNodes.value = buildTree(data)
}

// 暴露方法
defineExpose({
  filter,
  getNode,
  getCheckedNodes,
  getCheckedKeys,
  getHalfCheckedNodes,
  getHalfCheckedKeys,
  getCurrentKey,
  getCurrentNode,
  setChecked,
  setCheckedKeys,
  setCheckedNodes,
  setCurrentKey,
  setExpandedKeys,
  setData,
  expandNode,
  collapseNode,
  scrollTo,
  scrollToNode,
  expandedKeys,
  checkedKeys
})
</script>

<template>
  <div :class="[ns.b(), showLine && ns.m('show-line')]" role="tree">
    <div v-if="props.virtual" ref="innerScrollRef" :style="{ height: props.height + 'px', overflowY: 'auto' }"
      @scroll="handleScroll">
      <div :style="{ height: totalHeight + 'px', position: 'relative' }">
        <div :style="{ transform: `translateY(${offset}px)` }">
          <TreeNodeComponent v-for="node in visibleNodes" :key="node.key" :node="node">
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
          </TreeNodeComponent>
        </div>
      </div>
    </div>
    <template v-else-if="treeNodes.length > 0">
      <TreeNodeComponent v-for="node in treeNodes" :key="node.key" :node="node">
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
      </TreeNodeComponent>
    </template>
    <div v-else :class="ns.e('empty')">
      <slot name="empty">{{ emptyText }}</slot>
    </div>
  </div>
</template>

<style lang="scss">
@use './tree.scss';
</style>
