# 实时协作 (Collaboration)

`FlowCollaborationEngine` 基于 WebSocket 与轻量级 CRDT（LWW Register / G-Counter）实现多人实时编辑 Flow，支持光标同步、选区同步与冲突解决。协作引擎提供 `connect`、`disconnect` 与事件监听，可直接与现有的 WebSocket 服务对接。

## 协作架构

- **CRDT 状态**：本地维护 `nodes`、`edges`、`viewport` 的 Map，结合 LWW 注册表处理并发更新
- **WebSocket 消息**：join/leave/operation/sync/cursor/selection 六种消息类型，用于房间管理、状态同步与即时交互
- **事件回调**：支持 `sync`、`operation`、`cursor_update`、`user_joined`、`user_left` 等事件，便于 UI 响应
- **重连机制**：自动指数退避重连，最多 5 次尝试

## 核心 API

| API                                                                            | 说明                                                               |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `connect(options)`                                                             | 连接到协作房间（serverUrl、roomId、userId、userName、初始节点/边） |
| `disconnect()`                                                                 | 断开连接，清理心跳                                                 |
| `addNode(node)` / `updateNode(nodeId, updates)` / `deleteNode(nodeId)`         | 本地操作自动广播                                                   |
| `addEdge(edge)` / `updateEdge(edgeId, updates)` / `deleteEdge(edgeId)`         | 连线操作同步                                                       |
| `updateViewport(viewport)` / `updateCursor(x, y)` / `updateSelection(nodeIds)` | 视口与交互同步                                                     |
| `getState()` / `getCursors()` / `getConnectionState()`                         | 查询当前状态                                                       |
| `on(event, callback)` / `off(event, callback)`                                 | 事件订阅                                                           |

## 示例

下面示例演示如何初始化协作引擎、连接房间、监听事件，并在 UI 中展示用户光标与状态。

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { toJs, _T, _S, _St } from '../.vitepress/theme/utils/demo-utils'
import type { Node, Edge, FlowInstance } from '@yh-ui/flow'
import {
  FlowCollaborationEngine,
  type ConnectionState,
  type CollaborationEvent
} from '@yh-ui/flow'

const nodes = ref<Node[]>([
  { id: '1', type: 'input', position: { x: 100, y: 80 }, data: { label: '开始' } },
  { id: '2', type: 'default', position: { x: 300, y: 80 }, data: { label: '协作编辑' } },
  { id: '3', type: 'output', position: { x: 500, y: 80 }, data: { label: '结束' } }
])
const edges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3' }
])

const flowRef = ref<FlowInstance>()
const connState = ref<ConnectionState>('disconnected')
const eventLog = ref<string[]>([])
const cursorList = ref<Array<{ id: string; name: string; color: string }>>([])

const collab = new FlowCollaborationEngine()

collab.on('sync', (e) => {
  eventLog.value = [`[sync] ${new Date().toLocaleTimeString()}`, ...eventLog.value].slice(0, 20)
  const state = collab.getState()
  nodes.value = state.nodes
  edges.value = state.edges
})

collab.on('operation', (e) => {
  eventLog.value = [`[op] ${e.data?.type} by ${e.userId}`, ...eventLog.value].slice(0, 20)
})

collab.on('cursor_update', (e) => {
  eventLog.value = [`[cursor] ${e.userId}`, ...eventLog.value].slice(0, 20)
  cursorList.value = Array.from(collab.getCursors().entries()).map(([id, c]) => ({
    id,
    name: c.name,
    color: c.color
  }))
})

collab.on('user_joined', (e) => {
  eventLog.value = [`[join] ${e.userId}`, ...eventLog.value].slice(0, 20)
})

collab.on('user_left', (e) => {
  eventLog.value = [`[leave] ${e.userId}`, ...eventLog.value].slice(0, 20)
})

const connectRoom = async () => {
  try {
    await collab.connect({
      serverUrl: 'wss://echo.websocket.org',
      roomId: 'demo-room',
      userId: 'user-' + Math.random().toString(36).slice(2, 8),
      userName: 'Demo User',
      initialNodes: nodes.value,
      initialEdges: edges.value
    })
    connState.value = collab.getConnectionState()
    eventLog.value = ['Connected!', ...eventLog.value]
  } catch (e) {
    eventLog.value = ['Connection failed (demo only)', ...eventLog.value]
  }
}

const disconnectRoom = () => {
  collab.disconnect()
  connState.value = collab.getConnectionState()
  eventLog.value = ['Disconnected', ...eventLog.value]
}

const simulateRemote = () => {
  const mockEvent: CollaborationEvent = {
    type: 'cursor_update',
    userId: 'mock-user',
    data: { x: 200, y: 150 },
    timestamp: Date.now()
  }
  eventLog.value = ['[sim] cursor_update', ...eventLog.value].slice(0, 5)
}

const tsCode = `<${_T}>
  <div class="collab-demo">
    <div class="toolbar">
      <button @click="connectRoom">连接房间</button>
      <button @click="disconnectRoom">断开连接</button>
      <button @click="simulateRemote">模拟远程事件</button>
    </div>
    <div class="main-row">
      <div class="flow-wrapper">
        <yh-flow ref="flowRef" :nodes="nodes" :edges="edges" background="dots" />
      </div>
      <div class="side-panel">
        <p class="status">连接状态：{{ connState }}</p>
        <ul class="log">
          <li v-for="log in eventLog" :key="log">{{ log }}</li>
        </ul>
        <div v-if="cursorList.length" class="cursors">
          <p>其他用户：</p>
          <span v-for="c in cursorList" :key="c.id" :style="{color:c.color}">● {{c.name}}</span>
        </div>
      </div>
    </div>
  </div>
</${_T}>

<${_S} lang="ts" setup>
import { ref, onMounted } from 'vue';
import type { Node, Edge, FlowInstance } from '@yh-ui/flow';
import {
  FlowCollaborationEngine,
  type ConnectionState,
  type CollaborationEvent
} from '@yh-ui/flow';

const nodes = ref<Node[]>([
  { id: '1', type: 'input', position: { x: 100, y: 80 }, data: { label: 'Start' } },
  { id: '2', type: 'default', position: { x: 300, y: 80 }, data: { label: 'Collab' } },
  { id: '3', type: 'output', position: { x: 500, y: 80 }, data: { label: 'End' } }
]);
const edges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3' }
]);

const flowRef = ref<FlowInstance>();
const connState = ref<ConnectionState>('disconnected');
const eventLog = ref<string[]>([]);
const cursorList = ref<Array<{ id: string; name: string; color: string }>>([]);

const collab = new FlowCollaborationEngine();

collab.on('sync', (e) => {
  eventLog.value = [\`[sync] \${new Date().toLocaleTimeString()}\`, ...eventLog.value].slice(0, 20);
  const state = collab.getState();
  nodes.value = state.nodes;
  edges.value = state.edges;
});

collab.on('operation', (e) => {
  eventLog.value = [\`[op] \${e.data?.type} by \${e.userId}\`, ...eventLog.value].slice(0, 20);
});

collab.on('cursor_update', (e) => {
  eventLog.value = [\`[cursor] \${e.userId}\`, ...eventLog.value].slice(0, 20);
  cursorList.value = Array.from(collab.getCursors().entries()).map(([id, c]) => ({
    id, name: c.name, color: c.color
  }));
});

collab.on('user_joined', (e) => {
  eventLog.value = [\`[join] \${e.userId}\`, ...eventLog.value].slice(0, 20);
});

collab.on('user_left', (e) => {
  eventLog.value = [\`[leave] \${e.userId}\`, ...eventLog.value].slice(0, 20);
});

const connectRoom = async () => {
  try {
    await collab.connect({
      serverUrl: 'wss://echo.websocket.org',
      roomId: 'demo-room',
      userId: 'user-' + Math.random().toString(36).slice(2, 8),
      userName: 'Demo User',
      initialNodes: nodes.value,
      initialEdges: edges.value
    });
    connState.value = collab.getConnectionState();
    eventLog.value = ['Connected!', ...eventLog.value];
  } catch (e) {
    eventLog.value = ['Connection failed (demo only)', ...eventLog.value];
  }
};

const disconnectRoom = () => {
  collab.disconnect();
  connState.value = collab.getConnectionState();
  eventLog.value = ['Disconnected', ...eventLog.value];
};

const simulateRemote = () => {
  eventLog.value = ['[sim] cursor_update', ...eventLog.value].slice(0, 20);
};
</${_S}>

<${_St}>
.collab-demo {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 500px;
}
.toolbar {
  display: flex;
  gap: 8px;
}
.toolbar button {
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #cbd5e1;
  background: #fff;
  cursor: pointer;
}
.main-row {
  display: flex;
  gap: 12px;
  flex: 1;
}
.flow-wrapper {
  flex: 1;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
}
.side-panel {
  width: 200px;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.status {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
}
.log {
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 12px;
  color: #606266;
  max-height: 380px;
  overflow-y: auto;
}
.cursors {
  margin-top: auto;
  font-size: 12px;
}
</${_St}>`

const jsCode = toJs(tsCode)
</script>

<DemoBlock title="实时协作示例" :ts-code="tsCode" :js-code="jsCode">
  <div style="display:flex;flex-direction:column;gap:10px;height:500px;">
    <div style="display:flex;gap:8px;">
      <button style="padding:6px 12px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;" @click="connectRoom">
        连接房间
      </button>
      <button style="padding:6px 12px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;" @click="disconnectRoom">
        断开连接
      </button>
      <button style="padding:6px 12px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;" @click="simulateRemote">
        模拟远程事件
      </button>
    </div>
    <div style="display:flex;gap:12px;flex:1;">
      <div style="flex:1;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
        <yh-flow ref="flowRef" :nodes="nodes" :edges="edges" background="dots" style="width:100%;height:100%;"></yh-flow>
      </div>
      <div style="width:200px;padding:12px;border:1px solid #e2e8f0;border-radius:8px;background:#fafafa;display:flex;flex-direction:column;gap:8px;">
        <p style="margin:0;font-size:13px;font-weight:600;">连接状态：{{ connState }}</p>
        <ul style="list-style:none;margin:0;padding:0;font-size:12px;color:#606266;max-height:380px;overflow-y:auto;">
          <li v-for="log in eventLog" :key="log" style="padding: 2px 0;">{{ log }}</li>
        </ul>
      </div>
    </div>
  </div>
</DemoBlock>

## 最佳实践

1. **结合业务 WebSocket 服务**：`connect` 中的 `serverUrl` 替换为你的协作后端地址，后端只需转发消息即可。
2. **本地优先**：所有本地操作立即生效，网络同步通过 `operation` 消息异步完成，LWW 机制保证最终一致性。
3. **处理冲突**：通过 `on('operation')` 监听远程更新，可针对特定节点/边做冲突 UI 提示或回滚。
4. **光标与选区优化**：`updateCursor` 与 `updateSelection` 使用不可靠传输（unreliable），避免频繁网络抖动影响体验。

<style scoped>
.collab-demo {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 500px;
}
.toolbar {
  display: flex;
  gap: 8px;
}
.toolbar button {
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #cbd5e1;
  background: #fff;
  cursor: pointer;
}
.main-row {
  display: flex;
  gap: 12px;
  flex: 1;
}
.flow-wrapper {
  flex: 1;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
}
.side-panel {
  width: 200px;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.status {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
}
.log {
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 12px;
  color: #606266;
  max-height: 380px;
  overflow-y: auto;
}
.log::-webkit-scrollbar {
  width: 4px;
}
.log::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 4px;
}
</style>
