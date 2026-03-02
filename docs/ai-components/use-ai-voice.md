---
title: useAiVoice 语音交互
description: 高级 AI 语音 Hook，内置 Web Audio API 实时波形分析、智能 VAD 静音检测以及 Web Speech API 转写封装。
---

# useAiVoice 语音交互

::: tip 浏览器兼容性
调用浏览器原生的语音识别 API，在 **谷歌浏览器** 中使用，需要在 **🪄 魔法环境** 中才能正常使用。
:::

`useAiVoice` 是一个高度集成的语音处理 Hook。它不仅封装了浏览器原生的语音转文字（STT）能力，还内置了 **Web Audio 分析引擎**，能够实时输出高频波形数据，完美配合 `AiVoiceTrigger` 组件实现动感视觉反馈。

## 核心特性

- **视觉同步**：内置频率分析器，实时返回 `amplitudes` 数组，直接驱动波形动画。
- **物理录制**：内置 `MediaRecorder`，录音结束后自动生成 `.webm` 音频 Blob。
- **智能 VAD**：支持静音检测（Voice Activity Detection），用户停止说话后自动结束录音。
- **实时转写**：支持 `interimResults`，在说话过程中即可获取部分识别结果。
- **即插即用**：自动管理麦克风权限、AudioContext 生命周期及销毁逻辑。

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAiVoice } from '@yh-ui/hooks';
import { toJs, _T, _S } from '../.vitepress/theme/utils/demo-utils';

const { 
  isRecording, 
  transcript, 
  interimTranscript, 
  amplitudes, 
  audioBlob,
  start, 
  stop, 
  sttSupported 
} = useAiVoice({
  vad: true,
  waveCount: 20
});

const demoAudioUrl = computed(() => audioBlob.value ? URL.createObjectURL(audioBlob.value) : '');
const downloadDemoAudio = () => { if (!demoAudioUrl.value) return; const a = document.createElement('a'); a.href = demoAudioUrl.value; a.download = 'recording.webm'; a.click(); };

const tsBasic = `<` + `${_T}>
  <div style="padding: 24px; background: var(--yh-bg-color-page); border-radius: 12px; border: 1px solid var(--yh-border-color-light);">
    <div style="margin-bottom: 20px; min-height: 60px; padding: 12px; background: var(--yh-bg-color); border: 1px dashed var(--yh-border-color); border-radius: 8px;">
      <p>{{ transcript || '等待发言...' }}</p>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
      <yh-ai-voice-trigger v-model:recording="isRecording" :amplitudes="amplitudes" @start="start" @stop="stop" />
      <div v-if="audioBlob">
        <audio :src="audioUrl" controls style="height: 36px;" />
      </div>
    </div>
  </div>
</` + `${_T}>

<` + `${_S} setup lang="ts">
import { computed } from 'vue';
import { useAiVoice } from '@yh-ui/hooks';
const { isRecording, transcript, amplitudes, audioBlob, start, stop } = useAiVoice({ vad: true });
const audioUrl = computed(() => audioBlob.value ? URL.createObjectURL(audioBlob.value) : '');
</` + `${_S}>`;

const jsBasic = toJs(tsBasic);

const chatThinking = ref(false);
const chatMessages = ref<{ role: 'user' | 'assistant'; content: string; loading?: boolean }[]>([
  { role: 'assistant', content: '你好！我是语音助手，有什么可以帮你的？' }
]);

const { isRecording: chatRec, amplitudes: chatAmps, start: chatStart, stop: chatStop } = useAiVoice({
  waveCount: 20,
  onStop: (text) => {
    if (!text) return;
    chatMessages.value.push({ role: 'user', content: text });
    chatThinking.value = true;
    setTimeout(() => {
      chatThinking.value = false;
      chatMessages.value.push({ role: 'assistant', content: '我听到你说的是：' + text + '，这是一个测试回复。' });
    }, 1500);
  }
});

const tsAdvanced = `<` + `${_T}>
  <div style="max-width: 500px; margin: 0 auto; border: 1px solid var(--yh-border-color-light); border-radius: 16px; overflow: hidden; background: var(--yh-bg-color);">
    <!-- 消息列表区域 -->
    <div style="height: 350px; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; scroll-behavior: smooth;">
      <yh-ai-bubble v-for="(msg, index) in chatMessages" :key="index" :role="msg.role" :content="msg.content" :loading="msg.loading" />
      <yh-ai-bubble v-if="chatThinking" role="assistant" :loading="chatThinking" />
    </div>
    <!-- 语音输入区域 -->
    <div style="padding: 20px; border-top: 1px solid var(--yh-border-color-light); background: var(--yh-bg-color-page); display: flex; justify-content: center;">
      <yh-ai-voice-trigger v-model:recording="chatRec" variant="sphere" :teleport="false" :amplitudes="chatAmps" @start="chatStart" @stop="chatStop">
        {{ chatRec ? '正在聆听...' : '按住说话' }}
      </yh-ai-voice-trigger>
    </div>
  </div>
</` + `${_T}>

<` + `${_S} setup lang="ts">
import { ref } from 'vue';
import { useAiVoice } from '@yh-ui/hooks';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  loading?: boolean;
}

const chatMessages = ref<ChatMessage[]>([
  { role: 'assistant', content: '你好！我是语音助手，有什么可以帮你的？' }
]);

const chatThinking = ref(false);

const { isRecording: chatRec, amplitudes: chatAmps, start: chatStart, stop: chatStop } = useAiVoice({
  waveCount: 20,
  onStop: (text) => {
    if (!text) return;
    // 添加用户消息
    chatMessages.value.push({ role: 'user', content: text });
    // 模拟 AI 回复
    chatThinking.value = true;
    setTimeout(() => {
      chatThinking.value = false;
      chatMessages.value.push({ role: 'assistant', content: '我听到你说的是："' + text + '"，这是一个测试回复。' });
    }, 1500);
  }
});
</` + `${_S}>`;

const jsAdvanced = toJs(tsAdvanced);
</script>

## 基础用法

<DemoBlock title="基础交互演示" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="padding: 24px; background: var(--yh-bg-color-page); border-radius: 12px; border: 1px solid var(--yh-border-color-light);">
    <div v-if="!sttSupported" style="color: var(--yh-color-danger); margin-bottom: 12px;">⚠️ 不支持 Web Speech API</div>
    <div style="margin-bottom: 20px; min-height: 60px; padding: 12px; background: var(--yh-bg-color); border: 1px dashed var(--yh-border-color); border-radius: 8px;">
      <p>{{ transcript || '等待发言...' }}</p>
      <p style="opacity: 0.6;">{{ interimTranscript }}</p>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
      <yh-ai-voice-trigger v-model:recording="isRecording" :amplitudes="amplitudes" @start="start" @stop="stop">
        {{ isRecording ? '正在聆听...' : '点击对话' }}
      </yh-ai-voice-trigger>
      <div v-if="audioBlob">
        <audio :src="demoAudioUrl" controls style="height: 36px;" />
      </div>
    </div>
  </div>
</DemoBlock>

## 进阶方案：拟物化 AI 对话

<DemoBlock title="全流程语音对话" :ts-code="tsAdvanced" :js-code="jsAdvanced">
  <div style="max-width: 500px; margin: 0 auto; border: 1px solid var(--yh-border-color-light); border-radius: 16px; overflow: hidden; background: var(--yh-bg-color);">
    <!-- 消息列表区域 -->
    <div style="height: 350px; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; scroll-behavior: smooth;">
      <yh-ai-bubble v-for="(msg, index) in chatMessages" :key="index" :role="msg.role" :content="msg.content" :loading="msg.loading" />
      <yh-ai-bubble v-if="chatThinking" role="assistant" :loading="chatThinking" />
    </div>
    <!-- 语音输入区域 -->
    <div style="padding: 20px; border-top: 1px solid var(--yh-border-color-light); background: var(--yh-bg-color-page); display: flex; justify-content: center;">
      <yh-ai-voice-trigger v-model:recording="chatRec" variant="sphere" :teleport="false" :amplitudes="chatAmps" @start="chatStart" @stop="chatStop">
        {{ chatRec ? '正在聆听...' : '按住说话' }}
      </yh-ai-voice-trigger>
    </div>
  </div>
</DemoBlock>

## API

### UseAiVoiceOptions

| 属性名         | 说明                        | 类型      | 默认值    |
| -------------- | --------------------------- | --------- | --------- |
| language       | 识别语言                    | `string`  | `'zh-CN'` |
| interimResults | 是否需要临时结果            | `boolean` | `true`    |
| continuous     | 是否开启连续识别            | `boolean` | `false`   |
| vad            | 是否开启智能静音检测        | `boolean` | `true`    |
| vadThreshold   | 静音自动停止的时间阈值 (ms) | `number`  | `2000`    |
| waveCount      | 返回的波形柱数量            | `number`  | `20`      |

### 返回值

| 导出项      | 说明               | 类型           |
| ----------- | ------------------ | -------------- |
| isRecording | 响应式录音状态     | `Ref<boolean>` |
| transcript  | 已确认的转写文本   | `Ref<string>`  |
| audioBlob   | 录音生成的音频文件 | `Ref<Blob>`    |
