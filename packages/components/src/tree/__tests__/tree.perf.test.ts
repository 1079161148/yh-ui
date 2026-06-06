/**
 * YhTree 虚拟滚动性能基准测试
 * 目标：验证 10k 节点下虚拟滚动性能满足标准
 *
 * 环境说明：Happy-DOM 无真实布局引擎与 GPU 加速，mount() 成本远高于浏览器。
 * 阈值策略：以 Happy-DOM 实测数据为基准，保留相对比率断言验证虚拟滚动有效性。
 *
 * 指标阈值（Happy-DOM 环境，已适配 Windows CI）：
 *  - 初始挂载时间    < 5000ms
 *  - 重复挂载 max    < 8000ms
 *  - 展开根节点操作  < 5000ms（连续 10 个）
 *  - 虚拟 DOM 节点数 << 数据量（绝对正确性）
 *  - 性能降级比      < 3x（相对稳定性）
 */
import { describe, it, expect, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Tree from '../src/tree.vue'
import type { TreeNodeData } from '../src/tree'

// ─── 辅助工具 ─────────────────────────────────────────────────────────────────

const bench = (label: string, fn: () => void, threshold: number): number => {
  const t0 = performance.now()
  fn()
  const elapsed = performance.now() - t0
  console.log(`[PERF] ${label}: ${elapsed.toFixed(2)}ms  (threshold: ${threshold}ms)`)
  return elapsed
}

/**
 * 生成树形数据（完全满足 TreeNodeData 接口要求）
 * @param rootCount 根节点数量
 * @param childCount 每个根节点的子节点数量
 * 总节点数 = rootCount * (childCount + 1)
 */
const genTreeData = (rootCount: number, childCount: number): TreeNodeData[] =>
  Array.from(
    { length: rootCount },
    (_, i): TreeNodeData => ({
      key: `root-${i}`,
      id: `root-${i}`,
      label: `根节点 ${i}`,
      children: Array.from(
        { length: childCount },
        (_, j): TreeNodeData => ({
          key: `child-${i}-${j}`,
          id: `child-${i}-${j}`,
          label: `子节点 ${i}-${j}`
        })
      )
    })
  )

/** 生成扁平 10k 节点（无嵌套，纯列表性能测试） */
const genFlatNodes = (n: number): TreeNodeData[] =>
  Array.from(
    { length: n },
    (_, i): TreeNodeData => ({
      key: `node-${i}`,
      id: `node-${i}`,
      label: `节点 ${i}（Node ${i}）`
    })
  )

// ─── 数据预生成 ───────────────────────────────────────────────────────────────
let TREE_10K: TreeNodeData[] // 100 根 × 100 子 = 10,100 节点
let TREE_FLAT_10K: TreeNodeData[]

beforeAll(() => {
  TREE_10K = genTreeData(100, 100)
  TREE_FLAT_10K = genFlatNodes(10_000)
})

// ─── 测试套件 ─────────────────────────────────────────────────────────────────

describe('YhTree 虚拟滚动性能基准测试', () => {
  // ── 1. 扁平 10k 节点挂载（虚拟滚动） ──────────────────────────────────────
  it('10k 扁平节点：启用虚拟滚动时挂载应 < 5000ms（Happy-DOM 基准）', () => {
    let wrapper: ReturnType<typeof mount>

    const elapsed = bench(
      '初始挂载（virtual=true, 10k 扁平节点）',
      () => {
        wrapper = mount(Tree, {
          props: {
            data: TREE_FLAT_10K,
            virtual: true,
            height: 400,
            itemHeight: 32,
            nodeKey: 'id'
          }
        })
      },
      5000
    )

    expect(wrapper!.classes()).toContain('yh-tree')
    expect(elapsed).toBeLessThan(5000)

    wrapper!.unmount()
  })

  // ── 2. 树形 10k 节点挂载（所有根节点折叠） ───────────────────────────────
  it('10k 树形节点（折叠态）：虚拟滚动挂载应 < 5000ms（Happy-DOM 基准）', () => {
    let wrapper: ReturnType<typeof mount>

    const elapsed = bench(
      '初始挂载（10k 树形节点，全折叠）',
      () => {
        wrapper = mount(Tree, {
          props: {
            data: TREE_10K,
            virtual: true,
            height: 400,
            itemHeight: 32,
            nodeKey: 'id'
          }
        })
      },
      5000
    )

    expect(elapsed).toBeLessThan(5000)
    wrapper!.unmount()
  })

  // ── 3. 虚拟滚动 DOM 节点数量控制 ─────────────────────────────────────────
  it('10k 扁平节点：虚拟滚动 DOM 节点数应远少于数据量', async () => {
    const wrapper = mount(Tree, {
      props: {
        data: TREE_FLAT_10K,
        virtual: true,
        height: 400,
        itemHeight: 32,
        nodeKey: 'id'
      }
    })

    await nextTick()

    const nodeElements = wrapper.findAll('.yh-tree__node')
    console.log(
      `[PERF] 虚拟滚动 DOM 节点数: ${nodeElements.length}，数据量: ${TREE_FLAT_10K.length}`
    )

    // 400px / 32px = 12.5，加 overscan 约 20 条，远小于 10k
    expect(nodeElements.length).toBeLessThan(100)

    wrapper.unmount()
  })

  // ── 4. 首屏数据正确性 ───────────────────────────────────────────────────────
  it('10k 扁平节点：首屏渲染节点 label 应正确', async () => {
    const wrapper = mount(Tree, {
      props: {
        data: TREE_FLAT_10K,
        virtual: true,
        height: 400,
        itemHeight: 32,
        nodeKey: 'id'
      }
    })

    await nextTick()

    const labels = wrapper.findAll('.yh-tree__label')
    if (labels.length > 0) {
      const firstText = labels[0].text()
      console.log(`[PERF] 首个节点文本（yh-tree__label）: "${firstText}"`)
      expect(firstText).toContain('节点 0')
    } else {
      // 兼容：无 label 分离元素时从节点文本获取
      const nodes = wrapper.findAll('.yh-tree__node')
      if (nodes.length > 0) {
        console.log(`[PERF] 节点文本（yh-tree__node）: "${nodes[0].text()}"`)
        expect(nodes[0].text()).toContain('节点 0')
      }
    }

    wrapper.unmount()
  })

  // ── 5. checkbox 勾选性能（带 checkbox 的 10k 列表） ─────────────────────
  it('10k 节点：启用 showCheckbox 时挂载应 < 6000ms（Happy-DOM 基准）', () => {
    let wrapper: ReturnType<typeof mount>

    const elapsed = bench(
      '挂载（virtual + showCheckbox, 10k 节点）',
      () => {
        wrapper = mount(Tree, {
          props: {
            data: TREE_FLAT_10K,
            virtual: true,
            height: 400,
            itemHeight: 32,
            nodeKey: 'id',
            showCheckbox: true
          }
        })
      },
      6000
    )

    expect(elapsed).toBeLessThan(6000)
    wrapper!.unmount()
  })

  // ── 6. 重复挂载稳定性（内存泄漏探针） ──────────────────────────────────────
  it('10k 节点：重复挂载/卸载 5 次性能应保持稳定', () => {
    const ROUNDS = 5
    const times: number[] = []

    for (let r = 0; r < ROUNDS; r++) {
      const t0 = performance.now()
      const wrapper = mount(Tree, {
        props: {
          data: TREE_FLAT_10K,
          virtual: true,
          height: 400,
          itemHeight: 32,
          nodeKey: 'id'
        }
      })
      wrapper.unmount()
      times.push(performance.now() - t0)
    }

    const avg = times.reduce((a, b) => a + b, 0) / ROUNDS
    const max = Math.max(...times)

    console.log(
      `[PERF] 重复挂载（${ROUNDS}次）平均: ${avg.toFixed(2)}ms  最大: ${max.toFixed(2)}ms`
    )
    console.log(`[PERF] 各轮耗时: ${times.map((t) => t.toFixed(1)).join(' / ')} ms`)

    // Happy-DOM 基准：max < 8000ms
    expect(max).toBeLessThan(8000)

    // 性能降级比
    const degradation = times[ROUNDS - 1] / times[0]
    console.log(`[PERF] 性能降级比（最后/第一）: ${degradation.toFixed(2)}x`)
    expect(degradation).toBeLessThan(3)
  })

  // ── 7. 大树展开/折叠根节点性能 ──────────────────────────────────────────────
  it('10k 节点：连续展开 10 个根节点应 < 5000ms（Happy-DOM 基准）', async () => {
    const wrapper = mount(Tree, {
      props: {
        data: TREE_10K,
        virtual: true,
        height: 400,
        itemHeight: 32,
        nodeKey: 'id'
      }
    })

    await nextTick()

    // 获取根节点展开图标
    const expandIcons = wrapper.findAll('.yh-tree__expand-icon')
    const EXPAND_COUNT = Math.min(10, expandIcons.length)

    const t0 = performance.now()
    for (let i = 0; i < EXPAND_COUNT; i++) {
      await expandIcons[i].trigger('click')
    }
    const elapsed = performance.now() - t0

    console.log(`[PERF] 连续展开 ${EXPAND_COUNT} 个根节点: ${elapsed.toFixed(2)}ms`)
    expect(elapsed).toBeLessThan(5000)

    wrapper.unmount()
  })
})
