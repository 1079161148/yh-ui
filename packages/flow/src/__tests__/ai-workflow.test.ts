import { describe, it, expect, beforeEach } from 'vitest'
import {
  clearCustomTypes,
  getCustomNode,
  getAllCustomNodes,
  hasCustomNode
} from '../utils/custom-types'
import { registerAiWorkflowNodes, AI_WORKFLOW_NODE_TYPES } from '../components/nodes/ai-workflow'

describe('flow/components/nodes/ai-workflow', () => {
  beforeEach(() => {
    clearCustomTypes()
  })

  describe('AI Workflow Node Types', () => {
    it('should have correct AI workflow node type constants', () => {
      expect(AI_WORKFLOW_NODE_TYPES.LLM).toBe('ai-llm')
      expect(AI_WORKFLOW_NODE_TYPES.Prompt).toBe('ai-prompt')
      expect(AI_WORKFLOW_NODE_TYPES.Agent).toBe('ai-agent')
      expect(AI_WORKFLOW_NODE_TYPES.Tool).toBe('ai-tool')
      expect(AI_WORKFLOW_NODE_TYPES.Condition).toBe('ai-condition')
      expect(AI_WORKFLOW_NODE_TYPES.Start).toBe('ai-start')
      expect(AI_WORKFLOW_NODE_TYPES.End).toBe('ai-end')
      expect(AI_WORKFLOW_NODE_TYPES.Memory).toBe('ai-memory')
    })

    it('should have 8 AI workflow node types', () => {
      const types = Object.values(AI_WORKFLOW_NODE_TYPES)
      expect(types).toHaveLength(8)
    })
  })

  describe('AI Workflow Node Registration', () => {
    it('should register all AI workflow node types', () => {
      registerAiWorkflowNodes()

      const allNodes = getAllCustomNodes()
      expect(allNodes).toHaveLength(8)
    })

    it('should register LLM node', () => {
      registerAiWorkflowNodes()

      const node = getCustomNode(AI_WORKFLOW_NODE_TYPES.LLM)
      expect(node).toBeDefined()
      expect(node?.type).toBe(AI_WORKFLOW_NODE_TYPES.LLM)
      expect(node?.component).toBeDefined()
    })

    it('should register Prompt node', () => {
      registerAiWorkflowNodes()

      const node = getCustomNode(AI_WORKFLOW_NODE_TYPES.Prompt)
      expect(node).toBeDefined()
      expect(node?.type).toBe(AI_WORKFLOW_NODE_TYPES.Prompt)
      expect(node?.component).toBeDefined()
    })

    it('should register Agent node', () => {
      registerAiWorkflowNodes()

      const node = getCustomNode(AI_WORKFLOW_NODE_TYPES.Agent)
      expect(node).toBeDefined()
      expect(node?.type).toBe(AI_WORKFLOW_NODE_TYPES.Agent)
      expect(node?.component).toBeDefined()
    })

    it('should register Tool node', () => {
      registerAiWorkflowNodes()

      const node = getCustomNode(AI_WORKFLOW_NODE_TYPES.Tool)
      expect(node).toBeDefined()
      expect(node?.type).toBe(AI_WORKFLOW_NODE_TYPES.Tool)
      expect(node?.component).toBeDefined()
    })

    it('should register Condition node', () => {
      registerAiWorkflowNodes()

      const node = getCustomNode(AI_WORKFLOW_NODE_TYPES.Condition)
      expect(node).toBeDefined()
      expect(node?.type).toBe(AI_WORKFLOW_NODE_TYPES.Condition)
      expect(node?.component).toBeDefined()
    })

    it('should register Start node', () => {
      registerAiWorkflowNodes()

      const node = getCustomNode(AI_WORKFLOW_NODE_TYPES.Start)
      expect(node).toBeDefined()
      expect(node?.type).toBe(AI_WORKFLOW_NODE_TYPES.Start)
      expect(node?.component).toBeDefined()
    })

    it('should register End node', () => {
      registerAiWorkflowNodes()

      const node = getCustomNode(AI_WORKFLOW_NODE_TYPES.End)
      expect(node).toBeDefined()
      expect(node?.type).toBe(AI_WORKFLOW_NODE_TYPES.End)
      expect(node?.component).toBeDefined()
    })

    it('should register Memory node', () => {
      registerAiWorkflowNodes()

      const node = getCustomNode(AI_WORKFLOW_NODE_TYPES.Memory)
      expect(node).toBeDefined()
      expect(node?.type).toBe(AI_WORKFLOW_NODE_TYPES.Memory)
      expect(node?.component).toBeDefined()
    })

    it('should check if AI workflow nodes are registered', () => {
      expect(hasCustomNode(AI_WORKFLOW_NODE_TYPES.LLM)).toBe(false)
      expect(hasCustomNode(AI_WORKFLOW_NODE_TYPES.Prompt)).toBe(false)

      registerAiWorkflowNodes()

      expect(hasCustomNode(AI_WORKFLOW_NODE_TYPES.LLM)).toBe(true)
      expect(hasCustomNode(AI_WORKFLOW_NODE_TYPES.Prompt)).toBe(true)
      expect(hasCustomNode(AI_WORKFLOW_NODE_TYPES.Agent)).toBe(true)
      expect(hasCustomNode(AI_WORKFLOW_NODE_TYPES.Tool)).toBe(true)
      expect(hasCustomNode(AI_WORKFLOW_NODE_TYPES.Condition)).toBe(true)
      expect(hasCustomNode(AI_WORKFLOW_NODE_TYPES.Start)).toBe(true)
      expect(hasCustomNode(AI_WORKFLOW_NODE_TYPES.End)).toBe(true)
      expect(hasCustomNode(AI_WORKFLOW_NODE_TYPES.Memory)).toBe(true)
    })

    it('should not duplicate nodes on re-registration', () => {
      registerAiWorkflowNodes()
      const firstCount = getAllCustomNodes().length

      registerAiWorkflowNodes()
      const secondCount = getAllCustomNodes().length

      expect(firstCount).toBe(secondCount)
    })
  })
})
