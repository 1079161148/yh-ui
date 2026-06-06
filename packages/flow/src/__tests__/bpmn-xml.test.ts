import { describe, it, expect } from 'vitest'
import {
  flowToBpmnXml,
  bpmnXmlToFlow,
  validateBpmnXml,
  generateSampleBpmnXml
} from '../utils/bpmn'
import type { Node, Edge } from '../types'

function minimalFlow(): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [
    {
      id: 'n_start',
      type: 'bpmn-start',
      position: { x: 100, y: 100 },
      data: { label: 'Start', name: 'Start' },
      width: 40,
      height: 40,
      selected: false,
      dragging: false
    },
    {
      id: 'n_task',
      type: 'bpmn-user-task',
      position: { x: 300, y: 90 },
      data: { label: 'Task', name: 'Task', assignee: 'u1', candidateUsers: 'a,b' },
      width: 120,
      height: 80,
      selected: false,
      dragging: false
    },
    {
      id: 'n_gw',
      type: 'bpmn-exclusive-gateway',
      position: { x: 500, y: 100 },
      data: { label: 'GW' },
      width: 50,
      height: 50,
      selected: false,
      dragging: false
    },
    {
      id: 'n_end',
      type: 'bpmn-end',
      position: { x: 700, y: 100 },
      data: { label: 'End' },
      width: 40,
      height: 40,
      selected: false,
      dragging: false
    }
  ]
  const edges: Edge[] = [
    { id: 'e1', source: 'n_start', target: 'n_task' },
    {
      id: 'e2',
      source: 'n_task',
      target: 'n_gw',
      type: 'smoothstep',
      data: { conditionExpression: '${approved}' }
    },
    { id: 'e3', source: 'n_gw', target: 'n_end' }
  ]
  return { nodes, edges }
}

describe('flow/utils/bpmn XML', () => {
  it('flowToBpmnXml produces definitions and round-trips via bpmnXmlToFlow', () => {
    const { nodes, edges } = minimalFlow()
    const { xml, processId } = flowToBpmnXml(nodes, edges, {
      processId: 'Proc_test',
      processName: 'Test proc',
      includeDi: true
    })

    expect(xml).toContain('bpmn:definitions')
    expect(xml).toContain(`id="${processId}"`)
    expect(xml).toContain('bpmn:userTask')
    expect(xml).toContain('assignee="u1"')
    expect(xml).toContain('conditionExpression')

    const parsed = bpmnXmlToFlow(xml)
    expect(parsed.processId).toBe('Proc_test')
    expect(parsed.nodes.length).toBeGreaterThanOrEqual(4)
    expect(parsed.edges.length).toBeGreaterThanOrEqual(3)

    const types = new Set(parsed.nodes.map((n) => n.type))
    expect(types.has('bpmn-start')).toBe(true)
    expect(types.has('bpmn-user-task')).toBe(true)
    expect(types.has('bpmn-exclusive-gateway')).toBe(true)
    expect(types.has('bpmn-end')).toBe(true)
  })

  it('flowToBpmnXml can omit DI', () => {
    const { nodes, edges } = minimalFlow()
    const { xml } = flowToBpmnXml(nodes, edges, { includeDi: false })
    expect(xml).toContain('<bpmn:process')
    expect(xml).not.toContain('BPMNDiagram')
  })

  it('validateBpmnXml validates exported sample', () => {
    const sample = generateSampleBpmnXml()
    expect(validateBpmnXml(sample).valid).toBe(true)
  })

  it('validateBpmnXml rejects malformed XML', () => {
    const r = validateBpmnXml('<<<')
    expect(r.valid).toBe(false)
    expect(r.error).toBeDefined()
  })

  it('validateBpmnXml rejects missing definitions', () => {
    const r = validateBpmnXml('<?xml version="1.0"?><root/>')
    expect(r.valid).toBe(false)
  })

  it('generateSampleBpmnXml includes multiple node kinds', () => {
    const xml = generateSampleBpmnXml()
    expect(xml).toContain('bpmn:startEvent')
    expect(xml).toContain('bpmn:userTask')
    expect(validateBpmnXml(xml).valid).toBe(true)
  })
})
