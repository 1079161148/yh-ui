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
import { ref, computed, watch } from 'vue';
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
      <div style="font-size: 16px; color: var(--yh-text-color-primary);">{{ transcript || '等待发言...' }}</div>
      <div style="font-size: 14px; color: var(--yh-text-color-secondary); margin-top: 4px;">{{ interimTranscript }}</div>
    </div>
    <div style="display: flex; align-items: center; justify-content: center; gap: 20px;">
      <yh-ai-voice-trigger v-model:recording="isRecording" :amplitudes="amplitudes" @start="start" @stop="stop" />
      <yh-button v-if="audioBlob" type="primary" size="small">录音已就绪</yh-button>
    </div>
  </div>
</` + `${_T}>

<` + `${_S} setup lang="ts">
import { useAiVoice } from '@yh-ui/hooks';
const { 
  isRecording, 
  transcript, 
  interimTranscript, 
  amplitudes, 
  audioBlob, 
  start, 
  stop 
} = useAiVoice({ vad: true });
</` + `${_S}>`;

const jsBasic = toJs(tsBasic);

const chatThinking = ref(false);
const chatMessages = ref<{ role: 'user' | 'assistant'; content: string; loading?: boolean }[]>([
  { role: 'assistant', content: '你好！我是语音助手，有什么可以帮你的？' }
]);

const { 
  isRecording: chatRec, 
  amplitudes: chatAmps, 
  transcript: chatTrans,
  interimTranscript: chatInterim,
  start: chatStart, 
  stop: chatStop 
} = useAiVoice({
  waveCount: 20,
  onStop: (text) => {
    // 如果没有转写结果（如魔法环境未配置），提供一条兜底提示
    const finalContent = text || '（未能识别语音内容，请检查麦克风或魔法环境）';
    chatMessages.value.push({ role: 'user', content: finalContent });
    
    chatThinking.value = true;
    setTimeout(() => {
      chatThinking.value = false;
      const resMsg = text ? `我听到你说的是："${text}"，这是一个测试回复。` : '没关系，虽然没听清你的话，但我依然感受到了你的声音波动！';
      chatMessages.value.push({ 
        role: 'assistant', 
        content: resMsg
      });
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

// ─── 示例 3：结合 AiSender 使用 ───
const senderText = ref('');
const { 
  isRecording: senderRec, 
  amplitudes: senderAmps, 
  transcript: senderTrans,
  interimTranscript: senderInterim,
  start: senderStart, 
  stop: senderStop 
} = useAiVoice({
  onStop: (text) => { 
    if (text) senderText.value = text;
  }
});

// 实现在线实时同步转写结果到输入框
watch([senderTrans, senderInterim], ([t, i]) => {
  if (senderRec.value) {
    senderText.value = t + i;
  }
});

const tsSender = `<` + `${_T}>
  <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px;">
    <yh-ai-sender v-model="senderText" placeholder="点击右侧图标开始语音输入...">
      <template #actions>
        <yh-ai-voice-trigger 
          v-model:recording="senderRec" 
          :amplitudes="senderAmps" 
          @start="senderStart" 
          @stop="senderStop" 
        />
      </template>
    </yh-ai-sender>
  </div>
</` + `${_T}>

<` + `${_S} setup lang="ts">
import { ref, watch } from 'vue';
import { useAiVoice } from '@yh-ui/hooks';

const senderText = ref('');
const { 
  isRecording: senderRec, 
  amplitudes: senderAmps, 
  transcript: senderTrans,
  interimTranscript: senderInterim,
  start: senderStart, 
  stop: senderStop 
} = useAiVoice();

// 实时监听 Hook 中的转写状态并同步到文本框
watch([senderTrans, senderInterim], ([t, i]) => {
  if (senderRec.value) {
    senderText.value = t + i;
  }
});
</` + `${_S}>`;

const jsSender = toJs(tsSender);
</script>

## 基础用法

<DemoBlock title="基础交互演示" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="padding: 32px; background: var(--yh-bg-color-page); border-radius: 16px; border: 1px solid var(--yh-border-color-light); display: flex; flex-direction: column; gap: 24px;">
    <div v-if="!sttSupported" style="color: var(--yh-color-danger);">⚠️ 当前环境不支持 Web Speech API（建议使用 Chrome 并开启魔法）</div>
    <div style="min-height: 80px; padding: 16px; background: var(--yh-bg-color); border: 1px solid var(--yh-border-color-light); border-radius: 12px; box-shadow: var(--yh-shadow-light);">
      <div style="font-size: 16px; line-height: 1.6; color: var(--yh-text-color-primary);">{{ transcript || '等待发言...' }}</div>
      <div style="font-size: 14px; color: var(--yh-text-color-secondary); margin-top: 8px;">{{ interimTranscript }}</div>
    </div>
    <div style="display: flex; align-items: center; justify-content: center; gap: 16px;">
      <yh-ai-voice-trigger v-model:recording="isRecording" :amplitudes="amplitudes" @start="start" @stop="stop">
        <span style="font-weight: 600;">{{ isRecording ? '正在聆听' : '开始录音' }}</span>
      </yh-ai-voice-trigger>
      <yh-button v-if="audioBlob" circle @click="downloadDemoAudio">
        <template #icon><yh-icon name="download" /></template>
      </yh-button>
    </div>
  </div>
</DemoBlock>

## 结合 AiSender 使用

将语音触发器集成到 `AiSender` 中，实现类似于主流 AI 助手的输入体验。

<DemoBlock title="集成输入框" :ts-code="tsSender" :js-code="jsSender">
  <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px;">
    <yh-ai-sender v-model="senderText" placeholder="点击右侧图标开始语音输入...">
      <template #actions>
        <yh-ai-voice-trigger 
          v-model:recording="senderRec" 
          :amplitudes="senderAmps" 
          @start="senderStart" 
          @stop="senderStop" 
        />
      </template>
    </yh-ai-sender>
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
| volumeThreshold | 音量变化灵敏度 (0-1)       | `number`  | `0.05`    |
| waveCount      | 返回的波形柱数量            | `number`  | `20`      |
| useSTT         | 是否启用浏览器语音识别      | `boolean` | `true`    |
| onStart        | 开始录音时回调             | `() => void` | -      |
| onStop         | 停止后返回转写文本和 Blob   | `(transcript: string, blob: Blob \| null) => void` | - |
| onResult       | 最终转写更新回调           | `(transcript: string) => void` | - |
| onPartialResult | 临时转写更新回调          | `(transcript: string) => void` | - |
| onError        | 错误回调                   | `(error: unknown) => void` | - |

### 返回值

| 导出项             | 说明                     | 类型                 |
| ------------------ | ------------------------ | -------------------- |
| isRecording        | 响应式录音状态           | `Ref<boolean>`       |
| transcript         | 已确认的转写文本         | `Ref<string>`        |
| interimTranscript  | 实时临时转写文本         | `Ref<string>`        |
| amplitudes         | 实时波形数据             | `Ref<number[]>`      |
| volume             | 实时音量 (0-100)         | `Ref<number>`        |
| audioBlob          | 录音生成的音频文件       | `Ref<Blob \| null>`  |
| start              | 开始录音                 | `() => Promise<void>` |
| stop               | 停止录音                 | `() => void`         |
| cancel             | 取消录音并放弃当前结果   | `() => void`         |
| sttSupported       | 当前环境是否支持 STT     | `boolean`            |
