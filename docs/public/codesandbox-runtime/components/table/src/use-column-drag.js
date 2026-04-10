import { ref, computed } from 'vue'
const useColumnDrag = (options) => {
  const { columns, dragConfig, flatColumns, emit } = options
  const isDraggingColumn = ref(false)
  const dragColumnIndex = ref(-1)
  const dropColumnIndex = ref(-1)
  const isColumnDragEnabled = computed(() => {
    var _a
    return !!((_a = dragConfig.value) == null ? void 0 : _a.column)
  })
  const isColumnDraggable = (column) => {
    if (!isColumnDragEnabled.value) return false
    if (column.fixed) return false
    if (column.draggable !== void 0) return column.draggable
    return true
  }
  const onHeaderDragStart = (column, columnIndex, event) => {
    var _a, _b
    if (!isColumnDraggable(column)) {
      event.preventDefault()
      return
    }
    isDraggingColumn.value = true
    dragColumnIndex.value = columnIndex
    dropColumnIndex.value = columnIndex
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('text/plain', String(columnIndex))
      const target = event.target
      if (target) {
        const clone = target.cloneNode(true)
        clone.style.opacity = '0.7'
        clone.style.position = 'absolute'
        clone.style.top = '-9999px'
        document.body.appendChild(clone)
        event.dataTransfer.setDragImage(clone, event.offsetX, event.offsetY)
        requestAnimationFrame(() => document.body.removeChild(clone))
      }
    }
    ;(_b = (_a = dragConfig.value) == null ? void 0 : _a.onDragStart) == null
      ? void 0
      : _b.call(_a, {
          type: 'column',
          data: column,
          index: columnIndex
        })
  }
  const onHeaderDragOver = (column, columnIndex, event) => {
    event.preventDefault()
    if (!isDraggingColumn.value) return
    if (!isColumnDraggable(column)) return
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move'
    }
    dropColumnIndex.value = columnIndex
  }
  const onHeaderDragEnter = (column, columnIndex, event) => {
    event.preventDefault()
    if (!isDraggingColumn.value) return
    if (!isColumnDraggable(column)) return
    dropColumnIndex.value = columnIndex
  }
  const onHeaderDrop = (_column, columnIndex, event) => {
    var _a, _b
    event.preventDefault()
    if (!isDraggingColumn.value) return
    const oldIndex = dragColumnIndex.value
    const newIndex = columnIndex
    if (oldIndex !== newIndex && oldIndex >= 0 && newIndex >= 0) {
      const cols = flatColumns.value
      const newCols = [...cols]
      const [movedCol] = newCols.splice(oldIndex, 1)
      newCols.splice(newIndex, 0, movedCol)
      reorderColumns(columns.value, oldIndex, newIndex)
      const params = {
        type: 'column',
        oldIndex,
        newIndex,
        data: newCols
      }
      ;(_b = (_a = dragConfig.value) == null ? void 0 : _a.onDragEnd) == null
        ? void 0
        : _b.call(_a, params)
      emit('drag-end', params)
    }
    resetDragState()
  }
  const onHeaderDragEnd = (_event) => {
    resetDragState()
  }
  const resetDragState = () => {
    isDraggingColumn.value = false
    dragColumnIndex.value = -1
    dropColumnIndex.value = -1
  }
  const reorderColumns = (cols, oldIndex, newIndex) => {
    const flat = flatColumns.value
    const movedColumn = flat[oldIndex]
    const targetColumn = flat[newIndex]
    if (!movedColumn || !targetColumn) return
    const findAndRemove = (arr, target) => {
      var _a
      const idx = arr.indexOf(target)
      if (idx !== -1) {
        arr.splice(idx, 1)
        return true
      }
      for (const col of arr) {
        if ((_a = col.children) == null ? void 0 : _a.length) {
          if (findAndRemove(col.children, target)) return true
        }
      }
      return false
    }
    const findAndInsert = (arr, target, toInsert, after) => {
      var _a
      const idx = arr.indexOf(target)
      if (idx !== -1) {
        arr.splice(after ? idx + 1 : idx, 0, toInsert)
        return true
      }
      for (const col of arr) {
        if ((_a = col.children) == null ? void 0 : _a.length) {
          if (findAndInsert(col.children, target, toInsert, after)) return true
        }
      }
      return false
    }
    findAndRemove(cols, movedColumn)
    findAndInsert(cols, targetColumn, movedColumn, oldIndex > newIndex ? false : true)
  }
  const getHeaderDragAttrs = (column, columnIndex) => {
    if (!isColumnDragEnabled.value || !isColumnDraggable(column)) return {}
    return {
      draggable: true,
      onDragstart: (e) => onHeaderDragStart(column, columnIndex, e),
      onDragover: (e) => onHeaderDragOver(column, columnIndex, e),
      onDragenter: (e) => onHeaderDragEnter(column, columnIndex, e),
      onDrop: (e) => onHeaderDrop(column, columnIndex, e),
      onDragend: (e) => onHeaderDragEnd(e)
    }
  }
  const getHeaderDragClass = (columnIndex) => {
    if (!isColumnDragEnabled.value || !isDraggingColumn.value) return ''
    const classes = []
    if (columnIndex === dragColumnIndex.value) {
      classes.push('is-column-dragging')
    }
    if (columnIndex === dropColumnIndex.value && columnIndex !== dragColumnIndex.value) {
      if (dropColumnIndex.value < dragColumnIndex.value) {
        classes.push('is-column-drop-left')
      } else {
        classes.push('is-column-drop-right')
      }
    }
    return classes.join(' ')
  }
  return {
    isColumnDragEnabled,
    isDraggingColumn,
    dragColumnIndex,
    dropColumnIndex,
    isColumnDraggable,
    getHeaderDragAttrs,
    getHeaderDragClass
  }
}
export { useColumnDrag }
