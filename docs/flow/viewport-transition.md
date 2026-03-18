# 视口过渡 (Viewport Transition)

想要在多个节点或者不同的固定视角中平滑地拉扯镜头？您可以结合 `yh-flow` 实例给出的视口推演方法（如 `setViewport`、`zoomTo` 或 `fitView`）和 CSS 动画，创造平滑自然的飞行过渡动画，而无需引入外部动画库。

## 视口平滑移动示例

点击下方的按钮，观察画布是如何向固定几个兴趣点（Pan to Node）顺滑过渡飞行的。

<script setup lang="ts">
import { ref } from 'vue'
import { toJs, _T, _S, _St } from '../.vitepress/theme/utils/demo-utils'
import type { FlowInstance, ViewportTransform, Node, Edge } from '@yh-ui/flow'

const flowRef = ref<FlowInstance>();
const viewport = ref<ViewportTransform>({ x: 50, y: 50, zoom: 1 });
const nodes = ref<Node[]>([{ id: '1', type: 'input', position: { x: 50, y: 50 }, data: { label: '节点 1' } }, { id: '2', type: 'default', position: { x: 400, y: 300 }, data: { label: '节点 2' } }, { id: '3', type: 'output', position: { x: -250, y: 400 }, data: { label: '节点 3' } }]);
const edges = ref<Edge[]>([{ id: 'e1-2', source: '1', target: '2', type: 'bezier' }, { id: 'e1-3', source: '1', target: '3', type: 'bezier' }]);

const panToNode = (id: string) => {
  if (!flowRef.value) return;
  const node = nodes.value.find(n => n.id === id);
  if (!node) return;
  const targetZoom = 1.6;
  const flowEl = (flowRef.value as any).$el;
  const canvasW = flowEl.clientWidth || 800;
  const canvasH = flowEl.clientHeight || 500;
  const nodeW = node.width || 200;
  const nodeH = node.height || 50;
  const targetX = (canvasW / 2) - (node.position.x + nodeW / 2) * targetZoom;
  const targetY = (canvasH / 2) - (node.position.y + nodeH / 2) * targetZoom;
  flowRef.value.setViewport({ x: targetX, y: targetY, zoom: targetZoom });
};
const fitView = () => { flowRef.value?.fitView({ padding: 30 }); };

const tsCode = `<${_T}>
  <div class="vt-container">
    <div class="vt-toolbar">
      <button class="vt-btn" @click="panToNode('1')">聚焦节点 1</button>
      <button class="vt-btn" @click="panToNode('2')">聚焦节点 2</button>
      <button class="vt-btn" @click="panToNode('3')">聚焦节点 3</button>
      <button class="vt-btn reset" @click="fitView">适应屏幕 (居中)</button>
    </div>
    
    <div class="vt-flowbox">
      <!-- 添加特定类名以在内容层应用 CSS 过渡 -->
      <yh-flow
        ref="flowRef"
        v-model="viewport"
        :nodes="nodes"
        :edges="edges"
        background="dots"
        class="animated-flow"
      />
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue';
import type { Node, Edge, ViewportTransform, FlowInstance } from '@yh-ui/flow';

const flowRef = ref<FlowInstance>();
const viewport = ref<ViewportTransform>({ x: 50, y: 50, zoom: 1 });

const nodes = ref<Node[]>([
  { id: '1', type: 'input', position: { x: 50, y: 50 }, data: { label: '节点 1' } },
  { id: '2', type: 'default', position: { x: 400, y: 300 }, data: { label: '节点 2' } },
  { id: '3', type: 'output', position: { x: -250, y: 400 }, data: { label: '节点 3' } }
]);

const edges = ref<Edge[]>([
  { id: 'e1-2', source: '1', target: '2', type: 'bezier' },
  { id: 'e1-3', source: '1', target: '3', type: 'bezier' }
]);

const panToNode = (id: string) => {
  if (!flowRef.value) return;
  const node = nodes.value.find(n => n.id === id);
  if (!node) return;
  
  const targetZoom = 1.5;
  
  // 获取容器尺寸以计算中心点
  const flowEl = (flowRef.value as any).$el;
  const canvasW = flowEl.clientWidth || 800;
  const canvasH = flowEl.clientHeight || 500;
  
  const nodeW = node.width || 200;
  const nodeH = node.height || 50;
  
  const targetX = (canvasW / 2) - (node.position.x + nodeW / 2) * targetZoom;
  const targetY = (canvasH / 2) - (node.position.y + nodeH / 2) * targetZoom;
  
  flowRef.value.setViewport({ x: targetX, y: targetY, zoom: targetZoom });
};

const fitView = () => {
  flowRef.value?.fitView({ padding: 30 });
};
</${_S}>

<${_St} scoped>
.vt-container {
  display: flex;
  flex-direction: column;
  height: 500px;
  width: 100%;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
}

.vt-toolbar {
  padding: 12px;
  background: #f8fafc;
  border-bottom: 1px solid #eee;
  display: flex;
  gap: 8px;
}

.vt-btn {
  padding: 6px 12px;
  background: white;
  border: 1px solid #cbd5e1;
  color: #334155;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
}

.vt-btn.reset {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
  margin-left: auto;
}

/* 核心技巧：向内部内容包装器添加 CSS transition */
:deep(.animated-flow .yh-flow__content) {
  transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}
</${_St}>`;
const jsCode = toJs(tsCode);
</script>

<DemoBlock title="POI 平滑飞行" :ts-code="tsCode" :js-code="jsCode">
  <div style="display: flex; flex-direction: column; height: 500px; width: 100%; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
    <div style="padding: 12px; background: #f8fafc; border-bottom: 1px solid #eee; display: flex; gap: 8px; flex-wrap: wrap; z-index: 2;">
      <button @click="panToNode('1')" style="padding: 6px 12px; background: white; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 13px; cursor: pointer;">聚焦节点 1</button>
      <button @click="panToNode('2')" style="padding: 6px 12px; background: white; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 13px; cursor: pointer;">聚焦节点 2</button>
      <button @click="panToNode('3')" style="padding: 6px 12px; background: white; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 13px; cursor: pointer;">聚焦节点 3</button>
      <button @click="fitView" style="padding: 6px 12px; background: #3b82f6; color: white; border-radius: 4px; font-size: 13px; cursor: pointer; border: none; margin-left: auto;">自适应屏幕</button>
    </div>
    <div style="flex: 1; height: 100%;">
      <component :is="'style'">
        .animated-flow .yh-flow__content {
          transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
        }
      </component>
      <yh-flow
        ref="flowRef"
        v-model="viewport"
        :nodes="nodes"
        :edges="edges"
        background="dots"
        class="animated-flow"
      />
    </div>
  </div>
</DemoBlock>

## 原理说明

`setViewport` 和 `fitView` 方法会更新内部 `.yh-flow__content` 层的 `transform` 属性。通过简单地向该特定选择器添加 CSS `transition`，您就能“免费”开启硬件加速的过渡动画。

| 方法          | 角色     | 逻辑                                                               |
| :------------ | :------- | :----------------------------------------------------------------- |
| `setViewport` | 位置更新 | 协调内容区域的直接平移和缩放。                                     |
| `fitView`     | 自动缩放 | 计算所有节点的边界框，并设置一个在当前容器内包含它们的视口。       |
| CSS 过渡      | 插值计算 | 使用浏览器的原生合成引擎处理旧值和新 `matrix()` 值之间的平滑增量。 |

> [!TIP]
>
> 使用 CSS 过渡进行视口移动通常比基于 JS 的动画库更平滑，因为它将繁重的工作移交给 GPU，并避免了在高频图表渲染期间占用主线程。
