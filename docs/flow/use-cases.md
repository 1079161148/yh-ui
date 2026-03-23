# 实战业务场景大赏 (Use Cases)

\`YH-UI Flow\` 的本质不仅仅是一个“连线库”，它底层极具弹性的无渲染（Renderless）设计及高性能的虚拟视口计算，使得它可以被轻易改造成几乎所有类型的图可视化应用。

以下是几个真实业务场景下高度特化的使用案例：

## 1. 实体关系图 (Entity Relationship - ER)

ER 图常用于数据库表结构设计或复杂模型依赖分析。利用 Flow 的自适应宽高、表格化 HTML 支持配合跨节点的动态锚点（Handles），我们能迅速构建工业级的 ER 结构查看器。

<DemoBlock title="ER 结构模型演示" :tsCode="erTsCode" :jsCode="erJsCode">
  <div style="height: 480px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <yh-flow :nodes="erNodes" :edges="erEdges" :node-types="erNodeTypes" background="dots" />
  </div>
</DemoBlock>

> [!TIP]
> \`erNode\` 内置了纯 Vue JSX 逻辑。利用自定义节点的灵活性，甚至可以在表格节点内部嵌套滚动条和复选框！

## 2. 组织架构图 (Organization Chart)

借助 Dagre 层级布局配合 \`step\` 直角连线（Ortho Edges），我们能轻易组合成传统树状的组织架构展现模型。

<DemoBlock title="组织人员树状图" :tsCode="orgTsCode" :jsCode="orgJsCode">
  <div style="height: 400px; position: relative; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <yh-flow ref="pageFlowRef" :nodes="orgNodes" :edges="orgEdges" :node-types="orgNodeTypes" background="grid" />
    <div style="position: absolute; top: 10px; right: 10px; z-index: 10;">
      <button @click="runAutoLayout" style="padding: 6px 12px; background: white; border: 1px solid #cbd5e1; border-radius: 6px; cursor: pointer; font-size: 13px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">自动整理架构 (Dagre)</button>
    </div>
  </div>
</DemoBlock>

## 3. 系统设计架构图 (System Architecture Topology)

使用自定义图标与多配色方案组合，极速搭建包含云服务、客户端、中间件、数据库等标准架构图模型。

<DemoBlock title="系统设计架构图" :tsCode="sysTsCode" :jsCode="sysJsCode">
  <div style="height: 450px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; background: #fafafa;">
    <yh-flow :nodes="sysNodes" :edges="sysEdges" :node-types="sysNodeTypes" background="dots" />
  </div>
</DemoBlock>

## 4. 纯净流式时间轴 (Horizontal Timeline)

仅仅通过去除画布背景、替换简单的钻石或圆形节点，Flow 即可被快速退化为优雅的里程碑时间轴。

<DemoBlock title="简单时间轴" :tsCode="timeTsCode" :jsCode="timeJsCode">
  <div style="height: 380px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; background: white;">
    <yh-flow :nodes="timeNodes" :edges="timeEdges" :node-types="timeNodeTypes" />
  </div>
</DemoBlock>

## 5. 可交互数据折叠树 (Expandable JSON Tree)

实现经典的思维导图或者层级折叠树！利用组件层面的 \`hidden\` 方法，可以无缝呈现高度复杂的深层级结构数据的收缩/展开。

<DemoBlock title="展开/折叠树" :tsCode="treeTsCode" :jsCode="treeJsCode">
  <div style="height: 480px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <yh-flow :nodes="treeNodes" :edges="treeEdges" :node-types="treeNodeTypes" background="grid" />
  </div>
</DemoBlock>

<script setup lang="ts">
import { ref, h } from 'vue'
import { toJs, _T, _S, _St } from '../.vitepress/theme/utils/demo-utils'
import { createLayoutPlugin } from '@yh-ui/flow'

// --- ER Diagram ---
const erTsCode = `<${_T}>
  <div class="er-demo-container">
    <yh-flow 
      :nodes="nodes" 
      :edges="edges" 
      :node-types="nodeTypes" 
      background="dots" 
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref, h } from 'vue'

const ErNode = {
  props: ['node'],
  setup(props) {
    return () => h('div', {
      style: { 
        width: '260px', 
        background: 'white', 
        border: '1px solid #1a192b', 
        borderRadius: '6px', 
        overflow: 'hidden', 
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)' 
      }
    }, [
      h('div', { 
        style: { 
          background: '#3b82f6', 
          padding: '10px', 
          color: 'white', 
          fontWeight: 'bold', 
          display: 'flex', 
          justifyContent: 'space-between' 
        } 
      }, [
        h('span', null, props.node.data.tableName),
        h('span', { style: { fontSize: '11px', opacity: 0.8 } }, props.node.data.type)
      ]),
      h('div', { style: { padding: 0 } }, props.node.data.fields.map(field => h('div', {
        style: { 
          padding: '8px 12px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          borderBottom: '1px solid #f1f5f9', 
          position: 'relative' 
        }
      }, [
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1 } }, [
          h('span', { style: { color: '#64748b', flexShrink: 0, width: '14px' } }, field.isKey ? '🔑' : ''),
          h('span', { 
            style: { 
              fontWeight: 500, 
              fontSize: '13px', 
              whiteSpace: 'nowrap', 
              overflow: 'hidden', 
              textOverflow: 'ellipsis' 
            }, 
            title: field.name 
          }, field.name)
        ]),
        h('span', { 
          style: { 
            color: '#cbd5e1', 
            fontFamily: 'monospace', 
            fontSize: '12px', 
            flexShrink: 0, 
            marginLeft: '8px' 
          } 
        }, field.type),
        h('div', { 
          class: 'yh-flow-handle position-right is-source', 
          'data-handle-type': 'source', 
          'data-handle-id': 'src-' + field.name, 
          style: { right: '-4px' } 
        }),
        h('div', { 
          class: 'yh-flow-handle position-left is-target', 
          'data-handle-type': 'target', 
          'data-handle-id': 'tgt-' + field.name, 
          style: { left: '-4px' } 
        })
      ])))
    ])
  }
}

const nodeTypes = { erNode: ErNode }

const nodes = ref([
  { 
    id: 'users', 
    type: 'erNode', 
    position: { x: 50, y: 100 }, 
    data: { 
      tableName: 'Users', 
      type: 'Core', 
      fields: [ 
        { name: 'id', type: 'uuid', isKey: true }, 
        { name: 'username', type: 'varchar(50)' }, 
        { name: 'email', type: 'varchar(100)' }, 
        { name: 'created_at', type: 'timestamp' } 
      ] 
    } 
  },
  { 
    id: 'orders', 
    type: 'erNode', 
    position: { x: 450, y: 50 }, 
    data: { 
      tableName: 'Orders', 
      type: 'Transaction', 
      fields: [ 
        { name: 'id', type: 'uuid', isKey: true }, 
        { name: 'user_id', type: 'uuid' }, 
        { name: 'total_amount', type: 'decimal' }, 
        { name: 'status', type: 'varchar(20)' } 
      ] 
    } 
  },
  { 
    id: 'profiles', 
    type: 'erNode', 
    position: { x: 450, y: 300 }, 
    data: { 
      tableName: 'User Profiles', 
      type: 'Details', 
      fields: [ 
        { name: 'id', type: 'uuid', isKey: true }, 
        { name: 'user_id', type: 'uuid' }, 
        { name: 'avatar_url', type: 'varchar(255)' } 
      ] 
    } 
  }
])

const edges = ref([
  { 
    id: 'e1', 
    source: 'users', 
    target: 'orders', 
    sourceHandle: 'src-id', 
    targetHandle: 'tgt-user_id', 
    type: 'step', 
    animated: true, 
    style: { stroke: '#3b82f6', strokeWidth: 2 } 
  },
  { 
    id: 'e2', 
    source: 'users', 
    target: 'profiles', 
    sourceHandle: 'src-id', 
    targetHandle: 'tgt-user_id', 
    type: 'step', 
    style: { stroke: '#64748b' }, 
    label: '1 : 1' 
  }
])
</${_S}>

<${_St} scoped>
.er-demo-container { 
  height: 480px; 
  width: 100%; 
  border: 1px solid #e2e8f0; 
  border-radius: 8px; 
  overflow: hidden; 
}
</${_St}>`
const erJsCode = toJs(erTsCode)

// --- Org Chart ---
const orgTsCode = `<${_T}>
  <div class="org-demo-container">
    <yh-flow 
      ref="flowRef" 
      :nodes="nodes" 
      :edges="edges" 
      :node-types="nodeTypes" 
      background="grid" 
    />
    <button class="auto-btn" @click="autoLayout">自动整理架构</button>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref, h } from 'vue'
import { createLayoutPlugin } from '@yh-ui/flow'

const OrgNode = {
  props: ['node'],
  setup(props) {
    return () => h('div', {
      style: { 
        width: '220px', 
        background: 'white', 
        border: '2px solid ' + (props.node.data.color || '#e2e8f0'), 
        borderRadius: '8px', 
        display: 'flex', 
        alignItems: 'center', 
        padding: '12px', 
        gap: '12px' 
      }
    }, [
      h('div', { 
        style: { 
          width: '40px', 
          height: '40px', 
          background: '#f1f5f9', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          fontSize: '20px' 
        } 
      }, props.node.data.avatar),
      h('div', { style: { display: 'flex', flexDirection: 'column' } }, [
        h('span', { style: { fontWeight: 600, fontSize: '14px', color: '#1e293b' } }, props.node.data.name),
        h('span', { style: { fontSize: '12px', color: '#64748b' } }, props.node.data.role)
      ]),
      h('div', { 
        class: 'yh-flow-handle position-top is-target', 
        'data-handle-type': 'target', 
        style: { top: '0px' } 
      }),
      h('div', { 
        class: 'yh-flow-handle position-bottom is-source', 
        'data-handle-type': 'source', 
        style: { bottom: '0px' } 
      })
    ])
  }
}

const flowRef = ref()
const nodeTypes = { orgNode: OrgNode }

const nodes = ref([
  { id: 'ceo', type: 'orgNode', position: { x: 300, y: 50 }, data: { name: 'Alex Johnson', role: 'CEO', avatar: '👔', color: '#8b5cf6' } },
  { id: 'cto', type: 'orgNode', position: { x: 100, y: 200 }, data: { name: 'Sarah Chen', role: 'CTO', avatar: '💻', color: '#3b82f6' } },
  { id: 'cmo', type: 'orgNode', position: { x: 500, y: 200 }, data: { name: 'Michael Ross', role: 'CMO', avatar: '📈', color: '#10b981' } },
  { id: 'dev1', type: 'orgNode', position: { x: 0, y: 350 }, data: { name: 'Dev Team A', role: 'Frontend', avatar: '⚡', color: '#e2e8f0' } },
  { id: 'dev2', type: 'orgNode', position: { x: 250, y: 350 }, data: { name: 'Dev Team B', role: 'Backend', avatar: '⚙️', color: '#e2e8f0' } }
])

const edges = ref([ 
  { id: 'e1', source: 'ceo', target: 'cto', type: 'step' }, 
  { id: 'e2', source: 'ceo', target: 'cmo', type: 'step' }, 
  { id: 'e3', source: 'cto', target: 'dev1', type: 'step' }, 
  { id: 'e4', source: 'cto', target: 'dev2', type: 'step' } 
])

const autoLayout = async () => { 
  if (flowRef.value) { 
    flowRef.value.usePlugin(createLayoutPlugin({ 
      type: 'dagre', rankdir: 'TB', animate: true 
    }))
    await flowRef.value.applyLayout() 
  } 
}
</${_S}>

<${_St} scoped>
.org-demo-container { 
  height: 400px; 
  position: relative; 
}
.auto-btn { 
  position: absolute; 
  top: 10px; 
  right: 10px; 
  z-index: 10; 
  padding: 6px 12px; 
  background: white; 
  border: 1px solid #cbd5e1; 
  border-radius: 6px; 
  cursor: pointer; 
}
</${_St}>`
const orgJsCode = toJs(orgTsCode)

// --- System Arch ---
const sysTsCode = `<${_T}>
  <div class="sys-demo">
    <yh-flow :nodes="nodes" :edges="edges" :node-types="nodeTypes" background="dots" />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref, h } from 'vue'

const SysNode = {
  props: ['node'],
  setup(props) {
    return () => h('div', { 
      style: { 
        width: '70px', 
        height: '70px', 
        background: props.node.data.color, 
        borderRadius: '12px', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        color: 'white', 
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)' 
      } 
    }, [
      h('div', { style: { fontSize: '24px' } }, props.node.data.icon),
      h('div', { style: { fontSize: '12px', fontWeight: 'bold' } }, props.node.data.label),
      h('div', { class: 'yh-flow-handle position-right is-source', 'data-handle-type': 'source' }),
      h('div', { class: 'yh-flow-handle position-left is-target', 'data-handle-type': 'target' }),
      h('div', { class: 'yh-flow-handle position-top is-target', 'data-handle-type': 'target' }),
      h('div', { class: 'yh-flow-handle position-bottom is-source', 'data-handle-type': 'source' })
    ])
  }
}

const nodeTypes = { sysNode: SysNode }

const nodes = ref([
  { id: 'client', type: 'sysNode', position: { x: 50, y: 180 }, data: { label: 'Client', icon: '💻', color: '#3b82f6' } },
  { id: 'api', type: 'sysNode', position: { x: 250, y: 180 }, data: { label: 'API', icon: '⚙️', color: '#8b5cf6' } },
  { id: 'sql', type: 'sysNode', position: { x: 450, y: 100 }, data: { label: 'SQL', icon: '🗄️', color: '#10b981' } },
  { id: 'mq', type: 'sysNode', position: { x: 450, y: 260 }, data: { label: 'MQ', icon: '📨', color: '#f59e0b' } },
  { id: 'cloud', type: 'sysNode', position: { x: 650, y: 180 }, data: { label: 'Cloud', icon: '☁️', color: '#0ea5e9' } }
])

const edges = ref([
  { id: 'e1', source: 'client', target: 'api', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
  { id: 'e2', source: 'api', target: 'sql', sourceHandle: 'right', targetHandle: 'left', type: 'smoothstep' },
  { id: 'e3', source: 'api', target: 'mq', sourceHandle: 'right', targetHandle: 'left', type: 'smoothstep' },
  { id: 'e4', source: 'sql', target: 'cloud', type: 'step' },
  { id: 'e5', source: 'mq', target: 'cloud', type: 'step' }
])
</${_S}>

<${_St} scoped>
.sys-demo { 
  height: 450px; 
  width: 100%; 
  border: 1px solid #e2e8f0; 
  border-radius: 8px; 
  background: #fafafa; 
}
</${_St}>`
const sysJsCode = toJs(sysTsCode)

// --- Timeline ---
const timeTsCode = `<${_T}>
  <div class="time-demo">
    <yh-flow :nodes="nodes" :edges="edges" :node-types="nodeTypes" />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref, h } from 'vue'

const TimeNode = {
  props: ['node'],
  setup(props) {
    return () => h('div', { 
      style: { 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center' 
      } 
    }, [
      h('div', { 
        style: { 
          padding: '8px 16px', 
          background: props.node.data.bg || '#f1f5f9', 
          borderRadius: '4px', 
          fontSize: '12px', 
          fontWeight: 'bold', 
          border: '1px solid #e2e8f0', 
          marginBottom: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)' 
        } 
      }, props.node.data.label),
      h('div', { 
        style: { 
          width: '12px', 
          height: '12px', 
          borderRadius: '50%', 
          background: props.node.data.color || '#64748b', 
          zIndex: 2 
        } 
      }),
      h('div', { 
        class: 'yh-flow-handle position-right is-source', 
        'data-handle-type': 'source', 
        style: { top: '38px', right: '6px', opacity: 0 } 
      }),
      h('div', { 
        class: 'yh-flow-handle position-left is-target', 
        'data-handle-type': 'target', 
        style: { top: '38px', left: '6px', opacity: 0 } 
      })
    ])
  }
}

const nodeTypes = { timeNode: TimeNode }

const nodes = ref([
  { id: 't1', type: 'timeNode', position: { x: 50, y: 150 }, data: { label: 'Start Point', color: '#94a3b8' } },
  { id: 't2', type: 'timeNode', position: { x: 250, y: 150 }, data: { label: 'UI Design', color: '#3b82f6', bg: '#eff6ff' } },
  { id: 't3', type: 'timeNode', position: { x: 450, y: 150 }, data: { label: 'Development', color: '#f59e0b', bg: '#fef3c7' } },
  { id: 't4', type: 'timeNode', position: { x: 650, y: 150 }, data: { label: 'QA Test', color: '#ec4899', bg: '#fdf2f8' } },
  { id: 't5', type: 'timeNode', position: { x: 850, y: 150 }, data: { label: 'Launch', color: '#10b981', bg: '#ecfdf5' } }
])

const edges = ref([
  { id: 'e1', source: 't1', target: 't2', type: 'straight', style: { strokeWidth: 3, stroke: '#e2e8f0' } },
  { id: 'e2', source: 't2', target: 't3', type: 'straight', style: { strokeWidth: 3, stroke: '#e2e8f0' } },
  { id: 'e3', source: 't3', target: 't4', type: 'straight', style: { strokeWidth: 3, stroke: '#e2e8f0' } },
  { id: 'e4', source: 't4', target: 't5', type: 'straight', style: { strokeWidth: 3, stroke: '#e2e8f0' } },
])
</${_S}>

<${_St} scoped>
.time-demo { 
  height: 380px; 
  width: 100%; 
  border: 1px solid #e2e8f0; 
  border-radius: 8px; 
}
</${_St}>`
const timeJsCode = toJs(timeTsCode)

// --- Expandable Tree ---
const treeTsCode = `<${_T}>
  <div class="tree-demo">
    <yh-flow :nodes="nodes" :edges="edges" :node-types="nodeTypes" background="grid" />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref, h } from 'vue'

const TreeNode = {
  props: ['node'],
  setup(props) {
    return () => {
      const isObj = props.node.data.isObj
      const isArray = props.node.data.isArray
      let icon = isObj ? '{ }' : (isArray ? '[ ]' : 'Aa')
      
      return h('div', { 
        style: { 
          display: 'flex', 
          alignItems: 'center', 
          background: 'white', 
          border: '1px solid #3b82f6', 
          borderRadius: '4px', 
          padding: '4px 12px', 
          fontSize: '13px', 
          cursor: 'pointer', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)' 
        }, 
        onClick: props.node.data.onToggle 
      }, [
        h('span', { style: { color: '#3b82f6', marginRight: '8px', fontFamily: 'monospace' } }, icon),
        h('span', { style: { fontWeight: 'bold', color: '#1e293b' } }, props.node.data.label),
        props.node.data.value ? h('span', { style: { color: '#64748b', marginLeft: '12px' } }, props.node.data.value) : null,
        props.node.data.hasChildren ? h('span', { 
          style: { 
            background: '#3b82f6', color: 'white', borderRadius: '50%', width: '16px', 
            height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
            fontSize: '12px', marginLeft: '12px' 
          } 
        }, props.node.data.expanded ? '-' : '+') : null,
        h('div', { class: 'yh-flow-handle position-right is-source', 'data-handle-type': 'source' }),
        h('div', { class: 'yh-flow-handle position-left is-target', 'data-handle-type': 'target' })
      ])
    }
  }
}

const nodeTypes = { treeNode: TreeNode }

const nodes = ref([
  { id: 'root', type: 'treeNode', position: { x: 50, y: 200 }, data: { label: 'fathers', isArray: true, hasChildren: true, expanded: true } },
  { id: '0', type: 'treeNode', position: { x: 250, y: 200 }, data: { label: '0', isObj: true, hasChildren: true, expanded: true } },
  { id: 'id', type: 'treeNode', position: { x: 450, y: 100 }, data: { label: 'id', value: '1024' } },
  { id: 'name', type: 'treeNode', position: { x: 450, y: 170 }, data: { label: 'name', value: '"Eric"' } },
  { id: 'daughters', type: 'treeNode', position: { x: 450, y: 300 }, data: { label: 'daughters', isArray: true, hasChildren: true, expanded: false } },
  { id: 'd0', type: 'treeNode', position: { x: 650, y: 250 }, hidden: true, data: { label: '0', isObj: true } },
  { id: 'd1', type: 'treeNode', position: { x: 650, y: 350 }, hidden: true, data: { label: '1', isObj: true } }
])

const edges = ref([
  { id: 'e1', source: 'root', target: '0', type: 'smoothstep' },
  { id: 'e2', source: '0', target: 'id', type: 'smoothstep' },
  { id: 'e3', source: '0', target: 'name', type: 'smoothstep' },
  { id: 'e4', source: '0', target: 'daughters', type: 'smoothstep' },
  { id: 'e5', source: 'daughters', target: 'd0', type: 'smoothstep', hidden: true },
  { id: 'e6', source: 'daughters', target: 'd1', type: 'smoothstep', hidden: true }
])

nodes.value[4].data.onToggle = () => {
  nodes.value[4].data.expanded = !nodes.value[4].data.expanded
  nodes.value[5].hidden = !nodes.value[4].data.expanded
  nodes.value[6].hidden = !nodes.value[4].data.expanded
  edges.value[4].hidden = nodes.value[5].hidden
  edges.value[5].hidden = nodes.value[6].hidden
}
</${_S}>

<${_St} scoped>
.tree-demo { 
  height: 480px; 
  width: 100%; 
  border: 1px solid #e2e8f0; 
  border-radius: 8px; 
}
</${_St}>`
const treeJsCode = toJs(treeTsCode)


// --- 原生渲染变量代码块，供底层 Markdown 页面进行内部渲染执行使用 ---
const ErNode = {
  props: ['node'],
  setup(props) {
    return () => h('div', {
      style: { width: '260px', background: 'white', border: '1px solid #1a192b', borderRadius: '6px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }
    }, [
      h('div', { style: { background: '#3b82f6', padding: '10px', color: 'white', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' } }, [
        h('span', null, props.node.data.tableName),
        h('span', { style: { fontSize: '11px', opacity: 0.8 } }, props.node.data.type)
      ]),
      h('div', { style: { padding: 0 } }, props.node.data.fields.map(field => h('div', {
        style: { padding: '8px 12px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', position: 'relative' }
      }, [
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1 } }, [
          h('span', { style: { color: '#64748b', flexShrink: 0, width: '14px' } }, field.isKey ? '🔑' : ''),
          h('span', { style: { fontWeight: 500, fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }, title: field.name }, field.name)
        ]),
        h('span', { style: { color: '#cbd5e1', fontFamily: 'monospace', fontSize: '12px', flexShrink: 0, marginLeft: '8px' } }, field.type),
        h('div', { class: 'yh-flow-handle position-right is-source', 'data-handle-type': 'source', 'data-handle-id': 'src-' + field.name, style: { right: '-4px' } }),
        h('div', { class: 'yh-flow-handle position-left is-target', 'data-handle-type': 'target', 'data-handle-id': 'tgt-' + field.name, style: { left: '-4px' } })
      ])))
    ])
  }
}
const erNodeTypes = { erNode: ErNode }
const erNodes = ref([
  { id: 'users', type: 'erNode', position: { x: 50, y: 100 }, data: { tableName: 'Users', type: 'Core', fields: [ { name: 'id', type: 'uuid', isKey: true }, { name: 'username', type: 'varchar(50)' }, { name: 'email', type: 'varchar(100)' }, { name: 'created_at', type: 'timestamp' } ] } },
  { id: 'orders', type: 'erNode', position: { x: 450, y: 50 }, data: { tableName: 'Orders', type: 'Transaction', fields: [ { name: 'id', type: 'uuid', isKey: true }, { name: 'user_id', type: 'uuid' }, { name: 'total_amount', type: 'decimal' }, { name: 'status', type: 'varchar(20)' } ] } },
  { id: 'profiles', type: 'erNode', position: { x: 450, y: 300 }, data: { tableName: 'User Profiles', type: 'Details', fields: [ { name: 'id', type: 'uuid', isKey: true }, { name: 'user_id', type: 'uuid' }, { name: 'avatar_url', type: 'varchar(255)' } ] } }
])
const erEdges = ref([
  { id: 'e1', source: 'users', target: 'orders', sourceHandle: 'src-id', targetHandle: 'tgt-user_id', type: 'step', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
  { id: 'e2', source: 'users', target: 'profiles', sourceHandle: 'src-id', targetHandle: 'tgt-user_id', type: 'step', style: { stroke: '#64748b' }, label: '1 : 1' }
])

const OrgNode = {
  props: ['node'],
  setup(props) {
    return () => h('div', {
      style: { width: '220px', background: 'white', border: '2px solid ' + (props.node.data.color || '#e2e8f0'), borderRadius: '8px', display: 'flex', alignItems: 'center', padding: '12px', gap: '12px', marginTop: '10px' }
    }, [
      h('div', { style: { width: '40px', height: '40px', background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' } }, props.node.data.avatar),
      h('div', { style: { display: 'flex', flexDirection: 'column' } }, [
        h('span', { style: { fontWeight: 600, fontSize: '14px', color: '#1e293b' } }, props.node.data.name),
        h('span', { style: { fontSize: '12px', color: '#64748b' } }, props.node.data.role)
      ]),
      h('div', { class: 'yh-flow-handle position-top is-target', 'data-handle-type': 'target', style: { top: '0px' } }),
      h('div', { class: 'yh-flow-handle position-bottom is-source', 'data-handle-type': 'source', style: { bottom: '0px' } })
    ])
  }
}
const pageFlowRef = ref()
const orgNodeTypes = { orgNode: OrgNode }
const orgNodes = ref([ { id: 'ceo', type: 'orgNode', position: { x: 300, y: 50 }, data: { name: 'Alex Johnson', role: 'CEO', avatar: '👔', color: '#8b5cf6' } }, { id: 'cto', type: 'orgNode', position: { x: 100, y: 200 }, data: { name: 'Sarah Chen', role: 'CTO', avatar: '💻', color: '#3b82f6' } }, { id: 'cmo', type: 'orgNode', position: { x: 500, y: 200 }, data: { name: 'Michael Ross', role: 'CMO', avatar: '📈', color: '#10b981' } }, { id: 'dev1', type: 'orgNode', position: { x: 0, y: 350 }, data: { name: 'Dev Team A', role: 'Frontend', avatar: '⚡', color: '#e2e8f0' } }, { id: 'dev2', type: 'orgNode', position: { x: 250, y: 350 }, data: { name: 'Dev Team B', role: 'Backend', avatar: '⚙️', color: '#e2e8f0' } } ])
const orgEdges = ref([ { id: 'e1', source: 'ceo', target: 'cto', type: 'step' }, { id: 'e2', source: 'ceo', target: 'cmo', type: 'step' }, { id: 'e3', source: 'cto', target: 'dev1', type: 'step' }, { id: 'e4', source: 'cto', target: 'dev2', type: 'step' } ])
const runAutoLayout = async () => { if (pageFlowRef.value) { const layoutPlugin = createLayoutPlugin({ type: 'dagre', rankdir: 'TB', animate: true }); pageFlowRef.value.usePlugin(layoutPlugin); await pageFlowRef.value.applyLayout() } }

const SysNode = {
  props: ['node'],
  setup(props) {
    return () => h('div', { style: { width: '70px', height: '70px', background: props.node.data.color, borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' } }, [
      h('div', { style: { fontSize: '24px' } }, props.node.data.icon),
      h('div', { style: { fontSize: '12px', fontWeight: 'bold' } }, props.node.data.label),
      h('div', { class: 'yh-flow-handle position-right is-source', 'data-handle-type': 'source' }),
      h('div', { class: 'yh-flow-handle position-left is-target', 'data-handle-type': 'target' }),
      h('div', { class: 'yh-flow-handle position-top is-target', 'data-handle-type': 'target' }),
      h('div', { class: 'yh-flow-handle position-bottom is-source', 'data-handle-type': 'source' })
    ])
  }
}
const sysNodeTypes = { sysNode: SysNode }
const sysNodes = ref([
  { id: 'client', type: 'sysNode', position: { x: 50, y: 180 }, data: { label: 'Client', icon: '💻', color: '#3b82f6' } },
  { id: 'api', type: 'sysNode', position: { x: 250, y: 180 }, data: { label: 'API', icon: '⚙️', color: '#8b5cf6' } },
  { id: 'sql', type: 'sysNode', position: { x: 450, y: 100 }, data: { label: 'SQL', icon: '🗄️', color: '#10b981' } },
  { id: 'mq', type: 'sysNode', position: { x: 450, y: 260 }, data: { label: 'MQ', icon: '📨', color: '#f59e0b' } },
  { id: 'cloud', type: 'sysNode', position: { x: 650, y: 180 }, data: { label: 'Cloud', icon: '☁️', color: '#0ea5e9' } }
])
const sysEdges = ref([
  { id: 'e1', source: 'client', target: 'api', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
  { id: 'e2', source: 'api', target: 'sql', sourceHandle: 'right', targetHandle: 'left', type: 'smoothstep' },
  { id: 'e3', source: 'api', target: 'mq', sourceHandle: 'right', targetHandle: 'left', type: 'smoothstep' },
  { id: 'e4', source: 'sql', target: 'cloud', type: 'step' },
  { id: 'e5', source: 'mq', target: 'cloud', type: 'step' }
])

const TimeNode = {
  props: ['node'],
  setup(props) {
    return () => h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center' } }, [
      h('div', { style: { padding: '8px 16px', background: props.node.data.bg || '#f1f5f9', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', border: '1px solid #e2e8f0', marginBottom: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' } }, props.node.data.label),
      h('div', { style: { width: '12px', height: '12px', borderRadius: '50%', background: props.node.data.color || '#64748b', zIndex: 2 } }),
      h('div', { class: 'yh-flow-handle position-right is-source', 'data-handle-type': 'source', style: { top: '38px', right: '6px', opacity: 0 } }),
      h('div', { class: 'yh-flow-handle position-left is-target', 'data-handle-type': 'target', style: { top: '38px', left: '6px', opacity: 0 } })
    ])
  }
}
const timeNodeTypes = { timeNode: TimeNode }
const timeNodes = ref([
  { id: 't1', type: 'timeNode', position: { x: 50, y: 150 }, data: { label: 'Start Point', color: '#94a3b8' } },
  { id: 't2', type: 'timeNode', position: { x: 250, y: 150 }, data: { label: 'UI Design', color: '#3b82f6', bg: '#eff6ff' } },
  { id: 't3', type: 'timeNode', position: { x: 450, y: 150 }, data: { label: 'Development', color: '#f59e0b', bg: '#fef3c7' } },
  { id: 't4', type: 'timeNode', position: { x: 650, y: 150 }, data: { label: 'QA Test', color: '#ec4899', bg: '#fdf2f8' } },
  { id: 't5', type: 'timeNode', position: { x: 850, y: 150 }, data: { label: 'Launch', color: '#10b981', bg: '#ecfdf5' } }
])
const timeEdges = ref([
  { id: 'e1', source: 't1', target: 't2', type: 'straight', style: { strokeWidth: 3, stroke: '#e2e8f0' } },
  { id: 'e2', source: 't2', target: 't3', type: 'straight', style: { strokeWidth: 3, stroke: '#e2e8f0' } },
  { id: 'e3', source: 't3', target: 't4', type: 'straight', style: { strokeWidth: 3, stroke: '#e2e8f0' } },
  { id: 'e4', source: 't4', target: 't5', type: 'straight', style: { strokeWidth: 3, stroke: '#e2e8f0' } },
])

const TreeNode = {
  props: ['node'],
  setup(props) {
    return () => {
      const isObj = props.node.data.isObj
      const isArray = props.node.data.isArray
      let icon = isObj ? '{ }' : (isArray ? '[ ]' : 'Aa')
      
      return h('div', { style: { display: 'flex', alignItems: 'center', background: 'white', border: '1px solid #3b82f6', borderRadius: '4px', padding: '4px 12px', fontSize: '13px', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }, onClick: props.node.data.onToggle }, [
        h('span', { style: { color: '#3b82f6', marginRight: '8px', fontFamily: 'monospace' } }, icon),
        h('span', { style: { fontWeight: 'bold', color: '#1e293b' } }, props.node.data.label),
        props.node.data.value ? h('span', { style: { color: '#64748b', marginLeft: '12px' } }, props.node.data.value) : null,
        props.node.data.hasChildren ? h('span', { style: { background: '#3b82f6', color: 'white', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', marginLeft: '12px' } }, props.node.data.expanded ? '-' : '+') : null,
        h('div', { class: 'yh-flow-handle position-right is-source', 'data-handle-type': 'source' }),
        h('div', { class: 'yh-flow-handle position-left is-target', 'data-handle-type': 'target' })
      ])
    }
  }
}
const treeNodeTypes = { treeNode: TreeNode }
const treeNodes = ref([
  { id: 'root', type: 'treeNode', position: { x: 50, y: 200 }, data: { label: 'fathers', isArray: true, hasChildren: true, expanded: true } },
  { id: '0', type: 'treeNode', position: { x: 250, y: 200 }, data: { label: '0', isObj: true, hasChildren: true, expanded: true } },
  { id: 'id', type: 'treeNode', position: { x: 450, y: 100 }, data: { label: 'id', value: '1024' } },
  { id: 'name', type: 'treeNode', position: { x: 450, y: 170 }, data: { label: 'name', value: '"Eric"' } },
  { id: 'daughters', type: 'treeNode', position: { x: 450, y: 300 }, data: { label: 'daughters', isArray: true, hasChildren: true, expanded: false } },
  { id: 'd0', type: 'treeNode', position: { x: 650, y: 250 }, hidden: true, data: { label: '0', isObj: true } },
  { id: 'd1', type: 'treeNode', position: { x: 650, y: 350 }, hidden: true, data: { label: '1', isObj: true } }
])
const treeEdges = ref([
  { id: 'e1', source: 'root', target: '0', type: 'smoothstep' },
  { id: 'e2', source: '0', target: 'id', type: 'smoothstep' },
  { id: 'e3', source: '0', target: 'name', type: 'smoothstep' },
  { id: 'e4', source: '0', target: 'daughters', type: 'smoothstep' },
  { id: 'e5', source: 'daughters', target: 'd0', type: 'smoothstep', hidden: true },
  { id: 'e6', source: 'daughters', target: 'd1', type: 'smoothstep', hidden: true }
])
treeNodes.value[4].data.onToggle = () => {
  treeNodes.value[4].data.expanded = !treeNodes.value[4].data.expanded
  treeNodes.value[5].hidden = !treeNodes.value[4].data.expanded
  treeNodes.value[6].hidden = !treeNodes.value[4].data.expanded
  treeEdges.value[4].hidden = treeNodes.value[5].hidden
  treeEdges.value[5].hidden = treeNodes.value[6].hidden
}
</script>
