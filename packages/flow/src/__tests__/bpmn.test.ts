import { describe, it, expect, beforeEach } from 'vitest'
import {
  clearCustomTypes,
  getCustomNode,
  getAllCustomNodes,
  hasCustomNode
} from '../utils/custom-types'
import { registerBpmnNodes, BPMN_NODE_TYPES } from '../components/nodes/bpmn'

describe('flow/components/nodes/bpmn', () => {
  beforeEach(() => {
    clearCustomTypes()
  })

  describe('BPMN Node Types', () => {
    it('should have correct BPMN node type constants', () => {
      expect(BPMN_NODE_TYPES.StartEvent).toBe('bpmn-start')
      expect(BPMN_NODE_TYPES.EndEvent).toBe('bpmn-end')
      expect(BPMN_NODE_TYPES.Task).toBe('bpmn-task')
      expect(BPMN_NODE_TYPES.ServiceTask).toBe('bpmn-service-task')
      expect(BPMN_NODE_TYPES.UserTask).toBe('bpmn-user-task')
      expect(BPMN_NODE_TYPES.ExclusiveGateway).toBe('bpmn-exclusive-gateway')
      expect(BPMN_NODE_TYPES.ParallelGateway).toBe('bpmn-parallel-gateway')
      expect(BPMN_NODE_TYPES.InclusiveGateway).toBe('bpmn-inclusive-gateway')
    })

    it('should have 8 BPMN node types', () => {
      const types = Object.values(BPMN_NODE_TYPES)
      expect(types).toHaveLength(8)
    })
  })

  describe('BPMN Node Registration', () => {
    it('should register all BPMN node types', () => {
      registerBpmnNodes()

      const allNodes = getAllCustomNodes()
      expect(allNodes).toHaveLength(8)
    })

    it('should register start event node', () => {
      registerBpmnNodes()

      const node = getCustomNode(BPMN_NODE_TYPES.StartEvent)
      expect(node).toBeDefined()
      expect(node?.type).toBe(BPMN_NODE_TYPES.StartEvent)
      expect(node?.component).toBeDefined()
    })

    it('should register end event node', () => {
      registerBpmnNodes()

      const node = getCustomNode(BPMN_NODE_TYPES.EndEvent)
      expect(node).toBeDefined()
      expect(node?.type).toBe(BPMN_NODE_TYPES.EndEvent)
      expect(node?.component).toBeDefined()
    })

    it('should register task node', () => {
      registerBpmnNodes()

      const node = getCustomNode(BPMN_NODE_TYPES.Task)
      expect(node).toBeDefined()
      expect(node?.type).toBe(BPMN_NODE_TYPES.Task)
    })

    it('should register service task node', () => {
      registerBpmnNodes()

      const node = getCustomNode(BPMN_NODE_TYPES.ServiceTask)
      expect(node).toBeDefined()
      expect(node?.type).toBe(BPMN_NODE_TYPES.ServiceTask)
    })

    it('should register user task node', () => {
      registerBpmnNodes()

      const node = getCustomNode(BPMN_NODE_TYPES.UserTask)
      expect(node).toBeDefined()
      expect(node?.type).toBe(BPMN_NODE_TYPES.UserTask)
    })

    it('should register exclusive gateway node', () => {
      registerBpmnNodes()

      const node = getCustomNode(BPMN_NODE_TYPES.ExclusiveGateway)
      expect(node).toBeDefined()
      expect(node?.type).toBe(BPMN_NODE_TYPES.ExclusiveGateway)
    })

    it('should register parallel gateway node', () => {
      registerBpmnNodes()

      const node = getCustomNode(BPMN_NODE_TYPES.ParallelGateway)
      expect(node).toBeDefined()
      expect(node?.type).toBe(BPMN_NODE_TYPES.ParallelGateway)
    })

    it('should register inclusive gateway node', () => {
      registerBpmnNodes()

      const node = getCustomNode(BPMN_NODE_TYPES.InclusiveGateway)
      expect(node).toBeDefined()
      expect(node?.type).toBe(BPMN_NODE_TYPES.InclusiveGateway)
    })

    it('should check if BPMN nodes are registered', () => {
      expect(hasCustomNode(BPMN_NODE_TYPES.StartEvent)).toBe(false)
      expect(hasCustomNode(BPMN_NODE_TYPES.EndEvent)).toBe(false)

      registerBpmnNodes()

      expect(hasCustomNode(BPMN_NODE_TYPES.StartEvent)).toBe(true)
      expect(hasCustomNode(BPMN_NODE_TYPES.EndEvent)).toBe(true)
      expect(hasCustomNode(BPMN_NODE_TYPES.Task)).toBe(true)
      expect(hasCustomNode(BPMN_NODE_TYPES.ServiceTask)).toBe(true)
      expect(hasCustomNode(BPMN_NODE_TYPES.UserTask)).toBe(true)
      expect(hasCustomNode(BPMN_NODE_TYPES.ExclusiveGateway)).toBe(true)
      expect(hasCustomNode(BPMN_NODE_TYPES.ParallelGateway)).toBe(true)
      expect(hasCustomNode(BPMN_NODE_TYPES.InclusiveGateway)).toBe(true)
    })

    it('should not duplicate nodes on re-registration', () => {
      registerBpmnNodes()
      const firstCount = getAllCustomNodes().length

      registerBpmnNodes()
      const secondCount = getAllCustomNodes().length

      expect(firstCount).toBe(secondCount)
    })
  })
})
