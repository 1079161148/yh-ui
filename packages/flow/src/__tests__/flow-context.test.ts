import { describe, it, expect } from 'vitest'
import { useFlowContext, provideFlowContext } from '../core/FlowContext'

describe('flow/core/FlowContext', () => {
  describe('provideFlowContext', () => {
    it('should accept null without error', () => {
      expect(() => provideFlowContext(null)).not.toThrow()
    })
  })

  describe('useFlowContext', () => {
    it('should throw when used outside provider', () => {
      expect(() => useFlowContext()).toThrow(
        '[YhFlow] FlowContext is not provided'
      )
    })
  })
})
