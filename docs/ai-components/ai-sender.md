# AiSender 智能输入

<script setup lang="ts">
import { ref } from 'vue';
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils';

const value = ref('');
const value2 = ref('');
const valLimit = ref('这是一些默认的高价值内容！');
const valMulti = ref('');
const valSlot = ref('');
const input3 = ref('');
const input4 = ref('');

const onSend = (v: string) => {
  alert('你想发送：' + v);
};

const commands = [
  { key: 'summary', label: '总结', description: '总结当前网页内容', icon: 'document', prompt: '请帮我总结一下这段内容：' },
  { key: 'translate', label: '翻译', description: '将文本翻译为指定语言', icon: 'chat', prompt: '请将以下内容翻译成英文：' },
  { key: 'fix', label: '纠错', description: '检查并修复语法错误', icon: 'edit', prompt: '请检查语法：' }
];

const attachments = ref([
  { id: '1', name: 'image.png', type: 'image/png', url: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=100&auto=format&fit=crop', status: 'success' },
  { id: '2', name: 'report.pdf', type: 'application/pdf', status: 'uploading', progress: 45 }
]);

const handleRemove = (file: { id: string }) => {
  attachments.value = attachments.value.filter(a => a.id !== file.id);
};

const tsBasic = `<${_T}>
  <yh-ai-sender v-model="value" @send="onSend" />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue';

const value = ref('');
const onSend = (v: string) => {
  console.log('Send:', v);
};
</${_S}>`;

const tsLoading = `<${_T}>
  <yh-ai-sender v-model="value" :loading="true" placeholder="AI 正在思考中..." />
</${_T}>`;

const tsAdvanced = `<${_T}>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <yh-ai-sender v-model="valLimit" :max-length="200" show-word-limit clearable />
    
    <yh-ai-sender v-model="valMulti" placeholder="询问任何问题...">
      <${_T} #prefix>
        <yh-button text size="small">
          <yh-icon name="paperclip" style="margin-right: 4px;" /> 添加附件
        </yh-button>
      </${_T}>
      <${_T} #actions>
        <yh-button text circle>
          <yh-icon name="microphone" />
        </yh-button>
      </${_T}>
    </yh-ai-sender>
  </div>
</${_T}>`;

const tsCommand = `<${_T}>
  <yh-ai-sender 
    v-model="input3" 
    placeholder="输入 / 触发快捷命令..." 
    :commands="commands"
    clearable
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue';
import type { AiCommand } from '@yh-ui/components';

const input3 = ref('');
const commands: AiCommand[] = [
  { key: 'summary', label: '总结', description: '总结当前网页内容', icon: 'document', prompt: '请帮我总结一下这段内容：' },
  { key: 'translate', label: '翻译', description: '将文本翻译为指定语言', icon: 'chat', prompt: '请将以下内容翻译成英文：' },
  { key: 'fix', label: '纠错', description: '检查并修复语法错误', icon: 'edit', prompt: '请检查语法：' }
];
</${_S}>`;

const tsAttach = `<${_T}>
  <yh-ai-sender 
    v-model="input4" 
    placeholder="带有附件的输入..." 
    :attachments="attachments"
    @remove-attachment="handleRemove"
  />
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue';
import type { AiAttachment } from '@yh-ui/components';

const attachments = ref<AiAttachment[]>([
  { id: '1', name: 'image.png', type: 'image/png', url: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=100&auto=format&fit=crop', status: 'success' },
  { id: '2', name: 'report.pdf', type: 'application/pdf', status: 'uploading', progress: 45 }
]);

const handleRemove = (file: AiAttachment) => {
  attachments.value = attachments.value.filter(a => a.id !== file.id);
};
</${_S}>`;

const tsPreset = `<${_T}>
  <yh-ai-sender v-model="value" placeholder="输入内容或直接使用预设操作...">
    <${_T} #actions>
      <div style="display: flex; gap: 8px; margin-right: 8px;">
        <yh-button size="small" round @click="value = '请帮我总结一下：'">
          <template #icon><yh-icon name="document" /></template>
          总结
        </yh-button>
        <yh-button size="small" round @click="value = '请帮我润色这段文字：'">
          <template #icon><yh-icon name="edit" /></template>
          润色
        </yh-button>
      </div>
    </${_T}>
  </yh-ai-sender>
</${_T}>`

const jsBasic = toJs(tsBasic)
const jsLoading = toJs(tsLoading)
const jsAdvanced = toJs(tsAdvanced)
const jsCommand = toJs(tsCommand)
const jsAttach = toJs(tsAttach)
const jsPreset = toJs(tsPreset)
</script>

支持多行自适应的智能输入框，内衬发送图标。

## 基础用法

可以支持按下回车键（Enter）自动提交！

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-sender v-model="value" @send="onSend" />
  </div>
</DemoBlock>

## 加载状态

结合 `:loading` 使用表示正在回复禁止输入的情况。

<DemoBlock title="加载状态" :ts-code="tsLoading" :js-code="jsLoading">
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-sender v-model="value2" :loading="true" placeholder="AI 正在思考中..." />
  </div>
</DemoBlock>

## 进阶与多模态扩展

提供了诸如字数限制 `max-length`，自动计数 `show-word-limit`，一键重置 `clearable` 等高阶能力。
通过插入 `prefix` / `actions`，还能极其轻松地实现文件上传、语音识别的高级智能组件拼装容器！

<DemoBlock title="进阶模态" :ts-code="tsAdvanced" :js-code="jsAdvanced">
<div style="background:var(--yh-bg-color-page); padding:16px; display: flex; flex-direction: column; gap: 16px;">
<yh-ai-sender 
  v-model="valLimit" 
  :max-length="200" 
  show-word-limit 
  clearable 
  placeholder="输入一些内容，试试限制和清空..." 
/>
<yh-ai-sender v-model="valMulti" placeholder="询问任何问题...">
  <template #prefix>
  <yh-button text size="small">
  <yh-icon name="paperclip" style="margin-right: 4px;" /> 添加附件
  </yh-button>
  </template>
  <template #actions>
  <yh-button text circle>
  <yh-icon name="microphone" />
  </yh-button>
  </template>
</yh-ai-sender>
</div>
</DemoBlock>

### 预设交互 (AiInputAction 模式)

通过 `#actions` 插槽，您可以轻松集成常用的预设操作指令，如总结、润色等。

<DemoBlock title="预设操作面板" :ts-code="tsPreset" :js-code="jsPreset">
<div style="background:var(--yh-bg-color-page); padding:16px;">
  <yh-ai-sender v-model="value" placeholder="输入内容或直接使用预设操作...">
  <template #actions>
  <div style="display: flex; gap: 8px; margin-right: 8px;">
  <yh-button size="small" round @click="value = '请帮我总结一下：'">
  <template #icon><yh-icon name="document" /></template>
  总结
  </yh-button>
  <yh-button size="small" round @click="value = '请帮我润色这段文字：'">
  <template #icon><yh-icon name="edit" /></template>
  润色
  </yh-button>
  </div>
  </template>
  </yh-ai-sender>
</div>
</DemoBlock>

## 完全自定义发送槽

您可以通过 `#submit` 插槽完全接管发出请求区域的视图逻辑。

<div class="demo-box" style="margin-top: 16px;">
<div style="background:var(--yh-bg-color-page); padding:16px;">
  <yh-ai-sender v-model="valSlot" placeholder="询问任何问题...">
  <template #submit="{ disabled, loading, submit }">
  <yh-button 
  circle 
  type="success" 
  :disabled="disabled"
  :loading="loading"
  @click="submit">
  <template #icon>
  <yh-icon name="check-circle" />
  </template>
  </yh-button>
  </template>
  </yh-ai-sender>
</div>
</div>

## 快捷命令 (Slash Commands)

输入 `/` 即可触发命令面板，通过键盘或鼠标快速选择预设的 Prompt 模板。

<DemoBlock title="快捷命令" :ts-code="tsCommand" :js-code="jsCommand">
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-sender 
      v-model="input3" 
      placeholder="输入 / 触发快捷命令..." 
      :commands="commands"
      clearable
    />
  </div>
</DemoBlock>

## 附件预览 (Attachments)

支持在发送前预览图片及文件列表，内置上传进度显示及一键移除能力。

<DemoBlock title="附件预览" :ts-code="tsAttach" :js-code="jsAttach">
  <div style="background:var(--yh-bg-color-page); padding:16px;">
    <yh-ai-sender 
      v-model="input4" 
      placeholder="带有附件的输入..." 
      :attachments="attachments"
      @remove-attachment="handleRemove"
    />
  </div>
</DemoBlock>

## API

### Props

| 属性名                 | 说明                     | 类型                 | 默认值                |
| ---------------------- | ------------------------ | -------------------- | --------------------- |
| `modelValue / v-model` | 输入内容绑定值           | `string`             | `''`                  |
| `placeholder`          | 占位文本                 | `string`             | `'Send a message...'` |
| `loading`              | 是否在等待AI响应         | `boolean`            | `false`               |
| `disabled`             | 是否禁用                 | `boolean`            | `false`               |
| `maxLength`            | 原生 maxlength 输入限制  | `number`             | —                     |
| `clearable`            | 是否展示清空一键按钮     | `boolean`            | `false`               |
| `showWordLimit`        | 是否展示底部字数统计数字 | `boolean`            | `false`               |
| `commands`             | 快捷命令列表             | `AiCommand[]`        | `[]`                  |
| `attachments`          | 已选附件列表             | `AiAttachment[]`     | `[]`                  |
| `themeOverrides`       | 主题变量覆盖             | `ComponentThemeVars` | —                     |

### AiCommand

| 属性名        | 说明                     | 类型     |
| ------------- | ------------------------ | -------- |
| `key`         | 命令关键字（如 summary） | `string` |
| `label`       | 显示名称                 | `string` |
| `icon`        | 图标名称                 | `string` |
| `description` | 简短描述                 | `string` |
| `prompt`      | 选中后填充的指令前缀     | `string` |

### AiAttachment

| 属性名     | 说明             | 类型                                  |
| ---------- | ---------------- | ------------------------------------- |
| `id`       | 唯一标识         | `string`                              |
| `name`     | 文件名           | `string`                              |
| `type`     | 文件类型         | `string`                              |
| `url`      | 预览图或 URL     | `string`                              |
| `status`   | 状态             | `'uploading' \| 'success' \| 'error'` |
| `progress` | 上传进度 (0-100) | `number`                              |

### Events

| 事件名              | 说明                   | 回调参数                       |
| ------------------- | ---------------------- | ------------------------------ |
| `send`              | 按下发送按钮或者回车时 | `(value: string) => void`      |
| `clear`             | 点击清空按钮时触发     | `() => void`                   |
| `command`           | 选中快捷命令时触发     | `(command: AiCommand) => void` |
| `remove-attachment` | 移除附件时触发         | `(file: AiAttachment) => void` |

### Slots

| 插槽名    | 说明                                                   |
| --------- | ------------------------------------------------------ |
| `prefix`  | 输入框左上内容前缀                                     |
| `actions` | 发送按钮外层包裹                                       |
| `submit`  | 替换默认发送按钮，暴露 `disabled`, `loading`, `submit` |
