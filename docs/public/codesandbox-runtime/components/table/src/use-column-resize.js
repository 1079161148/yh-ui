import { ref, onUnmounted } from 'vue'
const useColumnResize = (options) => {
  const { resizable, tableRef, emit } = options
  const isResizing = ref(false)
  const resizingColumn = ref(null)
  const resizeLineLeft = ref(0)
  const resizeLineVisible = ref(false)
  let startX = 0
  let startWidth = 0
  let currentColumn = null
  const isColumnResizable = (column) => {
    if (column.resizable !== void 0) return column.resizable
    return resizable.value
  }
  const handleResizeStart = (event, column, el) => {
    var _a, _b
    if (!isColumnResizable(column)) return
    event.preventDefault()
    event.stopPropagation()
    isResizing.value = true
    resizingColumn.value = column
    currentColumn = column
    startX = event.clientX
    startWidth = el.offsetWidth
    if (tableRef.value) {
      const tableRect = tableRef.value.getBoundingClientRect()
      resizeLineLeft.value = event.clientX - tableRect.left
      resizeLineVisible.value = true
    }
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
    ;(_b = (_a = event.target).setPointerCapture) == null ? void 0 : _b.call(_a, event.pointerId)
    document.addEventListener('pointermove', handleResizeMove)
    document.addEventListener('pointerup', handleResizeEnd)
  }
  const handleResizeMove = (event) => {
    if (!isResizing.value || !currentColumn) return
    const deltaX = event.clientX - startX
    let newWidth = Math.max(startWidth + deltaX, 40)
    const minWidth = parseInt(String(currentColumn.minWidth || 40))
    if (newWidth < minWidth) newWidth = minWidth
    if (currentColumn.maxWidth) {
      const maxWidth = parseInt(String(currentColumn.maxWidth))
      if (newWidth > maxWidth) newWidth = maxWidth
    }
    currentColumn.width = newWidth
    if (tableRef.value) {
      const tableRect = tableRef.value.getBoundingClientRect()
      resizeLineLeft.value = event.clientX - tableRect.left
    }
  }
  const handleResizeEnd = (_event) => {
    if (currentColumn) {
      const finalWidth = parseInt(String(currentColumn.width)) || startWidth
      emit('column-resize', currentColumn, finalWidth)
    }
    isResizing.value = false
    resizingColumn.value = null
    resizeLineVisible.value = false
    currentColumn = null
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
    document.removeEventListener('pointermove', handleResizeMove)
    document.removeEventListener('pointerup', handleResizeEnd)
  }
  onUnmounted(() => {
    document.removeEventListener('pointermove', handleResizeMove)
    document.removeEventListener('pointerup', handleResizeEnd)
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  })
  return {
    isResizing,
    resizingColumn,
    resizeLineLeft,
    resizeLineVisible,
    isColumnResizable,
    handleResizeStart
  }
}
export { useColumnResize }
