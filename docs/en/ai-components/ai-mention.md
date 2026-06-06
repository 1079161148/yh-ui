---
title: AiMention
description: AiMention component, designed for AI scenarios, supporting rapid recall and entry of agents, documents, tables, and knowledge bases.
---

# AiMention

Based on the `Mention` component, specifically designed for AI assistants. Supports common interactions in AI scenarios such as calling Agents (intelligence), referencing Context (documents, tables, knowledge bases) through `@` and other triggers.

<script setup lang="ts">
import { ref } from 'vue';
import type { AiMentionOption } from '../../src/ai-mention';
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils';

const value = ref('');
const agentValue = ref('');
const contextValue = ref('');
const options: AiMentionOption[] = [
  { label: 'DeepSeek', value: 'deepseek', type: 'agent', description: 'DeepSeek LLM' },
  { label: 'GPT-4o', value: 'gpt4o', type: 'agent', description: 'OpenAI Flagship' },
  { label: 'Claude 3.5 Sonnet', value: 'claude', type: 'agent', description: 'Anthropic High-Intelligence' },
  { label: 'PRD.docx', value: 'prd', type: 'document', description: 'Updated 2024-03-20' },
  { label: 'Sales.xlsx', value: 'sales', type: 'table', description: 'Q1 Data' },
  { label: 'Design System', value: 'design_system', type: 'knowledge', description: 'YH-UI Official' }
];

const tsBasic = `<${_T}>
  <div style="width: 400px">
    <yh-ai-mention
      v-model="value"
      :options="options"
      placeholder="@ Call Agent, document or table..."
    />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue';
import type { AiMentionOption } from '@yh-ui/components';

const value = ref('');
const options: AiMentionOption[] = [
  { label: 'DeepSeek', value: 'deepseek', type: 'agent', description: 'DeepSeek LLM' },
  { label: 'GPT-4o', value: 'gpt4o', type: 'agent', description: 'OpenAI Flagship' },
  { label: 'Claude 3.5 Sonnet', value: 'claude', type: 'agent', description: 'Anthropic High-Intelligence' },
  { label: 'PRD.docx', value: 'prd', type: 'document', description: 'Updated 2024-03-20' },
  { label: 'Sales.xlsx', value: 'sales', type: 'table', description: 'Q1 Data' },
  { label: 'Design System', value: 'design_system', type: 'knowledge', description: 'YH-UI Official' }
];
</${_S}>`;

const tsTypes = `<${_T}>
  <div style="width: 400px; display: flex; flex-direction: column; gap: 20px;">
    <div>
      <p style="margin-bottom: 8px; font-size: 14px; color: var(--yh-text-color-secondary);">Only Agent (@ Call...)</p>
      <yh-ai-mention
        v-model="agentValue"
        :options="options"
        :types="['agent']"
        :triggers="['@']"
        placeholder="@ Call agent..."
      />
    </div>
    <div>
      <p style="margin-bottom: 8px; font-size: 14px; color: var(--yh-text-color-secondary);">Only Context (# Ref...)</p>
      <yh-ai-mention
        v-model="contextValue"
        :triggers="['#']"
        :options="options"
        :types="['document', 'table', 'knowledge']"
        placeholder="# Reference doc or table..."
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
  { label: 'DeepSeek', value: 'deepseek', type: 'agent', description: 'DeepSeek LLM' },
  { label: 'GPT-4o', value: 'gpt4o', type: 'agent', description: 'OpenAI Flagship' },
  { label: 'Claude 3.5 Sonnet', value: 'claude', type: 'agent', description: 'Anthropic High-Intelligence' },
  { label: 'PRD.docx', value: 'prd', type: 'document', description: 'Updated 2024-03-20' },
  { label: 'Sales.xlsx', value: 'sales', type: 'table', description: 'Q1 Data' },
  { label: 'Design System', value: 'design_system', type: 'knowledge', description: 'YH-UI Official' }
];
</${_S}>`;

const jsBasic = toJs(tsBasic);
const jsTypes = toJs(tsTypes);
</script>

## Basic Usage

Displays the standard style of the AiMention component, including icon differentiation for different types, description info, and type tags.

<DemoBlock title="Basic Usage" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="width: 400px">
    <yh-ai-mention
      v-model="value"
      :options="options"
      placeholder="@ Call Agent, document or table..."
    />
  </div>
</DemoBlock>

## Type Filtering

Through the `types` attribute, you can implement type filtering under different trigger prefixes, such as `@` for waking up agents and `#` for referencing knowledge base files.

<DemoBlock title="Type Filtering & Custom Prefix" :ts-code="tsTypes" :js-code="jsTypes">
  <div style="width: 400px; display: flex; flex-direction: column; gap: 20px;">
    <div>
      <p style="margin-bottom: 8px; font-size: 14px; color: var(--yh-text-color-secondary);">Only Agent (@ Call...)</p>
      <yh-ai-mention
        v-model="agentValue"
        :options="options"
        :types="['agent']"
        :triggers="['@']"
        placeholder="@ Call agent..."
      />
    </div>
    <div>
      <p style="margin-bottom: 8px; font-size: 14px; color: var(--yh-text-color-secondary);">Only Context (# Ref...)</p>
      <yh-ai-mention
        v-model="contextValue"
        :triggers="['#']"
        :options="options"
        :types="['document', 'table', 'knowledge']"
        placeholder="# Reference doc or table..."
      />
    </div>
  </div>
</DemoBlock>

## Use in Nuxt

This component perfectly supports Nuxt 3/4 SSR. In Nuxt projects, the component is automatically registered and does not need to be imported manually.

For detailed configuration, please refer to the [Nuxt Integration Document](/en/guide/nuxt).

::: tip SSR Friendly
AiMention has passed full SSR testing and supports server-side rendering to ensure first-screen loading performance.
:::

## API

### Props

| Property                 | Description                                 | Type                                                           | Default                                               |
| ------------------------ | ------------------------------------------- | -------------------------------------------------------------- | ----------------------------------------------------- |
| v-model                  | Binding value                               | `string`                                                       | `''`                                                  |
| options                  | Mention options list                        | `AiMentionOption[]`                                            | `[]`                                                  |
| types                    | Allowed types list                          | `('agent'\|'document'\|'table'\|'knowledge'\|'file')[]`        | `['agent', 'document', 'table', 'knowledge', 'file']` |
| triggers                 | Trigger characters                          | `string[]`                                                     | `['@']`                                               |
| type                     | Input type                                  | `'input' \| 'textarea'`                                        | `'textarea'`                                          |
| placeholder              | Placeholder                                 | `string`                                                       | `''`                                                  |
| disabled                 | Whether disabled                            | `boolean`                                                      | `false`                                               |
| size                     | Size                                        | `'large' \| 'default' \| 'small'`                              | `default`                                             |
| max-length               | Maximum length                              | `number`                                                       | —                                                     |
| rows                     | Textarea rows                               | `number`                                                       | `3`                                                   |
| loading                  | Whether in loading state                    | `boolean`                                                      | `false`                                               |
| theme-overrides          | Component theme overrides                   | `ComponentThemeVars`                                           | `{}`                                                  |
| filter-option            | Custom option filter / disable built-in one | `(keyword: string, option: MentionOption) => boolean \| false` | `undefined`                                           |
| enable-file-tree         | Enable file tree selector                   | `boolean`                                                      | `true`                                                |
| file-loader              | File tree data loader                       | `AiMentionFileLoader`                                          | `undefined`                                           |
| file-root                | File tree root path                         | `string`                                                       | `'/'`                                                 |
| file-tree-expanded-level | Default expanded level of file tree         | `number`                                                       | `2`                                                   |
| show-file-icon           | Whether to show file icon                   | `boolean`                                                      | `true`                                                |
| show-file-size           | Whether to show file size                   | `boolean`                                                      | `true`                                                |
| show-modified-time       | Whether to show last modified time          | `boolean`                                                      | `true`                                                |
| format-file-size         | File size formatter                         | `(size: number) => string`                                     | Built-in formatter                                    |
| search-debounce          | Search debounce delay (ms)                  | `number`                                                       | `300`                                                 |

### AiMentionOption

| Property    | Description             | Type                                                        | Default |
| ----------- | ----------------------- | ----------------------------------------------------------- | ------- |
| label       | Display text            | `string`                                                    | —       |
| value       | Selected value          | `string`                                                    | —       |
| type        | AI type                 | `'agent' \| 'document' \| 'table' \| 'knowledge' \| 'file'` | —       |
| icon        | Custom icon             | `string`                                                    | —       |
| description | Description text        | `string`                                                    | —       |
| path        | File/document path      | `string`                                                    | —       |
| size        | File size (bytes)       | `number`                                                    | —       |
| modifiedAt  | Last modified timestamp | `number`                                                    | —       |
| children    | Children (for tree)     | `AiMentionOption[]`                                         | —       |
| isFolder    | Whether is folder       | `boolean`                                                   | —       |
| expanded    | Whether expanded        | `boolean`                                                   | —       |

### Slots

| Slot Name | Description             | Parameters                    |
| --------- | ----------------------- | ----------------------------- |
| label     | Custom option content   | `{ option: AiMentionOption }` |
| empty     | Content when no matches | —                             |
| loading   | Loading content         | —                             |

## Theme Variables

| Variable                          | Description                     | Default                   |
| --------------------------------- | ------------------------------- | ------------------------- |
| `--yh-ai-mention-option-height`   | Option height                   | `56px`                    |
| `--yh-ai-mention-agent-color`     | Agent type theme color          | `var(--yh-color-primary)` |
| `--yh-ai-mention-doc-color`       | Document type theme color       | `#47c2ff`                 |
| `--yh-ai-mention-table-color`     | Table type theme color          | `#10b981`                 |
| `--yh-ai-mention-knowledge-color` | Knowledge base type theme color | `#f59e0b`                 |
