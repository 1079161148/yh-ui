import { ref, computed } from 'vue'
const useRowDrag = (options) => {
  const { data, rawData, dragConfig, treeConfig, emit } = options
  const isDraggingRow = ref(false)
  const dragRowIndex = ref(-1)
  const dropRowIndex = ref(-1)
  let lastMouseDownTarget = null
  const isRowDragEnabled = computed(() => {
    var _a
    return !!((_a = dragConfig.value) == null ? void 0 : _a.row)
  })
  const hasHandle = computed(() => {
    var _a
    return !!((_a = dragConfig.value) == null ? void 0 : _a.handle)
  })
  const onMouseDown = (event) => {
    lastMouseDownTarget = event.target
  }
  const onDragStart = (rowIndex, event) => {
    var _a, _b, _c, _d
    if (hasHandle.value) {
      const handleSelector = (_a = dragConfig.value) == null ? void 0 : _a.handle
      if (handleSelector && lastMouseDownTarget) {
        if (!lastMouseDownTarget.closest(handleSelector)) {
          event.preventDefault()
          return
        }
      } else {
        event.preventDefault()
        return
      }
    }
    isDraggingRow.value = true
    dragRowIndex.value = rowIndex
    dropRowIndex.value = rowIndex
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('text/plain', String(rowIndex))
      const dragClass = (_b = dragConfig.value) == null ? void 0 : _b.dragClass
      if (dragClass) {
        const target = event.target
        target.classList.add(dragClass)
      }
      const tr = event.target
      if (tr && tr.tagName === 'TR') {
        createDragImage(tr, event)
      }
    }
    ;(_d = (_c = dragConfig.value) == null ? void 0 : _c.onDragStart) == null
      ? void 0
      : _d.call(_c, {
          type: 'row',
          data: data.value[rowIndex],
          index: rowIndex
        })
  }
  const onDragOver = (rowIndex, event) => {
    event.preventDefault()
    if (!isDraggingRow.value) return
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move'
    }
    dropRowIndex.value = rowIndex
  }
  const onDragEnter = (rowIndex, event) => {
    event.preventDefault()
    if (!isDraggingRow.value) return
    dropRowIndex.value = rowIndex
  }
  const onDrop = (rowIndex, event) => {
    var _a, _b
    event.preventDefault()
    if (!isDraggingRow.value) return
    const oldIndex = dragRowIndex.value
    const newIndex = rowIndex
    if (oldIndex !== newIndex && oldIndex >= 0 && newIndex >= 0) {
      if (treeConfig.value) {
        performTreeDrop(oldIndex, newIndex)
      } else {
        const arr = data.value
        const [movedItem] = arr.splice(oldIndex, 1)
        arr.splice(newIndex, 0, movedItem)
        emit('update:data', [...arr])
        const params = {
          type: 'row',
          oldIndex,
          newIndex,
          data: [...arr]
        }
        ;(_b = (_a = dragConfig.value) == null ? void 0 : _a.onDragEnd) == null
          ? void 0
          : _b.call(_a, params)
        emit('drag-end', params)
      }
    }
    resetDragState()
  }
  const findNodeInTree = (tree, targetKey, childrenKey) => {
    for (let i = 0; i < tree.length; i++) {
      const key = options.rowKey(tree[i])
      if (key === targetKey) {
        return { parent: tree, index: i }
      }
      const children = tree[i][childrenKey]
      if (Array.isArray(children) && children.length > 0) {
        const result = findNodeInTree(children, targetKey, childrenKey)
        if (result) return result
      }
    }
    return null
  }
  const performTreeDrop = (oldIndex, newIndex) => {
    var _a, _b, _c
    const flatData = data.value
    const draggedRow = flatData[oldIndex]
    const targetRow = flatData[newIndex]
    if (!draggedRow || !targetRow) return
    const draggedKey = options.rowKey(draggedRow)
    const targetKey = options.rowKey(targetRow)
    const childrenKey = ((_a = treeConfig.value) == null ? void 0 : _a.childrenKey) || 'children'
    const tree = rawData.value
    const draggedInfo = findNodeInTree(tree, draggedKey, childrenKey)
    const targetInfo = findNodeInTree(tree, targetKey, childrenKey)
    if (!draggedInfo || !targetInfo) return
    const [movedNode] = draggedInfo.parent.splice(draggedInfo.index, 1)
    const newTargetInfo = findNodeInTree(tree, targetKey, childrenKey)
    if (!newTargetInfo) {
      draggedInfo.parent.splice(draggedInfo.index, 0, movedNode)
      return
    }
    const insertIndex = oldIndex < newIndex ? newTargetInfo.index + 1 : newTargetInfo.index
    newTargetInfo.parent.splice(insertIndex, 0, movedNode)
    emit('update:data', [...tree])
    const params = {
      type: 'row',
      oldIndex,
      newIndex,
      data: [...tree]
    }
    ;(_c = (_b = dragConfig.value) == null ? void 0 : _b.onDragEnd) == null
      ? void 0
      : _c.call(_b, params)
    emit('drag-end', params)
  }
  const onDragEnd = (_event) => {
    resetDragState()
  }
  const createDragImage = (tr, event) => {
    const clone = tr.cloneNode(true)
    const cells = tr.querySelectorAll('td, th')
    const cloneCells = clone.querySelectorAll('td, th')
    cells.forEach((cell, i) => {
      const computed2 = window.getComputedStyle(cell)
      const cloneCell = cloneCells[i]
      if (cloneCell) {
        cloneCell.style.position = 'static'
        cloneCell.style.width = computed2.width
        cloneCell.style.minWidth = computed2.width
        cloneCell.style.maxWidth = computed2.width
        cloneCell.style.backgroundColor = computed2.backgroundColor || '#fff'
      }
    })
    clone.style.position = 'fixed'
    clone.style.top = '-9999px'
    clone.style.left = '-9999px'
    clone.style.display = 'table'
    clone.style.tableLayout = 'fixed'
    clone.style.width = tr.offsetWidth + 'px'
    clone.style.opacity = '0.85'
    clone.style.backgroundColor = '#fff'
    clone.style.boxShadow = '0 2px 12px rgba(0,0,0,0.15)'
    clone.style.borderRadius = '2px'
    clone.style.zIndex = '9999'
    document.body.appendChild(clone)
    const rect = tr.getBoundingClientRect()
    const offsetX = event.clientX - rect.left
    const offsetY = event.clientY - rect.top
    event.dataTransfer.setDragImage(clone, offsetX, offsetY)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (clone.parentNode) {
          document.body.removeChild(clone)
        }
      })
    })
  }
  const resetDragState = () => {
    isDraggingRow.value = false
    dragRowIndex.value = -1
    dropRowIndex.value = -1
    lastMouseDownTarget = null
  }
  const getRowDragAttrs = (rowIndex) => {
    if (!isRowDragEnabled.value) return {}
    return {
      draggable: true,
      onMousedown: (e) => onMouseDown(e),
      onDragstart: (e) => onDragStart(rowIndex, e),
      onDragover: (e) => onDragOver(rowIndex, e),
      onDragenter: (e) => onDragEnter(rowIndex, e),
      onDrop: (e) => onDrop(rowIndex, e),
      onDragend: (e) => onDragEnd(e)
    }
  }
  const getRowDragClass = (rowIndex) => {
    var _a
    if (!isRowDragEnabled.value || !isDraggingRow.value) return ''
    const classes = []
    if (rowIndex === dragRowIndex.value) {
      classes.push('is-dragging')
      if ((_a = dragConfig.value) == null ? void 0 : _a.ghostClass) {
        classes.push(dragConfig.value.ghostClass)
      }
    }
    if (rowIndex === dropRowIndex.value && rowIndex !== dragRowIndex.value) {
      if (dropRowIndex.value < dragRowIndex.value) {
        classes.push('is-drop-target-above')
      } else {
        classes.push('is-drop-target-below')
      }
    }
    return classes.join(' ')
  }
  return {
    isRowDragEnabled,
    isDraggingRow,
    dragRowIndex,
    dropRowIndex,
    getRowDragAttrs,
    getRowDragClass
  }
}
export { useRowDrag }
