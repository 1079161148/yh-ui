# BPMN Process Engine

`BpmnProcessEngine` offers a lightweight BPMN execution/simulation layer that runs inside Flow, tracking token activity, honoring start/service/task/gateway semantics, and exposing `pause`/`resume`/`terminate` controllers. It is designed for demos, debugging, or hooking into AI/automation systems.

## Capabilities

- Token-based execution with event callbacks so you can drive timelines, logs, or dashboards
- Customizable task executor and variable evaluator to plug in backend calls or business logic
- Lifecycle helpers (`pause`, `resume`, `terminate`) for building interactive simulations or training flows

## Main APIs

| API                                             | Description                                                             |
| ----------------------------------------------- | ----------------------------------------------------------------------- |
| `loadProcess(nodes, edges)`                     | Loads Flow nodes/edges (typically from `bpmnXmlToFlow`) into the engine |
| `createInstance(initialVariables?)`             | Creates a process instance with tokens, variables, and meta             |
| `start(instanceId)`                             | Starts the instance and moves tokens along the graph                    |
| `pause(instanceId)` / `resume(instanceId)`      | Pause / resume execution for demos                                      |
| `terminate(instanceId)`                         | Forcefully stops an instance                                            |
| `setVariable(instanceId, key, value)`           | Update runtime variables for conditional gateways                       |
| `getVariable(instanceId, key)`                  | Read the current value of a variable                                    |
| `getInstance(instanceId)` / `getAllInstances()` | Inspect instance state, node map, history                               |

## Example

The demo below loads a sample BPMN, starts an instance, pauses/resumes/terminates it, and shows event logs from the engine.

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { toJs, _T, _S, _St } from '../../.vitepress/theme/utils/demo-utils'
import type { Node, Edge, FlowInstance } from '@yh-ui/flow'
import { bpmnXmlToFlow, generateSampleBpmnXml, BpmnProcessEngine, type ProcessState } from '@yh-ui/flow'

const sampleXml = generateSampleBpmnXml()
const parsedSample = bpmnXmlToFlow(sampleXml)

const flowRef = ref<FlowInstance>()
const nodes = ref<Node[]>(parsedSample.nodes)
const edges = ref<Edge[]>(parsedSample.edges)
const logs = ref<string[]>([])
const status = ref<ProcessState>('idle')
const currentInstanceId = ref('')

const pushLog = (message: string) => {
  logs.value = [message, ...logs.value].slice(0, 20)
}

const createEngineInstance = () =>
  new BpmnProcessEngine({
    eventListener: (event) => {
      const label = event.nodeId || event.edgeId || 'process'
      pushLog(`[${event.type}] ${label}`)
    },
    taskExecutor: async (node) => {
      pushLog(`Task executed: ${node.nodeId}`)
    },
    variableEvaluator: () => true
  })

const engine = ref(createEngineInstance())
engine.value.loadProcess(nodes.value, edges.value)
pushLog('Process loaded')

onMounted(() => {
  setTimeout(() => {
    flowRef.value?.fitView({ padding: 30 })
  }, 100)
})

const reloadEngine = () => {
  engine.value = createEngineInstance()
  engine.value.loadProcess(nodes.value, edges.value)
  status.value = 'idle'
  currentInstanceId.value = ''
  logs.value = ['Process reloaded']
  setTimeout(() => {
    flowRef.value?.fitView({ padding: 30 })
  }, 50)
}

const startInstance = async () => {
  const instance = engine.value.createInstance({ approved: true })
  currentInstanceId.value = instance.id
  status.value = 'running'
  flowRef.value?.fitView({ padding: 30 })
  await engine.value.start(instance.id)
  const latest = engine.value.getInstance(instance.id)
  status.value = latest?.state ?? 'idle'
}

const pauseInstance = () => {
  if (!currentInstanceId.value) return
  engine.value.pause(currentInstanceId.value)
  status.value = 'paused'
  pushLog('Process paused')
}

const resumeInstance = async () => {
  if (!currentInstanceId.value) return
  await engine.value.resume(currentInstanceId.value)
  const latest = engine.value.getInstance(currentInstanceId.value)
  status.value = latest?.state ?? 'idle'
}

const terminateInstance = () => {
  if (!currentInstanceId.value) return
  engine.value.terminate(currentInstanceId.value)
  status.value = 'terminated'
  pushLog('Process terminated')
}

const toggleApproval = () => {
  if (!currentInstanceId.value) return
  const current = engine.value.getVariable(currentInstanceId.value, 'approved')
  const nextValue = !current
  engine.value.setVariable(currentInstanceId.value, 'approved', nextValue)
  pushLog(`approved => ${nextValue}`)
}

const tsCode = `<${_T}>
  <div class="engine-demo">
    <div class="toolbar">
      <button @click="reloadEngine">Reload</button>
      <button @click="startInstance">Start</button>
      <button @click="pauseInstance">Pause</button>
      <button @click="resumeInstance">Resume</button>
      <button @click="terminateInstance">Terminate</button>
      <button @click="toggleApproval">Toggle approved</button>
    </div>
    <div class="canvas-row">
      <div class="flow-wrapper">
        <yh-flow ref="flowRef" :nodes="nodes" :edges="edges" background="dots" />
      </div>
      <div class="log-panel">
        <p class="status">Status: {{ status }}</p>
        <ul>
          <li v-for="(log, idx) in logs" :key="idx">{{ log }}</li>
        </ul>
      </div>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue';
import type { Node, Edge, FlowInstance } from '@yh-ui/flow';
import { bpmnXmlToFlow, generateSampleBpmnXml, BpmnProcessEngine, type ProcessState } from '@yh-ui/flow';

const sampleXml = generateSampleBpmnXml();
const parsedSample = bpmnXmlToFlow(sampleXml);

const nodes = ref<Node[]>(parsedSample.nodes);
const edges = ref<Edge[]>(parsedSample.edges);
const flowRef = ref<FlowInstance>();
const logs = ref<string[]>([]);
const status = ref<ProcessState>('idle');
const currentInstanceId = ref('');

const pushLog = (message: string) => {
  logs.value = [message, ...logs.value].slice(0, 10);
};

const createEngineInstance = () =>
  new BpmnProcessEngine({
    eventListener: (event) => {
      const label = event.nodeId || event.edgeId || 'process';
      pushLog(\`[\${event.type}] \${label}\`);
    },
    taskExecutor: async (node) => {
      pushLog(\`Task executed: \${node.nodeId}\`);
    },
    variableEvaluator: () => true
  });

const engine = ref(createEngineInstance());
engine.value.loadProcess(nodes.value, edges.value);
pushLog('Process loaded');

const reloadEngine = () => {
  engine.value = createEngineInstance();
  engine.value.loadProcess(nodes.value, edges.value);
  status.value = 'idle';
  currentInstanceId.value = '';
  logs.value = ['Process reloaded'];
};

const startInstance = async () => {
  const instance = engine.value.createInstance({ approved: true });
  currentInstanceId.value = instance.id;
  status.value = 'running';
  await engine.value.start(instance.id);
  const latest = engine.value.getInstance(instance.id);
  status.value = latest?.state ?? 'idle';
};

const pauseInstance = () => {
  if (!currentInstanceId.value) return;
  engine.value.pause(currentInstanceId.value);
  status.value = 'paused';
  pushLog('Process paused');
};

const resumeInstance = async () => {
  if (!currentInstanceId.value) return;
  await engine.value.resume(currentInstanceId.value);
  const latest = engine.value.getInstance(currentInstanceId.value);
  status.value = latest?.state ?? 'idle';
};

const terminateInstance = () => {
  if (!currentInstanceId.value) return;
  engine.value.terminate(currentInstanceId.value);
  status.value = 'terminated';
  pushLog('Process terminated');
};

const toggleApproval = () => {
  if (!currentInstanceId.value) return;
  const current = engine.value.getVariable(currentInstanceId.value, 'approved');
  const nextValue = !current;
  engine.value.setVariable(currentInstanceId.value, 'approved', nextValue);
  pushLog(\`approved => \${nextValue}\`);
};
</${_S}>

<${_St}>
.engine-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 520px;
}
.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.toolbar button {
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #cbd5e1;
  background: #fff;
  cursor: pointer;
}
.canvas-row {
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
.log-panel {
  width: 220px;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  gap: 6px;
  overflow-y: auto;
}
.status {
  font-size: 13px;
  font-weight: 600;
}
.log-panel ul {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.log-panel ul::-webkit-scrollbar {
  width: 4px;
}
.log-panel ul::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 2px;
}
</${_St}>`

const jsCode = toJs(tsCode)
</script>

<DemoBlock title="BPMN Process Execution" :ts-code="tsCode" :js-code="jsCode">
  <div style="display:flex;flex-direction:column;gap:12px;height:520px;">
    <div style="display:flex;flex-wrap:wrap;gap:8px;">
      <button style="padding:6px 12px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;" @click="reloadEngine">
        Reload
      </button>
      <button style="padding:6px 12px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;" @click="startInstance">
        Start
      </button>
      <button style="padding:6px 12px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;" @click="pauseInstance">
        Pause
      </button>
      <button style="padding:6px 12px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;" @click="resumeInstance">
        Resume
      </button>
      <button style="padding:6px 12px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;" @click="terminateInstance">
        Terminate
      </button>
      <button style="padding:6px 12px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;" @click="toggleApproval">
        Toggle approved
      </button>
    </div>
    <div style="display:flex;gap:12px;flex:1;">
      <div style="flex:1;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
        <yh-flow ref="flowRef" :nodes="nodes" :edges="edges" background="dots" style="width:100%;height:100%;"></yh-flow>
      </div>
      <div
        style="width:220px;border:1px solid #e2e8f0;border-radius:8px;padding:12px;background:#fafafa;display:flex;flex-direction:column;gap:6px;min-height:0;"
      >
        <p style="margin:0;font-size:13px;font-weight:600;">Status: {{ status }}</p>
        <ul style="flex:1;overflow-y:auto;min-height:0;list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:4px;">
          <li v-for="(log, idx) in logs" :key="idx" style="font-size:12px;color:#606266;">{{ log }}</li>
        </ul>
      </div>
    </div>
  </div>
</DemoBlock>

## Best Practices

1. Hook `eventListener` into a dashboard so you can visualize node enter/exit and token events.
2. Use `taskExecutor` to connect to backends, AI services, or async approval workflows.
3. Update variables via `setVariable` during execution to influence gateway routing.
