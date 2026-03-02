---
title: AiMention AI 提及
description: AiMention 提及组件，专为 AI 场景设计，支持智能体、文档、表格、知识库等多种类型的快速召回与录入。
---

# AiMention AI 提及

基于 `Mention` 组件扩展，专为 AI 助手设计。支持通过 `@` 呼叫 Agent（智能体）、引用 Context（文档、表格、知识库）等 AI 场景下的常用交互。

<script setup lang="ts">
import { ref } from 'vue';
import type { AiMentionOption } from '../src/ai-mention';
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils';

const value = ref('');
const agentValue = ref('');
const contextValue = ref('');
const options: AiMentionOption[] = [
  { label: 'DeepSeek', value: 'deepseek', type: 'agent', description: '深度求索语言模型' },
  { label: 'GPT-4o', value: 'gpt4o', type: 'agent', description: 'OpenAI 旗舰模型' },
  { label: 'Claude 3.5 Sonnet', value: 'claude', type: 'agent', description: 'Anthropic 高智能模型' },
  { label: '产品需求文档.docx', value: 'prd', type: 'document', description: '2024-03-20 更新' },
  { label: '销售业绩统计.xlsx', value: 'sales', type: 'table', description: 'Q1 数据明细' },
  { label: 'UI 设计规范', value: 'design_system', type: 'knowledge', description: 'YH-UI 官方规范' }
];

const tsBasic = `<${_T}>
  <div style="width: 400px">
    <yh-ai-mention
      v-model="value"
      :options="options"
      placeholder="@ 呼叫 Agent、文档或表格..."
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue';
import type { AiMentionOption } from '@yh-ui/components';

const value = ref('');
const options: AiMentionOption[] = [
  { label: 'DeepSeek', value: 'deepseek', type: 'agent', description: '深度求索语言模型' },
  { label: 'GPT-4o', value: 'gpt4o', type: 'agent', description: 'OpenAI 旗舰模型' },
  { label: 'Claude 3.5 Sonnet', value: 'claude', type: 'agent', description: 'Anthropic 高智能模型' },
  { label: '产品需求文档.docx', value: 'prd', type: 'document', description: '2024-03-20 更新' },
  { label: '销售业绩统计.xlsx', value: 'sales', type: 'table', description: 'Q1 数据明细' },
  { label: 'UI 设计规范', value: 'design_system', type: 'knowledge', description: 'YH-UI 官方规范' }
];
</${_S}>`;

const tsTypes = `<${_T}>
  <div style="width: 400px; display: flex; flex-direction: column; gap: 20px;">
    <div>
      <p style="margin-bottom: 8px; font-size: 14px; color: var(--yh-text-color-secondary);">仅选择 Agent (@ 呼叫...)</p>
      <yh-ai-mention
        v-model="agentValue"
        :options="options"
        :types="['agent']"
        :triggers="['@']"
        placeholder="@ 呼叫智能体..."
      />
    </div>
    <div>
      <p style="margin-bottom: 8px; font-size: 14px; color: var(--yh-text-color-secondary);">仅选择 Context (# 引用...)</p>
      <yh-ai-mention
        v-model="contextValue"
        :triggers="['#']"
        :options="options"
        :types="['document', 'table', 'knowledge']"
        placeholder="# 引用文档或表格..."
      />
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue';
import type { AiMentionOption } from '@yh-ui/components';

const agentValue = ref('');
const contextValue = ref('');
const options: AiMentionOption[] = [
  { label: 'DeepSeek', value: 'deepseek', type: 'agent', description: '深度求索语言模型' },
  { label: 'GPT-4o', value: 'gpt4o', type: 'agent', description: 'OpenAI 旗舰模型' },
  { label: 'Claude 3.5 Sonnet', value: 'claude', type: 'agent', description: 'Anthropic 高智能模型' },
  { label: '产品需求文档.docx', value: 'prd', type: 'document', description: '2024-03-20 更新' },
  { label: '销售业绩统计.xlsx', value: 'sales', type: 'table', description: 'Q1 数据明细' },
  { label: 'UI 设计规范', value: 'design_system', type: 'knowledge', description: 'YH-UI 官方规范' }
];
</${_S}>`;

const jsBasic = toJs(tsBasic);
const jsTypes = toJs(tsTypes);
</script>

## 基础用法

展示 AI 提及组件的标准样式，包括不同类型的图标区分、描述信息展示以及类型标签。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="width: 400px">
    <yh-ai-mention
      v-model="value"
      :options="options"
      placeholder="@ 呼叫 Agent、文档或表格..."
    />
  </div>
</DemoBlock>

## 类型过滤

通过 `types` 属性，可以实现不同触发前缀下的类型过滤，例如 `@` 用于唤醒智能体，`#` 用于引用知识库文件。

<DemoBlock title="类型过滤与自定义前缀" :ts-code="tsTypes" :js-code="jsTypes">
  <div style="width: 400px; display: flex; flex-direction: column; gap: 20px;">
    <div>
      <p style="margin-bottom: 8px; font-size: 14px; color: var(--yh-text-color-secondary);">仅选择 Agent (@ 呼叫...)</p>
      <yh-ai-mention
        v-model="agentValue"
        :options="options"
        :types="['agent']"
        :triggers="['@']"
        placeholder="@ 呼叫智能体..."
      />
    </div>
    <div>
      <p style="margin-bottom: 8px; font-size: 14px; color: var(--yh-text-color-secondary);">仅选择 Context (# 引用...)</p>
      <yh-ai-mention
        v-model="contextValue"
        :triggers="['#']"
        :options="options"
        :types="['document', 'table', 'knowledge']"
        placeholder="# 引用文档或表格..."
      />
    </div>
  </div>
</DemoBlock>

## 在 Nuxt 中使用

该组件完美支持 Nuxt 3/4 SSR 渲染。在 Nuxt 项目中，组件会自动注册，无需手动导入。

有关详细配置，请参考 [Nuxt 集成文档](/guide/nuxt)。

::: tip SSR 友好
AiMention 已通过完整的 SSR 测试，支持服务端渲染，确保首屏加载性能。
:::

## API

### Props

| 属性名           | 说明               | 类型                                            | 默认值                           |
| ---------------- | ------------------ | ----------------------------------------------- | -------------------------------- |
| v-model          | 绑定值             | `string`                                        | —                                |
| options          | 提及选项列表       | `AiMentionOption[]`                             | `[]`                             |
| types            | 允许显示的类型列表 | `('agent'\|'document'\|'table'\|'knowledge')[]` | `['agent', 'document', 'table']` |
| prefix           | 触发前缀           | `string \| string[]`                            | `@`                              |
| show-icon        | 是否显示图标       | `boolean`                                       | `true`                           |
| show-description | 是否显示描述信息   | `boolean`                                       | `true`                           |
| theme-overrides  | 组件级别的主题定制 | `ComponentThemeVars`                            | —                                |

### AiMentionOption

| 属性名      | 说明       | 类型                                              | 默认值 |
| ----------- | ---------- | ------------------------------------------------- | ------ |
| label       | 显示文本   | `string`                                          | —      |
| value       | 选中值     | `string`                                          | —      |
| type        | AI 类型    | `'agent' \| 'document' \| 'table' \| 'knowledge'` | —      |
| icon        | 自定义图标 | `string`                                          | —      |
| description | 描述文本   | `string`                                          | —      |

### Slots

| 插槽名  | 说明           | 参数                          |
| ------- | -------------- | ----------------------------- |
| label   | 自定义选项内容 | `{ option: AiMentionOption }` |
| empty   | 无匹配项内容   | —                             |
| loading | 加载中内容     | —                             |

## 主题变量

| 变量名                            | 说明             | 默认值                    |
| --------------------------------- | ---------------- | ------------------------- |
| `--yh-ai-mention-option-height`   | 选项高度         | `56px`                    |
| `--yh-ai-mention-agent-color`     | 智能体类型主题色 | `var(--yh-color-primary)` |
| `--yh-ai-mention-doc-color`       | 文档类型主题色   | `#47c2ff`                 |
| `--yh-ai-mention-table-color`     | 表格类型主题色   | `#10b981`                 |
| `--yh-ai-mention-knowledge-color` | 知识库类型主题色 | `#f59e0b`                 |
