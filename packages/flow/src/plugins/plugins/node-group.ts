import type { FlowInstance, FlowPlugin } from '../plugin'
import type { Node } from '../../types'

// ============================================================
// NodeGroupPlugin - 节点成组与子流程插件
// 功能：选中多个节点 → 一键分组为 group 父节点
//       支持折叠/展开分组、将子流程展平/嵌套
// ============================================================

export interface NodeGroupOptions {
  enabled?: boolean
  /** 分组时使用的节点类型（需要在 nodeTypes 中有对应渲染） */
  groupNodeType?: string
  /** 默认分组节点宽度偏移量 */
  paddingX?: number
  /** 默认分组节点高度偏移量 */
  paddingY?: number
  /** 分组 id 前缀 */
  groupIdPrefix?: string
  /** 折叠行为：'collapse'=折叠子节点 | 'hide'=隐藏子节点 */
  collapseMode?: 'collapse' | 'hide'
}

export interface GroupInfo {
  groupId: string
  childIds: string[]
  collapsed: boolean
  originalPositions: Record<string, { x: number; y: number }>
}

const defaultOptions: Required<NodeGroupOptions> = {
  enabled: true,
  groupNodeType: 'group',
  paddingX: 40,
  paddingY: 50,
  groupIdPrefix: 'group',
  collapseMode: 'hide'
}

/**
 * 计算包裹所有节点的边界框
 */
function computeBoundingBox(
  nodes: Node[],
  paddingX: number,
  paddingY: number
): { x: number; y: number; width: number; height: number } {
  if (nodes.length === 0) return { x: 0, y: 0, width: 200, height: 150 }

  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity

  nodes.forEach((node) => {
    const w = node.width || 150
    const h = node.height || 50
    minX = Math.min(minX, node.position.x)
    minY = Math.min(minY, node.position.y)
    maxX = Math.max(maxX, node.position.x + w)
    maxY = Math.max(maxY, node.position.y + h)
  })

  return {
    x: minX - paddingX,
    y: minY - paddingY,
    width: maxX - minX + paddingX * 2,
    height: maxY - minY + paddingY * 2
  }
}

/**
 * 生成唯一的分组 ID
 */
function generateGroupId(prefix: string, existingIds: string[]): string {
  let i = 1
  while (existingIds.includes(`${prefix}-${i}`)) i++
  return `${prefix}-${i}`
}

export function createNodeGroupPlugin(options: NodeGroupOptions = {}): FlowPlugin {
  const opts = { ...defaultOptions, ...options }

  // 存储分组信息的 Map
  const groupRegistry = new Map<string, GroupInfo>()

  return {
    id: 'node-group',
    name: 'NodeGroup',
    version: '1.0.0',
    description: 'Enable node grouping, sub-flow nesting and collapse/expand features',

    install(flow: FlowInstance) {
      if (!opts.enabled)
        return // ─────────────────────────────────────────────────────
        // 核心方法：将选中节点分组
        // ─────────────────────────────────────────────────────
      ;(
        flow as FlowInstance & {
          groupSelectedNodes: (label?: string) => string | null
          ungroupNodes: (groupId: string) => void
          toggleGroupCollapse: (groupId: string) => void
          isGroupCollapsed: (groupId: string) => boolean
          getGroupChildren: (groupId: string) => Node[]
          getGroupRegistry: () => Map<string, GroupInfo>
        }
      ).groupSelectedNodes = (label = 'Group') => {
        const selectedNodes = flow.nodes.value.filter(
          (n) => n.selected && n.type !== opts.groupNodeType
        )

        if (selectedNodes.length < 2) {
          console.warn('[NodeGroup] Please select at least 2 nodes to group')
          return null
        }

        const existingIds = flow.nodes.value.map((n) => n.id)
        const groupId = generateGroupId(opts.groupIdPrefix, existingIds)
        const bbox = computeBoundingBox(selectedNodes, opts.paddingX, opts.paddingY)

        // 记录各子节点的原始绝对位置
        const originalPositions: Record<string, { x: number; y: number }> = {}
        selectedNodes.forEach((n) => {
          originalPositions[n.id] = { x: n.position.x, y: n.position.y }
        })

        // 创建父 group 节点
        const groupNode: Node = {
          id: groupId,
          type: opts.groupNodeType,
          position: { x: bbox.x, y: bbox.y },
          data: {
            label,
            style: { backgroundColor: 'rgba(241, 245, 249, 0.8)' }
          },
          style: {
            width: bbox.width,
            height: bbox.height,
            minWidth: bbox.width,
            minHeight: bbox.height
          },
          width: bbox.width,
          height: bbox.height,
          selectable: true,
          draggable: true,
          zIndex: -1
        }

        flow.addNode(groupNode)

        // 更新子节点的 parentId 并转为相对坐标
        selectedNodes.forEach((node) => {
          flow.updateNode(node.id, {
            parentId: groupId,
            extent: 'parent',
            position: {
              x: node.position.x - bbox.x,
              y: node.position.y - bbox.y
            },
            selected: false
          })
        })

        // 登记分组信息
        groupRegistry.set(groupId, {
          groupId,
          childIds: selectedNodes.map((n) => n.id),
          collapsed: false,
          originalPositions
        })

        console.log(`[NodeGroup] Created group "${groupId}" with ${selectedNodes.length} nodes`)
        return groupId
      }

      // ─────────────────────────────────────────────────────
      // 解组：恢复子节点为顶层节点
      // ─────────────────────────────────────────────────────
      ;(flow as FlowInstance & { ungroupNodes: (groupId: string) => void }).ungroupNodes = (
        groupId
      ) => {
        const groupNode = flow.getNode(groupId)
        if (!groupNode) {
          console.warn(`[NodeGroup] Group "${groupId}" not found`)
          return
        }

        const groupInfo = groupRegistry.get(groupId)
        const groupPos = groupNode.position

        // 获取该 group 的所有子节点
        const childNodes = flow.nodes.value.filter((n) => n.parentId === groupId)

        // 恢复子节点为顶层节点（转回绝对坐标）
        childNodes.forEach((node) => {
          const absPos = groupInfo?.originalPositions[node.id] ?? {
            x: groupPos.x + node.position.x,
            y: groupPos.y + node.position.y
          }
          flow.updateNode(node.id, {
            parentId: undefined,
            extent: undefined,
            position: absPos
          })
        })

        // 删除 group 节点
        flow.removeNode(groupId)
        groupRegistry.delete(groupId)

        console.log(`[NodeGroup] Ungrouped "${groupId}"`)
      }

      // ─────────────────────────────────────────────────────
      // 折叠/展开分组
      // ─────────────────────────────────────────────────────
      ;(
        flow as FlowInstance & { toggleGroupCollapse: (groupId: string) => void }
      ).toggleGroupCollapse = (groupId) => {
        const groupInfo = groupRegistry.get(groupId)
        if (!groupInfo) {
          console.warn(`[NodeGroup] Group "${groupId}" not found in registry`)
          return
        }

        groupInfo.collapsed = !groupInfo.collapsed
        const hidden = groupInfo.collapsed

        // 隐藏/显示子节点
        groupInfo.childIds.forEach((childId) => {
          flow.updateNode(childId, { hidden })
        })

        // 同时隐藏/显示连接子节点的边
        flow.edges.value.forEach((edge) => {
          const srcHidden = groupInfo.childIds.includes(edge.source)
          const tgtHidden = groupInfo.childIds.includes(edge.target)
          if (srcHidden || tgtHidden) {
            flow.updateEdge(edge.id, { hidden })
          }
        })

        // 更新 group 节点的样式（折叠时缩小）
        if (hidden) {
          flow.updateNode(groupId, {
            style: { width: 160, height: 50, minWidth: 160, minHeight: 50 },
            width: 160,
            height: 50
          })
        } else {
          const groupNode = flow.getNode(groupId)
          if (groupNode) {
            const originalW = (groupNode.data as { _origWidth?: number })._origWidth
            const originalH = (groupNode.data as { _origHeight?: number })._origHeight
            flow.updateNode(groupId, {
              style: {
                width: originalW || 200,
                height: originalH || 150,
                minWidth: originalW || 200,
                minHeight: originalH || 150
              },
              width: originalW || 200,
              height: originalH || 150
            })
          }
        }

        console.log(`[NodeGroup] Group "${groupId}" ${hidden ? 'collapsed' : 'expanded'}`)
      }

      // ─────────────────────────────────────────────────────
      // 查询工具方法
      // ─────────────────────────────────────────────────────
      ;(
        flow as FlowInstance & { isGroupCollapsed: (groupId: string) => boolean }
      ).isGroupCollapsed = (groupId) => {
        return groupRegistry.get(groupId)?.collapsed ?? false
      }
      ;(flow as FlowInstance & { getGroupChildren: (groupId: string) => Node[] }).getGroupChildren =
        (groupId) => {
          return flow.nodes.value.filter((n) => n.parentId === groupId)
        }
      ;(
        flow as FlowInstance & {
          getGroupRegistry: () => Map<string, GroupInfo>
        }
      ).getGroupRegistry = () => groupRegistry
    },

    destroy() {
      groupRegistry.clear()
    }
  }
}

/** 导出分组信息类型，供外部使用 */
export type { GroupInfo as NodeGroupInfo }
