import type { Node, Edge } from '../types'

export interface UseKeyboardOptions {
  enabled?: boolean
  onDelete?: () => void
  onCopy?: () => void
  onPaste?: (data: { nodes: Node[]; edges: Edge[] }) => void
  onUndo?: () => void
  onRedo?: () => void
  onSelectAll?: () => void
  onEscape?: () => void
}

export interface UseKeyboardReturn {
  handleKeyDown: (event: KeyboardEvent) => void
}

export function useKeyboard(options: UseKeyboardOptions = {}): UseKeyboardReturn {
  const {
    enabled = true,
    onDelete,
    onCopy,
    onPaste,
    onUndo,
    onRedo,
    onSelectAll,
    onEscape
  } = options

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!enabled) return

    const key = event.key
    const ctrl = event.ctrlKey || event.metaKey

    // Delete / Backspace - 删除选中
    if ((key === 'Delete' || key === 'Backspace') && !event.target?.toString().includes('Input')) {
      event.preventDefault()
      onDelete?.()
    }

    // Ctrl/Cmd + C - 复制
    if (ctrl && key === 'c') {
      onCopy?.()
    }

    // Ctrl/Cmd + V - 粘贴
    if (ctrl && key === 'v') {
      onPaste?.({ nodes: [], edges: [] })
    }

    // Ctrl/Cmd + Z - 撤销
    if (ctrl && key === 'z' && !event.shiftKey) {
      event.preventDefault()
      onUndo?.()
    }

    // Ctrl/Cmd + Shift + Z / Ctrl + Y - 重做
    if ((ctrl && key === 'z' && event.shiftKey) || (ctrl && key === 'y')) {
      event.preventDefault()
      onRedo?.()
    }

    // Ctrl/Cmd + A - 全选
    if (ctrl && key === 'a') {
      event.preventDefault()
      onSelectAll?.()
    }

    // Escape - 取消选择
    if (key === 'Escape') {
      onEscape?.()
    }
  }

  return {
    handleKeyDown
  }
}
