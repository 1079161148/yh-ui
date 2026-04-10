import { ref, computed, watch, triggerRef, reactive } from 'vue'
const useTree = (props, emit) => {
  const nodeMap = ref(/* @__PURE__ */ new Map())
  const treeData = ref([])
  const mapVersion = ref(0)
  const alias = computed(() => {
    var _a, _b, _c, _d, _e
    return {
      label: ((_a = props.props) == null ? void 0 : _a.label) || 'label',
      value: ((_b = props.props) == null ? void 0 : _b.value) || 'value',
      children: ((_c = props.props) == null ? void 0 : _c.children) || 'children',
      disabled: ((_d = props.props) == null ? void 0 : _d.disabled) || 'disabled',
      isLeaf: ((_e = props.props) == null ? void 0 : _e.isLeaf) || 'isLeaf'
    }
  })
  const createTreeNode = (data, parent, level = 0) => {
    var _a
    const keyProp = props.nodeKey || alias.value.value
    const key = (_a = data[keyProp]) != null ? _a : `node-${Math.random().toString(36).slice(2, 9)}`
    const node = reactive({
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
      node.children = childrenData.map((item) => createTreeNode(item, node, level + 1))
    }
    nodeMap.value.set(key, node)
    return node
  }
  const flatData = computed(() => {
    void mapVersion.value
    const result = []
    const walk = (nodes) => {
      nodes.forEach((node) => {
        var _a
        if (node.visible) {
          result.push(node)
          if (node.expanded && ((_a = node.children) == null ? void 0 : _a.length))
            walk(node.children)
        }
      })
    }
    walk(treeData.value)
    return result
  })
  const getNode = (key) => nodeMap.value.get(key)
  const updateParentState = (node) => {
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
  const syncCheckState = (val) => {
    const keys = new Set(
      Array.isArray(val) ? val : val !== void 0 && val !== null && val !== '' ? [val] : []
    )
    nodeMap.value.forEach((node) => {
      node.checked = false
      node.indeterminate = false
    })
    keys.forEach((k) => {
      var _a
      const node = getNode(k)
      if (node) {
        node.checked = true
        if (!props.checkStrictly && props.multiple) {
          const setChild = (n) => {
            var _a2
            if (n.disabled) return
            n.checked = true
            n.indeterminate = false
            ;(_a2 = n.children) == null ? void 0 : _a2.forEach(setChild)
          }
          ;(_a = node.children) == null ? void 0 : _a.forEach(setChild)
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
    triggerRef(nodeMap)
  }
  const emitModelValue = () => {
    const checkedKeys = []
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
  const checkNode = (node, checked) => {
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
      const setChild = (n, v) => {
        var _a
        if (n.disabled) return
        n.checked = v
        n.indeterminate = false
        ;(_a = n.children) == null ? void 0 : _a.forEach((c) => setChild(c, v))
      }
      setChild(node, checked)
      updateParentState(node)
    }
    emitModelValue()
    const checkedKeys = []
    const checkedNodes = []
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
  const toggleExpand = (node) => {
    if (node.isLeaf && !props.lazy) return
    if (props.lazy && !node.loaded) {
      loadNode(node)
    } else {
      node.expanded = !node.expanded
      mapVersion.value++
      triggerRef(nodeMap)
    }
  }
  const loadNode = async (node) => {
    if (!props.load || node.loading) return
    node.loading = true
    try {
      await new Promise((resolve) => {
        props.load(node.raw, (childrenData) => {
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
  const filter = (val) => {
    const query = val.trim().toLowerCase()
    const isMatched = (node) => {
      if (props.filterNodeMethod) return props.filterNodeMethod(query, node.raw, node)
      return !query || node.label.toLowerCase().includes(query)
    }
    nodeMap.value.forEach((node) => {
      node.visible = isMatched(node)
    })
    if (query) {
      const allNodes = Array.from(nodeMap.value.values())
      allNodes.forEach((node) => {
        var _a
        if (isMatched(node)) {
          if ((_a = node.children) == null ? void 0 : _a.length) {
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
      const setVisible = (n) => {
        var _a
        n.visible = true
        ;(_a = n.children) == null ? void 0 : _a.forEach(setVisible)
      }
      allNodes.forEach((node) => {
        var _a
        if (isMatched(node)) {
          ;(_a = node.children) == null ? void 0 : _a.forEach(setVisible)
        }
      })
    }
    mapVersion.value++
    triggerRef(nodeMap)
  }
  const syncData = () => {
    nodeMap.value.clear()
    treeData.value = props.data.map((item) => createTreeNode(item))
    if (props.modelValue !== void 0) syncCheckState(props.modelValue)
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
export { useTree }
