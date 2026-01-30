/**
 * useTree Hook
 * @description 树形逻辑管理，消除 any，确保类型链条完备
 */
import { ref, computed, watch, triggerRef, reactive } from 'vue'
import type { SetupContext } from 'vue'
import type { TreeSelectProps, TreeSelectEmits, TreeNode, TreeKey, TreeOption } from './tree-select'

export const useTree = (
  props: TreeSelectProps,
  emit: <T extends keyof TreeSelectEmits>(event: T, ...args: any[]) => void
) => {
  const nodeMap = ref(new Map<TreeKey, TreeNode>())
  const treeData = ref<TreeNode[]>([])
  const mapVersion = ref(0)

  const alias = computed(() => ({
    label: props.props?.label || 'label',
    value: props.props?.value || 'value',
    children: props.props?.children || 'children',
    disabled: props.props?.disabled || 'disabled',
    isLeaf: props.props?.isLeaf || 'isLeaf'
  }))

  const createTreeNode = (data: TreeOption, parent?: TreeNode, level = 0): TreeNode => {
    const keyProp = props.nodeKey || alias.value.value
    const key = (data[keyProp] as TreeKey) ?? `node-${Math.random().toString(36).slice(2, 9)}`

    const node: TreeNode = reactive({
      key,
      label: String(data[alias.value.label] || ''),
      level,
      expanded: props.defaultExpandAll || (props.defaultExpandedKeys || []).includes(key),
      checked: false,
      indeterminate: false,
      disabled: !!data[alias.value.disabled],
      visible: true,
      isLeaf: !!data[alias.value.isLeaf] || !data[alias.value.children],
      raw: data,
      parent,
      children: [],
      loading: false,
      loaded: false
    })

    const childrenData = data[alias.value.children]
    if (childrenData && Array.isArray(childrenData)) {
      node.children = (childrenData as TreeOption[]).map((item) =>
        createTreeNode(item, node, level + 1)
      )
    }

    nodeMap.value.set(key, node)
    return node
  }

  const flatData = computed(() => {
    // 强制依赖版本号以触发更新
    mapVersion.value
    const result: TreeNode[] = []
    const walk = (nodes: TreeNode[]) => {
      nodes.forEach((node) => {
        if (node.visible) {
          result.push(node)
          if (node.expanded && node.children?.length) walk(node.children)
        }
      })
    }
    walk(treeData.value)
    return result
  })

  const getNode = (key: TreeKey) => nodeMap.value.get(key)

  const updateParentState = (node: TreeNode) => {
    let p = node.parent
    while (p) {
      const children = p.children || []
      const checkedChildren = children.filter((c) => c.checked)
      const indeterminateChildren = children.filter((c) => c.indeterminate)

      const allChecked = children.length > 0 && checkedChildren.length === children.length
      const noneChecked = checkedChildren.length === 0 && indeterminateChildren.length === 0

      p.checked = allChecked
      p.indeterminate = !allChecked && !noneChecked
      p = p.parent
    }
  }

  const syncCheckState = (val: TreeKey | TreeKey[] | undefined) => {
    const keys = new Set(
      Array.isArray(val) ? val : val !== undefined && val !== null && val !== '' ? [val] : []
    )

    nodeMap.value.forEach((node) => {
      node.checked = false
      node.indeterminate = false
    })

    keys.forEach((k) => {
      const node = getNode(k)
      if (node) {
        node.checked = true
        if (!props.checkStrictly && props.multiple) {
          const setChild = (n: TreeNode) => {
            if (n.disabled) return
            n.checked = true
            n.indeterminate = false
            n.children?.forEach(setChild)
          }
          node.children?.forEach(setChild)
        }
      }
    })

    if (!props.checkStrictly && props.multiple) {
      nodeMap.value.forEach((node) => {
        if (!node.children || node.children.length === 0) {
          if (node.checked) updateParentState(node)
        }
      })
    }
    mapVersion.value++
    // 强制触发引用更新，确保模板关联能检测到 Map 内部变化
    triggerRef(nodeMap)
  }

  const emitModelValue = () => {
    const checkedKeys: TreeKey[] = []
    nodeMap.value.forEach((node) => {
      if (node.checked) checkedKeys.push(node.key)
    })

    if (props.multiple) {
      emit('update:modelValue', checkedKeys)
      emit('change', checkedKeys)
    } else {
      const target = checkedKeys[checkedKeys.length - 1]
      emit('update:modelValue', target)
      emit('change', target)
    }
  }

  const checkNode = (node: TreeNode, checked: boolean) => {
    if (node.disabled) return

    if (!props.multiple) {
      nodeMap.value.forEach((n) => {
        n.checked = false
        n.indeterminate = false
      })
    }

    node.checked = checked
    node.indeterminate = false

    if (!props.checkStrictly && props.multiple) {
      const setChild = (n: TreeNode, v: boolean) => {
        if (n.disabled) return
        n.checked = v
        n.indeterminate = false
        n.children?.forEach((c) => setChild(c, v))
      }
      setChild(node, checked)
      updateParentState(node)
    }

    emitModelValue()

    // 拋出详细勾选事件 (对标 市面组件库)
    const checkedKeys: TreeKey[] = []
    const checkedNodes: TreeOption[] = []
    nodeMap.value.forEach((n) => {
      if (n.checked) {
        checkedKeys.push(n.key)
        checkedNodes.push(n.raw)
      }
    })

    emit('check-change', node.raw, checked, node.indeterminate)
    emit('check', node.raw, {
      checkedKeys,
      checkedNodes
    })

    mapVersion.value++
    triggerRef(nodeMap)
  }

  const toggleExpand = (node: TreeNode) => {
    if (node.isLeaf && !props.lazy) return
    if (props.lazy && !node.loaded) {
      loadNode(node)
    } else {
      node.expanded = !node.expanded
      mapVersion.value++
      triggerRef(nodeMap)
    }
  }

  const loadNode = async (node: TreeNode) => {
    if (!props.load || node.loading) return
    node.loading = true
    try {
      await new Promise<void>((resolve) => {
        props.load!(node.raw, (childrenData) => {
          if (childrenData && Array.isArray(childrenData)) {
            node.children = childrenData.map((item) => createTreeNode(item, node, node.level + 1))
            node.loaded = true
            node.isLeaf = childrenData.length === 0
            node.expanded = true

            if (node.checked && !props.checkStrictly) {
              node.children.forEach((c) => {
                if (!c.disabled) c.checked = true
              })
            }
          }
          resolve()
        })
      })
    } finally {
      node.loading = false
      mapVersion.value++
      triggerRef(nodeMap)
    }
  }

  const filter = (val: string) => {
    const query = val.trim().toLowerCase()

    const isMatched = (node: TreeNode) => {
      if (props.filterNodeMethod) return props.filterNodeMethod(query, node.raw, node)
      return !query || node.label.toLowerCase().includes(query)
    }

    // 根据自身内容标记可见性
    nodeMap.value.forEach((node) => {
      node.visible = isMatched(node)
    })

    if (query) {
      const allNodes = Array.from(nodeMap.value.values())
      // 向上标记
      allNodes.forEach((node) => {
        if (isMatched(node)) {
          if (node.children?.length) {
            node.expanded = true
          }
          let p = node.parent
          while (p) {
            p.visible = true
            p.expanded = true
            p = p.parent
          }
        }
      })

      // 向下渗透
      const setVisible = (n: TreeNode) => {
        n.visible = true
        n.children?.forEach(setVisible)
      }

      allNodes.forEach((node) => {
        if (isMatched(node)) {
          node.children?.forEach(setVisible)
        }
      })
    }

    mapVersion.value++
    triggerRef(nodeMap)
  }

  const syncData = () => {
    nodeMap.value.clear()
    treeData.value = props.data.map((item) => createTreeNode(item))
    if (props.modelValue !== undefined) syncCheckState(props.modelValue)
    mapVersion.value++
  }

  watch(() => props.data, syncData, { immediate: true, deep: true })
  watch(
    () => props.modelValue,
    (val) => syncCheckState(val),
    { deep: true }
  )

  return {
    flatData,
    nodeMap,
    treeData,
    mapVersion,
    checkNode,
    toggleExpand,
    filter,
    getNode,
    emitModelValue
  }
}
