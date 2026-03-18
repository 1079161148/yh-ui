# Real-time Collaboration

`FlowCollaborationEngine` is based on WebSocket and lightweight CRDT (LWW Register / G-Counter) to achieve multi-user real-time editing of Flow, supporting cursor synchronization, selection synchronization, and conflict resolution. The collaboration engine provides `connect`, `disconnect`, and event listeners, which can be directly interfaced with existing WebSocket services.

## Collaboration Architecture

- **CRDT State**: Locally maintains Maps of `nodes`, `edges`, and `viewport`, processing concurrent updates combined with the LWW register.
- **WebSocket Messages**: join/leave/operation/sync/cursor/selection six message types, used for room management, state synchronization, and instant interaction.
- **Event Callbacks**: Supports `sync`, `operation`, `cursor_update`, `user_joined`, `user_left` events, making it easy for UI response.
- **Reconnection Mechanism**: Automatic exponential backoff reconnection, up to 5 attempts.

## Core API

| API                                                                            | Description                                                                               |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| `connect(options)`                                                             | Connect to a collaboration room (serverUrl, roomId, userId, userName, initialNodes/Edges) |
| `disconnect()`                                                                 | Disconnect and clean up heartbeats                                                        |
| `addNode(node)` / `updateNode(nodeId, updates)` / `deleteNode(nodeId)`         | Local operations are automatically broadcasted                                            |
| `addEdge(edge)` / `updateEdge(edgeId, updates)` / `deleteEdge(edgeId)`         | Edge operations synchronization                                                           |
| `updateViewport(viewport)` / `updateCursor(x, y)` / `updateSelection(nodeIds)` | Viewport and interaction synchronization                                                  |
| `getState()` / `getCursors()` / `getConnectionState()`                         | Query current state                                                                       |
| `on(event, callback)` / `off(event, callback)`                                 | Event subscription                                                                        |

## Example

The example below demonstrates how to initialize the collaboration engine, connect to a room, listen for events, and display user cursors and status in the UI.

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { toJs, _T, _S, _St } from '../../.vitepress/theme/utils/demo-utils'
import type { Node, Edge, FlowInstance } from '@yh-ui/flow'
import {
  FlowCollaborationEngine,
  type ConnectionState,
  type CollaborationEvent
} from '@yh-ui/flow'

const nodes = ref<Node[]>([
  { id: '1', type: 'input', position: { x: 100, y: 80 }, data: { label: 'Start' } },
  { id: '2', type: 'default', position: { x: 300, y: 80 }, data: { label: 'Collaborative Edit' } },
  { id: '3', type: 'output', position: { x: 500, y: 80 }, data: { label: 'End' } }
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
      <button @click="connectRoom">Connect Room</button>
      <button @click="disconnectRoom">Disconnect</button>
      <button @click="simulateRemote">Simulate Remote Event</button>
    </div>
    <div class="main-row">
      <div class="flow-wrapper">
        <yh-flow ref="flowRef" :nodes="nodes" :edges="edges" background="dots" />
      </div>
      <div class="side-panel">
        <p class="status">Connection: {{ connState }}</p>
        <ul class="log">
          <li v-for="log in eventLog" :key="log">{{ log }}</li>
        </ul>
        <div v-if="cursorList.length" class="cursors">
          <p>Users:</p>
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
  { id: '2', type: 'default', position: { x: 300, y: 80 }, data: { label: 'Collaborate' } },
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

<DemoBlock title="Real-time Collaboration Example" :ts-code="tsCode" :js-code="jsCode">
  <div style="display:flex;flex-direction:column;gap:10px;height:500px;">
    <div style="display:flex;gap:8px;">
      <button style="padding:6px 12px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;" @click="connectRoom">
        Connect Room
      </button>
      <button style="padding:6px 12px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;" @click="disconnectRoom">
        Disconnect
      </button>
      <button style="padding:6px 12px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;" @click="simulateRemote">
        Simulate Remote Event
      </button>
    </div>
    <div style="display:flex;gap:12px;flex:1;">
      <div style="flex:1;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
        <yh-flow ref="flowRef" :nodes="nodes" :edges="edges" background="dots" style="width:100%;height:100%;"></yh-flow>
      </div>
      <div style="width:200px;padding:12px;border:1px solid #e2e8f0;border-radius:8px;background:#fafafa;display:flex;flex-direction:column;gap:8px;">
        <p style="margin:0;font-size:13px;font-weight:600;">Status: {{ connState }}</p>
        <ul style="list-style:none;margin:0;padding:0;font-size:12px;color:#606266;max-height:380px;overflow-y:auto;">
          <li v-for="log in eventLog" :key="log" style="padding: 2px 0;">{{ log }}</li>
        </ul>
      </div>
    </div>
  </div>
</DemoBlock>

## Best Practices

1. **Integrate with Business WebSocket Service**: Replace the `serverUrl` in `connect` with your collaboration backend address; the backend only needs to forward messages.
2. **Local First**: All local operations take effect immediately, while network synchronization is completed asynchronously via `operation` messages. The LWW mechanism ensures eventual consistency.
3. **Handle Conflicts**: Monitor remote updates via `on('operation')`, enabling conflict UI prompts or rollbacks for specific nodes/edges.
4. **Optimize Cursor & Selection**: Use unreliable transmission for `updateCursor` and `updateSelection` to avoid frequent network jitter from impacting the user experience.

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
