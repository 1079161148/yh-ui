# BPMN 流程执行引擎

`BpmnProcessEngine` 提供了一个轻量级的 BPMN 执行/模拟环境，能够在 Flow 内部调度 start/service/task/网关节点，记录令牌轨迹，并暴露 pause/resume/terminate 等控制钩子。引擎使用事件回调和任务执行器，方便与调度、小程序或 AI 任务结合。

## 核心能力

- 支持多实例与令牌驱动的节点进入/离开事件，可绑定到日志、仪表盘或可视化进度条
- 支持条件表达式、变量注入和任务执行器（可为用户任务、服务任务提供异步逻辑）
- 提供 pause、resume、terminate 等控制函数便于模拟中断、恢复或终止案例

## 主要 API

| 函数                                            | 说明                                                                        |
| ----------------------------------------------- | --------------------------------------------------------------------------- |
| `loadProcess(nodes, edges)`                     | 在引擎中加载节点与连线（通常来自 `bpmnXmlToFlow`），准备执行                |
| `createInstance(initialVariables?)`             | 创建一个流程实例并返回对象（包含令牌、变量、状态）                          |
| `start(instanceId)`                             | 启动流程实例，依赖 startEvent 推动令牌流动；可选的 `autoExecute` 会自动迭代 |
| `pause(instanceId)` / `resume(instanceId)`      | 可用于暂停与恢复演示或调试场景                                              |
| `terminate(instanceId)`                         | 强制结束一个实例，并记录结束时间                                            |
| `setVariable(instanceId, key, value)`           | 动态修改实例变量（如条件判断、任务分支）                                    |
| `getVariable(instanceId, key)`                  | 查询当前实例变量                                                            |
| `getInstance(instanceId)` / `getAllInstances()` | 查看实例状态、节点列表与历史                                                |

## 示例

下面示例展示如何加载示例 BPMN、创建实例、启动/暂停/终止，并通过事件日志展示执行轨迹。

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { toJs, _T, _S, _St } from '../.vitepress/theme/utils/demo-utils'
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
      pushLog(`任务执行: ${node.nodeId}`)
    },
    variableEvaluator: () => true
  })

const engine = ref(createEngineInstance())
engine.value.loadProcess(nodes.value, edges.value)
pushLog('流程定义已加载')

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
  logs.value = ['流程定义已重新加载']
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
  pushLog('流程已暂停')
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
  pushLog('流程已终止')
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
      <button @click="reloadEngine">重置流程</button>
      <button @click="startInstance">开始</button>
      <button @click="pauseInstance">暂停</button>
      <button @click="resumeInstance">继续</button>
      <button @click="terminateInstance">终止</button>
      <button @click="toggleApproval">切换 approved</button>
    </div>
    <div class="canvas-row">
      <div class="flow-wrapper">
        <yh-flow ref="flowRef" :nodes="nodes" :edges="edges" background="dots" />
      </div>
      <div class="log-panel">
        <p class="status">状态：{{ status }}</p>
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
  const latest = engine.value.getInstance(currentInstanceId.value)
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
  min-height: 0;
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

<DemoBlock title="BPMN 流程执行示例" :ts-code="tsCode" :js-code="jsCode">
  <div style="display:flex;flex-direction:column;gap:12px;height:520px;">
    <div style="display:flex;flex-wrap:wrap;gap:8px;">
      <button style="padding:6px 12px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;" @click="reloadEngine">
        重置流程
      </button>
      <button style="padding:6px 12px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;" @click="startInstance">
        开始
      </button>
      <button style="padding:6px 12px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;" @click="pauseInstance">
        暂停
      </button>
      <button style="padding:6px 12px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;" @click="resumeInstance">
        继续
      </button>
      <button style="padding:6px 12px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;" @click="terminateInstance">
        终止
      </button>
      <button style="padding:6px 12px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;" @click="toggleApproval">
        切换 approved
      </button>
    </div>
    <div style="display:flex;gap:12px;flex:1;min-height:0;">
      <div style="flex:1;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
        <yh-flow ref="flowRef" :nodes="nodes" :edges="edges" background="dots" style="width:100%;height:100%;"></yh-flow>
      </div>
      <div
        style="width:220px;border:1px solid #e2e8f0;border-radius:8px;padding:12px;background:#fafafa;display:flex;flex-direction:column;gap:6px;min-height:0;"
      >
        <p style="margin:0;font-size:13px;font-weight:600;">状态：{{ status }}</p>
        <ul style="flex:1;overflow-y:auto;min-height:0;list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:4px;">
          <li v-for="(log, idx) in logs" :key="idx" style="font-size:12px;color:#606266;">{{ log }}</li>
        </ul>
      </div>
    </div>
  </div>
</DemoBlock>

## 最佳实践

1. **统一事件回调**：通过 `eventListener` 将节点进入/退出、令牌创建等事件同步到 UI 日志或进度条。
2. **在任务执行器里集成业务**：将 `taskExecutor` 绑定到后端 API、AI 推理或审批流程，保持模拟与真实逻辑一致。
3. **动态变量支持条件分支**：在实例运行过程中调用 `setVariable`，即可让条件连线根据最新数据决策。
