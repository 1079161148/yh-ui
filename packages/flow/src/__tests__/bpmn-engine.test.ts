import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  BpmnProcessEngine,
  createBpmnEngine
} from '../utils/bpmn-engine'
import type { Node, Edge } from '../types'

function createMockNode(id: string, type: string, position = { x: 0, y: 0 }): Node {
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

function createMockEdge(
  id: string,
  source: string,
  target: string,
  conditionExpression?: string
): Edge {
  return {
    id,
    source,
    target,
    type: 'smoothstep',
    data: conditionExpression ? { conditionExpression } : {},
    selected: false,
    animated: false
  }
}

describe('flow/utils/bpmn-engine', () => {
  let engine: BpmnProcessEngine
  let eventListener: ReturnType<typeof vi.fn>

  beforeEach(() => {
    eventListener = vi.fn()
  })

  describe('constructor', () => {
    it('should create engine with default options', () => {
      engine = new BpmnProcessEngine()
      expect(engine).toBeDefined()
    })

    it('should create engine with custom options', () => {
      const customExecutor = vi.fn()
      engine = new BpmnProcessEngine({
        taskExecutor: customExecutor,
        autoExecute: false
      })
      expect(engine).toBeDefined()
    })
  })

  describe('createBpmnEngine factory', () => {
    it('should create engine instance', () => {
      const e = createBpmnEngine()
      expect(e).toBeInstanceOf(BpmnProcessEngine)
    })

    it('should pass options to engine', () => {
      const e = createBpmnEngine({ autoExecute: false })
      expect(e).toBeInstanceOf(BpmnProcessEngine)
    })
  })

  describe('loadProcess', () => {
    it('should load nodes and edges', () => {
      engine = new BpmnProcessEngine()
      const nodes = [createMockNode('n1', 'bpmn-start'), createMockNode('n2', 'bpmn-task')]
      const edges = [createMockEdge('e1', 'n1', 'n2')]
      engine.loadProcess(nodes, edges)

      const startNodes = engine.getStartNodes()
      expect(startNodes).toHaveLength(1)
      expect(startNodes[0].id).toBe('n1')
    })

    it('should skip edges without source or target', () => {
      engine = new BpmnProcessEngine()
      const nodes = [createMockNode('n1', 'bpmn-start')]
      const edges = [
        { id: 'e1', source: '', target: 'n2', type: 'smoothstep' } as Edge,
        { id: 'e2', source: 'n1', target: '', type: 'smoothstep' } as Edge,
        createMockEdge('e3', 'n1', 'n1')
      ]
      engine.loadProcess(nodes, edges)
      const startNodes = engine.getStartNodes()
      expect(startNodes).toHaveLength(1)
    })

    it('should clear previous data on reload', () => {
      engine = new BpmnProcessEngine()
      const nodes1 = [createMockNode('n1', 'bpmn-start')]
      engine.loadProcess(nodes1, [])
      expect(engine.getStartNodes()).toHaveLength(1)

      const nodes2: Node[] = []
      engine.loadProcess(nodes2, [])
      expect(engine.getStartNodes()).toHaveLength(0)
    })
  })

  describe('createInstance', () => {
    it('should create process instance with initial variables', () => {
      engine = new BpmnProcessEngine()
      engine.loadProcess([createMockNode('n1', 'bpmn-start')], [])
      const instance = engine.createInstance({ var1: 'value1' })
      expect(instance.variables.var1).toBe('value1')
      expect(instance.state).toBe('idle')
      expect(instance.id).toMatch(/^instance_\d+$/)
    })

    it('should initialize all nodes in instance', () => {
      engine = new BpmnProcessEngine()
      engine.loadProcess(
        [createMockNode('n1', 'bpmn-start'), createMockNode('n2', 'bpmn-task')],
        []
      )
      const instance = engine.createInstance()
      expect(instance.nodes.has('n1')).toBe(true)
      expect(instance.nodes.has('n2')).toBe(true)
    })

    it('should initialize all edges in instance', () => {
      engine = new BpmnProcessEngine()
      engine.loadProcess(
        [createMockNode('n1', 'bpmn-start'), createMockNode('n2', 'bpmn-task')],
        [createMockEdge('e1', 'n1', 'n2')]
      )
      const instance = engine.createInstance()
      expect(instance.edges.has('e1')).toBe(true)
    })
  })

  describe('getInstance', () => {
    it('should return instance by id', () => {
      engine = new BpmnProcessEngine()
      engine.loadProcess([createMockNode('n1', 'bpmn-start')], [])
      const created = engine.createInstance()
      const retrieved = engine.getInstance(created.id)
      expect(retrieved?.id).toBe(created.id)
    })

    it('should return undefined for non-existent id', () => {
      engine = new BpmnProcessEngine()
      expect(engine.getInstance('non-existent')).toBeUndefined()
    })
  })

  describe('getStartNodes / getEndNodes', () => {
    it('should return start nodes', () => {
      engine = new BpmnProcessEngine()
      engine.loadProcess(
        [
          createMockNode('start', 'bpmn-start'),
          createMockNode('end', 'bpmn-end'),
          createMockNode('task', 'bpmn-task')
        ],
        []
      )
      expect(engine.getStartNodes()).toHaveLength(1)
      expect(engine.getStartNodes()[0].type).toBe('bpmn-start')
    })

    it('should return end nodes', () => {
      engine = new BpmnProcessEngine()
      engine.loadProcess(
        [
          createMockNode('start', 'bpmn-start'),
          createMockNode('end1', 'bpmn-end'),
          createMockNode('end2', 'bpmn-end')
        ],
        []
      )
      expect(engine.getEndNodes()).toHaveLength(2)
    })
  })

  describe('getOutgoingEdges / getIncomingEdges', () => {
    it('should return outgoing edges', () => {
      engine = new BpmnProcessEngine()
      engine.loadProcess(
        [
          createMockNode('n1', 'bpmn-start'),
          createMockNode('n2', 'bpmn-task'),
          createMockNode('n3', 'bpmn-task')
        ],
        [createMockEdge('e1', 'n1', 'n2'), createMockEdge('e2', 'n1', 'n3')]
      )
      const outgoing = engine.getOutgoingEdges('n1')
      expect(outgoing).toHaveLength(2)
    })

    it('should return incoming edges', () => {
      engine = new BpmnProcessEngine()
      engine.loadProcess(
        [
          createMockNode('n1', 'bpmn-start'),
          createMockNode('n2', 'bpmn-task')
        ],
        [createMockEdge('e1', 'n1', 'n2')]
      )
      const incoming = engine.getIncomingEdges('n2')
      expect(incoming).toHaveLength(1)
    })
  })

  describe('setVariable / getVariable', () => {
    it('should set and get variables', () => {
      engine = new BpmnProcessEngine()
      engine.loadProcess([createMockNode('n1', 'bpmn-start')], [])
      const instance = engine.createInstance()
      engine.setVariable(instance.id, 'key', 'value')
      expect(engine.getVariable(instance.id, 'key')).toBe('value')
    })

    it('should return undefined for non-existent variable', () => {
      engine = new BpmnProcessEngine()
      engine.loadProcess([createMockNode('n1', 'bpmn-start')], [])
      const instance = engine.createInstance()
      expect(engine.getVariable(instance.id, 'unknown')).toBeUndefined()
    })
  })

  describe('pause / resume', () => {
    it('should pause running instance', () => {
      engine = new BpmnProcessEngine({ autoExecute: false })
      engine.loadProcess([createMockNode('n1', 'bpmn-start')], [])
      const instance = engine.createInstance()
      engine.start(instance.id)
      engine.pause(instance.id)
      const retrieved = engine.getInstance(instance.id)
      expect(retrieved?.state).toBe('paused')
    })

    it('should resume paused instance', async () => {
      engine = new BpmnProcessEngine({ autoExecute: false })
      engine.loadProcess([createMockNode('n1', 'bpmn-start')], [])
      const instance = engine.createInstance()
      engine.start(instance.id)
      engine.pause(instance.id)
      await engine.resume(instance.id)
    })

    it('should do nothing when pausing non-running instance', () => {
      engine = new BpmnProcessEngine()
      engine.loadProcess([createMockNode('n1', 'bpmn-start')], [])
      const instance = engine.createInstance()
      engine.pause(instance.id)
      expect(engine.getInstance(instance.id)?.state).toBe('idle')
    })
  })

  describe('terminate', () => {
    it('should terminate instance', () => {
      engine = new BpmnProcessEngine({ autoExecute: false })
      engine.loadProcess([createMockNode('n1', 'bpmn-start')], [])
      const instance = engine.createInstance()
      engine.start(instance.id)
      engine.terminate(instance.id)
      const retrieved = engine.getInstance(instance.id)
      expect(retrieved?.state).toBe('terminated')
      expect(retrieved?.endTime).toBeDefined()
    })
  })

  describe('getAllInstances', () => {
    it('should return all instances', () => {
      engine = new BpmnProcessEngine({ autoExecute: false })
      engine.loadProcess([createMockNode('n1', 'bpmn-start')], [])
      engine.createInstance()
      engine.createInstance()
      expect(engine.getAllInstances()).toHaveLength(2)
    })
  })

  describe('event listener', () => {
    it('should call event listener on events', () => {
      engine = new BpmnProcessEngine({
        eventListener,
        autoExecute: false
      })
      engine.loadProcess([createMockNode('n1', 'bpmn-start')], [])
      engine.createInstance()
      engine.start('instance_1')
      expect(eventListener).toHaveBeenCalled()
    })
  })

  describe('start with no start nodes', () => {
    it('should complete immediately when no start nodes exist', async () => {
      engine = new BpmnProcessEngine({ autoExecute: false })
      engine.loadProcess([createMockNode('n1', 'bpmn-task')], [])
      const instance = engine.createInstance()
      await engine.start(instance.id)
      expect(instance.state).toBe('completed')
    })
  })

  describe('task executor', () => {
    it('should create engine with task executor option', () => {
      const executor = vi.fn()
      engine = new BpmnProcessEngine({
        taskExecutor: executor,
        autoExecute: false
      })
      expect(engine).toBeDefined()
    })
  })

  describe('variable evaluator', () => {
    it('should evaluate equality condition', async () => {
      const evaluator = vi.fn().mockReturnValue(true)
      engine = new BpmnProcessEngine({
        variableEvaluator: evaluator,
        autoExecute: false
      })
      engine.loadProcess(
        [
          createMockNode('start', 'bpmn-start'),
          createMockNode('task', 'bpmn-task')
        ],
        [createMockEdge('e1', 'start', 'task', '${approved == true}')]
      )
      const instance = engine.createInstance()
      engine.setVariable(instance.id, 'approved', true)
      await engine.start(instance.id)
      expect(evaluator).toHaveBeenCalled()
    })

    it('should evaluate greater than condition', async () => {
      const evaluator = vi.fn().mockReturnValue(false)
      engine = new BpmnProcessEngine({
        variableEvaluator: evaluator,
        autoExecute: false
      })
      engine.loadProcess(
        [
          createMockNode('start', 'bpmn-start'),
          createMockNode('task', 'bpmn-task')
        ],
        [createMockEdge('e1', 'start', 'task', '${count > 5}')]
      )
      const instance = engine.createInstance()
      engine.setVariable(instance.id, 'count', 10)
      await engine.start(instance.id)
      expect(evaluator).toHaveBeenCalledWith('${count > 5}', { count: 10 })
    })

    it('should evaluate less than condition', async () => {
      const evaluator = vi.fn().mockReturnValue(false)
      engine = new BpmnProcessEngine({
        variableEvaluator: evaluator,
        autoExecute: false
      })
      engine.loadProcess(
        [
          createMockNode('start', 'bpmn-start'),
          createMockNode('task', 'bpmn-task')
        ],
        [createMockEdge('e1', 'start', 'task', '${count < 5}')]
      )
      const instance = engine.createInstance()
      engine.setVariable(instance.id, 'count', 3)
      await engine.start(instance.id)
      expect(evaluator).toHaveBeenCalled()
    })

    it('should evaluate not equal condition', async () => {
      const evaluator = vi.fn().mockReturnValue(false)
      engine = new BpmnProcessEngine({
        variableEvaluator: evaluator,
        autoExecute: false
      })
      engine.loadProcess(
        [
          createMockNode('start', 'bpmn-start'),
          createMockNode('task', 'bpmn-task')
        ],
        [createMockEdge('e1', 'start', 'task', '${status != "closed"}')]
      )
      const instance = engine.createInstance()
      engine.setVariable(instance.id, 'status', 'open')
      await engine.start(instance.id)
      expect(evaluator).toHaveBeenCalled()
    })

    it('should handle simple variable reference', async () => {
      const evaluator = vi.fn().mockReturnValue(true)
      engine = new BpmnProcessEngine({
        variableEvaluator: evaluator,
        autoExecute: false
      })
      engine.loadProcess(
        [
          createMockNode('start', 'bpmn-start'),
          createMockNode('task', 'bpmn-task')
        ],
        [createMockEdge('e1', 'start', 'task', '${isActive}')]
      )
      const instance = engine.createInstance()
      engine.setVariable(instance.id, 'isActive', true)
      await engine.start(instance.id)
      expect(evaluator).toHaveBeenCalled()
    })

    it('should handle true literal', async () => {
      const evaluator = vi.fn().mockReturnValue(true)
      engine = new BpmnProcessEngine({
        variableEvaluator: evaluator,
        autoExecute: false
      })
      engine.loadProcess(
        [
          createMockNode('start', 'bpmn-start'),
          createMockNode('task', 'bpmn-task')
        ],
        [createMockEdge('e1', 'start', 'task', '${true}')]
      )
      const instance = engine.createInstance()
      await engine.start(instance.id)
      expect(evaluator).toHaveBeenCalled()
    })

    it('should handle false literal', async () => {
      const evaluator = vi.fn().mockReturnValue(false)
      engine = new BpmnProcessEngine({
        variableEvaluator: evaluator,
        autoExecute: false
      })
      engine.loadProcess(
        [
          createMockNode('start', 'bpmn-start'),
          createMockNode('task', 'bpmn-task')
        ],
        [createMockEdge('e1', 'start', 'task', '${false}')]
      )
      const instance = engine.createInstance()
      await engine.start(instance.id)
      expect(evaluator).toHaveBeenCalled()
    })
  })
})
