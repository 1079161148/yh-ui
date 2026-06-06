import { describe, it, expect, vi } from 'vitest'
import { useKeyboard } from '../core/useKeyboard'

describe('flow/core/useKeyboard', () => {
  const createKeyEvent = (
    key: string,
    opts: { ctrlKey?: boolean; metaKey?: boolean; shiftKey?: boolean; target?: string } = {}
  ) =>
    new KeyboardEvent('keydown', {
      key,
      ctrlKey: opts.ctrlKey ?? false,
      metaKey: opts.metaKey ?? false,
      shiftKey: opts.shiftKey ?? false
    })

  it('should call onDelete on Delete key', () => {
    const onDelete = vi.fn()
    const k = useKeyboard({ onDelete })
    k.handleKeyDown(createKeyEvent('Delete'))
    expect(onDelete).toHaveBeenCalledTimes(1)
  })

  it('should call onUndo on Ctrl+Z', () => {
    const onUndo = vi.fn()
    const k = useKeyboard({ onUndo })
    k.handleKeyDown(createKeyEvent('z', { ctrlKey: true }))
    expect(onUndo).toHaveBeenCalledTimes(1)
  })

  it('should call onRedo on Ctrl+Shift+Z', () => {
    const onRedo = vi.fn()
    const k = useKeyboard({ onRedo })
    k.handleKeyDown(createKeyEvent('z', { ctrlKey: true, shiftKey: true }))
    expect(onRedo).toHaveBeenCalledTimes(1)
  })

  it('should call onSelectAll on Ctrl+A', () => {
    const onSelectAll = vi.fn()
    const k = useKeyboard({ onSelectAll })
    k.handleKeyDown(createKeyEvent('a', { ctrlKey: true }))
    expect(onSelectAll).toHaveBeenCalledTimes(1)
  })

  it('should call onEscape on Escape', () => {
    const onEscape = vi.fn()
    const k = useKeyboard({ onEscape })
    k.handleKeyDown(createKeyEvent('Escape'))
    expect(onEscape).toHaveBeenCalledTimes(1)
  })

  it('should not fire when enabled false', () => {
    const onDelete = vi.fn()
    const k = useKeyboard({ enabled: false, onDelete })
    k.handleKeyDown(createKeyEvent('Delete'))
    expect(onDelete).not.toHaveBeenCalled()
  })

  it('should call onCopy on Ctrl+C and onPaste on Ctrl+V', () => {
    const onCopy = vi.fn()
    const onPaste = vi.fn()
    const k = useKeyboard({ onCopy, onPaste })
    k.handleKeyDown(createKeyEvent('c', { ctrlKey: true }))
    expect(onCopy).toHaveBeenCalledTimes(1)
    k.handleKeyDown(createKeyEvent('v', { ctrlKey: true }))
    expect(onPaste).toHaveBeenCalledTimes(1)
    expect(onPaste).toHaveBeenCalledWith({ nodes: [], edges: [] })
  })
})
