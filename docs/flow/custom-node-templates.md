# 自定义节点模板 (Custom Node Templates)

`yh-flow` 提供了强大的自定义节点模板系统，允许您注册可重用的节点模板，通过配置数据快速创建标准化节点。

## 核心概念

### 模板注册

使用 `registerCustomNodeTemplate` 函数注册自定义节点模板：

```typescript
import { registerCustomNodeTemplate, type CustomNodeTemplate } from '@yh-ui/flow'
import MyCustomNode from './MyCustomNode.vue'

const template: CustomNodeTemplate = {
  type: 'my-custom',
  component: MyCustomNode,
  defaultData: {
    label: '默认标题',
    icon: 'star',
    status: 'active'
  },
  defaultWidth: 200,
  defaultHeight: 80,
  description: '这是一个自定义业务节点模板'
}

// 注册模板
registerCustomNodeTemplate(template)
```

### 从模板创建节点

注册模板后，可以使用 `createNodeFromTemplate` 方法快速创建节点：

```typescript
import { createNodeFromTemplate } from '@yh-ui/flow'

// 从模板创建节点
const newNode = createNodeFromTemplate(
  'my-custom', // 模板类型
  'node-1', // 节点 ID
  { x: 100, y: 200 }, // 位置
  {
    // 可选的覆盖配置
    data: { label: '自定义标题' }
  }
)
```

## 使用示例

<script setup lang="ts">
import { ref, defineComponent, h, PropType } from 'vue'
import { toJs, _T, _S, _St } from '../.vitepress/theme/utils/demo-utils'
import {
  registerCustomNodeTemplate,
  createNodeFromTemplate,
  type Node,
  type Edge
} from '@yh-ui/flow'

const ApprovalNode = defineComponent({
  props: {
    data: {
      type: Object as PropType<Record<string, string>>,
      default: () => ({})
    }
  },
  setup(props) {
    return () =>
      h(
        'div',
        { class: 'template-card template-card--approval' },
        [
          h('div', { class: 'template-card__title' }, props.data?.title ?? '审批节点'),
          h('div', { class: 'template-card__meta' }, props.data?.approver ?? '流程审批')
        ]
      );
  }
});

const NotificationNode = defineComponent({
  props: {
    data: {
      type: Object as PropType<Record<string, string>>,
      default: () => ({})
    }
  },
  setup(props) {
    return () =>
      h(
        'div',
        { class: 'template-card template-card--notification' },
        [
          h('div', { class: 'template-card__title' }, props.data?.title ?? '通知节点'),
          h('div', { class: 'template-card__meta' }, props.data?.channel ?? '渠道')
        ]
      );
  }
});

registerCustomNodeTemplate({
  type: 'approval',
  component: ApprovalNode,
  defaultData: { title: '审批节点', approver: '流程管理员' },
  defaultWidth: 190,
  defaultHeight: 70
});

registerCustomNodeTemplate({
  type: 'notification',
  component: NotificationNode,
  defaultData: { title: '通知节点', channel: '邮件' },
  defaultWidth: 170,
  defaultHeight: 60
});

const nodes = ref<Node[]>([
  { id: 'placeholder', type: 'input', position: { x: 150, y: 80 }, data: { label: '模板画布' } }
]);
const edges = ref<Edge[]>([]);

const addTemplateNode = (type: 'approval' | 'notification') => {
  const candidate = createNodeFromTemplate(
    type,
    `${type}-${Date.now()}`,
    { x: 80 + Math.random() * 260, y: 120 + Math.random() * 220 }
  );
  if (candidate) {
    nodes.value = [...nodes.value, candidate];
  }
};

const tsCode = `<${_T}>
  <div class="template-demo">
    <div class="toolbar">
      <button @click="addTemplateNode('approval')">添加审批节点</button>
      <button @click="addTemplateNode('notification')">添加通知节点</button>
    </div>
    <yh-flow
      ref="flowRef"
      :nodes="nodes"
      :edges="edges"
      background="dots"
    >
      <template #node="{ node }">
        <component
          :is="getNodeComponent(node.type)"
          :data="node.data"
          :selected="node.selected"
        />
      </template>
    </yh-flow>
  </div>
</${_T}>

<${_S} lang="ts" setup>
import { ref } from 'vue';
import {
  registerCustomNodeTemplate,
  createNodeFromTemplate,
  type Node,
  type Edge
} from '@yh-ui/flow';
import ApprovalNode from './nodes/ApprovalNode.vue';
import NotificationNode from './nodes/NotificationNode.vue';

registerCustomNodeTemplate({
  type: 'approval',
  component: ApprovalNode,
  defaultData: { title: '审批', approver: '' },
  defaultWidth: 180,
  defaultHeight: 60
});

registerCustomNodeTemplate({
  type: 'notification',
  component: NotificationNode,
  defaultData: { title: '通知', channel: 'email' },
  defaultWidth: 160,
  defaultHeight: 50
});

const flowRef = ref();
const nodes = ref<Node[]>([]);
const edges = ref<Edge[]>([]);

const getNodeComponent = (type: string) => {
  const components: Record<string, any> = {
    approval: ApprovalNode,
    notification: NotificationNode
  };
  return components[type];
};

const addTemplateNode = (type: string) => {
  const id = type + '-' + Date.now();
  const position = {
    x: 100 + Math.random() * 200,
    y: 100 + Math.random() * 200
  };
  const newNode = createNodeFromTemplate(type, id, position);
  if (newNode) {
    nodes.value = [...nodes.value, newNode];
  }
};
</${_S}>`;

const jsCode = toJs(tsCode);
</script>

<DemoBlock title="模板工作区示例" :ts-code="tsCode" :js-code="jsCode">
  <div style="display:flex;flex-direction:column;gap:12px;">
    <div style="display:flex;gap:10px;">
      <button
        type="button"
        style="padding:6px 14px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;"
        @click="addTemplateNode('approval')"
      >
        新增审批节点
      </button>
      <button
        type="button"
        style="padding:6px 14px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;"
        @click="addTemplateNode('notification')"
      >
        新增通知节点
      </button>
    </div>
    <div style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;height:420px;">
      <yh-flow
        :nodes="nodes"
        :edges="edges"
        background="dots"
        style="width:100%;height:100%;"
      ></yh-flow>
    </div>
  </div>
</DemoBlock>

## API 参考

### 注册函数

| 函数                                                    | 说明                 | 参数                           |
| ------------------------------------------------------- | -------------------- | ------------------------------ |
| `registerCustomNodeTemplate(template)`                  | 注册自定义节点模板   | `template: CustomNodeTemplate` |
| `getCustomNodeTemplate(type)`                           | 获取指定类型的模板   | `type: string`                 |
| `getAllCustomNodeTemplates()`                           | 获取所有已注册的模板 | -                              |
| `hasCustomNodeTemplate(type)`                           | 检查模板是否存在     | `type: string`                 |
| `createNodeFromTemplate(type, id, position, overrides)` | 从模板创建节点       | 详见下方                       |

### createNodeFromTemplate 参数

| 参数        | 类型                       | 必填 | 说明         |
| ----------- | -------------------------- | ---- | ------------ |
| `type`      | `string`                   | 是   | 模板类型     |
| `id`        | `string`                   | 是   | 新节点 ID    |
| `position`  | `{ x: number, y: number }` | 是   | 节点位置     |
| `overrides` | `Partial<Node>`            | 否   | 覆盖默认配置 |

### CustomNodeTemplate 接口

```typescript
interface CustomNodeTemplate {
  type: string // 模板唯一标识
  component: Component // Vue 组件
  defaultData?: Record<string, unknown> // 默认数据
  defaultWidth?: number // 默认宽度
  defaultHeight?: number // 默认高度
  handles?: NodeHandleBounds // 连接点配置
  description?: string // 模板描述
}
```

## 最佳实践

1. **统一管理模板**：在单独的文件中集中管理所有自定义模板
2. **提供默认数据**：通过 `defaultData` 为业务节点提供合理的默认值
3. **类型安全**：为自定义节点数据定义 TypeScript 接口，确保类型安全
4. **组件复用**：同一个组件可以注册为不同类型的模板，通过 `defaultData` 区分

> [!TIP]
>
> 结合 Flow 实例的 `createNodeFromTemplate` 方法，可以在拖拽放置节点时自动从模板创建。
