---
title: useAiVoice Voice Interaction
description: Advanced AI Voice Hook with built-in real-time waveform analysis via Web Audio API, smart VAD silence detection, and Web Speech API STT encapsulation.
---

# useAiVoice

::: tip Browser Compatibility
This feature uses the browser's native Web Speech API for speech-to-text. In **Google Chrome**, it requires running in a **🪄 secure context (HTTPS or localhost)** to work properly.
:::

`useAiVoice` is a highly integrated voice processing hook. It not only encapsulates the browser's native speech-to-text (STT) capabilities but also features a built-in **Web Audio analysis engine** that outputs real-time high-fidelity waveform data, perfectly matching the `AiVoiceTrigger` component for dynamic visual feedback.

## Features

- **Visual Sync**: Built-in frequency analyzer returns real-time `amplitudes` array to drive waveform animations directly.
- **Physical Recording**: Built-in `MediaRecorder` generates a `.webm` audio blob after recording.
- **Smart VAD**: Supports Voice Activity Detection to automatically stop recording when the user finishes speaking.
- **Real-time STT**: Supports `interimResults` to provide partial transcripts while the user is still speaking.
- **Plug-and-Play**: Automatically manages microphone permissions, AudioContext lifecycle, and proper cleanup.

<script setup lang="ts">
import { ref } from 'vue';
import { useAiVoice } from '@yh-ui/hooks';
import { toJs, _T, _S } from '../../.vitepress/theme/utils/demo-utils';

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
  language: 'en-US',
  vad: true,
  vadThreshold: 2000
});

const downloadAudio = () => {
  if (!audioBlob.value) return;
  const url = URL.createObjectURL(audioBlob.value);
  const a = document.createElement('a');
  a.href = url;
  a.download = `recording-${Date.now()}.webm`;
  a.click();
  URL.revokeObjectURL(url);
};

const tsBasic = `<${_T}>
  <div style="padding: 24px; background: var(--yh-bg-color-page); border-radius: 12px; border: 1px solid var(--yh-border-color-light);">
    <div v-if="!sttSupported" style="color: var(--yh-color-danger); margin-bottom: 12px;">
      ⚠️ Web Speech API is not supported. Switched to recording-only mode.
    </div>

    <div style="margin-bottom: 20px; min-height: 60px; padding: 12px; background: var(--yh-bg-color); border: 1px dashed var(--yh-border-color); border-radius: 8px;">
      <span style="color: var(--yh-text-color-primary)">{{ transcript || 'Waiting for speech...' }}</span>
      <span style="color: var(--yh-text-color-secondary); opacity: 0.6">{{ interimTranscript }}</span>
    </div>

    <div style="display: flex; justify-content: center; align-items: center; gap: 20px;">
      <yh-ai-voice-trigger 
        v-model:recording="isRecording" 
        :amplitudes="amplitudes"
        @start="start"
        @stop="stop"
      >
        {{ isRecording ? 'Listening...' : 'Push to Talk' }}
      </yh-ai-voice-trigger>

      <yh-button v-if="audioBlob" type="primary" size="small" @click="downloadAudio">
        Download (.webm)
      </yh-button>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { useAiVoice } from '@yh-ui/hooks';

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
  language: 'en-US',
  vad: true,
  vadThreshold: 2000
});

const downloadAudio = () => {
  if (!audioBlob.value) return;
  const url = URL.createObjectURL(audioBlob.value);
  const a = document.createElement('a');
  a.href = url;
  a.download = \`recording-\${Date.now()}.webm\`;
  a.click();
  URL.revokeObjectURL(url);
};
</${_S}>`;

const jsBasic = toJs(tsBasic);

const isThinking = ref(false);

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  loading?: boolean;
}

const chatMessages = ref<ChatMessage[]>([
  { role: 'assistant', content: 'Hello! I am your voice assistant. What would you like to talk about?' }
]);

const {
  isRecording: isRecordingChat,
  amplitudes: chatAmplitudes,
  start: startChat,
  stop: stopChat
} = useAiVoice({
  language: 'en-US',
  onStop: (text) => {
    if (!text) return;
    chatMessages.value.push({ role: 'user', content: text });
    isThinking.value = true;
    setTimeout(() => {
      isThinking.value = false;
      chatMessages.value.push({ role: 'assistant', content: 'I heard you say: "' + text + '". This is a demo response.' });
    }, 2000);
  }
});

const tsAdvanced = `<${_T}>
  <div style="max-width: 500px; margin: 0 auto; border: 1px solid var(--yh-border-color-light); border-radius: 16px; overflow: hidden; background: var(--yh-bg-color);">
    <!-- Message List Area -->
    <div style="height: 350px; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; scroll-behavior: smooth;">
      <yh-ai-bubble v-for="(msg, index) in chatMessages" :key="index" :role="msg.role" :content="msg.content" :loading="msg.loading" />
      <yh-ai-bubble v-if="isThinking" role="assistant" :loading="isThinking" />
    </div>
    <!-- Voice Input Area -->
    <div style="padding: 20px; border-top: 1px solid var(--yh-border-color-light); background: var(--yh-bg-color-page); display: flex; justify-content: center;">
      <yh-ai-voice-trigger 
        v-model:recording="isRecordingChat" 
        variant="sphere"
        :teleport="false"
        :amplitudes="chatAmplitudes"
        @start="startChat"
        @stop="stopChat"
      >
        {{ isRecordingChat ? 'Listening...' : 'Push to Talk' }}
      </yh-ai-voice-trigger>
    </div>
  </div>
</${_T}>

<${_S} setup lang="ts">
import { ref } from 'vue';
import { useAiVoice } from '@yh-ui/hooks';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  loading?: boolean;
}

const chatMessages = ref<ChatMessage[]>([
  { role: 'assistant', content: 'Hello! I am your voice assistant. What would you like to talk about?' }
]);

const isThinking = ref(false);

const {
  isRecording: isRecordingChat,
  amplitudes: chatAmplitudes,
  start: startChat,
  stop: stopChat
} = useAiVoice({
  language: 'en-US',
  onStop: (text) => {
    if (!text) return;
    chatMessages.value.push({ role: 'user', content: text });
    isThinking.value = true;
    setTimeout(() => {
      isThinking.value = false;
      chatMessages.value.push({ role: 'assistant', content: 'I heard you say: "' + text + '". This is a demo response.' });
    }, 2000);
  }
});
</${_S}>`;

const jsAdvanced = toJs(tsAdvanced);
</script>

## Basic Usage

When the trigger button is clicked, the hook activates the microphone and requests permission. While speaking, the preview box shows recognized text in real-time, and wave animations are driven by volume decibels.

<DemoBlock title="Basic Interaction" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="padding: 24px; background: var(--yh-bg-color-page); border-radius: 12px; border: 1px solid var(--yh-border-color-light);">
    <div v-if="!sttSupported" style="color: var(--yh-color-danger); margin-bottom: 12px;">
      ⚠️ Web Speech API is not supported. Switched to recording-only mode.
    </div>
    <div style="margin-bottom: 20px; min-height: 60px; padding: 12px; background: var(--yh-bg-color); border: 1px dashed var(--yh-border-color); border-radius: 8px;">
      <span style="color: var(--yh-text-color-primary)">{{ transcript || 'Waiting for speech...' }}</span>
      <span style="color: var(--yh-text-color-secondary); opacity: 0.6">{{ interimTranscript }}</span>
    </div>
    <div style="display: flex; justify-content: center; align-items: center; gap: 20px;">
      <yh-ai-voice-trigger 
        v-model:recording="isRecording" 
        :amplitudes="amplitudes"
        @start="start"
        @stop="stop"
      >
        {{ isRecording ? 'Listening...' : 'Push to Talk' }}
      </yh-ai-voice-trigger>
      <yh-button v-if="audioBlob" type="primary" size="small" @click="downloadAudio">
        Download (.webm)
      </yh-button>
    </div>
  </div>
</DemoBlock>

## Advanced Case: Spheromorphism AI Chat

Use `variant="sphere"` for a futuristic 3D interaction. Use the `onStop` callback to submit transcribed text automatically.

<DemoBlock title="Full Voice Chat Loop" :ts-code="tsAdvanced" :js-code="jsAdvanced">
  <div style="max-width: 500px; margin: 0 auto; border: 1px solid var(--yh-border-color-light); border-radius: 16px; overflow: hidden; background: var(--yh-bg-color);">
    <!-- Message List Area -->
    <div style="height: 350px; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; scroll-behavior: smooth;">
      <yh-ai-bubble v-for="(msg, index) in chatMessages" :key="index" :role="msg.role" :content="msg.content" :loading="msg.loading" />
      <yh-ai-bubble v-if="isThinking" role="assistant" :loading="isThinking" />
    </div>
    <!-- Voice Input Area -->
    <div style="padding: 20px; border-top: 1px solid var(--yh-border-color-light); background: var(--yh-bg-color-page); display: flex; justify-content: center;">
      <yh-ai-voice-trigger 
        v-model:recording="isRecordingChat" 
        variant="sphere"
        :teleport="false"
        :amplitudes="chatAmplitudes"
        @start="startChat"
        @stop="stopChat"
      >
        {{ isRecordingChat ? 'Listening...' : 'Push to Talk' }}
      </yh-ai-voice-trigger>
    </div>
  </div>
</DemoBlock>

## API

### UseAiVoiceOptions

| Prop            | Description                     | Type                                 | Default   |
| --------------- | ------------------------------- | ------------------------------------ | --------- |
| language        | Recognition language            | `string`                             | `'zh-CN'` |
| interimResults  | Request partial results         | `boolean`                            | `true`    |
| continuous      | Continuous recognition          | `boolean`                            | `false`   |
| vad             | Enable Smart Silence Detection  | `boolean`                            | `true`    |
| vadThreshold    | Time threshold for silence (ms) | `number`                             | `2000`    |
| waveCount       | Number of amplitude bars        | `number`                             | `12`      |
| onResult        | Success callback (final text)   | `(text: string) => void`             | —         |
| onPartialResult | Interim callback (partial text) | `(text: string) => void`             | —         |
| onStop          | Recording stopped callback      | `(text: string, blob: Blob) => void` | —         |

### Return Value

| Export            | Description                                | Type                  |
| ----------------- | ------------------------------------------ | --------------------- |
| isRecording       | Reactive recording state                   | `Ref<boolean>`        |
| transcript        | Confirmed final text                       | `Ref<string>`         |
| interimTranscript | Real-time partial text                     | `Ref<string>`         |
| audioBlob         | Generated audio file                       | `Ref<Blob \| null>`   |
| amplitudes        | Real-time waveform data for AiVoiceTrigger | `Ref<number[]>`       |
| volume            | Volume percentage (0-100)                  | `Ref<number>`         |
| start             | Start recognition (requests microphone)    | `() => Promise<void>` |
| stop              | Stop manually and get result               | `() => void`          |
| cancel            | Terminate immediately and discard          | `() => void`          |
| sttSupported      | Environment support check                  | `boolean`             |
