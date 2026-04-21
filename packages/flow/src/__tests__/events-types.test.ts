import { describe, it, expect } from 'vitest'
import type {
  FlowEvents,
  FlowEventCallback,
  FlowEventKey,
  FlowEventHandler,
  EventBus,
  SelectionRect
} from '../events'

describe('flow/types/events', () => {
  describe('FlowEventCallback', () => {
    it('should define callback type', () => {
      const callback: FlowEventCallback<{ node: unknown }> = (event) => {
        expect(event).toBeDefined()
      }
      expect(typeof callback).toBe('function')
    })

    it('should accept void event type', () => {
      const callback: FlowEventCallback<void> = () => {}
      expect(typeof callback).toBe('function')
    })
  })

  describe('FlowEventKey', () => {
    it('should define all event keys', () => {
      const keys: FlowEventKey[] = [
        'node:click',
        'node:dblclick',
        'node:dragstart',
        'node:drag',
        'node:dragend',
        'node:selected',
        'node:unselected',
        'node:contextmenu',
        'edge:click',
        'edge:dblclick',
        'edge:selected',
        'edge:unselected',
        'edge:contextmenu',
        'edge:connect',
        'edge:update',
        'viewport:change',
        'selection:change',
        'selection:dragstart',
        'selection:drag',
        'selection:dragend',
        'pane:click',
        'pane:dblclick',
        'pane:contextmenu',
        'connect:start',
        'connect:end',
        'connect:cancel'
      ]
      expect(keys.length).toBeGreaterThan(20)
    })
  })

  describe('FlowEvents', () => {
    it('should define node click event', () => {
      const event: FlowEvents['node:click'] = {
        node: { id: 'n1', type: 'default', position: { x: 0, y: 0 }, data: {} },
        nativeEvent: new MouseEvent('click')
      }
      expect(event.node.id).toBe('n1')
    })

    it('should define node drag event', () => {
      const event: FlowEvents['node:drag'] = {
        node: { id: 'n1', type: 'default', position: { x: 0, y: 0 }, data: {} },
        nativeEvent: new MouseEvent('mousedown'),
        position: { x: 100, y: 200 }
      }
      expect(event.position.x).toBe(100)
    })

    it('should define edge connect event', () => {
      const event: FlowEvents['edge:connect'] = {
        connection: {
          source: 'n1',
          target: 'n2',
          sourceHandle: 'right',
          targetHandle: 'left'
        }
      }
      expect(event.connection.source).toBe('n1')
      expect(event.connection.target).toBe('n2')
    })

    it('should define viewport change event', () => {
      const event: FlowEvents['viewport:change'] = {
        transform: { x: 100, y: 50, zoom: 1.5 }
      }
      expect(event.transform.zoom).toBe(1.5)
    })

    it('should define selection change event', () => {
      const event: FlowEvents['selection:change'] = {
        selectedNodes: [
          { id: 'n1', type: 'default', position: { x: 0, y: 0 }, data: {} }
        ],
        selectedEdges: []
      }
      expect(event.selectedNodes.length).toBe(1)
    })

    it('should define pane click event', () => {
      const event: FlowEvents['pane:click'] = {
        nativeEvent: new MouseEvent('click')
      }
      expect(event.nativeEvent).toBeDefined()
    })

    it('should define connect start event', () => {
      const event: FlowEvents['connect:start'] = {
        connection: { source: 'n1', target: 'n2' },
        nativeEvent: new MouseEvent('mousedown')
      }
      expect(event.connection).toBeDefined()
    })

    it('should define connect cancel event', () => {
      const event: FlowEvents['connect:cancel'] = undefined
      expect(event).toBeUndefined()
    })
  })

  describe('FlowEventHandler', () => {
    it('should define handler for node click', () => {
      const handler: FlowEventHandler<'node:click'> = (event) => {
        expect(event.node.id).toBeDefined()
      }
      expect(typeof handler).toBe('function')
    })

    it('should define handler for void event', () => {
      const handler: FlowEventHandler<'connect:cancel'> = () => {}
      expect(typeof handler).toBe('function')
    })

    it('should define handler for viewport change', () => {
      const handler: FlowEventHandler<'viewport:change'> = (event) => {
        expect(event.transform).toBeDefined()
      }
      expect(typeof handler).toBe('function')
    })
  })

  describe('EventBus', () => {
    it('should define EventBus interface', () => {
      const bus: EventBus = {
        on: () => {},
        off: () => {},
        emit: () => {},
        once: () => {},
        clear: () => {}
      }
      expect(typeof bus.on).toBe('function')
      expect(typeof bus.off).toBe('function')
      expect(typeof bus.emit).toBe('function')
      expect(typeof bus.once).toBe('function')
      expect(typeof bus.clear).toBe('function')
    })
  })

  describe('SelectionRect', () => {
    it('should define selection rectangle', () => {
      const rect: SelectionRect = {
        x: 100,
        y: 200,
        width: 300,
        height: 150
      }
      expect(rect.x).toBe(100)
      expect(rect.y).toBe(200)
      expect(rect.width).toBe(300)
      expect(rect.height).toBe(150)
    })

    it('should allow negative coordinates', () => {
      const rect: SelectionRect = {
        x: -50,
        y: -100,
        width: 200,
        height: 100
      }
      expect(rect.x).toBe(-50)
      expect(rect.y).toBe(-100)
    })

    it('should allow zero dimensions', () => {
      const rect: SelectionRect = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      }
      expect(rect.width).toBe(0)
      expect(rect.height).toBe(0)
    })
  })
})
