---
title: useAiVoice Voice Interaction
description: Advanced AI Voice Hook with built-in real-time waveform analysis via Web Audio API, smart VAD silence detection, and Web Speech API STT encapsulation.
---

# useAiVoice Voice Interaction

::: tip Browser Compatibility
This feature uses the browser's native Web Speech API for speech-to-text. In **Google Chrome**, it requires running in a **🪄 secure context (HTTPS or localhost)** to work properly.
:::

`useAiVoice` is a highly integrated voice processing hook. It not only encapsulates the browser's native speech-to-text (STT) capabilities but also features a built-in **Web Audio analysis engine** that outputs real-time high-fidelity waveform data, perfectly matching the `AiVoiceTrigger` component for dynamic visual feedback.

## Key Features

- **Visual Sync**: Built-in frequency analyzer returns real-time `amplitudes` array to drive waveform animations directly.
- **Physical Recording**: Built-in `MediaRecorder` generates a `.webm` audio blob after recording.
- **Smart VAD**: Supports Voice Activity Detection to automatically stop recording when the user finishes speaking.
- **Real-time STT**: Supports `interimResults` to provide partial transcripts while the user is still speaking.
- **Plug-and-Play**: Automatically manages microphone permissions, AudioContext lifecycle, and proper cleanup.

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
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
  waveCount: 20
});

const demoAudioUrl = computed(() => audioBlob.value ? URL.createObjectURL(audioBlob.value) : '');
const downloadDemoAudio = () => { 
  if (!demoAudioUrl.value) return; 
  const a = document.createElement('a'); 
  a.href = demoAudioUrl.value; 
  a.download = 'recording.webm'; 
  a.click(); 
};

const tsBasic = `<` + `${_T}>
  <div style="padding: 24px; background: var(--yh-bg-color-page); border-radius: 12px; border: 1px solid var(--yh-border-color-light);">
    <div style="margin-bottom: 20px; min-height: 60px; padding: 12px; background: var(--yh-bg-color); border: 1px dashed var(--yh-border-color); border-radius: 8px;">
      <div style="font-size: 16px; color: var(--yh-text-color-primary);">{{ transcript || 'Waiting for speech...' }}</div>
      <div style="font-size: 14px; color: var(--yh-text-color-secondary); margin-top: 4px;">{{ interimTranscript }}</div>
    </div>
    <div style="display: flex; align-items: center; justify-content: center; gap: 20px;">
      <yh-ai-voice-trigger v-model:recording="isRecording" :amplitudes="amplitudes" @start="start" @stop="stop" />
      <yh-button v-if="audioBlob" type="primary" size="small">Recording Ready</yh-button>
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
} = useAiVoice({ vad: true, language: 'en-US' });
</` + `${_S}>`;

const jsBasic = toJs(tsBasic);

const chatThinking = ref(false);
const chatMessages = ref<{ role: 'user' | 'assistant'; content: string; loading?: boolean }[]>([
  { role: 'assistant', content: 'Hello! I am your voice assistant. What would you like to talk about?' }
]);

const { 
  isRecording: chatRec, 
  amplitudes: chatAmps, 
  transcript: chatTrans,
  interimTranscript: chatInterim,
  start: chatStart, 
  stop: chatStop 
} = useAiVoice({
  language: 'en-US',
  waveCount: 20,
  onStop: (text) => {
    // If no results (e.g. magic environment not configured), provide a fallback hint
    const finalContent = text || '(No speech recognized, please check mic or environment)';
    chatMessages.value.push({ role: 'user', content: finalContent });
    
    chatThinking.value = true;
    setTimeout(() => {
      chatThinking.value = false;
      const resMsg = text ? `I heard you say: "${text}". This is a demo response.` : 'No worries, I could still feel the rhythms of your voice!';
      chatMessages.value.push({ 
        role: 'assistant', 
        content: resMsg
      });
    }, 1500);
  }
});

const tsAdvanced = `<` + `${_T}>
  <div style="max-width: 500px; margin: 0 auto; border: 1px solid var(--yh-border-color-light); border-radius: 16px; overflow: hidden; background: var(--yh-bg-color);">
    <!-- Message List Section -->
    <div style="height: 350px; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; scroll-behavior: smooth;">
      <yh-ai-bubble v-for="(msg, index) in chatMessages" :key="index" :role="msg.role" :content="msg.content" :loading="msg.loading" />
      <yh-ai-bubble v-if="chatThinking" role="assistant" :loading="chatThinking" />
    </div>
    <!-- Voice Input Section -->
    <div style="padding: 20px; border-top: 1px solid var(--yh-border-color-light); background: var(--yh-bg-color-page); display: flex; justify-content: center;">
      <yh-ai-voice-trigger v-model:recording="chatRec" variant="sphere" :teleport="false" :amplitudes="chatAmps" @start="chatStart" @stop="chatStop">
        {{ chatRec ? 'Listening...' : 'Push to Talk' }}
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
  { role: 'assistant', content: 'Hello! I am your voice assistant. What would you like to talk about?' }
]);

const chatThinking = ref(false);

const { isRecording: chatRec, amplitudes: chatAmps, start: chatStart, stop: chatStop } = useAiVoice({
  language: 'en-US',
  waveCount: 20,
  onStop: (text) => {
    if (!text) return;
    // Add user message
    chatMessages.value.push({ role: 'user', content: text });
    // Simulate AI reply
    chatThinking.value = true;
    setTimeout(() => {
      chatThinking.value = false;
      chatMessages.value.push({ role: 'assistant', content: 'I heard you say: "' + text + '". This is a demo response.' });
    }, 1500);
  }
});
</` + `${_S}>`;

const jsAdvanced = toJs(tsAdvanced);

// ─── Example 3: Integration with AiSender ───
const senderText = ref('');
const { 
  isRecording: senderRec, 
  amplitudes: senderAmps, 
  transcript: senderTrans,
  interimTranscript: senderInterim,
  start: senderStart, 
  stop: senderStop 
} = useAiVoice({
  language: 'en-US',
  onStop: (text) => { 
    if (text) senderText.value = text;
  }
});

// Synchronize transcription results to the input box in real-time
watch([senderTrans, senderInterim], ([t, i]) => {
  if (senderRec.value) {
    senderText.value = t + i;
  }
});

const tsSender = `<` + `${_T}>
  <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px;">
    <yh-ai-sender v-model="senderText" placeholder="Click the icon on the right to start voice input...">
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
} = useAiVoice({ language: 'en-US' });

// Real-time synchronization
watch([senderTrans, senderInterim], ([t, i]) => {
  if (senderRec.value) {
    senderText.value = t + i;
  }
});
</` + `${_S}>`;

const jsSender = toJs(tsSender);
</script>

## Basic Usage

<DemoBlock title="Basic Interaction Demo" :ts-code="tsBasic" :js-code="jsBasic">
  <div style="padding: 32px; background: var(--yh-bg-color-page); border-radius: 16px; border: 1px solid var(--yh-border-color-light); display: flex; flex-direction: column; gap: 24px;">
    <div v-if="!sttSupported" style="color: var(--yh-color-danger);">⚠️ Current environment doesn't support Web Speech API (Chrome recommended).</div>
    <div style="min-height: 80px; padding: 16px; background: var(--yh-bg-color); border: 1px solid var(--yh-border-color-light); border-radius: 12px; box-shadow: var(--yh-shadow-light);">
      <div style="font-size: 16px; line-height: 1.6; color: var(--yh-text-color-primary);">{{ transcript || 'Waiting for speech...' }}</div>
      <div style="font-size: 14px; color: var(--yh-text-color-secondary); margin-top: 8px;">{{ interimTranscript }}</div>
    </div>
    <div style="display: flex; align-items: center; justify-content: center; gap: 16px;">
      <yh-ai-voice-trigger v-model:recording="isRecording" :amplitudes="amplitudes" @start="start" @stop="stop">
        <span style="font-weight: 600;">{{ isRecording ? 'Listening' : 'Start Recording' }}</span>
      </yh-ai-voice-trigger>
      <yh-button v-if="audioBlob" circle @click="downloadDemoAudio">
        <template #icon><yh-icon name="download" /></template>
      </yh-button>
    </div>
  </div>
</DemoBlock>

## Integration with AiSender

Integrate the voice trigger into `AiSender` for an input experience similar to mainstream AI assistants.

<DemoBlock title="Integrated Input Field" :ts-code="tsSender" :js-code="jsSender">
  <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px;">
    <yh-ai-sender v-model="senderText" placeholder="Click the right icon to start voice input...">
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

## Advanced Case: Spheromorphism AI Chat

<DemoBlock title="Full Voice Chat Loop" :ts-code="tsAdvanced" :js-code="jsAdvanced">
  <div style="max-width: 500px; margin: 0 auto; border: 1px solid var(--yh-border-color-light); border-radius: 16px; overflow: hidden; background: var(--yh-bg-color);">
    <!-- Message List Section -->
    <div style="height: 350px; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; scroll-behavior: smooth;">
      <yh-ai-bubble v-for="(msg, index) in chatMessages" :key="index" :role="msg.role" :content="msg.content" :loading="msg.loading" />
      <yh-ai-bubble v-if="chatThinking" role="assistant" :loading="chatThinking" />
    </div>
    <!-- Voice Input Section -->
    <div style="padding: 20px; border-top: 1px solid var(--yh-border-color-light); background: var(--yh-bg-color-page); display: flex; justify-content: center;">
      <yh-ai-voice-trigger v-model:recording="chatRec" variant="sphere" :teleport="false" :amplitudes="chatAmps" @start="chatStart" @stop="chatStop">
        {{ chatRec ? 'Listening...' : 'Push to Talk' }}
      </yh-ai-voice-trigger>
    </div>
  </div>
</DemoBlock>

## API

### UseAiVoiceOptions

| Property       | Description                     | Type      | Default   |
| -------------- | ------------------------------- | --------- | --------- |
| language       | Recognition language            | `string`  | `'zh-CN'` |
| interimResults | Request partial results         | `boolean` | `true`    |
| continuous     | Continuous recognition          | `boolean` | `false`   |
| vad            | Enable Smart Silence Detection  | `boolean` | `true`    |
| vadThreshold   | Time threshold for silence (ms) | `number`  | `2000`    |
| waveCount      | Number of amplitude bars        | `number`  | `20`      |

### Return Value

| Export            | Description                                | Type            |
| ----------------- | ------------------------------------------ | --------------- |
| isRecording       | Reactive recording state                   | `Ref<boolean>`  |
| transcript        | Confirmed final text                       | `Ref<string>`   |
| interimTranscript | Real-time partial text                     | `Ref<string>`   |
| audioBlob         | Generated audio file                       | `Ref<Blob>`     |
| amplitudes        | Real-time waveform data for AiVoiceTrigger | `Ref<number[]>` |
| start             | Start recognition                          | `() => void`    |
| stop              | Stop and get results                       | `() => void`    |
| sttSupported      | Browser support check                      | `boolean`       |
