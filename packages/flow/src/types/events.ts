import type { Node, Edge, ViewportTransform, Connection } from './index'

export type FlowEventCallback<T = unknown> = (event: T) => void

export interface FlowEvents {
  'node:click': { node: Node; nativeEvent: MouseEvent }
  'node:dblclick': { node: Node; nativeEvent: MouseEvent }
  'node:dragstart': { node: Node; nativeEvent: MouseEvent }
  'node:drag': { node: Node; nativeEvent: MouseEvent; position: { x: number; y: number } }
  'node:dragend': { node: Node; nativeEvent: MouseEvent }
  'node:selected': { node: Node }
  'node:unselected': { node: Node }
  'node:contextmenu': { node: Node; nativeEvent: MouseEvent }
  'edge:click': { edge: Edge; nativeEvent: MouseEvent }
  'edge:dblclick': { edge: Edge; nativeEvent: MouseEvent }
  'edge:selected': { edge: Edge }
  'edge:unselected': { edge: Edge }
  'edge:contextmenu': { edge: Edge; nativeEvent: MouseEvent }
  'edge:connect': { connection: Connection }
  'edge:update': { edge: Edge; connection: Connection }
  'viewport:change': { transform: ViewportTransform }
  'selection:change': { selectedNodes: Node[]; selectedEdges: Edge[] }
  'selection:dragstart': { nodes: Node[]; edges: Edge[] }
  'selection:drag': { nodes: Node[]; edges: Edge[] }
  'selection:dragend': { nodes: Node[]; edges: Edge[] }
  'pane:click': { nativeEvent: MouseEvent }
  'pane:dblclick': { nativeEvent: MouseEvent }
  'pane:contextmenu': { nativeEvent: MouseEvent }
  'connect:start': { connection: Connection; nativeEvent: MouseEvent }
  'connect:end': { connection: Connection; nativeEvent: MouseEvent }
  'connect:cancel': void
}

export type FlowEventKey = keyof FlowEvents

export type FlowEventHandler<T extends FlowEventKey> = FlowEvents[T] extends void
  ? () => void
  : (event: FlowEvents[T]) => void

export interface EventBus {
  on<K extends FlowEventKey>(event: K, handler: FlowEventHandler<K>): void
  off<K extends FlowEventKey>(event: K, handler: FlowEventHandler<K>): void
  emit<K extends FlowEventKey>(event: K, payload?: FlowEvents[K]): void
  once<K extends FlowEventKey>(event: K, handler: FlowEventHandler<K>): void
  clear(): void
}

export interface SelectionRect {
  x: number
  y: number
  width: number
  height: number
}
