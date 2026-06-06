/**
 * BPMN Node Components SSR Tests
 */
import { describe, it, expect } from 'vitest'
import BpmnStartEvent from '../components/nodes/bpmn/BpmnStartEvent.vue'
import BpmnEndEvent from '../components/nodes/bpmn/BpmnEndEvent.vue'
import BpmnTask from '../components/nodes/bpmn/BpmnTask.vue'
import BpmnServiceTask from '../components/nodes/bpmn/BpmnServiceTask.vue'
import BpmnUserTask from '../components/nodes/bpmn/BpmnUserTask.vue'
import BpmnExclusiveGateway from '../components/nodes/bpmn/BpmnExclusiveGateway.vue'
import BpmnParallelGateway from '../components/nodes/bpmn/BpmnParallelGateway.vue'
import BpmnInclusiveGateway from '../components/nodes/bpmn/BpmnInclusiveGateway.vue'
import { renderSSR, expectSSRHasClass, expectSSRContains, testHydration } from './utils/ssr'

describe('BPMN Nodes SSR', () => {
  describe('BpmnStartEvent', () => {
    it('should render start event in SSR', async () => {
      const html = await renderSSR(BpmnStartEvent, {
        id: 'start-1',
        type: 'bpmn-start',
        data: { label: 'Start' },
        selected: false,
        dragging: false,
        connectable: true
      })
      // Default label is "开始"
      expectSSRContains(html, '开始')
    })

    it('should render with selected class in SSR', async () => {
      const html = await renderSSR(BpmnStartEvent, {
        id: 'start-1',
        type: 'bpmn-start',
        data: { label: 'Start' },
        selected: true,
        dragging: false,
        connectable: true
      })
      expectSSRHasClass(html, 'selected')
    })

    it('should hydrate without mismatch', async () => {
      const result = await testHydration(BpmnStartEvent, {
        id: 'start-1',
        type: 'bpmn-start',
        data: { label: 'Start' },
        selected: false,
        dragging: false,
        connectable: true
      })
      expect(result.isMatch).toBe(true)
    })
  })

  describe('BpmnEndEvent', () => {
    it('should render end event in SSR', async () => {
      const html = await renderSSR(BpmnEndEvent, {
        id: 'end-1',
        type: 'bpmn-end',
        data: { label: 'End' },
        selected: false,
        dragging: false,
        connectable: true
      })
      // Default label is "结束"
      expectSSRContains(html, '结束')
    })

    it('should render with selected class in SSR', async () => {
      const html = await renderSSR(BpmnEndEvent, {
        id: 'end-1',
        type: 'bpmn-end',
        data: { label: 'End' },
        selected: true,
        dragging: false,
        connectable: true
      })
      expectSSRHasClass(html, 'selected')
    })

    it('should hydrate without mismatch', async () => {
      const result = await testHydration(BpmnEndEvent, {
        id: 'end-1',
        type: 'bpmn-end',
        data: { label: 'End' },
        selected: false,
        dragging: false,
        connectable: true
      })
      expect(result.isMatch).toBe(true)
    })
  })

  describe('BpmnTask', () => {
    it('should render task in SSR', async () => {
      const html = await renderSSR(BpmnTask, {
        id: 'task-1',
        type: 'bpmn-task',
        data: { label: 'Process Task' },
        selected: false,
        dragging: false,
        connectable: true
      })
      // Default label is "任务"
      expectSSRContains(html, '任务')
    })

    it('should render with dragging class in SSR', async () => {
      const html = await renderSSR(BpmnTask, {
        id: 'task-1',
        type: 'bpmn-task',
        data: { label: 'Task' },
        selected: false,
        dragging: true,
        connectable: true
      })
      expectSSRHasClass(html, 'dragging')
    })

    it('should hydrate without mismatch', async () => {
      const result = await testHydration(BpmnTask, {
        id: 'task-1',
        type: 'bpmn-task',
        data: { label: 'Process Task' },
        selected: false,
        dragging: false,
        connectable: true
      })
      expect(result.isMatch).toBe(true)
    })
  })

  describe('BpmnServiceTask', () => {
    it('should render service task in SSR', async () => {
      const html = await renderSSR(BpmnServiceTask, {
        id: 'service-1',
        type: 'bpmn-service-task',
        data: { label: 'Service Task' },
        selected: false,
        dragging: false,
        connectable: true
      })
      // Default label is "服务任务"
      expectSSRContains(html, '服务任务')
    })

    it('should hydrate without mismatch', async () => {
      const result = await testHydration(BpmnServiceTask, {
        id: 'service-1',
        type: 'bpmn-service-task',
        data: { label: 'Service Task' },
        selected: false,
        dragging: false,
        connectable: true
      })
      expect(result.isMatch).toBe(true)
    })
  })

  describe('BpmnUserTask', () => {
    it('should render user task in SSR', async () => {
      const html = await renderSSR(BpmnUserTask, {
        id: 'user-1',
        type: 'bpmn-user-task',
        data: { label: 'User Task' },
        selected: false,
        dragging: false,
        connectable: true
      })
      // Default label is "用户任务"
      expectSSRContains(html, '用户任务')
    })

    it('should hydrate without mismatch', async () => {
      const result = await testHydration(BpmnUserTask, {
        id: 'user-1',
        type: 'bpmn-user-task',
        data: { label: 'User Task' },
        selected: false,
        dragging: false,
        connectable: true
      })
      expect(result.isMatch).toBe(true)
    })
  })

  describe('BpmnExclusiveGateway', () => {
    it('should render exclusive gateway in SSR', async () => {
      const html = await renderSSR(BpmnExclusiveGateway, {
        id: 'gw-1',
        type: 'bpmn-exclusive-gateway',
        data: { label: 'Decision' },
        selected: false,
        dragging: false,
        connectable: true
      })
      // Renders × symbol
      expectSSRContains(html, '×')
    })

    it('should hydrate without mismatch', async () => {
      const result = await testHydration(BpmnExclusiveGateway, {
        id: 'gw-1',
        type: 'bpmn-exclusive-gateway',
        data: { label: 'Decision' },
        selected: false,
        dragging: false,
        connectable: true
      })
      expect(result.isMatch).toBe(true)
    })
  })

  describe('BpmnParallelGateway', () => {
    it('should render parallel gateway in SSR', async () => {
      const html = await renderSSR(BpmnParallelGateway, {
        id: 'gw-2',
        type: 'bpmn-parallel-gateway',
        data: { label: 'Parallel' },
        selected: false,
        dragging: false,
        connectable: true
      })
      // Renders + symbol
      expectSSRContains(html, '+')
    })

    it('should hydrate without mismatch', async () => {
      const result = await testHydration(BpmnParallelGateway, {
        id: 'gw-2',
        type: 'bpmn-parallel-gateway',
        data: { label: 'Parallel' },
        selected: false,
        dragging: false,
        connectable: true
      })
      expect(result.isMatch).toBe(true)
    })
  })

  describe('BpmnInclusiveGateway', () => {
    it('should render inclusive gateway in SSR', async () => {
      const html = await renderSSR(BpmnInclusiveGateway, {
        id: 'gw-3',
        type: 'bpmn-inclusive-gateway',
        data: { label: 'Inclusive' },
        selected: false,
        dragging: false,
        connectable: true
      })
      // Renders ○ symbol
      expectSSRContains(html, '○')
    })

    it('should hydrate without mismatch', async () => {
      const result = await testHydration(BpmnInclusiveGateway, {
        id: 'gw-3',
        type: 'bpmn-inclusive-gateway',
        data: { label: 'Inclusive' },
        selected: false,
        dragging: false,
        connectable: true
      })
      expect(result.isMatch).toBe(true)
    })
  })
})
