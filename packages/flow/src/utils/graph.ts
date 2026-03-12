/**
 * 检查图中是否存在环
 */
export function hasCycle(
  edges: { source: string; target: string }[],
  startNodeId: string,
  visited: Set<string> = new Set(),
  recursionStack: Set<string> = new Set()
): boolean {
  visited.add(startNodeId)
  recursionStack.add(startNodeId)

  const outgoingEdges = edges.filter((e) => e.source === startNodeId)

  for (const edge of outgoingEdges) {
    if (!visited.has(edge.target)) {
      if (hasCycle(edges, edge.target, visited, recursionStack)) {
        return true
      }
    } else if (recursionStack.has(edge.target)) {
      return true
    }
  }

  recursionStack.delete(startNodeId)
  return false
}

/**
 * 拓扑排序
 */
export function topologicalSort(
  nodes: { id: string }[],
  edges: { source: string; target: string }[]
): string[] {
  const inDegree = new Map<string, number>()
  const adjacency = new Map<string, string[]>()

  // 初始化
  for (const node of nodes) {
    inDegree.set(node.id, 0)
    adjacency.set(node.id, [])
  }

  // 构建图
  for (const edge of edges) {
    const current = inDegree.get(edge.target) || 0
    inDegree.set(edge.target, current + 1)

    const adj = adjacency.get(edge.source) || []
    adj.push(edge.target)
    adjacency.set(edge.source, adj)
  }

  // BFS
  const queue: string[] = []
  for (const [nodeId, degree] of inDegree) {
    if (degree === 0) {
      queue.push(nodeId)
    }
  }

  const result: string[] = []
  while (queue.length > 0) {
    const nodeId = queue.shift()!
    result.push(nodeId)

    const neighbors = adjacency.get(nodeId) || []
    for (const neighbor of neighbors) {
      const degree = inDegree.get(neighbor)! - 1
      inDegree.set(neighbor, degree)
      if (degree === 0) {
        queue.push(neighbor)
      }
    }
  }

  return result
}

/**
 * 查找两个节点之间的所有路径
 */
export function findAllPaths(
  edges: { source: string; target: string }[],
  startId: string,
  endId: string
): string[][] {
  const adjacency = new Map<string, string[]>()

  for (const edge of edges) {
    const adj = adjacency.get(edge.source) || []
    adj.push(edge.target)
    adjacency.set(edge.source, adj)
  }

  const paths: string[][] = []
  const currentPath: string[] = []

  function dfs(node: string) {
    currentPath.push(node)

    if (node === endId) {
      paths.push([...currentPath])
    } else {
      const neighbors = adjacency.get(node) || []
      for (const neighbor of neighbors) {
        if (!currentPath.includes(neighbor)) {
          dfs(neighbor)
        }
      }
    }

    currentPath.pop()
  }

  dfs(startId)
  return paths
}

/**
 * 查找图中所有连通分量
 */
export function findConnectedComponents(
  nodes: { id: string }[],
  edges: { source: string; target: string }[]
): string[][] {
  const adjacency = new Map<string, string[]>()

  for (const node of nodes) {
    adjacency.set(node.id, [])
  }

  for (const edge of edges) {
    const sourceAdj = adjacency.get(edge.source) || []
    sourceAdj.push(edge.target)
    adjacency.set(edge.source, sourceAdj)

    const targetAdj = adjacency.get(edge.target) || []
    targetAdj.push(edge.source)
    adjacency.set(edge.target, targetAdj)
  }

  const visited = new Set<string>()
  const components: string[][] = []

  for (const node of nodes) {
    if (!visited.has(node.id)) {
      const component: string[] = []
      const queue = [node.id]

      while (queue.length > 0) {
        const current = queue.shift()!
        if (!visited.has(current)) {
          visited.add(current)
          component.push(current)

          const neighbors = adjacency.get(current) || []
          for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
              queue.push(neighbor)
            }
          }
        }
      }

      components.push(component)
    }
  }

  return components
}

/**
 * 广度优先搜索
 */
export function bfs(adjacency: Map<string, string[]>, startId: string): string[] {
  const visited = new Set<string>([startId])
  const queue = [startId]
  const result: string[] = []

  while (queue.length > 0) {
    const node = queue.shift()!
    result.push(node)

    const neighbors = adjacency.get(node) || []
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor)
        queue.push(neighbor)
      }
    }
  }

  return result
}

/**
 * 深度优先搜索
 */
export function dfs(adjacency: Map<string, string[]>, startId: string): string[] {
  const visited = new Set<string>()
  const result: string[] = []

  function _dfs(node: string) {
    visited.add(node)
    result.push(node)

    const neighbors = adjacency.get(node) || []
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        _dfs(neighbor)
      }
    }
  }

  _dfs(startId)
  return result
}
