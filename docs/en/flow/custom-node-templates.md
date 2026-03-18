# Custom Node Templates

`yh-flow` provides a powerful custom node template system that allows you to register reusable node templates and quickly create standardized nodes through configuration data.

## Core Concepts

### Template Registration

Use the `registerCustomNodeTemplate` function to register custom node templates:

```typescript
import { registerCustomNodeTemplate, type CustomNodeTemplate } from '@yh-ui/flow'
import MyCustomNode from './MyCustomNode.vue'

const template: CustomNodeTemplate = {
  type: 'my-custom',
  component: MyCustomNode,
  defaultData: {
    label: 'Default Title',
    icon: 'star',
    status: 'active'
  },
  defaultWidth: 200,
  defaultHeight: 80,
  description: 'This is a custom business node template'
}

// Register the template
registerCustomNodeTemplate(template)
```

### Creating Nodes from Templates

After registering a template, you can quickly create nodes using the `createNodeFromTemplate` method:

```typescript
import { createNodeFromTemplate } from '@yh-ui/flow'

// Create node from template
const newNode = createNodeFromTemplate(
  'my-custom', // Template type
  'node-1', // Node ID
  { x: 100, y: 200 }, // Position
  {
    // Optional override config
    data: { label: 'Custom Title' }
  }
)
```

## Usage Examples

<script setup lang="ts">
import { ref, defineComponent, h, PropType } from 'vue'
import { toJs, _T, _S, _St } from '../../.vitepress/theme/utils/demo-utils'
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
          h('div', { class: 'template-card__title' }, props.data?.title ?? 'Approval'),
          h('div', { class: 'template-card__meta' }, props.data?.approver ?? 'Approver')
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
          h('div', { class: 'template-card__title' }, props.data?.title ?? 'Notification'),
          h('div', { class: 'template-card__meta' }, props.data?.channel ?? 'Channel')
        ]
      );
  }
});

registerCustomNodeTemplate({
  type: 'approval',
  component: ApprovalNode,
  defaultData: { title: 'Approval', approver: 'Reviewer' },
  defaultWidth: 190,
  defaultHeight: 70
});

registerCustomNodeTemplate({
  type: 'notification',
  component: NotificationNode,
  defaultData: { title: 'Notification', channel: 'Email' },
  defaultWidth: 170,
  defaultHeight: 60
});

const nodes = ref<Node[]>([
  { id: 'placeholder', type: 'input', position: { x: 150, y: 80 }, data: { label: 'Template canvas' } }
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
      <button @click="addTemplateNode('approval')">Add Approval Node</button>
      <button @click="addTemplateNode('notification')">Add Notification Node</button>
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
  defaultData: { title: 'Approval', approver: '' },
  defaultWidth: 180,
  defaultHeight: 60
});

registerCustomNodeTemplate({
  type: 'notification',
  component: NotificationNode,
  defaultData: { title: 'Notification', channel: 'email' },
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

<DemoBlock title="Template Workspace" :ts-code="tsCode" :js-code="jsCode">
  <div style="display:flex;flex-direction:column;gap:12px;">
    <div style="display:flex;gap:10px;">
      <button
        type="button"
        style="padding:6px 14px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;"
        @click="addTemplateNode('approval')"
      >
        Add Approval Node
      </button>
      <button
        type="button"
        style="padding:6px 14px;border-radius:4px;border:1px solid #cbd5e1;background:#fff;cursor:pointer;"
        @click="addTemplateNode('notification')"
      >
        Add Notification Node
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

## API Reference

### Registration Functions

| Function                                                | Description                   | Parameters                     |
| ------------------------------------------------------- | ----------------------------- | ------------------------------ |
| `registerCustomNodeTemplate(template)`                  | Register custom node template | `template: CustomNodeTemplate` |
| `getCustomNodeTemplate(type)`                           | Get template by type          | `type: string`                 |
| `getAllCustomNodeTemplates()`                           | Get all registered templates  | -                              |
| `hasCustomNodeTemplate(type)`                           | Check if template exists      | `type: string`                 |
| `createNodeFromTemplate(type, id, position, overrides)` | Create node from template     | See below                      |

### createNodeFromTemplate Parameters

| Parameter   | Type                       | Required | Description             |
| ----------- | -------------------------- | -------- | ----------------------- |
| `type`      | `string`                   | Yes      | Template type           |
| `id`        | `string`                   | Yes      | New node ID             |
| `position`  | `{ x: number, y: number }` | Yes      | Node position           |
| `overrides` | `Partial<Node>`            | No       | Override default config |

### CustomNodeTemplate Interface

```typescript
interface CustomNodeTemplate {
  type: string // Unique template identifier
  component: Component // Vue component
  defaultData?: Record<string, unknown> // Default data
  defaultWidth?: number // Default width
  defaultHeight?: number // Default height
  handles?: NodeHandleBounds // Handle configuration
  description?: string // Template description
}
```

## Best Practices

1. **Centralize template management**: Store all custom templates in a dedicated file
2. **Provide default data**: Use `defaultData` to provide sensible defaults for business nodes
3. **Type safety**: Define TypeScript interfaces for custom node data to ensure type safety
4. **Component reuse**: The same component can be registered as different template types, differentiated by `defaultData`

> [!TIP]
>
> Combining with the Flow instance's `createNodeFromTemplate` method enables automatic template-based node creation when dragging and dropping nodes.
