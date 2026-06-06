import { describe, it, expect } from 'vitest'
import { flowToBpmnXml, validateBpmnXml, generateSampleBpmnXml } from '../utils/bpmn'
import type { Node, Edge } from '../types'

function createMockNode(id: string, type: string, position = { x: 100, y: 100 }): Node {
  return {
    id,
    type,
    position,
    width: 100,
    height: 80,
    data: {},
    selected: false,
    dragging: false
  }
}

function createMockEdge(id: string, source: string, target: string): Edge {
  return {
    id,
    source,
    target,
    type: 'smoothstep',
    selected: false,
    animated: false
  }
}

describe('flow/utils/bpmn', () => {
  describe('flowToBpmnXml', () => {
    it('should generate BPMN XML with start event', () => {
      const nodes = [createMockNode('start', 'bpmn-start', { x: 50, y: 50 })]
      const edges: Edge[] = []
      const result = flowToBpmnXml(nodes, edges, { processId: 'test', processName: 'Test' })
      expect(result.xml).toContain('startEvent')
      expect(result.xml).toContain('id="start"')
      expect(result.processId).toBe('test')
    })

    it('should generate BPMN XML with end event', () => {
      const nodes = [createMockNode('end', 'bpmn-end', { x: 300, y: 100 })]
      const edges: Edge[] = []
      const result = flowToBpmnXml(nodes, edges)
      expect(result.xml).toContain('endEvent')
    })

    it('should generate BPMN XML with task', () => {
      const nodes = [createMockNode('task1', 'bpmn-task', { x: 150, y: 100 })]
      const edges: Edge[] = []
      const result = flowToBpmnXml(nodes, edges)
      expect(result.xml).toContain('<bpmn:task')
    })

    it('should generate BPMN XML with service task', () => {
      const nodes = [
        {
          ...createMockNode('service', 'bpmn-service-task'),
          data: { implementation: '${myService}' }
        }
      ]
      const edges: Edge[] = []
      const result = flowToBpmnXml(nodes, edges)
      expect(result.xml).toContain('serviceTask')
      expect(result.xml).toContain('implementation="delegateExpression"')
    })

    it('should generate BPMN XML with user task and assignee', () => {
      const nodes = [
        {
          ...createMockNode('user', 'bpmn-user-task'),
          data: { assignee: 'admin', candidateUsers: 'user1,user2' }
        }
      ]
      const edges: Edge[] = []
      const result = flowToBpmnXml(nodes, edges)
      expect(result.xml).toContain('userTask')
      expect(result.xml).toContain('assignee="admin"')
      expect(result.xml).toContain('candidateUsers="user1,user2"')
    })

    it('should generate BPMN XML with exclusive gateway', () => {
      const nodes = [createMockNode('gw', 'bpmn-exclusive-gateway', { x: 250, y: 100 })]
      const edges: Edge[] = []
      const result = flowToBpmnXml(nodes, edges)
      expect(result.xml).toContain('exclusiveGateway')
      expect(result.xml).toContain('gatewayDirection="diverging"')
    })

    it('should generate BPMN XML with parallel gateway', () => {
      const nodes = [createMockNode('pgw', 'bpmn-parallel-gateway', { x: 250, y: 100 })]
      const edges: Edge[] = []
      const result = flowToBpmnXml(nodes, edges)
      expect(result.xml).toContain('parallelGateway')
    })

    it('should generate BPMN XML with inclusive gateway', () => {
      const nodes = [createMockNode('igw', 'bpmn-inclusive-gateway', { x: 250, y: 100 })]
      const edges: Edge[] = []
      const result = flowToBpmnXml(nodes, edges)
      expect(result.xml).toContain('inclusiveGateway')
    })

    it('should include node name in XML', () => {
      const nodes = [
        {
          ...createMockNode('task1', 'bpmn-task'),
          data: { name: 'My Task', label: 'My Task' }
        }
      ]
      const edges: Edge[] = []
      const result = flowToBpmnXml(nodes, edges)
      expect(result.xml).toContain('name="My Task"')
    })

    it('should generate sequence flow with condition expression', () => {
      const nodes = [createMockNode('start', 'bpmn-start'), createMockNode('end', 'bpmn-end')]
      const edges = [
        {
          ...createMockEdge('flow1', 'start', 'end'),
          data: { conditionExpression: '${approved == true}' }
        }
      ]
      const result = flowToBpmnXml(nodes, edges)
      expect(result.xml).toContain('sequenceFlow')
      expect(result.xml).toContain('conditionExpression')
      expect(result.xml).toContain('${approved == true}')
    })

    it('should include DI information when includeDi is true', () => {
      const nodes = [createMockNode('n1', 'bpmn-start', { x: 10, y: 20 })]
      const edges: Edge[] = []
      const result = flowToBpmnXml(nodes, edges, { includeDi: true })
      expect(result.xml).toContain('BPMNDiagram')
      expect(result.xml).toContain('BPMNShape')
    })

    it('should not include DI information when includeDi is false', () => {
      const nodes = [createMockNode('n1', 'bpmn-start')]
      const edges: Edge[] = []
      const result = flowToBpmnXml(nodes, edges, { includeDi: false })
      expect(result.xml).not.toContain('BPMNDiagram')
    })

    it('should use default dimensions when node has no width/height', () => {
      const nodes: Node[] = [
        {
          id: 'n1',
          type: 'bpmn-start',
          position: { x: 0, y: 0 },
          selected: false,
          dragging: false
        }
      ]
      const edges: Edge[] = []
      const result = flowToBpmnXml(nodes, edges, { includeDi: true })
      expect(result.xml).toContain('width="100"')
      expect(result.xml).toContain('height="80"')
    })

    it('should skip unknown node types', () => {
      const nodes: Node[] = [
        {
          id: 'n1',
          type: 'unknown-type' as Node['type'],
          position: { x: 0, y: 0 },
          selected: false,
          dragging: false
        }
      ]
      const edges: Edge[] = []
      const result = flowToBpmnXml(nodes, edges)
      expect(result.xml).not.toContain('unknown-type')
    })

    it('should generate XML with proper namespaces', () => {
      const nodes = [createMockNode('n1', 'bpmn-start')]
      const edges: Edge[] = []
      const result = flowToBpmnXml(nodes, edges)
      expect(result.xml).toContain('xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"')
    })

    it('should include edges in XML', () => {
      const nodes = [createMockNode('n1', 'bpmn-start'), createMockNode('n2', 'bpmn-end')]
      const edges = [createMockEdge('e1', 'n1', 'n2')]
      const result = flowToBpmnXml(nodes, edges)
      expect(result.xml).toContain('sequenceFlow')
      expect(result.xml).toContain('sourceRef="n1"')
      expect(result.xml).toContain('targetRef="n2"')
    })

    it('should generate valid processId', () => {
      const nodes = [createMockNode('n1', 'bpmn-start')]
      const edges: Edge[] = []
      const result = flowToBpmnXml(nodes, edges, { processId: 'MyProcess' })
      expect(result.processId).toBe('MyProcess')
    })

    it('should generate default processId with timestamp', () => {
      const nodes = [createMockNode('n1', 'bpmn-start')]
      const edges: Edge[] = []
      const result = flowToBpmnXml(nodes, edges)
      expect(result.processId).toMatch(/^Process_\d+$/)
    })
  })

  describe('validateBpmnXml', () => {
    it('should return invalid for missing definitions', () => {
      const xml = `<notbpmn></notbpmn>`
      const result = validateBpmnXml(xml)
      expect(result.valid).toBe(false)
      expect(result.error).toBeDefined()
    })

    it('should return invalid for missing process', () => {
      const xml = `<?xml version="1.0"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" id="def1">
</bpmn:definitions>`
      const result = validateBpmnXml(xml)
      expect(result.valid).toBe(false)
      expect(result.error).toBeDefined()
    })

    it('should return invalid for malformed XML', () => {
      const xml = `<?xml version="1.0"?><invalid`
      const result = validateBpmnXml(xml)
      expect(result.valid).toBe(false)
    })
  })

  describe('generateSampleBpmnXml', () => {
    it('should generate a sample BPMN XML string', () => {
      const xml = generateSampleBpmnXml()
      expect(xml).toContain('<?xml')
      expect(xml).toContain('bpmn:definitions')
      expect(xml).toContain('SampleProcess')
    })

    it('should contain start and end events', () => {
      const xml = generateSampleBpmnXml()
      expect(xml).toContain('startEvent')
      expect(xml).toContain('endEvent')
    })

    it('should contain user task and service task', () => {
      const xml = generateSampleBpmnXml()
      expect(xml).toContain('userTask')
      expect(xml).toContain('serviceTask')
    })

    it('should contain gateway', () => {
      const xml = generateSampleBpmnXml()
      expect(xml).toContain('exclusiveGateway')
    })
  })
})
