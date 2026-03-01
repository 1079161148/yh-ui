---
title: AiVoiceTrigger 语音触发
description: AiVoiceTrigger 智能语音唤醒组件，提供炫酷的麦克风交互及响应式波形动画，模拟 AI 实时监听反馈。
---

# AiVoiceTrigger 语音触发

智能语音唤醒组件，提供悬浮式交互体验，支持自定义音轨波形以展示多模态大模型的聆听反馈。

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils';

const isRecordingBasic = ref(false);

const isRecordingAmplitudes = ref(false);
const amplitudes = ref<number[]>([10, 25, 15, 30, 20, 35, 10, 20, 15, 25, 15, 20]);

let ampsTimer: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  ampsTimer = setInterval(() => {
    if(isRecordingAmplitudes.value) {
       amplitudes.value = Array.from({length: 12}, () => 10 + Math.random() * 25);
    }
  }, 100);
});

onUnmounted(() => {
  if (ampsTimer) clearInterval(ampsTimer);
});

const isRecordingEvent = ref(false)

const onStart = () => {
  console.log('Voice recording started...');
};

const onStop = () => {
  console.log('Voice recording stopped.');
};

const onCancel = () => {
  console.log('Voice recording cancelled.');
};

const tsBasic = `<${_T}>
  <div style="height: 120px; display: flex; align-items: center; justify-content: center; background: var(--yh-bg-color-page); border-radius: 8px;">
    <yh-ai-voice-trigger v-model:recording="isRecording" />
  </div>
  <div style="text-align: center; margin-top: 10px; font-size: 13px; color: var(--yh-text-color-secondary);">
    状态: {{ isRecording ? '录音中' : '空闲' }}
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue';

const isRecording = ref(false);
</${_S}>`;

const tsAmplitudes = `<${_T}>
  <div style="height: 120px; display: flex; align-items: center; justify-content: center; background: var(--yh-bg-color-page); border-radius: 8px;">
    <yh-ai-voice-trigger v-model:recording="isRecording" :amplitudes="amplitudes" />
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const isRecording = ref(false);
const amplitudes = ref<number[]>([10, 25, 15, 30, 20, 35, 10, 20, 15, 25, 15, 20]);

let timer: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  // 模拟实时波形数据接收
  timer = setInterval(() => {
    if(isRecording.value) {
       amplitudes.value = Array.from({length: 12}, () => 10 + Math.random() * 25);
    }
  }, 100);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</${_S}>`;

const tsEvent = `<${_T}>
  <div style="height: 120px; display: flex; align-items: center; justify-content: center; background: var(--yh-bg-color-page); border-radius: 8px;">
    <yh-ai-voice-trigger 
      v-model:recording="isRecording" 
      @start="onStart"
      @stop="onStop"
      @cancel="onCancel"
    >
      点击说话
    </yh-ai-voice-trigger>
  </div>
  <div style="text-align: center; margin-top: 10px; font-size: 13px; color: var(--yh-text-color-secondary);">
    请打开开发者工具(F12)查看控制台事件
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue';

const isRecording = ref(false);

const onStart = () => {
  console.log('Voice recording started...');
};

const onStop = () => {
  console.log('Voice recording stopped.');
};

const onCancel = () => {
  console.log('Voice recording cancelled.');
};
</${_S}>`;

const jsBasic = toJs(tsBasic);
const jsAmplitudes = toJs(tsAmplitudes);
const jsEvent = toJs(tsEvent);

const isRecordingChat = ref(false);
const isProcessing = ref(false);
const chatAmplitudes = ref<number[]>([]);
const userMessage = ref('');
const assistantMessage = ref('');

let chatTimer: ReturnType<typeof setInterval> | null = null;
let chatReplyTimer: ReturnType<typeof setTimeout> | null = null;

const onVoiceStart = () => {
  userMessage.value = '';
  assistantMessage.value = '';
  isProcessing.value = false;
  
  if (chatTimer) clearInterval(chatTimer);
  chatTimer = setInterval(() => {
    if(isRecordingChat.value) {
      chatAmplitudes.value = Array.from({length: 12}, () => 10 + Math.random() * 25);
    }
  }, 100);
};

const onVoiceStop = () => {
  if (chatTimer) clearInterval(chatTimer);
  
  userMessage.value = '今天天气怎么样？';
  isProcessing.value = true;
  assistantMessage.value = '';
  
  if (chatReplyTimer) clearTimeout(chatReplyTimer);
  chatReplyTimer = setTimeout(() => {
    isProcessing.value = false;
    assistantMessage.value = '今天天气晴朗，气温 22°C - 28°C，非常适合外出活动！';
  }, 1500);
};

const onVoiceCancel = () => {
  if (chatTimer) clearInterval(chatTimer);
};

const tsChat = `<${_T}>
  <div style="height: 400px; display: flex; flex-direction: column; background: var(--yh-bg-color-page); border-radius: 8px; overflow: hidden; border: 1px solid var(--yh-border-color-light);">
    <div style="flex: 1; padding: 16px; overflow-y: auto; display: flex; flex-direction: column; gap: 16px;">
      <yh-ai-bubble role="assistant" content="你好！我是你的语音助手，点击下方麦克风即可与我交流。" />
      <yh-ai-bubble v-if="userMessage" role="user" :content="userMessage" />
      <yh-ai-bubble v-if="isProcessing || assistantMessage" role="assistant" :loading="isProcessing" :content="assistantMessage" />
    </div>
    
    <div style="padding: 16px; border-top: 1px solid var(--yh-border-color-light); background: var(--yh-bg-color);">
      <div style="display: flex; justify-content: center;">
        <yh-ai-voice-trigger 
          v-model:recording="isRecordingChat"
          :amplitudes="chatAmplitudes"
          @start="onVoiceStart"
          @stop="onVoiceStop"
          @cancel="onVoiceCancel"
        >
          点击说话
        </yh-ai-voice-trigger>
      </div>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue';

const isRecordingChat = ref(false);
const isProcessing = ref(false);
const chatAmplitudes = ref<number[]>([]);
const userMessage = ref('');
const assistantMessage = ref('');

let timer: ReturnType<typeof setInterval> | null = null;
let replyTimer: ReturnType<typeof setTimeout> | null = null;

const onVoiceStart = () => {
  userMessage.value = '';
  assistantMessage.value = '';
  isProcessing.value = false;
  
  if (timer) clearInterval(timer);
  timer = setInterval(() => {
    if(isRecordingChat.value) {
      chatAmplitudes.value = Array.from({length: 12}, () => 10 + Math.random() * 25);
    }
  }, 100);
};

const onVoiceStop = () => {
  if (timer) clearInterval(timer);
  
  userMessage.value = '今天天气怎么样？';
  isProcessing.value = true;
  assistantMessage.value = '';
  
  if (replyTimer) clearTimeout(replyTimer);
  replyTimer = setTimeout(() => {
    isProcessing.value = false;
    assistantMessage.value = '今天天气晴朗，气温 22°C - 28°C，非常适合外出活动！';
  }, 1500);
};

const onVoiceCancel = () => {
  if (timer) clearInterval(timer);
};
</${_S}>`;

const jsChat = toJs(tsChat);
</script>

## 基础用法

最简单的用法，使用 `v-model:recording` 控制双向绑定录音状态。当用户点击麦克风时，会自动展开波形面板。

<DemoBlock title="基础用法" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="height: 120px; display: flex; align-items: center; justify-content: center; background: var(--yh-bg-color-page); border-radius: 8px;">
    <yh-ai-voice-trigger v-model:recording="isRecordingBasic" />
  </div>
  <div style="text-align: center; margin-top: 10px; font-size: 13px; color: var(--yh-text-color-secondary);">
    状态: {{ isRecordingBasic ? '录音中' : '空闲' }}
  </div>
</DemoBlock>

## 实时音轨波柱反馈

传入 `amplitudes` 数组可以在录音展开时通过柱状图实时模拟多模态的语音或情感解析交互。（在真实业务中可以对接 Web Audio API 返回的音量分贝数值）

<DemoBlock title="实时音效模拟" :ts-code="tsAmplitudes" :js-code="jsAmplitudes">
  <div style="height: 120px; display: flex; align-items: center; justify-content: center; background: var(--yh-bg-color-page); border-radius: 8px;">
    <yh-ai-voice-trigger v-model:recording="isRecordingAmplitudes" :amplitudes="amplitudes" />
  </div>
</DemoBlock>

## 捕捉交互事件

使用 `@start`、`@stop` 以及取消按钮的 `@cancel` 可以准确将组件交互与底层的 WebRTC 或大模型 WebSocket 推流任务绑定。同时可以使用默认插槽指定按键文本。

<DemoBlock title="触发回调" :ts-code="tsEvent" :js-code="jsEvent">
  <div style="height: 120px; display: flex; align-items: center; justify-content: center; background: var(--yh-bg-color-page); border-radius: 8px;">
    <yh-ai-voice-trigger 
      v-model:recording="isRecordingEvent"
      @start="onStart"
      @stop="onStop"
      @cancel="onCancel"
    >
      点击说话
    </yh-ai-voice-trigger>
  </div>
  <div style="text-align: center; margin-top: 10px; font-size: 13px; color: var(--yh-text-color-secondary);">
    请打开开发者工具(F12)查看控制台事件
  </div>
</DemoBlock>

## 实战案例：智能语音助手对话

通过组合 `AiVoiceTrigger` 和 `AiBubble` 组件，我们可以轻松构建一个包含语音输入、加载响应和气泡展示的智能语音助手界面。

<DemoBlock title="应用场景实例" :ts-code="tsChat" :js-code="jsChat">
  <div style="height: 400px; display: flex; flex-direction: column; background: var(--yh-bg-color-page); border-radius: 8px; overflow: hidden; border: 1px solid var(--yh-border-color-light);">
    <div style="flex: 1; padding: 16px; overflow-y: auto; display: flex; flex-direction: column; gap: 16px;">
      <yh-ai-bubble role="assistant" content="你好！我是你的语音助手，点击下方麦克风即可与我交流。" />
      <yh-ai-bubble v-if="userMessage" role="user" :content="userMessage" />
      <yh-ai-bubble v-if="isProcessing || assistantMessage" role="assistant" :loading="isProcessing" :content="assistantMessage" />
    </div>
    <div style="padding: 16px; border-top: 1px solid var(--yh-border-color-light); background: var(--yh-bg-color);">
      <div style="display: flex; justify-content: center;">
        <yh-ai-voice-trigger 
          v-model:recording="isRecordingChat"
          :amplitudes="chatAmplitudes"
          @start="onVoiceStart"
          @stop="onVoiceStop"
          @cancel="onVoiceCancel"
        >
          点击说话
        </yh-ai-voice-trigger>
      </div>
    </div>
  </div>
</DemoBlock>

## API

### Props

| 属性名                        | 说明                                     | 类型                 | 默认值        |
| ----------------------------- | ---------------------------------------- | -------------------- | ------------- |
| recording / v-model:recording | 是否处于展开录音状态                     | `boolean`            | `false`       |
| amplitudes                    | 音轨高度波分布数组(需内部响应式轮询传入) | `number[]`           | `[5,5,5,...]` |
| theme-overrides               | 组件级别的局部主题定制覆盖变量           | `ComponentThemeVars` | —             |

### Events

| 事件名           | 说明                                          | 回调参数           |
| ---------------- | --------------------------------------------- | ------------------ |
| update:recording | 绑定状态变化时触发                            | `(value: boolean)` |
| start            | 开始录音的挂载触发事件                        | —                  |
| stop             | 保存/结束录音触发事件（主动在展开后点击红点） | —                  |
| cancel           | 取消录制（点击后方的小 `x`）                  | —                  |

### Slots

| 插槽名  | 说明                                   | 参数 |
| ------- | -------------------------------------- | ---- |
| default | 未展开录音状态时的图标后置辅助说明文本 | —    |

## 在 Nuxt 中使用

该组件完全支持 Nuxt 3/4。在 Nuxt 项目中，该组件将被自动导入。

有关详细配置，请参阅 [Nuxt 集成](/guide/nuxt)。

## 主题变量

通过 `themeOverrides` prop 或 CSS 变量对组件进行深度定制：

| 变量名                               | 说明               | 默认值                       |
| ------------------------------------ | ------------------ | ---------------------------- |
| `--yh-ai-voice-trigger-btn-size`     | 触发按钮尺寸       | `32px`                       |
| `--yh-ai-voice-trigger-active-color` | 录音激活时的背景色 | `var(--yh-color-danger)`     |
| `--yh-ai-voice-trigger-wave-color`   | 音轨波形颜色       | `var(--yh-color-danger)`     |
| `--yh-ai-voice-trigger-bg`           | 展开面板背景色     | `var(--yh-bg-color-overlay)` |
