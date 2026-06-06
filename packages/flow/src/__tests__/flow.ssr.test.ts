/**
 * Flow Main Component SSR Tests
 */
import { describe, it, expect } from 'vitest'
import Flow from '../Flow.vue'
import { renderSSR, expectSSRHasClass, expectSSRContains, testHydration } from './utils/ssr'

describe('Flow SSR', () => {
  it('should render Flow component in SSR', async () => {
    const html = await renderSSR(Flow, {
      nodes: [],
      edges: []
    })
    expectSSRContains(html, 'yh-flow')
  })

  it('should render with custom class in SSR', async () => {
    const html = await renderSSR(Flow, {
      nodes: [],
      edges: [],
      class: 'custom-flow'
    })
    expectSSRHasClass(html, 'custom-flow')
  })

  it('should render nodes in SSR', async () => {
    const nodes = [
      {
        id: '1',
        type: 'default',
        position: { x: 0, y: 0 },
        data: { label: 'Node 1' }
      },
      {
        id: '2',
        type: 'default',
        position: { x: 100, y: 100 },
        data: { label: 'Node 2' }
      }
    ]
    const html = await renderSSR(Flow, {
      nodes,
      edges: []
    })
    expectSSRContains(html, 'Node 1')
    expectSSRContains(html, 'Node 2')
  })

  it('should render edges in SSR', async () => {
    const nodes = [
      { id: '1', type: 'default', position: { x: 0, y: 0 }, data: { label: 'A' } },
      { id: '2', type: 'default', position: { x: 100, y: 0 }, data: { label: 'B' } }
    ]
    const edges = [{ id: 'e1', source: '1', target: '2' }]
    const html = await renderSSR(Flow, {
      nodes,
      edges
    })
    expectSSRContains(html, 'yh-flow-edge')
  })

  it('should render with fitView props in SSR', async () => {
    const html = await renderSSR(Flow, {
      nodes: [],
      edges: [],
      fitView: true
    })
    expectSSRContains(html, 'yh-flow')
  })

  it('should render with minZoom and maxZoom in SSR', async () => {
    const html = await renderSSR(Flow, {
      nodes: [],
      edges: [],
      minZoom: 0.5,
      maxZoom: 2
    })
    expectSSRContains(html, 'yh-flow')
  })

  it('should render with nodesDraggable false in SSR', async () => {
    const html = await renderSSR(Flow, {
      nodes: [],
      edges: [],
      nodesDraggable: false
    })
    expectSSRContains(html, 'yh-flow')
  })

  it('should render with edgesEditable false in SSR', async () => {
    const html = await renderSSR(Flow, {
      nodes: [],
      edges: [],
      edgesEditable: false
    })
    expectSSRContains(html, 'yh-flow')
  })

  it('should render with snapToGrid in SSR', async () => {
    const html = await renderSSR(Flow, {
      nodes: [],
      edges: [],
      snapToGrid: true,
      snapGrid: [20, 20]
    })
    expectSSRContains(html, 'yh-flow')
  })

  it('should render with connection line style in SSR', async () => {
    const html = await renderSSR(Flow, {
      nodes: [],
      edges: [],
      connectionLineStyle: { stroke: '#ff0000', strokeWidth: 2 }
    })
    expectSSRContains(html, 'yh-flow')
  })

  it('should hydrate without mismatch', async () => {
    const nodes = [{ id: '1', type: 'default', position: { x: 0, y: 0 }, data: { label: 'Test' } }]
    const result = await testHydration(Flow, {
      nodes,
      edges: []
    })
    expect(result.isMatch).toBe(true)
  })
})
